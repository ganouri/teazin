/*globals define */
'use strict';

define(['jquery','underscore','knockout','ev','service/api'],function($, _, ko,ev,api){

    return function(frag) {
        var _this = this;

        this.repeat = true;

        this.defaultConfig = function() {
            return {
                question:'What is my favorite desert ? (1 word)',
                answer:''
            };
        };

        this.renderBrief = function(config){
            return frag.itemBrief.replace('%{intimate_question.question}',config.question);
        }

        this.validate = function(config,cb){
            cb(true);
        };

        this.renderConfigure = function(sel, model, cb){
            var $el = $(sel);
            $el.html(frag.itemConfig);

            var viewModel = ( new function() {
                this.question = ko.observable(model.question);
                this.answer = ko.observable(model.answer);
            }());

            ko.applyBindings(viewModel,$el[0]);

            ev.on('intimate_question_saveConfig','CreatorCtrl',function(){
                cb({question:viewModel.question(),answer:viewModel.answer()});
            });
        };

        this.renderUnlock = function(sel, model, cb){
            var $el = $(sel);

            model.error = model.question ? '' : 'No question defined';
            model.error = model.answer ? model.error : model.error+' - No answer defined';
            model.attemptData = '';

            var itemUnlockFrag = frag.itemUnlock.replace('%{intimate_question.question}',model.question)
                                                .replace('%{intimate_question.error}',model.error);

            $el.html(itemUnlockFrag);

            var viewModel = ( new function(){
                this.attemptData = ko.observable(model.attemptData);
            }());

            ko.applyBindings(viewModel,$el[0]);

            viewModel.attemptData.subscribe(function(updatedData){
                ev.fire('unlockingAttempt');
            });

            ev.on('intimate_question_unlockingAttempt','BoardCtrl',function(){
                
                var attemptResult = {
                    name : 'intimate_question',
                    media : {type:'text',content:viewModel.attemptData()},
                    state : ''
                };
                
                if (viewModel.attemptData() == model.answer) {
                    attemptResult.state = 'success';
                    $el.removeClass('failure').addClass('success');
                } else {
                   attemptResult.state = 'failure';
                    $el.removeClass('success').addClass('failure');
                }

                cb(attemptResult);
            });
        };
    };
});
