(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _dom = require('../../utils/dom.js');

var _string = require('../../utils/string.js');

var _math = require('../../utils/math.js');

var _wordsSv = require('./words.sv.json');

var _array = require('../../utils/array.js');

var name = 'smallVocabulary';
var vowels = ["a", "e", "i", "o", "u", "y"];
var consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "x", "y", "z"];
var textNodes = null;
var dictionary = {};

function randomLetter(letter) {
  var chars = 'abcdefghijklmnopqrstuvwxyz';
  var i = Math.floor(Math.random() * chars.length);
  var value = chars.substring(i, i + 1);

  return (0, _string.isUpperCase)(letter) ? value.toUpperCase() : value;
}

function processText(text) {

  return text.split(/\s/).map(function (word) {

    if (word.trim().length === 0 || _wordsSv.words.includes(word.trim().toLowerCase())) {

      return word;
    }

    return processWord(word);
  }).join(' ');
}

function processWord(word) {

  if (dictionary[word]) {
    return dictionary[word];
  }

  var wordArr = word.split('');

  var counter = (0, _math.random)(0, 1),
      consonant = (0, _math.random)(1, 2) === 1 ? true : false;

  for (var i = 0, l = wordArr.length; i < l; i++) {
    var letter = wordArr[i];

    if ((0, _string.isLetter)(letter)) {
      var newLetter = consonant ? (0, _array.randomArrayValue)(consonants) : (0, _array.randomArrayValue)(vowels);
      wordArr[i] = (0, _string.isUpperCase)(letter) ? newLetter.toUpperCase() : newLetter;
    }

    if (counter === i) {
      counter += (0, _math.random)(1, 2);
      consonant = !consonant;
    }
  }

  var newWord = wordArr.join('');

  dictionary[word] = newWord;

  return newWord;
}

function start() {

  var tagsToIgnore = ['SCRIPT', 'STYLE', 'NOSCRIPT'];

  textNodes = (0, _dom.getTextNodes)(document.querySelector('body'));

  textNodes.forEach(function (el) {

    if (el.textContent.trim().length === 0 || el.parentElement && tagsToIgnore.includes(el.parentElement.tagName)) {
      return;
    }

    console.log(el.parentElement && el.parentElement.tagName, el.textContent);

    el._wdsOriginalText = el.textContent;
    el.textContent = processText(el.textContent);
  });
}

