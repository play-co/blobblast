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

var I = Infinity;
var x = null;

exports.list = ["newb-ville", "user-ville", "super-ville", "survival-ville"];

exports["newb-ville"] = [
	[
		{
			moves: 1,
			hint: [[2,4]],
			tutorial: ["Touch the blue blob!", [2,4]]
		},
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,1,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x]
	], [
		{
			moves: 1,
			hint: [[0,0], [0,0]],
			tutorial: ["Chain blasts together!", [3,5]]
		},
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,1,x,x,x,x,x],
		[x,x,x,x,1,x,x,x,x],
		[x,x,x,x,x,1,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x]
	], [
		{
			moves: 1,
			hint: [[0,0], [0,0]]
		},
		[x,x,x,x,1,x,x,x,x],
		[x,x,x,1,x,1,x,x,x],
		[x,x,1,x,1,x,1,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,1,x,1,x,1,x,x],
		[x,x,x,1,x,1,x,x,x],
		[x,x,x,x,1,x,x,x,x]
	], [
		{
			moves: 1,
			hint: [[0,0], [0,0]]
		},
		[1,x,x,x,x,x,x,x,1],
		[x,1,x,x,x,x,x,1,x],
		[x,x,1,x,x,x,1,x,x],
		[x,x,x,1,x,1,x,x,x],
		[x,x,x,x,1,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x]
	], [
		{
			moves: 2,
			hint: [[0,0], [0,0]],
			tutorial: ["Touch the green blob twice!", [2,4]]
		},
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,2,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x]
	], [
		{
			moves: 1,
			hint: [[3,5], [0,0]],
			tutorial: ["Use chaining to blast the green blobs in one touch!", [3,5]]
		},
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,1,x,2,x,x,x],
		[x,x,x,x,1,x,x,x,x],
		[x,x,x,2,x,1,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x]
	], [
		{
			moves: 2,
			hint: [[0,4], [0,0]]
		},
		[x,x,x,x,1,x,x,x,x],
		[x,x,x,1,x,1,x,x,x],
		[x,x,2,x,2,x,2,x,x],
		[x,2,x,x,x,x,x,2,x],
		[1,x,x,x,2,x,x,x,1],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x]
	], [
		{
			moves: 2,
			hint: [[3,3], [0,0]]
		},
		[x,x,x,x,2,x,x,x,x],
		[x,1,x,x,x,x,x,1,x],
		[1,x,x,x,x,x,x,x,1],
		[x,x,x,2,x,2,x,x,x],
		[1,x,x,x,x,x,x,x,1],
		[x,1,x,x,x,x,x,1,x],
		[x,x,x,x,2,x,x,x,x]
	], [
		{
			moves: 3,
			hint: [[0,0], [0,0]],
			tutorial: ["That red blob is tough!\nTouch it three times.", [2,4]]
		},
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,3,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x]
	], [
		{
			moves: 2,
			hint: [[4,2], [0,0]],
			tutorial: ["Use chaining to blast\nall the blobs!", [2,2], [3,5]]
		},
		[1,x,x,x,x,x,x,x,1],
		[x,2,x,x,x,x,x,x,x],
		[x,x,1,x,x,x,1,x,x],
		[x,x,x,3,x,3,x,x,x],
		[x,x,1,x,x,x,1,x,x],
		[x,x,x,x,x,x,x,2,x],
		[1,x,x,x,x,x,x,x,1]
	], [
		{
			moves: 2,
			hint: [[3,1], [0,0]]
		},
		[x,x,x,x,2,x,x,x,x],
		[x,1,x,x,x,x,x,1,x],
		[2,x,x,x,x,x,x,x,2],
		[x,1,x,3,x,3,x,1,x],
		[2,x,x,x,x,x,x,x,2],
		[x,1,x,x,x,x,x,1,x],
		[x,x,x,x,2,x,x,x,x]
	], [
		{
			moves: 2,
			hint: [[0,0], [0,0]]
		},
		[1,x,1,x,x,x,1,x,1],
		[x,3,x,x,x,x,x,3,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,3,x,x,x,x,x,3,x],
		[1,x,1,x,x,x,1,x,1]
	]
];

