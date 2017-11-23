export function concentration() {

  chrome.tabs.executeScript({
    file: 'simulations/concentration/content.js'
  });

  chrome.tabs.insertCSS({
    file : "simulations/concentration/css/main.css"
  });
  
}