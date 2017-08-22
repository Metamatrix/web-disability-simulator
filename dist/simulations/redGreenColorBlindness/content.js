//Loopa igenom alla element på sidan och byt ut color, backgroundColor, borderColor, osv... nyansen X mot nyansen Y

var allElements = $("*");

allElements.each(function(index) {
  var element = allElements[index].nodeName.toLowerCase();
  var selector= $(element);

  var backgroundColor = selector.css("background-color");
  var color = selector.css("color");
  var borderColor = selector.css("border-color"); 

  console.log(selector.css("border-color"));

  //var backgroundImage = selector.css("background-image");
  //var resultBackgroundImage = lägg på  -webkit-filter: url(#protanopia); filter: url(#protanopia); på backgroundImage

  var resultBackgroundColor = dalto(backgroundColor, 'Protanopia');
  var resultColor = dalto(color, 'Protanopia');
  var resultBorderColor = dalto(borderColor, 'Protanopia');

  selector.css("background-color", resultBackgroundColor);
  selector.css("color", resultColor);
  selector.css("border-color", resultBorderColor);

});


$.get(chrome.extension.getURL('/simulations/redGreenColorBlindness/img/filters.svg'), function(data) {
    $(data).appendTo('body');
});