/*globals define, Image*/
'use strict';

define(['jquery','underscore', 'hammer', 'moment', 'vague', 'ev','trans',
        'frag',
        'service/api',
        'service/state',
        'service/control',
        'service/mediaprovider',
        'views/card'
    ],function($, _, hammer, moment, vague, ev,trans,frag, api, state, controls, mp, cardView){
    return function(config) {
        var _this = this;
        var $el;

        this.getNickname = function(_id){
            return _id == state.base._id ? state.base.nickname : state.contacts[_id].nickname
        }

        this.getProfilePic = function(_id){
            if (_id == state.base._id) {
                return {
                    path: mp.getMediaPath(state.base.profilePic) || '../images/user/anonymous.jpg',
                    id: state.base.profilePic
                };
            } else {
                return {
                    path: mp.getMediaPath(state.contacts[_id].profilePic) || '../images/user/anonymous.jpg',
                    id: state.contacts[_id].profilePic
                };
            }
        }

        _this.cardDataSet = {
            players: [],
            primaryMedia: {
                type: config.cardData.primaryMedia.type || '',
                content: config.cardData.primaryMedia.content || '',
                id: config.cardData.primaryMedia.id || ''
            },
            user: {
                _id: config.cardData.user || '',
                nickname: _this.getNickname(config.cardData.user),
                profilePic: _this.getProfilePic(config.cardData.user)
            },
            currentGame: {},
            viewConfig:{
                playersView: config.cardOptions.viewConfig.playersView, // can be players_off = no column, or players_1col, players_2col, players_3col, ...
                gameView: 'nolock' // GUIGUI later adjust that as a mechanism
            }
        };

        _this.cardDataSet.primaryMedia.path = mp.getMediaPath(_this.cardDataSet.primaryMedia.id);

        // extend players
        _this.cardDataSet.players = _.map(config.cardOptions.players,function(playerId){
            return {
                _id: playerId,
                nickname: _this.getNickname(playerId),
                profilePic: _this.getProfilePic(playerId)
            }
        })

        // create currentGame
        if (typeof config.cardData.games != 'undefined' && config.cardData.games.length) {
            var currentGame = {
                user: {
                    _id: config.cardData.games[0].user || '',
                    nickname: _this.getNickname(config.cardData.games[0].user),
                    profilePic: _this.getProfilePic(config.cardData.games[0].user)
                },
                locks : config.cardData.games[0].locks || [],
                fromNow: moment.unix(config.cardData.games[0].createdOn/1000).fromNow(),
                latestAttempt: []
            }
            _this.cardDataSet.currentGame = currentGame;
            _this.cardDataSet.viewConfig.gameView = config.cardData.games[0].state.game;

            // create latestAttempt
            if (typeof config.cardData.games[0].attempts != 'undefined' && config.cardData.games[0].attempts.length) {
                var sortedAttempts = _.sortBy(config.cardData.games[0].attempts,function(elem){
                    return 0 - elem.createdOn;
                });
                var latestAttempt = {
                    fromNow :  moment.unix(sortedAttempts[0].createdOn/1000).fromNow(),
                    user : {
                        _id: sortedAttempts[0].user || '',
                        nickname: _this.getNickname(sortedAttempts[0].user),
                        profilePic: _this.getProfilePic(sortedAttempts[0].user)
                    },
                    items : sortedAttempts[0].items
                }
                _this.cardDataSet.currentGame.latestAttempt = latestAttempt;
            }
        }



        this.render = function(sel){
            $el = $(sel);

            // remove players column if no players
            _this.cardDataSet.viewConfig.playersView = _this.cardDataSet.players.length ? _this.cardDataSet.viewConfig.playersView : 'players_off';

            var elem = $el.html(cardView({card:_this.cardDataSet,controls:controls}));

            mp.updateMediaPaths();

            if (config.cardOptions.clickable) {
                $(elem).on('click',function(){
                    var boardConfig = {
                        boardData: config.cardData,
                        boardOptions: {
                            players: config.cardOptions.players,
                            roomId:config.cardOptions.roomId
                        }
                    }
                    ev.fire('openBoard',boardConfig);
                });
            }
        };
    };
});