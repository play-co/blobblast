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

import AudioManager;
import src.flow.Flow as Flow;
import src.config.levels;
import src.util.Data as Data;

/*** settings ***/
var worlds = Data.get("worlds") || {};

src.config.levels.list.forEach(function(name){
	!(name in worlds) && (worlds[name] = {
		unlocked: 0,
		last: -1
	});
});

if ( false ) { // localStorage debugging
	worlds = {
		"newb-ville": {
			unlocked: 12,
			last: 10
		},
		"user-ville": {
			unlocked: 36,
			last: 14
		},
		"super-ville": {
			unlocked: 35,
			last: 9
		},
		"survival-ville": {
			unlocked: 0,
			last: -1
		}
	};
}

Data.set("worlds", worlds);
Data.def("hints", 1);
Data.def("hinttime", Date.now());

/*** app ***/
exports = Class(GC.Application, function (supr) {
	
	this._settings = {
		alwaysRepaint: true,
		clearEachFrame: true,
		preload: ["resources/images"],
	};
	
	this.scaleUI = function () {
		var baseRatio = 416 / 320;
		var deviceRatio = device.height / device.width;
		var scale = 1;
		
		if (deviceRatio > baseRatio) {
			scale = device.width / 320;
		} else {
			scale = device.height / 416;
		}
		
		this.flow.style.scale = scale;
		
		this.flow.style.x = (device.width - (320 * scale)) / 2;
		this.flow.style.y = (device.height - (416 * scale)) / 2;
	};

	this.initUI = function() {
		//audio
		
	};
	
	this.launchUI = function () {
		
		this.flow = new Flow({ 
			superview: this.view,
			width: 320,
			height: 416,
			clip: true,
			level: undefined
		});
		
		this.scaleUI();
		
		this.initAudio();
	};
	
	this.audioOff = function () {
		this.audio = {
			playBackgroundMusic: function() {},
			play: function() {},
			setMuted: function() {},
			setVolume: function() {}
		};
	};
	
	this.initAudio = function () {
		this.audioManager = new AudioManager({
			path: 'resources/sounds',
			files: {
				background: {
						path: '.',
						background: true,
						volume: 0.5,
						loop: true
				},
				pop: {
						path: '.',
						background: false
					 },
				win: {
						path: '.',
						background: false
					 },
				lose: {
						path: '.',
						background: false
					 }

			}
		});

		
		this.audioManager.play('background');
	};
	
	this.getQueryParam = function (param) {
		var queryString = document.location.search.substr(1);
		var queryArr;
		var keyPair;
		var params = {};
		var i;
		var len;
		
		if ( queryString.length === 0 ) {
			return undefined;	
		}
		
		queryArr = queryString.split('&');
		
		for ( i = 0, len = queryArr.length; i < len; i++ ) {
			keyPair = queryArr[i].split('=');

			if ( keyPair.length > 1 ) {
				params[keyPair[0]] = decodeURIComponent(keyPair[1]);
			}
		}	
		
		return params[param];
	};
});
