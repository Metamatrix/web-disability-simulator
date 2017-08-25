export function redGreenColorBlindness(e) {
  
  chrome.tabs.executeScript( {file: 'simulations/redGreenColorBlindness/content.js'});

  chrome.tabs.insertCSS({file : 'simulations/redGreenColorBlindness/css/main.css'});  

}