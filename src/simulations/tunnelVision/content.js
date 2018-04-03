import {addCss, removeElement} from '../../utils/dom.js';

const name = 'tunnelVision';
const cssUrl = chrome.extension.getURL('/simulations/tunnelVision/css/main.css');

let canvas = null;
let context = null;
let mouseX = 0;
let mouseY = 0;
let size = 0;
let css = null;

function setSize() {
  canvas.setAttribute('width', document.documentElement.clientWidth);
  canvas.setAttribute('height', document.documentElement.clientHeight);
  size = Math.min(window.innerWidth * .3, 300);
  update(); 
}

function setMousePosition(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  update();
}

function update() {

  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  
  context.fillStyle = 'black';
  context.rect(0, 0, window.innerWidth, window.innerHeight);
  context.fill();

  context.save();
  
  context.globalCompositeOperation='destination-out';

  context.beginPath();
  context.arc(mouseX, mouseY, size / 2, 0, 2 * Math.PI);

  context.fill();

  context.restore();
}
 
function start() {
  css = addCss(cssUrl);

  canvas = document.createElement('canvas');
  context = canvas.getContext('2d');

  canvas.setAttribute('id', 'wds-tunnelVisionCanvas');
  document.body.appendChild(canvas); 

  window.addEventListener("resize", setSize, false);
  canvas.addEventListener("mousemove", setMousePosition, false);

  setSize();
  update();
}

function stop() {
  if(css) {
    removeElement(css);
  }

  if(canvas) {
    removeElement(canvas);
  }

  window.removeEventListener("resize", setSize, false);
  canvas.removeEventListener("mousemove", setMousePosition, false);
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'startSimulation' && request.simulation === name) {
    start();
  }
  else if (request.action === 'stopSimulation' && request.simulation === name) {
    stop();
  }
});