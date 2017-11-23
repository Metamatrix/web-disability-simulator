export function totalColorBlindness() {
  
  chrome.tabs.executeScript({file: 'simulations/colorBlindness/content.js'});

  chrome.tabs.insertCSS({file: 'simulations/colorBlindness/totalColorBlindness/css/main.css'});  

}