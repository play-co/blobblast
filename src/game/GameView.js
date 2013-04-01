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

import AudioManager;
import animate;
import device;
import ui.View as View;
import ui.TextView as TextView;
import ui.ImageView as ImageView;
import ui.SpriteView as SpriteView;

import src.game.GameModel as GameModel;
import src.util.Data as Data;
import src.util.ViewPool as ViewPool;
import src.config.conf as config.conf;

var BG_WIDTH = 320,
	BG_HEIGHT = 416,
	MIRROR_PADDING = 50,
	MIRROR_PIECE = 24;

// unique identifier for each game
var gameID = 0;

/**
 * GameView module
 */
exports = Class(View, function(supr) {

	this.init = function(opts) {
		opts.x = 0;
		opts.y = 0;
		opts.width = BG_WIDTH;
		opts.height = BG_HEIGHT;

		supr(this, "init", [opts]);

		this.hexViews = [];
		this.parent = opts.parent;

		this.designView();
		this.resetView(opts);
	};

	this.designView = function() {
		// build mirror frame: avoid overdraw by breaking the image into pieces
		// and reconstructing them onto a parent view
		this.mirrorBorder = new View({
			parent: this,
			x: 0,
			y: 0,
			anchorX: BG_WIDTH / 2,
			anchorY: BG_HEIGHT / 2,
			width: BG_WIDTH,
			height: BG_HEIGHT,
			visible: false,
			canHandleEvents: false
		});
		// mirror top
		new ImageView({
			parent: this.mirrorBorder,
			x: 0,
			y: 0,
			width: BG_WIDTH,
			height: MIRROR_PIECE,
			image: 'resources/images/backgrounds/mirror_top.png',
			canHandleEvents: false
		});
		// mirror bottom
		new ImageView({
			parent: this.mirrorBorder,
			x: 0,
			y: BG_HEIGHT - MIRROR_PIECE,
			width: BG_WIDTH,
			height: MIRROR_PIECE,
			image: 'resources/images/backgrounds/mirror_bottom.png',
			canHandleEvents: false
		});
		// mirror left
		new ImageView({
			parent: this.mirrorBorder,
			x: 0,
			y: MIRROR_PIECE,
			width: MIRROR_PIECE,
			height: BG_HEIGHT - 2 * MIRROR_PIECE,
			image: 'resources/images/backgrounds/mirror_left.png',
			canHandleEvents: false
		});
		// mirror right
		new ImageView({
			parent: this.mirrorBorder,
			x: BG_WIDTH - MIRROR_PIECE,
			y: MIRROR_PIECE,
			width: MIRROR_PIECE,
			height: BG_HEIGHT - 2 * MIRROR_PIECE,
			image: 'resources/images/backgrounds/mirror_right.png',
			canHandleEvents: false
		});

		for (var row = 0; row < 7; row++) {
			var hexRow = this.hexViews[row] = [];
			for (var col = 0; col < 9; col++) {
				hexRow[col] = new Hex({
					parent: this,
					row: row,
					pos: col,
					state: false
				});
			}
		}

		this.levelText = new TextView({
			parent: this,
			x: 15,
			y: 363,
			width: 250,
			height: 25,
			text: "",
			textAlign: 'left',
			fontFamily: "LuckiestGuyRegular",
			size: 18,
			color: 'white',
			strokeStyle: 'black',
			lineWidth: 2
		});

		// draw hint screen
		this.hintBtn = new ImageView({
			parent: this,
			x: 185,
			y: 376,
			width: 60,
			height: 29,
			image: "resources/images/buttons/red_button.png"
		});
		this.hintBtnText = new TextView({
			parent: this.hintBtn,
			x: 0,
			y: 0,
			width: 60,
			height: 29,
			text: "Hint",
			fontFamily: "LuckiestGuyRegular",
			size: 16,
			strokeStyle: 'white',
			lineWidth: 1.5,
			canHandleEvents: false
		});

		this.movesText = new TextView({
			parent: this,
			x: 15,
			y: 383,
			width: 250,
			height: 25,
			text: "",
			textAlign: 'left',
			fontFamily: "LuckiestGuyRegular",
			size: 18,
			color: 'white',
			strokeStyle: 'black',
			lineWidth: 2
		});

		this.menuBtn = new ImageView({
			parent: this,
			x: 247,
			y: 376,
			width: 70,
			height: 29,
			image: "resources/images/buttons/orange_button.png"
		});
		this.menuBtnText = new TextView({
			parent: this.menuBtn,
			x: 0,
			y: 0,
			width: 70,
			height: 29,
			text: "Menu",
			fontFamily: "LuckiestGuyRegular",
			size: 16,
			strokeStyle: 'white',
			lineWidth: 1.5,
			canHandleEvents: false
		});
		this.menuBtn.onInputSelect = bind(this, 'menuSelect');

		this.hintView = new Hint(this);
		this.tutorialView = new Tutorial(this);

		this.shardPool = new ViewPool({
			ctor: Shard,
			initCount: 100,
			initOpts: {
				parent: this
			}
		});
	};

	this.resetView = function(opts) {
		var data = opts.level.shift();

		this.gameID = ++gameID;
		this.moves = data.moves;
		this.won = false;
		this.targetedShards = 0;
		this.lastPop = 0;
		this.mirror = data.mirror;
		this.level = opts.level;
		this.levelNum = opts.levelNum;
		this.levelTotal = opts.levelTotal;
		this.map = [];
		this.hintArr = data.hint;
		this.hint = opts.hint && this.hintArr;
		this.tutorial = data.tutorial;

		this.mirrorBorder.style.scale = 1.2;

		this.level.forEach(function(list, row) {
			var hexRow = this.hexViews[row];
			this.map[row] = list.map(function(state, pos) {
				var hex = hexRow[pos];
				if (state) {
					hex.resetBlob({
						row: row,
						pos: pos,
						state: state
					});
				} else {
					hex.hideBlob();
				}

				return state ? hex : null;
			}, this);
		}, this);

		// release any remaining shards from last game
		this.shardPool.releaseAllViews();

		this.model = new GameModel({
			map: opts.level,
			mirror: data.mirror
		});

		if (!this.mirror) {
			this.mirrorBorder.style.visible = false;
		}

		var levelText = "level ";
		if (this.parent.world === 'survival-ville') {
			levelText += (this.levelNum + 1);
			this.hintBtn.style.visible = true;
			var hintCount = +Data.getItem('hints');
			if (hintCount > 0) {
				this.hintBtn.setImage("resources/images/buttons/red_button.png");
				this.hintBtn.onInputSelect = bind(this, 'useHint');
			} else {
				this.hintBtn.setImage("resources/images/buttons/black_button.png");
				this.hintBtn.onInputSelect = undefined;
			}
		} else {
			levelText += (this.levelNum + 1) + " out of " + this.levelTotal;
			this.hintBtn.style.visible = false;
		}

		this.levelText.setText(levelText);
		this.movesText.setText("moves left = " + this.moves);

		if (this.tutorial) {
			this.tutorialView.showTutorial();
		}

		if (this.hint) {
			this.hintView.showHint();
		}
	};

	this.constructView = function() {
		if (this.mirror) {
			this.mirrorBorder.style.visible = true;
			this.mirrorBorder.style.opacity = 1;
			this.mirrorBorder.style.scale = 1.16;
			animate(this.mirrorBorder)
			.now({ scale: 1 }, 700, animate.easeIn)
			.then({ scale: 1.04 }, 150, animate.easeOut)
			.then({ scale: 1 }, 150, animate.easeIn);
		}
	};

	this.update = function(chain, root) {
		root && (this.won = chain.won);

		this.map[chain.row][chain.pos].blast();
		if (chain.shards.length) {
			chain.shards.forEach(function(shard) {
				var shardView = this.shardPool.obtainView(this.shardPool.obtainObject());
				shardView.gameID = this.gameID;
				shardView.reset(shard);
				shardView.shoot();
				this.targetedShards += !!shard.chain;
			}, this);

			if (!this.targetedShards) {
				this.checkStatus();
			}
		} else if (root) {
			this.checkStatus();
		}
	};

	this.menuSelect = function() {
		this.parent.end('abort');
	};

	this.checkStatus = function() {
		if (this.won || !this.moves) {
			this.publish('end');
			this.parent.end(this.won ? "win" : "loss");
		}
	};

	this.getCoords = function(row, pos) {
		var w = config.conf['grid_square_width'],
			h = config.conf['grid_square_height'];
		return {
			x: 27 + pos / 2 * w + w / 2,
			y: 53 + row * h + h / 2
		};
	};

	this.useHint = function() {
		var worlds = Data.getItem("worlds"),
			world = this.parent.world,
			levels = worlds[world];

		this.hint = merge([], this.hintArr);
		this.hintView.showHint();

		var hints = Data.getItem("hints") - 1;
		Data.setItem("hints", hints);

		if (hints > 0) {
			this.hintBtn.setImage("resources/images/buttons/red_button.png");
			this.hintBtn.onInputSelect = bind(this, 'useHint');
		} else {
			this.hintBtn.setImage("resources/images/buttons/black_button.png");
			this.hintBtn.onInputSelect = undefined;
		}
	};
});



