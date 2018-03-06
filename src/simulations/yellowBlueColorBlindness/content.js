import {appendHTML, addCss, removeElement} from '../../utils/dom.js';

const name = 'yellowBlueColorBlindness';
const url = chrome.extension.getURL(`/simulations/${name}/img/filters.svg`);

let css = null;

function start() {

  const cssUrl = chrome.extension.getURL(`/simulations/${name}/css/main.css`);

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

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'startSimulation' && request.simulation === name) {
    start(request.simulation);
  }
  else if (request.action === 'stopSimulation' && request.simulation === name) {
    stop();
  }
});