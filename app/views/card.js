define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),card = locals_.card,controls = locals_.controls;
buf.push("<div" + (jade.cls(['rewardZone','cardZone','' + (card.viewConfig.gameView) + ' ' + (card.viewConfig.playersView) + ''], [null,null,true])) + ">");
if ( card.primaryMedia.type === 'Picture')
{
buf.push("<div class=\"loadingImg\"><div" + (jade.attr("style", 'background-image:url("' + (card.primaryMedia.path) + '")', true, false)) + (jade.attr("mediaId", '' + (card.primaryMedia.id) + '', true, false)) + " class=\"rewardImg\"></div></div>");
}
else if ( card.primaryMedia.type === 'Text')
{
buf.push("<div class=\"rewardText\"><p>" + (jade.escape((jade.interp = card.primaryMedia.content) == null ? '' : jade.interp)) + "</p></div>");
}
if ( card.viewConfig.gameView == 'locked')
{
buf.push("<div class=\"rewardMask\"><div class=\"maskLock\"><div class=\"inticon inticon-locked\"></div></div></div>");
}
buf.push("</div>");
if ( card.viewConfig.gameView == 'locked')
{
buf.push("<div" + (jade.cls(['gameZone','cardZone','' + (card.viewConfig.gameView) + ' ' + (card.viewConfig.playersView) + ''], [null,null,true])) + "><div class=\"gameHeader\"><div class=\"gameCreator\"><div" + (jade.attr("style", 'background-image:url("' + (card.currentGame.user.profilePic) + '")', true, false)) + " class=\"face\"></div></div><div class=\"gameMeta\"><div class=\"playerName gameMetaText\"><p class=\"noWrap\">Locked by " + (jade.escape((jade.interp = card.currentGame.user.nickname) == null ? '' : jade.interp)) + "</p></div><div class=\"gameTime gameMetaText\"><p class=\"noWrap\">" + (jade.escape((jade.interp = card.currentGame.fromNow) == null ? '' : jade.interp)) + "</p></div></div></div><div class=\"gameLocks\">");
// iterate card.currentGame.locks
;(function(){
  var $$obj = card.currentGame.locks;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var lock = $$obj[$index];

buf.push("<div class=\"lockOn\"><div class=\"lockIcon\">" + (null == (jade.interp = controls[lock.name].frag.itemIcon) ? "" : jade.interp) + "</div><div class=\"lockBrief\"><p class=\"noWrap\">" + (null == (jade.interp = controls[lock.name].controller.renderBrief(lock.config)) ? "" : jade.interp) + "</p></div></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var lock = $$obj[$index];

buf.push("<div class=\"lockOn\"><div class=\"lockIcon\">" + (null == (jade.interp = controls[lock.name].frag.itemIcon) ? "" : jade.interp) + "</div><div class=\"lockBrief\"><p class=\"noWrap\">" + (null == (jade.interp = controls[lock.name].controller.renderBrief(lock.config)) ? "" : jade.interp) + "</p></div></div>");
    }

  }
}).call(this);

buf.push("</div></div>");
}
if ( card.viewConfig.gameView == 'unlocked')
{
buf.push("<div" + (jade.cls(['cardZone','attemptZone','' + (card.viewConfig.gameView) + ' ' + (card.viewConfig.playersView) + ''], [null,null,true])) + "><div class=\"gameHeader\"><div class=\"gameCreator\"><div" + (jade.attr("style", 'background-image:url("' + (card.currentGame.latestAttempt.user.profilePic) + '")', true, false)) + " class=\"face\"></div></div><div class=\"gameMeta\"><div class=\"playerName gameMetaText\"><p class=\"noWrap\">Unlocked by " + (jade.escape((jade.interp = card.currentGame.latestAttempt.user.nickname) == null ? '' : jade.interp)) + "</p></div><div class=\"gameTime gameMetaText\"><p class=\"noWrap\">" + (jade.escape((jade.interp = card.currentGame.latestAttempt.fromNow) == null ? '' : jade.interp)) + "</p></div></div></div><div class=\"gameLocks\">");
// iterate card.currentGame.latestAttempt.items
;(function(){
  var $$obj = card.currentGame.latestAttempt.items;
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
if ( card.viewConfig.playersView != 'players_off')
{
buf.push("<div" + (jade.cls(['playersZone','cardZone','' + (card.viewConfig.playersView) + ''], [null,null,true])) + ">");
var i = 0
// iterate card.players
;(function(){
  var $$obj = card.players;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var player = $$obj[$index];

if ( player._id != card.user._id && i < 4)
{
i ++
{
buf.push("<div" + (jade.attr("style", 'background-image:url("' + (player.profilePic) + '")', true, false)) + " class=\"face\"></div>");
}
}
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var player = $$obj[$index];

if ( player._id != card.user._id && i < 4)
{
i ++
{
buf.push("<div" + (jade.attr("style", 'background-image:url("' + (player.profilePic) + '")', true, false)) + " class=\"face\"></div>");
}
}
    }

  }
}).call(this);

buf.push("</div>");
};return buf.join("");
};
});
