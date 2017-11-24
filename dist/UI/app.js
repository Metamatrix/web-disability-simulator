(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _index = require('../simulations/dyslexia/index.js');

var dyslexia = _interopRequireWildcard(_index);

var _index2 = require('../simulations/farsightedness/index.js');

var farsightedness = _interopRequireWildcard(_index2);

var _index3 = require('../simulations/tunnelVision/index.js');

var tunnelVision = _interopRequireWildcard(_index3);

var _index4 = require('../simulations/colorBlindness/redGreenColorBlindness/index.js');

var redGreenColorBlindness = _interopRequireWildcard(_index4);

var _index5 = require('../simulations/colorBlindness/yellowBlueColorBlindness/index.js');

var yellowBlueColorBlindness = _interopRequireWildcard(_index5);

var _index6 = require('../simulations/colorBlindness/totalColorBlindness/index.js');

var totalColorBlindness = _interopRequireWildcard(_index6);

var _index7 = require('../simulations/concentration/index.js');

var concentration = _interopRequireWildcard(_index7);

var _index8 = require('../simulations/parkinsons/index.js');

var parkinsons = _interopRequireWildcard(_index8);

var _data = require('./data/data.json');

var data = _interopRequireWildcard(_data);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

// import {reset} from '../simulations/general/reset/index.js'
$(document).ready(function () {

  var tooltip = $(".tool-tip");
  var infoHeading = $(".disability-info-heading");
  var infoParagraph = $(".disability-info-paragraph");
  var adviceList = $(".advice-list");
  var moreInfoLink = $(".more-info-link");
  var moreInfoPanel = $("#more-info-panel");
  var resetBtn = $("#reset-btn");
  var navbarHeader = $(".navbar-header");
  var resetBtnText = data.UI[0].resetBtnText;
  var navbarHeaderText = data.UI[0].navbarHeaderText;
  var simulationHeadingText = data.UI[0].simulations[0].heading;
  var adviceDropdown = $("#advice-dropdown");
  var adviceDropdownText = data.UI[0].adviceDropdownText;
  var infoDropdown = $("#info-dropdown");
  var infoDropdownText = data.UI[0].infoDropdownText;

  var activeSimulation = void 0;

  //Append UI texts

  navbarHeader.text(navbarHeaderText);
  resetBtn.text(resetBtnText);
  infoDropdown.text(infoDropdownText);
  adviceDropdown.text(adviceDropdownText);

  $.each(data.UI[0].simulations, function (i, value) {

    $('#' + value.heading).text(value.heading);

    $.each(value.choices, function (i, value) {
      for (var key in value) {
        $('#' + key).text(value[key]);
      }
    });
  });

  // Set active state
  chrome.storage.local.get('activeSimulation', function (obj) {

    var activeSimulation = obj.activeSimulation;

    function findProperty(simulations) {
      return simulations.name === activeSimulation;
    }

    console.log('activeSimulation', activeSimulation);

    if (activeSimulation != null) {

      tooltip.addClass("in");

      infoHeading.append($('#' + activeSimulation).text());

      $('#' + activeSimulation).closest(".dropdown").find(".selected").text($('#' + activeSimulation).text());

      var id = $('#' + activeSimulation).attr("id");

      var fact = data.facts.find(findProperty).fact;
      var listItems = data.facts.find(findProperty).listItems;
      var moreInfo = data.facts.find(findProperty).moreInfoLinkText;
      var moreInfoUrl = data.facts.find(findProperty).moreInfoUrl;

      infoParagraph.append(fact);

      $.each(listItems, function (i, value) {
        adviceList.append('<li>' + value + '</li>');
      });

      if (moreInfo) {
        moreInfoPanel.show();
        moreInfoLink.append(moreInfo);
      }

      moreInfoLink.attr("href", '' + moreInfoUrl);
    }
  });

  //menu button click

  $(".menu-btn").click(function () {

    var menuBtn = $(this);
    var menuBtnId = menuBtn[0].id;
    var id = menuBtn.attr("id");
    var fact = data.facts.find(findProperty).fact;
    var listItems = data.facts.find(findProperty).listItems;
    var moreInfo = data.facts.find(findProperty).moreInfoLinkText;
    var moreInfoUrl = data.facts.find(findProperty).moreInfoUrl;

    function findProperty(simulations) {
      return simulations.name === id;
    }

    chrome.browserAction.setIcon({
      path: "img/icon_active.png"
    });

    activeSimulation = menuBtnId;
    chrome.storage.local.set({ 'activeSimulation': menuBtnId });
    chrome.storage.local.set({ 'linkUrl': moreInfoUrl });

    infoHeading.empty();
    infoParagraph.empty();
    adviceList.empty();
    moreInfoLink.empty();
    moreInfoPanel.hide();

    infoHeading.append(menuBtn.text());

    menuBtn.closest(".dropdown").find(".selected").text(menuBtn.text());

    infoParagraph.append(fact);

    $.each(listItems, function (i, value) {
      adviceList.append('<li>' + value + '</li>');
    });

    if (moreInfo) {
      moreInfoPanel.show();
      moreInfoLink.append(moreInfo);
    }

    moreInfoLink.attr("href", '' + moreInfoUrl);

    $('#panel1').removeClass("in");
    $('#panel2').removeClass("hide");

    setTimeout(function () {
      $('#panel2').addClass("in");
    }, 100);

    setTimeout(function () {
      startSimulation();
    }, 500);

    setTimeout(function () {
      $('#panel2').removeClass("in");
      tooltip.addClass("in");
    }, 1000);

    setTimeout(function () {
      $('#panel2').addClass("hide");
    }, 1500);
  });

  //when loading modal is closed, show chosen simulation

  function startSimulation() {

    // TODO: Clean up
    chrome.storage.local.get('activeSimulation', function (obj) {

      console.log('startSimulation', obj);

      if (obj.activeSimulation == "farsightedness") {
        farsightedness.start();
      }

      if (obj.activeSimulation == "tunnelVision") {
        tunnelVision.start();
      }

      if (obj.activeSimulation == "redGreenColorBlindness") {
        redGreenColorBlindness.start();
      }

      if (obj.activeSimulation == "yellowBlueColorBlindness") {
        yellowBlueColorBlindness.start();
      }

      if (obj.activeSimulation == "totalColorBlindness") {
        totalColorBlindness.start();
      }

      if (obj.activeSimulation == "concentration") {
        concentration.start();
      }

      if (obj.activeSimulation == "parkinsons") {
        parkinsons.start();
      }

      if (obj.activeSimulation == "dyslexia") {
        dyslexia.start();
      }
    });
  }

  //reset extension

  function resetSimulation() {

    chrome.browserAction.setIcon({
      path: "img/icon.png"
    });

    tooltip.removeClass("in");
    $("#panel1").addClass("in");

    // TODO: Change this    
    $("#Syn").text("Syn");
    $("#Motorik").text("Motorik");

    // TODO: Clean up
    chrome.storage.local.get('activeSimulation', function (obj) {

      if (obj.activeSimulation == "farsightedness") {
        farsightedness.stop();
      }

      if (obj.activeSimulation == "tunnelVision") {
        tunnelVision.stop();
      }

      if (obj.activeSimulation == "redGreenColorBlindness") {
        redGreenColorBlindness.stop();
      }

      if (obj.activeSimulation == "yellowBlueColorBlindness") {
        yellowBlueColorBlindness.stop();
      }

      if (obj.activeSimulation == "totalColorBlindness") {
        totalColorBlindness.stop();
      }

      if (obj.activeSimulation == "concentration") {
        concentration.stop();
      }

      if (obj.activeSimulation == "parkinsons") {
        parkinsons.stop();
      }

      if (obj.activeSimulation == "dyslexia") {
        dyslexia.stop();
      }
    });
  }

  //btn and links

  $("#reset-btn").click(function () {
    resetSimulation();
  });

  $(".github-link").click(function () {
    chrome.tabs.create({ url: 'https://github.com/Metamatrix/Web-Disability-Simulator' });
  });

  $(".more-info-link").click(function () {
    chrome.storage.local.get('linkUrl', function (obj) {
      chrome.tabs.create({ url: '' + obj.linkUrl });
    });
  });

  //panel collapse, show arrows: 

  $('.collapse').on('shown.bs.collapse', function () {
    $(this).parent().find(".down-arrow, .up-arrow").toggle();
  }).on('hidden.bs.collapse', function () {
    $(this).parent().find(".down-arrow, .up-arrow").toggle();
  });
});


},{"../simulations/colorBlindness/redGreenColorBlindness/index.js":3,"../simulations/colorBlindness/totalColorBlindness/index.js":4,"../simulations/colorBlindness/yellowBlueColorBlindness/index.js":5,"../simulations/concentration/index.js":6,"../simulations/dyslexia/index.js":7,"../simulations/farsightedness/index.js":8,"../simulations/parkinsons/index.js":9,"../simulations/tunnelVision/index.js":10,"./data/data.json":2}],2:[function(require,module,exports){
module.exports={
  "facts": [
    {
      "name": "dyslexia",
      "fact": "Dyslexi är en nedsättning som gör att hjärnan har svårt att automatisera tolkningen av ord. Detta gör att personer med denna nedsättning kan ha svårt att läsa och skriva. Dyslexi är inte kopplat till syn eller intelligens. Orsakerna till dyslexi är fortfarande oklart.",
      "listItems": [
        "Undvik text i liten storlek och långa texter. Se till att ha ordentligt med radavstånd.", 	
        "Undvik svåra ord och facktermer.",
        "Erbjud lättlästa versioner av facktexter.",
        "Undvik typsnitt med krångliga och komplexa figurer."
        ]
    },
    {
      "name": "parkinsons",
      "fact": "Vid Parkinsons sjukdom förstörs cellerna i hjärnan som tillverkar dopamin vilket gör att hjärnan får en nedsatt förmåga att skicka signaler. Personer med Parkinsons kan drabbas av symptom som skakningar, stela muskler och sämre rörelseförmåga. Orsakerna till Parkinsons sjukdom är fortfarande oklart.",
      "listItems": [
        "Se till att webbplatsen kan användas med andra hjälpmedel än mus, till exempel tangentbordsnavigering.", 	
        "Ha tillräckligt med luft mellan komponenter",
        "Ha tillräckligt stora klickytor.",
        "Undvik typsnitt med krångliga och komplexa figurer."
      ],
      "moreInfoUrl": "http://www.parkinsonforbundet.se",
      "moreInfoLinkText" : "Parkinsonsförbundet"
    },
    {
      "name": "yellowBlueColorBlindness",
      "fact": "Personer med defekt färgseende har svårt att skilja på vissa eller alla färger. Ett fullt fungerande öga har tre olika tappar som tar upp färgerna violett, grön och röd. När en eller flera av tapparna saknas eller är defekta leder det till defekt färgseende. Gul-blå färgblindhet (Tritanopi) är sällsynt. Namnet är missledande då det inte är färgerna gul och blå som förväxlas, utan blå med grön och gul med lila.",
      "listItems": [
        "Använd inte färg som det enda sättet att förmedla information, indikera en handling eller identifiera ett element. Markera till exempel inte ett felaktigt formulärfält endast med en röd ram utan komplettera även med text och gärna en ikon.", 	
        "Erbjud gärna ett högkontrast-läge."
      ],
      "moreInfoUrl": "https://sv.wikipedia.org/wiki/Defekt_f%C3%A4rgseende",
      "moreInfoLinkText" : "Wikipedia om defekt färgseende"
    },
    {
      "name": "redGreenColorBlindness",
      "fact": "Personer med defekt färgseende har svårt att skilja på vissa eller alla färger. Ett fullt fungerande öga har tre olika tappar som tar upp färgerna violett, grön och röd. När en eller flera av tapparna saknas eller är defekta leder det till defekt färgseende. Röd-grön färgblindhet (Protanopi och Deuteranopi) är den vanligaste typen av färgblindhet. Den är vanligare hos män än kvinnor. Personer röd-grön färgblindhet har svårt att skilja på färgerna röd, grön, brun och orange.",
      "listItems": ["Använd inte färg som enda sättet att förmedla information, indikera en handling eller identifiera ett element. Markera till exempel inte ett felaktigt formulärfält endast med röd ram, komplettera även med text och gärna en  ikon.", "Erbjud gärna ett högkontrast-läge."],
      "moreInfoUrl": "https://sv.wikipedia.org/wiki/Defekt_f%C3%A4rgseende",
      "moreInfoLinkText" : "Wikipedia om defekt färgseende"
    },
    {
      "name": "farsightedness",
      "fact": "Personer med Hyperopi ser suddigt på nära håll, men bra på långt håll. Nedsättningen uppstår på grund av att ljuset inte bryts rätt i ögat. Det är en av de vanligaste synnedsättningarna.",
      "listItems": [
        "Undvik text i liten storlek.", 	
        "Webbsidan ska gå att förstora (zoomas) till minst 200 % så att besökaren kan anpassa innehållets storlek efter sina behov.",
        "Erbjud uppläsning av innehållet."
      ],
      "moreInfoUrl": "https://webbriktlinjer.se/r/39-ge-webbplatsen-en-god-lasbarhet/",
      "moreInfoLinkText" : "Webbriktlinje Ge webbplatsen god läsbarhet"
    },
    {
      "name": "totalColorBlindness",
      "fact": "Defekt färgseende innebär att en person har svårt att skilja på vissa eller alla färger. Ett fullt fungerande öga har tre olika typer av tappar som tar upp olika färger: violett, grön och röd. Orsaken till defekt färgseende är att en eller flera av dessa typer av tappar saknas eller är defekta. Helt färgblind (Monokromasi/akromatopsi) är mycket sällsynt. Personer med denna synnedsättning ser inga färger utan ser endast i gråskala.",
      "listItems": [
        "Använd inte färg som det enda sättet att förmedla information, indikera en handling eller identifiera element. Markera t.ex. inte ett felaktigt formulärfält endast med röd ram, komplettera även med text eller ikon.", 	
        "Det kan vara en bra idé att erbjuda ett högkontrast-läge."
      ]
    },
    {
      "name": "tunnelVision",
      "fact": "Tunnelseende innebär...",
      "listItems": [
        "Listitem 1", 	
        "Listitem 2."
      ]
    },
    {
      "name": "concentration",
      "fact": "Koncentrationssvårigheter innebär...",
      "listItems": [
        "Listitem 1", 	
        "Listitem 2."
      ]
    }
  ],
  "UI": [{
    "navbarHeaderText": "Välj funktionsnedsättning:",
    "resetBtnText": "Återställ",
    "adviceDropdownText": "Tänk på detta",
    "infoDropdownText": "Mer information",
    "simulations": [
      {
        "heading": "Syn",
        "choices": [
          { "totalColorBlindness": "Helt färgblind" },
          { "yellowBlueColorBlindness": "Gul-blå färgblindhet" },
          { "redGreenColorBlindness": "Röd-grön färgblindhet" },
          { "farsightedness": "Långsynthet, översynthet" },
          { "tunnelVision": "Tunnelseende" }
        ]
      },
      {
        "heading": "Motorik",
        "choices": [ 
          { "parkinsons": "Parkinsons" }
  
          ]
      },
      {
        "heading": "Dyslexi",
        "choices": []
      },
      {
        "heading": "Koncentration",
        "choices": []
      },
      {
        "heading": "Minne",
        "choices": []
      }

    ]
  }]
}
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = 'redGreenColorBlindness';

function load(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.executeScript(activeTab.id, { file: 'simulations/colorBlindness/content.js' }, function () {
      if (callback) {
        callback(name);
      }
    });
  });
}

