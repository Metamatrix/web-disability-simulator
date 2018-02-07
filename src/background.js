chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

  // Reset the icon if the page reloads or on onavigation
/*  chrome.browserAction.setIcon({
    path : "UI/img/icon.png"
  });
*/
  // Clear state on reload or navigation
  //chrome.storage.local.remove('activeSimulation');

//skicka ett message härifrån till popupen om att köra startfunktionen? 
//behöver köra startfunktionen här med rätt simulering. 

});