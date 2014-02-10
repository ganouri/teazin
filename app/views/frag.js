define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"app-fragment\">contactButton<div class=\"inticon inticon-contact\"></div></div><div class=\"app-fragment\">addContactButton<div class=\"inticon inticon-add-contact\"></div></div><div class=\"app-fragment\">settingsButton<div class=\"inticon inticon-settings\"></div></div><div class=\"app-fragment\">navBackButton<div class=\"inticon inticon-left-arrow\"></div></div><div class=\"app-fragment\">emptyButton<div class=\"action\"></div></div><div class=\"app-fragment\">composeButton<div class=\"action\"><div class=\"inticon inticon-compose\"></div></div></div><div class=\"app-fragment\">captureButton<div class=\"action\"><div class=\"inticon inticon-capture\"></div></div></div><div class=\"app-fragment\">continueButton<div class=\"action\"><div class=\"inticon inticon-right-arrow\"></div></div></div><div class=\"app-fragment\">submitContactButton<div class=\"action actionLarge\"><div class=\"inticon inticon-save\"></div></div></div><div class=\"app-fragment\">sendButton<div class=\"action actionLarge\"><div class=\"inticon inticon-large inticon-send\"></div></div></div><div class=\"app-fragment\">saveButton<div class=\"action actionLarge\"><div class=\"inticon inticon-large inticon-save\"></div></div></div>");;return buf.join("");
};
});
