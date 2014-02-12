/*global define */
'use strict';

define(['jquery', 'service/phonegap', 'service/mockup'], function ($, pg, mockup) {

    var DeviceBridge = function () {
        var _this = this;

        this.getPicture = function () {
            return navigator.camera ? pg.getPicture : mockup.getPicture;
        }();

        this.uploadFile = function() {
            return typeof FileTransfer === 'function' ? pg.uploadFile : mockup.uploadFile;
        }();

        /*
            return an object containing the order
            note: object back is inserted in the result array at the index of the orders
        */
        this.processOrder = function(order, key){

            var results     = this.results;
            var temporaryCB = this.temporaryCB;
            var methode     = 'get'+order.type;
            var options     = order.options || {};

            if( _this[methode] ){
                _this[methode](options, function (data){
                    //upload picture using api : Linux x86_64 // Linux armv7l
                    console.log('cb picture')
                    results[key] = _.extend(data, {order: order});
                    if(data.payload.path){
                        console.log('ok path');
                        console.log(data.payload.path)
                        _this.uploadFile(results[key], function(data){
                            console.log('upload_done')
                            results[key] = data;
                            temporaryCB();
                        });
                        // [{"payload":{"type":"Picture","path":"file:///storage/emulated/0/Android/data/com.phonegap.hello_world/cache/1381579613631.jpg"},"order":{"type":"Picture","quantity":1},"upload":{"payload":"cc1e1160-3336-11e3-9fd9-750159600002"}}]
                    }else{
                        temporaryCB();
                    }

                });
            }else{
                results[key] = {order: order, error: 'undefined method '+methode};
                temporaryCB();
            }
        };

        /*
            resulting array sorted as the orders
            cb get call after each order are processed
        */
        this.getMedias = function(orders, cb){
            var results = [];
            var callback;
            callback = _.after(_.size(orders), function(){
                cb(results);
            });
            _.each(orders, this.processOrder, {results: results, temporaryCB: callback});
        };

        return this;
    };

    return new DeviceBridge();
});