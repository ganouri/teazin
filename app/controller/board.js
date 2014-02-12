/*globals define, Image*/
'use strict';

define(['jquery','underscore', 'hammer', 'moment', 'vague', 'ev','trans','iscroll5','frag', 'service/api', 'service/state',
    'service/control',
    'views/board'
],function($, _, hammer, moment, vague, ev, trans ,iscroll ,frag, api, state, controls, boardView){
    return function(config) {
        var _this = this;
        var $el;

        this.getNickname = function(_id){
            return _id == state.base._id ? state.base.nickname : state.contacts[_id].nickname
        }

        this.getProfilePic = function(_id){
            if (_id == state.base._id) {
                return state.base.profilePic || 'images/user/anonymous.jpg'
            } else {
                return state.contacts[_id].profilePic || 'images/user/anonymous.jpg'
            }
        }

        _this.boardDataSet = {
            players: config.boardOptions.players || [],
            namesList:'',
            primaryMedia: config.boardData.primaryMedia || {type: '', content: ''},
            user: {
                _id: config.boardData.user || '',
                nickname: _this.getNickname(config.boardData.user),
                profilePic: _this.getProfilePic(config.boardData.user)
            },
            currentGame: {},
            games: config.boardData.games || [],
            viewConfig:{
                gameView: 'nolock' // GUIGUI later adjust that as a mechanism
            }
        };

        // extend players
        _this.boardDataSet.players = _.map(config.boardOptions.players,function(playerId){return {
            _id: playerId,
            nickname: _this.getNickname(playerId),
            profilePic: _this.getProfilePic(playerId)
        }})

        // create namesList
        var sub = '';
        _.each(_this.boardDataSet.players,function(_id){
            if(typeof state.base.contacts[_id] != 'undefined') {
                var email = state.base.contacts[_id].email;
                sub += email.substring(0,email.indexOf('@')).toUpperCase()+', ';                
            }
        });
        _this.boardDataSet.namesList = sub.substring(0,sub.length - 2);

        // create currentGame
        if (typeof config.boardData.games != 'undefined' && config.boardData.games.length) {
            var currentGame = {
                user: {
                    _id: config.boardData.games[0].user || '',
                    nickname: _this.getNickname(config.boardData.games[0].user),
                    profilePic: _this.getProfilePic(config.boardData.games[0].user)
                },
                locks : config.boardData.games[0].locks || [],
                fromNow: moment.unix(config.boardData.games[0].createdOn/1000).fromNow(),
                attempts: [],
                state : {
                    game : config.boardData.games[0].state.game
                }
            }
            _this.boardDataSet.currentGame = currentGame;
            _this.boardDataSet.viewConfig.gameView = config.boardData.games[0].state.game;

            // create list of attempts
            if (typeof config.boardData.games[0].attempts != 'undefined' && config.boardData.games[0].attempts.length) {
                var sortedAttempts = _.sortBy(config.boardData.games[0].attempts,function(elem){
                    return 0 - elem.createdOn;
                });

                _.each(sortedAttempts,function(attempt){
                    var attemptData = {
                        fromNow :  moment.unix(attempt.createdOn/1000).fromNow(),
                        user : {
                            _id: attempt.user,
                            nickname: _this.getNickname(attempt.user),
                            profilePic: _this.getProfilePic(attempt.user)
                        },
                        items: attempt.items,
                        state: attempt.state
                    }

                    _this.boardDataSet.currentGame.attempts.push(attemptData);
                });
            }
        }

        _this.currentAttempt = {
            user: state.base._id,
            createdOn: 0,
            items:{},
            state: ''
        }

        var savingAttempt = false;


        this.renderUnlockCurrent = function() {
            _.each(_this.boardDataSet.currentGame.locks, function(item){
                var itemAttempt = $('.itemAttempt[name*="'+item.name+'"]');
                var itemAttemptView = itemAttempt.find('.attemptView');

                controls[item.name].controller.renderUnlock(itemAttemptView,item.config,function(attemptResult){

                    _this.currentAttempt.items[item.name] = attemptResult;

                    _this.checkAttemptState();
                });

                itemAttemptView.find('input.submitAttempt').on('click',function(event){
                    ev.fire('scrollToFirstItem');
                    ev.fire('unlockingAttempt');
                });
            });
        };

        this.checkAttemptState = function(){
            var attemptState = 'success';
            var attemptedItems = 0;

            _.each(_this.currentAttempt.items,function(attemptItem){
                attemptedItems ++;
                if (attemptItem.state == 'failure') {
                    attemptState = 'failure';
                }
            });
            
            if (attemptedItems == _this.boardDataSet.currentGame.locks.length) {
                
                if (attemptState === 'success') { 
                    ev.fire('scrollToReward');
                    $('.maskLabel').addClass('rewardReveal').html('3');
                    setTimeout(function(){
                        $('.maskLabel').html('2');
                        setTimeout(function(){
                            $('.maskLabel').html('1');
                            setTimeout(function(){
                                $el.find('.rewardMask').addClass('hide');
                            },1000);
                        },1000);
                    },1000);
                }

                if(!savingAttempt) {
                    savingAttempt = true;
                    _this.saveAttempt(attemptState);
                }
                
            }
        };

        this.saveAttempt = function(attemptState){

            _this.currentAttempt.createdOn = moment.utc().valueOf();
            _this.currentAttempt.state = attemptState;

            if (typeof config.boardData.games[0].attempts == 'undefined') {
                config.boardData.games[0].attempts = [_this.currentAttempt];
            } else {
                config.boardData.games[0].attempts.push(_this.currentAttempt);
            }

            // GUIGUI to modify if each player has to unlock the game :
            if (attemptState === 'success') {config.boardData.games[0].state.game = 'unlocked'}

            api.updateResc(config.boardOptions.roomId,config.boardData, function(res){
                if(res.errors){
                    console.log('error :',res.errors)
                    return;}
            });

            setTimeout(function(){
                savingAttempt = false;
                _this.currentAttempt = {
                    user: state.base._id,
                    createdOn: 0,
                    items:{},
                    state: ''
                }
            },1000);
        };

        ev.on('unlockingAttempt','BoardCtrl', function(){

            _.each(_this.boardDataSet.currentGame.locks, function(item){
                ev.fire(item.name+'_unlockingAttempt');
            });
        });

        this.regDeleteBoard = function() {
            $('.app-board-screen .footer .deleteButton').on('click',function(event){
                var deleteConfirm = confirm('Do you really want to delete this conversation?');
                if (deleteConfirm) {
                    console.log('delete')
                }
            });
        };

        this.render = function(sel){
            $el = $(sel);
            var html = boardView({board:_this.boardDataSet,controls:controls});
            $el.html(html);

            _this.regDeleteBoard();

            _this.renderUnlockCurrent();

            setTimeout(function(){
                var boardScroll = new IScroll('#boardWrapper', {click: true, scrollbars: true});

                ev.on('scrollToReward','BoardCtrl',function(){
                    boardScroll.scrollToElement('.rewardZone');
                });

                ev.on('scrollToFirstItem','BoardCtrl',function(){
                    boardScroll.scrollToElement('.gameLocks');
                });

            }, 500);
            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        };
    };
});