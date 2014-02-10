/*globals define */
'use strict';

define([],function(){
	var bind = {};
	var Binder = function(){
		var _this = this;

		this.on = function(trig,sig,func) {
			if(!bind[trig]){bind[trig] = {};}
			bind[trig][sig] = func;
		};

		this.fire = function(trig) {
			//console.log(trig,bind);
			if(bind[trig]){
				var args = Array.prototype.slice.call(arguments).slice(1);
				for(var i in bind[trig]){
					if (bind[trig].hasOwnProperty(i)) {
						bind[trig][i].apply(null,args);
					}
				}
			}
		};
	};
	return new Binder();
});