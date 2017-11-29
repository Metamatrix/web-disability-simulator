(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _data = require('./data/data.json');

var data = _interopRequireWildcard(_data);

var _simulationLoader = require('../utils/simulationLoader.js');

var simulationLoader = _interopRequireWildcard(_simulationLoader);

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

// import * as dyslexia from '../simulations/dyslexia/index.js'
// // import {reset} from '../simulations/general/reset/index.js'
// import * as farsightedness from '../simulations/farsightedness/index.js'
// import * as tunnelVision from '../simulations/tunnelVision/index.js'
// import * as redGreenColorBlindness from '../simulations/colorBlindness/redGreenColorBlindness/index.js'
// import * as yellowBlueColorBlindness from '../simulations/colorBlindness/yellowBlueColorBlindness/index.js'
// import * as totalColorBlindness from '../simulations/colorBlindness/totalColorBlindness/index.js'
// import * as concentration from '../simulations/concentration/index.js'
// import * as parkinsons from '../simulations/parkinsons/index.js'
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

    chrome.storage.local.get('activeSimulation', function (obj) {
      simulationLoader.start(obj.activeSimulation);
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

    chrome.storage.local.get('activeSimulation', function (obj) {
      simulationLoader.stop(obj.activeSimulation);
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


},{"../utils/simulationLoader.js":3,"./data/data.json":2}],2:[function(require,module,exports){
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
function load(name, subName, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0],
        scriptFile = subName ? 'simulations/' + name + '/' + subName + '/content.js' : 'simulations/' + name + '/content.js';

    chrome.tabs.executeScript(activeTab.id, { file: scriptFile }, function () {
      if (callback) {
        callback(name, subName);
      }
    });
  });
}

function start(name, subName) {
  console.log('simulationLoader', name);
  load(name, subName, function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id, { action: 'startSimulation', simulation: name, subSimulation: subName });
    });
  });
}

function stop(name, subName) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { action: 'stopSimulation', simulation: name, subSimulation: subName });
  });
}

