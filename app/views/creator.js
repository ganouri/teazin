define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"header\"><div class=\"action action-left\"></div><div class=\"header-title\"><p>SEND MESSAGE</p></div><div class=\"action action-right\"></div></div><div class=\"app-body\"><div id=\"creatorWrapper\"><div class=\"creatorScroller\"><div class=\"cardPreview\"></div><div class=\"addLocks\"><div class=\"addLocksText\">SET LOCKS</div></div><div class=\"creatorTuto\"><p>Welcome in the creator.</p><br/><p>Your mission here is to set your own rules on top of the content you want to share.</p><br/><p>Click on \"SET LOCKS\"</p><br/><p>To send your content, just click \"TEAZ\"     </p></div></div></div></div><div class=\"footer\"><div class=\"action\"></div><div class=\"action actionLarge textButton teazButton\"><p>TEAZ</p></div></div>");;return buf.join("");
};
});
