const name = 'redGreenColorBlindness';

function load(callback) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const activeTab = tabs[0];

    chrome.tabs.executeScript(activeTab.id, 
      { file: 'simulations/colorBlindness/content.js' },
      () => {
        if(callback) {
          callback(name);
        }
      });
  });  
}

function start() {
  console.log(name, 'start');
  load(() => {
    console.log(name, 'load');
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id, 
        { action: 'startSimulation', simulation: name, simulationType: 'colorBlindness' });
    });    
  });
}

function stop() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, 
      { action: 'stopSimulation', simulation: name, simulationType: 'colorBlindness' });
  });
}

export { start, stop };