/*globals define */
'use strict';

define([
	'jquery',
	'knockout',
	'hammer',
	'ev',
	'scrollRefresh',
	'frag',
	'service/state',
	'service/mediaprovider',
	'service/api',
	'views/home',
	'views/roomlist'
	], function($, ko, hammer, ev, scrollRefresh, frag, state, mp, api, homeView, roomListFrag){

	return function() {
		var _this = this;
		var initial = false;
		var $el;


		this.renderRoomList = function(){

			var sortedRooms = _.sortBy(state.base.rooms,function(room,key){
				return 0 - room.lastUpdated;
			});

			var roomListDataSet = [];
			_.each(sortedRooms,function(room){
				var roomData = {
					_id: room._id,
					viewConfig : {
						facesView : 'face2x2',
						facesDisplayed : 1
					},
					players : {
						emails: '',
						faces:[],
						leftover: 0
					},
					lastOpened: room.lastOpened,
					updates:0
				};

				if (room.members.length == 3 ) {
					roomData.viewConfig.facesView = 'face1x2';
					roomData.viewConfig.facesDisplayed = 2;
				} else if (room.members.length == 4 || room.members.length == 5) {
					roomData.viewConfig.facesView = 'face1x1';
					roomData.viewConfig.facesDisplayed = (room.members.length-1);
				} else if (room.members.length > 5 ){
					roomData.viewConfig.facesView = 'face1x1';
					roomData.viewConfig.facesDisplayed = 3;
					roomData.players.leftover = '+'+(room.members.length - 4);
				}

				_.each(room.corr,function(card){
					if (card.lastUpdated > roomData.lastOpened) {roomData.updates ++}
				});
				roomData.updates = Math.min(roomData.updates,9);

				_.each(room.members,function(playerId){
					if (playerId in state.base.contacts) {
						var subs = state.base.contacts[playerId].email;
						if (typeof subs != 'undefined'){
							// GUIGUI TEMPORARY SOLUTION FOR NAMES
							roomData.players.emails += subs.charAt(0).toUpperCase()+subs.substring(1,subs.indexOf('@'))+', ';
							
							var face = {
								id:playerId,
								profilePic: {
									path: mp.getMediaPath(state.base.contacts[playerId].profilePic),
									id: state.base.contacts[playerId].profilePic
								}
							}
							roomData.players.faces.push(face);				
						}
					} else if (playerId != state.base._id) {
						roomData.players.emails += 'Anonymous, ';
						roomData.players.faces.push('anonymous');
					}
				});
				roomData.players.emails = roomData.players.emails.substring(0,roomData.players.emails.length - 2);
				
				roomListDataSet.push(roomData);
			});

			var frag = roomListFrag({roomList:roomListDataSet});

			$el.find('#roomList').html(frag);

			$el.find('.roomCard').each(function(index,item){

				var $item = $(item);

				hammer(item).on('tap',function(event){
					ev.fire('openRoom', $item.data('id'));
				});

			});
		};

		this.render = function(sel){
			$el = $(sel);

			var html = homeView({state: state});
			$el.html(html);

			mp.updateMediaPaths();

		    ev.on('updateRoomList','RoomCtrl',function(){
				api.update(function(){});
			});

			ev.fire('updateRoomList');

			// BOTTOM NAV BAR
			ev.fire('regContactButton','.app-home-screen');
			ev.fire('regSettingsButton','.app-home-screen');
			ev.fire('regComposeButton','.app-home-screen');
			ev.fire('regCaptureButton','.app-home-screen');
			ev.fire('regEmptyButton','.app-home-screen');

			var scrollInPlace = false;

			ev.on('baseUpdated','contactCtrl',function(){
            	_this.renderRoomList();
            	if (!scrollInPlace) {
					scrollRefresh('roomlistWrapper','updateRoomList');
					document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
					scrollInPlace = true;
            	} else {
            		ev.fire('refreshScroll');
            	}
            });
		};
	};
});

