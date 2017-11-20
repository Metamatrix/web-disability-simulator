export function dyslexia() {
  console.log('HELLO1');
  chrome.tabs.executeScript( { file: 'simulations/dyslexia/content.js' } );  
}