exports["user-ville"] = [
	[
		{
			moves: 2,
			hint: [[0, 0], [4, 4]]
		},
		[1,x,x,x,x,x,x,x,1],
		[x,x,x,x,x,x,x,x,x],
		[x,x,3,x,x,x,2,x,x],
		[x,1,x,x,x,x,x,2,x],
		[x,x,x,x,1,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x]
	], [
		{
			moves: 3,
			hint: [[5,7], [5,1], [1,7]]
		},
		[2,x,0,x,1,x,0,x,1],
		[x,0,x,0,x,0,x,1,x],
		[0,x,0,x,3,x,0,x,0],
		[x,0,x,0,x,0,x,0,x],
		[0,x,0,x,2,x,0,x,0],
		[x,2,x,0,x,0,x,1,x],
		[0,x,0,x,0,x,0,x,1]
	], [
		{
			moves: 3,
			hint: [[6,0], [3,5], [2,8]]
		},
		[0,x,2,x,0,x,0,x,0],
		[x,2,x,0,x,0,x,1,x],
		[2,x,0,x,0,x,3,x,1],
		[x,3,x,0,x,1,x,0,x],
		[1,x,0,x,0,x,0,x,3],
		[x,0,x,0,x,3,x,1,x],
		[2,x,0,x,1,x,0,x,0]
	], [
		{
			moves: 2,
			hint: [[5,3], [0,6]]
		},
		[0,x,1,x,0,x,1,x,0],
		[x,0,x,0,x,0,x,0,x],
		[0,x,0,x,2,x,0,x,0],
		[x,1,x,0,x,0,x,1,x],
		[0,x,0,x,1,x,0,x,2],
		[x,0,x,1,x,0,x,0,x],
		[2,x,0,x,0,x,0,x,1]
	], [
		{
			moves: 3,
			hint: [[4,8], [4,4], [1,5]]
		},
		[1,x,2,x,0,x,0,x,0],
		[x,0,x,0,x,2,x,0,x],
		[0,x,0,x,0,x,0,x,0],
		[x,2,x,0,x,0,x,0,x],
		[1,x,0,x,2,x,0,x,1],
		[x,0,x,3,x,2,x,3,x],
		[0,x,0,x,1,x,0,x,0]
	], [ // Medium - Hard
		{
			moves: 3,
			hint: [[6,8], [5,3], [4,4]],
			tutorial: ["It's simpler than it looks!"]
		},
		[2,x,0,x,2,x,3,x,0],
		[x,3,x,0,x,3,x,3,x],
		[3,x,3,x,3,x,3,x,0],
		[x,3,x,2,x,0,x,3,x],
		[3,x,3,x,3,x,3,x,0],
		[x,0,x,1,x,0,x,3,x],
		[2,x,3,x,1,x,0,x,2]
	], [
		{
			moves: 2,
			hint: [[5,3], [5,3]]
		},
		[3,x,3,x,1,x,1,x,0],
		[x,3,x,0,x,3,x,3,x],
		[1,x,0,x,3,x,3,x,3],
		[x,0,x,1,x,3,x,1,x],
		[2,x,0,x,0,x,0,x,0],
		[x,0,x,2,x,0,x,0,x],
		[3,x,1,x,3,x,0,x,3]
	], [
		{
			moves: 3,
			hint: [[5,3], [3,7], [3,1]]
		},
		[3,x,0,x,0,x,0,x,2],
		[x,0,x,1,x,2,x,0,x],
		[1,x,1,x,0,x,0,x,0],
		[x,1,x,0,x,2,x,3,x],
		[0,x,3,x,0,x,0,x,0],
		[x,1,x,2,x,0,x,0,x],
		[3,x,0,x,0,x,2,x,0]
	], [
		{
			moves: 3,
			hint: [[2,4], [2,4], [0,8]]
		},
		[2,x,0,x,0,x,0,x,2],
		[x,0,x,2,x,1,x,0,x],
		[2,x,2,x,2,x,0,x,2],
		[x,2,x,0,x,0,x,0,x],
		[2,x,0,x,0,x,2,x,2],
		[x,0,x,0,x,0,x,0,x],
		[0,x,1,x,0,x,0,x,0]
	], [ // Difficult
		{
			moves: 3,
			hint: [[6,8], [5,3], [3,7]]
		},
		[2,x,1,x,3,x,3,x,2],
		[x,2,x,0,x,0,x,2,x],
		[0,x,0,x,0,x,2,x,3],
		[x,0,x,0,x,0,x,1,x],
		[0,x,0,x,0,x,0,x,0],
		[x,2,x,1,x,2,x,0,x],
		[3,x,0,x,0,x,0,x,2]
	], [
		{
			moves: 2,
			hint: [[2,0], [0,4]]
		},
		[0,x,1,x,1,x,3,x,3],
		[x,3,x,2,x,3,x,0,x],
		[1,x,3,x,0,x,3,x,0],
		[x,3,x,3,x,3,x,3,x],
		[2,x,3,x,2,x,3,x,0],
		[x,3,x,2,x,0,x,3,x],
		[3,x,3,x,0,x,3,x,3]
	], [
		{
			moves: 3,
			hint: [[4,4], [3,5], [3,3]]
		},
		[3,x,1,x,3,x,3,x,2],
		[x,1,x,3,x,0,x,2,x],
		[0,x,0,x,0,x,3,x,1],
		[x,0,x,3,x,2,x,0,x],
		[0,x,3,x,1,x,0,x,0],
		[x,3,x,3,x,0,x,3,x],
		[0,x,3,x,0,x,3,x,1]
	], [
		{
			moves: 3,
			hint: [[5,5], [3,3], [3,3]]
		},
		[1,x,0,x,3,x,0,x,3],
		[x,2,x,0,x,0,x,0,x],
		[0,x,3,x,1,x,0,x,0],
		[x,1,x,2,x,0,x,0,x],
		[0,x,0,x,0,x,3,x,3],
		[x,0,x,2,x,3,x,3,x],
		[0,x,1,x,3,x,3,x,2]
	], [
		{
			moves: 2,
			hint: [[5,5], [5,5]]
		},
		[0,x,3,x,3,x,3,x,3],
		[x,0,x,0,x,3,x,1,x],
		[0,x,0,x,3,x,3,x,0],
		[x,0,x,2,x,0,x,3,x],
		[0,x,0,x,3,x,0,x,1],
		[x,3,x,2,x,2,x,0,x],
		[3,x,3,x,3,x,1,x,3]
	], [
		{
			moves: 2,
			hint: [[4,0], [0,2]]
		},
		[1,x,1,x,2,x,0,x,0],
		[x,3,x,0,x,3,x,1,x],
		[3,x,2,x,3,x,3,x,3],
		[x,0,x,2,x,0,x,0,x],
		[1,x,3,x,0,x,0,x,3],
		[x,3,x,3,x,3,x,3,x],
		[3,x,3,x,3,x,3,x,3]
	], [ // level 16 - start wall blobs
		{
			moves: 2,
			hint: [[0,8], [2,6], [3,1]],
			tutorial: ["Watch out for the wall!", [3, 7]]
		},
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,1,x,x,x,I,x,1,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x]
	], [ // wall blobs - easy
		{
			moves: 3,
			hint: [[6,4], [4,0], [1,5]]
		},
		[1,x,0,x,0,x,0,x,2],
		[x,0,x,2,x,1,x,1,x],
		[0,x,0,x,2,x,3,x,0],
		[x,0,x,3,x,I,x,0,x],
		[2,x,0,x,0,x,0,x,0],
		[x,I,x,1,x,1,x,I,x],
		[1,x,0,x,1,x,3,x,1]
	], [
		{
			moves: 3,
			hint: [[6,0], [4,8], [0,4]]
		},
		[0,x,I,x,2,x,I,x,0],
		[x,3,x,0,x,0,x,0,x],
		[2,x,1,x,I,x,0,x,I],
		[x,0,x,0,x,0,x,I,x],
		[1,x,1,x,0,x,3,x,1],
		[x,0,x,0,x,0,x,I,x],
		[1,x,0,x,I,x,1,x,1]
	], [
		{
			moves: 3,
			hint: [[6,2], [3,5], [1,7]]
		},
		[1,x,I,x,1,x,0,x,0],
		[x,0,x,0,x,0,x,1,x],
		[0,x,0,x,0,x,I,x,0],
		[x,0,x,1,x,1,x,I,x],
		[1,x,3,x,0,x,0,x,0],
		[x,0,x,0,x,2,x,I,x],
		[1,x,3,x,1,x,0,x,0]
	], [
		{
			moves: 3,
			hint: [[5,5], [1,1], [1,1]]
		},
		[I,x,0,x,0,x,3,x,0],
		[x,2,x,0,x,0,x,0,x],
		[0,x,I,x,2,x,0,x,I],
		[x,0,x,0,x,1,x,1,x],
		[0,x,1,x,0,x,0,x,0],
		[x,2,x,1,x,1,x,0,x],
		[1,x,0,x,0,x,I,x,0]
	], [
		{
			moves: 3,
			hint: [[2,8], [0,2], [0,2]],
			solutions: 6
		},
		[0,x,2,x,I,x,2,x,2],
		[x,0,x,I,x,0,x,1,x],
		[0,x,2,x,2,x,1,x,1],
		[x,0,x,0,x,0,x,I,x],
		[2,x,0,x,0,x,0,x,3],
		[x,3,x,3,x,2,x,3,x],
		[0,x,0,x,1,x,3,x,0]
	], [
		{
			moves: 3,
			hint: [[5,7], [1,5], [0,2]]
		},
		[1,x,2,x,0,x,2,x,I],
		[x,0,x,I,x,2,x,0,x],
		[0,x,I,x,0,x,0,x,0],
		[x,1,x,0,x,0,x,I,x],
		[1,x,0,x,2,x,0,x,2],
		[x,2,x,1,x,0,x,1,x],
		[2,x,I,x,I,x,0,x,I]
	], [ // wall blobs - medium
		{
			moves: 3,
			hint: [[6,8], [6,4], [0,6]]
		},
		[1,x,3,x,I,x,3,x,1],
		[x,0,x,0,x,I,x,1,x],
		[1,x,3,x,0,x,1,x,0],
		[x,1,x,0,x,3,x,0,x],
		[2,x,0,x,I,x,0,x,0],
		[x,0,x,1,x,I,x,0,x],
		[0,x,1,x,1,x,3,x,3]
	], [
		{
			moves: 3,
			hint: [[6,8], [3,1], [1,7]]
		},
		[I,x,2,x,I,x,0,x,0],
		[x,0,x,0,x,I,x,1,x],
		[1,x,0,x,2,x,0,x,0],
		[x,1,x,2,x,0,x,I,x],
		[0,x,3,x,0,x,3,x,0],
		[x,3,x,0,x,0,x,0,x],
		[I,x,0,x,1,x,0,x,1]
	], [
		{ 
			moves: 3,
			hint: [[4,8], [4,2], [3,5]]
		},
		[I,x,2,x,0,x,0,x,0],
		[x,0,x,1,x,0,x,2,x],
		[0,x,1,x,0,x,0,x,0],
		[x,I,x,0,x,1,x,0,x],
		[2,x,1,x,0,x,0,x,3],
		[x,I,x,I,x,I,x,0,x],
		[1,x,0,x,0,x,1,x,2]
	], [
		{
			moves: 3,
			hint: [[6,4], [4,8], [1,3]]
		},
		[0,x,I,x,3,x,3,x,I],
		[x,0,x,3,x,3,x,2,x],
		[I,x,I,x,1,x,1,x,0],
		[x,0,x,0,x,0,x,I,x],
		[0,x,0,x,0,x,0,x,1],
		[x,0,x,1,x,1,x,I,x],
		[3,x,3,x,1,x,3,x,0]
	], [ // first level I didn't get in first try
		{
			moves: 2,
			hint: [[5,5], [1,3]]
		},
		[0,x,2,x,0,x,0,x,0],
		[x,I,x,1,x,0,x,0,x],
		[1,x,I,x,1,x,1,x,0],
		[x,0,x,I,x,0,x,0,x],
		[I,x,1,x,0,x,0,x,1],
		[x,0,x,0,x,1,x,0,x],
		[1,x,I,x,I,x,0,x,0]
	], [ // wall blobs - hard
		{
			moves: 3,
			hint: [[5,5], [5,5], [5,5]]
		},
		[1,x,0,x,3,x,1,x,I],
		[x,0,x,0,x,1,x,I,x],
		[I,x,0,x,1,x,1,x,0],
		[x,0,x,0,x,0,x,0,x],
		[0,x,3,x,1,x,0,x,1],
		[x,1,x,I,x,3,x,I,x],
		[I,x,0,x,0,x,3,x,0]
	], [
		{
			moves: 3,
			hint:[[6,4], [6,0], [0,8]]
		},
		[0,x,0,x,0,x,0,x,1],
		[x,1,x,2,x,0,x,I,x],
		[I,x,1,x,1,x,0,x,1],
		[x,0,x,1,x,0,x,0,x],
		[0,x,I,x,0,x,0,x,0],
		[x,0,x,0,x,0,x,1,x],
		[3,x,2,x,1,x,1,x,2]
	], [
		{
			moves: 3,
			hint: [[6,8], [5,1], [1,7]]
		},
		[I,x,0,x,0,x,0,x,2],
		[x,0,x,0,x,0,x,1,x],
		[1,x,2,x,1,x,2,x,I],
		[x,1,x,0,x,0,x,2,x],
		[0,x,0,x,0,x,I,x,0],
		[x,1,x,0,x,0,x,I,x],
		[0,x,0,x,0,x,0,x,1]
	], [ // Very difficult?
		{
			moves: 3,
			hint: [[6,8], [4,2], [3,7]]
		},
		[0,x,3,x,3,x,2,x,0],
		[x,0,x,0,x,0,x,0,x],
		[I,x,3,x,0,x,2,x,1],
		[x,0,x,3,x,0,x,1,x],
		[2,x,1,x,0,x,3,x,0],
		[x,I,x,0,x,1,x,0,x],
		[2,x,1,x,0,x,0,x,3]
	], [ // Very difficult too?
		{
			moves: 3,
			hint: [[6,4], [4,6], [2,6]]
		},
		[2,x,0,x,I,x,1,x,1],
		[x,1,x,0,x,0,x,0,x],
		[0,x,0,x,3,x,1,x,0],
		[x,0,x,1,x,0,x,I,x],
		[1,x,0,x,0,x,2,x,0],
		[x,0,x,0,x,0,x,3,x],
		[0,x,0,x,1,x,3,x,0]
	], [ // wall blobs - difficult
		{
			moves: 3,
			hint: [[6,0], [1,3], [1,3]]
		}, 
		[0,x,3,x,3,x,0,x,I],
		[x,I,x,2,x,0,x,0,x],
		[I,x,2,x,0,x,1,x,0],
		[x,0,x,0,x,0,x,I,x],
		[1,x,0,x,0,x,0,x,0],
		[x,1,x,0,x,2,x,0,x],
		[1,x,0,x,2,x,1,x,3]
	], [
		{
			moves: 3,
			hint: [[5,5], [3,1], [1,3]]
		},
		[0,x,2,x,3,x,0,x,0],
		[x,0,x,3,x,0,x,1,x],
		[0,x,0,x,0,x,I,x,1],
		[x,1,x,0,x,0,x,0,x],
		[3,x,0,x,1,x,0,x,2],
		[x,0,x,I,x,1,x,3,x],
		[0,x,0,x,I,x,0,x,0]
	], [
		{
			moves: 3,
			hint: [[6,2], [4,2], [4,2]],
			solutions: 39
		},
		[0,x,2,x,0,x,0,x,0],
		[x,0,x,0,x,2,x,0,x],
		[3,x,0,x,1,x,3,x,0],
		[x,3,x,0,x,3,x,0,x],
		[x,x,2,x,0,x,0,x,3],
		[x,2,x,0,x,0,x,1,x],
		[0,x,2,x,I,x,0,x,3]
	], [
		{
			moves: 3,
			hint: [[5,3],[3,3],[3,3]], 
			solutions:3
		},
		[3,x,1,x,0,x,1,x,2],
		[x,0,x,3,x,3,x,I,x],
		[0,x,1,x,3,x,0,x,2],
		[x,0,x,2,x,0,x,0,x],
		[0,x,0,x,2,x,1,x,0],
		[x,0,x,3,x,3,x,0,x],
		[3,x,0,x,0,x,I,x,2]
	]
];