var Hex = Class(SpriteView, function(supr) {

	this.blobURL = "resources/images/blobs/blob";
	this.animations = {
		//blue idle
		'1': { url: this.blobURL, defaultAnimation: "blueIdle" },
		//blue explode
		'1->0': { url: this.blobURL, defaultAnimation: "blueExplode" },
		//green idle
		'2': { url: this.blobURL, defaultAnimation: "greenIdle" },
		//green to blue
		'2->1': { url: this.blobURL, defaultAnimation: "greenToBlue" },
		//red idle
		'3': { url: this.blobURL, defaultAnimation: "redIdle" },
		//red to green
		'3->2': { url: this.blobURL, defaultAnimation: "redToGreen" },
		//infinity idle
		'Infinity': { url: this.blobURL, defaultAnimation: "infinityIdle" },
		//infinity to infinity
		'Infinity->Infinity': { url: this.blobURL, defaultAnimation: "infinityToInfinity" }
	};

	this.init = function(opts) {
		this.parent = opts.parent;
		this.resetBlob(opts, true);

		supr(this, "init", [opts]);
	};

	this.resetBlob = function(opts, fromInit) {
		var coords = this.parent.getCoords(opts.row, opts.pos);
		opts.width = config.conf['blob_width'];
		opts.height = config.conf['blob_height'];
		opts.x = coords.x - opts.width / 2;
		opts.y = coords.y - opts.height / 2;
		opts.url = this.blobURL;
		opts.defaultAnimation = "blueIdle";
		opts.iterations = 1;
		opts.loop = false;
		opts.autoStart = true;
		opts.frameRate = 15;

		this.row = opts.row;
		this.pos = opts.pos;
		this.state = opts.state;

		if (this.state === Infinity) {
			// special positioning for infinite blob
			opts.y -= 8;
			opts.x -= 6;
			opts.width = config.conf['wall_blob_width'];
			opts.height = config.conf['wall_blob_height'];
		} else {
			// wall blobs are bigger than others, so drop them back to avoid input overlap
			opts.zIndex = 1;
		}

		if (!fromInit) {
			this.style.x = opts.x;
			this.style.y = opts.y;
			this.style.width = opts.width;
			this.style.height = opts.height;
			this.style.zIndex = opts.zIndex;
			this.style.visible = true;

			opts.defaultAnimation = this.animations[this.state].defaultAnimation;
			opts.callback = bind(this, 'idle');
			this.resetAllAnimations(opts);
			this.pause();
			this.queueIdleAnim();
			this.style.visible = true;
		}
	};

	this.hideBlob = function() {
		this.stopAnimation();
		this.style.visible = false;
	};

	this.idle = function() {
		var anim = this.animations[this.state];
		this.startAnimation(anim.defaultAnimation, {
			iterations: 1,
			callback: bind(this, 'idle')
		});
		this.pause();
		this.queueIdleAnim();
		this.style.visible = true;
	};

	this.queueIdleAnim = function() {
		this.tid = setTimeout(bind(this, function() {
			this.resume();
		}), Math.random() * 8000);
	};

	this.blast = function() {
		if (--this.state) {
			var anim = this.animations[(this.state + 1) + '->' + (this.state)];
			this.stopAnimation();
			this.startAnimation(anim.defaultAnimation, {
				iterations: 1,
				callback: bind(this, 'idle')
			});
		} else {
			var anim = this.animations['1->0'];
			this.stopAnimation();
			this.startAnimation(anim.defaultAnimation, {
				iterations: 1,
				callback: bind(this, function() {
					this.parent.map[this.row][this.pos] = null;
					this.hideBlob();
				})
			});

			if (Date.now() - this.parent.lastPop > 100) {
				this.parent.lastPop = Date.now();
				GC.app.audioManager.play('pop');
			}

			this.publish("blast");
			this.parent.publish("blast");
		}
	};

	this.onInputSelect = function() {
		if (this.state === Infinity) {
			return;
		}

		if (!this.parent.targetedShards && this.parent.moves) {
			this.parent.movesText.setText("moves left = " + --this.parent.moves);
			this.parent.update(this.parent.model.select(this.row, this.pos), true);
		}

		this.publish("touch");
		this.parent.publish("touch");
	};
});



