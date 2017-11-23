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
    $('#panel2').removeClass("hide").addClass("in");

    setTimeout(function () {
      runSimulation();
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

  function runSimulation() {

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

    tooltip.removeClass("in");
    $("#panel1").addClass("in");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxVSVxcYXBwLmpzIiwiYnVpbGQvanMvYmFiZWwvVUkvZGF0YS9kYXRhLmpzb24iLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcY29sb3JCbGluZG5lc3NcXHJlZEdyZWVuQ29sb3JCbGluZG5lc3NcXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXGNvbG9yQmxpbmRuZXNzXFx0b3RhbENvbG9yQmxpbmRuZXNzXFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxjb2xvckJsaW5kbmVzc1xceWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxjb25jZW50cmF0aW9uXFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxkeXNsZXhpYVxcaW5kZXguanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcZmFyc2lnaHRlZG5lc3NcXGluZGV4LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcc2ltdWxhdGlvbnNcXGdlbmVyYWxcXHJlc2V0XFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFxwYXJraW5zb25zXFxpbmRleC5qcyIsImJ1aWxkXFxqc1xcYmFiZWxcXHNpbXVsYXRpb25zXFx0dW5uZWxWaXNpb25cXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsSUFBSSxTQUFTLFFBQVEsa0NBQVIsQ0FBYjs7QUFFQSxJQUFJLFVBQVUsUUFBUSx1Q0FBUixDQUFkOztBQUVBLElBQUksVUFBVSxRQUFRLHdDQUFSLENBQWQ7O0FBRUEsSUFBSSxVQUFVLFFBQVEsc0NBQVIsQ0FBZDs7QUFFQSxJQUFJLFVBQVUsUUFBUSwrREFBUixD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cyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9pbmRleCA9IHJlcXVpcmUoJy4uL3NpbXVsYXRpb25zL2R5c2xleGlhL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXgyID0gcmVxdWlyZSgnLi4vc2ltdWxhdGlvbnMvZ2VuZXJhbC9yZXNldC9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4MyA9IHJlcXVpcmUoJy4uL3NpbXVsYXRpb25zL2ZhcnNpZ2h0ZWRuZXNzL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXg0ID0gcmVxdWlyZSgnLi4vc2ltdWxhdGlvbnMvdHVubmVsVmlzaW9uL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXg1ID0gcmVxdWlyZSgnLi4vc2ltdWxhdGlvbnMvY29sb3JCbGluZG5lc3MvcmVkR3JlZW5Db2xvckJsaW5kbmVzcy9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4NiA9IHJlcXVpcmUoJy4uL3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL3llbGxvd0JsdWVDb2xvckJsaW5kbmVzcy9pbmRleC5qcycpO1xuXG52YXIgX2luZGV4NyA9IHJlcXVpcmUoJy4uL3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL3RvdGFsQ29sb3JCbGluZG5lc3MvaW5kZXguanMnKTtcblxudmFyIF9pbmRleDggPSByZXF1aXJlKCcuLi9zaW11bGF0aW9ucy9jb25jZW50cmF0aW9uL2luZGV4LmpzJyk7XG5cbnZhciBfaW5kZXg5ID0gcmVxdWlyZSgnLi4vc2ltdWxhdGlvbnMvcGFya2luc29ucy9pbmRleC5qcycpO1xuXG52YXIgX2RhdGEgPSByZXF1aXJlKCcuL2RhdGEvZGF0YS5qc29uJyk7XG5cbnZhciBkYXRhID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2RhdGEpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG4vLyBpbXBvcnQge2xvYWRpbmdNb2RhbH0gZnJvbSAnLi4vc2ltdWxhdGlvbnMvZ2VuZXJhbC9sb2FkaW5nL2luZGV4LmpzJ1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gIHZhciB0b29sdGlwID0gJChcIi50b29sLXRpcFwiKTtcbiAgdmFyIGluZm9IZWFkaW5nID0gJChcIi5kaXNhYmlsaXR5LWluZm8taGVhZGluZ1wiKTtcbiAgdmFyIGluZm9QYXJhZ3JhcGggPSAkKFwiLmRpc2FiaWxpdHktaW5mby1wYXJhZ3JhcGhcIik7XG4gIHZhciBhZHZpY2VMaXN0ID0gJChcIi5hZHZpY2UtbGlzdFwiKTtcbiAgdmFyIG1vcmVJbmZvTGluayA9ICQoXCIubW9yZS1pbmZvLWxpbmtcIik7XG4gIHZhciBtb3JlSW5mb1BhbmVsID0gJChcIiNtb3JlLWluZm8tcGFuZWxcIik7XG4gIHZhciByZXNldEJ0biA9ICQoXCIjcmVzZXQtYnRuXCIpO1xuICB2YXIgbmF2YmFySGVhZGVyID0gJChcIi5uYXZiYXItaGVhZGVyXCIpO1xuICB2YXIgcmVzZXRCdG5UZXh0ID0gZGF0YS5VSVswXS5yZXNldEJ0blRleHQ7XG4gIHZhciBuYXZiYXJIZWFkZXJUZXh0ID0gZGF0YS5VSVswXS5uYXZiYXJIZWFkZXJUZXh0O1xuICB2YXIgc2ltdWxhdGlvbkhlYWRpbmdUZXh0ID0gZGF0YS5VSVswXS5zaW11bGF0aW9uc1swXS5oZWFkaW5nO1xuICB2YXIgYWR2aWNlRHJvcGRvd24gPSAkKFwiI2FkdmljZS1kcm9wZG93blwiKTtcbiAgdmFyIGFkdmljZURyb3Bkb3duVGV4dCA9IGRhdGEuVUlbMF0uYWR2aWNlRHJvcGRvd25UZXh0O1xuICB2YXIgaW5mb0Ryb3Bkb3duID0gJChcIiNpbmZvLWRyb3Bkb3duXCIpO1xuICB2YXIgaW5mb0Ryb3Bkb3duVGV4dCA9IGRhdGEuVUlbMF0uaW5mb0Ryb3Bkb3duVGV4dDtcblxuICB2YXIgYWN0aXZlU2ltdWxhdGlvbiA9IHZvaWQgMDtcblxuICAvL0FwcGVuZCBVSSB0ZXh0c1xuXG4gIG5hdmJhckhlYWRlci50ZXh0KG5hdmJhckhlYWRlclRleHQpO1xuICByZXNldEJ0bi50ZXh0KHJlc2V0QnRuVGV4dCk7XG4gIGluZm9Ecm9wZG93bi50ZXh0KGluZm9Ecm9wZG93blRleHQpO1xuICBhZHZpY2VEcm9wZG93bi50ZXh0KGFkdmljZURyb3Bkb3duVGV4dCk7XG5cbiAgJC5lYWNoKGRhdGEuVUlbMF0uc2ltdWxhdGlvbnMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuXG4gICAgJCgnIycgKyB2YWx1ZS5oZWFkaW5nKS50ZXh0KHZhbHVlLmhlYWRpbmcpO1xuXG4gICAgJC5lYWNoKHZhbHVlLmNob2ljZXMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuICAgICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgICAgICQoJyMnICsga2V5KS50ZXh0KHZhbHVlW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICAvL21lbnUgYnV0dG9uIGNsaWNrXG5cbiAgJChcIi5tZW51LWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgbWVudUJ0biA9ICQodGhpcyk7XG4gICAgdmFyIG1lbnVCdG5JZCA9IG1lbnVCdG5bMF0uaWQ7XG4gICAgdmFyIGlkID0gbWVudUJ0bi5hdHRyKFwiaWRcIik7XG4gICAgdmFyIGZhY3QgPSBkYXRhLmZhY3RzLmZpbmQoZmluZFByb3BlcnR5KS5mYWN0O1xuICAgIHZhciBsaXN0SXRlbXMgPSBkYXRhLmZhY3RzLmZpbmQoZmluZFByb3BlcnR5KS5saXN0SXRlbXM7XG4gICAgdmFyIG1vcmVJbmZvID0gZGF0YS5mYWN0cy5maW5kKGZpbmRQcm9wZXJ0eSkubW9yZUluZm9MaW5rVGV4dDtcbiAgICB2YXIgbW9yZUluZm9VcmwgPSBkYXRhLmZhY3RzLmZpbmQoZmluZFByb3BlcnR5KS5tb3JlSW5mb1VybDtcblxuICAgIGZ1bmN0aW9uIGZpbmRQcm9wZXJ0eShzaW11bGF0aW9ucykge1xuICAgICAgcmV0dXJuIHNpbXVsYXRpb25zLm5hbWUgPT09IGlkO1xuICAgIH1cblxuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEljb24oe1xuICAgICAgcGF0aDogXCJpbWcvaWNvbl9hY3RpdmUucG5nXCJcbiAgICB9KTtcblxuICAgIGFjdGl2ZVNpbXVsYXRpb24gPSBtZW51QnRuSWQ7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgJ2FjdGl2ZVNpbXVsYXRpb24nOiBtZW51QnRuSWQgfSk7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgJ2xpbmtVcmwnOiBtb3JlSW5mb1VybCB9KTtcblxuICAgIGluZm9IZWFkaW5nLmVtcHR5KCk7XG4gICAgaW5mb1BhcmFncmFwaC5lbXB0eSgpO1xuICAgIGFkdmljZUxpc3QuZW1wdHkoKTtcbiAgICBtb3JlSW5mb0xpbmsuZW1wdHkoKTtcbiAgICBtb3JlSW5mb1BhbmVsLmhpZGUoKTtcblxuICAgIGluZm9IZWFkaW5nLmFwcGVuZChtZW51QnRuLnRleHQoKSk7XG5cbiAgICBtZW51QnRuLmNsb3Nlc3QoXCIuZHJvcGRvd25cIikuZmluZChcIi5zZWxlY3RlZFwiKS50ZXh0KG1lbnVCdG4udGV4dCgpKTtcblxuICAgIGluZm9QYXJhZ3JhcGguYXBwZW5kKGZhY3QpO1xuXG4gICAgJC5lYWNoKGxpc3RJdGVtcywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG4gICAgICBhZHZpY2VMaXN0LmFwcGVuZCgnPGxpPicgKyB2YWx1ZSArICc8L2xpPicpO1xuICAgIH0pO1xuXG4gICAgaWYgKG1vcmVJbmZvKSB7XG4gICAgICBtb3JlSW5mb1BhbmVsLnNob3coKTtcbiAgICAgIG1vcmVJbmZvTGluay5hcHBlbmQobW9yZUluZm8pO1xuICAgIH1cblxuICAgIG1vcmVJbmZvTGluay5hdHRyKFwiaHJlZlwiLCAnJyArIG1vcmVJbmZvVXJsKTtcblxuICAgICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImluXCIpO1xuICAgICQoJyNwYW5lbDInKS5yZW1vdmVDbGFzcyhcImhpZGVcIikuYWRkQ2xhc3MoXCJpblwiKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgcnVuU2ltdWxhdGlvbigpO1xuICAgIH0sIDUwMCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNwYW5lbDInKS5yZW1vdmVDbGFzcyhcImluXCIpO1xuICAgICAgdG9vbHRpcC5hZGRDbGFzcyhcImluXCIpO1xuICAgIH0sIDEwMDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwyJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgIH0sIDE1MDApO1xuICB9KTtcblxuICAvL3doZW4gbG9hZGluZyBtb2RhbCBpcyBjbG9zZWQsIHNob3cgY2hvc2VuIHNpbXVsYXRpb25cblxuICBmdW5jdGlvbiBydW5TaW11bGF0aW9uKCkge1xuXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuXG4gICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJmYXJzaWdodGVkbmVzc1wiKSB7XG4gICAgICAgICgwLCBfaW5kZXgzLmZhcnNpZ2h0ZWRuZXNzKSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJ0dW5uZWxWaXNpb25cIikge1xuICAgICAgICAoMCwgX2luZGV4NC50dW5uZWxWaXNpb24pKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmouYWN0aXZlU2ltdWxhdGlvbiA9PSBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIikge1xuICAgICAgICAoMCwgX2luZGV4NS5yZWRHcmVlbkNvbG9yQmxpbmRuZXNzKSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIikge1xuICAgICAgICAoMCwgX2luZGV4Ni55ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3MpKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmouYWN0aXZlU2ltdWxhdGlvbiA9PSBcInRvdGFsQ29sb3JCbGluZG5lc3NcIikge1xuICAgICAgICAoMCwgX2luZGV4Ny50b3RhbENvbG9yQmxpbmRuZXNzKSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqLmFjdGl2ZVNpbXVsYXRpb24gPT0gXCJjb25jZW50cmF0aW9uXCIpIHtcbiAgICAgICAgKDAsIF9pbmRleDguY29uY2VudHJhdGlvbikoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iai5hY3RpdmVTaW11bGF0aW9uID09IFwicGFya2luc29uc1wiKSB7XG4gICAgICAgICgwLCBfaW5kZXg5LnBhcmtpbnNvbnMpKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmouYWN0aXZlU2ltdWxhdGlvbiA9PSBcImR5c2xleGlhXCIpIHtcbiAgICAgICAgc3RhcnRTaW11bGF0aW9uKCdkeXNsZXhpYScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy9yZXNldCBleHRlbnNpb25cblxuICBmdW5jdGlvbiByZXNldFNpbXVsYXRpb24oKSB7XG5cbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtcbiAgICAgIHBhdGg6IFwiaW1nL2ljb24ucG5nXCJcbiAgICB9KTtcblxuICAgIHRvb2x0aXAucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAkKFwiI3BhbmVsMVwiKS5hZGRDbGFzcyhcImluXCIpO1xuXG4gICAgJChcIiNTeW5cIikudGV4dChcIlN5blwiKTtcbiAgICAkKFwiI01vdG9yaWtcIikudGV4dChcIk1vdG9yaWtcIik7XG5cbiAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFic1swXS5pZCwgeyBhY3Rpb246ICdzdG9wU2ltdWxhdGlvbicsIHNpbXVsYXRpb246IGFjdGl2ZVNpbXVsYXRpb24gfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBhY3RpdmVTaW11bGF0aW9uID0gbnVsbDtcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKCdhY3RpdmVTaW11bGF0aW9uJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHJlc2V0KCk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0U2ltdWxhdGlvbihzaW11bGF0aW9uKSB7XG4gICAgY29uc29sZS5sb2coJ3N0YXJ0U2ltdWxhdGlvbicpO1xuICAgICgwLCBfaW5kZXguZHlzbGV4aWEpKCk7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYnNbMF0uaWQsIHsgYWN0aW9uOiAnc3RhcnRTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogc2ltdWxhdGlvbiB9LCBmdW5jdGlvbiAoKSB7fSk7XG4gICAgfSk7XG4gIH1cblxuICAvL2J0biBhbmQgbGlua3NcblxuICAkKFwiI3Jlc2V0LWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgcmVzZXRTaW11bGF0aW9uKCk7XG4gIH0pO1xuXG4gICQoXCIuZ2l0aHViLWxpbmtcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9NZXRhbWF0cml4L1dlYi1EaXNhYmlsaXR5LVNpbXVsYXRvcicgfSk7XG4gIH0pO1xuXG4gICQoXCIubW9yZS1pbmZvLWxpbmtcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnbGlua1VybCcsIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogJycgKyBvYmoubGlua1VybCB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy9wYW5lbCBjb2xsYXBzZSwgc2hvdyBhcnJvd3M6IFxuXG4gICQoJy5jb2xsYXBzZScpLm9uKCdzaG93bi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCIuZG93bi1hcnJvdywgLnVwLWFycm93XCIpLnRvZ2dsZSgpO1xuICB9KS5vbignaGlkZGVuLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucGFyZW50KCkuZmluZChcIi5kb3duLWFycm93LCAudXAtYXJyb3dcIikudG9nZ2xlKCk7XG4gIH0pO1xuXG4gIC8va2VlcCBjaG9zZW4gc2ltdWxhdGlvbiBmYWN0IHRvb2x0aXAgd2hlbiBleHRlbnNpb24gaXMgY2xvc2VkIGFuZCBvcGVuZWQgYWdhaW4uIFxuXG4gIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2FjdGl2ZVNpbXVsYXRpb24nLCBmdW5jdGlvbiAob2JqKSB7XG5cbiAgICAgIHZhciBhY3RpdmVTaW11bGF0aW9uID0gb2JqLmFjdGl2ZVNpbXVsYXRpb247XG5cbiAgICAgIGZ1bmN0aW9uIGZpbmRQcm9wZXJ0eShzaW11bGF0aW9ucykge1xuICAgICAgICByZXR1cm4gc2ltdWxhdGlvbnMubmFtZSA9PT0gYWN0aXZlU2ltdWxhdGlvbjtcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGl2ZVNpbXVsYXRpb24gIT0gbnVsbCkge1xuXG4gICAgICAgIHRvb2x0aXAuY3NzKFwibGVmdFwiLCBcIjBcIik7XG5cbiAgICAgICAgaW5mb0hlYWRpbmcuYXBwZW5kKCQoJyMnICsgYWN0aXZlU2ltdWxhdGlvbikudGV4dCgpKTtcblxuICAgICAgICAkKCcjJyArIGFjdGl2ZVNpbXVsYXRpb24pLmNsb3Nlc3QoXCIuZHJvcGRvd25cIikuZmluZChcIi5zZWxlY3RlZFwiKS50ZXh0KCQoJyMnICsgYWN0aXZlU2ltdWxhdGlvbikudGV4dCgpKTtcblxuICAgICAgICB2YXIgaWQgPSAkKCcjJyArIGFjdGl2ZVNpbXVsYXRpb24pLmF0dHIoXCJpZFwiKTtcblxuICAgICAgICB2YXIgZmFjdCA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLmZhY3Q7XG4gICAgICAgIHZhciBsaXN0SXRlbXMgPSBkYXRhLmZhY3RzLmZpbmQoZmluZFByb3BlcnR5KS5saXN0SXRlbXM7XG4gICAgICAgIHZhciBtb3JlSW5mbyA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLm1vcmVJbmZvTGlua1RleHQ7XG4gICAgICAgIHZhciBtb3JlSW5mb1VybCA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLm1vcmVJbmZvVXJsO1xuXG4gICAgICAgIGluZm9QYXJhZ3JhcGguYXBwZW5kKGZhY3QpO1xuXG4gICAgICAgICQuZWFjaChsaXN0SXRlbXMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuICAgICAgICAgIGFkdmljZUxpc3QuYXBwZW5kKCc8bGk+JyArIHZhbHVlICsgJzwvbGk+Jyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtb3JlSW5mbykge1xuICAgICAgICAgIG1vcmVJbmZvUGFuZWwuc2hvdygpO1xuICAgICAgICAgIG1vcmVJbmZvTGluay5hcHBlbmQobW9yZUluZm8pO1xuICAgICAgICB9XG5cbiAgICAgICAgbW9yZUluZm9MaW5rLmF0dHIoXCJocmVmXCIsICcnICsgbW9yZUluZm9VcmwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAuanMubWFwXG4iLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgXCJmYWN0c1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIFwibmFtZVwiOiBcImR5c2xleGlhXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIkR5c2xleGkgw6RyIGVuIG5lZHPDpHR0bmluZyBzb20gZ8O2ciBhdHQgaGrDpHJuYW4gaGFyIHN2w6VydCBhdHQgYXV0b21hdGlzZXJhIHRvbGtuaW5nZW4gYXYgb3JkLiBEZXR0YSBnw7ZyIGF0dCBwZXJzb25lciBtZWQgZGVubmEgbmVkc8OkdHRuaW5nIGthbiBoYSBzdsOlcnQgYXR0IGzDpHNhIG9jaCBza3JpdmEuIER5c2xleGkgw6RyIGludGUga29wcGxhdCB0aWxsIHN5biBlbGxlciBpbnRlbGxpZ2Vucy4gT3JzYWtlcm5hIHRpbGwgZHlzbGV4aSDDpHIgZm9ydGZhcmFuZGUgb2tsYXJ0LlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJVbmR2aWsgdGV4dCBpIGxpdGVuIHN0b3JsZWsgb2NoIGzDpW5nYSB0ZXh0ZXIuIFNlIHRpbGwgYXR0IGhhIG9yZGVudGxpZ3QgbWVkIHJhZGF2c3TDpW5kLlwiLCBcdFxyXG4gICAgICAgIFwiVW5kdmlrIHN2w6VyYSBvcmQgb2NoIGZhY2t0ZXJtZXIuXCIsXHJcbiAgICAgICAgXCJFcmJqdWQgbMOkdHRsw6RzdGEgdmVyc2lvbmVyIGF2IGZhY2t0ZXh0ZXIuXCIsXHJcbiAgICAgICAgXCJVbmR2aWsgdHlwc25pdHQgbWVkIGtyw6VuZ2xpZ2Egb2NoIGtvbXBsZXhhIGZpZ3VyZXIuXCJcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJwYXJraW5zb25zXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlZpZCBQYXJraW5zb25zIHNqdWtkb20gZsO2cnN0w7ZycyBjZWxsZXJuYSBpIGhqw6RybmFuIHNvbSB0aWxsdmVya2FyIGRvcGFtaW4gdmlsa2V0IGfDtnIgYXR0IGhqw6RybmFuIGbDpXIgZW4gbmVkc2F0dCBmw7ZybcOlZ2EgYXR0IHNraWNrYSBzaWduYWxlci4gUGVyc29uZXIgbWVkIFBhcmtpbnNvbnMga2FuIGRyYWJiYXMgYXYgc3ltcHRvbSBzb20gc2tha25pbmdhciwgc3RlbGEgbXVza2xlciBvY2ggc8OkbXJlIHLDtnJlbHNlZsO2cm3DpWdhLiBPcnNha2VybmEgdGlsbCBQYXJraW5zb25zIHNqdWtkb20gw6RyIGZvcnRmYXJhbmRlIG9rbGFydC5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiU2UgdGlsbCBhdHQgd2ViYnBsYXRzZW4ga2FuIGFudsOkbmRhcyBtZWQgYW5kcmEgaGrDpGxwbWVkZWwgw6RuIG11cywgdGlsbCBleGVtcGVsIHRhbmdlbnRib3Jkc25hdmlnZXJpbmcuXCIsIFx0XHJcbiAgICAgICAgXCJIYSB0aWxscsOkY2tsaWd0IG1lZCBsdWZ0IG1lbGxhbiBrb21wb25lbnRlclwiLFxyXG4gICAgICAgIFwiSGEgdGlsbHLDpGNrbGlndCBzdG9yYSBrbGlja3l0b3IuXCIsXHJcbiAgICAgICAgXCJVbmR2aWsgdHlwc25pdHQgbWVkIGtyw6VuZ2xpZ2Egb2NoIGtvbXBsZXhhIGZpZ3VyZXIuXCJcclxuICAgICAgXSxcclxuICAgICAgXCJtb3JlSW5mb1VybFwiOiBcImh0dHA6Ly93d3cucGFya2luc29uZm9yYnVuZGV0LnNlXCIsXHJcbiAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJQYXJraW5zb25zZsO2cmJ1bmRldFwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIixcclxuICAgICAgXCJmYWN0XCI6IFwiUGVyc29uZXIgbWVkIGRlZmVrdCBmw6RyZ3NlZW5kZSBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHRhcHBhciBzb20gdGFyIHVwcCBmw6RyZ2VybmEgdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE7DpHIgZW4gZWxsZXIgZmxlcmEgYXYgdGFwcGFybmEgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhIGxlZGVyIGRldCB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZS4gR3VsLWJsw6UgZsOkcmdibGluZGhldCAoVHJpdGFub3BpKSDDpHIgc8OkbGxzeW50LiBOYW1uZXQgw6RyIG1pc3NsZWRhbmRlIGTDpSBkZXQgaW50ZSDDpHIgZsOkcmdlcm5hIGd1bCBvY2ggYmzDpSBzb20gZsO2cnbDpHhsYXMsIHV0YW4gYmzDpSBtZWQgZ3LDtm4gb2NoIGd1bCBtZWQgbGlsYS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBkZXQgZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCBlbiByw7ZkIHJhbSB1dGFuIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IG9jaCBnw6RybmEgZW4gaWtvbi5cIiwgXHRcclxuICAgICAgICBcIkVyYmp1ZCBnw6RybmEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxyXG4gICAgICBdLFxyXG4gICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cHM6Ly9zdi53aWtpcGVkaWEub3JnL3dpa2kvRGVmZWt0X2YlQzMlQTRyZ3NlZW5kZVwiLFxyXG4gICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2lraXBlZGlhIG9tIGRlZmVrdCBmw6RyZ3NlZW5kZVwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBkZWZla3QgZsOkcmdzZWVuZGUgaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0YXBwYXIgc29tIHRhciB1cHAgZsOkcmdlcm5hIHZpb2xldHQsIGdyw7ZuIG9jaCByw7ZkLiBOw6RyIGVuIGVsbGVyIGZsZXJhIGF2IHRhcHBhcm5hIHNha25hcyBlbGxlciDDpHIgZGVmZWt0YSBsZWRlciBkZXQgdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUuIFLDtmQtZ3LDtm4gZsOkcmdibGluZGhldCAoUHJvdGFub3BpIG9jaCBEZXV0ZXJhbm9waSkgw6RyIGRlbiB2YW5saWdhc3RlIHR5cGVuIGF2IGbDpHJnYmxpbmRoZXQuIERlbiDDpHIgdmFubGlnYXJlIGhvcyBtw6RuIMOkbiBrdmlubm9yLiBQZXJzb25lciByw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXQgaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSBmw6RyZ2VybmEgcsO2ZCwgZ3LDtm4sIGJydW4gb2NoIG9yYW5nZS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1wiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBlbmRhIHPDpHR0ZXQgYXR0IGbDtnJtZWRsYSBpbmZvcm1hdGlvbiwgaW5kaWtlcmEgZW4gaGFuZGxpbmcgZWxsZXIgaWRlbnRpZmllcmEgZXR0IGVsZW1lbnQuIE1hcmtlcmEgdGlsbCBleGVtcGVsIGludGUgZXR0IGZlbGFrdGlndCBmb3JtdWzDpHJmw6RsdCBlbmRhc3QgbWVkIHLDtmQgcmFtLCBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBvY2ggZ8Okcm5hIGVuICBpa29uLlwiLCBcIkVyYmp1ZCBnw6RybmEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIl0sXHJcbiAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwczovL3N2Lndpa2lwZWRpYS5vcmcvd2lraS9EZWZla3RfZiVDMyVBNHJnc2VlbmRlXCIsXHJcbiAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJXaWtpcGVkaWEgb20gZGVmZWt0IGbDpHJnc2VlbmRlXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIFwibmFtZVwiOiBcImZhcnNpZ2h0ZWRuZXNzXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBIeXBlcm9waSBzZXIgc3VkZGlndCBww6UgbsOkcmEgaMOlbGwsIG1lbiBicmEgcMOlIGzDpW5ndCBow6VsbC4gTmVkc8OkdHRuaW5nZW4gdXBwc3TDpXIgcMOlIGdydW5kIGF2IGF0dCBsanVzZXQgaW50ZSBicnl0cyByw6R0dCBpIMO2Z2F0LiBEZXQgw6RyIGVuIGF2IGRlIHZhbmxpZ2FzdGUgc3lubmVkc8OkdHRuaW5nYXJuYS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrLlwiLCBcdFxyXG4gICAgICAgIFwiV2ViYnNpZGFuIHNrYSBnw6UgYXR0IGbDtnJzdG9yYSAoem9vbWFzKSB0aWxsIG1pbnN0IDIwMCAlIHPDpSBhdHQgYmVzw7ZrYXJlbiBrYW4gYW5wYXNzYSBpbm5laMOlbGxldHMgc3RvcmxlayBlZnRlciBzaW5hIGJlaG92LlwiLFxyXG4gICAgICAgIFwiRXJianVkIHVwcGzDpHNuaW5nIGF2IGlubmVow6VsbGV0LlwiXHJcbiAgICAgIF0sXHJcbiAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwczovL3dlYmJyaWt0bGluamVyLnNlL3IvMzktZ2Utd2ViYnBsYXRzZW4tZW4tZ29kLWxhc2JhcmhldC9cIixcclxuICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldlYmJyaWt0bGluamUgR2Ugd2ViYnBsYXRzZW4gZ29kIGzDpHNiYXJoZXRcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJuYW1lXCI6IFwidG90YWxDb2xvckJsaW5kbmVzc1wiLFxyXG4gICAgICBcImZhY3RcIjogXCJEZWZla3QgZsOkcmdzZWVuZGUgaW5uZWLDpHIgYXR0IGVuIHBlcnNvbiBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHR5cGVyIGF2IHRhcHBhciBzb20gdGFyIHVwcCBvbGlrYSBmw6RyZ2VyOiB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gT3JzYWtlbiB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZSDDpHIgYXR0IGVuIGVsbGVyIGZsZXJhIGF2IGRlc3NhIHR5cGVyIGF2IHRhcHBhciBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEuIEhlbHQgZsOkcmdibGluZCAoTW9ub2tyb21hc2kvYWtyb21hdG9wc2kpIMOkciBteWNrZXQgc8OkbGxzeW50LiBQZXJzb25lciBtZWQgZGVubmEgc3lubmVkc8OkdHRuaW5nIHNlciBpbmdhIGbDpHJnZXIgdXRhbiBzZXIgZW5kYXN0IGkgZ3LDpXNrYWxhLlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJBbnbDpG5kIGludGUgZsOkcmcgc29tIGRldCBlbmRhIHPDpHR0ZXQgYXR0IGbDtnJtZWRsYSBpbmZvcm1hdGlvbiwgaW5kaWtlcmEgZW4gaGFuZGxpbmcgZWxsZXIgaWRlbnRpZmllcmEgZWxlbWVudC4gTWFya2VyYSB0LmV4LiBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCByw7ZkIHJhbSwga29tcGxldHRlcmEgw6R2ZW4gbWVkIHRleHQgZWxsZXIgaWtvbi5cIiwgXHRcclxuICAgICAgICBcIkRldCBrYW4gdmFyYSBlbiBicmEgaWTDqSBhdHQgZXJianVkYSBldHQgaMO2Z2tvbnRyYXN0LWzDpGdlLlwiXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIFwibmFtZVwiOiBcInR1bm5lbFZpc2lvblwiLFxyXG4gICAgICBcImZhY3RcIjogXCJUdW5uZWxzZWVuZGUgaW5uZWLDpHIuLi5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiTGlzdGl0ZW0gMVwiLCBcdFxyXG4gICAgICAgIFwiTGlzdGl0ZW0gMi5cIlxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJjb25jZW50cmF0aW9uXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIktvbmNlbnRyYXRpb25zc3bDpXJpZ2hldGVyIGlubmViw6RyLi4uXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIkxpc3RpdGVtIDFcIiwgXHRcclxuICAgICAgICBcIkxpc3RpdGVtIDIuXCJcclxuICAgICAgXVxyXG4gICAgfVxyXG4gIF0sXHJcbiAgXCJVSVwiOiBbe1xyXG4gICAgXCJuYXZiYXJIZWFkZXJUZXh0XCI6IFwiVsOkbGogZnVua3Rpb25zbmVkc8OkdHRuaW5nOlwiLFxyXG4gICAgXCJyZXNldEJ0blRleHRcIjogXCLDhXRlcnN0w6RsbFwiLFxyXG4gICAgXCJhZHZpY2VEcm9wZG93blRleHRcIjogXCJUw6RuayBww6UgZGV0dGFcIixcclxuICAgIFwiaW5mb0Ryb3Bkb3duVGV4dFwiOiBcIk1lciBpbmZvcm1hdGlvblwiLFxyXG4gICAgXCJzaW11bGF0aW9uc1wiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJTeW5cIixcclxuICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgeyBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJIZWx0IGbDpHJnYmxpbmRcIiB9LFxyXG4gICAgICAgICAgeyBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIiB9LFxyXG4gICAgICAgICAgeyBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXRcIiB9LFxyXG4gICAgICAgICAgeyBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiTMOlbmdzeW50aGV0LCDDtnZlcnN5bnRoZXRcIiB9LFxyXG4gICAgICAgICAgeyBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbHNlZW5kZVwiIH1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJNb3RvcmlrXCIsXHJcbiAgICAgICAgXCJjaG9pY2VzXCI6IFsgXHJcbiAgICAgICAgICB7IFwicGFya2luc29uc1wiOiBcIlBhcmtpbnNvbnNcIiB9XHJcbiAgXHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJEeXNsZXhpXCIsXHJcbiAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJLb25jZW50cmF0aW9uXCIsXHJcbiAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJNaW5uZVwiLFxyXG4gICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICB9XHJcblxyXG4gICAgXVxyXG4gIH1dXHJcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJlZEdyZWVuQ29sb3JCbGluZG5lc3MgPSByZWRHcmVlbkNvbG9yQmxpbmRuZXNzO1xuZnVuY3Rpb24gcmVkR3JlZW5Db2xvckJsaW5kbmVzcygpIHtcblxuICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHsgZmlsZTogJ3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL2NvbnRlbnQuanMnIH0pO1xuXG4gIGNocm9tZS50YWJzLmluc2VydENTUyh7IGZpbGU6ICdzaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy9yZWRHcmVlbkNvbG9yQmxpbmRuZXNzL2Nzcy9tYWluLmNzcycgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMudG90YWxDb2xvckJsaW5kbmVzcyA9IHRvdGFsQ29sb3JCbGluZG5lc3M7XG5mdW5jdGlvbiB0b3RhbENvbG9yQmxpbmRuZXNzKCkge1xuXG4gIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoeyBmaWxlOiAnc2ltdWxhdGlvbnMvY29sb3JCbGluZG5lc3MvY29udGVudC5qcycgfSk7XG5cbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHsgZmlsZTogJ3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL3RvdGFsQ29sb3JCbGluZG5lc3MvY3NzL21haW4uY3NzJyB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy55ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3MgPSB5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3M7XG5mdW5jdGlvbiB5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3MoKSB7XG5cbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7IGZpbGU6ICdzaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy9jb250ZW50LmpzJyB9KTtcblxuICBjaHJvbWUudGFicy5pbnNlcnRDU1MoeyBmaWxlOiAnc2ltdWxhdGlvbnMvY29sb3JCbGluZG5lc3MveWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzL2Nzcy9tYWluLmNzcycgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jb25jZW50cmF0aW9uID0gY29uY2VudHJhdGlvbjtcbmZ1bmN0aW9uIGNvbmNlbnRyYXRpb24oKSB7XG5cbiAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh7XG4gICAgZmlsZTogJ3NpbXVsYXRpb25zL2NvbmNlbnRyYXRpb24vY29udGVudC5qcydcbiAgfSk7XG5cbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHtcbiAgICBmaWxlOiBcInNpbXVsYXRpb25zL2NvbmNlbnRyYXRpb24vY3NzL21haW4uY3NzXCJcbiAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZHlzbGV4aWEgPSBkeXNsZXhpYTtcbmZ1bmN0aW9uIGR5c2xleGlhKCkge1xuICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHsgZmlsZTogJ3NpbXVsYXRpb25zL2R5c2xleGlhL2NvbnRlbnQuanMnIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZmFyc2lnaHRlZG5lc3MgPSBmYXJzaWdodGVkbmVzcztcbmZ1bmN0aW9uIGZhcnNpZ2h0ZWRuZXNzKGUpIHtcbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHtcbiAgICBmaWxlOiBcInNpbXVsYXRpb25zL2ZhcnNpZ2h0ZWRuZXNzL2Nzcy9tYWluLmNzc1wiXG4gIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucmVzZXQgPSByZXNldDtcbi8vZ2VuZXJhbFxuXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHtcbiAgICBmaWxlOiBcInNpbXVsYXRpb25zL2dlbmVyYWwvcmVzZXQvbWFpbi5jc3NcIlxuICB9KTtcblxuICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHtcbiAgICBmaWxlOiBcInNpbXVsYXRpb25zL2dlbmVyYWwvcmVzZXQvY29udGVudC5qc1wiXG4gIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucGFya2luc29ucyA9IHBhcmtpbnNvbnM7XG5mdW5jdGlvbiBwYXJraW5zb25zKCkge1xuXG4gIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoe1xuICAgIGZpbGU6ICdzaW11bGF0aW9ucy9wYXJraW5zb25zL2NvbnRlbnQuanMnXG4gIH0pO1xuXG4gIGNocm9tZS50YWJzLmluc2VydENTUyh7XG4gICAgZmlsZTogXCJzaW11bGF0aW9ucy9wYXJraW5zb25zL2Nzcy9tYWluLmNzc1wiXG4gIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMudHVubmVsVmlzaW9uID0gdHVubmVsVmlzaW9uO1xuZnVuY3Rpb24gdHVubmVsVmlzaW9uKCkge1xuXG4gIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoeyBmaWxlOiAnc2ltdWxhdGlvbnMvdHVubmVsVmlzaW9uL2NvbnRlbnQuanMnIH0pO1xuXG4gIGNocm9tZS50YWJzLmluc2VydENTUyh7XG4gICAgZmlsZTogXCJzaW11bGF0aW9ucy90dW5uZWxWaXNpb24vY3NzL21haW4uY3NzXCJcbiAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiJdfQ==
