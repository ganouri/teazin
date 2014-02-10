define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),itemId = locals_.itemId;
buf.push("<div class=\"toolView row fixed-area\"><div" + (jade.attr("id", '' + (itemId) + '', true, false)) + " class=\"configWrapper\"><div class=\"configScroller\"><div class=\"itemHeader\"><div class=\"itemTitle\"></div><div class=\"itemUnset\"><div class=\"inticon inticon-del\"></div></div></div><div class=\"itemConfig\"></div></div></div></div>");;return buf.join("");
};
});
