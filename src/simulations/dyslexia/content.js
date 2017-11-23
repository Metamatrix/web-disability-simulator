import * as math from '../../utils/math.js';

let textNodes = [],
  intervals = [];

function getTextNodes(node){
  let all = [];
  for (node=node.firstChild;node;node=node.nextSibling){
    if (node.nodeType==3) all.push(node);
    else all = all.concat(getTextNodes(node));
  }
  return all;
}

function isLetter(c) {
  return c.toLowerCase() !== c.toUpperCase();
}

function getRandomLetterIndex(txt) {
  let l = '';
  let i = null;

  while(!isLetter(l)) {
    i = math.random(0, txt.length - 1);
    l = txt[i];
  }

  return i;
}

function shuffleString(txt) {
  const a = txt.split('');
  const n = a.length;

  for(let i = n - 1; i > 0; i--) {
    const tmp = a[i];

    if(isLetter(tmp)) {
      const j = getRandomLetterIndex(txt);
      a[i] = a[j];
      a[j] = tmp;
    }
  }

  return a.join('');
}

function start() {

  textNodes = getTextNodes(document.querySelector('body'));

  textNodes.forEach((el) => {

    el._wdsOriginalText = el.textContent;

    const interval = setInterval(() => {

      const words = el.textContent.split(/\s/);

      el.textContent = words.map((word) => { 
        if(word.trim().length === 0) {
          return word;
        }

        if(word.length <= 3) {
          return shuffleString(word);
        }

        const lettersToKeep = Math.max(Math.round(word.length / 5), 1);

        return word.substring(0, 2) +
          shuffleString(word.substring(2, word.length - 2)) +
          word.substring(word.length - 2)
      }).join(' ');

    }, math.random(750, 1500));

    intervals.push(interval);

  });

}

function stop() {
  intervals.forEach((interval) => {
    clearInterval(interval);
  });    

  textNodes.forEach((el) => {
    el.textContent = el._wdsOriginalText;
  });

}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startSimulation' && request.simulation === 'dyslexia') {
    start();
  }
  else if (request.action === 'stopSimulation' && request.simulation === 'dyslexia') {
    stop();
  }
});