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
import ui.ImageView as ImageView;
import ui.View as View;

import src.flow.WorldSelect as WorldSelect;
import src.flow.Game as Game;
import src.flow.Win as Win;
import src.flow.Lose as Lose;

import src.util.Data as Data;

/**
 * Flow module
 */
exports = Class(View, function(supr) {

	var BG_WIDTH = 320,
		BG_HEIGHT = 416,
		ANIM_TIME = 500;

	this.init = function(opts) {
		supr(this, "init", arguments);

		this._locked = false;
	};

	this.buildView = function() {
		this.background = new ImageView({
			parent: this,
			x: 0,
			y: 0,
			width: BG_WIDTH,
			height: BG_HEIGHT,
			image: "resources/images/backgrounds/main.png"
		});

		this.worlds = new WorldSelect({
			parent: this
		});

		this.game = new Game({
			parent: this
		});

		this.win = new Win({
			parent: this
		});

		this.lose = new Lose({
			parent: this
		});
	};

	// mutex on view transitions
	this.locked = function() {
		return this._locked;
	};

	// lock view transitions and disable user input
	this.lock = function() {
		this._locked = true;
		GC.app.view.getInput().blockEvents = true;
	};

	// unlock view transitions and enable user input
	this.unlock = function() {
		this._locked = false;
		GC.app.view.getInput().blockEvents = false;
	};

	/**
	 * Acts as controller between various flow modules, and
	 * implements some transitions.
	 * @param from - origin module
	 * @param to - destination module
	 * @param opts
	 * 	worldwin
	 * 	hints
	 */
	this.change = function(from, to, opts) {
		if (this.locked()) {
			return false;
		} else {
			this.lock();
		}

		opts = opts || {};
		var worlds = this.worlds, game = this.game;

		if (from === "worlds" && to === "game") {
			game.style.opacity = 1;
			this.addSubview(game);

			game.start({});
			game.enterTransition(bind(this, function() {
				this.removeSubview(worlds);
				this.background.style.visible = false;
				this.unlock();
				game.game.constructView();
			}));
		} else if (from === "game" && to === "worlds") {
			animate(game.game)
			.now({ opacity: 0 }, ANIM_TIME, animate.easeIn)
			.then(bind(this, function() {
				worlds.select();
				this.background.style.visible = true;
				this.addSubview(worlds);

				animate(game.curtain)
				.now({ y: -BG_HEIGHT }, ANIM_TIME, animate.easeIn)
				.then(bind(this, function() {
					game.close();
					this.unlock();
				}));
			}));
		} else if (from === "game" && (to === "win" || to === "lose")) {
			var end = this[to];
			this.addSubview(end);

			animate(game)
			.now({ opacity: 0 }, ANIM_TIME, animate.easeIn)
			.then(bind(this, function() {
				game.close();

				if (to === "win") {
					end.worldwin = opts.worldwin;
					GC.app.audioManager.play("win", 1);
				} else {
					end.update();
					GC.app.audioManager.play("lose", 1);
				}

				if (typeof end.enterTransition === 'function') {
					end.enterTransition();
				}

				this.unlock();
			}));
		} else if (from === "win" || from === "lose") {
			var end = this[from];

			if (to === "worlds") {
				this.background.style.visible = true;
				end.leaveTransition(bind(this, function() {
					worlds.style.opacity = 0;
					worlds.select();
					this.addSubview(worlds);

					animate(worlds)
					.now({ opacity: 1 }, ANIM_TIME, animate.easeIn)
					.then(bind(this, function() {
						this.removeSubview(end);
						end.resetView();
						this.unlock();
					}));
				}));
			} else if (to === "worldswin") {
				this.background.style.visible = true;

				animate(end)
				.now({ opacity: 0 }, 2 * ANIM_TIME, animate.linear)
				.then(bind(this, function() {
					this.removeSubview(end);
					end.resetView();
					end.style.opacity = 1;
					worlds.style.opacity = 0;
					this.addSubview(worlds);

					animate(worlds)
					.now({ opacity: 1 }, 2 * ANIM_TIME, animate.easeIn)
					.then(bind(this, function() {
						end.resetView();
						worlds.unlockWorld();
					}));
				}));
			} else if (to === "game") {
				end.leaveTransition(bind(this, function() {
					game.start(merge(opts || {}, {
						cb: bind(this, function() {
							game.style.opacity = 0;
							game.inView.style.visible = true;
							game.inView.style.opacity = 1;
							this.addSubview(game);

							animate(game)
							.now({ opacity: 1 })
							.then(bind(this, function() {
								this.removeSubview(end);
								end.resetView();
								this.unlock();
								game.game.constructView();
							}));
						})
					}));
				}), { fade: false });
			}
		}
	};
});
