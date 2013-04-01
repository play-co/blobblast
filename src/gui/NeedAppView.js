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

import ui.ImageView;
import ui.View;
import ui.TextView;

import src.gui.ButtonView as ButtonView;


exports = Class(ui.View, function(supr) {
	
	this.init = function(opts) {
		this.parent = opts.parent;

		supr(this, 'init', [opts]);
	};


	this.buildView = function() {
	
		this.promptAction = new ui.TextView({
			parent: this,
			y: 0,
			color: 'white',
			outline: true,
			strokeStyle: '#000000',
			lineWidth: 1.5,
			fontSize: 24,
			text: 'You need our free app to challenge more friends!'
		});

		this.getAppButton = new ButtonView({
			parent: this,
			button: 'orange',
			text: 'Get App',
			outline: true,
			shadowColor: '#aa3e16',
			strokeStyle: '#aa3e16',
			lineWidth: 2,
			fontSize: 32,
			width: 154,
			height: 60,
			x: 160 - (154 / 2), 
			y: 300
		}).subscribe('InputSelect', this, function() {
			// get app
			/*GC.track({
				name: 'get_app_free',
				category: 'viral'
			});*/

			GC.openAppStore();
		}); 	
	};

});
