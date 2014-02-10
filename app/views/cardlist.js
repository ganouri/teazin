define(['jadeRuntime'], function(jade) {
return function template(locals) {
var buf = [];
var jade_mixins = {};
var locals_ = (locals || {}),cards = locals_.cards;
// iterate cards
;(function(){
  var $$obj = cards;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var card = $$obj[$index];

buf.push("<div" + (jade.attr("data-id", "" + (card.resourceId) + "", true, false)) + " class=\"cardContainer\"></div>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var card = $$obj[$index];

buf.push("<div" + (jade.attr("data-id", "" + (card.resourceId) + "", true, false)) + " class=\"cardContainer\"></div>");
    }

  }
}).call(this);
;return buf.join("");
};
});
