import {random, pointInRect, inRange} from '../../utils/math.js';
import {addCss, removeElement, setStyle} from '../../utils/dom.js';

const name = 'tunnelVision';
const cssUrl = chrome.extension.getURL('/simulations/tunnelVision/css/main.css');

let canvas = null;
let context = null;
let mouseX = 0;
let mouseY = 0;
let size = 0;
let css = null;

function setSize(e) {
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
  
  const gradient = context.createRadialGradient(mouseX, mouseY, size / 2, mouseX, mouseY, 0);
  gradient.addColorStop(0, 'transparent');
  gradient.addColorStop(.25, 'white');
  gradient.addColorStop(1, 'white');
  context.fillStyle = gradient;
  context.fillRect(mouseX - size / 2, mouseY - size / 2, size, size);

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

  // TODO: remove listeners
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'startSimulation' && request.simulation === name) {
    start();
  }
  else if (request.action === 'stopSimulation' && request.simulation === name) {
    stop();
  }
});