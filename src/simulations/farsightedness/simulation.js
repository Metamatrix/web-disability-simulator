  //content scripts

export var port = 3000
  
 export function showBlurr(e) {
    console.log('import funkade!'); 
    chrome.tabs.insertCSS({
      file : "css/simulation.css"
    });
  }

  function resetCSS(e) {
    chrome.tabs.insertCSS({
      file : "css/reset.css"
    });
  }