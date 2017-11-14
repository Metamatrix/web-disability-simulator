
$.get(chrome.extension.getURL('/simulations/colorBlindness/img/filters.svg'), data => {
    $(data).appendTo('body');
});