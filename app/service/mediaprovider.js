/*global define */
'use strict';

define(['jquery', 'service/api'], function ($, api) {

    var MediaProvider = function() {

        function IsValidImageUrl(url,callback) {
            var img = new Image();
            img.onerror = function() { callback(url, false); }
            img.onload =  function() { callback(url, true); }
            img.src = url;
        }

        this.getMediaPath = function (_id) {

            var localPath = 'file:///storage/emulated/0/Android/data/in.teaz.beta/cache/'+_id, // ONLY FOR ANDROID
                distantPath = 'https://teazinmedias.s3.amazonaws.com/'+_id;

            IsValidImageUrl(localPath, function(url, localTest) {
                if (localTest) {
                    return localPath;
                } else {
                    return '../images/loaders/missingMedia.gif';
                }
            });
        };

        this.updateMediaPath = function (_id) {

            var localPath = 'file:///storage/emulated/0/Android/data/in.teaz.beta/cache/'+_id, // ONLY FOR ANDROID
                distantPath = 'https://teazinmedias.s3.amazonaws.com/'+_id;

            IsValidImageUrl(localPath, function(url, localTest) {
                if (localTest) {
                    return true;
                } else {
                    IsValidImageUrl(distantPath, function(url, distantTest) {
                        if (distantTest) {
                            var fileTransfer = new FileTransfer();

                            fileTransfer.download(
                                distantPath,
                                localPath,
                                function(entry) {
                                    $("[mediaId='"+_id+"']").css("background-image", "url("+localPath+")");
                                },
                                function(error) {
                                    console.log("download error source " + error.source);
                                    console.log("download error target " + error.target);
                                    console.log("upload error code" + error.code);
                                }
                            );
                        } else {
                            alert('distant image is missing');
                        }
                    });
                }
            });
        };

        return this;
    };

    return new MediaProvider();
});