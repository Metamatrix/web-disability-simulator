(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _index = require('../simulations/dyslexia/index.js');

var _index2 = require('../simulations/general/reset/index.js');

var _index3 = require('../simulations/farsightedness/index.js');

var _index4 = require('../simulations/tunnelVision/index.js');

var _index5 = require('../simulations/colorBlindness/redGreenColorBlindness/index.js');

var _index6 = require('../simulations/colorBlindness/yellowBlueColorBlindness/index.js');

var _index7 = require('../simulations/colorBlindness/totalColorBlindness/index.js');

var _index8 = require('../simulations/concentration/index.js');

var _index9 = require('../simulations/parkinsons/index.js');

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

// import {loadingModal} from '../simulations/general/loading/index.js'
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

    tooltip.animate({
      left: parseInt(tooltip.css('left'), 10) == 0 ? -tooltip.outerWidth() : 0
    });

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

    // loadingModal();

    runtSimulation();
  });

  //when loading modal is closed, show chosen simulation

  function runtSimulation() {

    chrome.storage.local.get('activeSimulation', function (obj) {

      if (obj.activeSimulation == "farsightedness") {
        (0, _index3.farsightedness)();
      }

      if (obj.activeSimulation == "tunnelVision") {
        (0, _index4.tunnelVision)();
      }

      if (obj.activeSimulation == "redGreenColorBlindness") {
        (0, _index5.redGreenColorBlindness)();
      }

      if (obj.activeSimulation == "yellowBlueColorBlindness") {
        (0, _index6.yellowBlueColorBlindness)();
      }

      if (obj.activeSimulation == "totalColorBlindness") {
        (0, _index7.totalColorBlindness)();
      }

      if (obj.activeSimulation == "concentration") {
        (0, _index8.concentration)();
      }

      if (obj.activeSimulation == "parkinsons") {
        (0, _index9.parkinsons)();
      }

      if (obj.activeSimulation == "dyslexia") {
        startSimulation('dyslexia');
      }
    });
  }

  //reset extension

  function resetSimulation() {

    chrome.browserAction.setIcon({
      path: "img/icon.png"
    });

    tooltip.animate({
      left: parseInt(tooltip.css('marginLeft'), 10) == 0 ? tooltip.outerWidth() : 0
    });

    $("#Syn").text("Syn");
    $("#Motorik").text("Motorik");

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'stopSimulation', simulation: activeSimulation }, function () {
        activeSimulation = null;
        chrome.storage.local.remove('activeSimulation');
      });
    });

    // reset();
  }

  function startSimulation(simulation) {
    console.log('startSimulation');
    (0, _index.dyslexia)();
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'startSimulation', simulation: simulation }, function () {});
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

  //keep chosen simulation fact tooltip when extension is closed and opened again. 

  window.onload = function () {

    chrome.storage.local.get('activeSimulation', function (obj) {

      var activeSimulation = obj.activeSimulation;

      function findProperty(simulations) {
        return simulations.name === activeSimulation;
      }

      if (activeSimulation != null) {

        tooltip.css("left", "0");

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
  };
});


},{"../simulations/colorBlindness/redGreenColorBlindness/index.js":3,"../simulations/colorBlindness/totalColorBlindness/index.js":4,"../simulations/colorBlindness/yellowBlueColorBlindness/index.js":5,"../simulations/concentration/index.js":6,"../simulations/dyslexia/index.js":7,"../simulations/farsightedness/index.js":8,"../simulations/general/reset/index.js":9,"../simulations/parkinsons/index.js":10,"../simulations/tunnelVision/index.js":11,"./data/data.json":2}],2:[function(require,module,exports){
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
exports.redGreenColorBlindness = redGreenColorBlindness;
function redGreenColorBlindness() {

  chrome.tabs.executeScript({ file: 'simulations/colorBlindness/content.js' });

  chrome.tabs.insertCSS({ file: 'simulations/colorBlindness/redGreenColorBlindness/css/main.css' });
}


},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.totalColorBlindness = totalColorBlindness;
function totalColorBlindness() {

  chrome.tabs.executeScript({ file: 'simulations/colorBlindness/content.js' });

  chrome.tabs.insertCSS({ file: 'simulations/colorBlindness/totalColorBlindness/css/main.css' });
}


},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yellowBlueColorBlindness = yellowBlueColorBlindness;
function yellowBlueColorBlindness() {

  chrome.tabs.executeScript({ file: 'simulations/colorBlindness/content.js' });

  chrome.tabs.insertCSS({ file: 'simulations/colorBlindness/yellowBlueColorBlindness/css/main.css' });
}


},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concentration = concentration;
function concentration() {

  chrome.tabs.executeScript({ file: 'simulations/concentration/content.js' });

  chrome.tabs.insertCSS({
    file: "simulations/concentration/css/main.css"
  });
}


},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dyslexia = dyslexia;
function dyslexia() {
  chrome.tabs.executeScript({ file: 'simulations/dyslexia/content.js' });
}


},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.farsightedness = farsightedness;
//content scripts

function farsightedness(e) {
  chrome.tabs.insertCSS({
    file: "simulations/farsightedness/css/main.css"
  });
}


},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset = reset;
//general

