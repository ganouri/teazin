/*global define */
'use strict';

define(['jquery', 'ev', 'service/api'], function ($, ev, api) {

    var MediaProvider = function() {

        function IsValidImageUrl(url,callback) {
            var img = new Image();
            img.onerror = function() { callback(url, false); }
            img.onload =  function() { callback(url, true); }
            img.src = url;
        }

        this.updateMediaPath = function (_id) {

            var localPath = 'file:///storage/emulated/0/Android/data/in.teaz.beta/cache/'+_id, // ONLY FOR ANDROID
                distantPath = 'https://teazinmedias.s3.amazonaws.com/'+_id;

            IsValidImageUrl(localPath, function(url, localTest) {
                if (localTest) {
                    $(".rewardImg[mediaId='"+_id+"']").css("background-image", 'url("'+localPath+'")');
                } else {
                    IsValidImageUrl(distantPath, function(url, distantTest) {
                        if (distantTest) {
                            var fileTransfer = new FileTransfer();

                            fileTransfer.download(
                                distantPath,
                                localPath,
                                function(entry) {
                                    $(".rewardImg[mediaId='"+_id+"']").css("background-image", 'url("'+localPath+'")');
                                },
                                function(error) {
                                    console.log("download error source " + error.source);
                                    console.log("download error target " + error.target);
                                    console.log("upload error code" + error.code);
                                }
                            );
                        } else {
                            console.log('image not found on s3');
                        }
                    });
                }
            });
        };

        return this;
    };

    return new MediaProvider();
});