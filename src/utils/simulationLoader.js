function load(name, subName, callback) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const activeTab = tabs[0],
      scriptFile = subName ? `simulations/${name}/${subName}/content.js` : `simulations/${name}/content.js`;

    chrome.tabs.executeScript(activeTab.id, 
      { file: scriptFile },
      () => {
        if(callback) {
          callback(name, subName);
        }
      });
  });  
}

function start(name, subName) {
  console.log('simulationLoader', name);
  load(name, subName, () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id, 
        { action: 'startSimulation', simulation: name, subSimulation: subName });
    });    
  });
}

function stop(name, subName) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, 
      { action: 'stopSimulation', simulation: name, subSimulation: subName });
  });
}

export { start, stop };