function stop() {

  textNodes.forEach(function (el) {
    el.textContent = el._wdsOriginalText;
  });

  textNodes = null;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'startSimulation' && request.simulation === name) {
    start();
  } else if (request.action === 'stopSimulation' && request.simulation === name) {
    stop();
  }
});


},{"../../utils/array.js":3,"../../utils/dom.js":4,"../../utils/math.js":5,"../../utils/string.js":6,"./words.sv.json":2}],2:[function(require,module,exports){
module.exports={ "words": ["och","i","är","på","att","det","har","som","inte","en","för","med","jag","ska","han","till","var","kan","av","du","säger","hon","om","ett","de","men","så","vi","hade","den","när","sa","får","få","vill","också","från","mot","eller","människor","vara","sverige","år","skulle","bara","hur","måste","ha","blir","kommer","mycket","man","nu","bli","blev","finns","honom","vad","där","dem","andra","över","pengar","då","efter","mer","många","fick","än","henne","göra","mig","två","tycker","bra","sin","sig","varit","gör","här","felix","alla","ju","barn","vid","sina","lite","kunde","går","vet","flera","mamma","tror","vann","kunna","några","nya","se","under","kom","pappa","personer","ut","blivit","länder","funktionshinder","majsan","fått","behöver","sedan","hans","kanske","står","väl","inez","gjorde","regeringen","olika","landet","stora","gjort","ser","hjälp","fler","gå","svenska","igen","något","mellan","love","kronor","alva","själv","aldrig","erik","sitt","dom","betala","skolan","tre","ville","gick","började","ditte","sade","tusen","någon","säga","utan","exempel","ledare","nästan","såg","dig","hennes","hela","arbetar","min","lika","redan","innan","del","ny","första","ni","mirran","sätt","prata","ingen","stod","usa","ändå","staffan","genom","åt","eu","stor","svårt","ännu","oss","din","nog","ge","börjar","regler","stockholm","ja","bättre","in","veta","arbeta","lisa","jobb","fram","allt","tänker","hjälpa","varje","alltid","sveriges","saker","polisen","ur","komma","längre","jonathan","irak","mej","helt","ta","gamla","percy","därför","tillsammans","samma","hos","tillbaka","fyra","tog","varandra","upp","läsa","bor","dog","tänkte","matchen","gäller","visar","ligger","deras","sitter","kvar","året","nej",":","arbete","bästa","låg","både","mormor","flesta","använda","viktigt","problem","malte","fortfarande","frågar","fanns","sally","börja","företag","dag","senaste","soldater","mat","gånger","ã„r","haft","land","sluta","utanför","sagt","åka","skriver","annat","tar","liten","köpa","huset","förra","tid","nästa","lag","känns","kvinnor","alldeles","vatten","länge","hände","kallas","precis","maja","ner","tio","visste","först","handlar","anna","ofta","spela","joakim","regering","heter","riksdagen","plats","dödades","valet","förslag","dej","undersöka","vattnet","brukar","undrar","riktigt","häst","enda","snart","israel","miljoner","sej","sista","bestämma","betyder","vem","huvudet","heller","sen","tänka","politiker","borde","tyckte","ger","fortsätter","mest","turbin","föräldrar","verkar","dagar","försöker","bil","ingenting","bakom","satt","morfar","tidigare","tittar","glad","fall","mannen","hänt","bestämmer","stund","alls","göteborg","kajsa","hand","lagen","världen","dörren","sjuk","bestämt","hundra","brott","snabbt","hus","tidningen","helgen","märklin","sjuka","säkert","länderna","vård","berätta","rida","hem","förstår","annan","trodde","ludde","liv","bort","hemma","ens","iväg","mål","myran","unga","marken","ropar","idag","staten","runt","svarar","stoppa","svenskar","varför","väldigt","håller","förstås","väg","fn","fängelse","fortsätta","finnas","veckor","små","män","äta","president","ensam","bland","stort","rädd","ditt","hjälper","meter","farfar","fem","pengarna","kommit","libanon","skriva","framför","lång","folk","hör","just","kyrkan","medan","laget","följa","fast","bredvid","verkligen","ringa","reglerna","frågade","inga","undersökning","hugo","nytt","mindre","barnen","plötsligt","ungdomar","hitta","berättar","veckan","alltså","staden","anton","minst","bilen","ryssland","ögon","även","handen","mitt","filippa","stöd","rätt","fotboll","vilka","person","skatt","fort","dött","sett","barnet","tag","elever","chans","hamas","iran","pratar","gången","lätt","området","försökte","match","båda","vägen","johan","undrade","bråk","vm","börjat","söka","kommunen","låter","visa","klart","ungefär","betalar","par","förut","själva","äter","tiden","händer","faktiskt","bo","nick","någonting","tur","fel","procent","information","tyst","grupp","mina","ropade","tills","maria","ganska","före","ena","höra","kommuner","vår","vanligt","hörde","dit","slutar","samarbeta","dagen","klockan","hit","allan","följer","överens","jenny","egen","båten","chef","skatten","långt","vanliga","stallet","känner","val","natten","kostar","gått","sitta","ute","luften","egentligen","ögonen","röst","politikerna","arg","stefan","anja","kände","åren","leva","gammal","kroppen","största","lagar","rösta","rum","dåligt","helst","vinna","tittade","hoppas","äldre","lars","inne","sidan","skolor","makten","ibland","bygga","jobbar","vecka","använder","stället","bilar","knappt","samhället","skogen","fredrik","skadades","stå","inget","morgon","fungerar","rättigheter","berättade","säker","vissa","kriget","ledsen","försöka","välja","långa","svensk","lät","lära","skola","tyskland","ansvar","bäst","senare","slut","menar","viktiga","lilla","förbi","förstå","bollen","internet","slog","gång","världens","titta","sak","kommunerna","sex","åkte","vilken","spelade","kändes","större","myndigheter","kvinna","tro","lovar","köper","lättare","israels","hår","slutade","misstänkt","hårt","stanna","vapen","fortsatte","danne","skrattar","användas","palestinska","jobbet","månader","magen","vänta","eftersom","danmark","åker","årets","nickade","göran","ringer","platser","köra","beror","träffa","ler","emot","försäkringskassan","tessa","bestämde","ord","djur","höll","frågor","milo","rakt","behövs","läkare","döda","västra","extra","borta","sälja","spelar","lämna","log","tillräckligt","poliser","kunnat","fönstret","europa","jo","trappan","omkring","förlorade","golvet","väntar","utbildning","amanda","direkt","elin","timmar","jobba","högt","klara","onsdagen","munnen","lyckades","partiet","pia","anders","möjligt","kul","kommun","hej","björn","ändra","viskade","regeringens","människa","nordkorea","tagit","dina","minuter","hjälpmedel","tävlingen","arbetet","sådant","eget","ansiktet","våra","gärna","pratade","drog","usas","steg","manuel","vågar","misstänkta","fattar","kompis","finland","familj","delar","bit","amerikanska","ã„ndå","matcher","bomber","hittat","blå","tala","skrivit","priset","eleverna","experter","händerna","farliga","svarta","nöjd","tredje","landets","papper","vunnit","röster","istället","köket","kompisar","svarade","lön","krig","värre","torsdagen","plan","tjänar","mänskliga","förstod","företaget","håll","hittar","frankrike","reinfeldt","partierna","persson","skrek","sämre","början","hinner","framtiden","stranden","varor","körde","full","försökt","eu-länderna","parti","blick","tänk","tåg","dagarna","martin","oroliga","räcker","hög","jorden","ryggen","löner","förbjudet","åtta","tisdagen","behöva","inom","kvällen","sköt","miljön","föreslår","särskilt","nära","sprang","berättat","hästar","förslaget","måndagen","illa","visade","genast","möte","larsson","invandrare","ã„ven","ben","livet","umeå","vuxna","straffas","verkade","gaza","grupper","trots","gav","skicka","fröken","låna","färre","pakistan","sängen","detta","dålig","kör","söker","minska","finalen","skrattade","bordet","alkohol","mår","måndags","böcker","namn","zlatan","dödade","gälla","tvungen","leder","södra","hästarna","farmor","föräldrarna","vita","socialdemokraterna","tess","straff","spanien","håret","kläder","satte","lyssna","sjukhus","terrorister","hoppade","svara","jake","säljer","råd","havet","hittade","miljarder","svåra","viskar","förrän","äntligen","dömdes","nickar","dagens","klar","sprängdes","kina","flytta","medicin","januari","personal","svart","viktig","martina","vinner","klasse","gruppen","viktigaste","väljer","ringde","hålla","rider","roligt","männen","allting","månad","svenskarna","kväll","italien","planet","fråga","brev","joel","höga","drar","egna","arbetslösa","hoppsan","turkiet","sköter","slippa","fåglar","konstigt","os","all","tjugo","domstol","låta","dör","allra","vårt","gillar","ordna","flyktingar","sjukdomen","rättegång","söndags","planen","resa","tisdags","skydda","fattiga","reda","undersökningen","ljud","nyheter","pris","saddam","högre","möter","maten","domstolen","dessutom","springer","sten","premiärminister","bidrag","samtidigt","röda","norge","berra","lovat","folket","sätter","sova","kär","radon","okej","vänner","annars","massor","våld","landslaget","olyckan","syn","risk","skadad","kärnvapen","klarar","mötet","spelare","vidare","flygplan","bomb","mirjam","guld","storbritannien","linköping","landsting","poliserna","litet","musik","chefer","slutet","hända","troligen","hälften","sju","brukade","lägger","tänkt","bron","arbetat","snäll","uppe"] }

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function randomArrayValue(array) {
  var length = array.length - 1,
      index = Math.floor(Math.random() * (length + 1));

  return array[index];
}

exports.randomArrayValue = randomArrayValue;


},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCss = addCss;
exports.addScript = addScript;
exports.addStyle = addStyle;
exports.appendHTML = appendHTML;
exports.getTextNodes = getTextNodes;
exports.removeElement = removeElement;
exports.setStyle = setStyle;
function addCss(href, callback) {
  var l = document.createElement('link');
  l.setAttribute('href', href);
  l.setAttribute('rel', 'stylesheet');
  l.onload = callback;
  document.getElementsByTagName('head')[0].appendChild(l);
  return l;
}

function addScript(src, callback) {
  var s = document.createElement('script');
  s.setAttribute('src', src);
  s.onload = callback;
  document.getElementsByTagName('head')[0].appendChild(s);
  return s;
}

function addStyle(str) {
  var s = document.createElement('style');
  s.innerText = str;
  document.getElementsByTagName('head')[0].appendChild(s);
  return s;
}

function appendHTML(el, html) {
  var tmpEl = document.createElement('div');
  tmpEl.innerHTML = html;

  while (tmpEl.firstChild) {
    el.appendChild(tmpEl.firstChild);
  }
}

function getTextNodes(node) {
  var all = [];
  for (node = node.firstChild; node; node = node.nextSibling) {
    if (node.nodeType == 3) all.push(node);else all = all.concat(getTextNodes(node));
  }
  return all;
}

function removeElement(el) {
  el.parentNode.removeChild(el);
}

function setStyle(element, style) {
  for (var s in style) {
    element.style[s] = style[s];
  }
}


},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.random = random;
exports.pointInRect = pointInRect;
exports.inRange = inRange;
function random(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function pointInRect(x, y, rect) {
  return inRange(x, rect.x, rect.x + rect.width) && inRange(y, rect.y, rect.y + rect.height);
}

function inRange(value, min, max) {
  return value >= Math.min(min, max) && value <= Math.max(min, max);
}


},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLetter = isLetter;
exports.isUpperCase = isUpperCase;
function isLetter(c) {
  return c.toLowerCase() !== c.toUpperCase();
}

