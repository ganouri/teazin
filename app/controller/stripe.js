/*globals define, Image*/
'use strict';

define(['jquery','underscore', 'hammer', 'moment', 'vague', 'ev','trans','frag', 'service/api', 'service/state', 'views/stripe', 'service/control'],function($, _, hammer, moment, vague, ev,trans,frag, api, state, stripeView, controls){
	return function(resourceId, $room, roomScroll) {
		var _this = this;
		var controlState = {controls:[]};
		var $el = $room.find('div[data-id="'+resourceId+'"]');

		var owner = {
			_id: state.resc[resourceId].user,
			nickname: 'unknown',
			myself: false
		};

		if(owner._id===state.base._id){
			owner.myself   = true;
			owner.nickname = state.base.nickname;
		}else if(state.base.contacts[owner._id]){
			owner.nickname = state.base.contacts[owner._id].nickname;
		}

		var rescMockup = {
		  _id: "52d02170-3185-11e3-a8e1-199d4f5ea847",
		  alwaysLocked: true,
		  controls:[
		  	{ config:{time: '04:00'}, name:"specific_time", unlocked: [] },
		  	{ config:{time: '23:00'}, name:"specific_time", unlocked: [] }
		  ],
		  primary: {
		  	type:"image", content:"images/200.png", createdOn: 1381404591002, user: '52d02170-3185-11e3-a8e1-199d4f5ea847'
		  },
		  secondary: {
		  	1381404591104:{type:"message",content:"Sally got the question wrong",createdOn: 1381404591104,user: 'b63dea00-134c-11e3-abfa-8742d5c09769'},
		  	1381404591115:{type:"message",content:"Sally got the question wrong",createdOn: 1381404591115,user: 'b63dea00-134c-11e3-abfa-8742d5c09769'},
		  	1381404591130:{type:"message",content:"Sally got the question wrong",createdOn: 1381404591130,user: 'b63dea00-134c-11e3-abfa-8742d5c09769'}
		  },
		  user: '1a94fe60-11e2-11e3-9d56-e905026ad8ab', //b63dea00-134c-11e3-abfa-8742d5c09769
		  completed:[] //'1a94fe60-11e2-11e3-9d56-e905026ad8ab'
		};

		var stripeState = {
			locked: ! owner.myself && ! _.contains(rescMockup.completed, state.base._id)
		};


		//console.log(state.resc[resourceId]);

		this.render = function(){

			var lastRB = rescMockup.secondary[ Object.keys(rescMockup.secondary)[0] ];
			var html = stripeView({state: state, rescId: resourceId, owner: owner, stripeState: stripeState, controls: controls, rescMockup: rescMockup, last: lastRB, moment: moment});
			$el.html(html);

			var img = new Image();
			img.src = 'images/200.png';
			img.setAttribute('class', 'thumbnail');
			$el.find('.message-primary-image').append(img);

			//$el.find()

			/*var containerWidth = $('.message-container').width();
			var pullRight = 'transition-right';
			var pullLeft  = 'transition-left';

			var $options  = $el.find('.container-options'); //$(item);

			hammer($options.get(0)).on("drag release", function(ev) {
				if(! ev.gesture){
					return;
				}

				roomScroll.disable();

				ev.gesture.preventDefault();

				var posX  = 100*(containerWidth-ev.gesture.center.pageX)/containerWidth;
				switch(ev.type){
					case 'drag':
					case 'swipeleft':
					case 'swiperight':
						$options.removeClass(pullRight);
					break;
					case 'release':
						if(posX < 70 && ev.gesture.direction === 'right'){
							posX = 5;
						} else if (posX > 30 && ev.gesture.direction === 'left'){
							posX = 95;
						} else if( ev.gesture.direction === 'left'){
							posX = 5;
						} else {
							posX = 95;
						}
						$options.addClass(pullRight);
						setTimeout(function(){
							$options.removeClass(pullRight);
							roomScroll.enable();
						}, 400);
						break;
				}

				$options.css('right', posX+'%');
			});*/

			/*var $rbPullover = $el.find('.right-block-puller');
			var maxLeft = stripeState.locked ? 20.5 : 54.5;
			hammer($rbPullover.get(0)).on("drag release", function(ev){
				if(! ev.gesture){
					return;
				}

				roomScroll.disable();
				ev.gesture.preventDefault();

				var posX  = 100- (100*(containerWidth-ev.gesture.center.pageX)/containerWidth);
				switch(ev.type){
					case 'drag':
					case 'swipeleft':
					case 'swiperight':
						if(posX>95){
							posX=98;
						}else if(posX<maxLeft){
							posX=maxLeft-2;
							$rbPullover.addClass('left-edge');
						}
						$rbPullover.removeClass(pullLeft);
					break;
					case 'release':
						if(posX > 80 && ev.gesture.direction === 'left'){
							posX = maxLeft;
						} else if (posX < 65 && ev.gesture.direction === 'right'){
							posX = 95;
						} else if( ev.gesture.direction === 'right'){
							posX = 95;
						} else {
							posX = maxLeft;
						}
						$rbPullover.removeClass('left-edge');
						$rbPullover.addClass(pullLeft);
						setTimeout(function(){
							$rbPullover.removeClass(pullLeft);
							roomScroll.enable();
						}, 400);
						break;
				}

				$rbPullover.css('left', posX+'%');
			});*/

		};

		this.tryUnlock = function(){

			if(! stripeState.locked){
				return;
			}

/*
			if owner==me, 
			then unlock
			else
				if alwaysLocked = true
				else
					if me in unlocked
					then unlocked
					else 
						for each control
							if me in 
								then unlocked_control
								else evaluate control


			*/
			/*if(! owner.myself && ! alwaysLocked){

			}*/

			this.toggleLocked();

		}

		this.toggleLocked = function(){
			stripeState.locked = ! stripeState.locked;

			//unlock function: optimize change
			$el.find('.left-block').toggleClass('short-block');
			$el.find('.stripe-content').toggleClass('content-locked');
			$el.find('.status_img').toggleClass('unlocked locked');
			$el.find('.right-block').toggleClass('long-block');
		}

	};
});