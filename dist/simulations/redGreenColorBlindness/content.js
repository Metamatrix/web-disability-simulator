var allElements = $("*");

allElements.each(function(index) {
  
  var element = allElements[index].nodeName.toLowerCase();

  var elementSelector = document.querySelector('' + element + '');

  elementSelector.style.filter = "url(#protanopia)"; 

});

$.get(chrome.extension.getURL('/simulations/redGreenColorBlindness/img/filters.svg'), function(data) {
    $(data).appendTo('body');
});