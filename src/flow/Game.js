/** @license
 * This file is part of Blob Blast.
 *
 * Blob Blast is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * Blob Blast is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with Blob Blast.  If not, see <http://www.gnu.org/licenses/>.
 */

import animate;
import ui.View as View;
import ui.ImageView as ImageView;

import src.game.GameView as GameView;
import src.generators.SurvivalGenerator as SurvivalGenerator;
import src.config.levels as levels;
import src.util.Data as Data;

/**
 * Game module
 */
exports = Class(View, function(supr) {

	var BG_WIDTH = 320,
		BG_HEIGHT = 416;

	this.init = function(opts) {
		opts.x = 0;
		opts.y = 0;
		opts.width = BG_WIDTH;
		opts.height = BG_HEIGHT;
		opts.zIndex = 2;

		this.flow = opts.parent;
		this.previousLevel = null;
		this.world = null;
		this.generator = null;

		supr(this, 'init', arguments);
	};

	this.buildView = function() {
		this.flow.removeSubview(this);

		this.curtain = new ImageView({
			parent: this,
			x: 0,
			y: -BG_HEIGHT,
			width: BG_WIDTH,
			height: BG_HEIGHT,
			image: "resources/images/backgrounds/newb-ville.png"
		});

		this.setWorld("newb-ville");
	};

	this.setWorld = function(world, cb) {
		var level = Data.getItem('worlds')[world].last + 1;
		this.world = world;

		// stop current level generator
		if (this.generator != null) {
			this.generator.stop();
		}

		this.curtain.setImage("resources/images/backgrounds/" + world + ".png");

		// create new world level generator
		if (world === "survival-ville") {
			this.generator = new SurvivalGenerator();
			this.generator.start({
				level: level,
				fillCount: 0
			});
			this.generator.subscribeOnce("fullQueue", this, function() {
				cb();
			});
		} else if (typeof cb === "function") {
			cb();
		}
	};

	this.start = function(opts) {
		var name = opts.name = Data.getItem("worlds")[this.world].last + 1,
			level;

		opts.worldLevels = levels[this.world];

		if (name >= opts.worldLevels.length && this.world === "survival-ville") {
			level = this.generator.next(name);

			// if no level available, subscribe and wait for one
			if (!level) {
				this.loadingScreen();
				this.generator.subscribeOnce("fullQueue", this, function() {
					level = this.generator.next(name);
					level = level.map(function(list) {
						return merge([], list);
					});

					opts.level = level;

					this.launchLevel(opts);
					this.hideLoadingScreen();

					if (typeof opts.cb === 'function') {
						opts.cb();
					}
				});

				return;
			} else {
				level = level.map(function(list) {
					return merge([], list);
				});
			}
		} else {
			level = opts.worldLevels[name].map(function(list) {
				return merge([], list);
			});
		}

		opts.level = level;
		this.launchLevel(opts);

		if (typeof opts.cb === 'function') {
			opts.cb();
		}
	};

	this.launchLevel = function(opts) {
		var name = opts.name,
			level = opts.level,
			i, len;

		level[0].name = name;
		level[0].hint = merge([], level[0].hint);
		level[0].tutorial && (level[0].tutorial = merge([], level[0].tutorial));

		var data = merge({}, level[0]);
		opts = merge(opts, {
			parent: this,
			level: level,
			levelNum: opts.name,
			levelTotal: opts.worldLevels.length,
			hint: opts.hint,
			opacity: 0,
			visible: false
		});

		// create new game or reset the game view
		if (!this.game) {
			this.game = new GameView(opts);
		} else {
			this.addSubview(this.game);
			this.game.resetView(opts);
			this.game.style.opacity = 0;
		}

		this.inView = this.game;

		data.level = this.world + ':' + opts.name;

		this.previousLevel = merge([], level);
		this.previousLevel.unshift(data);

		// map Infinity to -1 to prepare for serializing
		for (i = 1, len = this.previousLevel.length; i < len; i++) {
			this.previousLevel[i] = this.previousLevel[i].map(function (blob) {
				return blob === Infinity ? -1 : blob;
			});
		}

		this.startTime = (new Date()).getTime();
	};

	this.end = function(status) {
		var worlds = Data.getItem("worlds"),
			lvls = worlds[this.world],
			losses;

		if (status === "abort") {
			this.flow.change("game", "worlds");
		} else {
			var beat = false;
			if (status === "win") {
				lvls.last++;
				lvls.unlocked = Math.max(lvls.last + 1, lvls.unlocked);

				if (lvls.last === levels[this.world].length - 1 && this.world !== "survival-ville") {
					beat = true;
					lvls.last = -1;
				}

				Data.setItem("worlds", worlds);
			} else if ( status === "loss" && this.world === "survival-ville") {
				// special case loss for survival-ville 
				levels.last = -1;

				this.generator.reset();
				Data.setItem("worlds", worlds);
			}

			if (status === 'loss') {
				losses = Data.getItem('losses') || 0;
				Data.setItem('losses', losses >= 3 ? 1 : losses + 1);
			}

			this.flow.change("game", status === "win" ? "win" : "lose", { worldwin: beat });
		}
	};

	this.enterTransition = function(cb) {
		this.curtain.style.y = -BG_HEIGHT;
		animate(this.curtain)
		.now({ y: 0 }, 500, animate.easeOut)
		.then(bind(this, function() {
			this.inView.style.visible = true;

			// fade in game
			animate(this.inView)
			.now({ opacity: 1 }).then(bind(this, function() {
				if (typeof cb === 'function') {
					cb();
				}
			}));
		}));
	};

	this.close = function() {
		this.flow.removeSubview(this);
		this.removeSubview(this.game);
	};

	this.loadingScreen = function() {
		var worldsView = this.flow.worlds;
		worldsView.setLoadingAnimation({
			hideHeader: true,
			hideOthers: true
		});
		this.flow.addSubview(worldsView);
	};

	this.hideLoadingScreen = function() {
		this.flow.removeSubview(this.flow.worlds);
		this.flow.worlds.removeLoadingAnimation();	
	};
});
