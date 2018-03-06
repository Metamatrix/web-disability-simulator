chrome.tabs.onUpdated.addListener(function () {

  // Reset the icon if the page reloads or on onavigation
  chrome.browserAction.setIcon({
    path : "UI/img/icon.png"
  });

  // Clear state on reload or navigation
  chrome.storage.local.remove('activeSimulation');

});