/*global define */
'use strict';

define(['controller/contact'], function(ContactCtrl){
	var store = {};

	var Cache = function(){
		var _this = this;

		this.init = function(){
			_this.set('ContactCtrl', { id: 'default'});
		};

		this.set = function(key, options){
			console.log('service/cache: '+key + '/' +options.id);
			if(! store[key]){
				store[key] = {};
			}
			store[key][options.id] = new ContactCtrl(options); //use extend of new...
		};

		this.get = function(key, options){
			var res;
			var options = options || {};
			options.id = options.id ? options.id : 'default';

			if(options && ! store[key][options.id]){ //todo: build id with checksum of options (serialize options, and md5 ?)
				_this.set(key, options);
			}

			return store[key][options.id];
		};

		return this;
	};

	return new Cache();
});
