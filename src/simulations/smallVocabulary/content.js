import {getTextNodes} from '../../utils/dom.js';
import {isLetter, isUpperCase} from '../../utils/string.js';
import {random} from '../../utils/math.js';
import {words} from './words.sv.json';
import {randomArrayValue} from '../../utils/array.js';

const name = 'smallVocabulary';
const vowels = ["a", "e", "i", "o", "u", "y"];
const consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "x", "y", "z"];
let textNodes = null;
const dictionary = {};

function randomLetter(letter) {
  var chars = 'abcdefghijklmnopqrstuvwxyz';
  var i = Math.floor(Math.random() * chars.length);
  var value = chars.substring(i, i + 1);

  return isUpperCase(letter) ? value.toUpperCase() : value;
}

function processText(text) {

  return text.split(/\s/).map((word) => {

    if(word.trim().length === 0 ||
      words.includes(word.trim().toLowerCase())) {
      
        return word;
    }

    return processWord(word);

  }).join(' ');
  
}

function processWord(word) {

  if(dictionary[word]) {
    return dictionary[word];
  }

  const wordArr = word.split('');
  
  let counter = random(0, 1),
    consonant = random(1, 2) === 1 ? true : false;

  for(var i = 0, l = wordArr.length; i < l; i++) {
    const letter = wordArr[i];

    if(isLetter(letter)) {
      const newLetter = consonant ? randomArrayValue(consonants) : randomArrayValue(vowels);
      wordArr[i] = isUpperCase(letter) ? newLetter.toUpperCase() : newLetter;
    }

    if(counter === i) {
      counter += random(1, 2);
      consonant = !consonant;
    }
  }

  const newWord = wordArr.join('');

  dictionary[word] = newWord;
  
  return newWord;
}

function start() {

  const tagsToIgnore = ['SCRIPT', 'STYLE', 'NOSCRIPT'];

  textNodes = getTextNodes(document.querySelector('body'));

  textNodes.forEach((el) => {

    if(el.textContent.trim().length === 0 ||
      el.parentElement && tagsToIgnore.includes(el.parentElement.tagName)) {
      return;
    }

    console.log(el.parentElement && el.parentElement.tagName, el.textContent);

    el._wdsOriginalText = el.textContent;
    el.textContent = processText(el.textContent);

  });
}

function stop() {

  textNodes.forEach((el) => {
    el.textContent = el._wdsOriginalText;
  });

  textNodes = null;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startSimulation' && request.simulation === name) {
    start();
  }
  else if (request.action === 'stopSimulation' && request.simulation === name) {
    stop();
  }
});