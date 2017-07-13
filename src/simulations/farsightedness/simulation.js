  //content scripts

export var port = 3000
  
 export function showBlurr(e) {
    console.log('import funkade!'); 
    chrome.tabs.insertCSS({
      file : "../../src/simulations/farsightedness/css/simulation.css"
    });
  }

  function resetCSS(e) {
    chrome.tabs.insertCSS({
      file : "~/simulations/farsightedness/css/reset.css"
    });
  }