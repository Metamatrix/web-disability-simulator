(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _data = require('./data/data.json');

var languageData = _interopRequireWildcard(_data);

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

var lang = "en";

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

  setTimeout(function () {
    tooltip.addClass("hide");
  }, 250);

  chrome.storage.local.get('activeSimulation', function (obj) {
    simulationLoader.stop(obj.activeSimulation);
    chrome.storage.local.remove('activeSimulation');
  });
}

function setTexts() {

  var data = languageData[lang];

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

  $('#settings-heading').text(data.UI.changeSettings);
  $('#language-label').text(data.UI.selectLanguage);
  $('#btn-save-settings').text(data.UI.saveSettings);
  $('#btn-cancel-settings').text(data.UI.cancel);
}

function setTooltipTexts(activeSimulation) {

  var data = languageData[lang];

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

  chrome.storage.local.get('lang', function (obj) {

    lang = obj.lang;

    setTexts();
  });

  // Set active state
  chrome.storage.local.get('activeSimulation', function (obj) {

    activeSimulation = obj.activeSimulation;

    if (activeSimulation) {
      tooltip.addClass("in").removeClass("hide");
      $('#panel1').removeClass("in");
      setTooltipTexts(activeSimulation);
    }
  });

  // Main view
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
    tooltip.removeClass("hide");

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

  $(".github-link").click(function () {
    chrome.tabs.create({ url: 'https://github.com/Metamatrix/Web-Disability-Simulator' });
  });

  $('.settings-link').on('click', function (e) {
    e.preventDefault();

    chrome.storage.local.get('lang', function (obj) {
      $('#language').val(obj.lang);
    });

    $('#panel1').removeClass("in");
    $('#settings').removeClass("hide");

    setTimeout(function () {
      $('#settings').addClass("in");
    }, 250);

    setTimeout(function () {
      $('#panel1').addClass("hide");
    }, 500);
  });

  // Settings view

  $('#btn-save-settings').on('click', function (e) {
    e.preventDefault();

    var selectedLang = $('#language').val();

    chrome.storage.local.set({ 'lang': selectedLang });

    lang = selectedLang;

    setTexts();

    $('#settings').removeClass("in");
    $('#panel1').removeClass("hide");

    setTimeout(function () {
      $('#panel1').addClass("in");
    }, 500);

    setTimeout(function () {
      $('#settings').addClass("hide");
    }, 750);
  });

  $('#btn-cancel-settings').on('click', function (e) {
    e.preventDefault();

    $('#settings').removeClass("in");
    $('#panel1').removeClass("hide");

    setTimeout(function () {
      $('#panel1').addClass("in");
    }, 250);

    setTimeout(function () {
      $('#settings').addClass("hide");
    }, 500);
  });

  // Tooltip view
  $("#reset-btn").click(function () {
    resetSimulation(tooltip);
  });

  $(".more-info-link").click(function () {
    chrome.storage.local.get('linkUrl', function (obj) {
      chrome.tabs.create({ url: '' + obj.linkUrl });
    });
  });

  //panel collapse, show arrows: 
  $('.collapse').on('shown.bs.collapse', function () {
    $(undefined).parent().find(".down-arrow, .up-arrow").toggle();
  }).on('hidden.bs.collapse', function () {
    $(undefined).parent().find(".down-arrow, .up-arrow").toggle();
  });
});


},{"../utils/simulationLoader.js":3,"./data/data.json":2}],2:[function(require,module,exports){
module.exports={
  "sv":
  {
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
          "Ha tillräckligt stora klickytor."
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
        "listItems": 
        ["Använd inte färg som enda sättet att förmedla information, indikera en handling eller identifiera ett element. Markera till exempel inte ett felaktigt formulärfält endast med röd ram, komplettera även med text och gärna en  ikon.", "Erbjud gärna ett högkontrast-läge."],
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
        "fact": "Det som i dagligt tal brukar kallas tunnelseende är en synnedsättning som gör att endast en del av synfältet kan ses. Detta kan bero på att personen lider av en sjukdom som gör att cellerna i ögat förstörs men denna typ av synnedsättning kan också tillfälligt uppstå på grund av stress eller depression.",
        "listItems": [
          "Undvik text i liten storlek.",
          "Webbsidan ska gå att förstora (zoomas) till minst 200 % så att besökaren kan anpassa innehållets storlek efter sina behov.",
          "Erbjud uppläsning av innehållet."
        ]
      },
      "concentration":
      {
        "heading": "Koncentration",
        "fact": "Alla kan ha svårt att koncentrera sig men för vissa kan det bli ett stort problem i vardagslivet. Dessa funktionsnedsättningar kan orsaka svårigheter med att hantera intryck, sortera information och ljudkänslighet.",
        "listItems": [
          "Ge webbplatsen en enkel och luftig design.",
          "Var försiktig med animationer och starka färger.",
          "Undvik att ha för mycket innehåll på samma sida.",
          "Erbjud ljud- och video-alernativ till textinnehåll."
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
      "changeSettings": "Change settings",
      "selectLanguage": "Select language",
      "saveSettings": "Save settings",
      "cancel": "Cancel",
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
  },
  "en":
  {
    "facts": {
      "dyslexia": 
      {
        "heading": "Dyslexia",
        "fact": "Dyslexia is a disability that makes it difficult for the brain to automate the interpretation of words. This makes it hard for people with this disability to read and write. Dyslexia is has no connection with vision or intelligence. The causes of dyslexia are still unclear.",
        "listItems": [
          "Avoid text in small font sizes and long texts. Use proper spacing and line height.",
          "Avoid difficult words and terms.",
          "Offer easy to read texts, images, video or audio alternatives.",
          "Avoid fonts with complicated and complex characters."
        ]
      },
      "parkinsons":
      {
        "heading": "Parkinsons",
        "fact": "Parkinson's disease destroys the cells in the brain that produce dopamine, which causes the brain to have a reduced ability to send signals. Persons with Parkinson's may suffer from symptoms such as shaking, stiff muscles, and reduced mobility. The causes of Parkinson's disease are still unclear.",
        "listItems": [
          "Make sure the website can be used with other tools other than a mouse, such as keyboard navigation.",
          "Have enough space between components.",
          "Make sure click areas are big enough.",
        ]
      },
      "yellowBlueColorBlindness":
      {
        "heading": "Yellow-blue color blindness",
        "fact": "People with lowered color vision have difficulty distinguishing some or all colors. Yellow-blue color blindness (Tritanopia) is rare. The name can be misleading. It's not the colors yellow and blue that are confused but blue with green and yellow with purple.",
        "listItems": [
          "Do not use color as the only way to convey information, indicate an action or identify an element. For example, do not mark an incorrect form field with a red border only, also supplement with a text and preferably an icon.",
          "Consider offering a high contrast mode."
        ]
      },
      "redGreenColorBlindness":
      {
        "heading": "Red-green color blindness",
        "fact": "People with lowered color vision have difficulty distinguishing some or all colors. Red-green color blindness (Protanopia and Deuteranopia) is the most common type of color blindness. It is more common among men than women. People with red-green color blindness have difficulty distinguishing the colors red, green, brown and orange.",
        "listItems": [
          "Do not use color as the only way to convey information, indicate an action or identify an element. For example, do not mark an incorrect form field with a red border only, also supplement with a text and preferably an icon.",
          "Consider offering a high contrast mode."
        ]
      },
      "farsightedness":
      {
        "heading": "Far-sightedness",
        "fact": "Far-sightedness (Hyperopia) is one of the most common visual impairments. People with Hyperopia have difficulty focusing on objects at close range which makes them appear blurry.",
        "listItems": [
          "Avoid text in small font sizes and long texts. Use proper spacing and line height.",  
          "Make sure the website can be zoomed to at least 200%.",
          "Offer a text to speech reader."
        ]
      },
      "totalColorBlindness":
      {
        "heading": "Total color blindness",
        "fact": "People with lowered color vision have difficulty distinguishing some or all colors. Total color blindness (Monochromatic / Achromatopsy) is very rare. People with this visual impairment can not percieve any colors, only different shades of gray.",
        "listItems": [
          "Do not use color as the only way to convey information, indicate an action or identify an element. For example, do not mark an incorrect form field with a red border only, also supplement with a text and preferably an icon.",
          "Consider offering a high contrast mode."
        ]
      },
      "tunnelVision":
      {
        "heading": "Tunnel Vision",
        "fact": "What is commonly called Tunnel Vision is loss of peripheral vision. This may be because the person suffers from a disease that affects they cells in the eye, but may also occur temporarily due to stress or depression.",
        "listItems": [
          "Avoid text in small font sizes and long texts. Use proper spacing and line height.",
          "Make sure the website can be zoomed to at least 200%.",
          "Offer a text to speech reader."
        ]
      },
      "concentration":
      {
        "heading": "Concentration",
        "fact": "Everyone can have a hard time concentrating, but for some it can be a big problem in everyday life. Disabilities like ADHD and Autism can cause difficulty in handling impressions, sorting information and sensitivity to sound.",        "listItems": [
          "Give the website a simple and clean design.",
          "Be careful with animations and strong colors.",
          "Avoid having too much content on the same page.",
          "Offer image, audio and video alernatives to text content."
        ]
      },
      "smallVocabulary":
      {
        "heading": "Small vocabulary",
        "fact": "A large part of the world's population can't read at all and many adults don't read as well as expected after finishing grade school.",
        "listItems": [
          "Avoid difficult words and terms.",
          "Offer easy to read texts, images, video or audio alternatives.",
          "Offer texts in different languages."
        ]
      }
    },
    "UI": {
      "selectSimulation": "Select simulation:",
      "reset": "Reset",
      "advice": "Think about this",
      "moreInfo": "More information",
      "sight": "Sight",
      "totalColorBlindness": "Total color blindness",
      "yellowBlueColorBlindness": "Yellow-Blue color blindness",    
      "redGreenColorBlindness": "Red-Green color blindness",
      "farsightedness": "Far-sightedness",
      "tunnelVision": "Tunnel vision",
      "mobility": "Mobility",
      "parkinsons": "Parkinsons",
      "readAndWrite": "Read and write",
      "dyslexia": "Dyslexia",
      "smallVocabulary": "Small vocabulary",
      "concentration": "Concentration",
      "changeSettings": "Change settings",
      "selectLanguage": "Select language",
      "saveSettings": "Save settings",
      "cancel": "Cancel",
      "simulations": [
        {
          "heading": "Sight",
          "choices": [
            { "totalColorBlindness": "Total color blindness" },
            { "yellowBlueColorBlindness": "Yellow-Blue color blindness" },
            { "redGreenColorBlindness": "Red-Green color blindness" },
            { "farsightedness": "Far-sightedness" },
            { "tunnelVision": "Tunnel vision" }
          ]
        },
        {
          "heading": "Mobility",
          "choices": [ 
            { "parkinsons": "Parkinsons" }
    
            ]
        },
        {
          "heading": "Read and write",
          "choices": [
            { "dyslexia": "Dyslexia" },
            { "smallVocabulary": "Small vocabulary" },
          ]
        },
        {
          "heading": "Concentration",
          "choices": []
        },
        {
          "heading": "Memory",
          "choices": []
        }

      ]
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxVSVxcYXBwLmpzIiwiYnVpbGQvanMvYmFiZWwvVUkvZGF0YS9kYXRhLmpzb24iLCJidWlsZFxcanNcXGJhYmVsXFx1dGlsc1xcc2ltdWxhdGlvbkxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLElBQUksUUFBUSxRQUFRLGtCQUFSLENBQVo7O0FBRUEsSUFBSSxlQUFlLHdCQUF3QixLQUF4QixDQUFuQjs7QUFFQSxJQUFJLG9CQUFvQixRQUFRLDhCQUFSLENBQXhCOztBQUVBLElBQUksbUJBQW1CLHdCQUF3QixpQkFBeEIsQ0FBdkI7O0FBRUEsU0FBUyx1QkFBVCxDQUFpQyxHQUFqQyxFQUFzQztBQUFFLE1BQUksT0FBTyxJQUFJLFVBQWYsRUFBMkI7QUFBRSxXQUFPLEdBQVA7QUFBYSxHQUExQyxNQUFnRDtBQUFFLFFBQUksU0FBUyxFQUFiLENBQWlCLElBQUksT0FBTyxJQUFYLEVBQWlCO0FBQUUsV0FBSyxJQUFJLEdBQVQsSUFBZ0IsR0FBaEIsRUFBcUI7QUFBRSxZQUFJLE9BQU8sU0FBUCxDQUFpQixjQUFqQixDQUFnQyxJQUFoQyxDQUFxQyxHQUFyQyxFQUEwQyxHQUExQyxDQUFKLEVBQW9ELE9BQU8sR0FBUCxJQUFjLElBQUksR0FBSixDQUFkO0FBQXlCO0FBQUUsS0FBQyxPQUFPLE9BQVAsR0FBaUIsR0FBakIsQ0FBc0IsT0FBTyxNQUFQO0FBQWdCO0FBQUU7O0FBRTdRLElBQUksT0FBTyxJQUFYOztBQUVBLFNBQVMsZUFBVCxHQUEyQjs7QUFFekIsU0FBTyxPQUFQLENBQWUsS0FBZixDQUFxQixHQUFyQixDQUF5QixrQkFBekIsRUFBNkMsVUFBVSxHQUFWLEVBQWU7QUFDMUQscUJBQWlCLEtBQWpCLENBQXVCLElBQUksZ0JBQTNCO0FBQ0QsR0FGRDtBQUdEOztBQUVELFNBQVMsZUFBVCxDQUF5QixP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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFRBOztBQUVBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQyxTQUFPO0FBRG9DLENBQTdDO0FBR0EsSUFBSSxvQkFBb0IsRUFBeEI7O0FBRUEsU0FBUyxJQUFULENBQWMsSUFBZCxFQUFvQixPQUFwQixFQUE2QixRQUE3QixFQUF1QztBQUNyQyxTQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEVBQUUsUUFBUSxJQUFWLEVBQWdCLGVBQWUsSUFBL0IsRUFBbEIsRUFBeUQsVUFBVSxJQUFWLEVBQWdCO0FBQ3ZFLFFBQUksWUFBWSxLQUFLLENBQUwsQ0FBaEI7QUFBQSxRQUNJLGFBQWEsVUFBVSxpQkFBaUIsSUFBakIsR0FBd0IsR0FBeEIsR0FBOEIsT0FBOUIsR0FBd0MsYUFBbEQsR0FBa0UsaUJBQWlCLElBQWpCLEdBQXdCLGFBRDNHOztBQUdBLFdBQU8sSUFBUCxDQUFZLGFBQVosQ0FBMEIsVUFBVSxFQUFwQyxFQUF3QyxFQUFFLE1BQU0sVUFBUixFQUF4QyxFQUE4RCxZQUFZO0FBQ3hFLHdCQUFrQixJQUFsQixDQUF1QixJQUF2QjtBQUNBLFVBQUksUUFBSixFQUFjO0FBQ1osaUJBQVMsSUFBVCxFQUFlLE9BQWY7QUFDRDtBQUNGLEtBTEQ7QUFNRCxHQVZEO0FBV0Q7O0FBRUQsU0FBUyxLQUFULENBQWUsSUFBZixFQUFxQixPQUFyQixFQUE4QjtBQUM1QixNQUFJLGtCQUFrQixRQUFsQixDQUEyQixJQUEzQixDQUFKLEVBQXNDO0FBQ3BDLFdBQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsRUFBRSxRQUFRLElBQVYsRUFBZ0IsZUFBZSxJQUEvQixFQUFsQixFQUF5RCxVQUFVLElBQVYsRUFBZ0I7QUFDdkUsVUFBSSxZQUFZLEtBQUssQ0FBTCxDQUFoQjs7QUFFQSxhQUFPLElBQVAsQ0FBWSxXQUFaLENBQXdCLFVBQVUsRUFBbEMsRUFBc0MsRUFBRSxRQUFRLGlCQUFWLEVBQTZCLFlBQVksSUFBekMsRUFBK0MsZUFBZSxPQUE5RCxFQUF0QztBQUNELEtBSkQ7QUFLRCxHQU5ELE1BTU87QUFDTCxTQUFLLElBQUwsRUFBVyxPQUFYLEVBQW9CLFlBQVk7QUFDOUIsYUFBTyxJQUFQLENBQVksS0FBWixDQUFrQixFQUFFLFFBQVEsSUFBVixFQUFnQixlQUFlLElBQS9CLEVBQWxCLEVBQXlELFVBQVUsSUFBVixFQUFnQjtBQUN2RSxZQUFJLFlBQVksS0FBSyxDQUFMLENBQWhCOztBQUVBLGVBQU8sSUFBUCxDQUFZLFdBQVosQ0FBd0IsVUFBVSxFQUFsQyxFQUFzQyxFQUFFLFFBQVEsaUJBQVYsRUFBNkIsWUFBWSxJQUF6QyxFQUErQyxlQUFlLE9BQTlELEVBQXRDO0FBQ0QsT0FKRDtBQUtELEtBTkQ7QUFPRDtBQUNGOztBQUVELFNBQVMsSUFBVCxDQUFjLElBQWQsRUFBb0IsT0FBcEIsRUFBNkI7QUFDM0IsU0FBTyxJQUFQLENBQVksS0FBWixDQUFrQixFQUFFLFFBQVEsSUFBVixFQUFnQixlQUFlLElBQS9CLEVBQWxCLEVBQXlELFVBQVUsSUFBVixFQUFnQjtBQUN2RSxRQUFJLFlBQVksS0FBSyxDQUFMLENBQWhCOztBQUVBLFdBQU8sSUFBUCxDQUFZLFdBQVosQ0FBd0IsVUFBVSxFQUFsQyxFQUFzQyxFQUFFLFFBQVEsZ0JBQVYsRUFBNEIsWUFBWSxJQUF4QyxFQUE4QyxlQUFlLE9BQTdELEVBQXRDO0FBQ0QsR0FKRDtBQUtEOztBQUVELFFBQVEsS0FBUixHQUFnQixLQUFoQjtBQUNBLFFBQVEsSUFBUixHQUFlLElBQWY7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfZGF0YSA9IHJlcXVpcmUoJy4vZGF0YS9kYXRhLmpzb24nKTtcblxudmFyIGxhbmd1YWdlRGF0YSA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9kYXRhKTtcblxudmFyIF9zaW11bGF0aW9uTG9hZGVyID0gcmVxdWlyZSgnLi4vdXRpbHMvc2ltdWxhdGlvbkxvYWRlci5qcycpO1xuXG52YXIgc2ltdWxhdGlvbkxvYWRlciA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9zaW11bGF0aW9uTG9hZGVyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxudmFyIGxhbmcgPSBcImVuXCI7XG5cbmZ1bmN0aW9uIHN0YXJ0U2ltdWxhdGlvbigpIHtcblxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2FjdGl2ZVNpbXVsYXRpb24nLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgc2ltdWxhdGlvbkxvYWRlci5zdGFydChvYmouYWN0aXZlU2ltdWxhdGlvbik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXNldFNpbXVsYXRpb24odG9vbHRpcCkge1xuXG4gIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEljb24oe1xuICAgIHBhdGg6IFwiaW1nL2ljb24ucG5nXCJcbiAgfSk7XG5cbiAgdG9vbHRpcC5yZW1vdmVDbGFzcyhcImluXCIpO1xuICAkKFwiI3BhbmVsMVwiKS5hZGRDbGFzcyhcImluXCIpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHRvb2x0aXAuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICB9LCAyNTApO1xuXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlU2ltdWxhdGlvbicsIGZ1bmN0aW9uIChvYmopIHtcbiAgICBzaW11bGF0aW9uTG9hZGVyLnN0b3Aob2JqLmFjdGl2ZVNpbXVsYXRpb24pO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnJlbW92ZSgnYWN0aXZlU2ltdWxhdGlvbicpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0VGV4dHMoKSB7XG5cbiAgdmFyIGRhdGEgPSBsYW5ndWFnZURhdGFbbGFuZ107XG5cbiAgJChcIi5tb3JlLWluZm8tbGlua1wiKS50ZXh0KGRhdGEuVUkubW9yZUluZm8pO1xuICAkKFwiI3Jlc2V0LWJ0blwiKS50ZXh0KGRhdGEuVUkucmVzZXQpO1xuICAkKFwiLm5hdmJhci1oZWFkZXJcIikudGV4dChkYXRhLlVJLnNlbGVjdFNpbXVsYXRpb24pO1xuICAkKFwiI2FkdmljZS1kcm9wZG93blwiKS50ZXh0KGRhdGEuVUkuYWR2aWNlKTtcbiAgJChcIiNpbmZvLWRyb3Bkb3duXCIpLnRleHQoZGF0YS5VSS5tb3JlSW5mbyk7XG4gICQoXCIjc2lnaHRcIikudGV4dChkYXRhLlVJLnNpZ2h0KTtcbiAgJChcIiNtb2JpbGl0eVwiKS50ZXh0KGRhdGEuVUkubW9iaWxpdHkpO1xuICAkKFwiI3JlYWRXcml0ZVwiKS50ZXh0KGRhdGEuVUkucmVhZEFuZFdyaXRlKTtcbiAgJChcIiNjb25jZW50cmF0aW9uXCIpLnRleHQoZGF0YS5VSS5jb25jZW50cmF0aW9uKTtcblxuICAkLmVhY2goZGF0YS5VSS5zaW11bGF0aW9ucywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG5cbiAgICAkKCcjJyArIHZhbHVlLmhlYWRpbmcpLnRleHQodmFsdWUuaGVhZGluZyk7XG5cbiAgICAkLmVhY2godmFsdWUuY2hvaWNlcywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICAgICAgJCgnIycgKyBrZXkpLnRleHQodmFsdWVba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gICQoJyNzZXR0aW5ncy1oZWFkaW5nJykudGV4dChkYXRhLlVJLmNoYW5nZVNldHRpbmdzKTtcbiAgJCgnI2xhbmd1YWdlLWxhYmVsJykudGV4dChkYXRhLlVJLnNlbGVjdExhbmd1YWdlKTtcbiAgJCgnI2J0bi1zYXZlLXNldHRpbmdzJykudGV4dChkYXRhLlVJLnNhdmVTZXR0aW5ncyk7XG4gICQoJyNidG4tY2FuY2VsLXNldHRpbmdzJykudGV4dChkYXRhLlVJLmNhbmNlbCk7XG59XG5cbmZ1bmN0aW9uIHNldFRvb2x0aXBUZXh0cyhhY3RpdmVTaW11bGF0aW9uKSB7XG5cbiAgdmFyIGRhdGEgPSBsYW5ndWFnZURhdGFbbGFuZ107XG5cbiAgdmFyIGluZm9IZWFkaW5nID0gJChcIi5kaXNhYmlsaXR5LWluZm8taGVhZGluZ1wiKTtcbiAgdmFyIGluZm9QYXJhZ3JhcGggPSAkKFwiLmRpc2FiaWxpdHktaW5mby1wYXJhZ3JhcGhcIik7XG4gIHZhciBhZHZpY2VMaXN0ID0gJChcIi5hZHZpY2UtbGlzdFwiKTtcbiAgdmFyIG1vcmVJbmZvTGlzdCA9ICQoXCIubW9yZS1pbmZvLWxpc3RcIik7XG4gIHZhciBtb3JlSW5mb1BhbmVsID0gJChcIi5tb3JlLWluZm8tcGFuZWxcIik7XG4gIHZhciB0ZXh0cyA9IGRhdGEuZmFjdHNbYWN0aXZlU2ltdWxhdGlvbl07XG5cbiAgaW5mb0hlYWRpbmcuZW1wdHkoKTtcbiAgaW5mb1BhcmFncmFwaC5lbXB0eSgpO1xuICBhZHZpY2VMaXN0LmVtcHR5KCk7XG5cbiAgaW5mb0hlYWRpbmcudGV4dCh0ZXh0cy5oZWFkaW5nKTtcbiAgaW5mb1BhcmFncmFwaC50ZXh0KHRleHRzLmZhY3QpO1xuXG4gICQuZWFjaCh0ZXh0cy5saXN0SXRlbXMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuICAgIGFkdmljZUxpc3QuYXBwZW5kKCc8bGk+JyArIHZhbHVlICsgJzwvbGk+Jyk7XG4gIH0pO1xuXG4gIC8vIFRPRE86IE1vcmUgaW5mbyBsaW5rc1xufVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIHRvb2x0aXAgPSAkKFwiLnRvb2wtdGlwXCIpO1xuXG4gIHZhciBhY3RpdmVTaW11bGF0aW9uID0gdm9pZCAwO1xuXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnbGFuZycsIGZ1bmN0aW9uIChvYmopIHtcblxuICAgIGxhbmcgPSBvYmoubGFuZztcblxuICAgIHNldFRleHRzKCk7XG4gIH0pO1xuXG4gIC8vIFNldCBhY3RpdmUgc3RhdGVcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuXG4gICAgYWN0aXZlU2ltdWxhdGlvbiA9IG9iai5hY3RpdmVTaW11bGF0aW9uO1xuXG4gICAgaWYgKGFjdGl2ZVNpbXVsYXRpb24pIHtcbiAgICAgIHRvb2x0aXAuYWRkQ2xhc3MoXCJpblwiKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG4gICAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAgIHNldFRvb2x0aXBUZXh0cyhhY3RpdmVTaW11bGF0aW9uKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIE1haW4gdmlld1xuICAkKFwiLm1lbnUtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBtZW51QnRuID0gJCh0aGlzKTtcbiAgICB2YXIgbWVudUJ0bklkID0gbWVudUJ0blswXS5pZDtcblxuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEljb24oe1xuICAgICAgcGF0aDogXCJpbWcvaWNvbl9hY3RpdmUucG5nXCJcbiAgICB9KTtcblxuICAgIGFjdGl2ZVNpbXVsYXRpb24gPSBtZW51QnRuSWQ7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgJ2FjdGl2ZVNpbXVsYXRpb24nOiBtZW51QnRuSWQgfSk7XG5cbiAgICBzZXRUb29sdGlwVGV4dHMoYWN0aXZlU2ltdWxhdGlvbik7XG5cbiAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAkKCcjcGFuZWwyJykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuICAgIHRvb2x0aXAucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwyJykuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICB9LCAxMDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzdGFydFNpbXVsYXRpb24oKTtcbiAgICB9LCA1MDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwyJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAgIHRvb2x0aXAuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICB9LCAxMDAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMicpLmFkZENsYXNzKFwiaGlkZVwiKTtcbiAgICB9LCAxNTAwKTtcbiAgfSk7XG5cbiAgJChcIi5naXRodWItbGlua1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiAnaHR0cHM6Ly9naXRodWIuY29tL01ldGFtYXRyaXgvV2ViLURpc2FiaWxpdHktU2ltdWxhdG9yJyB9KTtcbiAgfSk7XG5cbiAgJCgnLnNldHRpbmdzLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnbGFuZycsIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICQoJyNsYW5ndWFnZScpLnZhbChvYmoubGFuZyk7XG4gICAgfSk7XG5cbiAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAkKCcjc2V0dGluZ3MnKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNzZXR0aW5ncycpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgfSwgMjUwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMScpLmFkZENsYXNzKFwiaGlkZVwiKTtcbiAgICB9LCA1MDApO1xuICB9KTtcblxuICAvLyBTZXR0aW5ncyB2aWV3XG5cbiAgJCgnI2J0bi1zYXZlLXNldHRpbmdzJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB2YXIgc2VsZWN0ZWRMYW5nID0gJCgnI2xhbmd1YWdlJykudmFsKCk7XG5cbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyAnbGFuZyc6IHNlbGVjdGVkTGFuZyB9KTtcblxuICAgIGxhbmcgPSBzZWxlY3RlZExhbmc7XG5cbiAgICBzZXRUZXh0cygpO1xuXG4gICAgJCgnI3NldHRpbmdzJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwxJykuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICB9LCA1MDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjc2V0dGluZ3MnKS5hZGRDbGFzcyhcImhpZGVcIik7XG4gICAgfSwgNzUwKTtcbiAgfSk7XG5cbiAgJCgnI2J0bi1jYW5jZWwtc2V0dGluZ3MnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICQoJyNzZXR0aW5ncycpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgJCgnI3BhbmVsMScpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMScpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgfSwgMjUwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3NldHRpbmdzJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgIH0sIDUwMCk7XG4gIH0pO1xuXG4gIC8vIFRvb2x0aXAgdmlld1xuICAkKFwiI3Jlc2V0LWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgcmVzZXRTaW11bGF0aW9uKHRvb2x0aXApO1xuICB9KTtcblxuICAkKFwiLm1vcmUtaW5mby1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2xpbmtVcmwnLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6ICcnICsgb2JqLmxpbmtVcmwgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vcGFuZWwgY29sbGFwc2UsIHNob3cgYXJyb3dzOiBcbiAgJCgnLmNvbGxhcHNlJykub24oJ3Nob3duLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xuICAgICQodW5kZWZpbmVkKS5wYXJlbnQoKS5maW5kKFwiLmRvd24tYXJyb3csIC51cC1hcnJvd1wiKS50b2dnbGUoKTtcbiAgfSkub24oJ2hpZGRlbi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKHVuZGVmaW5lZCkucGFyZW50KCkuZmluZChcIi5kb3duLWFycm93LCAudXAtYXJyb3dcIikudG9nZ2xlKCk7XG4gIH0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAuanMubWFwXG4iLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgXCJzdlwiOlxyXG4gIHtcclxuICAgIFwiZmFjdHNcIjoge1xyXG4gICAgICBcImR5c2xleGlhXCI6IFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiRHlzbGV4aVwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkR5c2xleGkgw6RyIGVuIG5lZHPDpHR0bmluZyBzb20gZ8O2ciBhdHQgaGrDpHJuYW4gaGFyIHN2w6VydCBhdHQgYXV0b21hdGlzZXJhIHRvbGtuaW5nZW4gYXYgb3JkLiBEZXR0YSBnw7ZyIGF0dCBwZXJzb25lciBtZWQgZGVubmEgbmVkc8OkdHRuaW5nIGthbiBoYSBzdsOlcnQgYXR0IGzDpHNhIG9jaCBza3JpdmEuIER5c2xleGkgw6RyIGludGUga29wcGxhdCB0aWxsIHN5biBlbGxlciBpbnRlbGxpZ2Vucy4gT3JzYWtlcm5hIHRpbGwgZHlzbGV4aSDDpHIgZm9ydGZhcmFuZGUgb2tsYXJ0LlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrIG9jaCBsw6VuZ2EgdGV4dGVyLiBTZSB0aWxsIGF0dCBoYSBvcmRlbnRsaWd0IG1lZCByYWRhdnN0w6VuZC5cIiwgXHRcclxuICAgICAgICAgIFwiVW5kdmlrIHN2w6VyYSBvcmQgb2NoIGZhY2t0ZXJtZXIuXCIsXHJcbiAgICAgICAgICBcIkVyYmp1ZCBsw6R0dGzDpHN0YSB2ZXJzaW9uZXIgYXYgZmFja3RleHRlci5cIixcclxuICAgICAgICAgIFwiVW5kdmlrIHR5cHNuaXR0IG1lZCBrcsOlbmdsaWdhIG9jaCBrb21wbGV4YSBmaWd1cmVyLlwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGFya2luc29uc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiUGFya2luc29uc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlZpZCBQYXJraW5zb25zIHNqdWtkb20gZsO2cnN0w7ZycyBjZWxsZXJuYSBpIGhqw6RybmFuIHNvbSB0aWxsdmVya2FyIGRvcGFtaW4gdmlsa2V0IGfDtnIgYXR0IGhqw6RybmFuIGbDpXIgZW4gbmVkc2F0dCBmw7ZybcOlZ2EgYXR0IHNraWNrYSBzaWduYWxlci4gUGVyc29uZXIgbWVkIFBhcmtpbnNvbnMga2FuIGRyYWJiYXMgYXYgc3ltcHRvbSBzb20gc2tha25pbmdhciwgc3RlbGEgbXVza2xlciBvY2ggc8OkbXJlIHLDtnJlbHNlZsO2cm3DpWdhLiBPcnNha2VybmEgdGlsbCBQYXJraW5zb25zIHNqdWtkb20gw6RyIGZvcnRmYXJhbmRlIG9rbGFydC5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIlNlIHRpbGwgYXR0IHdlYmJwbGF0c2VuIGthbiBhbnbDpG5kYXMgbWVkIGFuZHJhIGhqw6RscG1lZGVsIMOkbiBtdXMsIHRpbGwgZXhlbXBlbCB0YW5nZW50Ym9yZHNuYXZpZ2VyaW5nLlwiLCBcdFxyXG4gICAgICAgICAgXCJIYSB0aWxscsOkY2tsaWd0IG1lZCBsdWZ0IG1lbGxhbiBrb21wb25lbnRlclwiLFxyXG4gICAgICAgICAgXCJIYSB0aWxscsOkY2tsaWd0IHN0b3JhIGtsaWNreXRvci5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1VybFwiOiBcImh0dHA6Ly93d3cucGFya2luc29uZm9yYnVuZGV0LnNlXCIsXHJcbiAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIlBhcmtpbnNvbnNmw7ZyYnVuZGV0XCJcclxuICAgICAgfSxcclxuICAgICAgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgZGVmZWt0IGbDpHJnc2VlbmRlIGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6Ugdmlzc2EgZWxsZXIgYWxsYSBmw6RyZ2VyLiBFdHQgZnVsbHQgZnVuZ2VyYW5kZSDDtmdhIGhhciB0cmUgb2xpa2EgdGFwcGFyIHNvbSB0YXIgdXBwIGbDpHJnZXJuYSB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gTsOkciBlbiBlbGxlciBmbGVyYSBhdiB0YXBwYXJuYSBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEgbGVkZXIgZGV0IHRpbGwgZGVmZWt0IGbDpHJnc2VlbmRlLiBHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0IChUcml0YW5vcGkpIMOkciBzw6RsbHN5bnQuIE5hbW5ldCDDpHIgbWlzc2xlZGFuZGUgZMOlIGRldCBpbnRlIMOkciBmw6RyZ2VybmEgZ3VsIG9jaCBibMOlIHNvbSBmw7ZydsOkeGxhcywgdXRhbiBibMOlIG1lZCBncsO2biBvY2ggZ3VsIG1lZCBsaWxhLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBkZXQgZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCBlbiByw7ZkIHJhbSB1dGFuIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IG9jaCBnw6RybmEgZW4gaWtvbi5cIiwgXHRcclxuICAgICAgICAgIFwiRXJianVkIGfDpHJuYSBldHQgaMO2Z2tvbnRyYXN0LWzDpGdlLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cHM6Ly9zdi53aWtpcGVkaWEub3JnL3dpa2kvRGVmZWt0X2YlQzMlQTRyZ3NlZW5kZVwiLFxyXG4gICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJXaWtpcGVkaWEgb20gZGVmZWt0IGbDpHJnc2VlbmRlXCJcclxuICAgICAgfSxcclxuICAgICAgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXRcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgZGVmZWt0IGbDpHJnc2VlbmRlIGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6Ugdmlzc2EgZWxsZXIgYWxsYSBmw6RyZ2VyLiBFdHQgZnVsbHQgZnVuZ2VyYW5kZSDDtmdhIGhhciB0cmUgb2xpa2EgdGFwcGFyIHNvbSB0YXIgdXBwIGbDpHJnZXJuYSB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gTsOkciBlbiBlbGxlciBmbGVyYSBhdiB0YXBwYXJuYSBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEgbGVkZXIgZGV0IHRpbGwgZGVmZWt0IGbDpHJnc2VlbmRlLiBSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXQgKFByb3Rhbm9waSBvY2ggRGV1dGVyYW5vcGkpIMOkciBkZW4gdmFubGlnYXN0ZSB0eXBlbiBhdiBmw6RyZ2JsaW5kaGV0LiBEZW4gw6RyIHZhbmxpZ2FyZSBob3MgbcOkbiDDpG4ga3Zpbm5vci4gUGVyc29uZXIgcsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0IGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6UgZsOkcmdlcm5hIHLDtmQsIGdyw7ZuLCBicnVuIG9jaCBvcmFuZ2UuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogXHJcbiAgICAgICAgW1wiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBlbmRhIHPDpHR0ZXQgYXR0IGbDtnJtZWRsYSBpbmZvcm1hdGlvbiwgaW5kaWtlcmEgZW4gaGFuZGxpbmcgZWxsZXIgaWRlbnRpZmllcmEgZXR0IGVsZW1lbnQuIE1hcmtlcmEgdGlsbCBleGVtcGVsIGludGUgZXR0IGZlbGFrdGlndCBmb3JtdWzDpHJmw6RsdCBlbmRhc3QgbWVkIHLDtmQgcmFtLCBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBvY2ggZ8Okcm5hIGVuICBpa29uLlwiLCBcIkVyYmp1ZCBnw6RybmEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIl0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1VybFwiOiBcImh0dHBzOi8vc3Yud2lraXBlZGlhLm9yZy93aWtpL0RlZmVrdF9mJUMzJUE0cmdzZWVuZGVcIixcclxuICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2lraXBlZGlhIG9tIGRlZmVrdCBmw6RyZ3NlZW5kZVwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmFyc2lnaHRlZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkzDpW5nc3ludGhldFwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBIeXBlcm9waSBzZXIgc3VkZGlndCBww6UgbsOkcmEgaMOlbGwsIG1lbiBicmEgcMOlIGzDpW5ndCBow6VsbC4gTmVkc8OkdHRuaW5nZW4gdXBwc3TDpXIgcMOlIGdydW5kIGF2IGF0dCBsanVzZXQgaW50ZSBicnl0cyByw6R0dCBpIMO2Z2F0LiBEZXQgw6RyIGVuIGF2IGRlIHZhbmxpZ2FzdGUgc3lubmVkc8OkdHRuaW5nYXJuYS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIlVuZHZpayB0ZXh0IGkgbGl0ZW4gc3Rvcmxlay5cIiwgXHRcclxuICAgICAgICAgIFwiV2ViYnNpZGFuIHNrYSBnw6UgYXR0IGbDtnJzdG9yYSAoem9vbWFzKSB0aWxsIG1pbnN0IDIwMCAlIHPDpSBhdHQgYmVzw7ZrYXJlbiBrYW4gYW5wYXNzYSBpbm5laMOlbGxldHMgc3RvcmxlayBlZnRlciBzaW5hIGJlaG92LlwiLFxyXG4gICAgICAgICAgXCJFcmJqdWQgdXBwbMOkc25pbmcgYXYgaW5uZWjDpWxsZXQuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwczovL3dlYmJyaWt0bGluamVyLnNlL3IvMzktZ2Utd2ViYnBsYXRzZW4tZW4tZ29kLWxhc2JhcmhldC9cIixcclxuICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2ViYnJpa3RsaW5qZSBHZSB3ZWJicGxhdHNlbiBnb2QgbMOkc2JhcmhldFwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwidG90YWxDb2xvckJsaW5kbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiSGVsdCBmw6RyZ2JsaW5kXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiRGVmZWt0IGbDpHJnc2VlbmRlIGlubmViw6RyIGF0dCBlbiBwZXJzb24gaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0eXBlciBhdiB0YXBwYXIgc29tIHRhciB1cHAgb2xpa2EgZsOkcmdlcjogdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE9yc2FrZW4gdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUgw6RyIGF0dCBlbiBlbGxlciBmbGVyYSBhdiBkZXNzYSB0eXBlciBhdiB0YXBwYXIgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhLiBIZWx0IGbDpHJnYmxpbmQgKE1vbm9rcm9tYXNpL2Frcm9tYXRvcHNpKSDDpHIgbXlja2V0IHPDpGxsc3ludC4gUGVyc29uZXIgbWVkIGRlbm5hIHN5bm5lZHPDpHR0bmluZyBzZXIgaW5nYSBmw6RyZ2VyIHV0YW4gc2VyIGVuZGFzdCBpIGdyw6Vza2FsYS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZGV0IGVuZGEgc8OkdHRldCBhdHQgZsO2cm1lZGxhIGluZm9ybWF0aW9uLCBpbmRpa2VyYSBlbiBoYW5kbGluZyBlbGxlciBpZGVudGlmaWVyYSBlbGVtZW50LiBNYXJrZXJhIHQuZXguIGludGUgZXR0IGZlbGFrdGlndCBmb3JtdWzDpHJmw6RsdCBlbmRhc3QgbWVkIHLDtmQgcmFtLCBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBlbGxlciBpa29uLlwiLCBcdFxyXG4gICAgICAgICAgXCJEZXQga2FuIHZhcmEgZW4gYnJhIGlkw6kgYXR0IGVyYmp1ZGEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJ0dW5uZWxWaXNpb25cIjpcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlR1bm5lbHNlZW5kZVwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkRldCBzb20gaSBkYWdsaWd0IHRhbCBicnVrYXIga2FsbGFzIHR1bm5lbHNlZW5kZSDDpHIgZW4gc3lubmVkc8OkdHRuaW5nIHNvbSBnw7ZyIGF0dCBlbmRhc3QgZW4gZGVsIGF2IHN5bmbDpGx0ZXQga2FuIHNlcy4gRGV0dGEga2FuIGJlcm8gcMOlIGF0dCBwZXJzb25lbiBsaWRlciBhdiBlbiBzanVrZG9tIHNvbSBnw7ZyIGF0dCBjZWxsZXJuYSBpIMO2Z2F0IGbDtnJzdMO2cnMgbWVuIGRlbm5hIHR5cCBhdiBzeW5uZWRzw6R0dG5pbmcga2FuIG9ja3PDpSB0aWxsZsOkbGxpZ3QgdXBwc3TDpSBww6UgZ3J1bmQgYXYgc3RyZXNzIGVsbGVyIGRlcHJlc3Npb24uXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJVbmR2aWsgdGV4dCBpIGxpdGVuIHN0b3JsZWsuXCIsXHJcbiAgICAgICAgICBcIldlYmJzaWRhbiBza2EgZ8OlIGF0dCBmw7Zyc3RvcmEgKHpvb21hcykgdGlsbCBtaW5zdCAyMDAgJSBzw6UgYXR0IGJlc8O2a2FyZW4ga2FuIGFucGFzc2EgaW5uZWjDpWxsZXRzIHN0b3JsZWsgZWZ0ZXIgc2luYSBiZWhvdi5cIixcclxuICAgICAgICAgIFwiRXJianVkIHVwcGzDpHNuaW5nIGF2IGlubmVow6VsbGV0LlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImNvbmNlbnRyYXRpb25cIjpcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIktvbmNlbnRyYXRpb25cIixcclxuICAgICAgICBcImZhY3RcIjogXCJBbGxhIGthbiBoYSBzdsOlcnQgYXR0IGtvbmNlbnRyZXJhIHNpZyBtZW4gZsO2ciB2aXNzYSBrYW4gZGV0IGJsaSBldHQgc3RvcnQgcHJvYmxlbSBpIHZhcmRhZ3NsaXZldC4gRGVzc2EgZnVua3Rpb25zbmVkc8OkdHRuaW5nYXIga2FuIG9yc2FrYSBzdsOlcmlnaGV0ZXIgbWVkIGF0dCBoYW50ZXJhIGludHJ5Y2ssIHNvcnRlcmEgaW5mb3JtYXRpb24gb2NoIGxqdWRrw6Ruc2xpZ2hldC5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkdlIHdlYmJwbGF0c2VuIGVuIGVua2VsIG9jaCBsdWZ0aWcgZGVzaWduLlwiLFxyXG4gICAgICAgICAgXCJWYXIgZsO2cnNpa3RpZyBtZWQgYW5pbWF0aW9uZXIgb2NoIHN0YXJrYSBmw6RyZ2VyLlwiLFxyXG4gICAgICAgICAgXCJVbmR2aWsgYXR0IGhhIGbDtnIgbXlja2V0IGlubmVow6VsbCBww6Ugc2FtbWEgc2lkYS5cIixcclxuICAgICAgICAgIFwiRXJianVkIGxqdWQtIG9jaCB2aWRlby1hbGVybmF0aXYgdGlsbCB0ZXh0aW5uZWjDpWxsLlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiTGl0ZXQgb3JkZsO2cnLDpWRcIixcclxuICAgICAgICBcImZhY3RcIjogXCJFbiBzdG9yIGRlbCBhdiBqb3JkZW5zIGJlZm9sa25pbmcga2FuIGludGUgbMOkc2EgYWxscyBvY2ggbcOlbmdhIHZ1eG5hIGzDpHNlciBpbnRlIHPDpSBicmEgc29tIGbDtnJ2w6RudGFzIGVmdGVyIGdydW5kc2tvbGV1dGJpbGRuaW5nZW4uXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJVbmR2aWsga3LDpW5nbGlnYSBvcmQgb2NoIGZhY2t0ZXJtZXIuXCIsICAgXHJcbiAgICAgICAgICBcIkVyYmp1ZCBsw6R0dGzDpHN0IHZlcnNpb24gYXYga3LDpW5nbGlnYSB0ZXh0ZXIuXCIsXHJcbiAgICAgICAgICBcIkVyYmp1ZCB0ZXh0ZXIgcMOlIG9saWthIHNwcsOlay5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiVUlcIjoge1xyXG4gICAgICBcInNlbGVjdFNpbXVsYXRpb25cIjogXCJWw6RsaiBzaW11bGVyaW5nOlwiLFxyXG4gICAgICBcInJlc2V0XCI6IFwiw4V0ZXJzdMOkbGxcIixcclxuICAgICAgXCJhZHZpY2VcIjogXCJUw6RuayBww6UgZGV0dGFcIixcclxuICAgICAgXCJtb3JlSW5mb1wiOiBcIk1lciBpbmZvcm1hdGlvblwiLFxyXG4gICAgICBcInNpZ2h0XCI6IFwiU3luXCIsXHJcbiAgICAgIFwidG90YWxDb2xvckJsaW5kbmVzc1wiOiBcIkhlbHQgZsOkcmdibGluZFwiLFxyXG4gICAgICBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIiwgICAgXHJcbiAgICAgIFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOiBcIlLDtmQtZ3LDtm4gZsOkcmdibGluZGhldFwiLFxyXG4gICAgICBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiTMOlbmdzeW50aGV0LCDDtnZlcnN5bnRoZXRcIixcclxuICAgICAgXCJ0dW5uZWxWaXNpb25cIjogXCJUdW5uZWxzZWVuZGVcIixcclxuICAgICAgXCJtb2JpbGl0eVwiOiBcIk1vdG9yaWtcIixcclxuICAgICAgXCJwYXJraW5zb25zXCI6IFwiUGFya2luc29uc1wiLFxyXG4gICAgICBcInJlYWRBbmRXcml0ZVwiOiBcIkzDpHNhIG9jaCBza3JpdmFcIixcclxuICAgICAgXCJkeXNsZXhpYVwiOiBcIkR5c2xleGlcIixcclxuICAgICAgXCJzbWFsbFZvY2FidWxhcnlcIjogXCJMaXRldCBvcmRmw7ZycsOlZFwiLFxyXG4gICAgICBcImNvbmNlbnRyYXRpb25cIjogXCJLb25jZW50cmF0aW9uXCIsXHJcbiAgICAgIFwiY2hhbmdlU2V0dGluZ3NcIjogXCJDaGFuZ2Ugc2V0dGluZ3NcIixcclxuICAgICAgXCJzZWxlY3RMYW5ndWFnZVwiOiBcIlNlbGVjdCBsYW5ndWFnZVwiLFxyXG4gICAgICBcInNhdmVTZXR0aW5nc1wiOiBcIlNhdmUgc2V0dGluZ3NcIixcclxuICAgICAgXCJjYW5jZWxcIjogXCJDYW5jZWxcIixcclxuICAgICAgXCJzaW11bGF0aW9uc1wiOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiU3luXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgICB7IFwidG90YWxDb2xvckJsaW5kbmVzc1wiOiBcIkhlbHQgZsOkcmdibGluZFwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjogXCJHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0XCIgfSxcclxuICAgICAgICAgICAgeyBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXRcIiB9LFxyXG4gICAgICAgICAgICB7IFwiZmFyc2lnaHRlZG5lc3NcIjogXCJMw6VuZ3N5bnRoZXQsIMO2dmVyc3ludGhldFwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJ0dW5uZWxWaXNpb25cIjogXCJUdW5uZWxzZWVuZGVcIiB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJNb3RvcmlrXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogWyBcclxuICAgICAgICAgICAgeyBcInBhcmtpbnNvbnNcIjogXCJQYXJraW5zb25zXCIgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIkzDpHNhIG9jaCBza3JpdmFcIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXHJcbiAgICAgICAgICAgIHsgXCJkeXNsZXhpYVwiOiBcIkR5c2xleGlcIiB9LFxyXG4gICAgICAgICAgICB7IFwic21hbGxWb2NhYnVsYXJ5XCI6IFwiTGl0ZXQgb3JkZsO2cnLDpWRcIiB9LFxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiS29uY2VudHJhdGlvblwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJNaW5uZVwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgXCJlblwiOlxyXG4gIHtcclxuICAgIFwiZmFjdHNcIjoge1xyXG4gICAgICBcImR5c2xleGlhXCI6IFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiRHlzbGV4aWFcIixcclxuICAgICAgICBcImZhY3RcIjogXCJEeXNsZXhpYSBpcyBhIGRpc2FiaWxpdHkgdGhhdCBtYWtlcyBpdCBkaWZmaWN1bHQgZm9yIHRoZSBicmFpbiB0byBhdXRvbWF0ZSB0aGUgaW50ZXJwcmV0YXRpb24gb2Ygd29yZHMuIFRoaXMgbWFrZXMgaXQgaGFyZCBmb3IgcGVvcGxlIHdpdGggdGhpcyBkaXNhYmlsaXR5IHRvIHJlYWQgYW5kIHdyaXRlLiBEeXNsZXhpYSBpcyBoYXMgbm8gY29ubmVjdGlvbiB3aXRoIHZpc2lvbiBvciBpbnRlbGxpZ2VuY2UuIFRoZSBjYXVzZXMgb2YgZHlzbGV4aWEgYXJlIHN0aWxsIHVuY2xlYXIuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJBdm9pZCB0ZXh0IGluIHNtYWxsIGZvbnQgc2l6ZXMgYW5kIGxvbmcgdGV4dHMuIFVzZSBwcm9wZXIgc3BhY2luZyBhbmQgbGluZSBoZWlnaHQuXCIsXHJcbiAgICAgICAgICBcIkF2b2lkIGRpZmZpY3VsdCB3b3JkcyBhbmQgdGVybXMuXCIsXHJcbiAgICAgICAgICBcIk9mZmVyIGVhc3kgdG8gcmVhZCB0ZXh0cywgaW1hZ2VzLCB2aWRlbyBvciBhdWRpbyBhbHRlcm5hdGl2ZXMuXCIsXHJcbiAgICAgICAgICBcIkF2b2lkIGZvbnRzIHdpdGggY29tcGxpY2F0ZWQgYW5kIGNvbXBsZXggY2hhcmFjdGVycy5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXJraW5zb25zXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJQYXJraW5zb25zXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGFya2luc29uJ3MgZGlzZWFzZSBkZXN0cm95cyB0aGUgY2VsbHMgaW4gdGhlIGJyYWluIHRoYXQgcHJvZHVjZSBkb3BhbWluZSwgd2hpY2ggY2F1c2VzIHRoZSBicmFpbiB0byBoYXZlIGEgcmVkdWNlZCBhYmlsaXR5IHRvIHNlbmQgc2lnbmFscy4gUGVyc29ucyB3aXRoIFBhcmtpbnNvbidzIG1heSBzdWZmZXIgZnJvbSBzeW1wdG9tcyBzdWNoIGFzIHNoYWtpbmcsIHN0aWZmIG11c2NsZXMsIGFuZCByZWR1Y2VkIG1vYmlsaXR5LiBUaGUgY2F1c2VzIG9mIFBhcmtpbnNvbidzIGRpc2Vhc2UgYXJlIHN0aWxsIHVuY2xlYXIuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJNYWtlIHN1cmUgdGhlIHdlYnNpdGUgY2FuIGJlIHVzZWQgd2l0aCBvdGhlciB0b29scyBvdGhlciB0aGFuIGEgbW91c2UsIHN1Y2ggYXMga2V5Ym9hcmQgbmF2aWdhdGlvbi5cIixcclxuICAgICAgICAgIFwiSGF2ZSBlbm91Z2ggc3BhY2UgYmV0d2VlbiBjb21wb25lbnRzLlwiLFxyXG4gICAgICAgICAgXCJNYWtlIHN1cmUgY2xpY2sgYXJlYXMgYXJlIGJpZyBlbm91Z2guXCIsXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiWWVsbG93LWJsdWUgY29sb3IgYmxpbmRuZXNzXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVvcGxlIHdpdGggbG93ZXJlZCBjb2xvciB2aXNpb24gaGF2ZSBkaWZmaWN1bHR5IGRpc3Rpbmd1aXNoaW5nIHNvbWUgb3IgYWxsIGNvbG9ycy4gWWVsbG93LWJsdWUgY29sb3IgYmxpbmRuZXNzIChUcml0YW5vcGlhKSBpcyByYXJlLiBUaGUgbmFtZSBjYW4gYmUgbWlzbGVhZGluZy4gSXQncyBub3QgdGhlIGNvbG9ycyB5ZWxsb3cgYW5kIGJsdWUgdGhhdCBhcmUgY29uZnVzZWQgYnV0IGJsdWUgd2l0aCBncmVlbiBhbmQgeWVsbG93IHdpdGggcHVycGxlLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiRG8gbm90IHVzZSBjb2xvciBhcyB0aGUgb25seSB3YXkgdG8gY29udmV5IGluZm9ybWF0aW9uLCBpbmRpY2F0ZSBhbiBhY3Rpb24gb3IgaWRlbnRpZnkgYW4gZWxlbWVudC4gRm9yIGV4YW1wbGUsIGRvIG5vdCBtYXJrIGFuIGluY29ycmVjdCBmb3JtIGZpZWxkIHdpdGggYSByZWQgYm9yZGVyIG9ubHksIGFsc28gc3VwcGxlbWVudCB3aXRoIGEgdGV4dCBhbmQgcHJlZmVyYWJseSBhbiBpY29uLlwiLFxyXG7CoMKgwqDCoMKgwqDCoMKgwqDCoFwiQ29uc2lkZXIgb2ZmZXJpbmcgYSBoaWdoIGNvbnRyYXN0IG1vZGUuXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiUmVkLWdyZWVuIGNvbG9yIGJsaW5kbmVzc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBlb3BsZSB3aXRoIGxvd2VyZWQgY29sb3IgdmlzaW9uIGhhdmUgZGlmZmljdWx0eSBkaXN0aW5ndWlzaGluZyBzb21lIG9yIGFsbCBjb2xvcnMuIFJlZC1ncmVlbiBjb2xvciBibGluZG5lc3MgKFByb3Rhbm9waWEgYW5kIERldXRlcmFub3BpYSkgaXMgdGhlIG1vc3QgY29tbW9uIHR5cGUgb2YgY29sb3IgYmxpbmRuZXNzLiBJdCBpcyBtb3JlIGNvbW1vbiBhbW9uZyBtZW4gdGhhbiB3b21lbi4gUGVvcGxlIHdpdGggcmVkLWdyZWVuIGNvbG9yIGJsaW5kbmVzcyBoYXZlIGRpZmZpY3VsdHkgZGlzdGluZ3Vpc2hpbmcgdGhlIGNvbG9ycyByZWQsIGdyZWVuLCBicm93biBhbmQgb3JhbmdlLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiRG8gbm90IHVzZSBjb2xvciBhcyB0aGUgb25seSB3YXkgdG8gY29udmV5IGluZm9ybWF0aW9uLCBpbmRpY2F0ZSBhbiBhY3Rpb24gb3IgaWRlbnRpZnkgYW4gZWxlbWVudC4gRm9yIGV4YW1wbGUsIGRvIG5vdCBtYXJrIGFuIGluY29ycmVjdCBmb3JtIGZpZWxkIHdpdGggYSByZWQgYm9yZGVyIG9ubHksIGFsc28gc3VwcGxlbWVudCB3aXRoIGEgdGV4dCBhbmQgcHJlZmVyYWJseSBhbiBpY29uLlwiLFxyXG7CoMKgwqDCoMKgwqDCoMKgwqDCoFwiQ29uc2lkZXIgb2ZmZXJpbmcgYSBoaWdoIGNvbnRyYXN0IG1vZGUuXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmFyc2lnaHRlZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkZhci1zaWdodGVkbmVzc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkZhci1zaWdodGVkbmVzcyAoSHlwZXJvcGlhKSBpcyBvbmUgb2YgdGhlIG1vc3QgY29tbW9uIHZpc3VhbCBpbXBhaXJtZW50cy4gUGVvcGxlIHdpdGggSHlwZXJvcGlhIGhhdmUgZGlmZmljdWx0eSBmb2N1c2luZyBvbiBvYmplY3RzIGF0IGNsb3NlIHJhbmdlIHdoaWNoIG1ha2VzIHRoZW0gYXBwZWFyIGJsdXJyeS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkF2b2lkIHRleHQgaW4gc21hbGwgZm9udCBzaXplcyBhbmQgbG9uZyB0ZXh0cy4gVXNlIHByb3BlciBzcGFjaW5nIGFuZCBsaW5lIGhlaWdodC5cIiwgIFxyXG4gICAgICAgICAgXCJNYWtlIHN1cmUgdGhlIHdlYnNpdGUgY2FuIGJlIHpvb21lZCB0byBhdCBsZWFzdCAyMDAlLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciBhIHRleHQgdG8gc3BlZWNoIHJlYWRlci5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJUb3RhbCBjb2xvciBibGluZG5lc3NcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZW9wbGUgd2l0aCBsb3dlcmVkIGNvbG9yIHZpc2lvbiBoYXZlIGRpZmZpY3VsdHkgZGlzdGluZ3Vpc2hpbmcgc29tZSBvciBhbGwgY29sb3JzLiBUb3RhbCBjb2xvciBibGluZG5lc3MgKE1vbm9jaHJvbWF0aWMgLyBBY2hyb21hdG9wc3kpIGlzIHZlcnkgcmFyZS4gUGVvcGxlIHdpdGggdGhpcyB2aXN1YWwgaW1wYWlybWVudCBjYW4gbm90IHBlcmNpZXZlIGFueSBjb2xvcnMsIG9ubHkgZGlmZmVyZW50IHNoYWRlcyBvZiBncmF5LlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiRG8gbm90IHVzZSBjb2xvciBhcyB0aGUgb25seSB3YXkgdG8gY29udmV5IGluZm9ybWF0aW9uLCBpbmRpY2F0ZSBhbiBhY3Rpb24gb3IgaWRlbnRpZnkgYW4gZWxlbWVudC4gRm9yIGV4YW1wbGUsIGRvIG5vdCBtYXJrIGFuIGluY29ycmVjdCBmb3JtIGZpZWxkIHdpdGggYSByZWQgYm9yZGVyIG9ubHksIGFsc28gc3VwcGxlbWVudCB3aXRoIGEgdGV4dCBhbmQgcHJlZmVyYWJseSBhbiBpY29uLlwiLFxyXG7CoMKgwqDCoMKgwqDCoMKgwqDCoFwiQ29uc2lkZXIgb2ZmZXJpbmcgYSBoaWdoIGNvbnRyYXN0IG1vZGUuXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwidHVubmVsVmlzaW9uXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJUdW5uZWwgVmlzaW9uXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiV2hhdCBpcyBjb21tb25seSBjYWxsZWQgVHVubmVsIFZpc2lvbiBpcyBsb3NzIG9mIHBlcmlwaGVyYWwgdmlzaW9uLiBUaGlzIG1heSBiZSBiZWNhdXNlIHRoZSBwZXJzb24gc3VmZmVycyBmcm9tIGEgZGlzZWFzZSB0aGF0IGFmZmVjdHMgdGhleSBjZWxscyBpbiB0aGUgZXllLCBidXQgbWF5IGFsc28gb2NjdXIgdGVtcG9yYXJpbHkgZHVlIHRvIHN0cmVzcyBvciBkZXByZXNzaW9uLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiQXZvaWQgdGV4dCBpbiBzbWFsbCBmb250IHNpemVzIGFuZCBsb25nIHRleHRzLiBVc2UgcHJvcGVyIHNwYWNpbmcgYW5kIGxpbmUgaGVpZ2h0LlwiLFxyXG4gICAgICAgICAgXCJNYWtlIHN1cmUgdGhlIHdlYnNpdGUgY2FuIGJlIHpvb21lZCB0byBhdCBsZWFzdCAyMDAlLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciBhIHRleHQgdG8gc3BlZWNoIHJlYWRlci5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJjb25jZW50cmF0aW9uXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJDb25jZW50cmF0aW9uXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiRXZlcnlvbmUgY2FuIGhhdmUgYSBoYXJkIHRpbWUgY29uY2VudHJhdGluZywgYnV0IGZvciBzb21lIGl0IGNhbiBiZSBhIGJpZyBwcm9ibGVtIGluIGV2ZXJ5ZGF5IGxpZmUuIERpc2FiaWxpdGllcyBsaWtlIEFESEQgYW5kIEF1dGlzbSBjYW4gY2F1c2UgZGlmZmljdWx0eSBpbiBoYW5kbGluZyBpbXByZXNzaW9ucywgc29ydGluZyBpbmZvcm1hdGlvbiBhbmQgc2Vuc2l0aXZpdHkgdG8gc291bmQuXCIsICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkdpdmUgdGhlIHdlYnNpdGUgYSBzaW1wbGUgYW5kIGNsZWFuIGRlc2lnbi5cIixcclxuICAgICAgICAgIFwiQmUgY2FyZWZ1bCB3aXRoIGFuaW1hdGlvbnMgYW5kIHN0cm9uZyBjb2xvcnMuXCIsXHJcbiAgICAgICAgICBcIkF2b2lkIGhhdmluZyB0b28gbXVjaCBjb250ZW50IG9uIHRoZSBzYW1lIHBhZ2UuXCIsXHJcbiAgICAgICAgICBcIk9mZmVyIGltYWdlLCBhdWRpbyBhbmQgdmlkZW8gYWxlcm5hdGl2ZXMgdG8gdGV4dCBjb250ZW50LlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiU21hbGwgdm9jYWJ1bGFyeVwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkEgbGFyZ2UgcGFydCBvZiB0aGUgd29ybGQncyBwb3B1bGF0aW9uIGNhbid0IHJlYWQgYXQgYWxsIGFuZCBtYW55IGFkdWx0cyBkb24ndCByZWFkIGFzIHdlbGwgYXMgZXhwZWN0ZWQgYWZ0ZXIgZmluaXNoaW5nIGdyYWRlIHNjaG9vbC5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkF2b2lkIGRpZmZpY3VsdCB3b3JkcyBhbmQgdGVybXMuXCIsXHJcbiAgICAgICAgICBcIk9mZmVyIGVhc3kgdG8gcmVhZCB0ZXh0cywgaW1hZ2VzLCB2aWRlbyBvciBhdWRpbyBhbHRlcm5hdGl2ZXMuXCIsXHJcbiAgICAgICAgICBcIk9mZmVyIHRleHRzIGluIGRpZmZlcmVudCBsYW5ndWFnZXMuXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlVJXCI6IHtcclxuICAgICAgXCJzZWxlY3RTaW11bGF0aW9uXCI6IFwiU2VsZWN0IHNpbXVsYXRpb246XCIsXHJcbiAgICAgIFwicmVzZXRcIjogXCJSZXNldFwiLFxyXG4gICAgICBcImFkdmljZVwiOiBcIlRoaW5rIGFib3V0IHRoaXNcIixcclxuICAgICAgXCJtb3JlSW5mb1wiOiBcIk1vcmUgaW5mb3JtYXRpb25cIixcclxuICAgICAgXCJzaWdodFwiOiBcIlNpZ2h0XCIsXHJcbiAgICAgIFwidG90YWxDb2xvckJsaW5kbmVzc1wiOiBcIlRvdGFsIGNvbG9yIGJsaW5kbmVzc1wiLFxyXG4gICAgICBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIlllbGxvdy1CbHVlIGNvbG9yIGJsaW5kbmVzc1wiLCAgICBcclxuICAgICAgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6IFwiUmVkLUdyZWVuIGNvbG9yIGJsaW5kbmVzc1wiLFxyXG4gICAgICBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiRmFyLXNpZ2h0ZWRuZXNzXCIsXHJcbiAgICAgIFwidHVubmVsVmlzaW9uXCI6IFwiVHVubmVsIHZpc2lvblwiLFxyXG4gICAgICBcIm1vYmlsaXR5XCI6IFwiTW9iaWxpdHlcIixcclxuICAgICAgXCJwYXJraW5zb25zXCI6IFwiUGFya2luc29uc1wiLFxyXG4gICAgICBcInJlYWRBbmRXcml0ZVwiOiBcIlJlYWQgYW5kIHdyaXRlXCIsXHJcbiAgICAgIFwiZHlzbGV4aWFcIjogXCJEeXNsZXhpYVwiLFxyXG4gICAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOiBcIlNtYWxsIHZvY2FidWxhcnlcIixcclxuICAgICAgXCJjb25jZW50cmF0aW9uXCI6IFwiQ29uY2VudHJhdGlvblwiLFxyXG4gICAgICBcImNoYW5nZVNldHRpbmdzXCI6IFwiQ2hhbmdlIHNldHRpbmdzXCIsXHJcbiAgICAgIFwic2VsZWN0TGFuZ3VhZ2VcIjogXCJTZWxlY3QgbGFuZ3VhZ2VcIixcclxuICAgICAgXCJzYXZlU2V0dGluZ3NcIjogXCJTYXZlIHNldHRpbmdzXCIsXHJcbiAgICAgIFwiY2FuY2VsXCI6IFwiQ2FuY2VsXCIsXHJcbiAgICAgIFwic2ltdWxhdGlvbnNcIjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIlNpZ2h0XCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgICB7IFwidG90YWxDb2xvckJsaW5kbmVzc1wiOiBcIlRvdGFsIGNvbG9yIGJsaW5kbmVzc1wiIH0sXHJcbiAgICAgICAgICAgIHsgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjogXCJZZWxsb3ctQmx1ZSBjb2xvciBibGluZG5lc3NcIiB9LFxyXG4gICAgICAgICAgICB7IFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOiBcIlJlZC1HcmVlbiBjb2xvciBibGluZG5lc3NcIiB9LFxyXG4gICAgICAgICAgICB7IFwiZmFyc2lnaHRlZG5lc3NcIjogXCJGYXItc2lnaHRlZG5lc3NcIiB9LFxyXG4gICAgICAgICAgICB7IFwidHVubmVsVmlzaW9uXCI6IFwiVHVubmVsIHZpc2lvblwiIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIk1vYmlsaXR5XCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogWyBcclxuICAgICAgICAgICAgeyBcInBhcmtpbnNvbnNcIjogXCJQYXJraW5zb25zXCIgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIlJlYWQgYW5kIHdyaXRlXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgICB7IFwiZHlzbGV4aWFcIjogXCJEeXNsZXhpYVwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJzbWFsbFZvY2FidWxhcnlcIjogXCJTbWFsbCB2b2NhYnVsYXJ5XCIgfSxcclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIkNvbmNlbnRyYXRpb25cIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiTWVtb3J5XCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW11cclxuICAgICAgICB9XHJcblxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIGxvYWRlZFNpbXVsYXRpb25zID0gW107XG5cbmZ1bmN0aW9uIGxvYWQobmFtZSwgc3ViTmFtZSwgY2FsbGJhY2spIHtcbiAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXSxcbiAgICAgICAgc2NyaXB0RmlsZSA9IHN1Yk5hbWUgPyAnc2ltdWxhdGlvbnMvJyArIG5hbWUgKyAnLycgKyBzdWJOYW1lICsgJy9jb250ZW50LmpzJyA6ICdzaW11bGF0aW9ucy8nICsgbmFtZSArICcvY29udGVudC5qcyc7XG5cbiAgICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KGFjdGl2ZVRhYi5pZCwgeyBmaWxlOiBzY3JpcHRGaWxlIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxvYWRlZFNpbXVsYXRpb25zLnB1c2gobmFtZSk7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sobmFtZSwgc3ViTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdGFydChuYW1lLCBzdWJOYW1lKSB7XG4gIGlmIChsb2FkZWRTaW11bGF0aW9ucy5pbmNsdWRlcyhuYW1lKSkge1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0YXJ0U2ltdWxhdGlvbicsIHNpbXVsYXRpb246IG5hbWUsIHN1YlNpbXVsYXRpb246IHN1Yk5hbWUgfSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgbG9hZChuYW1lLCBzdWJOYW1lLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RhcnRTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSwgc3ViU2ltdWxhdGlvbjogc3ViTmFtZSB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0b3AobmFtZSwgc3ViTmFtZSkge1xuICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0b3BTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSwgc3ViU2ltdWxhdGlvbjogc3ViTmFtZSB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydHMuc3RhcnQgPSBzdGFydDtcbmV4cG9ydHMuc3RvcCA9IHN0b3A7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaW11bGF0aW9uTG9hZGVyLmpzLm1hcFxuIl19
