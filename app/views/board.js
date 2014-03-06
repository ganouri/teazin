define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),board = locals_.board,controls = locals_.controls;
buf.push("<div class=\"header\"><div class=\"action action-left\"></div><div class=\"header-title\"><p class=\"noWrap\">" + (jade.escape((jade.interp = board.namesList) == null ? '' : jade.interp)) + "</p></div><div class=\"action action-right\"></div></div><div id=\"boardWrapper\" class=\"app-body\"><div class=\"boardScroller\"><div class=\"playersZone boardZone\">");
// iterate board.players
;(function(){
  var $$obj = board.players;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var player = $$obj[$index];

if ( player._id != board.user._id)
{
buf.push("<div class=\"loadingFace\"><div" + (jade.attr("style", 'background-image:url("' + (player.profilePic.path) + '")', true, false)) + (jade.attr("mediaId", '' + (player.profilePic.id) + '', true, false)) + " class=\"face\"></div></div>");
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var player = $$obj[$index];

if ( player._id != board.user._id)
{
buf.push("<div class=\"loadingFace\"><div" + (jade.attr("style", 'background-image:url("' + (player.profilePic.path) + '")', true, false)) + (jade.attr("mediaId", '' + (player.profilePic.id) + '', true, false)) + " class=\"face\"></div></div>");
}
    }

  }
}).call(this);

buf.push("</div><div class=\"rewardZone boardZone row\"><div class=\"rewardContainer\">");
if ( board.primaryMedia.type === 'Picture')
{
buf.push("<div class=\"loadingImg\"><div" + (jade.attr("style", 'background-image:url("' + (board.primaryMedia.path) + '")', true, false)) + (jade.attr("mediaId", '' + (board.primaryMedia.id) + '', true, false)) + " class=\"rewardImg\"></div></div>");
}
else if ( board.primaryMedia.type === 'Text')
{
buf.push("<div class=\"rewardText\"><p>" + (jade.escape((jade.interp = board.primaryMedia.content) == null ? '' : jade.interp)) + "</p></div>");
}
if ( board.viewConfig.gameView == 'locked')
{
buf.push("<div class=\"rewardMask\"><div class=\"maskLabel\">LOCKED</div></div>");
}
buf.push("</div></div>");
if ( board.viewConfig.gameView == 'locked')
{
buf.push("<div class=\"gameZone boardZone\"><div class=\"gameHeader\"><div class=\"gameCreator\"><div class=\"loadingFace\"><div" + (jade.attr("style", 'background-image:url("' + (board.currentGame.user.profilePic.path) + '")', true, false)) + (jade.attr("mediaId", '' + (board.currentGame.user.profilePic.id) + '', true, false)) + " class=\"face\"></div></div></div><div class=\"gameMeta\"><div class=\"playerName gameMetaText\"><p class=\"noWrap\">Locked by " + (jade.escape((jade.interp = board.currentGame.user.nickname) == null ? '' : jade.interp)) + "</p></div><div class=\"gameTime gameMetaText\"><p class=\"noWrap\">" + (jade.escape((jade.interp = board.currentGame.fromNow) == null ? '' : jade.interp)) + "</p></div></div></div><div class=\"gameLocks\">");
// iterate board.currentGame.locks
;(function(){
  var $$obj = board.currentGame.locks;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<div" + (jade.attr("name", '' + (item.name) + '', true, false)) + " class=\"itemAttempt\"><div class=\"itemHeader activeZone row fixed-area\"><div class=\"itemUnset\">" + (null == (jade.interp = controls[item.name].frag.itemIcon) ? "" : jade.interp) + "</div><div class=\"itemTitle\">" + (null == (jade.interp = controls[item.name].frag.itemTitle) ? "" : jade.interp) + "</div></div><div class=\"attemptView\"></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<div" + (jade.attr("name", '' + (item.name) + '', true, false)) + " class=\"itemAttempt\"><div class=\"itemHeader activeZone row fixed-area\"><div class=\"itemUnset\">" + (null == (jade.interp = controls[item.name].frag.itemIcon) ? "" : jade.interp) + "</div><div class=\"itemTitle\">" + (null == (jade.interp = controls[item.name].frag.itemTitle) ? "" : jade.interp) + "</div></div><div class=\"attemptView\"></div></div>");
    }

  }
}).call(this);

