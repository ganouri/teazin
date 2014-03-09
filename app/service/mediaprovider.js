/*global define */
'use strict';

define(['jquery', 'underscore', 'ev', 
        'service/state',
        'service/api'
    ], function ($, _, ev, state, api) {

    var MediaProvider = function() {

        var _this = this;

        _this.mediaList = {};

        function fail(evt) {
            console.log(evt.target.error.code);
        }

        if(typeof _this.localPath === 'undefined') {
            window.requestFileSystem(
                LocalFileSystem.PERSISTENT, 0, 
                function onFileSystemSuccess(fileSystem) {
                    fileSystem.root.getFile(
                        "dummy.html",
                        {create: true, exclusive: false}, 
                        function(fileEntry) {
                            _this.localPath = fileEntry.fullPath.replace("dummy.html","");
                            alert(_this.localPath);
                        },
                        fail
                    );
                },
                fail  
            );
            //_this.localPath = '/images/downloaded/';
        }

        function IsValidImageUrl(url,callback) {
            var img = new Image();
            img.onerror = function() { callback(url, false); }
            img.onload =  function() { callback(url, true); }
            img.src = url;
        }

        function displayMedia(_id,url) {
            $("[mediaId='"+_id+"']").css("background-image", 'url("'+url+'")');
            _this.mediaList[_id] = 'localMedia';
        }

        this.getMediaPath =  function(_id) {
            var localMediaPath = _this.localPath+_id;
            if (typeof _this.mediaList[_id] != 'undefined' && _this.mediaList[_id] == 'localMedia') {
                return localMediaPath;
            } else if (_id) {
                _this.mediaList[_id] = 'missingMedia';
                return '';
            }
        }

        this.updateMediaPaths = function (order) { // asynchronous

            var idList = order || _this.mediaList;

            _.each(idList, function(type,_id){
                if (type == 'missingMedia') {
                    var distantMediaPath = 'https://teazinmedias.s3.amazonaws.com/'+_id,
                        localMediaPath = _this.localPath+_id;

                    IsValidImageUrl(localMediaPath, function(url, localTest) {
                        if (localTest) {
                            displayMedia(_id,localMediaPath);
                        } else {
                            var fileTransfer = new FileTransfer();
                            fileTransfer.download(
                                distantMediaPath,
                                localMediaPath,
                                function(entry) {
                                    displayMedia(_id,localMediaPath);
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