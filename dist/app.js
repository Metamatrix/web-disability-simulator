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

  chrome.tabs.executeScript({
    file: 'simulations/parkinsons/content.js'
  });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC9VSS9kYXRhL2RhdGEuanNvbiIsImJ1aWxkXFxqc1xcYmFiZWxcXGFwcC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxjb2xvckJsaW5kbmVzc1xccmVkR3JlZW5Db2xvckJsaW5kbmVzc1xcaW5kZXguanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcY29sb3JCbGluZG5lc3NcXHRvdGFsQ29sb3JCbGluZG5lc3NcXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXGNvbG9yQmxpbmRuZXNzXFx5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXGNvbmNlbnRyYXRpb25cXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXGR5c2xleGlhXFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxmYXJzaWdodGVkbmVzc1xcaW5kZXguanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcZ2VuZXJhbFxcbG9hZGluZ1xcaW5kZXguanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcZ2VuZXJhbFxccmVzZXRcXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXHBhcmtpbnNvbnNcXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXHR1bm5lbFZpc2lvblxcaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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SUFBUCxDQUFZLFNBQVosQ0FBc0I7QUFDcEIsVUFBTTtBQURjLEdBQXRCO0FBR0Q7QUFDRDs7O0FDaEJBOztBQUVBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQyxTQUFPO0FBRG9DLENBQTdDO0FBR0EsUUFBUSxZQUFSLEdBQXVCLFlBQXZCO0FBQ0EsU0FBUyxZQUFULEdBQXdCOztBQUV0QixTQUFPLElBQVAsQ0FBWSxhQUFaLENBQTBCLEVBQUUsTUFBTSxxQ0FBUixFQUExQjs7QUFFQSxTQUFPLElBQVAsQ0FBWSxTQUFaLENBQXNCO0FBQ3BCLFVBQU07QUFEYyxHQUF0QjtBQUdEO0FBQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gIFwiZmFjdHNcIjogW1xyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJkeXNsZXhpYVwiLFxyXG4gICAgICBcImZhY3RcIjogXCJEeXNsZXhpIMOkciBlbiBuZWRzw6R0dG5pbmcgc29tIGfDtnIgYXR0IGhqw6RybmFuIGhhciBzdsOlcnQgYXR0IGF1dG9tYXRpc2VyYSB0b2xrbmluZ2VuIGF2IG9yZC4gRGV0dGEgZ8O2ciBhdHQgcGVyc29uZXIgbWVkIGRlbm5hIG5lZHPDpHR0bmluZyBrYW4gaGEgc3bDpXJ0IGF0dCBsw6RzYSBvY2ggc2tyaXZhLiBEeXNsZXhpIMOkciBpbnRlIGtvcHBsYXQgdGlsbCBzeW4gZWxsZXIgaW50ZWxsaWdlbnMuIE9yc2FrZXJuYSB0aWxsIGR5c2xleGkgw6RyIGZvcnRmYXJhbmRlIG9rbGFydC5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrIG9jaCBsw6VuZ2EgdGV4dGVyLiBTZSB0aWxsIGF0dCBoYSBvcmRlbnRsaWd0IG1lZCByYWRhdnN0w6VuZC5cIiwgXHRcclxuICAgICAgICBcIlVuZHZpayBzdsOlcmEgb3JkIG9jaCBmYWNrdGVybWVyLlwiLFxyXG4gICAgICAgIFwiRXJianVkIGzDpHR0bMOkc3RhIHZlcnNpb25lciBhdiBmYWNrdGV4dGVyLlwiLFxyXG4gICAgICAgIFwiVW5kdmlrIHR5cHNuaXR0IG1lZCBrcsOlbmdsaWdhIG9jaCBrb21wbGV4YSBmaWd1cmVyLlwiXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJuYW1lXCI6IFwicGFya2luc29uc1wiLFxyXG4gICAgICBcImZhY3RcIjogXCJWaWQgUGFya2luc29ucyBzanVrZG9tIGbDtnJzdMO2cnMgY2VsbGVybmEgaSBoasOkcm5hbiBzb20gdGlsbHZlcmthciBkb3BhbWluIHZpbGtldCBnw7ZyIGF0dCBoasOkcm5hbiBmw6VyIGVuIG5lZHNhdHQgZsO2cm3DpWdhIGF0dCBza2lja2Egc2lnbmFsZXIuIFBlcnNvbmVyIG1lZCBQYXJraW5zb25zIGthbiBkcmFiYmFzIGF2IHN5bXB0b20gc29tIHNrYWtuaW5nYXIsIHN0ZWxhIG11c2tsZXIgb2NoIHPDpG1yZSByw7ZyZWxzZWbDtnJtw6VnYS4gT3JzYWtlcm5hIHRpbGwgUGFya2luc29ucyBzanVrZG9tIMOkciBmb3J0ZmFyYW5kZSBva2xhcnQuXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIlNlIHRpbGwgYXR0IHdlYmJwbGF0c2VuIGthbiBhbnbDpG5kYXMgbWVkIGFuZHJhIGhqw6RscG1lZGVsIMOkbiBtdXMsIHRpbGwgZXhlbXBlbCB0YW5nZW50Ym9yZHNuYXZpZ2VyaW5nLlwiLCBcdFxyXG4gICAgICAgIFwiSGEgdGlsbHLDpGNrbGlndCBtZWQgbHVmdCBtZWxsYW4ga29tcG9uZW50ZXJcIixcclxuICAgICAgICBcIkhhIHRpbGxyw6Rja2xpZ3Qgc3RvcmEga2xpY2t5dG9yLlwiLFxyXG4gICAgICAgIFwiVW5kdmlrIHR5cHNuaXR0IG1lZCBrcsOlbmdsaWdhIG9jaCBrb21wbGV4YSBmaWd1cmVyLlwiXHJcbiAgICAgIF0sXHJcbiAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwOi8vd3d3LnBhcmtpbnNvbmZvcmJ1bmRldC5zZVwiLFxyXG4gICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiUGFya2luc29uc2bDtnJidW5kZXRcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJuYW1lXCI6IFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBkZWZla3QgZsOkcmdzZWVuZGUgaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0YXBwYXIgc29tIHRhciB1cHAgZsOkcmdlcm5hIHZpb2xldHQsIGdyw7ZuIG9jaCByw7ZkLiBOw6RyIGVuIGVsbGVyIGZsZXJhIGF2IHRhcHBhcm5hIHNha25hcyBlbGxlciDDpHIgZGVmZWt0YSBsZWRlciBkZXQgdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUuIEd1bC1ibMOlIGbDpHJnYmxpbmRoZXQgKFRyaXRhbm9waSkgw6RyIHPDpGxsc3ludC4gTmFtbmV0IMOkciBtaXNzbGVkYW5kZSBkw6UgZGV0IGludGUgw6RyIGbDpHJnZXJuYSBndWwgb2NoIGJsw6Ugc29tIGbDtnJ2w6R4bGFzLCB1dGFuIGJsw6UgbWVkIGdyw7ZuIG9jaCBndWwgbWVkIGxpbGEuXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZGV0IGVuZGEgc8OkdHRldCBhdHQgZsO2cm1lZGxhIGluZm9ybWF0aW9uLCBpbmRpa2VyYSBlbiBoYW5kbGluZyBlbGxlciBpZGVudGlmaWVyYSBldHQgZWxlbWVudC4gTWFya2VyYSB0aWxsIGV4ZW1wZWwgaW50ZSBldHQgZmVsYWt0aWd0IGZvcm11bMOkcmbDpGx0IGVuZGFzdCBtZWQgZW4gcsO2ZCByYW0gdXRhbiBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBvY2ggZ8Okcm5hIGVuIGlrb24uXCIsIFx0XHJcbiAgICAgICAgXCJFcmJqdWQgZ8Okcm5hIGV0dCBow7Zna29udHJhc3QtbMOkZ2UuXCJcclxuICAgICAgXSxcclxuICAgICAgXCJtb3JlSW5mb1VybFwiOiBcImh0dHBzOi8vc3Yud2lraXBlZGlhLm9yZy93aWtpL0RlZmVrdF9mJUMzJUE0cmdzZWVuZGVcIixcclxuICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldpa2lwZWRpYSBvbSBkZWZla3QgZsOkcmdzZWVuZGVcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJuYW1lXCI6IFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiLFxyXG4gICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgZGVmZWt0IGbDpHJnc2VlbmRlIGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6Ugdmlzc2EgZWxsZXIgYWxsYSBmw6RyZ2VyLiBFdHQgZnVsbHQgZnVuZ2VyYW5kZSDDtmdhIGhhciB0cmUgb2xpa2EgdGFwcGFyIHNvbSB0YXIgdXBwIGbDpHJnZXJuYSB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gTsOkciBlbiBlbGxlciBmbGVyYSBhdiB0YXBwYXJuYSBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEgbGVkZXIgZGV0IHRpbGwgZGVmZWt0IGbDpHJnc2VlbmRlLiBSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXQgKFByb3Rhbm9waSBvY2ggRGV1dGVyYW5vcGkpIMOkciBkZW4gdmFubGlnYXN0ZSB0eXBlbiBhdiBmw6RyZ2JsaW5kaGV0LiBEZW4gw6RyIHZhbmxpZ2FyZSBob3MgbcOkbiDDpG4ga3Zpbm5vci4gUGVyc29uZXIgcsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0IGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6UgZsOkcmdlcm5hIHLDtmQsIGdyw7ZuLCBicnVuIG9jaCBvcmFuZ2UuXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCByw7ZkIHJhbSwga29tcGxldHRlcmEgw6R2ZW4gbWVkIHRleHQgb2NoIGfDpHJuYSBlbiAgaWtvbi5cIiwgXCJFcmJqdWQgZ8Okcm5hIGV0dCBow7Zna29udHJhc3QtbMOkZ2UuXCJdLFxyXG4gICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cHM6Ly9zdi53aWtpcGVkaWEub3JnL3dpa2kvRGVmZWt0X2YlQzMlQTRyZ3NlZW5kZVwiLFxyXG4gICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2lraXBlZGlhIG9tIGRlZmVrdCBmw6RyZ3NlZW5kZVwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJmYXJzaWdodGVkbmVzc1wiLFxyXG4gICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgSHlwZXJvcGkgc2VyIHN1ZGRpZ3QgcMOlIG7DpHJhIGjDpWxsLCBtZW4gYnJhIHDDpSBsw6VuZ3QgaMOlbGwuIE5lZHPDpHR0bmluZ2VuIHVwcHN0w6VyIHDDpSBncnVuZCBhdiBhdHQgbGp1c2V0IGludGUgYnJ5dHMgcsOkdHQgaSDDtmdhdC4gRGV0IMOkciBlbiBhdiBkZSB2YW5saWdhc3RlIHN5bm5lZHPDpHR0bmluZ2FybmEuXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIlVuZHZpayB0ZXh0IGkgbGl0ZW4gc3Rvcmxlay5cIiwgXHRcclxuICAgICAgICBcIldlYmJzaWRhbiBza2EgZ8OlIGF0dCBmw7Zyc3RvcmEgKHpvb21hcykgdGlsbCBtaW5zdCAyMDAgJSBzw6UgYXR0IGJlc8O2a2FyZW4ga2FuIGFucGFzc2EgaW5uZWjDpWxsZXRzIHN0b3JsZWsgZWZ0ZXIgc2luYSBiZWhvdi5cIixcclxuICAgICAgICBcIkVyYmp1ZCB1cHBsw6RzbmluZyBhdiBpbm5laMOlbGxldC5cIlxyXG4gICAgICBdLFxyXG4gICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cHM6Ly93ZWJicmlrdGxpbmplci5zZS9yLzM5LWdlLXdlYmJwbGF0c2VuLWVuLWdvZC1sYXNiYXJoZXQvXCIsXHJcbiAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJXZWJicmlrdGxpbmplIEdlIHdlYmJwbGF0c2VuIGdvZCBsw6RzYmFyaGV0XCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIFwibmFtZVwiOiBcInRvdGFsQ29sb3JCbGluZG5lc3NcIixcclxuICAgICAgXCJmYWN0XCI6IFwiRGVmZWt0IGbDpHJnc2VlbmRlIGlubmViw6RyIGF0dCBlbiBwZXJzb24gaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0eXBlciBhdiB0YXBwYXIgc29tIHRhciB1cHAgb2xpa2EgZsOkcmdlcjogdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE9yc2FrZW4gdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUgw6RyIGF0dCBlbiBlbGxlciBmbGVyYSBhdiBkZXNzYSB0eXBlciBhdiB0YXBwYXIgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhLiBIZWx0IGbDpHJnYmxpbmQgKE1vbm9rcm9tYXNpL2Frcm9tYXRvcHNpKSDDpHIgbXlja2V0IHPDpGxsc3ludC4gUGVyc29uZXIgbWVkIGRlbm5hIHN5bm5lZHPDpHR0bmluZyBzZXIgaW5nYSBmw6RyZ2VyIHV0YW4gc2VyIGVuZGFzdCBpIGdyw6Vza2FsYS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBkZXQgZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGVsZW1lbnQuIE1hcmtlcmEgdC5leC4gaW50ZSBldHQgZmVsYWt0aWd0IGZvcm11bMOkcmbDpGx0IGVuZGFzdCBtZWQgcsO2ZCByYW0sIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IGVsbGVyIGlrb24uXCIsIFx0XHJcbiAgICAgICAgXCJEZXQga2FuIHZhcmEgZW4gYnJhIGlkw6kgYXR0IGVyYmp1ZGEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJ0dW5uZWxWaXNpb25cIixcclxuICAgICAgXCJmYWN0XCI6IFwiVHVubmVsc2VlbmRlIGlubmViw6RyLi4uXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIkxpc3RpdGVtIDFcIiwgXHRcclxuICAgICAgICBcIkxpc3RpdGVtIDIuXCJcclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJuYW1lXCI6IFwiY29uY2VudHJhdGlvblwiLFxyXG4gICAgICBcImZhY3RcIjogXCJLb25jZW50cmF0aW9uc3N2w6VyaWdoZXRlciBpbm5lYsOkci4uLlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJMaXN0aXRlbSAxXCIsIFx0XHJcbiAgICAgICAgXCJMaXN0aXRlbSAyLlwiXHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG4gIFwiVUlcIjogW3tcclxuICAgIFwibmF2YmFySGVhZGVyVGV4dFwiOiBcIlbDpGxqIGZ1bmt0aW9uc25lZHPDpHR0bmluZzpcIixcclxuICAgIFwicmVzZXRCdG5UZXh0XCI6IFwiw4V0ZXJzdMOkbGxcIixcclxuICAgIFwiYWR2aWNlRHJvcGRvd25UZXh0XCI6IFwiVMOkbmsgcMOlIGRldHRhXCIsXHJcbiAgICBcImluZm9Ecm9wZG93blRleHRcIjogXCJNZXIgaW5mb3JtYXRpb25cIixcclxuICAgIFwic2ltdWxhdGlvbnNcIjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiU3luXCIsXHJcbiAgICAgICAgXCJjaG9pY2VzXCI6IFtcclxuICAgICAgICAgIHsgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6IFwiSGVsdCBmw6RyZ2JsaW5kXCIgfSxcclxuICAgICAgICAgIHsgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjogXCJHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0XCIgfSxcclxuICAgICAgICAgIHsgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6IFwiUsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0XCIgfSxcclxuICAgICAgICAgIHsgXCJmYXJzaWdodGVkbmVzc1wiOiBcIkzDpW5nc3ludGhldCwgw7Z2ZXJzeW50aGV0XCIgfSxcclxuICAgICAgICAgIHsgXCJ0dW5uZWxWaXNpb25cIjogXCJUdW5uZWxzZWVuZGVcIiB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiTW90b3Jpa1wiLFxyXG4gICAgICAgIFwiY2hvaWNlc1wiOiBbIFxyXG4gICAgICAgICAgeyBcInBhcmtpbnNvbnNcIjogXCJQYXJraW5zb25zXCIgfVxyXG4gIFxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiRHlzbGV4aVwiLFxyXG4gICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiS29uY2VudHJhdGlvblwiLFxyXG4gICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiTWlubmVcIixcclxuICAgICAgICBcImNob2ljZXNcIjogW11cclxuICAgICAgfVxyXG5cclxuICAgIF1cclxuICB9XVxyXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2luZGV4ID0gcmVxdWlyZSgnLi9zaW11bGF0aW9ucy9keXNsZXhpYS9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4MiA9IHJlcXVpcmUoJy4vc2ltdWxhdGlvbnMvZ2VuZXJhbC9yZXNldC9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4MyA9IHJlcXVpcmUoJy4vc2ltdWxhdGlvbnMvZ2VuZXJhbC9sb2FkaW5nL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXg0ID0gcmVxdWlyZSgnLi9zaW11bGF0aW9ucy9mYXJzaWdodGVkbmVzcy9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4NSA9IHJlcXVpcmUoJy4vc2ltdWxhdGlvbnMvdHVubmVsVmlzaW9uL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXg2ID0gcmVxdWlyZSgnLi9zaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy9yZWRHcmVlbkNvbG9yQmxpbmRuZXNzL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXg3ID0gcmVxdWlyZSgnLi9zaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy95ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3MvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDggPSByZXF1aXJlKCcuL3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL3RvdGFsQ29sb3JCbGluZG5lc3MvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDkgPSByZXF1aXJlKCcuL3NpbXVsYXRpb25zL2NvbmNlbnRyYXRpb24vaW5kZXguanMnKTtcblxudmFyIF9pbmRleDEwID0gcmVxdWlyZSgnLi9zaW11bGF0aW9ucy9wYXJraW5zb25zL2luZGV4LmpzJyk7XG5cbnZhciBfZGF0YSA9IHJlcXVpcmUoJy4vVUkvZGF0YS9kYXRhLmpzb24nKTtcblxudmFyIGRhdGEgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZGF0YSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICB2YXIgdG9vbHRpcCA9ICQoXCIudG9vbC10aXBcIik7XG4gIHZhciBpbmZvSGVhZGluZyA9ICQoXCIuZGlzYWJpbGl0eS1pbmZvLWhlYWRpbmdcIik7XG4gIHZhciBpbmZvUGFyYWdyYXBoID0gJChcIi5kaXNhYmlsaXR5LWluZm8tcGFyYWdyYXBoXCIpO1xuICB2YXIgYWR2aWNlTGlzdCA9ICQoXCIuYWR2aWNlLWxpc3RcIik7XG4gIHZhciBtb3JlSW5mb0xpbmsgPSAkKFwiLm1vcmUtaW5mby1saW5rXCIpO1xuICB2YXIgbW9yZUluZm9QYW5lbCA9ICQoXCIjbW9yZS1pbmZvLXBhbmVsXCIpO1xuICB2YXIgcmVzZXRCdG4gPSAkKFwiI3Jlc2V0LWJ0blwiKTtcbiAgdmFyIG5hdmJhckhlYWRlciA9ICQoXCIubmF2YmFyLWhlYWRlclwiKTtcbiAgdmFyIHJlc2V0QnRuVGV4dCA9IGRhdGEuVUlbMF0ucmVzZXRCdG5UZXh0O1xuICB2YXIgbmF2YmFySGVhZGVyVGV4dCA9IGRhdGEuVUlbMF0ubmF2YmFySGVhZGVyVGV4dDtcbiAgdmFyIHNpbXVsYXRpb25IZWFkaW5nVGV4dCA9IGRhdGEuVUlbMF0uc2ltdWxhdGlvbnNbMF0uaGVhZGluZztcbiAgdmFyIGFkdmljZURyb3Bkb3duID0gJChcIiNhZHZpY2UtZHJvcGRvd25cIik7XG4gIHZhciBhZHZpY2VEcm9wZG93blRleHQgPSBkYXRhLlVJWzBdLmFkdmljZURyb3Bkb3duVGV4dDtcbiAgdmFyIGluZm9Ecm9wZG93biA9ICQoXCIjaW5mby1kcm9wZG93blwiKTtcbiAgdmFyIGluZm9Ecm9wZG93blRleHQgPSBkYXRhLlVJWzBdLmluZm9Ecm9wZG93blRleHQ7XG5cbiAgdmFyIGFjdGl2ZVNpbXVsYXRpb24gPSB2b2lkIDA7XG5cbiAgLy9BcHBlbmQgVUkgdGV4dHNcblxuICBuYXZiYXJIZWFkZXIudGV4dChuYXZiYXJIZWFkZXJUZXh0KTtcbiAgcmVzZXRCdG4udGV4dChyZXNldEJ0blRleHQpO1xuICBpbmZvRHJvcGRvd24udGV4dChpbmZvRHJvcGRvd25UZXh0KTtcbiAgYWR2aWNlRHJvcGRvd24udGV4dChhZHZpY2VEcm9wZG93blRleHQpO1xuXG4gICQuZWFjaChkYXRhLlVJWzBdLnNpbXVsYXRpb25zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcblxuICAgICQoJyMnICsgdmFsdWUuaGVhZGluZykudGV4dCh2YWx1ZS5oZWFkaW5nKTtcblxuICAgICQuZWFjaCh2YWx1ZS5jaG9pY2VzLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgICAgICAkKCcjJyArIGtleSkudGV4dCh2YWx1ZVtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgLy9tZW51IGJ1dHRvbiBjbGlja1xuXG4gICQoXCIubWVudS1idG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIG1lbnVCdG4gPSAkKHRoaXMpO1xuICAgIHZhciBtZW51QnRuSWQgPSBtZW51QnRuWzBdLmlkO1xuICAgIHZhciBpZCA9IG1lbnVCdG4uYXR0cihcImlkXCIpO1xuICAgIHZhciBmYWN0ID0gZGF0YS5mYWN0cy5maW5kKGZpbmRQcm9wZXJ0eSkuZmFjdDtcbiAgICB2YXIgbGlzdEl0ZW1zID0gZGF0YS5mYWN0cy5maW5kKGZpbmRQcm9wZXJ0eSkubGlzdEl0ZW1zO1xuICAgIHZhciBtb3JlSW5mbyA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLm1vcmVJbmZvTGlua1RleHQ7XG4gICAgdmFyIG1vcmVJbmZvVXJsID0gZGF0YS5mYWN0cy5maW5kKGZpbmRQcm9wZXJ0eSkubW9yZUluZm9Vcmw7XG5cbiAgICBmdW5jdGlvbiBmaW5kUHJvcGVydHkoc2ltdWxhdGlvbnMpIHtcbiAgICAgIHJldHVybiBzaW11bGF0aW9ucy5uYW1lID09PSBpZDtcbiAgICB9XG5cbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtcbiAgICAgIHBhdGg6IFwiaW1nL2ljb25fYWN0aXZlLnBuZ1wiXG4gICAgfSk7XG5cbiAgICBhY3RpdmVTaW11bGF0aW9uID0gbWVudUJ0bklkO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7ICdhY3RpdmVTaW11bGF0aW9uJzogbWVudUJ0bklkIH0pO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7ICdsaW5rVXJsJzogbW9yZUluZm9VcmwgfSk7XG5cbiAgICBpbmZvSGVhZGluZy5lbXB0eSgpO1xuICAgIGluZm9QYXJhZ3JhcGguZW1wdHkoKTtcbiAgICBhZHZpY2VMaXN0LmVtcHR5KCk7XG4gICAgbW9yZUluZm9MaW5rLmVtcHR5KCk7XG4gICAgbW9yZUluZm9QYW5lbC5oaWRlKCk7XG5cbiAgICB0b29sdGlwLmFuaW1hdGUoe1xuICAgICAgbGVmdDogcGFyc2VJbnQodG9vbHRpcC5jc3MoJ2xlZnQnKSwgMTApID09IDAgPyAtdG9vbHRpcC5vdXRlcldpZHRoKCkgOiAwXG4gICAgfSk7XG5cbiAgICBpbmZvSGVhZGluZy5hcHBlbmQobWVudUJ0bi50ZXh0KCkpO1xuXG4gICAgbWVudUJ0bi5jbG9zZXN0KFwiLmRyb3Bkb3duXCIpLmZpbmQoXCIuc2VsZWN0ZWRcIikudGV4dChtZW51QnRuLnRleHQoKSk7XG5cbiAgICBpbmZvUGFyYWdyYXBoLmFwcGVuZChmYWN0KTtcblxuICAgICQuZWFjaChsaXN0SXRlbXMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuICAgICAgYWR2aWNlTGlzdC5hcHBlbmQoJzxsaT4nICsgdmFsdWUgKyAnPC9saT4nKTtcbiAgICB9KTtcblxuICAgIGlmIChtb3JlSW5mbykge1xuICAgICAgbW9yZUluZm9QYW5lbC5zaG93KCk7XG4gICAgICBtb3JlSW5mb0xpbmsuYXBwZW5kKG1vcmVJbmZvKTtcbiAgICB9XG5cbiAgICBtb3JlSW5mb0xpbmsuYXR0cihcImhyZWZcIiwgJycgKyBtb3JlSW5mb1VybCk7XG5cbiAgICAoMCwgX2luZGV4My5sb2FkaW5nTW9kYWwpKCk7XG4gIH0pO1xuXG4gIC8vd2hlbiBsb2FkaW5nIG1vZGFsIGlzIGNsb3NlZCwgc2hvdyBjaG9zZW4gc2ltdWxhdGlvblxuXG4gIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdCkge1xuXG4gICAgaWYgKHJlcXVlc3QudHlwZSA9PSBcIm1vZGFsQ2xvc2VkXCIpIHtcblxuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuXG4gICAgICAgIGlmIChvYmouYWN0aXZlU2ltdWxhdGlvbiA9PSBcImZhcnNpZ2h0ZWRuZXNzXCIpIHtcbiAgICAgICAgICAoMCwgX2luZGV4NC5mYXJzaWdodGVkbmVzcykoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvYmouYWN0aXZlU2ltdWxhdGlvbiA9PSBcInR1bm5lbFZpc2lvblwiKSB7XG4gICAgICAgICAgKDAsIF9pbmRleDUudHVubmVsVmlzaW9uKSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiKSB7XG4gICAgICAgICAgKDAsIF9pbmRleDYucmVkR3JlZW5Db2xvckJsaW5kbmVzcykoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvYmouYWN0aXZlU2ltdWxhdGlvbiA9PSBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiKSB7XG4gICAgICAgICAgKDAsIF9pbmRleDcueWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzKSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwidG90YWxDb2xvckJsaW5kbmVzc1wiKSB7XG4gICAgICAgICAgKDAsIF9pbmRleDgudG90YWxDb2xvckJsaW5kbmVzcykoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvYmouYWN0aXZlU2ltdWxhdGlvbiA9PSBcImNvbmNlbnRyYXRpb25cIikge1xuICAgICAgICAgICgwLCBfaW5kZXg5LmNvbmNlbnRyYXRpb24pKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJwYXJraW5zb25zXCIpIHtcbiAgICAgICAgICAoMCwgX2luZGV4MTAucGFya2luc29ucykoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvYmouYWN0aXZlU2ltdWxhdGlvbiA9PSBcImR5c2xleGlhXCIpIHtcbiAgICAgICAgICBzdGFydFNpbXVsYXRpb24oJ2R5c2xleGlhJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy9yZXNldCBleHRlbnNpb25cblxuICBmdW5jdGlvbiByZXNldFNpbXVsYXRpb24oKSB7XG5cbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtcbiAgICAgIHBhdGg6IFwiaW1nL2ljb24ucG5nXCJcbiAgICB9KTtcblxuICAgIHRvb2x0aXAuYW5pbWF0ZSh7XG4gICAgICBsZWZ0OiBwYXJzZUludCh0b29sdGlwLmNzcygnbWFyZ2luTGVmdCcpLCAxMCkgPT0gMCA/IHRvb2x0aXAub3V0ZXJXaWR0aCgpIDogMFxuICAgIH0pO1xuXG4gICAgJChcIiNTeW5cIikudGV4dChcIlN5blwiKTtcbiAgICAkKFwiI01vdG9yaWtcIikudGV4dChcIk1vdG9yaWtcIik7XG5cbiAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFic1swXS5pZCwgeyBhY3Rpb246ICdzdG9wU2ltdWxhdGlvbicsIHNpbXVsYXRpb246IGFjdGl2ZVNpbXVsYXRpb24gfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBhY3RpdmVTaW11bGF0aW9uID0gbnVsbDtcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKCdhY3RpdmVTaW11bGF0aW9uJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHJlc2V0KCk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0U2ltdWxhdGlvbihzaW11bGF0aW9uKSB7XG4gICAgY29uc29sZS5sb2coJ3N0YXJ0U2ltdWxhdGlvbicpO1xuICAgICgwLCBfaW5kZXguZHlzbGV4aWEpKCk7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHsgYWN0aW9uOiAnc3RhcnRTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogc2ltdWxhdGlvbiB9LCBmdW5jdGlvbiAoKSB7fSk7XG4gICAgfSk7XG4gIH1cblxuICAvL2J0biBhbmQgbGlua3NcblxuICAkKFwiI3Jlc2V0LWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgcmVzZXRTaW11bGF0aW9uKCk7XG4gIH0pO1xuXG4gICQoXCIuZ2l0aHViLWxpbmtcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9NZXRhbWF0cml4L1dlYi1EaXNhYmlsaXR5LVNpbXVsYXRvcicgfSk7XG4gIH0pO1xuXG4gICQoXCIubW9yZS1pbmZvLWxpbmtcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnbGlua1VybCcsIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogJycgKyBvYmoubGlua1VybCB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy9wYW5lbCBjb2xsYXBzZSwgc2hvdyBhcnJvd3M6IFxuXG4gICQoJy5jb2xsYXBzZScpLm9uKCdzaG93bi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCIuZG93bi1hcnJvdywgLnVwLWFycm93XCIpLnRvZ2dsZSgpO1xuICB9KS5vbignaGlkZGVuLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucGFyZW50KCkuZmluZChcIi5kb3duLWFycm93LCAudXAtYXJyb3dcIikudG9nZ2xlKCk7XG4gIH0pO1xuXG4gIC8va2VlcCBjaG9zZW4gc2ltdWxhdGlvbiBmYWN0IHRvb2x0aXAgd2hlbiBleHRlbnNpb24gaXMgY2xvc2VkIGFuZCBvcGVuZWQgYWdhaW4uIFxuXG4gIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2FjdGl2ZVNpbXVsYXRpb24nLCBmdW5jdGlvbiAob2JqKSB7XG5cbiAgICAgIHZhciBhY3RpdmVTaW11bGF0aW9uID0gb2JqLmFjdGl2ZVNpbXVsYXRpb247XG5cbiAgICAgIGZ1bmN0aW9uIGZpbmRQcm9wZXJ0eShzaW11bGF0aW9ucykge1xuICAgICAgICByZXR1cm4gc2ltdWxhdGlvbnMubmFtZSA9PT0gYWN0aXZlU2ltdWxhdGlvbjtcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGl2ZVNpbXVsYXRpb24gIT0gbnVsbCkge1xuXG4gICAgICAgIHRvb2x0aXAuY3NzKFwibGVmdFwiLCBcIjBcIik7XG5cbiAgICAgICAgaW5mb0hlYWRpbmcuYXBwZW5kKCQoJyMnICsgYWN0aXZlU2ltdWxhdGlvbikudGV4dCgpKTtcblxuICAgICAgICAkKCcjJyArIGFjdGl2ZVNpbXVsYXRpb24pLmNsb3Nlc3QoXCIuZHJvcGRvd25cIikuZmluZChcIi5zZWxlY3RlZFwiKS50ZXh0KCQoJyMnICsgYWN0aXZlU2ltdWxhdGlvbikudGV4dCgpKTtcblxuICAgICAgICB2YXIgaWQgPSAkKCcjJyArIGFjdGl2ZVNpbXVsYXRpb24pLmF0dHIoXCJpZFwiKTtcblxuICAgICAgICB2YXIgZmFjdCA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLmZhY3Q7XG4gICAgICAgIHZhciBsaXN0SXRlbXMgPSBkYXRhLmZhY3RzLmZpbmQoZmluZFByb3BlcnR5KS5saXN0SXRlbXM7XG4gICAgICAgIHZhciBtb3JlSW5mbyA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLm1vcmVJbmZvTGlua1RleHQ7XG4gICAgICAgIHZhciBtb3JlSW5mb1VybCA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLm1vcmVJbmZvVXJsO1xuXG4gICAgICAgIGluZm9QYXJhZ3JhcGguYXBwZW5kKGZhY3QpO1xuXG4gICAgICAgICQuZWFjaChsaXN0SXRlbXMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuICAgICAgICAgIGFkdmljZUxpc3QuYXBwZW5kKCc8bGk+JyArIHZhbHVlICsgJzwvbGk+Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtb3JlSW5mbykge1xuICAgICAgICAgIG1vcmVJbmZvUGFuZWwuc2hvdygpO1xuICAgICAgICAgIG1vcmVJbmZvTGluay5hcHBlbmQobW9yZUluZm8pO1xuICAgICAgICB9XG5cbiAgICAgICAgbW9yZUluZm9MaW5rLmF0dHIoXCJocmVmXCIsICcnICsgbW9yZUluZm9VcmwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJlZEdyZWVuQ29sb3JCbGluZG5lc3MgPSByZWRHcmVlbkNvbG9yQmxpbmRuZXNzO1xuZnVuY3Rpb24gcmVkR3JlZW5Db2xvckJsaW5kbmVzcygpIHtcblxuICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHsgZmlsZTogJ3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL2NvbnRlbnQuanMnIH0pO1xuXG4gIGNocm9tZS50YWJzLmluc2VydENTUyh7IGZpbGU6ICdzaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy9yZWRHcmVlbkNvbG9yQmxpbmRuZXNzL2Nzcy9tYWluLmNzcycgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMudG90YWxDb2xvckJsaW5kbmVzcyA9IHRvdGFsQ29sb3JCbGluZG5lc3M7XG5mdW5jdGlvbiB0b3RhbENvbG9yQmxpbmRuZXNzKCkge1xuXG4gIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoeyBmaWxlOiAnc2ltdWxhdGlvbnMvY29sb3JCbGluZG5lc3MvY29udGVudC5qcycgfSk7XG5cbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHsgZmlsZTogJ3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL3RvdGFsQ29sb3JCbGluZG5lc3MvY3NzL21haW4uY3NzJyB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy55ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3MgPSB5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3M7XG5mdW5jdGlvbiB5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3MoKSB7XG5cbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7IGZpbGU6ICdzaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy9jb250ZW50LmpzJyB9KTtcblxuICBjaHJvbWUudGFicy5pbnNlcnRDU1MoeyBmaWxlOiAnc2ltdWxhdGlvbnMvY29sb3JCbGluZG5lc3MveWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzL2Nzcy9tYWluLmNzcycgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jb25jZW50cmF0aW9uID0gY29uY2VudHJhdGlvbjtcbmZ1bmN0aW9uIGNvbmNlbnRyYXRpb24oKSB7XG5cbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7XG4gICAgZmlsZTogJ3NpbXVsYXRpb25zL2NvbmNlbnRyYXRpb24vY29udGVudC5qcydcbiAgfSk7XG5cbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHtcbiAgICBmaWxlOiBcInNpbXVsYXRpb25zL2NvbmNlbnRyYXRpb24vY3NzL21haW4uY3NzXCJcbiAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZHlzbGV4aWEgPSBkeXNsZXhpYTtcbmZ1bmN0aW9uIGR5c2xleGlhKCkge1xuICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHsgZmlsZTogJ3NpbXVsYXRpb25zL2R5c2xleGlhL2NvbnRlbnQuanMnIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZmFyc2lnaHRlZG5lc3MgPSBmYXJzaWdodGVkbmVzcztcbmZ1bmN0aW9uIGZhcnNpZ2h0ZWRuZXNzKGUpIHtcbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHtcbiAgICBmaWxlOiBcInNpbXVsYXRpb25zL2ZhcnNpZ2h0ZWRuZXNzL2Nzcy9tYWluLmNzc1wiXG4gIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmxvYWRpbmdNb2RhbCA9IGxvYWRpbmdNb2RhbDtcbmZ1bmN0aW9uIGxvYWRpbmdNb2RhbCgpIHtcbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7IGZpbGU6ICdzaW11bGF0aW9ucy9nZW5lcmFsL2xvYWRpbmcvY29udGVudC5qcycgfSk7XG5cbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHsgZmlsZTogJ3NpbXVsYXRpb25zL2dlbmVyYWwvbG9hZGluZy9tYWluLmNzcycgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yZXNldCA9IHJlc2V0O1xuLy9nZW5lcmFsXG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICBjaHJvbWUudGFicy5pbnNlcnRDU1Moe1xuICAgIGZpbGU6IFwic2ltdWxhdGlvbnMvZ2VuZXJhbC9yZXNldC9tYWluLmNzc1wiXG4gIH0pO1xuXG4gIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoe1xuICAgIGZpbGU6IFwic2ltdWxhdGlvbnMvZ2VuZXJhbC9yZXNldC9jb250ZW50LmpzXCJcbiAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5wYXJraW5zb25zID0gcGFya2luc29ucztcbmZ1bmN0aW9uIHBhcmtpbnNvbnMoKSB7XG5cbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7XG4gICAgZmlsZTogJ3NpbXVsYXRpb25zL3BhcmtpbnNvbnMvY29udGVudC5qcydcbiAgfSk7XG5cbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHtcbiAgICBmaWxlOiBcInNpbXVsYXRpb25zL3BhcmtpbnNvbnMvY3NzL21haW4uY3NzXCJcbiAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy50dW5uZWxWaXNpb24gPSB0dW5uZWxWaXNpb247XG5mdW5jdGlvbiB0dW5uZWxWaXNpb24oKSB7XG5cbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7IGZpbGU6ICdzaW11bGF0aW9ucy90dW5uZWxWaXNpb24vY29udGVudC5qcycgfSk7XG5cbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHtcbiAgICBmaWxlOiBcInNpbXVsYXRpb25zL3R1bm5lbFZpc2lvbi9jc3MvbWFpbi5jc3NcIlxuICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIl19
