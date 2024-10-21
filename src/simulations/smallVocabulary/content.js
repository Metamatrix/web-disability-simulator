import {getTextNodes} from '../../utils/dom.js';
import {isLetter, isUpperCase} from '../../utils/string.js';
import {random} from '../../utils/math.js';
import {randomArrayValue} from '../../utils/array.js';

const name = 'smallVocabulary',
  supportedlanguages = ['en', 'sv'],
  dictionary = {};

let textNodes = null,
  words = [],
  consonants = [],
  vowels = [];

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

function getDocumentLanguage() {
  let lang = document.querySelector('html').getAttribute('lang');

  if(!lang) {
    return 'en';
  }

  lang = lang.split('-').shift().toLowerCase();

  if(!supportedlanguages.includes(lang)) {
    return 'en';
  }

  return lang;
}

function start() {

  const tagsToIgnore = ['SCRIPT', 'STYLE', 'NOSCRIPT'];
  const lang = getDocumentLanguage();
  const rndKey = (new Date()).getTime();
  const langFileUrl = chrome.runtime.getURL(`/simulations/${name}/words.${lang}.json?${rndKey}`);

  fetch(langFileUrl).then(function(response) { 
    return response.json();
  }).then(function(json) {

    words = json.words;
    vowels = json.vowels;
    consonants = json.consonants;

    textNodes = getTextNodes(document.querySelector('body'));

    textNodes.forEach((el) => {

      if(el.textContent.trim().length === 0 ||
        el.parentElement && tagsToIgnore.includes(el.parentElement.tagName)) {
        return;
      }

      el._wdsOriginalText = el.textContent;
      el.textContent = processText(el.textContent);

    });

  });
}

function stop() {

  textNodes.forEach((el) => {
    el.textContent = el._wdsOriginalText;
  });

  textNodes = null;
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'startSimulation' && request.simulation === name) {
    start();
  }
  else if (request.action === 'stopSimulation' && request.simulation === name) {
    stop();
  }
});