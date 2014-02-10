/*globals define */
'use strict';

define(['jquery','ev','iscroll'],function($,ev,iscroll){
    return function(wrapperId,refreshEvent){
        var _this   = this;

        var pullDownEl = document.getElementById('pullDown');
        var pullDownOffset = pullDownEl.offsetHeight;
        /*var pullUpEl = document.getElementById('pullUp');        
        var pullUpOffset = pullUpEl.offsetHeight;*/

        var scrollRefresh = new iScroll(wrapperId, { 
            mouseWheel: true,
            useTransition: true,
            topOffset: pullDownOffset,
            onRefresh: function () {
                    if (pullDownEl.className.match('loading')) {
                            pullDownEl.className = '';
                            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                    } /*else if (pullUpEl.className.match('loading')) {
                            pullUpEl.className = '';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
                    }*/
            },
            onScrollMove: function () {
                    if (this.y > 5 && !pullDownEl.className.match('flip')) {
                            pullDownEl.className = 'flip';
                            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
                            this.minScrollY = 0;
                    } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                            pullDownEl.className = '';
                            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                            this.minScrollY = -pullDownOffset;
                    } /*else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                            pullUpEl.className = 'flip';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
                            this.maxScrollY = this.maxScrollY;
                    } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                            pullUpEl.className = '';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
                            this.maxScrollY = pullUpOffset;
                    }*/
            },
            onScrollEnd: function () {
                    if (pullDownEl.className.match('flip')) {
                            pullDownEl.className = 'loading';
                            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';                                

                            ev.fire(refreshEvent);
                            scrollRefresh.refresh();
                    } /*else if (pullUpEl.className.match('flip')) {
                            pullUpEl.className = 'loading';
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';                                
                            setTimeout(function(){
                                ev.fire(refreshEvent);
                                scrollRefresh.refresh();
                            }, 1000); 
                    }*/
            }
        });

        ev.on('refreshScroll','',function(){
            scrollRefresh.refresh();
        });

    };
});
