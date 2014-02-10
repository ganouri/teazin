/*globals define */
'use strict';

define(['jquery','ev','trans','frag','views/nav','model/nav'],function($, ev, trans, frag, navView, NavModel){
    return function() {
        var _this = this;
        var model = new NavModel();
        var stack = [];
        var $el;

        this.render = function(sel){
            var html = navView();
            $el = $(sel);
            $el.html(html);



            /*** GENERIC ***/
            ev.on('forward','NavCtrl',function(ctrl,sel){
                stack.push({ctrl:ctrl,sel:sel});
                if(stack.length > 1){
                    ev.fire('regBackButton',sel);
                }
            });

            ev.on('back','NavCtrl',function(keep){
                if(stack.length > 1){
                    stack.pop();
                    var screen = stack.pop();
                    trans.render(screen.ctrl,screen.sel,'right',keep);
                }
            });

            ev.on('clearStack','NavCtrl',function(){
                if(stack.length > 1){
                    stack.pop();
                    var screen = stack.pop();
                }
            })

            ev.on('clearFullStack','NavCtrl',function(){
                var authorizedScreens = ['.app-home-screen'];
                stack = _.reject(stack,function(screen){
                    if (_.contains(authorizedScreens,screen.sel)){
                        authorizedScreens = _.reject(authorizedScreens,function(listedScreen){return listedScreen == screen.sel});
                        return false;
                    } else {return true}
                });
            })



            /*** HEADER ***/
            ev.on('regBackButton','NavCtrl', function(sel){
                var elem = $(sel+' .header .action-left').html($(frag.navBackButton));

                elem.on('click',function(){
                    ev.fire('back');
                });
            });

            ev.on('regAddContactButton','NavCtrl', function(sel){
                var elem = $(sel+' .header .action-right').html($(frag.addContactButton));
            })

            ev.on('regContactButton','NavCtrl', function(sel){
                var elem = $(sel+' .header .action-right').html($(frag.contactButton));
                elem.on('click',function(){
                    var config = {
                        id: 'fromNav',
                        cb: function(roomId){
                            ev.fire('openRoom', roomId);
                        }
                    };
                    ev.fire('openContacts', config);
                });
            });

            ev.on('regSettingsButton','NavCtrl', function(sel){
                var elem = $(sel+' .header .action-left').html($(frag.settingsButton));

                var config = {};
                elem.on('click',function(){
                    ev.fire('openSettings', config);
                });
            });



            /*** FOOTER ***/
            ev.on('regCaptureButton', 'NavCtrl', function(sel, config){
                var clickAction = (typeof config != 'undefined' && typeof config.clickAction  != 'undefined') ? config.clickAction : 'standard';
                var elem   = $(frag.captureButton).prependTo($(sel+' .footer'));

                if (clickAction == 'standard') {
                    //var orders = [{type: 'Picture', quantity: 3}, {type: 'Picture', duration: '5000'}];
                    var orders = [{type: 'Picture', quantity: 1}];
                    elem.on('click', function(){
                        ev.fire('captureMedia', orders, function(medias){
                            var creatorConfig = config || {};
                            creatorConfig.medias = medias;
                            ev.fire('openCreator', creatorConfig);
                        });
                    });
                }
            });

            ev.on('regComposeButton', 'NavCtrl', function(sel, config){
                var clickAction = (typeof config != 'undefined' && typeof config.clickAction  != 'undefined') ? config.clickAction : 'standard';
                var elem  = $(frag.composeButton).prependTo($(sel+' .footer'));

                if (clickAction == 'standard') {
                    elem.on('click', function(){
                        ev.fire('openComposer',config);
                    });
                }
            });

            ev.on('regSendButton', 'NavCtrl', function(sel){
                var elem   = $(frag.sendButton).prependTo($(sel+' .footer'));
            });

            ev.on('regSaveButton', 'NavCtrl', function(sel){
                var elem   = $(frag.saveButton).prependTo($(sel+' .footer'));
                elem.on('click',function(){
                    var keep = true;
                    ev.fire('back',keep);
                });
            });

            ev.on('regContinueButton', 'NavCtrl', function(sel){
                var elem   = $(frag.continueButton).prependTo($(sel+' .footer'));
            });

            ev.on('regEmptyButton', 'NavCtrl', function(sel){
                var elem   = $(frag.emptyButton).prependTo($(sel+' .footer'));
            });

            ev.on('regSubmitContactButton', 'NavCtrl', function(sel){
                var elem = $(frag.submitContactButton).prependTo($(sel+' .footer'));
            });
        };
    };
});