import {random, pointInRect, inRange} from '../../utils/math.js';
import {addCss, removeElement, setStyle} from '../../utils/dom.js';

const name = 'parkinsons';
const cssUrl = chrome.extension.getURL('/simulations/parkinsons/css/main.css');
const shakeSpeed = 60;
const shakePositionInterval = 1500;
const appVersion = navigator.appVersion; 

let cursorImgUrl = '',
  cursor = null,
  posInterval = null,
  cursorPosX = 0,
  cursorPosY = 0,
  offsetX = 0,
  offsetY = 0,
  css = null;

function mousemoveHandler(e) {
  cursorPosX = (e.pageX + offsetX);
  cursorPosY = (e.pageY + offsetY); 
  setStyle(cursor, {left: cursorPosX + 'px', top: cursorPosY + 'px', transition: 'left 0.05s, top 0.05s'});
}

function elementClickHandler(e) {
  // TODO: Make this work
  const currentElement = e.target,
    elementRect = currentElement.getBoundingClientRect(),
    clickHit = pointInRect(cursorPosX, cursorPosY, elementRect);

  if(!clickHit) {
    e.preventDefault(); 
  }
}

function setOffset() { 
  offsetX = random(-shakeSpeed, shakeSpeed);
  offsetY = random(-shakeSpeed, shakeSpeed); 
}

function start() {

  let cursorImg = appVersion.includes('Mac') ? 'cursor_mac.svg' : 'cursor_windows.svg';
  const cursorImgUrl = chrome.extension.getURL('/simulations/parkinsons/img/' + cursorImg);

  css = addCss(cssUrl);
  
  cursor = document.createElement('div');

  cursor.style.background = `url(${cursorImgUrl})`
  cursor.setAttribute('id', 'wds-parkinsonsCursor');

  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', mousemoveHandler);

  document.querySelectorAll('*', (el) => {
    el.addEventListener('click', elementClickHandler);
  });

  posInterval = setInterval(setOffset, shakePositionInterval);

}

function stop() {

  removeElement(cursor);

  if(css) {
    removeElement(css);
  }

  if(posInterval) {
    clearInterval(posInterval);
  }

  // TODO: remove listeners

}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startSimulation' && request.simulation === name) {
    start();
  }
  else if (request.action === 'stopSimulation' && request.simulation === name) {
    stop();
  }
});