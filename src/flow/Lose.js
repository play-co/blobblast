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

import src.util.Data as Data;
import src.gui.HintView as HintView;

/**
 * Lose module
 * Handles view after a game is lost
 */
exports = Class(View, function(supr) {

	var BG_WIDTH = 320,
		BG_HEIGHT = 416,
		DRIP_WIDTH = 272,
		DRIP_HEIGHT = 164,
		BLOB_WIDTH = 165,
		BLOB_HEIGHT = 97;

	this.init = function(opts) {
		opts.x = 0;
		opts.y = 0;
		opts.width = BG_WIDTH;
		opts.height = BG_HEIGHT;
		this.flow = opts.parent;

		supr(this, "init", arguments);
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

		this.loseDrip = new ImageView({
			parent: this,
			x: (BG_WIDTH - DRIP_WIDTH) / 2,
			y: -DRIP_HEIGHT,
			width: DRIP_WIDTH,
			height: DRIP_HEIGHT,
			image: "resources/images/lose/lose_drip.png"
		});

		this.loseBlob = new ImageView({
			parent: this,
			x: (BG_WIDTH - BLOB_WIDTH) / 2,
			y: this.loseDrip.style.y - BLOB_HEIGHT,
			width: BLOB_WIDTH,
			height: BLOB_HEIGHT,
			image: "resources/images/lose/lose_blob.png"
		});

		this.hintView = new HintView({
			parent: this,
			x: 0,
			y: BG_HEIGHT + 50,
			width: BG_WIDTH,
			height: BG_HEIGHT
		});

		this.update();
	};

	this.update = function() {
		this.hintView.update();
	};

	this.enterTransition = function() {
		var oHeight = this.loseBlob.style.height,
			oWidth = this.loseBlob.style.width;

		// drop down lose drip
		animate(this.loseDrip).now({ y: 93 }, 500);

		// drop in blob and bounce
		animate(this.loseBlob)
		.wait(200)
		.then({ y: 19 }, 500, animate.linear)
		.then({ // splat
			height: oHeight -= 15,
			width: oWidth += 30,
			dx: -15,
			dy: 15
		}, 150, animate.linear)
		.then({ // retract
			height:	oHeight += 30,
			width: oWidth -= 40,
			dx: 20,
			dy: -30
		}, 150, animate.linear)
		.then({ // shrink
			height: oHeight -= 20,
			width: oWidth += 10,
			dx: -5,
			dy: 20
		}, 75, animate.linear)
		.then({ // bob up
			height: oHeight += 10,
			dy: -10
		}, 75, animate.linear)
		.then({ // bob to original size
			height: oHeight -= 5,
			dy: 5
		}, 75, animate.linear);

		animate(this.hintView).now({ y: 286 }, 500);
	};

	/**
	 * Raise curtains
	 */
	this.raiseCurtain = function() {
		animate(this.loseBlob).now({ y: -DRIP_HEIGHT - BLOB_HEIGHT });
		return animate(this.loseDrip).now({ y: -DRIP_HEIGHT });
	};

	/**
	 * transition out of view
	 */
	this.leaveTransition = function(cb, opts) {
		this.raiseCurtain();
		animate(this.hintView).now({ y: BG_HEIGHT + 50 });

		if (opts != null && opts.fade === false) {
			setTimeout(cb, 500);
		} else {
			animate(this.background)
			.now({ opacity: 0 })
			.then(cb);
		}
	};

	this.showHints = function(opts) {
		this.hintView.style.opacity = 0;
		this.hintView.update();
		animate(this.hintView).now({ opacity: 1 });
	};

	/**
	 * Called whenever the lose view is finished. This
	 * resets the view so it will be in the correct state
	 * when it is next displayed.
	 */
	this.resetView = function() {
		this.background.style.opacity = 1;
		this.hintView.style.opacity = 1;

		this.loseBlob.style.x = (BG_WIDTH - BLOB_WIDTH) / 2;
		this.loseBlob.style.height = BLOB_HEIGHT;
		this.loseBlob.style.width = BLOB_WIDTH;
	};
});
