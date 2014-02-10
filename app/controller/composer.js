/*globals define, Image*/
'use strict';

define(['jquery','underscore', 'hammer', 'ev','trans','frag', 'service/api', 'service/state',
	'views/composer', 'service/control'],function($, _, hammer, ev,trans,frag, api, state, composerView, controls){
	return function(config) {
		var _this = this;

		this.render = function(sel){
			var html = composerView();
			var $el = $(sel).html(html);

			$el.find('#composeBox').focus();

			$el.find('.sendTextButton').on('click',function(){
				var submittedText = document.getElementById("composeBox").value;

				if (submittedText.length) {
					var params = _.extend({
						medias: [
							{
								orders: {
									type: 'Text',
									quantity: 1
								},
								payload: {
									type:'Text',
									content: submittedText
								}
							}
						]
					},config);

					ev.fire('openCreator',params);
				} else {
					alert('The text is ... empty ??');
				}				
			});
		};

	};
});