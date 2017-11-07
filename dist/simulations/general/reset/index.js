//general

export function resetCSS(e) {
    chrome.tabs.insertCSS({
      file : "simulations/general/reset/main.css"
    });
  }