export function tunnelVision() {

    chrome.tabs.executeScript( {file: 'simulations/tunnelVision/content.js'} );

    chrome.tabs.insertCSS({
      file : "simulations/tunnelVision/css/main.css"
    });
    
  }


