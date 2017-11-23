export function yellowBlueColorBlindness() {
  
  chrome.tabs.executeScript({file: 'simulations/colorBlindness/content.js'});

  chrome.tabs.insertCSS({file: 'simulations/colorBlindness/yellowBlueColorBlindness/css/main.css'});  

}