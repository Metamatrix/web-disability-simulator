//general

export function resetCSS() {
  chrome.tabs.insertCSS({
    file : "simulations/general/reset/main.css"
  });
}

export function resetHtmlElements() {
  chrome.tabs.executeScript({
    file : "simulations/general/reset/content.js"
  });
}



