define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"header\"><div class=\"action action-left\"></div><div class=\"header-title\"><p>NEW MESSAGE</p></div><div class=\"action action-right\"></div></div><div class=\"app-body\"><div class=\"composeArea\"><textarea id=\"composeBox\"></textarea><div class=\"sendTextButton\">SEND</div></div></div><div class=\"footer\"></div>");;return buf.join("");
};
});
