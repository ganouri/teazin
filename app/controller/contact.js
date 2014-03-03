/*globals define */
'use strict';

define(['jquery', 'underscore', 'knockout', 'hammer', 'ev', 'frag', 'service/state','service/api', 'views/contact', 'model/contact','views/contactList'],function($, _, ko, hammer, ev, frag, state, api, contactView, ContactModel, contactListFrag){
    return function(config) {

        var _this = this;
        var model = new ContactModel();
        var $el;

        this.state = _.defaults(config, {
            viewType: 'full',
            blockable: false,
            selectable: true,
            clickable: false,
            roomAccess: 'showRoomAccess',
            players: [],
            cb: function(){}
        });

        if (_this.state.viewType == 'selectOnly') {
            _this.state.blockable = false;
            _this.state.roomAccess = 'hideRoomAccess';
        }

        this.addContact = function(){
            api.addContact(model.email(),function(err){
                model.error(null);
                if(err['USR-CNT-01']){
                    model.invite(true);
                } else if(err['USR-CNT-02']) {
                    model.error('This user is already part of your contact list');
                } else {
                    model.email(null);
                    model.invite(false);
                    _this.toggleAddContact();
                }
            });
        };

        this.toggleAddContact = function(){
            $el.find('.add-contact-panel').toggleClass('hide');
            $el.find('#contactWrapper').toggleClass('withAddContactPanel');
            $el.find('.add-contact-container input[type="text"]').focus();

            ev.fire('updateScroll');
        };

        this.inviteContact = function(){
            api.inviteContact(model.email(),function(err){
                model.email(null);
                model.invite(false);
                _this.toggleAddContact();
            });
        };

        this.renderContactList = function(){
            var frag = contactListFrag({state:state});
            $el.find('.contactListFrag').html('').html(frag);
            $el.find('.contact-card').each(function(index,item){
                var $item = $(item);

                if(_this.state.blockable){
                    console.log('blockable');
                    hammer(item).on('hold',function(event){
                        event.preventDefault();
                        console.log('block');
                        $item.find('.actions .button').toggleClass('fadeVisible');
                        $item.find('.actions .checker').toggleClass('fadeVisible');
                        $item.toggleClass('shake');
                    });
                }

                if(_this.state.selectable){
                    hammer(item).on('tap',function(event){
                        event.preventDefault();
                        $item.find('.contact-actions .checker').toggleClass('contactSelected');
                        _this.updateConfig();
                    });
                }

                if(_this.state.clickable){
                    console.log('clickable');
                    hammer(item).on('tap',function(event){
                        var members = [state.base.email,state.base.contacts[$item.data('id')].email];
                        api.getRoomId(members,function(err,payload){
                            console.log(payload);
                            _this.state.cb(payload);
                        });
                    });
                }

            });

            ev.fire('updateScroll');
        };

        this.regAddContactButton = function() {
            var elem = $('.app-contact-screen .header .action-right .inticon-add-contact');

            elem.on('click',function(){
                _this.toggleAddContact();
            });
        };

        this.updateConfig = function() {
            _this.state.players = [state.base._id];
            $('.contactSelected').parents('.contact-card').each(function(){
                _this.state.players.push($(this).attr('data-id'));
            });

            if(_this.state.players.length) {
                $('.app-contact-screen .roomAccess p').html('Open a conversation with them');
                $('.app-contact-screen .roomAccess').addClass('activeClick');
            } else {
                $('.app-contact-screen .roomAccess p').html('Select contacts to open a room');
                $('.app-contact-screen .roomAccess').removeClass('activeClick');
            }
        };

        this.render = function(sel){
            $el = $(sel);
            var html = contactView({state:_this.state});
            $el.html(html);

            ko.applyBindings(model,$el[0]);

            $('.add-contact-action').on('click',function(){
                if(!Object.keys(model.valid()).length){
                    _this.addContact();
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

            $('.add-contact-close').on('click',function(){
                _this.toggleAddContact();
            });

            $el.find('.back-contact-action').on('click', function() {
                model.invite(false);
            });

            $el.find('.invite-contact-action').on('click', function() {
                _this.inviteContact();
            });

            $el.find('.roomAccess').on('click',function(){

                if(_this.state.players.length) {
                    var membersId = _this.state.players;

                    api.getRoomId(membersId,function(err,payload){
                        // GUIGUI handle error
                        /*while(typeof state.base.rooms[payload] == 'undefined'){
                            setTimeout(function(){
                                console.log('bla')
                            },200);
                        */
                        setTimeout(function(){
                            ev.fire('openRoom', payload);
                        },500);
                    });
                }
            });


            ev.on('baseUpdated','contactCtrl',function(){
                _this.renderContactList();
            });

            ko.applyBindings(model,$el[0]);
            _this.renderContactList();

            ev.fire('regAddContactButton','.app-contact-screen');
            _this.regAddContactButton();

            if(_this.state.viewType == 'selectOnly'){
                ev.fire('regSubmitContactButton', '.app-contact-screen');
            }else{
                ev.fire('regComposeButton','.app-contact-screen',{clickAction: 'custom'});
                ev.fire('regCaptureButton','.app-contact-screen',{ 
                    players: {},
                    clickAction: 'custom'
                });
            }

            $el.find('.inticon-capture').on('click', function(){
                var orders = [{type: 'Picture', quantity: 1}];
                ev.fire('captureMedia', orders, function(medias){
                    var creatorConfig = {
                        medias: medias,
                        players: _this.state.players
                    };
                    ev.fire('openCreator', creatorConfig);
                });
            });

            $el.find('.inticon-compose').on('click', function(){
                ev.fire('openComposer',{ players: _this.state.players});
            });

            $el.find('.inticon-save').on('click',function(){

                _this.state.cb(_this.state.players);

                ev.fire('back');
                ev.fire('renderRecipients');
            });

            ev.fire('regEmptyButton','.app-contact-screen');

            _.each(_this.state.players, function(id){
                $el.find('*[data-id="'+id+'"] .checker').addClass('contactSelected');
            }, $el);

            setTimeout(function(){
                var contactScroll = new iScroll('contactWrapper');

                ev.on('updateScroll','contactCtrl',function(){
                    contactScroll.refresh();
                });
                
            }, 500);
        };
    };
});