var Shard = Class(ImageView, function(supr) {

	var SHARD_WIDTH = 24,
		SHARD_HEIGHT = 12,
		endDist = -15,
		mirrorDist = 15;

	this.init = function(opts) {
		opts.x = 0;
		opts.y = 0;
		opts.anchorX = SHARD_WIDTH / 2;
		opts.anchorY = SHARD_HEIGHT / 2;
		opts.width = SHARD_WIDTH;
		opts.height = SHARD_HEIGHT;
		opts.image = "resources/images/blobs/shard.png";
		opts.zIndex = 1;

		this.parent = opts.parent;

		supr(this, "init", arguments);
	};

	this.reset = function(data) {
		var start = data.shift(),
			coords = this.parent.getCoords(start.row, start.pos);

		this.style.x = coords.x - 12;
		this.style.y = coords.y - 12;
		this.list = data;
	};

	this.shoot = function() {
		var cur = this.list.shift();
		this.chain = this.list.chain;
		this.style.r = cur.deg * (Math.PI / 180);

		var endDist = this.parent.mirror && cur.bounced === undefined ? 15 : -15;
		var origTarget = this.parent.getCoords(cur.row, cur.pos);

		var dx = origTarget.x - this.style.x,
			dy = origTarget.y - this.style.y,
			duration = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / 160;

		var target = { x: origTarget.x, y: origTarget.y };
		target.x = Math.max(endDist, Math.min(BG_WIDTH - endDist, target.x));
		target.y = Math.max(endDist, Math.min(BG_HEIGHT - endDist, target.y));

		var originalDelta = {
			x: Math.abs(dx),
			y: Math.abs(dy)
		};
		var newDelta = {
			x: Math.abs(target.x - this.style.x),
			y: Math.abs(target.y - this.style.y)
		};
		var percent = Math.min(
			(newDelta.x + 1) / (originalDelta.x + 1),
			(newDelta.y + 1) / (originalDelta.y + 1)
		);

		duration *= percent;

		animate(this)
		.now({ dx: dx * percent, dy: dy * percent }, duration * 1000, animate.linear)
		.then(bind(this, function() {
			// a new game has started, this is a left over shard from an old game
			if (this.parent.gameID !== this.gameID) {
				// it will get released by resetView
				return;
			}

			if (this.list.length) {
				this.shoot();
				return;
			}

			if (this.chain) {
				this.parent.update(this.chain);

				if (!--this.parent.targetedShards) {
					this.parent.checkStatus();
				}
			}

			// clean up shards
			this.parent.shardPool.releaseView(this);
		}));
	};
});



