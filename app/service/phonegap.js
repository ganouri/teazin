/*global define */
'use strict';

define(['service/api'], function(api){

    var Phonegap = function() {
        var _this = this;

        this.getPicture = function(options, cb){
            console.log('in getpicture')
            navigator.camera.getPicture(
                function(image) {
                    
                    console.log(image)
                    cb({
                        payload:{type: 'Picture', path: image},
                        error: ''
                    });
                },
                function() {
                    cb({payload: {type: 'Picture', path: ''}, error: 'NOK'});
                },
                {
                  quality: options.quality || 50,
                  destinationType: options.destinationType || 1, //DATA_URL : 0, FILE_URI : 1, NATIVE_URI : 2
                  sourceType: options.sourceType || 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                  encodingType: options.encodingType || 0, // 0=JPG 1=PNG
                  correctOrientation: options.correctOrientation || true
                }
            );
        };

        this.uploadFile = function (data, cb){
            console.log('in upload file')
            var fileURI = data.payload.path;
            var options = new FileUploadOptions();
            var params = {client: 'phonegap'};

            options.fileKey  = "file";
            options.fileName = fileURI.substr(fileURI.lastIndexOf('/')+1);
            options.mimeType = "image/jpeg";
            options.params   = params;

            var ft = new FileTransfer();

            api.getMediaId(function(errors, payload){
                console.log('in getMediaId')
                if(! errors && payload._id){
                    ft.upload(
                        fileURI,
                        encodeURI(api.mediaURI+payload._id),
                        function(r){
                            console.log('successful upload')
                            cb(_.extend(data, {upload: JSON.parse(r.response), error: undefined}));
                        },
                        function(e){
                            console.log('arguments:'+JSON.stringify(arguments));
                            console.log('failed to upload:'+JSON.stringify(e));
                            cb(_.extend(data, {upload: undefined, error: 'FAILED'}));
                        },
                        options
                    );
                }else{
                    console.log('errors:'+JSON.stringify(errors));
                }
            });
        };

        /*
        this.downloadFile = function (imageURI, uri, success, error) {
            var options = new FileUploadOptions();
            var ft = new FileTransfer();
            //if( window.navigator.platform != 'Win32' ){
            ft.download(encodeURI(uri), imageURI, success, function(e){
                //service error
                error(e);
            }, options);
        };*/

        return this;
    };

    return new Phonegap();
});