exports.start = start;
exports.stop = stop;


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxVSVxcYXBwLmpzIiwiYnVpbGQvanMvYmFiZWwvVUkvZGF0YS9kYXRhLmpzb24iLCJidWlsZFxcanNcXGJhYmVsXFx1dGlsc1xcc2ltdWxhdGlvbkxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLElBQUksUUFBUSxRQUFRLGtCQUFSLENBQVo7O0FBRUEsSUFBSSxPQUFPLHdCQUF3QixLQUF4QixDQUFYOztBQUVBLElBQUksb0JBQW9CLFFBQVEsOEJBQVIsQ0FBeEI7O0FBRUEsSUFBSSxtQkFBbUIsd0JBQXdCLGlCQUF4QixDQUF2Qjs7QUFFQSxTQUFTLHVCQUFULENBQWlDLEdBQWpDLEVBQXNDO0FBQUUsTUFBSSxPQUFPLElBQUksVUFBZixFQUEyQjtBQUFFLFdBQU8sR0FBUDtBQUFhLEdBQTFDLE1BQWdEO0FBQUUsUUFBSSxTQUFTLEVBQWIsQ0FBaUIsSUFBSSxPQUFPLElBQVgsRUFBaUI7QUFBRSxXQUFLLElBQUksR0FBVCxJQUFnQixHQUFoQixFQUFxQjtBQUFFLFlBQUksT0FBTyxTQUFQLENBQWlCLGNBQWpCLENBQWdDLElBQWhDLENBQXFDLEdBQXJDLEVBQTBDLEdBQTFDLENBQUosRUFBb0QsT0FBTyxHQUFQLElBQWMsSUFBSSxHQUFKLENBQWQ7QUFBeUI7QUFBRSxLQUFDLE9BQU8sT0FBUCxHQUFpQixHQUFqQixDQUFzQixPQUFPLE1BQVA7QUFBZ0I7QUFBRTs7QUFFN1E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUFZOztBQUU1QixNQUFJLFVBQVUsRUFBRSxXQUFGLENBQWQ7QUFDQSxNQUFJLGNBQWMsRUFBRSwwQkFBRixDQUFsQjtBQUNBLE1BQUksZ0JBQWdCLEVBQUUsNEJBQUYsQ0FBcEI7QUFDQSxNQUFJLGFB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VixFQUE0QixZQUFZLElBQXhDLEVBQThDLGVBQWUsT0FBN0QsRUFBdEM7QUFDRCxHQUpEO0FBS0Q7O0FBRUQsUUFBUSxLQUFSLEdBQWdCLEtBQWhCO0FBQ0EsUUFBUSxJQUFSLEdBQWUsSUFBZjtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9kYXRhID0gcmVxdWlyZSgnLi9kYXRhL2RhdGEuanNvbicpO1xuXG52YXIgZGF0YSA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9kYXRhKTtcblxudmFyIF9zaW11bGF0aW9uTG9hZGVyID0gcmVxdWlyZSgnLi4vdXRpbHMvc2ltdWxhdGlvbkxvYWRlci5qcycpO1xuXG52YXIgc2ltdWxhdGlvbkxvYWRlciA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9zaW11bGF0aW9uTG9hZGVyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuLy8gaW1wb3J0ICogYXMgZHlzbGV4aWEgZnJvbSAnLi4vc2ltdWxhdGlvbnMvZHlzbGV4aWEvaW5kZXguanMnXG4vLyAvLyBpbXBvcnQge3Jlc2V0fSBmcm9tICcuLi9zaW11bGF0aW9ucy9nZW5lcmFsL3Jlc2V0L2luZGV4LmpzJ1xuLy8gaW1wb3J0ICogYXMgZmFyc2lnaHRlZG5lc3MgZnJvbSAnLi4vc2ltdWxhdGlvbnMvZmFyc2lnaHRlZG5lc3MvaW5kZXguanMnXG4vLyBpbXBvcnQgKiBhcyB0dW5uZWxWaXNpb24gZnJvbSAnLi4vc2ltdWxhdGlvbnMvdHVubmVsVmlzaW9uL2luZGV4LmpzJ1xuLy8gaW1wb3J0ICogYXMgcmVkR3JlZW5Db2xvckJsaW5kbmVzcyBmcm9tICcuLi9zaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy9yZWRHcmVlbkNvbG9yQmxpbmRuZXNzL2luZGV4LmpzJ1xuLy8gaW1wb3J0ICogYXMgeWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzIGZyb20gJy4uL3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL3llbGxvd0JsdWVDb2xvckJsaW5kbmVzcy9pbmRleC5qcydcbi8vIGltcG9ydCAqIGFzIHRvdGFsQ29sb3JCbGluZG5lc3MgZnJvbSAnLi4vc2ltdWxhdGlvbnMvY29sb3JCbGluZG5lc3MvdG90YWxDb2xvckJsaW5kbmVzcy9pbmRleC5qcydcbi8vIGltcG9ydCAqIGFzIGNvbmNlbnRyYXRpb24gZnJvbSAnLi4vc2ltdWxhdGlvbnMvY29uY2VudHJhdGlvbi9pbmRleC5qcydcbi8vIGltcG9ydCAqIGFzIHBhcmtpbnNvbnMgZnJvbSAnLi4vc2ltdWxhdGlvbnMvcGFya2luc29ucy9pbmRleC5qcydcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICB2YXIgdG9vbHRpcCA9ICQoXCIudG9vbC10aXBcIik7XG4gIHZhciBpbmZvSGVhZGluZyA9ICQoXCIuZGlzYWJpbGl0eS1pbmZvLWhlYWRpbmdcIik7XG4gIHZhciBpbmZvUGFyYWdyYXBoID0gJChcIi5kaXNhYmlsaXR5LWluZm8tcGFyYWdyYXBoXCIpO1xuICB2YXIgYWR2aWNlTGlzdCA9ICQoXCIuYWR2aWNlLWxpc3RcIik7XG4gIHZhciBtb3JlSW5mb0xpbmsgPSAkKFwiLm1vcmUtaW5mby1saW5rXCIpO1xuICB2YXIgbW9yZUluZm9QYW5lbCA9ICQoXCIjbW9yZS1pbmZvLXBhbmVsXCIpO1xuICB2YXIgcmVzZXRCdG4gPSAkKFwiI3Jlc2V0LWJ0blwiKTtcbiAgdmFyIG5hdmJhckhlYWRlciA9ICQoXCIubmF2YmFyLWhlYWRlclwiKTtcbiAgdmFyIHJlc2V0QnRuVGV4dCA9IGRhdGEuVUlbMF0ucmVzZXRCdG5UZXh0O1xuICB2YXIgbmF2YmFySGVhZGVyVGV4dCA9IGRhdGEuVUlbMF0ubmF2YmFySGVhZGVyVGV4dDtcbiAgdmFyIHNpbXVsYXRpb25IZWFkaW5nVGV4dCA9IGRhdGEuVUlbMF0uc2ltdWxhdGlvbnNbMF0uaGVhZGluZztcbiAgdmFyIGFkdmljZURyb3Bkb3duID0gJChcIiNhZHZpY2UtZHJvcGRvd25cIik7XG4gIHZhciBhZHZpY2VEcm9wZG93blRleHQgPSBkYXRhLlVJWzBdLmFkdmljZURyb3Bkb3duVGV4dDtcbiAgdmFyIGluZm9Ecm9wZG93biA9ICQoXCIjaW5mby1kcm9wZG93blwiKTtcbiAgdmFyIGluZm9Ecm9wZG93blRleHQgPSBkYXRhLlVJWzBdLmluZm9Ecm9wZG93blRleHQ7XG5cbiAgdmFyIGFjdGl2ZVNpbXVsYXRpb24gPSB2b2lkIDA7XG5cbiAgLy9BcHBlbmQgVUkgdGV4dHNcblxuICBuYXZiYXJIZWFkZXIudGV4dChuYXZiYXJIZWFkZXJUZXh0KTtcbiAgcmVzZXRCdG4udGV4dChyZXNldEJ0blRleHQpO1xuICBpbmZvRHJvcGRvd24udGV4dChpbmZvRHJvcGRvd25UZXh0KTtcbiAgYWR2aWNlRHJvcGRvd24udGV4dChhZHZpY2VEcm9wZG93blRleHQpO1xuXG4gICQuZWFjaChkYXRhLlVJWzBdLnNpbXVsYXRpb25zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcblxuICAgICQoJyMnICsgdmFsdWUuaGVhZGluZykudGV4dCh2YWx1ZS5oZWFkaW5nKTtcblxuICAgICQuZWFjaCh2YWx1ZS5jaG9pY2VzLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgICAgICAkKCcjJyArIGtleSkudGV4dCh2YWx1ZVtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gU2V0IGFjdGl2ZSBzdGF0ZVxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2FjdGl2ZVNpbXVsYXRpb24nLCBmdW5jdGlvbiAob2JqKSB7XG5cbiAgICB2YXIgYWN0aXZlU2ltdWxhdGlvbiA9IG9iai5hY3RpdmVTaW11bGF0aW9uO1xuXG4gICAgZnVuY3Rpb24gZmluZFByb3BlcnR5KHNpbXVsYXRpb25zKSB7XG4gICAgICByZXR1cm4gc2ltdWxhdGlvbnMubmFtZSA9PT0gYWN0aXZlU2ltdWxhdGlvbjtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygnYWN0aXZlU2ltdWxhdGlvbicsIGFjdGl2ZVNpbXVsYXRpb24pO1xuXG4gICAgaWYgKGFjdGl2ZVNpbXVsYXRpb24gIT0gbnVsbCkge1xuXG4gICAgICB0b29sdGlwLmFkZENsYXNzKFwiaW5cIik7XG5cbiAgICAgIGluZm9IZWFkaW5nLmFwcGVuZCgkKCcjJyArIGFjdGl2ZVNpbXVsYXRpb24pLnRleHQoKSk7XG5cbiAgICAgICQoJyMnICsgYWN0aXZlU2ltdWxhdGlvbikuY2xvc2VzdChcIi5kcm9wZG93blwiKS5maW5kKFwiLnNlbGVjdGVkXCIpLnRleHQoJCgnIycgKyBhY3RpdmVTaW11bGF0aW9uKS50ZXh0KCkpO1xuXG4gICAgICB2YXIgaWQgPSAkKCcjJyArIGFjdGl2ZVNpbXVsYXRpb24pLmF0dHIoXCJpZFwiKTtcblxuICAgICAgdmFyIGZhY3QgPSBkYXRhLmZhY3RzLmZpbmQoZmluZFByb3BlcnR5KS5mYWN0O1xuICAgICAgdmFyIGxpc3RJdGVtcyA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLmxpc3RJdGVtcztcbiAgICAgIHZhciBtb3JlSW5mbyA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLm1vcmVJbmZvTGlua1RleHQ7XG4gICAgICB2YXIgbW9yZUluZm9VcmwgPSBkYXRhLmZhY3RzLmZpbmQoZmluZFByb3BlcnR5KS5tb3JlSW5mb1VybDtcblxuICAgICAgaW5mb1BhcmFncmFwaC5hcHBlbmQoZmFjdCk7XG5cbiAgICAgICQuZWFjaChsaXN0SXRlbXMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuICAgICAgICBhZHZpY2VMaXN0LmFwcGVuZCgnPGxpPicgKyB2YWx1ZSArICc8L2xpPicpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChtb3JlSW5mbykge1xuICAgICAgICBtb3JlSW5mb1BhbmVsLnNob3coKTtcbiAgICAgICAgbW9yZUluZm9MaW5rLmFwcGVuZChtb3JlSW5mbyk7XG4gICAgICB9XG5cbiAgICAgIG1vcmVJbmZvTGluay5hdHRyKFwiaHJlZlwiLCAnJyArIG1vcmVJbmZvVXJsKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vbWVudSBidXR0b24gY2xpY2tcblxuICAkKFwiLm1lbnUtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBtZW51QnRuID0gJCh0aGlzKTtcbiAgICB2YXIgbWVudUJ0bklkID0gbWVudUJ0blswXS5pZDtcbiAgICB2YXIgaWQgPSBtZW51QnRuLmF0dHIoXCJpZFwiKTtcbiAgICB2YXIgZmFjdCA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLmZhY3Q7XG4gICAgdmFyIGxpc3RJdGVtcyA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLmxpc3RJdGVtcztcbiAgICB2YXIgbW9yZUluZm8gPSBkYXRhLmZhY3RzLmZpbmQoZmluZFByb3BlcnR5KS5tb3JlSW5mb0xpbmtUZXh0O1xuICAgIHZhciBtb3JlSW5mb1VybCA9IGRhdGEuZmFjdHMuZmluZChmaW5kUHJvcGVydHkpLm1vcmVJbmZvVXJsO1xuXG4gICAgZnVuY3Rpb24gZmluZFByb3BlcnR5KHNpbXVsYXRpb25zKSB7XG4gICAgICByZXR1cm4gc2ltdWxhdGlvbnMubmFtZSA9PT0gaWQ7XG4gICAgfVxuXG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7XG4gICAgICBwYXRoOiBcImltZy9pY29uX2FjdGl2ZS5wbmdcIlxuICAgIH0pO1xuXG4gICAgYWN0aXZlU2ltdWxhdGlvbiA9IG1lbnVCdG5JZDtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyAnYWN0aXZlU2ltdWxhdGlvbic6IG1lbnVCdG5JZCB9KTtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyAnbGlua1VybCc6IG1vcmVJbmZvVXJsIH0pO1xuXG4gICAgaW5mb0hlYWRpbmcuZW1wdHkoKTtcbiAgICBpbmZvUGFyYWdyYXBoLmVtcHR5KCk7XG4gICAgYWR2aWNlTGlzdC5lbXB0eSgpO1xuICAgIG1vcmVJbmZvTGluay5lbXB0eSgpO1xuICAgIG1vcmVJbmZvUGFuZWwuaGlkZSgpO1xuXG4gICAgaW5mb0hlYWRpbmcuYXBwZW5kKG1lbnVCdG4udGV4dCgpKTtcblxuICAgIG1lbnVCdG4uY2xvc2VzdChcIi5kcm9wZG93blwiKS5maW5kKFwiLnNlbGVjdGVkXCIpLnRleHQobWVudUJ0bi50ZXh0KCkpO1xuXG4gICAgaW5mb1BhcmFncmFwaC5hcHBlbmQoZmFjdCk7XG5cbiAgICAkLmVhY2gobGlzdEl0ZW1zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICAgIGFkdmljZUxpc3QuYXBwZW5kKCc8bGk+JyArIHZhbHVlICsgJzwvbGk+Jyk7XG4gICAgfSk7XG5cbiAgICBpZiAobW9yZUluZm8pIHtcbiAgICAgIG1vcmVJbmZvUGFuZWwuc2hvdygpO1xuICAgICAgbW9yZUluZm9MaW5rLmFwcGVuZChtb3JlSW5mbyk7XG4gICAgfVxuXG4gICAgbW9yZUluZm9MaW5rLmF0dHIoXCJocmVmXCIsICcnICsgbW9yZUluZm9VcmwpO1xuXG4gICAgJCgnI3BhbmVsMScpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgJCgnI3BhbmVsMicpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMicpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgfSwgMTAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgc3RhcnRTaW11bGF0aW9uKCk7XG4gICAgfSwgNTAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMicpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgICB0b29sdGlwLmFkZENsYXNzKFwiaW5cIik7XG4gICAgfSwgMTAwMCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNwYW5lbDInKS5hZGRDbGFzcyhcImhpZGVcIik7XG4gICAgfSwgMTUwMCk7XG4gIH0pO1xuXG4gIC8vd2hlbiBsb2FkaW5nIG1vZGFsIGlzIGNsb3NlZCwgc2hvdyBjaG9zZW4gc2ltdWxhdGlvblxuXG4gIGZ1bmN0aW9uIHN0YXJ0U2ltdWxhdGlvbigpIHtcblxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlU2ltdWxhdGlvbicsIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHNpbXVsYXRpb25Mb2FkZXIuc3RhcnQob2JqLmFjdGl2ZVNpbXVsYXRpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLy9yZXNldCBleHRlbnNpb25cblxuICBmdW5jdGlvbiByZXNldFNpbXVsYXRpb24oKSB7XG5cbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtcbiAgICAgIHBhdGg6IFwiaW1nL2ljb24ucG5nXCJcbiAgICB9KTtcblxuICAgIHRvb2x0aXAucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAkKFwiI3BhbmVsMVwiKS5hZGRDbGFzcyhcImluXCIpO1xuXG4gICAgLy8gVE9ETzogQ2hhbmdlIHRoaXMgICAgXG4gICAgJChcIiNTeW5cIikudGV4dChcIlN5blwiKTtcbiAgICAkKFwiI01vdG9yaWtcIikudGV4dChcIk1vdG9yaWtcIik7XG5cbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2FjdGl2ZVNpbXVsYXRpb24nLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICBzaW11bGF0aW9uTG9hZGVyLnN0b3Aob2JqLmFjdGl2ZVNpbXVsYXRpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLy9idG4gYW5kIGxpbmtzXG5cbiAgJChcIiNyZXNldC1idG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIHJlc2V0U2ltdWxhdGlvbigpO1xuICB9KTtcblxuICAkKFwiLmdpdGh1Yi1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6ICdodHRwczovL2dpdGh1Yi5jb20vTWV0YW1hdHJpeC9XZWItRGlzYWJpbGl0eS1TaW11bGF0b3InIH0pO1xuICB9KTtcblxuICAkKFwiLm1vcmUtaW5mby1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2xpbmtVcmwnLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6ICcnICsgb2JqLmxpbmtVcmwgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vcGFuZWwgY29sbGFwc2UsIHNob3cgYXJyb3dzOiBcblxuICAkKCcuY29sbGFwc2UnKS5vbignc2hvd24uYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLmRvd24tYXJyb3csIC51cC1hcnJvd1wiKS50b2dnbGUoKTtcbiAgfSkub24oJ2hpZGRlbi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCIuZG93bi1hcnJvdywgLnVwLWFycm93XCIpLnRvZ2dsZSgpO1xuICB9KTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gIFwiZmFjdHNcIjogW1xyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJkeXNsZXhpYVwiLFxyXG4gICAgICBcImZhY3RcIjogXCJEeXNsZXhpIMOkciBlbiBuZWRzw6R0dG5pbmcgc29tIGfDtnIgYXR0IGhqw6RybmFuIGhhciBzdsOlcnQgYXR0IGF1dG9tYXRpc2VyYSB0b2xrbmluZ2VuIGF2IG9yZC4gRGV0dGEgZ8O2ciBhdHQgcGVyc29uZXIgbWVkIGRlbm5hIG5lZHPDpHR0bmluZyBrYW4gaGEgc3bDpXJ0IGF0dCBsw6RzYSBvY2ggc2tyaXZhLiBEeXNsZXhpIMOkciBpbnRlIGtvcHBsYXQgdGlsbCBzeW4gZWxsZXIgaW50ZWxsaWdlbnMuIE9yc2FrZXJuYSB0aWxsIGR5c2xleGkgw6RyIGZvcnRmYXJhbmRlIG9rbGFydC5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrIG9jaCBsw6VuZ2EgdGV4dGVyLiBTZSB0aWxsIGF0dCBoYSBvcmRlbnRsaWd0IG1lZCByYWRhdnN0w6VuZC5cIiwgXHRcclxuICAgICAgICBcIlVuZHZpayBzdsOlcmEgb3JkIG9jaCBmYWNrdGVybWVyLlwiLFxyXG4gICAgICAgIFwiRXJianVkIGzDpHR0bMOkc3RhIHZlcnNpb25lciBhdiBmYWNrdGV4dGVyLlwiLFxyXG4gICAgICAgIFwiVW5kdmlrIHR5cHNuaXR0IG1lZCBrcsOlbmdsaWdhIG9jaCBrb21wbGV4YSBmaWd1cmVyLlwiXHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJuYW1lXCI6IFwicGFya2luc29uc1wiLFxyXG4gICAgICBcImZhY3RcIjogXCJWaWQgUGFya2luc29ucyBzanVrZG9tIGbDtnJzdMO2cnMgY2VsbGVybmEgaSBoasOkcm5hbiBzb20gdGlsbHZlcmthciBkb3BhbWluIHZpbGtldCBnw7ZyIGF0dCBoasOkcm5hbiBmw6VyIGVuIG5lZHNhdHQgZsO2cm3DpWdhIGF0dCBza2lja2Egc2lnbmFsZXIuIFBlcnNvbmVyIG1lZCBQYXJraW5zb25zIGthbiBkcmFiYmFzIGF2IHN5bXB0b20gc29tIHNrYWtuaW5nYXIsIHN0ZWxhIG11c2tsZXIgb2NoIHPDpG1yZSByw7ZyZWxzZWbDtnJtw6VnYS4gT3JzYWtlcm5hIHRpbGwgUGFya2luc29ucyBzanVrZG9tIMOkciBmb3J0ZmFyYW5kZSBva2xhcnQuXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIlNlIHRpbGwgYXR0IHdlYmJwbGF0c2VuIGthbiBhbnbDpG5kYXMgbWVkIGFuZHJhIGhqw6RscG1lZGVsIMOkbiBtdXMsIHRpbGwgZXhlbXBlbCB0YW5nZW50Ym9yZHNuYXZpZ2VyaW5nLlwiLCBcdFxyXG4gICAgICAgIFwiSGEgdGlsbHLDpGNrbGlndCBtZWQgbHVmdCBtZWxsYW4ga29tcG9uZW50ZXJcIixcclxuICAgICAgICBcIkhhIHRpbGxyw6Rja2xpZ3Qgc3RvcmEga2xpY2t5dG9yLlwiLFxyXG4gICAgICAgIFwiVW5kdmlrIHR5cHNuaXR0IG1lZCBrcsOlbmdsaWdhIG9jaCBrb21wbGV4YSBmaWd1cmVyLlwiXHJcbiAgICAgIF0sXHJcbiAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwOi8vd3d3LnBhcmtpbnNvbmZvcmJ1bmRldC5zZVwiLFxyXG4gICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiUGFya2luc29uc2bDtnJidW5kZXRcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJuYW1lXCI6IFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBkZWZla3QgZsOkcmdzZWVuZGUgaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0YXBwYXIgc29tIHRhciB1cHAgZsOkcmdlcm5hIHZpb2xldHQsIGdyw7ZuIG9jaCByw7ZkLiBOw6RyIGVuIGVsbGVyIGZsZXJhIGF2IHRhcHBhcm5hIHNha25hcyBlbGxlciDDpHIgZGVmZWt0YSBsZWRlciBkZXQgdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUuIEd1bC1ibMOlIGbDpHJnYmxpbmRoZXQgKFRyaXRhbm9waSkgw6RyIHPDpGxsc3ludC4gTmFtbmV0IMOkciBtaXNzbGVkYW5kZSBkw6UgZGV0IGludGUgw6RyIGbDpHJnZXJuYSBndWwgb2NoIGJsw6Ugc29tIGbDtnJ2w6R4bGFzLCB1dGFuIGJsw6UgbWVkIGdyw7ZuIG9jaCBndWwgbWVkIGxpbGEuXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZGV0IGVuZGEgc8OkdHRldCBhdHQgZsO2cm1lZGxhIGluZm9ybWF0aW9uLCBpbmRpa2VyYSBlbiBoYW5kbGluZyBlbGxlciBpZGVudGlmaWVyYSBldHQgZWxlbWVudC4gTWFya2VyYSB0aWxsIGV4ZW1wZWwgaW50ZSBldHQgZmVsYWt0aWd0IGZvcm11bMOkcmbDpGx0IGVuZGFzdCBtZWQgZW4gcsO2ZCByYW0gdXRhbiBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBvY2ggZ8Okcm5hIGVuIGlrb24uXCIsIFx0XHJcbiAgICAgICAgXCJFcmJqdWQgZ8Okcm5hIGV0dCBow7Zna29udHJhc3QtbMOkZ2UuXCJcclxuICAgICAgXSxcclxuICAgICAgXCJtb3JlSW5mb1VybFwiOiBcImh0dHBzOi8vc3Yud2lraXBlZGlhLm9yZy93aWtpL0RlZmVrdF9mJUMzJUE0cmdzZWVuZGVcIixcclxuICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldpa2lwZWRpYSBvbSBkZWZla3QgZsOkcmdzZWVuZGVcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJuYW1lXCI6IFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiLFxyXG4gICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgZGVmZWt0IGbDpHJnc2VlbmRlIGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6Ugdmlzc2EgZWxsZXIgYWxsYSBmw6RyZ2VyLiBFdHQgZnVsbHQgZnVuZ2VyYW5kZSDDtmdhIGhhciB0cmUgb2xpa2EgdGFwcGFyIHNvbSB0YXIgdXBwIGbDpHJnZXJuYSB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gTsOkciBlbiBlbGxlciBmbGVyYSBhdiB0YXBwYXJuYSBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEgbGVkZXIgZGV0IHRpbGwgZGVmZWt0IGbDpHJnc2VlbmRlLiBSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXQgKFByb3Rhbm9waSBvY2ggRGV1dGVyYW5vcGkpIMOkciBkZW4gdmFubGlnYXN0ZSB0eXBlbiBhdiBmw6RyZ2JsaW5kaGV0LiBEZW4gw6RyIHZhbmxpZ2FyZSBob3MgbcOkbiDDpG4ga3Zpbm5vci4gUGVyc29uZXIgcsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0IGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6UgZsOkcmdlcm5hIHLDtmQsIGdyw7ZuLCBicnVuIG9jaCBvcmFuZ2UuXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCByw7ZkIHJhbSwga29tcGxldHRlcmEgw6R2ZW4gbWVkIHRleHQgb2NoIGfDpHJuYSBlbiAgaWtvbi5cIiwgXCJFcmJqdWQgZ8Okcm5hIGV0dCBow7Zna29udHJhc3QtbMOkZ2UuXCJdLFxyXG4gICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cHM6Ly9zdi53aWtpcGVkaWEub3JnL3dpa2kvRGVmZWt0X2YlQzMlQTRyZ3NlZW5kZVwiLFxyXG4gICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2lraXBlZGlhIG9tIGRlZmVrdCBmw6RyZ3NlZW5kZVwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJmYXJzaWdodGVkbmVzc1wiLFxyXG4gICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgSHlwZXJvcGkgc2VyIHN1ZGRpZ3QgcMOlIG7DpHJhIGjDpWxsLCBtZW4gYnJhIHDDpSBsw6VuZ3QgaMOlbGwuIE5lZHPDpHR0bmluZ2VuIHVwcHN0w6VyIHDDpSBncnVuZCBhdiBhdHQgbGp1c2V0IGludGUgYnJ5dHMgcsOkdHQgaSDDtmdhdC4gRGV0IMOkciBlbiBhdiBkZSB2YW5saWdhc3RlIHN5bm5lZHPDpHR0bmluZ2FybmEuXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIlVuZHZpayB0ZXh0IGkgbGl0ZW4gc3Rvcmxlay5cIiwgXHRcclxuICAgICAgICBcIldlYmJzaWRhbiBza2EgZ8OlIGF0dCBmw7Zyc3RvcmEgKHpvb21hcykgdGlsbCBtaW5zdCAyMDAgJSBzw6UgYXR0IGJlc8O2a2FyZW4ga2FuIGFucGFzc2EgaW5uZWjDpWxsZXRzIHN0b3JsZWsgZWZ0ZXIgc2luYSBiZWhvdi5cIixcclxuICAgICAgICBcIkVyYmp1ZCB1cHBsw6RzbmluZyBhdiBpbm5laMOlbGxldC5cIlxyXG4gICAgICBdLFxyXG4gICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cHM6Ly93ZWJicmlrdGxpbmplci5zZS9yLzM5LWdlLXdlYmJwbGF0c2VuLWVuLWdvZC1sYXNiYXJoZXQvXCIsXHJcbiAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJXZWJicmlrdGxpbmplIEdlIHdlYmJwbGF0c2VuIGdvZCBsw6RzYmFyaGV0XCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIFwibmFtZVwiOiBcInRvdGFsQ29sb3JCbGluZG5lc3NcIixcclxuICAgICAgXCJmYWN0XCI6IFwiRGVmZWt0IGbDpHJnc2VlbmRlIGlubmViw6RyIGF0dCBlbiBwZXJzb24gaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0eXBlciBhdiB0YXBwYXIgc29tIHRhciB1cHAgb2xpa2EgZsOkcmdlcjogdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE9yc2FrZW4gdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUgw6RyIGF0dCBlbiBlbGxlciBmbGVyYSBhdiBkZXNzYSB0eXBlciBhdiB0YXBwYXIgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhLiBIZWx0IGbDpHJnYmxpbmQgKE1vbm9rcm9tYXNpL2Frcm9tYXRvcHNpKSDDpHIgbXlja2V0IHPDpGxsc3ludC4gUGVyc29uZXIgbWVkIGRlbm5hIHN5bm5lZHPDpHR0bmluZyBzZXIgaW5nYSBmw6RyZ2VyIHV0YW4gc2VyIGVuZGFzdCBpIGdyw6Vza2FsYS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBkZXQgZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGVsZW1lbnQuIE1hcmtlcmEgdC5leC4gaW50ZSBldHQgZmVsYWt0aWd0IGZvcm11bMOkcmbDpGx0IGVuZGFzdCBtZWQgcsO2ZCByYW0sIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IGVsbGVyIGlrb24uXCIsIFx0XHJcbiAgICAgICAgXCJEZXQga2FuIHZhcmEgZW4gYnJhIGlkw6kgYXR0IGVyYmp1ZGEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcIm5hbWVcIjogXCJ0dW5uZWxWaXNpb25cIixcclxuICAgICAgXCJmYWN0XCI6IFwiVHVubmVsc2VlbmRlIGlubmViw6RyLi4uXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIkxpc3RpdGVtIDFcIiwgXHRcclxuICAgICAgICBcIkxpc3RpdGVtIDIuXCJcclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJuYW1lXCI6IFwiY29uY2VudHJhdGlvblwiLFxyXG4gICAgICBcImZhY3RcIjogXCJLb25jZW50cmF0aW9uc3N2w6VyaWdoZXRlciBpbm5lYsOkci4uLlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJMaXN0aXRlbSAxXCIsIFx0XHJcbiAgICAgICAgXCJMaXN0aXRlbSAyLlwiXHJcbiAgICAgIF1cclxuICAgIH1cclxuICBdLFxyXG4gIFwiVUlcIjogW3tcclxuICAgIFwibmF2YmFySGVhZGVyVGV4dFwiOiBcIlbDpGxqIGZ1bmt0aW9uc25lZHPDpHR0bmluZzpcIixcclxuICAgIFwicmVzZXRCdG5UZXh0XCI6IFwiw4V0ZXJzdMOkbGxcIixcclxuICAgIFwiYWR2aWNlRHJvcGRvd25UZXh0XCI6IFwiVMOkbmsgcMOlIGRldHRhXCIsXHJcbiAgICBcImluZm9Ecm9wZG93blRleHRcIjogXCJNZXIgaW5mb3JtYXRpb25cIixcclxuICAgIFwic2ltdWxhdGlvbnNcIjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiU3luXCIsXHJcbiAgICAgICAgXCJjaG9pY2VzXCI6IFtcclxuICAgICAgICAgIHsgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6IFwiSGVsdCBmw6RyZ2JsaW5kXCIgfSxcclxuICAgICAgICAgIHsgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjogXCJHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0XCIgfSxcclxuICAgICAgICAgIHsgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6IFwiUsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0XCIgfSxcclxuICAgICAgICAgIHsgXCJmYXJzaWdodGVkbmVzc1wiOiBcIkzDpW5nc3ludGhldCwgw7Z2ZXJzeW50aGV0XCIgfSxcclxuICAgICAgICAgIHsgXCJ0dW5uZWxWaXNpb25cIjogXCJUdW5uZWxzZWVuZGVcIiB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiTW90b3Jpa1wiLFxyXG4gICAgICAgIFwiY2hvaWNlc1wiOiBbIFxyXG4gICAgICAgICAgeyBcInBhcmtpbnNvbnNcIjogXCJQYXJraW5zb25zXCIgfVxyXG4gIFxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiRHlzbGV4aVwiLFxyXG4gICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiS29uY2VudHJhdGlvblwiLFxyXG4gICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiTWlubmVcIixcclxuICAgICAgICBcImNob2ljZXNcIjogW11cclxuICAgICAgfVxyXG5cclxuICAgIF1cclxuICB9XVxyXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZnVuY3Rpb24gbG9hZChuYW1lLCBzdWJOYW1lLCBjYWxsYmFjaykge1xuICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdLFxuICAgICAgICBzY3JpcHRGaWxlID0gc3ViTmFtZSA/ICdzaW11bGF0aW9ucy8nICsgbmFtZSArICcvJyArIHN1Yk5hbWUgKyAnL2NvbnRlbnQuanMnIDogJ3NpbXVsYXRpb25zLycgKyBuYW1lICsgJy9jb250ZW50LmpzJztcblxuICAgIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoYWN0aXZlVGFiLmlkLCB7IGZpbGU6IHNjcmlwdEZpbGUgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKG5hbWUsIHN1Yk5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RhcnQobmFtZSwgc3ViTmFtZSkge1xuICBjb25zb2xlLmxvZygnc2ltdWxhdGlvbkxvYWRlcicsIG5hbWUpO1xuICBsb2FkKG5hbWUsIHN1Yk5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdGFydFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lLCBzdWJTaW11bGF0aW9uOiBzdWJOYW1lIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RvcChuYW1lLCBzdWJOYW1lKSB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RvcFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lLCBzdWJTaW11bGF0aW9uOiBzdWJOYW1lIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0cy5zdGFydCA9IHN0YXJ0O1xuZXhwb3J0cy5zdG9wID0gc3RvcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpbXVsYXRpb25Mb2FkZXIuanMubWFwXG4iXX0=