var Tutorial = Class(function() {

	this.init = function(game) {
		this.game = game;
		this.opts = {};

		this.text = new TextView({
			parent: game,
			x: 0,
			y: 10,
			width: 250,
			height: 250,
			text: "",
			verticalAlign: 'top',
			fontFamily: "LuckiestGuyRegular",
			size: 20,
			color: 'white',
			strokeStyle: 'black',
			lineWidth: 2,
			canHandleEvents: false,
			wrap: true,
			zIndex: 2,
			visible: false
		});
	};

	this.showTutorial = function() {
		var tutorial = this.game.tutorial,
			targets;

		if (tutorial.targets !== undefined) {
			targets = tutorial.targets;
			this.opts = tutorial;
		} else {
			targets = tutorial;
		}

		// copy tutorial so that it can be re-used if game is interrupted.
		this.list = merge([], targets);
		this.text.setText(this.list.shift());

		if (this.list.length === 0) {
			// this tutorial has no targets
			this.oneTime();
		} else {
			this.next();
		}
	};

	this.next = function() {
		this.text.style.visible = true;

		var target = this.list.shift(),
			blasted = false;

		if (target && (target = this.game.map[target[0]][target[1]])) {
			(function boing() {
				if (blasted) {
					return;
				}

				animate(target)
				.wait(500)
				.then({ dy: -10 }, 200, animate.easeOut)
				.then({ dy: 10 }, 200, animate.easeIn)
				.wait(1000)
				.then(boing);
			})();

			target.subscribe(this.opts.touch ? 'touch' : 'blast', this, function() {
				blasted = true;
				this.next();
			});
		} else {
			animate(this.text)
			.now({ y: -500 }, 500, animate.easeIn)
			.then(bind(this, function() {
				this.text.style.visible = false;
			}));
		}
	};

	this.oneTime = function() {
		this.game.subscribe(this.opts.touch ? 'touch' : 'blast', this, function() {
			this.next();
		});
	};
});



