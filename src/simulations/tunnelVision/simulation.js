export function tunnelVision(e) {
    console.log('tunnelseende'); 

    chrome.tabs.executeScript( {file: 'src/simulations/tunnelVision/content.js'} );

    chrome.tabs.executeScript(null, {file:'src/UI/vendor/jquery/jquery-2.0.3.min.js'}, function(result){
    chrome.tabs.executeScript(null, {file:'src/simulations/tunnelVision/content.js'});
    });

    chrome.tabs.insertCSS({
      file : "src/simulations/tunnelVision/css/simulation.css"
    });
  }


