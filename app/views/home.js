define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"header\"><div class=\"action action-left\"></div><div class=\"header-title\"><p>YOUR CONVERSATIONS</p></div><div class=\"action action-right\"></div></div><div id=\"roomlistWrapper\" class=\"app-body\"><div id=\"roomlistScroller\"><div id=\"pullDown\" class=\"loading\"><span class=\"pullDownIcon\"></span><div class=\"pullLabelContainer\"><span class=\"pullDownLabel\">Loading ...</span></div></div><div id=\"roomList\"></div></div></div><div class=\"footer\"></div>");;return buf.join("");
};
});