function reset() {
  chrome.tabs.insertCSS({
    file: "simulations/general/reset/main.css"
  });

  chrome.tabs.executeScript({
    file: "simulations/general/reset/content.js"
  });
}


},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parkinsons = parkinsons;
function parkinsons() {

  chrome.tabs.executeScript({ file: 'simulations/parkinsons/content.js' });

  chrome.tabs.insertCSS({
    file: "simulations/parkinsons/css/main.css"
  });
}


},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tunnelVision = tunnelVision;
function tunnelVision() {

  chrome.tabs.executeScript({ file: 'simulations/tunnelVision/content.js' });

  chrome.tabs.insertCSS({
    file: "simulations/tunnelVision/css/main.css"
  });
}


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxVSVxcYXBwLmpzIiwiYnVpbGQvanMvYmFiZWwvVUkvZGF0YS9kYXRhLmpzb24iLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcY29sb3JCbGluZG5lc3NcXHJlZEdyZWVuQ29sb3JCbGluZG5lc3NcXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXGNvbG9yQmxpbmRuZXNzXFx0b3RhbENvbG9yQmxpbmRuZXNzXFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxjb2xvckJsaW5kbmVzc1xceWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxjb25jZW50cmF0aW9uXFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxkeXNsZXhpYVxcaW5kZXguanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcZmFyc2lnaHRlZG5lc3NcXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXGdlbmVyYWxcXHJlc2V0XFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxwYXJraW5zb25zXFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFx0dW5uZWxWaXNpb25cXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsSUFBSSxTQUFTLFFBQVEsa0NBQVIsQ0FBYjs7QUFFQSxJQUFJLFVBQVUsUUFBUSx1Q0FBUixDQUFkOztBQUVBLElBQUksVUFBVSxRQUFRLHdDQUFSLENBQWQ7O0FBRUEsSUFBSSxVQUFVLFFBQVEsc0NBQVIsQ0FBZDs7QUFFQSxJQUFJLFVBQVUsUUFBUSwrREFBUixD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c0I7QUFDcEIsVUFBTTtBQURjLEdBQXRCO0FBR0Q7QUFDRDs7O0FDYkE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxRQUFRLEtBQVIsR0FBZ0IsS0FBaEI7QUFDQTs7QUFFQSxTQUFTLEtBQVQsR0FBaUI7QUFDZixTQUFPLElBQVAsQ0FBWSxTQUFaLENBQXNCO0FBQ3BCLFVBQU07QUFEYyxHQUF0Qjs7QUFJQSxTQUFPLElBQVAsQ0FBWSxhQUFaLENBQTBCO0FBQ3hCLFVBQU07QUFEa0IsR0FBMUI7QUFHRDtBQUNEOzs7QUNqQkE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxRQUFRLFVBQVIsR0FBcUIsVUFBckI7QUFDQSxTQUFTLFVBQVQsR0FBc0I7O0FBRXBCLFNBQU8sSUFBUCxDQUFZLGFBQVosQ0FBMEIsRUFBRSxNQUFNLG1DQUFSLEVBQTFCOztBQUVBLFNBQU8sSUFBUCxDQUFZLFNBQVosQ0FBc0I7QUFDcEIsVUFBTTtBQURjLEdBQXRCO0FBR0Q7QUFDRDs7O0FDZEE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxRQUFRLFlBQVIsR0FBdUIsWUFBdkI7QUFDQSxTQUFTLFlBQVQsR0FBd0I7O0FBRXRCLFNBQU8sSUFBUCxDQUFZLGFBQVosQ0FBMEIsRUFBRSxNQUFNLHFDQUFSLEVBQTFCOztBQUVBLFNBQU8sSUFBUCxDQUFZLFNBQVosQ0FBc0I7QUFDcEIsVUFBTTtBQURjLEdBQXRCO0FBR0Q7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfaW5kZXggPSByZXF1aXJlKCcuLi9zaW11bGF0aW9ucy9keXNsZXhpYS9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4MiA9IHJlcXVpcmUoJy4uL3NpbXVsYXRpb25zL2dlbmVyYWwvcmVzZXQvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDMgPSByZXF1aXJlKCcuLi9zaW11bGF0aW9ucy9mYXJzaWdodGVkbmVzcy9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4NCA9IHJlcXVpcmUoJy4uL3NpbXVsYXRpb25zL3R1bm5lbFZpc2lvbi9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4NSA9IHJlcXVpcmUoJy4uL3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL3JlZEdyZWVuQ29sb3JCbGluZG5lc3MvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDYgPSByZXF1aXJlKCcuLi9zaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy95ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3MvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDcgPSByZXF1aXJlKCcuLi9zaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy90b3RhbENvbG9yQmxpbmRuZXNzL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXg4ID0gcmVxdWlyZSgnLi4vc2ltdWxhdGlvbnMvY29uY2VudHJhdGlvbi9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4OSA9IHJlcXVpcmUoJy4uL3NpbXVsYXRpb25zL3BhcmtpbnNvbnMvaW5kZXguanMnKTtcblxudmFyIF9kYXRhID0gcmVxdWlyZSgnLi9kYXRhL2RhdGEuanNvbicpO1xuXG52YXIgZGF0YSA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9kYXRhKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuLy8gaW1wb3J0IHtsb2FkaW5nTW9kYWx9IGZyb20gJy4uL3NpbXVsYXRpb25zL2dlbmVyYWwvbG9hZGluZy9pbmRleC5qcydcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICB2YXIgdG9vbHRpcCA9ICQoXCIudG9vbC10aXBcIik7XG4gIHZhciBpbmZvSGVhZGluZyA9ICQoXCIuZGlzYWJpbGl0eS1pbmZvLWhlYWRpbmdcIik7XG4gIHZhciBpbmZvUGFyYWdyYXBoID0gJChcIi5kaXNhYmlsaXR5LWluZm8tcGFyYWdyYXBoXCIpO1xuICB2YXIgYWR2aWNlTGlzdCA9ICQoXCIuYWR2aWNlLWxpc3RcIik7XG4gIHZhciBtb3JlSW5mb0xpbmsgPSAkKFwiLm1vcmUtaW5mby1saW5rXCIpO1xuICB2YXIgbW9yZUluZm9QYW5lbCA9ICQoXCIjbW9yZS1pbmZvLXBhbmVsXCIpO1xuICB2YXIgcmVzZXRCdG4gPSAkKFwiI3Jlc2V0LWJ0blwiKTtcbiAgdmFyIG5hdmJhckhlYWRlciA9ICQoXCIubmF2YmFyLWhlYWRlclwiKTtcbiAgdmFyIHJlc2V0QnRuVGV4dCA9IGRhdGEuVUlbMF0ucmVzZXRCdG5UZXh0O1xuICB2YXIgbmF2YmFySGVhZGVyVGV4dCA9IGRhdGEuVUlbMF0ubmF2YmFySGVhZGVyVGV4dDtcbiAgdmFyIHNpbXVsYXRpb25IZWFkaW5nVGV4dCA9IGRhdGEuVUlbMF0uc2ltdWxhdGlvbnNbMF0uaGVhZGluZztcbiAgdmFyIGFkdmljZURyb3Bkb3duID0gJChcIiNhZHZpY2UtZHJvcGRvd25cIik7XG4gIHZhciBhZHZpY2VEcm9wZG93blRleHQgPSBkYXRhLlVJWzBdLmFkdmljZURyb3Bkb3duVGV4dDtcbiAgdmFyIGluZm9Ecm9wZG93biA9ICQoXCIjaW5mby1kcm9wZG93blwiKTtcbiAgdmFyIGluZm9Ecm9wZG93blRleHQgPSBkYXRhLlVJWzBdLmluZm9Ecm9wZG93blRleHQ7XG5cbiAgdmFyIGFjdGl2ZVNpbXVsYXRpb24gPSB2b2lkIDA7XG5cbiAgLy9BcHBlbmQgVUkgdGV4dHNcblxuICBuYXZiYXJIZWFkZXIudGV4dChuYXZiYXJIZWFkZXJUZXh0KTtcbiAgcmVzZXRCdG4udGV4dChyZXNldEJ0blRleHQpO1xuICBpbmZvRHJvcGRvd24udGV4dChpbmZvRHJvcGRvd25UZXh0KTtcbiAgYWR2aWNlRHJvcGRvd24udGV4dChhZHZpY2VEcm9wZG93blRleHQpO1xuXG4gICQuZWFjaChkYXRhLlVJWzBdLnNpbXVsYXRpb25zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcblxuICAgICQoJyMnICsgdmFsdWUuaGVhZGluZykudGV4dCh2YWx1ZS5oZWFkaW5nKTtcblxuICAgICQuZWFjaCh2YWx1ZS5jaG9pY2VzLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgICAgICAkKCcjJyArIGtleSkudGV4dCh2YWx1ZVtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgLy9tZW51IGJ1dHRvbiBjbGlja1xuXG4gICQoXCIubWVudS1idG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIG1lbnVCdG4gPSAkKHRoaXMpO1xuICAgIHZhciBtZW51QnRuSWQgPSBtZW51QnRuWzBdLmlkO1xuICAgIHZhciBpZCA9IG1lbnVCdG4uYXR0cihcImlkXCIpO1xuICAgIHZhciBmYWN0ID0gZGF0YS5mYWN0cy5maW5kKGZpbmRQcm9wZXJ0eSkuZmFjdDtcbiAgICB2YXIgbGlzdEl0ZW1zID0gZGF0YS5mYWN0cy5maW5kKGZpbmRQcm9wZXJ0eSkubGlzdEl0ZW1zO1xuICAgIHZhciBtb3JlSW5mbyA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLm1vcmVJbmZvTGlua1RleHQ7XG4gICAgdmFyIG1vcmVJbmZvVXJsID0gZGF0YS5mYWN0cy5maW5kKGZpbmRQcm9wZXJ0eSkubW9yZUluZm9Vcmw7XG5cbiAgICBmdW5jdGlvbiBmaW5kUHJvcGVydHkoc2ltdWxhdGlvbnMpIHtcbiAgICAgIHJldHVybiBzaW11bGF0aW9ucy5uYW1lID09PSBpZDtcbiAgICB9XG5cbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtcbiAgICAgIHBhdGg6IFwiaW1nL2ljb25fYWN0aXZlLnBuZ1wiXG4gICAgfSk7XG5cbiAgICBhY3RpdmVTaW11bGF0aW9uID0gbWVudUJ0bklkO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7ICdhY3RpdmVTaW11bGF0aW9uJzogbWVudUJ0bklkIH0pO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7ICdsaW5rVXJsJzogbW9yZUluZm9VcmwgfSk7XG5cbiAgICBpbmZvSGVhZGluZy5lbXB0eSgpO1xuICAgIGluZm9QYXJhZ3JhcGguZW1wdHkoKTtcbiAgICBhZHZpY2VMaXN0LmVtcHR5KCk7XG4gICAgbW9yZUluZm9MaW5rLmVtcHR5KCk7XG4gICAgbW9yZUluZm9QYW5lbC5oaWRlKCk7XG5cbiAgICB0b29sdGlwLmFuaW1hdGUoe1xuICAgICAgbGVmdDogcGFyc2VJbnQodG9vbHRpcC5jc3MoJ2xlZnQnKSwgMTApID09IDAgPyAtdG9vbHRpcC5vdXRlcldpZHRoKCkgOiAwXG4gICAgfSk7XG5cbiAgICBpbmZvSGVhZGluZy5hcHBlbmQobWVudUJ0bi50ZXh0KCkpO1xuXG4gICAgbWVudUJ0bi5jbG9zZXN0KFwiLmRyb3Bkb3duXCIpLmZpbmQoXCIuc2VsZWN0ZWRcIikudGV4dChtZW51QnRuLnRleHQoKSk7XG5cbiAgICBpbmZvUGFyYWdyYXBoLmFwcGVuZChmYWN0KTtcblxuICAgICQuZWFjaChsaXN0SXRlbXMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuICAgICAgYWR2aWNlTGlzdC5hcHBlbmQoJzxsaT4nICsgdmFsdWUgKyAnPC9saT4nKTtcbiAgICB9KTtcblxuICAgIGlmIChtb3JlSW5mbykge1xuICAgICAgbW9yZUluZm9QYW5lbC5zaG93KCk7XG4gICAgICBtb3JlSW5mb0xpbmsuYXBwZW5kKG1vcmVJbmZvKTtcbiAgICB9XG5cbiAgICBtb3JlSW5mb0xpbmsuYXR0cihcImhyZWZcIiwgJycgKyBtb3JlSW5mb1VybCk7XG5cbiAgICAvLyBsb2FkaW5nTW9kYWwoKTtcblxuICAgIHJ1bnRTaW11bGF0aW9uKCk7XG4gIH0pO1xuXG4gIC8vd2hlbiBsb2FkaW5nIG1vZGFsIGlzIGNsb3NlZCwgc2hvdyBjaG9zZW4gc2ltdWxhdGlvblxuXG4gIGZ1bmN0aW9uIHJ1bnRTaW11bGF0aW9uKCkge1xuXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuXG4gICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJmYXJzaWdodGVkbmVzc1wiKSB7XG4gICAgICAgICgwLCBfaW5kZXgzLmZhcnNpZ2h0ZWRuZXNzKSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJ0dW5uZWxWaXNpb25cIikge1xuICAgICAgICAoMCwgX2luZGV4NC50dW5uZWxWaXNpb24pKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmouYWN0aXZlU2ltdWxhdGlvbiA9PSBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIikge1xuICAgICAgICAoMCwgX2luZGV4NS5yZWRHcmVlbkNvbG9yQmxpbmRuZXNzKSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIikge1xuICAgICAgICAoMCwgX2luZGV4Ni55ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3MpKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmouYWN0aXZlU2ltdWxhdGlvbiA9PSBcInRvdGFsQ29sb3JCbGluZG5lc3NcIikge1xuICAgICAgICAoMCwgX2luZGV4Ny50b3RhbENvbG9yQmxpbmRuZXNzKSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJjb25jZW50cmF0aW9uXCIpIHtcbiAgICAgICAgKDAsIF9pbmRleDguY29uY2VudHJhdGlvbikoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwicGFya2luc29uc1wiKSB7XG4gICAgICAgICgwLCBfaW5kZXg5LnBhcmtpbnNvbnMpKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmouYWN0aXZlU2ltdWxhdGlvbiA9PSBcImR5c2xleGlhXCIpIHtcbiAgICAgICAgc3RhcnRTaW11bGF0aW9uKCdkeXNsZXhpYScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy9yZXNldCBleHRlbnNpb25cblxuICBmdW5jdGlvbiByZXNldFNpbXVsYXRpb24oKSB7XG5cbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtcbiAgICAgIHBhdGg6IFwiaW1nL2ljb24ucG5nXCJcbiAgICB9KTtcblxuICAgIHRvb2x0aXAuYW5pbWF0ZSh7XG4gICAgICBsZWZ0OiBwYXJzZUludCh0b29sdGlwLmNzcygnbWFyZ2luTGVmdCcpLCAxMCkgPT0gMCA/IHRvb2x0aXAub3V0ZXJXaWR0aCgpIDogMFxuICAgIH0pO1xuXG4gICAgJChcIiNTeW5cIikudGV4dChcIlN5blwiKTtcbiAgICAkKFwiI01vdG9yaWtcIikudGV4dChcIk1vdG9yaWtcIik7XG5cbiAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFic1swXS5pZCwgeyBhY3Rpb246ICdzdG9wU2ltdWxhdGlvbicsIHNpbXVsYXRpb246IGFjdGl2ZVNpbXVsYXRpb24gfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBhY3RpdmVTaW11bGF0aW9uID0gbnVsbDtcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKCdhY3RpdmVTaW11bGF0aW9uJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHJlc2V0KCk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0U2ltdWxhdGlvbihzaW11bGF0aW9uKSB7XG4gICAgY29uc29sZS5sb2coJ3N0YXJ0U2ltdWxhdGlvbicpO1xuICAgICgwLCBfaW5kZXguZHlzbGV4aWEpKCk7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHsgYWN0aW9uOiAnc3RhcnRTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogc2ltdWxhdGlvbiB9LCBmdW5jdGlvbiAoKSB7fSk7XG4gICAgfSk7XG4gIH1cblxuICAvL2J0biBhbmQgbGlua3NcblxuICAkKFwiI3Jlc2V0LWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgcmVzZXRTaW11bGF0aW9uKCk7XG4gIH0pO1xuXG4gICQoXCIuZ2l0aHViLWxpbmtcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9NZXRhbWF0cml4L1dlYi1EaXNhYmlsaXR5LVNpbXVsYXRvcicgfSk7XG4gIH0pO1xuXG4gICQoXCIubW9yZS1pbmZvLWxpbmtcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnbGlua1VybCcsIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogJycgKyBvYmoubGlua1VybCB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy9wYW5lbCBjb2xsYXBzZSwgc2hvdyBhcnJvd3M6IFxuXG4gICQoJy5jb2xsYXBzZScpLm9uKCdzaG93bi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCIuZG93bi1hcnJvdywgLnVwLWFycm93XCIpLnRvZ2dsZSgpO1xuICB9KS5vbignaGlkZGVuLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucGFyZW50KCkuZmluZChcIi5kb3duLWFycm93LCAudXAtYXJyb3dcIikudG9nZ2xlKCk7XG4gIH0pO1xuXG4gIC8va2VlcCBjaG9zZW4gc2ltdWxhdGlvbiBmYWN0IHRvb2x0aXAgd2hlbiBleHRlbnNpb24gaXMgY2xvc2VkIGFuZCBvcGVuZWQgYWdhaW4uIFxuXG4gIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2FjdGl2ZVNpbXVsYXRpb24nLCBmdW5jdGlvbiAob2JqKSB7XG5cbiAgICAgIHZhciBhY3RpdmVTaW11bGF0aW9uID0gb2JqLmFjdGl2ZVNpbXVsYXRpb247XG5cbiAgICAgIGZ1bmN0aW9uIGZpbmRQcm9wZXJ0eShzaW11bGF0aW9ucykge1xuICAgICAgICByZXR1cm4gc2ltdWxhdGlvbnMubmFtZSA9PT0gYWN0aXZlU2ltdWxhdGlvbjtcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGl2ZVNpbXVsYXRpb24gIT0gbnVsbCkge1xuXG4gICAgICAgIHRvb2x0aXAuY3NzKFwibGVmdFwiLCBcIjBcIik7XG5cbiAgICAgICAgaW5mb0hlYWRpbmcuYXBwZW5kKCQoJyMnICsgYWN0aXZlU2ltdWxhdGlvbikudGV4dCgpKTtcblxuICAgICAgICAkKCcjJyArIGFjdGl2ZVNpbXVsYXRpb24pLmNsb3Nlc3QoXCIuZHJvcGRvd25cIikuZmluZChcIi5zZWxlY3RlZFwiKS50ZXh0KCQoJyMnICsgYWN0aXZlU2ltdWxhdGlvbikudGV4dCgpKTtcblxuICAgICAgICB2YXIgaWQgPSAkKCcjJyArIGFjdGl2ZVNpbXVsYXRpb24pLmF0dHIoXCJpZFwiKTtcblxuICAgICAgICB2YXIgZmFjdCA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLmZhY3Q7XG4gICAgICAgIHZhciBsaXN0SXRlbXMgPSBkYXRhLmZhY3RzLmZpbmQoZmluZFByb3BlcnR5KS5saXN0SXRlbXM7XG4gICAgICAgIHZhciBtb3JlSW5mbyA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLm1vcmVJbmZvTGlua1RleHQ7XG4gICAgICAgIHZhciBtb3JlSW5mb1VybCA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLm1vcmVJbmZvVXJsO1xuXG4gICAgICAgIGluZm9QYXJhZ3JhcGguYXBwZW5kKGZhY3QpO1xuXG4gICAgICAgICQuZWFjaChsaXN0SXRlbXMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuICAgICAgICAgIGFkdmljZUxpc3QuYXBwZW5kKCc8bGk+JyArIHZhbHVlICsgJzwvbGk+Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtb3JlSW5mbykge1xuICAgICAgICAgIG1vcmVJbmZvUGFuZWwuc2hvdygpO1xuICAgICAgICAgIG1vcmVJbmZvTGluay5hcHBlbmQobW9yZUluZm8pO1xuICAgICAgICB9XG5cbiAgICAgICAgbW9yZUluZm9MaW5rLmF0dHIoXCJocmVmXCIsICcnICsgbW9yZUluZm9VcmwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAuanMubWFwXG4iLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgXCJmYWN0c1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIFwibmFtZVwiOiBcImR5c2xleGlhXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIkR5c2xleGkgw6RyIGVuIG5lZHPDpHR0bmluZyBzb20gZ8O2ciBhdHQgaGrDpHJuYW4gaGFyIHN2w6VydCBhdHQgYXV0b21hdGlzZXJhIHRvbGtuaW5nZW4gYXYgb3JkLiBEZXR0YSBnw7ZyIGF0dCBwZXJzb25lciBtZWQgZGVubmEgbmVkc8OkdHRuaW5nIGthbiBoYSBzdsOlcnQgYXR0IGzDpHNhIG9jaCBza3JpdmEuIER5c2xleGkgw6RyIGludGUga29wcGxhdCB0aWxsIHN5biBlbGxlciBpbnRlbGxpZ2Vucy4gT3JzYWtlcm5hIHRpbGwgZHlzbGV4aSDDpHIgZm9ydGZhcmFuZGUgb2tsYXJ0LlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJVbmR2aWsgdGV4dCBpIGxpdGVuIHN0b3JsZWsgb2NoIGzDpW5nYSB0ZXh0ZXIuIFNlIHRpbGwgYXR0IGhhIG9yZGVudGxpZ3QgbWVkIHJhZGF2c3TDpW5kLlwiLCBcdFxyXG4gICAgICAgIFwiVW5kdmlrIHN2w6VyYSBvcmQgb2NoIGZhY2t0ZXJtZXIuXCIsXHJcbiAgICAgICAgXCJFcmJqdWQgbMOkdHRsw6RzdGEgdmVyc2lvbmVyIGF2IGZhY2t0ZXh0ZXIuXCIsXHJcbiAgICAgICAgXCJVbmR2aWsgdHlwc25pdHQgbWVkIGtyw6VuZ2xpZ2Egb2NoIGtvbXBsZXhhIGZpZ3VyZXIuXCJcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJwYXJraW5zb25zXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlZpZCBQYXJraW5zb25zIHNqdWtkb20gZsO2cnN0w7ZycyBjZWxsZXJuYSBpIGhqw6RybmFuIHNvbSB0aWxsdmVya2FyIGRvcGFtaW4gdmlsa2V0IGfDtnIgYXR0IGhqw6RybmFuIGbDpXIgZW4gbmVkc2F0dCBmw7ZybcOlZ2EgYXR0IHNraWNrYSBzaWduYWxlci4gUGVyc29uZXIgbWVkIFBhcmtpbnNvbnMga2FuIGRyYWJiYXMgYXYgc3ltcHRvbSBzb20gc2tha25pbmdhciwgc3RlbGEgbXVza2xlciBvY2ggc8OkbXJlIHLDtnJlbHNlZsO2cm3DpWdhLiBPcnNha2VybmEgdGlsbCBQYXJraW5zb25zIHNqdWtkb20gw6RyIGZvcnRmYXJhbmRlIG9rbGFydC5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiU2UgdGlsbCBhdHQgd2ViYnBsYXRzZW4ga2FuIGFudsOkbmRhcyBtZWQgYW5kcmEgaGrDpGxwbWVkZWwgw6RuIG11cywgdGlsbCBleGVtcGVsIHRhbmdlbnRib3Jkc25hdmlnZXJpbmcuXCIsIFx0XHJcbiAgICAgICAgXCJIYSB0aWxscsOkY2tsaWd0IG1lZCBsdWZ0IG1lbGxhbiBrb21wb25lbnRlclwiLFxyXG4gICAgICAgIFwiSGEgdGlsbHLDpGNrbGlndCBzdG9yYSBrbGlja3l0b3IuXCIsXHJcbiAgICAgICAgXCJVbmR2aWsgdHlwc25pdHQgbWVkIGtyw6VuZ2xpZ2Egb2NoIGtvbXBsZXhhIGZpZ3VyZXIuXCJcclxuICAgICAgXSxcclxuICAgICAgXCJtb3JlSW5mb1VybFwiOiBcImh0dHA6Ly93d3cucGFya2luc29uZm9yYnVuZGV0LnNlXCIsXHJcbiAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJQYXJraW5zb25zZsO2cmJ1bmRldFwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIixcclxuICAgICAgXCJmYWN0XCI6IFwiUGVyc29uZXIgbWVkIGRlZmVrdCBmw6RyZ3NlZW5kZSBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHRhcHBhciBzb20gdGFyIHVwcCBmw6RyZ2VybmEgdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE7DpHIgZW4gZWxsZXIgZmxlcmEgYXYgdGFwcGFybmEgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhIGxlZGVyIGRldCB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZS4gR3VsLWJsw6UgZsOkcmdibGluZGhldCAoVHJpdGFub3BpKSDDpHIgc8OkbGxzeW50LiBOYW1uZXQgw6RyIG1pc3NsZWRhbmRlIGTDpSBkZXQgaW50ZSDDpHIgZsOkcmdlcm5hIGd1bCBvY2ggYmzDpSBzb20gZsO2cnbDpHhsYXMsIHV0YW4gYmzDpSBtZWQgZ3LDtm4gb2NoIGd1bCBtZWQgbGlsYS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBkZXQgZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCBlbiByw7ZkIHJhbSB1dGFuIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IG9jaCBnw6RybmEgZW4gaWtvbi5cIiwgXHRcclxuICAgICAgICBcIkVyYmp1ZCBnw6RybmEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxyXG4gICAgICBdLFxyXG4gICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cHM6Ly9zdi53aWtpcGVkaWEub3JnL3dpa2kvRGVmZWt0X2YlQzMlQTRyZ3NlZW5kZVwiLFxyXG4gICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2lraXBlZGlhIG9tIGRlZmVrdCBmw6RyZ3NlZW5kZVwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBkZWZla3QgZsOkcmdzZWVuZGUgaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0YXBwYXIgc29tIHRhciB1cHAgZsOkcmdlcm5hIHZpb2xldHQsIGdyw7ZuIG9jaCByw7ZkLiBOw6RyIGVuIGVsbGVyIGZsZXJhIGF2IHRhcHBhcm5hIHNha25hcyBlbGxlciDDpHIgZGVmZWt0YSBsZWRlciBkZXQgdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUuIFLDtmQtZ3LDtm4gZsOkcmdibGluZGhldCAoUHJvdGFub3BpIG9jaCBEZXV0ZXJhbm9waSkgw6RyIGRlbiB2YW5saWdhc3RlIHR5cGVuIGF2IGbDpHJnYmxpbmRoZXQuIERlbiDDpHIgdmFubGlnYXJlIGhvcyBtw6RuIMOkbiBrdmlubm9yLiBQZXJzb25lciByw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXQgaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSBmw6RyZ2VybmEgcsO2ZCwgZ3LDtm4sIGJydW4gb2NoIG9yYW5nZS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1wiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBlbmRhIHPDpHR0ZXQgYXR0IGbDtnJtZWRsYSBpbmZvcm1hdGlvbiwgaW5kaWtlcmEgZW4gaGFuZGxpbmcgZWxsZXIgaWRlbnRpZmllcmEgZXR0IGVsZW1lbnQuIE1hcmtlcmEgdGlsbCBleGVtcGVsIGludGUgZXR0IGZlbGFrdGlndCBmb3JtdWzDpHJmw6RsdCBlbmRhc3QgbWVkIHLDtmQgcmFtLCBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBvY2ggZ8Okcm5hIGVuICBpa29uLlwiLCBcIkVyYmp1ZCBnw6RybmEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIl0sXHJcbiAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwczovL3N2Lndpa2lwZWRpYS5vcmcvd2lraS9EZWZla3RfZiVDMyVBNHJnc2VlbmRlXCIsXHJcbiAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJXaWtpcGVkaWEgb20gZGVmZWt0IGbDpHJnc2VlbmRlXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIFwibmFtZVwiOiBcImZhcnNpZ2h0ZWRuZXNzXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBIeXBlcm9waSBzZXIgc3VkZGlndCBww6UgbsOkcmEgaMOlbGwsIG1lbiBicmEgcMOlIGzDpW5ndCBow6VsbC4gTmVkc8OkdHRuaW5nZW4gdXBwc3TDpXIgcMOlIGdydW5kIGF2IGF0dCBsanVzZXQgaW50ZSBicnl0cyByw6R0dCBpIMO2Z2F0LiBEZXQgw6RyIGVuIGF2IGRlIHZhbmxpZ2FzdGUgc3lubmVkc8OkdHRuaW5nYXJuYS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrLlwiLCBcdFxyXG4gICAgICAgIFwiV2ViYnNpZGFuIHNrYSBnw6UgYXR0IGbDtnJzdG9yYSAoem9vbWFzKSB0aWxsIG1pbnN0IDIwMCAlIHPDpSBhdHQgYmVzw7ZrYXJlbiBrYW4gYW5wYXNzYSBpbm5laMOlbGxldHMgc3RvcmxlayBlZnRlciBzaW5hIGJlaG92LlwiLFxyXG4gICAgICAgIFwiRXJianVkIHVwcGzDpHNuaW5nIGF2IGlubmVow6VsbGV0LlwiXHJcbiAgICAgIF0sXHJcbiAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwczovL3dlYmJyaWt0bGluamVyLnNlL3IvMzktZ2Utd2ViYnBsYXRzZW4tZW4tZ29kLWxhc2JhcmhldC9cIixcclxuICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldlYmJyaWt0bGluamUgR2Ugd2ViYnBsYXRzZW4gZ29kIGzDpHNiYXJoZXRcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJuYW1lXCI6IFwidG90YWxDb2xvckJsaW5kbmVzc1wiLFxyXG4gICAgICBcImZhY3RcIjogXCJEZWZla3QgZsOkcmdzZWVuZGUgaW5uZWLDpHIgYXR0IGVuIHBlcnNvbiBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHR5cGVyIGF2IHRhcHBhciBzb20gdGFyIHVwcCBvbGlrYSBmw6RyZ2VyOiB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gT3JzYWtlbiB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZSDDpHIgYXR0IGVuIGVsbGVyIGZsZXJhIGF2IGRlc3NhIHR5cGVyIGF2IHRhcHBhciBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEuIEhlbHQgZsOkcmdibGluZCAoTW9ub2tyb21hc2kvYWtyb21hdG9wc2kpIMOkciBteWNrZXQgc8OkbGxzeW50LiBQZXJzb25lciBtZWQgZGVubmEgc3lubmVkc8OkdHRuaW5nIHNlciBpbmdhIGbDpHJnZXIgdXRhbiBzZXIgZW5kYXN0IGkgZ3LDpXNrYWxhLlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJBbnbDpG5kIGludGUgZsOkcmcgc29tIGRldCBlbmRhIHPDpHR0ZXQgYXR0IGbDtnJtZWRsYSBpbmZvcm1hdGlvbiwgaW5kaWtlcmEgZW4gaGFuZGxpbmcgZWxsZXIgaWRlbnRpZmllcmEgZWxlbWVudC4gTWFya2VyYSB0LmV4LiBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCByw7ZkIHJhbSwga29tcGxldHRlcmEgw6R2ZW4gbWVkIHRleHQgZWxsZXIgaWtvbi5cIiwgXHRcclxuICAgICAgICBcIkRldCBrYW4gdmFyYSBlbiBicmEgaWTDqSBhdHQgZXJianVkYSBldHQgaMO2Z2tvbnRyYXN0LWzDpGdlLlwiXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIFwibmFtZVwiOiBcInR1bm5lbFZpc2lvblwiLFxyXG4gICAgICBcImZhY3RcIjogXCJUdW5uZWxzZWVuZGUgaW5uZWLDpHIuLi5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiTGlzdGl0ZW0gMVwiLCBcdFxyXG4gICAgICAgIFwiTGlzdGl0ZW0gMi5cIlxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJjb25jZW50cmF0aW9uXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIktvbmNlbnRyYXRpb25zc3bDpXJpZ2hldGVyIGlubmViw6RyLi4uXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIkxpc3RpdGVtIDFcIiwgXHRcclxuICAgICAgICBcIkxpc3RpdGVtIDIuXCJcclxuICAgICAgXVxyXG4gICAgfVxyXG4gIF0sXHJcbiAgXCJVSVwiOiBbe1xyXG4gICAgXCJuYXZiYXJIZWFkZXJUZXh0XCI6IFwiVsOkbGogZnVua3Rpb25zbmVkc8OkdHRuaW5nOlwiLFxyXG4gICAgXCJyZXNldEJ0blRleHRcIjogXCLDhXRlcnN0w6RsbFwiLFxyXG4gICAgXCJhZHZpY2VEcm9wZG93blRleHRcIjogXCJUw6RuayBww6UgZGV0dGFcIixcclxuICAgIFwiaW5mb0Ryb3Bkb3duVGV4dFwiOiBcIk1lciBpbmZvcm1hdGlvblwiLFxyXG4gICAgXCJzaW11bGF0aW9uc1wiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJTeW5cIixcclxuICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgeyBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJIZWx0IGbDpHJnYmxpbmRcIiB9LFxyXG4gICAgICAgICAgeyBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIiB9LFxyXG4gICAgICAgICAgeyBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXRcIiB9LFxyXG4gICAgICAgICAgeyBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiTMOlbmdzeW50aGV0LCDDtnZlcnN5bnRoZXRcIiB9LFxyXG4gICAgICAgICAgeyBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbHNlZW5kZVwiIH1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJNb3RvcmlrXCIsXHJcbiAgICAgICAgXCJjaG9pY2VzXCI6IFsgXHJcbiAgICAgICAgICB7IFwicGFya2luc29uc1wiOiBcIlBhcmtpbnNvbnNcIiB9XHJcbiAgXHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJEeXNsZXhpXCIsXHJcbiAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJLb25jZW50cmF0aW9uXCIsXHJcbiAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJNaW5uZVwiLFxyXG4gICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICB9XHJcblxyXG4gICAgXVxyXG4gIH1dXHJcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJlZEdyZWVuQ29sb3JCbGluZG5lc3MgPSByZWRHcmVlbkNvbG9yQmxpbmRuZXNzO1xuZnVuY3Rpb24gcmVkR3JlZW5Db2xvckJsaW5kbmVzcygpIHtcblxuICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHsgZmlsZTogJ3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL2NvbnRlbnQuanMnIH0pO1xuXG4gIGNocm9tZS50YWJzLmluc2VydENTUyh7IGZpbGU6ICdzaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy9yZWRHcmVlbkNvbG9yQmxpbmRuZXNzL2Nzcy9tYWluLmNzcycgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMudG90YWxDb2xvckJsaW5kbmVzcyA9IHRvdGFsQ29sb3JCbGluZG5lc3M7XG5mdW5jdGlvbiB0b3RhbENvbG9yQmxpbmRuZXNzKCkge1xuXG4gIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoeyBmaWxlOiAnc2ltdWxhdGlvbnMvY29sb3JCbGluZG5lc3MvY29udGVudC5qcycgfSk7XG5cbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHsgZmlsZTogJ3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL3RvdGFsQ29sb3JCbGluZG5lc3MvY3NzL21haW4uY3NzJyB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy55ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3MgPSB5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3M7XG5mdW5jdGlvbiB5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3MoKSB7XG5cbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7IGZpbGU6ICdzaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy9jb250ZW50LmpzJyB9KTtcblxuICBjaHJvbWUudGFicy5pbnNlcnRDU1MoeyBmaWxlOiAnc2ltdWxhdGlvbnMvY29sb3JCbGluZG5lc3MveWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzL2Nzcy9tYWluLmNzcycgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jb25jZW50cmF0aW9uID0gY29uY2VudHJhdGlvbjtcbmZ1bmN0aW9uIGNvbmNlbnRyYXRpb24oKSB7XG5cbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7IGZpbGU6ICdzaW11bGF0aW9ucy9jb25jZW50cmF0aW9uL2NvbnRlbnQuanMnIH0pO1xuXG4gIGNocm9tZS50YWJzLmluc2VydENTUyh7XG4gICAgZmlsZTogXCJzaW11bGF0aW9ucy9jb25jZW50cmF0aW9uL2Nzcy9tYWluLmNzc1wiXG4gIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmR5c2xleGlhID0gZHlzbGV4aWE7XG5mdW5jdGlvbiBkeXNsZXhpYSgpIHtcbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7IGZpbGU6ICdzaW11bGF0aW9ucy9keXNsZXhpYS9jb250ZW50LmpzJyB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmZhcnNpZ2h0ZWRuZXNzID0gZmFyc2lnaHRlZG5lc3M7XG4vL2NvbnRlbnQgc2NyaXB0c1xuXG5mdW5jdGlvbiBmYXJzaWdodGVkbmVzcyhlKSB7XG4gIGNocm9tZS50YWJzLmluc2VydENTUyh7XG4gICAgZmlsZTogXCJzaW11bGF0aW9ucy9mYXJzaWdodGVkbmVzcy9jc3MvbWFpbi5jc3NcIlxuICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJlc2V0ID0gcmVzZXQ7XG4vL2dlbmVyYWxcblxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gIGNocm9tZS50YWJzLmluc2VydENTUyh7XG4gICAgZmlsZTogXCJzaW11bGF0aW9ucy9nZW5lcmFsL3Jlc2V0L21haW4uY3NzXCJcbiAgfSk7XG5cbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7XG4gICAgZmlsZTogXCJzaW11bGF0aW9ucy9nZW5lcmFsL3Jlc2V0L2NvbnRlbnQuanNcIlxuICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnBhcmtpbnNvbnMgPSBwYXJraW5zb25zO1xuZnVuY3Rpb24gcGFya2luc29ucygpIHtcblxuICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHsgZmlsZTogJ3NpbXVsYXRpb25zL3BhcmtpbnNvbnMvY29udGVudC5qcycgfSk7XG5cbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHtcbiAgICBmaWxlOiBcInNpbXVsYXRpb25zL3BhcmtpbnNvbnMvY3NzL21haW4uY3NzXCJcbiAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy50dW5uZWxWaXNpb24gPSB0dW5uZWxWaXNpb247XG5mdW5jdGlvbiB0dW5uZWxWaXNpb24oKSB7XG5cbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7IGZpbGU6ICdzaW11bGF0aW9ucy90dW5uZWxWaXNpb24vY29udGVudC5qcycgfSk7XG5cbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHtcbiAgICBmaWxlOiBcInNpbXVsYXRpb25zL3R1bm5lbFZpc2lvbi9jc3MvbWFpbi5jc3NcIlxuICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIl19
