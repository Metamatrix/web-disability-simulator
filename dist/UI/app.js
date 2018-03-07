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

      $.each(obj.moreInfo, function (i) {
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

    $.each(texts.moreInfo, function (i) {
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

  lang = 'en';

  setTexts();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC9VSS9hcHAuanMiLCJidWlsZC9qcy9iYWJlbC9VSS9kYXRhL2RhdGEuanNvbiIsImJ1aWxkL2pzL2JhYmVsL3V0aWxzL3NpbXVsYXRpb25Mb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxJQUFJLFFBQVEsUUFBUSxrQkFBUixDQUFaOztBQUVBLElBQUksZUFBZSx3QkFBd0IsS0FBeEIsQ0FBbkI7O0FBRUEsSUFBSSxvQkFBb0IsUUFBUSw4QkFBUixDQUF4Qjs7QUFFQSxJQUFJLG1CQUFtQix3QkFBd0IsaUJBQXhCLENBQXZCOztBQUVBLFNBQVMsdUJBQVQsQ0FBaUMsR0FBakMsRUFBc0M7QUFBRSxNQUFJLE9BQU8sSUFBSSxVQUFmLEVBQTJCO0FBQUUsV0FBTyxHQUFQO0FBQWEsR0FBMUMsTUFBZ0Q7QUFBRSxRQUFJLFNBQVMsRUFBYixDQUFpQixJQUFJLE9BQU8sSUFBWCxFQUFpQjtBQUFFLFdBQUssSUFBSSxHQUFULElBQWdCLEdBQWhCLEVBQXFCO0FBQUUsWUFBSSxPQUFPLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBcUMsR0FBckMsRUFBMEMsR0FBMUMsQ0FBSixFQUFvRCxPQUFPLEdBQVAsSUFBYyxJQUFJLEdBQUosQ0FBZDtBQUF5QjtBQUFFLEtBQUMsT0FBTyxPQUFQLEdBQWlCLEdBQWpCLENBQXNCLE9BQU8sTUFBUDtBQUFnQjtBQUFFOztBQUU3USxJQUFJLE9BQU8sSUFBWDs7QUFFQSxTQUFTLGVBQVQsR0FBMkI7O0FBRXpCLFNBQU8sT0FBUCxDQUFlLEtBQWYsQ0FBcUIsR0FBckIsQ0FBeUIsa0JBQXpCLEVBQTZDLFVBQVUsR0FBVixFQUFlO0FBQzFELHFCQUFpQixLQUFqQixDQUF1QixJQUFJLGdCQUEzQjtBQUNELEdBRkQ7QUFHRDs7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25jQTs7QUFFQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsU0FBTztBQURvQyxDQUE3QztBQUdBLElBQUksb0JBQW9CLEVBQXhCOztBQUVBLFNBQVMsSUFBVCxDQUFjLElBQWQsRUFBb0IsT0FBcEIsRUFBNkIsUUFBN0IsRUFBdUM7QUFDckMsU0FBTyxJQUFQLENBQVksS0FBWixDQUFrQixFQUFFLFFBQVEsSUFBVixFQUFnQixlQUFlLElBQS9CLEVBQWxCLEVBQXlELFVBQVUsSUFBVixFQUFnQjtBQUN2RSxRQUFJLFlBQVksS0FBSyxDQUFMLENBQWhCO0FBQUEsUUFDSSxhQUFhLFVBQVUsaUJBQWlCLElBQWpCLEdBQXdCLEdBQXhCLEdBQThCLE9BQTlCLEdBQXdDLGFBQWxELEdBQWtFLGlCQUFpQixJQUFqQixHQUF3QixhQUQzRzs7QUFHQSxXQUFPLElBQVAsQ0FBWSxhQUFaLENBQTBCLFVBQVUsRUFBcEMsRUFBd0MsRUFBRSxNQUFNLFVBQVIsRUFBeEMsRUFBOEQsWUFBWTtBQUN4RSx3QkFBa0IsSUFBbEIsQ0FBdUIsSUFBdkI7QUFDQSxVQUFJLFFBQUosRUFBYztBQUNaLGlCQUFTLElBQVQsRUFBZSxPQUFmO0FBQ0Q7QUFDRixLQUxEO0FBTUQsR0FWRDtBQVdEOztBQUVELFNBQVMsS0FBVCxDQUFlLElBQWYsRUFBcUIsT0FBckIsRUFBOEI7QUFDNUIsTUFBSSxrQkFBa0IsUUFBbEIsQ0FBMkIsSUFBM0IsQ0FBSixFQUFzQztBQUNwQyxXQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEVBQUUsUUFBUSxJQUFWLEVBQWdCLGVBQWUsSUFBL0IsRUFBbEIsRUFBeUQsVUFBVSxJQUFWLEVBQWdCO0FBQ3ZFLFVBQUksWUFBWSxLQUFLLENBQUwsQ0FBaEI7O0FBRUEsYUFBTyxJQUFQLENBQVksV0FBWixDQUF3QixVQUFVLEVBQWxDLEVBQXNDLEVBQUUsUUFBUSxpQkFBVixFQUE2QixZQUFZLElBQXpDLEVBQStDLGVBQWUsT0FBOUQsRUFBdEM7QUFDRCxLQUpEO0FBS0QsR0FORCxNQU1PO0FBQ0wsU0FBSyxJQUFMLEVBQVcsT0FBWCxFQUFvQixZQUFZO0FBQzlCLGFBQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsRUFBRSxRQUFRLElBQVYsRUFBZ0IsZUFBZSxJQUEvQixFQUFsQixFQUF5RCxVQUFVLElBQVYsRUFBZ0I7QUFDdkUsWUFBSSxZQUFZLEtBQUssQ0FBTCxDQUFoQjs7QUFFQSxlQUFPLElBQVAsQ0FBWSxXQUFaLENBQXdCLFVBQVUsRUFBbEMsRUFBc0MsRUFBRSxRQUFRLGlCQUFWLEVBQTZCLFlBQVksSUFBekMsRUFBK0MsZUFBZSxPQUE5RCxFQUF0QztBQUNELE9BSkQ7QUFLRCxLQU5EO0FBT0Q7QUFDRjs7QUFFRCxTQUFTLElBQVQsQ0FBYyxJQUFkLEVBQW9CLE9BQXBCLEVBQTZCO0FBQzNCLFNBQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsRUFBRSxRQUFRLElBQVYsRUFBZ0IsZUFBZSxJQUEvQixFQUFsQixFQUF5RCxVQUFVLElBQVYsRUFBZ0I7QUFDdkUsUUFBSSxZQUFZLEtBQUssQ0FBTCxDQUFoQjs7QUFFQSxXQUFPLElBQVAsQ0FBWSxXQUFaLENBQXdCLFVBQVUsRUFBbEMsRUFBc0MsRUFBRSxRQUFRLGdCQUFWLEVBQTRCLFlBQVksSUFBeEMsRUFBOEMsZUFBZSxPQUE3RCxFQUF0QztBQUNELEdBSkQ7QUFLRDs7QUFFRCxRQUFRLEtBQVIsR0FBZ0IsS0FBaEI7QUFDQSxRQUFRLElBQVIsR0FBZSxJQUFmO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9kYXRhID0gcmVxdWlyZSgnLi9kYXRhL2RhdGEuanNvbicpO1xuXG52YXIgbGFuZ3VhZ2VEYXRhID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2RhdGEpO1xuXG52YXIgX3NpbXVsYXRpb25Mb2FkZXIgPSByZXF1aXJlKCcuLi91dGlscy9zaW11bGF0aW9uTG9hZGVyLmpzJyk7XG5cbnZhciBzaW11bGF0aW9uTG9hZGVyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3NpbXVsYXRpb25Mb2FkZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG52YXIgbGFuZyA9IFwiZW5cIjtcblxuZnVuY3Rpb24gc3RhcnRTaW11bGF0aW9uKCkge1xuXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlU2ltdWxhdGlvbicsIGZ1bmN0aW9uIChvYmopIHtcbiAgICBzaW11bGF0aW9uTG9hZGVyLnN0YXJ0KG9iai5hY3RpdmVTaW11bGF0aW9uKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0U2ltdWxhdGlvbih0b29sdGlwKSB7XG5cbiAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7XG4gICAgcGF0aDogXCJpbWcvaWNvbi5wbmdcIlxuICB9KTtcblxuICB0b29sdGlwLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICQoXCIjcGFuZWwxXCIpLmFkZENsYXNzKFwiaW5cIik7XG4gICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgdG9vbHRpcC5hZGRDbGFzcyhcImhpZGVcIik7XG4gIH0sIDI1MCk7XG5cbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuICAgIHNpbXVsYXRpb25Mb2FkZXIuc3RvcChvYmouYWN0aXZlU2ltdWxhdGlvbik7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKCdhY3RpdmVTaW11bGF0aW9uJyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRUZXh0cygpIHtcblxuICB2YXIgZGF0YSA9IGxhbmd1YWdlRGF0YVtsYW5nXTtcblxuICAkKFwiLm1vcmUtaW5mby1saW5rXCIpLnRleHQoZGF0YS5VSS5tb3JlSW5mbyk7XG4gICQoXCIjcmVzZXQtYnRuXCIpLnRleHQoZGF0YS5VSS5yZXNldCk7XG4gICQoXCIubmF2YmFyLWhlYWRlclwiKS50ZXh0KGRhdGEuVUkuc2VsZWN0U2ltdWxhdGlvbik7XG4gICQoXCIjYWR2aWNlLWRyb3Bkb3duXCIpLnRleHQoZGF0YS5VSS5hZHZpY2UpO1xuICAkKFwiI2luZm8tZHJvcGRvd25cIikudGV4dChkYXRhLlVJLm1vcmVJbmZvKTtcbiAgJChcIiNzaWdodFwiKS50ZXh0KGRhdGEuVUkuc2lnaHQpO1xuICAkKFwiI21vYmlsaXR5XCIpLnRleHQoZGF0YS5VSS5tb2JpbGl0eSk7XG4gICQoXCIjcmVhZFdyaXRlXCIpLnRleHQoZGF0YS5VSS5yZWFkQW5kV3JpdGUpO1xuICAkKFwiI2NvbmNlbnRyYXRpb25cIikudGV4dChkYXRhLlVJLmNvbmNlbnRyYXRpb24pO1xuXG4gICQuZWFjaChkYXRhLlVJLnNpbXVsYXRpb25zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcblxuICAgICQoJyMnICsgdmFsdWUuaGVhZGluZykudGV4dCh2YWx1ZS5oZWFkaW5nKTtcblxuICAgICQuZWFjaCh2YWx1ZS5jaG9pY2VzLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgICAgICAkKCcjJyArIGtleSkudGV4dCh2YWx1ZVtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgJCgnI3NldHRpbmdzLWhlYWRpbmcnKS50ZXh0KGRhdGEuVUkuY2hhbmdlU2V0dGluZ3MpO1xuICAkKCcjbGFuZ3VhZ2UtbGFiZWwnKS50ZXh0KGRhdGEuVUkuc2VsZWN0TGFuZ3VhZ2UpO1xuICAkKCcjYnRuLXNhdmUtc2V0dGluZ3MnKS50ZXh0KGRhdGEuVUkuc2F2ZVNldHRpbmdzKTtcbiAgJCgnI2J0bi1jYW5jZWwtc2V0dGluZ3MnKS50ZXh0KGRhdGEuVUkuY2FuY2VsKTtcbn1cblxuZnVuY3Rpb24gcmVhZE1vcmVMaW5rcygpIHtcblxuICB2YXIgcmVhZE1vcmVMaW5rID0gJCgnLm1vcmUtaW5mby1saW5rcycpLmZpbmQoJ2xpJyk7XG5cbiAgcmVhZE1vcmVMaW5rLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgdmFyIGN1cnJlbnRMaW5rID0gZXZlbnQudGFyZ2V0LmlubmVyVGV4dDtcblxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnbW9yZUluZm8nLCBmdW5jdGlvbiAob2JqKSB7XG5cbiAgICAgICQuZWFjaChvYmoubW9yZUluZm8sIGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIGlmIChjdXJyZW50TGluayA9PSBvYmoubW9yZUluZm9baV0ubW9yZUluZm9MaW5rVGV4dCkge1xuICAgICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogJycgKyBvYmoubW9yZUluZm9baV0ubW9yZUluZm9VcmwgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0VG9vbHRpcFRleHRzKGFjdGl2ZVNpbXVsYXRpb24pIHtcblxuICB2YXIgZGF0YSA9IGxhbmd1YWdlRGF0YVtsYW5nXTtcblxuICB2YXIgc2ltdWxhdGlvblN0YXR1cyA9ICQoXCIuc2ltdWxhdGlvbi1zdGFydGVkLXBhcmFncmFwaFwiKTtcbiAgdmFyIHNpbXVsYXRpb25TdGF0dXNBbGVydCA9ICQoXCIuc2ltdWxhdGlvbi1zdGFydGVkLWFsZXJ0XCIpO1xuICB2YXIgaW5mb0hlYWRpbmcgPSAkKFwiLmRpc2FiaWxpdHktaW5mby1oZWFkaW5nXCIpO1xuICB2YXIgaW5mb1BhcmFncmFwaCA9ICQoXCIuZGlzYWJpbGl0eS1pbmZvLXBhcmFncmFwaFwiKTtcbiAgdmFyIGFkdmljZUxpc3QgPSAkKFwiLmFkdmljZS1saXN0XCIpO1xuICB2YXIgbW9yZUluZm9MaW5rcyA9ICQoXCIubW9yZS1pbmZvLWxpbmtzXCIpO1xuICB2YXIgbW9yZUluZm9QYW5lbCA9ICQoJyNtb3JlLWluZm8tcGFuZWwnKTtcbiAgdmFyIHRleHRzID0gZGF0YS5mYWN0c1thY3RpdmVTaW11bGF0aW9uXTtcblxuICBzaW11bGF0aW9uU3RhdHVzLmVtcHR5KCk7XG4gIGluZm9IZWFkaW5nLmVtcHR5KCk7XG4gIGluZm9QYXJhZ3JhcGguZW1wdHkoKTtcbiAgYWR2aWNlTGlzdC5lbXB0eSgpO1xuICBtb3JlSW5mb0xpbmtzLmVtcHR5KCk7XG5cbiAgc2ltdWxhdGlvblN0YXR1cy50ZXh0KHRleHRzLnNpbXVsYXRpb25TdGF0dXMpO1xuICBzaW11bGF0aW9uU3RhdHVzQWxlcnQucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuXG4gIGluZm9IZWFkaW5nLnRleHQodGV4dHMuaGVhZGluZyk7XG4gIGluZm9QYXJhZ3JhcGgudGV4dCh0ZXh0cy5mYWN0KTtcblxuICAkLmVhY2godGV4dHMubGlzdEl0ZW1zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICBhZHZpY2VMaXN0LmFwcGVuZCgnPGxpPicgKyB2YWx1ZSArICc8L2xpPicpO1xuICB9KTtcblxuICBpZiAodGV4dHMubW9yZUluZm8gIT09IHVuZGVmaW5lZCkge1xuICAgIG1vcmVJbmZvUGFuZWwucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG5cbiAgICAkLmVhY2godGV4dHMubW9yZUluZm8sIGZ1bmN0aW9uIChpKSB7XG4gICAgICBtb3JlSW5mb0xpbmtzLmFwcGVuZCgnPGxpPjxhPicgKyB0ZXh0cy5tb3JlSW5mb1tpXS5tb3JlSW5mb0xpbmtUZXh0ICsgJzwvYT48L2xpPicpO1xuICAgIH0pO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7ICdtb3JlSW5mbyc6IHRleHRzLm1vcmVJbmZvIH0pO1xuICB9IGVsc2Uge1xuICAgIG1vcmVJbmZvUGFuZWwuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gIH1cbn1cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gIHZhciB0b29sdGlwID0gJChcIi50b29sLXRpcFwiKTtcblxuICB2YXIgYWN0aXZlU2ltdWxhdGlvbiA9IHZvaWQgMDtcblxuICBsYW5nID0gJ2VuJztcblxuICBzZXRUZXh0cygpO1xuXG4gIC8vIFNldCBhY3RpdmUgc3RhdGVcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuXG4gICAgYWN0aXZlU2ltdWxhdGlvbiA9IG9iai5hY3RpdmVTaW11bGF0aW9uO1xuXG4gICAgaWYgKGFjdGl2ZVNpbXVsYXRpb24pIHtcbiAgICAgIHRvb2x0aXAuYWRkQ2xhc3MoXCJpblwiKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG4gICAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAgIHNldFRvb2x0aXBUZXh0cyhhY3RpdmVTaW11bGF0aW9uKTtcbiAgICAgIHJlYWRNb3JlTGlua3MoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIE1haW4gdmlld1xuICAkKFwiLm1lbnUtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBtZW51QnRuID0gJCh0aGlzKTtcbiAgICB2YXIgbWVudUJ0bklkID0gbWVudUJ0blswXS5pZDtcblxuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEljb24oe1xuICAgICAgcGF0aDogXCJpbWcvaWNvbl9hY3RpdmUucG5nXCJcbiAgICB9KTtcblxuICAgIGFjdGl2ZVNpbXVsYXRpb24gPSBtZW51QnRuSWQ7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgJ2FjdGl2ZVNpbXVsYXRpb24nOiBtZW51QnRuSWQgfSk7XG5cbiAgICBzZXRUb29sdGlwVGV4dHMoYWN0aXZlU2ltdWxhdGlvbik7XG5cbiAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAkKCcjcGFuZWwxJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgICQoJyNwYW5lbDInKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG4gICAgdG9vbHRpcC5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNwYW5lbDInKS5hZGRDbGFzcyhcImluXCIpO1xuICAgIH0sIDEwMCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0YXJ0U2ltdWxhdGlvbigpO1xuICAgIH0sIDUwMCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNwYW5lbDInKS5yZW1vdmVDbGFzcyhcImluXCIpO1xuICAgICAgdG9vbHRpcC5hZGRDbGFzcyhcImluXCIpO1xuICAgIH0sIDEwMDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwyJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgIH0sIDE1MDApO1xuXG4gICAgcmVhZE1vcmVMaW5rcygpO1xuICB9KTtcblxuICAkKFwiLmdpdGh1Yi1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6ICdodHRwczovL2dpdGh1Yi5jb20vTWV0YW1hdHJpeC9XZWItRGlzYWJpbGl0eS1TaW11bGF0b3InIH0pO1xuICB9KTtcblxuICAkKCcuc2V0dGluZ3MtbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdsYW5nJywgZnVuY3Rpb24gKG9iaikge1xuICAgICAgJCgnI2xhbmd1YWdlJykudmFsKG9iai5sYW5nKTtcbiAgICB9KTtcblxuICAgICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImluXCIpO1xuICAgICQoJyNzZXR0aW5ncycpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3NldHRpbmdzJykuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICB9LCAyNTApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwxJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgIH0sIDUwMCk7XG4gIH0pO1xuXG4gIC8vIFNldHRpbmdzIHZpZXdcblxuICAvKiAkKCcjYnRuLXNhdmUtc2V0dGluZ3MnKS5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICBcbiAgICAgdmFyIHNlbGVjdGVkTGFuZyA9ICQoJyNsYW5ndWFnZScpLnZhbCgpO1xyXG4gIFxuICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeydsYW5nJzogc2VsZWN0ZWRMYW5nfSk7XHJcbiAgXG4gICAgIGxhbmcgPSBzZWxlY3RlZExhbmc7XHJcbiAgXG4gICAgIHNldFRleHRzKCk7XHJcbiAgXG4gICAgICQoJyNzZXR0aW5ncycpLnJlbW92ZUNsYXNzKFwiaW5cIik7XHJcbiAgICAgJCgnI3BhbmVsMScpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcclxuICBcbiAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAkKCcjcGFuZWwxJykuYWRkQ2xhc3MoXCJpblwiKTtcclxuICAgICB9LCA1MDApO1xyXG4gIFxuICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICQoJyNzZXR0aW5ncycpLmFkZENsYXNzKFwiaGlkZVwiKTtcclxuICAgICB9LCA3NTApO1xyXG4gIFxuICAgfSk7XHJcbiAgXG4gICAkKCcjYnRuLWNhbmNlbC1zZXR0aW5ncycpLm9uKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIFxuICAgICAkKCcjc2V0dGluZ3MnKS5yZW1vdmVDbGFzcyhcImluXCIpO1xyXG4gICAgICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XHJcbiAgXG4gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgJCgnI3BhbmVsMScpLmFkZENsYXNzKFwiaW5cIik7XHJcbiAgICAgfSwgMjUwKTtcclxuICBcbiAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAkKCcjc2V0dGluZ3MnKS5hZGRDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgfSwgNTAwKTtcclxuICBcbiAgIH0pOyovXG5cbiAgLy8gVG9vbHRpcCB2aWV3XG5cbiAgJChcIi5zaW11bGF0aW9uLXN0YXJ0ZWQtYWxlcnQgLmNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkKFwiLnNpbXVsYXRpb24tc3RhcnRlZC1hbGVydFwiKS5hZGRDbGFzcyhcImhpZGVcIik7XG4gIH0pO1xuXG4gICQoXCIjcmVzZXQtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICByZXNldFNpbXVsYXRpb24odG9vbHRpcCk7XG4gIH0pO1xuXG4gIC8vcGFuZWwgY29sbGFwc2UsIHNob3cgYXJyb3dzOiBcbiAgJCgnLmNvbGxhcHNlJykub24oJ3Nob3duLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xuICAgICQodW5kZWZpbmVkKS5wYXJlbnQoKS5maW5kKFwiLmRvd24tYXJyb3csIC51cC1hcnJvd1wiKS50b2dnbGUoKTtcbiAgfSkub24oJ2hpZGRlbi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKHVuZGVmaW5lZCkucGFyZW50KCkuZmluZChcIi5kb3duLWFycm93LCAudXAtYXJyb3dcIikudG9nZ2xlKCk7XG4gIH0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAuanMubWFwXG4iLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgXCJzdlwiOlxyXG4gIHtcclxuICAgIFwiZmFjdHNcIjoge1xyXG4gICAgICBcImR5c2xleGlhXCI6IFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJEeXNsZXhpXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiRHlzbGV4aSDDpHIgZW4gbmVkc8OkdHRuaW5nIHNvbSBnw7ZyIGF0dCBoasOkcm5hbiBoYXIgc3bDpXJ0IGF0dCBhdXRvbWF0aXNlcmEgdG9sa25pbmdlbiBhdiBvcmQuIERldHRhIGfDtnIgYXR0IHBlcnNvbmVyIG1lZCBkZW5uYSBuZWRzw6R0dG5pbmcga2FuIGhhIHN2w6VydCBhdHQgbMOkc2Egb2NoIHNrcml2YS4gRHlzbGV4aSDDpHIgaW50ZSBrb3BwbGF0IHRpbGwgc3luIGVsbGVyIGludGVsbGlnZW5zLiBPcnNha2VybmEgdGlsbCBkeXNsZXhpIMOkciBmb3J0ZmFyYW5kZSBva2xhcnQuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJVbmR2aWsgdGV4dCBpIGxpdGVuIHN0b3JsZWsgb2NoIGzDpW5nYSB0ZXh0ZXIuIFNlIHRpbGwgYXR0IGhhIG9yZGVudGxpZ3QgbWVkIHJhZGF2c3TDpW5kLlwiLCBcdFxyXG4gICAgICAgICAgXCJVbmR2aWsgc3bDpXJhIG9yZCBvY2ggZmFja3Rlcm1lci5cIixcclxuICAgICAgICAgIFwiRXJianVkIGzDpHR0bMOkc3RhIHZlcnNpb25lciBhdiBmYWNrdGV4dGVyLlwiLFxyXG4gICAgICAgICAgXCJVbmR2aWsgdHlwc25pdHQgbWVkIGtyw6VuZ2xpZ2Egb2NoIGtvbXBsZXhhIGZpZ3VyZXIuXCJcclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXJraW5zb25zXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2ISByw7ZyIG11c3Bla2FyZW4gcMOlIHdlYmJwbGF0c2VuIG9jaCBzZSB2YWQgc29tIGjDpG5kZXIuXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiUGFya2luc29uc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlZpZCBQYXJraW5zb25zIHNqdWtkb20gZsO2cnN0w7ZycyBjZWxsZXJuYSBpIGhqw6RybmFuIHNvbSB0aWxsdmVya2FyIGRvcGFtaW4gdmlsa2V0IGfDtnIgYXR0IGhqw6RybmFuIGbDpXIgZW4gbmVkc2F0dCBmw7ZybcOlZ2EgYXR0IHNraWNrYSBzaWduYWxlci4gUGVyc29uZXIgbWVkIFBhcmtpbnNvbnMga2FuIGRyYWJiYXMgYXYgc3ltcHRvbSBzb20gc2tha25pbmdhciwgc3RlbGEgbXVza2xlciBvY2ggc8OkbXJlIHLDtnJlbHNlZsO2cm3DpWdhLiBPcnNha2VybmEgdGlsbCBQYXJraW5zb25zIHNqdWtkb20gw6RyIGZvcnRmYXJhbmRlIG9rbGFydC5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIlNlIHRpbGwgYXR0IHdlYmJwbGF0c2VuIGthbiBhbnbDpG5kYXMgbWVkIGFuZHJhIGhqw6RscG1lZGVsIMOkbiBtdXMsIHRpbGwgZXhlbXBlbCB0YW5nZW50Ym9yZHNuYXZpZ2VyaW5nLlwiLCBcdFxyXG4gICAgICAgICAgXCJIYSB0aWxscsOkY2tsaWd0IG1lZCBsdWZ0IG1lbGxhbiBrb21wb25lbnRlclwiLFxyXG4gICAgICAgICAgXCJIYSB0aWxscsOkY2tsaWd0IHN0b3JhIGtsaWNreXRvci5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1VybHNcIjogXCJodHRwOi8vd3d3LnBhcmtpbnNvbmZvcmJ1bmRldC5zZVwiLFxyXG4gICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJQYXJraW5zb25zZsO2cmJ1bmRldFwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgZGVmZWt0IGbDpHJnc2VlbmRlIGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6Ugdmlzc2EgZWxsZXIgYWxsYSBmw6RyZ2VyLiBFdHQgZnVsbHQgZnVuZ2VyYW5kZSDDtmdhIGhhciB0cmUgb2xpa2EgdGFwcGFyIHNvbSB0YXIgdXBwIGbDpHJnZXJuYSB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gTsOkciBlbiBlbGxlciBmbGVyYSBhdiB0YXBwYXJuYSBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEgbGVkZXIgZGV0IHRpbGwgZGVmZWt0IGbDpHJnc2VlbmRlLiBHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0IChUcml0YW5vcGkpIMOkciBzw6RsbHN5bnQuIE5hbW5ldCDDpHIgbWlzc2xlZGFuZGUgZMOlIGRldCBpbnRlIMOkciBmw6RyZ2VybmEgZ3VsIG9jaCBibMOlIHNvbSBmw7ZydsOkeGxhcywgdXRhbiBibMOlIG1lZCBncsO2biBvY2ggZ3VsIG1lZCBsaWxhLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBkZXQgZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCBlbiByw7ZkIHJhbSB1dGFuIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IG9jaCBnw6RybmEgZW4gaWtvbi5cIiwgXHRcclxuICAgICAgICAgIFwiRXJianVkIGfDpHJuYSBldHQgaMO2Z2tvbnRyYXN0LWzDpGdlLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvVXJsc1wiOiBcImh0dHBzOi8vc3Yud2lraXBlZGlhLm9yZy93aWtpL0RlZmVrdF9mJUMzJUE0cmdzZWVuZGVcIixcclxuICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2lraXBlZGlhIG9tIGRlZmVrdCBmw6RyZ3NlZW5kZVwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXRcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgZGVmZWt0IGbDpHJnc2VlbmRlIGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6Ugdmlzc2EgZWxsZXIgYWxsYSBmw6RyZ2VyLiBFdHQgZnVsbHQgZnVuZ2VyYW5kZSDDtmdhIGhhciB0cmUgb2xpa2EgdGFwcGFyIHNvbSB0YXIgdXBwIGbDpHJnZXJuYSB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gTsOkciBlbiBlbGxlciBmbGVyYSBhdiB0YXBwYXJuYSBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEgbGVkZXIgZGV0IHRpbGwgZGVmZWt0IGbDpHJnc2VlbmRlLiBSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXQgKFByb3Rhbm9waSBvY2ggRGV1dGVyYW5vcGkpIMOkciBkZW4gdmFubGlnYXN0ZSB0eXBlbiBhdiBmw6RyZ2JsaW5kaGV0LiBEZW4gw6RyIHZhbmxpZ2FyZSBob3MgbcOkbiDDpG4ga3Zpbm5vci4gUGVyc29uZXIgcsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0IGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6UgZsOkcmdlcm5hIHLDtmQsIGdyw7ZuLCBicnVuIG9jaCBvcmFuZ2UuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogXHJcbiAgICAgICAgW1wiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBlbmRhIHPDpHR0ZXQgYXR0IGbDtnJtZWRsYSBpbmZvcm1hdGlvbiwgaW5kaWtlcmEgZW4gaGFuZGxpbmcgZWxsZXIgaWRlbnRpZmllcmEgZXR0IGVsZW1lbnQuIE1hcmtlcmEgdGlsbCBleGVtcGVsIGludGUgZXR0IGZlbGFrdGlndCBmb3JtdWzDpHJmw6RsdCBlbmRhc3QgbWVkIHLDtmQgcmFtLCBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBvY2ggZ8Okcm5hIGVuICBpa29uLlwiLCBcIkVyYmp1ZCBnw6RybmEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIl0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1VybHNcIjogXCJodHRwczovL3N2Lndpa2lwZWRpYS5vcmcvd2lraS9EZWZla3RfZiVDMyVBNHJnc2VlbmRlXCIsXHJcbiAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldpa2lwZWRpYSBvbSBkZWZla3QgZsOkcmdzZWVuZGVcIlxyXG4gICAgICB9LFxyXG4gICAgICBcImZhcnNpZ2h0ZWRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkzDpW5nc3ludGhldFwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBIeXBlcm9waSBzZXIgc3VkZGlndCBww6UgbsOkcmEgaMOlbGwsIG1lbiBicmEgcMOlIGzDpW5ndCBow6VsbC4gTmVkc8OkdHRuaW5nZW4gdXBwc3TDpXIgcMOlIGdydW5kIGF2IGF0dCBsanVzZXQgaW50ZSBicnl0cyByw6R0dCBpIMO2Z2F0LiBEZXQgw6RyIGVuIGF2IGRlIHZhbmxpZ2FzdGUgc3lubmVkc8OkdHRuaW5nYXJuYS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIlVuZHZpayB0ZXh0IGkgbGl0ZW4gc3Rvcmxlay5cIiwgXHRcclxuICAgICAgICAgIFwiV2ViYnNpZGFuIHNrYSBnw6UgYXR0IGbDtnJzdG9yYSAoem9vbWFzKSB0aWxsIG1pbnN0IDIwMCAlIHPDpSBhdHQgYmVzw7ZrYXJlbiBrYW4gYW5wYXNzYSBpbm5laMOlbGxldHMgc3RvcmxlayBlZnRlciBzaW5hIGJlaG92LlwiLFxyXG4gICAgICAgICAgXCJFcmJqdWQgdXBwbMOkc25pbmcgYXYgaW5uZWjDpWxsZXQuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9VcmxzXCI6IFwiaHR0cHM6Ly93ZWJicmlrdGxpbmplci5zZS9yLzM5LWdlLXdlYmJwbGF0c2VuLWVuLWdvZC1sYXNiYXJoZXQvXCIsXHJcbiAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldlYmJyaWt0bGluamUgR2Ugd2ViYnBsYXRzZW4gZ29kIGzDpHNiYXJoZXRcIlxyXG4gICAgICB9LFxyXG4gICAgICBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiSGVsdCBmw6RyZ2JsaW5kXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiRGVmZWt0IGbDpHJnc2VlbmRlIGlubmViw6RyIGF0dCBlbiBwZXJzb24gaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0eXBlciBhdiB0YXBwYXIgc29tIHRhciB1cHAgb2xpa2EgZsOkcmdlcjogdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE9yc2FrZW4gdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUgw6RyIGF0dCBlbiBlbGxlciBmbGVyYSBhdiBkZXNzYSB0eXBlciBhdiB0YXBwYXIgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhLiBIZWx0IGbDpHJnYmxpbmQgKE1vbm9rcm9tYXNpL2Frcm9tYXRvcHNpKSDDpHIgbXlja2V0IHPDpGxsc3ludC4gUGVyc29uZXIgbWVkIGRlbm5hIHN5bm5lZHPDpHR0bmluZyBzZXIgaW5nYSBmw6RyZ2VyIHV0YW4gc2VyIGVuZGFzdCBpIGdyw6Vza2FsYS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZGV0IGVuZGEgc8OkdHRldCBhdHQgZsO2cm1lZGxhIGluZm9ybWF0aW9uLCBpbmRpa2VyYSBlbiBoYW5kbGluZyBlbGxlciBpZGVudGlmaWVyYSBlbGVtZW50LiBNYXJrZXJhIHQuZXguIGludGUgZXR0IGZlbGFrdGlndCBmb3JtdWzDpHJmw6RsdCBlbmRhc3QgbWVkIHLDtmQgcmFtLCBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBlbGxlciBpa29uLlwiLCBcdFxyXG4gICAgICAgICAgXCJEZXQga2FuIHZhcmEgZW4gYnJhIGlkw6kgYXR0IGVyYmp1ZGEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJ0dW5uZWxWaXNpb25cIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhIHLDtnIgbXVzcGVrYXJlbiBww6Ugd2ViYnBsYXRzZW4gb2NoIHNlIHZhZCBzb20gaMOkbmRlci5cIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJUdW5uZWxzZWVuZGVcIixcclxuICAgICAgICBcImZhY3RcIjogXCJEZXQgc29tIGkgZGFnbGlndCB0YWwgYnJ1a2FyIGthbGxhcyB0dW5uZWxzZWVuZGUgw6RyIGVuIHN5bm5lZHPDpHR0bmluZyBzb20gZ8O2ciBhdHQgZW5kYXN0IGVuIGRlbCBhdiBzeW5mw6RsdGV0IGthbiBzZXMuIERldHRhIGthbiBiZXJvIHDDpSBhdHQgcGVyc29uZW4gbGlkZXIgYXYgZW4gc2p1a2RvbSBzb20gZ8O2ciBhdHQgY2VsbGVybmEgaSDDtmdhdCBmw7Zyc3TDtnJzIG1lbiBkZW5uYSB0eXAgYXYgc3lubmVkc8OkdHRuaW5nIGthbiBvY2tzw6UgdGlsbGbDpGxsaWd0IHVwcHN0w6UgcMOlIGdydW5kIGF2IHN0cmVzcyBlbGxlciBkZXByZXNzaW9uLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrLlwiLFxyXG4gICAgICAgICAgXCJXZWJic2lkYW4gc2thIGfDpSBhdHQgZsO2cnN0b3JhICh6b29tYXMpIHRpbGwgbWluc3QgMjAwICUgc8OlIGF0dCBiZXPDtmthcmVuIGthbiBhbnBhc3NhIGlubmVow6VsbGV0cyBzdG9ybGVrIGVmdGVyIHNpbmEgYmVob3YuXCIsXHJcbiAgICAgICAgICBcIkVyYmp1ZCB1cHBsw6RzbmluZyBhdiBpbm5laMOlbGxldC5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJzdW5zaGluZVwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJTb2xza2VuXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiTG9yZW0gaXBzdW1cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkxvcmVtIGlwc3VtLlwiLFxyXG4gICAgICAgICAgXCJMb3JlbSBpcHN1bS5cIixcclxuICAgICAgICAgIFwiTG9yZW0gaXBzdW1cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJjb25jZW50cmF0aW9uXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIktvbmNlbnRyYXRpb25cIixcclxuICAgICAgICBcImZhY3RcIjogXCJBbGxhIGthbiBoYSBzdsOlcnQgYXR0IGtvbmNlbnRyZXJhIHNpZyBtZW4gZsO2ciB2aXNzYSBrYW4gZGV0IGJsaSBldHQgc3RvcnQgcHJvYmxlbSBpIHZhcmRhZ3NsaXZldC4gRGVzc2EgZnVua3Rpb25zbmVkc8OkdHRuaW5nYXIga2FuIG9yc2FrYSBzdsOlcmlnaGV0ZXIgbWVkIGF0dCBoYW50ZXJhIGludHJ5Y2ssIHNvcnRlcmEgaW5mb3JtYXRpb24gb2NoIGxqdWRrw6Ruc2xpZ2hldC5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkdlIHdlYmJwbGF0c2VuIGVuIGVua2VsIG9jaCBsdWZ0aWcgZGVzaWduLlwiLFxyXG4gICAgICAgICAgXCJWYXIgZsO2cnNpa3RpZyBtZWQgYW5pbWF0aW9uZXIgb2NoIHN0YXJrYSBmw6RyZ2VyLlwiLFxyXG4gICAgICAgICAgXCJVbmR2aWsgYXR0IGhhIGbDtnIgbXlja2V0IGlubmVow6VsbCBww6Ugc2FtbWEgc2lkYS5cIixcclxuICAgICAgICAgIFwiRXJianVkIGxqdWQtIG9jaCB2aWRlby1hbGVybmF0aXYgdGlsbCB0ZXh0aW5uZWjDpWxsLlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJMaXRldCBvcmRmw7ZycsOlZFwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkVuIHN0b3IgZGVsIGF2IGpvcmRlbnMgYmVmb2xrbmluZyBrYW4gaW50ZSBsw6RzYSBhbGxzIG9jaCBtw6VuZ2EgdnV4bmEgbMOkc2VyIGludGUgc8OlIGJyYSBzb20gZsO2cnbDpG50YXMgZWZ0ZXIgZ3J1bmRza29sZXV0YmlsZG5pbmdlbi5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIlVuZHZpayBrcsOlbmdsaWdhIG9yZCBvY2ggZmFja3Rlcm1lci5cIiwgICBcclxuICAgICAgICAgIFwiRXJianVkIGzDpHR0bMOkc3QgdmVyc2lvbiBhdiBrcsOlbmdsaWdhIHRleHRlci5cIixcclxuICAgICAgICAgIFwiRXJianVkIHRleHRlciBww6Ugb2xpa2Egc3Byw6VrLlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJVSVwiOiB7XHJcbiAgICAgIFwic2VsZWN0U2ltdWxhdGlvblwiOiBcIlbDpGxqIHNpbXVsZXJpbmc6XCIsXHJcbiAgICAgIFwicmVzZXRcIjogXCLDhXRlcnN0w6RsbFwiLFxyXG4gICAgICBcImFkdmljZVwiOiBcIlTDpG5rIHDDpSBkZXR0YVwiLFxyXG4gICAgICBcIm1vcmVJbmZvXCI6IFwiTWVyIGluZm9ybWF0aW9uXCIsXHJcbiAgICAgIFwic2lnaHRcIjogXCJTeW5cIixcclxuICAgICAgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6IFwiSGVsdCBmw6RyZ2JsaW5kXCIsXHJcbiAgICAgIFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6IFwiR3VsLWJsw6UgZsOkcmdibGluZGhldFwiLCAgICBcclxuICAgICAgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6IFwiUsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0XCIsXHJcbiAgICAgIFwiZmFyc2lnaHRlZG5lc3NcIjogXCJMw6VuZ3N5bnRoZXQsIMO2dmVyc3ludGhldFwiLFxyXG4gICAgICBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbHNlZW5kZVwiLFxyXG4gICAgICBcIm1vYmlsaXR5XCI6IFwiTW90b3Jpa1wiLFxyXG4gICAgICBcInBhcmtpbnNvbnNcIjogXCJQYXJraW5zb25zXCIsXHJcbiAgICAgIFwicmVhZEFuZFdyaXRlXCI6IFwiTMOkc2Egb2NoIHNrcml2YVwiLFxyXG4gICAgICBcImR5c2xleGlhXCI6IFwiRHlzbGV4aVwiLFxyXG4gICAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOiBcIkxpdGV0IG9yZGbDtnJyw6VkXCIsXHJcbiAgICAgIFwiY29uY2VudHJhdGlvblwiOiBcIktvbmNlbnRyYXRpb25cIixcclxuICAgICAgXCJjaGFuZ2VTZXR0aW5nc1wiOiBcIkNoYW5nZSBzZXR0aW5nc1wiLFxyXG4gICAgICBcInNlbGVjdExhbmd1YWdlXCI6IFwiU2VsZWN0IGxhbmd1YWdlXCIsXHJcbiAgICAgIFwic2F2ZVNldHRpbmdzXCI6IFwiU2F2ZSBzZXR0aW5nc1wiLFxyXG4gICAgICBcImNhbmNlbFwiOiBcIkNhbmNlbFwiLFxyXG4gICAgICBcInNpbXVsYXRpb25zXCI6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJTeW5cIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXHJcbiAgICAgICAgICAgIHsgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6IFwiSGVsdCBmw6RyZ2JsaW5kXCIgfSxcclxuICAgICAgICAgICAgeyBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIiB9LFxyXG4gICAgICAgICAgICB7IFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOiBcIlLDtmQtZ3LDtm4gZsOkcmdibGluZGhldFwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJmYXJzaWdodGVkbmVzc1wiOiBcIkzDpW5nc3ludGhldCwgw7Z2ZXJzeW50aGV0XCIgfSxcclxuICAgICAgICAgICAgeyBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbHNlZW5kZVwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJzdW5zaGluZVwiOiBcIlNvbHNrZW5cIiB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJNb3RvcmlrXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogWyBcclxuICAgICAgICAgICAgeyBcInBhcmtpbnNvbnNcIjogXCJQYXJraW5zb25zXCIgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIkzDpHNhIG9jaCBza3JpdmFcIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXHJcbiAgICAgICAgICAgIHsgXCJkeXNsZXhpYVwiOiBcIkR5c2xleGlcIiB9LFxyXG4gICAgICAgICAgICB7IFwic21hbGxWb2NhYnVsYXJ5XCI6IFwiTGl0ZXQgb3JkZsO2cnLDpWRcIiB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJLb25jZW50cmF0aW9uXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIk1pbm5lXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW11cclxuICAgICAgICB9XHJcblxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfSxcclxuICBcImVuXCI6XHJcbiAge1xyXG4gICAgXCJmYWN0c1wiOiB7XHJcbiAgICAgIFwiZHlzbGV4aWFcIjogXHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJEeXNsZXhpYVwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkR5c2xleGlhIGlzIGEgZGlzYWJpbGl0eSB0aGF0IG1ha2VzIGl0IGRpZmZpY3VsdCBmb3IgdGhlIGJyYWluIHRvIGF1dG9tYXRlIHRoZSBpbnRlcnByZXRhdGlvbiBvZiB3b3Jkcy4gVGhpcyBtYWtlcyBpdCBoYXJkIGZvciBwZW9wbGUgd2l0aCB0aGlzIGRpc2FiaWxpdHkgdG8gcmVhZCBhbmQgd3JpdGUuIER5c2xleGlhIGlzIGhhcyBubyBjb25uZWN0aW9uIHdpdGggdmlzaW9uIG9yIGludGVsbGlnZW5jZS4gVGhlIGNhdXNlcyBvZiBkeXNsZXhpYSBhcmUgc3RpbGwgdW5jbGVhci5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkF2b2lkIHRleHQgaW4gc21hbGwgZm9udCBzaXplcyBhbmQgbG9uZyB0ZXh0cy4gVXNlIHByb3BlciBzcGFjaW5nIGFuZCBsaW5lIGhlaWdodC5cIixcclxuICAgICAgICAgIFwiQXZvaWQgZGlmZmljdWx0IHdvcmRzIGFuZCB0ZXJtcy5cIixcclxuICAgICAgICAgIFwiT2ZmZXIgZWFzeSB0byByZWFkIHRleHRzLCBpbWFnZXMsIHZpZGVvIG9yIGF1ZGlvIGFsdGVybmF0aXZlcy5cIixcclxuICAgICAgICAgIFwiQXZvaWQgZm9udHMgd2l0aCBjb21wbGljYXRlZCBhbmQgY29tcGxleCBjaGFyYWN0ZXJzLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvXCI6IFxyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL2luY2x1c2l2ZWRlc2lnbnByaW5jaXBsZXMub3JnLyNwcmlvcml0aXNlLWNvbnRlbnRcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIlByaW9yaXRpc2UgY29udGVudFwiIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGFya2luc29uc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhIG1vdmUgdGhlIG1vdXNlIHBvaW50ZXIgb24gdGhlIHdlYiBwYWdlIGFuZCBzZWUgd2hhdCdzIGhhcHBlbmluZy5cIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJQYXJraW5zb25zXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGFya2luc29uJ3MgZGlzZWFzZSBkZXN0cm95cyB0aGUgY2VsbHMgaW4gdGhlIGJyYWluIHRoYXQgcHJvZHVjZSBkb3BhbWluZSwgd2hpY2ggY2F1c2VzIHRoZSBicmFpbiB0byBoYXZlIGEgcmVkdWNlZCBhYmlsaXR5IHRvIHNlbmQgc2lnbmFscy4gUGVyc29ucyB3aXRoIFBhcmtpbnNvbidzIG1heSBzdWZmZXIgZnJvbSBzeW1wdG9tcyBzdWNoIGFzIHNoYWtpbmcsIHN0aWZmIG11c2NsZXMsIGFuZCByZWR1Y2VkIG1vYmlsaXR5LiBUaGUgY2F1c2VzIG9mIFBhcmtpbnNvbidzIGRpc2Vhc2UgYXJlIHN0aWxsIHVuY2xlYXIuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJNYWtlIHN1cmUgdGhlIHdlYnNpdGUgY2FuIGJlIHVzZWQgd2l0aCBvdGhlciB0b29scyBvdGhlciB0aGFuIGEgbW91c2UsIHN1Y2ggYXMga2V5Ym9hcmQgbmF2aWdhdGlvbi5cIixcclxuICAgICAgICAgIFwiSGF2ZSBlbm91Z2ggc3BhY2UgYmV0d2VlbiBjb21wb25lbnRzLlwiLFxyXG4gICAgICAgICAgXCJNYWtlIHN1cmUgY2xpY2sgYXJlYXMgYXJlIGJpZyBlbm91Z2guXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9cIjogXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vaW5jbHVzaXZlZGVzaWducHJpbmNpcGxlcy5vcmcvI29mZmVyLWNob2ljZVwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiT2ZmZXIgY2hvaWNlXCIgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlIVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlllbGxvdy1ibHVlIGNvbG9yIGJsaW5kbmVzc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBlb3BsZSB3aXRoIGxvd2VyZWQgY29sb3IgdmlzaW9uIGhhdmUgZGlmZmljdWx0eSBkaXN0aW5ndWlzaGluZyBzb21lIG9yIGFsbCBjb2xvcnMuIFllbGxvdy1ibHVlIGNvbG9yIGJsaW5kbmVzcyAoVHJpdGFub3BpYSkgaXMgcmFyZS4gVGhlIG5hbWUgY2FuIGJlIG1pc2xlYWRpbmcuIEl0J3Mgbm90IHRoZSBjb2xvcnMgeWVsbG93IGFuZCBibHVlIHRoYXQgYXJlIGNvbmZ1c2VkIGJ1dCBibHVlIHdpdGggZ3JlZW4gYW5kIHllbGxvdyB3aXRoIHB1cnBsZS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkRvIG5vdCB1c2UgY29sb3IgYXMgdGhlIG9ubHkgd2F5IHRvIGNvbnZleSBpbmZvcm1hdGlvbiwgaW5kaWNhdGUgYW4gYWN0aW9uIG9yIGlkZW50aWZ5IGFuIGVsZW1lbnQuIEZvciBleGFtcGxlLCBkbyBub3QgbWFyayBhbiBpbmNvcnJlY3QgZm9ybSBmaWVsZCB3aXRoIGEgcmVkIGJvcmRlciBvbmx5LCBhbHNvIHN1cHBsZW1lbnQgd2l0aCBhIHRleHQgYW5kIHByZWZlcmFibHkgYW4gaWNvbi5cIixcclxuwqDCoMKgwqDCoMKgwqDCoMKgwqBcIkNvbnNpZGVyIG9mZmVyaW5nIGEgaGlnaCBjb250cmFzdCBtb2RlLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvXCI6IFxyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly9hY2Nlc3NpYmlsaXR5LmJsb2cuZ292LnVrLzIwMTYvMDYvMTcvY29sb3VyLWNvbnRyYXN0LXdoeS1kb2VzLWl0LW1hdHRlci9cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIldoeSBjb2xvdXIgY29udHJhc3QgbWF0dGVyc1wiIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiUmVkLWdyZWVuIGNvbG9yIGJsaW5kbmVzc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBlb3BsZSB3aXRoIGxvd2VyZWQgY29sb3IgdmlzaW9uIGhhdmUgZGlmZmljdWx0eSBkaXN0aW5ndWlzaGluZyBzb21lIG9yIGFsbCBjb2xvcnMuIFJlZC1ncmVlbiBjb2xvciBibGluZG5lc3MgKFByb3Rhbm9waWEgYW5kIERldXRlcmFub3BpYSkgaXMgdGhlIG1vc3QgY29tbW9uIHR5cGUgb2YgY29sb3IgYmxpbmRuZXNzLiBJdCBpcyBtb3JlIGNvbW1vbiBhbW9uZyBtZW4gdGhhbiB3b21lbi4gUGVvcGxlIHdpdGggcmVkLWdyZWVuIGNvbG9yIGJsaW5kbmVzcyBoYXZlIGRpZmZpY3VsdHkgZGlzdGluZ3Vpc2hpbmcgdGhlIGNvbG9ycyByZWQsIGdyZWVuLCBicm93biBhbmQgb3JhbmdlLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiRG8gbm90IHVzZSBjb2xvciBhcyB0aGUgb25seSB3YXkgdG8gY29udmV5IGluZm9ybWF0aW9uLCBpbmRpY2F0ZSBhbiBhY3Rpb24gb3IgaWRlbnRpZnkgYW4gZWxlbWVudC4gRm9yIGV4YW1wbGUsIGRvIG5vdCBtYXJrIGFuIGluY29ycmVjdCBmb3JtIGZpZWxkIHdpdGggYSByZWQgYm9yZGVyIG9ubHksIGFsc28gc3VwcGxlbWVudCB3aXRoIGEgdGV4dCBhbmQgcHJlZmVyYWJseSBhbiBpY29uLlwiLFxyXG7CoMKgwqDCoMKgwqDCoMKgwqDCoFwiQ29uc2lkZXIgb2ZmZXJpbmcgYSBoaWdoIGNvbnRyYXN0IG1vZGUuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9cIjogXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL2RldmVsb3Blci5wYWNpZWxsb2dyb3VwLmNvbS9yZXNvdXJjZXMvY29udHJhc3RhbmFseXNlci9cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbG91ciBDb250cmFzdCBBbmFseXNlclwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL3d3dy5pbmNsdXNpdmVkZXNpZ250b29sa2l0LmNvbS9VQ3Zpc2lvbi92aXNpb24uaHRtbCNjb2xvdXJcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkVuc3VyZSBzdWZmaWNpZW50IGNvbnRyYXN0XCIgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmYXJzaWdodGVkbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiRmFyLXNpZ2h0ZWRuZXNzXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiRmFyLXNpZ2h0ZWRuZXNzIChIeXBlcm9waWEpIGlzIG9uZSBvZiB0aGUgbW9zdCBjb21tb24gdmlzdWFsIGltcGFpcm1lbnRzLiBQZW9wbGUgd2l0aCBIeXBlcm9waWEgaGF2ZSBkaWZmaWN1bHR5IGZvY3VzaW5nIG9uIG9iamVjdHMgYXQgY2xvc2UgcmFuZ2Ugd2hpY2ggbWFrZXMgdGhlbSBhcHBlYXIgYmx1cnJ5LlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiQXZvaWQgdGV4dCBpbiBzbWFsbCBmb250IHNpemVzIGFuZCBsb25nIHRleHRzLiBVc2UgcHJvcGVyIHNwYWNpbmcgYW5kIGxpbmUgaGVpZ2h0LlwiLCAgXHJcbiAgICAgICAgICBcIk1ha2Ugc3VyZSB0aGUgd2Vic2l0ZSBjYW4gYmUgem9vbWVkIHRvIGF0IGxlYXN0IDIwMCUuXCIsXHJcbiAgICAgICAgICBcIk9mZmVyIGEgdGV4dCB0byBzcGVlY2ggcmVhZGVyLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvXCI6IFxyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL2luY2x1c2l2ZWRlc2lnbnByaW5jaXBsZXMub3JnLyNwcm92aWRlLWNvbXBhcmFibGUtZXhwZXJpZW5jZVwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiUHJvdmlkZSBjb21wYXJhYmxlIGV4cGVyaWVuY2VcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuaW5jbHVzaXZlZGVzaWdudG9vbGtpdC5jb20vVUN2aXNpb24vdmlzaW9uLmh0bWwjc2hhcGVcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbnNpZGVyIHNpemVcIiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlIVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlRvdGFsIGNvbG9yIGJsaW5kbmVzc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBlb3BsZSB3aXRoIGxvd2VyZWQgY29sb3IgdmlzaW9uIGhhdmUgZGlmZmljdWx0eSBkaXN0aW5ndWlzaGluZyBzb21lIG9yIGFsbCBjb2xvcnMuIFRvdGFsIGNvbG9yIGJsaW5kbmVzcyAoTW9ub2Nocm9tYXRpYyAvIEFjaHJvbWF0b3BzeSkgaXMgdmVyeSByYXJlLiBQZW9wbGUgd2l0aCB0aGlzIHZpc3VhbCBpbXBhaXJtZW50IGNhbiBub3QgcGVyY2lldmUgYW55IGNvbG9ycywgb25seSBkaWZmZXJlbnQgc2hhZGVzIG9mIGdyYXkuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJEbyBub3QgdXNlIGNvbG9yIGFzIHRoZSBvbmx5IHdheSB0byBjb252ZXkgaW5mb3JtYXRpb24sIGluZGljYXRlIGFuIGFjdGlvbiBvciBpZGVudGlmeSBhbiBlbGVtZW50LiBGb3IgZXhhbXBsZSwgZG8gbm90IG1hcmsgYW4gaW5jb3JyZWN0IGZvcm0gZmllbGQgd2l0aCBhIHJlZCBib3JkZXIgb25seSwgYWxzbyBzdXBwbGVtZW50IHdpdGggYSB0ZXh0IGFuZCBwcmVmZXJhYmx5IGFuIGljb24uXCIsXHJcbsKgwqDCoMKgwqDCoMKgwqDCoMKgXCJDb25zaWRlciBvZmZlcmluZyBhIGhpZ2ggY29udHJhc3QgbW9kZS5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnczLm9yZy9XQUkvZ2V0dGluZ3N0YXJ0ZWQvdGlwcy9kZXNpZ25pbmcuaHRtbCNwcm92aWRlLXN1ZmZpY2llbnQtY29udHJhc3QtYmV0d2Vlbi1mb3JlZ3JvdW5kLWFuZC1iYWNrZ3JvdW5kXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJQcm92aWRlIHN1ZmZpY2llbnQgY29udHJhc3QgYmV0d2VlbiBmb3JlZ3JvdW5kIGFuZCBiYWNrZ3JvdW5kXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy53My5vcmcvV0FJL2dldHRpbmdzdGFydGVkL3RpcHMvZGVzaWduaW5nLmh0bWwjZG9udC11c2UtY29sb3ItYWxvbmUtdG8tY29udmV5LWluZm9ybWF0aW9uXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJEb27igJl0IHVzZSBjb2xvciBhbG9uZSB0byBjb252ZXkgaW5mb3JtYXRpb25cIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnczLm9yZy9UUi9VTkRFUlNUQU5ESU5HLVdDQUcyMC92aXN1YWwtYXVkaW8tY29udHJhc3QtY29udHJhc3QuaHRtbCN2aXN1YWwtYXVkaW8tY29udHJhc3QtY29udHJhc3QtcmVzb3VyY2VzLWhlYWRcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkxpc3Qgb2YgdG9vbHMgdG8gaGVscCBkZXRlcm1pbmUgY29udHJhc3QgcmF0aW9cIiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgXCJ0dW5uZWxWaXNpb25cIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlISBtb3ZlIHRoZSBtb3VzZSBwb2ludGVyIG9uIHRoZSB3ZWIgcGFnZSBhbmQgc2VlIHdoYXQncyBoYXBwZW5pbmcuXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiVHVubmVsIFZpc2lvblwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIldoYXQgaXMgY29tbW9ubHkgY2FsbGVkIFR1bm5lbCBWaXNpb24gaXMgbG9zcyBvZiBwZXJpcGhlcmFsIHZpc2lvbi4gVGhpcyBtYXkgYmUgYmVjYXVzZSB0aGUgcGVyc29uIHN1ZmZlcnMgZnJvbSBhIGRpc2Vhc2UgdGhhdCBhZmZlY3RzIHRoZSBjZWxscyBpbiB0aGUgZXllLCBidXQgbWF5IGFsc28gb2NjdXIgdGVtcG9yYXJpbHkgZHVlIHRvIHN0cmVzcyBvciBkZXByZXNzaW9uLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiQXZvaWQgdGV4dCBpbiBzbWFsbCBmb250IHNpemVzIGFuZCBsb25nIHRleHRzLiBVc2UgcHJvcGVyIHNwYWNpbmcgYW5kIGxpbmUgaGVpZ2h0LlwiLFxyXG4gICAgICAgICAgXCJNYWtlIHN1cmUgdGhlIHdlYnNpdGUgY2FuIGJlIHpvb21lZCB0byBhdCBsZWFzdCAyMDAlLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciBhIHRleHQgdG8gc3BlZWNoIHJlYWRlci5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly9pbmNsdXNpdmVkZXNpZ25wcmluY2lwbGVzLm9yZy8jZ2l2ZS1jb250cm9sXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJBbGxvdyB6b29tXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmluY2x1c2l2ZWRlc2lnbnRvb2xraXQuY29tL1VDdmlzaW9uL3Zpc2lvbi5odG1sI2xheW91dFwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29uc2lkZXIgdmlzdWFsIGZpZWxkIGxvc3NcIiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInN1bnNoaW5lXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJTdW5zaGluZVwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkxvcmVtIGlwc3VtXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJMb3JlbSBpcHN1bS5cIixcclxuICAgICAgICAgIFwiTG9yZW0gaXBzdW0uXCIsXHJcbiAgICAgICAgICBcIkxvcmVtIGlwc3VtXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9cIjogXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vaW5jbHVzaXZlZGVzaWducHJpbmNpcGxlcy5vcmcvI2NvbnNpZGVyLXNpdHVhdGlvblwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29uc2lkZXIgc2l0dWF0aW9uXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmluY2x1c2l2ZWRlc2lnbnRvb2xraXQuY29tL1VDdmlzaW9uL3Zpc2lvbi5odG1sI2xpZ2h0aW5nXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb25zaWRlciBsaWdodGluZyBjb25kaXRpb25zXCIgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJjb25jZW50cmF0aW9uXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJDb25jZW50cmF0aW9uXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiRXZlcnlvbmUgY2FuIGhhdmUgYSBoYXJkIHRpbWUgY29uY2VudHJhdGluZywgYnV0IGZvciBzb21lIGl0IGNhbiBiZSBhIGJpZyBwcm9ibGVtIGluIGV2ZXJ5ZGF5IGxpZmUuIERpc2FiaWxpdGllcyBsaWtlIEFESEQgYW5kIEF1dGlzbSBjYW4gY2F1c2UgZGlmZmljdWx0eSBpbiBoYW5kbGluZyBpbXByZXNzaW9ucywgc29ydGluZyBpbmZvcm1hdGlvbiBhbmQgc2Vuc2l0aXZpdHkgdG8gc291bmQuXCIsICAgICAgICBcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkdpdmUgdGhlIHdlYnNpdGUgYSBzaW1wbGUgYW5kIGNsZWFuIGRlc2lnbi5cIixcclxuICAgICAgICAgIFwiQmUgY2FyZWZ1bCB3aXRoIGFuaW1hdGlvbnMgYW5kIHN0cm9uZyBjb2xvcnMuXCIsXHJcbiAgICAgICAgICBcIkF2b2lkIGhhdmluZyB0b28gbXVjaCBjb250ZW50IG9uIHRoZSBzYW1lIHBhZ2UuXCIsXHJcbiAgICAgICAgICBcIk9mZmVyIGltYWdlLCBhdWRpbyBhbmQgdmlkZW8gYWxlcm5hdGl2ZXMgdG8gdGV4dCBjb250ZW50LlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvXCI6IFxyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL2luY2x1c2l2ZWRlc2lnbnByaW5jaXBsZXMub3JnLyNiZS1jb25zaXN0ZW50XCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJCZSBjb25zaXN0ZW50XCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmluY2x1c2l2ZWRlc2lnbnRvb2xraXQuY29tL1VDdGhpbmtpbmcvdGhpbmtpbmcuaHRtbCNpbnRlcmZhY2VfbmF2aWdhdGlvbl9hbmRfbmVzdGVkX21lbnVzXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJBdm9pZCBkZWVwIGhpZXJhcmNoaWVzXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuaW5jbHVzaXZlZGVzaWdudG9vbGtpdC5jb20vVUN0aGlua2luZy90aGlua2luZy5odG1sI3N0cnVjdHVyaW5nX2luZm9ybWF0aW9uXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJSZWR1Y2UgbWVtb3J5IGxvYWRcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuaW5jbHVzaXZlZGVzaWdudG9vbGtpdC5jb20vVUN0aGlua2luZy90aGlua2luZy5odG1sI2F0dGVudGlvblwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQXZvaWQgbXVsdGlwbGUgZm9jdXNlcyBvZiBhdHRlbnRpb25cIiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiU21hbGwgdm9jYWJ1bGFyeVwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkEgbGFyZ2UgcGFydCBvZiB0aGUgd29ybGQncyBwb3B1bGF0aW9uIGNhbid0IHJlYWQgYXQgYWxsIGFuZCBtYW55IGFkdWx0cyBkb24ndCByZWFkIGFzIHdlbGwgYXMgZXhwZWN0ZWQgYWZ0ZXIgZmluaXNoaW5nIGdyYWRlIHNjaG9vbC5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkF2b2lkIGRpZmZpY3VsdCB3b3JkcyBhbmQgdGVybXMuXCIsXHJcbiAgICAgICAgICBcIk9mZmVyIGVhc3kgdG8gcmVhZCB0ZXh0cywgaW1hZ2VzLCB2aWRlbyBvciBhdWRpbyBhbHRlcm5hdGl2ZXMuXCIsXHJcbiAgICAgICAgICBcIk9mZmVyIHRleHRzIGluIGRpZmZlcmVudCBsYW5ndWFnZXMuXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlVJXCI6IHtcclxuICAgICAgXCJzZWxlY3RTaW11bGF0aW9uXCI6IFwiU2VsZWN0IHNpbXVsYXRpb246XCIsXHJcbiAgICAgIFwicmVzZXRcIjogXCJSZXNldFwiLFxyXG4gICAgICBcImFkdmljZVwiOiBcIlRoaW5rIGFib3V0IHRoaXNcIixcclxuICAgICAgXCJtb3JlSW5mb1wiOiBcIk1vcmUgaW5mb3JtYXRpb25cIixcclxuICAgICAgXCJzaWdodFwiOiBcIlNpZ2h0XCIsXHJcbiAgICAgIFwidG90YWxDb2xvckJsaW5kbmVzc1wiOiBcIlRvdGFsIGNvbG9yIGJsaW5kbmVzc1wiLFxyXG4gICAgICBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIlllbGxvdy1CbHVlIGNvbG9yIGJsaW5kbmVzc1wiLCAgICBcclxuICAgICAgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6IFwiUmVkLUdyZWVuIGNvbG9yIGJsaW5kbmVzc1wiLFxyXG4gICAgICBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiRmFyLXNpZ2h0ZWRuZXNzXCIsXHJcbiAgICAgIFwidHVubmVsVmlzaW9uXCI6IFwiVHVubmVsIHZpc2lvblwiLFxyXG4gICAgICBcIm1vYmlsaXR5XCI6IFwiTW9iaWxpdHlcIixcclxuICAgICAgXCJwYXJraW5zb25zXCI6IFwiUGFya2luc29uc1wiLFxyXG4gICAgICBcInJlYWRBbmRXcml0ZVwiOiBcIlJlYWQgYW5kIHdyaXRlXCIsXHJcbiAgICAgIFwiZHlzbGV4aWFcIjogXCJEeXNsZXhpYVwiLFxyXG4gICAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOiBcIlNtYWxsIHZvY2FidWxhcnlcIixcclxuICAgICAgXCJjb25jZW50cmF0aW9uXCI6IFwiQ29uY2VudHJhdGlvblwiLFxyXG4gICAgICBcImNoYW5nZVNldHRpbmdzXCI6IFwiQ2hhbmdlIHNldHRpbmdzXCIsXHJcbiAgICAgIFwic2VsZWN0TGFuZ3VhZ2VcIjogXCJTZWxlY3QgbGFuZ3VhZ2VcIixcclxuICAgICAgXCJzYXZlU2V0dGluZ3NcIjogXCJTYXZlIHNldHRpbmdzXCIsXHJcbiAgICAgIFwiY2FuY2VsXCI6IFwiQ2FuY2VsXCIsXHJcbiAgICAgIFwic2ltdWxhdGlvbnNcIjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIlNpZ2h0XCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgICB7IFwidG90YWxDb2xvckJsaW5kbmVzc1wiOiBcIlRvdGFsIGNvbG9yIGJsaW5kbmVzc1wiIH0sXHJcbiAgICAgICAgICAgIHsgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjogXCJZZWxsb3ctQmx1ZSBjb2xvciBibGluZG5lc3NcIiB9LFxyXG4gICAgICAgICAgICB7IFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOiBcIlJlZC1HcmVlbiBjb2xvciBibGluZG5lc3NcIiB9LFxyXG4gICAgICAgICAgICB7IFwiZmFyc2lnaHRlZG5lc3NcIjogXCJGYXItc2lnaHRlZG5lc3NcIiB9LFxyXG4gICAgICAgICAgICB7IFwidHVubmVsVmlzaW9uXCI6IFwiVHVubmVsIHZpc2lvblwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJzdW5zaGluZVwiOiBcIlN1bnNoaW5lXCIgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiTW9iaWxpdHlcIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbIFxyXG4gICAgICAgICAgICB7IFwicGFya2luc29uc1wiOiBcIlBhcmtpbnNvbnNcIiB9XHJcbiAgICBcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiUmVhZCBhbmQgd3JpdGVcIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXHJcbiAgICAgICAgICAgIHsgXCJkeXNsZXhpYVwiOiBcIkR5c2xleGlhXCIgfSxcclxuICAgICAgICAgICAgeyBcInNtYWxsVm9jYWJ1bGFyeVwiOiBcIlNtYWxsIHZvY2FidWxhcnlcIiB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJDb25jZW50cmF0aW9uXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIk1lbW9yeVwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH1cclxufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBsb2FkZWRTaW11bGF0aW9ucyA9IFtdO1xuXG5mdW5jdGlvbiBsb2FkKG5hbWUsIHN1Yk5hbWUsIGNhbGxiYWNrKSB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF0sXG4gICAgICAgIHNjcmlwdEZpbGUgPSBzdWJOYW1lID8gJ3NpbXVsYXRpb25zLycgKyBuYW1lICsgJy8nICsgc3ViTmFtZSArICcvY29udGVudC5qcycgOiAnc2ltdWxhdGlvbnMvJyArIG5hbWUgKyAnL2NvbnRlbnQuanMnO1xuXG4gICAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdChhY3RpdmVUYWIuaWQsIHsgZmlsZTogc2NyaXB0RmlsZSB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICBsb2FkZWRTaW11bGF0aW9ucy5wdXNoKG5hbWUpO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKG5hbWUsIHN1Yk5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RhcnQobmFtZSwgc3ViTmFtZSkge1xuICBpZiAobG9hZGVkU2ltdWxhdGlvbnMuaW5jbHVkZXMobmFtZSkpIHtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdGFydFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lLCBzdWJTaW11bGF0aW9uOiBzdWJOYW1lIH0pO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGxvYWQobmFtZSwgc3ViTmFtZSwgZnVuY3Rpb24gKCkge1xuICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0YXJ0U2ltdWxhdGlvbicsIHNpbXVsYXRpb246IG5hbWUsIHN1YlNpbXVsYXRpb246IHN1Yk5hbWUgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzdG9wKG5hbWUsIHN1Yk5hbWUpIHtcbiAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdG9wU2ltdWxhdGlvbicsIHNpbXVsYXRpb246IG5hbWUsIHN1YlNpbXVsYXRpb246IHN1Yk5hbWUgfSk7XG4gIH0pO1xufVxuXG5leHBvcnRzLnN0YXJ0ID0gc3RhcnQ7XG5leHBvcnRzLnN0b3AgPSBzdG9wO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2ltdWxhdGlvbkxvYWRlci5qcy5tYXBcbiJdfQ==
