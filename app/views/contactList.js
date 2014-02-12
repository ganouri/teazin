define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),state = locals_.state;
// iterate state.base.contacts
;(function(){
  var $$obj = state.base.contacts;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var contact = $$obj[$index];

buf.push("<div" + (jade.attr("data-id", "" + (contact._id) + "", true, false)) + " class=\"clearfix contact-card\"><div class=\"contact-image\">");
if ( contact.profilePic)
{
buf.push("<div" + (jade.attr("style", 'background-image:url("' + (contact.profilePic) + '")', true, false)) + " class=\"face face60px\"></div>");
}
else
{
buf.push("<div style=\"background-image:url(&quot;images/user/anonymous.jpg&quot;)\" class=\"face face60px\"></div>");
}
buf.push("</div><div class=\"contact-info\"><p class=\"contact-nick\">" + (jade.escape((jade.interp = contact.nickname) == null ? '' : jade.interp)) + "</p><p style=\"font-color:red;\" class=\"contact-email\">" + (jade.escape((jade.interp = contact.email) == null ? '' : jade.interp)) + "</p></div><div class=\"contact-actions\"><div class=\"checker-container\"><a class=\"checker checkbox-v4 fadeVisible fadeHidden\">x</a></div><div class=\"block-container\"><a class=\"no-bottom button red fadeHidden\">Block</a></div></div><br style=\"clear:both\"/></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var contact = $$obj[$index];

buf.push("<div" + (jade.attr("data-id", "" + (contact._id) + "", true, false)) + " class=\"clearfix contact-card\"><div class=\"contact-image\">");
if ( contact.profilePic)
{
buf.push("<div" + (jade.attr("style", 'background-image:url("' + (contact.profilePic) + '")', true, false)) + " class=\"face face60px\"></div>");
}
else
{
buf.push("<div style=\"background-image:url(&quot;images/user/anonymous.jpg&quot;)\" class=\"face face60px\"></div>");
}
buf.push("</div><div class=\"contact-info\"><p class=\"contact-nick\">" + (jade.escape((jade.interp = contact.nickname) == null ? '' : jade.interp)) + "</p><p style=\"font-color:red;\" class=\"contact-email\">" + (jade.escape((jade.interp = contact.email) == null ? '' : jade.interp)) + "</p></div><div class=\"contact-actions\"><div class=\"checker-container\"><a class=\"checker checkbox-v4 fadeVisible fadeHidden\">x</a></div><div class=\"block-container\"><a class=\"no-bottom button red fadeHidden\">Block</a></div></div><br style=\"clear:both\"/></div>");
    }

  }
}).call(this);
;return buf.join("");
};
});
