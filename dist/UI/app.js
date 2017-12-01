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

    lang = obj.lang || 'en';

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxVSVxcYXBwLmpzIiwiYnVpbGQvanMvYmFiZWwvVUkvZGF0YS9kYXRhLmpzb24iLCJidWlsZFxcanNcXGJhYmVsXFx1dGlsc1xcc2ltdWxhdGlvbkxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLElBQUksUUFBUSxRQUFRLGtCQUFSLENBQVo7O0FBRUEsSUFBSSxlQUFlLHdCQUF3QixLQUF4QixDQUFuQjs7QUFFQSxJQUFJLG9CQUFvQixRQUFRLDhCQUFSLENBQXhCOztBQUVBLElBQUksbUJBQW1CLHdCQUF3QixpQkFBeEIsQ0FBdkI7O0FBRUEsU0FBUyx1QkFBVCxDQUFpQyxHQUFqQyxFQUFzQztBQUFFLE1BQUksT0FBTyxJQUFJLFVBQWYsRUFBMkI7QUFBRSxXQUFPLEdBQVA7QUFBYSxHQUExQyxNQUFnRDtBQUFFLFFBQUksU0FBUyxFQUFiLENBQWlCLElBQUksT0FBTyxJQUFYLEVBQWlCO0FBQUUsV0FBSyxJQUFJLEdBQVQsSUFBZ0IsR0FBaEIsRUFBcUI7QUFBRSxZQUFJLE9BQU8sU0FBUCxDQUFpQixjQUFqQixDQUFnQyxJQUFoQyxDQUFxQyxHQUFyQyxFQUEwQyxHQUExQyxDQUFKLEVBQW9ELE9BQU8sR0FBUCxJQUFjLElBQUksR0FBSixDQUFkO0FBQXlCO0FBQUUsS0FBQyxPQUFPLE9BQVAsR0FBaUIsR0FBakIsQ0FBc0IsT0FBTyxNQUFQO0FBQWdCO0FBQUU7O0FBRTdRLElBQUksT0FBTyxJQUFYOztBQUVBLFNBQVMsZUFBVCxHQUEyQjs7QUFFekIsU0FBTyxPQUFQLENBQWUsS0FBZixDQUFxQixHQUFyQixDQUF5QixrQkFBekIsRUFBNkMsVUFBVSxHQUFWLEVBQWU7QUFDMUQscUJBQWlCLEtBQWpCLENBQXVCLElBQUksZ0JBQTNCO0FBQ0QsR0FGRDtBQUdEOztBQUVELFNBQVMsZUFBVCxDQUF5QixP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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwVEE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxJQUFJLG9CQUFvQixFQUF4Qjs7QUFFQSxTQUFTLElBQVQsQ0FBYyxJQUFkLEVBQW9CLE9BQXBCLEVBQTZCLFFBQTdCLEVBQXVDO0FBQ3JDLFNBQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsRUFBRSxRQUFRLElBQVYsRUFBZ0IsZUFBZSxJQUEvQixFQUFsQixFQUF5RCxVQUFVLElBQVYsRUFBZ0I7QUFDdkUsUUFBSSxZQUFZLEtBQUssQ0FBTCxDQUFoQjtBQUFBLFFBQ0ksYUFBYSxVQUFVLGlCQUFpQixJQUFqQixHQUF3QixHQUF4QixHQUE4QixPQUE5QixHQUF3QyxhQUFsRCxHQUFrRSxpQkFBaUIsSUFBakIsR0FBd0IsYUFEM0c7O0FBR0EsV0FBTyxJQUFQLENBQVksYUFBWixDQUEwQixVQUFVLEVBQXBDLEVBQXdDLEVBQUUsTUFBTSxVQUFSLEVBQXhDLEVBQThELFlBQVk7QUFDeEUsd0JBQWtCLElBQWxCLENBQXVCLElBQXZCO0FBQ0EsVUFBSSxRQUFKLEVBQWM7QUFDWixpQkFBUyxJQUFULEVBQWUsT0FBZjtBQUNEO0FBQ0YsS0FMRDtBQU1ELEdBVkQ7QUFXRDs7QUFFRCxTQUFTLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLE9BQXJCLEVBQThCO0FBQzVCLE1BQUksa0JBQWtCLFFBQWxCLENBQTJCLElBQTNCLENBQUosRUFBc0M7QUFDcEMsV0FBTyxJQUFQLENBQVksS0FBWixDQUFrQixFQUFFLFFBQVEsSUFBVixFQUFnQixlQUFlLElBQS9CLEVBQWxCLEVBQXlELFVBQVUsSUFBVixFQUFnQjtBQUN2RSxVQUFJLFlBQVksS0FBSyxDQUFMLENBQWhCOztBQUVBLGFBQU8sSUFBUCxDQUFZLFdBQVosQ0FBd0IsVUFBVSxFQUFsQyxFQUFzQyxFQUFFLFFBQVEsaUJBQVYsRUFBNkIsWUFBWSxJQUF6QyxFQUErQyxlQUFlLE9BQTlELEVBQXRDO0FBQ0QsS0FKRDtBQUtELEdBTkQsTUFNTztBQUNMLFNBQUssSUFBTCxFQUFXLE9BQVgsRUFBb0IsWUFBWTtBQUM5QixhQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEVBQUUsUUFBUSxJQUFWLEVBQWdCLGVBQWUsSUFBL0IsRUFBbEIsRUFBeUQsVUFBVSxJQUFWLEVBQWdCO0FBQ3ZFLFlBQUksWUFBWSxLQUFLLENBQUwsQ0FBaEI7O0FBRUEsZUFBTyxJQUFQLENBQVksV0FBWixDQUF3QixVQUFVLEVBQWxDLEVBQXNDLEVBQUUsUUFBUSxpQkFBVixFQUE2QixZQUFZLElBQXpDLEVBQStDLGVBQWUsT0FBOUQsRUFBdEM7QUFDRCxPQUpEO0FBS0QsS0FORDtBQU9EO0FBQ0Y7O0FBRUQsU0FBUyxJQUFULENBQWMsSUFBZCxFQUFvQixPQUFwQixFQUE2QjtBQUMzQixTQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEVBQUUsUUFBUSxJQUFWLEVBQWdCLGVBQWUsSUFBL0IsRUFBbEIsRUFBeUQsVUFBVSxJQUFWLEVBQWdCO0FBQ3ZFLFFBQUksWUFBWSxLQUFLLENBQUwsQ0FBaEI7O0FBRUEsV0FBTyxJQUFQLENBQVksV0FBWixDQUF3QixVQUFVLEVBQWxDLEVBQXNDLEVBQUUsUUFBUSxnQkFBVixFQUE0QixZQUFZLElBQXhDLEVBQThDLGVBQWUsT0FBN0QsRUFBdEM7QUFDRCxHQUpEO0FBS0Q7O0FBRUQsUUFBUSxLQUFSLEdBQWdCLEtBQWhCO0FBQ0EsUUFBUSxJQUFSLEdBQWUsSUFBZjtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9kYXRhID0gcmVxdWlyZSgnLi9kYXRhL2RhdGEuanNvbicpO1xuXG52YXIgbGFuZ3VhZ2VEYXRhID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2RhdGEpO1xuXG52YXIgX3NpbXVsYXRpb25Mb2FkZXIgPSByZXF1aXJlKCcuLi91dGlscy9zaW11bGF0aW9uTG9hZGVyLmpzJyk7XG5cbnZhciBzaW11bGF0aW9uTG9hZGVyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3NpbXVsYXRpb25Mb2FkZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG52YXIgbGFuZyA9IFwiZW5cIjtcblxuZnVuY3Rpb24gc3RhcnRTaW11bGF0aW9uKCkge1xuXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlU2ltdWxhdGlvbicsIGZ1bmN0aW9uIChvYmopIHtcbiAgICBzaW11bGF0aW9uTG9hZGVyLnN0YXJ0KG9iai5hY3RpdmVTaW11bGF0aW9uKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0U2ltdWxhdGlvbih0b29sdGlwKSB7XG5cbiAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7XG4gICAgcGF0aDogXCJpbWcvaWNvbi5wbmdcIlxuICB9KTtcblxuICB0b29sdGlwLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICQoXCIjcGFuZWwxXCIpLmFkZENsYXNzKFwiaW5cIik7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgdG9vbHRpcC5hZGRDbGFzcyhcImhpZGVcIik7XG4gIH0sIDI1MCk7XG5cbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuICAgIHNpbXVsYXRpb25Mb2FkZXIuc3RvcChvYmouYWN0aXZlU2ltdWxhdGlvbik7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKCdhY3RpdmVTaW11bGF0aW9uJyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRUZXh0cygpIHtcblxuICB2YXIgZGF0YSA9IGxhbmd1YWdlRGF0YVtsYW5nXTtcblxuICAkKFwiLm1vcmUtaW5mby1saW5rXCIpLnRleHQoZGF0YS5VSS5tb3JlSW5mbyk7XG4gICQoXCIjcmVzZXQtYnRuXCIpLnRleHQoZGF0YS5VSS5yZXNldCk7XG4gICQoXCIubmF2YmFyLWhlYWRlclwiKS50ZXh0KGRhdGEuVUkuc2VsZWN0U2ltdWxhdGlvbik7XG4gICQoXCIjYWR2aWNlLWRyb3Bkb3duXCIpLnRleHQoZGF0YS5VSS5hZHZpY2UpO1xuICAkKFwiI2luZm8tZHJvcGRvd25cIikudGV4dChkYXRhLlVJLm1vcmVJbmZvKTtcbiAgJChcIiNzaWdodFwiKS50ZXh0KGRhdGEuVUkuc2lnaHQpO1xuICAkKFwiI21vYmlsaXR5XCIpLnRleHQoZGF0YS5VSS5tb2JpbGl0eSk7XG4gICQoXCIjcmVhZFdyaXRlXCIpLnRleHQoZGF0YS5VSS5yZWFkQW5kV3JpdGUpO1xuICAkKFwiI2NvbmNlbnRyYXRpb25cIikudGV4dChkYXRhLlVJLmNvbmNlbnRyYXRpb24pO1xuXG4gICQuZWFjaChkYXRhLlVJLnNpbXVsYXRpb25zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcblxuICAgICQoJyMnICsgdmFsdWUuaGVhZGluZykudGV4dCh2YWx1ZS5oZWFkaW5nKTtcblxuICAgICQuZWFjaCh2YWx1ZS5jaG9pY2VzLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgICAgICAkKCcjJyArIGtleSkudGV4dCh2YWx1ZVtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgJCgnI3NldHRpbmdzLWhlYWRpbmcnKS50ZXh0KGRhdGEuVUkuY2hhbmdlU2V0dGluZ3MpO1xuICAkKCcjbGFuZ3VhZ2UtbGFiZWwnKS50ZXh0KGRhdGEuVUkuc2VsZWN0TGFuZ3VhZ2UpO1xuICAkKCcjYnRuLXNhdmUtc2V0dGluZ3MnKS50ZXh0KGRhdGEuVUkuc2F2ZVNldHRpbmdzKTtcbiAgJCgnI2J0bi1jYW5jZWwtc2V0dGluZ3MnKS50ZXh0KGRhdGEuVUkuY2FuY2VsKTtcbn1cblxuZnVuY3Rpb24gc2V0VG9vbHRpcFRleHRzKGFjdGl2ZVNpbXVsYXRpb24pIHtcblxuICB2YXIgZGF0YSA9IGxhbmd1YWdlRGF0YVtsYW5nXTtcblxuICB2YXIgaW5mb0hlYWRpbmcgPSAkKFwiLmRpc2FiaWxpdHktaW5mby1oZWFkaW5nXCIpO1xuICB2YXIgaW5mb1BhcmFncmFwaCA9ICQoXCIuZGlzYWJpbGl0eS1pbmZvLXBhcmFncmFwaFwiKTtcbiAgdmFyIGFkdmljZUxpc3QgPSAkKFwiLmFkdmljZS1saXN0XCIpO1xuICB2YXIgbW9yZUluZm9MaXN0ID0gJChcIi5tb3JlLWluZm8tbGlzdFwiKTtcbiAgdmFyIG1vcmVJbmZvUGFuZWwgPSAkKFwiLm1vcmUtaW5mby1wYW5lbFwiKTtcbiAgdmFyIHRleHRzID0gZGF0YS5mYWN0c1thY3RpdmVTaW11bGF0aW9uXTtcblxuICBpbmZvSGVhZGluZy5lbXB0eSgpO1xuICBpbmZvUGFyYWdyYXBoLmVtcHR5KCk7XG4gIGFkdmljZUxpc3QuZW1wdHkoKTtcblxuICBpbmZvSGVhZGluZy50ZXh0KHRleHRzLmhlYWRpbmcpO1xuICBpbmZvUGFyYWdyYXBoLnRleHQodGV4dHMuZmFjdCk7XG5cbiAgJC5lYWNoKHRleHRzLmxpc3RJdGVtcywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG4gICAgYWR2aWNlTGlzdC5hcHBlbmQoJzxsaT4nICsgdmFsdWUgKyAnPC9saT4nKTtcbiAgfSk7XG5cbiAgLy8gVE9ETzogTW9yZSBpbmZvIGxpbmtzXG59XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICB2YXIgdG9vbHRpcCA9ICQoXCIudG9vbC10aXBcIik7XG5cbiAgdmFyIGFjdGl2ZVNpbXVsYXRpb24gPSB2b2lkIDA7XG5cbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdsYW5nJywgZnVuY3Rpb24gKG9iaikge1xuXG4gICAgbGFuZyA9IG9iai5sYW5nIHx8ICdlbic7XG5cbiAgICBzZXRUZXh0cygpO1xuICB9KTtcblxuICAvLyBTZXQgYWN0aXZlIHN0YXRlXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlU2ltdWxhdGlvbicsIGZ1bmN0aW9uIChvYmopIHtcblxuICAgIGFjdGl2ZVNpbXVsYXRpb24gPSBvYmouYWN0aXZlU2ltdWxhdGlvbjtcblxuICAgIGlmIChhY3RpdmVTaW11bGF0aW9uKSB7XG4gICAgICB0b29sdGlwLmFkZENsYXNzKFwiaW5cIikucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuICAgICAgJCgnI3BhbmVsMScpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgICBzZXRUb29sdGlwVGV4dHMoYWN0aXZlU2ltdWxhdGlvbik7XG4gICAgfVxuICB9KTtcblxuICAvLyBNYWluIHZpZXdcbiAgJChcIi5tZW51LWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgbWVudUJ0biA9ICQodGhpcyk7XG4gICAgdmFyIG1lbnVCdG5JZCA9IG1lbnVCdG5bMF0uaWQ7XG5cbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtcbiAgICAgIHBhdGg6IFwiaW1nL2ljb25fYWN0aXZlLnBuZ1wiXG4gICAgfSk7XG5cbiAgICBhY3RpdmVTaW11bGF0aW9uID0gbWVudUJ0bklkO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7ICdhY3RpdmVTaW11bGF0aW9uJzogbWVudUJ0bklkIH0pO1xuXG4gICAgc2V0VG9vbHRpcFRleHRzKGFjdGl2ZVNpbXVsYXRpb24pO1xuXG4gICAgJCgnI3BhbmVsMScpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgJCgnI3BhbmVsMicpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcbiAgICB0b29sdGlwLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMicpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgfSwgMTAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgc3RhcnRTaW11bGF0aW9uKCk7XG4gICAgfSwgNTAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMicpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgICB0b29sdGlwLmFkZENsYXNzKFwiaW5cIik7XG4gICAgfSwgMTAwMCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNwYW5lbDInKS5hZGRDbGFzcyhcImhpZGVcIik7XG4gICAgfSwgMTUwMCk7XG4gIH0pO1xuXG4gICQoXCIuZ2l0aHViLWxpbmtcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9NZXRhbWF0cml4L1dlYi1EaXNhYmlsaXR5LVNpbXVsYXRvcicgfSk7XG4gIH0pO1xuXG4gICQoJy5zZXR0aW5ncy1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2xhbmcnLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAkKCcjbGFuZ3VhZ2UnKS52YWwob2JqLmxhbmcpO1xuICAgIH0pO1xuXG4gICAgJCgnI3BhbmVsMScpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgJCgnI3NldHRpbmdzJykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjc2V0dGluZ3MnKS5hZGRDbGFzcyhcImluXCIpO1xuICAgIH0sIDI1MCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNwYW5lbDEnKS5hZGRDbGFzcyhcImhpZGVcIik7XG4gICAgfSwgNTAwKTtcbiAgfSk7XG5cbiAgLy8gU2V0dGluZ3Mgdmlld1xuXG4gICQoJyNidG4tc2F2ZS1zZXR0aW5ncycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdmFyIHNlbGVjdGVkTGFuZyA9ICQoJyNsYW5ndWFnZScpLnZhbCgpO1xuXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgJ2xhbmcnOiBzZWxlY3RlZExhbmcgfSk7XG5cbiAgICBsYW5nID0gc2VsZWN0ZWRMYW5nO1xuXG4gICAgc2V0VGV4dHMoKTtcblxuICAgICQoJyNzZXR0aW5ncycpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgJCgnI3BhbmVsMScpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMScpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgfSwgNTAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3NldHRpbmdzJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgIH0sIDc1MCk7XG4gIH0pO1xuXG4gICQoJyNidG4tY2FuY2VsLXNldHRpbmdzJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAkKCcjc2V0dGluZ3MnKS5yZW1vdmVDbGFzcyhcImluXCIpO1xuICAgICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNwYW5lbDEnKS5hZGRDbGFzcyhcImluXCIpO1xuICAgIH0sIDI1MCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNzZXR0aW5ncycpLmFkZENsYXNzKFwiaGlkZVwiKTtcbiAgICB9LCA1MDApO1xuICB9KTtcblxuICAvLyBUb29sdGlwIHZpZXdcbiAgJChcIiNyZXNldC1idG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIHJlc2V0U2ltdWxhdGlvbih0b29sdGlwKTtcbiAgfSk7XG5cbiAgJChcIi5tb3JlLWluZm8tbGlua1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdsaW5rVXJsJywgZnVuY3Rpb24gKG9iaikge1xuICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiAnJyArIG9iai5saW5rVXJsIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICAvL3BhbmVsIGNvbGxhcHNlLCBzaG93IGFycm93czogXG4gICQoJy5jb2xsYXBzZScpLm9uKCdzaG93bi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKHVuZGVmaW5lZCkucGFyZW50KCkuZmluZChcIi5kb3duLWFycm93LCAudXAtYXJyb3dcIikudG9nZ2xlKCk7XG4gIH0pLm9uKCdoaWRkZW4uYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh1bmRlZmluZWQpLnBhcmVudCgpLmZpbmQoXCIuZG93bi1hcnJvdywgLnVwLWFycm93XCIpLnRvZ2dsZSgpO1xuICB9KTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gIFwic3ZcIjpcclxuICB7XHJcbiAgICBcImZhY3RzXCI6IHtcclxuICAgICAgXCJkeXNsZXhpYVwiOiBcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkR5c2xleGlcIixcclxuICAgICAgICBcImZhY3RcIjogXCJEeXNsZXhpIMOkciBlbiBuZWRzw6R0dG5pbmcgc29tIGfDtnIgYXR0IGhqw6RybmFuIGhhciBzdsOlcnQgYXR0IGF1dG9tYXRpc2VyYSB0b2xrbmluZ2VuIGF2IG9yZC4gRGV0dGEgZ8O2ciBhdHQgcGVyc29uZXIgbWVkIGRlbm5hIG5lZHPDpHR0bmluZyBrYW4gaGEgc3bDpXJ0IGF0dCBsw6RzYSBvY2ggc2tyaXZhLiBEeXNsZXhpIMOkciBpbnRlIGtvcHBsYXQgdGlsbCBzeW4gZWxsZXIgaW50ZWxsaWdlbnMuIE9yc2FrZXJuYSB0aWxsIGR5c2xleGkgw6RyIGZvcnRmYXJhbmRlIG9rbGFydC5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIlVuZHZpayB0ZXh0IGkgbGl0ZW4gc3RvcmxlayBvY2ggbMOlbmdhIHRleHRlci4gU2UgdGlsbCBhdHQgaGEgb3JkZW50bGlndCBtZWQgcmFkYXZzdMOlbmQuXCIsIFx0XHJcbiAgICAgICAgICBcIlVuZHZpayBzdsOlcmEgb3JkIG9jaCBmYWNrdGVybWVyLlwiLFxyXG4gICAgICAgICAgXCJFcmJqdWQgbMOkdHRsw6RzdGEgdmVyc2lvbmVyIGF2IGZhY2t0ZXh0ZXIuXCIsXHJcbiAgICAgICAgICBcIlVuZHZpayB0eXBzbml0dCBtZWQga3LDpW5nbGlnYSBvY2gga29tcGxleGEgZmlndXJlci5cIlxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhcmtpbnNvbnNcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlBhcmtpbnNvbnNcIixcclxuICAgICAgICBcImZhY3RcIjogXCJWaWQgUGFya2luc29ucyBzanVrZG9tIGbDtnJzdMO2cnMgY2VsbGVybmEgaSBoasOkcm5hbiBzb20gdGlsbHZlcmthciBkb3BhbWluIHZpbGtldCBnw7ZyIGF0dCBoasOkcm5hbiBmw6VyIGVuIG5lZHNhdHQgZsO2cm3DpWdhIGF0dCBza2lja2Egc2lnbmFsZXIuIFBlcnNvbmVyIG1lZCBQYXJraW5zb25zIGthbiBkcmFiYmFzIGF2IHN5bXB0b20gc29tIHNrYWtuaW5nYXIsIHN0ZWxhIG11c2tsZXIgb2NoIHPDpG1yZSByw7ZyZWxzZWbDtnJtw6VnYS4gT3JzYWtlcm5hIHRpbGwgUGFya2luc29ucyBzanVrZG9tIMOkciBmb3J0ZmFyYW5kZSBva2xhcnQuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJTZSB0aWxsIGF0dCB3ZWJicGxhdHNlbiBrYW4gYW52w6RuZGFzIG1lZCBhbmRyYSBoasOkbHBtZWRlbCDDpG4gbXVzLCB0aWxsIGV4ZW1wZWwgdGFuZ2VudGJvcmRzbmF2aWdlcmluZy5cIiwgXHRcclxuICAgICAgICAgIFwiSGEgdGlsbHLDpGNrbGlndCBtZWQgbHVmdCBtZWxsYW4ga29tcG9uZW50ZXJcIixcclxuICAgICAgICAgIFwiSGEgdGlsbHLDpGNrbGlndCBzdG9yYSBrbGlja3l0b3IuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwOi8vd3d3LnBhcmtpbnNvbmZvcmJ1bmRldC5zZVwiLFxyXG4gICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJQYXJraW5zb25zZsO2cmJ1bmRldFwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0XCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVyc29uZXIgbWVkIGRlZmVrdCBmw6RyZ3NlZW5kZSBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHRhcHBhciBzb20gdGFyIHVwcCBmw6RyZ2VybmEgdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE7DpHIgZW4gZWxsZXIgZmxlcmEgYXYgdGFwcGFybmEgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhIGxlZGVyIGRldCB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZS4gR3VsLWJsw6UgZsOkcmdibGluZGhldCAoVHJpdGFub3BpKSDDpHIgc8OkbGxzeW50LiBOYW1uZXQgw6RyIG1pc3NsZWRhbmRlIGTDpSBkZXQgaW50ZSDDpHIgZsOkcmdlcm5hIGd1bCBvY2ggYmzDpSBzb20gZsO2cnbDpHhsYXMsIHV0YW4gYmzDpSBtZWQgZ3LDtm4gb2NoIGd1bCBtZWQgbGlsYS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZGV0IGVuZGEgc8OkdHRldCBhdHQgZsO2cm1lZGxhIGluZm9ybWF0aW9uLCBpbmRpa2VyYSBlbiBoYW5kbGluZyBlbGxlciBpZGVudGlmaWVyYSBldHQgZWxlbWVudC4gTWFya2VyYSB0aWxsIGV4ZW1wZWwgaW50ZSBldHQgZmVsYWt0aWd0IGZvcm11bMOkcmbDpGx0IGVuZGFzdCBtZWQgZW4gcsO2ZCByYW0gdXRhbiBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBvY2ggZ8Okcm5hIGVuIGlrb24uXCIsIFx0XHJcbiAgICAgICAgICBcIkVyYmp1ZCBnw6RybmEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1VybFwiOiBcImh0dHBzOi8vc3Yud2lraXBlZGlhLm9yZy93aWtpL0RlZmVrdF9mJUMzJUE0cmdzZWVuZGVcIixcclxuICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2lraXBlZGlhIG9tIGRlZmVrdCBmw6RyZ3NlZW5kZVwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiUsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0XCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVyc29uZXIgbWVkIGRlZmVrdCBmw6RyZ3NlZW5kZSBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHRhcHBhciBzb20gdGFyIHVwcCBmw6RyZ2VybmEgdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE7DpHIgZW4gZWxsZXIgZmxlcmEgYXYgdGFwcGFybmEgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhIGxlZGVyIGRldCB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZS4gUsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0IChQcm90YW5vcGkgb2NoIERldXRlcmFub3BpKSDDpHIgZGVuIHZhbmxpZ2FzdGUgdHlwZW4gYXYgZsOkcmdibGluZGhldC4gRGVuIMOkciB2YW5saWdhcmUgaG9zIG3DpG4gw6RuIGt2aW5ub3IuIFBlcnNvbmVyIHLDtmQtZ3LDtm4gZsOkcmdibGluZGhldCBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIGbDpHJnZXJuYSByw7ZkLCBncsO2biwgYnJ1biBvY2ggb3JhbmdlLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFxyXG4gICAgICAgIFtcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCByw7ZkIHJhbSwga29tcGxldHRlcmEgw6R2ZW4gbWVkIHRleHQgb2NoIGfDpHJuYSBlbiAgaWtvbi5cIiwgXCJFcmJqdWQgZ8Okcm5hIGV0dCBow7Zna29udHJhc3QtbMOkZ2UuXCJdLFxyXG4gICAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwczovL3N2Lndpa2lwZWRpYS5vcmcvd2lraS9EZWZla3RfZiVDMyVBNHJnc2VlbmRlXCIsXHJcbiAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldpa2lwZWRpYSBvbSBkZWZla3QgZsOkcmdzZWVuZGVcIlxyXG4gICAgICB9LFxyXG4gICAgICBcImZhcnNpZ2h0ZWRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJMw6VuZ3N5bnRoZXRcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgSHlwZXJvcGkgc2VyIHN1ZGRpZ3QgcMOlIG7DpHJhIGjDpWxsLCBtZW4gYnJhIHDDpSBsw6VuZ3QgaMOlbGwuIE5lZHPDpHR0bmluZ2VuIHVwcHN0w6VyIHDDpSBncnVuZCBhdiBhdHQgbGp1c2V0IGludGUgYnJ5dHMgcsOkdHQgaSDDtmdhdC4gRGV0IMOkciBlbiBhdiBkZSB2YW5saWdhc3RlIHN5bm5lZHPDpHR0bmluZ2FybmEuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJVbmR2aWsgdGV4dCBpIGxpdGVuIHN0b3JsZWsuXCIsIFx0XHJcbiAgICAgICAgICBcIldlYmJzaWRhbiBza2EgZ8OlIGF0dCBmw7Zyc3RvcmEgKHpvb21hcykgdGlsbCBtaW5zdCAyMDAgJSBzw6UgYXR0IGJlc8O2a2FyZW4ga2FuIGFucGFzc2EgaW5uZWjDpWxsZXRzIHN0b3JsZWsgZWZ0ZXIgc2luYSBiZWhvdi5cIixcclxuICAgICAgICAgIFwiRXJianVkIHVwcGzDpHNuaW5nIGF2IGlubmVow6VsbGV0LlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cHM6Ly93ZWJicmlrdGxpbmplci5zZS9yLzM5LWdlLXdlYmJwbGF0c2VuLWVuLWdvZC1sYXNiYXJoZXQvXCIsXHJcbiAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldlYmJyaWt0bGluamUgR2Ugd2ViYnBsYXRzZW4gZ29kIGzDpHNiYXJoZXRcIlxyXG4gICAgICB9LFxyXG4gICAgICBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkhlbHQgZsOkcmdibGluZFwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkRlZmVrdCBmw6RyZ3NlZW5kZSBpbm5lYsOkciBhdHQgZW4gcGVyc29uIGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6Ugdmlzc2EgZWxsZXIgYWxsYSBmw6RyZ2VyLiBFdHQgZnVsbHQgZnVuZ2VyYW5kZSDDtmdhIGhhciB0cmUgb2xpa2EgdHlwZXIgYXYgdGFwcGFyIHNvbSB0YXIgdXBwIG9saWthIGbDpHJnZXI6IHZpb2xldHQsIGdyw7ZuIG9jaCByw7ZkLiBPcnNha2VuIHRpbGwgZGVmZWt0IGbDpHJnc2VlbmRlIMOkciBhdHQgZW4gZWxsZXIgZmxlcmEgYXYgZGVzc2EgdHlwZXIgYXYgdGFwcGFyIHNha25hcyBlbGxlciDDpHIgZGVmZWt0YS4gSGVsdCBmw6RyZ2JsaW5kIChNb25va3JvbWFzaS9ha3JvbWF0b3BzaSkgw6RyIG15Y2tldCBzw6RsbHN5bnQuIFBlcnNvbmVyIG1lZCBkZW5uYSBzeW5uZWRzw6R0dG5pbmcgc2VyIGluZ2EgZsOkcmdlciB1dGFuIHNlciBlbmRhc3QgaSBncsOlc2thbGEuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJBbnbDpG5kIGludGUgZsOkcmcgc29tIGRldCBlbmRhIHPDpHR0ZXQgYXR0IGbDtnJtZWRsYSBpbmZvcm1hdGlvbiwgaW5kaWtlcmEgZW4gaGFuZGxpbmcgZWxsZXIgaWRlbnRpZmllcmEgZWxlbWVudC4gTWFya2VyYSB0LmV4LiBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCByw7ZkIHJhbSwga29tcGxldHRlcmEgw6R2ZW4gbWVkIHRleHQgZWxsZXIgaWtvbi5cIiwgXHRcclxuICAgICAgICAgIFwiRGV0IGthbiB2YXJhIGVuIGJyYSBpZMOpIGF0dCBlcmJqdWRhIGV0dCBow7Zna29udHJhc3QtbMOkZ2UuXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwidHVubmVsVmlzaW9uXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJUdW5uZWxzZWVuZGVcIixcclxuICAgICAgICBcImZhY3RcIjogXCJEZXQgc29tIGkgZGFnbGlndCB0YWwgYnJ1a2FyIGthbGxhcyB0dW5uZWxzZWVuZGUgw6RyIGVuIHN5bm5lZHPDpHR0bmluZyBzb20gZ8O2ciBhdHQgZW5kYXN0IGVuIGRlbCBhdiBzeW5mw6RsdGV0IGthbiBzZXMuIERldHRhIGthbiBiZXJvIHDDpSBhdHQgcGVyc29uZW4gbGlkZXIgYXYgZW4gc2p1a2RvbSBzb20gZ8O2ciBhdHQgY2VsbGVybmEgaSDDtmdhdCBmw7Zyc3TDtnJzIG1lbiBkZW5uYSB0eXAgYXYgc3lubmVkc8OkdHRuaW5nIGthbiBvY2tzw6UgdGlsbGbDpGxsaWd0IHVwcHN0w6UgcMOlIGdydW5kIGF2IHN0cmVzcyBlbGxlciBkZXByZXNzaW9uLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrLlwiLFxyXG4gICAgICAgICAgXCJXZWJic2lkYW4gc2thIGfDpSBhdHQgZsO2cnN0b3JhICh6b29tYXMpIHRpbGwgbWluc3QgMjAwICUgc8OlIGF0dCBiZXPDtmthcmVuIGthbiBhbnBhc3NhIGlubmVow6VsbGV0cyBzdG9ybGVrIGVmdGVyIHNpbmEgYmVob3YuXCIsXHJcbiAgICAgICAgICBcIkVyYmp1ZCB1cHBsw6RzbmluZyBhdiBpbm5laMOlbGxldC5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJjb25jZW50cmF0aW9uXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJLb25jZW50cmF0aW9uXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiQWxsYSBrYW4gaGEgc3bDpXJ0IGF0dCBrb25jZW50cmVyYSBzaWcgbWVuIGbDtnIgdmlzc2Ega2FuIGRldCBibGkgZXR0IHN0b3J0IHByb2JsZW0gaSB2YXJkYWdzbGl2ZXQuIERlc3NhIGZ1bmt0aW9uc25lZHPDpHR0bmluZ2FyIGthbiBvcnNha2Egc3bDpXJpZ2hldGVyIG1lZCBhdHQgaGFudGVyYSBpbnRyeWNrLCBzb3J0ZXJhIGluZm9ybWF0aW9uIG9jaCBsanVka8OkbnNsaWdoZXQuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJHZSB3ZWJicGxhdHNlbiBlbiBlbmtlbCBvY2ggbHVmdGlnIGRlc2lnbi5cIixcclxuICAgICAgICAgIFwiVmFyIGbDtnJzaWt0aWcgbWVkIGFuaW1hdGlvbmVyIG9jaCBzdGFya2EgZsOkcmdlci5cIixcclxuICAgICAgICAgIFwiVW5kdmlrIGF0dCBoYSBmw7ZyIG15Y2tldCBpbm5laMOlbGwgcMOlIHNhbW1hIHNpZGEuXCIsXHJcbiAgICAgICAgICBcIkVyYmp1ZCBsanVkLSBvY2ggdmlkZW8tYWxlcm5hdGl2IHRpbGwgdGV4dGlubmVow6VsbC5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJzbWFsbFZvY2FidWxhcnlcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkxpdGV0IG9yZGbDtnJyw6VkXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiRW4gc3RvciBkZWwgYXYgam9yZGVucyBiZWZvbGtuaW5nIGthbiBpbnRlIGzDpHNhIGFsbHMgb2NoIG3DpW5nYSB2dXhuYSBsw6RzZXIgaW50ZSBzw6UgYnJhIHNvbSBmw7ZydsOkbnRhcyBlZnRlciBncnVuZHNrb2xldXRiaWxkbmluZ2VuLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiVW5kdmlrIGtyw6VuZ2xpZ2Egb3JkIG9jaCBmYWNrdGVybWVyLlwiLCAgIFxyXG4gICAgICAgICAgXCJFcmJqdWQgbMOkdHRsw6RzdCB2ZXJzaW9uIGF2IGtyw6VuZ2xpZ2EgdGV4dGVyLlwiLFxyXG4gICAgICAgICAgXCJFcmJqdWQgdGV4dGVyIHDDpSBvbGlrYSBzcHLDpWsuXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlVJXCI6IHtcclxuICAgICAgXCJzZWxlY3RTaW11bGF0aW9uXCI6IFwiVsOkbGogc2ltdWxlcmluZzpcIixcclxuICAgICAgXCJyZXNldFwiOiBcIsOFdGVyc3TDpGxsXCIsXHJcbiAgICAgIFwiYWR2aWNlXCI6IFwiVMOkbmsgcMOlIGRldHRhXCIsXHJcbiAgICAgIFwibW9yZUluZm9cIjogXCJNZXIgaW5mb3JtYXRpb25cIixcclxuICAgICAgXCJzaWdodFwiOiBcIlN5blwiLFxyXG4gICAgICBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJIZWx0IGbDpHJnYmxpbmRcIixcclxuICAgICAgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjogXCJHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0XCIsICAgIFxyXG4gICAgICBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXRcIixcclxuICAgICAgXCJmYXJzaWdodGVkbmVzc1wiOiBcIkzDpW5nc3ludGhldCwgw7Z2ZXJzeW50aGV0XCIsXHJcbiAgICAgIFwidHVubmVsVmlzaW9uXCI6IFwiVHVubmVsc2VlbmRlXCIsXHJcbiAgICAgIFwibW9iaWxpdHlcIjogXCJNb3RvcmlrXCIsXHJcbiAgICAgIFwicGFya2luc29uc1wiOiBcIlBhcmtpbnNvbnNcIixcclxuICAgICAgXCJyZWFkQW5kV3JpdGVcIjogXCJMw6RzYSBvY2ggc2tyaXZhXCIsXHJcbiAgICAgIFwiZHlzbGV4aWFcIjogXCJEeXNsZXhpXCIsXHJcbiAgICAgIFwic21hbGxWb2NhYnVsYXJ5XCI6IFwiTGl0ZXQgb3JkZsO2cnLDpWRcIixcclxuICAgICAgXCJjb25jZW50cmF0aW9uXCI6IFwiS29uY2VudHJhdGlvblwiLFxyXG4gICAgICBcImNoYW5nZVNldHRpbmdzXCI6IFwiQ2hhbmdlIHNldHRpbmdzXCIsXHJcbiAgICAgIFwic2VsZWN0TGFuZ3VhZ2VcIjogXCJTZWxlY3QgbGFuZ3VhZ2VcIixcclxuICAgICAgXCJzYXZlU2V0dGluZ3NcIjogXCJTYXZlIHNldHRpbmdzXCIsXHJcbiAgICAgIFwiY2FuY2VsXCI6IFwiQ2FuY2VsXCIsXHJcbiAgICAgIFwic2ltdWxhdGlvbnNcIjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIlN5blwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtcclxuICAgICAgICAgICAgeyBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJIZWx0IGbDpHJnYmxpbmRcIiB9LFxyXG4gICAgICAgICAgICB7IFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6IFwiR3VsLWJsw6UgZsOkcmdibGluZGhldFwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6IFwiUsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0XCIgfSxcclxuICAgICAgICAgICAgeyBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiTMOlbmdzeW50aGV0LCDDtnZlcnN5bnRoZXRcIiB9LFxyXG4gICAgICAgICAgICB7IFwidHVubmVsVmlzaW9uXCI6IFwiVHVubmVsc2VlbmRlXCIgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiTW90b3Jpa1wiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFsgXHJcbiAgICAgICAgICAgIHsgXCJwYXJraW5zb25zXCI6IFwiUGFya2luc29uc1wiIH1cclxuICAgIFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJMw6RzYSBvY2ggc2tyaXZhXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgICB7IFwiZHlzbGV4aWFcIjogXCJEeXNsZXhpXCIgfSxcclxuICAgICAgICAgICAgeyBcInNtYWxsVm9jYWJ1bGFyeVwiOiBcIkxpdGV0IG9yZGbDtnJyw6VkXCIgfSxcclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIktvbmNlbnRyYXRpb25cIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiTWlubmVcIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9LFxyXG4gIFwiZW5cIjpcclxuICB7XHJcbiAgICBcImZhY3RzXCI6IHtcclxuICAgICAgXCJkeXNsZXhpYVwiOiBcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkR5c2xleGlhXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiRHlzbGV4aWEgaXMgYSBkaXNhYmlsaXR5IHRoYXQgbWFrZXMgaXQgZGlmZmljdWx0IGZvciB0aGUgYnJhaW4gdG8gYXV0b21hdGUgdGhlIGludGVycHJldGF0aW9uIG9mIHdvcmRzLiBUaGlzIG1ha2VzIGl0IGhhcmQgZm9yIHBlb3BsZSB3aXRoIHRoaXMgZGlzYWJpbGl0eSB0byByZWFkIGFuZCB3cml0ZS4gRHlzbGV4aWEgaXMgaGFzIG5vIGNvbm5lY3Rpb24gd2l0aCB2aXNpb24gb3IgaW50ZWxsaWdlbmNlLiBUaGUgY2F1c2VzIG9mIGR5c2xleGlhIGFyZSBzdGlsbCB1bmNsZWFyLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiQXZvaWQgdGV4dCBpbiBzbWFsbCBmb250IHNpemVzIGFuZCBsb25nIHRleHRzLiBVc2UgcHJvcGVyIHNwYWNpbmcgYW5kIGxpbmUgaGVpZ2h0LlwiLFxyXG4gICAgICAgICAgXCJBdm9pZCBkaWZmaWN1bHQgd29yZHMgYW5kIHRlcm1zLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciBlYXN5IHRvIHJlYWQgdGV4dHMsIGltYWdlcywgdmlkZW8gb3IgYXVkaW8gYWx0ZXJuYXRpdmVzLlwiLFxyXG4gICAgICAgICAgXCJBdm9pZCBmb250cyB3aXRoIGNvbXBsaWNhdGVkIGFuZCBjb21wbGV4IGNoYXJhY3RlcnMuXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGFya2luc29uc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiUGFya2luc29uc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBhcmtpbnNvbidzIGRpc2Vhc2UgZGVzdHJveXMgdGhlIGNlbGxzIGluIHRoZSBicmFpbiB0aGF0IHByb2R1Y2UgZG9wYW1pbmUsIHdoaWNoIGNhdXNlcyB0aGUgYnJhaW4gdG8gaGF2ZSBhIHJlZHVjZWQgYWJpbGl0eSB0byBzZW5kIHNpZ25hbHMuIFBlcnNvbnMgd2l0aCBQYXJraW5zb24ncyBtYXkgc3VmZmVyIGZyb20gc3ltcHRvbXMgc3VjaCBhcyBzaGFraW5nLCBzdGlmZiBtdXNjbGVzLCBhbmQgcmVkdWNlZCBtb2JpbGl0eS4gVGhlIGNhdXNlcyBvZiBQYXJraW5zb24ncyBkaXNlYXNlIGFyZSBzdGlsbCB1bmNsZWFyLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiTWFrZSBzdXJlIHRoZSB3ZWJzaXRlIGNhbiBiZSB1c2VkIHdpdGggb3RoZXIgdG9vbHMgb3RoZXIgdGhhbiBhIG1vdXNlLCBzdWNoIGFzIGtleWJvYXJkIG5hdmlnYXRpb24uXCIsXHJcbiAgICAgICAgICBcIkhhdmUgZW5vdWdoIHNwYWNlIGJldHdlZW4gY29tcG9uZW50cy5cIixcclxuICAgICAgICAgIFwiTWFrZSBzdXJlIGNsaWNrIGFyZWFzIGFyZSBiaWcgZW5vdWdoLlwiLFxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlllbGxvdy1ibHVlIGNvbG9yIGJsaW5kbmVzc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBlb3BsZSB3aXRoIGxvd2VyZWQgY29sb3IgdmlzaW9uIGhhdmUgZGlmZmljdWx0eSBkaXN0aW5ndWlzaGluZyBzb21lIG9yIGFsbCBjb2xvcnMuIFllbGxvdy1ibHVlIGNvbG9yIGJsaW5kbmVzcyAoVHJpdGFub3BpYSkgaXMgcmFyZS4gVGhlIG5hbWUgY2FuIGJlIG1pc2xlYWRpbmcuIEl0J3Mgbm90IHRoZSBjb2xvcnMgeWVsbG93IGFuZCBibHVlIHRoYXQgYXJlIGNvbmZ1c2VkIGJ1dCBibHVlIHdpdGggZ3JlZW4gYW5kIHllbGxvdyB3aXRoIHB1cnBsZS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkRvIG5vdCB1c2UgY29sb3IgYXMgdGhlIG9ubHkgd2F5IHRvIGNvbnZleSBpbmZvcm1hdGlvbiwgaW5kaWNhdGUgYW4gYWN0aW9uIG9yIGlkZW50aWZ5IGFuIGVsZW1lbnQuIEZvciBleGFtcGxlLCBkbyBub3QgbWFyayBhbiBpbmNvcnJlY3QgZm9ybSBmaWVsZCB3aXRoIGEgcmVkIGJvcmRlciBvbmx5LCBhbHNvIHN1cHBsZW1lbnQgd2l0aCBhIHRleHQgYW5kIHByZWZlcmFibHkgYW4gaWNvbi5cIixcclxuwqDCoMKgwqDCoMKgwqDCoMKgwqBcIkNvbnNpZGVyIG9mZmVyaW5nIGEgaGlnaCBjb250cmFzdCBtb2RlLlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlJlZC1ncmVlbiBjb2xvciBibGluZG5lc3NcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZW9wbGUgd2l0aCBsb3dlcmVkIGNvbG9yIHZpc2lvbiBoYXZlIGRpZmZpY3VsdHkgZGlzdGluZ3Vpc2hpbmcgc29tZSBvciBhbGwgY29sb3JzLiBSZWQtZ3JlZW4gY29sb3IgYmxpbmRuZXNzIChQcm90YW5vcGlhIGFuZCBEZXV0ZXJhbm9waWEpIGlzIHRoZSBtb3N0IGNvbW1vbiB0eXBlIG9mIGNvbG9yIGJsaW5kbmVzcy4gSXQgaXMgbW9yZSBjb21tb24gYW1vbmcgbWVuIHRoYW4gd29tZW4uIFBlb3BsZSB3aXRoIHJlZC1ncmVlbiBjb2xvciBibGluZG5lc3MgaGF2ZSBkaWZmaWN1bHR5IGRpc3Rpbmd1aXNoaW5nIHRoZSBjb2xvcnMgcmVkLCBncmVlbiwgYnJvd24gYW5kIG9yYW5nZS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkRvIG5vdCB1c2UgY29sb3IgYXMgdGhlIG9ubHkgd2F5IHRvIGNvbnZleSBpbmZvcm1hdGlvbiwgaW5kaWNhdGUgYW4gYWN0aW9uIG9yIGlkZW50aWZ5IGFuIGVsZW1lbnQuIEZvciBleGFtcGxlLCBkbyBub3QgbWFyayBhbiBpbmNvcnJlY3QgZm9ybSBmaWVsZCB3aXRoIGEgcmVkIGJvcmRlciBvbmx5LCBhbHNvIHN1cHBsZW1lbnQgd2l0aCBhIHRleHQgYW5kIHByZWZlcmFibHkgYW4gaWNvbi5cIixcclxuwqDCoMKgwqDCoMKgwqDCoMKgwqBcIkNvbnNpZGVyIG9mZmVyaW5nIGEgaGlnaCBjb250cmFzdCBtb2RlLlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZhcnNpZ2h0ZWRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJGYXItc2lnaHRlZG5lc3NcIixcclxuICAgICAgICBcImZhY3RcIjogXCJGYXItc2lnaHRlZG5lc3MgKEh5cGVyb3BpYSkgaXMgb25lIG9mIHRoZSBtb3N0IGNvbW1vbiB2aXN1YWwgaW1wYWlybWVudHMuIFBlb3BsZSB3aXRoIEh5cGVyb3BpYSBoYXZlIGRpZmZpY3VsdHkgZm9jdXNpbmcgb24gb2JqZWN0cyBhdCBjbG9zZSByYW5nZSB3aGljaCBtYWtlcyB0aGVtIGFwcGVhciBibHVycnkuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJBdm9pZCB0ZXh0IGluIHNtYWxsIGZvbnQgc2l6ZXMgYW5kIGxvbmcgdGV4dHMuIFVzZSBwcm9wZXIgc3BhY2luZyBhbmQgbGluZSBoZWlnaHQuXCIsICBcclxuICAgICAgICAgIFwiTWFrZSBzdXJlIHRoZSB3ZWJzaXRlIGNhbiBiZSB6b29tZWQgdG8gYXQgbGVhc3QgMjAwJS5cIixcclxuICAgICAgICAgIFwiT2ZmZXIgYSB0ZXh0IHRvIHNwZWVjaCByZWFkZXIuXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwidG90YWxDb2xvckJsaW5kbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiVG90YWwgY29sb3IgYmxpbmRuZXNzXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVvcGxlIHdpdGggbG93ZXJlZCBjb2xvciB2aXNpb24gaGF2ZSBkaWZmaWN1bHR5IGRpc3Rpbmd1aXNoaW5nIHNvbWUgb3IgYWxsIGNvbG9ycy4gVG90YWwgY29sb3IgYmxpbmRuZXNzIChNb25vY2hyb21hdGljIC8gQWNocm9tYXRvcHN5KSBpcyB2ZXJ5IHJhcmUuIFBlb3BsZSB3aXRoIHRoaXMgdmlzdWFsIGltcGFpcm1lbnQgY2FuIG5vdCBwZXJjaWV2ZSBhbnkgY29sb3JzLCBvbmx5IGRpZmZlcmVudCBzaGFkZXMgb2YgZ3JheS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkRvIG5vdCB1c2UgY29sb3IgYXMgdGhlIG9ubHkgd2F5IHRvIGNvbnZleSBpbmZvcm1hdGlvbiwgaW5kaWNhdGUgYW4gYWN0aW9uIG9yIGlkZW50aWZ5IGFuIGVsZW1lbnQuIEZvciBleGFtcGxlLCBkbyBub3QgbWFyayBhbiBpbmNvcnJlY3QgZm9ybSBmaWVsZCB3aXRoIGEgcmVkIGJvcmRlciBvbmx5LCBhbHNvIHN1cHBsZW1lbnQgd2l0aCBhIHRleHQgYW5kIHByZWZlcmFibHkgYW4gaWNvbi5cIixcclxuwqDCoMKgwqDCoMKgwqDCoMKgwqBcIkNvbnNpZGVyIG9mZmVyaW5nIGEgaGlnaCBjb250cmFzdCBtb2RlLlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInR1bm5lbFZpc2lvblwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiVHVubmVsIFZpc2lvblwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIldoYXQgaXMgY29tbW9ubHkgY2FsbGVkIFR1bm5lbCBWaXNpb24gaXMgbG9zcyBvZiBwZXJpcGhlcmFsIHZpc2lvbi4gVGhpcyBtYXkgYmUgYmVjYXVzZSB0aGUgcGVyc29uIHN1ZmZlcnMgZnJvbSBhIGRpc2Vhc2UgdGhhdCBhZmZlY3RzIHRoZXkgY2VsbHMgaW4gdGhlIGV5ZSwgYnV0IG1heSBhbHNvIG9jY3VyIHRlbXBvcmFyaWx5IGR1ZSB0byBzdHJlc3Mgb3IgZGVwcmVzc2lvbi5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkF2b2lkIHRleHQgaW4gc21hbGwgZm9udCBzaXplcyBhbmQgbG9uZyB0ZXh0cy4gVXNlIHByb3BlciBzcGFjaW5nIGFuZCBsaW5lIGhlaWdodC5cIixcclxuICAgICAgICAgIFwiTWFrZSBzdXJlIHRoZSB3ZWJzaXRlIGNhbiBiZSB6b29tZWQgdG8gYXQgbGVhc3QgMjAwJS5cIixcclxuICAgICAgICAgIFwiT2ZmZXIgYSB0ZXh0IHRvIHNwZWVjaCByZWFkZXIuXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiY29uY2VudHJhdGlvblwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiQ29uY2VudHJhdGlvblwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkV2ZXJ5b25lIGNhbiBoYXZlIGEgaGFyZCB0aW1lIGNvbmNlbnRyYXRpbmcsIGJ1dCBmb3Igc29tZSBpdCBjYW4gYmUgYSBiaWcgcHJvYmxlbSBpbiBldmVyeWRheSBsaWZlLiBEaXNhYmlsaXRpZXMgbGlrZSBBREhEIGFuZCBBdXRpc20gY2FuIGNhdXNlIGRpZmZpY3VsdHkgaW4gaGFuZGxpbmcgaW1wcmVzc2lvbnMsIHNvcnRpbmcgaW5mb3JtYXRpb24gYW5kIHNlbnNpdGl2aXR5IHRvIHNvdW5kLlwiLCAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJHaXZlIHRoZSB3ZWJzaXRlIGEgc2ltcGxlIGFuZCBjbGVhbiBkZXNpZ24uXCIsXHJcbiAgICAgICAgICBcIkJlIGNhcmVmdWwgd2l0aCBhbmltYXRpb25zIGFuZCBzdHJvbmcgY29sb3JzLlwiLFxyXG4gICAgICAgICAgXCJBdm9pZCBoYXZpbmcgdG9vIG11Y2ggY29udGVudCBvbiB0aGUgc2FtZSBwYWdlLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciBpbWFnZSwgYXVkaW8gYW5kIHZpZGVvIGFsZXJuYXRpdmVzIHRvIHRleHQgY29udGVudC5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJzbWFsbFZvY2FidWxhcnlcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlNtYWxsIHZvY2FidWxhcnlcIixcclxuICAgICAgICBcImZhY3RcIjogXCJBIGxhcmdlIHBhcnQgb2YgdGhlIHdvcmxkJ3MgcG9wdWxhdGlvbiBjYW4ndCByZWFkIGF0IGFsbCBhbmQgbWFueSBhZHVsdHMgZG9uJ3QgcmVhZCBhcyB3ZWxsIGFzIGV4cGVjdGVkIGFmdGVyIGZpbmlzaGluZyBncmFkZSBzY2hvb2wuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJBdm9pZCBkaWZmaWN1bHQgd29yZHMgYW5kIHRlcm1zLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciBlYXN5IHRvIHJlYWQgdGV4dHMsIGltYWdlcywgdmlkZW8gb3IgYXVkaW8gYWx0ZXJuYXRpdmVzLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciB0ZXh0cyBpbiBkaWZmZXJlbnQgbGFuZ3VhZ2VzLlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJVSVwiOiB7XHJcbiAgICAgIFwic2VsZWN0U2ltdWxhdGlvblwiOiBcIlNlbGVjdCBzaW11bGF0aW9uOlwiLFxyXG4gICAgICBcInJlc2V0XCI6IFwiUmVzZXRcIixcclxuICAgICAgXCJhZHZpY2VcIjogXCJUaGluayBhYm91dCB0aGlzXCIsXHJcbiAgICAgIFwibW9yZUluZm9cIjogXCJNb3JlIGluZm9ybWF0aW9uXCIsXHJcbiAgICAgIFwic2lnaHRcIjogXCJTaWdodFwiLFxyXG4gICAgICBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJUb3RhbCBjb2xvciBibGluZG5lc3NcIixcclxuICAgICAgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjogXCJZZWxsb3ctQmx1ZSBjb2xvciBibGluZG5lc3NcIiwgICAgXHJcbiAgICAgIFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOiBcIlJlZC1HcmVlbiBjb2xvciBibGluZG5lc3NcIixcclxuICAgICAgXCJmYXJzaWdodGVkbmVzc1wiOiBcIkZhci1zaWdodGVkbmVzc1wiLFxyXG4gICAgICBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbCB2aXNpb25cIixcclxuICAgICAgXCJtb2JpbGl0eVwiOiBcIk1vYmlsaXR5XCIsXHJcbiAgICAgIFwicGFya2luc29uc1wiOiBcIlBhcmtpbnNvbnNcIixcclxuICAgICAgXCJyZWFkQW5kV3JpdGVcIjogXCJSZWFkIGFuZCB3cml0ZVwiLFxyXG4gICAgICBcImR5c2xleGlhXCI6IFwiRHlzbGV4aWFcIixcclxuICAgICAgXCJzbWFsbFZvY2FidWxhcnlcIjogXCJTbWFsbCB2b2NhYnVsYXJ5XCIsXHJcbiAgICAgIFwiY29uY2VudHJhdGlvblwiOiBcIkNvbmNlbnRyYXRpb25cIixcclxuICAgICAgXCJjaGFuZ2VTZXR0aW5nc1wiOiBcIkNoYW5nZSBzZXR0aW5nc1wiLFxyXG4gICAgICBcInNlbGVjdExhbmd1YWdlXCI6IFwiU2VsZWN0IGxhbmd1YWdlXCIsXHJcbiAgICAgIFwic2F2ZVNldHRpbmdzXCI6IFwiU2F2ZSBzZXR0aW5nc1wiLFxyXG4gICAgICBcImNhbmNlbFwiOiBcIkNhbmNlbFwiLFxyXG4gICAgICBcInNpbXVsYXRpb25zXCI6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJTaWdodFwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtcclxuICAgICAgICAgICAgeyBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJUb3RhbCBjb2xvciBibGluZG5lc3NcIiB9LFxyXG4gICAgICAgICAgICB7IFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6IFwiWWVsbG93LUJsdWUgY29sb3IgYmxpbmRuZXNzXCIgfSxcclxuICAgICAgICAgICAgeyBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSZWQtR3JlZW4gY29sb3IgYmxpbmRuZXNzXCIgfSxcclxuICAgICAgICAgICAgeyBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiRmFyLXNpZ2h0ZWRuZXNzXCIgfSxcclxuICAgICAgICAgICAgeyBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbCB2aXNpb25cIiB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJNb2JpbGl0eVwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFsgXHJcbiAgICAgICAgICAgIHsgXCJwYXJraW5zb25zXCI6IFwiUGFya2luc29uc1wiIH1cclxuICAgIFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJSZWFkIGFuZCB3cml0ZVwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtcclxuICAgICAgICAgICAgeyBcImR5c2xleGlhXCI6IFwiRHlzbGV4aWFcIiB9LFxyXG4gICAgICAgICAgICB7IFwic21hbGxWb2NhYnVsYXJ5XCI6IFwiU21hbGwgdm9jYWJ1bGFyeVwiIH0sXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJDb25jZW50cmF0aW9uXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIk1lbW9yeVwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH1cclxufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBsb2FkZWRTaW11bGF0aW9ucyA9IFtdO1xuXG5mdW5jdGlvbiBsb2FkKG5hbWUsIHN1Yk5hbWUsIGNhbGxiYWNrKSB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF0sXG4gICAgICAgIHNjcmlwdEZpbGUgPSBzdWJOYW1lID8gJ3NpbXVsYXRpb25zLycgKyBuYW1lICsgJy8nICsgc3ViTmFtZSArICcvY29udGVudC5qcycgOiAnc2ltdWxhdGlvbnMvJyArIG5hbWUgKyAnL2NvbnRlbnQuanMnO1xuXG4gICAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdChhY3RpdmVUYWIuaWQsIHsgZmlsZTogc2NyaXB0RmlsZSB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICBsb2FkZWRTaW11bGF0aW9ucy5wdXNoKG5hbWUpO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKG5hbWUsIHN1Yk5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RhcnQobmFtZSwgc3ViTmFtZSkge1xuICBpZiAobG9hZGVkU2ltdWxhdGlvbnMuaW5jbHVkZXMobmFtZSkpIHtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdGFydFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lLCBzdWJTaW11bGF0aW9uOiBzdWJOYW1lIH0pO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGxvYWQobmFtZSwgc3ViTmFtZSwgZnVuY3Rpb24gKCkge1xuICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0YXJ0U2ltdWxhdGlvbicsIHNpbXVsYXRpb246IG5hbWUsIHN1YlNpbXVsYXRpb246IHN1Yk5hbWUgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzdG9wKG5hbWUsIHN1Yk5hbWUpIHtcbiAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdG9wU2ltdWxhdGlvbicsIHNpbXVsYXRpb246IG5hbWUsIHN1YlNpbXVsYXRpb246IHN1Yk5hbWUgfSk7XG4gIH0pO1xufVxuXG5leHBvcnRzLnN0YXJ0ID0gc3RhcnQ7XG5leHBvcnRzLnN0b3AgPSBzdG9wO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2ltdWxhdGlvbkxvYWRlci5qcy5tYXBcbiJdfQ==
