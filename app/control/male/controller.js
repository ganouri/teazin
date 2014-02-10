/*globals define */
'use strict';

define(['jquery','underscore','knockout','ev','service/api'],function($, _, ko,ev,api){

    return function(frag) {
        var _this = this;

        this.repeat = true;

        this.defaultConfig = function() {
            return {};
        };

        this.renderBrief = function(config){
            return frag.itemBrief;
        }

        this.validate = function(config,cb){
            cb(true);
        };

        this.renderConfigure = function(sel, model, cb){
            var $el = $(sel).html(frag.controlConfig);
            if(!model){model = {time:'00:00'};}

            var viewModel =(new function() {
                this.time = ko.observable(model.time);
            }());


            ko.applyBindings(viewModel,$el[0]);

            $el.find('.save').on('click',function(){
                cb({time:viewModel.time()});
            });
        };
    };
});
