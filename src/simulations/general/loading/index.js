export function loadingModal() {
  chrome.tabs.executeScript( {file: 'simulations/general/loading/content.js'} );

  chrome.tabs.insertCSS( {file: 'simulations/general/loading/main.css'} );
}