function isUpperCase(c) {
  return c === c.toUpperCase();
}


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcc21hbGxWb2NhYnVsYXJ5XFxjb250ZW50LmpzIiwiYnVpbGQvanMvYmFiZWwvc2ltdWxhdGlvbnMvc21hbGxWb2NhYnVsYXJ5L3dvcmRzLnN2Lmpzb24iLCJidWlsZFxcanNcXGJhYmVsXFx1dGlsc1xcYXJyYXkuanMiLCJidWlsZFxcanNcXGJhYmVsXFx1dGlsc1xcZG9tLmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcdXRpbHNcXG1hdGguanMiLCJidWlsZFxcanNcXGJhYmVsXFx1dGlsc1xcc3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBWDs7QUFFQSxJQUFJLFVBQVUsUUFBUSx1QkFBUixDQUFkOztBQUVBLElBQUksUUFBUSxRQUFRLHFCQUFSLENBQVo7O0FBRUEsSUFBSSxXQUFXLFFBQVEsaUJBQVIsQ0FBZjs7QUFFQSxJQUFJLFNBQVMsUUFBUSxzQkFBUixDQUFiOztBQUVBLElBQUksT0FBTyxpQkFBWDtBQUNBLElBQUksU0FBUyxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixDQUFiO0FBQ0EsSUFBSSxhQUFhLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CLEVBQW9DLEdBQXBDLEVBQXlDLEdBQXpDLEVBQThDLEdBQTlDLEVBQW1ELEdBQW5ELEVBQXdELEdBQXhELEVBQTZELEdBQTdELEVBQWtFLEdBQWxFLEVBQXVFLEdBQXZFLEVBQTRFLEdBQTVFLEVBQWlGLEdBQWpGLEVBQXNGLEdBQXRGLEVBQTJGLEdBQTNGLEVBQWdHLEdBQWhHLENBQWpCO0FBQ0EsSUFBSSxZQUFZLElB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LEdBQU4sR0FBWSxDQUE3QixDQUFqQixDQUFQO0FBQ0Q7O0FBRUQsU0FBUyxXQUFULENBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTJCLElBQTNCLEVBQWlDO0FBQy9CLFNBQU8sUUFBUSxDQUFSLEVBQVcsS0FBSyxDQUFoQixFQUFtQixLQUFLLENBQUwsR0FBUyxLQUFLLEtBQWpDLEtBQTJDLFFBQVEsQ0FBUixFQUFXLEtBQUssQ0FBaEIsRUFBbUIsS0FBSyxDQUFMLEdBQVMsS0FBSyxNQUFqQyxDQUFsRDtBQUNEOztBQUVELFNBQVMsT0FBVCxDQUFpQixLQUFqQixFQUF3QixHQUF4QixFQUE2QixHQUE3QixFQUFrQztBQUNoQyxTQUFPLFNBQVMsS0FBSyxHQUFMLENBQVMsR0FBVCxFQUFjLEdBQWQsQ0FBVCxJQUErQixTQUFTLEtBQUssR0FBTCxDQUFTLEdBQVQsRUFBYyxHQUFkLENBQS9DO0FBQ0Q7QUFDRDs7O0FDbkJBOztBQUVBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQyxTQUFPO0FBRG9DLENBQTdDO0FBR0EsUUFBUSxRQUFSLEdBQW1CLFFBQW5CO0FBQ0EsUUFBUSxXQUFSLEdBQXNCLFdBQXRCO0FBQ0EsU0FBUyxRQUFULENBQWtCLENBQWxCLEVBQXFCO0FBQ25CLFNBQU8sRUFBRSxXQUFGLE9BQW9CLEVBQUUsV0FBRixFQUEzQjtBQUNEOztBQUVELFNBQVMsV0FBVCxDQUFxQixDQUFyQixFQUF3QjtBQUN0QixTQUFPLE1BQU0sRUFBRSxXQUFGLEVBQWI7QUFDRDtBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9kb20gPSByZXF1aXJlKCcuLi8uLi91dGlscy9kb20uanMnKTtcblxudmFyIF9zdHJpbmcgPSByZXF1aXJlKCcuLi8uLi91dGlscy9zdHJpbmcuanMnKTtcblxudmFyIF9tYXRoID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvbWF0aC5qcycpO1xuXG52YXIgX3dvcmRzU3YgPSByZXF1aXJlKCcuL3dvcmRzLnN2Lmpzb24nKTtcblxudmFyIF9hcnJheSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2FycmF5LmpzJyk7XG5cbnZhciBuYW1lID0gJ3NtYWxsVm9jYWJ1bGFyeSc7XG52YXIgdm93ZWxzID0gW1wiYVwiLCBcImVcIiwgXCJpXCIsIFwib1wiLCBcInVcIiwgXCJ5XCJdO1xudmFyIGNvbnNvbmFudHMgPSBbXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJmXCIsIFwiZ1wiLCBcImhcIiwgXCJqXCIsIFwia1wiLCBcImxcIiwgXCJtXCIsIFwiblwiLCBcInBcIiwgXCJyXCIsIFwic1wiLCBcInRcIiwgXCJ2XCIsIFwid1wiLCBcInhcIiwgXCJ5XCIsIFwielwiXTtcbnZhciB0ZXh0Tm9kZXMgPSBudWxsO1xudmFyIGRpY3Rpb25hcnkgPSB7fTtcblxuZnVuY3Rpb24gcmFuZG9tTGV0dGVyKGxldHRlcikge1xuICB2YXIgY2hhcnMgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonO1xuICB2YXIgaSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJzLmxlbmd0aCk7XG4gIHZhciB2YWx1ZSA9IGNoYXJzLnN1YnN0cmluZyhpLCBpICsgMSk7XG5cbiAgcmV0dXJuICgwLCBfc3RyaW5nLmlzVXBwZXJDYXNlKShsZXR0ZXIpID8gdmFsdWUudG9VcHBlckNhc2UoKSA6IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzVGV4dCh0ZXh0KSB7XG5cbiAgcmV0dXJuIHRleHQuc3BsaXQoL1xccy8pLm1hcChmdW5jdGlvbiAod29yZCkge1xuXG4gICAgaWYgKHdvcmQudHJpbSgpLmxlbmd0aCA9PT0gMCB8fCBfd29yZHNTdi53b3Jkcy5pbmNsdWRlcyh3b3JkLnRyaW0oKS50b0xvd2VyQ2FzZSgpKSkge1xuXG4gICAgICByZXR1cm4gd29yZDtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvY2Vzc1dvcmQod29yZCk7XG4gIH0pLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1dvcmQod29yZCkge1xuXG4gIGlmIChkaWN0aW9uYXJ5W3dvcmRdKSB7XG4gICAgcmV0dXJuIGRpY3Rpb25hcnlbd29yZF07XG4gIH1cblxuICB2YXIgd29yZEFyciA9IHdvcmQuc3BsaXQoJycpO1xuXG4gIHZhciBjb3VudGVyID0gKDAsIF9tYXRoLnJhbmRvbSkoMCwgMSksXG4gICAgICBjb25zb25hbnQgPSAoMCwgX21hdGgucmFuZG9tKSgxLCAyKSA9PT0gMSA/IHRydWUgOiBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IHdvcmRBcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFyIGxldHRlciA9IHdvcmRBcnJbaV07XG5cbiAgICBpZiAoKDAsIF9zdHJpbmcuaXNMZXR0ZXIpKGxldHRlcikpIHtcbiAgICAgIHZhciBuZXdMZXR0ZXIgPSBjb25zb25hbnQgPyAoMCwgX2FycmF5LnJhbmRvbUFycmF5VmFsdWUpKGNvbnNvbmFudHMpIDogKDAsIF9hcnJheS5yYW5kb21BcnJheVZhbHVlKSh2b3dlbHMpO1xuICAgICAgd29yZEFycltpXSA9ICgwLCBfc3RyaW5nLmlzVXBwZXJDYXNlKShsZXR0ZXIpID8gbmV3TGV0dGVyLnRvVXBwZXJDYXNlKCkgOiBuZXdMZXR0ZXI7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50ZXIgPT09IGkpIHtcbiAgICAgIGNvdW50ZXIgKz0gKDAsIF9tYXRoLnJhbmRvbSkoMSwgMik7XG4gICAgICBjb25zb25hbnQgPSAhY29uc29uYW50O1xuICAgIH1cbiAgfVxuXG4gIHZhciBuZXdXb3JkID0gd29yZEFyci5qb2luKCcnKTtcblxuICBkaWN0aW9uYXJ5W3dvcmRdID0gbmV3V29yZDtcblxuICByZXR1cm4gbmV3V29yZDtcbn1cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG5cbiAgdmFyIHRhZ3NUb0lnbm9yZSA9IFsnU0NSSVBUJywgJ1NUWUxFJywgJ05PU0NSSVBUJ107XG5cbiAgdGV4dE5vZGVzID0gKDAsIF9kb20uZ2V0VGV4dE5vZGVzKShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykpO1xuXG4gIHRleHROb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuXG4gICAgaWYgKGVsLnRleHRDb250ZW50LnRyaW0oKS5sZW5ndGggPT09IDAgfHwgZWwucGFyZW50RWxlbWVudCAmJiB0YWdzVG9JZ25vcmUuaW5jbHVkZXMoZWwucGFyZW50RWxlbWVudC50YWdOYW1lKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGVsLnBhcmVudEVsZW1lbnQgJiYgZWwucGFyZW50RWxlbWVudC50YWdOYW1lLCBlbC50ZXh0Q29udGVudCk7XG5cbiAgICBlbC5fd2RzT3JpZ2luYWxUZXh0ID0gZWwudGV4dENvbnRlbnQ7XG4gICAgZWwudGV4dENvbnRlbnQgPSBwcm9jZXNzVGV4dChlbC50ZXh0Q29udGVudCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdG9wKCkge1xuXG4gIHRleHROb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgIGVsLnRleHRDb250ZW50ID0gZWwuX3dkc09yaWdpbmFsVGV4dDtcbiAgfSk7XG5cbiAgdGV4dE5vZGVzID0gbnVsbDtcbn1cblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICBpZiAocmVxdWVzdC5hY3Rpb24gPT09ICdzdGFydFNpbXVsYXRpb24nICYmIHJlcXVlc3Quc2ltdWxhdGlvbiA9PT0gbmFtZSkge1xuICAgIHN0YXJ0KCk7XG4gIH0gZWxzZSBpZiAocmVxdWVzdC5hY3Rpb24gPT09ICdzdG9wU2ltdWxhdGlvbicgJiYgcmVxdWVzdC5zaW11bGF0aW9uID09PSBuYW1lKSB7XG4gICAgc3RvcCgpO1xuICB9XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRlbnQuanMubWFwXG4iLCJtb2R1bGUuZXhwb3J0cz17IFwid29yZHNcIjogW1wib2NoXCIsXCJpXCIsXCLDpHJcIixcInDDpVwiLFwiYXR0XCIsXCJkZXRcIixcImhhclwiLFwic29tXCIsXCJpbnRlXCIsXCJlblwiLFwiZsO2clwiLFwibWVkXCIsXCJqYWdcIixcInNrYVwiLFwiaGFuXCIsXCJ0aWxsXCIsXCJ2YXJcIixcImthblwiLFwiYXZcIixcImR1XCIsXCJzw6RnZXJcIixcImhvblwiLFwib21cIixcImV0dFwiLFwiZGVcIixcIm1lblwiLFwic8OlXCIsXCJ2aVwiLFwiaGFkZVwiLFwiZGVuXCIsXCJuw6RyXCIsXCJzYVwiLFwiZsOlclwiLFwiZsOlXCIsXCJ2aWxsXCIsXCJvY2tzw6VcIixcImZyw6VuXCIsXCJtb3RcIixcImVsbGVyXCIsXCJtw6Rubmlza29yXCIsXCJ2YXJhXCIsXCJzdmVyaWdlXCIsXCLDpXJcIixcInNrdWxsZVwiLFwiYmFyYVwiLFwiaHVyXCIsXCJtw6VzdGVcIixcImhhXCIsXCJibGlyXCIsXCJrb21tZXJcIixcIm15Y2tldFwiLFwibWFuXCIsXCJudVwiLFwiYmxpXCIsXCJibGV2XCIsXCJmaW5uc1wiLFwiaG9ub21cIixcInZhZFwiLFwiZMOkclwiLFwiZGVtXCIsXCJhbmRyYVwiLFwiw7Z2ZXJcIixcInBlbmdhclwiLFwiZMOlXCIsXCJlZnRlclwiLFwibWVyXCIsXCJtw6VuZ2FcIixcImZpY2tcIixcIsOkblwiLFwiaGVubmVcIixcImfDtnJhXCIsXCJtaWdcIixcInR2w6VcIixcInR5Y2tlclwiLFwiYnJhXCIsXCJzaW5cIixcInNpZ1wiLFwidmFyaXRcIixcImfDtnJcIixcImjDpHJcIixcImZlbGl4XCIsXCJhbGxhXCIsXCJqdVwiLFwiYmFyblwiLFwidmlkXCIsXCJzaW5hXCIsXCJsaXRlXCIsXCJrdW5kZVwiLFwiZ8OlclwiLFwidmV0XCIsXCJmbGVyYVwiLFwibWFtbWFcIixcInRyb3JcIixcInZhbm5cIixcImt1bm5hXCIsXCJuw6VncmFcIixcIm55YVwiLFwic2VcIixcInVuZGVyXCIsXCJrb21cIixcInBhcHBhXCIsXCJwZXJzb25lclwiLFwidXRcIixcImJsaXZpdFwiLFwibMOkbmRlclwiLFwiZnVua3Rpb25zaGluZGVyXCIsXCJtYWpzYW5cIixcImbDpXR0XCIsXCJiZWjDtnZlclwiLFwic2VkYW5cIixcImhhbnNcIixcImthbnNrZVwiLFwic3TDpXJcIixcInbDpGxcIixcImluZXpcIixcImdqb3JkZVwiLFwicmVnZXJpbmdlblwiLFwib2xpa2FcIixcImxhbmRldFwiLFwic3RvcmFcIixcImdqb3J0XCIsXCJzZXJcIixcImhqw6RscFwiLFwiZmxlclwiLFwiZ8OlXCIsXCJzdmVuc2thXCIsXCJpZ2VuXCIsXCJuw6Vnb3RcIixcIm1lbGxhblwiLFwibG92ZVwiLFwia3Jvbm9yXCIsXCJhbHZhXCIsXCJzasOkbHZcIixcImFsZHJpZ1wiLFwiZXJpa1wiLFwic2l0dFwiLFwiZG9tXCIsXCJiZXRhbGFcIixcInNrb2xhblwiLFwidHJlXCIsXCJ2aWxsZVwiLFwiZ2lja1wiLFwiYsO2cmphZGVcIixcImRpdHRlXCIsXCJzYWRlXCIsXCJ0dXNlblwiLFwibsOlZ29uXCIsXCJzw6RnYVwiLFwidXRhblwiLFwiZXhlbXBlbFwiLFwibGVkYXJlXCIsXCJuw6RzdGFuXCIsXCJzw6VnXCIsXCJkaWdcIixcImhlbm5lc1wiLFwiaGVsYVwiLFwiYXJiZXRhclwiLFwibWluXCIsXCJsaWthXCIsXCJyZWRhblwiLFwiaW5uYW5cIixcImRlbFwiLFwibnlcIixcImbDtnJzdGFcIixcIm5pXCIsXCJtaXJyYW5cIixcInPDpHR0XCIsXCJwcmF0YVwiLFwiaW5nZW5cIixcInN0b2RcIixcInVzYVwiLFwiw6RuZMOlXCIsXCJzdGFmZmFuXCIsXCJnZW5vbVwiLFwiw6V0XCIsXCJldVwiLFwic3RvclwiLFwic3bDpXJ0XCIsXCLDpG5udVwiLFwib3NzXCIsXCJkaW5cIixcIm5vZ1wiLFwiZ2VcIixcImLDtnJqYXJcIixcInJlZ2xlclwiLFwic3RvY2tob2xtXCIsXCJqYVwiLFwiYsOkdHRyZVwiLFwiaW5cIixcInZldGFcIixcImFyYmV0YVwiLFwibGlzYVwiLFwiam9iYlwiLFwiZnJhbVwiLFwiYWxsdFwiLFwidMOkbmtlclwiLFwiaGrDpGxwYVwiLFwidmFyamVcIixcImFsbHRpZFwiLFwic3ZlcmlnZXNcIixcInNha2VyXCIsXCJwb2xpc2VuXCIsXCJ1clwiLFwia29tbWFcIixcImzDpG5ncmVcIixcImpvbmF0aGFuXCIsXCJpcmFrXCIsXCJtZWpcIixcImhlbHRcIixcInRhXCIsXCJnYW1sYVwiLFwicGVyY3lcIixcImTDpHJmw7ZyXCIsXCJ0aWxsc2FtbWFuc1wiLFwic2FtbWFcIixcImhvc1wiLFwidGlsbGJha2FcIixcImZ5cmFcIixcInRvZ1wiLFwidmFyYW5kcmFcIixcInVwcFwiLFwibMOkc2FcIixcImJvclwiLFwiZG9nXCIsXCJ0w6Rua3RlXCIsXCJtYXRjaGVuXCIsXCJnw6RsbGVyXCIsXCJ2aXNhclwiLFwibGlnZ2VyXCIsXCJkZXJhc1wiLFwic2l0dGVyXCIsXCJrdmFyXCIsXCLDpXJldFwiLFwibmVqXCIsXCI6XCIsXCJhcmJldGVcIixcImLDpHN0YVwiLFwibMOlZ1wiLFwiYsOlZGVcIixcIm1vcm1vclwiLFwiZmxlc3RhXCIsXCJhbnbDpG5kYVwiLFwidmlrdGlndFwiLFwicHJvYmxlbVwiLFwibWFsdGVcIixcImZvcnRmYXJhbmRlXCIsXCJmcsOlZ2FyXCIsXCJmYW5uc1wiLFwic2FsbHlcIixcImLDtnJqYVwiLFwiZsO2cmV0YWdcIixcImRhZ1wiLFwic2VuYXN0ZVwiLFwic29sZGF0ZXJcIixcIm1hdFwiLFwiZ8OlbmdlclwiLFwiw6PigJ5yXCIsXCJoYWZ0XCIsXCJsYW5kXCIsXCJzbHV0YVwiLFwidXRhbmbDtnJcIixcInNhZ3RcIixcIsOla2FcIixcInNrcml2ZXJcIixcImFubmF0XCIsXCJ0YXJcIixcImxpdGVuXCIsXCJrw7ZwYVwiLFwiaHVzZXRcIixcImbDtnJyYVwiLFwidGlkXCIsXCJuw6RzdGFcIixcImxhZ1wiLFwia8Okbm5zXCIsXCJrdmlubm9yXCIsXCJhbGxkZWxlc1wiLFwidmF0dGVuXCIsXCJsw6RuZ2VcIixcImjDpG5kZVwiLFwia2FsbGFzXCIsXCJwcmVjaXNcIixcIm1hamFcIixcIm5lclwiLFwidGlvXCIsXCJ2aXNzdGVcIixcImbDtnJzdFwiLFwiaGFuZGxhclwiLFwiYW5uYVwiLFwib2Z0YVwiLFwic3BlbGFcIixcImpvYWtpbVwiLFwicmVnZXJpbmdcIixcImhldGVyXCIsXCJyaWtzZGFnZW5cIixcInBsYXRzXCIsXCJkw7ZkYWRlc1wiLFwidmFsZXRcIixcImbDtnJzbGFnXCIsXCJkZWpcIixcInVuZGVyc8O2a2FcIixcInZhdHRuZXRcIixcImJydWthclwiLFwidW5kcmFyXCIsXCJyaWt0aWd0XCIsXCJow6RzdFwiLFwiZW5kYVwiLFwic25hcnRcIixcImlzcmFlbFwiLFwibWlsam9uZXJcIixcInNlalwiLFwic2lzdGFcIixcImJlc3TDpG1tYVwiLFwiYmV0eWRlclwiLFwidmVtXCIsXCJodXZ1ZGV0XCIsXCJoZWxsZXJcIixcInNlblwiLFwidMOkbmthXCIsXCJwb2xpdGlrZXJcIixcImJvcmRlXCIsXCJ0eWNrdGVcIixcImdlclwiLFwiZm9ydHPDpHR0ZXJcIixcIm1lc3RcIixcInR1cmJpblwiLFwiZsO2csOkbGRyYXJcIixcInZlcmthclwiLFwiZGFnYXJcIixcImbDtnJzw7ZrZXJcIixcImJpbFwiLFwiaW5nZW50aW5nXCIsXCJiYWtvbVwiLFwic2F0dFwiLFwibW9yZmFyXCIsXCJ0aWRpZ2FyZVwiLFwidGl0dGFyXCIsXCJnbGFkXCIsXCJmYWxsXCIsXCJtYW5uZW5cIixcImjDpG50XCIsXCJiZXN0w6RtbWVyXCIsXCJzdHVuZFwiLFwiYWxsc1wiLFwiZ8O2dGVib3JnXCIsXCJrYWpzYVwiLFwiaGFuZFwiLFwibGFnZW5cIixcInbDpHJsZGVuXCIsXCJkw7ZycmVuXCIsXCJzanVrXCIsXCJiZXN0w6RtdFwiLFwiaHVuZHJhXCIsXCJicm90dFwiLFwic25hYmJ0XCIsXCJodXNcIixcInRpZG5pbmdlblwiLFwiaGVsZ2VuXCIsXCJtw6Rya2xpblwiLFwic2p1a2FcIixcInPDpGtlcnRcIixcImzDpG5kZXJuYVwiLFwidsOlcmRcIixcImJlcsOkdHRhXCIsXCJyaWRhXCIsXCJoZW1cIixcImbDtnJzdMOlclwiLFwiYW5uYW5cIixcInRyb2RkZVwiLFwibHVkZGVcIixcImxpdlwiLFwiYm9ydFwiLFwiaGVtbWFcIixcImVuc1wiLFwiaXbDpGdcIixcIm3DpWxcIixcIm15cmFuXCIsXCJ1bmdhXCIsXCJtYXJrZW5cIixcInJvcGFyXCIsXCJpZGFnXCIsXCJzdGF0ZW5cIixcInJ1bnRcIixcInN2YXJhclwiLFwic3RvcHBhXCIsXCJzdmVuc2thclwiLFwidmFyZsO2clwiLFwidsOkbGRpZ3RcIixcImjDpWxsZXJcIixcImbDtnJzdMOlc1wiLFwidsOkZ1wiLFwiZm5cIixcImbDpG5nZWxzZVwiLFwiZm9ydHPDpHR0YVwiLFwiZmlubmFzXCIsXCJ2ZWNrb3JcIixcInNtw6VcIixcIm3DpG5cIixcIsOkdGFcIixcInByZXNpZGVudFwiLFwiZW5zYW1cIixcImJsYW5kXCIsXCJzdG9ydFwiLFwicsOkZGRcIixcImRpdHRcIixcImhqw6RscGVyXCIsXCJtZXRlclwiLFwiZmFyZmFyXCIsXCJmZW1cIixcInBlbmdhcm5hXCIsXCJrb21taXRcIixcImxpYmFub25cIixcInNrcml2YVwiLFwiZnJhbWbDtnJcIixcImzDpW5nXCIsXCJmb2xrXCIsXCJow7ZyXCIsXCJqdXN0XCIsXCJreXJrYW5cIixcIm1lZGFuXCIsXCJsYWdldFwiLFwiZsO2bGphXCIsXCJmYXN0XCIsXCJicmVkdmlkXCIsXCJ2ZXJrbGlnZW5cIixcInJpbmdhXCIsXCJyZWdsZXJuYVwiLFwiZnLDpWdhZGVcIixcImluZ2FcIixcInVuZGVyc8O2a25pbmdcIixcImh1Z29cIixcIm55dHRcIixcIm1pbmRyZVwiLFwiYmFybmVuXCIsXCJwbMO2dHNsaWd0XCIsXCJ1bmdkb21hclwiLFwiaGl0dGFcIixcImJlcsOkdHRhclwiLFwidmVja2FuXCIsXCJhbGx0c8OlXCIsXCJzdGFkZW5cIixcImFudG9uXCIsXCJtaW5zdFwiLFwiYmlsZW5cIixcInJ5c3NsYW5kXCIsXCLDtmdvblwiLFwiw6R2ZW5cIixcImhhbmRlblwiLFwibWl0dFwiLFwiZmlsaXBwYVwiLFwic3TDtmRcIixcInLDpHR0XCIsXCJmb3Rib2xsXCIsXCJ2aWxrYVwiLFwicGVyc29uXCIsXCJza2F0dFwiLFwiZm9ydFwiLFwiZMO2dHRcIixcInNldHRcIixcImJhcm5ldFwiLFwidGFnXCIsXCJlbGV2ZXJcIixcImNoYW5zXCIsXCJoYW1hc1wiLFwiaXJhblwiLFwicHJhdGFyXCIsXCJnw6VuZ2VuXCIsXCJsw6R0dFwiLFwib21yw6VkZXRcIixcImbDtnJzw7ZrdGVcIixcIm1hdGNoXCIsXCJiw6VkYVwiLFwidsOkZ2VuXCIsXCJqb2hhblwiLFwidW5kcmFkZVwiLFwiYnLDpWtcIixcInZtXCIsXCJiw7ZyamF0XCIsXCJzw7ZrYVwiLFwia29tbXVuZW5cIixcImzDpXRlclwiLFwidmlzYVwiLFwia2xhcnRcIixcInVuZ2Vmw6RyXCIsXCJiZXRhbGFyXCIsXCJwYXJcIixcImbDtnJ1dFwiLFwic2rDpGx2YVwiLFwiw6R0ZXJcIixcInRpZGVuXCIsXCJow6RuZGVyXCIsXCJmYWt0aXNrdFwiLFwiYm9cIixcIm5pY2tcIixcIm7DpWdvbnRpbmdcIixcInR1clwiLFwiZmVsXCIsXCJwcm9jZW50XCIsXCJpbmZvcm1hdGlvblwiLFwidHlzdFwiLFwiZ3J1cHBcIixcIm1pbmFcIixcInJvcGFkZVwiLFwidGlsbHNcIixcIm1hcmlhXCIsXCJnYW5za2FcIixcImbDtnJlXCIsXCJlbmFcIixcImjDtnJhXCIsXCJrb21tdW5lclwiLFwidsOlclwiLFwidmFubGlndFwiLFwiaMO2cmRlXCIsXCJkaXRcIixcInNsdXRhclwiLFwic2FtYXJiZXRhXCIsXCJkYWdlblwiLFwia2xvY2thblwiLFwiaGl0XCIsXCJhbGxhblwiLFwiZsO2bGplclwiLFwiw7Z2ZXJlbnNcIixcImplbm55XCIsXCJlZ2VuXCIsXCJiw6V0ZW5cIixcImNoZWZcIixcInNrYXR0ZW5cIixcImzDpW5ndFwiLFwidmFubGlnYVwiLFwic3RhbGxldFwiLFwia8Okbm5lclwiLFwidmFsXCIsXCJuYXR0ZW5cIixcImtvc3RhclwiLFwiZ8OldHRcIixcInNpdHRhXCIsXCJ1dGVcIixcImx1ZnRlblwiLFwiZWdlbnRsaWdlblwiLFwiw7Znb25lblwiLFwicsO2c3RcIixcInBvbGl0aWtlcm5hXCIsXCJhcmdcIixcInN0ZWZhblwiLFwiYW5qYVwiLFwia8OkbmRlXCIsXCLDpXJlblwiLFwibGV2YVwiLFwiZ2FtbWFsXCIsXCJrcm9wcGVuXCIsXCJzdMO2cnN0YVwiLFwibGFnYXJcIixcInLDtnN0YVwiLFwicnVtXCIsXCJkw6VsaWd0XCIsXCJoZWxzdFwiLFwidmlubmFcIixcInRpdHRhZGVcIixcImhvcHBhc1wiLFwiw6RsZHJlXCIsXCJsYXJzXCIsXCJpbm5lXCIsXCJzaWRhblwiLFwic2tvbG9yXCIsXCJtYWt0ZW5cIixcImlibGFuZFwiLFwiYnlnZ2FcIixcImpvYmJhclwiLFwidmVja2FcIixcImFudsOkbmRlclwiLFwic3TDpGxsZXRcIixcImJpbGFyXCIsXCJrbmFwcHRcIixcInNhbWjDpGxsZXRcIixcInNrb2dlblwiLFwiZnJlZHJpa1wiLFwic2thZGFkZXNcIixcInN0w6VcIixcImluZ2V0XCIsXCJtb3Jnb25cIixcImZ1bmdlcmFyXCIsXCJyw6R0dGlnaGV0ZXJcIixcImJlcsOkdHRhZGVcIixcInPDpGtlclwiLFwidmlzc2FcIixcImtyaWdldFwiLFwibGVkc2VuXCIsXCJmw7Zyc8O2a2FcIixcInbDpGxqYVwiLFwibMOlbmdhXCIsXCJzdmVuc2tcIixcImzDpHRcIixcImzDpHJhXCIsXCJza29sYVwiLFwidHlza2xhbmRcIixcImFuc3ZhclwiLFwiYsOkc3RcIixcInNlbmFyZVwiLFwic2x1dFwiLFwibWVuYXJcIixcInZpa3RpZ2FcIixcImxpbGxhXCIsXCJmw7ZyYmlcIixcImbDtnJzdMOlXCIsXCJib2xsZW5cIixcImludGVybmV0XCIsXCJzbG9nXCIsXCJnw6VuZ1wiLFwidsOkcmxkZW5zXCIsXCJ0aXR0YVwiLFwic2FrXCIsXCJrb21tdW5lcm5hXCIsXCJzZXhcIixcIsOla3RlXCIsXCJ2aWxrZW5cIixcInNwZWxhZGVcIixcImvDpG5kZXNcIixcInN0w7ZycmVcIixcIm15bmRpZ2hldGVyXCIsXCJrdmlubmFcIixcInRyb1wiLFwibG92YXJcIixcImvDtnBlclwiLFwibMOkdHRhcmVcIixcImlzcmFlbHNcIixcImjDpXJcIixcInNsdXRhZGVcIixcIm1pc3N0w6Rua3RcIixcImjDpXJ0XCIsXCJzdGFubmFcIixcInZhcGVuXCIsXCJmb3J0c2F0dGVcIixcImRhbm5lXCIsXCJza3JhdHRhclwiLFwiYW52w6RuZGFzXCIsXCJwYWxlc3RpbnNrYVwiLFwiam9iYmV0XCIsXCJtw6VuYWRlclwiLFwibWFnZW5cIixcInbDpG50YVwiLFwiZWZ0ZXJzb21cIixcImRhbm1hcmtcIixcIsOla2VyXCIsXCLDpXJldHNcIixcIm5pY2thZGVcIixcImfDtnJhblwiLFwicmluZ2VyXCIsXCJwbGF0c2VyXCIsXCJrw7ZyYVwiLFwiYmVyb3JcIixcInRyw6RmZmFcIixcImxlclwiLFwiZW1vdFwiLFwiZsO2cnPDpGtyaW5nc2thc3NhblwiLFwidGVzc2FcIixcImJlc3TDpG1kZVwiLFwib3JkXCIsXCJkanVyXCIsXCJow7ZsbFwiLFwiZnLDpWdvclwiLFwibWlsb1wiLFwicmFrdFwiLFwiYmVow7Z2c1wiLFwibMOka2FyZVwiLFwiZMO2ZGFcIixcInbDpHN0cmFcIixcImV4dHJhXCIsXCJib3J0YVwiLFwic8OkbGphXCIsXCJzcGVsYXJcIixcImzDpG1uYVwiLFwibG9nXCIsXCJ0aWxscsOkY2tsaWd0XCIsXCJwb2xpc2VyXCIsXCJrdW5uYXRcIixcImbDtm5zdHJldFwiLFwiZXVyb3BhXCIsXCJqb1wiLFwidHJhcHBhblwiLFwib21rcmluZ1wiLFwiZsO2cmxvcmFkZVwiLFwiZ29sdmV0XCIsXCJ2w6RudGFyXCIsXCJ1dGJpbGRuaW5nXCIsXCJhbWFuZGFcIixcImRpcmVrdFwiLFwiZWxpblwiLFwidGltbWFyXCIsXCJqb2JiYVwiLFwiaMO2Z3RcIixcImtsYXJhXCIsXCJvbnNkYWdlblwiLFwibXVubmVuXCIsXCJseWNrYWRlc1wiLFwicGFydGlldFwiLFwicGlhXCIsXCJhbmRlcnNcIixcIm3DtmpsaWd0XCIsXCJrdWxcIixcImtvbW11blwiLFwiaGVqXCIsXCJiasO2cm5cIixcIsOkbmRyYVwiLFwidmlza2FkZVwiLFwicmVnZXJpbmdlbnNcIixcIm3DpG5uaXNrYVwiLFwibm9yZGtvcmVhXCIsXCJ0YWdpdFwiLFwiZGluYVwiLFwibWludXRlclwiLFwiaGrDpGxwbWVkZWxcIixcInTDpHZsaW5nZW5cIixcImFyYmV0ZXRcIixcInPDpWRhbnRcIixcImVnZXRcIixcImFuc2lrdGV0XCIsXCJ2w6VyYVwiLFwiZ8Okcm5hXCIsXCJwcmF0YWRlXCIsXCJkcm9nXCIsXCJ1c2FzXCIsXCJzdGVnXCIsXCJtYW51ZWxcIixcInbDpWdhclwiLFwibWlzc3TDpG5rdGFcIixcImZhdHRhclwiLFwia29tcGlzXCIsXCJmaW5sYW5kXCIsXCJmYW1pbGpcIixcImRlbGFyXCIsXCJiaXRcIixcImFtZXJpa2Fuc2thXCIsXCLDo+KAnm5kw6VcIixcIm1hdGNoZXJcIixcImJvbWJlclwiLFwiaGl0dGF0XCIsXCJibMOlXCIsXCJ0YWxhXCIsXCJza3Jpdml0XCIsXCJwcmlzZXRcIixcImVsZXZlcm5hXCIsXCJleHBlcnRlclwiLFwiaMOkbmRlcm5hXCIsXCJmYXJsaWdhXCIsXCJzdmFydGFcIixcIm7DtmpkXCIsXCJ0cmVkamVcIixcImxhbmRldHNcIixcInBhcHBlclwiLFwidnVubml0XCIsXCJyw7ZzdGVyXCIsXCJpc3TDpGxsZXRcIixcImvDtmtldFwiLFwia29tcGlzYXJcIixcInN2YXJhZGVcIixcImzDtm5cIixcImtyaWdcIixcInbDpHJyZVwiLFwidG9yc2RhZ2VuXCIsXCJwbGFuXCIsXCJ0asOkbmFyXCIsXCJtw6Ruc2tsaWdhXCIsXCJmw7Zyc3RvZFwiLFwiZsO2cmV0YWdldFwiLFwiaMOlbGxcIixcImhpdHRhclwiLFwiZnJhbmtyaWtlXCIsXCJyZWluZmVsZHRcIixcInBhcnRpZXJuYVwiLFwicGVyc3NvblwiLFwic2tyZWtcIixcInPDpG1yZVwiLFwiYsO2cmphblwiLFwiaGlubmVyXCIsXCJmcmFtdGlkZW5cIixcInN0cmFuZGVuXCIsXCJ2YXJvclwiLFwia8O2cmRlXCIsXCJmdWxsXCIsXCJmw7Zyc8O2a3RcIixcImV1LWzDpG5kZXJuYVwiLFwicGFydGlcIixcImJsaWNrXCIsXCJ0w6Rua1wiLFwidMOlZ1wiLFwiZGFnYXJuYVwiLFwibWFydGluXCIsXCJvcm9saWdhXCIsXCJyw6Rja2VyXCIsXCJow7ZnXCIsXCJqb3JkZW5cIixcInJ5Z2dlblwiLFwibMO2bmVyXCIsXCJmw7ZyYmp1ZGV0XCIsXCLDpXR0YVwiLFwidGlzZGFnZW5cIixcImJlaMO2dmFcIixcImlub21cIixcImt2w6RsbGVuXCIsXCJza8O2dFwiLFwibWlsasO2blwiLFwiZsO2cmVzbMOlclwiLFwic8OkcnNraWx0XCIsXCJuw6RyYVwiLFwic3ByYW5nXCIsXCJiZXLDpHR0YXRcIixcImjDpHN0YXJcIixcImbDtnJzbGFnZXRcIixcIm3DpW5kYWdlblwiLFwiaWxsYVwiLFwidmlzYWRlXCIsXCJnZW5hc3RcIixcIm3DtnRlXCIsXCJsYXJzc29uXCIsXCJpbnZhbmRyYXJlXCIsXCLDo+KAnnZlblwiLFwiYmVuXCIsXCJsaXZldFwiLFwidW1lw6VcIixcInZ1eG5hXCIsXCJzdHJhZmZhc1wiLFwidmVya2FkZVwiLFwiZ2F6YVwiLFwiZ3J1cHBlclwiLFwidHJvdHNcIixcImdhdlwiLFwic2tpY2thXCIsXCJmcsO2a2VuXCIsXCJsw6VuYVwiLFwiZsOkcnJlXCIsXCJwYWtpc3RhblwiLFwic8OkbmdlblwiLFwiZGV0dGFcIixcImTDpWxpZ1wiLFwia8O2clwiLFwic8O2a2VyXCIsXCJtaW5za2FcIixcImZpbmFsZW5cIixcInNrcmF0dGFkZVwiLFwiYm9yZGV0XCIsXCJhbGtvaG9sXCIsXCJtw6VyXCIsXCJtw6VuZGFnc1wiLFwiYsO2Y2tlclwiLFwibmFtblwiLFwiemxhdGFuXCIsXCJkw7ZkYWRlXCIsXCJnw6RsbGFcIixcInR2dW5nZW5cIixcImxlZGVyXCIsXCJzw7ZkcmFcIixcImjDpHN0YXJuYVwiLFwiZmFybW9yXCIsXCJmw7Zyw6RsZHJhcm5hXCIsXCJ2aXRhXCIsXCJzb2NpYWxkZW1va3JhdGVybmFcIixcInRlc3NcIixcInN0cmFmZlwiLFwic3BhbmllblwiLFwiaMOlcmV0XCIsXCJrbMOkZGVyXCIsXCJzYXR0ZVwiLFwibHlzc25hXCIsXCJzanVraHVzXCIsXCJ0ZXJyb3Jpc3RlclwiLFwiaG9wcGFkZVwiLFwic3ZhcmFcIixcImpha2VcIixcInPDpGxqZXJcIixcInLDpWRcIixcImhhdmV0XCIsXCJoaXR0YWRlXCIsXCJtaWxqYXJkZXJcIixcInN2w6VyYVwiLFwidmlza2FyXCIsXCJmw7ZycsOkblwiLFwiw6RudGxpZ2VuXCIsXCJkw7ZtZGVzXCIsXCJuaWNrYXJcIixcImRhZ2Vuc1wiLFwia2xhclwiLFwic3Byw6RuZ2Rlc1wiLFwia2luYVwiLFwiZmx5dHRhXCIsXCJtZWRpY2luXCIsXCJqYW51YXJpXCIsXCJwZXJzb25hbFwiLFwic3ZhcnRcIixcInZpa3RpZ1wiLFwibWFydGluYVwiLFwidmlubmVyXCIsXCJrbGFzc2VcIixcImdydXBwZW5cIixcInZpa3RpZ2FzdGVcIixcInbDpGxqZXJcIixcInJpbmdkZVwiLFwiaMOlbGxhXCIsXCJyaWRlclwiLFwicm9saWd0XCIsXCJtw6RubmVuXCIsXCJhbGx0aW5nXCIsXCJtw6VuYWRcIixcInN2ZW5za2FybmFcIixcImt2w6RsbFwiLFwiaXRhbGllblwiLFwicGxhbmV0XCIsXCJmcsOlZ2FcIixcImJyZXZcIixcImpvZWxcIixcImjDtmdhXCIsXCJkcmFyXCIsXCJlZ25hXCIsXCJhcmJldHNsw7ZzYVwiLFwiaG9wcHNhblwiLFwidHVya2lldFwiLFwic2vDtnRlclwiLFwic2xpcHBhXCIsXCJmw6VnbGFyXCIsXCJrb25zdGlndFwiLFwib3NcIixcImFsbFwiLFwidGp1Z29cIixcImRvbXN0b2xcIixcImzDpXRhXCIsXCJkw7ZyXCIsXCJhbGxyYVwiLFwidsOlcnRcIixcImdpbGxhclwiLFwib3JkbmFcIixcImZseWt0aW5nYXJcIixcInNqdWtkb21lblwiLFwicsOkdHRlZ8OlbmdcIixcInPDtm5kYWdzXCIsXCJwbGFuZW5cIixcInJlc2FcIixcInRpc2RhZ3NcIixcInNreWRkYVwiLFwiZmF0dGlnYVwiLFwicmVkYVwiLFwidW5kZXJzw7ZrbmluZ2VuXCIsXCJsanVkXCIsXCJueWhldGVyXCIsXCJwcmlzXCIsXCJzYWRkYW1cIixcImjDtmdyZVwiLFwibcO2dGVyXCIsXCJtYXRlblwiLFwiZG9tc3RvbGVuXCIsXCJkZXNzdXRvbVwiLFwic3ByaW5nZXJcIixcInN0ZW5cIixcInByZW1pw6RybWluaXN0ZXJcIixcImJpZHJhZ1wiLFwic2FtdGlkaWd0XCIsXCJyw7ZkYVwiLFwibm9yZ2VcIixcImJlcnJhXCIsXCJsb3ZhdFwiLFwiZm9sa2V0XCIsXCJzw6R0dGVyXCIsXCJzb3ZhXCIsXCJrw6RyXCIsXCJyYWRvblwiLFwib2tlalwiLFwidsOkbm5lclwiLFwiYW5uYXJzXCIsXCJtYXNzb3JcIixcInbDpWxkXCIsXCJsYW5kc2xhZ2V0XCIsXCJvbHlja2FuXCIsXCJzeW5cIixcInJpc2tcIixcInNrYWRhZFwiLFwia8Okcm52YXBlblwiLFwia2xhcmFyXCIsXCJtw7Z0ZXRcIixcInNwZWxhcmVcIixcInZpZGFyZVwiLFwiZmx5Z3BsYW5cIixcImJvbWJcIixcIm1pcmphbVwiLFwiZ3VsZFwiLFwic3RvcmJyaXRhbm5pZW5cIixcImxpbmvDtnBpbmdcIixcImxhbmRzdGluZ1wiLFwicG9saXNlcm5hXCIsXCJsaXRldFwiLFwibXVzaWtcIixcImNoZWZlclwiLFwic2x1dGV0XCIsXCJow6RuZGFcIixcInRyb2xpZ2VuXCIsXCJow6RsZnRlblwiLFwic2p1XCIsXCJicnVrYWRlXCIsXCJsw6RnZ2VyXCIsXCJ0w6Rua3RcIixcImJyb25cIixcImFyYmV0YXRcIixcInNuw6RsbFwiLFwidXBwZVwiXSB9XHJcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZnVuY3Rpb24gcmFuZG9tQXJyYXlWYWx1ZShhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIC0gMSxcbiAgICAgIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGxlbmd0aCArIDEpKTtcblxuICByZXR1cm4gYXJyYXlbaW5kZXhdO1xufVxuXG5leHBvcnRzLnJhbmRvbUFycmF5VmFsdWUgPSByYW5kb21BcnJheVZhbHVlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXkuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmFkZENzcyA9IGFkZENzcztcbmV4cG9ydHMuYWRkU2NyaXB0ID0gYWRkU2NyaXB0O1xuZXhwb3J0cy5hZGRTdHlsZSA9IGFkZFN0eWxlO1xuZXhwb3J0cy5hcHBlbmRIVE1MID0gYXBwZW5kSFRNTDtcbmV4cG9ydHMuZ2V0VGV4dE5vZGVzID0gZ2V0VGV4dE5vZGVzO1xuZXhwb3J0cy5yZW1vdmVFbGVtZW50ID0gcmVtb3ZlRWxlbWVudDtcbmV4cG9ydHMuc2V0U3R5bGUgPSBzZXRTdHlsZTtcbmZ1bmN0aW9uIGFkZENzcyhocmVmLCBjYWxsYmFjaykge1xuICB2YXIgbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgbC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgbC5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdzdHlsZXNoZWV0Jyk7XG4gIGwub25sb2FkID0gY2FsbGJhY2s7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobCk7XG4gIHJldHVybiBsO1xufVxuXG5mdW5jdGlvbiBhZGRTY3JpcHQoc3JjLCBjYWxsYmFjaykge1xuICB2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICBzLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcbiAgcy5vbmxvYWQgPSBjYWxsYmFjaztcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzKTtcbiAgcmV0dXJuIHM7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKHN0cikge1xuICB2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHMuaW5uZXJUZXh0ID0gc3RyO1xuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHMpO1xuICByZXR1cm4gcztcbn1cblxuZnVuY3Rpb24gYXBwZW5kSFRNTChlbCwgaHRtbCkge1xuICB2YXIgdG1wRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdG1wRWwuaW5uZXJIVE1MID0gaHRtbDtcblxuICB3aGlsZSAodG1wRWwuZmlyc3RDaGlsZCkge1xuICAgIGVsLmFwcGVuZENoaWxkKHRtcEVsLmZpcnN0Q2hpbGQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRleHROb2Rlcyhub2RlKSB7XG4gIHZhciBhbGwgPSBbXTtcbiAgZm9yIChub2RlID0gbm9kZS5maXJzdENoaWxkOyBub2RlOyBub2RlID0gbm9kZS5uZXh0U2libGluZykge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09IDMpIGFsbC5wdXNoKG5vZGUpO2Vsc2UgYWxsID0gYWxsLmNvbmNhdChnZXRUZXh0Tm9kZXMobm9kZSkpO1xuICB9XG4gIHJldHVybiBhbGw7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUVsZW1lbnQoZWwpIHtcbiAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG59XG5cbmZ1bmN0aW9uIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlKSB7XG4gIGZvciAodmFyIHMgaW4gc3R5bGUpIHtcbiAgICBlbGVtZW50LnN0eWxlW3NdID0gc3R5bGVbc107XG4gIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yYW5kb20gPSByYW5kb207XG5leHBvcnRzLnBvaW50SW5SZWN0ID0gcG9pbnRJblJlY3Q7XG5leHBvcnRzLmluUmFuZ2UgPSBpblJhbmdlO1xuZnVuY3Rpb24gcmFuZG9tKG1pbiwgbWF4KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKG1pbiArIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xufVxuXG5mdW5jdGlvbiBwb2ludEluUmVjdCh4LCB5LCByZWN0KSB7XG4gIHJldHVybiBpblJhbmdlKHgsIHJlY3QueCwgcmVjdC54ICsgcmVjdC53aWR0aCkgJiYgaW5SYW5nZSh5LCByZWN0LnksIHJlY3QueSArIHJlY3QuaGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gaW5SYW5nZSh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgcmV0dXJuIHZhbHVlID49IE1hdGgubWluKG1pbiwgbWF4KSAmJiB2YWx1ZSA8PSBNYXRoLm1heChtaW4sIG1heCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXRoLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmlzTGV0dGVyID0gaXNMZXR0ZXI7XG5leHBvcnRzLmlzVXBwZXJDYXNlID0gaXNVcHBlckNhc2U7XG5mdW5jdGlvbiBpc0xldHRlcihjKSB7XG4gIHJldHVybiBjLnRvTG93ZXJDYXNlKCkgIT09IGMudG9VcHBlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gaXNVcHBlckNhc2UoYykge1xuICByZXR1cm4gYyA9PT0gYy50b1VwcGVyQ2FzZSgpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RyaW5nLmpzLm1hcFxuIl19
