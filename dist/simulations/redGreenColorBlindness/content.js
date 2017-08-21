//Loopa igenom alla element på sidan och byt ut color, backgroundColor, borderColor, osv... nyansen X mot nyansen Y

var allElements = $("*");

allElements.each(function(index) {
  var element = allElements[index].nodeName.toLowerCase();
  var selector= $(element);

  var backgroundColor = selector.css("background-color");
  var color = selector.css("color");

  var resultBackgroundColor = dalto(backgroundColor, 'Protanopia');
  var resultColor = dalto(color, 'Protanopia');

  selector.css("background-color", resultBackgroundColor);
  selector.css("color", resultColor);

});


$.get(chrome.extension.getURL('/simulations/redGreenColorBlindness/img/filters.svg'), function(data) {
    $(data).appendTo('body');
});