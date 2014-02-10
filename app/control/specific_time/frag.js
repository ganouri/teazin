define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"app-fragment\">itemTitle<p class=\"noWrap\">Specific time</p></div><div class=\"app-fragment\">itemButton<div class=\"storeItem\"><div class=\"inticon inticon-hourglass\"></div></div></div><div class=\"app-fragment\">itemIcon<div class=\"inticon inticon-hourglass\"></div></div><div class=\"app-fragment\">itemBrief<p>Available for 1 hour at %{specific_time.timeMarker} GMT</p></div><div class=\"app-fragment\">itemConfig<div class=\"pt-page-scaleUp\"><p>Content will only been available for 1 hour after the choosen time:</p><p>It is %{specific_time.timeNow} GMT</p><input data-bind=\"value: time\" type=\"time\" name=\"time\" value=\"10:00:00\" class=\"time-input grey message-input\"/><label class=\"control-err-label hide\">Error Message</label></div></div><div class=\"app-fragment\">itemUnlock<p>Available for 1 hour after %{specific_time.timeMarker} GMT</p><p>It is %{specific_time.timeNow} GMT</p><p>%{specific_time.error}</p><input type=\"submit\" class=\"submitAttempt\"/></div>");;return buf.join("");
};
});
