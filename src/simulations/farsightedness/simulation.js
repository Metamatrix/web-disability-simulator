//content scripts
  
 export function farsightedness(e) {
    console.log('import funkade!'); 
    chrome.tabs.insertCSS({
      file : "src/simulations/farsightedness/css/simulation.css"
    });
  }

export function resetCSS(e) {
    chrome.tabs.insertCSS({
      file : "src/simulations/farsightedness/css/reset.css"
    });
  }