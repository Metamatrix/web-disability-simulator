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

  var simulationStatus = $(".simulation-started-paragraph");
  var simulationStatusAlert = $(".simulation-started-alert");
  var infoHeading = $(".disability-info-heading");
  var infoParagraph = $(".disability-info-paragraph");
  var adviceList = $(".advice-list");
  var moreInfoLink = $(".more-info-link");
  var moreInfoPanel = $('#more-info-panel');
  var texts = data.facts[activeSimulation];

  simulationStatus.empty();
  infoHeading.empty();
  infoParagraph.empty();
  adviceList.empty();
  moreInfoLink.empty();

  simulationStatus.text(texts.simulationStatus);
  simulationStatusAlert.removeClass("hide");

  infoHeading.text(texts.heading);
  infoParagraph.text(texts.fact);

  $.each(texts.listItems, function (i, value) {
    adviceList.append('<li>' + value + '</li>');
  });

  if (texts.moreInfoUrl !== undefined) {
    moreInfoPanel.removeClass("hidden");
    moreInfoLink.append(texts.moreInfoLinkText);
    chrome.storage.local.set({ 'linkUrl': texts.moreInfoUrl });
  } else {
    moreInfoPanel.addClass("hidden");
  }
}

$(document).ready(function () {

  var tooltip = $(".tool-tip");

  var activeSimulation = void 0;

  //chrome.storage.local.get('lang', obj => {

  lang = 'en';

  setTexts();

  //});

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

  /* $('#btn-save-settings').on('click', (e) => {
     e.preventDefault();
  
     var selectedLang = $('#language').val();
  
     chrome.storage.local.set({'lang': selectedLang});
  
     lang = selectedLang;
  
     setTexts();
  
     $('#settings').removeClass("in");
     $('#panel1').removeClass("hide");
  
     setTimeout(() => {
       $('#panel1').addClass("in");
     }, 500);
  
     setTimeout(() => {
       $('#settings').addClass("hide");
     }, 750);
  
   });
  
   $('#btn-cancel-settings').on('click', (e) => {
     e.preventDefault();
  
     $('#settings').removeClass("in");
     $('#panel1').removeClass("hide");
  
     setTimeout(() => {
       $('#panel1').addClass("in");
     }, 250);
  
     setTimeout(() => {
       $('#settings').addClass("hide");
     }, 500);
  
   });*/

  // Tooltip view

  $(".simulation-started-alert .close").click(function () {
    $(".simulation-started-alert").addClass("hide");
  });

  $("#reset-btn").click(function () {
    resetSimulation(tooltip);
  });

  $(".more-info-link").click(function () {
    chrome.storage.local.get('linkUrl', function (obj) {
      chrome.tabs.create({ url: '' + obj.linkUrl });
    });
  });

  //panel collapse, show arrows: 
  $('.collapse').on('shown.bs.collapse', function (event) {
    console.log('collapse!', event.target);
    $(".down-arrow, .up-arrow").toggle();
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
        "simulationStatus": "Simulering aktiv!",
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
        "simulationStatus": "Simulering aktiv! rör muspekaren på webbplatsen och se vad som händer.",
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
        "simulationStatus": "Simulering aktiv!",
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
        "simulationStatus": "Simulering aktiv!",
        "heading": "Röd-grön färgblindhet",
        "fact": "Personer med defekt färgseende har svårt att skilja på vissa eller alla färger. Ett fullt fungerande öga har tre olika tappar som tar upp färgerna violett, grön och röd. När en eller flera av tapparna saknas eller är defekta leder det till defekt färgseende. Röd-grön färgblindhet (Protanopi och Deuteranopi) är den vanligaste typen av färgblindhet. Den är vanligare hos män än kvinnor. Personer röd-grön färgblindhet har svårt att skilja på färgerna röd, grön, brun och orange.",
        "listItems": 
        ["Använd inte färg som enda sättet att förmedla information, indikera en handling eller identifiera ett element. Markera till exempel inte ett felaktigt formulärfält endast med röd ram, komplettera även med text och gärna en  ikon.", "Erbjud gärna ett högkontrast-läge."],
        "moreInfoUrl": "https://sv.wikipedia.org/wiki/Defekt_f%C3%A4rgseende",
        "moreInfoLinkText" : "Wikipedia om defekt färgseende"
      },
      "farsightedness":
      {
        "simulationStatus": "Simulering aktiv!",
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
        "simulationStatus": "Simulering aktiv!",
        "heading": "Helt färgblind",
        "fact": "Defekt färgseende innebär att en person har svårt att skilja på vissa eller alla färger. Ett fullt fungerande öga har tre olika typer av tappar som tar upp olika färger: violett, grön och röd. Orsaken till defekt färgseende är att en eller flera av dessa typer av tappar saknas eller är defekta. Helt färgblind (Monokromasi/akromatopsi) är mycket sällsynt. Personer med denna synnedsättning ser inga färger utan ser endast i gråskala.",
        "listItems": [
          "Använd inte färg som det enda sättet att förmedla information, indikera en handling eller identifiera element. Markera t.ex. inte ett felaktigt formulärfält endast med röd ram, komplettera även med text eller ikon.", 	
          "Det kan vara en bra idé att erbjuda ett högkontrast-läge."
        ]
      },
      "tunnelVision":
      {
        "simulationStatus": "Simulering aktiv! rör muspekaren på webbplatsen och se vad som händer.",
        "heading": "Tunnelseende",
        "fact": "Det som i dagligt tal brukar kallas tunnelseende är en synnedsättning som gör att endast en del av synfältet kan ses. Detta kan bero på att personen lider av en sjukdom som gör att cellerna i ögat förstörs men denna typ av synnedsättning kan också tillfälligt uppstå på grund av stress eller depression.",
        "listItems": [
          "Undvik text i liten storlek.",
          "Webbsidan ska gå att förstora (zoomas) till minst 200 % så att besökaren kan anpassa innehållets storlek efter sina behov.",
          "Erbjud uppläsning av innehållet."
        ]
      },
      "sunshine":
      {
        "simulationStatus": "Simulering aktiv!",
        "heading": "Solsken",
        "fact": "Lorem ipsum",
        "listItems": [
          "Lorem ipsum.",
          "Lorem ipsum.",
          "Lorem ipsum"
        ]
      },
      "concentration":
      {
        "simulationStatus": "Simulering aktiv!",
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
        "simulationStatus": "Simulering aktiv!",
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
            { "tunnelVision": "Tunnelseende" },
            { "sunshine": "Solsken" }
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
            { "smallVocabulary": "Litet ordförråd" }
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
        "simulationStatus": "Simulation active!",
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
        "simulationStatus": "Simulation active! move the mouse pointer on the web page and see what's happening.",
        "heading": "Parkinsons",
        "fact": "Parkinson's disease destroys the cells in the brain that produce dopamine, which causes the brain to have a reduced ability to send signals. Persons with Parkinson's may suffer from symptoms such as shaking, stiff muscles, and reduced mobility. The causes of Parkinson's disease are still unclear.",
        "listItems": [
          "Make sure the website can be used with other tools other than a mouse, such as keyboard navigation.",
          "Have enough space between components.",
          "Make sure click areas are big enough."
        ],
        "moreInfoUrl": "http://www.parkinsonforbundet.se",
        "moreInfoLinkText" : "Parkinson's Association"
      },
      "yellowBlueColorBlindness":
      {
        "simulationStatus": "Simulation active!",
        "heading": "Yellow-blue color blindness",
        "fact": "People with lowered color vision have difficulty distinguishing some or all colors. Yellow-blue color blindness (Tritanopia) is rare. The name can be misleading. It's not the colors yellow and blue that are confused but blue with green and yellow with purple.",
        "listItems": [
          "Do not use color as the only way to convey information, indicate an action or identify an element. For example, do not mark an incorrect form field with a red border only, also supplement with a text and preferably an icon.",
          "Consider offering a high contrast mode."
        ],
        "moreInfoUrl": "https://sv.wikipedia.org/wiki/Defekt_f%C3%A4rgseende",
        "moreInfoLinkText" : "Wikipedia about defective color vision"
      },
      "redGreenColorBlindness":
      {
        "simulationStatus": "Simulation active!",
        "heading": "Red-green color blindness",
        "fact": "People with lowered color vision have difficulty distinguishing some or all colors. Red-green color blindness (Protanopia and Deuteranopia) is the most common type of color blindness. It is more common among men than women. People with red-green color blindness have difficulty distinguishing the colors red, green, brown and orange.",
        "listItems": [
          "Do not use color as the only way to convey information, indicate an action or identify an element. For example, do not mark an incorrect form field with a red border only, also supplement with a text and preferably an icon.",
          "Consider offering a high contrast mode."
        ],
        "moreInfoUrl": "https://sv.wikipedia.org/wiki/Defekt_f%C3%A4rgseende",
        "moreInfoLinkText" : "Wikipedia about defective color vision"
      },
      "farsightedness":
      {
        "simulationStatus": "Simulation active!",
        "heading": "Far-sightedness",
        "fact": "Far-sightedness (Hyperopia) is one of the most common visual impairments. People with Hyperopia have difficulty focusing on objects at close range which makes them appear blurry.",
        "listItems": [
          "Avoid text in small font sizes and long texts. Use proper spacing and line height.",  
          "Make sure the website can be zoomed to at least 200%.",
          "Offer a text to speech reader."
        ],
        "moreInfoUrl": "https://webbriktlinjer.se/r/39-ge-webbplatsen-en-god-lasbarhet/",
        "moreInfoLinkText" : "Good readability"
      },
      "totalColorBlindness":
      {
        "simulationStatus": "Simulation active!",
        "heading": "Total color blindness",
        "fact": "People with lowered color vision have difficulty distinguishing some or all colors. Total color blindness (Monochromatic / Achromatopsy) is very rare. People with this visual impairment can not percieve any colors, only different shades of gray.",
        "listItems": [
          "Do not use color as the only way to convey information, indicate an action or identify an element. For example, do not mark an incorrect form field with a red border only, also supplement with a text and preferably an icon.",
          "Consider offering a high contrast mode."
        ]
      },
      "tunnelVision":
      {
        "simulationStatus": "Simulation active! move the mouse pointer on the web page and see what's happening.",
        "heading": "Tunnel Vision",
        "fact": "What is commonly called Tunnel Vision is loss of peripheral vision. This may be because the person suffers from a disease that affects the cells in the eye, but may also occur temporarily due to stress or depression.",
        "listItems": [
          "Avoid text in small font sizes and long texts. Use proper spacing and line height.",
          "Make sure the website can be zoomed to at least 200%.",
          "Offer a text to speech reader."
        ]
      },
      "sunshine":
      {
        "simulationStatus": "Simulation active!",
        "heading": "Sunshine",
        "fact": "Lorem ipsum",
        "listItems": [
          "Lorem ipsum.",
          "Lorem ipsum.",
          "Lorem ipsum"
        ]
      },
      "concentration":
      {
        "simulationStatus": "Simulation active!",
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
        "simulationStatus": "Simulation active!",
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
            { "tunnelVision": "Tunnel vision" },
            { "sunshine": "Sunshine" }
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
            { "smallVocabulary": "Small vocabulary" }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxVSVxcYXBwLmpzIiwiYnVpbGQvanMvYmFiZWwvVUkvZGF0YS9kYXRhLmpzb24iLCJidWlsZFxcanNcXGJhYmVsXFx1dGlsc1xcc2ltdWxhdGlvbkxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLElBQUksUUFBUSxRQUFRLGtCQUFSLENBQVo7O0FBRUEsSUFBSSxlQUFlLHdCQUF3QixLQUF4QixDQUFuQjs7QUFFQSxJQUFJLG9CQUFvQixRQUFRLDhCQUFSLENBQXhCOztBQUVBLElBQUksbUJBQW1CLHdCQUF3QixpQkFBeEIsQ0FBdkI7O0FBRUEsU0FBUyx1QkFBVCxDQUFpQyxHQUFqQyxFQUFzQztBQUFFLE1BQUksT0FBTyxJQUFJLFVBQWYsRUFBMkI7QUFBRSxXQUFPLEdBQVA7QUFBYSxHQUExQyxNQUFnRDtBQUFFLFFBQUksU0FBUyxFQUFiLENBQWlCLElBQUksT0FBTyxJQUFYLEVBQWlCO0FBQUUsV0FBSyxJQUFJLEdBQVQsSUFBZ0IsR0FBaEIsRUFBcUI7QUFBRSxZQUFJLE9BQU8sU0FBUCxDQUFpQixjQUFqQixDQUFnQyxJQUFoQyxDQUFxQyxHQUFyQyxFQUEwQyxHQUExQyxDQUFKLEVBQW9ELE9BQU8sR0FBUCxJQUFjLElBQUksR0FBSixDQUFkO0FBQXlCO0FBQUUsS0FBQyxPQUFPLE9BQVAsR0FBaUIsR0FBakIsQ0FBc0IsT0FBTyxNQUFQO0FBQWdCO0FBQUU7O0FBRTdRLElBQUksT0FBTyxJQUFYOztBQUVBLFNBQVMsZUFBVCxHQUEyQjs7QUFFekIsU0FBTyxPQUFQLENBQWUsS0FBZixDQUFxQixHQUFyQixDQUF5QixrQkFBekIsRUFBNkMsVUFBVSxHQUFWLEVBQWU7QUFDMUQscUJBQWlCLEtBQWpCLENBQXVCLElBQUksZ0JBQTNCO0FBQ0QsR0FGRDtBQUdEOztBQUVELFNBQVMsZUFBVCxDQUF5QixP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RCxFQUdHLEVBSEgsQ0FHTSxvQkFITixFQUc0QixZQUFZO0FBQ3RDLE1BQUUsU0FBRixFQUFhLE1BQWIsR0FBc0IsSUFBdEIsQ0FBMkIsd0JBQTNCLEVBQXFELE1BQXJEO0FBQ0QsR0FMRDtBQU1ELENBdkpEO0FBd0pBOzs7QUNyUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0V0E7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxJQUFJLG9CQUFvQixFQUF4Qjs7QUFFQSxTQUFTLElBQVQsQ0FBYyxJQUFkLEVBQW9CLE9BQXBCLEVBQTZCLFFBQTdCLEVBQXVDO0FBQ3JDLFNBQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsRUFBRSxRQUFRLElBQVYsRUFBZ0IsZUFBZSxJQUEvQixFQUFsQixFQUF5RCxVQUFVLElBQVYsRUFBZ0I7QUFDdkUsUUFBSSxZQUFZLEtBQUssQ0FBTCxDQUFoQjtBQUFBLFFBQ0ksYUFBYSxVQUFVLGlCQUFpQixJQUFqQixHQUF3QixHQUF4QixHQUE4QixPQUE5QixHQUF3QyxhQUFsRCxHQUFrRSxpQkFBaUIsSUFBakIsR0FBd0IsYUFEM0c7O0FBR0EsV0FBTyxJQUFQLENBQVksYUFBWixDQUEwQixVQUFVLEVBQXBDLEVBQXdDLEVBQUUsTUFBTSxVQUFSLEVBQXhDLEVBQThELFlBQVk7QUFDeEUsd0JBQWtCLElBQWxCLENBQXVCLElBQXZCO0FBQ0EsVUFBSSxRQUFKLEVBQWM7QUFDWixpQkFBUyxJQUFULEVBQWUsT0FBZjtBQUNEO0FBQ0YsS0FMRDtBQU1ELEdBVkQ7QUFXRDs7QUFFRCxTQUFTLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLE9BQXJCLEVBQThCO0FBQzVCLE1BQUksa0JBQWtCLFFBQWxCLENBQTJCLElBQTNCLENBQUosRUFBc0M7QUFDcEMsV0FBTyxJQUFQLENBQVksS0FBWixDQUFrQixFQUFFLFFBQVEsSUFBVixFQUFnQixlQUFlLElBQS9CLEVBQWxCLEVBQXlELFVBQVUsSUFBVixFQUFnQjtBQUN2RSxVQUFJLFlBQVksS0FBSyxDQUFMLENBQWhCOztBQUVBLGFBQU8sSUFBUCxDQUFZLFdBQVosQ0FBd0IsVUFBVSxFQUFsQyxFQUFzQyxFQUFFLFFBQVEsaUJBQVYsRUFBNkIsWUFBWSxJQUF6QyxFQUErQyxlQUFlLE9BQTlELEVBQXRDO0FBQ0QsS0FKRDtBQUtELEdBTkQsTUFNTztBQUNMLFNBQUssSUFBTCxFQUFXLE9BQVgsRUFBb0IsWUFBWTtBQUM5QixhQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEVBQUUsUUFBUSxJQUFWLEVBQWdCLGVBQWUsSUFBL0IsRUFBbEIsRUFBeUQsVUFBVSxJQUFWLEVBQWdCO0FBQ3ZFLFlBQUksWUFBWSxLQUFLLENBQUwsQ0FBaEI7O0FBRUEsZUFBTyxJQUFQLENBQVksV0FBWixDQUF3QixVQUFVLEVBQWxDLEVBQXNDLEVBQUUsUUFBUSxpQkFBVixFQUE2QixZQUFZLElBQXpDLEVBQStDLGVBQWUsT0FBOUQsRUFBdEM7QUFDRCxPQUpEO0FBS0QsS0FORDtBQU9EO0FBQ0Y7O0FBRUQsU0FBUyxJQUFULENBQWMsSUFBZCxFQUFvQixPQUFwQixFQUE2QjtBQUMzQixTQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEVBQUUsUUFBUSxJQUFWLEVBQWdCLGVBQWUsSUFBL0IsRUFBbEIsRUFBeUQsVUFBVSxJQUFWLEVBQWdCO0FBQ3ZFLFFBQUksWUFBWSxLQUFLLENBQUwsQ0FBaEI7O0FBRUEsV0FBTyxJQUFQLENBQVksV0FBWixDQUF3QixVQUFVLEVBQWxDLEVBQXNDLEVBQUUsUUFBUSxnQkFBVixFQUE0QixZQUFZLElBQXhDLEVBQThDLGVBQWUsT0FBN0QsRUFBdEM7QUFDRCxHQUpEO0FBS0Q7O0FBRUQsUUFBUSxLQUFSLEdBQWdCLEtBQWhCO0FBQ0EsUUFBUSxJQUFSLEdBQWUsSUFBZjtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9kYXRhID0gcmVxdWlyZSgnLi9kYXRhL2RhdGEuanNvbicpO1xuXG52YXIgbGFuZ3VhZ2VEYXRhID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2RhdGEpO1xuXG52YXIgX3NpbXVsYXRpb25Mb2FkZXIgPSByZXF1aXJlKCcuLi91dGlscy9zaW11bGF0aW9uTG9hZGVyLmpzJyk7XG5cbnZhciBzaW11bGF0aW9uTG9hZGVyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3NpbXVsYXRpb25Mb2FkZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG52YXIgbGFuZyA9IFwiZW5cIjtcblxuZnVuY3Rpb24gc3RhcnRTaW11bGF0aW9uKCkge1xuXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlU2ltdWxhdGlvbicsIGZ1bmN0aW9uIChvYmopIHtcbiAgICBzaW11bGF0aW9uTG9hZGVyLnN0YXJ0KG9iai5hY3RpdmVTaW11bGF0aW9uKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0U2ltdWxhdGlvbih0b29sdGlwKSB7XG5cbiAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7XG4gICAgcGF0aDogXCJpbWcvaWNvbi5wbmdcIlxuICB9KTtcblxuICB0b29sdGlwLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICQoXCIjcGFuZWwxXCIpLmFkZENsYXNzKFwiaW5cIik7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgdG9vbHRpcC5hZGRDbGFzcyhcImhpZGVcIik7XG4gIH0sIDI1MCk7XG5cbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuICAgIHNpbXVsYXRpb25Mb2FkZXIuc3RvcChvYmouYWN0aXZlU2ltdWxhdGlvbik7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKCdhY3RpdmVTaW11bGF0aW9uJyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRUZXh0cygpIHtcblxuICB2YXIgZGF0YSA9IGxhbmd1YWdlRGF0YVtsYW5nXTtcblxuICAkKFwiLm1vcmUtaW5mby1saW5rXCIpLnRleHQoZGF0YS5VSS5tb3JlSW5mbyk7XG4gICQoXCIjcmVzZXQtYnRuXCIpLnRleHQoZGF0YS5VSS5yZXNldCk7XG4gICQoXCIubmF2YmFyLWhlYWRlclwiKS50ZXh0KGRhdGEuVUkuc2VsZWN0U2ltdWxhdGlvbik7XG4gICQoXCIjYWR2aWNlLWRyb3Bkb3duXCIpLnRleHQoZGF0YS5VSS5hZHZpY2UpO1xuICAkKFwiI2luZm8tZHJvcGRvd25cIikudGV4dChkYXRhLlVJLm1vcmVJbmZvKTtcbiAgJChcIiNzaWdodFwiKS50ZXh0KGRhdGEuVUkuc2lnaHQpO1xuICAkKFwiI21vYmlsaXR5XCIpLnRleHQoZGF0YS5VSS5tb2JpbGl0eSk7XG4gICQoXCIjcmVhZFdyaXRlXCIpLnRleHQoZGF0YS5VSS5yZWFkQW5kV3JpdGUpO1xuICAkKFwiI2NvbmNlbnRyYXRpb25cIikudGV4dChkYXRhLlVJLmNvbmNlbnRyYXRpb24pO1xuXG4gICQuZWFjaChkYXRhLlVJLnNpbXVsYXRpb25zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcblxuICAgICQoJyMnICsgdmFsdWUuaGVhZGluZykudGV4dCh2YWx1ZS5oZWFkaW5nKTtcblxuICAgICQuZWFjaCh2YWx1ZS5jaG9pY2VzLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgICAgICAkKCcjJyArIGtleSkudGV4dCh2YWx1ZVtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgJCgnI3NldHRpbmdzLWhlYWRpbmcnKS50ZXh0KGRhdGEuVUkuY2hhbmdlU2V0dGluZ3MpO1xuICAkKCcjbGFuZ3VhZ2UtbGFiZWwnKS50ZXh0KGRhdGEuVUkuc2VsZWN0TGFuZ3VhZ2UpO1xuICAkKCcjYnRuLXNhdmUtc2V0dGluZ3MnKS50ZXh0KGRhdGEuVUkuc2F2ZVNldHRpbmdzKTtcbiAgJCgnI2J0bi1jYW5jZWwtc2V0dGluZ3MnKS50ZXh0KGRhdGEuVUkuY2FuY2VsKTtcbn1cblxuZnVuY3Rpb24gc2V0VG9vbHRpcFRleHRzKGFjdGl2ZVNpbXVsYXRpb24pIHtcblxuICB2YXIgZGF0YSA9IGxhbmd1YWdlRGF0YVtsYW5nXTtcblxuICB2YXIgc2ltdWxhdGlvblN0YXR1cyA9ICQoXCIuc2ltdWxhdGlvbi1zdGFydGVkLXBhcmFncmFwaFwiKTtcbiAgdmFyIHNpbXVsYXRpb25TdGF0dXNBbGVydCA9ICQoXCIuc2ltdWxhdGlvbi1zdGFydGVkLWFsZXJ0XCIpO1xuICB2YXIgaW5mb0hlYWRpbmcgPSAkKFwiLmRpc2FiaWxpdHktaW5mby1oZWFkaW5nXCIpO1xuICB2YXIgaW5mb1BhcmFncmFwaCA9ICQoXCIuZGlzYWJpbGl0eS1pbmZvLXBhcmFncmFwaFwiKTtcbiAgdmFyIGFkdmljZUxpc3QgPSAkKFwiLmFkdmljZS1saXN0XCIpO1xuICB2YXIgbW9yZUluZm9MaW5rID0gJChcIi5tb3JlLWluZm8tbGlua1wiKTtcbiAgdmFyIG1vcmVJbmZvUGFuZWwgPSAkKCcjbW9yZS1pbmZvLXBhbmVsJyk7XG4gIHZhciB0ZXh0cyA9IGRhdGEuZmFjdHNbYWN0aXZlU2ltdWxhdGlvbl07XG5cbiAgc2ltdWxhdGlvblN0YXR1cy5lbXB0eSgpO1xuICBpbmZvSGVhZGluZy5lbXB0eSgpO1xuICBpbmZvUGFyYWdyYXBoLmVtcHR5KCk7XG4gIGFkdmljZUxpc3QuZW1wdHkoKTtcbiAgbW9yZUluZm9MaW5rLmVtcHR5KCk7XG5cbiAgc2ltdWxhdGlvblN0YXR1cy50ZXh0KHRleHRzLnNpbXVsYXRpb25TdGF0dXMpO1xuICBzaW11bGF0aW9uU3RhdHVzQWxlcnQucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuXG4gIGluZm9IZWFkaW5nLnRleHQodGV4dHMuaGVhZGluZyk7XG4gIGluZm9QYXJhZ3JhcGgudGV4dCh0ZXh0cy5mYWN0KTtcblxuICAkLmVhY2godGV4dHMubGlzdEl0ZW1zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICBhZHZpY2VMaXN0LmFwcGVuZCgnPGxpPicgKyB2YWx1ZSArICc8L2xpPicpO1xuICB9KTtcblxuICBpZiAodGV4dHMubW9yZUluZm9VcmwgIT09IHVuZGVmaW5lZCkge1xuICAgIG1vcmVJbmZvUGFuZWwucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgbW9yZUluZm9MaW5rLmFwcGVuZCh0ZXh0cy5tb3JlSW5mb0xpbmtUZXh0KTtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyAnbGlua1VybCc6IHRleHRzLm1vcmVJbmZvVXJsIH0pO1xuICB9IGVsc2Uge1xuICAgIG1vcmVJbmZvUGFuZWwuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gIH1cbn1cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gIHZhciB0b29sdGlwID0gJChcIi50b29sLXRpcFwiKTtcblxuICB2YXIgYWN0aXZlU2ltdWxhdGlvbiA9IHZvaWQgMDtcblxuICAvL2Nocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnbGFuZycsIG9iaiA9PiB7XG5cbiAgbGFuZyA9ICdlbic7XG5cbiAgc2V0VGV4dHMoKTtcblxuICAvL30pO1xuXG4gIC8vIFNldCBhY3RpdmUgc3RhdGVcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuXG4gICAgYWN0aXZlU2ltdWxhdGlvbiA9IG9iai5hY3RpdmVTaW11bGF0aW9uO1xuXG4gICAgaWYgKGFjdGl2ZVNpbXVsYXRpb24pIHtcbiAgICAgIHRvb2x0aXAuYWRkQ2xhc3MoXCJpblwiKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG4gICAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAgIHNldFRvb2x0aXBUZXh0cyhhY3RpdmVTaW11bGF0aW9uKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIE1haW4gdmlld1xuICAkKFwiLm1lbnUtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBtZW51QnRuID0gJCh0aGlzKTtcbiAgICB2YXIgbWVudUJ0bklkID0gbWVudUJ0blswXS5pZDtcblxuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEljb24oe1xuICAgICAgcGF0aDogXCJpbWcvaWNvbl9hY3RpdmUucG5nXCJcbiAgICB9KTtcblxuICAgIGFjdGl2ZVNpbXVsYXRpb24gPSBtZW51QnRuSWQ7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgJ2FjdGl2ZVNpbXVsYXRpb24nOiBtZW51QnRuSWQgfSk7XG5cbiAgICBzZXRUb29sdGlwVGV4dHMoYWN0aXZlU2ltdWxhdGlvbik7XG5cbiAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAkKCcjcGFuZWwyJykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuICAgIHRvb2x0aXAucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwyJykuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICB9LCAxMDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzdGFydFNpbXVsYXRpb24oKTtcbiAgICB9LCA1MDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwyJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAgIHRvb2x0aXAuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICB9LCAxMDAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMicpLmFkZENsYXNzKFwiaGlkZVwiKTtcbiAgICB9LCAxNTAwKTtcbiAgfSk7XG5cbiAgJChcIi5naXRodWItbGlua1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiAnaHR0cHM6Ly9naXRodWIuY29tL01ldGFtYXRyaXgvV2ViLURpc2FiaWxpdHktU2ltdWxhdG9yJyB9KTtcbiAgfSk7XG5cbiAgJCgnLnNldHRpbmdzLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnbGFuZycsIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICQoJyNsYW5ndWFnZScpLnZhbChvYmoubGFuZyk7XG4gICAgfSk7XG5cbiAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAkKCcjc2V0dGluZ3MnKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNzZXR0aW5ncycpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgfSwgMjUwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMScpLmFkZENsYXNzKFwiaGlkZVwiKTtcbiAgICB9LCA1MDApO1xuICB9KTtcblxuICAvLyBTZXR0aW5ncyB2aWV3XG5cbiAgLyogJCgnI2J0bi1zYXZlLXNldHRpbmdzJykub24oJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgXG4gICAgIHZhciBzZWxlY3RlZExhbmcgPSAkKCcjbGFuZ3VhZ2UnKS52YWwoKTtcclxuICBcbiAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsnbGFuZyc6IHNlbGVjdGVkTGFuZ30pO1xyXG4gIFxuICAgICBsYW5nID0gc2VsZWN0ZWRMYW5nO1xyXG4gIFxuICAgICBzZXRUZXh0cygpO1xyXG4gIFxuICAgICAkKCcjc2V0dGluZ3MnKS5yZW1vdmVDbGFzcyhcImluXCIpO1xyXG4gICAgICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XHJcbiAgXG4gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgJCgnI3BhbmVsMScpLmFkZENsYXNzKFwiaW5cIik7XHJcbiAgICAgfSwgNTAwKTtcclxuICBcbiAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAkKCcjc2V0dGluZ3MnKS5hZGRDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgfSwgNzUwKTtcclxuICBcbiAgIH0pO1xyXG4gIFxuICAgJCgnI2J0bi1jYW5jZWwtc2V0dGluZ3MnKS5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICBcbiAgICAgJCgnI3NldHRpbmdzJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcclxuICAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xyXG4gIFxuICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICQoJyNwYW5lbDEnKS5hZGRDbGFzcyhcImluXCIpO1xyXG4gICAgIH0sIDI1MCk7XHJcbiAgXG4gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgJCgnI3NldHRpbmdzJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgIH0sIDUwMCk7XHJcbiAgXG4gICB9KTsqL1xuXG4gIC8vIFRvb2x0aXAgdmlld1xuXG4gICQoXCIuc2ltdWxhdGlvbi1zdGFydGVkLWFsZXJ0IC5jbG9zZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJChcIi5zaW11bGF0aW9uLXN0YXJ0ZWQtYWxlcnRcIikuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICB9KTtcblxuICAkKFwiI3Jlc2V0LWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgcmVzZXRTaW11bGF0aW9uKHRvb2x0aXApO1xuICB9KTtcblxuICAkKFwiLm1vcmUtaW5mby1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2xpbmtVcmwnLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6ICcnICsgb2JqLmxpbmtVcmwgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vcGFuZWwgY29sbGFwc2UsIHNob3cgYXJyb3dzOiBcbiAgJCgnLmNvbGxhcHNlJykub24oJ3Nob3duLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coJ2NvbGxhcHNlIScsIGV2ZW50LnRhcmdldCk7XG4gICAgJChcIi5kb3duLWFycm93LCAudXAtYXJyb3dcIikudG9nZ2xlKCk7XG4gIH0pLm9uKCdoaWRkZW4uYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh1bmRlZmluZWQpLnBhcmVudCgpLmZpbmQoXCIuZG93bi1hcnJvdywgLnVwLWFycm93XCIpLnRvZ2dsZSgpO1xuICB9KTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gIFwic3ZcIjpcclxuICB7XHJcbiAgICBcImZhY3RzXCI6IHtcclxuICAgICAgXCJkeXNsZXhpYVwiOiBcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiRHlzbGV4aVwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkR5c2xleGkgw6RyIGVuIG5lZHPDpHR0bmluZyBzb20gZ8O2ciBhdHQgaGrDpHJuYW4gaGFyIHN2w6VydCBhdHQgYXV0b21hdGlzZXJhIHRvbGtuaW5nZW4gYXYgb3JkLiBEZXR0YSBnw7ZyIGF0dCBwZXJzb25lciBtZWQgZGVubmEgbmVkc8OkdHRuaW5nIGthbiBoYSBzdsOlcnQgYXR0IGzDpHNhIG9jaCBza3JpdmEuIER5c2xleGkgw6RyIGludGUga29wcGxhdCB0aWxsIHN5biBlbGxlciBpbnRlbGxpZ2Vucy4gT3JzYWtlcm5hIHRpbGwgZHlzbGV4aSDDpHIgZm9ydGZhcmFuZGUgb2tsYXJ0LlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrIG9jaCBsw6VuZ2EgdGV4dGVyLiBTZSB0aWxsIGF0dCBoYSBvcmRlbnRsaWd0IG1lZCByYWRhdnN0w6VuZC5cIiwgXHRcclxuICAgICAgICAgIFwiVW5kdmlrIHN2w6VyYSBvcmQgb2NoIGZhY2t0ZXJtZXIuXCIsXHJcbiAgICAgICAgICBcIkVyYmp1ZCBsw6R0dGzDpHN0YSB2ZXJzaW9uZXIgYXYgZmFja3RleHRlci5cIixcclxuICAgICAgICAgIFwiVW5kdmlrIHR5cHNuaXR0IG1lZCBrcsOlbmdsaWdhIG9jaCBrb21wbGV4YSBmaWd1cmVyLlwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGFya2luc29uc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiEgcsO2ciBtdXNwZWthcmVuIHDDpSB3ZWJicGxhdHNlbiBvY2ggc2UgdmFkIHNvbSBow6RuZGVyLlwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlBhcmtpbnNvbnNcIixcclxuICAgICAgICBcImZhY3RcIjogXCJWaWQgUGFya2luc29ucyBzanVrZG9tIGbDtnJzdMO2cnMgY2VsbGVybmEgaSBoasOkcm5hbiBzb20gdGlsbHZlcmthciBkb3BhbWluIHZpbGtldCBnw7ZyIGF0dCBoasOkcm5hbiBmw6VyIGVuIG5lZHNhdHQgZsO2cm3DpWdhIGF0dCBza2lja2Egc2lnbmFsZXIuIFBlcnNvbmVyIG1lZCBQYXJraW5zb25zIGthbiBkcmFiYmFzIGF2IHN5bXB0b20gc29tIHNrYWtuaW5nYXIsIHN0ZWxhIG11c2tsZXIgb2NoIHPDpG1yZSByw7ZyZWxzZWbDtnJtw6VnYS4gT3JzYWtlcm5hIHRpbGwgUGFya2luc29ucyBzanVrZG9tIMOkciBmb3J0ZmFyYW5kZSBva2xhcnQuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJTZSB0aWxsIGF0dCB3ZWJicGxhdHNlbiBrYW4gYW52w6RuZGFzIG1lZCBhbmRyYSBoasOkbHBtZWRlbCDDpG4gbXVzLCB0aWxsIGV4ZW1wZWwgdGFuZ2VudGJvcmRzbmF2aWdlcmluZy5cIiwgXHRcclxuICAgICAgICAgIFwiSGEgdGlsbHLDpGNrbGlndCBtZWQgbHVmdCBtZWxsYW4ga29tcG9uZW50ZXJcIixcclxuICAgICAgICAgIFwiSGEgdGlsbHLDpGNrbGlndCBzdG9yYSBrbGlja3l0b3IuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwOi8vd3d3LnBhcmtpbnNvbmZvcmJ1bmRldC5zZVwiLFxyXG4gICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJQYXJraW5zb25zZsO2cmJ1bmRldFwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgZGVmZWt0IGbDpHJnc2VlbmRlIGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6Ugdmlzc2EgZWxsZXIgYWxsYSBmw6RyZ2VyLiBFdHQgZnVsbHQgZnVuZ2VyYW5kZSDDtmdhIGhhciB0cmUgb2xpa2EgdGFwcGFyIHNvbSB0YXIgdXBwIGbDpHJnZXJuYSB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gTsOkciBlbiBlbGxlciBmbGVyYSBhdiB0YXBwYXJuYSBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEgbGVkZXIgZGV0IHRpbGwgZGVmZWt0IGbDpHJnc2VlbmRlLiBHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0IChUcml0YW5vcGkpIMOkciBzw6RsbHN5bnQuIE5hbW5ldCDDpHIgbWlzc2xlZGFuZGUgZMOlIGRldCBpbnRlIMOkciBmw6RyZ2VybmEgZ3VsIG9jaCBibMOlIHNvbSBmw7ZydsOkeGxhcywgdXRhbiBibMOlIG1lZCBncsO2biBvY2ggZ3VsIG1lZCBsaWxhLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBkZXQgZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCBlbiByw7ZkIHJhbSB1dGFuIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IG9jaCBnw6RybmEgZW4gaWtvbi5cIiwgXHRcclxuICAgICAgICAgIFwiRXJianVkIGfDpHJuYSBldHQgaMO2Z2tvbnRyYXN0LWzDpGdlLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cHM6Ly9zdi53aWtpcGVkaWEub3JnL3dpa2kvRGVmZWt0X2YlQzMlQTRyZ3NlZW5kZVwiLFxyXG4gICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJXaWtpcGVkaWEgb20gZGVmZWt0IGbDpHJnc2VlbmRlXCJcclxuICAgICAgfSxcclxuICAgICAgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlLDtmQtZ3LDtm4gZsOkcmdibGluZGhldFwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBkZWZla3QgZsOkcmdzZWVuZGUgaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0YXBwYXIgc29tIHRhciB1cHAgZsOkcmdlcm5hIHZpb2xldHQsIGdyw7ZuIG9jaCByw7ZkLiBOw6RyIGVuIGVsbGVyIGZsZXJhIGF2IHRhcHBhcm5hIHNha25hcyBlbGxlciDDpHIgZGVmZWt0YSBsZWRlciBkZXQgdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUuIFLDtmQtZ3LDtm4gZsOkcmdibGluZGhldCAoUHJvdGFub3BpIG9jaCBEZXV0ZXJhbm9waSkgw6RyIGRlbiB2YW5saWdhc3RlIHR5cGVuIGF2IGbDpHJnYmxpbmRoZXQuIERlbiDDpHIgdmFubGlnYXJlIGhvcyBtw6RuIMOkbiBrdmlubm9yLiBQZXJzb25lciByw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXQgaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSBmw6RyZ2VybmEgcsO2ZCwgZ3LDtm4sIGJydW4gb2NoIG9yYW5nZS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBcclxuICAgICAgICBbXCJBbnbDpG5kIGludGUgZsOkcmcgc29tIGVuZGEgc8OkdHRldCBhdHQgZsO2cm1lZGxhIGluZm9ybWF0aW9uLCBpbmRpa2VyYSBlbiBoYW5kbGluZyBlbGxlciBpZGVudGlmaWVyYSBldHQgZWxlbWVudC4gTWFya2VyYSB0aWxsIGV4ZW1wZWwgaW50ZSBldHQgZmVsYWt0aWd0IGZvcm11bMOkcmbDpGx0IGVuZGFzdCBtZWQgcsO2ZCByYW0sIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IG9jaCBnw6RybmEgZW4gIGlrb24uXCIsIFwiRXJianVkIGfDpHJuYSBldHQgaMO2Z2tvbnRyYXN0LWzDpGdlLlwiXSxcclxuICAgICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cHM6Ly9zdi53aWtpcGVkaWEub3JnL3dpa2kvRGVmZWt0X2YlQzMlQTRyZ3NlZW5kZVwiLFxyXG4gICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJXaWtpcGVkaWEgb20gZGVmZWt0IGbDpHJnc2VlbmRlXCJcclxuICAgICAgfSxcclxuICAgICAgXCJmYXJzaWdodGVkbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJMw6VuZ3N5bnRoZXRcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgSHlwZXJvcGkgc2VyIHN1ZGRpZ3QgcMOlIG7DpHJhIGjDpWxsLCBtZW4gYnJhIHDDpSBsw6VuZ3QgaMOlbGwuIE5lZHPDpHR0bmluZ2VuIHVwcHN0w6VyIHDDpSBncnVuZCBhdiBhdHQgbGp1c2V0IGludGUgYnJ5dHMgcsOkdHQgaSDDtmdhdC4gRGV0IMOkciBlbiBhdiBkZSB2YW5saWdhc3RlIHN5bm5lZHPDpHR0bmluZ2FybmEuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJVbmR2aWsgdGV4dCBpIGxpdGVuIHN0b3JsZWsuXCIsIFx0XHJcbiAgICAgICAgICBcIldlYmJzaWRhbiBza2EgZ8OlIGF0dCBmw7Zyc3RvcmEgKHpvb21hcykgdGlsbCBtaW5zdCAyMDAgJSBzw6UgYXR0IGJlc8O2a2FyZW4ga2FuIGFucGFzc2EgaW5uZWjDpWxsZXRzIHN0b3JsZWsgZWZ0ZXIgc2luYSBiZWhvdi5cIixcclxuICAgICAgICAgIFwiRXJianVkIHVwcGzDpHNuaW5nIGF2IGlubmVow6VsbGV0LlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cHM6Ly93ZWJicmlrdGxpbmplci5zZS9yLzM5LWdlLXdlYmJwbGF0c2VuLWVuLWdvZC1sYXNiYXJoZXQvXCIsXHJcbiAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldlYmJyaWt0bGluamUgR2Ugd2ViYnBsYXRzZW4gZ29kIGzDpHNiYXJoZXRcIlxyXG4gICAgICB9LFxyXG4gICAgICBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiSGVsdCBmw6RyZ2JsaW5kXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiRGVmZWt0IGbDpHJnc2VlbmRlIGlubmViw6RyIGF0dCBlbiBwZXJzb24gaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0eXBlciBhdiB0YXBwYXIgc29tIHRhciB1cHAgb2xpa2EgZsOkcmdlcjogdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE9yc2FrZW4gdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUgw6RyIGF0dCBlbiBlbGxlciBmbGVyYSBhdiBkZXNzYSB0eXBlciBhdiB0YXBwYXIgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhLiBIZWx0IGbDpHJnYmxpbmQgKE1vbm9rcm9tYXNpL2Frcm9tYXRvcHNpKSDDpHIgbXlja2V0IHPDpGxsc3ludC4gUGVyc29uZXIgbWVkIGRlbm5hIHN5bm5lZHPDpHR0bmluZyBzZXIgaW5nYSBmw6RyZ2VyIHV0YW4gc2VyIGVuZGFzdCBpIGdyw6Vza2FsYS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZGV0IGVuZGEgc8OkdHRldCBhdHQgZsO2cm1lZGxhIGluZm9ybWF0aW9uLCBpbmRpa2VyYSBlbiBoYW5kbGluZyBlbGxlciBpZGVudGlmaWVyYSBlbGVtZW50LiBNYXJrZXJhIHQuZXguIGludGUgZXR0IGZlbGFrdGlndCBmb3JtdWzDpHJmw6RsdCBlbmRhc3QgbWVkIHLDtmQgcmFtLCBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBlbGxlciBpa29uLlwiLCBcdFxyXG4gICAgICAgICAgXCJEZXQga2FuIHZhcmEgZW4gYnJhIGlkw6kgYXR0IGVyYmp1ZGEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJ0dW5uZWxWaXNpb25cIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhIHLDtnIgbXVzcGVrYXJlbiBww6Ugd2ViYnBsYXRzZW4gb2NoIHNlIHZhZCBzb20gaMOkbmRlci5cIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJUdW5uZWxzZWVuZGVcIixcclxuICAgICAgICBcImZhY3RcIjogXCJEZXQgc29tIGkgZGFnbGlndCB0YWwgYnJ1a2FyIGthbGxhcyB0dW5uZWxzZWVuZGUgw6RyIGVuIHN5bm5lZHPDpHR0bmluZyBzb20gZ8O2ciBhdHQgZW5kYXN0IGVuIGRlbCBhdiBzeW5mw6RsdGV0IGthbiBzZXMuIERldHRhIGthbiBiZXJvIHDDpSBhdHQgcGVyc29uZW4gbGlkZXIgYXYgZW4gc2p1a2RvbSBzb20gZ8O2ciBhdHQgY2VsbGVybmEgaSDDtmdhdCBmw7Zyc3TDtnJzIG1lbiBkZW5uYSB0eXAgYXYgc3lubmVkc8OkdHRuaW5nIGthbiBvY2tzw6UgdGlsbGbDpGxsaWd0IHVwcHN0w6UgcMOlIGdydW5kIGF2IHN0cmVzcyBlbGxlciBkZXByZXNzaW9uLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrLlwiLFxyXG4gICAgICAgICAgXCJXZWJic2lkYW4gc2thIGfDpSBhdHQgZsO2cnN0b3JhICh6b29tYXMpIHRpbGwgbWluc3QgMjAwICUgc8OlIGF0dCBiZXPDtmthcmVuIGthbiBhbnBhc3NhIGlubmVow6VsbGV0cyBzdG9ybGVrIGVmdGVyIHNpbmEgYmVob3YuXCIsXHJcbiAgICAgICAgICBcIkVyYmp1ZCB1cHBsw6RzbmluZyBhdiBpbm5laMOlbGxldC5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJzdW5zaGluZVwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJTb2xza2VuXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiTG9yZW0gaXBzdW1cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkxvcmVtIGlwc3VtLlwiLFxyXG4gICAgICAgICAgXCJMb3JlbSBpcHN1bS5cIixcclxuICAgICAgICAgIFwiTG9yZW0gaXBzdW1cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJjb25jZW50cmF0aW9uXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIktvbmNlbnRyYXRpb25cIixcclxuICAgICAgICBcImZhY3RcIjogXCJBbGxhIGthbiBoYSBzdsOlcnQgYXR0IGtvbmNlbnRyZXJhIHNpZyBtZW4gZsO2ciB2aXNzYSBrYW4gZGV0IGJsaSBldHQgc3RvcnQgcHJvYmxlbSBpIHZhcmRhZ3NsaXZldC4gRGVzc2EgZnVua3Rpb25zbmVkc8OkdHRuaW5nYXIga2FuIG9yc2FrYSBzdsOlcmlnaGV0ZXIgbWVkIGF0dCBoYW50ZXJhIGludHJ5Y2ssIHNvcnRlcmEgaW5mb3JtYXRpb24gb2NoIGxqdWRrw6Ruc2xpZ2hldC5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkdlIHdlYmJwbGF0c2VuIGVuIGVua2VsIG9jaCBsdWZ0aWcgZGVzaWduLlwiLFxyXG4gICAgICAgICAgXCJWYXIgZsO2cnNpa3RpZyBtZWQgYW5pbWF0aW9uZXIgb2NoIHN0YXJrYSBmw6RyZ2VyLlwiLFxyXG4gICAgICAgICAgXCJVbmR2aWsgYXR0IGhhIGbDtnIgbXlja2V0IGlubmVow6VsbCBww6Ugc2FtbWEgc2lkYS5cIixcclxuICAgICAgICAgIFwiRXJianVkIGxqdWQtIG9jaCB2aWRlby1hbGVybmF0aXYgdGlsbCB0ZXh0aW5uZWjDpWxsLlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJMaXRldCBvcmRmw7ZycsOlZFwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkVuIHN0b3IgZGVsIGF2IGpvcmRlbnMgYmVmb2xrbmluZyBrYW4gaW50ZSBsw6RzYSBhbGxzIG9jaCBtw6VuZ2EgdnV4bmEgbMOkc2VyIGludGUgc8OlIGJyYSBzb20gZsO2cnbDpG50YXMgZWZ0ZXIgZ3J1bmRza29sZXV0YmlsZG5pbmdlbi5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIlVuZHZpayBrcsOlbmdsaWdhIG9yZCBvY2ggZmFja3Rlcm1lci5cIiwgICBcclxuICAgICAgICAgIFwiRXJianVkIGzDpHR0bMOkc3QgdmVyc2lvbiBhdiBrcsOlbmdsaWdhIHRleHRlci5cIixcclxuICAgICAgICAgIFwiRXJianVkIHRleHRlciBww6Ugb2xpa2Egc3Byw6VrLlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJVSVwiOiB7XHJcbiAgICAgIFwic2VsZWN0U2ltdWxhdGlvblwiOiBcIlbDpGxqIHNpbXVsZXJpbmc6XCIsXHJcbiAgICAgIFwicmVzZXRcIjogXCLDhXRlcnN0w6RsbFwiLFxyXG4gICAgICBcImFkdmljZVwiOiBcIlTDpG5rIHDDpSBkZXR0YVwiLFxyXG4gICAgICBcIm1vcmVJbmZvXCI6IFwiTWVyIGluZm9ybWF0aW9uXCIsXHJcbiAgICAgIFwic2lnaHRcIjogXCJTeW5cIixcclxuICAgICAgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6IFwiSGVsdCBmw6RyZ2JsaW5kXCIsXHJcbiAgICAgIFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6IFwiR3VsLWJsw6UgZsOkcmdibGluZGhldFwiLCAgICBcclxuICAgICAgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6IFwiUsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0XCIsXHJcbiAgICAgIFwiZmFyc2lnaHRlZG5lc3NcIjogXCJMw6VuZ3N5bnRoZXQsIMO2dmVyc3ludGhldFwiLFxyXG4gICAgICBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbHNlZW5kZVwiLFxyXG4gICAgICBcIm1vYmlsaXR5XCI6IFwiTW90b3Jpa1wiLFxyXG4gICAgICBcInBhcmtpbnNvbnNcIjogXCJQYXJraW5zb25zXCIsXHJcbiAgICAgIFwicmVhZEFuZFdyaXRlXCI6IFwiTMOkc2Egb2NoIHNrcml2YVwiLFxyXG4gICAgICBcImR5c2xleGlhXCI6IFwiRHlzbGV4aVwiLFxyXG4gICAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOiBcIkxpdGV0IG9yZGbDtnJyw6VkXCIsXHJcbiAgICAgIFwiY29uY2VudHJhdGlvblwiOiBcIktvbmNlbnRyYXRpb25cIixcclxuICAgICAgXCJjaGFuZ2VTZXR0aW5nc1wiOiBcIkNoYW5nZSBzZXR0aW5nc1wiLFxyXG4gICAgICBcInNlbGVjdExhbmd1YWdlXCI6IFwiU2VsZWN0IGxhbmd1YWdlXCIsXHJcbiAgICAgIFwic2F2ZVNldHRpbmdzXCI6IFwiU2F2ZSBzZXR0aW5nc1wiLFxyXG4gICAgICBcImNhbmNlbFwiOiBcIkNhbmNlbFwiLFxyXG4gICAgICBcInNpbXVsYXRpb25zXCI6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJTeW5cIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXHJcbiAgICAgICAgICAgIHsgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6IFwiSGVsdCBmw6RyZ2JsaW5kXCIgfSxcclxuICAgICAgICAgICAgeyBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIiB9LFxyXG4gICAgICAgICAgICB7IFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOiBcIlLDtmQtZ3LDtm4gZsOkcmdibGluZGhldFwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJmYXJzaWdodGVkbmVzc1wiOiBcIkzDpW5nc3ludGhldCwgw7Z2ZXJzeW50aGV0XCIgfSxcclxuICAgICAgICAgICAgeyBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbHNlZW5kZVwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJzdW5zaGluZVwiOiBcIlNvbHNrZW5cIiB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJNb3RvcmlrXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogWyBcclxuICAgICAgICAgICAgeyBcInBhcmtpbnNvbnNcIjogXCJQYXJraW5zb25zXCIgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIkzDpHNhIG9jaCBza3JpdmFcIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXHJcbiAgICAgICAgICAgIHsgXCJkeXNsZXhpYVwiOiBcIkR5c2xleGlcIiB9LFxyXG4gICAgICAgICAgICB7IFwic21hbGxWb2NhYnVsYXJ5XCI6IFwiTGl0ZXQgb3JkZsO2cnLDpWRcIiB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJLb25jZW50cmF0aW9uXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIk1pbm5lXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW11cclxuICAgICAgICB9XHJcblxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfSxcclxuICBcImVuXCI6XHJcbiAge1xyXG4gICAgXCJmYWN0c1wiOiB7XHJcbiAgICAgIFwiZHlzbGV4aWFcIjogXHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJEeXNsZXhpYVwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkR5c2xleGlhIGlzIGEgZGlzYWJpbGl0eSB0aGF0IG1ha2VzIGl0IGRpZmZpY3VsdCBmb3IgdGhlIGJyYWluIHRvIGF1dG9tYXRlIHRoZSBpbnRlcnByZXRhdGlvbiBvZiB3b3Jkcy4gVGhpcyBtYWtlcyBpdCBoYXJkIGZvciBwZW9wbGUgd2l0aCB0aGlzIGRpc2FiaWxpdHkgdG8gcmVhZCBhbmQgd3JpdGUuIER5c2xleGlhIGlzIGhhcyBubyBjb25uZWN0aW9uIHdpdGggdmlzaW9uIG9yIGludGVsbGlnZW5jZS4gVGhlIGNhdXNlcyBvZiBkeXNsZXhpYSBhcmUgc3RpbGwgdW5jbGVhci5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkF2b2lkIHRleHQgaW4gc21hbGwgZm9udCBzaXplcyBhbmQgbG9uZyB0ZXh0cy4gVXNlIHByb3BlciBzcGFjaW5nIGFuZCBsaW5lIGhlaWdodC5cIixcclxuICAgICAgICAgIFwiQXZvaWQgZGlmZmljdWx0IHdvcmRzIGFuZCB0ZXJtcy5cIixcclxuICAgICAgICAgIFwiT2ZmZXIgZWFzeSB0byByZWFkIHRleHRzLCBpbWFnZXMsIHZpZGVvIG9yIGF1ZGlvIGFsdGVybmF0aXZlcy5cIixcclxuICAgICAgICAgIFwiQXZvaWQgZm9udHMgd2l0aCBjb21wbGljYXRlZCBhbmQgY29tcGxleCBjaGFyYWN0ZXJzLlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhcmtpbnNvbnNcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlISBtb3ZlIHRoZSBtb3VzZSBwb2ludGVyIG9uIHRoZSB3ZWIgcGFnZSBhbmQgc2VlIHdoYXQncyBoYXBwZW5pbmcuXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiUGFya2luc29uc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBhcmtpbnNvbidzIGRpc2Vhc2UgZGVzdHJveXMgdGhlIGNlbGxzIGluIHRoZSBicmFpbiB0aGF0IHByb2R1Y2UgZG9wYW1pbmUsIHdoaWNoIGNhdXNlcyB0aGUgYnJhaW4gdG8gaGF2ZSBhIHJlZHVjZWQgYWJpbGl0eSB0byBzZW5kIHNpZ25hbHMuIFBlcnNvbnMgd2l0aCBQYXJraW5zb24ncyBtYXkgc3VmZmVyIGZyb20gc3ltcHRvbXMgc3VjaCBhcyBzaGFraW5nLCBzdGlmZiBtdXNjbGVzLCBhbmQgcmVkdWNlZCBtb2JpbGl0eS4gVGhlIGNhdXNlcyBvZiBQYXJraW5zb24ncyBkaXNlYXNlIGFyZSBzdGlsbCB1bmNsZWFyLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiTWFrZSBzdXJlIHRoZSB3ZWJzaXRlIGNhbiBiZSB1c2VkIHdpdGggb3RoZXIgdG9vbHMgb3RoZXIgdGhhbiBhIG1vdXNlLCBzdWNoIGFzIGtleWJvYXJkIG5hdmlnYXRpb24uXCIsXHJcbiAgICAgICAgICBcIkhhdmUgZW5vdWdoIHNwYWNlIGJldHdlZW4gY29tcG9uZW50cy5cIixcclxuICAgICAgICAgIFwiTWFrZSBzdXJlIGNsaWNrIGFyZWFzIGFyZSBiaWcgZW5vdWdoLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvVXJsXCI6IFwiaHR0cDovL3d3dy5wYXJraW5zb25mb3JidW5kZXQuc2VcIixcclxuICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiUGFya2luc29uJ3MgQXNzb2NpYXRpb25cIlxyXG4gICAgICB9LFxyXG4gICAgICBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiWWVsbG93LWJsdWUgY29sb3IgYmxpbmRuZXNzXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVvcGxlIHdpdGggbG93ZXJlZCBjb2xvciB2aXNpb24gaGF2ZSBkaWZmaWN1bHR5IGRpc3Rpbmd1aXNoaW5nIHNvbWUgb3IgYWxsIGNvbG9ycy4gWWVsbG93LWJsdWUgY29sb3IgYmxpbmRuZXNzIChUcml0YW5vcGlhKSBpcyByYXJlLiBUaGUgbmFtZSBjYW4gYmUgbWlzbGVhZGluZy4gSXQncyBub3QgdGhlIGNvbG9ycyB5ZWxsb3cgYW5kIGJsdWUgdGhhdCBhcmUgY29uZnVzZWQgYnV0IGJsdWUgd2l0aCBncmVlbiBhbmQgeWVsbG93IHdpdGggcHVycGxlLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiRG8gbm90IHVzZSBjb2xvciBhcyB0aGUgb25seSB3YXkgdG8gY29udmV5IGluZm9ybWF0aW9uLCBpbmRpY2F0ZSBhbiBhY3Rpb24gb3IgaWRlbnRpZnkgYW4gZWxlbWVudC4gRm9yIGV4YW1wbGUsIGRvIG5vdCBtYXJrIGFuIGluY29ycmVjdCBmb3JtIGZpZWxkIHdpdGggYSByZWQgYm9yZGVyIG9ubHksIGFsc28gc3VwcGxlbWVudCB3aXRoIGEgdGV4dCBhbmQgcHJlZmVyYWJseSBhbiBpY29uLlwiLFxyXG7CoMKgwqDCoMKgwqDCoMKgwqDCoFwiQ29uc2lkZXIgb2ZmZXJpbmcgYSBoaWdoIGNvbnRyYXN0IG1vZGUuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwczovL3N2Lndpa2lwZWRpYS5vcmcvd2lraS9EZWZla3RfZiVDMyVBNHJnc2VlbmRlXCIsXHJcbiAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldpa2lwZWRpYSBhYm91dCBkZWZlY3RpdmUgY29sb3IgdmlzaW9uXCJcclxuICAgICAgfSxcclxuICAgICAgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJSZWQtZ3JlZW4gY29sb3IgYmxpbmRuZXNzXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVvcGxlIHdpdGggbG93ZXJlZCBjb2xvciB2aXNpb24gaGF2ZSBkaWZmaWN1bHR5IGRpc3Rpbmd1aXNoaW5nIHNvbWUgb3IgYWxsIGNvbG9ycy4gUmVkLWdyZWVuIGNvbG9yIGJsaW5kbmVzcyAoUHJvdGFub3BpYSBhbmQgRGV1dGVyYW5vcGlhKSBpcyB0aGUgbW9zdCBjb21tb24gdHlwZSBvZiBjb2xvciBibGluZG5lc3MuIEl0IGlzIG1vcmUgY29tbW9uIGFtb25nIG1lbiB0aGFuIHdvbWVuLiBQZW9wbGUgd2l0aCByZWQtZ3JlZW4gY29sb3IgYmxpbmRuZXNzIGhhdmUgZGlmZmljdWx0eSBkaXN0aW5ndWlzaGluZyB0aGUgY29sb3JzIHJlZCwgZ3JlZW4sIGJyb3duIGFuZCBvcmFuZ2UuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJEbyBub3QgdXNlIGNvbG9yIGFzIHRoZSBvbmx5IHdheSB0byBjb252ZXkgaW5mb3JtYXRpb24sIGluZGljYXRlIGFuIGFjdGlvbiBvciBpZGVudGlmeSBhbiBlbGVtZW50LiBGb3IgZXhhbXBsZSwgZG8gbm90IG1hcmsgYW4gaW5jb3JyZWN0IGZvcm0gZmllbGQgd2l0aCBhIHJlZCBib3JkZXIgb25seSwgYWxzbyBzdXBwbGVtZW50IHdpdGggYSB0ZXh0IGFuZCBwcmVmZXJhYmx5IGFuIGljb24uXCIsXHJcbsKgwqDCoMKgwqDCoMKgwqDCoMKgXCJDb25zaWRlciBvZmZlcmluZyBhIGhpZ2ggY29udHJhc3QgbW9kZS5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1VybFwiOiBcImh0dHBzOi8vc3Yud2lraXBlZGlhLm9yZy93aWtpL0RlZmVrdF9mJUMzJUE0cmdzZWVuZGVcIixcclxuICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2lraXBlZGlhIGFib3V0IGRlZmVjdGl2ZSBjb2xvciB2aXNpb25cIlxyXG4gICAgICB9LFxyXG4gICAgICBcImZhcnNpZ2h0ZWRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJGYXItc2lnaHRlZG5lc3NcIixcclxuICAgICAgICBcImZhY3RcIjogXCJGYXItc2lnaHRlZG5lc3MgKEh5cGVyb3BpYSkgaXMgb25lIG9mIHRoZSBtb3N0IGNvbW1vbiB2aXN1YWwgaW1wYWlybWVudHMuIFBlb3BsZSB3aXRoIEh5cGVyb3BpYSBoYXZlIGRpZmZpY3VsdHkgZm9jdXNpbmcgb24gb2JqZWN0cyBhdCBjbG9zZSByYW5nZSB3aGljaCBtYWtlcyB0aGVtIGFwcGVhciBibHVycnkuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJBdm9pZCB0ZXh0IGluIHNtYWxsIGZvbnQgc2l6ZXMgYW5kIGxvbmcgdGV4dHMuIFVzZSBwcm9wZXIgc3BhY2luZyBhbmQgbGluZSBoZWlnaHQuXCIsICBcclxuICAgICAgICAgIFwiTWFrZSBzdXJlIHRoZSB3ZWJzaXRlIGNhbiBiZSB6b29tZWQgdG8gYXQgbGVhc3QgMjAwJS5cIixcclxuICAgICAgICAgIFwiT2ZmZXIgYSB0ZXh0IHRvIHNwZWVjaCByZWFkZXIuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9VcmxcIjogXCJodHRwczovL3dlYmJyaWt0bGluamVyLnNlL3IvMzktZ2Utd2ViYnBsYXRzZW4tZW4tZ29kLWxhc2JhcmhldC9cIixcclxuICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiR29vZCByZWFkYWJpbGl0eVwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwidG90YWxDb2xvckJsaW5kbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiVG90YWwgY29sb3IgYmxpbmRuZXNzXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVvcGxlIHdpdGggbG93ZXJlZCBjb2xvciB2aXNpb24gaGF2ZSBkaWZmaWN1bHR5IGRpc3Rpbmd1aXNoaW5nIHNvbWUgb3IgYWxsIGNvbG9ycy4gVG90YWwgY29sb3IgYmxpbmRuZXNzIChNb25vY2hyb21hdGljIC8gQWNocm9tYXRvcHN5KSBpcyB2ZXJ5IHJhcmUuIFBlb3BsZSB3aXRoIHRoaXMgdmlzdWFsIGltcGFpcm1lbnQgY2FuIG5vdCBwZXJjaWV2ZSBhbnkgY29sb3JzLCBvbmx5IGRpZmZlcmVudCBzaGFkZXMgb2YgZ3JheS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkRvIG5vdCB1c2UgY29sb3IgYXMgdGhlIG9ubHkgd2F5IHRvIGNvbnZleSBpbmZvcm1hdGlvbiwgaW5kaWNhdGUgYW4gYWN0aW9uIG9yIGlkZW50aWZ5IGFuIGVsZW1lbnQuIEZvciBleGFtcGxlLCBkbyBub3QgbWFyayBhbiBpbmNvcnJlY3QgZm9ybSBmaWVsZCB3aXRoIGEgcmVkIGJvcmRlciBvbmx5LCBhbHNvIHN1cHBsZW1lbnQgd2l0aCBhIHRleHQgYW5kIHByZWZlcmFibHkgYW4gaWNvbi5cIixcclxuwqDCoMKgwqDCoMKgwqDCoMKgwqBcIkNvbnNpZGVyIG9mZmVyaW5nIGEgaGlnaCBjb250cmFzdCBtb2RlLlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInR1bm5lbFZpc2lvblwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhIG1vdmUgdGhlIG1vdXNlIHBvaW50ZXIgb24gdGhlIHdlYiBwYWdlIGFuZCBzZWUgd2hhdCdzIGhhcHBlbmluZy5cIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJUdW5uZWwgVmlzaW9uXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiV2hhdCBpcyBjb21tb25seSBjYWxsZWQgVHVubmVsIFZpc2lvbiBpcyBsb3NzIG9mIHBlcmlwaGVyYWwgdmlzaW9uLiBUaGlzIG1heSBiZSBiZWNhdXNlIHRoZSBwZXJzb24gc3VmZmVycyBmcm9tIGEgZGlzZWFzZSB0aGF0IGFmZmVjdHMgdGhlIGNlbGxzIGluIHRoZSBleWUsIGJ1dCBtYXkgYWxzbyBvY2N1ciB0ZW1wb3JhcmlseSBkdWUgdG8gc3RyZXNzIG9yIGRlcHJlc3Npb24uXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJBdm9pZCB0ZXh0IGluIHNtYWxsIGZvbnQgc2l6ZXMgYW5kIGxvbmcgdGV4dHMuIFVzZSBwcm9wZXIgc3BhY2luZyBhbmQgbGluZSBoZWlnaHQuXCIsXHJcbiAgICAgICAgICBcIk1ha2Ugc3VyZSB0aGUgd2Vic2l0ZSBjYW4gYmUgem9vbWVkIHRvIGF0IGxlYXN0IDIwMCUuXCIsXHJcbiAgICAgICAgICBcIk9mZmVyIGEgdGV4dCB0byBzcGVlY2ggcmVhZGVyLlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInN1bnNoaW5lXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJTdW5zaGluZVwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkxvcmVtIGlwc3VtXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJMb3JlbSBpcHN1bS5cIixcclxuICAgICAgICAgIFwiTG9yZW0gaXBzdW0uXCIsXHJcbiAgICAgICAgICBcIkxvcmVtIGlwc3VtXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiY29uY2VudHJhdGlvblwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiQ29uY2VudHJhdGlvblwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkV2ZXJ5b25lIGNhbiBoYXZlIGEgaGFyZCB0aW1lIGNvbmNlbnRyYXRpbmcsIGJ1dCBmb3Igc29tZSBpdCBjYW4gYmUgYSBiaWcgcHJvYmxlbSBpbiBldmVyeWRheSBsaWZlLiBEaXNhYmlsaXRpZXMgbGlrZSBBREhEIGFuZCBBdXRpc20gY2FuIGNhdXNlIGRpZmZpY3VsdHkgaW4gaGFuZGxpbmcgaW1wcmVzc2lvbnMsIHNvcnRpbmcgaW5mb3JtYXRpb24gYW5kIHNlbnNpdGl2aXR5IHRvIHNvdW5kLlwiLCAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJHaXZlIHRoZSB3ZWJzaXRlIGEgc2ltcGxlIGFuZCBjbGVhbiBkZXNpZ24uXCIsXHJcbiAgICAgICAgICBcIkJlIGNhcmVmdWwgd2l0aCBhbmltYXRpb25zIGFuZCBzdHJvbmcgY29sb3JzLlwiLFxyXG4gICAgICAgICAgXCJBdm9pZCBoYXZpbmcgdG9vIG11Y2ggY29udGVudCBvbiB0aGUgc2FtZSBwYWdlLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciBpbWFnZSwgYXVkaW8gYW5kIHZpZGVvIGFsZXJuYXRpdmVzIHRvIHRleHQgY29udGVudC5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJzbWFsbFZvY2FidWxhcnlcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlIVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlNtYWxsIHZvY2FidWxhcnlcIixcclxuICAgICAgICBcImZhY3RcIjogXCJBIGxhcmdlIHBhcnQgb2YgdGhlIHdvcmxkJ3MgcG9wdWxhdGlvbiBjYW4ndCByZWFkIGF0IGFsbCBhbmQgbWFueSBhZHVsdHMgZG9uJ3QgcmVhZCBhcyB3ZWxsIGFzIGV4cGVjdGVkIGFmdGVyIGZpbmlzaGluZyBncmFkZSBzY2hvb2wuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJBdm9pZCBkaWZmaWN1bHQgd29yZHMgYW5kIHRlcm1zLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciBlYXN5IHRvIHJlYWQgdGV4dHMsIGltYWdlcywgdmlkZW8gb3IgYXVkaW8gYWx0ZXJuYXRpdmVzLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciB0ZXh0cyBpbiBkaWZmZXJlbnQgbGFuZ3VhZ2VzLlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJVSVwiOiB7XHJcbiAgICAgIFwic2VsZWN0U2ltdWxhdGlvblwiOiBcIlNlbGVjdCBzaW11bGF0aW9uOlwiLFxyXG4gICAgICBcInJlc2V0XCI6IFwiUmVzZXRcIixcclxuICAgICAgXCJhZHZpY2VcIjogXCJUaGluayBhYm91dCB0aGlzXCIsXHJcbiAgICAgIFwibW9yZUluZm9cIjogXCJNb3JlIGluZm9ybWF0aW9uXCIsXHJcbiAgICAgIFwic2lnaHRcIjogXCJTaWdodFwiLFxyXG4gICAgICBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJUb3RhbCBjb2xvciBibGluZG5lc3NcIixcclxuICAgICAgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjogXCJZZWxsb3ctQmx1ZSBjb2xvciBibGluZG5lc3NcIiwgICAgXHJcbiAgICAgIFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOiBcIlJlZC1HcmVlbiBjb2xvciBibGluZG5lc3NcIixcclxuICAgICAgXCJmYXJzaWdodGVkbmVzc1wiOiBcIkZhci1zaWdodGVkbmVzc1wiLFxyXG4gICAgICBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbCB2aXNpb25cIixcclxuICAgICAgXCJtb2JpbGl0eVwiOiBcIk1vYmlsaXR5XCIsXHJcbiAgICAgIFwicGFya2luc29uc1wiOiBcIlBhcmtpbnNvbnNcIixcclxuICAgICAgXCJyZWFkQW5kV3JpdGVcIjogXCJSZWFkIGFuZCB3cml0ZVwiLFxyXG4gICAgICBcImR5c2xleGlhXCI6IFwiRHlzbGV4aWFcIixcclxuICAgICAgXCJzbWFsbFZvY2FidWxhcnlcIjogXCJTbWFsbCB2b2NhYnVsYXJ5XCIsXHJcbiAgICAgIFwiY29uY2VudHJhdGlvblwiOiBcIkNvbmNlbnRyYXRpb25cIixcclxuICAgICAgXCJjaGFuZ2VTZXR0aW5nc1wiOiBcIkNoYW5nZSBzZXR0aW5nc1wiLFxyXG4gICAgICBcInNlbGVjdExhbmd1YWdlXCI6IFwiU2VsZWN0IGxhbmd1YWdlXCIsXHJcbiAgICAgIFwic2F2ZVNldHRpbmdzXCI6IFwiU2F2ZSBzZXR0aW5nc1wiLFxyXG4gICAgICBcImNhbmNlbFwiOiBcIkNhbmNlbFwiLFxyXG4gICAgICBcInNpbXVsYXRpb25zXCI6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJTaWdodFwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtcclxuICAgICAgICAgICAgeyBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJUb3RhbCBjb2xvciBibGluZG5lc3NcIiB9LFxyXG4gICAgICAgICAgICB7IFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6IFwiWWVsbG93LUJsdWUgY29sb3IgYmxpbmRuZXNzXCIgfSxcclxuICAgICAgICAgICAgeyBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSZWQtR3JlZW4gY29sb3IgYmxpbmRuZXNzXCIgfSxcclxuICAgICAgICAgICAgeyBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiRmFyLXNpZ2h0ZWRuZXNzXCIgfSxcclxuICAgICAgICAgICAgeyBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbCB2aXNpb25cIiB9LFxyXG4gICAgICAgICAgICB7IFwic3Vuc2hpbmVcIjogXCJTdW5zaGluZVwiIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIk1vYmlsaXR5XCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogWyBcclxuICAgICAgICAgICAgeyBcInBhcmtpbnNvbnNcIjogXCJQYXJraW5zb25zXCIgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIlJlYWQgYW5kIHdyaXRlXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgICB7IFwiZHlzbGV4aWFcIjogXCJEeXNsZXhpYVwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJzbWFsbFZvY2FidWxhcnlcIjogXCJTbWFsbCB2b2NhYnVsYXJ5XCIgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiQ29uY2VudHJhdGlvblwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJNZW1vcnlcIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9XHJcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgbG9hZGVkU2ltdWxhdGlvbnMgPSBbXTtcblxuZnVuY3Rpb24gbG9hZChuYW1lLCBzdWJOYW1lLCBjYWxsYmFjaykge1xuICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdLFxuICAgICAgICBzY3JpcHRGaWxlID0gc3ViTmFtZSA/ICdzaW11bGF0aW9ucy8nICsgbmFtZSArICcvJyArIHN1Yk5hbWUgKyAnL2NvbnRlbnQuanMnIDogJ3NpbXVsYXRpb25zLycgKyBuYW1lICsgJy9jb250ZW50LmpzJztcblxuICAgIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoYWN0aXZlVGFiLmlkLCB7IGZpbGU6IHNjcmlwdEZpbGUgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgbG9hZGVkU2ltdWxhdGlvbnMucHVzaChuYW1lKTtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhuYW1lLCBzdWJOYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KG5hbWUsIHN1Yk5hbWUpIHtcbiAgaWYgKGxvYWRlZFNpbXVsYXRpb25zLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RhcnRTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSwgc3ViU2ltdWxhdGlvbjogc3ViTmFtZSB9KTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBsb2FkKG5hbWUsIHN1Yk5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdGFydFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lLCBzdWJTaW11bGF0aW9uOiBzdWJOYW1lIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RvcChuYW1lLCBzdWJOYW1lKSB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RvcFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lLCBzdWJTaW11bGF0aW9uOiBzdWJOYW1lIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0cy5zdGFydCA9IHN0YXJ0O1xuZXhwb3J0cy5zdG9wID0gc3RvcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpbXVsYXRpb25Mb2FkZXIuanMubWFwXG4iXX0=
