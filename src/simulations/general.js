//general

export function resetCSS(e) {
    chrome.tabs.insertCSS({
      file : "src/simulations/reset.css"
    });
  }