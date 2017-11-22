((() => {
  let cursor = document.createElement('div');
  let offsetX = 0;
  let offsetY = 0;
  let mousePosX = 0;
  let mousePosY = 0;

  cursor.setAttribute('id', 'wds-parkinsonsCursor');

  document.body.appendChild(cursor);

  const $cursor = $("#wds-parkinsonsCursor");

  const appVersion = navigator.appVersion; 
  let cursorImgUrl = ""; 

  if(appVersion.includes("Windows")){
    cursorImgUrl = chrome.extension.getURL('/simulations/parkinsons/img/cursor_windows.svg');
  } 

  else if(appVersion.includes("Mac")){
    cursorImgUrl = chrome.extension.getURL('/simulations/parkinsons/img/cursor_mac.svg');
  }

  cursor.style.background = `url(${cursorImgUrl})`

  //generate a random number
  function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num; 
  }

  function pointInRect(x, y, rect) {
  return inRange(x, rect.x, rect.x + rect.width) &&
          inRange(y, rect.y, rect.y + rect.height);
  }

  function inRange(value, min, max) {
  return value >= Math.min(min, max) && value <= Math.max(min, max);
  }

  $(document).mousemove(e => {

    mousePosX = (e.pageX + offsetX);
    mousePosY = (e.pageY + offsetY); 
 
    $cursor.css({left:mousePosX, top:mousePosY, transition: "left 0.05s, top 0.05s"});
    
  });

  setInterval(() => { 
    offsetX = random(-60,60);
    offsetY = random(-60,60); 
  }, 1500);


  $( "*" ).click(function(e) {

    const currentElement = e.target; 
     
    const elementRect = e.target.getBoundingClientRect(),
    cursorRect = document.getElementById('wds-parkinsonsCursor').getBoundingClientRect(),
    offset  = cursorRect.top - elementRect.top,
    clickHit = pointInRect(mousePosX, mousePosY, elementRect);

    console.log(currentElement, elementRect, mousePosX, mousePosY, clickHit, e);

    if(!clickHit) {
      e.preventDefault(); 
    }

  });

}))()





