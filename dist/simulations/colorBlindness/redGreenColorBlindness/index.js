export function redGreenColorBlindness() {
  
  chrome.tabs.executeScript( {file: 'simulations/colorBlindness/content.js'});

  chrome.tabs.insertCSS({file : 'simulations/colorBlindness/redGreenColorBlindness/css/main.css'});  

}