buf.push("</div></div>");
}
// iterate board.currentGame.attempts
;(function(){
  var $$obj = board.currentGame.attempts;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var attempt = $$obj[$index];

buf.push("<div" + (jade.cls(['boardZone','attemptZone','' + (attempt.state) + ''], [null,null,true])) + "><div class=\"gameHeader\"><div class=\"gameCreator\"><div class=\"loadingFace\"><div" + (jade.attr("style", 'background-image:url("' + (attempt.user.profilePic.path) + '")', true, false)) + (jade.attr("mediaId", '' + (attempt.user.profilePic.id) + '', true, false)) + " class=\"face\"></div></div></div><div class=\"gameMeta\"><div class=\"playerName gameMetaText\">");
if ( attempt.state == 'success')
{
buf.push("<p class=\"noWrap\">Successfully unlocked by " + (jade.escape((jade.interp = attempt.user.nickname) == null ? '' : jade.interp)) + "</p>");
}
if ( attempt.state == 'failure')
{
buf.push("<p class=\"noWrap\">Failed attempt by " + (jade.escape((jade.interp = attempt.user.nickname) == null ? '' : jade.interp)) + "</p>");
}
buf.push("</div><div class=\"gameTime gameMetaText\"><p class=\"noWrap\">" + (jade.escape((jade.interp = attempt.fromNow) == null ? '' : jade.interp)) + "</p></div></div></div><div class=\"gameLocks\">");
// iterate attempt.items
;(function(){
  var $$obj = attempt.items;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<div class=\"lockOn\"><div class=\"lockIcon\">" + (null == (jade.interp = controls[item.name].frag.itemIcon) ? "" : jade.interp) + "</div><div class=\"lockBrief\"><p class=\"noWrap\">" + (jade.escape((jade.interp = item.media.content) == null ? '' : jade.interp)) + "</p></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<div class=\"lockOn\"><div class=\"lockIcon\">" + (null == (jade.interp = controls[item.name].frag.itemIcon) ? "" : jade.interp) + "</div><div class=\"lockBrief\"><p class=\"noWrap\">" + (jade.escape((jade.interp = item.media.content) == null ? '' : jade.interp)) + "</p></div></div>");
    }

  }
}).call(this);

buf.push("</div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var attempt = $$obj[$index];

buf.push("<div" + (jade.cls(['boardZone','attemptZone','' + (attempt.state) + ''], [null,null,true])) + "><div class=\"gameHeader\"><div class=\"gameCreator\"><div class=\"loadingFace\"><div" + (jade.attr("style", 'background-image:url("' + (attempt.user.profilePic.path) + '")', true, false)) + (jade.attr("mediaId", '' + (attempt.user.profilePic.id) + '', true, false)) + " class=\"face\"></div></div></div><div class=\"gameMeta\"><div class=\"playerName gameMetaText\">");
if ( attempt.state == 'success')
{
buf.push("<p class=\"noWrap\">Successfully unlocked by " + (jade.escape((jade.interp = attempt.user.nickname) == null ? '' : jade.interp)) + "</p>");
}
if ( attempt.state == 'failure')
{
buf.push("<p class=\"noWrap\">Failed attempt by " + (jade.escape((jade.interp = attempt.user.nickname) == null ? '' : jade.interp)) + "</p>");
}
buf.push("</div><div class=\"gameTime gameMetaText\"><p class=\"noWrap\">" + (jade.escape((jade.interp = attempt.fromNow) == null ? '' : jade.interp)) + "</p></div></div></div><div class=\"gameLocks\">");
// iterate attempt.items
;(function(){
  var $$obj = attempt.items;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<div class=\"lockOn\"><div class=\"lockIcon\">" + (null == (jade.interp = controls[item.name].frag.itemIcon) ? "" : jade.interp) + "</div><div class=\"lockBrief\"><p class=\"noWrap\">" + (jade.escape((jade.interp = item.media.content) == null ? '' : jade.interp)) + "</p></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<div class=\"lockOn\"><div class=\"lockIcon\">" + (null == (jade.interp = controls[item.name].frag.itemIcon) ? "" : jade.interp) + "</div><div class=\"lockBrief\"><p class=\"noWrap\">" + (jade.escape((jade.interp = item.media.content) == null ? '' : jade.interp)) + "</p></div></div>");
    }

  }
}).call(this);

buf.push("</div></div>");
    }

  }
}).call(this);

buf.push("</div></div><div class=\"footer\"><div class=\"action\"></div><div class=\"action actionLarge textButton deleteButton\"><p>DELETE</p></div></div>");;return buf.join("");
};
});
