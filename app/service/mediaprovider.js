/*global define */
'use strict';

define(['jquery', 'underscore', 'ev', 
        'service/state',
        'service/api'
    ], function ($, _, ev, state, api) {

    var MediaProvider = function() {

        var _this = this;

        _this.localMedias = [];
        _this.loadList = [];

        function IsValidImageUrl(url,callback) {
            var img = new Image();
            img.onerror = function() { callback(url, false); }
            img.onload =  function() { callback(url, true); }
            img.src = url;
        }

        this.getMediaPath =  function(_id) {
            var localPath = 'file:///storage/emulated/0/Android/data/in.teaz.beta/cache/'+_id;

            console.log(_this.loadList);
            if (_.contains(_this.localMedias,_id)) {
                return localPath;
            } else {
                if(!_.contains(_this.loadList,_id) && _id) _this.loadList.push(_id)
                return '';
            }
        }

        this.updateMediaPaths = function (order) { // asynchronous

            var idList = order || _this.loadList;
            console.log('updateMediaPaths')

            _.each(idList, function(_id){

                var localPath = 'file:///storage/emulated/0/Android/data/in.teaz.beta/cache/'+_id, // ONLY FOR ANDROID
                    distantPath = 'https://teazinmedias.s3.amazonaws.com/'+_id;

                IsValidImageUrl(localPath, function(url, localTest) {
                    if (localTest) {
                        $("[mediaId='"+_id+"']").css("background-image", 'url("'+localPath+'")');
                        _this.localMedias.push(_id);
                        _this.loadList = _.without(_this.loadList,_id);
                    } else {
                        IsValidImageUrl(distantPath, function(url, distantTest) {
                            if (distantTest) {
                                var fileTransfer = new FileTransfer();

                                fileTransfer.download(
                                    distantPath,
                                    localPath,
                                    function(entry) {
                                        $(".rewardImg[mediaId='"+_id+"']").css("background-image", 'url("'+localPath+'")');
                                        _this.localMedias.push(_id);
                                        _this.loadList = _.without(_this.loadList,_id);
                                    },
                                    function(error) {
                                        console.log("download error source " + error.source);
                                        console.log("download error target " + error.target);
                                        console.log("upload error code" + error.code);
                                    }
                                );
                            } else {
                                //console.log('image not found on s3'); // GUIGUI to be cleared
                            }
                        });
                    }
                });
                
            });
        };

        ev.on('updateMediaPaths','MediaProvider', function(idList){
            if (idList) {
                this.updateMediaPaths(idList);
            } else {
                this.updateMediaPaths(loadList);
            }
        })

        return this;
    };

    return new MediaProvider();
});