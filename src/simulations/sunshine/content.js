import {addCss, removeElement} from '../../utils/dom.js';

const name = 'sunshine';

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

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'startSimulation' && request.simulation === name) {
    start(request.simulation);
  }
  else if (request.action === 'stopSimulation' && request.simulation === name) {
    stop();
  }
});