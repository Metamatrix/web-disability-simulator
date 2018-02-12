import {addCss, removeElement} from '../../utils/dom.js';

const name = 'sunshine';
const url = chrome.extension.getURL(`/simulations/${name}/img/filters.svg`);

let css = null;

function start() {

  const cssUrl = chrome.extension.getURL(`/simulations/${name}/css/main.css`);

  css = addCss(cssUrl);
}

function stop() {
  if(css) {
    removeElement(css);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startSimulation' && request.simulation === name) {
    start(request.simulation);
  }
  else if (request.action === 'stopSimulation' && request.simulation === name) {
    stop();
  }
});