(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
'use strict';

var _index = require('./simulations/dyslexia/index.js');

var _index2 = require('./simulations/general/reset/index.js');

var _index3 = require('./simulations/general/loading/index.js');

var _index4 = require('./simulations/farsightedness/index.js');

var _index5 = require('./simulations/tunnelVision/index.js');

var _index6 = require('./simulations/colorBlindness/redGreenColorBlindness/index.js');

var _index7 = require('./simulations/colorBlindness/yellowBlueColorBlindness/index.js');

var _index8 = require('./simulations/colorBlindness/totalColorBlindness/index.js');

var _index9 = require('./simulations/concentration/index.js');

var _index10 = require('./simulations/parkinsons/index.js');

var _data = require('./UI/data/data.json');

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

    (0, _index3.loadingModal)();
  });

  //when loading modal is closed, show chosen simulation

  chrome.runtime.onMessage.addListener(function (request) {

    if (request.type == "modalClosed") {

      chrome.storage.local.get('activeSimulation', function (obj) {

        if (obj.activeSimulation == "farsightedness") {
          (0, _index4.farsightedness)();
        }

        if (obj.activeSimulation == "tunnelVision") {
          (0, _index5.tunnelVision)();
        }

        if (obj.activeSimulation == "redGreenColorBlindness") {
          (0, _index6.redGreenColorBlindness)();
        }

        if (obj.activeSimulation == "yellowBlueColorBlindness") {
          (0, _index7.yellowBlueColorBlindness)();
        }

        if (obj.activeSimulation == "totalColorBlindness") {
          (0, _index8.totalColorBlindness)();
        }

        if (obj.activeSimulation == "concentration") {
          (0, _index9.concentration)();
        }

        if (obj.activeSimulation == "parkinsons") {
          (0, _index10.parkinsons)();
        }

        if (obj.activeSimulation == "dyslexia") {
          startSimulation('dyslexia');
        }
      });
    }
  });

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


},{"./UI/data/data.json":1,"./simulations/colorBlindness/redGreenColorBlindness/index.js":3,"./simulations/colorBlindness/totalColorBlindness/index.js":4,"./simulations/colorBlindness/yellowBlueColorBlindness/index.js":5,"./simulations/concentration/index.js":6,"./simulations/dyslexia/index.js":7,"./simulations/farsightedness/index.js":8,"./simulations/general/loading/index.js":9,"./simulations/general/reset/index.js":10,"./simulations/parkinsons/index.js":11,"./simulations/tunnelVision/index.js":12}],3:[function(require,module,exports){
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadingModal = loadingModal;
function loadingModal() {
  chrome.tabs.executeScript({ file: 'simulations/general/loading/content.js' });

  chrome.tabs.insertCSS({ file: 'simulations/general/loading/main.css' });
}


},{}],10:[function(require,module,exports){
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


},{}],11:[function(require,module,exports){
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


},{}],12:[function(require,module,exports){
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


},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC9VSS9kYXRhL2RhdGEuanNvbiIsImJ1aWxkXFxqc1xcYmFiZWxcXGFwcC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxjb2xvckJsaW5kbmVzc1xccmVkR3JlZW5Db2xvckJsaW5kbmVzc1xcaW5kZXguanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcY29sb3JCbGluZG5lc3NcXHRvdGFsQ29sb3JCbGluZG5lc3NcXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXGNvbG9yQmxpbmRuZXNzXFx5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXGNvbmNlbnRyYXRpb25cXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXGR5c2xleGlhXFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxmYXJzaWdodGVkbmVzc1xcaW5kZXguanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcZ2VuZXJhbFxcbG9hZGluZ1xcaW5kZXguanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcZ2VuZXJhbFxccmVzZXRcXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXHBhcmtpbnNvbnNcXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXHR1bm5lbFZpc2lvblxcaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QU8sSUFBUCxDQUFZLFNBQVosQ0FBc0I7QUFDcEIsVUFBTTtBQURjLEdBQXRCO0FBR0Q7QUFDRDs7O0FDZEE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxRQUFRLFlBQVIsR0FBdUIsWUFBdkI7QUFDQSxTQUFTLFlBQVQsR0FBd0I7O0FBRXRCLFNBQU8sSUFBUCxDQUFZLGFBQVosQ0FBMEIsRUFBRSxNQUFNLHFDQUFSLEVBQTFCOztBQUVBLFNBQU8sSUFBUCxDQUFZLFNBQVosQ0FBc0I7QUFDcEIsVUFBTTtBQURjLEdBQXRCO0FBR0Q7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgXCJmYWN0c1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIFwibmFtZVwiOiBcImR5c2xleGlhXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIkR5c2xleGkgw6RyIGVuIG5lZHPDpHR0bmluZyBzb20gZ8O2ciBhdHQgaGrDpHJuYW4gaGFyIHN2w6VydCBhdHQgYXV0b21hdGlzZXJhIHRvbGtuaW5nZW4gYXYgb3JkLiBEZXR0YSBnw7ZyIGF0dCBwZXJzb25lciBtZWQgZGVubmEgbmVkc8OkdHRuaW5nIGthbiBoYSBzdsOlcnQgYXR0IGzDpHNhIG9jaCBza3JpdmEuIER5c2xleGkgw6RyIGludGUga29wcGxhdCB0aWxsIHN5biBlbGxlciBpbnRlbGxpZ2Vucy4gT3JzYWtlcm5hIHRpbGwgZHlzbGV4aSDDpHIgZm9ydGZhcmFuZGUgb2tsYXJ0LlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJVbmR2aWsgdGV4dCBpIGxpdGVuIHN0b3JsZWsgb2NoIGzDpW5nYSB0ZXh0ZXIuIFNlIHRpbGwgYXR0IGhhIG9yZGVudGxpZ3QgbWVkIHJhZGF2c3TDpW5kLlwiLCBcdFxyXG4gICAgICAgIFwiVW5kdmlrIHN2w6VyYSBvcmQgb2NoIGZhY2t0ZXJtZXIuXCIsXHJcbiAgICAgICAgXCJFcmJqdWQgbMOkdHRsw6RzdGEgdmVyc2lvbmVyIGF2IGZhY2t0ZXh0ZXIuXCIsXHJcbiAgICAgICAgXCJVbmR2aWsgdHlwc25pdHQgbWVkIGtyw6VuZ2xpZ2Egb2NoIGtvbXBsZXhhIGZpZ3VyZXIuXCJcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJwYXJraW5zb25zXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlZpZCBQYXJraW5zb25zIHNqdWtkb20gZsO2cnN0w7ZycyBjZWxsZXJuYSBpIGhqw6RybmFuIHNvbSB0aWxsdmVya2FyIGRvcGFtaW4gdmlsa2V0IGfDtnIgYXR0IGhqw6RybmFuIGbDpXIgZW4gbmVkc2F0dCBmw7ZybcOlZ2EgYXR0IHNraWNrYSBzaWduYWxlci4gUGVyc29uZXIgbWVkIFBhcmtpbnNvbnMga2FuIGRyYWJiYXMgYXYgc3ltcHRvbSBzb20gc2tha25pbmdhciwgc3RlbGEgbXVza2xlciBvY2ggc8OkbXJlIHLDtnJlbHNlZsO2cm3DpWdhLiBPcnNha2VybmEgdGlsbCBQYXJraW5zb25zIHNqdWtkb20gw6RyIGZvcnRmYXJhbmRlIG9rbGFydC5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiU2UgdGlsbCBhdHQgd2ViYnBsYXRzZW4ga2FuIGFudsOkbmRhcyBtZWQgYW5kcmEgaGrDpGxwbWVkZWwgw6RuIG11cywgdGlsbCBleGVtcGVsIHRhbmdlbnRib3Jkc25hdmlnZXJpbmcuXCIsIFx0XHJcbiAgICAgICAgXCJIYSB0aWxscsOkY2tsaWd0IG1lZCBsdWZ0IG1lbGxhbiBrb21wb25lbnRlclwiLFxyXG4gICAgICAgIFwiSGEgdGlsbHLDpGNrbGlndCBzdG9yYSBrbGlja3l0b3IuXCIsXHJcbiAgICAgICAgXCJVbmR2aWsgdHlwc25pdHQgbWVkIGtyw6VuZ2xpZ2Egb2NoIGtvbXBsZXhhIGZpZ3VyZXIuXCJcclxuICAgICAgXSxcclxuICAgICAgXCJtb3JlSW5mb1VybFwiOiBcImh0dHA6Ly93d3cucGFya2luc29uZm9yYnVuZGV0LnNlXCIsXHJcbiAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJQYXJraW5zb25zZsO2cmJ1bmRldFwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIixcclxuICAgICAgXCJmYWN0XCI6IFwiUGVyc29uZXIgbWVkIGRlZmVrdCBmw6RyZ3NlZW5kZSBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHRhcHBhciBzb20gdGFyIHVwcCBmw6RyZ2VybmEgdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE7DpHIgZW4gZWxsZXIgZmxlcmEgYXYgdGFwcGFybmEgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhIGxlZGVyIGRldCB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZS4gR3VsLWJsw6UgZsOkcmdibGluZGhldCAoVHJpdGFub3BpKSDDpHIgc8OkbGxzeW50LiBOYW1uZXQgw6RyIG1pc3NsZWRhbmRlIGTDpSBkZXQgaW50ZSDDpHIgZsOkcmdlcm5hIGd1bCBvY2ggYmzDpSBzb20gZsO2cnbDpHhsYXMsIHV0YW4gYmzDpSBtZWQgZ3LDtm4gb2NoIGd1bCBtZWQgbGlsYS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBkZXQgZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCBlbiByw7ZkIHJhbSB1dGFuIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IG9jaCBnw6RybmEgZW4gaWtvbi5cIiwgXHRcclxuICAgICAgICBcIkVyYmp1ZCBnw6RybmEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxyXG4gICAgICBdLFxyXG4gICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cHM6Ly9zdi53aWtpcGVkaWEub3JnL3dpa2kvRGVmZWt0X2YlQzMlQTRyZ3NlZW5kZVwiLFxyXG4gICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2lraXBlZGlhIG9tIGRlZmVrdCBmw6RyZ3NlZW5kZVwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBkZWZla3QgZsOkcmdzZWVuZGUgaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0YXBwYXIgc29tIHRhciB1cHAgZsOkcmdlcm5hIHZpb2xldHQsIGdyw7ZuIG9jaCByw7ZkLiBOw6RyIGVuIGVsbGVyIGZsZXJhIGF2IHRhcHBhcm5hIHNha25hcyBlbGxlciDDpHIgZGVmZWt0YSBsZWRlciBkZXQgdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUuIFLDtmQtZ3LDtm4gZsOkcmdibGluZGhldCAoUHJvdGFub3BpIG9jaCBEZXV0ZXJhbm9waSkgw6RyIGRlbiB2YW5saWdhc3RlIHR5cGVuIGF2IGbDpHJnYmxpbmRoZXQuIERlbiDDpHIgdmFubGlnYXJlIGhvcyBtw6RuIMOkbiBrdmlubm9yLiBQZXJzb25lciByw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXQgaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSBmw6RyZ2VybmEgcsO2ZCwgZ3LDtm4sIGJydW4gb2NoIG9yYW5nZS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1wiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBlbmRhIHPDpHR0ZXQgYXR0IGbDtnJtZWRsYSBpbmZvcm1hdGlvbiwgaW5kaWtlcmEgZW4gaGFuZGxpbmcgZWxsZXIgaWRlbnRpZmllcmEgZXR0IGVsZW1lbnQuIE1hcmtlcmEgdGlsbCBleGVtcGVsIGludGUgZXR0IGZlbGFrdGlndCBmb3JtdWzDpHJmw6RsdCBlbmRhc3QgbWVkIHLDtmQgcmFtLCBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBvY2ggZ8Okcm5hIGVuICBpa29uLlwiLCBcIkVyYmp1ZCBnw6RybmEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIl0sXHJcbiAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwczovL3N2Lndpa2lwZWRpYS5vcmcvd2lraS9EZWZla3RfZiVDMyVBNHJnc2VlbmRlXCIsXHJcbiAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJXaWtpcGVkaWEgb20gZGVmZWt0IGbDpHJnc2VlbmRlXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIFwibmFtZVwiOiBcImZhcnNpZ2h0ZWRuZXNzXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBIeXBlcm9waSBzZXIgc3VkZGlndCBww6UgbsOkcmEgaMOlbGwsIG1lbiBicmEgcMOlIGzDpW5ndCBow6VsbC4gTmVkc8OkdHRuaW5nZW4gdXBwc3TDpXIgcMOlIGdydW5kIGF2IGF0dCBsanVzZXQgaW50ZSBicnl0cyByw6R0dCBpIMO2Z2F0LiBEZXQgw6RyIGVuIGF2IGRlIHZhbmxpZ2FzdGUgc3lubmVkc8OkdHRuaW5nYXJuYS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrLlwiLCBcdFxyXG4gICAgICAgIFwiV2ViYnNpZGFuIHNrYSBnw6UgYXR0IGbDtnJzdG9yYSAoem9vbWFzKSB0aWxsIG1pbnN0IDIwMCAlIHPDpSBhdHQgYmVzw7ZrYXJlbiBrYW4gYW5wYXNzYSBpbm5laMOlbGxldHMgc3RvcmxlayBlZnRlciBzaW5hIGJlaG92LlwiLFxyXG4gICAgICAgIFwiRXJianVkIHVwcGzDpHNuaW5nIGF2IGlubmVow6VsbGV0LlwiXHJcbiAgICAgIF0sXHJcbiAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwczovL3dlYmJyaWt0bGluamVyLnNlL3IvMzktZ2Utd2ViYnBsYXRzZW4tZW4tZ29kLWxhc2JhcmhldC9cIixcclxuICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldlYmJyaWt0bGluamUgR2Ugd2ViYnBsYXRzZW4gZ29kIGzDpHNiYXJoZXRcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJuYW1lXCI6IFwidG90YWxDb2xvckJsaW5kbmVzc1wiLFxyXG4gICAgICBcImZhY3RcIjogXCJEZWZla3QgZsOkcmdzZWVuZGUgaW5uZWLDpHIgYXR0IGVuIHBlcnNvbiBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHR5cGVyIGF2IHRhcHBhciBzb20gdGFyIHVwcCBvbGlrYSBmw6RyZ2VyOiB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gT3JzYWtlbiB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZSDDpHIgYXR0IGVuIGVsbGVyIGZsZXJhIGF2IGRlc3NhIHR5cGVyIGF2IHRhcHBhciBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEuIEhlbHQgZsOkcmdibGluZCAoTW9ub2tyb21hc2kvYWtyb21hdG9wc2kpIMOkciBteWNrZXQgc8OkbGxzeW50LiBQZXJzb25lciBtZWQgZGVubmEgc3lubmVkc8OkdHRuaW5nIHNlciBpbmdhIGbDpHJnZXIgdXRhbiBzZXIgZW5kYXN0IGkgZ3LDpXNrYWxhLlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJBbnbDpG5kIGludGUgZsOkcmcgc29tIGRldCBlbmRhIHPDpHR0ZXQgYXR0IGbDtnJtZWRsYSBpbmZvcm1hdGlvbiwgaW5kaWtlcmEgZW4gaGFuZGxpbmcgZWxsZXIgaWRlbnRpZmllcmEgZWxlbWVudC4gTWFya2VyYSB0LmV4LiBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCByw7ZkIHJhbSwga29tcGxldHRlcmEgw6R2ZW4gbWVkIHRleHQgZWxsZXIgaWtvbi5cIiwgXHRcclxuICAgICAgICBcIkRldCBrYW4gdmFyYSBlbiBicmEgaWTDqSBhdHQgZXJianVkYSBldHQgaMO2Z2tvbnRyYXN0LWzDpGdlLlwiXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIFwibmFtZVwiOiBcInR1bm5lbFZpc2lvblwiLFxyXG4gICAgICBcImZhY3RcIjogXCJUdW5uZWxzZWVuZGUgaW5uZWLDpHIuLi5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiTGlzdGl0ZW0gMVwiLCBcdFxyXG4gICAgICAgIFwiTGlzdGl0ZW0gMi5cIlxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJjb25jZW50cmF0aW9uXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIktvbmNlbnRyYXRpb25zc3bDpXJpZ2hldGVyIGlubmViw6RyLi4uXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIkxpc3RpdGVtIDFcIiwgXHRcclxuICAgICAgICBcIkxpc3RpdGVtIDIuXCJcclxuICAgICAgXVxyXG4gICAgfVxyXG4gIF0sXHJcbiAgXCJVSVwiOiBbe1xyXG4gICAgXCJuYXZiYXJIZWFkZXJUZXh0XCI6IFwiVsOkbGogZnVua3Rpb25zbmVkc8OkdHRuaW5nOlwiLFxyXG4gICAgXCJyZXNldEJ0blRleHRcIjogXCLDhXRlcnN0w6RsbFwiLFxyXG4gICAgXCJhZHZpY2VEcm9wZG93blRleHRcIjogXCJUw6RuayBww6UgZGV0dGFcIixcclxuICAgIFwiaW5mb0Ryb3Bkb3duVGV4dFwiOiBcIk1lciBpbmZvcm1hdGlvblwiLFxyXG4gICAgXCJzaW11bGF0aW9uc1wiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJTeW5cIixcclxuICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgeyBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJIZWx0IGbDpHJnYmxpbmRcIiB9LFxyXG4gICAgICAgICAgeyBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIiB9LFxyXG4gICAgICAgICAgeyBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXRcIiB9LFxyXG4gICAgICAgICAgeyBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiTMOlbmdzeW50aGV0LCDDtnZlcnN5bnRoZXRcIiB9LFxyXG4gICAgICAgICAgeyBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbHNlZW5kZVwiIH1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJNb3RvcmlrXCIsXHJcbiAgICAgICAgXCJjaG9pY2VzXCI6IFsgXHJcbiAgICAgICAgICB7IFwicGFya2luc29uc1wiOiBcIlBhcmtpbnNvbnNcIiB9XHJcbiAgXHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJEeXNsZXhpXCIsXHJcbiAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJLb25jZW50cmF0aW9uXCIsXHJcbiAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJNaW5uZVwiLFxyXG4gICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICB9XHJcblxyXG4gICAgXVxyXG4gIH1dXHJcbn0iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfaW5kZXggPSByZXF1aXJlKCcuL3NpbXVsYXRpb25zL2R5c2xleGlhL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXgyID0gcmVxdWlyZSgnLi9zaW11bGF0aW9ucy9nZW5lcmFsL3Jlc2V0L2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXgzID0gcmVxdWlyZSgnLi9zaW11bGF0aW9ucy9nZW5lcmFsL2xvYWRpbmcvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDQgPSByZXF1aXJlKCcuL3NpbXVsYXRpb25zL2ZhcnNpZ2h0ZWRuZXNzL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXg1ID0gcmVxdWlyZSgnLi9zaW11bGF0aW9ucy90dW5uZWxWaXNpb24vaW5kZXguanMnKTtcblxudmFyIF9pbmRleDYgPSByZXF1aXJlKCcuL3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL3JlZEdyZWVuQ29sb3JCbGluZG5lc3MvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDcgPSByZXF1aXJlKCcuL3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL3llbGxvd0JsdWVDb2xvckJsaW5kbmVzcy9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4OCA9IHJlcXVpcmUoJy4vc2ltdWxhdGlvbnMvY29sb3JCbGluZG5lc3MvdG90YWxDb2xvckJsaW5kbmVzcy9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4OSA9IHJlcXVpcmUoJy4vc2ltdWxhdGlvbnMvY29uY2VudHJhdGlvbi9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4MTAgPSByZXF1aXJlKCcuL3NpbXVsYXRpb25zL3BhcmtpbnNvbnMvaW5kZXguanMnKTtcblxudmFyIF9kYXRhID0gcmVxdWlyZSgnLi9VSS9kYXRhL2RhdGEuanNvbicpO1xuXG52YXIgZGF0YSA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9kYXRhKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gIHZhciB0b29sdGlwID0gJChcIi50b29sLXRpcFwiKTtcbiAgdmFyIGluZm9IZWFkaW5nID0gJChcIi5kaXNhYmlsaXR5LWluZm8taGVhZGluZ1wiKTtcbiAgdmFyIGluZm9QYXJhZ3JhcGggPSAkKFwiLmRpc2FiaWxpdHktaW5mby1wYXJhZ3JhcGhcIik7XG4gIHZhciBhZHZpY2VMaXN0ID0gJChcIi5hZHZpY2UtbGlzdFwiKTtcbiAgdmFyIG1vcmVJbmZvTGluayA9ICQoXCIubW9yZS1pbmZvLWxpbmtcIik7XG4gIHZhciBtb3JlSW5mb1BhbmVsID0gJChcIiNtb3JlLWluZm8tcGFuZWxcIik7XG4gIHZhciByZXNldEJ0biA9ICQoXCIjcmVzZXQtYnRuXCIpO1xuICB2YXIgbmF2YmFySGVhZGVyID0gJChcIi5uYXZiYXItaGVhZGVyXCIpO1xuICB2YXIgcmVzZXRCdG5UZXh0ID0gZGF0YS5VSVswXS5yZXNldEJ0blRleHQ7XG4gIHZhciBuYXZiYXJIZWFkZXJUZXh0ID0gZGF0YS5VSVswXS5uYXZiYXJIZWFkZXJUZXh0O1xuICB2YXIgc2ltdWxhdGlvbkhlYWRpbmdUZXh0ID0gZGF0YS5VSVswXS5zaW11bGF0aW9uc1swXS5oZWFkaW5nO1xuICB2YXIgYWR2aWNlRHJvcGRvd24gPSAkKFwiI2FkdmljZS1kcm9wZG93blwiKTtcbiAgdmFyIGFkdmljZURyb3Bkb3duVGV4dCA9IGRhdGEuVUlbMF0uYWR2aWNlRHJvcGRvd25UZXh0O1xuICB2YXIgaW5mb0Ryb3Bkb3duID0gJChcIiNpbmZvLWRyb3Bkb3duXCIpO1xuICB2YXIgaW5mb0Ryb3Bkb3duVGV4dCA9IGRhdGEuVUlbMF0uaW5mb0Ryb3Bkb3duVGV4dDtcblxuICB2YXIgYWN0aXZlU2ltdWxhdGlvbiA9IHZvaWQgMDtcblxuICAvL0FwcGVuZCBVSSB0ZXh0c1xuXG4gIG5hdmJhckhlYWRlci50ZXh0KG5hdmJhckhlYWRlclRleHQpO1xuICByZXNldEJ0bi50ZXh0KHJlc2V0QnRuVGV4dCk7XG4gIGluZm9Ecm9wZG93bi50ZXh0KGluZm9Ecm9wZG93blRleHQpO1xuICBhZHZpY2VEcm9wZG93bi50ZXh0KGFkdmljZURyb3Bkb3duVGV4dCk7XG5cbiAgJC5lYWNoKGRhdGEuVUlbMF0uc2ltdWxhdGlvbnMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuXG4gICAgJCgnIycgKyB2YWx1ZS5oZWFkaW5nKS50ZXh0KHZhbHVlLmhlYWRpbmcpO1xuXG4gICAgJC5lYWNoKHZhbHVlLmNob2ljZXMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuICAgICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgICAgICQoJyMnICsga2V5KS50ZXh0KHZhbHVlW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICAvL21lbnUgYnV0dG9uIGNsaWNrXG5cbiAgJChcIi5tZW51LWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgbWVudUJ0biA9ICQodGhpcyk7XG4gICAgdmFyIG1lbnVCdG5JZCA9IG1lbnVCdG5bMF0uaWQ7XG4gICAgdmFyIGlkID0gbWVudUJ0bi5hdHRyKFwiaWRcIik7XG4gICAgdmFyIGZhY3QgPSBkYXRhLmZhY3RzLmZpbmQoZmluZFByb3BlcnR5KS5mYWN0O1xuICAgIHZhciBsaXN0SXRlbXMgPSBkYXRhLmZhY3RzLmZpbmQoZmluZFByb3BlcnR5KS5saXN0SXRlbXM7XG4gICAgdmFyIG1vcmVJbmZvID0gZGF0YS5mYWN0cy5maW5kKGZpbmRQcm9wZXJ0eSkubW9yZUluZm9MaW5rVGV4dDtcbiAgICB2YXIgbW9yZUluZm9VcmwgPSBkYXRhLmZhY3RzLmZpbmQoZmluZFByb3BlcnR5KS5tb3JlSW5mb1VybDtcblxuICAgIGZ1bmN0aW9uIGZpbmRQcm9wZXJ0eShzaW11bGF0aW9ucykge1xuICAgICAgcmV0dXJuIHNpbXVsYXRpb25zLm5hbWUgPT09IGlkO1xuICAgIH1cblxuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEljb24oe1xuICAgICAgcGF0aDogXCJpbWcvaWNvbl9hY3RpdmUucG5nXCJcbiAgICB9KTtcblxuICAgIGFjdGl2ZVNpbXVsYXRpb24gPSBtZW51QnRuSWQ7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgJ2FjdGl2ZVNpbXVsYXRpb24nOiBtZW51QnRuSWQgfSk7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgJ2xpbmtVcmwnOiBtb3JlSW5mb1VybCB9KTtcblxuICAgIGluZm9IZWFkaW5nLmVtcHR5KCk7XG4gICAgaW5mb1BhcmFncmFwaC5lbXB0eSgpO1xuICAgIGFkdmljZUxpc3QuZW1wdHkoKTtcbiAgICBtb3JlSW5mb0xpbmsuZW1wdHkoKTtcbiAgICBtb3JlSW5mb1BhbmVsLmhpZGUoKTtcblxuICAgIHRvb2x0aXAuYW5pbWF0ZSh7XG4gICAgICBsZWZ0OiBwYXJzZUludCh0b29sdGlwLmNzcygnbGVmdCcpLCAxMCkgPT0gMCA/IC10b29sdGlwLm91dGVyV2lkdGgoKSA6IDBcbiAgICB9KTtcblxuICAgIGluZm9IZWFkaW5nLmFwcGVuZChtZW51QnRuLnRleHQoKSk7XG5cbiAgICBtZW51QnRuLmNsb3Nlc3QoXCIuZHJvcGRvd25cIikuZmluZChcIi5zZWxlY3RlZFwiKS50ZXh0KG1lbnVCdG4udGV4dCgpKTtcblxuICAgIGluZm9QYXJhZ3JhcGguYXBwZW5kKGZhY3QpO1xuXG4gICAgJC5lYWNoKGxpc3RJdGVtcywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG4gICAgICBhZHZpY2VMaXN0LmFwcGVuZCgnPGxpPicgKyB2YWx1ZSArICc8L2xpPicpO1xuICAgIH0pO1xuXG4gICAgaWYgKG1vcmVJbmZvKSB7XG4gICAgICBtb3JlSW5mb1BhbmVsLnNob3coKTtcbiAgICAgIG1vcmVJbmZvTGluay5hcHBlbmQobW9yZUluZm8pO1xuICAgIH1cblxuICAgIG1vcmVJbmZvTGluay5hdHRyKFwiaHJlZlwiLCAnJyArIG1vcmVJbmZvVXJsKTtcblxuICAgICgwLCBfaW5kZXgzLmxvYWRpbmdNb2RhbCkoKTtcbiAgfSk7XG5cbiAgLy93aGVuIGxvYWRpbmcgbW9kYWwgaXMgY2xvc2VkLCBzaG93IGNob3NlbiBzaW11bGF0aW9uXG5cbiAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG5cbiAgICBpZiAocmVxdWVzdC50eXBlID09IFwibW9kYWxDbG9zZWRcIikge1xuXG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2FjdGl2ZVNpbXVsYXRpb24nLCBmdW5jdGlvbiAob2JqKSB7XG5cbiAgICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwiZmFyc2lnaHRlZG5lc3NcIikge1xuICAgICAgICAgICgwLCBfaW5kZXg0LmZhcnNpZ2h0ZWRuZXNzKSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwidHVubmVsVmlzaW9uXCIpIHtcbiAgICAgICAgICAoMCwgX2luZGV4NS50dW5uZWxWaXNpb24pKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCIpIHtcbiAgICAgICAgICAoMCwgX2luZGV4Ni5yZWRHcmVlbkNvbG9yQmxpbmRuZXNzKSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCIpIHtcbiAgICAgICAgICAoMCwgX2luZGV4Ny55ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3MpKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCIpIHtcbiAgICAgICAgICAoMCwgX2luZGV4OC50b3RhbENvbG9yQmxpbmRuZXNzKSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwiY29uY2VudHJhdGlvblwiKSB7XG4gICAgICAgICAgKDAsIF9pbmRleDkuY29uY2VudHJhdGlvbikoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvYmouYWN0aXZlU2ltdWxhdGlvbiA9PSBcInBhcmtpbnNvbnNcIikge1xuICAgICAgICAgICgwLCBfaW5kZXgxMC5wYXJraW5zb25zKSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwiZHlzbGV4aWFcIikge1xuICAgICAgICAgIHN0YXJ0U2ltdWxhdGlvbignZHlzbGV4aWEnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICAvL3Jlc2V0IGV4dGVuc2lvblxuXG4gIGZ1bmN0aW9uIHJlc2V0U2ltdWxhdGlvbigpIHtcblxuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEljb24oe1xuICAgICAgcGF0aDogXCJpbWcvaWNvbi5wbmdcIlxuICAgIH0pO1xuXG4gICAgdG9vbHRpcC5hbmltYXRlKHtcbiAgICAgIGxlZnQ6IHBhcnNlSW50KHRvb2x0aXAuY3NzKCdtYXJnaW5MZWZ0JyksIDEwKSA9PSAwID8gdG9vbHRpcC5vdXRlcldpZHRoKCkgOiAwXG4gICAgfSk7XG5cbiAgICAkKFwiI1N5blwiKS50ZXh0KFwiU3luXCIpO1xuICAgICQoXCIjTW90b3Jpa1wiKS50ZXh0KFwiTW90b3Jpa1wiKTtcblxuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJzWzBdLmlkLCB7IGFjdGlvbjogJ3N0b3BTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogYWN0aXZlU2ltdWxhdGlvbiB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGFjdGl2ZVNpbXVsYXRpb24gPSBudWxsO1xuICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5yZW1vdmUoJ2FjdGl2ZVNpbXVsYXRpb24nKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gcmVzZXQoKTtcblxuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRTaW11bGF0aW9uKHNpbXVsYXRpb24pIHtcbiAgICBjb25zb2xlLmxvZygnc3RhcnRTaW11bGF0aW9uJyk7XG4gICAgKDAsIF9pbmRleC5keXNsZXhpYSkoKTtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFic1swXS5pZCwgeyBhY3Rpb246ICdzdGFydFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBzaW11bGF0aW9uIH0sIGZ1bmN0aW9uICgpIHt9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vYnRuIGFuZCBsaW5rc1xuXG4gICQoXCIjcmVzZXQtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICByZXNldFNpbXVsYXRpb24oKTtcbiAgfSk7XG5cbiAgJChcIi5naXRodWItbGlua1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiAnaHR0cHM6Ly9naXRodWIuY29tL01ldGFtYXRyaXgvV2ViLURpc2FiaWxpdHktU2ltdWxhdG9yJyB9KTtcbiAgfSk7XG5cbiAgJChcIi5tb3JlLWluZm8tbGlua1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdsaW5rVXJsJywgZnVuY3Rpb24gKG9iaikge1xuICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiAnJyArIG9iai5saW5rVXJsIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICAvL3BhbmVsIGNvbGxhcHNlLCBzaG93IGFycm93czogXG5cbiAgJCgnLmNvbGxhcHNlJykub24oJ3Nob3duLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucGFyZW50KCkuZmluZChcIi5kb3duLWFycm93LCAudXAtYXJyb3dcIikudG9nZ2xlKCk7XG4gIH0pLm9uKCdoaWRkZW4uYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLmRvd24tYXJyb3csIC51cC1hcnJvd1wiKS50b2dnbGUoKTtcbiAgfSk7XG5cbiAgLy9rZWVwIGNob3NlbiBzaW11bGF0aW9uIGZhY3QgdG9vbHRpcCB3aGVuIGV4dGVuc2lvbiBpcyBjbG9zZWQgYW5kIG9wZW5lZCBhZ2Fpbi4gXG5cbiAgd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlU2ltdWxhdGlvbicsIGZ1bmN0aW9uIChvYmopIHtcblxuICAgICAgdmFyIGFjdGl2ZVNpbXVsYXRpb24gPSBvYmouYWN0aXZlU2ltdWxhdGlvbjtcblxuICAgICAgZnVuY3Rpb24gZmluZFByb3BlcnR5KHNpbXVsYXRpb25zKSB7XG4gICAgICAgIHJldHVybiBzaW11bGF0aW9ucy5uYW1lID09PSBhY3RpdmVTaW11bGF0aW9uO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aXZlU2ltdWxhdGlvbiAhPSBudWxsKSB7XG5cbiAgICAgICAgdG9vbHRpcC5jc3MoXCJsZWZ0XCIsIFwiMFwiKTtcblxuICAgICAgICBpbmZvSGVhZGluZy5hcHBlbmQoJCgnIycgKyBhY3RpdmVTaW11bGF0aW9uKS50ZXh0KCkpO1xuXG4gICAgICAgICQoJyMnICsgYWN0aXZlU2ltdWxhdGlvbikuY2xvc2VzdChcIi5kcm9wZG93blwiKS5maW5kKFwiLnNlbGVjdGVkXCIpLnRleHQoJCgnIycgKyBhY3RpdmVTaW11bGF0aW9uKS50ZXh0KCkpO1xuXG4gICAgICAgIHZhciBpZCA9ICQoJyMnICsgYWN0aXZlU2ltdWxhdGlvbikuYXR0cihcImlkXCIpO1xuXG4gICAgICAgIHZhciBmYWN0ID0gZGF0YS5mYWN0cy5maW5kKGZpbmRQcm9wZXJ0eSkuZmFjdDtcbiAgICAgICAgdmFyIGxpc3RJdGVtcyA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLmxpc3RJdGVtcztcbiAgICAgICAgdmFyIG1vcmVJbmZvID0gZGF0YS5mYWN0cy5maW5kKGZpbmRQcm9wZXJ0eSkubW9yZUluZm9MaW5rVGV4dDtcbiAgICAgICAgdmFyIG1vcmVJbmZvVXJsID0gZGF0YS5mYWN0cy5maW5kKGZpbmRQcm9wZXJ0eSkubW9yZUluZm9Vcmw7XG5cbiAgICAgICAgaW5mb1BhcmFncmFwaC5hcHBlbmQoZmFjdCk7XG5cbiAgICAgICAgJC5lYWNoKGxpc3RJdGVtcywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG4gICAgICAgICAgYWR2aWNlTGlzdC5hcHBlbmQoJzxsaT4nICsgdmFsdWUgKyAnPC9saT4nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKG1vcmVJbmZvKSB7XG4gICAgICAgICAgbW9yZUluZm9QYW5lbC5zaG93KCk7XG4gICAgICAgICAgbW9yZUluZm9MaW5rLmFwcGVuZChtb3JlSW5mbyk7XG4gICAgICAgIH1cblxuICAgICAgICBtb3JlSW5mb0xpbmsuYXR0cihcImhyZWZcIiwgJycgKyBtb3JlSW5mb1VybCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucmVkR3JlZW5Db2xvckJsaW5kbmVzcyA9IHJlZEdyZWVuQ29sb3JCbGluZG5lc3M7XG5mdW5jdGlvbiByZWRHcmVlbkNvbG9yQmxpbmRuZXNzKCkge1xuXG4gIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoeyBmaWxlOiAnc2ltdWxhdGlvbnMvY29sb3JCbGluZG5lc3MvY29udGVudC5qcycgfSk7XG5cbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHsgZmlsZTogJ3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL3JlZEdyZWVuQ29sb3JCbGluZG5lc3MvY3NzL21haW4uY3NzJyB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy50b3RhbENvbG9yQmxpbmRuZXNzID0gdG90YWxDb2xvckJsaW5kbmVzcztcbmZ1bmN0aW9uIHRvdGFsQ29sb3JCbGluZG5lc3MoKSB7XG5cbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7IGZpbGU6ICdzaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy9jb250ZW50LmpzJyB9KTtcblxuICBjaHJvbWUudGFicy5pbnNlcnRDU1MoeyBmaWxlOiAnc2ltdWxhdGlvbnMvY29sb3JCbGluZG5lc3MvdG90YWxDb2xvckJsaW5kbmVzcy9jc3MvbWFpbi5jc3MnIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnllbGxvd0JsdWVDb2xvckJsaW5kbmVzcyA9IHllbGxvd0JsdWVDb2xvckJsaW5kbmVzcztcbmZ1bmN0aW9uIHllbGxvd0JsdWVDb2xvckJsaW5kbmVzcygpIHtcblxuICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHsgZmlsZTogJ3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL2NvbnRlbnQuanMnIH0pO1xuXG4gIGNocm9tZS50YWJzLmluc2VydENTUyh7IGZpbGU6ICdzaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy95ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3MvY3NzL21haW4uY3NzJyB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmNvbmNlbnRyYXRpb24gPSBjb25jZW50cmF0aW9uO1xuZnVuY3Rpb24gY29uY2VudHJhdGlvbigpIHtcblxuICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHsgZmlsZTogJ3NpbXVsYXRpb25zL2NvbmNlbnRyYXRpb24vY29udGVudC5qcycgfSk7XG5cbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHtcbiAgICBmaWxlOiBcInNpbXVsYXRpb25zL2NvbmNlbnRyYXRpb24vY3NzL21haW4uY3NzXCJcbiAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZHlzbGV4aWEgPSBkeXNsZXhpYTtcbmZ1bmN0aW9uIGR5c2xleGlhKCkge1xuICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHsgZmlsZTogJ3NpbXVsYXRpb25zL2R5c2xleGlhL2NvbnRlbnQuanMnIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZmFyc2lnaHRlZG5lc3MgPSBmYXJzaWdodGVkbmVzcztcbi8vY29udGVudCBzY3JpcHRzXG5cbmZ1bmN0aW9uIGZhcnNpZ2h0ZWRuZXNzKGUpIHtcbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHtcbiAgICBmaWxlOiBcInNpbXVsYXRpb25zL2ZhcnNpZ2h0ZWRuZXNzL2Nzcy9tYWluLmNzc1wiXG4gIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmxvYWRpbmdNb2RhbCA9IGxvYWRpbmdNb2RhbDtcbmZ1bmN0aW9uIGxvYWRpbmdNb2RhbCgpIHtcbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7IGZpbGU6ICdzaW11bGF0aW9ucy9nZW5lcmFsL2xvYWRpbmcvY29udGVudC5qcycgfSk7XG5cbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHsgZmlsZTogJ3NpbXVsYXRpb25zL2dlbmVyYWwvbG9hZGluZy9tYWluLmNzcycgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yZXNldCA9IHJlc2V0O1xuLy9nZW5lcmFsXG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICBjaHJvbWUudGFicy5pbnNlcnRDU1Moe1xuICAgIGZpbGU6IFwic2ltdWxhdGlvbnMvZ2VuZXJhbC9yZXNldC9tYWluLmNzc1wiXG4gIH0pO1xuXG4gIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoe1xuICAgIGZpbGU6IFwic2ltdWxhdGlvbnMvZ2VuZXJhbC9yZXNldC9jb250ZW50LmpzXCJcbiAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5wYXJraW5zb25zID0gcGFya2luc29ucztcbmZ1bmN0aW9uIHBhcmtpbnNvbnMoKSB7XG5cbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7IGZpbGU6ICdzaW11bGF0aW9ucy9wYXJraW5zb25zL2NvbnRlbnQuanMnIH0pO1xuXG4gIGNocm9tZS50YWJzLmluc2VydENTUyh7XG4gICAgZmlsZTogXCJzaW11bGF0aW9ucy9wYXJraW5zb25zL2Nzcy9tYWluLmNzc1wiXG4gIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMudHVubmVsVmlzaW9uID0gdHVubmVsVmlzaW9uO1xuZnVuY3Rpb24gdHVubmVsVmlzaW9uKCkge1xuXG4gIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoeyBmaWxlOiAnc2ltdWxhdGlvbnMvdHVubmVsVmlzaW9uL2NvbnRlbnQuanMnIH0pO1xuXG4gIGNocm9tZS50YWJzLmluc2VydENTUyh7XG4gICAgZmlsZTogXCJzaW11bGF0aW9ucy90dW5uZWxWaXNpb24vY3NzL21haW4uY3NzXCJcbiAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiJdfQ==
