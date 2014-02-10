/*globals define */
'use strict';

define(['jquery','knockout','ev','iscroll5','service/api', 'views/login','model/login'],function($,ko,ev,iscroll,api,loginView,LoginModel){
	return function() {
		var _this = this;

		var model = new LoginModel();
		var initial = false;

		this.signup = function(){
			api.signup(model.nickname(), model.email().toLowerCase(), model.password(), function(err){
				if(err){
					model.serverMessage('There was an issue signing up');
				} else {
					_this.login();
				}
			});
		};

		this.login = function(){
			api.login(model.email().toLowerCase(),model.password(),function(err){
				if(err){
					model.serverMessage('There was an issue signing in');
				} else {
					ev.fire('authenticate');
				}
			});
		};

		this.render = function(sel){
			var $el = $(sel);
			var html = loginView();
			$el.html(html);

			ko.applyBindings(model,$el[0]);

			$el.find('.login-button-lgn').on('click', function(){
				if(!model.state()){
					model.attempted(true);
					model.serverMessage(null);

					if(!Object.keys(model.valid()).length){
						_this.login();
					}
				} else {
					model.attempted(false);
					model.state(0);
					model.serverMessage(null);
				}
			});

			$el.find('.login-button-sgn').on('click', function(){
				if(model.state()){
					model.attempted(true);
					model.serverMessage(null);
					if(!Object.keys(model.valid()).length){
						_this.signup();
					}
				} else {
					model.attempted(false);
					model.state(1);
				}
			});

			setTimeout(function(){
                var loginScroll = new IScroll('#loginWrapper', {click: true, scrollbars: true});
            }, 500);
            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		};
	};
});