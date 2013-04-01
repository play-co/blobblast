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
"use strict";

import src.GameModel as GameModel;

var STATELIST = {
	2: { moves: 3, percent: [3, 0.5, 1.7, 2.2, 0, 1.5], solutionsMin: 1, solutionsMax: 1000, depth: 20, mirror: true },
	3: { moves: 3, percent: [1.4, 1, 1, 1.6], solutionsMin: 50, solutionsMax: Number.MAX_VALUE, depth: 25, mirror: false },
	4: { moves: 3, percent: [1.4, 1, 1, 1.6, 1], solutionsMin: 25, solutionsMax: Number.MAX_VAUE, depth: 25, mirror: false }
}, STATE;

function generate() {
	var level = [{ moves: STATE.moves, mirror: STATE.mirror }];
	
	console.log("Generating level...");
	
	for (var row = 0; row < 7; row++) {
		var arr = [];
		
		for (var pos = 0; pos < 9; pos++) {
			var state = 0, highestWeight = 0;
			
			if ( (pos % 2) !== (row % 2) ) {
				arr.push(null);
				continue;
			}
			
			STATE.percent.forEach(function(n, i){
				var weight = Math.random() * n;
				if (weight > highestWeight) {
					highestWeight = weight;
					state = i === 5 ? Infinity : i;
				}
			});
			
			arr.push(state);
		}
		
		level.push(arr);
	}
	
	return level;
}

var Solver = Class(function(){
	this.init = function(opts){
		this.level = opts.level;
		this.moves = opts.moves;
		this.mirror = opts.mirror;
		
		this.solutions = 0;
		this.extraMoves = 0;
		this.minDepth = Infinity;
		this.hint = [];
	};
	
	this.run = function(){
		
		var time = Date.now();
		this.solve(this.level, this.moves, 0, []);
		time = Date.now() - time;
		
		if (this.solutions) {
			console.log(
				"Done! Level solved with", this.extraMoves,
				"extra moves left and", this.solutions,
				"possible solutions, with a minimum depth of " + this.minDepth + "! (" + time + " ms)"
			);
			
			return {
				movesLeft: this.extraMoves,
				movesUsed: this.moves - this.extraMoves,
				mirror: this.mirror,
				solutions: this.solutions,
				minDepth: this.minDepth,
				hint: this.hint.reverse()
			};
		} else {
			console.log("Done! Took", time, "ms, couldn't solve the level :(");
			
			return false;
		}
	};
	
	this.solve = function(map, baseMoves, baseDepth, baseSequence){
		map.forEach(function(list, row){		
			list.forEach(function(hex, pos){
				if (hex) {
					var model = new GameModel({
						map: map.map(function(list){
							return merge([], list);
						}),
						mirror: this.mirror
					});
				
					var chain = model.select(row, pos),
						moves = baseMoves - 1,
						depth = baseDepth + chain.steps,
						sequence = [[row, pos]].concat(baseSequence);
					
					if (chain.won) {
						this.solutions++;
						this.extraMoves = Math.max(moves, this.extraMoves);
						this.minDepth = Math.min(depth, this.minDepth);
						moves === this.extraMoves && (this.hint = sequence);
					} else if (moves) {
						this.solve(model.map, moves, depth, sequence);
					}
				}
			}, this);
		}, this);
	};
});

exports = function(amount, maxstate){
	var list = [], bad = 0, time = Date.now(), k, j, row;
	
	console.log("Launching...");
	console.log("Going to generate", amount, "levels, with states no higher than " + maxstate + ".");
	console.log("Ready, set, GO!");
	
	STATE = STATELIST[maxstate];
	
	while (list.length < amount) {
		console.log();
		
		var level = generate(), data = level.shift();
		
		var result = (new Solver({
			level: level,
			moves: data.moves,
			mirror: data.mirror
		})).run();
		
		result && console.log(JSON.stringify(level));
		
		if (result && result.movesUsed > 1 && result.solutions >= STATE.solutionsMin && result.solutions <= STATE.solutionsMax && result.minDepth >= STATE.depth) {
			level.unshift({
				moves: result.movesUsed,
				hint: result.hint
			});
			
			// replace Infinity with I for display
			for ( k = 1; k <= 7; k++ ) {
				row = level[k];
				for ( j = 0; j < row.length; j++ ) {
					if ( row[j] === Infinity ) {
						row[j] = 'I';
					}
				}
			}
			
			// good information to have in levels.js
			level[0].mirror = result.mirror;
			level[0].solutions = result.solutions;
			
			list.push(level);
		
			console.log('*************************************************');
			console.log();
			console.log('adding level');
			console.log();
			console.log('*************************************************');
		} else {
			bad++;
		}
	}
	
	time = Date.now() - time;
	
	console.log();
	console.log("All done! Generated", list.length, "satisfactory and", bad, "unsatisfactory levels in", (time / 1000), "seconds.");
	console.log();
	console.log(JSON.stringify(list).replace(/"/g, "").replace(/null/g, "x"));
};
