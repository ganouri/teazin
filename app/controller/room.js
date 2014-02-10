/*globals define, Image*/
'use strict';

define(['jquery','underscore', 'hammer', 'vague', 'ev','trans','scrollRefresh','frag', 'service/api', 'service/state', 'model/room', 'views/room', 'service/control','views/cardlist' ,'controller/card','views/card'],function($, _, hammer, vague, ev,trans,scrollRefresh,frag, api, state, RoomModel, roomView, controls, cardListFrag,CardCtrl,cardView){
	return function(roomId) {
		var _this = this;
		var model = new RoomModel();
		var $el;
		var	roomScroll;

		api.updateRoomOpenedTime(roomId,function(){});

    	this.roomState = {
			players: state.base.rooms[roomId].members,
			playersEmails: [],
			namesList: ''
    	}

    	_this.roomState.playersEmails =  _.map(_this.roomState.players,function(_id){
    		return (typeof state.base.contacts[_id] != 'undefined') ? state.base.contacts[_id].email : '';
    	});

    	var sub = '';
    	_.each(_this.roomState.playersEmails,function(email){
    		if(email) {sub += email.substring(0,email.indexOf('@')).toUpperCase()+', ';}
    	});
    	_this.roomState.namesList = sub.substring(0,sub.length - 2);



		var cards = {};

		this.renderCards = function() {

			// GUIGUI map an object better ?
			var sortedCards = _.sortBy(state.base.rooms[roomId].corr,function(card,key){return 0 - key;});
			var cardList = cardListFrag({cards: sortedCards});

			$el.find('#cardList').html(cardList);

			_.each(state.base.rooms[roomId].corr, function(corr){

			    var cardData = state.resc[corr.resourceId]; // data from resc, independant from the context

			    var cardOptions = { // data that are not included in resc
			    	players:_this.roomState.players,
			    	roomId:roomId,
			    	clickable: true,
			    	viewConfig :{
			    		playersView: 'players_off'
			    	}
			    };

				cards[corr.resourceId] = new CardCtrl({cardOptions:cardOptions,cardData:cardData});
				cards[corr.resourceId].render('.cardContainer[data-id*="'+corr.resourceId+'"]');
			}, $el);
		};

		this.render = function(sel){
			$el = sel ? $(sel) : $el;

			var html = roomView({state: _this.roomState});
			$el.html(html);

			hammer($el.get(0)).on('tap', function(ev){
				if(! ev.target)
					return;

				var $details = $(ev.target).parents('.details'),
						$stripe  = $(ev.target).parents('.message-container');

				if($details.size()>0){
					_this.stripeDelegation(ev, $stripe);
				}
			});

			ev.fire('regComposeButton','.app-room-screen', { players: _this.roomState.players});
			ev.fire('regCaptureButton','.app-room-screen', { players: _this.roomState.players});

			ev.fire('regEmptyButton','.app-room-screen');
				
			_this.renderCards();

			ev.on('roomRenderCards','RoomCtrl',function(){
				api.update(function(){});
			});

			$el.hasClass('pt-page-current')

			ev.on('baseUpdated','roomCtrl',function(){
				setTimeout(function(){ // GUIGUI better solution with a callback ?
                	if($el.hasClass('pt-page-current')) {_this.renderCards();}
				},500);
            });

			setTimeout(function(){
				scrollRefresh('roomWrapper','roomRenderCards');
				document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			}, 500);
		};
	};
});