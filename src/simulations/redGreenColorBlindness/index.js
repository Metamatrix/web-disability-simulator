export function redGreenColorBlindness(e) {
  chrome.tabs.executeScript( {file: 'simulations/redGreenColorBlindness/content.js'} );
}