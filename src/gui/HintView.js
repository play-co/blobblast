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
import ui.View as View;
import ui.ImageView as ImageView;
import ui.TextView as TextView;

import src.util.Data as Data;

/**
 * Handles displaying hint view on a lose
 * @supr - super class reference
 */
var HintView = exports = Class(View, function(supr) {

	this.init = function(opts) {
		this.parent = opts.parent;
		supr(this, "init", [opts]);
	};

	this.buildView = function() {
		this.hintBtn = new ImageView({
			parent: this,
			x: 160 - (154 / 2),
			y: 0,
			width: 154,
			height: 64,
			image: "resources/images/buttons/red_button.png"
		});
		this.hintText = new TextView({
			parent: this.hintBtn,
			x: 0,
			y: 0,
			width: 154,
			height: 64,
			text: "Hint",
			fontFamily: "LuckiestGuyRegular",
			size: 40,
			strokeStyle: 'white',
			lineWidth: 3,
			canHandleEvents: false
		});
		this.hintBtn.onInputSelect = bind(this, "useHint");

		this.hintInfo = new TextView({
			parent: this,
			x: 0,
			y: -30,
			width: 320,
			height: 30,
			fontFamily: "LuckiestGuyRegular",
			size: 22,
			color: 'white',
			strokeStyle: 'black',
			lineWidth: 3,
			zIndex: -1,
			canHandleEvents: false
		});

		this.menuButton = new ImageView({
			parent: this,
			x: 5,
			y: 91,
			width: 70,
			height: 34,
			image: "resources/images/buttons/orange_button.png"
		});
		this.menuText = new TextView({
			parent: this.menuButton,
			x: 0,
			y: 0,
			width: 70,
			height: 34,
			text: "Menu",
			fontFamily: "LuckiestGuyRegular",
			size: 16,
			strokeStyle: 'white',
			lineWidth: 1.5,
			canHandleEvents: false
		});
		this.menuButton.onInputSelect = bind(this, function() {
			var worlds = Data.getItem("worlds"),
				world = this.parent.flow.game.world,
				levels = worlds[world];

			this.parent.flow.change("lose", "worlds");
		});

		this.replayBtn = new ImageView({
			parent: this,
			x: 233,
			y: 91,
			width: 82,
			height: 34,
			image: "resources/images/buttons/red_button.png"
		});
		this.replayText = new TextView({
			parent: this.replayBtn,
			x: 0,
			y: 0,
			width: 82,
			height: 34,
			text: "Replay",
			fontFamily: "LuckiestGuyRegular",
			size: 16,
			strokeStyle: 'white',
			lineWidth: 1.5,
			canHandleEvents: false
		});
		this.replayBtn.onInputSelect = bind(this, "replayLevel");
	};

	/**
	 * Uses a hint
	 */
	this.useHint = function() {
		var worlds = Data.getItem("worlds"),
			world = this.parent.flow.game.world,
			levels = worlds[world];

		this.parent.flow.change("lose", "game", { hint: true });

		var hints = Data.getItem("hints") - 1;
		Data.setItem("hints", hints);
	};

	this.replayLevel = function() {
		var worlds = Data.getItem("worlds"),
			world = this.parent.flow.game.world,
			levels = worlds[world];

		this.parent.flow.change("lose", "game");
	};

	/**
	 * Update contact view
	 */
	this.update = function() {
		var now = Date.now(),
			interval = 1000 * 60 * 3,
			count = Data.getItem("hints"),
			time = Data.getItem("hinttime"),
			diff = now - time;

		if (!this.hintInfo) {
			return;
		}

		if (diff > interval) {
			count = Math.min(3, count + Math.floor(diff / interval));
			time = now - (diff % interval);

			Data.setItem("hints", count);
			Data.setItem("hinttime", time);
		}

		var left = time + interval - now,
			total = Math.ceil(left / 1000),
			minutes = Math.ceil(total / 60);

		this.hintInfo.setText(count + " left, next in " + minutes + " minute(s)");

		if (count > 0) {
			this.hintBtn.onInputSelect = bind(this, "useHint");
			this.hintBtn.setImage("resources/images/buttons/red_button.png");
		} else {
			this.hintBtn.onInputSelect = undefined;
			this.hintBtn.setImage("resources/images/buttons/black_button.png");
		}

		if (this.parent.getSuperview().game.world === 'survival-ville') {
			this.hintBtn.style.visible = false;
			this.replayBtn.style.visible = false;
			this.hintInfo.style.visible = false;
		} else {
			this.replayBtn.style.visible = true;
			this.hintInfo.style.visible = true;
		}
	};
});
