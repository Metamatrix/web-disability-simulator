
$.get(chrome.extension.getURL('/simulations/redGreenColorBlindness/img/filters.svg'), function(data) {
    $(data).appendTo('body');
});