/*global define */
'use strict';

define(['ev','knockout'],function(ev,ko){
	return function(){
		var _this = this;

		this.email = ko.observable('george@gmail.com');
		this.attempted = ko.observable(false);
		this.invite = ko.observable(false);
		this.error = ko.observable();

		this.valid = ko.observable(function(){
			var errors = {};
			if(_this.attempted()){
				if(!_this.email()){errors.email = 'You must supply a valid email address';}
			}
			return errors;
		});
	};
});