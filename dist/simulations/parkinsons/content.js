((() => {
  let cursor = document.createElement('div');

  cursor.setAttribute('id', 'wds-parkinsonsCursor');

  document.body.appendChild(cursor);

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

  $(document).mousemove(e => {

    cursor = $("#wds-parkinsonsCursor");
 
    cursor.css({left:e.pageX, top:e.pageY});

    setTimeout(() => { 
      const mousePosX = (e.pageX + random(-75,75));
      const mousePosY = (e.pageY + random(-75,75)); 
      cursor.css({left:mousePosX, top:mousePosY});
    }, 500);
    
  });

  //Om användaren klickar på något på sidan så ska det kontrolleras om bilden är på elementet, inte muspekaren. Lite osäkert hur det ska lösas.

}))()


