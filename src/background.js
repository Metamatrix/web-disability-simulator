chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

                              
      // Reset the icon if the page reloads
      chrome.browserAction.setIcon({
        path : "UI/img/icon.png"
      });

      // Clear state on reload
      chrome.storage.local.remove('activeSimulation');


});
