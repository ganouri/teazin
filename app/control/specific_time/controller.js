/*globals define */
'use strict';

define(['jquery','underscore','knockout','ev','moment','service/api'],function($, _, ko,ev,moment,api){

    return function(frag) {
        var _this = this;

        this.repeat = true;

        this.defaultConfig = function() {
            return {timeMarker : ''};
        };

        this.renderBrief = function(config){
            return frag.itemBrief.replace('%{specific_time.timeMarker}',moment.utc(config.timeMarker,'X').format('hh:mm A'));
        }

        this.validate = function(config,cb){
            cb(true);
        };

        this.renderConfigure = function(sel, model, cb){
            var $el = $(sel);

            var itemConfigFrag = frag.itemConfig.replace('%{specific_time.timeNow}',moment.utc().format('hh:mm A'));
            $el.html(itemConfigFrag);
            var viewModel = ( new function() {
                this.time = ko.observable(moment.utc().format('HH:mm'));
            }());

            ko.applyBindings(viewModel,$el[0]);

            ev.on('specific_time_saveConfig','CreatorCtrl',function(){
                if (viewModel.time()) {
                    var timeMarker = viewModel.time().substring(0,2)*3600 + viewModel.time().substring(3,5)*60;
                    cb({timeMarker:timeMarker});
                } else {
                    alert('Please define a correct time');
                }
            });
        };


        this.renderUnlock = function(sel, model, cb){
            var $el = $(sel);

            model.error = model.timeMarker ? '' : 'No time defined';
            model.timeNow = moment.utc().format('hh:mm A');

            var itemUnlockFrag = frag.itemUnlock.replace('%{specific_time.timeMarker}',moment.utc(model.timeMarker,'X').format('hh:mm A'))
                                                .replace('%{specific_time.timeNow}',model.timeNow)
                                                .replace('%{specific_time.error}',model.error);

            $el.html(itemUnlockFrag);

            /*var viewModel = ( new function(){
                this.attemptData = ko.observable(model.attemptData);
            }());

            ko.applyBindings(viewModel,$el[0]);

            viewModel.attemptData.subscribe(function(updatedData){
                ev.fire('unlockingAttempt');
            });*/

            ev.on('specific_time_unlockingAttempt','BoardCtrl',function(){
                
                var attemptResult = {
                    name : 'specific_time',
                    media : {type:'text',content:model.timeNow},
                    state : ''
                };

                var timeGap = moment.utc() - moment.utc().startOf('day') - model.timeMarker*1000;
        
                if ((timeGap >= 0) && (timeGap <= 3600000)) {
                    attemptResult.state = 'success';
                    $el.removeClass('failure').addClass('success');
                } else {
                   attemptResult.state = 'failure';
                    $el.removeClass('success').addClass('failure');
                }

                cb(attemptResult);
            });

            ev.fire('specific_time_unlockingAttempt'); // for automatic validation
        };
    };
});
