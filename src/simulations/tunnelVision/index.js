export function tunnelVision(e) {
    console.log('tunnelseende'); 

    chrome.tabs.executeScript( {file: 'simulations/tunnelVision/content.js'} );

    chrome.tabs.insertCSS({
      file : "simulations/tunnelVision/css/main.css"
    });
  }


