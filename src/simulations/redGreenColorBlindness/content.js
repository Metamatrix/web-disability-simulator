var allElements = $("*");

allElements.each(function(index) {
  var element = allElements[index].nodeName.toLowerCase();
  var selector= $(element);

  var backgroundColor = selector.css("background-color");
  var color = selector.css("color");
  var borderColor = selector.css("border-color"); 

  var resultBackgroundColor = dalto(backgroundColor, 'Protanopia');
  var resultColor = dalto(color, 'Protanopia');
  var resultBorderColor = dalto(borderColor, 'Protanopia');

  selector.css("background-color", resultBackgroundColor);
  selector.css("color", resultColor);
  selector.css("border-color", resultBorderColor);

  var elementsWithBG = selector.filter(function(){
    if (this.style.backgroundImage) {
      selector.css("filter", "url(#protanopia)");
    }
  });

});

$.get(chrome.extension.getURL('/simulations/redGreenColorBlindness/img/filters.svg'), function(data) {
    $(data).appendTo('body');
});