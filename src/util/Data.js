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

"use strict";

var prefix = "dodecablast_";

exports.has = function (key) {
	return localStorage.getItem(prefix + key) != null;
};

exports.get = function (key) {
	return exports.has(key) ? JSON.parse(localStorage.getItem(prefix + key)) : undefined;
};

exports.set = function (key, val) {
	localStorage.setItem(prefix + key, JSON.stringify(val));
};

exports.def = function (key, val) {
	!exports.has(key) && exports.set(key, val);
};

exports.del = function (key) {
	localStorage.removeItem(prefix + key);
};

exports.hasItem = exports.has;
exports.getItem = exports.get;
exports.setItem = exports.set;
exports.removeItem = exports.del;
