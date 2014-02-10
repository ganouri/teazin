/*globals define */
'use strict';

define([
	'jquery',
	'ev',
	'trans',
	'service/cache',
	'service/api',
	'service/state',
	'service/device',
	'views/main',
	'model/main',
	'controller/login',
	'controller/nav',
	'controller/home',
	'controller/room',
	'controller/creator',
	'controller/composer',
	'controller/settings',
    'controller/contact',
    'controller/board',
    'controller/capture',
    'controller/setlocks'
],
function($,ev,trans, cache, api, state, device, mainView,mainModel,LoginCtrl,NavCtrl,HomeCtrl,RoomCtrl,CreatorCtrl,ComposerCtrl,SettingsCtrl,ContactCtrl,BoardCtrl,CaptureCtrl,SetLocksCtrl){
	return function() {
		var _this = this;
		var model = mainModel;
		var currentScreen = null;

		this.render = function(sel){
			var html = mainView();
			$(sel).html(html);

			var loginCtrl = new LoginCtrl();
			var homeCtrl = new HomeCtrl();
			var navCtrl = new NavCtrl();
			var roomCtrl;

			cache.init();



			/*** REACTION TO WINDOW RESIZE ***/
			var portraitScreenHeight;
			var landscapeScreenHeight;

			if(window.orientation === 0 || window.orientation === 180){
			    portraitScreenHeight = $(window).height();
			    landscapeScreenHeight = $(window).width();
			}
			else{
			    portraitScreenHeight = $(window).width();
			    landscapeScreenHeight = $(window).height();
			}

			var tolerance = 25;
			$(window).bind('resize', function(){
			    if((window.orientation === 0 || window.orientation === 180) &&
			       ((window.innerHeight + tolerance) < portraitScreenHeight)){
			        // keyboard visible in portrait
			        $('.footer').hide();
			        $('.app-body').addClass('noFooter')
			    }
			    else if((window.innerHeight + tolerance) < landscapeScreenHeight){
			        // keyboard visible in landscape
			        $('.footer').hide();
			        $('.app-body').addClass('noFooter')
			    }
			    else{
			        // keyboard NOT visible
			        $('.footer').show();
			        $('.app-body').removeClass('noFooter')
			    }
			});
			/*** END ***/

			

			trans.render(loginCtrl,'.app-login-screen');

			ev.on('authenticate','mainCtrl',function() {
				api.update(function(err){
					navCtrl.render(sel+' .app-frame');
					trans.render(homeCtrl,'.app-home-screen');
				});
			});

			ev.on('logout','mainCtrl',function() {
				trans.render(loginCtrl,'.app-login-screen');
			});

			ev.on('openRoom','mainCtrl',function(roomId){
				roomCtrl = new RoomCtrl(roomId);
				trans.render(roomCtrl,'.app-room-screen');
			});

			ev.on('captureMedia','mainCtrl',function(orders, cb){
				// GUIGUI TO COMMENT FOR CORDOVA VERSION :
				//trans.render(new CaptureCtrl(orders,cb),'.app-capture-screen');
				// GUIGUI TO UNCOMMENT FOR CORDOVA VERSION :
				device.getMedias(orders, cb);
			});

			ev.on('openComposer','mainCtrl',function(config){
				trans.render(new ComposerCtrl(config),'.app-composer-screen');
			});

			ev.on('openContacts','mainCtrl',function(config){
        		trans.render(new ContactCtrl(config),'.app-contact-screen','left',config.keep);
			});

			ev.on('openCreator','mainCtrl',function(config){
				trans.render(new CreatorCtrl(config),'.app-creator-screen');
			});

			ev.on('openSetLocks','mainCtrl',function(config){
				trans.render(new SetLocksCtrl(config),'.app-composer-screen');
			});

			ev.on('openSettings','mainCtrl',function(config){
				trans.render(new SettingsCtrl(config),'.app-settings-screen');
			});

			ev.on('openBoard','mainCtrl',function(config){
				trans.render(new BoardCtrl(config),'.app-board-screen');
			});
		};

	};
});