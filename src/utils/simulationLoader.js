let loadedSimulations = [];

function load(name, subName, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0],
      scriptFile = subName ? `simulations/${name}/${subName}/content.js` : `simulations/${name}/content.js`;

    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      files: [scriptFile]
    }).then(() => {
      loadedSimulations.push(name);
      if (callback) {
        callback(name, subName);
      }
    });
  });
}

function start(name, subName) {
  if (loadedSimulations.includes(name)) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id,
        { action: 'startSimulation', simulation: name, subSimulation: subName });

      chrome.storage.local.set({ 'activeTab': activeTab.id });

    });
  }
  else {
    load(name, subName, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];

        chrome.tabs.sendMessage(activeTab.id,
          { action: 'startSimulation', simulation: name, subSimulation: subName });

        chrome.storage.local.set({ 'activeTab': activeTab.id });
      });
    });
  }
}

function stop(name, subName) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id,
      { action: 'stopSimulation', simulation: name, subSimulation: subName });
  });
}

export { start, stop };