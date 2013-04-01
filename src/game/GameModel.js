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

exports = Class(function () {
	this.init = function (opts) {
		this.mirror = opts.mirror;
		this.map = opts.map;
		this.shards = [];
	};

	this.step = function (depth) {
		this.shards.forEach(function (shard, i) {
			var amount = ({
				0: [0, 2],
				60: [1, 1],
				120: [1, -1],
				180: [0, -2],
				"-120": [-1, -1],
				"-60": [-1, 1]
			})[shard.cur.deg];

			shard.cur.row += amount[0];
			shard.cur.pos += amount[1];

			if (!(shard.cur.row in this.map) || !(shard.cur.pos in this.map[shard.cur.row])) {
				if (this.mirror) {
					if (shard.bounced) {
						delete this.shards[i];
					} else {
						var deg = ({
							0: 180,
							60: "-120",
							120: "-60",
							180: 0,
							"-120": 60,
							"-60": 120
						})[shard.cur.deg];

						shard.push({
							row: shard.cur.row,
							pos: shard.cur.pos,
							deg: deg,
							bounced: true
						});

						shard.cur = shard[2];
						shard.bounced = true;
					}
				} else {
					shard.cur.row += amount[0] * 10;
					shard.cur.pos += amount[1] * 10;
					delete this.shards[i];
				}
			} else if (this.map[shard.cur.row][shard.cur.pos]) {
				delete this.shards[i];
				shard.chain = this.blast(shard.cur.row, shard.cur.pos);
			}
		}, this);

		++depth;
		return (this.shards = this.shards.filter(function (shard) { return shard; })).length
			? this.step(depth)
			: depth;
	};

	this.blast = function (row, pos) {
		var chain = {
			row: row,
			pos: pos,
			shards: []
		};

		if (--this.map[row][pos] === 0) {
			this.map[row][pos] = null;

			[0, 60, 120, 180, -120, -60].forEach(function (deg) {
				var shard = [{
					row: row,
					pos: pos,
					deg: deg
				}, {
					row: row,
					pos: pos,
					deg: deg
				}];

				shard.cur = shard[1];

				chain.shards.push(shard);
				this.shards.push(shard);
			}, this);
		}

		return chain;
	};

	this.select = function (row, pos) {
		var chain = this.blast(row, pos);
		var won = 0;
		var depth = 0;

		if (this.shards.length) {
			depth = this.step(0);
		}

		this.map.forEach(function (list) {
			list.forEach(function (hex) {
				hex && hex !== Infinity && ++won;
			});
		});

		chain.won = !won;
		chain.steps = depth;
		return chain;
	};
});
