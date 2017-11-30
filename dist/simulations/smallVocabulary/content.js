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
  textNodes = (0, _dom.getTextNodes)(document.querySelector('body'));

  console.log('start', textNodes);

  textNodes.forEach(function (el) {

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcc21hbGxWb2NhYnVsYXJ5XFxjb250ZW50LmpzIiwiYnVpbGQvanMvYmFiZWwvc2ltdWxhdGlvbnMvc21hbGxWb2NhYnVsYXJ5L3dvcmRzLnN2Lmpzb24iLCJidWlsZFxcanNcXGJhYmVsXFx1dGlsc1xcYXJyYXkuanMiLCJidWlsZFxcanNcXGJhYmVsXFx1dGlsc1xcZG9tLmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcdXRpbHNcXG1hdGguanMiLCJidWlsZFxcanNcXGJhYmVsXFx1dGlsc1xcc3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBWDs7QUFFQSxJQUFJLFVBQVUsUUFBUSx1QkFBUixDQUFkOztBQUVBLElBQUksUUFBUSxRQUFRLHFCQUFSLENBQVo7O0FBRUEsSUFBSSxXQUFXLFFBQVEsaUJBQVIsQ0FBZjs7QUFFQSxJQUFJLFNBQVMsUUFBUSxzQkFBUixDQUFiOztBQUVBLElBQUksT0FBTyxpQkFBWDtBQUNBLElBQUksU0FBUyxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixDQUFiO0FBQ0EsSUFBSSxhQUFhLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CLEVBQW9DLEdBQXBDLEVBQXlDLEdBQXpDLEVBQThDLEdBQTlDLEVBQW1ELEdBQW5ELEVBQXdELEdBQXhELEVBQTZELEdBQTdELEVBQWtFLEdBQWxFLEVBQXVFLEdBQXZFLEVBQTRFLEdBQTVFLEVBQWlGLEdBQWpGLEVBQXNGLEdBQXRGLEVBQTJGLEdBQTNGLEVBQWdHLEdBQWhHLENBQWpCO0FBQ0EsSUFBSSxZQUFZLElB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QUNEOztBQUVELFNBQVMsT0FBVCxDQUFpQixLQUFqQixFQUF3QixHQUF4QixFQUE2QixHQUE3QixFQUFrQztBQUNoQyxTQUFPLFNBQVMsS0FBSyxHQUFMLENBQVMsR0FBVCxFQUFjLEdBQWQsQ0FBVCxJQUErQixTQUFTLEtBQUssR0FBTCxDQUFTLEdBQVQsRUFBYyxHQUFkLENBQS9DO0FBQ0Q7QUFDRDs7O0FDbkJBOztBQUVBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQyxTQUFPO0FBRG9DLENBQTdDO0FBR0EsUUFBUSxRQUFSLEdBQW1CLFFBQW5CO0FBQ0EsUUFBUSxXQUFSLEdBQXNCLFdBQXRCO0FBQ0EsU0FBUyxRQUFULENBQWtCLENBQWxCLEVBQXFCO0FBQ25CLFNBQU8sRUFBRSxXQUFGLE9BQW9CLEVBQUUsV0FBRixFQUEzQjtBQUNEOztBQUVELFNBQVMsV0FBVCxDQUFxQixDQUFyQixFQUF3QjtBQUN0QixTQUFPLE1BQU0sRUFBRSxXQUFGLEVBQWI7QUFDRDtBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9kb20gPSByZXF1aXJlKCcuLi8uLi91dGlscy9kb20uanMnKTtcblxudmFyIF9zdHJpbmcgPSByZXF1aXJlKCcuLi8uLi91dGlscy9zdHJpbmcuanMnKTtcblxudmFyIF9tYXRoID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvbWF0aC5qcycpO1xuXG52YXIgX3dvcmRzU3YgPSByZXF1aXJlKCcuL3dvcmRzLnN2Lmpzb24nKTtcblxudmFyIF9hcnJheSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2FycmF5LmpzJyk7XG5cbnZhciBuYW1lID0gJ3NtYWxsVm9jYWJ1bGFyeSc7XG52YXIgdm93ZWxzID0gW1wiYVwiLCBcImVcIiwgXCJpXCIsIFwib1wiLCBcInVcIiwgXCJ5XCJdO1xudmFyIGNvbnNvbmFudHMgPSBbXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJmXCIsIFwiZ1wiLCBcImhcIiwgXCJqXCIsIFwia1wiLCBcImxcIiwgXCJtXCIsIFwiblwiLCBcInBcIiwgXCJyXCIsIFwic1wiLCBcInRcIiwgXCJ2XCIsIFwid1wiLCBcInhcIiwgXCJ5XCIsIFwielwiXTtcbnZhciB0ZXh0Tm9kZXMgPSBudWxsO1xudmFyIGRpY3Rpb25hcnkgPSB7fTtcblxuZnVuY3Rpb24gcmFuZG9tTGV0dGVyKGxldHRlcikge1xuICB2YXIgY2hhcnMgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonO1xuICB2YXIgaSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJzLmxlbmd0aCk7XG4gIHZhciB2YWx1ZSA9IGNoYXJzLnN1YnN0cmluZyhpLCBpICsgMSk7XG5cbiAgcmV0dXJuICgwLCBfc3RyaW5nLmlzVXBwZXJDYXNlKShsZXR0ZXIpID8gdmFsdWUudG9VcHBlckNhc2UoKSA6IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzVGV4dCh0ZXh0KSB7XG5cbiAgcmV0dXJuIHRleHQuc3BsaXQoL1xccy8pLm1hcChmdW5jdGlvbiAod29yZCkge1xuXG4gICAgaWYgKHdvcmQudHJpbSgpLmxlbmd0aCA9PT0gMCB8fCBfd29yZHNTdi53b3Jkcy5pbmNsdWRlcyh3b3JkLnRyaW0oKS50b0xvd2VyQ2FzZSgpKSkge1xuXG4gICAgICByZXR1cm4gd29yZDtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvY2Vzc1dvcmQod29yZCk7XG4gIH0pLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1dvcmQod29yZCkge1xuXG4gIGlmIChkaWN0aW9uYXJ5W3dvcmRdKSB7XG4gICAgcmV0dXJuIGRpY3Rpb25hcnlbd29yZF07XG4gIH1cblxuICB2YXIgd29yZEFyciA9IHdvcmQuc3BsaXQoJycpO1xuXG4gIHZhciBjb3VudGVyID0gKDAsIF9tYXRoLnJhbmRvbSkoMCwgMSksXG4gICAgICBjb25zb25hbnQgPSAoMCwgX21hdGgucmFuZG9tKSgxLCAyKSA9PT0gMSA/IHRydWUgOiBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IHdvcmRBcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFyIGxldHRlciA9IHdvcmRBcnJbaV07XG5cbiAgICBpZiAoKDAsIF9zdHJpbmcuaXNMZXR0ZXIpKGxldHRlcikpIHtcbiAgICAgIHZhciBuZXdMZXR0ZXIgPSBjb25zb25hbnQgPyAoMCwgX2FycmF5LnJhbmRvbUFycmF5VmFsdWUpKGNvbnNvbmFudHMpIDogKDAsIF9hcnJheS5yYW5kb21BcnJheVZhbHVlKSh2b3dlbHMpO1xuICAgICAgd29yZEFycltpXSA9ICgwLCBfc3RyaW5nLmlzVXBwZXJDYXNlKShsZXR0ZXIpID8gbmV3TGV0dGVyLnRvVXBwZXJDYXNlKCkgOiBuZXdMZXR0ZXI7XG4gICAgfVxuXG4gICAgaWYgKGNvdW50ZXIgPT09IGkpIHtcbiAgICAgIGNvdW50ZXIgKz0gKDAsIF9tYXRoLnJhbmRvbSkoMSwgMik7XG4gICAgICBjb25zb25hbnQgPSAhY29uc29uYW50O1xuICAgIH1cbiAgfVxuXG4gIHZhciBuZXdXb3JkID0gd29yZEFyci5qb2luKCcnKTtcblxuICBkaWN0aW9uYXJ5W3dvcmRdID0gbmV3V29yZDtcblxuICByZXR1cm4gbmV3V29yZDtcbn1cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gIHRleHROb2RlcyA9ICgwLCBfZG9tLmdldFRleHROb2RlcykoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpKTtcblxuICBjb25zb2xlLmxvZygnc3RhcnQnLCB0ZXh0Tm9kZXMpO1xuXG4gIHRleHROb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuXG4gICAgZWwuX3dkc09yaWdpbmFsVGV4dCA9IGVsLnRleHRDb250ZW50O1xuICAgIGVsLnRleHRDb250ZW50ID0gcHJvY2Vzc1RleHQoZWwudGV4dENvbnRlbnQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RvcCgpIHtcblxuICB0ZXh0Tm9kZXMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICBlbC50ZXh0Q29udGVudCA9IGVsLl93ZHNPcmlnaW5hbFRleHQ7XG4gIH0pO1xuXG4gIHRleHROb2RlcyA9IG51bGw7XG59XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgaWYgKHJlcXVlc3QuYWN0aW9uID09PSAnc3RhcnRTaW11bGF0aW9uJyAmJiByZXF1ZXN0LnNpbXVsYXRpb24gPT09IG5hbWUpIHtcbiAgICBzdGFydCgpO1xuICB9IGVsc2UgaWYgKHJlcXVlc3QuYWN0aW9uID09PSAnc3RvcFNpbXVsYXRpb24nICYmIHJlcXVlc3Quc2ltdWxhdGlvbiA9PT0gbmFtZSkge1xuICAgIHN0b3AoKTtcbiAgfVxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb250ZW50LmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHM9eyBcIndvcmRzXCI6IFtcIm9jaFwiLFwiaVwiLFwiw6RyXCIsXCJww6VcIixcImF0dFwiLFwiZGV0XCIsXCJoYXJcIixcInNvbVwiLFwiaW50ZVwiLFwiZW5cIixcImbDtnJcIixcIm1lZFwiLFwiamFnXCIsXCJza2FcIixcImhhblwiLFwidGlsbFwiLFwidmFyXCIsXCJrYW5cIixcImF2XCIsXCJkdVwiLFwic8OkZ2VyXCIsXCJob25cIixcIm9tXCIsXCJldHRcIixcImRlXCIsXCJtZW5cIixcInPDpVwiLFwidmlcIixcImhhZGVcIixcImRlblwiLFwibsOkclwiLFwic2FcIixcImbDpXJcIixcImbDpVwiLFwidmlsbFwiLFwib2Nrc8OlXCIsXCJmcsOlblwiLFwibW90XCIsXCJlbGxlclwiLFwibcOkbm5pc2tvclwiLFwidmFyYVwiLFwic3ZlcmlnZVwiLFwiw6VyXCIsXCJza3VsbGVcIixcImJhcmFcIixcImh1clwiLFwibcOlc3RlXCIsXCJoYVwiLFwiYmxpclwiLFwia29tbWVyXCIsXCJteWNrZXRcIixcIm1hblwiLFwibnVcIixcImJsaVwiLFwiYmxldlwiLFwiZmlubnNcIixcImhvbm9tXCIsXCJ2YWRcIixcImTDpHJcIixcImRlbVwiLFwiYW5kcmFcIixcIsO2dmVyXCIsXCJwZW5nYXJcIixcImTDpVwiLFwiZWZ0ZXJcIixcIm1lclwiLFwibcOlbmdhXCIsXCJmaWNrXCIsXCLDpG5cIixcImhlbm5lXCIsXCJnw7ZyYVwiLFwibWlnXCIsXCJ0dsOlXCIsXCJ0eWNrZXJcIixcImJyYVwiLFwic2luXCIsXCJzaWdcIixcInZhcml0XCIsXCJnw7ZyXCIsXCJow6RyXCIsXCJmZWxpeFwiLFwiYWxsYVwiLFwianVcIixcImJhcm5cIixcInZpZFwiLFwic2luYVwiLFwibGl0ZVwiLFwia3VuZGVcIixcImfDpXJcIixcInZldFwiLFwiZmxlcmFcIixcIm1hbW1hXCIsXCJ0cm9yXCIsXCJ2YW5uXCIsXCJrdW5uYVwiLFwibsOlZ3JhXCIsXCJueWFcIixcInNlXCIsXCJ1bmRlclwiLFwia29tXCIsXCJwYXBwYVwiLFwicGVyc29uZXJcIixcInV0XCIsXCJibGl2aXRcIixcImzDpG5kZXJcIixcImZ1bmt0aW9uc2hpbmRlclwiLFwibWFqc2FuXCIsXCJmw6V0dFwiLFwiYmVow7Z2ZXJcIixcInNlZGFuXCIsXCJoYW5zXCIsXCJrYW5za2VcIixcInN0w6VyXCIsXCJ2w6RsXCIsXCJpbmV6XCIsXCJnam9yZGVcIixcInJlZ2VyaW5nZW5cIixcIm9saWthXCIsXCJsYW5kZXRcIixcInN0b3JhXCIsXCJnam9ydFwiLFwic2VyXCIsXCJoasOkbHBcIixcImZsZXJcIixcImfDpVwiLFwic3ZlbnNrYVwiLFwiaWdlblwiLFwibsOlZ290XCIsXCJtZWxsYW5cIixcImxvdmVcIixcImtyb25vclwiLFwiYWx2YVwiLFwic2rDpGx2XCIsXCJhbGRyaWdcIixcImVyaWtcIixcInNpdHRcIixcImRvbVwiLFwiYmV0YWxhXCIsXCJza29sYW5cIixcInRyZVwiLFwidmlsbGVcIixcImdpY2tcIixcImLDtnJqYWRlXCIsXCJkaXR0ZVwiLFwic2FkZVwiLFwidHVzZW5cIixcIm7DpWdvblwiLFwic8OkZ2FcIixcInV0YW5cIixcImV4ZW1wZWxcIixcImxlZGFyZVwiLFwibsOkc3RhblwiLFwic8OlZ1wiLFwiZGlnXCIsXCJoZW5uZXNcIixcImhlbGFcIixcImFyYmV0YXJcIixcIm1pblwiLFwibGlrYVwiLFwicmVkYW5cIixcImlubmFuXCIsXCJkZWxcIixcIm55XCIsXCJmw7Zyc3RhXCIsXCJuaVwiLFwibWlycmFuXCIsXCJzw6R0dFwiLFwicHJhdGFcIixcImluZ2VuXCIsXCJzdG9kXCIsXCJ1c2FcIixcIsOkbmTDpVwiLFwic3RhZmZhblwiLFwiZ2Vub21cIixcIsOldFwiLFwiZXVcIixcInN0b3JcIixcInN2w6VydFwiLFwiw6RubnVcIixcIm9zc1wiLFwiZGluXCIsXCJub2dcIixcImdlXCIsXCJiw7ZyamFyXCIsXCJyZWdsZXJcIixcInN0b2NraG9sbVwiLFwiamFcIixcImLDpHR0cmVcIixcImluXCIsXCJ2ZXRhXCIsXCJhcmJldGFcIixcImxpc2FcIixcImpvYmJcIixcImZyYW1cIixcImFsbHRcIixcInTDpG5rZXJcIixcImhqw6RscGFcIixcInZhcmplXCIsXCJhbGx0aWRcIixcInN2ZXJpZ2VzXCIsXCJzYWtlclwiLFwicG9saXNlblwiLFwidXJcIixcImtvbW1hXCIsXCJsw6RuZ3JlXCIsXCJqb25hdGhhblwiLFwiaXJha1wiLFwibWVqXCIsXCJoZWx0XCIsXCJ0YVwiLFwiZ2FtbGFcIixcInBlcmN5XCIsXCJkw6RyZsO2clwiLFwidGlsbHNhbW1hbnNcIixcInNhbW1hXCIsXCJob3NcIixcInRpbGxiYWthXCIsXCJmeXJhXCIsXCJ0b2dcIixcInZhcmFuZHJhXCIsXCJ1cHBcIixcImzDpHNhXCIsXCJib3JcIixcImRvZ1wiLFwidMOkbmt0ZVwiLFwibWF0Y2hlblwiLFwiZ8OkbGxlclwiLFwidmlzYXJcIixcImxpZ2dlclwiLFwiZGVyYXNcIixcInNpdHRlclwiLFwia3ZhclwiLFwiw6VyZXRcIixcIm5lalwiLFwiOlwiLFwiYXJiZXRlXCIsXCJiw6RzdGFcIixcImzDpWdcIixcImLDpWRlXCIsXCJtb3Jtb3JcIixcImZsZXN0YVwiLFwiYW52w6RuZGFcIixcInZpa3RpZ3RcIixcInByb2JsZW1cIixcIm1hbHRlXCIsXCJmb3J0ZmFyYW5kZVwiLFwiZnLDpWdhclwiLFwiZmFubnNcIixcInNhbGx5XCIsXCJiw7ZyamFcIixcImbDtnJldGFnXCIsXCJkYWdcIixcInNlbmFzdGVcIixcInNvbGRhdGVyXCIsXCJtYXRcIixcImfDpW5nZXJcIixcIsOj4oCeclwiLFwiaGFmdFwiLFwibGFuZFwiLFwic2x1dGFcIixcInV0YW5mw7ZyXCIsXCJzYWd0XCIsXCLDpWthXCIsXCJza3JpdmVyXCIsXCJhbm5hdFwiLFwidGFyXCIsXCJsaXRlblwiLFwia8O2cGFcIixcImh1c2V0XCIsXCJmw7ZycmFcIixcInRpZFwiLFwibsOkc3RhXCIsXCJsYWdcIixcImvDpG5uc1wiLFwia3Zpbm5vclwiLFwiYWxsZGVsZXNcIixcInZhdHRlblwiLFwibMOkbmdlXCIsXCJow6RuZGVcIixcImthbGxhc1wiLFwicHJlY2lzXCIsXCJtYWphXCIsXCJuZXJcIixcInRpb1wiLFwidmlzc3RlXCIsXCJmw7Zyc3RcIixcImhhbmRsYXJcIixcImFubmFcIixcIm9mdGFcIixcInNwZWxhXCIsXCJqb2FraW1cIixcInJlZ2VyaW5nXCIsXCJoZXRlclwiLFwicmlrc2RhZ2VuXCIsXCJwbGF0c1wiLFwiZMO2ZGFkZXNcIixcInZhbGV0XCIsXCJmw7Zyc2xhZ1wiLFwiZGVqXCIsXCJ1bmRlcnPDtmthXCIsXCJ2YXR0bmV0XCIsXCJicnVrYXJcIixcInVuZHJhclwiLFwicmlrdGlndFwiLFwiaMOkc3RcIixcImVuZGFcIixcInNuYXJ0XCIsXCJpc3JhZWxcIixcIm1pbGpvbmVyXCIsXCJzZWpcIixcInNpc3RhXCIsXCJiZXN0w6RtbWFcIixcImJldHlkZXJcIixcInZlbVwiLFwiaHV2dWRldFwiLFwiaGVsbGVyXCIsXCJzZW5cIixcInTDpG5rYVwiLFwicG9saXRpa2VyXCIsXCJib3JkZVwiLFwidHlja3RlXCIsXCJnZXJcIixcImZvcnRzw6R0dGVyXCIsXCJtZXN0XCIsXCJ0dXJiaW5cIixcImbDtnLDpGxkcmFyXCIsXCJ2ZXJrYXJcIixcImRhZ2FyXCIsXCJmw7Zyc8O2a2VyXCIsXCJiaWxcIixcImluZ2VudGluZ1wiLFwiYmFrb21cIixcInNhdHRcIixcIm1vcmZhclwiLFwidGlkaWdhcmVcIixcInRpdHRhclwiLFwiZ2xhZFwiLFwiZmFsbFwiLFwibWFubmVuXCIsXCJow6RudFwiLFwiYmVzdMOkbW1lclwiLFwic3R1bmRcIixcImFsbHNcIixcImfDtnRlYm9yZ1wiLFwia2Fqc2FcIixcImhhbmRcIixcImxhZ2VuXCIsXCJ2w6RybGRlblwiLFwiZMO2cnJlblwiLFwic2p1a1wiLFwiYmVzdMOkbXRcIixcImh1bmRyYVwiLFwiYnJvdHRcIixcInNuYWJidFwiLFwiaHVzXCIsXCJ0aWRuaW5nZW5cIixcImhlbGdlblwiLFwibcOkcmtsaW5cIixcInNqdWthXCIsXCJzw6RrZXJ0XCIsXCJsw6RuZGVybmFcIixcInbDpXJkXCIsXCJiZXLDpHR0YVwiLFwicmlkYVwiLFwiaGVtXCIsXCJmw7Zyc3TDpXJcIixcImFubmFuXCIsXCJ0cm9kZGVcIixcImx1ZGRlXCIsXCJsaXZcIixcImJvcnRcIixcImhlbW1hXCIsXCJlbnNcIixcIml2w6RnXCIsXCJtw6VsXCIsXCJteXJhblwiLFwidW5nYVwiLFwibWFya2VuXCIsXCJyb3BhclwiLFwiaWRhZ1wiLFwic3RhdGVuXCIsXCJydW50XCIsXCJzdmFyYXJcIixcInN0b3BwYVwiLFwic3ZlbnNrYXJcIixcInZhcmbDtnJcIixcInbDpGxkaWd0XCIsXCJow6VsbGVyXCIsXCJmw7Zyc3TDpXNcIixcInbDpGdcIixcImZuXCIsXCJmw6RuZ2Vsc2VcIixcImZvcnRzw6R0dGFcIixcImZpbm5hc1wiLFwidmVja29yXCIsXCJzbcOlXCIsXCJtw6RuXCIsXCLDpHRhXCIsXCJwcmVzaWRlbnRcIixcImVuc2FtXCIsXCJibGFuZFwiLFwic3RvcnRcIixcInLDpGRkXCIsXCJkaXR0XCIsXCJoasOkbHBlclwiLFwibWV0ZXJcIixcImZhcmZhclwiLFwiZmVtXCIsXCJwZW5nYXJuYVwiLFwia29tbWl0XCIsXCJsaWJhbm9uXCIsXCJza3JpdmFcIixcImZyYW1mw7ZyXCIsXCJsw6VuZ1wiLFwiZm9sa1wiLFwiaMO2clwiLFwianVzdFwiLFwia3lya2FuXCIsXCJtZWRhblwiLFwibGFnZXRcIixcImbDtmxqYVwiLFwiZmFzdFwiLFwiYnJlZHZpZFwiLFwidmVya2xpZ2VuXCIsXCJyaW5nYVwiLFwicmVnbGVybmFcIixcImZyw6VnYWRlXCIsXCJpbmdhXCIsXCJ1bmRlcnPDtmtuaW5nXCIsXCJodWdvXCIsXCJueXR0XCIsXCJtaW5kcmVcIixcImJhcm5lblwiLFwicGzDtnRzbGlndFwiLFwidW5nZG9tYXJcIixcImhpdHRhXCIsXCJiZXLDpHR0YXJcIixcInZlY2thblwiLFwiYWxsdHPDpVwiLFwic3RhZGVuXCIsXCJhbnRvblwiLFwibWluc3RcIixcImJpbGVuXCIsXCJyeXNzbGFuZFwiLFwiw7Znb25cIixcIsOkdmVuXCIsXCJoYW5kZW5cIixcIm1pdHRcIixcImZpbGlwcGFcIixcInN0w7ZkXCIsXCJyw6R0dFwiLFwiZm90Ym9sbFwiLFwidmlsa2FcIixcInBlcnNvblwiLFwic2thdHRcIixcImZvcnRcIixcImTDtnR0XCIsXCJzZXR0XCIsXCJiYXJuZXRcIixcInRhZ1wiLFwiZWxldmVyXCIsXCJjaGFuc1wiLFwiaGFtYXNcIixcImlyYW5cIixcInByYXRhclwiLFwiZ8OlbmdlblwiLFwibMOkdHRcIixcIm9tcsOlZGV0XCIsXCJmw7Zyc8O2a3RlXCIsXCJtYXRjaFwiLFwiYsOlZGFcIixcInbDpGdlblwiLFwiam9oYW5cIixcInVuZHJhZGVcIixcImJyw6VrXCIsXCJ2bVwiLFwiYsO2cmphdFwiLFwic8O2a2FcIixcImtvbW11bmVuXCIsXCJsw6V0ZXJcIixcInZpc2FcIixcImtsYXJ0XCIsXCJ1bmdlZsOkclwiLFwiYmV0YWxhclwiLFwicGFyXCIsXCJmw7ZydXRcIixcInNqw6RsdmFcIixcIsOkdGVyXCIsXCJ0aWRlblwiLFwiaMOkbmRlclwiLFwiZmFrdGlza3RcIixcImJvXCIsXCJuaWNrXCIsXCJuw6Vnb250aW5nXCIsXCJ0dXJcIixcImZlbFwiLFwicHJvY2VudFwiLFwiaW5mb3JtYXRpb25cIixcInR5c3RcIixcImdydXBwXCIsXCJtaW5hXCIsXCJyb3BhZGVcIixcInRpbGxzXCIsXCJtYXJpYVwiLFwiZ2Fuc2thXCIsXCJmw7ZyZVwiLFwiZW5hXCIsXCJow7ZyYVwiLFwia29tbXVuZXJcIixcInbDpXJcIixcInZhbmxpZ3RcIixcImjDtnJkZVwiLFwiZGl0XCIsXCJzbHV0YXJcIixcInNhbWFyYmV0YVwiLFwiZGFnZW5cIixcImtsb2NrYW5cIixcImhpdFwiLFwiYWxsYW5cIixcImbDtmxqZXJcIixcIsO2dmVyZW5zXCIsXCJqZW5ueVwiLFwiZWdlblwiLFwiYsOldGVuXCIsXCJjaGVmXCIsXCJza2F0dGVuXCIsXCJsw6VuZ3RcIixcInZhbmxpZ2FcIixcInN0YWxsZXRcIixcImvDpG5uZXJcIixcInZhbFwiLFwibmF0dGVuXCIsXCJrb3N0YXJcIixcImfDpXR0XCIsXCJzaXR0YVwiLFwidXRlXCIsXCJsdWZ0ZW5cIixcImVnZW50bGlnZW5cIixcIsO2Z29uZW5cIixcInLDtnN0XCIsXCJwb2xpdGlrZXJuYVwiLFwiYXJnXCIsXCJzdGVmYW5cIixcImFuamFcIixcImvDpG5kZVwiLFwiw6VyZW5cIixcImxldmFcIixcImdhbW1hbFwiLFwia3JvcHBlblwiLFwic3TDtnJzdGFcIixcImxhZ2FyXCIsXCJyw7ZzdGFcIixcInJ1bVwiLFwiZMOlbGlndFwiLFwiaGVsc3RcIixcInZpbm5hXCIsXCJ0aXR0YWRlXCIsXCJob3BwYXNcIixcIsOkbGRyZVwiLFwibGFyc1wiLFwiaW5uZVwiLFwic2lkYW5cIixcInNrb2xvclwiLFwibWFrdGVuXCIsXCJpYmxhbmRcIixcImJ5Z2dhXCIsXCJqb2JiYXJcIixcInZlY2thXCIsXCJhbnbDpG5kZXJcIixcInN0w6RsbGV0XCIsXCJiaWxhclwiLFwia25hcHB0XCIsXCJzYW1ow6RsbGV0XCIsXCJza29nZW5cIixcImZyZWRyaWtcIixcInNrYWRhZGVzXCIsXCJzdMOlXCIsXCJpbmdldFwiLFwibW9yZ29uXCIsXCJmdW5nZXJhclwiLFwicsOkdHRpZ2hldGVyXCIsXCJiZXLDpHR0YWRlXCIsXCJzw6RrZXJcIixcInZpc3NhXCIsXCJrcmlnZXRcIixcImxlZHNlblwiLFwiZsO2cnPDtmthXCIsXCJ2w6RsamFcIixcImzDpW5nYVwiLFwic3ZlbnNrXCIsXCJsw6R0XCIsXCJsw6RyYVwiLFwic2tvbGFcIixcInR5c2tsYW5kXCIsXCJhbnN2YXJcIixcImLDpHN0XCIsXCJzZW5hcmVcIixcInNsdXRcIixcIm1lbmFyXCIsXCJ2aWt0aWdhXCIsXCJsaWxsYVwiLFwiZsO2cmJpXCIsXCJmw7Zyc3TDpVwiLFwiYm9sbGVuXCIsXCJpbnRlcm5ldFwiLFwic2xvZ1wiLFwiZ8OlbmdcIixcInbDpHJsZGVuc1wiLFwidGl0dGFcIixcInNha1wiLFwia29tbXVuZXJuYVwiLFwic2V4XCIsXCLDpWt0ZVwiLFwidmlsa2VuXCIsXCJzcGVsYWRlXCIsXCJrw6RuZGVzXCIsXCJzdMO2cnJlXCIsXCJteW5kaWdoZXRlclwiLFwia3Zpbm5hXCIsXCJ0cm9cIixcImxvdmFyXCIsXCJrw7ZwZXJcIixcImzDpHR0YXJlXCIsXCJpc3JhZWxzXCIsXCJow6VyXCIsXCJzbHV0YWRlXCIsXCJtaXNzdMOkbmt0XCIsXCJow6VydFwiLFwic3Rhbm5hXCIsXCJ2YXBlblwiLFwiZm9ydHNhdHRlXCIsXCJkYW5uZVwiLFwic2tyYXR0YXJcIixcImFudsOkbmRhc1wiLFwicGFsZXN0aW5za2FcIixcImpvYmJldFwiLFwibcOlbmFkZXJcIixcIm1hZ2VuXCIsXCJ2w6RudGFcIixcImVmdGVyc29tXCIsXCJkYW5tYXJrXCIsXCLDpWtlclwiLFwiw6VyZXRzXCIsXCJuaWNrYWRlXCIsXCJnw7ZyYW5cIixcInJpbmdlclwiLFwicGxhdHNlclwiLFwia8O2cmFcIixcImJlcm9yXCIsXCJ0csOkZmZhXCIsXCJsZXJcIixcImVtb3RcIixcImbDtnJzw6RrcmluZ3NrYXNzYW5cIixcInRlc3NhXCIsXCJiZXN0w6RtZGVcIixcIm9yZFwiLFwiZGp1clwiLFwiaMO2bGxcIixcImZyw6Vnb3JcIixcIm1pbG9cIixcInJha3RcIixcImJlaMO2dnNcIixcImzDpGthcmVcIixcImTDtmRhXCIsXCJ2w6RzdHJhXCIsXCJleHRyYVwiLFwiYm9ydGFcIixcInPDpGxqYVwiLFwic3BlbGFyXCIsXCJsw6RtbmFcIixcImxvZ1wiLFwidGlsbHLDpGNrbGlndFwiLFwicG9saXNlclwiLFwia3VubmF0XCIsXCJmw7Zuc3RyZXRcIixcImV1cm9wYVwiLFwiam9cIixcInRyYXBwYW5cIixcIm9ta3JpbmdcIixcImbDtnJsb3JhZGVcIixcImdvbHZldFwiLFwidsOkbnRhclwiLFwidXRiaWxkbmluZ1wiLFwiYW1hbmRhXCIsXCJkaXJla3RcIixcImVsaW5cIixcInRpbW1hclwiLFwiam9iYmFcIixcImjDtmd0XCIsXCJrbGFyYVwiLFwib25zZGFnZW5cIixcIm11bm5lblwiLFwibHlja2FkZXNcIixcInBhcnRpZXRcIixcInBpYVwiLFwiYW5kZXJzXCIsXCJtw7ZqbGlndFwiLFwia3VsXCIsXCJrb21tdW5cIixcImhlalwiLFwiYmrDtnJuXCIsXCLDpG5kcmFcIixcInZpc2thZGVcIixcInJlZ2VyaW5nZW5zXCIsXCJtw6Rubmlza2FcIixcIm5vcmRrb3JlYVwiLFwidGFnaXRcIixcImRpbmFcIixcIm1pbnV0ZXJcIixcImhqw6RscG1lZGVsXCIsXCJ0w6R2bGluZ2VuXCIsXCJhcmJldGV0XCIsXCJzw6VkYW50XCIsXCJlZ2V0XCIsXCJhbnNpa3RldFwiLFwidsOlcmFcIixcImfDpHJuYVwiLFwicHJhdGFkZVwiLFwiZHJvZ1wiLFwidXNhc1wiLFwic3RlZ1wiLFwibWFudWVsXCIsXCJ2w6VnYXJcIixcIm1pc3N0w6Rua3RhXCIsXCJmYXR0YXJcIixcImtvbXBpc1wiLFwiZmlubGFuZFwiLFwiZmFtaWxqXCIsXCJkZWxhclwiLFwiYml0XCIsXCJhbWVyaWthbnNrYVwiLFwiw6PigJ5uZMOlXCIsXCJtYXRjaGVyXCIsXCJib21iZXJcIixcImhpdHRhdFwiLFwiYmzDpVwiLFwidGFsYVwiLFwic2tyaXZpdFwiLFwicHJpc2V0XCIsXCJlbGV2ZXJuYVwiLFwiZXhwZXJ0ZXJcIixcImjDpG5kZXJuYVwiLFwiZmFybGlnYVwiLFwic3ZhcnRhXCIsXCJuw7ZqZFwiLFwidHJlZGplXCIsXCJsYW5kZXRzXCIsXCJwYXBwZXJcIixcInZ1bm5pdFwiLFwicsO2c3RlclwiLFwiaXN0w6RsbGV0XCIsXCJrw7ZrZXRcIixcImtvbXBpc2FyXCIsXCJzdmFyYWRlXCIsXCJsw7ZuXCIsXCJrcmlnXCIsXCJ2w6RycmVcIixcInRvcnNkYWdlblwiLFwicGxhblwiLFwidGrDpG5hclwiLFwibcOkbnNrbGlnYVwiLFwiZsO2cnN0b2RcIixcImbDtnJldGFnZXRcIixcImjDpWxsXCIsXCJoaXR0YXJcIixcImZyYW5rcmlrZVwiLFwicmVpbmZlbGR0XCIsXCJwYXJ0aWVybmFcIixcInBlcnNzb25cIixcInNrcmVrXCIsXCJzw6RtcmVcIixcImLDtnJqYW5cIixcImhpbm5lclwiLFwiZnJhbXRpZGVuXCIsXCJzdHJhbmRlblwiLFwidmFyb3JcIixcImvDtnJkZVwiLFwiZnVsbFwiLFwiZsO2cnPDtmt0XCIsXCJldS1sw6RuZGVybmFcIixcInBhcnRpXCIsXCJibGlja1wiLFwidMOkbmtcIixcInTDpWdcIixcImRhZ2FybmFcIixcIm1hcnRpblwiLFwib3JvbGlnYVwiLFwicsOkY2tlclwiLFwiaMO2Z1wiLFwiam9yZGVuXCIsXCJyeWdnZW5cIixcImzDtm5lclwiLFwiZsO2cmJqdWRldFwiLFwiw6V0dGFcIixcInRpc2RhZ2VuXCIsXCJiZWjDtnZhXCIsXCJpbm9tXCIsXCJrdsOkbGxlblwiLFwic2vDtnRcIixcIm1pbGrDtm5cIixcImbDtnJlc2zDpXJcIixcInPDpHJza2lsdFwiLFwibsOkcmFcIixcInNwcmFuZ1wiLFwiYmVyw6R0dGF0XCIsXCJow6RzdGFyXCIsXCJmw7Zyc2xhZ2V0XCIsXCJtw6VuZGFnZW5cIixcImlsbGFcIixcInZpc2FkZVwiLFwiZ2VuYXN0XCIsXCJtw7Z0ZVwiLFwibGFyc3NvblwiLFwiaW52YW5kcmFyZVwiLFwiw6PigJ52ZW5cIixcImJlblwiLFwibGl2ZXRcIixcInVtZcOlXCIsXCJ2dXhuYVwiLFwic3RyYWZmYXNcIixcInZlcmthZGVcIixcImdhemFcIixcImdydXBwZXJcIixcInRyb3RzXCIsXCJnYXZcIixcInNraWNrYVwiLFwiZnLDtmtlblwiLFwibMOlbmFcIixcImbDpHJyZVwiLFwicGFraXN0YW5cIixcInPDpG5nZW5cIixcImRldHRhXCIsXCJkw6VsaWdcIixcImvDtnJcIixcInPDtmtlclwiLFwibWluc2thXCIsXCJmaW5hbGVuXCIsXCJza3JhdHRhZGVcIixcImJvcmRldFwiLFwiYWxrb2hvbFwiLFwibcOlclwiLFwibcOlbmRhZ3NcIixcImLDtmNrZXJcIixcIm5hbW5cIixcInpsYXRhblwiLFwiZMO2ZGFkZVwiLFwiZ8OkbGxhXCIsXCJ0dnVuZ2VuXCIsXCJsZWRlclwiLFwic8O2ZHJhXCIsXCJow6RzdGFybmFcIixcImZhcm1vclwiLFwiZsO2csOkbGRyYXJuYVwiLFwidml0YVwiLFwic29jaWFsZGVtb2tyYXRlcm5hXCIsXCJ0ZXNzXCIsXCJzdHJhZmZcIixcInNwYW5pZW5cIixcImjDpXJldFwiLFwia2zDpGRlclwiLFwic2F0dGVcIixcImx5c3NuYVwiLFwic2p1a2h1c1wiLFwidGVycm9yaXN0ZXJcIixcImhvcHBhZGVcIixcInN2YXJhXCIsXCJqYWtlXCIsXCJzw6RsamVyXCIsXCJyw6VkXCIsXCJoYXZldFwiLFwiaGl0dGFkZVwiLFwibWlsamFyZGVyXCIsXCJzdsOlcmFcIixcInZpc2thclwiLFwiZsO2cnLDpG5cIixcIsOkbnRsaWdlblwiLFwiZMO2bWRlc1wiLFwibmlja2FyXCIsXCJkYWdlbnNcIixcImtsYXJcIixcInNwcsOkbmdkZXNcIixcImtpbmFcIixcImZseXR0YVwiLFwibWVkaWNpblwiLFwiamFudWFyaVwiLFwicGVyc29uYWxcIixcInN2YXJ0XCIsXCJ2aWt0aWdcIixcIm1hcnRpbmFcIixcInZpbm5lclwiLFwia2xhc3NlXCIsXCJncnVwcGVuXCIsXCJ2aWt0aWdhc3RlXCIsXCJ2w6RsamVyXCIsXCJyaW5nZGVcIixcImjDpWxsYVwiLFwicmlkZXJcIixcInJvbGlndFwiLFwibcOkbm5lblwiLFwiYWxsdGluZ1wiLFwibcOlbmFkXCIsXCJzdmVuc2thcm5hXCIsXCJrdsOkbGxcIixcIml0YWxpZW5cIixcInBsYW5ldFwiLFwiZnLDpWdhXCIsXCJicmV2XCIsXCJqb2VsXCIsXCJow7ZnYVwiLFwiZHJhclwiLFwiZWduYVwiLFwiYXJiZXRzbMO2c2FcIixcImhvcHBzYW5cIixcInR1cmtpZXRcIixcInNrw7Z0ZXJcIixcInNsaXBwYVwiLFwiZsOlZ2xhclwiLFwia29uc3RpZ3RcIixcIm9zXCIsXCJhbGxcIixcInRqdWdvXCIsXCJkb21zdG9sXCIsXCJsw6V0YVwiLFwiZMO2clwiLFwiYWxscmFcIixcInbDpXJ0XCIsXCJnaWxsYXJcIixcIm9yZG5hXCIsXCJmbHlrdGluZ2FyXCIsXCJzanVrZG9tZW5cIixcInLDpHR0ZWfDpW5nXCIsXCJzw7ZuZGFnc1wiLFwicGxhbmVuXCIsXCJyZXNhXCIsXCJ0aXNkYWdzXCIsXCJza3lkZGFcIixcImZhdHRpZ2FcIixcInJlZGFcIixcInVuZGVyc8O2a25pbmdlblwiLFwibGp1ZFwiLFwibnloZXRlclwiLFwicHJpc1wiLFwic2FkZGFtXCIsXCJow7ZncmVcIixcIm3DtnRlclwiLFwibWF0ZW5cIixcImRvbXN0b2xlblwiLFwiZGVzc3V0b21cIixcInNwcmluZ2VyXCIsXCJzdGVuXCIsXCJwcmVtacOkcm1pbmlzdGVyXCIsXCJiaWRyYWdcIixcInNhbXRpZGlndFwiLFwicsO2ZGFcIixcIm5vcmdlXCIsXCJiZXJyYVwiLFwibG92YXRcIixcImZvbGtldFwiLFwic8OkdHRlclwiLFwic292YVwiLFwia8OkclwiLFwicmFkb25cIixcIm9rZWpcIixcInbDpG5uZXJcIixcImFubmFyc1wiLFwibWFzc29yXCIsXCJ2w6VsZFwiLFwibGFuZHNsYWdldFwiLFwib2x5Y2thblwiLFwic3luXCIsXCJyaXNrXCIsXCJza2FkYWRcIixcImvDpHJudmFwZW5cIixcImtsYXJhclwiLFwibcO2dGV0XCIsXCJzcGVsYXJlXCIsXCJ2aWRhcmVcIixcImZseWdwbGFuXCIsXCJib21iXCIsXCJtaXJqYW1cIixcImd1bGRcIixcInN0b3Jicml0YW5uaWVuXCIsXCJsaW5rw7ZwaW5nXCIsXCJsYW5kc3RpbmdcIixcInBvbGlzZXJuYVwiLFwibGl0ZXRcIixcIm11c2lrXCIsXCJjaGVmZXJcIixcInNsdXRldFwiLFwiaMOkbmRhXCIsXCJ0cm9saWdlblwiLFwiaMOkbGZ0ZW5cIixcInNqdVwiLFwiYnJ1a2FkZVwiLFwibMOkZ2dlclwiLFwidMOkbmt0XCIsXCJicm9uXCIsXCJhcmJldGF0XCIsXCJzbsOkbGxcIixcInVwcGVcIl0gfVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmZ1bmN0aW9uIHJhbmRvbUFycmF5VmFsdWUoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCAtIDEsXG4gICAgICBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChsZW5ndGggKyAxKSk7XG5cbiAgcmV0dXJuIGFycmF5W2luZGV4XTtcbn1cblxuZXhwb3J0cy5yYW5kb21BcnJheVZhbHVlID0gcmFuZG9tQXJyYXlWYWx1ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5LmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5hZGRDc3MgPSBhZGRDc3M7XG5leHBvcnRzLmFkZFNjcmlwdCA9IGFkZFNjcmlwdDtcbmV4cG9ydHMuYWRkU3R5bGUgPSBhZGRTdHlsZTtcbmV4cG9ydHMuYXBwZW5kSFRNTCA9IGFwcGVuZEhUTUw7XG5leHBvcnRzLmdldFRleHROb2RlcyA9IGdldFRleHROb2RlcztcbmV4cG9ydHMucmVtb3ZlRWxlbWVudCA9IHJlbW92ZUVsZW1lbnQ7XG5leHBvcnRzLnNldFN0eWxlID0gc2V0U3R5bGU7XG5mdW5jdGlvbiBhZGRDc3MoaHJlZiwgY2FsbGJhY2spIHtcbiAgdmFyIGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gIGwuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gIGwuc2V0QXR0cmlidXRlKCdyZWwnLCAnc3R5bGVzaGVldCcpO1xuICBsLm9ubG9hZCA9IGNhbGxiYWNrO1xuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGwpO1xuICByZXR1cm4gbDtcbn1cblxuZnVuY3Rpb24gYWRkU2NyaXB0KHNyYywgY2FsbGJhY2spIHtcbiAgdmFyIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgcy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyk7XG4gIHMub25sb2FkID0gY2FsbGJhY2s7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQocyk7XG4gIHJldHVybiBzO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZShzdHIpIHtcbiAgdmFyIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBzLmlubmVyVGV4dCA9IHN0cjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzKTtcbiAgcmV0dXJuIHM7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEhUTUwoZWwsIGh0bWwpIHtcbiAgdmFyIHRtcEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRtcEVsLmlubmVySFRNTCA9IGh0bWw7XG5cbiAgd2hpbGUgKHRtcEVsLmZpcnN0Q2hpbGQpIHtcbiAgICBlbC5hcHBlbmRDaGlsZCh0bXBFbC5maXJzdENoaWxkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUZXh0Tm9kZXMobm9kZSkge1xuICB2YXIgYWxsID0gW107XG4gIGZvciAobm9kZSA9IG5vZGUuZmlyc3RDaGlsZDsgbm9kZTsgbm9kZSA9IG5vZGUubmV4dFNpYmxpbmcpIHtcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PSAzKSBhbGwucHVzaChub2RlKTtlbHNlIGFsbCA9IGFsbC5jb25jYXQoZ2V0VGV4dE5vZGVzKG5vZGUpKTtcbiAgfVxuICByZXR1cm4gYWxsO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFbGVtZW50KGVsKSB7XG4gIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xufVxuXG5mdW5jdGlvbiBzZXRTdHlsZShlbGVtZW50LCBzdHlsZSkge1xuICBmb3IgKHZhciBzIGluIHN0eWxlKSB7XG4gICAgZWxlbWVudC5zdHlsZVtzXSA9IHN0eWxlW3NdO1xuICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kb20uanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucmFuZG9tID0gcmFuZG9tO1xuZXhwb3J0cy5wb2ludEluUmVjdCA9IHBvaW50SW5SZWN0O1xuZXhwb3J0cy5pblJhbmdlID0gaW5SYW5nZTtcbmZ1bmN0aW9uIHJhbmRvbShtaW4sIG1heCkge1xuICByZXR1cm4gTWF0aC5mbG9vcihtaW4gKyBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKTtcbn1cblxuZnVuY3Rpb24gcG9pbnRJblJlY3QoeCwgeSwgcmVjdCkge1xuICByZXR1cm4gaW5SYW5nZSh4LCByZWN0LngsIHJlY3QueCArIHJlY3Qud2lkdGgpICYmIGluUmFuZ2UoeSwgcmVjdC55LCByZWN0LnkgKyByZWN0LmhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIGluUmFuZ2UodmFsdWUsIG1pbiwgbWF4KSB7XG4gIHJldHVybiB2YWx1ZSA+PSBNYXRoLm1pbihtaW4sIG1heCkgJiYgdmFsdWUgPD0gTWF0aC5tYXgobWluLCBtYXgpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWF0aC5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5pc0xldHRlciA9IGlzTGV0dGVyO1xuZXhwb3J0cy5pc1VwcGVyQ2FzZSA9IGlzVXBwZXJDYXNlO1xuZnVuY3Rpb24gaXNMZXR0ZXIoYykge1xuICByZXR1cm4gYy50b0xvd2VyQ2FzZSgpICE9PSBjLnRvVXBwZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIGlzVXBwZXJDYXNlKGMpIHtcbiAgcmV0dXJuIGMgPT09IGMudG9VcHBlckNhc2UoKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0cmluZy5qcy5tYXBcbiJdfQ==
