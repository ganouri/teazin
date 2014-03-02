/*globals define, Image*/
'use strict';

define(['jquery','underscore', 'hammer', 'ev', 'iscroll5','trans','frag', 'service/api', 'service/state', 'service/mediaprovider',
	'views/settings', 'service/control'],function($, _, hammer, ev,iscroll, trans,frag, api, state, mp, settingsView, controls){
	return function(config) {
		var _this = this;

		_this.settingsData = _.extend({
			profilePic : mp.getMediaPath(state.base.profilePic) || '../images/user/anonymous.jpg',
			nickname : state.base.nickname,
			email : state.base.email
		},config);


		this.render = function(sel){
			var html = settingsView({data:_this.settingsData});
			var $el = $(sel).html(html);

            mp.updateMediaPaths([state.base.profilePic]);

			$el.find('.setting-header').each(function(index,item){
				var $item = $(item);
				hammer(item).on('tap',function(event){
					if ($item.hasClass('current-setting')){
						$('.setting-header').removeClass('current-setting');
						$('.setting-panel').addClass('hide');
					} else {
						$('.setting-header').removeClass('current-setting');
						$('.setting-panel').addClass('hide');
						$item.addClass('current-setting');
						$item.parents('.setting-item').children('.setting-panel').removeClass('hide');
					}
				});
			});

			$el.find('.profile-image').on('click',function(){
                //var orders = [{type: 'Picture', quantity: 3}, {type: 'Picture', duration: '5000'}];
                var orders = [{type: 'Picture', quantity: 1, options: {
                    mediaType: 1,
                    cameraDirection: 1,
                    quality: 25}
                }];
                ev.fire('captureMedia', orders, function(medias){
                    var filePath = config.medias[0].payload.path;
                    var fileName = filePath.substr(filePath.lastIndexOf('/')+1);
                	api.updateUser({profilePic:fileName},function(err,payload){
	                	ev.fire('openSettings', {profilePic: filePath});
                	});
                });
			});

			ev.fire('clearFullStack');

			setTimeout(function(){
                var settingsScroll = new IScroll('#settingsWrapper', {click: true, scrollbars: true});
            }, 500);
            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		};
	};
});