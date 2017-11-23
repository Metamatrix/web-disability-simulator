import {appendHTML} from '../../utils/dom.js';

const url = chrome.extension.getURL('/simulations/colorBlindness/img/filters.svg');

if(document.getElementById('wds-colorBlindnessFilter') == null) {

  fetch(url).then((response) => {
    return response.text();
  }).then((text) => {
    appendHTML(document.body, text);
  });

}