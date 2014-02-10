define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),roomList = locals_.roomList;
// iterate roomList
;(function(){
  var $$obj = roomList;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var room = $$obj[$index];

buf.push("<div" + (jade.attr("data-id", "" + (room._id) + "", true, false)) + " class=\"roomCard\"><div class=\"facesView\">");
var i = 0
// iterate room.players.faces
;(function(){
  var $$obj = room.players.faces;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var face = $$obj[$index];

i ++
if ( i <= room.viewConfig.facesDisplayed)
{
buf.push("<div" + (jade.attr("style", 'background-image:url("' + (face.profilePic) + '")', true, false)) + (jade.attr("faceId", '' + (face.id) + '', true, false)) + (jade.cls(['face','' + (room.viewConfig.facesView) + ''], [null,true])) + "></div>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var face = $$obj[$index];

i ++
if ( i <= room.viewConfig.facesDisplayed)
{
buf.push("<div" + (jade.attr("style", 'background-image:url("' + (face.profilePic) + '")', true, false)) + (jade.attr("faceId", '' + (face.id) + '', true, false)) + (jade.cls(['face','' + (room.viewConfig.facesView) + ''], [null,true])) + "></div>");
}
    }

  }
}).call(this);

if ( room.players.leftover > 0)
{
buf.push("<div" + (jade.cls(['face','' + (room.viewConfig.facesView) + ''], [null,true])) + "><p>" + (jade.escape((jade.interp = room.players.leftover) == null ? '' : jade.interp)) + "</p></div>");
}
buf.push("</div><div class=\"metaView\"><div class=\"playersList\"><p class=\"noWrap\">" + (jade.escape((jade.interp = room.players.emails) == null ? '' : jade.interp)) + "</p></div>");
if ( room.updates > 0)
{
buf.push("<div class=\"updatesBoard\"><div class=\"updatesSticker\">" + (jade.escape((jade.interp = room.updates) == null ? '' : jade.interp)) + "</div>");
if ( (room.updates == 1))
{
buf.push("<div class=\"updatesLabel noWrap\">Update</div>");
}
else
{
buf.push("<div class=\"updatesLabel noWrap\">Updates</div>");
}
buf.push("</div>");
}
buf.push("</div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var room = $$obj[$index];

buf.push("<div" + (jade.attr("data-id", "" + (room._id) + "", true, false)) + " class=\"roomCard\"><div class=\"facesView\">");
var i = 0
// iterate room.players.faces
;(function(){
  var $$obj = room.players.faces;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var face = $$obj[$index];

i ++
if ( i <= room.viewConfig.facesDisplayed)
{
buf.push("<div" + (jade.attr("style", 'background-image:url("' + (face.profilePic) + '")', true, false)) + (jade.attr("faceId", '' + (face.id) + '', true, false)) + (jade.cls(['face','' + (room.viewConfig.facesView) + ''], [null,true])) + "></div>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var face = $$obj[$index];

i ++
if ( i <= room.viewConfig.facesDisplayed)
{
buf.push("<div" + (jade.attr("style", 'background-image:url("' + (face.profilePic) + '")', true, false)) + (jade.attr("faceId", '' + (face.id) + '', true, false)) + (jade.cls(['face','' + (room.viewConfig.facesView) + ''], [null,true])) + "></div>");
}
    }

  }
}).call(this);

if ( room.players.leftover > 0)
{
buf.push("<div" + (jade.cls(['face','' + (room.viewConfig.facesView) + ''], [null,true])) + "><p>" + (jade.escape((jade.interp = room.players.leftover) == null ? '' : jade.interp)) + "</p></div>");
}
buf.push("</div><div class=\"metaView\"><div class=\"playersList\"><p class=\"noWrap\">" + (jade.escape((jade.interp = room.players.emails) == null ? '' : jade.interp)) + "</p></div>");
if ( room.updates > 0)
{
buf.push("<div class=\"updatesBoard\"><div class=\"updatesSticker\">" + (jade.escape((jade.interp = room.updates) == null ? '' : jade.interp)) + "</div>");
if ( (room.updates == 1))
{
buf.push("<div class=\"updatesLabel noWrap\">Update</div>");
}
else
{
buf.push("<div class=\"updatesLabel noWrap\">Updates</div>");
}
buf.push("</div>");
}
buf.push("</div></div>");
    }

  }
}).call(this);
;return buf.join("");
};
});
