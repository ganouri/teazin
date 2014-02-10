define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};

buf.push("<div class=\"app-fragment\">itemTitle<p>IntiMate Question</p></div><div class=\"app-fragment\">itemButton<div class=\"storeItem\"><div class=\"inticon inticon-couple\"></div></div></div><div class=\"app-fragment\">itemIcon<div class=\"inticon inticon-couple\"></div></div><div class=\"app-fragment\">itemBrief<p>%{intimate_question.question}</p></div><div class=\"app-fragment\">itemConfig<div class=\"pt-page-scaleUp\"><p>Choose a question and type an answer:</p><select data-bind=\"value: question\"><option value=\"What is my favorite desert ? (1 word)\">What is my favorite desert ? (1 word)</option><option value=\"Where did you first met me ? (1 word)\">Where did you first met me ? (1 word)</option></select><textarea data-bind=\"value: answer\" class=\"largefield\"></textarea></div></div><div class=\"app-fragment\">itemUnlock<p>Find the right answer</p><p>%{intimate_question.question}</p><textarea data-bind=\"value: attemptData\"></textarea><p>%{intimate_question.error}</p><input type=\"submit\" class=\"submitAttempt\"/></div>");;return buf.join("");
};
});
