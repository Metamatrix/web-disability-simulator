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
      "fact": "Alla kan ha svårt att koncentrera sig men för vissa kan det bli ett stort problem i vardagslivet. Dessa funktionsnedsättningar kan orsaka svårigheter med att hantera intryck, sortera information och ljudkänslighet.",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxVSVxcYXBwLmpzIiwiYnVpbGQvanMvYmFiZWwvVUkvZGF0YS9kYXRhLmpzb24iLCJidWlsZFxcanNcXGJhYmVsXFx1dGlsc1xcc2ltdWxhdGlvbkxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLElBQUksUUFBUSxRQUFRLGtCQUFSLENBQVo7O0FBRUEsSUFBSSxPQUFPLHdCQUF3QixLQUF4QixDQUFYOztBQUVBLElBQUksb0JBQW9CLFFBQVEsOEJBQVIsQ0FBeEI7O0FBRUEsSUFBSSxtQkFBbUIsd0JBQXdCLGlCQUF4QixDQUF2Qjs7QUFFQSxTQUFTLHVCQUFULENBQWlDLEdBQWpDLEVBQXNDO0FBQUUsTUFBSSxPQUFPLElBQUksVUFBZixFQUEyQjtBQUFFLFdBQU8sR0FBUDtBQUFhLEdBQTFDLE1BQWdEO0FBQUUsUUFBSSxTQUFTLEVBQWIsQ0FBaUIsSUFBSSxPQUFPLElBQVgsRUFBaUI7QUFBRSxXQUFLLElBQUksR0FBVCxJQUFnQixHQUFoQixFQUFxQjtBQUFFLFlBQUksT0FBTyxTQUFQLENBQWlCLGNBQWpCLENBQWdDLElBQWhDLENBQXFDLEdBQXJDLEVBQTBDLEdBQTFDLENBQUosRUFBb0QsT0FBTyxHQUFQLElBQWMsSUFBSSxHQUFKLENBQWQ7QUFBeUI7QUFBRSxLQUFDLE9BQU8sT0FBUCxHQUFpQixHQUFqQixDQUFzQixPQUFPLE1BQVA7QUFBZ0I7QUFBRTs7QUFFN1EsU0FBUyxlQUFULEdBQTJCOztBQUV6QixTQUFPLE9BQVAsQ0FBZSxLQUFmLENBQXFCLEdBQXJCLENBQXlCLGtCQUF6QixFQUE2QyxVQUFVLEdBQVYsRUFBZTtBQUMxRCxxQkFBaUIsS0FBakIsQ0FBdUIsSUFBSSxnQkFBM0I7QUFDRCxHQUZEO0FBR0Q7O0FBRUQsU0FBUyxlQUFULENBQXlCLE9BQXpCLEVBQWtDOztBQUVoQyxTQUFP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QUFmO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2RhdGEgPSByZXF1aXJlKCcuL2RhdGEvZGF0YS5qc29uJyk7XG5cbnZhciBkYXRhID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2RhdGEpO1xuXG52YXIgX3NpbXVsYXRpb25Mb2FkZXIgPSByZXF1aXJlKCcuLi91dGlscy9zaW11bGF0aW9uTG9hZGVyLmpzJyk7XG5cbnZhciBzaW11bGF0aW9uTG9hZGVyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3NpbXVsYXRpb25Mb2FkZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBzdGFydFNpbXVsYXRpb24oKSB7XG5cbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuICAgIHNpbXVsYXRpb25Mb2FkZXIuc3RhcnQob2JqLmFjdGl2ZVNpbXVsYXRpb24pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVzZXRTaW11bGF0aW9uKHRvb2x0aXApIHtcblxuICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtcbiAgICBwYXRoOiBcImltZy9pY29uLnBuZ1wiXG4gIH0pO1xuXG4gIHRvb2x0aXAucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgJChcIiNwYW5lbDFcIikuYWRkQ2xhc3MoXCJpblwiKTtcblxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2FjdGl2ZVNpbXVsYXRpb24nLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgc2ltdWxhdGlvbkxvYWRlci5zdG9wKG9iai5hY3RpdmVTaW11bGF0aW9uKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldFRleHRzKCkge1xuICAkKFwiLm1vcmUtaW5mby1saW5rXCIpLnRleHQoZGF0YS5VSS5tb3JlSW5mbyk7XG4gICQoXCIjcmVzZXQtYnRuXCIpLnRleHQoZGF0YS5VSS5yZXNldCk7XG4gICQoXCIubmF2YmFyLWhlYWRlclwiKS50ZXh0KGRhdGEuVUkuc2VsZWN0U2ltdWxhdGlvbik7XG4gICQoXCIjYWR2aWNlLWRyb3Bkb3duXCIpLnRleHQoZGF0YS5VSS5hZHZpY2UpO1xuICAkKFwiI2luZm8tZHJvcGRvd25cIikudGV4dChkYXRhLlVJLm1vcmVJbmZvKTtcbiAgJChcIiNzaWdodFwiKS50ZXh0KGRhdGEuVUkuc2lnaHQpO1xuICAkKFwiI21vYmlsaXR5XCIpLnRleHQoZGF0YS5VSS5tb2JpbGl0eSk7XG4gICQoXCIjcmVhZFdyaXRlXCIpLnRleHQoZGF0YS5VSS5yZWFkQW5kV3JpdGUpO1xuICAkKFwiI2NvbmNlbnRyYXRpb25cIikudGV4dChkYXRhLlVJLmNvbmNlbnRyYXRpb24pO1xuXG4gICQuZWFjaChkYXRhLlVJLnNpbXVsYXRpb25zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcblxuICAgICQoJyMnICsgdmFsdWUuaGVhZGluZykudGV4dCh2YWx1ZS5oZWFkaW5nKTtcblxuICAgICQuZWFjaCh2YWx1ZS5jaG9pY2VzLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgICAgICAkKCcjJyArIGtleSkudGV4dCh2YWx1ZVtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldFRvb2x0aXBUZXh0cyhhY3RpdmVTaW11bGF0aW9uKSB7XG4gIHZhciBpbmZvSGVhZGluZyA9ICQoXCIuZGlzYWJpbGl0eS1pbmZvLWhlYWRpbmdcIik7XG4gIHZhciBpbmZvUGFyYWdyYXBoID0gJChcIi5kaXNhYmlsaXR5LWluZm8tcGFyYWdyYXBoXCIpO1xuICB2YXIgYWR2aWNlTGlzdCA9ICQoXCIuYWR2aWNlLWxpc3RcIik7XG4gIHZhciBtb3JlSW5mb0xpc3QgPSAkKFwiLm1vcmUtaW5mby1saXN0XCIpO1xuICB2YXIgbW9yZUluZm9QYW5lbCA9ICQoXCIubW9yZS1pbmZvLXBhbmVsXCIpO1xuICB2YXIgdGV4dHMgPSBkYXRhLmZhY3RzW2FjdGl2ZVNpbXVsYXRpb25dO1xuXG4gIGluZm9IZWFkaW5nLmVtcHR5KCk7XG4gIGluZm9QYXJhZ3JhcGguZW1wdHkoKTtcbiAgYWR2aWNlTGlzdC5lbXB0eSgpO1xuXG4gIGluZm9IZWFkaW5nLnRleHQodGV4dHMuaGVhZGluZyk7XG4gIGluZm9QYXJhZ3JhcGgudGV4dCh0ZXh0cy5mYWN0KTtcblxuICAkLmVhY2godGV4dHMubGlzdEl0ZW1zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICBhZHZpY2VMaXN0LmFwcGVuZCgnPGxpPicgKyB2YWx1ZSArICc8L2xpPicpO1xuICB9KTtcblxuICAvLyBUT0RPOiBNb3JlIGluZm8gbGlua3Ncbn1cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gIHZhciB0b29sdGlwID0gJChcIi50b29sLXRpcFwiKTtcblxuICB2YXIgYWN0aXZlU2ltdWxhdGlvbiA9IHZvaWQgMDtcblxuICBzZXRUZXh0cygpO1xuXG4gIC8vIFNldCBhY3RpdmUgc3RhdGVcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuXG4gICAgYWN0aXZlU2ltdWxhdGlvbiA9IG9iai5hY3RpdmVTaW11bGF0aW9uO1xuXG4gICAgaWYgKGFjdGl2ZVNpbXVsYXRpb24gIT0gbnVsbCkge1xuICAgICAgdG9vbHRpcC5hZGRDbGFzcyhcImluXCIpO1xuICAgICAgc2V0VG9vbHRpcFRleHRzKGFjdGl2ZVNpbXVsYXRpb24pO1xuICAgIH1cbiAgfSk7XG5cbiAgJChcIi5tZW51LWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgbWVudUJ0biA9ICQodGhpcyk7XG4gICAgdmFyIG1lbnVCdG5JZCA9IG1lbnVCdG5bMF0uaWQ7XG5cbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtcbiAgICAgIHBhdGg6IFwiaW1nL2ljb25fYWN0aXZlLnBuZ1wiXG4gICAgfSk7XG5cbiAgICBhY3RpdmVTaW11bGF0aW9uID0gbWVudUJ0bklkO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7ICdhY3RpdmVTaW11bGF0aW9uJzogbWVudUJ0bklkIH0pO1xuXG4gICAgc2V0VG9vbHRpcFRleHRzKGFjdGl2ZVNpbXVsYXRpb24pO1xuXG4gICAgJCgnI3BhbmVsMScpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgJCgnI3BhbmVsMicpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMicpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgfSwgMTAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgc3RhcnRTaW11bGF0aW9uKCk7XG4gICAgfSwgNTAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMicpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgICB0b29sdGlwLmFkZENsYXNzKFwiaW5cIik7XG4gICAgfSwgMTAwMCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNwYW5lbDInKS5hZGRDbGFzcyhcImhpZGVcIik7XG4gICAgfSwgMTUwMCk7XG4gIH0pO1xuXG4gIC8vYnRuIGFuZCBsaW5rc1xuICAkKFwiI3Jlc2V0LWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgcmVzZXRTaW11bGF0aW9uKHRvb2x0aXApO1xuICB9KTtcblxuICAkKFwiLmdpdGh1Yi1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6ICdodHRwczovL2dpdGh1Yi5jb20vTWV0YW1hdHJpeC9XZWItRGlzYWJpbGl0eS1TaW11bGF0b3InIH0pO1xuICB9KTtcblxuICAkKFwiLm1vcmUtaW5mby1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2xpbmtVcmwnLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6ICcnICsgb2JqLmxpbmtVcmwgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vcGFuZWwgY29sbGFwc2UsIHNob3cgYXJyb3dzOiBcbiAgJCgnLmNvbGxhcHNlJykub24oJ3Nob3duLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucGFyZW50KCkuZmluZChcIi5kb3duLWFycm93LCAudXAtYXJyb3dcIikudG9nZ2xlKCk7XG4gIH0pLm9uKCdoaWRkZW4uYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLmRvd24tYXJyb3csIC51cC1hcnJvd1wiKS50b2dnbGUoKTtcbiAgfSk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC5qcy5tYXBcbiIsIm1vZHVsZS5leHBvcnRzPXtcclxuICBcImZhY3RzXCI6IHtcclxuICAgIFwiZHlzbGV4aWFcIjogXHJcbiAgICB7XHJcbiAgICAgIFwiaGVhZGluZ1wiOiBcIkR5c2xleGlcIixcclxuICAgICAgXCJmYWN0XCI6IFwiRHlzbGV4aSDDpHIgZW4gbmVkc8OkdHRuaW5nIHNvbSBnw7ZyIGF0dCBoasOkcm5hbiBoYXIgc3bDpXJ0IGF0dCBhdXRvbWF0aXNlcmEgdG9sa25pbmdlbiBhdiBvcmQuIERldHRhIGfDtnIgYXR0IHBlcnNvbmVyIG1lZCBkZW5uYSBuZWRzw6R0dG5pbmcga2FuIGhhIHN2w6VydCBhdHQgbMOkc2Egb2NoIHNrcml2YS4gRHlzbGV4aSDDpHIgaW50ZSBrb3BwbGF0IHRpbGwgc3luIGVsbGVyIGludGVsbGlnZW5zLiBPcnNha2VybmEgdGlsbCBkeXNsZXhpIMOkciBmb3J0ZmFyYW5kZSBva2xhcnQuXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIlVuZHZpayB0ZXh0IGkgbGl0ZW4gc3RvcmxlayBvY2ggbMOlbmdhIHRleHRlci4gU2UgdGlsbCBhdHQgaGEgb3JkZW50bGlndCBtZWQgcmFkYXZzdMOlbmQuXCIsIFx0XHJcbiAgICAgICAgXCJVbmR2aWsgc3bDpXJhIG9yZCBvY2ggZmFja3Rlcm1lci5cIixcclxuICAgICAgICBcIkVyYmp1ZCBsw6R0dGzDpHN0YSB2ZXJzaW9uZXIgYXYgZmFja3RleHRlci5cIixcclxuICAgICAgICBcIlVuZHZpayB0eXBzbml0dCBtZWQga3LDpW5nbGlnYSBvY2gga29tcGxleGEgZmlndXJlci5cIlxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICBcInBhcmtpbnNvbnNcIjpcclxuICAgIHtcclxuICAgICAgXCJoZWFkaW5nXCI6IFwiUGFya2luc29uc1wiLFxyXG4gICAgICBcImZhY3RcIjogXCJWaWQgUGFya2luc29ucyBzanVrZG9tIGbDtnJzdMO2cnMgY2VsbGVybmEgaSBoasOkcm5hbiBzb20gdGlsbHZlcmthciBkb3BhbWluIHZpbGtldCBnw7ZyIGF0dCBoasOkcm5hbiBmw6VyIGVuIG5lZHNhdHQgZsO2cm3DpWdhIGF0dCBza2lja2Egc2lnbmFsZXIuIFBlcnNvbmVyIG1lZCBQYXJraW5zb25zIGthbiBkcmFiYmFzIGF2IHN5bXB0b20gc29tIHNrYWtuaW5nYXIsIHN0ZWxhIG11c2tsZXIgb2NoIHPDpG1yZSByw7ZyZWxzZWbDtnJtw6VnYS4gT3JzYWtlcm5hIHRpbGwgUGFya2luc29ucyBzanVrZG9tIMOkciBmb3J0ZmFyYW5kZSBva2xhcnQuXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIlNlIHRpbGwgYXR0IHdlYmJwbGF0c2VuIGthbiBhbnbDpG5kYXMgbWVkIGFuZHJhIGhqw6RscG1lZGVsIMOkbiBtdXMsIHRpbGwgZXhlbXBlbCB0YW5nZW50Ym9yZHNuYXZpZ2VyaW5nLlwiLCBcdFxyXG4gICAgICAgIFwiSGEgdGlsbHLDpGNrbGlndCBtZWQgbHVmdCBtZWxsYW4ga29tcG9uZW50ZXJcIixcclxuICAgICAgICBcIkhhIHRpbGxyw6Rja2xpZ3Qgc3RvcmEga2xpY2t5dG9yLlwiLFxyXG4gICAgICAgIFwiVW5kdmlrIHR5cHNuaXR0IG1lZCBrcsOlbmdsaWdhIG9jaCBrb21wbGV4YSBmaWd1cmVyLlwiXHJcbiAgICAgIF0sXHJcbiAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwOi8vd3d3LnBhcmtpbnNvbmZvcmJ1bmRldC5zZVwiLFxyXG4gICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiUGFya2luc29uc2bDtnJidW5kZXRcIlxyXG4gICAgfSxcclxuICAgIFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICB7XHJcbiAgICAgIFwiaGVhZGluZ1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIixcclxuICAgICAgXCJmYWN0XCI6IFwiUGVyc29uZXIgbWVkIGRlZmVrdCBmw6RyZ3NlZW5kZSBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHRhcHBhciBzb20gdGFyIHVwcCBmw6RyZ2VybmEgdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE7DpHIgZW4gZWxsZXIgZmxlcmEgYXYgdGFwcGFybmEgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhIGxlZGVyIGRldCB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZS4gR3VsLWJsw6UgZsOkcmdibGluZGhldCAoVHJpdGFub3BpKSDDpHIgc8OkbGxzeW50LiBOYW1uZXQgw6RyIG1pc3NsZWRhbmRlIGTDpSBkZXQgaW50ZSDDpHIgZsOkcmdlcm5hIGd1bCBvY2ggYmzDpSBzb20gZsO2cnbDpHhsYXMsIHV0YW4gYmzDpSBtZWQgZ3LDtm4gb2NoIGd1bCBtZWQgbGlsYS5cIixcclxuICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgIFwiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBkZXQgZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCBlbiByw7ZkIHJhbSB1dGFuIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IG9jaCBnw6RybmEgZW4gaWtvbi5cIiwgXHRcclxuICAgICAgICBcIkVyYmp1ZCBnw6RybmEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxyXG4gICAgICBdLFxyXG4gICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cHM6Ly9zdi53aWtpcGVkaWEub3JnL3dpa2kvRGVmZWt0X2YlQzMlQTRyZ3NlZW5kZVwiLFxyXG4gICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2lraXBlZGlhIG9tIGRlZmVrdCBmw6RyZ3NlZW5kZVwiXHJcbiAgICB9LFxyXG4gICAgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICB7XHJcbiAgICAgIFwiaGVhZGluZ1wiOiBcIlLDtmQtZ3LDtm4gZsOkcmdibGluZGhldFwiLFxyXG4gICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgZGVmZWt0IGbDpHJnc2VlbmRlIGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6Ugdmlzc2EgZWxsZXIgYWxsYSBmw6RyZ2VyLiBFdHQgZnVsbHQgZnVuZ2VyYW5kZSDDtmdhIGhhciB0cmUgb2xpa2EgdGFwcGFyIHNvbSB0YXIgdXBwIGbDpHJnZXJuYSB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gTsOkciBlbiBlbGxlciBmbGVyYSBhdiB0YXBwYXJuYSBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEgbGVkZXIgZGV0IHRpbGwgZGVmZWt0IGbDpHJnc2VlbmRlLiBSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXQgKFByb3Rhbm9waSBvY2ggRGV1dGVyYW5vcGkpIMOkciBkZW4gdmFubGlnYXN0ZSB0eXBlbiBhdiBmw6RyZ2JsaW5kaGV0LiBEZW4gw6RyIHZhbmxpZ2FyZSBob3MgbcOkbiDDpG4ga3Zpbm5vci4gUGVyc29uZXIgcsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0IGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6UgZsOkcmdlcm5hIHLDtmQsIGdyw7ZuLCBicnVuIG9jaCBvcmFuZ2UuXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCByw7ZkIHJhbSwga29tcGxldHRlcmEgw6R2ZW4gbWVkIHRleHQgb2NoIGfDpHJuYSBlbiAgaWtvbi5cIiwgXCJFcmJqdWQgZ8Okcm5hIGV0dCBow7Zna29udHJhc3QtbMOkZ2UuXCJdLFxyXG4gICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cHM6Ly9zdi53aWtpcGVkaWEub3JnL3dpa2kvRGVmZWt0X2YlQzMlQTRyZ3NlZW5kZVwiLFxyXG4gICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2lraXBlZGlhIG9tIGRlZmVrdCBmw6RyZ3NlZW5kZVwiXHJcbiAgICB9LFxyXG4gICAgXCJmYXJzaWdodGVkbmVzc1wiOlxyXG4gICAge1xyXG4gICAgICBcImhlYWRpbmdcIjogXCJMw6VuZ3N5bnRoZXRcIixcclxuICAgICAgXCJmYWN0XCI6IFwiUGVyc29uZXIgbWVkIEh5cGVyb3BpIHNlciBzdWRkaWd0IHDDpSBuw6RyYSBow6VsbCwgbWVuIGJyYSBww6UgbMOlbmd0IGjDpWxsLiBOZWRzw6R0dG5pbmdlbiB1cHBzdMOlciBww6UgZ3J1bmQgYXYgYXR0IGxqdXNldCBpbnRlIGJyeXRzIHLDpHR0IGkgw7ZnYXQuIERldCDDpHIgZW4gYXYgZGUgdmFubGlnYXN0ZSBzeW5uZWRzw6R0dG5pbmdhcm5hLlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJVbmR2aWsgdGV4dCBpIGxpdGVuIHN0b3JsZWsuXCIsIFx0XHJcbiAgICAgICAgXCJXZWJic2lkYW4gc2thIGfDpSBhdHQgZsO2cnN0b3JhICh6b29tYXMpIHRpbGwgbWluc3QgMjAwICUgc8OlIGF0dCBiZXPDtmthcmVuIGthbiBhbnBhc3NhIGlubmVow6VsbGV0cyBzdG9ybGVrIGVmdGVyIHNpbmEgYmVob3YuXCIsXHJcbiAgICAgICAgXCJFcmJqdWQgdXBwbMOkc25pbmcgYXYgaW5uZWjDpWxsZXQuXCJcclxuICAgICAgXSxcclxuICAgICAgXCJtb3JlSW5mb1VybFwiOiBcImh0dHBzOi8vd2ViYnJpa3RsaW5qZXIuc2Uvci8zOS1nZS13ZWJicGxhdHNlbi1lbi1nb2QtbGFzYmFyaGV0L1wiLFxyXG4gICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2ViYnJpa3RsaW5qZSBHZSB3ZWJicGxhdHNlbiBnb2QgbMOkc2JhcmhldFwiXHJcbiAgICB9LFxyXG4gICAgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICB7XHJcbiAgICAgIFwiaGVhZGluZ1wiOiBcIkhlbHQgZsOkcmdibGluZFwiLFxyXG4gICAgICBcImZhY3RcIjogXCJEZWZla3QgZsOkcmdzZWVuZGUgaW5uZWLDpHIgYXR0IGVuIHBlcnNvbiBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHR5cGVyIGF2IHRhcHBhciBzb20gdGFyIHVwcCBvbGlrYSBmw6RyZ2VyOiB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gT3JzYWtlbiB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZSDDpHIgYXR0IGVuIGVsbGVyIGZsZXJhIGF2IGRlc3NhIHR5cGVyIGF2IHRhcHBhciBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEuIEhlbHQgZsOkcmdibGluZCAoTW9ub2tyb21hc2kvYWtyb21hdG9wc2kpIMOkciBteWNrZXQgc8OkbGxzeW50LiBQZXJzb25lciBtZWQgZGVubmEgc3lubmVkc8OkdHRuaW5nIHNlciBpbmdhIGbDpHJnZXIgdXRhbiBzZXIgZW5kYXN0IGkgZ3LDpXNrYWxhLlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJBbnbDpG5kIGludGUgZsOkcmcgc29tIGRldCBlbmRhIHPDpHR0ZXQgYXR0IGbDtnJtZWRsYSBpbmZvcm1hdGlvbiwgaW5kaWtlcmEgZW4gaGFuZGxpbmcgZWxsZXIgaWRlbnRpZmllcmEgZWxlbWVudC4gTWFya2VyYSB0LmV4LiBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCByw7ZkIHJhbSwga29tcGxldHRlcmEgw6R2ZW4gbWVkIHRleHQgZWxsZXIgaWtvbi5cIiwgXHRcclxuICAgICAgICBcIkRldCBrYW4gdmFyYSBlbiBicmEgaWTDqSBhdHQgZXJianVkYSBldHQgaMO2Z2tvbnRyYXN0LWzDpGdlLlwiXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICBcInR1bm5lbFZpc2lvblwiOlxyXG4gICAge1xyXG4gICAgICBcImhlYWRpbmdcIjogXCJUdW5uZWxzZWVuZGVcIixcclxuICAgICAgXCJmYWN0XCI6IFwiVHVubmVsc2VlbmRlIGlubmViw6RyLi4uXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIkxpc3RpdGVtIDFcIiwgXHRcclxuICAgICAgICBcIkxpc3RpdGVtIDIuXCJcclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIFwiY29uY2VudHJhdGlvblwiOlxyXG4gICAge1xyXG4gICAgICBcImhlYWRpbmdcIjogXCJLb25jZW50cmF0aW9uXCIsXHJcbiAgICAgIFwiZmFjdFwiOiBcIkFsbGEga2FuIGhhIHN2w6VydCBhdHQga29uY2VudHJlcmEgc2lnIG1lbiBmw7ZyIHZpc3NhIGthbiBkZXQgYmxpIGV0dCBzdG9ydCBwcm9ibGVtIGkgdmFyZGFnc2xpdmV0LiBEZXNzYSBmdW5rdGlvbnNuZWRzw6R0dG5pbmdhciBrYW4gb3JzYWthIHN2w6VyaWdoZXRlciBtZWQgYXR0IGhhbnRlcmEgaW50cnljaywgc29ydGVyYSBpbmZvcm1hdGlvbiBvY2ggbGp1ZGvDpG5zbGlnaGV0LlwiLFxyXG4gICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgXCJMaXN0aXRlbSAxXCIsIFx0XHJcbiAgICAgICAgXCJMaXN0aXRlbSAyLlwiXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOlxyXG4gICAge1xyXG4gICAgICBcImhlYWRpbmdcIjogXCJMaXRldCBvcmRmw7ZycsOlZFwiLFxyXG4gICAgICBcImZhY3RcIjogXCJFbiBzdG9yIGRlbCBhdiBqb3JkZW5zIGJlZm9sa25pbmcga2FuIGludGUgbMOkc2EgYWxscyBvY2ggbcOlbmdhIHZ1eG5hIGzDpHNlciBpbnRlIHPDpSBicmEgc29tIGbDtnJ2w6RudGFzIGVmdGVyIGdydW5kc2tvbGV1dGJpbGRuaW5nZW4uXCIsXHJcbiAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICBcIlVuZHZpayBrcsOlbmdsaWdhIG9yZCBvY2ggZmFja3Rlcm1lci5cIiwgICBcclxuICAgICAgICBcIkVyYmp1ZCBsw6R0dGzDpHN0IHZlcnNpb24gYXYga3LDpW5nbGlnYSB0ZXh0ZXIuXCIsXHJcbiAgICAgICAgXCJFcmJqdWQgdGV4dGVyIHDDpSBvbGlrYSBzcHLDpWsuXCJcclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgXCJVSVwiOiB7XHJcbiAgICBcInNlbGVjdFNpbXVsYXRpb25cIjogXCJWw6RsaiBzaW11bGVyaW5nOlwiLFxyXG4gICAgXCJyZXNldFwiOiBcIsOFdGVyc3TDpGxsXCIsXHJcbiAgICBcImFkdmljZVwiOiBcIlTDpG5rIHDDpSBkZXR0YVwiLFxyXG4gICAgXCJtb3JlSW5mb1wiOiBcIk1lciBpbmZvcm1hdGlvblwiLFxyXG4gICAgXCJzaWdodFwiOiBcIlN5blwiLFxyXG4gICAgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6IFwiSGVsdCBmw6RyZ2JsaW5kXCIsXHJcbiAgICBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIiwgICAgXHJcbiAgICBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXRcIixcclxuICAgIFwiZmFyc2lnaHRlZG5lc3NcIjogXCJMw6VuZ3N5bnRoZXQsIMO2dmVyc3ludGhldFwiLFxyXG4gICAgXCJ0dW5uZWxWaXNpb25cIjogXCJUdW5uZWxzZWVuZGVcIixcclxuICAgIFwibW9iaWxpdHlcIjogXCJNb3RvcmlrXCIsXHJcbiAgICBcInBhcmtpbnNvbnNcIjogXCJQYXJraW5zb25zXCIsXHJcbiAgICBcInJlYWRBbmRXcml0ZVwiOiBcIkzDpHNhIG9jaCBza3JpdmFcIixcclxuICAgIFwiZHlzbGV4aWFcIjogXCJEeXNsZXhpXCIsXHJcbiAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOiBcIkxpdGV0IG9yZGbDtnJyw6VkXCIsXHJcbiAgICBcImNvbmNlbnRyYXRpb25cIjogXCJLb25jZW50cmF0aW9uXCIsXHJcbiAgICBcInNpbXVsYXRpb25zXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlN5blwiLFxyXG4gICAgICAgIFwiY2hvaWNlc1wiOiBbXHJcbiAgICAgICAgICB7IFwidG90YWxDb2xvckJsaW5kbmVzc1wiOiBcIkhlbHQgZsOkcmdibGluZFwiIH0sXHJcbiAgICAgICAgICB7IFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6IFwiR3VsLWJsw6UgZsOkcmdibGluZGhldFwiIH0sXHJcbiAgICAgICAgICB7IFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOiBcIlLDtmQtZ3LDtm4gZsOkcmdibGluZGhldFwiIH0sXHJcbiAgICAgICAgICB7IFwiZmFyc2lnaHRlZG5lc3NcIjogXCJMw6VuZ3N5bnRoZXQsIMO2dmVyc3ludGhldFwiIH0sXHJcbiAgICAgICAgICB7IFwidHVubmVsVmlzaW9uXCI6IFwiVHVubmVsc2VlbmRlXCIgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIk1vdG9yaWtcIixcclxuICAgICAgICBcImNob2ljZXNcIjogWyBcclxuICAgICAgICAgIHsgXCJwYXJraW5zb25zXCI6IFwiUGFya2luc29uc1wiIH1cclxuICBcclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkzDpHNhIG9jaCBza3JpdmFcIixcclxuICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgeyBcImR5c2xleGlhXCI6IFwiRHlzbGV4aVwiIH0sXHJcbiAgICAgICAgICB7IFwic21hbGxWb2NhYnVsYXJ5XCI6IFwiTGl0ZXQgb3JkZsO2cnLDpWRcIiB9LFxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIktvbmNlbnRyYXRpb25cIixcclxuICAgICAgICBcImNob2ljZXNcIjogW11cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIk1pbm5lXCIsXHJcbiAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgIH1cclxuXHJcbiAgICBdXHJcbiAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIGxvYWRlZFNpbXVsYXRpb25zID0gW107XG5cbmZ1bmN0aW9uIGxvYWQobmFtZSwgc3ViTmFtZSwgY2FsbGJhY2spIHtcbiAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXSxcbiAgICAgICAgc2NyaXB0RmlsZSA9IHN1Yk5hbWUgPyAnc2ltdWxhdGlvbnMvJyArIG5hbWUgKyAnLycgKyBzdWJOYW1lICsgJy9jb250ZW50LmpzJyA6ICdzaW11bGF0aW9ucy8nICsgbmFtZSArICcvY29udGVudC5qcyc7XG5cbiAgICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KGFjdGl2ZVRhYi5pZCwgeyBmaWxlOiBzY3JpcHRGaWxlIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxvYWRlZFNpbXVsYXRpb25zLnB1c2gobmFtZSk7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sobmFtZSwgc3ViTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdGFydChuYW1lLCBzdWJOYW1lKSB7XG4gIGlmIChsb2FkZWRTaW11bGF0aW9ucy5pbmNsdWRlcyhuYW1lKSkge1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0YXJ0U2ltdWxhdGlvbicsIHNpbXVsYXRpb246IG5hbWUsIHN1YlNpbXVsYXRpb246IHN1Yk5hbWUgfSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgbG9hZChuYW1lLCBzdWJOYW1lLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RhcnRTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSwgc3ViU2ltdWxhdGlvbjogc3ViTmFtZSB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0b3AobmFtZSwgc3ViTmFtZSkge1xuICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0b3BTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSwgc3ViU2ltdWxhdGlvbjogc3ViTmFtZSB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydHMuc3RhcnQgPSBzdGFydDtcbmV4cG9ydHMuc3RvcCA9IHN0b3A7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaW11bGF0aW9uTG9hZGVyLmpzLm1hcFxuIl19