function start() {
  console.log(name, 'start');
  load(function () {
    console.log(name, 'load');
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id, { action: 'startSimulation', simulation: name, simulationType: 'colorBlindness' });
    });
  });
}

function stop() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { action: 'stopSimulation', simulation: name, simulationType: 'colorBlindness' });
  });
}

exports.start = start;
exports.stop = stop;


},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = 'totalColorBlindness';

function load(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.executeScript(activeTab.id, { file: 'simulations/colorBlindness/content.js' }, function () {
      if (callback) {
        callback(name);
      }
    });
  });
}

function start() {
  load(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id, { action: 'startSimulation', simulation: name, simulationType: 'colorBlindness' });
    });
  });
}

function stop() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { action: 'stopSimulation', simulation: name, simulationType: 'colorBlindness' });
  });
}

exports.start = start;
exports.stop = stop;


},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = 'yellowBlueColorBlindness';

function load(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.executeScript(activeTab.id, { file: 'simulations/colorBlindness/content.js' }, function () {
      if (callback) {
        callback(name);
      }
    });
  });
}

function start() {
  load(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id, { action: 'startSimulation', simulation: name, simulationType: 'colorBlindness' });
    });
  });
}

function stop() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { action: 'stopSimulation', simulation: name, simulationType: 'colorBlindness' });
  });
}

