console.log('background was loaded');

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

  console.log('onUpdated');

  chrome.browserAction.setIcon({
    path : "UI/img/icon.png"
  });

});