((() => {
  const cursor = document.createElement('div');

  cursor.setAttribute('id', 'wds-parkinsonsCursor');

  document.body.appendChild(cursor);

  console.log(navigator.appVersion);

  const appVersion = navigator.appVersion; 
  let cursorImgUrl = ""; 

  if(appVersion.includes("Windows")){
    cursorImgUrl = chrome.extension.getURL('/simulations/parkinsons/img/cursor_windows.svg');
  } 

  else if(appVersion.includes("Mac")){
    cursorImgUrl = chrome.extension.getURL('/simulations/parkinsons/img/cursor_mac.svg');
  }

  cursor.style.background = `url(${cursorImgUrl})`



  //Bilden ska följa muspekaren


  //Skakeffekt för muspekaren


  //Om användaren klickar på något på sidan så ska det kontrolleras om bilden är på elementet, inte muspekaren. Lite osäkert hur det ska lösas.

}))()


