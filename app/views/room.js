define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),state = locals_.state;
buf.push("<div class=\"header\"><div class=\"action action-left\"></div><div class=\"header-title\"><p>" + (jade.escape((jade.interp = state.namesList) == null ? '' : jade.interp)) + "</p></div><div class=\"action action-right\"></div></div><div id=\"roomWrapper\" class=\"app-body\"><div id=\"roomScroller\"><div id=\"pullDown\" class=\"loading\"><span class=\"pullDownIcon\"></span><div class=\"pullLabelContainer\"><span class=\"pullDownLabel\">LOADING</span></div></div><div id=\"cardList\"></div></div></div><div class=\"footer\"></div>");;return buf.join("");
};
});
