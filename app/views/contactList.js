define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),contacts = locals_.contacts;
// iterate contacts
;(function(){
  var $$obj = contacts;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var contact = $$obj[$index];

buf.push("<div" + (jade.attr("data-id", "" + (contact._id) + "", true, false)) + " class=\"clearfix contact-card\"><div class=\"contact-image\"><div class=\"loadingFace face60px\"><div" + (jade.attr("style", 'background-image:url("' + (contact.profilePic.path) + '")', true, false)) + " mediaId=\"contact.profilePic.id\" class=\"face\"></div></div></div><div class=\"contact-info\"><p class=\"contact-nick\">" + (jade.escape((jade.interp = contact.nickname) == null ? '' : jade.interp)) + "</p><p style=\"font-color:red;\" class=\"contact-email\">" + (jade.escape((jade.interp = contact.email) == null ? '' : jade.interp)) + "</p></div><div class=\"contact-actions\"><div class=\"checker-container\"><a class=\"checker contactSelectBox\">x</a></div></div><br style=\"clear:both\"/></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var contact = $$obj[$index];

buf.push("<div" + (jade.attr("data-id", "" + (contact._id) + "", true, false)) + " class=\"clearfix contact-card\"><div class=\"contact-image\"><div class=\"loadingFace face60px\"><div" + (jade.attr("style", 'background-image:url("' + (contact.profilePic.path) + '")', true, false)) + " mediaId=\"contact.profilePic.id\" class=\"face\"></div></div></div><div class=\"contact-info\"><p class=\"contact-nick\">" + (jade.escape((jade.interp = contact.nickname) == null ? '' : jade.interp)) + "</p><p style=\"font-color:red;\" class=\"contact-email\">" + (jade.escape((jade.interp = contact.email) == null ? '' : jade.interp)) + "</p></div><div class=\"contact-actions\"><div class=\"checker-container\"><a class=\"checker contactSelectBox\">x</a></div></div><br style=\"clear:both\"/></div>");
    }

  }
}).call(this);
;return buf.join("");
};
});
