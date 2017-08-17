//general

export function resetCSS(e) {
    chrome.tabs.insertCSS({
      file : "simulations/reset.css"
    });
  }