exports.start = start;
exports.stop = stop;


},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = 'concentration';

function load(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.executeScript(activeTab.id, { file: 'simulations/concentration/content.js' }, function () {
      if (callback) {
        callback(name);
      }
    });
  });
}

function start() {
  load(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id, { action: 'startSimulation', simulation: name });
    });
  });
}

function stop() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { action: 'stopSimulation', simulation: name });
  });
}

exports.start = start;
exports.stop = stop;


},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = 'dyslexia';

function load(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.executeScript(activeTab.id, { file: 'simulations/dyslexia/content.js' }, function () {
      if (callback) {
        callback(name);
      }
    });
  });
}

function start() {
  load(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id, { action: 'startSimulation', simulation: name });
    });
  });
}

function stop() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { action: 'stopSimulation', simulation: name });
  });
}

exports.load = load;
exports.start = start;
exports.stop = stop;


},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = 'farsightedness';

function load(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.executeScript(activeTab.id, { file: 'simulations/farsightedness/content.js' }, function () {
      if (callback) {
        callback(name);
      }
    });
  });
}

function start() {
  load(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id, { action: 'startSimulation', simulation: name });
    });
  });
}

function stop() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { action: 'stopSimulation', simulation: name });
  });
}

exports.start = start;
exports.stop = stop;


},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = 'parkinsons';

function load(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.executeScript(activeTab.id, { file: 'simulations/parkinsons/content.js' }, function () {
      if (callback) {
        callback(name);
      }
    });
  });
}

function start() {
  load(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id, { action: 'startSimulation', simulation: name });
    });
  });
}

function stop() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { action: 'stopSimulation', simulation: name });
  });
}

exports.start = start;
exports.stop = stop;


},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = 'tunnelVision';

function load(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.executeScript(activeTab.id, { file: 'simulations/tunnelVision/content.js' }, function () {
      if (callback) {
        callback(name);
      }
    });
  });
}

function start() {
  load(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id, { action: 'startSimulation', simulation: name });
    });
  });
}

function stop() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { action: 'stopSimulation', simulation: name });
  });
}

