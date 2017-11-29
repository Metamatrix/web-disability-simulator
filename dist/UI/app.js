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

function startSimulation() {

  chrome.storage.local.get('activeSimulation', function (obj) {
    simulationLoader.start(obj.activeSimulation);
  });
}

function resetSimulation(tooltip) {

  chrome.browserAction.setIcon({
    path: "img/icon.png"
  });

  tooltip.removeClass("in");
  $("#panel1").addClass("in");

  // TODO: Change this    
  // $("#Syn").text("Syn");
  // $("#Motorik").text("Motorik"); 

  chrome.storage.local.get('activeSimulation', function (obj) {
    simulationLoader.stop(obj.activeSimulation);
  });
}

function setTexts() {
  $(".more-info-link").text(data.UI.moreInfo);
  $("#reset-btn").text(data.UI.reset);
  $(".navbar-header").text(data.UI.selectSimulation);
  $("#advice-dropdown").text(data.UI.advice);
  $("#info-dropdown").text(data.UI.moreInfo);
  $("#sight").text(data.UI.sight);
  $("#mobility").text(data.UI.mobility);
  $("#readWrite").text(data.UI.readAndWrite);
  $("#concentration").text(data.UI.concentration);

  $.each(data.UI.simulations, function (i, value) {

    $('#' + value.heading).text(value.heading);

    $.each(value.choices, function (i, value) {
      for (var key in value) {
        $('#' + key).text(value[key]);
      }
    });
  });
}

function setTooltipTexts(activeSimulation) {
  var infoHeading = $(".disability-info-heading");
  var infoParagraph = $(".disability-info-paragraph");
  var adviceList = $(".advice-list");
  var moreInfoList = $(".more-info-list");
  var moreInfoPanel = $(".more-info-panel");
  var texts = data.facts[activeSimulation];

  infoHeading.empty();
  infoParagraph.empty();
  adviceList.empty();

  infoHeading.text(texts.heading);
  infoParagraph.text(texts.fact);

  $.each(texts.listItems, function (i, value) {
    adviceList.append('<li>' + value + '</li>');
  });

  // TODO: More info links
}