exports["super-ville"] = [
	[
		{
			moves: 3,
			hint: [[4,8], [3,5], [1,1]],
			solutions: 42
		},
		[1,x,2,x,0,x,2,x,0],
		[x,1,x,3,x,2,x,0,x],
		[2,x,2,x,0,x,0,x,3],
		[x,2,x,3,x,2,x,0,x],
		[0,x,0,x,0,x,0,x,3],
		[x,3,x,0,x,2,x,0,x],
		[2,x,2,x,0,x,2,x,3]
	], [
		{
			moves: 3,
			hint: [[4,4], [4,2], [2,4]],
			solutions: 59
		},
		[0,x,3,x,3,x,3,x,3],
		[x,0,x,3,x,1,x,3,x],
		[3,x,0,x,1,x,0,x,3],
		[x,3,x,3,x,3,x,0,x],
		[3,x,1,x,3,x,3,x,0],
		[x,3,x,3,x,3,x,0,x],
		[3,x,0,x,3,x,3,x,3]
	], [ // Medium
		{
			moves: 3,
			hint: [[5,5], [5,5], [4,4]],
			solutions: 33
		},
		[3,x,0,x,0,x,2,x,2],
		[x,0,x,0,x,3,x,2,x],
		[3,x,2,x,3,x,2,x,3],
		[x,3,x,2,x,0,x,0,x],
		[0,x,2,x,2,x,0,x,3],
		[x,2,x,3,x,2,x,0,x],
		[0,x,3,x,0,x,2,x,3]
	], [ // Medium
		{
			moves: 3,
			hint: [[4,0], [2,2], [2,2]],
			solutions: 36
		},
		[3,x,0,x,2,x,0,x,3],
		[x,2,x,2,x,3,x,0,x],
		[2,x,2,x,3,x,2,x,3],
		[x,0,x,2,x,2,x,0,x],
		[2,x,0,x,0,x,3,x,2],
		[x,3,x,3,x,0,x,3,x],
		[0,x,0,x,2,x,2,x,3]
	], [ // Hard
		{
			moves:3, 
			hint: [[5,7], [4,2], [1,5]],
			solutions: 24
		},
		[0,x,0,x,1,x,3,x,3],
		[x,2,x,0,x,1,x,0,x],
		[3,x,1,x,0,x,3,x,3],
		[x,0,x,0,x,0,x,3,x],
		[2,x,3,x,0,x,3,x,3],
		[x,2,x,0,x,3,x,3,x],
		[0,x,3,x,0,x,3,x,3]
	], [ // Hard
		{
			moves: 3,
			hint: [[5,5], [5,5], [4,2]],
			solutions: 64
		},
		[3,x,3,x,2,x,3,x,0],
		[x,2,x,0,x,2,x,3,x],
		[0,x,0,x,0,x,1,x,2],
		[x,0,x,2,x,0,x,0,x],
		[1,x,2,x,0,x,3,x,3],
		[x,0,x,0,x,2,x,0,x],
		[0,x,0,x,0,x,1,x,3]
	], [ // Hard
		{
			moves: 3,
			hint: [[4,8], [3,7], [3,7]],
			solutions: 38
		},
		[0,x,1,x,2,x,2,x,0],
		[x,0,x,0,x,3,x,2,x],
		[0,x,2,x,0,x,2,x,2],
		[x,0,x,3,x,2,x,2,x],
		[1,x,0,x,0,x,3,x,2],
		[x,2,x,0,x,0,x,0,x],
		[2,x,0,x,0,x,0,x,3]
	], [ // Difficult
		{
			moves: 3,
			hint: [[4,4], [3,3], [3,3]],
			solutions: 9
		},
		[2,x,3,x,0,x,0,x,0],
		[x,3,x,3,x,0,x,0,x],
		[0,x,0,x,3,x,3,x,3],
		[x,0,x,2,x,0,x,2,x],
		[3,x,3,x,2,x,0,x,1],
		[x,2,x,2,x,3,x,2,x],
		[2,x,0,x,2,x,3,x,0]
	], [ // Hard
		{
			moves: 3,
			hint: [[5,3], [4,4], [1,5]],
			solutions: 38
		},
		[0,x,2,x,0,x,3,x,2],
		[x,3,x,3,x,3,x,3,x],
		[2,x,0,x,0,x,0,x,2],
		[x,2,x,0,x,0,x,1,x],
		[0,x,0,x,2,x,0,x,0],
		[x,0,x,1,x,2,x,0,x],
		[0,x,3,x,2,x,0,x,0]
	], [ // Difficult
		{
			moves: 3,
			hint: [[4,6], [3,5], [3,5]],
			solutions: 37
		},
		[2,x,0,x,1,x,2,x,0],
		[x,2,x,2,x,0,x,0,x],
		[3,x,3,x,3,x,0,x,1],
		[x,2,x,3,x,2,x,0,x],
		[0,x,3,x,0,x,2,x,3],
		[x,0,x,3,x,0,x,3,x],
		[0,x,3,x,3,x,2,x,3]
	], [ // Start Mirror levels 
		{
			moves: 1,
			hint: [[4,0], [4,0], [4,0]],
			mirror: true,
			tutorial: ["This is a mirror wall! It reflects your shots so you can tackle tougher puzzles. Try it out!", [3, 3]]
		},
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,2,x,x,x,x,x,x],
		[x,x,x,1,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x]
	], [
		{  // this level is easy, but only if someone gets the mirror world concept
			moves: 3,
			hint: [[4,0], [4,0], [4,0]],
			mirror: true,
			tutorial: ["Start a chain reaction!"],
			solutions: 9
		},
		[3,x,3,x,3,x,3,x,2],
		[x,3,x,2,x,3,x,3,x],
		[3,x,3,x,2,x,3,x,3],
		[x,3,x,3,x,2,x,3,x],
		[3,x,2,x,2,x,3,x,3],
		[x,0,x,3,x,3,x,3,x],
		[3,x,3,x,3,x,3,x,3]
	], [ // Medium difficulty
		{
			moves: 3,
			hint: [[4,2], [4,0], [2,2]],
			mirror: true, solutions: 10
		},
		[0,x,0,x,0,x,3,x,0],
		[x,0,x,0,x,3,x,3,x],
		[3,x,1,x,3,x,0,x,3],
		[x,0,x,0,x,0,x,3,x],
		[3,x,3,x,0,x,3,x,0],
		[x,0,x,3,x,0,x,0,x],
		[0,x,0,x,3,x,0,x,0]
	], [ // Difficult, but there are limited ways to go about it. Eventually you just guess correctly.
		{
			moves: 3,
			hint: [[6,8], [6,8], [6,2]],
			mirror: true,
			solutions: 5
		},
		[0,x,3,x,3,x,0,x,3],
		[x,3,x,3,x,0,x,0,x],
		[2,x,0,x,3,x,0,x,0],
		[x,3,x,3,x,3,x,0,x],
		[3,x,3,x,3,x,3,x,3],
		[x,2,x,0,x,3,x,0,x],
		[3,x,3,x,0,x,0,x,2]
	], [ // Pretty difficult, but doable after a couple tries.
		{
			moves: 3,
			hint: [[3,5], [3,5], [3,5]],
			mirror: true,
			solutions: 3
		},
		[3,x,3,x,3,x,0,x,0],
		[x,3,x,0,x,3,x,0,x],
		[3,x,2,x,2,x,3,x,0],
		[x,0,x,3,x,3,x,0,x],
		[0,x,0,x,3,x,0,x,3],
		[x,3,x,0,x,2,x,0,x],
		[0,x,3,x,3,x,0,x,0]
	], [ // Only a single solution, but not so hard. By now you get the strategy
		{
			moves: 3,
			hint: [[4,8], [4,8], [4,8]],
			tutorial: ["Do you notice any patterns?"],
			mirror: true,
			solutions: 1
		},
		[0,x,0,x,0,x,0,x,0],
		[x,0,x,0,x,0,x,0,x],
		[0,x,0,x,3,x,3,x,0],
		[x,0,x,3,x,0,x,0,x],
		[0,x,0,x,0,x,3,x,3],
		[x,3,x,3,x,0,x,2,x],
		[0,x,3,x,0,x,3,x,0]
	], [ // new-ish type of level
		{
			moves:3,
			hint: [[3,5], [2,8], [2,8]],
			mirror: true,
			solutions: 3
		},
		[0,x,0,x,0,x,3,x,0],
		[x,0,x,0,x,0,x,0,x],
		[0,x,0,x,0,x,0,x,2],
		[x,0,x,0,x,3,x,2,x],
		[0,x,0,x,0,x,0,x,0],
		[x,3,x,2,x,3,x,0,x],
		[3,x,0,x,0,x,0,x,0]
	], [ // Hard
		{
			moves: 3,
			hint: [[6,8], [6,8], [3,1]],
			mirror: true,
			solutions: 3
		},
		[0,x,0,x,0,x,0,x,3],
		[x,0,x,0,x,0,x,0,x],
		[0,x,0,x,3,x,0,x,2],
		[x,3,x,2,x,0,x,0,x],
		[0,x,0,x,3,x,0,x,0],
		[x,0,x,0,x,2,x,0,x],
		[0,x,3,x,0,x,2,x,2]
	], [
		{
			moves: 3,
			hint: [[2,0], [2,0], [1,3]],
			mirror: true,
			solutions: 3
		},
		[0,x,0,x,0,x,0,x,2],
		[x,0,x,3,x,3,x,3,x],
		[2,x,0,x,2,x,3,x,0],
		[x,0,x,0,x,0,x,0,x],
		[0,x,0,x,0,x,0,x,3],
		[x,3,x,0,x,3,x,0,x],
		[0,x,0,x,0,x,2,x,0]
	], [
		{
			moves: 3,
			hint: [[1,7], [1,7], [1,7]],
			mirror: true,
			solutions: 1
		},
		[2,x,0,x,2,x,0,x,0],
		[x,0,x,3,x,0,x,3,x],
		[3,x,0,x,0,x,3,x,2],
		[x,0,x,3,x,0,x,3,x],
		[3,x,0,x,0,x,0,x,0],
		[x,0,x,0,x,3,x,3,x],
		[2,x,3,x,0,x,0,x,2]
	], [
		{
			moves: 3,
			hint: [[4,0], [4,0], [2,4]],
			mirror: true,
			tutorial: ["You're doing good. How about everything at once?"],
			solutions: 9
		},
		[2,x,3,x,3,x,0,x,2],
		[x,3,x,0,x,0,x,0,x],
		[0,x,2,x,2,x,I,x,2],
		[x,3,x,0,x,3,x,0,x],
		[3,x,3,x,3,x,0,x,0],
		[x,0,x,0,x,2,x,0,x],
		[0,x,2,x,0,x,0,x,0]
	], [
		{
			moves: 3,
			hint: [[2,8], [2,8], [2,0]],
			mirror: true,
			solutions: 3
		},
		[0,x,0,x,0,x,0,x,0],
		[x,0,x,0,x,0,x,3,x],
		[3,x,I,x,I,x,2,x,2],
		[x,3,x,3,x,2,x,2,x],
		[0,x,0,x,2,x,0,x,0],
		[x,0,x,0,x,0,x,3,x],
		[0,x,3,x,0,x,0,x,2]
	], [ // keep - easy
		{
			moves: 3,
			hint: [[6,0], [6,0], [4,8]],
			mirror: true,
			solutions: 9
		},
		[0,x,0,x,0,x,2,x,I],
		[x,3,x,3,x,3,x,2,x],
		[0,x,0,x,0,x,0,x,3],
		[x,3,x,2,x,2,x,0,x],
		[3,x,2,x,2,x,I,x,3],
		[x,0,x,0,x,0,x,0,x],
		[2,x,0,x,0,x,0,x,0]
	], [ // keep - easy
		{
			moves: 3,
			hint: [[4,0], [4,0], [2,4]],
			mirror: true,
			solutions: 15
		},
		[2,x,0,x,0,x,2,x,0],
		[x,3,x,2,x,0,x,0,x],
		[3,x,0,x,3,x,I,x,2],
		[x,0,x,0,x,0,x,3,x],
		[2,x,0,x,3,x,0,x,0],
		[x,3,x,3,x,0,x,3,x],
		[3,x,I,x,3,x,3,x,0]
	], [
		{
			moves: 3,
			hint: [[6,8], [3,1], [1,3]],
			mirror: true,
			solutions: 12
		},
		[0,x,0,x,0,x,0,x,2],
		[x,0,x,3,x,0,x,0,x],
		[0,x,0,x,I,x,2,x,0],
		[x,1,x,0,x,0,x,2,x],
		[0,x,I,x,0,x,0,x,0],
		[x,I,x,2,x,2,x,3,x],
		[3,x,2,x,0,x,0,x,2]
	], [ // keep - medium
		{
			moves: 3,
			hint: [[4,8], [4,8], [4,6]], 
			mirror: true,
			solutions: 7
		},
		[3,x,0,x,0,x,3,x,0],
		[x,3,x,0,x,3,x,3,x],
		[3,x,0,x,3,x,2,x,I],
		[x,I,x,0,x,3,x,3,x],
		[3,x,3,x,2,x,3,x,2],
		[x,3,x,0,x,0,x,0,x],
		[2,x,I,x,0,x,0,x,3]
	], [ // maybe - medium
		{
			moves: 3,
			hint: [[1,7], [0,8], [0,8]],
			mirror: true,
			solutions: 6
		},
		[0,x,3,x,0,x,3,x,2],
		[x,3,x,3,x,0,x,3,x],
		[0,x,0,x,2,x,0,x,0],
		[x,0,x,0,x,0,x,0,x],
		[3,x,I,x,0,x,3,x,0],
		[x,2,x,3,x,0,x,3,x],
		[0,x,3,x,0,x,2,x,3]
	], [ // keep - medium (hard)
		{
			moves: 3,
			hint: [[4,6], [4,6], [3,7]],
			mirror: true,
			solutions: 6
		},
		[0,x,0,x,0,x,0,x,0],
		[x,0,x,0,x,3,x,I,x],
		[2,x,3,x,3,x,3,x,2],
		[x,3,x,0,x,3,x,3,x],
		[I,x,0,x,0,x,2,x,0],
		[x,3,x,0,x,0,x,0,x],
		[0,x,0,x,0,x,0,x,0]
	], [ // hard
		{
			moves: 3,
			hint: [[6,6], [6,6], [3,1]],
			mirror: true,
			solutions: 3
		},
		[0,x,3,x,0,x,0,x,0],
		[x,3,x,0,x,0,x,0,x],
		[0,x,0,x,2,x,0,x,2],
		[x,3,x,0,x,0,x,3,x],
		[0,x,I,x,0,x,2,x,3],
		[x,3,x,2,x,3,x,2,x],
		[3,x,0,x,0,x,2,x,0]
	], [ // hard
		{
			moves: 3,
			hint: [[5,5], [3,7], [5,5]],
			mirror: true,
			solutions: 3
		},
		[I,x,3,x,0,x,0,x,0],
		[x,0,x,0,x,0,x,2,x],
		[0,x,I,x,2,x,0,x,0],
		[x,0,x,I,x,3,x,3,x],
		[0,x,2,x,0,x,0,x,0],
		[x,0,x,0,x,2,x,2,x],
		[2,x,0,x,0,x,2,x,0]
	], [ // keep - hard
		{
			moves: 3,
			hint: [[6,8], [6,8], [1,7]],
			mirror: true,
			solutions: 4
		},
		[0,x,I,x,0,x,0,x,0],
		[x,2,x,2,x,0,x,3,x],
		[0,x,I,x,0,x,0,x,2],
		[x,0,x,I,x,0,x,3,x],
		[3,x,0,x,0,x,3,x,0],
		[x,2,x,3,x,2,x,I,x],[
		3,x,2,x,0,x,0,x,2]
	], [ // keep - difficult
		{
			moves: 3,
			hint: [[4,6], [4,2], [4,2]],
			mirror: true,
			solutions: 6
		},
		[0,x,0,x,2,x,3,x,3],
		[x,2,x,0,x,0,x,0,x],
		[0,x,0,x,0,x,0,x,0],
		[x,3,x,0,x,0,x,3,x],
		[0,x,2,x,0,x,3,x,2],
		[x,0,x,0,x,2,x,0,x],
		[0,x,0,x,0,x,0,x,2]
	], [ // keep - difficult
		{
			moves: 3,
			hint: [[5,5], [1,3], [1,3]],
			mirror: true,
			solutions: 3
		},
		[0,x,0,x,3,x,0,x,0],
		[x,2,x,2,x,2,x,3,x],
		[0,x,I,x,2,x,0,x,0],
		[x,3,x,3,x,I,x,0,x],
		[3,x,3,x,0,x,2,x,0],
		[x,3,x,0,x,2,x,0,x],
		[0,x,3,x,0,x,2,x,0]
	], [ // keep - difficult
		{
			moves: 3,
			hint: [[3,3], [3,3], [2,8]],
			mirror: true,
			solutions: 3
		},
		[0,x,2,x,0,x,0,x,0],
		[x,0,x,0,x,0,x,0,x],
		[0,x,0,x,3,x,0,x,3],
		[x,I,x,2,x,3,x,0,x],
		[3,x,2,x,2,x,0,x,0],
		[x,3,x,3,x,0,x,0,x],
		[3,x,3,x,0,x,0,x,0]
	], [ // difficult
		{
			moves: 3,
			hint: [[0,4], [0,0], [0,0]],
			mirror: true,
			solutions: 3
		},
		[2,x,0,x,3,x,I,x,0],
		[x,0,x,2,x,3,x,3,x],
		[2,x,I,x,2,x,I,x,0],
		[x,3,x,2,x,0,x,3,x],
		[3,x,0,x,0,x,0,x,0],
		[x,3,x,0,x,2,x,3,x],
		[2,x,0,x,0,x,3,x,0]
	]
];

exports["survival-ville"] = [
	[
		{
			moves: 1,
			hint: [[2, 4]],
			tutorial: ["This world never ends... You only get one life", [2, 4]]
		},
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,1,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
		[x,x,x,x,x,x,x,x,x],
	]
];
