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
import ui.TextView as TextView;

import src.config.levels as levels;
import src.util.Data as Data;

/**
 * Win module
 */
exports = Class(View, function(supr) {

	var BG_WIDTH = 320,
		BG_HEIGHT = 416,
		BLOB_Y = 50,
		BLOB_WIDTH = 108,
		BLOB_HEIGHT = 109,
		SUN_WIDTH = 450,
		SUN_HEIGHT = 450,
		WIN_Y = 180,
		WIN_WIDTH = 256,
		WIN_HEIGHT = 88,
		NEXT_WIDTH = 154,
		NEXT_HEIGHT = 64,
		MENU_WIDTH = 70,
		MENU_HEIGHT = 34,
		REPLAY_WIDTH = 82,
		REPLAY_HEIGHT = 34,
		MARGINS = 6,
		SUN_SPIN_RATE = Math.PI / 2,
		ANIM_TIME = 500;

	this.init = function(opts) {
		opts.x = 0;
		opts.y = 0;
		opts.width = BG_WIDTH;
		opts.height = BG_HEIGHT;

		this.flow = opts.parent;
		this.worldwin = false;

		supr(this, "init", [opts]);
	};

	this.buildView = function() {
		this.flow.removeSubview(this);

		this.background = new ImageView({
			parent: this,
			x: 0,
			y: 0,
			width: BG_WIDTH,
			height: BG_HEIGHT,
			image: "resources/images/backgrounds/win.png"
		});

		this.winSun = new ImageView({
			parent: this,
			x: (BG_WIDTH - SUN_WIDTH) / 2,
			y: BLOB_Y - (SUN_HEIGHT - BLOB_HEIGHT) / 2,
			anchorX: SUN_WIDTH / 2,
			anchorY: SUN_HEIGHT / 2,
			width: SUN_WIDTH,
			height: SUN_HEIGHT,
			opacity: 0,
			image: "resources/images/popups/win-sun.png"
		});

		this.winBlob = new ImageView({
			parent: this,
			x: (BG_WIDTH - BLOB_WIDTH) / 2,
			y: -BLOB_HEIGHT,
			width: BLOB_WIDTH,
			height: BLOB_HEIGHT,
			image: "resources/images/popups/win-blob.png"
		});

		this.winText = new ImageView({
			parent: this,
			x: BG_WIDTH,
			y: WIN_Y,
			width: WIN_WIDTH,
			height: WIN_HEIGHT,
			image: "resources/images/popups/win-text.png"
		});

		this.nextButton = new ImageView({
			parent: this,
			x: (BG_WIDTH - NEXT_WIDTH) / 2,
			y: BG_HEIGHT,
			width: NEXT_WIDTH,
			height: NEXT_HEIGHT,
			image: "resources/images/buttons/red_button.png"
		});
		this.nextText = new TextView({
			parent: this.nextButton,
			x: 0,
			y: 0,
			width: NEXT_WIDTH,
			height: NEXT_HEIGHT,
			text: "Next",
			fontFamily: "LuckiestGuyRegular",
			size: 36,
			strokeStyle: 'white',
			lineWidth: 3,
			canHandleEvents: false
		});
		this.nextButton.onInputSelect = bind(this, function() {
			var worlds = Data.getItem("worlds"),
				world = this.flow.game.world,
				levels = worlds[world];

			if (this.worldwin) {
				this.flow.change("win", "worldswin");
			} else {
				this.flow.change("win", "game");
			}
		});

		this.menuButton = new ImageView({
			parent: this,
			x: MARGINS,
			y: BG_HEIGHT,
			width: MENU_WIDTH,
			height: MENU_HEIGHT,
			image: "resources/images/buttons/orange_button.png"
		});
		this.menuText = new TextView({
			parent: this.menuButton,
			x: 0,
			y: 0,
			width: MENU_WIDTH,
			height: MENU_HEIGHT,
			text: "Menu",
			fontFamily: "LuckiestGuyRegular",
			size: 16,
			strokeStyle: 'white',
			lineWidth: 1.5,
			canHandleEvents: false
		});
		this.menuButton.onInputSelect = bind(this, function() {
			var worlds = Data.getItem("worlds"),
				world = this.flow.game.world,
				levels = worlds[world];

			this.flow.change("win", "worlds");
		});

		this.replayButton = new ImageView({
			parent: this,
			x: BG_WIDTH - REPLAY_WIDTH - MARGINS,
			y: BG_HEIGHT,
			width: REPLAY_WIDTH,
			height: REPLAY_HEIGHT,
			image: "resources/images/buttons/red_button.png"
		});
		this.replayText = new TextView({
			parent: this.replayButton,
			x: 0,
			y: 0,
			width: REPLAY_WIDTH,
			height: REPLAY_HEIGHT,
			text: "Replay",
			fontFamily: "LuckiestGuyRegular",
			size: 16,
			strokeStyle: 'white',
			lineWidth: 1.5,
			canHandleEvents: false
		});
		this.replayButton.onInputSelect = bind(this, function() {
			var worlds = Data.getItem("worlds"),
				world = this.flow.game.world,
				levels = worlds[world];

			if (this.worldwin) {
				levels.last = levels[this.flow.game.world].length - 1;
			}

			levels.last--;
			Data.setItem("worlds", worlds);
			this.flow.change("win", "game");
		});

		this.manageViews();
	};

	this.manageViews = function() {};

	this.enterTransition = function() {
		this.winSun.style.r = 0;

		// move in win blob first
		animate(this.winBlob)
		.now({ y: BLOB_Y }, ANIM_TIME, animate.easeOut);

		// move in win text
		animate(this.winText)
		.now({ x: (BG_WIDTH - WIN_WIDTH) / 2 })
		.then(bind(this, function() {
			// fade in sun
			animate(this.winSun).now({ opacity: 1 });
			this.sunActive = true;
		}));

		animate(this.nextButton).now({ y: 285 });
		animate(this.replayButton).now({ y: 377 });
		animate(this.menuButton).now({ y: 377 });
	};

	this.leaveTransition = function(cb, opts) {
		this.sunActive = false;

		animate(this.winSun).now({ opacity: 0 });
		animate(this.winBlob).now({ dy: -300 });
		animate(this.winText).now({ dy: -300 });
		animate(this.nextButton).now({ dy: 300 });
		animate(this.menuButton).now({ dy: 300 });
		animate(this.replayButton).now({ dy: 300 });

		if (opts != null && opts.fade === false) {
			setTimeout(cb, 500);
		} else {
			animate(this.background)
			.now({ opacity: 0 })
			.then(cb);
		}
	};

	this.resetView = function() {
		this.background.style.opacity = 1;
		this.nextButton.style.y = BG_HEIGHT;
		this.menuButton.style.y = BG_HEIGHT;
		this.replayButton.style.y = BG_HEIGHT;
		this.winBlob.style.y = -BLOB_HEIGHT;
		this.winText.style.x = BG_WIDTH;
		this.winText.style.y = WIN_Y;
		this.winSun.style.opacity = 0;
	};

	this.tick = function(dt) {
		if (this.sunActive) {
			this.winSun.style.r += SUN_SPIN_RATE * dt / 1000;
		}
	};
});
