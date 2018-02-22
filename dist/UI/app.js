(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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
  $('#panel1').removeClass("hide");

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

function readMoreLinks() {

  var readMoreLink = $('.more-info-links').find('li');

  readMoreLink.click(function (event) {

    var currentLink = event.target.innerText;

    chrome.storage.local.get('moreInfo', function (obj) {

      $.each(obj.moreInfo, function (i, value) {
        if (currentLink == obj.moreInfo[i].moreInfoLinkText) {
          chrome.tabs.create({ url: '' + obj.moreInfo[i].moreInfoUrl });
        }
      });
    });
  });
}

function setTooltipTexts(activeSimulation) {

  var data = languageData[lang];

  var simulationStatus = $(".simulation-started-paragraph");
  var simulationStatusAlert = $(".simulation-started-alert");
  var infoHeading = $(".disability-info-heading");
  var infoParagraph = $(".disability-info-paragraph");
  var adviceList = $(".advice-list");
  var moreInfoLinks = $(".more-info-links");
  var moreInfoPanel = $('#more-info-panel');
  var texts = data.facts[activeSimulation];

  simulationStatus.empty();
  infoHeading.empty();
  infoParagraph.empty();
  adviceList.empty();
  moreInfoLinks.empty();

  simulationStatus.text(texts.simulationStatus);
  simulationStatusAlert.removeClass("hide");

  infoHeading.text(texts.heading);
  infoParagraph.text(texts.fact);

  $.each(texts.listItems, function (i, value) {
    adviceList.append('<li>' + value + '</li>');
  });

  if (texts.moreInfo !== undefined) {
    moreInfoPanel.removeClass("hidden");

    $.each(texts.moreInfo, function (i, value) {
      console.log(texts.moreInfo[i].moreInfoLinkText);
      moreInfoLinks.append('<li><a>' + texts.moreInfo[i].moreInfoLinkText + '</a></li>');
    });
    chrome.storage.local.set({ 'moreInfo': texts.moreInfo });
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
      readMoreLinks();
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
    $('#panel1').addClass("hide");
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

    readMoreLinks();
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
        "moreInfoUrls": "http://www.parkinsonforbundet.se",
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
        "moreInfoUrls": "https://sv.wikipedia.org/wiki/Defekt_f%C3%A4rgseende",
        "moreInfoLinkText" : "Wikipedia om defekt färgseende"
      },
      "redGreenColorBlindness":
      {
        "simulationStatus": "Simulering aktiv!",
        "heading": "Röd-grön färgblindhet",
        "fact": "Personer med defekt färgseende har svårt att skilja på vissa eller alla färger. Ett fullt fungerande öga har tre olika tappar som tar upp färgerna violett, grön och röd. När en eller flera av tapparna saknas eller är defekta leder det till defekt färgseende. Röd-grön färgblindhet (Protanopi och Deuteranopi) är den vanligaste typen av färgblindhet. Den är vanligare hos män än kvinnor. Personer röd-grön färgblindhet har svårt att skilja på färgerna röd, grön, brun och orange.",
        "listItems": 
        ["Använd inte färg som enda sättet att förmedla information, indikera en handling eller identifiera ett element. Markera till exempel inte ett felaktigt formulärfält endast med röd ram, komplettera även med text och gärna en  ikon.", "Erbjud gärna ett högkontrast-läge."],
        "moreInfoUrls": "https://sv.wikipedia.org/wiki/Defekt_f%C3%A4rgseende",
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
        "moreInfoUrls": "https://webbriktlinjer.se/r/39-ge-webbplatsen-en-god-lasbarhet/",
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
        ],
        "moreInfo": 
          [
            {
              "moreInfoUrl":"http://inclusivedesignprinciples.org/#prioritise-content",
              "moreInfoLinkText":"Prioritise content" 
            }
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
        "moreInfo": 
          [
            {
              "moreInfoUrl":"http://inclusivedesignprinciples.org/#offer-choice",
              "moreInfoLinkText":"Offer choice" 
            }
          ]
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
        "moreInfo": 
          [
            {
              "moreInfoUrl":"https://accessibility.blog.gov.uk/2016/06/17/colour-contrast-why-does-it-matter/",
              "moreInfoLinkText":"Why colour contrast matters" 
            }
          ]
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
        "moreInfo": 
          [
            {
              "moreInfoUrl":"https://developer.paciellogroup.com/resources/contrastanalyser/",
              "moreInfoLinkText":"Colour Contrast Analyser" 
            },
            {
              "moreInfoUrl":"http://www.inclusivedesigntoolkit.com/UCvision/vision.html#colour",
              "moreInfoLinkText":"Ensure sufficient contrast" 
            }
          ]
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
        "moreInfo": 
          [
            {
              "moreInfoUrl":"http://inclusivedesignprinciples.org/#provide-comparable-experience",
              "moreInfoLinkText":"Provide comparable experience" 
            },
            {
              "moreInfoUrl":"http://www.inclusivedesigntoolkit.com/UCvision/vision.html#shape",
              "moreInfoLinkText":"Consider size" 
            }
          ]
      },
      "totalColorBlindness":
      {
        "simulationStatus": "Simulation active!",
        "heading": "Total color blindness",
        "fact": "People with lowered color vision have difficulty distinguishing some or all colors. Total color blindness (Monochromatic / Achromatopsy) is very rare. People with this visual impairment can not percieve any colors, only different shades of gray.",
        "listItems": [
          "Do not use color as the only way to convey information, indicate an action or identify an element. For example, do not mark an incorrect form field with a red border only, also supplement with a text and preferably an icon.",
          "Consider offering a high contrast mode."
        ],
        "moreInfo": 
          [
            {
              "moreInfoUrl":"https://www.w3.org/WAI/gettingstarted/tips/designing.html#provide-sufficient-contrast-between-foreground-and-background",
              "moreInfoLinkText":"Provide sufficient contrast between foreground and background" 
            },
            {
              "moreInfoUrl":"https://www.w3.org/WAI/gettingstarted/tips/designing.html#dont-use-color-alone-to-convey-information",
              "moreInfoLinkText":"Don’t use color alone to convey information" 
            },
            {
              "moreInfoUrl":"https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html#visual-audio-contrast-contrast-resources-head",
              "moreInfoLinkText":"List of tools to help determine contrast ratio" 
            }
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
        ],
        "moreInfo": 
          [
            {
              "moreInfoUrl":"http://inclusivedesignprinciples.org/#give-control",
              "moreInfoLinkText":"Allow zoom" 
            },
            {
              "moreInfoUrl":"http://www.inclusivedesigntoolkit.com/UCvision/vision.html#layout",
              "moreInfoLinkText":"Consider visual field loss" 
            }
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
        ],
        "moreInfo": 
          [
            {
              "moreInfoUrl":"http://inclusivedesignprinciples.org/#consider-situation",
              "moreInfoLinkText":"Consider situation" 
            },
            {
              "moreInfoUrl":"http://www.inclusivedesigntoolkit.com/UCvision/vision.html#lighting",
              "moreInfoLinkText":"Consider lighting conditions" 
            }
          ]
      },
      "concentration":
      {
        "simulationStatus": "Simulation active!",
        "heading": "Concentration",
        "fact": "Everyone can have a hard time concentrating, but for some it can be a big problem in everyday life. Disabilities like ADHD and Autism can cause difficulty in handling impressions, sorting information and sensitivity to sound.",        
        "listItems": [
          "Give the website a simple and clean design.",
          "Be careful with animations and strong colors.",
          "Avoid having too much content on the same page.",
          "Offer image, audio and video alernatives to text content."
        ],
        "moreInfo": 
          [
            {
              "moreInfoUrl":"http://inclusivedesignprinciples.org/#be-consistent",
              "moreInfoLinkText":"Be consistent" 
            },
            {
              "moreInfoUrl":"http://www.inclusivedesigntoolkit.com/UCthinking/thinking.html#interface_navigation_and_nested_menus",
              "moreInfoLinkText":"Avoid deep hierarchies" 
            },
           {
              "moreInfoUrl":"http://www.inclusivedesigntoolkit.com/UCthinking/thinking.html#structuring_information",
              "moreInfoLinkText":"Reduce memory load" 
            },
            {
              "moreInfoUrl":"http://www.inclusivedesigntoolkit.com/UCthinking/thinking.html#attention",
              "moreInfoLinkText":"Avoid multiple focuses of attention" 
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC9VSS9hcHAuanMiLCJidWlsZC9qcy9iYWJlbC9VSS9kYXRhL2RhdGEuanNvbiIsImJ1aWxkL2pzL2JhYmVsL3V0aWxzL3NpbXVsYXRpb25Mb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxJQUFJLFFBQVEsUUFBUSxrQkFBUixDQUFaOztBQUVBLElBQUksZUFBZSx3QkFBd0IsS0FBeEIsQ0FBbkI7O0FBRUEsSUFBSSxvQkFBb0IsUUFBUSw4QkFBUixDQUF4Qjs7QUFFQSxJQUFJLG1CQUFtQix3QkFBd0IsaUJBQXhCLENBQXZCOztBQUVBLFNBQVMsdUJBQVQsQ0FBaUMsR0FBakMsRUFBc0M7QUFBRSxNQUFJLE9BQU8sSUFBSSxVQUFmLEVBQTJCO0FBQUUsV0FBTyxHQUFQO0FBQWEsR0FBMUMsTUFBZ0Q7QUFBRSxRQUFJLFNBQVMsRUFBYixDQUFpQixJQUFJLE9BQU8sSUFBWCxFQUFpQjtBQUFFLFdBQUssSUFBSSxHQUFULElBQWdCLEdBQWhCLEVBQXFCO0FBQUUsWUFBSSxPQUFPLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBcUMsR0FBckMsRUFBMEMsR0FBMUMsQ0FBSixFQUFvRCxPQUFPLEdBQVAsSUFBYyxJQUFJLEdBQUosQ0FBZDtBQUF5QjtBQUFFLEtBQUMsT0FBTyxPQUFQLEdBQWlCLEdBQWpCLENBQXNCLE9BQU8sTUFBUDtBQUFnQjtBQUFFOztBQUU3USxJQUFJLE9BQU8sSUFBWDs7QUFFQSxTQUFTLGVBQVQsR0FBMkI7O0FBRXpCLFNBQU8sT0FBUCxDQUFlLEtBQWYsQ0FBcUIsR0FBckIsQ0FBeUIsa0JBQXpCLEVBQTZDLFVBQVUsR0FBVixFQUFlO0FBQzFELHFCQUFpQixLQUFqQixDQUF1QixJQUFJ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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbmNBOztBQUVBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQyxTQUFPO0FBRG9DLENBQTdDO0FBR0EsSUFBSSxvQkFBb0IsRUFBeEI7O0FBRUEsU0FBUyxJQUFULENBQWMsSUFBZCxFQUFvQixPQUFwQixFQUE2QixRQUE3QixFQUF1QztBQUNyQyxTQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEVBQUUsUUFBUSxJQUFWLEVBQWdCLGVBQWUsSUFBL0IsRUFBbEIsRUFBeUQsVUFBVSxJQUFWLEVBQWdCO0FBQ3ZFLFFBQUksWUFBWSxLQUFLLENBQUwsQ0FBaEI7QUFBQSxRQUNJLGFBQWEsVUFBVSxpQkFBaUIsSUFBakIsR0FBd0IsR0FBeEIsR0FBOEIsT0FBOUIsR0FBd0MsYUFBbEQsR0FBa0UsaUJBQWlCLElBQWpCLEdBQXdCLGFBRDNHOztBQUdBLFdBQU8sSUFBUCxDQUFZLGFBQVosQ0FBMEIsVUFBVSxFQUFwQyxFQUF3QyxFQUFFLE1BQU0sVUFBUixFQUF4QyxFQUE4RCxZQUFZO0FBQ3hFLHdCQUFrQixJQUFsQixDQUF1QixJQUF2QjtBQUNBLFVBQUksUUFBSixFQUFjO0FBQ1osaUJBQVMsSUFBVCxFQUFlLE9BQWY7QUFDRDtBQUNGLEtBTEQ7QUFNRCxHQVZEO0FBV0Q7O0FBRUQsU0FBUyxLQUFULENBQWUsSUFBZixFQUFxQixPQUFyQixFQUE4QjtBQUM1QixNQUFJLGtCQUFrQixRQUFsQixDQUEyQixJQUEzQixDQUFKLEVBQXNDO0FBQ3BDLFdBQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsRUFBRSxRQUFRLElBQVYsRUFBZ0IsZUFBZSxJQUEvQixFQUFsQixFQUF5RCxVQUFVLElBQVYsRUFBZ0I7QUFDdkUsVUFBSSxZQUFZLEtBQUssQ0FBTCxDQUFoQjs7QUFFQSxhQUFPLElBQVAsQ0FBWSxXQUFaLENBQXdCLFVBQVUsRUFBbEMsRUFBc0MsRUFBRSxRQUFRLGlCQUFWLEVBQTZCLFlBQVksSUFBekMsRUFBK0MsZUFBZSxPQUE5RCxFQUF0QztBQUNELEtBSkQ7QUFLRCxHQU5ELE1BTU87QUFDTCxTQUFLLElBQUwsRUFBVyxPQUFYLEVBQW9CLFlBQVk7QUFDOUIsYUFBTyxJQUFQLENBQVksS0FBWixDQUFrQixFQUFFLFFBQVEsSUFBVixFQUFnQixlQUFlLElBQS9CLEVBQWxCLEVBQXlELFVBQVUsSUFBVixFQUFnQjtBQUN2RSxZQUFJLFlBQVksS0FBSyxDQUFMLENBQWhCOztBQUVBLGVBQU8sSUFBUCxDQUFZLFdBQVosQ0FBd0IsVUFBVSxFQUFsQyxFQUFzQyxFQUFFLFFBQVEsaUJBQVYsRUFBNkIsWUFBWSxJQUF6QyxFQUErQyxlQUFlLE9BQTlELEVBQXRDO0FBQ0QsT0FKRDtBQUtELEtBTkQ7QUFPRDtBQUNGOztBQUVELFNBQVMsSUFBVCxDQUFjLElBQWQsRUFBb0IsT0FBcEIsRUFBNkI7QUFDM0IsU0FBTyxJQUFQLENBQVksS0FBWixDQUFrQixFQUFFLFFBQVEsSUFBVixFQUFnQixlQUFlLElBQS9CLEVBQWxCLEVBQXlELFVBQVUsSUFBVixFQUFnQjtBQUN2RSxRQUFJLFlBQVksS0FBSyxDQUFMLENBQWhCOztBQUVBLFdBQU8sSUFBUCxDQUFZLFdBQVosQ0FBd0IsVUFBVSxFQUFsQyxFQUFzQyxFQUFFLFFBQVEsZ0JBQVYsRUFBNEIsWUFBWSxJQUF4QyxFQUE4QyxlQUFlLE9BQTdELEVBQXRDO0FBQ0QsR0FKRDtBQUtEOztBQUVELFFBQVEsS0FBUixHQUFnQixLQUFoQjtBQUNBLFFBQVEsSUFBUixHQUFlLElBQWY7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2RhdGEgPSByZXF1aXJlKCcuL2RhdGEvZGF0YS5qc29uJyk7XG5cbnZhciBsYW5ndWFnZURhdGEgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZGF0YSk7XG5cbnZhciBfc2ltdWxhdGlvbkxvYWRlciA9IHJlcXVpcmUoJy4uL3V0aWxzL3NpbXVsYXRpb25Mb2FkZXIuanMnKTtcblxudmFyIHNpbXVsYXRpb25Mb2FkZXIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfc2ltdWxhdGlvbkxvYWRlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbnZhciBsYW5nID0gXCJlblwiO1xuXG5mdW5jdGlvbiBzdGFydFNpbXVsYXRpb24oKSB7XG5cbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuICAgIHNpbXVsYXRpb25Mb2FkZXIuc3RhcnQob2JqLmFjdGl2ZVNpbXVsYXRpb24pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVzZXRTaW11bGF0aW9uKHRvb2x0aXApIHtcblxuICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtcbiAgICBwYXRoOiBcImltZy9pY29uLnBuZ1wiXG4gIH0pO1xuXG4gIHRvb2x0aXAucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgJChcIiNwYW5lbDFcIikuYWRkQ2xhc3MoXCJpblwiKTtcbiAgJCgnI3BhbmVsMScpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICB0b29sdGlwLmFkZENsYXNzKFwiaGlkZVwiKTtcbiAgfSwgMjUwKTtcblxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2FjdGl2ZVNpbXVsYXRpb24nLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgc2ltdWxhdGlvbkxvYWRlci5zdG9wKG9iai5hY3RpdmVTaW11bGF0aW9uKTtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5yZW1vdmUoJ2FjdGl2ZVNpbXVsYXRpb24nKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldFRleHRzKCkge1xuXG4gIHZhciBkYXRhID0gbGFuZ3VhZ2VEYXRhW2xhbmddO1xuXG4gICQoXCIubW9yZS1pbmZvLWxpbmtcIikudGV4dChkYXRhLlVJLm1vcmVJbmZvKTtcbiAgJChcIiNyZXNldC1idG5cIikudGV4dChkYXRhLlVJLnJlc2V0KTtcbiAgJChcIi5uYXZiYXItaGVhZGVyXCIpLnRleHQoZGF0YS5VSS5zZWxlY3RTaW11bGF0aW9uKTtcbiAgJChcIiNhZHZpY2UtZHJvcGRvd25cIikudGV4dChkYXRhLlVJLmFkdmljZSk7XG4gICQoXCIjaW5mby1kcm9wZG93blwiKS50ZXh0KGRhdGEuVUkubW9yZUluZm8pO1xuICAkKFwiI3NpZ2h0XCIpLnRleHQoZGF0YS5VSS5zaWdodCk7XG4gICQoXCIjbW9iaWxpdHlcIikudGV4dChkYXRhLlVJLm1vYmlsaXR5KTtcbiAgJChcIiNyZWFkV3JpdGVcIikudGV4dChkYXRhLlVJLnJlYWRBbmRXcml0ZSk7XG4gICQoXCIjY29uY2VudHJhdGlvblwiKS50ZXh0KGRhdGEuVUkuY29uY2VudHJhdGlvbik7XG5cbiAgJC5lYWNoKGRhdGEuVUkuc2ltdWxhdGlvbnMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuXG4gICAgJCgnIycgKyB2YWx1ZS5oZWFkaW5nKS50ZXh0KHZhbHVlLmhlYWRpbmcpO1xuXG4gICAgJC5lYWNoKHZhbHVlLmNob2ljZXMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuICAgICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgICAgICQoJyMnICsga2V5KS50ZXh0KHZhbHVlW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICAkKCcjc2V0dGluZ3MtaGVhZGluZycpLnRleHQoZGF0YS5VSS5jaGFuZ2VTZXR0aW5ncyk7XG4gICQoJyNsYW5ndWFnZS1sYWJlbCcpLnRleHQoZGF0YS5VSS5zZWxlY3RMYW5ndWFnZSk7XG4gICQoJyNidG4tc2F2ZS1zZXR0aW5ncycpLnRleHQoZGF0YS5VSS5zYXZlU2V0dGluZ3MpO1xuICAkKCcjYnRuLWNhbmNlbC1zZXR0aW5ncycpLnRleHQoZGF0YS5VSS5jYW5jZWwpO1xufVxuXG5mdW5jdGlvbiByZWFkTW9yZUxpbmtzKCkge1xuXG4gIHZhciByZWFkTW9yZUxpbmsgPSAkKCcubW9yZS1pbmZvLWxpbmtzJykuZmluZCgnbGknKTtcblxuICByZWFkTW9yZUxpbmsuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICB2YXIgY3VycmVudExpbmsgPSBldmVudC50YXJnZXQuaW5uZXJUZXh0O1xuXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdtb3JlSW5mbycsIGZ1bmN0aW9uIChvYmopIHtcblxuICAgICAgJC5lYWNoKG9iai5tb3JlSW5mbywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG4gICAgICAgIGlmIChjdXJyZW50TGluayA9PSBvYmoubW9yZUluZm9baV0ubW9yZUluZm9MaW5rVGV4dCkge1xuICAgICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogJycgKyBvYmoubW9yZUluZm9baV0ubW9yZUluZm9VcmwgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0VG9vbHRpcFRleHRzKGFjdGl2ZVNpbXVsYXRpb24pIHtcblxuICB2YXIgZGF0YSA9IGxhbmd1YWdlRGF0YVtsYW5nXTtcblxuICB2YXIgc2ltdWxhdGlvblN0YXR1cyA9ICQoXCIuc2ltdWxhdGlvbi1zdGFydGVkLXBhcmFncmFwaFwiKTtcbiAgdmFyIHNpbXVsYXRpb25TdGF0dXNBbGVydCA9ICQoXCIuc2ltdWxhdGlvbi1zdGFydGVkLWFsZXJ0XCIpO1xuICB2YXIgaW5mb0hlYWRpbmcgPSAkKFwiLmRpc2FiaWxpdHktaW5mby1oZWFkaW5nXCIpO1xuICB2YXIgaW5mb1BhcmFncmFwaCA9ICQoXCIuZGlzYWJpbGl0eS1pbmZvLXBhcmFncmFwaFwiKTtcbiAgdmFyIGFkdmljZUxpc3QgPSAkKFwiLmFkdmljZS1saXN0XCIpO1xuICB2YXIgbW9yZUluZm9MaW5rcyA9ICQoXCIubW9yZS1pbmZvLWxpbmtzXCIpO1xuICB2YXIgbW9yZUluZm9QYW5lbCA9ICQoJyNtb3JlLWluZm8tcGFuZWwnKTtcbiAgdmFyIHRleHRzID0gZGF0YS5mYWN0c1thY3RpdmVTaW11bGF0aW9uXTtcblxuICBzaW11bGF0aW9uU3RhdHVzLmVtcHR5KCk7XG4gIGluZm9IZWFkaW5nLmVtcHR5KCk7XG4gIGluZm9QYXJhZ3JhcGguZW1wdHkoKTtcbiAgYWR2aWNlTGlzdC5lbXB0eSgpO1xuICBtb3JlSW5mb0xpbmtzLmVtcHR5KCk7XG5cbiAgc2ltdWxhdGlvblN0YXR1cy50ZXh0KHRleHRzLnNpbXVsYXRpb25TdGF0dXMpO1xuICBzaW11bGF0aW9uU3RhdHVzQWxlcnQucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuXG4gIGluZm9IZWFkaW5nLnRleHQodGV4dHMuaGVhZGluZyk7XG4gIGluZm9QYXJhZ3JhcGgudGV4dCh0ZXh0cy5mYWN0KTtcblxuICAkLmVhY2godGV4dHMubGlzdEl0ZW1zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICBhZHZpY2VMaXN0LmFwcGVuZCgnPGxpPicgKyB2YWx1ZSArICc8L2xpPicpO1xuICB9KTtcblxuICBpZiAodGV4dHMubW9yZUluZm8gIT09IHVuZGVmaW5lZCkge1xuICAgIG1vcmVJbmZvUGFuZWwucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG5cbiAgICAkLmVhY2godGV4dHMubW9yZUluZm8sIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuICAgICAgY29uc29sZS5sb2codGV4dHMubW9yZUluZm9baV0ubW9yZUluZm9MaW5rVGV4dCk7XG4gICAgICBtb3JlSW5mb0xpbmtzLmFwcGVuZCgnPGxpPjxhPicgKyB0ZXh0cy5tb3JlSW5mb1tpXS5tb3JlSW5mb0xpbmtUZXh0ICsgJzwvYT48L2xpPicpO1xuICAgIH0pO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7ICdtb3JlSW5mbyc6IHRleHRzLm1vcmVJbmZvIH0pO1xuICB9IGVsc2Uge1xuICAgIG1vcmVJbmZvUGFuZWwuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gIH1cbn1cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gIHZhciB0b29sdGlwID0gJChcIi50b29sLXRpcFwiKTtcblxuICB2YXIgYWN0aXZlU2ltdWxhdGlvbiA9IHZvaWQgMDtcblxuICAvL2Nocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnbGFuZycsIG9iaiA9PiB7XG5cbiAgbGFuZyA9ICdlbic7XG5cbiAgc2V0VGV4dHMoKTtcblxuICAvL30pO1xuXG4gIC8vIFNldCBhY3RpdmUgc3RhdGVcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuXG4gICAgYWN0aXZlU2ltdWxhdGlvbiA9IG9iai5hY3RpdmVTaW11bGF0aW9uO1xuXG4gICAgaWYgKGFjdGl2ZVNpbXVsYXRpb24pIHtcbiAgICAgIHRvb2x0aXAuYWRkQ2xhc3MoXCJpblwiKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG4gICAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAgIHNldFRvb2x0aXBUZXh0cyhhY3RpdmVTaW11bGF0aW9uKTtcbiAgICAgIHJlYWRNb3JlTGlua3MoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIE1haW4gdmlld1xuICAkKFwiLm1lbnUtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBtZW51QnRuID0gJCh0aGlzKTtcbiAgICB2YXIgbWVudUJ0bklkID0gbWVudUJ0blswXS5pZDtcblxuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEljb24oe1xuICAgICAgcGF0aDogXCJpbWcvaWNvbl9hY3RpdmUucG5nXCJcbiAgICB9KTtcblxuICAgIGFjdGl2ZVNpbXVsYXRpb24gPSBtZW51QnRuSWQ7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgJ2FjdGl2ZVNpbXVsYXRpb24nOiBtZW51QnRuSWQgfSk7XG5cbiAgICBzZXRUb29sdGlwVGV4dHMoYWN0aXZlU2ltdWxhdGlvbik7XG5cbiAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAkKCcjcGFuZWwxJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgICQoJyNwYW5lbDInKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG4gICAgdG9vbHRpcC5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNwYW5lbDInKS5hZGRDbGFzcyhcImluXCIpO1xuICAgIH0sIDEwMCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0YXJ0U2ltdWxhdGlvbigpO1xuICAgIH0sIDUwMCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNwYW5lbDInKS5yZW1vdmVDbGFzcyhcImluXCIpO1xuICAgICAgdG9vbHRpcC5hZGRDbGFzcyhcImluXCIpO1xuICAgIH0sIDEwMDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwyJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgIH0sIDE1MDApO1xuXG4gICAgcmVhZE1vcmVMaW5rcygpO1xuICB9KTtcblxuICAkKFwiLmdpdGh1Yi1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6ICdodHRwczovL2dpdGh1Yi5jb20vTWV0YW1hdHJpeC9XZWItRGlzYWJpbGl0eS1TaW11bGF0b3InIH0pO1xuICB9KTtcblxuICAkKCcuc2V0dGluZ3MtbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdsYW5nJywgZnVuY3Rpb24gKG9iaikge1xuICAgICAgJCgnI2xhbmd1YWdlJykudmFsKG9iai5sYW5nKTtcbiAgICB9KTtcblxuICAgICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImluXCIpO1xuICAgICQoJyNzZXR0aW5ncycpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3NldHRpbmdzJykuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICB9LCAyNTApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwxJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgIH0sIDUwMCk7XG4gIH0pO1xuXG4gIC8vIFNldHRpbmdzIHZpZXdcblxuICAvKiAkKCcjYnRuLXNhdmUtc2V0dGluZ3MnKS5vbignY2xpY2snLCAoZSkgPT4ge1xuICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgc2VsZWN0ZWRMYW5nID0gJCgnI2xhbmd1YWdlJykudmFsKCk7XG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeydsYW5nJzogc2VsZWN0ZWRMYW5nfSk7XG4gICAgICBsYW5nID0gc2VsZWN0ZWRMYW5nO1xuICAgICAgc2V0VGV4dHMoKTtcbiAgICAgICQoJyNzZXR0aW5ncycpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAkKCcjcGFuZWwxJykuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICAgfSwgNTAwKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICQoJyNzZXR0aW5ncycpLmFkZENsYXNzKFwiaGlkZVwiKTtcbiAgICAgfSwgNzUwKTtcbiAgICB9KTtcbiAgICAkKCcjYnRuLWNhbmNlbC1zZXR0aW5ncycpLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICQoJyNzZXR0aW5ncycpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAkKCcjcGFuZWwxJykuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICAgfSwgMjUwKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICQoJyNzZXR0aW5ncycpLmFkZENsYXNzKFwiaGlkZVwiKTtcbiAgICAgfSwgNTAwKTtcbiAgICB9KTsqL1xuXG4gIC8vIFRvb2x0aXAgdmlld1xuXG4gICQoXCIuc2ltdWxhdGlvbi1zdGFydGVkLWFsZXJ0IC5jbG9zZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJChcIi5zaW11bGF0aW9uLXN0YXJ0ZWQtYWxlcnRcIikuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICB9KTtcblxuICAkKFwiI3Jlc2V0LWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgcmVzZXRTaW11bGF0aW9uKHRvb2x0aXApO1xuICB9KTtcblxuICAvL3BhbmVsIGNvbGxhcHNlLCBzaG93IGFycm93czogXG4gICQoJy5jb2xsYXBzZScpLm9uKCdzaG93bi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKHVuZGVmaW5lZCkucGFyZW50KCkuZmluZChcIi5kb3duLWFycm93LCAudXAtYXJyb3dcIikudG9nZ2xlKCk7XG4gIH0pLm9uKCdoaWRkZW4uYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh1bmRlZmluZWQpLnBhcmVudCgpLmZpbmQoXCIuZG93bi1hcnJvdywgLnVwLWFycm93XCIpLnRvZ2dsZSgpO1xuICB9KTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInN2XCI6XG4gIHtcbiAgICBcImZhY3RzXCI6IHtcbiAgICAgIFwiZHlzbGV4aWFcIjogXG4gICAgICB7XG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkR5c2xleGlcIixcbiAgICAgICAgXCJmYWN0XCI6IFwiRHlzbGV4aSDDpHIgZW4gbmVkc8OkdHRuaW5nIHNvbSBnw7ZyIGF0dCBoasOkcm5hbiBoYXIgc3bDpXJ0IGF0dCBhdXRvbWF0aXNlcmEgdG9sa25pbmdlbiBhdiBvcmQuIERldHRhIGfDtnIgYXR0IHBlcnNvbmVyIG1lZCBkZW5uYSBuZWRzw6R0dG5pbmcga2FuIGhhIHN2w6VydCBhdHQgbMOkc2Egb2NoIHNrcml2YS4gRHlzbGV4aSDDpHIgaW50ZSBrb3BwbGF0IHRpbGwgc3luIGVsbGVyIGludGVsbGlnZW5zLiBPcnNha2VybmEgdGlsbCBkeXNsZXhpIMOkciBmb3J0ZmFyYW5kZSBva2xhcnQuXCIsXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcbiAgICAgICAgICBcIlVuZHZpayB0ZXh0IGkgbGl0ZW4gc3RvcmxlayBvY2ggbMOlbmdhIHRleHRlci4gU2UgdGlsbCBhdHQgaGEgb3JkZW50bGlndCBtZWQgcmFkYXZzdMOlbmQuXCIsIFx0XG4gICAgICAgICAgXCJVbmR2aWsgc3bDpXJhIG9yZCBvY2ggZmFja3Rlcm1lci5cIixcbiAgICAgICAgICBcIkVyYmp1ZCBsw6R0dGzDpHN0YSB2ZXJzaW9uZXIgYXYgZmFja3RleHRlci5cIixcbiAgICAgICAgICBcIlVuZHZpayB0eXBzbml0dCBtZWQga3LDpW5nbGlnYSBvY2gga29tcGxleGEgZmlndXJlci5cIlxuICAgICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBcInBhcmtpbnNvbnNcIjpcbiAgICAgIHtcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiEgcsO2ciBtdXNwZWthcmVuIHDDpSB3ZWJicGxhdHNlbiBvY2ggc2UgdmFkIHNvbSBow6RuZGVyLlwiLFxuICAgICAgICBcImhlYWRpbmdcIjogXCJQYXJraW5zb25zXCIsXG4gICAgICAgIFwiZmFjdFwiOiBcIlZpZCBQYXJraW5zb25zIHNqdWtkb20gZsO2cnN0w7ZycyBjZWxsZXJuYSBpIGhqw6RybmFuIHNvbSB0aWxsdmVya2FyIGRvcGFtaW4gdmlsa2V0IGfDtnIgYXR0IGhqw6RybmFuIGbDpXIgZW4gbmVkc2F0dCBmw7ZybcOlZ2EgYXR0IHNraWNrYSBzaWduYWxlci4gUGVyc29uZXIgbWVkIFBhcmtpbnNvbnMga2FuIGRyYWJiYXMgYXYgc3ltcHRvbSBzb20gc2tha25pbmdhciwgc3RlbGEgbXVza2xlciBvY2ggc8OkbXJlIHLDtnJlbHNlZsO2cm3DpWdhLiBPcnNha2VybmEgdGlsbCBQYXJraW5zb25zIHNqdWtkb20gw6RyIGZvcnRmYXJhbmRlIG9rbGFydC5cIixcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xuICAgICAgICAgIFwiU2UgdGlsbCBhdHQgd2ViYnBsYXRzZW4ga2FuIGFudsOkbmRhcyBtZWQgYW5kcmEgaGrDpGxwbWVkZWwgw6RuIG11cywgdGlsbCBleGVtcGVsIHRhbmdlbnRib3Jkc25hdmlnZXJpbmcuXCIsIFx0XG4gICAgICAgICAgXCJIYSB0aWxscsOkY2tsaWd0IG1lZCBsdWZ0IG1lbGxhbiBrb21wb25lbnRlclwiLFxuICAgICAgICAgIFwiSGEgdGlsbHLDpGNrbGlndCBzdG9yYSBrbGlja3l0b3IuXCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJtb3JlSW5mb1VybHNcIjogXCJodHRwOi8vd3d3LnBhcmtpbnNvbmZvcmJ1bmRldC5zZVwiLFxuICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiUGFya2luc29uc2bDtnJidW5kZXRcIlxuICAgICAgfSxcbiAgICAgIFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6XG4gICAgICB7XG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIixcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVyc29uZXIgbWVkIGRlZmVrdCBmw6RyZ3NlZW5kZSBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHRhcHBhciBzb20gdGFyIHVwcCBmw6RyZ2VybmEgdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE7DpHIgZW4gZWxsZXIgZmxlcmEgYXYgdGFwcGFybmEgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhIGxlZGVyIGRldCB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZS4gR3VsLWJsw6UgZsOkcmdibGluZGhldCAoVHJpdGFub3BpKSDDpHIgc8OkbGxzeW50LiBOYW1uZXQgw6RyIG1pc3NsZWRhbmRlIGTDpSBkZXQgaW50ZSDDpHIgZsOkcmdlcm5hIGd1bCBvY2ggYmzDpSBzb20gZsO2cnbDpHhsYXMsIHV0YW4gYmzDpSBtZWQgZ3LDtm4gb2NoIGd1bCBtZWQgbGlsYS5cIixcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xuICAgICAgICAgIFwiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBkZXQgZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCBlbiByw7ZkIHJhbSB1dGFuIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IG9jaCBnw6RybmEgZW4gaWtvbi5cIiwgXHRcbiAgICAgICAgICBcIkVyYmp1ZCBnw6RybmEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxuICAgICAgICBdLFxuICAgICAgICBcIm1vcmVJbmZvVXJsc1wiOiBcImh0dHBzOi8vc3Yud2lraXBlZGlhLm9yZy93aWtpL0RlZmVrdF9mJUMzJUE0cmdzZWVuZGVcIixcbiAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldpa2lwZWRpYSBvbSBkZWZla3QgZsOkcmdzZWVuZGVcIlxuICAgICAgfSxcbiAgICAgIFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOlxuICAgICAge1xuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxuICAgICAgICBcImhlYWRpbmdcIjogXCJSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXRcIixcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVyc29uZXIgbWVkIGRlZmVrdCBmw6RyZ3NlZW5kZSBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHRhcHBhciBzb20gdGFyIHVwcCBmw6RyZ2VybmEgdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE7DpHIgZW4gZWxsZXIgZmxlcmEgYXYgdGFwcGFybmEgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhIGxlZGVyIGRldCB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZS4gUsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0IChQcm90YW5vcGkgb2NoIERldXRlcmFub3BpKSDDpHIgZGVuIHZhbmxpZ2FzdGUgdHlwZW4gYXYgZsOkcmdibGluZGhldC4gRGVuIMOkciB2YW5saWdhcmUgaG9zIG3DpG4gw6RuIGt2aW5ub3IuIFBlcnNvbmVyIHLDtmQtZ3LDtm4gZsOkcmdibGluZGhldCBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIGbDpHJnZXJuYSByw7ZkLCBncsO2biwgYnJ1biBvY2ggb3JhbmdlLlwiLFxuICAgICAgICBcImxpc3RJdGVtc1wiOiBcbiAgICAgICAgW1wiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBlbmRhIHPDpHR0ZXQgYXR0IGbDtnJtZWRsYSBpbmZvcm1hdGlvbiwgaW5kaWtlcmEgZW4gaGFuZGxpbmcgZWxsZXIgaWRlbnRpZmllcmEgZXR0IGVsZW1lbnQuIE1hcmtlcmEgdGlsbCBleGVtcGVsIGludGUgZXR0IGZlbGFrdGlndCBmb3JtdWzDpHJmw6RsdCBlbmRhc3QgbWVkIHLDtmQgcmFtLCBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBvY2ggZ8Okcm5hIGVuICBpa29uLlwiLCBcIkVyYmp1ZCBnw6RybmEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIl0sXG4gICAgICAgIFwibW9yZUluZm9VcmxzXCI6IFwiaHR0cHM6Ly9zdi53aWtpcGVkaWEub3JnL3dpa2kvRGVmZWt0X2YlQzMlQTRyZ3NlZW5kZVwiLFxuICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2lraXBlZGlhIG9tIGRlZmVrdCBmw6RyZ3NlZW5kZVwiXG4gICAgICB9LFxuICAgICAgXCJmYXJzaWdodGVkbmVzc1wiOlxuICAgICAge1xuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxuICAgICAgICBcImhlYWRpbmdcIjogXCJMw6VuZ3N5bnRoZXRcIixcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVyc29uZXIgbWVkIEh5cGVyb3BpIHNlciBzdWRkaWd0IHDDpSBuw6RyYSBow6VsbCwgbWVuIGJyYSBww6UgbMOlbmd0IGjDpWxsLiBOZWRzw6R0dG5pbmdlbiB1cHBzdMOlciBww6UgZ3J1bmQgYXYgYXR0IGxqdXNldCBpbnRlIGJyeXRzIHLDpHR0IGkgw7ZnYXQuIERldCDDpHIgZW4gYXYgZGUgdmFubGlnYXN0ZSBzeW5uZWRzw6R0dG5pbmdhcm5hLlwiLFxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXG4gICAgICAgICAgXCJVbmR2aWsgdGV4dCBpIGxpdGVuIHN0b3JsZWsuXCIsIFx0XG4gICAgICAgICAgXCJXZWJic2lkYW4gc2thIGfDpSBhdHQgZsO2cnN0b3JhICh6b29tYXMpIHRpbGwgbWluc3QgMjAwICUgc8OlIGF0dCBiZXPDtmthcmVuIGthbiBhbnBhc3NhIGlubmVow6VsbGV0cyBzdG9ybGVrIGVmdGVyIHNpbmEgYmVob3YuXCIsXG4gICAgICAgICAgXCJFcmJqdWQgdXBwbMOkc25pbmcgYXYgaW5uZWjDpWxsZXQuXCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJtb3JlSW5mb1VybHNcIjogXCJodHRwczovL3dlYmJyaWt0bGluamVyLnNlL3IvMzktZ2Utd2ViYnBsYXRzZW4tZW4tZ29kLWxhc2JhcmhldC9cIixcbiAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldlYmJyaWt0bGluamUgR2Ugd2ViYnBsYXRzZW4gZ29kIGzDpHNiYXJoZXRcIlxuICAgICAgfSxcbiAgICAgIFwidG90YWxDb2xvckJsaW5kbmVzc1wiOlxuICAgICAge1xuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxuICAgICAgICBcImhlYWRpbmdcIjogXCJIZWx0IGbDpHJnYmxpbmRcIixcbiAgICAgICAgXCJmYWN0XCI6IFwiRGVmZWt0IGbDpHJnc2VlbmRlIGlubmViw6RyIGF0dCBlbiBwZXJzb24gaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0eXBlciBhdiB0YXBwYXIgc29tIHRhciB1cHAgb2xpa2EgZsOkcmdlcjogdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE9yc2FrZW4gdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUgw6RyIGF0dCBlbiBlbGxlciBmbGVyYSBhdiBkZXNzYSB0eXBlciBhdiB0YXBwYXIgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhLiBIZWx0IGbDpHJnYmxpbmQgKE1vbm9rcm9tYXNpL2Frcm9tYXRvcHNpKSDDpHIgbXlja2V0IHPDpGxsc3ludC4gUGVyc29uZXIgbWVkIGRlbm5hIHN5bm5lZHPDpHR0bmluZyBzZXIgaW5nYSBmw6RyZ2VyIHV0YW4gc2VyIGVuZGFzdCBpIGdyw6Vza2FsYS5cIixcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xuICAgICAgICAgIFwiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBkZXQgZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGVsZW1lbnQuIE1hcmtlcmEgdC5leC4gaW50ZSBldHQgZmVsYWt0aWd0IGZvcm11bMOkcmbDpGx0IGVuZGFzdCBtZWQgcsO2ZCByYW0sIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IGVsbGVyIGlrb24uXCIsIFx0XG4gICAgICAgICAgXCJEZXQga2FuIHZhcmEgZW4gYnJhIGlkw6kgYXR0IGVyYmp1ZGEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgXCJ0dW5uZWxWaXNpb25cIjpcbiAgICAgIHtcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiEgcsO2ciBtdXNwZWthcmVuIHDDpSB3ZWJicGxhdHNlbiBvY2ggc2UgdmFkIHNvbSBow6RuZGVyLlwiLFxuICAgICAgICBcImhlYWRpbmdcIjogXCJUdW5uZWxzZWVuZGVcIixcbiAgICAgICAgXCJmYWN0XCI6IFwiRGV0IHNvbSBpIGRhZ2xpZ3QgdGFsIGJydWthciBrYWxsYXMgdHVubmVsc2VlbmRlIMOkciBlbiBzeW5uZWRzw6R0dG5pbmcgc29tIGfDtnIgYXR0IGVuZGFzdCBlbiBkZWwgYXYgc3luZsOkbHRldCBrYW4gc2VzLiBEZXR0YSBrYW4gYmVybyBww6UgYXR0IHBlcnNvbmVuIGxpZGVyIGF2IGVuIHNqdWtkb20gc29tIGfDtnIgYXR0IGNlbGxlcm5hIGkgw7ZnYXQgZsO2cnN0w7ZycyBtZW4gZGVubmEgdHlwIGF2IHN5bm5lZHPDpHR0bmluZyBrYW4gb2Nrc8OlIHRpbGxmw6RsbGlndCB1cHBzdMOlIHDDpSBncnVuZCBhdiBzdHJlc3MgZWxsZXIgZGVwcmVzc2lvbi5cIixcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xuICAgICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrLlwiLFxuICAgICAgICAgIFwiV2ViYnNpZGFuIHNrYSBnw6UgYXR0IGbDtnJzdG9yYSAoem9vbWFzKSB0aWxsIG1pbnN0IDIwMCAlIHPDpSBhdHQgYmVzw7ZrYXJlbiBrYW4gYW5wYXNzYSBpbm5laMOlbGxldHMgc3RvcmxlayBlZnRlciBzaW5hIGJlaG92LlwiLFxuICAgICAgICAgIFwiRXJianVkIHVwcGzDpHNuaW5nIGF2IGlubmVow6VsbGV0LlwiXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBcInN1bnNoaW5lXCI6XG4gICAgICB7XG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlNvbHNrZW5cIixcbiAgICAgICAgXCJmYWN0XCI6IFwiTG9yZW0gaXBzdW1cIixcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xuICAgICAgICAgIFwiTG9yZW0gaXBzdW0uXCIsXG4gICAgICAgICAgXCJMb3JlbSBpcHN1bS5cIixcbiAgICAgICAgICBcIkxvcmVtIGlwc3VtXCJcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIFwiY29uY2VudHJhdGlvblwiOlxuICAgICAge1xuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxuICAgICAgICBcImhlYWRpbmdcIjogXCJLb25jZW50cmF0aW9uXCIsXG4gICAgICAgIFwiZmFjdFwiOiBcIkFsbGEga2FuIGhhIHN2w6VydCBhdHQga29uY2VudHJlcmEgc2lnIG1lbiBmw7ZyIHZpc3NhIGthbiBkZXQgYmxpIGV0dCBzdG9ydCBwcm9ibGVtIGkgdmFyZGFnc2xpdmV0LiBEZXNzYSBmdW5rdGlvbnNuZWRzw6R0dG5pbmdhciBrYW4gb3JzYWthIHN2w6VyaWdoZXRlciBtZWQgYXR0IGhhbnRlcmEgaW50cnljaywgc29ydGVyYSBpbmZvcm1hdGlvbiBvY2ggbGp1ZGvDpG5zbGlnaGV0LlwiLFxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXG4gICAgICAgICAgXCJHZSB3ZWJicGxhdHNlbiBlbiBlbmtlbCBvY2ggbHVmdGlnIGRlc2lnbi5cIixcbiAgICAgICAgICBcIlZhciBmw7Zyc2lrdGlnIG1lZCBhbmltYXRpb25lciBvY2ggc3RhcmthIGbDpHJnZXIuXCIsXG4gICAgICAgICAgXCJVbmR2aWsgYXR0IGhhIGbDtnIgbXlja2V0IGlubmVow6VsbCBww6Ugc2FtbWEgc2lkYS5cIixcbiAgICAgICAgICBcIkVyYmp1ZCBsanVkLSBvY2ggdmlkZW8tYWxlcm5hdGl2IHRpbGwgdGV4dGlubmVow6VsbC5cIlxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgXCJzbWFsbFZvY2FidWxhcnlcIjpcbiAgICAgIHtcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiTGl0ZXQgb3JkZsO2cnLDpWRcIixcbiAgICAgICAgXCJmYWN0XCI6IFwiRW4gc3RvciBkZWwgYXYgam9yZGVucyBiZWZvbGtuaW5nIGthbiBpbnRlIGzDpHNhIGFsbHMgb2NoIG3DpW5nYSB2dXhuYSBsw6RzZXIgaW50ZSBzw6UgYnJhIHNvbSBmw7ZydsOkbnRhcyBlZnRlciBncnVuZHNrb2xldXRiaWxkbmluZ2VuLlwiLFxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXG4gICAgICAgICAgXCJVbmR2aWsga3LDpW5nbGlnYSBvcmQgb2NoIGZhY2t0ZXJtZXIuXCIsICAgXG4gICAgICAgICAgXCJFcmJqdWQgbMOkdHRsw6RzdCB2ZXJzaW9uIGF2IGtyw6VuZ2xpZ2EgdGV4dGVyLlwiLFxuICAgICAgICAgIFwiRXJianVkIHRleHRlciBww6Ugb2xpa2Egc3Byw6VrLlwiXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9LFxuICAgIFwiVUlcIjoge1xuICAgICAgXCJzZWxlY3RTaW11bGF0aW9uXCI6IFwiVsOkbGogc2ltdWxlcmluZzpcIixcbiAgICAgIFwicmVzZXRcIjogXCLDhXRlcnN0w6RsbFwiLFxuICAgICAgXCJhZHZpY2VcIjogXCJUw6RuayBww6UgZGV0dGFcIixcbiAgICAgIFwibW9yZUluZm9cIjogXCJNZXIgaW5mb3JtYXRpb25cIixcbiAgICAgIFwic2lnaHRcIjogXCJTeW5cIixcbiAgICAgIFwidG90YWxDb2xvckJsaW5kbmVzc1wiOiBcIkhlbHQgZsOkcmdibGluZFwiLFxuICAgICAgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjogXCJHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0XCIsICAgIFxuICAgICAgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6IFwiUsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0XCIsXG4gICAgICBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiTMOlbmdzeW50aGV0LCDDtnZlcnN5bnRoZXRcIixcbiAgICAgIFwidHVubmVsVmlzaW9uXCI6IFwiVHVubmVsc2VlbmRlXCIsXG4gICAgICBcIm1vYmlsaXR5XCI6IFwiTW90b3Jpa1wiLFxuICAgICAgXCJwYXJraW5zb25zXCI6IFwiUGFya2luc29uc1wiLFxuICAgICAgXCJyZWFkQW5kV3JpdGVcIjogXCJMw6RzYSBvY2ggc2tyaXZhXCIsXG4gICAgICBcImR5c2xleGlhXCI6IFwiRHlzbGV4aVwiLFxuICAgICAgXCJzbWFsbFZvY2FidWxhcnlcIjogXCJMaXRldCBvcmRmw7ZycsOlZFwiLFxuICAgICAgXCJjb25jZW50cmF0aW9uXCI6IFwiS29uY2VudHJhdGlvblwiLFxuICAgICAgXCJjaGFuZ2VTZXR0aW5nc1wiOiBcIkNoYW5nZSBzZXR0aW5nc1wiLFxuICAgICAgXCJzZWxlY3RMYW5ndWFnZVwiOiBcIlNlbGVjdCBsYW5ndWFnZVwiLFxuICAgICAgXCJzYXZlU2V0dGluZ3NcIjogXCJTYXZlIHNldHRpbmdzXCIsXG4gICAgICBcImNhbmNlbFwiOiBcIkNhbmNlbFwiLFxuICAgICAgXCJzaW11bGF0aW9uc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJTeW5cIixcbiAgICAgICAgICBcImNob2ljZXNcIjogW1xuICAgICAgICAgICAgeyBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJIZWx0IGbDpHJnYmxpbmRcIiB9LFxuICAgICAgICAgICAgeyBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIiB9LFxuICAgICAgICAgICAgeyBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXRcIiB9LFxuICAgICAgICAgICAgeyBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiTMOlbmdzeW50aGV0LCDDtnZlcnN5bnRoZXRcIiB9LFxuICAgICAgICAgICAgeyBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbHNlZW5kZVwiIH0sXG4gICAgICAgICAgICB7IFwic3Vuc2hpbmVcIjogXCJTb2xza2VuXCIgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIk1vdG9yaWtcIixcbiAgICAgICAgICBcImNob2ljZXNcIjogWyBcbiAgICAgICAgICAgIHsgXCJwYXJraW5zb25zXCI6IFwiUGFya2luc29uc1wiIH1cbiAgICBcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIkzDpHNhIG9jaCBza3JpdmFcIixcbiAgICAgICAgICBcImNob2ljZXNcIjogW1xuICAgICAgICAgICAgeyBcImR5c2xleGlhXCI6IFwiRHlzbGV4aVwiIH0sXG4gICAgICAgICAgICB7IFwic21hbGxWb2NhYnVsYXJ5XCI6IFwiTGl0ZXQgb3JkZsO2cnLDpWRcIiB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiS29uY2VudHJhdGlvblwiLFxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiTWlubmVcIixcbiAgICAgICAgICBcImNob2ljZXNcIjogW11cbiAgICAgICAgfVxuXG4gICAgICBdXG4gICAgfVxuICB9LFxuICBcImVuXCI6XG4gIHtcbiAgICBcImZhY3RzXCI6IHtcbiAgICAgIFwiZHlzbGV4aWFcIjogXG4gICAgICB7XG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlIVwiLFxuICAgICAgICBcImhlYWRpbmdcIjogXCJEeXNsZXhpYVwiLFxuICAgICAgICBcImZhY3RcIjogXCJEeXNsZXhpYSBpcyBhIGRpc2FiaWxpdHkgdGhhdCBtYWtlcyBpdCBkaWZmaWN1bHQgZm9yIHRoZSBicmFpbiB0byBhdXRvbWF0ZSB0aGUgaW50ZXJwcmV0YXRpb24gb2Ygd29yZHMuIFRoaXMgbWFrZXMgaXQgaGFyZCBmb3IgcGVvcGxlIHdpdGggdGhpcyBkaXNhYmlsaXR5IHRvIHJlYWQgYW5kIHdyaXRlLiBEeXNsZXhpYSBpcyBoYXMgbm8gY29ubmVjdGlvbiB3aXRoIHZpc2lvbiBvciBpbnRlbGxpZ2VuY2UuIFRoZSBjYXVzZXMgb2YgZHlzbGV4aWEgYXJlIHN0aWxsIHVuY2xlYXIuXCIsXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcbiAgICAgICAgICBcIkF2b2lkIHRleHQgaW4gc21hbGwgZm9udCBzaXplcyBhbmQgbG9uZyB0ZXh0cy4gVXNlIHByb3BlciBzcGFjaW5nIGFuZCBsaW5lIGhlaWdodC5cIixcbiAgICAgICAgICBcIkF2b2lkIGRpZmZpY3VsdCB3b3JkcyBhbmQgdGVybXMuXCIsXG4gICAgICAgICAgXCJPZmZlciBlYXN5IHRvIHJlYWQgdGV4dHMsIGltYWdlcywgdmlkZW8gb3IgYXVkaW8gYWx0ZXJuYXRpdmVzLlwiLFxuICAgICAgICAgIFwiQXZvaWQgZm9udHMgd2l0aCBjb21wbGljYXRlZCBhbmQgY29tcGxleCBjaGFyYWN0ZXJzLlwiXG4gICAgICAgIF0sXG4gICAgICAgIFwibW9yZUluZm9cIjogXG4gICAgICAgICAgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vaW5jbHVzaXZlZGVzaWducHJpbmNpcGxlcy5vcmcvI3ByaW9yaXRpc2UtY29udGVudFwiLFxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIlByaW9yaXRpc2UgY29udGVudFwiIFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBcInBhcmtpbnNvbnNcIjpcbiAgICAgIHtcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhIG1vdmUgdGhlIG1vdXNlIHBvaW50ZXIgb24gdGhlIHdlYiBwYWdlIGFuZCBzZWUgd2hhdCdzIGhhcHBlbmluZy5cIixcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiUGFya2luc29uc1wiLFxuICAgICAgICBcImZhY3RcIjogXCJQYXJraW5zb24ncyBkaXNlYXNlIGRlc3Ryb3lzIHRoZSBjZWxscyBpbiB0aGUgYnJhaW4gdGhhdCBwcm9kdWNlIGRvcGFtaW5lLCB3aGljaCBjYXVzZXMgdGhlIGJyYWluIHRvIGhhdmUgYSByZWR1Y2VkIGFiaWxpdHkgdG8gc2VuZCBzaWduYWxzLiBQZXJzb25zIHdpdGggUGFya2luc29uJ3MgbWF5IHN1ZmZlciBmcm9tIHN5bXB0b21zIHN1Y2ggYXMgc2hha2luZywgc3RpZmYgbXVzY2xlcywgYW5kIHJlZHVjZWQgbW9iaWxpdHkuIFRoZSBjYXVzZXMgb2YgUGFya2luc29uJ3MgZGlzZWFzZSBhcmUgc3RpbGwgdW5jbGVhci5cIixcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xuICAgICAgICAgIFwiTWFrZSBzdXJlIHRoZSB3ZWJzaXRlIGNhbiBiZSB1c2VkIHdpdGggb3RoZXIgdG9vbHMgb3RoZXIgdGhhbiBhIG1vdXNlLCBzdWNoIGFzIGtleWJvYXJkIG5hdmlnYXRpb24uXCIsXG4gICAgICAgICAgXCJIYXZlIGVub3VnaCBzcGFjZSBiZXR3ZWVuIGNvbXBvbmVudHMuXCIsXG4gICAgICAgICAgXCJNYWtlIHN1cmUgY2xpY2sgYXJlYXMgYXJlIGJpZyBlbm91Z2guXCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcbiAgICAgICAgICBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly9pbmNsdXNpdmVkZXNpZ25wcmluY2lwbGVzLm9yZy8jb2ZmZXItY2hvaWNlXCIsXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiT2ZmZXIgY2hvaWNlXCIgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6XG4gICAgICB7XG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlIVwiLFxuICAgICAgICBcImhlYWRpbmdcIjogXCJZZWxsb3ctYmx1ZSBjb2xvciBibGluZG5lc3NcIixcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVvcGxlIHdpdGggbG93ZXJlZCBjb2xvciB2aXNpb24gaGF2ZSBkaWZmaWN1bHR5IGRpc3Rpbmd1aXNoaW5nIHNvbWUgb3IgYWxsIGNvbG9ycy4gWWVsbG93LWJsdWUgY29sb3IgYmxpbmRuZXNzIChUcml0YW5vcGlhKSBpcyByYXJlLiBUaGUgbmFtZSBjYW4gYmUgbWlzbGVhZGluZy4gSXQncyBub3QgdGhlIGNvbG9ycyB5ZWxsb3cgYW5kIGJsdWUgdGhhdCBhcmUgY29uZnVzZWQgYnV0IGJsdWUgd2l0aCBncmVlbiBhbmQgeWVsbG93IHdpdGggcHVycGxlLlwiLFxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXG4gICAgICAgICAgXCJEbyBub3QgdXNlIGNvbG9yIGFzIHRoZSBvbmx5IHdheSB0byBjb252ZXkgaW5mb3JtYXRpb24sIGluZGljYXRlIGFuIGFjdGlvbiBvciBpZGVudGlmeSBhbiBlbGVtZW50LiBGb3IgZXhhbXBsZSwgZG8gbm90IG1hcmsgYW4gaW5jb3JyZWN0IGZvcm0gZmllbGQgd2l0aCBhIHJlZCBib3JkZXIgb25seSwgYWxzbyBzdXBwbGVtZW50IHdpdGggYSB0ZXh0IGFuZCBwcmVmZXJhYmx5IGFuIGljb24uXCIsXG7CoMKgwqDCoMKgwqDCoMKgwqDCoFwiQ29uc2lkZXIgb2ZmZXJpbmcgYSBoaWdoIGNvbnRyYXN0IG1vZGUuXCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcbiAgICAgICAgICBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vYWNjZXNzaWJpbGl0eS5ibG9nLmdvdi51ay8yMDE2LzA2LzE3L2NvbG91ci1jb250cmFzdC13aHktZG9lcy1pdC1tYXR0ZXIvXCIsXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiV2h5IGNvbG91ciBjb250cmFzdCBtYXR0ZXJzXCIgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOlxuICAgICAge1xuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiUmVkLWdyZWVuIGNvbG9yIGJsaW5kbmVzc1wiLFxuICAgICAgICBcImZhY3RcIjogXCJQZW9wbGUgd2l0aCBsb3dlcmVkIGNvbG9yIHZpc2lvbiBoYXZlIGRpZmZpY3VsdHkgZGlzdGluZ3Vpc2hpbmcgc29tZSBvciBhbGwgY29sb3JzLiBSZWQtZ3JlZW4gY29sb3IgYmxpbmRuZXNzIChQcm90YW5vcGlhIGFuZCBEZXV0ZXJhbm9waWEpIGlzIHRoZSBtb3N0IGNvbW1vbiB0eXBlIG9mIGNvbG9yIGJsaW5kbmVzcy4gSXQgaXMgbW9yZSBjb21tb24gYW1vbmcgbWVuIHRoYW4gd29tZW4uIFBlb3BsZSB3aXRoIHJlZC1ncmVlbiBjb2xvciBibGluZG5lc3MgaGF2ZSBkaWZmaWN1bHR5IGRpc3Rpbmd1aXNoaW5nIHRoZSBjb2xvcnMgcmVkLCBncmVlbiwgYnJvd24gYW5kIG9yYW5nZS5cIixcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xuICAgICAgICAgIFwiRG8gbm90IHVzZSBjb2xvciBhcyB0aGUgb25seSB3YXkgdG8gY29udmV5IGluZm9ybWF0aW9uLCBpbmRpY2F0ZSBhbiBhY3Rpb24gb3IgaWRlbnRpZnkgYW4gZWxlbWVudC4gRm9yIGV4YW1wbGUsIGRvIG5vdCBtYXJrIGFuIGluY29ycmVjdCBmb3JtIGZpZWxkIHdpdGggYSByZWQgYm9yZGVyIG9ubHksIGFsc28gc3VwcGxlbWVudCB3aXRoIGEgdGV4dCBhbmQgcHJlZmVyYWJseSBhbiBpY29uLlwiLFxuwqDCoMKgwqDCoMKgwqDCoMKgwqBcIkNvbnNpZGVyIG9mZmVyaW5nIGEgaGlnaCBjb250cmFzdCBtb2RlLlwiXG4gICAgICAgIF0sXG4gICAgICAgIFwibW9yZUluZm9cIjogXG4gICAgICAgICAgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL2RldmVsb3Blci5wYWNpZWxsb2dyb3VwLmNvbS9yZXNvdXJjZXMvY29udHJhc3RhbmFseXNlci9cIixcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb2xvdXIgQ29udHJhc3QgQW5hbHlzZXJcIiBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuaW5jbHVzaXZlZGVzaWdudG9vbGtpdC5jb20vVUN2aXNpb24vdmlzaW9uLmh0bWwjY29sb3VyXCIsXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiRW5zdXJlIHN1ZmZpY2llbnQgY29udHJhc3RcIiBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICB9LFxuICAgICAgXCJmYXJzaWdodGVkbmVzc1wiOlxuICAgICAge1xuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiRmFyLXNpZ2h0ZWRuZXNzXCIsXG4gICAgICAgIFwiZmFjdFwiOiBcIkZhci1zaWdodGVkbmVzcyAoSHlwZXJvcGlhKSBpcyBvbmUgb2YgdGhlIG1vc3QgY29tbW9uIHZpc3VhbCBpbXBhaXJtZW50cy4gUGVvcGxlIHdpdGggSHlwZXJvcGlhIGhhdmUgZGlmZmljdWx0eSBmb2N1c2luZyBvbiBvYmplY3RzIGF0IGNsb3NlIHJhbmdlIHdoaWNoIG1ha2VzIHRoZW0gYXBwZWFyIGJsdXJyeS5cIixcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xuICAgICAgICAgIFwiQXZvaWQgdGV4dCBpbiBzbWFsbCBmb250IHNpemVzIGFuZCBsb25nIHRleHRzLiBVc2UgcHJvcGVyIHNwYWNpbmcgYW5kIGxpbmUgaGVpZ2h0LlwiLCAgXG4gICAgICAgICAgXCJNYWtlIHN1cmUgdGhlIHdlYnNpdGUgY2FuIGJlIHpvb21lZCB0byBhdCBsZWFzdCAyMDAlLlwiLFxuICAgICAgICAgIFwiT2ZmZXIgYSB0ZXh0IHRvIHNwZWVjaCByZWFkZXIuXCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcbiAgICAgICAgICBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly9pbmNsdXNpdmVkZXNpZ25wcmluY2lwbGVzLm9yZy8jcHJvdmlkZS1jb21wYXJhYmxlLWV4cGVyaWVuY2VcIixcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJQcm92aWRlIGNvbXBhcmFibGUgZXhwZXJpZW5jZVwiIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL3d3dy5pbmNsdXNpdmVkZXNpZ250b29sa2l0LmNvbS9VQ3Zpc2lvbi92aXNpb24uaHRtbCNzaGFwZVwiLFxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbnNpZGVyIHNpemVcIiBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICB9LFxuICAgICAgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6XG4gICAgICB7XG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlIVwiLFxuICAgICAgICBcImhlYWRpbmdcIjogXCJUb3RhbCBjb2xvciBibGluZG5lc3NcIixcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVvcGxlIHdpdGggbG93ZXJlZCBjb2xvciB2aXNpb24gaGF2ZSBkaWZmaWN1bHR5IGRpc3Rpbmd1aXNoaW5nIHNvbWUgb3IgYWxsIGNvbG9ycy4gVG90YWwgY29sb3IgYmxpbmRuZXNzIChNb25vY2hyb21hdGljIC8gQWNocm9tYXRvcHN5KSBpcyB2ZXJ5IHJhcmUuIFBlb3BsZSB3aXRoIHRoaXMgdmlzdWFsIGltcGFpcm1lbnQgY2FuIG5vdCBwZXJjaWV2ZSBhbnkgY29sb3JzLCBvbmx5IGRpZmZlcmVudCBzaGFkZXMgb2YgZ3JheS5cIixcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xuICAgICAgICAgIFwiRG8gbm90IHVzZSBjb2xvciBhcyB0aGUgb25seSB3YXkgdG8gY29udmV5IGluZm9ybWF0aW9uLCBpbmRpY2F0ZSBhbiBhY3Rpb24gb3IgaWRlbnRpZnkgYW4gZWxlbWVudC4gRm9yIGV4YW1wbGUsIGRvIG5vdCBtYXJrIGFuIGluY29ycmVjdCBmb3JtIGZpZWxkIHdpdGggYSByZWQgYm9yZGVyIG9ubHksIGFsc28gc3VwcGxlbWVudCB3aXRoIGEgdGV4dCBhbmQgcHJlZmVyYWJseSBhbiBpY29uLlwiLFxuwqDCoMKgwqDCoMKgwqDCoMKgwqBcIkNvbnNpZGVyIG9mZmVyaW5nIGEgaGlnaCBjb250cmFzdCBtb2RlLlwiXG4gICAgICAgIF0sXG4gICAgICAgIFwibW9yZUluZm9cIjogXG4gICAgICAgICAgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy53My5vcmcvV0FJL2dldHRpbmdzdGFydGVkL3RpcHMvZGVzaWduaW5nLmh0bWwjcHJvdmlkZS1zdWZmaWNpZW50LWNvbnRyYXN0LWJldHdlZW4tZm9yZWdyb3VuZC1hbmQtYmFja2dyb3VuZFwiLFxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIlByb3ZpZGUgc3VmZmljaWVudCBjb250cmFzdCBiZXR3ZWVuIGZvcmVncm91bmQgYW5kIGJhY2tncm91bmRcIiBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnczLm9yZy9XQUkvZ2V0dGluZ3N0YXJ0ZWQvdGlwcy9kZXNpZ25pbmcuaHRtbCNkb250LXVzZS1jb2xvci1hbG9uZS10by1jb252ZXktaW5mb3JtYXRpb25cIixcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJEb27igJl0IHVzZSBjb2xvciBhbG9uZSB0byBjb252ZXkgaW5mb3JtYXRpb25cIiBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnczLm9yZy9UUi9VTkRFUlNUQU5ESU5HLVdDQUcyMC92aXN1YWwtYXVkaW8tY29udHJhc3QtY29udHJhc3QuaHRtbCN2aXN1YWwtYXVkaW8tY29udHJhc3QtY29udHJhc3QtcmVzb3VyY2VzLWhlYWRcIixcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJMaXN0IG9mIHRvb2xzIHRvIGhlbHAgZGV0ZXJtaW5lIGNvbnRyYXN0IHJhdGlvXCIgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgfSxcblxuICAgICAgXCJ0dW5uZWxWaXNpb25cIjpcbiAgICAgIHtcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhIG1vdmUgdGhlIG1vdXNlIHBvaW50ZXIgb24gdGhlIHdlYiBwYWdlIGFuZCBzZWUgd2hhdCdzIGhhcHBlbmluZy5cIixcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiVHVubmVsIFZpc2lvblwiLFxuICAgICAgICBcImZhY3RcIjogXCJXaGF0IGlzIGNvbW1vbmx5IGNhbGxlZCBUdW5uZWwgVmlzaW9uIGlzIGxvc3Mgb2YgcGVyaXBoZXJhbCB2aXNpb24uIFRoaXMgbWF5IGJlIGJlY2F1c2UgdGhlIHBlcnNvbiBzdWZmZXJzIGZyb20gYSBkaXNlYXNlIHRoYXQgYWZmZWN0cyB0aGUgY2VsbHMgaW4gdGhlIGV5ZSwgYnV0IG1heSBhbHNvIG9jY3VyIHRlbXBvcmFyaWx5IGR1ZSB0byBzdHJlc3Mgb3IgZGVwcmVzc2lvbi5cIixcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xuICAgICAgICAgIFwiQXZvaWQgdGV4dCBpbiBzbWFsbCBmb250IHNpemVzIGFuZCBsb25nIHRleHRzLiBVc2UgcHJvcGVyIHNwYWNpbmcgYW5kIGxpbmUgaGVpZ2h0LlwiLFxuICAgICAgICAgIFwiTWFrZSBzdXJlIHRoZSB3ZWJzaXRlIGNhbiBiZSB6b29tZWQgdG8gYXQgbGVhc3QgMjAwJS5cIixcbiAgICAgICAgICBcIk9mZmVyIGEgdGV4dCB0byBzcGVlY2ggcmVhZGVyLlwiXG4gICAgICAgIF0sXG4gICAgICAgIFwibW9yZUluZm9cIjogXG4gICAgICAgICAgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vaW5jbHVzaXZlZGVzaWducHJpbmNpcGxlcy5vcmcvI2dpdmUtY29udHJvbFwiLFxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkFsbG93IHpvb21cIiBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuaW5jbHVzaXZlZGVzaWdudG9vbGtpdC5jb20vVUN2aXNpb24vdmlzaW9uLmh0bWwjbGF5b3V0XCIsXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29uc2lkZXIgdmlzdWFsIGZpZWxkIGxvc3NcIiBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICB9LFxuICAgICAgXCJzdW5zaGluZVwiOlxuICAgICAge1xuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiU3Vuc2hpbmVcIixcbiAgICAgICAgXCJmYWN0XCI6IFwiTG9yZW0gaXBzdW1cIixcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xuICAgICAgICAgIFwiTG9yZW0gaXBzdW0uXCIsXG4gICAgICAgICAgXCJMb3JlbSBpcHN1bS5cIixcbiAgICAgICAgICBcIkxvcmVtIGlwc3VtXCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcbiAgICAgICAgICBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly9pbmNsdXNpdmVkZXNpZ25wcmluY2lwbGVzLm9yZy8jY29uc2lkZXItc2l0dWF0aW9uXCIsXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29uc2lkZXIgc2l0dWF0aW9uXCIgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmluY2x1c2l2ZWRlc2lnbnRvb2xraXQuY29tL1VDdmlzaW9uL3Zpc2lvbi5odG1sI2xpZ2h0aW5nXCIsXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29uc2lkZXIgbGlnaHRpbmcgY29uZGl0aW9uc1wiIFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBcImNvbmNlbnRyYXRpb25cIjpcbiAgICAgIHtcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkNvbmNlbnRyYXRpb25cIixcbiAgICAgICAgXCJmYWN0XCI6IFwiRXZlcnlvbmUgY2FuIGhhdmUgYSBoYXJkIHRpbWUgY29uY2VudHJhdGluZywgYnV0IGZvciBzb21lIGl0IGNhbiBiZSBhIGJpZyBwcm9ibGVtIGluIGV2ZXJ5ZGF5IGxpZmUuIERpc2FiaWxpdGllcyBsaWtlIEFESEQgYW5kIEF1dGlzbSBjYW4gY2F1c2UgZGlmZmljdWx0eSBpbiBoYW5kbGluZyBpbXByZXNzaW9ucywgc29ydGluZyBpbmZvcm1hdGlvbiBhbmQgc2Vuc2l0aXZpdHkgdG8gc291bmQuXCIsICAgICAgICBcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xuICAgICAgICAgIFwiR2l2ZSB0aGUgd2Vic2l0ZSBhIHNpbXBsZSBhbmQgY2xlYW4gZGVzaWduLlwiLFxuICAgICAgICAgIFwiQmUgY2FyZWZ1bCB3aXRoIGFuaW1hdGlvbnMgYW5kIHN0cm9uZyBjb2xvcnMuXCIsXG4gICAgICAgICAgXCJBdm9pZCBoYXZpbmcgdG9vIG11Y2ggY29udGVudCBvbiB0aGUgc2FtZSBwYWdlLlwiLFxuICAgICAgICAgIFwiT2ZmZXIgaW1hZ2UsIGF1ZGlvIGFuZCB2aWRlbyBhbGVybmF0aXZlcyB0byB0ZXh0IGNvbnRlbnQuXCJcbiAgICAgICAgXSxcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcbiAgICAgICAgICBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly9pbmNsdXNpdmVkZXNpZ25wcmluY2lwbGVzLm9yZy8jYmUtY29uc2lzdGVudFwiLFxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkJlIGNvbnNpc3RlbnRcIiBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuaW5jbHVzaXZlZGVzaWdudG9vbGtpdC5jb20vVUN0aGlua2luZy90aGlua2luZy5odG1sI2ludGVyZmFjZV9uYXZpZ2F0aW9uX2FuZF9uZXN0ZWRfbWVudXNcIixcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJBdm9pZCBkZWVwIGhpZXJhcmNoaWVzXCIgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuaW5jbHVzaXZlZGVzaWdudG9vbGtpdC5jb20vVUN0aGlua2luZy90aGlua2luZy5odG1sI3N0cnVjdHVyaW5nX2luZm9ybWF0aW9uXCIsXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiUmVkdWNlIG1lbW9yeSBsb2FkXCIgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmluY2x1c2l2ZWRlc2lnbnRvb2xraXQuY29tL1VDdGhpbmtpbmcvdGhpbmtpbmcuaHRtbCNhdHRlbnRpb25cIixcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJBdm9pZCBtdWx0aXBsZSBmb2N1c2VzIG9mIGF0dGVudGlvblwiIFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOlxuICAgICAge1xuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiU21hbGwgdm9jYWJ1bGFyeVwiLFxuICAgICAgICBcImZhY3RcIjogXCJBIGxhcmdlIHBhcnQgb2YgdGhlIHdvcmxkJ3MgcG9wdWxhdGlvbiBjYW4ndCByZWFkIGF0IGFsbCBhbmQgbWFueSBhZHVsdHMgZG9uJ3QgcmVhZCBhcyB3ZWxsIGFzIGV4cGVjdGVkIGFmdGVyIGZpbmlzaGluZyBncmFkZSBzY2hvb2wuXCIsXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcbiAgICAgICAgICBcIkF2b2lkIGRpZmZpY3VsdCB3b3JkcyBhbmQgdGVybXMuXCIsXG4gICAgICAgICAgXCJPZmZlciBlYXN5IHRvIHJlYWQgdGV4dHMsIGltYWdlcywgdmlkZW8gb3IgYXVkaW8gYWx0ZXJuYXRpdmVzLlwiLFxuICAgICAgICAgIFwiT2ZmZXIgdGV4dHMgaW4gZGlmZmVyZW50IGxhbmd1YWdlcy5cIlxuICAgICAgICBdXG4gICAgICB9XG4gICAgfSxcbiAgICBcIlVJXCI6IHtcbiAgICAgIFwic2VsZWN0U2ltdWxhdGlvblwiOiBcIlNlbGVjdCBzaW11bGF0aW9uOlwiLFxuICAgICAgXCJyZXNldFwiOiBcIlJlc2V0XCIsXG4gICAgICBcImFkdmljZVwiOiBcIlRoaW5rIGFib3V0IHRoaXNcIixcbiAgICAgIFwibW9yZUluZm9cIjogXCJNb3JlIGluZm9ybWF0aW9uXCIsXG4gICAgICBcInNpZ2h0XCI6IFwiU2lnaHRcIixcbiAgICAgIFwidG90YWxDb2xvckJsaW5kbmVzc1wiOiBcIlRvdGFsIGNvbG9yIGJsaW5kbmVzc1wiLFxuICAgICAgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjogXCJZZWxsb3ctQmx1ZSBjb2xvciBibGluZG5lc3NcIiwgICAgXG4gICAgICBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSZWQtR3JlZW4gY29sb3IgYmxpbmRuZXNzXCIsXG4gICAgICBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiRmFyLXNpZ2h0ZWRuZXNzXCIsXG4gICAgICBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbCB2aXNpb25cIixcbiAgICAgIFwibW9iaWxpdHlcIjogXCJNb2JpbGl0eVwiLFxuICAgICAgXCJwYXJraW5zb25zXCI6IFwiUGFya2luc29uc1wiLFxuICAgICAgXCJyZWFkQW5kV3JpdGVcIjogXCJSZWFkIGFuZCB3cml0ZVwiLFxuICAgICAgXCJkeXNsZXhpYVwiOiBcIkR5c2xleGlhXCIsXG4gICAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOiBcIlNtYWxsIHZvY2FidWxhcnlcIixcbiAgICAgIFwiY29uY2VudHJhdGlvblwiOiBcIkNvbmNlbnRyYXRpb25cIixcbiAgICAgIFwiY2hhbmdlU2V0dGluZ3NcIjogXCJDaGFuZ2Ugc2V0dGluZ3NcIixcbiAgICAgIFwic2VsZWN0TGFuZ3VhZ2VcIjogXCJTZWxlY3QgbGFuZ3VhZ2VcIixcbiAgICAgIFwic2F2ZVNldHRpbmdzXCI6IFwiU2F2ZSBzZXR0aW5nc1wiLFxuICAgICAgXCJjYW5jZWxcIjogXCJDYW5jZWxcIixcbiAgICAgIFwic2ltdWxhdGlvbnNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiU2lnaHRcIixcbiAgICAgICAgICBcImNob2ljZXNcIjogW1xuICAgICAgICAgICAgeyBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJUb3RhbCBjb2xvciBibGluZG5lc3NcIiB9LFxuICAgICAgICAgICAgeyBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIlllbGxvdy1CbHVlIGNvbG9yIGJsaW5kbmVzc1wiIH0sXG4gICAgICAgICAgICB7IFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOiBcIlJlZC1HcmVlbiBjb2xvciBibGluZG5lc3NcIiB9LFxuICAgICAgICAgICAgeyBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiRmFyLXNpZ2h0ZWRuZXNzXCIgfSxcbiAgICAgICAgICAgIHsgXCJ0dW5uZWxWaXNpb25cIjogXCJUdW5uZWwgdmlzaW9uXCIgfSxcbiAgICAgICAgICAgIHsgXCJzdW5zaGluZVwiOiBcIlN1bnNoaW5lXCIgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIk1vYmlsaXR5XCIsXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFsgXG4gICAgICAgICAgICB7IFwicGFya2luc29uc1wiOiBcIlBhcmtpbnNvbnNcIiB9XG4gICAgXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJSZWFkIGFuZCB3cml0ZVwiLFxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXG4gICAgICAgICAgICB7IFwiZHlzbGV4aWFcIjogXCJEeXNsZXhpYVwiIH0sXG4gICAgICAgICAgICB7IFwic21hbGxWb2NhYnVsYXJ5XCI6IFwiU21hbGwgdm9jYWJ1bGFyeVwiIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJDb25jZW50cmF0aW9uXCIsXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJNZW1vcnlcIixcbiAgICAgICAgICBcImNob2ljZXNcIjogW11cbiAgICAgICAgfVxuXG4gICAgICBdXG4gICAgfVxuICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIGxvYWRlZFNpbXVsYXRpb25zID0gW107XG5cbmZ1bmN0aW9uIGxvYWQobmFtZSwgc3ViTmFtZSwgY2FsbGJhY2spIHtcbiAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXSxcbiAgICAgICAgc2NyaXB0RmlsZSA9IHN1Yk5hbWUgPyAnc2ltdWxhdGlvbnMvJyArIG5hbWUgKyAnLycgKyBzdWJOYW1lICsgJy9jb250ZW50LmpzJyA6ICdzaW11bGF0aW9ucy8nICsgbmFtZSArICcvY29udGVudC5qcyc7XG5cbiAgICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KGFjdGl2ZVRhYi5pZCwgeyBmaWxlOiBzY3JpcHRGaWxlIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxvYWRlZFNpbXVsYXRpb25zLnB1c2gobmFtZSk7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sobmFtZSwgc3ViTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdGFydChuYW1lLCBzdWJOYW1lKSB7XG4gIGlmIChsb2FkZWRTaW11bGF0aW9ucy5pbmNsdWRlcyhuYW1lKSkge1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0YXJ0U2ltdWxhdGlvbicsIHNpbXVsYXRpb246IG5hbWUsIHN1YlNpbXVsYXRpb246IHN1Yk5hbWUgfSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgbG9hZChuYW1lLCBzdWJOYW1lLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RhcnRTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSwgc3ViU2ltdWxhdGlvbjogc3ViTmFtZSB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0b3AobmFtZSwgc3ViTmFtZSkge1xuICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0b3BTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSwgc3ViU2ltdWxhdGlvbjogc3ViTmFtZSB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydHMuc3RhcnQgPSBzdGFydDtcbmV4cG9ydHMuc3RvcCA9IHN0b3A7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaW11bGF0aW9uTG9hZGVyLmpzLm1hcFxuIl19
