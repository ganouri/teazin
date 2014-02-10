define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),state = locals_.state;
buf.push("<div class=\"header\"><div class=\"action action-left\"></div><div class=\"header-title\"><p>CONTACT LIST</p></div><div class=\"action action-right\"></div></div><div class=\"app-body\"><div class=\"add-contact-panel hide\"><div class=\"add-contact-header\"><div class=\"add-contact-title\"><p>Add Contact</p></div></div><div data-bind=\"css: { hide: invite()}\" class=\"add-contact-form\"><p class=\"add-contact-instruction\">Enter a new contact email :</p><div class=\"formFieldWrap\"><label class=\"field-title\"></label><input data-bind=\"value: email, css:{ 'login-err': valid().email}\" type=\"text\" class=\"contactField\"/><label data-bind=\"if: valid().email, text:valid().email\" class=\"login-err-label\">Error Message</label><label data-bind=\"if: error(), text:error()\" class=\"login-err-label\">Error Message</label><div class=\"add-contact-button-container\"><input type=\"submit\" value=\"Add User\" class=\"button-minimal add-contact-action grey-minimal right\"/></div></div></div><div data-bind=\"css: { hide: !invite()}\" class=\"invite-contact-form text-center\"><span data-bind=\"text: email\" class=\"bold\"></span><p>is not using IntiMate yet</p><input type=\"submit\" value=\"Invite To the App\" class=\"button-minimal invite-contact-action grey-minimal center\"/><br/><input type=\"submit\" value=\"Re-Type Email\" class=\"button-minimal back-contact-action grey-minimal center\"/></div></div><div class=\"blockToFixScroll\"><div id=\"contactWrapper\"" + (jade.cls(['' + (state.roomAccess) + ''], [true])) + "><div class=\"contactListFrag\"></div></div></div>");
if ( state.roomAccess == 'showRoomAccess')
{
buf.push("<div class=\"roomAccess\"><p>Select contacts to open a room</p></div>");
}
buf.push("</div><div class=\"footer\"></div>");;return buf.join("");
};
});
