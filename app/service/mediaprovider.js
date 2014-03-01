/*global define */
'use strict';

define(['jquery', 'service/api'], function ($, api) {

    var MediaProvider = function() {

        this.getMediaPath = function (_id) {

            function IsValidImageUrl(url,callback) {
                var img = new Image();
                img.onerror = function() { callback(url, false); }
                img.onload =  function() { callback(url, true); }
                img.src = url;
            }

            var localPath   = 'file:///storage/emulated/0/Android/data/in.teaz.beta/cache/'+_id,
                distantPath = 'https://teazinmedias.s3.amazonaws.com/'+_id;

            IsValidImageUrl(localPath, function(url, answer) {
                if (answer) {
                    alert('local is here');
                } else {
                    alert('local is missing');
                }
            });
            IsValidImageUrl(distantPath, function(url, answer) {
                if (answer) {
                    alert('distant is here');
                } else {
                    alert('distant is missing');
                }
            });
        }

        return this;
    };

    return new MediaProvider();
});