/*globals define */
'use strict';

define(['jquery','ev'],function($,ev){
	var Trans = function(){
		var _this   = this;
		var classes = [
			'pt-page-moveToLeft',
			'pt-page-moveFromLeft',
			'pt-page-moveToRight',
			'pt-page-moveFromRight',
			'pt-page-moveToTop',
			'pt-page-moveFromTop',
			'pt-page-moveToBottom',
			'pt-page-moveFromBottom',
			'pt-page-moveToLeftFade',
			'pt-page-moveFromLeftFade',
			'pt-page-moveToRightFade',
			'pt-page-moveFromRightFade',
			'pt-page-moveToTopFade',
			'pt-page-moveFromTopFade',
			'pt-page-moveToBottomFade',
			'pt-page-moveFromBottomFade',
			'pt-page-moveToLeftEasing',
			'pt-page-moveToRightEasing',
			'pt-page-moveToTopEasing',
			'pt-page-moveToBottomEasing'
		];
		var currentScreen;

		this.render = function(ctrl,sel,dir,keep){
			
			if(!$(sel).hasClass('keep')){
				ctrl.render(sel);
			}

			ev.fire('forward',ctrl,sel);

			if(currentScreen !== sel){
				if(dir === 'right'){
					_this.right(currentScreen, sel, keep);
				} else {
					_this.left(currentScreen, sel, keep);
				}
			}
			currentScreen = sel;
		};

		this.left = function(prev,next,keep){
			move(prev,next,'pt-page-moveToLeft pt-page-current', 'pt-page-moveFromRight pt-page pt-page-current',keep);
		};

		this.right = function(prev,next,keep){
			move(prev,next,'pt-page-moveToRight pt-page-current', 'pt-page-moveFromLeft pt-page pt-page-current',keep);
		};

		var move = function(prev,next,a,b,keep){
			_this.removeAnims(prev);
			$(prev).addClass(a);
			$(next).addClass(b).removeClass('keep');
			if(!keep){
				disposeScreen(prev);
			} else {
				keepScreen(prev);
			}
			setTimeout(function(){
				_this.removeAnims(prev);
				_this.removeAnims(next);
			},600);
		};

		this.removeAnims = function(prev){
			var x = $(prev);

			_.each(classes, function(className){
				this.removeClass(className)
			}, x);
		};

		var disposeScreen = function(prev){
			setTimeout(function(){
				$(prev).removeClass('pt-page-current pt-page').removeClass('keep');
				$(prev).html('');
			},0); //500 with animations
		};

		var keepScreen = function(prev){
			setTimeout(function(){
				$(prev).removeClass('pt-page-current').addClass('keep');
			},0); //500 with animations
		};
	};
	return new Trans();
});