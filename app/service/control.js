/*global define */
'use strict';

define(['underscore','ev','service/api'],function(_, ev,api){

    var controlNames = ['specific_time','intimate_question'/*,'face_reaction','smile_capture','flame','male','girl','couple','hands','location'*/];
    var controls = {};

    _.each(controlNames,function(name){
        controls[name] = {};
        require(['control/'+name+'/controller','control/'+name+'/frag','control/'+name+'/model'],function(Controller,frag,model){
            controls[name].model = model;
            controls[name].name = name;

            var content = frag().split('<div class="app-fragment">');
            var fragx = {};

            _.each(content,function(item) {
                var subs = item.substring(0,item.length-6);                 // remove </div>
                var name = subs.substring(0,subs.indexOf('<'));             // extract name
                var html = subs.substring(subs.indexOf('<'),subs.length);   // get the rest of it
                fragx[name] = html;
            });

            controls[name].controller = new Controller(fragx);
            controls[name].frag = fragx;
        });
    });
    //while(Object.keys(controls).length < controlNames)
    return controls;
});