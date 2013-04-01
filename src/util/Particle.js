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

"use import";

import GC;
import ui.ImageView;
import animate;

exports = Class(ui.ImageView, function(supr) {
	
	this.init = function(opts) {
		opts.canHandleEvents = false;
		opts.zIndex = opts.zIndex === undefined ? 999999 : opts.zIndex;

		this.view = opts.view;
		this.pos = opts.view.getPosition(opts.parent);
		this.duration = opts.duration || 1200;

		supr(this, 'init', [opts]);

		//logger.log('scale:',this.pos.scale,opts.scale,(opts.scale || 1) * this.pos.scale);
		this.style.scale = (opts.scale || 1) * this.pos.scale;
		this.style.opacity = 0;
	}


	this.placeRandomly = function() {
		var s = this.pos;
		this.positionCenter({
			x: this.randInt(s.x, s.x + s.width),
			y: this.randInt(s.y, s.y + s.height)
		});
	}
	

	this.placeInCenter = function() {
		var s = this.pos;
		this.positionCenter({
			x: (s.x + s.width / 2),
			y: (s.y + s.height / 2)
		});

		return this;
	}


	this.streak = function(opts) {
		var angle = opts.angle, distance = opts.distance, rotate = opts.rotate;

		var duration = 400;

		if (angle === undefined) {
			angle = this.randRange(0, 3.14159*2);
		}
		if (distance === undefined) {
			distance = 100;
		}
		this.style.opacity = 1;

		animate(this).then({
			dx: Math.cos(angle) * distance,
			dy: Math.sin(angle) * distance
		}, duration, animate.easeOut).then(bind(this, 'removeFromSuperview'));
	}

	
	this.explode = function(opts) {
		var duration = Math.max(50, this.duration + (Math.random() * 100 - 50));
		var rotate = opts && opts.rotate || 0.2;

		this.style.scale = 0;
		animate(this, 2).then({
			opacity: opts && opts.opacity || 0.5
		}, duration * 0.3, animate.easeOut).then({
			opacity: 0
		}, duration * 0.7, animate.easeIn);

		animate(this).then({
			scale: 2,
			dr: rotate
		}, duration, animate.linear).then(bind(this, 'removeFromSuperview'));
	}


	this.flyAndFade = function(opts) {
		var angle = opts.angle, distance = opts.distance, rotate = opts.rotate;

		var duration = Math.max(50, this.duration + (Math.random() * 100 - 50));

		if (angle === undefined) {
			angle = this.randRange(0, 3.14159*2);
		}
		if (distance === undefined) {
			distance = 100;
		}

		distance += Math.random() * 25;

		animate(this, 2).then({
			opacity: 1,
			dscale: 1.1
		}, duration * 0.2).then({
			scale: 0.5,
			opacity: 0
		}, duration * 0.8);

		animate(this).then({
			dx: Math.cos(angle) * distance,
			dy: Math.sin(angle) * distance,
			dr: (rotate !== false ? Math.random() * 1.4 - 0.7 : 0)
		}, duration, animate.linear).then(bind(this, 'removeFromSuperview'));
	};


	this.positionCenter = function(pt) {
		this.style.x = pt.x - this.style.width/2;
		this.style.y = pt.y - this.style.height/2;
	};

	
	this.randRange = function(min, max) {
		return Math.random() * (max - min) + min;		
	};
	
	
	this.randInt = function(min, max) {
		return ~~this.randRange(min, max);
	};

});
