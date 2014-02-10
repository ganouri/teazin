/*global define, document, window*/
'use strict';

define(function () {

	if(typeof window.console === 'undefined') {
		window.console = {log:function(){}};
	}
	var Bridge = function(){
		this.createEvent = function(type, data) {
			var event = document.createEvent('Events');
			event.initEvent(type, false, false);
			if (data) {
				for (var i in data) {
					if (data.hasOwnProperty(i)) {
						event[i] = data[i];
					}
				}
			}
			return event;
		};

		this.start = function(){
			var evt = this.createEvent('Events', {});
			evt.initEvent('deviceready',false,false);
			document.dispatchEvent(evt);
		};
	};
	return new Bridge();
});
