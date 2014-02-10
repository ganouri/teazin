/*global define */
'use strict';

define(['jquery','underscore'],function($, _){

    return function(path,cb){
        require([path],function(frag){
            var content = frag().split('<div class="app-fragment">');
            var fragx = {};
            _.each(content,function(item) {
                var subs = item.substring(0,item.length-6);
                var name = subs.substring(0,subs.indexOf('<'));
                var html = subs.substring(subs.indexOf('<'),subs.length);
                fragx[name] = html;
            });
            cb(fragx);
        });

    };



});