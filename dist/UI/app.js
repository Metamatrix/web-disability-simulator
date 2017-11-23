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

  chrome.tabs.executeScript({
    file: 'simulations/concentration/content.js'
  });

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

  chrome.tabs.executeScript({
    file: 'simulations/parkinsons/content.js'
  });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxVSVxcYXBwLmpzIiwiYnVpbGQvanMvYmFiZWwvVUkvZGF0YS9kYXRhLmpzb24iLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcY29sb3JCbGluZG5lc3NcXHJlZEdyZWVuQ29sb3JCbGluZG5lc3NcXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXGNvbG9yQmxpbmRuZXNzXFx0b3RhbENvbG9yQmxpbmRuZXNzXFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxjb2xvckJsaW5kbmVzc1xceWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxjb25jZW50cmF0aW9uXFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxkeXNsZXhpYVxcaW5kZXguanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcZmFyc2lnaHRlZG5lc3NcXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXGdlbmVyYWxcXHJlc2V0XFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxwYXJraW5zb25zXFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFx0dW5uZWxWaXNpb25cXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsSUFBSSxTQUFTLFFBQVEsa0NBQVIsQ0FBYjs7QUFFQSxJQUFJLFVBQVUsUUFBUSx1Q0FBUixDQUFkOztBQUVBLElBQUksVUFBVSxRQUFRLHdDQUFSLENBQWQ7O0FBRUEsSUFBSSxVQUFVLFFBQVEsc0NBQVIsQ0FBZDs7QUFFQSxJQUFJLFVBQVUsUUFBUSwrREFBUixD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QUNwQixVQUFNO0FBRGMsR0FBdEI7QUFHRDtBQUNEOzs7QUNYQTs7QUFFQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsU0FBTztBQURvQyxDQUE3QztBQUdBLFFBQVEsS0FBUixHQUFnQixLQUFoQjtBQUNBOztBQUVBLFNBQVMsS0FBVCxHQUFpQjtBQUNmLFNBQU8sSUFBUCxDQUFZLFNBQVosQ0FBc0I7QUFDcEIsVUFBTTtBQURjLEdBQXRCOztBQUlBLFNBQU8sSUFBUCxDQUFZLGFBQVosQ0FBMEI7QUFDeEIsVUFBTTtBQURrQixHQUExQjtBQUdEO0FBQ0Q7OztBQ2pCQTs7QUFFQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsU0FBTztBQURvQyxDQUE3QztBQUdBLFFBQVEsVUFBUixHQUFxQixVQUFyQjtBQUNBLFNBQVMsVUFBVCxHQUFzQjs7QUFFcEIsU0FBTyxJQUFQLENBQVksYUFBWixDQUEwQjtBQUN4QixVQUFNO0FBRGtCLEdBQTFCOztBQUlBLFNBQU8sSUFBUCxDQUFZLFNBQVosQ0FBc0I7QUFDcEIsVUFBTTtBQURjLEdBQXRCO0FBR0Q7QUFDRDs7O0FDaEJBOztBQUVBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQyxTQUFPO0FBRG9DLENBQTdDO0FBR0EsUUFBUSxZQUFSLEdBQXVCLFlBQXZCO0FBQ0EsU0FBUyxZQUFULEdBQXdCOztBQUV0QixTQUFPLElBQVAsQ0FBWSxhQUFaLENBQTBCLEVBQUUsTUFBTSxxQ0FBUixFQUExQjs7QUFFQSxTQUFPLElBQVAsQ0FBWSxTQUFaLENBQXNCO0FBQ3BCLFVBQU07QUFEYyxHQUF0QjtBQUdEO0FBQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2luZGV4ID0gcmVxdWlyZSgnLi4vc2ltdWxhdGlvbnMvZHlzbGV4aWEvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDIgPSByZXF1aXJlKCcuLi9zaW11bGF0aW9ucy9nZW5lcmFsL3Jlc2V0L2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXgzID0gcmVxdWlyZSgnLi4vc2ltdWxhdGlvbnMvZmFyc2lnaHRlZG5lc3MvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDQgPSByZXF1aXJlKCcuLi9zaW11bGF0aW9ucy90dW5uZWxWaXNpb24vaW5kZXguanMnKTtcblxudmFyIF9pbmRleDUgPSByZXF1aXJlKCcuLi9zaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy9yZWRHcmVlbkNvbG9yQmxpbmRuZXNzL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXg2ID0gcmVxdWlyZSgnLi4vc2ltdWxhdGlvbnMvY29sb3JCbGluZG5lc3MveWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXg3ID0gcmVxdWlyZSgnLi4vc2ltdWxhdGlvbnMvY29sb3JCbGluZG5lc3MvdG90YWxDb2xvckJsaW5kbmVzcy9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4OCA9IHJlcXVpcmUoJy4uL3NpbXVsYXRpb25zL2NvbmNlbnRyYXRpb24vaW5kZXguanMnKTtcblxudmFyIF9pbmRleDkgPSByZXF1aXJlKCcuLi9zaW11bGF0aW9ucy9wYXJraW5zb25zL2luZGV4LmpzJyk7XG5cbnZhciBfZGF0YSA9IHJlcXVpcmUoJy4vZGF0YS9kYXRhLmpzb24nKTtcblxudmFyIGRhdGEgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZGF0YSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbi8vIGltcG9ydCB7bG9hZGluZ01vZGFsfSBmcm9tICcuLi9zaW11bGF0aW9ucy9nZW5lcmFsL2xvYWRpbmcvaW5kZXguanMnXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIHRvb2x0aXAgPSAkKFwiLnRvb2wtdGlwXCIpO1xuICB2YXIgaW5mb0hlYWRpbmcgPSAkKFwiLmRpc2FiaWxpdHktaW5mby1oZWFkaW5nXCIpO1xuICB2YXIgaW5mb1BhcmFncmFwaCA9ICQoXCIuZGlzYWJpbGl0eS1pbmZvLXBhcmFncmFwaFwiKTtcbiAgdmFyIGFkdmljZUxpc3QgPSAkKFwiLmFkdmljZS1saXN0XCIpO1xuICB2YXIgbW9yZUluZm9MaW5rID0gJChcIi5tb3JlLWluZm8tbGlua1wiKTtcbiAgdmFyIG1vcmVJbmZvUGFuZWwgPSAkKFwiI21vcmUtaW5mby1wYW5lbFwiKTtcbiAgdmFyIHJlc2V0QnRuID0gJChcIiNyZXNldC1idG5cIik7XG4gIHZhciBuYXZiYXJIZWFkZXIgPSAkKFwiLm5hdmJhci1oZWFkZXJcIik7XG4gIHZhciByZXNldEJ0blRleHQgPSBkYXRhLlVJWzBdLnJlc2V0QnRuVGV4dDtcbiAgdmFyIG5hdmJhckhlYWRlclRleHQgPSBkYXRhLlVJWzBdLm5hdmJhckhlYWRlclRleHQ7XG4gIHZhciBzaW11bGF0aW9uSGVhZGluZ1RleHQgPSBkYXRhLlVJWzBdLnNpbXVsYXRpb25zWzBdLmhlYWRpbmc7XG4gIHZhciBhZHZpY2VEcm9wZG93biA9ICQoXCIjYWR2aWNlLWRyb3Bkb3duXCIpO1xuICB2YXIgYWR2aWNlRHJvcGRvd25UZXh0ID0gZGF0YS5VSVswXS5hZHZpY2VEcm9wZG93blRleHQ7XG4gIHZhciBpbmZvRHJvcGRvd24gPSAkKFwiI2luZm8tZHJvcGRvd25cIik7XG4gIHZhciBpbmZvRHJvcGRvd25UZXh0ID0gZGF0YS5VSVswXS5pbmZvRHJvcGRvd25UZXh0O1xuXG4gIHZhciBhY3RpdmVTaW11bGF0aW9uID0gdm9pZCAwO1xuXG4gIC8vQXBwZW5kIFVJIHRleHRzXG5cbiAgbmF2YmFySGVhZGVyLnRleHQobmF2YmFySGVhZGVyVGV4dCk7XG4gIHJlc2V0QnRuLnRleHQocmVzZXRCdG5UZXh0KTtcbiAgaW5mb0Ryb3Bkb3duLnRleHQoaW5mb0Ryb3Bkb3duVGV4dCk7XG4gIGFkdmljZURyb3Bkb3duLnRleHQoYWR2aWNlRHJvcGRvd25UZXh0KTtcblxuICAkLmVhY2goZGF0YS5VSVswXS5zaW11bGF0aW9ucywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG5cbiAgICAkKCcjJyArIHZhbHVlLmhlYWRpbmcpLnRleHQodmFsdWUuaGVhZGluZyk7XG5cbiAgICAkLmVhY2godmFsdWUuY2hvaWNlcywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICAgICAgJCgnIycgKyBrZXkpLnRleHQodmFsdWVba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vbWVudSBidXR0b24gY2xpY2tcblxuICAkKFwiLm1lbnUtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBtZW51QnRuID0gJCh0aGlzKTtcbiAgICB2YXIgbWVudUJ0bklkID0gbWVudUJ0blswXS5pZDtcbiAgICB2YXIgaWQgPSBtZW51QnRuLmF0dHIoXCJpZFwiKTtcbiAgICB2YXIgZmFjdCA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLmZhY3Q7XG4gICAgdmFyIGxpc3RJdGVtcyA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLmxpc3RJdGVtcztcbiAgICB2YXIgbW9yZUluZm8gPSBkYXRhLmZhY3RzLmZpbmQoZmluZFByb3BlcnR5KS5tb3JlSW5mb0xpbmtUZXh0O1xuICAgIHZhciBtb3JlSW5mb1VybCA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLm1vcmVJbmZvVXJsO1xuXG4gICAgZnVuY3Rpb24gZmluZFByb3BlcnR5KHNpbXVsYXRpb25zKSB7XG4gICAgICByZXR1cm4gc2ltdWxhdGlvbnMubmFtZSA9PT0gaWQ7XG4gICAgfVxuXG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7XG4gICAgICBwYXRoOiBcImltZy9pY29uX2FjdGl2ZS5wbmdcIlxuICAgIH0pO1xuXG4gICAgYWN0aXZlU2ltdWxhdGlvbiA9IG1lbnVCdG5JZDtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyAnYWN0aXZlU2ltdWxhdGlvbic6IG1lbnVCdG5JZCB9KTtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyAnbGlua1VybCc6IG1vcmVJbmZvVXJsIH0pO1xuXG4gICAgaW5mb0hlYWRpbmcuZW1wdHkoKTtcbiAgICBpbmZvUGFyYWdyYXBoLmVtcHR5KCk7XG4gICAgYWR2aWNlTGlzdC5lbXB0eSgpO1xuICAgIG1vcmVJbmZvTGluay5lbXB0eSgpO1xuICAgIG1vcmVJbmZvUGFuZWwuaGlkZSgpO1xuXG4gICAgdG9vbHRpcC5hbmltYXRlKHtcbiAgICAgIGxlZnQ6IHBhcnNlSW50KHRvb2x0aXAuY3NzKCdsZWZ0JyksIDEwKSA9PSAwID8gLXRvb2x0aXAub3V0ZXJXaWR0aCgpIDogMFxuICAgIH0pO1xuXG4gICAgaW5mb0hlYWRpbmcuYXBwZW5kKG1lbnVCdG4udGV4dCgpKTtcblxuICAgIG1lbnVCdG4uY2xvc2VzdChcIi5kcm9wZG93blwiKS5maW5kKFwiLnNlbGVjdGVkXCIpLnRleHQobWVudUJ0bi50ZXh0KCkpO1xuXG4gICAgaW5mb1BhcmFncmFwaC5hcHBlbmQoZmFjdCk7XG5cbiAgICAkLmVhY2gobGlzdEl0ZW1zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICAgIGFkdmljZUxpc3QuYXBwZW5kKCc8bGk+JyArIHZhbHVlICsgJzwvbGk+Jyk7XG4gICAgfSk7XG5cbiAgICBpZiAobW9yZUluZm8pIHtcbiAgICAgIG1vcmVJbmZvUGFuZWwuc2hvdygpO1xuICAgICAgbW9yZUluZm9MaW5rLmFwcGVuZChtb3JlSW5mbyk7XG4gICAgfVxuXG4gICAgbW9yZUluZm9MaW5rLmF0dHIoXCJocmVmXCIsICcnICsgbW9yZUluZm9VcmwpO1xuXG4gICAgLy8gbG9hZGluZ01vZGFsKCk7XG5cbiAgICBydW50U2ltdWxhdGlvbigpO1xuICB9KTtcblxuICAvL3doZW4gbG9hZGluZyBtb2RhbCBpcyBjbG9zZWQsIHNob3cgY2hvc2VuIHNpbXVsYXRpb25cblxuICBmdW5jdGlvbiBydW50U2ltdWxhdGlvbigpIHtcblxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlU2ltdWxhdGlvbicsIGZ1bmN0aW9uIChvYmopIHtcblxuICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwiZmFyc2lnaHRlZG5lc3NcIikge1xuICAgICAgICAoMCwgX2luZGV4My5mYXJzaWdodGVkbmVzcykoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwidHVubmVsVmlzaW9uXCIpIHtcbiAgICAgICAgKDAsIF9pbmRleDQudHVubmVsVmlzaW9uKSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCIpIHtcbiAgICAgICAgKDAsIF9pbmRleDUucmVkR3JlZW5Db2xvckJsaW5kbmVzcykoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCIpIHtcbiAgICAgICAgKDAsIF9pbmRleDYueWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzKSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCIpIHtcbiAgICAgICAgKDAsIF9pbmRleDcudG90YWxDb2xvckJsaW5kbmVzcykoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwiY29uY2VudHJhdGlvblwiKSB7XG4gICAgICAgICgwLCBfaW5kZXg4LmNvbmNlbnRyYXRpb24pKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmouYWN0aXZlU2ltdWxhdGlvbiA9PSBcInBhcmtpbnNvbnNcIikge1xuICAgICAgICAoMCwgX2luZGV4OS5wYXJraW5zb25zKSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJkeXNsZXhpYVwiKSB7XG4gICAgICAgIHN0YXJ0U2ltdWxhdGlvbignZHlzbGV4aWEnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vcmVzZXQgZXh0ZW5zaW9uXG5cbiAgZnVuY3Rpb24gcmVzZXRTaW11bGF0aW9uKCkge1xuXG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7XG4gICAgICBwYXRoOiBcImltZy9pY29uLnBuZ1wiXG4gICAgfSk7XG5cbiAgICB0b29sdGlwLmFuaW1hdGUoe1xuICAgICAgbGVmdDogcGFyc2VJbnQodG9vbHRpcC5jc3MoJ21hcmdpbkxlZnQnKSwgMTApID09IDAgPyB0b29sdGlwLm91dGVyV2lkdGgoKSA6IDBcbiAgICB9KTtcblxuICAgICQoXCIjU3luXCIpLnRleHQoXCJTeW5cIik7XG4gICAgJChcIiNNb3RvcmlrXCIpLnRleHQoXCJNb3RvcmlrXCIpO1xuXG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHsgYWN0aW9uOiAnc3RvcFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBhY3RpdmVTaW11bGF0aW9uIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYWN0aXZlU2ltdWxhdGlvbiA9IG51bGw7XG4gICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnJlbW92ZSgnYWN0aXZlU2ltdWxhdGlvbicpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyByZXNldCgpO1xuXG4gIH1cblxuICBmdW5jdGlvbiBzdGFydFNpbXVsYXRpb24oc2ltdWxhdGlvbikge1xuICAgIGNvbnNvbGUubG9nKCdzdGFydFNpbXVsYXRpb24nKTtcbiAgICAoMCwgX2luZGV4LmR5c2xleGlhKSgpO1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJzWzBdLmlkLCB7IGFjdGlvbjogJ3N0YXJ0U2ltdWxhdGlvbicsIHNpbXVsYXRpb246IHNpbXVsYXRpb24gfSwgZnVuY3Rpb24gKCkge30pO1xuICAgIH0pO1xuICB9XG5cbiAgLy9idG4gYW5kIGxpbmtzXG5cbiAgJChcIiNyZXNldC1idG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIHJlc2V0U2ltdWxhdGlvbigpO1xuICB9KTtcblxuICAkKFwiLmdpdGh1Yi1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6ICdodHRwczovL2dpdGh1Yi5jb20vTWV0YW1hdHJpeC9XZWItRGlzYWJpbGl0eS1TaW11bGF0b3InIH0pO1xuICB9KTtcblxuICAkKFwiLm1vcmUtaW5mby1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2xpbmtVcmwnLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6ICcnICsgb2JqLmxpbmtVcmwgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vcGFuZWwgY29sbGFwc2UsIHNob3cgYXJyb3dzOiBcblxuICAkKCcuY29sbGFwc2UnKS5vbignc2hvd24uYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLmRvd24tYXJyb3csIC51cC1hcnJvd1wiKS50b2dnbGUoKTtcbiAgfSkub24oJ2hpZGRlbi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCIuZG93bi1hcnJvdywgLnVwLWFycm93XCIpLnRvZ2dsZSgpO1xuICB9KTtcblxuICAvL2tlZXAgY2hvc2VuIHNpbXVsYXRpb24gZmFjdCB0b29sdGlwIHdoZW4gZXh0ZW5zaW9uIGlzIGNsb3NlZCBhbmQgb3BlbmVkIGFnYWluLiBcblxuICB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuXG4gICAgICB2YXIgYWN0aXZlU2ltdWxhdGlvbiA9IG9iai5hY3RpdmVTaW11bGF0aW9uO1xuXG4gICAgICBmdW5jdGlvbiBmaW5kUHJvcGVydHkoc2ltdWxhdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHNpbXVsYXRpb25zLm5hbWUgPT09IGFjdGl2ZVNpbXVsYXRpb247XG4gICAgICB9XG5cbiAgICAgIGlmIChhY3RpdmVTaW11bGF0aW9uICE9IG51bGwpIHtcblxuICAgICAgICB0b29sdGlwLmNzcyhcImxlZnRcIiwgXCIwXCIpO1xuXG4gICAgICAgIGluZm9IZWFkaW5nLmFwcGVuZCgkKCcjJyArIGFjdGl2ZVNpbXVsYXRpb24pLnRleHQoKSk7XG5cbiAgICAgICAgJCgnIycgKyBhY3RpdmVTaW11bGF0aW9uKS5jbG9zZXN0KFwiLmRyb3Bkb3duXCIpLmZpbmQoXCIuc2VsZWN0ZWRcIikudGV4dCgkKCcjJyArIGFjdGl2ZVNpbXVsYXRpb24pLnRleHQoKSk7XG5cbiAgICAgICAgdmFyIGlkID0gJCgnIycgKyBhY3RpdmVTaW11bGF0aW9uKS5hdHRyKFwiaWRcIik7XG5cbiAgICAgICAgdmFyIGZhY3QgPSBkYXRhLmZhY3RzLmZpbmQoZmluZFByb3BlcnR5KS5mYWN0O1xuICAgICAgICB2YXIgbGlzdEl0ZW1zID0gZGF0YS5mYWN0cy5maW5kKGZpbmRQcm9wZXJ0eSkubGlzdEl0ZW1zO1xuICAgICAgICB2YXIgbW9yZUluZm8gPSBkYXRhLmZhY3RzLmZpbmQoZmluZFByb3BlcnR5KS5tb3JlSW5mb0xpbmtUZXh0O1xuICAgICAgICB2YXIgbW9yZUluZm9VcmwgPSBkYXRhLmZhY3RzLmZpbmQoZmluZFByb3BlcnR5KS5tb3JlSW5mb1VybDtcblxuICAgICAgICBpbmZvUGFyYWdyYXBoLmFwcGVuZChmYWN0KTtcblxuICAgICAgICAkLmVhY2gobGlzdEl0ZW1zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICAgICAgICBhZHZpY2VMaXN0LmFwcGVuZCgnPGxpPicgKyB2YWx1ZSArICc8L2xpPicpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAobW9yZUluZm8pIHtcbiAgICAgICAgICBtb3JlSW5mb1BhbmVsLnNob3coKTtcbiAgICAgICAgICBtb3JlSW5mb0xpbmsuYXBwZW5kKG1vcmVJbmZvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1vcmVJbmZvTGluay5hdHRyKFwiaHJlZlwiLCAnJyArIG1vcmVJbmZvVXJsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gIFwiZmFjdHNcIjogW1xyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJkeXNsZXhpYVwiLFxyXG4gICAgICBcImZhY3RcIjogXCJEeXNsZXhpIMOkciBlbiBuZWRzw6R0dG5pbmcgc29tIGfDtnIgYXR0IGhqw6RybmFuIGhhciBzdsOlcnQgYXR0IGF1dG9tYXRpc2VyYSB0b2xrbmluZ2VuIGF2IG9yZC4gRGV0dGEgZ8O2ciBhdHQgcGVyc29uZXIgbWVkIGRlbm5hIG5lZHPDpHR0bmluZyBrYW4gaGEgc3bDpXJ0IGF0dCBsw6RzYSBvY2ggc2tyaXZhLiBEeXNsZXhpIMOkciBpbnRlIGtvcHBsYXQgdGlsbCBzeW4gZWxsZXIgaW50ZWxsaWdlbnMuIE9yc2FrZXJuYSB0aWxsIGR5c2xleGkgw6RyIGZvcnRmYXJhbmRlIG9rbGFydC5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrIG9jaCBsw6VuZ2EgdGV4dGVyLiBTZSB0aWxsIGF0dCBoYSBvcmRlbnRsaWd0IG1lZCByYWRhdnN0w6VuZC5cIiwgXHRcclxuICAgICAgICBcIlVuZHZpayBzdsOlcmEgb3JkIG9jaCBmYWNrdGVybWVyLlwiLFxyXG4gICAgICAgIFwiRXJianVkIGzDpHR0bMOkc3RhIHZlcnNpb25lciBhdiBmYWNrdGV4dGVyLlwiLFxyXG4gICAgICAgIFwiVW5kdmlrIHR5cHNuaXR0IG1lZCBrcsOlbmdsaWdhIG9jaCBrb21wbGV4YSBmaWd1cmVyLlwiXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJuYW1lXCI6IFwicGFya2luc29uc1wiLFxyXG4gICAgICBcImZhY3RcIjogXCJWaWQgUGFya2luc29ucyBzanVrZG9tIGbDtnJzdMO2cnMgY2VsbGVybmEgaSBoasOkcm5hbiBzb20gdGlsbHZlcmthciBkb3BhbWluIHZpbGtldCBnw7ZyIGF0dCBoasOkcm5hbiBmw6VyIGVuIG5lZHNhdHQgZsO2cm3DpWdhIGF0dCBza2lja2Egc2lnbmFsZXIuIFBlcnNvbmVyIG1lZCBQYXJraW5zb25zIGthbiBkcmFiYmFzIGF2IHN5bXB0b20gc29tIHNrYWtuaW5nYXIsIHN0ZWxhIG11c2tsZXIgb2NoIHPDpG1yZSByw7ZyZWxzZWbDtnJtw6VnYS4gT3JzYWtlcm5hIHRpbGwgUGFya2luc29ucyBzanVrZG9tIMOkciBmb3J0ZmFyYW5kZSBva2xhcnQuXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIlNlIHRpbGwgYXR0IHdlYmJwbGF0c2VuIGthbiBhbnbDpG5kYXMgbWVkIGFuZHJhIGhqw6RscG1lZGVsIMOkbiBtdXMsIHRpbGwgZXhlbXBlbCB0YW5nZW50Ym9yZHNuYXZpZ2VyaW5nLlwiLCBcdFxyXG4gICAgICAgIFwiSGEgdGlsbHLDpGNrbGlndCBtZWQgbHVmdCBtZWxsYW4ga29tcG9uZW50ZXJcIixcclxuICAgICAgICBcIkhhIHRpbGxyw6Rja2xpZ3Qgc3RvcmEga2xpY2t5dG9yLlwiLFxyXG4gICAgICAgIFwiVW5kdmlrIHR5cHNuaXR0IG1lZCBrcsOlbmdsaWdhIG9jaCBrb21wbGV4YSBmaWd1cmVyLlwiXHJcbiAgICAgIF0sXHJcbiAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwOi8vd3d3LnBhcmtpbnNvbmZvcmJ1bmRldC5zZVwiLFxyXG4gICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiUGFya2luc29uc2bDtnJidW5kZXRcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJuYW1lXCI6IFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBkZWZla3QgZsOkcmdzZWVuZGUgaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0YXBwYXIgc29tIHRhciB1cHAgZsOkcmdlcm5hIHZpb2xldHQsIGdyw7ZuIG9jaCByw7ZkLiBOw6RyIGVuIGVsbGVyIGZsZXJhIGF2IHRhcHBhcm5hIHNha25hcyBlbGxlciDDpHIgZGVmZWt0YSBsZWRlciBkZXQgdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUuIEd1bC1ibMOlIGbDpHJnYmxpbmRoZXQgKFRyaXRhbm9waSkgw6RyIHPDpGxsc3ludC4gTmFtbmV0IMOkciBtaXNzbGVkYW5kZSBkw6UgZGV0IGludGUgw6RyIGbDpHJnZXJuYSBndWwgb2NoIGJsw6Ugc29tIGbDtnJ2w6R4bGFzLCB1dGFuIGJsw6UgbWVkIGdyw7ZuIG9jaCBndWwgbWVkIGxpbGEuXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZGV0IGVuZGEgc8OkdHRldCBhdHQgZsO2cm1lZGxhIGluZm9ybWF0aW9uLCBpbmRpa2VyYSBlbiBoYW5kbGluZyBlbGxlciBpZGVudGlmaWVyYSBldHQgZWxlbWVudC4gTWFya2VyYSB0aWxsIGV4ZW1wZWwgaW50ZSBldHQgZmVsYWt0aWd0IGZvcm11bMOkcmbDpGx0IGVuZGFzdCBtZWQgZW4gcsO2ZCByYW0gdXRhbiBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBvY2ggZ8Okcm5hIGVuIGlrb24uXCIsIFx0XHJcbiAgICAgICAgXCJFcmJqdWQgZ8Okcm5hIGV0dCBow7Zna29udHJhc3QtbMOkZ2UuXCJcclxuICAgICAgXSxcclxuICAgICAgXCJtb3JlSW5mb1VybFwiOiBcImh0dHBzOi8vc3Yud2lraXBlZGlhLm9yZy93aWtpL0RlZmVrdF9mJUMzJUE0cmdzZWVuZGVcIixcclxuICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldpa2lwZWRpYSBvbSBkZWZla3QgZsOkcmdzZWVuZGVcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJuYW1lXCI6IFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiLFxyXG4gICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgZGVmZWt0IGbDpHJnc2VlbmRlIGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6Ugdmlzc2EgZWxsZXIgYWxsYSBmw6RyZ2VyLiBFdHQgZnVsbHQgZnVuZ2VyYW5kZSDDtmdhIGhhciB0cmUgb2xpa2EgdGFwcGFyIHNvbSB0YXIgdXBwIGbDpHJnZXJuYSB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gTsOkciBlbiBlbGxlciBmbGVyYSBhdiB0YXBwYXJuYSBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEgbGVkZXIgZGV0IHRpbGwgZGVmZWt0IGbDpHJnc2VlbmRlLiBSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXQgKFByb3Rhbm9waSBvY2ggRGV1dGVyYW5vcGkpIMOkciBkZW4gdmFubGlnYXN0ZSB0eXBlbiBhdiBmw6RyZ2JsaW5kaGV0LiBEZW4gw6RyIHZhbmxpZ2FyZSBob3MgbcOkbiDDpG4ga3Zpbm5vci4gUGVyc29uZXIgcsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0IGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6UgZsOkcmdlcm5hIHLDtmQsIGdyw7ZuLCBicnVuIG9jaCBvcmFuZ2UuXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCByw7ZkIHJhbSwga29tcGxldHRlcmEgw6R2ZW4gbWVkIHRleHQgb2NoIGfDpHJuYSBlbiAgaWtvbi5cIiwgXCJFcmJqdWQgZ8Okcm5hIGV0dCBow7Zna29udHJhc3QtbMOkZ2UuXCJdLFxyXG4gICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cHM6Ly9zdi53aWtpcGVkaWEub3JnL3dpa2kvRGVmZWt0X2YlQzMlQTRyZ3NlZW5kZVwiLFxyXG4gICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2lraXBlZGlhIG9tIGRlZmVrdCBmw6RyZ3NlZW5kZVwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJmYXJzaWdodGVkbmVzc1wiLFxyXG4gICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgSHlwZXJvcGkgc2VyIHN1ZGRpZ3QgcMOlIG7DpHJhIGjDpWxsLCBtZW4gYnJhIHDDpSBsw6VuZ3QgaMOlbGwuIE5lZHPDpHR0bmluZ2VuIHVwcHN0w6VyIHDDpSBncnVuZCBhdiBhdHQgbGp1c2V0IGludGUgYnJ5dHMgcsOkdHQgaSDDtmdhdC4gRGV0IMOkciBlbiBhdiBkZSB2YW5saWdhc3RlIHN5bm5lZHPDpHR0bmluZ2FybmEuXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIlVuZHZpayB0ZXh0IGkgbGl0ZW4gc3Rvcmxlay5cIiwgXHRcclxuICAgICAgICBcIldlYmJzaWRhbiBza2EgZ8OlIGF0dCBmw7Zyc3RvcmEgKHpvb21hcykgdGlsbCBtaW5zdCAyMDAgJSBzw6UgYXR0IGJlc8O2a2FyZW4ga2FuIGFucGFzc2EgaW5uZWjDpWxsZXRzIHN0b3JsZWsgZWZ0ZXIgc2luYSBiZWhvdi5cIixcclxuICAgICAgICBcIkVyYmp1ZCB1cHBsw6RzbmluZyBhdiBpbm5laMOlbGxldC5cIlxyXG4gICAgICBdLFxyXG4gICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cHM6Ly93ZWJicmlrdGxpbmplci5zZS9yLzM5LWdlLXdlYmJwbGF0c2VuLWVuLWdvZC1sYXNiYXJoZXQvXCIsXHJcbiAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJXZWJicmlrdGxpbmplIEdlIHdlYmJwbGF0c2VuIGdvZCBsw6RzYmFyaGV0XCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIFwibmFtZVwiOiBcInRvdGFsQ29sb3JCbGluZG5lc3NcIixcclxuICAgICAgXCJmYWN0XCI6IFwiRGVmZWt0IGbDpHJnc2VlbmRlIGlubmViw6RyIGF0dCBlbiBwZXJzb24gaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0eXBlciBhdiB0YXBwYXIgc29tIHRhciB1cHAgb2xpa2EgZsOkcmdlcjogdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE9yc2FrZW4gdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUgw6RyIGF0dCBlbiBlbGxlciBmbGVyYSBhdiBkZXNzYSB0eXBlciBhdiB0YXBwYXIgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhLiBIZWx0IGbDpHJnYmxpbmQgKE1vbm9rcm9tYXNpL2Frcm9tYXRvcHNpKSDDpHIgbXlja2V0IHPDpGxsc3ludC4gUGVyc29uZXIgbWVkIGRlbm5hIHN5bm5lZHPDpHR0bmluZyBzZXIgaW5nYSBmw6RyZ2VyIHV0YW4gc2VyIGVuZGFzdCBpIGdyw6Vza2FsYS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBkZXQgZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGVsZW1lbnQuIE1hcmtlcmEgdC5leC4gaW50ZSBldHQgZmVsYWt0aWd0IGZvcm11bMOkcmbDpGx0IGVuZGFzdCBtZWQgcsO2ZCByYW0sIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IGVsbGVyIGlrb24uXCIsIFx0XHJcbiAgICAgICAgXCJEZXQga2FuIHZhcmEgZW4gYnJhIGlkw6kgYXR0IGVyYmp1ZGEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJ0dW5uZWxWaXNpb25cIixcclxuICAgICAgXCJmYWN0XCI6IFwiVHVubmVsc2VlbmRlIGlubmViw6RyLi4uXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIkxpc3RpdGVtIDFcIiwgXHRcclxuICAgICAgICBcIkxpc3RpdGVtIDIuXCJcclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJuYW1lXCI6IFwiY29uY2VudHJhdGlvblwiLFxyXG4gICAgICBcImZhY3RcIjogXCJLb25jZW50cmF0aW9uc3N2w6VyaWdoZXRlciBpbm5lYsOkci4uLlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJMaXN0aXRlbSAxXCIsIFx0XHJcbiAgICAgICAgXCJMaXN0aXRlbSAyLlwiXHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG4gIFwiVUlcIjogW3tcclxuICAgIFwibmF2YmFySGVhZGVyVGV4dFwiOiBcIlbDpGxqIGZ1bmt0aW9uc25lZHPDpHR0bmluZzpcIixcclxuICAgIFwicmVzZXRCdG5UZXh0XCI6IFwiw4V0ZXJzdMOkbGxcIixcclxuICAgIFwiYWR2aWNlRHJvcGRvd25UZXh0XCI6IFwiVMOkbmsgcMOlIGRldHRhXCIsXHJcbiAgICBcImluZm9Ecm9wZG93blRleHRcIjogXCJNZXIgaW5mb3JtYXRpb25cIixcclxuICAgIFwic2ltdWxhdGlvbnNcIjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiU3luXCIsXHJcbiAgICAgICAgXCJjaG9pY2VzXCI6IFtcclxuICAgICAgICAgIHsgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6IFwiSGVsdCBmw6RyZ2JsaW5kXCIgfSxcclxuICAgICAgICAgIHsgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjogXCJHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0XCIgfSxcclxuICAgICAgICAgIHsgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6IFwiUsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0XCIgfSxcclxuICAgICAgICAgIHsgXCJmYXJzaWdodGVkbmVzc1wiOiBcIkzDpW5nc3ludGhldCwgw7Z2ZXJzeW50aGV0XCIgfSxcclxuICAgICAgICAgIHsgXCJ0dW5uZWxWaXNpb25cIjogXCJUdW5uZWxzZWVuZGVcIiB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiTW90b3Jpa1wiLFxyXG4gICAgICAgIFwiY2hvaWNlc1wiOiBbIFxyXG4gICAgICAgICAgeyBcInBhcmtpbnNvbnNcIjogXCJQYXJraW5zb25zXCIgfVxyXG4gIFxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiRHlzbGV4aVwiLFxyXG4gICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiS29uY2VudHJhdGlvblwiLFxyXG4gICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiTWlubmVcIixcclxuICAgICAgICBcImNob2ljZXNcIjogW11cclxuICAgICAgfVxyXG5cclxuICAgIF1cclxuICB9XVxyXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yZWRHcmVlbkNvbG9yQmxpbmRuZXNzID0gcmVkR3JlZW5Db2xvckJsaW5kbmVzcztcbmZ1bmN0aW9uIHJlZEdyZWVuQ29sb3JCbGluZG5lc3MoKSB7XG5cbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7IGZpbGU6ICdzaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy9jb250ZW50LmpzJyB9KTtcblxuICBjaHJvbWUudGFicy5pbnNlcnRDU1MoeyBmaWxlOiAnc2ltdWxhdGlvbnMvY29sb3JCbGluZG5lc3MvcmVkR3JlZW5Db2xvckJsaW5kbmVzcy9jc3MvbWFpbi5jc3MnIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnRvdGFsQ29sb3JCbGluZG5lc3MgPSB0b3RhbENvbG9yQmxpbmRuZXNzO1xuZnVuY3Rpb24gdG90YWxDb2xvckJsaW5kbmVzcygpIHtcblxuICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHsgZmlsZTogJ3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL2NvbnRlbnQuanMnIH0pO1xuXG4gIGNocm9tZS50YWJzLmluc2VydENTUyh7IGZpbGU6ICdzaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy90b3RhbENvbG9yQmxpbmRuZXNzL2Nzcy9tYWluLmNzcycgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMueWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzID0geWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzO1xuZnVuY3Rpb24geWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzKCkge1xuXG4gIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoeyBmaWxlOiAnc2ltdWxhdGlvbnMvY29sb3JCbGluZG5lc3MvY29udGVudC5qcycgfSk7XG5cbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHsgZmlsZTogJ3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL3llbGxvd0JsdWVDb2xvckJsaW5kbmVzcy9jc3MvbWFpbi5jc3MnIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY29uY2VudHJhdGlvbiA9IGNvbmNlbnRyYXRpb247XG5mdW5jdGlvbiBjb25jZW50cmF0aW9uKCkge1xuXG4gIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoe1xuICAgIGZpbGU6ICdzaW11bGF0aW9ucy9jb25jZW50cmF0aW9uL2NvbnRlbnQuanMnXG4gIH0pO1xuXG4gIGNocm9tZS50YWJzLmluc2VydENTUyh7XG4gICAgZmlsZTogXCJzaW11bGF0aW9ucy9jb25jZW50cmF0aW9uL2Nzcy9tYWluLmNzc1wiXG4gIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmR5c2xleGlhID0gZHlzbGV4aWE7XG5mdW5jdGlvbiBkeXNsZXhpYSgpIHtcbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7IGZpbGU6ICdzaW11bGF0aW9ucy9keXNsZXhpYS9jb250ZW50LmpzJyB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmZhcnNpZ2h0ZWRuZXNzID0gZmFyc2lnaHRlZG5lc3M7XG5mdW5jdGlvbiBmYXJzaWdodGVkbmVzcyhlKSB7XG4gIGNocm9tZS50YWJzLmluc2VydENTUyh7XG4gICAgZmlsZTogXCJzaW11bGF0aW9ucy9mYXJzaWdodGVkbmVzcy9jc3MvbWFpbi5jc3NcIlxuICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJlc2V0ID0gcmVzZXQ7XG4vL2dlbmVyYWxcblxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gIGNocm9tZS50YWJzLmluc2VydENTUyh7XG4gICAgZmlsZTogXCJzaW11bGF0aW9ucy9nZW5lcmFsL3Jlc2V0L21haW4uY3NzXCJcbiAgfSk7XG5cbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7XG4gICAgZmlsZTogXCJzaW11bGF0aW9ucy9nZW5lcmFsL3Jlc2V0L2NvbnRlbnQuanNcIlxuICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnBhcmtpbnNvbnMgPSBwYXJraW5zb25zO1xuZnVuY3Rpb24gcGFya2luc29ucygpIHtcblxuICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHtcbiAgICBmaWxlOiAnc2ltdWxhdGlvbnMvcGFya2luc29ucy9jb250ZW50LmpzJ1xuICB9KTtcblxuICBjaHJvbWUudGFicy5pbnNlcnRDU1Moe1xuICAgIGZpbGU6IFwic2ltdWxhdGlvbnMvcGFya2luc29ucy9jc3MvbWFpbi5jc3NcIlxuICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnR1bm5lbFZpc2lvbiA9IHR1bm5lbFZpc2lvbjtcbmZ1bmN0aW9uIHR1bm5lbFZpc2lvbigpIHtcblxuICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHsgZmlsZTogJ3NpbXVsYXRpb25zL3R1bm5lbFZpc2lvbi9jb250ZW50LmpzJyB9KTtcblxuICBjaHJvbWUudGFicy5pbnNlcnRDU1Moe1xuICAgIGZpbGU6IFwic2ltdWxhdGlvbnMvdHVubmVsVmlzaW9uL2Nzcy9tYWluLmNzc1wiXG4gIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iXX0=
