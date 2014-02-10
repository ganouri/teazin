define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"header\"><div class=\"action action-left\"></div><div class=\"header-title\"><p>CAMERA</p></div><div class=\"action action-right\"></div></div><div class=\"app-body\"><div class=\"fakeCapture\"></div></div><div class=\"footer\"><div class=\"action\"></div><div class=\"action actionLarge\"><div class=\"inticon inticon-capture\"></div></div></div>");;return buf.join("");
};
});
