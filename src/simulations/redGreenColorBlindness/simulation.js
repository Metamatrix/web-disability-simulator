export function redGreenColorBlindness(e) {

    chrome.tabs.executeScript( {file: 'src/simulations/redGreenColorBlindness/content.js'} );
    
  }