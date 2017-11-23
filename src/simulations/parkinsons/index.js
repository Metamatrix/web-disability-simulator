export function parkinsons() {

  chrome.tabs.executeScript({
    file: 'simulations/parkinsons/content.js'
  });

  chrome.tabs.insertCSS({
    file : "simulations/parkinsons/css/main.css"
  });
  
}