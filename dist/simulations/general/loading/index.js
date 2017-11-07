export function loadingModal() {
  chrome.tabs.executeScript( {file: 'simulations/general/loading/content.js'} );
}