/*globals define, Image*/
'use strict';

define(['jquery','underscore', 'hammer', 'ev','trans','iscroll5','frag','service/api','service/state',
	'views/creator',
  'model/creator',
  'service/control',
  'views/itemConfig',
  'controller/card',
  'views/card'
  ],function($, _, hammer, ev,trans,iscroll,frag, api, state, creatorView,creatorModel,controls,itemConfigView,CardCtrl,cardView){
	return function(config) {
		var _this = this;
    var $el;

    _this.creatorState = _.extend({
      players: [state.base._id],
      roomId:'',
      locks:{},
      clickable: false,
      viewConfig:{
        playersView:'players_1col'
      },
      medias:[]
    },config);

    _this.cardData = {
      primaryMedia: {},
      user: state.base._id,
      games : [
        {
          user: state.base._id,
          createdOn: new Date().getTime(),
          state: {
            game:'nolock' // GUIGUI add suppress games if still nolock
          },
          locks: [],
          attempts : []
        }
      ]
    };

    if(typeof config != 'undefined'){
      _this.cardData.primaryMedia = { type: config.medias[0].payload.type };
      if (_this.cardData.primaryMedia.type == "Picture" ) {
        _this.cardData.primaryMedia.content = encodeURI(api.mediaURI+config.medias[0].payload.id);
        _this.cardData.primaryMedia.localpath = config.medias[0].payload.path ;
      } else if (_this.cardData.primaryMedia.type == "Text") {
         _this.cardData.primaryMedia.content = config.medias[0].payload.content ;
      }
    }

		this.regAddContacts = function() {
      var elem = $('.app-creator-screen .header .action-right .inticon-add-contact');
      _this.regCard();

      elem.on('click', function(){
				var contactConfig = {
          viewType : 'selectOnly',
          keep: true,
          players: _this.creatorState.players,
          cb: function(payload){
            _this.creatorState.players = payload;
          }
				};
				ev.fire('openContacts', contactConfig);
			});

      // HAVE TO BE INSIDE regAddContacts to be called from nav.js, WHY ??? GUIGUI
      ev.on('renderRecipients', 'CreatorCtrl', function() {
        _this.regCard();
      });

		};

    this.updateCard = function() {
      _this.cardData.games[0].locks = [];
      _.each(_this.creatorState.locks, function(lock,index){
        if (lock.name) {
          lock.index = index;
          _this.cardData.games[0].locks.push(lock);
        }
      });
      _this.cardData.games[0].state.game = _this.cardData.games[0].locks.length ? 'locked' : 'nolock'
    };

    this.regCard = function() {
      _this.creatorState.players = _this.creatorState.players;
      _this.updateCard();
      var cardCtrl = new CardCtrl({cardOptions:_this.creatorState,cardData:_this.cardData});
      cardCtrl.render('.app-creator-screen .cardPreview');
    };

    this.regSendButton = function() {
      $('.app-creator-screen .teazButton').on('click', function(){

        function createResc(roomId,resc){
          //create resc server side
          api.composeResc(roomId, resc, function(res){
            if(res.errors){return;}

            setTimeout(function(){
              ev.fire('clearFullStack');
              ev.fire('openRoom',roomId);
            },500);
          });
        }

        if (_this.creatorState.players.length > 1) {
          _this.updateCard();

          if(!_this.creatorState.roomId){
            api.getRoomId(_this.creatorState.players,function(err,payload){
              // GUIGUI handle error
              _this.creatorState.roomId = payload;
              createResc(_this.creatorState.roomId,_this.cardData);
            });
          } else {
            createResc(_this.creatorState.roomId,_this.cardData);
          }
        } else {
          alert('Please select at least 1 contact')
        }
      });
    };

    this.render = function(sel){
      $el = $(sel);
			var html = creatorView();
      $el.html(html);

      $('.addLocks').on('click',function(){
         _this.creatorState.locks = {};
        ev.fire('openSetLocks',_this.creatorState);
      });

      ev.fire('regAddContactButton','.app-creator-screen');

      _this.regAddContacts();
      _this.regSendButton();
      _this.regCard();

      setTimeout(function(){
        var creatorScroll = new IScroll('#creatorWrapper', {click: true, scrollbars: true});
      }, 500);
		};
	};
});