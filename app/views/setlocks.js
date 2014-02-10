define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"header\"><div class=\"action action-left\"></div><div class=\"header-title\"><p>SET LOCKS</p></div><div class=\"action action-right\"></div></div><div class=\"app-body\"><div class=\"toolBar row fixed-area\"><div name=\"store\" class=\"tab activeZone\"><div class=\"tabInstructions\"><p>Choose a lock</p></div></div><div name=\"addItem\" class=\"tab hide\"><div class=\"inticon inticon-add\"></div></div></div><div class=\"configViews\"><div id=\"storeView\" class=\"toolView row fixed-area\"><div class=\"storeList\"></div></div></div></div><div class=\"footer\"><div class=\"action\"></div><div class=\"action actionLarge textButton lockButton\"><p>LOCK</p></div></div>");;return buf.join("");
};
});
