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
  viewportPosX = 0,
  viewportPosY = 0,
  offsetX = 0,
  offsetY = 0,
  css = null,
  clickedElement = null;

function mousemoveHandler(e) {
  // Save the position of the fake cursor
  cursorPosX = e.pageX + offsetX;
  cursorPosY = e.pageY + offsetY;

  // Save the viewport position of the fake cursor (position without scroll)
  // We use this later to get the clicked element
  viewportPosX = e.clientX + offsetX;
  viewportPosY = e.clientY + offsetY;

  setStyle(cursor, {left: cursorPosX + 'px', top: cursorPosY + 'px', transition: 'left 0.05s, top 0.05s'});
}

function elementClickHandler(e) {

  if(e.target === clickedElement) {
    // Actual mouse clicked element is the same as the element that the fake cursor would click.
    // This is because we triggered the click or that the positions of the mouse and the fake cursor are both over the same element.
    // Do nothing and pass on the click. Reset the clicked element.
    clickedElement = null;
  }
  else {
    // Actual mouse clicked element is NOT the same as the element that the fake cursor would click.
    // Get the element that the fake cursor would click and trigger click on that element.
    e.preventDefault();

    clickedElement = document.elementFromPoint(viewportPosX, viewportPosY);

    if(clickedElement) {
      clickedElement.click();
    }
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

  document.addEventListener('click', elementClickHandler);

  posInterval = setInterval(setOffset, shakePositionInterval);

}

function stop() {

  if(cursor) {
    removeElement(cursor);
  }

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