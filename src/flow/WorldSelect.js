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
import ui.resource.Image as Image;
import ui.ImageView as ImageView;
import ui.TextView as TextView;
import ui.View as View;

import src.config.levels as levels;
import src.util.Data as Data;
import src.util.animations as animations;

/**
 * WorldSelect module
 */
exports = Class(View, function(supr) {

	var BG_WIDTH = 320,
		BG_HEIGHT = 416,
		TEXT_WIDTH = BG_WIDTH,
		TEXT_HEIGHT = 30,
		STRIP_WIDTH = 236,
		STRIP_HEIGHT = 174,
		SOUND_WIDTH = 64,
		SOUND_HEIGHT = 66,
		MARGINS = 16,
		ANIM_TIME = 500;

	this.init = function(opts) {
		opts.x = 0;
		opts.y = 0;
		opts.width = BG_WIDTH;
		opts.height = BG_HEIGHT;

		this.flow = opts.parent;
		this.mute = false;

		supr(this, 'init', arguments);
	};

	this.buildView = function() {
		this.strip = new View({
			parent: this,
			x: (BG_WIDTH - STRIP_WIDTH) / 2,
			y: (BG_HEIGHT - STRIP_HEIGHT) / 2,
			width: STRIP_WIDTH,
			height: STRIP_HEIGHT
		});

		this.header = new TextView({
			parent: this,
			x: 0,
			y: this.strip.style.y - TEXT_HEIGHT,
			width: TEXT_WIDTH,
			height: TEXT_HEIGHT,
			fontFamily: "LuckiestGuyRegular",
			size: 36,
			color: 'white',
			strokeStyle: 'black',
			lineWidth: 4,
			verticalAlign: 'top',
			horizontalAlign: 'center',
			text: "Choose a world!"
		});

		this.list = [];
		for (var i in levels.list) {
			var name = levels.list[i];
			var icon = new ImageView({
				parent: this.strip,
				x: (STRIP_WIDTH * i),
				y: 0,
				width: STRIP_WIDTH,
				height: STRIP_HEIGHT,
				image: "resources/images/icons/ville_sprite_00" + i + ".png"
			});

			icon.name = name;
			icon.locked = true;

			this.list.push(icon);
		}

		this.name = new TextView({
			parent: this,
			x: 0,
			y: this.strip.style.y + STRIP_HEIGHT - TEXT_HEIGHT + 10,
			width: TEXT_WIDTH,
			height: TEXT_HEIGHT,
			fontFamily: "LuckiestGuyRegular",
			size: 28,
			color: 'white',
			strokeStyle: 'black',
			lineWidth: 4,
			verticalAlign: 'top',
			horizontalAlign: 'center'
		});

		this.progress = new TextView({
			parent: this,
			x: 0,
			y: this.strip.style.y + STRIP_HEIGHT + 10,
			width: TEXT_WIDTH,
			height: TEXT_HEIGHT,
			fontFamily: "LuckiestGuyRegular",
			size: 22,
			color: 'white',
			strokeStyle: 'black',
			lineWidth: 3,
			verticalAlign: 'top',
			horizontalAlign: 'center'
		});

		this.stripper = new View({
			parent: this,
			x: 0,
			y: this.strip.style.y,
			width: BG_WIDTH,
			height: BG_HEIGHT
		});

		this.sound = new ImageView({
			parent: this,
			x: MARGINS,
			y: BG_HEIGHT - SOUND_HEIGHT,
			width: SOUND_WIDTH,
			height: SOUND_HEIGHT,
			image: "resources/images/icons/soundOn.png"
		});

		this.addSubscriptions();
		this.select();
	};

	this.stripperStart = function() {
		this.stripper.startDrag({ radius: 15 });
	};

	this.stripperDrag = function(drag, move, dt) {
		var x = this.strip.style.x += dt.x,
			i = dt.x > 0
				? Math.floor((BG_WIDTH / 2 - x) / BG_WIDTH)
				: Math.ceil((BG_WIDTH / 2 - x) / BG_WIDTH);

		i = Math.max(0, Math.min(this.list.length - 1, i));
		if (i !== this.curIndex) {
			this.select(i, false);
		}
	};

	this.stripperSelect = function() {
		if (!this.cur.locked) {
			this.setLoadingAnimation();
			this.flow.game.setWorld(this.cur.name, bind(this, function() {
				this.flow.change("worlds", "game");
				this.removeLoadingAnimation();
			}));
		}
	};

	this.stripperDragStop = function() {
		this.snap();
	};

	this.pos = function(i) {
		var view = this.list[i];
		return -STRIP_WIDTH * i + (BG_WIDTH - STRIP_WIDTH) / 2;
	};

	this.select = function(i, snap) {
		if (i !== 0 && !i) {
			i = this.cur ? this.list.indexOf(this.cur) : 0;
		}

		this.curIndex = i;

		var view = this.cur = this.list[i],
			name = view.name,
			worlds = Data.getItem("worlds"),
			cur = worlds[name],
			progressText;

		if (snap !== false) {
			animate(this.strip)
			.now({ x: this.pos(i) }, ANIM_TIME / 2, animate.easeOut);
		}

		this.list.forEach(function(icon, i, a) {
			icon.locked = i !== 0 && worlds[a[i - 1].name].unlocked !== levels[a[i - 1].name].length;		
			if (icon.locked) {
				icon.setImage("resources/images/icons/ville_sprite_00" + i + "_locked.png");
			}
		});

		if (view.locked) {
			this.name.setText("Locked");
			this.progress.style.visible = false;
		} else {
			view.style.opacity = 1;
			switch (name) {
				case "newb-ville":
					this.name.setText("Newbville");
					break;
				case "user-ville":
					this.name.setText("The Doldrums");
					break;
				case "super-ville":
					this.name.setText("Mirror World");
					break;
				case "survival-ville":
					this.name.setText("Everlasting Blob Blasting");
					break;
			}

			progressText = i === 3
				? cur.unlocked + " levels beat"
				: Math.ceil(100 * cur.unlocked / levels[name].length) + "% complete";

			this.progress.style.visible = true;
			this.progress.setText(progressText);
		}

		this.header.setText("Choose a world!");
	};

	this.snap = function() {
		animate(this.strip)
		.now({ x: this.pos(this.curIndex) }, ANIM_TIME / 2, animate.easeOut);
	};

	this.pauseSubscriptions = function() {
		this.stripper
			.unsubscribe("InputStart", this)
			.unsubscribe("InputSelect", this)
			.unsubscribe("Drag", this)
			.unsubscribe("DragStop", this);

		this.sound.unsubscribe("InputSelect", this);
	};

	this.addSubscriptions = function() {
		this.stripper.subscribe("InputStart", this, this.stripperStart)
			.subscribe("InputSelect", this, this.stripperSelect)
			.subscribe("Drag", this, this.stripperDrag)
			.subscribe("DragStop", this, this.stripperDragStop);

		this.sound.subscribe("InputSelect", this, this.toggleSound);
	};

	this.setLoadingAnimation = function(opts) {
		if (this.cur.name !== 'survival-ville') {
			return;	
		}

		opts = opts || {};

		this.name.setText("Generating Next Level...");
		this.progress.setText("");

		if (opts.hideHeader) {
			this.header.style.visible = false;
		}

		if (opts.hideOthers) {
			this.list.forEach(function(item, i) {
				if (this.cur.name !== item.name) {
					item.style.visible = false;
				}
			}, this);	
		}

		this.pauseSubscriptions();
	};

	this.removeLoadingAnimation = function() {
		if (this.cur.name !== 'survival-ville') {
			return;
		}

		this.header.style.visible = true;

		this.list.forEach(function(item) {
			item.style.visible = true;
		});

		this.addSubscriptions();
		this.select();
	};

	/**
	 * Part of unlock animation
	 */
	this.unlockWorld = function() {
		var targetIndex = Math.min(this.list.indexOf(this.cur) + 1, this.list.length - 1),
			target = this.list[targetIndex];

		animate(this.progress)
		.wait(ANIM_TIME)
		.then(bind(this, function() {
			this.progress.setText("100% complete");
		}))
		.wait(ANIM_TIME)
		.then(bind(this, function() {
			animate(this.strip)
			.now({ x: this.pos(targetIndex) }, 3 * ANIM_TIME, animate.easeInOut)
			.then(bind(this, function() {
				this.select(targetIndex);

				if (Data.getItem("worlds")[this.cur.name].unlocked === 0) {
					this.header.setText("You Unlocked");
				}

				animations.burst({ parent: this });

				this.list[targetIndex].setImage("resources/images/icons/ville_sprite_00" + targetIndex + ".png");
				this.flow.unlock();
			}));
		}));
	};

	this.toggleSound = function() {
		this.mute = !this.mute;

		if (this.mute) {
			this.sound.setImage("resources/images/icons/soundOff.png");
			GC.app.audioManager.setMuted(true);
		} else {
			this.sound.setImage("resources/images/icons/soundOn.png");
			GC.app.audioManager.setMuted(false);
			GC.app.audioManager.setVolume(1);
		}
	};
});
