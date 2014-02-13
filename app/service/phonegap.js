/*global define */
'use strict';

define(['service/api'], function(api){

    var Phonegap = function() {
        var _this = this;

        this.getPicture = function(options, cb){
            navigator.camera.getPicture(
                function(image) {
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
            var expiration = new Date(new Date().getTime() + 1000 * 60 * 5).toISOString(),
                fileURI = data.payload.path,
                fileName = fileURI.substr(fileURI.lastIndexOf('/')+1),
                policy ={ "expiration": expiration,
                    "conditions": [
                        {"bucket": "helopetry"},
                        {"key": fileName},
                        {"acl": 'public-read'},
                        ["starts-with", "$Content-Type", ""],
                        ["content-length-range", 0, 524288000]
                    ]
                },
                policyBase64 = new Buffer(JSON.stringify(policy), 'utf8').toString('base64'),
                secretKey = "I6r7x7Xdqi4y9jMtTRfgCVa8hr/P9y94pyizVc9E",
                signature = CryptoJS.SHA1(secretKey).update(new Buffer(base64Policy, "utf-8")).digest("base64"),
                awsKey = 'AKIAJL4YJ2S7PPYPQUNQ',
                acl = "public-read";               

            var options = new FileUploadOptions();

            options.fileKey  = "file";
            options.fileName = fileName;
            options.mimeType = "image/jpeg";
            options.chunkedMode = "true";
            options.params   = {
                "key": fileName,
                "AWSAccessKeyId": awsKey,
                "acl": acl,
                "policy": policyBase64,
                "signature": signature,
                "Content-Type": "image/jpeg"
            };

            var ft = new FileTransfer();

            api.getMediaId(function(errors, payload){
                if(! errors && payload._id){
                    ft.upload(
                        fileURI,
                        encodeURI(api.mediaURI+payload._id),
                        function(r){
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