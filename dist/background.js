chrome.action.onClicked.addListener(function (tab) {

  chrome.storage.local.get('activeTab', obj => {

    if (obj.activeTab === tab.id) {

      // Reset the icon if the page reloads
      chrome.action.setIcon({
        path : "UI/img/icon.png"
      });

      // Clear state on reload
      chrome.storage.local.remove('activeSimulation');
    }
  });

});