$(document).ready(function () {

  var tooltip = $(".tool-tip");

  var activeSimulation = void 0;

  setTexts();

  // Set active state
  chrome.storage.local.get('activeSimulation', function (obj) {

    activeSimulation = obj.activeSimulation;

    if (activeSimulation != null) {
      tooltip.addClass("in");
      setTooltipTexts(activeSimulation);
    }
  });

  $(".menu-btn").click(function () {

    var menuBtn = $(this);
    var menuBtnId = menuBtn[0].id;

    chrome.browserAction.setIcon({
      path: "img/icon_active.png"
    });

    activeSimulation = menuBtnId;
    chrome.storage.local.set({ 'activeSimulation': menuBtnId });

    setTooltipTexts(activeSimulation);

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

  //btn and links
  $("#reset-btn").click(function () {
    resetSimulation(tooltip);
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
  "facts": {
    "dyslexia": 
    {
      "heading": "Dyslexi",
      "fact": "Dyslexi är en nedsättning som gör att hjärnan har svårt att automatisera tolkningen av ord. Detta gör att personer med denna nedsättning kan ha svårt att läsa och skriva. Dyslexi är inte kopplat till syn eller intelligens. Orsakerna till dyslexi är fortfarande oklart.",
      "listItems": [
        "Undvik text i liten storlek och långa texter. Se till att ha ordentligt med radavstånd.", 	
        "Undvik svåra ord och facktermer.",
        "Erbjud lättlästa versioner av facktexter.",
        "Undvik typsnitt med krångliga och komplexa figurer."
        ]
    },
    "parkinsons":
    {
      "heading": "Parkinsons",
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
    "yellowBlueColorBlindness":
    {
      "heading": "Gul-blå färgblindhet",
      "fact": "Personer med defekt färgseende har svårt att skilja på vissa eller alla färger. Ett fullt fungerande öga har tre olika tappar som tar upp färgerna violett, grön och röd. När en eller flera av tapparna saknas eller är defekta leder det till defekt färgseende. Gul-blå färgblindhet (Tritanopi) är sällsynt. Namnet är missledande då det inte är färgerna gul och blå som förväxlas, utan blå med grön och gul med lila.",
      "listItems": [
        "Använd inte färg som det enda sättet att förmedla information, indikera en handling eller identifiera ett element. Markera till exempel inte ett felaktigt formulärfält endast med en röd ram utan komplettera även med text och gärna en ikon.", 	
        "Erbjud gärna ett högkontrast-läge."
      ],
      "moreInfoUrl": "https://sv.wikipedia.org/wiki/Defekt_f%C3%A4rgseende",
      "moreInfoLinkText" : "Wikipedia om defekt färgseende"
    },
    "redGreenColorBlindness":
    {
      "heading": "Röd-grön färgblindhet",
      "fact": "Personer med defekt färgseende har svårt att skilja på vissa eller alla färger. Ett fullt fungerande öga har tre olika tappar som tar upp färgerna violett, grön och röd. När en eller flera av tapparna saknas eller är defekta leder det till defekt färgseende. Röd-grön färgblindhet (Protanopi och Deuteranopi) är den vanligaste typen av färgblindhet. Den är vanligare hos män än kvinnor. Personer röd-grön färgblindhet har svårt att skilja på färgerna röd, grön, brun och orange.",
      "listItems": ["Använd inte färg som enda sättet att förmedla information, indikera en handling eller identifiera ett element. Markera till exempel inte ett felaktigt formulärfält endast med röd ram, komplettera även med text och gärna en  ikon.", "Erbjud gärna ett högkontrast-läge."],
      "moreInfoUrl": "https://sv.wikipedia.org/wiki/Defekt_f%C3%A4rgseende",
      "moreInfoLinkText" : "Wikipedia om defekt färgseende"
    },
    "farsightedness":
    {
      "heading": "Långsynthet",
      "fact": "Personer med Hyperopi ser suddigt på nära håll, men bra på långt håll. Nedsättningen uppstår på grund av att ljuset inte bryts rätt i ögat. Det är en av de vanligaste synnedsättningarna.",
      "listItems": [
        "Undvik text i liten storlek.", 	
        "Webbsidan ska gå att förstora (zoomas) till minst 200 % så att besökaren kan anpassa innehållets storlek efter sina behov.",
        "Erbjud uppläsning av innehållet."
      ],
      "moreInfoUrl": "https://webbriktlinjer.se/r/39-ge-webbplatsen-en-god-lasbarhet/",
      "moreInfoLinkText" : "Webbriktlinje Ge webbplatsen god läsbarhet"
    },
    "totalColorBlindness":
    {
      "heading": "Helt färgblind",
      "fact": "Defekt färgseende innebär att en person har svårt att skilja på vissa eller alla färger. Ett fullt fungerande öga har tre olika typer av tappar som tar upp olika färger: violett, grön och röd. Orsaken till defekt färgseende är att en eller flera av dessa typer av tappar saknas eller är defekta. Helt färgblind (Monokromasi/akromatopsi) är mycket sällsynt. Personer med denna synnedsättning ser inga färger utan ser endast i gråskala.",
      "listItems": [
        "Använd inte färg som det enda sättet att förmedla information, indikera en handling eller identifiera element. Markera t.ex. inte ett felaktigt formulärfält endast med röd ram, komplettera även med text eller ikon.", 	
        "Det kan vara en bra idé att erbjuda ett högkontrast-läge."
      ]
    },
    "tunnelVision":
    {
      "heading": "Tunnelseende",
      "fact": "Tunnelseende innebär...",
      "listItems": [
        "Listitem 1", 	
        "Listitem 2."
      ]
    },
    "concentration":
    {
      "heading": "Koncentration",
      "fact": "Koncentrationssvårigheter innebär...",
      "listItems": [
        "Listitem 1", 	
        "Listitem 2."
      ]
    },
    "smallVocabulary":
    {
      "heading": "Litet ordförråd",
      "fact": "En stor del av jordens befolkning kan inte läsa alls och många vuxna läser inte så bra som förväntas efter grundskoleutbildningen.",
      "listItems": [
        "Undvik krångliga ord och facktermer.",   
        "Erbjud lättläst version av krångliga texter.",
        "Erbjud texter på olika språk."
      ]
    }
  },
  "UI": {
    "selectSimulation": "Välj simulering:",
    "reset": "Återställ",
    "advice": "Tänk på detta",
    "moreInfo": "Mer information",
    "sight": "Syn",
    "totalColorBlindness": "Helt färgblind",
    "yellowBlueColorBlindness": "Gul-blå färgblindhet",    
    "redGreenColorBlindness": "Röd-grön färgblindhet",
    "farsightedness": "Långsynthet, översynthet",
    "tunnelVision": "Tunnelseende",
    "mobility": "Motorik",
    "parkinsons": "Parkinsons",
    "readAndWrite": "Läsa och skriva",
    "dyslexia": "Dyslexi",
    "smallVocabulary": "Litet ordförråd",
    "concentration": "Koncentration",
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
        "heading": "Läsa och skriva",
        "choices": [
          { "dyslexia": "Dyslexi" },
          { "smallVocabulary": "Litet ordförråd" },
        ]
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
  }
}
},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var loadedSimulations = [];

function load(name, subName, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0],
        scriptFile = subName ? 'simulations/' + name + '/' + subName + '/content.js' : 'simulations/' + name + '/content.js';

    chrome.tabs.executeScript(activeTab.id, { file: scriptFile }, function () {
      loadedSimulations.push(name);
      if (callback) {
        callback(name, subName);
      }
    });
  });
}

function start(name, subName) {
  if (loadedSimulations.includes(name)) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id, { action: 'startSimulation', simulation: name, subSimulation: subName });
    });
  } else {
    load(name, subName, function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];

        chrome.tabs.sendMessage(activeTab.id, { action: 'startSimulation', simulation: name, subSimulation: subName });
      });
    });
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxVSVxcYXBwLmpzIiwiYnVpbGQvanMvYmFiZWwvVUkvZGF0YS9kYXRhLmpzb24iLCJidWlsZFxcanNcXGJhYmVsXFx1dGlsc1xcc2ltdWxhdGlvbkxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLElBQUksUUFBUSxRQUFRLGtCQUFSLENBQVo7O0FBRUEsSUFBSSxPQUFPLHdCQUF3QixLQUF4QixDQUFYOztBQUVBLElBQUksb0JBQW9CLFFBQVEsOEJBQVIsQ0FBeEI7O0FBRUEsSUFBSSxtQkFBbUIsd0JBQXdCLGlCQUF4QixDQUF2Qjs7QUFFQSxTQUFTLHVCQUFULENBQWlDLEdBQWpDLEVBQXNDO0FBQUUsTUFBSSxPQUFPLElBQUksVUFBZixFQUEyQjtBQUFFLFdBQU8sR0FBUDtBQUFhLEdBQTFDLE1BQWdEO0FBQUUsUUFBSSxTQUFTLEVBQWIsQ0FBaUIsSUFBSSxPQUFPLElBQVgsRUFBaUI7QUFBRSxXQUFLLElBQUksR0FBVCxJQUFnQixHQUFoQixFQUFxQjtBQUFFLFlBQUksT0FBTyxTQUFQLENBQWlCLGNBQWpCLENBQWdDLElBQWhDLENBQXFDLEdBQXJDLEVBQTBDLEdBQTFDLENBQUosRUFBb0QsT0FBTyxHQUFQLElBQWMsSUFBSSxHQUFKLENBQWQ7QUFBeUI7QUFBRSxLQUFDLE9BQU8sT0FBUCxHQUFpQixHQUFqQixDQUFzQixPQUFPLE1BQVA7QUFBZ0I7QUFBRTs7QUFFN1EsU0FBUyxlQUFULEdBQTJCOztBQUV6QixTQUFPLE9BQVAsQ0FBZSxLQUFmLENBQXFCLEdBQXJCLENBQXlCLGtCQUF6QixFQUE2QyxVQUFVLEdBQVYsRUFBZTtBQUMxRCxxQkFBaUIsS0FBakIsQ0FBdUIsSUFBSSxnQkFBM0I7QUFDRCxHQUZEO0FBR0Q7O0FBRUQsU0FBUyxlQUFULENBQXlCLE9BQXpCLEVBQWtDOztBQUVoQyxTQUFP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UUFBUSxJQUFSLEdBQWUsSUFBZjtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9kYXRhID0gcmVxdWlyZSgnLi9kYXRhL2RhdGEuanNvbicpO1xuXG52YXIgZGF0YSA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9kYXRhKTtcblxudmFyIF9zaW11bGF0aW9uTG9hZGVyID0gcmVxdWlyZSgnLi4vdXRpbHMvc2ltdWxhdGlvbkxvYWRlci5qcycpO1xuXG52YXIgc2ltdWxhdGlvbkxvYWRlciA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9zaW11bGF0aW9uTG9hZGVyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxuZnVuY3Rpb24gc3RhcnRTaW11bGF0aW9uKCkge1xuXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlU2ltdWxhdGlvbicsIGZ1bmN0aW9uIChvYmopIHtcbiAgICBzaW11bGF0aW9uTG9hZGVyLnN0YXJ0KG9iai5hY3RpdmVTaW11bGF0aW9uKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0U2ltdWxhdGlvbih0b29sdGlwKSB7XG5cbiAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7XG4gICAgcGF0aDogXCJpbWcvaWNvbi5wbmdcIlxuICB9KTtcblxuICB0b29sdGlwLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICQoXCIjcGFuZWwxXCIpLmFkZENsYXNzKFwiaW5cIik7XG5cbiAgLy8gVE9ETzogQ2hhbmdlIHRoaXMgICAgXG4gIC8vICQoXCIjU3luXCIpLnRleHQoXCJTeW5cIik7XG4gIC8vICQoXCIjTW90b3Jpa1wiKS50ZXh0KFwiTW90b3Jpa1wiKTsgXG5cbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuICAgIHNpbXVsYXRpb25Mb2FkZXIuc3RvcChvYmouYWN0aXZlU2ltdWxhdGlvbik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRUZXh0cygpIHtcbiAgJChcIi5tb3JlLWluZm8tbGlua1wiKS50ZXh0KGRhdGEuVUkubW9yZUluZm8pO1xuICAkKFwiI3Jlc2V0LWJ0blwiKS50ZXh0KGRhdGEuVUkucmVzZXQpO1xuICAkKFwiLm5hdmJhci1oZWFkZXJcIikudGV4dChkYXRhLlVJLnNlbGVjdFNpbXVsYXRpb24pO1xuICAkKFwiI2FkdmljZS1kcm9wZG93blwiKS50ZXh0KGRhdGEuVUkuYWR2aWNlKTtcbiAgJChcIiNpbmZvLWRyb3Bkb3duXCIpLnRleHQoZGF0YS5VSS5tb3JlSW5mbyk7XG4gICQoXCIjc2lnaHRcIikudGV4dChkYXRhLlVJLnNpZ2h0KTtcbiAgJChcIiNtb2JpbGl0eVwiKS50ZXh0KGRhdGEuVUkubW9iaWxpdHkpO1xuICAkKFwiI3JlYWRXcml0ZVwiKS50ZXh0KGRhdGEuVUkucmVhZEFuZFdyaXRlKTtcbiAgJChcIiNjb25jZW50cmF0aW9uXCIpLnRleHQoZGF0YS5VSS5jb25jZW50cmF0aW9uKTtcblxuICAkLmVhY2goZGF0YS5VSS5zaW11bGF0aW9ucywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG5cbiAgICAkKCcjJyArIHZhbHVlLmhlYWRpbmcpLnRleHQodmFsdWUuaGVhZGluZyk7XG5cbiAgICAkLmVhY2godmFsdWUuY2hvaWNlcywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICAgICAgJCgnIycgKyBrZXkpLnRleHQodmFsdWVba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRUb29sdGlwVGV4dHMoYWN0aXZlU2ltdWxhdGlvbikge1xuICB2YXIgaW5mb0hlYWRpbmcgPSAkKFwiLmRpc2FiaWxpdHktaW5mby1oZWFkaW5nXCIpO1xuICB2YXIgaW5mb1BhcmFncmFwaCA9ICQoXCIuZGlzYWJpbGl0eS1pbmZvLXBhcmFncmFwaFwiKTtcbiAgdmFyIGFkdmljZUxpc3QgPSAkKFwiLmFkdmljZS1saXN0XCIpO1xuICB2YXIgbW9yZUluZm9MaXN0ID0gJChcIi5tb3JlLWluZm8tbGlzdFwiKTtcbiAgdmFyIG1vcmVJbmZvUGFuZWwgPSAkKFwiLm1vcmUtaW5mby1wYW5lbFwiKTtcbiAgdmFyIHRleHRzID0gZGF0YS5mYWN0c1thY3RpdmVTaW11bGF0aW9uXTtcblxuICBpbmZvSGVhZGluZy5lbXB0eSgpO1xuICBpbmZvUGFyYWdyYXBoLmVtcHR5KCk7XG4gIGFkdmljZUxpc3QuZW1wdHkoKTtcblxuICBpbmZvSGVhZGluZy50ZXh0KHRleHRzLmhlYWRpbmcpO1xuICBpbmZvUGFyYWdyYXBoLnRleHQodGV4dHMuZmFjdCk7XG5cbiAgJC5lYWNoKHRleHRzLmxpc3RJdGVtcywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG4gICAgYWR2aWNlTGlzdC5hcHBlbmQoJzxsaT4nICsgdmFsdWUgKyAnPC9saT4nKTtcbiAgfSk7XG5cbiAgLy8gVE9ETzogTW9yZSBpbmZvIGxpbmtzXG59XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICB2YXIgdG9vbHRpcCA9ICQoXCIudG9vbC10aXBcIik7XG5cbiAgdmFyIGFjdGl2ZVNpbXVsYXRpb24gPSB2b2lkIDA7XG5cbiAgc2V0VGV4dHMoKTtcblxuICAvLyBTZXQgYWN0aXZlIHN0YXRlXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlU2ltdWxhdGlvbicsIGZ1bmN0aW9uIChvYmopIHtcblxuICAgIGFjdGl2ZVNpbXVsYXRpb24gPSBvYmouYWN0aXZlU2ltdWxhdGlvbjtcblxuICAgIGlmIChhY3RpdmVTaW11bGF0aW9uICE9IG51bGwpIHtcbiAgICAgIHRvb2x0aXAuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICAgIHNldFRvb2x0aXBUZXh0cyhhY3RpdmVTaW11bGF0aW9uKTtcbiAgICB9XG4gIH0pO1xuXG4gICQoXCIubWVudS1idG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIG1lbnVCdG4gPSAkKHRoaXMpO1xuICAgIHZhciBtZW51QnRuSWQgPSBtZW51QnRuWzBdLmlkO1xuXG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7XG4gICAgICBwYXRoOiBcImltZy9pY29uX2FjdGl2ZS5wbmdcIlxuICAgIH0pO1xuXG4gICAgYWN0aXZlU2ltdWxhdGlvbiA9IG1lbnVCdG5JZDtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyAnYWN0aXZlU2ltdWxhdGlvbic6IG1lbnVCdG5JZCB9KTtcblxuICAgIHNldFRvb2x0aXBUZXh0cyhhY3RpdmVTaW11bGF0aW9uKTtcblxuICAgICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImluXCIpO1xuICAgICQoJyNwYW5lbDInKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNwYW5lbDInKS5hZGRDbGFzcyhcImluXCIpO1xuICAgIH0sIDEwMCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0YXJ0U2ltdWxhdGlvbigpO1xuICAgIH0sIDUwMCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNwYW5lbDInKS5yZW1vdmVDbGFzcyhcImluXCIpO1xuICAgICAgdG9vbHRpcC5hZGRDbGFzcyhcImluXCIpO1xuICAgIH0sIDEwMDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwyJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgIH0sIDE1MDApO1xuICB9KTtcblxuICAvL2J0biBhbmQgbGlua3NcbiAgJChcIiNyZXNldC1idG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIHJlc2V0U2ltdWxhdGlvbih0b29sdGlwKTtcbiAgfSk7XG5cbiAgJChcIi5naXRodWItbGlua1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiAnaHR0cHM6Ly9naXRodWIuY29tL01ldGFtYXRyaXgvV2ViLURpc2FiaWxpdHktU2ltdWxhdG9yJyB9KTtcbiAgfSk7XG5cbiAgJChcIi5tb3JlLWluZm8tbGlua1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdsaW5rVXJsJywgZnVuY3Rpb24gKG9iaikge1xuICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiAnJyArIG9iai5saW5rVXJsIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICAvL3BhbmVsIGNvbGxhcHNlLCBzaG93IGFycm93czogXG4gICQoJy5jb2xsYXBzZScpLm9uKCdzaG93bi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCIuZG93bi1hcnJvdywgLnVwLWFycm93XCIpLnRvZ2dsZSgpO1xuICB9KS5vbignaGlkZGVuLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucGFyZW50KCkuZmluZChcIi5kb3duLWFycm93LCAudXAtYXJyb3dcIikudG9nZ2xlKCk7XG4gIH0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAuanMubWFwXG4iLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgXCJmYWN0c1wiOiB7XHJcbiAgICBcImR5c2xleGlhXCI6IFxyXG4gICAge1xyXG4gICAgICBcImhlYWRpbmdcIjogXCJEeXNsZXhpXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIkR5c2xleGkgw6RyIGVuIG5lZHPDpHR0bmluZyBzb20gZ8O2ciBhdHQgaGrDpHJuYW4gaGFyIHN2w6VydCBhdHQgYXV0b21hdGlzZXJhIHRvbGtuaW5nZW4gYXYgb3JkLiBEZXR0YSBnw7ZyIGF0dCBwZXJzb25lciBtZWQgZGVubmEgbmVkc8OkdHRuaW5nIGthbiBoYSBzdsOlcnQgYXR0IGzDpHNhIG9jaCBza3JpdmEuIER5c2xleGkgw6RyIGludGUga29wcGxhdCB0aWxsIHN5biBlbGxlciBpbnRlbGxpZ2Vucy4gT3JzYWtlcm5hIHRpbGwgZHlzbGV4aSDDpHIgZm9ydGZhcmFuZGUgb2tsYXJ0LlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJVbmR2aWsgdGV4dCBpIGxpdGVuIHN0b3JsZWsgb2NoIGzDpW5nYSB0ZXh0ZXIuIFNlIHRpbGwgYXR0IGhhIG9yZGVudGxpZ3QgbWVkIHJhZGF2c3TDpW5kLlwiLCBcdFxyXG4gICAgICAgIFwiVW5kdmlrIHN2w6VyYSBvcmQgb2NoIGZhY2t0ZXJtZXIuXCIsXHJcbiAgICAgICAgXCJFcmJqdWQgbMOkdHRsw6RzdGEgdmVyc2lvbmVyIGF2IGZhY2t0ZXh0ZXIuXCIsXHJcbiAgICAgICAgXCJVbmR2aWsgdHlwc25pdHQgbWVkIGtyw6VuZ2xpZ2Egb2NoIGtvbXBsZXhhIGZpZ3VyZXIuXCJcclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAgXCJwYXJraW5zb25zXCI6XHJcbiAgICB7XHJcbiAgICAgIFwiaGVhZGluZ1wiOiBcIlBhcmtpbnNvbnNcIixcclxuICAgICAgXCJmYWN0XCI6IFwiVmlkIFBhcmtpbnNvbnMgc2p1a2RvbSBmw7Zyc3TDtnJzIGNlbGxlcm5hIGkgaGrDpHJuYW4gc29tIHRpbGx2ZXJrYXIgZG9wYW1pbiB2aWxrZXQgZ8O2ciBhdHQgaGrDpHJuYW4gZsOlciBlbiBuZWRzYXR0IGbDtnJtw6VnYSBhdHQgc2tpY2thIHNpZ25hbGVyLiBQZXJzb25lciBtZWQgUGFya2luc29ucyBrYW4gZHJhYmJhcyBhdiBzeW1wdG9tIHNvbSBza2FrbmluZ2FyLCBzdGVsYSBtdXNrbGVyIG9jaCBzw6RtcmUgcsO2cmVsc2Vmw7ZybcOlZ2EuIE9yc2FrZXJuYSB0aWxsIFBhcmtpbnNvbnMgc2p1a2RvbSDDpHIgZm9ydGZhcmFuZGUgb2tsYXJ0LlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJTZSB0aWxsIGF0dCB3ZWJicGxhdHNlbiBrYW4gYW52w6RuZGFzIG1lZCBhbmRyYSBoasOkbHBtZWRlbCDDpG4gbXVzLCB0aWxsIGV4ZW1wZWwgdGFuZ2VudGJvcmRzbmF2aWdlcmluZy5cIiwgXHRcclxuICAgICAgICBcIkhhIHRpbGxyw6Rja2xpZ3QgbWVkIGx1ZnQgbWVsbGFuIGtvbXBvbmVudGVyXCIsXHJcbiAgICAgICAgXCJIYSB0aWxscsOkY2tsaWd0IHN0b3JhIGtsaWNreXRvci5cIixcclxuICAgICAgICBcIlVuZHZpayB0eXBzbml0dCBtZWQga3LDpW5nbGlnYSBvY2gga29tcGxleGEgZmlndXJlci5cIlxyXG4gICAgICBdLFxyXG4gICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cDovL3d3dy5wYXJraW5zb25mb3JidW5kZXQuc2VcIixcclxuICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIlBhcmtpbnNvbnNmw7ZyYnVuZGV0XCJcclxuICAgIH0sXHJcbiAgICBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOlxyXG4gICAge1xyXG4gICAgICBcImhlYWRpbmdcIjogXCJHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0XCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBkZWZla3QgZsOkcmdzZWVuZGUgaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0YXBwYXIgc29tIHRhciB1cHAgZsOkcmdlcm5hIHZpb2xldHQsIGdyw7ZuIG9jaCByw7ZkLiBOw6RyIGVuIGVsbGVyIGZsZXJhIGF2IHRhcHBhcm5hIHNha25hcyBlbGxlciDDpHIgZGVmZWt0YSBsZWRlciBkZXQgdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUuIEd1bC1ibMOlIGbDpHJnYmxpbmRoZXQgKFRyaXRhbm9waSkgw6RyIHPDpGxsc3ludC4gTmFtbmV0IMOkciBtaXNzbGVkYW5kZSBkw6UgZGV0IGludGUgw6RyIGbDpHJnZXJuYSBndWwgb2NoIGJsw6Ugc29tIGbDtnJ2w6R4bGFzLCB1dGFuIGJsw6UgbWVkIGdyw7ZuIG9jaCBndWwgbWVkIGxpbGEuXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZGV0IGVuZGEgc8OkdHRldCBhdHQgZsO2cm1lZGxhIGluZm9ybWF0aW9uLCBpbmRpa2VyYSBlbiBoYW5kbGluZyBlbGxlciBpZGVudGlmaWVyYSBldHQgZWxlbWVudC4gTWFya2VyYSB0aWxsIGV4ZW1wZWwgaW50ZSBldHQgZmVsYWt0aWd0IGZvcm11bMOkcmbDpGx0IGVuZGFzdCBtZWQgZW4gcsO2ZCByYW0gdXRhbiBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBvY2ggZ8Okcm5hIGVuIGlrb24uXCIsIFx0XHJcbiAgICAgICAgXCJFcmJqdWQgZ8Okcm5hIGV0dCBow7Zna29udHJhc3QtbMOkZ2UuXCJcclxuICAgICAgXSxcclxuICAgICAgXCJtb3JlSW5mb1VybFwiOiBcImh0dHBzOi8vc3Yud2lraXBlZGlhLm9yZy93aWtpL0RlZmVrdF9mJUMzJUE0cmdzZWVuZGVcIixcclxuICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldpa2lwZWRpYSBvbSBkZWZla3QgZsOkcmdzZWVuZGVcIlxyXG4gICAgfSxcclxuICAgIFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOlxyXG4gICAge1xyXG4gICAgICBcImhlYWRpbmdcIjogXCJSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXRcIixcclxuICAgICAgXCJmYWN0XCI6IFwiUGVyc29uZXIgbWVkIGRlZmVrdCBmw6RyZ3NlZW5kZSBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHRhcHBhciBzb20gdGFyIHVwcCBmw6RyZ2VybmEgdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE7DpHIgZW4gZWxsZXIgZmxlcmEgYXYgdGFwcGFybmEgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhIGxlZGVyIGRldCB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZS4gUsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0IChQcm90YW5vcGkgb2NoIERldXRlcmFub3BpKSDDpHIgZGVuIHZhbmxpZ2FzdGUgdHlwZW4gYXYgZsOkcmdibGluZGhldC4gRGVuIMOkciB2YW5saWdhcmUgaG9zIG3DpG4gw6RuIGt2aW5ub3IuIFBlcnNvbmVyIHLDtmQtZ3LDtm4gZsOkcmdibGluZGhldCBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIGbDpHJnZXJuYSByw7ZkLCBncsO2biwgYnJ1biBvY2ggb3JhbmdlLlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXCJBbnbDpG5kIGludGUgZsOkcmcgc29tIGVuZGEgc8OkdHRldCBhdHQgZsO2cm1lZGxhIGluZm9ybWF0aW9uLCBpbmRpa2VyYSBlbiBoYW5kbGluZyBlbGxlciBpZGVudGlmaWVyYSBldHQgZWxlbWVudC4gTWFya2VyYSB0aWxsIGV4ZW1wZWwgaW50ZSBldHQgZmVsYWt0aWd0IGZvcm11bMOkcmbDpGx0IGVuZGFzdCBtZWQgcsO2ZCByYW0sIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IG9jaCBnw6RybmEgZW4gIGlrb24uXCIsIFwiRXJianVkIGfDpHJuYSBldHQgaMO2Z2tvbnRyYXN0LWzDpGdlLlwiXSxcclxuICAgICAgXCJtb3JlSW5mb1VybFwiOiBcImh0dHBzOi8vc3Yud2lraXBlZGlhLm9yZy93aWtpL0RlZmVrdF9mJUMzJUE0cmdzZWVuZGVcIixcclxuICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldpa2lwZWRpYSBvbSBkZWZla3QgZsOkcmdzZWVuZGVcIlxyXG4gICAgfSxcclxuICAgIFwiZmFyc2lnaHRlZG5lc3NcIjpcclxuICAgIHtcclxuICAgICAgXCJoZWFkaW5nXCI6IFwiTMOlbmdzeW50aGV0XCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBIeXBlcm9waSBzZXIgc3VkZGlndCBww6UgbsOkcmEgaMOlbGwsIG1lbiBicmEgcMOlIGzDpW5ndCBow6VsbC4gTmVkc8OkdHRuaW5nZW4gdXBwc3TDpXIgcMOlIGdydW5kIGF2IGF0dCBsanVzZXQgaW50ZSBicnl0cyByw6R0dCBpIMO2Z2F0LiBEZXQgw6RyIGVuIGF2IGRlIHZhbmxpZ2FzdGUgc3lubmVkc8OkdHRuaW5nYXJuYS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrLlwiLCBcdFxyXG4gICAgICAgIFwiV2ViYnNpZGFuIHNrYSBnw6UgYXR0IGbDtnJzdG9yYSAoem9vbWFzKSB0aWxsIG1pbnN0IDIwMCAlIHPDpSBhdHQgYmVzw7ZrYXJlbiBrYW4gYW5wYXNzYSBpbm5laMOlbGxldHMgc3RvcmxlayBlZnRlciBzaW5hIGJlaG92LlwiLFxyXG4gICAgICAgIFwiRXJianVkIHVwcGzDpHNuaW5nIGF2IGlubmVow6VsbGV0LlwiXHJcbiAgICAgIF0sXHJcbiAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwczovL3dlYmJyaWt0bGluamVyLnNlL3IvMzktZ2Utd2ViYnBsYXRzZW4tZW4tZ29kLWxhc2JhcmhldC9cIixcclxuICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldlYmJyaWt0bGluamUgR2Ugd2ViYnBsYXRzZW4gZ29kIGzDpHNiYXJoZXRcIlxyXG4gICAgfSxcclxuICAgIFwidG90YWxDb2xvckJsaW5kbmVzc1wiOlxyXG4gICAge1xyXG4gICAgICBcImhlYWRpbmdcIjogXCJIZWx0IGbDpHJnYmxpbmRcIixcclxuICAgICAgXCJmYWN0XCI6IFwiRGVmZWt0IGbDpHJnc2VlbmRlIGlubmViw6RyIGF0dCBlbiBwZXJzb24gaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0eXBlciBhdiB0YXBwYXIgc29tIHRhciB1cHAgb2xpa2EgZsOkcmdlcjogdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE9yc2FrZW4gdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUgw6RyIGF0dCBlbiBlbGxlciBmbGVyYSBhdiBkZXNzYSB0eXBlciBhdiB0YXBwYXIgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhLiBIZWx0IGbDpHJnYmxpbmQgKE1vbm9rcm9tYXNpL2Frcm9tYXRvcHNpKSDDpHIgbXlja2V0IHPDpGxsc3ludC4gUGVyc29uZXIgbWVkIGRlbm5hIHN5bm5lZHPDpHR0bmluZyBzZXIgaW5nYSBmw6RyZ2VyIHV0YW4gc2VyIGVuZGFzdCBpIGdyw6Vza2FsYS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBkZXQgZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGVsZW1lbnQuIE1hcmtlcmEgdC5leC4gaW50ZSBldHQgZmVsYWt0aWd0IGZvcm11bMOkcmbDpGx0IGVuZGFzdCBtZWQgcsO2ZCByYW0sIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IGVsbGVyIGlrb24uXCIsIFx0XHJcbiAgICAgICAgXCJEZXQga2FuIHZhcmEgZW4gYnJhIGlkw6kgYXR0IGVyYmp1ZGEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAgXCJ0dW5uZWxWaXNpb25cIjpcclxuICAgIHtcclxuICAgICAgXCJoZWFkaW5nXCI6IFwiVHVubmVsc2VlbmRlXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIlR1bm5lbHNlZW5kZSBpbm5lYsOkci4uLlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJMaXN0aXRlbSAxXCIsIFx0XHJcbiAgICAgICAgXCJMaXN0aXRlbSAyLlwiXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICBcImNvbmNlbnRyYXRpb25cIjpcclxuICAgIHtcclxuICAgICAgXCJoZWFkaW5nXCI6IFwiS29uY2VudHJhdGlvblwiLFxyXG4gICAgICBcImZhY3RcIjogXCJLb25jZW50cmF0aW9uc3N2w6VyaWdoZXRlciBpbm5lYsOkci4uLlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJMaXN0aXRlbSAxXCIsIFx0XHJcbiAgICAgICAgXCJMaXN0aXRlbSAyLlwiXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOlxyXG4gICAge1xyXG4gICAgICBcImhlYWRpbmdcIjogXCJMaXRldCBvcmRmw7ZycsOlZFwiLFxyXG4gICAgICBcImZhY3RcIjogXCJFbiBzdG9yIGRlbCBhdiBqb3JkZW5zIGJlZm9sa25pbmcga2FuIGludGUgbMOkc2EgYWxscyBvY2ggbcOlbmdhIHZ1eG5hIGzDpHNlciBpbnRlIHPDpSBicmEgc29tIGbDtnJ2w6RudGFzIGVmdGVyIGdydW5kc2tvbGV1dGJpbGRuaW5nZW4uXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIlVuZHZpayBrcsOlbmdsaWdhIG9yZCBvY2ggZmFja3Rlcm1lci5cIiwgICBcclxuICAgICAgICBcIkVyYmp1ZCBsw6R0dGzDpHN0IHZlcnNpb24gYXYga3LDpW5nbGlnYSB0ZXh0ZXIuXCIsXHJcbiAgICAgICAgXCJFcmJqdWQgdGV4dGVyIHDDpSBvbGlrYSBzcHLDpWsuXCJcclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgXCJVSVwiOiB7XHJcbiAgICBcInNlbGVjdFNpbXVsYXRpb25cIjogXCJWw6RsaiBzaW11bGVyaW5nOlwiLFxyXG4gICAgXCJyZXNldFwiOiBcIsOFdGVyc3TDpGxsXCIsXHJcbiAgICBcImFkdmljZVwiOiBcIlTDpG5rIHDDpSBkZXR0YVwiLFxyXG4gICAgXCJtb3JlSW5mb1wiOiBcIk1lciBpbmZvcm1hdGlvblwiLFxyXG4gICAgXCJzaWdodFwiOiBcIlN5blwiLFxyXG4gICAgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6IFwiSGVsdCBmw6RyZ2JsaW5kXCIsXHJcbiAgICBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIiwgICAgXHJcbiAgICBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXRcIixcclxuICAgIFwiZmFyc2lnaHRlZG5lc3NcIjogXCJMw6VuZ3N5bnRoZXQsIMO2dmVyc3ludGhldFwiLFxyXG4gICAgXCJ0dW5uZWxWaXNpb25cIjogXCJUdW5uZWxzZWVuZGVcIixcclxuICAgIFwibW9iaWxpdHlcIjogXCJNb3RvcmlrXCIsXHJcbiAgICBcInBhcmtpbnNvbnNcIjogXCJQYXJraW5zb25zXCIsXHJcbiAgICBcInJlYWRBbmRXcml0ZVwiOiBcIkzDpHNhIG9jaCBza3JpdmFcIixcclxuICAgIFwiZHlzbGV4aWFcIjogXCJEeXNsZXhpXCIsXHJcbiAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOiBcIkxpdGV0IG9yZGbDtnJyw6VkXCIsXHJcbiAgICBcImNvbmNlbnRyYXRpb25cIjogXCJLb25jZW50cmF0aW9uXCIsXHJcbiAgICBcInNpbXVsYXRpb25zXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlN5blwiLFxyXG4gICAgICAgIFwiY2hvaWNlc1wiOiBbXHJcbiAgICAgICAgICB7IFwidG90YWxDb2xvckJsaW5kbmVzc1wiOiBcIkhlbHQgZsOkcmdibGluZFwiIH0sXHJcbiAgICAgICAgICB7IFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6IFwiR3VsLWJsw6UgZsOkcmdibGluZGhldFwiIH0sXHJcbiAgICAgICAgICB7IFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOiBcIlLDtmQtZ3LDtm4gZsOkcmdibGluZGhldFwiIH0sXHJcbiAgICAgICAgICB7IFwiZmFyc2lnaHRlZG5lc3NcIjogXCJMw6VuZ3N5bnRoZXQsIMO2dmVyc3ludGhldFwiIH0sXHJcbiAgICAgICAgICB7IFwidHVubmVsVmlzaW9uXCI6IFwiVHVubmVsc2VlbmRlXCIgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIk1vdG9yaWtcIixcclxuICAgICAgICBcImNob2ljZXNcIjogWyBcclxuICAgICAgICAgIHsgXCJwYXJraW5zb25zXCI6IFwiUGFya2luc29uc1wiIH1cclxuICBcclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkzDpHNhIG9jaCBza3JpdmFcIixcclxuICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgeyBcImR5c2xleGlhXCI6IFwiRHlzbGV4aVwiIH0sXHJcbiAgICAgICAgICB7IFwic21hbGxWb2NhYnVsYXJ5XCI6IFwiTGl0ZXQgb3JkZsO2cnLDpWRcIiB9LFxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIktvbmNlbnRyYXRpb25cIixcclxuICAgICAgICBcImNob2ljZXNcIjogW11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIk1pbm5lXCIsXHJcbiAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgIH1cclxuXHJcbiAgICBdXHJcbiAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIGxvYWRlZFNpbXVsYXRpb25zID0gW107XG5cbmZ1bmN0aW9uIGxvYWQobmFtZSwgc3ViTmFtZSwgY2FsbGJhY2spIHtcbiAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXSxcbiAgICAgICAgc2NyaXB0RmlsZSA9IHN1Yk5hbWUgPyAnc2ltdWxhdGlvbnMvJyArIG5hbWUgKyAnLycgKyBzdWJOYW1lICsgJy9jb250ZW50LmpzJyA6ICdzaW11bGF0aW9ucy8nICsgbmFtZSArICcvY29udGVudC5qcyc7XG5cbiAgICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KGFjdGl2ZVRhYi5pZCwgeyBmaWxlOiBzY3JpcHRGaWxlIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxvYWRlZFNpbXVsYXRpb25zLnB1c2gobmFtZSk7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sobmFtZSwgc3ViTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdGFydChuYW1lLCBzdWJOYW1lKSB7XG4gIGlmIChsb2FkZWRTaW11bGF0aW9ucy5pbmNsdWRlcyhuYW1lKSkge1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0YXJ0U2ltdWxhdGlvbicsIHNpbXVsYXRpb246IG5hbWUsIHN1YlNpbXVsYXRpb246IHN1Yk5hbWUgfSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgbG9hZChuYW1lLCBzdWJOYW1lLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RhcnRTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSwgc3ViU2ltdWxhdGlvbjogc3ViTmFtZSB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0b3AobmFtZSwgc3ViTmFtZSkge1xuICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0b3BTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSwgc3ViU2ltdWxhdGlvbjogc3ViTmFtZSB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydHMuc3RhcnQgPSBzdGFydDtcbmV4cG9ydHMuc3RvcCA9IHN0b3A7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaW11bGF0aW9uTG9hZGVyLmpzLm1hcFxuIl19
