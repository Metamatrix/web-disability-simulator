import {addCss, removeElement} from '../../utils/dom.js';

const name = 'farsightedness';
const cssUrl = chrome.extension.getURL('/simulations/farsightedness/css/main.css');

let css = null;

function start() {
  css = addCss(cssUrl);
}

function stop() {
  if(css) {
    removeElement(css);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startSimulation' && request.simulation === 'farsightedness') {
    start();
  }
  else if (request.action === 'stopSimulation' && request.simulation === 'farsightedness') {
    stop();
  }
});