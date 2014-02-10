/*globals define, Image*/
'use strict';

define(['jquery','underscore', 'hammer', 'ev','trans','frag', 'service/api', 'service/state','service/device',
    'views/capture'],function($, _, hammer, ev,trans,frag, api, state, device, captureView){
    return function(orders,cb) {
        var _this = this;

        this.render = function(sel){
            var html = captureView();
            var $el = $(sel).html(html);

            $el.find('.app-body').on('click',function(){
                device.getMedias(orders, cb);
            })

            $el.find('.footer').on('click',function(){
                device.getMedias(orders, cb);
            })
        };

    };
});