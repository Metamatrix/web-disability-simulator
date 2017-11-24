import {appendHTML, addCss, removeElement} from '../../utils/dom.js';

const name = 'totalColorBlindness';
const url = chrome.extension.getURL('/simulations/colorBlindness/img/filters.svg');

let css = null;

function start(simulation) {

  const cssUrl = chrome.extension.getURL(`/simulations/colorBlindness/${simulation}/css/main.css`);

  console.log(cssUrl);

  css = addCss(cssUrl);

  if(document.getElementById('wds-colorBlindnessFilter') == null) {
    fetch(url).then((response) => {
      return response.text();
    }).then((text) => {
      appendHTML(document.body, text);
    });
  }
}

function stop() {
  const filter = document.getElementById('wds-colorBlindnessFilter');
  if(filter) {
    removeElement(filter);
  }

  if(css) {
    removeElement(css);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startSimulation' && request.simulationType === 'colorBlindness') {
    start(request.simulation);
  }
  else if (request.action === 'stopSimulation' && request.simulationType === 'colorBlindness') {
    stop();
  }
});