var Hint = Class(function() {

	var HINT_WIDTH = 100,
		HINT_HEIGHT = 100;

	this.init = function(game) {
		this.view = game;
		this.watch = new TextView({
			parent: game,
			x: 0,
			y: -100,
			width: 250,
			height: 25,
			text: "Watch for hint...",
			verticalAlign: 'top',
			fontFamily: "LuckiestGuyRegular",
			size: 32,
			color: 'white',
			strokeStyle: "#A53813",
			zIndex: 2,
			visible: false
		});

		this.text = new TextView({
			parent: game,
			x: 0,
			y: 0,
			anchorX: HINT_WIDTH / 2,
			anchorY: HINT_HEIGHT / 2,
			width: HINT_WIDTH,
			height: HINT_HEIGHT,
			fontFamily: "LuckiestGuyRegular",
			size: 40,
			color: 'white',
			strokeStyle: "#A53813",
			zIndex: 2,
			visible: false
		});
	};

	this.showHint = function() {
		this.hint = merge([], this.view.hint);

		this.watch.style.visible = true;
		this.watch.style.opacity = 1;
		this.watch.style.y = -100;

		animate(this.watch)
		.now({ y: 150 }, 1000, animate.easeOut)
		.then({ opacity: 0 }, 1000)
		.then(bind(this, function() {
			this.watch.style.visible = false;
			this.text.style.visible = true;
			this.next(0);
		}));
	};

	this.next = function(i) {
		var text = this.text,
			loc = this.hint.shift(),
			coords = this.view.getCoords(loc[0], loc[1]);

		text.style.opacity = 0;
		text.style.scale = 1;
		text.style.x = coords.x - HINT_WIDTH / 2;
		text.style.y = coords.y - HINT_HEIGHT / 2;
		text.setText(++i);

		animate(text)
		.now({ opacity: 1 }, 1000, animate.easeIn)
		.then({ opacity: 0, scale: 2 }, 500, animate.easeIn)
		.then(bind(this, function() {
			if (this.hint.length <= 1) {
				text.style.visible = false;
			} else {
				this.next(i);
			}
		}));
	};
});
