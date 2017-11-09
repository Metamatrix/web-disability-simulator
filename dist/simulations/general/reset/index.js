//general

export function reset() {
  chrome.tabs.insertCSS({
    file : "simulations/general/reset/main.css"
  });

  chrome.tabs.executeScript({
    file : "simulations/general/reset/content.js"
  });
}



