/*global define,window,document, navigator */
'use strict';

(function(window){
    var isMobile = function() {
        console.log('navigator.userAgent'+ JSON.stringify(navigator.userAgent));
        var chrome = navigator.userAgent.match(/Chrome/);
        return navigator.userAgent.match(/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/);
    };

    require.config({
        baseUrl: 'app/',
        paths: {
            'jquery': '../js/jquery',
            'jadeRuntime': '../js/jadeRuntime',
            'knockout': '../js/knockout',
            'md5': '../js/md5',
            'underscore': '../js/underscore',
            'trans': 'util/trans',
            'scrollRefresh': 'util/scrollrefresh',
            'hammer': '../js/hammer',
            'frag': 'util/frag',
            'ev': 'util/bind',
            'vague':'../js/vague',
            'pixt':'../js/pixastic',
            'moment': '../js/moment',
            'html2canvas':'../js/html2canvas',
            'fastclick': '../js/fastclick',
            'iscroll': '../js/iscroll',
            'iscroll5': '../js/iscroll5',
            'domReady': '../js/domReady',
            /*'cordova': (isMobile()) ?
                        ['../cordova']
                        :
                        ['../bridge']*/
            'cordova': ['../cordova']
            //'cordova': '../bridge'
        },
        shim: {
            hammer: {
                exports: 'Hammer'
            },
            html2canvas: {
                exports: 'html2canvas'
            },
            vague: {
                deps: ['jquery'],
                //\exports: 'jquery.blurjs'
            },
            pixt: {
                exports: 'Pixastic'
            },
            underscore: {
                exports: '_'
            }
        }
    });

    require(['cordova', 'domReady', 'fastclick','options', 'jquery', 'hammer', 'ev', 'trans', 'controller/main', 'model/main', 'service/api', 'service/control','perso'],
        function(cordova, domReady, FastClick,options, $, hammer, ev, trans, MainCtrl, MainModel, api, control,perso) {
        domReady(function () {
            console.log('The DOM is ready - waiting for the device');
            document.addEventListener('deviceready', startWhenReady, false);
            if(cordova.start){cordova.start();}

            FastClick.attach(document.body);
            setTimeout(function(){
                window.scrollTo(0, 1);
            }, 0);
        });

        function startWhenReady(){
            var mainCtrl = new MainCtrl();
            mainCtrl.render('.app');
        }

    });

})(window);