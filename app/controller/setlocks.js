/*globals define, Image*/
'use strict';

define(['jquery','underscore', 'hammer', 'ev','trans','iscroll5','frag', 'service/api', 'service/state',
    'service/control',
    'views/setlocks',
    'views/itemConfig'],function($, _, hammer, ev,trans,iscroll,frag, api, state, controls, setLocksView, itemConfigView){
    return function(creatorState) {
        var _this = this;

        this.regStore = function(){

            var storeView = $('#storeView');
            var storeList = storeView.find('.storeList');
            var storeTab = $('.toolBar .tab[name*="store"]');
            var addItemTab = $('.toolBar .tab[name*="addItem"]');

            _.each(controls, function(item,index){
                var elem = $(item.frag.itemButton).prependTo(storeList);
                elem.attr('name',item.name);

                elem.on('click', function(event) {
                    _this.setItem(controls[item.name]);
                    _this.hideStore();
                });
            });

            addItemTab.on('click', function(event) {
                _this.saveItemsConfig();
                _this.showStore();
            });

            setTimeout(function(){
                var storeScroll = new iScroll('storeView');                
            }, 500);

            this.showStore = function(){
                $('.toolBar .tab').removeClass('activeZone');
                $('.toolView').addClass('hide');
                storeView.removeClass('hide');
                storeTab.removeClass('hide').addClass('activeZone');
                addItemTab.addClass('hide');
            };

            this.hideStore = function(){
                storeView.addClass('hide');
                storeTab.addClass('hide');
                if (_.size(creatorState.locks) < 3 ) {
                    addItemTab.removeClass('hide');            
                }
            };

            this.setItem = function(item){
                creatorState.locks[item.name] = {name:item.name,config:item.controller.defaultConfig()};
                var tabFrag = '<div class="tab" name="'+item.name+'"></div>';
                var itemTab = $(tabFrag).insertBefore($('.toolBar .tab[name*="store"]'));
                $('.toolBar .tab[name*="'+item.name+'"]').html($(item.frag.itemIcon)).addClass('activeZone');

                var itemConfigFrag = itemConfigView({itemId:item.name+'View'});
                var itemConfigPanel = $(itemConfigFrag).insertBefore($('#storeView'));
                itemConfigPanel.attr('name',item.name);
                itemConfigPanel.find('.itemHeader .itemTitle').html(item.frag.itemTitle);

                var itemUnset = itemConfigPanel.find('.itemUnset');
                var itemSave = itemConfigPanel.find('.itemSave');
                var itemConfig = itemConfigPanel.find('.itemConfig');

                item.controller.renderConfigure(itemConfig,item.controller.defaultConfig(),function(config){
                    creatorState.locks[item.name] = {name:item.name,config:config};
                });

                storeList.find('.storeItem[name*="'+item.name+'"]').addClass('hide');

                setTimeout(function(){
                    var itemConfigScroll = new IScroll('#'+item.name+'View', {click: true, scrollbars: true});
                }, 500);

                itemTab.on('click',function(event){
                    _this.saveItemsConfig();
                    _this.hideStore();
                    $('.toolBar .tab').removeClass('activeZone');
                    itemTab.addClass('activeZone');
                    $('.toolView').addClass('hide');
                    itemConfigPanel.removeClass('hide');
                });

                itemUnset.on('click',function(event){
                    delete creatorState.locks[item.name];
                    storeList.find('.storeItem[name*="'+item.name+'"]').removeClass('hide');
                    itemTab.remove();
                    itemConfigPanel.remove();
                    _this.showStore();
                });

                itemSave.on('click',function(event){
                    ev.fire(item.name+'_saveConfig');
                    _this.showStore();
                });
            };
        };

        this.saveItemsConfig = function(){
            _.each(creatorState.locks, function(item){
                ev.fire(item.name+'_saveConfig');
            });
        };

        this.render = function(sel){
            var html = setLocksView();
            var $el = $(sel).html(html);

            _this.regStore();

            $el.find('.lockButton').on('click',function(){
                _this.saveItemsConfig();
                ev.fire('clearStack');
                ev.fire('openCreator',creatorState);
            });
        };
    };
});