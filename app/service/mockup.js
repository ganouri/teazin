/*global define */
'use strict';

define(['service/api'], function (api) {

    var Mockup = function() {
        var _this = this;

        this.getPicture = function (options, cb){
            (function closure(cb){
                var callback = cb;
                setTimeout(function(){
                    callback({payload:{type: 'Picture', path: 'images/guigui/content/img-sample-lady.png'}, error: ''});
                }, 300);
            })(cb);
        };

        this.uploadFile = function (data, cb){
            data.payload.id = "15575da0-1352-11e3-abfa-8742d5c09769";
            cb(_.extend(data, {upload: {payload: data.payload.id}, error: undefined}));
        };

        return this;
    };

    return new Mockup();
});