/*global define */
'use strict';

define(['ev','knockout'],function(ev,ko){
	return function(){
		var _this = this;
		this.email = ko.observable('mark@gmail.com');
		this.password = ko.observable('testpassword');
		this.nickname = ko.observable('mark');

		this.attempted = ko.observable(false);
		this.state = ko.observable(0);
		this.serverMessage = ko.observable();

		this.labels = ko.computed(function(){
			if(_this.state()){
				return {login:'Cancel',signup:'Create Account'};
			}
			else {
				return {login:'Login',signup:'Signup'};
			}
		});

		this.valid = ko.computed(function(){
			var errors = {};

			if(_this.attempted()){
				if(!_this.email()){errors.email = 'You must supply a valid email address';}
				if(!_this.password()){errors.password = 'You must have a password that is atleast 5 charachters long';}
				if(_this.state()){
					if(!_this.nickname()){errors.nickname = 'You must provide a valid nickname';}
				}
			}

			return errors;
		});
	};
});