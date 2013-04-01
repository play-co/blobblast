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

import lib.PubSub;

import src.game.GameModel as GameModel;

/**
 * Serves as a base class for generators.
 * Not meant to be used stand alone.
 * Based off of generator.js
 */
var AbstractGenerator = exports = Class(lib.PubSub, function(){

	var default_difficulty_state = { moves: 1, percent: [1, 1], solutionsMin: 1, solutionsMax: Number.MAX_VALUE, depth: 1, mirror: false };

	this.init = function(opts) {

		this.MAX_QUEUE_SIZE = 3;

		this.level_queue = [];
		this.generating_queue = [];
		this.timeout = 0;

		this.last = null;
		
		this.levelCount = 0;
	};


	/**
	 * consistently generate levels during game play to avoid
	 * downtime.
	 * @param opts - options {
	 * 	level - current level
	 *	fillCount - number of levels to generate
	 * }
	 * @param fillCount - number of levels to generate
	 */
	this.start = function(opts) {
		var 
			that = this,
			num_generating = 0,
			fillCount = opts.fillCount !== undefined ? opts.fillCount : this.MAX_QUEUE_SIZE,
			startTime = (new Date()).getTime();
		
		this.levelCount = this.levelPos = opts.level != null ? opts.level : this.levelCount;
		
		// try to generate a new level every 1 second
		this.timeout = setTimeout(function(){
			var args = arguments;
			
			// if we are generating too many levels at once, or we already have more than enough levels
			// just return
			if ( that.level_queue.length > fillCount || that.level_queue.length > that.MAX_QUEUE_SIZE ) {
				/*GC.track({
					name: 'finish_level_generation',
					category: 'game_play',
					subcategory: 'survival-ville',
					int1: (new Date()).getTime() - startTime
				});*/
				
				that.publish("fullQueue");
				return;
			}

			num_generating++;

			that.getPlayableLevel(function(level) {
				that.level_queue.push(level);
				
				num_generating--;
				
				// set timeout position
				args.callee();
			});
			
		}, 50);

	};


	this.stop = function() {
		clearTimeout(this.timeout);
	};


	this.next = function(levelPos) {
		
		if ( levelPos === this.levelPos && this.last != null ) {
			return this.last;
		}

		this.levelPos++;
		
		// return next if immediately available
		if ( this.level_queue.length > 0 ) {
			this.last = this.level_queue.shift();
			return this.last;
		}
	
		this.start({
			fillCount: 0	
		});
		
		return null;
	};


	this.reset = function() {
		this.level_queue = [];	
	};


	/**
	 * Placeholder method to implement difficulty
	 * logic. Should be overriden by subclasses.
	 * @param cb - callback
	 */
	this.getPlayableLevel = function(cb) {
		return this.generateLevel(default_difficulty_state);	
	};


	/**
	 * Generates a solvable level.
	 * @difficulty - difficulty state
	 */
	this.generateLevel = function(difficulty, cb) {
		var 
			level, 
			data;
	
		// doesn't take too long
		level = this.generateRandom(difficulty);
		
		data = {
			moves: difficulty.moves,
			mirror: difficulty.mirror,
			extraMoves: 0,
			minDepth: Infinity,
			hint: [],
			solutions: 0		
		};

		// time sink
		this.solve(level, difficulty.moves, 0, [], data);
		
		if ( data.solutions !== 0 ) {
			// level was solved
			data.movesLeft = data.extraMoves;
			data.movesUsed = data.moves - data.extraMoves;
			data.hint = data.hint.reverse();

			level.unshift(data);

			cb(level);
			return;
		}
		
		cb(null);
	};


	/**
	 * Solves a level by recursing down every possible path
	 * @param map - level
	 * @param baseMoves - number of moves left
	 * @param baseDepth - depth in graph
	 * @param baseSequence - path taken
	 * @param data - data object that holds answers for this solution
	 */
	this.solve = function(map, baseMoves, baseDepth, baseSequence, data) {
		map.forEach(function(list, row){		
			list.forEach(function(hex, pos){
			
				// in the interest of speed we only look for a single solution to
				// the level and then return. See comments in SurvivalGenerator for
				// more details.
				if ( data.solutions !== 0 ) {
					return;	
				}

				if (hex) {
					
					var model = new GameModel({
						map: map.map(function(list){
							return merge([], list);
						}),
						mirror: data.mirror
					});
				
					var chain = model.select(row, pos),
						moves = baseMoves - 1,
						depth = baseDepth + chain.steps,
						sequence = [[row, pos]].concat(baseSequence);
					
					if (chain.won) {
						data.solutions++;
						data.extraMoves = Math.max(moves, data.extraMoves);
						data.minDepth = Math.min(depth, data.minDepth);
						moves === data.extraMoves && (data.hint = sequence);
					} else if (moves) {
						this.solve(model.map, moves, depth, sequence, data);
					}
				}
			}, this);
		}, this);
	};	

	
	/**
	 * Generates a random level with specified states. Could be
	 * solvable, could not be. It's just random.
	 */
	this.generateRandom = function(difficulty) {
		var level = [], rowArr, row, pos, state, highestWeight;

		for ( row = 0; row < 7; row++ ) {
			rowArr = [];

			for ( pos = 0; pos < 9; pos++ ) {
				state = 0;
				highestWeight = 0;

				if ( (pos % 2) !== (row % 2) ) {
					rowArr.push(null);
					continue;
				}

				difficulty.percent.forEach(function(n, i) {
					var weight = Math.random() * n;
					if ( weight > highestWeight ) {
						highestWeight = weight;
						state = i === 5 ? Infinity : i;
					}
				});

				rowArr.push(state);
			}

			level.push(rowArr);

		}

		return level;
	};

});
