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

import .AbstractGenerator;

/**
 * Generates levels for survival-ville
 */
var SurvivalGenerator = exports = Class(AbstractGenerator, function(supr){

	// base difficulty progression
	// difficulty rests mostly with the percent array
	// there are many parameters that can be used to determine a level's difficulty. However, to make a reasonable
	// survival-ville the biggest factor in determing difficulty is the ratio of blobs to other blobs and empty spaces.
	
	// more difficult, but slower solutions
	// { moves: 3, percent: [1.4, 0.5, 0.5, 0.7], solutionsMin: 20, solutionsMax: 1500, depth: 5, mirror: false }, // third blob
	// { moves: 3, percent: [1.4, 0.7, 0.7, 1.0], solutionsMin: 50, solutionsMax: 1000, depth: 10, mirror: false }, 
	// { moves: 3, percent: [1.4, 0.7, 0.7, 0.8, 0, 0.8], solutionsMin: 50, solutionsMax: 500, depth: 10, mirror: false }, // wall

	var difficulty_states = [
		{ moves: 1, percent: [1, 0.3], solutionsMin: 5, solutionsMax: Number.MAX_VALUE, depth: 1, mirror: false },
		{ moves: 2, percent: [2, 0.5, 0.5], solutionsMin: 5, solutionsMax: Number.MAX_VALUE, depth: 5, mirror: false },
		{ moves: 3, percent: [1.4, 0.7, 0.5, 0.6], solutionsMin: 20, solutionsMax: 1500, depth: 5, mirror: false }, // third blob
		{ moves: 3, percent: [1.4, 0.8, 0.8, 0.9], solutionsMin: 50, solutionsMax: 1000, depth: 10, mirror: false }, 
		{ moves: 3, percent: [1.4, 0.8, 0.9, 0.8, 0, 0.5], solutionsMin: 50, solutionsMax: 500, depth: 10, mirror: false }, // wall
		{ moves: 3, percent: [3, 1, 1, 2, 0, 0.8], solutionsMin: 25, solutionsMax: 500, depth: 15, mirror: true }, // mirror
		{ moves: 3, percent: [3, 0.4, 2, 2, 0, 1], solutionsMin: 1, solutionsMax: 150, depth: 20, mirror: true },
		{ moves: 3, percent: [3, 0.5, 1.7, 2.2, 0, 1.5], solutionsMin: 1, solutionsMax: 30, depth: 20, mirror: true },
		{ moves: 3, percent: [1.4, 0.5, 0.5, 0.7], solutionsMin: 20, solutionsMax: 1500, depth: 5, mirror: false },
		{ moves: 3, percent: [3.5, 0, 1.6, 2.2, 0, 1.8], solutionsMin: 1, solutionsMax: 1000, depth: 20, mirror: true }
	];


	this.init = function(opts) {
		supr(this, "init", opts);
	};


	this.reset = function() {
		this.levelCount = 0;

		supr(this, "reset");	
	};


	/**
	 * Logic could be as complex as we want. Could even add some randomness to the difficulty
	 * states.
	 */
	this.getPlayableLevel = function(cb) {
		var
			that = this,
			difficulty = this.levelCount <= 7 ? this.levelCount : 
							 this.levelCount > 7 && this.levelCount <= 8 ? 7 : 
							 	 this.levelCount > 8 && this.levelCount <= 10 ? 8 : 9;
		
		// set timeout position
		solve();

		function solve() {
			var 
				args = arguments,
				data, 
				difficulty_state = difficulty_states[difficulty];
			
			that.generateLevel(difficulty_states[difficulty], function(level){
				data = ( level != null ) ? level[0] : null;

				if ( level == null ) { //|| !(data && data.movesUsed >= 1 && data.solutions >= difficulty_state.solutionsMin && data.solutions <= difficulty_state.solutionsMax && data.minDepth >= difficulty_state.depth) ) {
					// set timeout position
					args.callee();
					return;
				}

				if ( that.levelCount === 0 ) {
					level[0].tutorial = ["How many levels can you survive?"];	
				}

				that.levelCount++;
				
				cb(level);
		
			});

		}
		
	};

});
