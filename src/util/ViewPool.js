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

import device;

exports = Class(function() {

	this.init = function(opts) {
		// required opts
		this.ctor = opts.ctor;  // constructor

		// initialization
		this.views = [];
		this.freshQueue = [];
		this.freshObjects = [];

		// array used for sharing active views
		this.shareActiveViews = [];

		// early initialization to avoid dropping frames
		var initCount = opts.initCount;
		var initOpts = opts.initOpts;
		if (initCount) {
			for (var i = 0; i < initCount; i++) {
				var view = this.createNewView(initOpts);
				view.style.visible = false;
				this.views.push(view);
				this.freshQueue.push(view.poolIndex);
			}
		}
	};

	/* PRIMARY FUNCTIONS */

	this.obtainObject = function() {
		if (this.freshObjects.length) {
			return this.freshObjects.pop();
		} else {
			return {};
		}
	};

	this.obtainView = function(opts, onObtain) {
		if (this.freshQueue.length) {
			var view = this.views[this.freshQueue.pop()];
			this.applyOpts(view, opts);
			view.style.visible = true;

			onObtain && onObtain(view, opts);

			if (opts.parentView) {
				opts.parentView.addSubview(view);
				delete opts.parentView;
			}

			// recycle opts object, remove all view style properties, custom props should be considered by the user
			this.freshObjects.push(this.cleanObject(opts));
		} else {
			// opts object typically becomes a member of new views, so we don't recycle it
			var view = this.createNewView(opts);
			view.style.visible = true;
			this.views.push(view);

			onObtain && onObtain(view, opts);

			if (opts.parentView) {
				opts.parentView.addSubview(view);
				delete opts.parentView;
			}
		}

		return view;
	};

	// don't call this twice on any view without re-obtaining it first
	// if you think you are and can't fix it, uncomment the conditional check
	this.releaseView = function(view) {
		//if (this.freshQueue.indexOf(view.poolIndex) < 0) {
			view.style.visible = false;
			this.freshQueue.push(view.poolIndex);
		//}
	};

	// ensures already released views are not re-released since the above conditional is commented out
	this.releaseAllViews = function() {
		for (var i = 0; i < this.views.length; i++) {
			var view = this.views[i];
			if (this.freshQueue.indexOf(view.poolIndex) < 0) {
				this.releaseView(view);
			}
		}
	};

	// potentially big garbage collection hit
	this.drainPool = function() {
		for (var i = 0; i < this.views.length; i++) {
			this.views[i].removeFromSuperview();
		}

		this.ctor = null;

		this.views = [];
		this.freshQueue = [];
		this.freshObjects = [];
		this.shareActiveViews = [];
	};

	this.getViews = function() {
		return this.views;
	};

	this.getViewCount = function() {
		return this.views.length;
	};

	this.getFreshCount = function() {
		return this.freshQueue.length;
	};

	this.getActiveViews = function() {
		// avoid creating a new array, the contents aren't GC'd because they are managed by this class
		this.shareActiveViews.length = 0;

		for (var v in this.views) {
			var view = this.views[v];
			if (this.freshQueue.indexOf(view.poolIndex) < 0) {
				this.shareActiveViews.push(view);
			}
		}

		return this.shareActiveViews;
	};

	/* PRIVATE FUNCTIONS */

	this.cleanObject = function(obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				delete obj[prop];
			}
		}
		return obj;
	};

	this.createNewView = function(opts) {
		var view = new this.ctor(opts);
		view.poolIndex = this.views.length;
		return view;
	};

	this.applyOpts = function(view, opts) {
		for (var prop in opts) {
			if (prop in view.style) {
				view.style[prop] = opts[prop];
			}
		}
	};
});
