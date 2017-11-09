
$.get(chrome.extension.getURL('/simulations/redGreenColorBlindness/img/filters.svg'), data => {
    $(data).appendTo('body');
});