exports.start = start;
exports.stop = stop;


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxVSVxcYXBwLmpzIiwiYnVpbGQvanMvYmFiZWwvVUkvZGF0YS9kYXRhLmpzb24iLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcY29sb3JCbGluZG5lc3NcXHJlZEdyZWVuQ29sb3JCbGluZG5lc3NcXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXGNvbG9yQmxpbmRuZXNzXFx0b3RhbENvbG9yQmxpbmRuZXNzXFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxjb2xvckJsaW5kbmVzc1xceWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxjb25jZW50cmF0aW9uXFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxkeXNsZXhpYVxcaW5kZXguanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcZmFyc2lnaHRlZG5lc3NcXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXHBhcmtpbnNvbnNcXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXHR1bm5lbFZpc2lvblxcaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxJQUFJLFNBQVMsUUFBUSxrQ0FBUixDQUFiOztBQUVBLElBQUksV0FBVyx3QkFBd0IsTUFBeEIsQ0FBZjs7QUFFQSxJQUFJLFVBQVUsUUFBUSx3Q0FBUixDQUFkOztBQUVBLElBQUksaUJBQWlCLHdCQUF3QixPQUF4QixDQUFyQjs7QUFFQSxJQUFJLFVBQVUsUUFBUSxzQ0FBUixDQUFkOztBQUVBLElBQUksZUFBZSx3QkFBd0IsT0FBeEIsQ0FBbkI7O0FBRUEsSUFBSSxV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QUFJLFlBQVksS0FBSyxDQUFMLENBQWhCOztBQUVBLFdBQU8sSUFBUCxDQUFZLGFBQVosQ0FBMEIsVUFBVSxFQUFwQyxFQUF3QyxFQUFFLE1BQU0scUNBQVIsRUFBeEMsRUFBeUYsWUFBWTtBQUNuRyxVQUFJLFFBQUosRUFBYztBQUNaLGlCQUFTLElBQVQ7QUFDRDtBQUNGLEtBSkQ7QUFLRCxHQVJEO0FBU0Q7O0FBRUQsU0FBUyxLQUFULEdBQWlCO0FBQ2YsT0FBSyxZQUFZO0FBQ2YsV0FBTyxJQUFQLENBQVksS0FBWixDQUFrQixFQUFFLFFBQVEsSUFBVixFQUFnQixlQUFlLElBQS9CLEVBQWxCLEVBQXlELFVBQVUsSUFBVixFQUFnQjtBQUN2RSxVQUFJLFlBQVksS0FBSyxDQUFMLENBQWhCOztBQUVBLGFBQU8sSUFBUCxDQUFZLFdBQVosQ0FBd0IsVUFBVSxFQUFsQyxFQUFzQyxFQUFFLFFBQVEsaUJBQVYsRUFBNkIsWUFBWSxJQUF6QyxFQUF0QztBQUNELEtBSkQ7QUFLRCxHQU5EO0FBT0Q7O0FBRUQsU0FBUyxJQUFULEdBQWdCO0FBQ2QsU0FBTyxJQUFQLENBQVksS0FBWixDQUFrQixFQUFFLFFBQVEsSUFBVixFQUFnQixlQUFlLElBQS9CLEVBQWxCLEVBQXlELFVBQVUsSUFBVixFQUFnQjtBQUN2RSxRQUFJLFlBQVksS0FBSyxDQUFMLENBQWhCOztBQUVBLFdBQU8sSUFBUCxDQUFZLFdBQVosQ0FBd0IsVUFBVSxFQUFsQyxFQUFzQyxFQUFFLFFBQVEsZ0JBQVYsRUFBNEIsWUFBWSxJQUF4QyxFQUF0QztBQUNELEdBSkQ7QUFLRDs7QUFFRCxRQUFRLEtBQVIsR0FBZ0IsS0FBaEI7QUFDQSxRQUFRLElBQVIsR0FBZSxJQUFmO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2luZGV4ID0gcmVxdWlyZSgnLi4vc2ltdWxhdGlvbnMvZHlzbGV4aWEvaW5kZXguanMnKTtcblxudmFyIGR5c2xleGlhID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2luZGV4KTtcblxudmFyIF9pbmRleDIgPSByZXF1aXJlKCcuLi9zaW11bGF0aW9ucy9mYXJzaWdodGVkbmVzcy9pbmRleC5qcycpO1xuXG52YXIgZmFyc2lnaHRlZG5lc3MgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfaW5kZXgyKTtcblxudmFyIF9pbmRleDMgPSByZXF1aXJlKCcuLi9zaW11bGF0aW9ucy90dW5uZWxWaXNpb24vaW5kZXguanMnKTtcblxudmFyIHR1bm5lbFZpc2lvbiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9pbmRleDMpO1xuXG52YXIgX2luZGV4NCA9IHJlcXVpcmUoJy4uL3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL3JlZEdyZWVuQ29sb3JCbGluZG5lc3MvaW5kZXguanMnKTtcblxudmFyIHJlZEdyZWVuQ29sb3JCbGluZG5lc3MgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfaW5kZXg0KTtcblxudmFyIF9pbmRleDUgPSByZXF1aXJlKCcuLi9zaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy95ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3MvaW5kZXguanMnKTtcblxudmFyIHllbGxvd0JsdWVDb2xvckJsaW5kbmVzcyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9pbmRleDUpO1xuXG52YXIgX2luZGV4NiA9IHJlcXVpcmUoJy4uL3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL3RvdGFsQ29sb3JCbGluZG5lc3MvaW5kZXguanMnKTtcblxudmFyIHRvdGFsQ29sb3JCbGluZG5lc3MgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfaW5kZXg2KTtcblxudmFyIF9pbmRleDcgPSByZXF1aXJlKCcuLi9zaW11bGF0aW9ucy9jb25jZW50cmF0aW9uL2luZGV4LmpzJyk7XG5cbnZhciBjb25jZW50cmF0aW9uID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2luZGV4Nyk7XG5cbnZhciBfaW5kZXg4ID0gcmVxdWlyZSgnLi4vc2ltdWxhdGlvbnMvcGFya2luc29ucy9pbmRleC5qcycpO1xuXG52YXIgcGFya2luc29ucyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9pbmRleDgpO1xuXG52YXIgX2RhdGEgPSByZXF1aXJlKCcuL2RhdGEvZGF0YS5qc29uJyk7XG5cbnZhciBkYXRhID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2RhdGEpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG4vLyBpbXBvcnQge3Jlc2V0fSBmcm9tICcuLi9zaW11bGF0aW9ucy9nZW5lcmFsL3Jlc2V0L2luZGV4LmpzJ1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gIHZhciB0b29sdGlwID0gJChcIi50b29sLXRpcFwiKTtcbiAgdmFyIGluZm9IZWFkaW5nID0gJChcIi5kaXNhYmlsaXR5LWluZm8taGVhZGluZ1wiKTtcbiAgdmFyIGluZm9QYXJhZ3JhcGggPSAkKFwiLmRpc2FiaWxpdHktaW5mby1wYXJhZ3JhcGhcIik7XG4gIHZhciBhZHZpY2VMaXN0ID0gJChcIi5hZHZpY2UtbGlzdFwiKTtcbiAgdmFyIG1vcmVJbmZvTGluayA9ICQoXCIubW9yZS1pbmZvLWxpbmtcIik7XG4gIHZhciBtb3JlSW5mb1BhbmVsID0gJChcIiNtb3JlLWluZm8tcGFuZWxcIik7XG4gIHZhciByZXNldEJ0biA9ICQoXCIjcmVzZXQtYnRuXCIpO1xuICB2YXIgbmF2YmFySGVhZGVyID0gJChcIi5uYXZiYXItaGVhZGVyXCIpO1xuICB2YXIgcmVzZXRCdG5UZXh0ID0gZGF0YS5VSVswXS5yZXNldEJ0blRleHQ7XG4gIHZhciBuYXZiYXJIZWFkZXJUZXh0ID0gZGF0YS5VSVswXS5uYXZiYXJIZWFkZXJUZXh0O1xuICB2YXIgc2ltdWxhdGlvbkhlYWRpbmdUZXh0ID0gZGF0YS5VSVswXS5zaW11bGF0aW9uc1swXS5oZWFkaW5nO1xuICB2YXIgYWR2aWNlRHJvcGRvd24gPSAkKFwiI2FkdmljZS1kcm9wZG93blwiKTtcbiAgdmFyIGFkdmljZURyb3Bkb3duVGV4dCA9IGRhdGEuVUlbMF0uYWR2aWNlRHJvcGRvd25UZXh0O1xuICB2YXIgaW5mb0Ryb3Bkb3duID0gJChcIiNpbmZvLWRyb3Bkb3duXCIpO1xuICB2YXIgaW5mb0Ryb3Bkb3duVGV4dCA9IGRhdGEuVUlbMF0uaW5mb0Ryb3Bkb3duVGV4dDtcblxuICB2YXIgYWN0aXZlU2ltdWxhdGlvbiA9IHZvaWQgMDtcblxuICAvL0FwcGVuZCBVSSB0ZXh0c1xuXG4gIG5hdmJhckhlYWRlci50ZXh0KG5hdmJhckhlYWRlclRleHQpO1xuICByZXNldEJ0bi50ZXh0KHJlc2V0QnRuVGV4dCk7XG4gIGluZm9Ecm9wZG93bi50ZXh0KGluZm9Ecm9wZG93blRleHQpO1xuICBhZHZpY2VEcm9wZG93bi50ZXh0KGFkdmljZURyb3Bkb3duVGV4dCk7XG5cbiAgJC5lYWNoKGRhdGEuVUlbMF0uc2ltdWxhdGlvbnMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuXG4gICAgJCgnIycgKyB2YWx1ZS5oZWFkaW5nKS50ZXh0KHZhbHVlLmhlYWRpbmcpO1xuXG4gICAgJC5lYWNoKHZhbHVlLmNob2ljZXMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuICAgICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgICAgICQoJyMnICsga2V5KS50ZXh0KHZhbHVlW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICAvLyBTZXQgYWN0aXZlIHN0YXRlXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlU2ltdWxhdGlvbicsIGZ1bmN0aW9uIChvYmopIHtcblxuICAgIHZhciBhY3RpdmVTaW11bGF0aW9uID0gb2JqLmFjdGl2ZVNpbXVsYXRpb247XG5cbiAgICBmdW5jdGlvbiBmaW5kUHJvcGVydHkoc2ltdWxhdGlvbnMpIHtcbiAgICAgIHJldHVybiBzaW11bGF0aW9ucy5uYW1lID09PSBhY3RpdmVTaW11bGF0aW9uO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdhY3RpdmVTaW11bGF0aW9uJywgYWN0aXZlU2ltdWxhdGlvbik7XG5cbiAgICBpZiAoYWN0aXZlU2ltdWxhdGlvbiAhPSBudWxsKSB7XG5cbiAgICAgIHRvb2x0aXAuYWRkQ2xhc3MoXCJpblwiKTtcblxuICAgICAgaW5mb0hlYWRpbmcuYXBwZW5kKCQoJyMnICsgYWN0aXZlU2ltdWxhdGlvbikudGV4dCgpKTtcblxuICAgICAgJCgnIycgKyBhY3RpdmVTaW11bGF0aW9uKS5jbG9zZXN0KFwiLmRyb3Bkb3duXCIpLmZpbmQoXCIuc2VsZWN0ZWRcIikudGV4dCgkKCcjJyArIGFjdGl2ZVNpbXVsYXRpb24pLnRleHQoKSk7XG5cbiAgICAgIHZhciBpZCA9ICQoJyMnICsgYWN0aXZlU2ltdWxhdGlvbikuYXR0cihcImlkXCIpO1xuXG4gICAgICB2YXIgZmFjdCA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLmZhY3Q7XG4gICAgICB2YXIgbGlzdEl0ZW1zID0gZGF0YS5mYWN0cy5maW5kKGZpbmRQcm9wZXJ0eSkubGlzdEl0ZW1zO1xuICAgICAgdmFyIG1vcmVJbmZvID0gZGF0YS5mYWN0cy5maW5kKGZpbmRQcm9wZXJ0eSkubW9yZUluZm9MaW5rVGV4dDtcbiAgICAgIHZhciBtb3JlSW5mb1VybCA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLm1vcmVJbmZvVXJsO1xuXG4gICAgICBpbmZvUGFyYWdyYXBoLmFwcGVuZChmYWN0KTtcblxuICAgICAgJC5lYWNoKGxpc3RJdGVtcywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG4gICAgICAgIGFkdmljZUxpc3QuYXBwZW5kKCc8bGk+JyArIHZhbHVlICsgJzwvbGk+Jyk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKG1vcmVJbmZvKSB7XG4gICAgICAgIG1vcmVJbmZvUGFuZWwuc2hvdygpO1xuICAgICAgICBtb3JlSW5mb0xpbmsuYXBwZW5kKG1vcmVJbmZvKTtcbiAgICAgIH1cblxuICAgICAgbW9yZUluZm9MaW5rLmF0dHIoXCJocmVmXCIsICcnICsgbW9yZUluZm9VcmwpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy9tZW51IGJ1dHRvbiBjbGlja1xuXG4gICQoXCIubWVudS1idG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIG1lbnVCdG4gPSAkKHRoaXMpO1xuICAgIHZhciBtZW51QnRuSWQgPSBtZW51QnRuWzBdLmlkO1xuICAgIHZhciBpZCA9IG1lbnVCdG4uYXR0cihcImlkXCIpO1xuICAgIHZhciBmYWN0ID0gZGF0YS5mYWN0cy5maW5kKGZpbmRQcm9wZXJ0eSkuZmFjdDtcbiAgICB2YXIgbGlzdEl0ZW1zID0gZGF0YS5mYWN0cy5maW5kKGZpbmRQcm9wZXJ0eSkubGlzdEl0ZW1zO1xuICAgIHZhciBtb3JlSW5mbyA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLm1vcmVJbmZvTGlua1RleHQ7XG4gICAgdmFyIG1vcmVJbmZvVXJsID0gZGF0YS5mYWN0cy5maW5kKGZpbmRQcm9wZXJ0eSkubW9yZUluZm9Vcmw7XG5cbiAgICBmdW5jdGlvbiBmaW5kUHJvcGVydHkoc2ltdWxhdGlvbnMpIHtcbiAgICAgIHJldHVybiBzaW11bGF0aW9ucy5uYW1lID09PSBpZDtcbiAgICB9XG5cbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtcbiAgICAgIHBhdGg6IFwiaW1nL2ljb25fYWN0aXZlLnBuZ1wiXG4gICAgfSk7XG5cbiAgICBhY3RpdmVTaW11bGF0aW9uID0gbWVudUJ0bklkO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7ICdhY3RpdmVTaW11bGF0aW9uJzogbWVudUJ0bklkIH0pO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7ICdsaW5rVXJsJzogbW9yZUluZm9VcmwgfSk7XG5cbiAgICBpbmZvSGVhZGluZy5lbXB0eSgpO1xuICAgIGluZm9QYXJhZ3JhcGguZW1wdHkoKTtcbiAgICBhZHZpY2VMaXN0LmVtcHR5KCk7XG4gICAgbW9yZUluZm9MaW5rLmVtcHR5KCk7XG4gICAgbW9yZUluZm9QYW5lbC5oaWRlKCk7XG5cbiAgICBpbmZvSGVhZGluZy5hcHBlbmQobWVudUJ0bi50ZXh0KCkpO1xuXG4gICAgbWVudUJ0bi5jbG9zZXN0KFwiLmRyb3Bkb3duXCIpLmZpbmQoXCIuc2VsZWN0ZWRcIikudGV4dChtZW51QnRuLnRleHQoKSk7XG5cbiAgICBpbmZvUGFyYWdyYXBoLmFwcGVuZChmYWN0KTtcblxuICAgICQuZWFjaChsaXN0SXRlbXMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuICAgICAgYWR2aWNlTGlzdC5hcHBlbmQoJzxsaT4nICsgdmFsdWUgKyAnPC9saT4nKTtcbiAgICB9KTtcblxuICAgIGlmIChtb3JlSW5mbykge1xuICAgICAgbW9yZUluZm9QYW5lbC5zaG93KCk7XG4gICAgICBtb3JlSW5mb0xpbmsuYXBwZW5kKG1vcmVJbmZvKTtcbiAgICB9XG5cbiAgICBtb3JlSW5mb0xpbmsuYXR0cihcImhyZWZcIiwgJycgKyBtb3JlSW5mb1VybCk7XG5cbiAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAkKCcjcGFuZWwyJykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwyJykuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICB9LCAxMDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzdGFydFNpbXVsYXRpb24oKTtcbiAgICB9LCA1MDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwyJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAgIHRvb2x0aXAuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICB9LCAxMDAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMicpLmFkZENsYXNzKFwiaGlkZVwiKTtcbiAgICB9LCAxNTAwKTtcbiAgfSk7XG5cbiAgLy93aGVuIGxvYWRpbmcgbW9kYWwgaXMgY2xvc2VkLCBzaG93IGNob3NlbiBzaW11bGF0aW9uXG5cbiAgZnVuY3Rpb24gc3RhcnRTaW11bGF0aW9uKCkge1xuXG4gICAgLy8gVE9ETzogQ2xlYW4gdXBcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2FjdGl2ZVNpbXVsYXRpb24nLCBmdW5jdGlvbiAob2JqKSB7XG5cbiAgICAgIGNvbnNvbGUubG9nKCdzdGFydFNpbXVsYXRpb24nLCBvYmopO1xuXG4gICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJmYXJzaWdodGVkbmVzc1wiKSB7XG4gICAgICAgIGZhcnNpZ2h0ZWRuZXNzLnN0YXJ0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmouYWN0aXZlU2ltdWxhdGlvbiA9PSBcInR1bm5lbFZpc2lvblwiKSB7XG4gICAgICAgIHR1bm5lbFZpc2lvbi5zdGFydCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCIpIHtcbiAgICAgICAgcmVkR3JlZW5Db2xvckJsaW5kbmVzcy5zdGFydCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIikge1xuICAgICAgICB5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3Muc3RhcnQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwidG90YWxDb2xvckJsaW5kbmVzc1wiKSB7XG4gICAgICAgIHRvdGFsQ29sb3JCbGluZG5lc3Muc3RhcnQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwiY29uY2VudHJhdGlvblwiKSB7XG4gICAgICAgIGNvbmNlbnRyYXRpb24uc3RhcnQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwicGFya2luc29uc1wiKSB7XG4gICAgICAgIHBhcmtpbnNvbnMuc3RhcnQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwiZHlzbGV4aWFcIikge1xuICAgICAgICBkeXNsZXhpYS5zdGFydCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy9yZXNldCBleHRlbnNpb25cblxuICBmdW5jdGlvbiByZXNldFNpbXVsYXRpb24oKSB7XG5cbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtcbiAgICAgIHBhdGg6IFwiaW1nL2ljb24ucG5nXCJcbiAgICB9KTtcblxuICAgIHRvb2x0aXAucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAkKFwiI3BhbmVsMVwiKS5hZGRDbGFzcyhcImluXCIpO1xuXG4gICAgLy8gVE9ETzogQ2hhbmdlIHRoaXMgICAgXG4gICAgJChcIiNTeW5cIikudGV4dChcIlN5blwiKTtcbiAgICAkKFwiI01vdG9yaWtcIikudGV4dChcIk1vdG9yaWtcIik7XG5cbiAgICAvLyBUT0RPOiBDbGVhbiB1cFxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlU2ltdWxhdGlvbicsIGZ1bmN0aW9uIChvYmopIHtcblxuICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwiZmFyc2lnaHRlZG5lc3NcIikge1xuICAgICAgICBmYXJzaWdodGVkbmVzcy5zdG9wKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmouYWN0aXZlU2ltdWxhdGlvbiA9PSBcInR1bm5lbFZpc2lvblwiKSB7XG4gICAgICAgIHR1bm5lbFZpc2lvbi5zdG9wKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmouYWN0aXZlU2ltdWxhdGlvbiA9PSBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIikge1xuICAgICAgICByZWRHcmVlbkNvbG9yQmxpbmRuZXNzLnN0b3AoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCIpIHtcbiAgICAgICAgeWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzLnN0b3AoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwidG90YWxDb2xvckJsaW5kbmVzc1wiKSB7XG4gICAgICAgIHRvdGFsQ29sb3JCbGluZG5lc3Muc3RvcCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJjb25jZW50cmF0aW9uXCIpIHtcbiAgICAgICAgY29uY2VudHJhdGlvbi5zdG9wKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmouYWN0aXZlU2ltdWxhdGlvbiA9PSBcInBhcmtpbnNvbnNcIikge1xuICAgICAgICBwYXJraW5zb25zLnN0b3AoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwiZHlzbGV4aWFcIikge1xuICAgICAgICBkeXNsZXhpYS5zdG9wKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvL2J0biBhbmQgbGlua3NcblxuICAkKFwiI3Jlc2V0LWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgcmVzZXRTaW11bGF0aW9uKCk7XG4gIH0pO1xuXG4gICQoXCIuZ2l0aHViLWxpbmtcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9NZXRhbWF0cml4L1dlYi1EaXNhYmlsaXR5LVNpbXVsYXRvcicgfSk7XG4gIH0pO1xuXG4gICQoXCIubW9yZS1pbmZvLWxpbmtcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnbGlua1VybCcsIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogJycgKyBvYmoubGlua1VybCB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy9wYW5lbCBjb2xsYXBzZSwgc2hvdyBhcnJvd3M6IFxuXG4gICQoJy5jb2xsYXBzZScpLm9uKCdzaG93bi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCIuZG93bi1hcnJvdywgLnVwLWFycm93XCIpLnRvZ2dsZSgpO1xuICB9KS5vbignaGlkZGVuLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucGFyZW50KCkuZmluZChcIi5kb3duLWFycm93LCAudXAtYXJyb3dcIikudG9nZ2xlKCk7XG4gIH0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAuanMubWFwXG4iLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgXCJmYWN0c1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIFwibmFtZVwiOiBcImR5c2xleGlhXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIkR5c2xleGkgw6RyIGVuIG5lZHPDpHR0bmluZyBzb20gZ8O2ciBhdHQgaGrDpHJuYW4gaGFyIHN2w6VydCBhdHQgYXV0b21hdGlzZXJhIHRvbGtuaW5nZW4gYXYgb3JkLiBEZXR0YSBnw7ZyIGF0dCBwZXJzb25lciBtZWQgZGVubmEgbmVkc8OkdHRuaW5nIGthbiBoYSBzdsOlcnQgYXR0IGzDpHNhIG9jaCBza3JpdmEuIER5c2xleGkgw6RyIGludGUga29wcGxhdCB0aWxsIHN5biBlbGxlciBpbnRlbGxpZ2Vucy4gT3JzYWtlcm5hIHRpbGwgZHlzbGV4aSDDpHIgZm9ydGZhcmFuZGUgb2tsYXJ0LlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJVbmR2aWsgdGV4dCBpIGxpdGVuIHN0b3JsZWsgb2NoIGzDpW5nYSB0ZXh0ZXIuIFNlIHRpbGwgYXR0IGhhIG9yZGVudGxpZ3QgbWVkIHJhZGF2c3TDpW5kLlwiLCBcdFxyXG4gICAgICAgIFwiVW5kdmlrIHN2w6VyYSBvcmQgb2NoIGZhY2t0ZXJtZXIuXCIsXHJcbiAgICAgICAgXCJFcmJqdWQgbMOkdHRsw6RzdGEgdmVyc2lvbmVyIGF2IGZhY2t0ZXh0ZXIuXCIsXHJcbiAgICAgICAgXCJVbmR2aWsgdHlwc25pdHQgbWVkIGtyw6VuZ2xpZ2Egb2NoIGtvbXBsZXhhIGZpZ3VyZXIuXCJcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJwYXJraW5zb25zXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlZpZCBQYXJraW5zb25zIHNqdWtkb20gZsO2cnN0w7ZycyBjZWxsZXJuYSBpIGhqw6RybmFuIHNvbSB0aWxsdmVya2FyIGRvcGFtaW4gdmlsa2V0IGfDtnIgYXR0IGhqw6RybmFuIGbDpXIgZW4gbmVkc2F0dCBmw7ZybcOlZ2EgYXR0IHNraWNrYSBzaWduYWxlci4gUGVyc29uZXIgbWVkIFBhcmtpbnNvbnMga2FuIGRyYWJiYXMgYXYgc3ltcHRvbSBzb20gc2tha25pbmdhciwgc3RlbGEgbXVza2xlciBvY2ggc8OkbXJlIHLDtnJlbHNlZsO2cm3DpWdhLiBPcnNha2VybmEgdGlsbCBQYXJraW5zb25zIHNqdWtkb20gw6RyIGZvcnRmYXJhbmRlIG9rbGFydC5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiU2UgdGlsbCBhdHQgd2ViYnBsYXRzZW4ga2FuIGFudsOkbmRhcyBtZWQgYW5kcmEgaGrDpGxwbWVkZWwgw6RuIG11cywgdGlsbCBleGVtcGVsIHRhbmdlbnRib3Jkc25hdmlnZXJpbmcuXCIsIFx0XHJcbiAgICAgICAgXCJIYSB0aWxscsOkY2tsaWd0IG1lZCBsdWZ0IG1lbGxhbiBrb21wb25lbnRlclwiLFxyXG4gICAgICAgIFwiSGEgdGlsbHLDpGNrbGlndCBzdG9yYSBrbGlja3l0b3IuXCIsXHJcbiAgICAgICAgXCJVbmR2aWsgdHlwc25pdHQgbWVkIGtyw6VuZ2xpZ2Egb2NoIGtvbXBsZXhhIGZpZ3VyZXIuXCJcclxuICAgICAgXSxcclxuICAgICAgXCJtb3JlSW5mb1VybFwiOiBcImh0dHA6Ly93d3cucGFya2luc29uZm9yYnVuZGV0LnNlXCIsXHJcbiAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJQYXJraW5zb25zZsO2cmJ1bmRldFwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIixcclxuICAgICAgXCJmYWN0XCI6IFwiUGVyc29uZXIgbWVkIGRlZmVrdCBmw6RyZ3NlZW5kZSBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHRhcHBhciBzb20gdGFyIHVwcCBmw6RyZ2VybmEgdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE7DpHIgZW4gZWxsZXIgZmxlcmEgYXYgdGFwcGFybmEgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhIGxlZGVyIGRldCB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZS4gR3VsLWJsw6UgZsOkcmdibGluZGhldCAoVHJpdGFub3BpKSDDpHIgc8OkbGxzeW50LiBOYW1uZXQgw6RyIG1pc3NsZWRhbmRlIGTDpSBkZXQgaW50ZSDDpHIgZsOkcmdlcm5hIGd1bCBvY2ggYmzDpSBzb20gZsO2cnbDpHhsYXMsIHV0YW4gYmzDpSBtZWQgZ3LDtm4gb2NoIGd1bCBtZWQgbGlsYS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBkZXQgZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCBlbiByw7ZkIHJhbSB1dGFuIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IG9jaCBnw6RybmEgZW4gaWtvbi5cIiwgXHRcclxuICAgICAgICBcIkVyYmp1ZCBnw6RybmEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxyXG4gICAgICBdLFxyXG4gICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cHM6Ly9zdi53aWtpcGVkaWEub3JnL3dpa2kvRGVmZWt0X2YlQzMlQTRyZ3NlZW5kZVwiLFxyXG4gICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2lraXBlZGlhIG9tIGRlZmVrdCBmw6RyZ3NlZW5kZVwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBkZWZla3QgZsOkcmdzZWVuZGUgaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0YXBwYXIgc29tIHRhciB1cHAgZsOkcmdlcm5hIHZpb2xldHQsIGdyw7ZuIG9jaCByw7ZkLiBOw6RyIGVuIGVsbGVyIGZsZXJhIGF2IHRhcHBhcm5hIHNha25hcyBlbGxlciDDpHIgZGVmZWt0YSBsZWRlciBkZXQgdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUuIFLDtmQtZ3LDtm4gZsOkcmdibGluZGhldCAoUHJvdGFub3BpIG9jaCBEZXV0ZXJhbm9waSkgw6RyIGRlbiB2YW5saWdhc3RlIHR5cGVuIGF2IGbDpHJnYmxpbmRoZXQuIERlbiDDpHIgdmFubGlnYXJlIGhvcyBtw6RuIMOkbiBrdmlubm9yLiBQZXJzb25lciByw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXQgaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSBmw6RyZ2VybmEgcsO2ZCwgZ3LDtm4sIGJydW4gb2NoIG9yYW5nZS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1wiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBlbmRhIHPDpHR0ZXQgYXR0IGbDtnJtZWRsYSBpbmZvcm1hdGlvbiwgaW5kaWtlcmEgZW4gaGFuZGxpbmcgZWxsZXIgaWRlbnRpZmllcmEgZXR0IGVsZW1lbnQuIE1hcmtlcmEgdGlsbCBleGVtcGVsIGludGUgZXR0IGZlbGFrdGlndCBmb3JtdWzDpHJmw6RsdCBlbmRhc3QgbWVkIHLDtmQgcmFtLCBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBvY2ggZ8Okcm5hIGVuICBpa29uLlwiLCBcIkVyYmp1ZCBnw6RybmEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIl0sXHJcbiAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwczovL3N2Lndpa2lwZWRpYS5vcmcvd2lraS9EZWZla3RfZiVDMyVBNHJnc2VlbmRlXCIsXHJcbiAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJXaWtpcGVkaWEgb20gZGVmZWt0IGbDpHJnc2VlbmRlXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIFwibmFtZVwiOiBcImZhcnNpZ2h0ZWRuZXNzXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBIeXBlcm9waSBzZXIgc3VkZGlndCBww6UgbsOkcmEgaMOlbGwsIG1lbiBicmEgcMOlIGzDpW5ndCBow6VsbC4gTmVkc8OkdHRuaW5nZW4gdXBwc3TDpXIgcMOlIGdydW5kIGF2IGF0dCBsanVzZXQgaW50ZSBicnl0cyByw6R0dCBpIMO2Z2F0LiBEZXQgw6RyIGVuIGF2IGRlIHZhbmxpZ2FzdGUgc3lubmVkc8OkdHRuaW5nYXJuYS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrLlwiLCBcdFxyXG4gICAgICAgIFwiV2ViYnNpZGFuIHNrYSBnw6UgYXR0IGbDtnJzdG9yYSAoem9vbWFzKSB0aWxsIG1pbnN0IDIwMCAlIHPDpSBhdHQgYmVzw7ZrYXJlbiBrYW4gYW5wYXNzYSBpbm5laMOlbGxldHMgc3RvcmxlayBlZnRlciBzaW5hIGJlaG92LlwiLFxyXG4gICAgICAgIFwiRXJianVkIHVwcGzDpHNuaW5nIGF2IGlubmVow6VsbGV0LlwiXHJcbiAgICAgIF0sXHJcbiAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwczovL3dlYmJyaWt0bGluamVyLnNlL3IvMzktZ2Utd2ViYnBsYXRzZW4tZW4tZ29kLWxhc2JhcmhldC9cIixcclxuICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldlYmJyaWt0bGluamUgR2Ugd2ViYnBsYXRzZW4gZ29kIGzDpHNiYXJoZXRcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJuYW1lXCI6IFwidG90YWxDb2xvckJsaW5kbmVzc1wiLFxyXG4gICAgICBcImZhY3RcIjogXCJEZWZla3QgZsOkcmdzZWVuZGUgaW5uZWLDpHIgYXR0IGVuIHBlcnNvbiBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHR5cGVyIGF2IHRhcHBhciBzb20gdGFyIHVwcCBvbGlrYSBmw6RyZ2VyOiB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gT3JzYWtlbiB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZSDDpHIgYXR0IGVuIGVsbGVyIGZsZXJhIGF2IGRlc3NhIHR5cGVyIGF2IHRhcHBhciBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEuIEhlbHQgZsOkcmdibGluZCAoTW9ub2tyb21hc2kvYWtyb21hdG9wc2kpIMOkciBteWNrZXQgc8OkbGxzeW50LiBQZXJzb25lciBtZWQgZGVubmEgc3lubmVkc8OkdHRuaW5nIHNlciBpbmdhIGbDpHJnZXIgdXRhbiBzZXIgZW5kYXN0IGkgZ3LDpXNrYWxhLlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJBbnbDpG5kIGludGUgZsOkcmcgc29tIGRldCBlbmRhIHPDpHR0ZXQgYXR0IGbDtnJtZWRsYSBpbmZvcm1hdGlvbiwgaW5kaWtlcmEgZW4gaGFuZGxpbmcgZWxsZXIgaWRlbnRpZmllcmEgZWxlbWVudC4gTWFya2VyYSB0LmV4LiBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCByw7ZkIHJhbSwga29tcGxldHRlcmEgw6R2ZW4gbWVkIHRleHQgZWxsZXIgaWtvbi5cIiwgXHRcclxuICAgICAgICBcIkRldCBrYW4gdmFyYSBlbiBicmEgaWTDqSBhdHQgZXJianVkYSBldHQgaMO2Z2tvbnRyYXN0LWzDpGdlLlwiXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIFwibmFtZVwiOiBcInR1bm5lbFZpc2lvblwiLFxyXG4gICAgICBcImZhY3RcIjogXCJUdW5uZWxzZWVuZGUgaW5uZWLDpHIuLi5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiTGlzdGl0ZW0gMVwiLCBcdFxyXG4gICAgICAgIFwiTGlzdGl0ZW0gMi5cIlxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJjb25jZW50cmF0aW9uXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIktvbmNlbnRyYXRpb25zc3bDpXJpZ2hldGVyIGlubmViw6RyLi4uXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIkxpc3RpdGVtIDFcIiwgXHRcclxuICAgICAgICBcIkxpc3RpdGVtIDIuXCJcclxuICAgICAgXVxyXG4gICAgfVxyXG4gIF0sXHJcbiAgXCJVSVwiOiBbe1xyXG4gICAgXCJuYXZiYXJIZWFkZXJUZXh0XCI6IFwiVsOkbGogZnVua3Rpb25zbmVkc8OkdHRuaW5nOlwiLFxyXG4gICAgXCJyZXNldEJ0blRleHRcIjogXCLDhXRlcnN0w6RsbFwiLFxyXG4gICAgXCJhZHZpY2VEcm9wZG93blRleHRcIjogXCJUw6RuayBww6UgZGV0dGFcIixcclxuICAgIFwiaW5mb0Ryb3Bkb3duVGV4dFwiOiBcIk1lciBpbmZvcm1hdGlvblwiLFxyXG4gICAgXCJzaW11bGF0aW9uc1wiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJTeW5cIixcclxuICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgeyBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJIZWx0IGbDpHJnYmxpbmRcIiB9LFxyXG4gICAgICAgICAgeyBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIiB9LFxyXG4gICAgICAgICAgeyBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXRcIiB9LFxyXG4gICAgICAgICAgeyBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiTMOlbmdzeW50aGV0LCDDtnZlcnN5bnRoZXRcIiB9LFxyXG4gICAgICAgICAgeyBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbHNlZW5kZVwiIH1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJNb3RvcmlrXCIsXHJcbiAgICAgICAgXCJjaG9pY2VzXCI6IFsgXHJcbiAgICAgICAgICB7IFwicGFya2luc29uc1wiOiBcIlBhcmtpbnNvbnNcIiB9XHJcbiAgXHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJEeXNsZXhpXCIsXHJcbiAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJLb25jZW50cmF0aW9uXCIsXHJcbiAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJNaW5uZVwiLFxyXG4gICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICB9XHJcblxyXG4gICAgXVxyXG4gIH1dXHJcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgbmFtZSA9ICdyZWRHcmVlbkNvbG9yQmxpbmRuZXNzJztcblxuZnVuY3Rpb24gbG9hZChjYWxsYmFjaykge1xuICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdChhY3RpdmVUYWIuaWQsIHsgZmlsZTogJ3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL2NvbnRlbnQuanMnIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhuYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICBjb25zb2xlLmxvZyhuYW1lLCAnc3RhcnQnKTtcbiAgbG9hZChmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2cobmFtZSwgJ2xvYWQnKTtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdGFydFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lLCBzaW11bGF0aW9uVHlwZTogJ2NvbG9yQmxpbmRuZXNzJyB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0b3AoKSB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RvcFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lLCBzaW11bGF0aW9uVHlwZTogJ2NvbG9yQmxpbmRuZXNzJyB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydHMuc3RhcnQgPSBzdGFydDtcbmV4cG9ydHMuc3RvcCA9IHN0b3A7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBuYW1lID0gJ3RvdGFsQ29sb3JCbGluZG5lc3MnO1xuXG5mdW5jdGlvbiBsb2FkKGNhbGxiYWNrKSB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KGFjdGl2ZVRhYi5pZCwgeyBmaWxlOiAnc2ltdWxhdGlvbnMvY29sb3JCbGluZG5lc3MvY29udGVudC5qcycgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKG5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gIGxvYWQoZnVuY3Rpb24gKCkge1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0YXJ0U2ltdWxhdGlvbicsIHNpbXVsYXRpb246IG5hbWUsIHNpbXVsYXRpb25UeXBlOiAnY29sb3JCbGluZG5lc3MnIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RvcCgpIHtcbiAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdG9wU2ltdWxhdGlvbicsIHNpbXVsYXRpb246IG5hbWUsIHNpbXVsYXRpb25UeXBlOiAnY29sb3JCbGluZG5lc3MnIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0cy5zdGFydCA9IHN0YXJ0O1xuZXhwb3J0cy5zdG9wID0gc3RvcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIG5hbWUgPSAneWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzJztcblxuZnVuY3Rpb24gbG9hZChjYWxsYmFjaykge1xuICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdChhY3RpdmVUYWIuaWQsIHsgZmlsZTogJ3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL2NvbnRlbnQuanMnIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhuYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICBsb2FkKGZ1bmN0aW9uICgpIHtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdGFydFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lLCBzaW11bGF0aW9uVHlwZTogJ2NvbG9yQmxpbmRuZXNzJyB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0b3AoKSB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RvcFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lLCBzaW11bGF0aW9uVHlwZTogJ2NvbG9yQmxpbmRuZXNzJyB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydHMuc3RhcnQgPSBzdGFydDtcbmV4cG9ydHMuc3RvcCA9IHN0b3A7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBuYW1lID0gJ2NvbmNlbnRyYXRpb24nO1xuXG5mdW5jdGlvbiBsb2FkKGNhbGxiYWNrKSB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KGFjdGl2ZVRhYi5pZCwgeyBmaWxlOiAnc2ltdWxhdGlvbnMvY29uY2VudHJhdGlvbi9jb250ZW50LmpzJyB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sobmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgbG9hZChmdW5jdGlvbiAoKSB7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RhcnRTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0b3AoKSB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RvcFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0cy5zdGFydCA9IHN0YXJ0O1xuZXhwb3J0cy5zdG9wID0gc3RvcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIG5hbWUgPSAnZHlzbGV4aWEnO1xuXG5mdW5jdGlvbiBsb2FkKGNhbGxiYWNrKSB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KGFjdGl2ZVRhYi5pZCwgeyBmaWxlOiAnc2ltdWxhdGlvbnMvZHlzbGV4aWEvY29udGVudC5qcycgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKG5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gIGxvYWQoZnVuY3Rpb24gKCkge1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0YXJ0U2ltdWxhdGlvbicsIHNpbXVsYXRpb246IG5hbWUgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdG9wKCkge1xuICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0b3BTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnN0YXJ0ID0gc3RhcnQ7XG5leHBvcnRzLnN0b3AgPSBzdG9wO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgbmFtZSA9ICdmYXJzaWdodGVkbmVzcyc7XG5cbmZ1bmN0aW9uIGxvYWQoY2FsbGJhY2spIHtcbiAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoYWN0aXZlVGFiLmlkLCB7IGZpbGU6ICdzaW11bGF0aW9ucy9mYXJzaWdodGVkbmVzcy9jb250ZW50LmpzJyB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sobmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgbG9hZChmdW5jdGlvbiAoKSB7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RhcnRTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0b3AoKSB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RvcFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0cy5zdGFydCA9IHN0YXJ0O1xuZXhwb3J0cy5zdG9wID0gc3RvcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIG5hbWUgPSAncGFya2luc29ucyc7XG5cbmZ1bmN0aW9uIGxvYWQoY2FsbGJhY2spIHtcbiAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoYWN0aXZlVGFiLmlkLCB7IGZpbGU6ICdzaW11bGF0aW9ucy9wYXJraW5zb25zL2NvbnRlbnQuanMnIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhuYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICBsb2FkKGZ1bmN0aW9uICgpIHtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdGFydFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RvcCgpIHtcbiAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdG9wU2ltdWxhdGlvbicsIHNpbXVsYXRpb246IG5hbWUgfSk7XG4gIH0pO1xufVxuXG5leHBvcnRzLnN0YXJ0ID0gc3RhcnQ7XG5leHBvcnRzLnN0b3AgPSBzdG9wO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgbmFtZSA9ICd0dW5uZWxWaXNpb24nO1xuXG5mdW5jdGlvbiBsb2FkKGNhbGxiYWNrKSB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KGFjdGl2ZVRhYi5pZCwgeyBmaWxlOiAnc2ltdWxhdGlvbnMvdHVubmVsVmlzaW9uL2NvbnRlbnQuanMnIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhuYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICBsb2FkKGZ1bmN0aW9uICgpIHtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdGFydFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RvcCgpIHtcbiAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdG9wU2ltdWxhdGlvbicsIHNpbXVsYXRpb246IG5hbWUgfSk7XG4gIH0pO1xufVxuXG5leHBvcnRzLnN0YXJ0ID0gc3RhcnQ7XG5leHBvcnRzLnN0b3AgPSBzdG9wO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iXX0=
