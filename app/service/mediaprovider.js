/*global define */
'use strict';

define(['jquery', 'underscore', 'ev', 
        'service/state',
        'service/api'
    ], function ($, _, ev, state, api) {

    var MediaProvider = function() {

        var _this = this;

        _this.mediaList = {};

        function IsValidImageUrl(url,callback) {
            var img = new Image();
            img.onerror = function() { callback(url, false); }
            img.onload =  function() { callback(url, true); }
            img.src = url;
        }

        this.getMediaPath =  function(_id) {
            var localPath = 'file:///storage/emulated/0/Android/data/in.teaz.beta/cache/'+_id;

            /*if (_.contains(_this.localMedias,_id)) {
                return localPath;
            } else {
                if(_id) _this.loadList.push(_id)
                return '';
            }*/
            if (typeof _this.mediaList[_id] != 'undefined' && _this.mediaList[_id] = 'localMedia') {
                return localPath;
            } else if (_id) {
                _this.mediaList[_id] = 'missingMedia';
                return '';
            }
        }

        this.updateMediaPaths = function (order) { // asynchronous

            var idList = order || _this.mediaList;

            _.each(idList, function(type,_id){
                if (type == 'missingMedia') {
                    var localPath = 'file:///storage/emulated/0/Android/data/in.teaz.beta/cache/'+_id, // ONLY FOR ANDROID
                    distantPath = 'https://teazinmedias.s3.amazonaws.com/'+_id;

                    IsValidImageUrl(localPath, function(url, localTest) {
                        if (localTest) {
                            $("[mediaId='"+_id+"']").css("background-image", 'url("'+localPath+'")');
                            _this.mediaList[_id] = 'localMedia';
                        } else {
                            var fileTransfer = new FileTransfer();
                            fileTransfer.download(
                                distantPath,
                                localPath,
                                function(entry) {
                                    $("[mediaId='"+_id+"']").css("background-image", 'url("'+localPath+'")');
                                    _this.mediaList[_id] = 'localMedia';
                                },
                                function(error) {
                                    console.log("download error source " + error.source);
                                    console.log("download error target " + error.target);
                                    console.log("upload error code" + error.code);
                                }
                            );
                        }
                    });
                }                
            });
        };

        return this;
    };

    return new MediaProvider();
});