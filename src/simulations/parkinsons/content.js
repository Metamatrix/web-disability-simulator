import {random, pointInRect, inRange} from '../../utils/math.js';
import {setStyle} from '../../utils/dom.js';

((() => {

  const shakeSpeed = 60;
  const shakePositionInterval = 1500;

  let cursor = document.createElement('div');
  let offsetX = 0;
  let offsetY = 0;
  let mousePosX = 0;
  let mousePosY = 0;

  cursor.setAttribute('id', 'wds-parkinsonsCursor');

  document.body.appendChild(cursor);

  const appVersion = navigator.appVersion; 
  let cursorImgUrl = ''; 

  if(appVersion.includes('Mac')){
    cursorImgUrl = chrome.extension.getURL('/simulations/parkinsons/img/cursor_mac.svg');
  }
  else {
    cursorImgUrl = chrome.extension.getURL('/simulations/parkinsons/img/cursor_windows.svg');
  }

  cursor.style.background = `url(${cursorImgUrl})`

  document.addEventListener('mousemove', (e) => {

    mousePosX = (e.pageX + offsetX);
    mousePosY = (e.pageY + offsetY); 
 
    console.log({left: mousePosX + 'px', top: mousePosY + 'px', transition: 'left 0.05s, top 0.05s'})

    setStyle(cursor, {left: mousePosX + 'px', top: mousePosY + 'px', transition: 'left 0.05s, top 0.05s'});
    
  });

  setInterval(() => { 
    offsetX = random(-shakeSpeed, shakeSpeed);
    offsetY = random(-shakeSpeed, shakeSpeed); 
  }, shakePositionInterval);

  document.querySelectorAll('*', (el) => {

    el.addEventListener('click', function(e) {

      const currentElement = e.target,
        elementRect = e.target.getBoundingClientRect();
        cursorRect = cursor.getBoundingClientRect(),
        offset  = cursorRect.top - elementRect.top,
        clickHit = pointInRect(mousePosX, mousePosY, elementRect);

      if(!clickHit) {
        e.preventDefault(); 
      }

    });

  });

}))()





