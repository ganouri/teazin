define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),data = locals_.data;
buf.push("<div class=\"header\"><div class=\"action action-left\"></div><div class=\"header-title\"><p>PROFILE</p></div><div class=\"action action-right\"></div></div><div class=\"profile-settings\"><div class=\"profile-picture\"><div class=\"loadingProfilePic\"><div" + (jade.attr("style", 'background-image:url("' + (data.profilePic.path) + '")', true, false)) + (jade.attr("mediaId", '' + (data.profilePic.path) + '', true, false)) + " class=\"profile-image\"></div></div></div><div class=\"profile-info\"><p class=\"profile-nickname\">" + (jade.escape((jade.interp = data.nickname) == null ? '' : jade.interp)) + "</p><p class=\"profile-email\">" + (jade.escape((jade.interp = data.email) == null ? '' : jade.interp)) + "</p></div></div><div id=\"settingsWrapper\" class=\"app-body app-body-settings\"><div class=\"settingsScroller\"><div class=\"setting-item\"><div class=\"setting-header\">Change Nickname</div><div class=\"setting-panel hide\"><label>Upcoming</label></div></div><div class=\"setting-item\"><div class=\"setting-header\">Change Password</div><div class=\"setting-panel hide\"><label>Upcoming</label></div></div><div class=\"setting-item\"><div class=\"setting-header\">Security settings</div><div class=\"setting-panel hide\"><label>Upcoming</label></div></div></div></div>");;return buf.join("");
};
});
