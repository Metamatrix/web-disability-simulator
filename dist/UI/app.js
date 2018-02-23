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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC9VSS9hcHAuanMiLCJidWlsZC9qcy9iYWJlbC9VSS9kYXRhL2RhdGEuanNvbiIsImJ1aWxkL2pzL2JhYmVsL3V0aWxzL3NpbXVsYXRpb25Mb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxJQUFJLFFBQVEsUUFBUSxrQkFBUixDQUFaOztBQUVBLElBQUksZUFBZSx3QkFBd0IsS0FBeEIsQ0FBbkI7O0FBRUEsSUFBSSxvQkFBb0IsUUFBUSw4QkFBUixDQUF4Qjs7QUFFQSxJQUFJLG1CQUFtQix3QkFBd0IsaUJBQXhCLENBQXZCOztBQUVBLFNBQVMsdUJBQVQsQ0FBaUMsR0FBakMsRUFBc0M7QUFBRSxNQUFJLE9BQU8sSUFBSSxVQUFmLEVBQTJCO0FBQUUsV0FBTyxHQUFQO0FBQWEsR0FBMUMsTUFBZ0Q7QUFBRSxRQUFJLFNBQVMsRUFBYixDQUFpQixJQUFJLE9BQU8sSUFBWCxFQUFpQjtBQUFFLFdBQUssSUFBSSxHQUFULElBQWdCLEdBQWhCLEVBQXFCO0FBQUUsWUFBSSxPQUFPLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBcUMsR0FBckMsRUFBMEMsR0FBMUMsQ0FBSixFQUFvRCxPQUFPLEdBQVAsSUFBYyxJQUFJLEdBQUosQ0FBZDtBQUF5QjtBQUFFLEtBQUMsT0FBTyxPQUFQLEdBQWlCLEdBQWpCLENBQXNCLE9BQU8sTUFBUDtBQUFnQjtBQUFFOztBQUU3USxJQUFJLE9BQU8sSUFBWDs7QUFFQSxTQUFTLGVBQVQsR0FBMkI7O0FBRXpCLFNBQU8sT0FBUCxDQUFlLEtBQWYsQ0FBcUIsR0FBckIsQ0FBeUIsa0JBQXpCLEVBQTZDLFVBQVUsR0FBVixFQUFlO0FBQzFELHFCQUFpQixLQUFqQixDQUF1QixJQUFJLGdCQUEzQjtBQUNELEdBRkQ7QUFHRDs7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9kYXRhID0gcmVxdWlyZSgnLi9kYXRhL2RhdGEuanNvbicpO1xuXG52YXIgbGFuZ3VhZ2VEYXRhID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2RhdGEpO1xuXG52YXIgX3NpbXVsYXRpb25Mb2FkZXIgPSByZXF1aXJlKCcuLi91dGlscy9zaW11bGF0aW9uTG9hZGVyLmpzJyk7XG5cbnZhciBzaW11bGF0aW9uTG9hZGVyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3NpbXVsYXRpb25Mb2FkZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG52YXIgbGFuZyA9IFwiZW5cIjtcblxuZnVuY3Rpb24gc3RhcnRTaW11bGF0aW9uKCkge1xuXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlU2ltdWxhdGlvbicsIGZ1bmN0aW9uIChvYmopIHtcbiAgICBzaW11bGF0aW9uTG9hZGVyLnN0YXJ0KG9iai5hY3RpdmVTaW11bGF0aW9uKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0U2ltdWxhdGlvbih0b29sdGlwKSB7XG5cbiAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7XG4gICAgcGF0aDogXCJpbWcvaWNvbi5wbmdcIlxuICB9KTtcblxuICB0b29sdGlwLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICQoXCIjcGFuZWwxXCIpLmFkZENsYXNzKFwiaW5cIik7XG4gICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgdG9vbHRpcC5hZGRDbGFzcyhcImhpZGVcIik7XG4gIH0sIDI1MCk7XG5cbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuICAgIHNpbXVsYXRpb25Mb2FkZXIuc3RvcChvYmouYWN0aXZlU2ltdWxhdGlvbik7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKCdhY3RpdmVTaW11bGF0aW9uJyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRUZXh0cygpIHtcblxuICB2YXIgZGF0YSA9IGxhbmd1YWdlRGF0YVtsYW5nXTtcblxuICAkKFwiLm1vcmUtaW5mby1saW5rXCIpLnRleHQoZGF0YS5VSS5tb3JlSW5mbyk7XG4gICQoXCIjcmVzZXQtYnRuXCIpLnRleHQoZGF0YS5VSS5yZXNldCk7XG4gICQoXCIubmF2YmFyLWhlYWRlclwiKS50ZXh0KGRhdGEuVUkuc2VsZWN0U2ltdWxhdGlvbik7XG4gICQoXCIjYWR2aWNlLWRyb3Bkb3duXCIpLnRleHQoZGF0YS5VSS5hZHZpY2UpO1xuICAkKFwiI2luZm8tZHJvcGRvd25cIikudGV4dChkYXRhLlVJLm1vcmVJbmZvKTtcbiAgJChcIiNzaWdodFwiKS50ZXh0KGRhdGEuVUkuc2lnaHQpO1xuICAkKFwiI21vYmlsaXR5XCIpLnRleHQoZGF0YS5VSS5tb2JpbGl0eSk7XG4gICQoXCIjcmVhZFdyaXRlXCIpLnRleHQoZGF0YS5VSS5yZWFkQW5kV3JpdGUpO1xuICAkKFwiI2NvbmNlbnRyYXRpb25cIikudGV4dChkYXRhLlVJLmNvbmNlbnRyYXRpb24pO1xuXG4gICQuZWFjaChkYXRhLlVJLnNpbXVsYXRpb25zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcblxuICAgICQoJyMnICsgdmFsdWUuaGVhZGluZykudGV4dCh2YWx1ZS5oZWFkaW5nKTtcblxuICAgICQuZWFjaCh2YWx1ZS5jaG9pY2VzLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgICAgICAkKCcjJyArIGtleSkudGV4dCh2YWx1ZVtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgJCgnI3NldHRpbmdzLWhlYWRpbmcnKS50ZXh0KGRhdGEuVUkuY2hhbmdlU2V0dGluZ3MpO1xuICAkKCcjbGFuZ3VhZ2UtbGFiZWwnKS50ZXh0KGRhdGEuVUkuc2VsZWN0TGFuZ3VhZ2UpO1xuICAkKCcjYnRuLXNhdmUtc2V0dGluZ3MnKS50ZXh0KGRhdGEuVUkuc2F2ZVNldHRpbmdzKTtcbiAgJCgnI2J0bi1jYW5jZWwtc2V0dGluZ3MnKS50ZXh0KGRhdGEuVUkuY2FuY2VsKTtcbn1cblxuZnVuY3Rpb24gcmVhZE1vcmVMaW5rcygpIHtcblxuICB2YXIgcmVhZE1vcmVMaW5rID0gJCgnLm1vcmUtaW5mby1saW5rcycpLmZpbmQoJ2xpJyk7XG5cbiAgcmVhZE1vcmVMaW5rLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgdmFyIGN1cnJlbnRMaW5rID0gZXZlbnQudGFyZ2V0LmlubmVyVGV4dDtcblxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnbW9yZUluZm8nLCBmdW5jdGlvbiAob2JqKSB7XG5cbiAgICAgICQuZWFjaChvYmoubW9yZUluZm8sIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuICAgICAgICBpZiAoY3VycmVudExpbmsgPT0gb2JqLm1vcmVJbmZvW2ldLm1vcmVJbmZvTGlua1RleHQpIHtcbiAgICAgICAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6ICcnICsgb2JqLm1vcmVJbmZvW2ldLm1vcmVJbmZvVXJsIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldFRvb2x0aXBUZXh0cyhhY3RpdmVTaW11bGF0aW9uKSB7XG5cbiAgdmFyIGRhdGEgPSBsYW5ndWFnZURhdGFbbGFuZ107XG5cbiAgdmFyIHNpbXVsYXRpb25TdGF0dXMgPSAkKFwiLnNpbXVsYXRpb24tc3RhcnRlZC1wYXJhZ3JhcGhcIik7XG4gIHZhciBzaW11bGF0aW9uU3RhdHVzQWxlcnQgPSAkKFwiLnNpbXVsYXRpb24tc3RhcnRlZC1hbGVydFwiKTtcbiAgdmFyIGluZm9IZWFkaW5nID0gJChcIi5kaXNhYmlsaXR5LWluZm8taGVhZGluZ1wiKTtcbiAgdmFyIGluZm9QYXJhZ3JhcGggPSAkKFwiLmRpc2FiaWxpdHktaW5mby1wYXJhZ3JhcGhcIik7XG4gIHZhciBhZHZpY2VMaXN0ID0gJChcIi5hZHZpY2UtbGlzdFwiKTtcbiAgdmFyIG1vcmVJbmZvTGlua3MgPSAkKFwiLm1vcmUtaW5mby1saW5rc1wiKTtcbiAgdmFyIG1vcmVJbmZvUGFuZWwgPSAkKCcjbW9yZS1pbmZvLXBhbmVsJyk7XG4gIHZhciB0ZXh0cyA9IGRhdGEuZmFjdHNbYWN0aXZlU2ltdWxhdGlvbl07XG5cbiAgc2ltdWxhdGlvblN0YXR1cy5lbXB0eSgpO1xuICBpbmZvSGVhZGluZy5lbXB0eSgpO1xuICBpbmZvUGFyYWdyYXBoLmVtcHR5KCk7XG4gIGFkdmljZUxpc3QuZW1wdHkoKTtcbiAgbW9yZUluZm9MaW5rcy5lbXB0eSgpO1xuXG4gIHNpbXVsYXRpb25TdGF0dXMudGV4dCh0ZXh0cy5zaW11bGF0aW9uU3RhdHVzKTtcbiAgc2ltdWxhdGlvblN0YXR1c0FsZXJ0LnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcblxuICBpbmZvSGVhZGluZy50ZXh0KHRleHRzLmhlYWRpbmcpO1xuICBpbmZvUGFyYWdyYXBoLnRleHQodGV4dHMuZmFjdCk7XG5cbiAgJC5lYWNoKHRleHRzLmxpc3RJdGVtcywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG4gICAgYWR2aWNlTGlzdC5hcHBlbmQoJzxsaT4nICsgdmFsdWUgKyAnPC9saT4nKTtcbiAgfSk7XG5cbiAgaWYgKHRleHRzLm1vcmVJbmZvICE9PSB1bmRlZmluZWQpIHtcbiAgICBtb3JlSW5mb1BhbmVsLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuXG4gICAgJC5lYWNoKHRleHRzLm1vcmVJbmZvLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICAgIGNvbnNvbGUubG9nKHRleHRzLm1vcmVJbmZvW2ldLm1vcmVJbmZvTGlua1RleHQpO1xuICAgICAgbW9yZUluZm9MaW5rcy5hcHBlbmQoJzxsaT48YT4nICsgdGV4dHMubW9yZUluZm9baV0ubW9yZUluZm9MaW5rVGV4dCArICc8L2E+PC9saT4nKTtcbiAgICB9KTtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyAnbW9yZUluZm8nOiB0ZXh0cy5tb3JlSW5mbyB9KTtcbiAgfSBlbHNlIHtcbiAgICBtb3JlSW5mb1BhbmVsLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICB9XG59XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICB2YXIgdG9vbHRpcCA9ICQoXCIudG9vbC10aXBcIik7XG5cbiAgdmFyIGFjdGl2ZVNpbXVsYXRpb24gPSB2b2lkIDA7XG5cbiAgLy9jaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2xhbmcnLCBvYmogPT4ge1xuXG4gIGxhbmcgPSAnZW4nO1xuXG4gIHNldFRleHRzKCk7XG5cbiAgLy99KTtcblxuICAvLyBTZXQgYWN0aXZlIHN0YXRlXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlU2ltdWxhdGlvbicsIGZ1bmN0aW9uIChvYmopIHtcblxuICAgIGFjdGl2ZVNpbXVsYXRpb24gPSBvYmouYWN0aXZlU2ltdWxhdGlvbjtcblxuICAgIGlmIChhY3RpdmVTaW11bGF0aW9uKSB7XG4gICAgICB0b29sdGlwLmFkZENsYXNzKFwiaW5cIikucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuICAgICAgJCgnI3BhbmVsMScpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgICBzZXRUb29sdGlwVGV4dHMoYWN0aXZlU2ltdWxhdGlvbik7XG4gICAgICByZWFkTW9yZUxpbmtzKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBNYWluIHZpZXdcbiAgJChcIi5tZW51LWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgbWVudUJ0biA9ICQodGhpcyk7XG4gICAgdmFyIG1lbnVCdG5JZCA9IG1lbnVCdG5bMF0uaWQ7XG5cbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtcbiAgICAgIHBhdGg6IFwiaW1nL2ljb25fYWN0aXZlLnBuZ1wiXG4gICAgfSk7XG5cbiAgICBhY3RpdmVTaW11bGF0aW9uID0gbWVudUJ0bklkO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7ICdhY3RpdmVTaW11bGF0aW9uJzogbWVudUJ0bklkIH0pO1xuXG4gICAgc2V0VG9vbHRpcFRleHRzKGFjdGl2ZVNpbXVsYXRpb24pO1xuXG4gICAgJCgnI3BhbmVsMScpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgJCgnI3BhbmVsMScpLmFkZENsYXNzKFwiaGlkZVwiKTtcbiAgICAkKCcjcGFuZWwyJykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuICAgIHRvb2x0aXAucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwyJykuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICB9LCAxMDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzdGFydFNpbXVsYXRpb24oKTtcbiAgICB9LCA1MDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwyJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAgIHRvb2x0aXAuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICB9LCAxMDAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMicpLmFkZENsYXNzKFwiaGlkZVwiKTtcbiAgICB9LCAxNTAwKTtcblxuICAgIHJlYWRNb3JlTGlua3MoKTtcbiAgfSk7XG5cbiAgJChcIi5naXRodWItbGlua1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiAnaHR0cHM6Ly9naXRodWIuY29tL01ldGFtYXRyaXgvV2ViLURpc2FiaWxpdHktU2ltdWxhdG9yJyB9KTtcbiAgfSk7XG5cbiAgJCgnLnNldHRpbmdzLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnbGFuZycsIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICQoJyNsYW5ndWFnZScpLnZhbChvYmoubGFuZyk7XG4gICAgfSk7XG5cbiAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAkKCcjc2V0dGluZ3MnKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNzZXR0aW5ncycpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgfSwgMjUwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMScpLmFkZENsYXNzKFwiaGlkZVwiKTtcbiAgICB9LCA1MDApO1xuICB9KTtcblxuICAvLyBTZXR0aW5ncyB2aWV3XG5cbiAgLyogJCgnI2J0bi1zYXZlLXNldHRpbmdzJykub24oJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgXG4gICAgIHZhciBzZWxlY3RlZExhbmcgPSAkKCcjbGFuZ3VhZ2UnKS52YWwoKTtcclxuICBcbiAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsnbGFuZyc6IHNlbGVjdGVkTGFuZ30pO1xyXG4gIFxuICAgICBsYW5nID0gc2VsZWN0ZWRMYW5nO1xyXG4gIFxuICAgICBzZXRUZXh0cygpO1xyXG4gIFxuICAgICAkKCcjc2V0dGluZ3MnKS5yZW1vdmVDbGFzcyhcImluXCIpO1xyXG4gICAgICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XHJcbiAgXG4gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgJCgnI3BhbmVsMScpLmFkZENsYXNzKFwiaW5cIik7XHJcbiAgICAgfSwgNTAwKTtcclxuICBcbiAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAkKCcjc2V0dGluZ3MnKS5hZGRDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgfSwgNzUwKTtcclxuICBcbiAgIH0pO1xyXG4gIFxuICAgJCgnI2J0bi1jYW5jZWwtc2V0dGluZ3MnKS5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICBcbiAgICAgJCgnI3NldHRpbmdzJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcclxuICAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xyXG4gIFxuICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICQoJyNwYW5lbDEnKS5hZGRDbGFzcyhcImluXCIpO1xyXG4gICAgIH0sIDI1MCk7XHJcbiAgXG4gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgJCgnI3NldHRpbmdzJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgIH0sIDUwMCk7XHJcbiAgXG4gICB9KTsqL1xuXG4gIC8vIFRvb2x0aXAgdmlld1xuXG4gICQoXCIuc2ltdWxhdGlvbi1zdGFydGVkLWFsZXJ0IC5jbG9zZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJChcIi5zaW11bGF0aW9uLXN0YXJ0ZWQtYWxlcnRcIikuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICB9KTtcblxuICAkKFwiI3Jlc2V0LWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgcmVzZXRTaW11bGF0aW9uKHRvb2x0aXApO1xuICB9KTtcblxuICAvL3BhbmVsIGNvbGxhcHNlLCBzaG93IGFycm93czogXG4gICQoJy5jb2xsYXBzZScpLm9uKCdzaG93bi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKHVuZGVmaW5lZCkucGFyZW50KCkuZmluZChcIi5kb3duLWFycm93LCAudXAtYXJyb3dcIikudG9nZ2xlKCk7XG4gIH0pLm9uKCdoaWRkZW4uYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh1bmRlZmluZWQpLnBhcmVudCgpLmZpbmQoXCIuZG93bi1hcnJvdywgLnVwLWFycm93XCIpLnRvZ2dsZSgpO1xuICB9KTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gIFwic3ZcIjpcclxuICB7XHJcbiAgICBcImZhY3RzXCI6IHtcclxuICAgICAgXCJkeXNsZXhpYVwiOiBcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiRHlzbGV4aVwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkR5c2xleGkgw6RyIGVuIG5lZHPDpHR0bmluZyBzb20gZ8O2ciBhdHQgaGrDpHJuYW4gaGFyIHN2w6VydCBhdHQgYXV0b21hdGlzZXJhIHRvbGtuaW5nZW4gYXYgb3JkLiBEZXR0YSBnw7ZyIGF0dCBwZXJzb25lciBtZWQgZGVubmEgbmVkc8OkdHRuaW5nIGthbiBoYSBzdsOlcnQgYXR0IGzDpHNhIG9jaCBza3JpdmEuIER5c2xleGkgw6RyIGludGUga29wcGxhdCB0aWxsIHN5biBlbGxlciBpbnRlbGxpZ2Vucy4gT3JzYWtlcm5hIHRpbGwgZHlzbGV4aSDDpHIgZm9ydGZhcmFuZGUgb2tsYXJ0LlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrIG9jaCBsw6VuZ2EgdGV4dGVyLiBTZSB0aWxsIGF0dCBoYSBvcmRlbnRsaWd0IG1lZCByYWRhdnN0w6VuZC5cIiwgXHRcclxuICAgICAgICAgIFwiVW5kdmlrIHN2w6VyYSBvcmQgb2NoIGZhY2t0ZXJtZXIuXCIsXHJcbiAgICAgICAgICBcIkVyYmp1ZCBsw6R0dGzDpHN0YSB2ZXJzaW9uZXIgYXYgZmFja3RleHRlci5cIixcclxuICAgICAgICAgIFwiVW5kdmlrIHR5cHNuaXR0IG1lZCBrcsOlbmdsaWdhIG9jaCBrb21wbGV4YSBmaWd1cmVyLlwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGFya2luc29uc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiEgcsO2ciBtdXNwZWthcmVuIHDDpSB3ZWJicGxhdHNlbiBvY2ggc2UgdmFkIHNvbSBow6RuZGVyLlwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlBhcmtpbnNvbnNcIixcclxuICAgICAgICBcImZhY3RcIjogXCJWaWQgUGFya2luc29ucyBzanVrZG9tIGbDtnJzdMO2cnMgY2VsbGVybmEgaSBoasOkcm5hbiBzb20gdGlsbHZlcmthciBkb3BhbWluIHZpbGtldCBnw7ZyIGF0dCBoasOkcm5hbiBmw6VyIGVuIG5lZHNhdHQgZsO2cm3DpWdhIGF0dCBza2lja2Egc2lnbmFsZXIuIFBlcnNvbmVyIG1lZCBQYXJraW5zb25zIGthbiBkcmFiYmFzIGF2IHN5bXB0b20gc29tIHNrYWtuaW5nYXIsIHN0ZWxhIG11c2tsZXIgb2NoIHPDpG1yZSByw7ZyZWxzZWbDtnJtw6VnYS4gT3JzYWtlcm5hIHRpbGwgUGFya2luc29ucyBzanVrZG9tIMOkciBmb3J0ZmFyYW5kZSBva2xhcnQuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJTZSB0aWxsIGF0dCB3ZWJicGxhdHNlbiBrYW4gYW52w6RuZGFzIG1lZCBhbmRyYSBoasOkbHBtZWRlbCDDpG4gbXVzLCB0aWxsIGV4ZW1wZWwgdGFuZ2VudGJvcmRzbmF2aWdlcmluZy5cIiwgXHRcclxuICAgICAgICAgIFwiSGEgdGlsbHLDpGNrbGlndCBtZWQgbHVmdCBtZWxsYW4ga29tcG9uZW50ZXJcIixcclxuICAgICAgICAgIFwiSGEgdGlsbHLDpGNrbGlndCBzdG9yYSBrbGlja3l0b3IuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9VcmxzXCI6IFwiaHR0cDovL3d3dy5wYXJraW5zb25mb3JidW5kZXQuc2VcIixcclxuICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiUGFya2luc29uc2bDtnJidW5kZXRcIlxyXG4gICAgICB9LFxyXG4gICAgICBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0XCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVyc29uZXIgbWVkIGRlZmVrdCBmw6RyZ3NlZW5kZSBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHRhcHBhciBzb20gdGFyIHVwcCBmw6RyZ2VybmEgdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE7DpHIgZW4gZWxsZXIgZmxlcmEgYXYgdGFwcGFybmEgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhIGxlZGVyIGRldCB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZS4gR3VsLWJsw6UgZsOkcmdibGluZGhldCAoVHJpdGFub3BpKSDDpHIgc8OkbGxzeW50LiBOYW1uZXQgw6RyIG1pc3NsZWRhbmRlIGTDpSBkZXQgaW50ZSDDpHIgZsOkcmdlcm5hIGd1bCBvY2ggYmzDpSBzb20gZsO2cnbDpHhsYXMsIHV0YW4gYmzDpSBtZWQgZ3LDtm4gb2NoIGd1bCBtZWQgbGlsYS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZGV0IGVuZGEgc8OkdHRldCBhdHQgZsO2cm1lZGxhIGluZm9ybWF0aW9uLCBpbmRpa2VyYSBlbiBoYW5kbGluZyBlbGxlciBpZGVudGlmaWVyYSBldHQgZWxlbWVudC4gTWFya2VyYSB0aWxsIGV4ZW1wZWwgaW50ZSBldHQgZmVsYWt0aWd0IGZvcm11bMOkcmbDpGx0IGVuZGFzdCBtZWQgZW4gcsO2ZCByYW0gdXRhbiBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBvY2ggZ8Okcm5hIGVuIGlrb24uXCIsIFx0XHJcbiAgICAgICAgICBcIkVyYmp1ZCBnw6RybmEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1VybHNcIjogXCJodHRwczovL3N2Lndpa2lwZWRpYS5vcmcvd2lraS9EZWZla3RfZiVDMyVBNHJnc2VlbmRlXCIsXHJcbiAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldpa2lwZWRpYSBvbSBkZWZla3QgZsOkcmdzZWVuZGVcIlxyXG4gICAgICB9LFxyXG4gICAgICBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiUsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0XCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVyc29uZXIgbWVkIGRlZmVrdCBmw6RyZ3NlZW5kZSBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHRhcHBhciBzb20gdGFyIHVwcCBmw6RyZ2VybmEgdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE7DpHIgZW4gZWxsZXIgZmxlcmEgYXYgdGFwcGFybmEgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhIGxlZGVyIGRldCB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZS4gUsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0IChQcm90YW5vcGkgb2NoIERldXRlcmFub3BpKSDDpHIgZGVuIHZhbmxpZ2FzdGUgdHlwZW4gYXYgZsOkcmdibGluZGhldC4gRGVuIMOkciB2YW5saWdhcmUgaG9zIG3DpG4gw6RuIGt2aW5ub3IuIFBlcnNvbmVyIHLDtmQtZ3LDtm4gZsOkcmdibGluZGhldCBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIGbDpHJnZXJuYSByw7ZkLCBncsO2biwgYnJ1biBvY2ggb3JhbmdlLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFxyXG4gICAgICAgIFtcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCByw7ZkIHJhbSwga29tcGxldHRlcmEgw6R2ZW4gbWVkIHRleHQgb2NoIGfDpHJuYSBlbiAgaWtvbi5cIiwgXCJFcmJqdWQgZ8Okcm5hIGV0dCBow7Zna29udHJhc3QtbMOkZ2UuXCJdLFxyXG4gICAgICAgIFwibW9yZUluZm9VcmxzXCI6IFwiaHR0cHM6Ly9zdi53aWtpcGVkaWEub3JnL3dpa2kvRGVmZWt0X2YlQzMlQTRyZ3NlZW5kZVwiLFxyXG4gICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJXaWtpcGVkaWEgb20gZGVmZWt0IGbDpHJnc2VlbmRlXCJcclxuICAgICAgfSxcclxuICAgICAgXCJmYXJzaWdodGVkbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJMw6VuZ3N5bnRoZXRcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgSHlwZXJvcGkgc2VyIHN1ZGRpZ3QgcMOlIG7DpHJhIGjDpWxsLCBtZW4gYnJhIHDDpSBsw6VuZ3QgaMOlbGwuIE5lZHPDpHR0bmluZ2VuIHVwcHN0w6VyIHDDpSBncnVuZCBhdiBhdHQgbGp1c2V0IGludGUgYnJ5dHMgcsOkdHQgaSDDtmdhdC4gRGV0IMOkciBlbiBhdiBkZSB2YW5saWdhc3RlIHN5bm5lZHPDpHR0bmluZ2FybmEuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJVbmR2aWsgdGV4dCBpIGxpdGVuIHN0b3JsZWsuXCIsIFx0XHJcbiAgICAgICAgICBcIldlYmJzaWRhbiBza2EgZ8OlIGF0dCBmw7Zyc3RvcmEgKHpvb21hcykgdGlsbCBtaW5zdCAyMDAgJSBzw6UgYXR0IGJlc8O2a2FyZW4ga2FuIGFucGFzc2EgaW5uZWjDpWxsZXRzIHN0b3JsZWsgZWZ0ZXIgc2luYSBiZWhvdi5cIixcclxuICAgICAgICAgIFwiRXJianVkIHVwcGzDpHNuaW5nIGF2IGlubmVow6VsbGV0LlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvVXJsc1wiOiBcImh0dHBzOi8vd2ViYnJpa3RsaW5qZXIuc2Uvci8zOS1nZS13ZWJicGxhdHNlbi1lbi1nb2QtbGFzYmFyaGV0L1wiLFxyXG4gICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJXZWJicmlrdGxpbmplIEdlIHdlYmJwbGF0c2VuIGdvZCBsw6RzYmFyaGV0XCJcclxuICAgICAgfSxcclxuICAgICAgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkhlbHQgZsOkcmdibGluZFwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkRlZmVrdCBmw6RyZ3NlZW5kZSBpbm5lYsOkciBhdHQgZW4gcGVyc29uIGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6Ugdmlzc2EgZWxsZXIgYWxsYSBmw6RyZ2VyLiBFdHQgZnVsbHQgZnVuZ2VyYW5kZSDDtmdhIGhhciB0cmUgb2xpa2EgdHlwZXIgYXYgdGFwcGFyIHNvbSB0YXIgdXBwIG9saWthIGbDpHJnZXI6IHZpb2xldHQsIGdyw7ZuIG9jaCByw7ZkLiBPcnNha2VuIHRpbGwgZGVmZWt0IGbDpHJnc2VlbmRlIMOkciBhdHQgZW4gZWxsZXIgZmxlcmEgYXYgZGVzc2EgdHlwZXIgYXYgdGFwcGFyIHNha25hcyBlbGxlciDDpHIgZGVmZWt0YS4gSGVsdCBmw6RyZ2JsaW5kIChNb25va3JvbWFzaS9ha3JvbWF0b3BzaSkgw6RyIG15Y2tldCBzw6RsbHN5bnQuIFBlcnNvbmVyIG1lZCBkZW5uYSBzeW5uZWRzw6R0dG5pbmcgc2VyIGluZ2EgZsOkcmdlciB1dGFuIHNlciBlbmRhc3QgaSBncsOlc2thbGEuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJBbnbDpG5kIGludGUgZsOkcmcgc29tIGRldCBlbmRhIHPDpHR0ZXQgYXR0IGbDtnJtZWRsYSBpbmZvcm1hdGlvbiwgaW5kaWtlcmEgZW4gaGFuZGxpbmcgZWxsZXIgaWRlbnRpZmllcmEgZWxlbWVudC4gTWFya2VyYSB0LmV4LiBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCByw7ZkIHJhbSwga29tcGxldHRlcmEgw6R2ZW4gbWVkIHRleHQgZWxsZXIgaWtvbi5cIiwgXHRcclxuICAgICAgICAgIFwiRGV0IGthbiB2YXJhIGVuIGJyYSBpZMOpIGF0dCBlcmJqdWRhIGV0dCBow7Zna29udHJhc3QtbMOkZ2UuXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwidHVubmVsVmlzaW9uXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2ISByw7ZyIG11c3Bla2FyZW4gcMOlIHdlYmJwbGF0c2VuIG9jaCBzZSB2YWQgc29tIGjDpG5kZXIuXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiVHVubmVsc2VlbmRlXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiRGV0IHNvbSBpIGRhZ2xpZ3QgdGFsIGJydWthciBrYWxsYXMgdHVubmVsc2VlbmRlIMOkciBlbiBzeW5uZWRzw6R0dG5pbmcgc29tIGfDtnIgYXR0IGVuZGFzdCBlbiBkZWwgYXYgc3luZsOkbHRldCBrYW4gc2VzLiBEZXR0YSBrYW4gYmVybyBww6UgYXR0IHBlcnNvbmVuIGxpZGVyIGF2IGVuIHNqdWtkb20gc29tIGfDtnIgYXR0IGNlbGxlcm5hIGkgw7ZnYXQgZsO2cnN0w7ZycyBtZW4gZGVubmEgdHlwIGF2IHN5bm5lZHPDpHR0bmluZyBrYW4gb2Nrc8OlIHRpbGxmw6RsbGlndCB1cHBzdMOlIHDDpSBncnVuZCBhdiBzdHJlc3MgZWxsZXIgZGVwcmVzc2lvbi5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIlVuZHZpayB0ZXh0IGkgbGl0ZW4gc3Rvcmxlay5cIixcclxuICAgICAgICAgIFwiV2ViYnNpZGFuIHNrYSBnw6UgYXR0IGbDtnJzdG9yYSAoem9vbWFzKSB0aWxsIG1pbnN0IDIwMCAlIHPDpSBhdHQgYmVzw7ZrYXJlbiBrYW4gYW5wYXNzYSBpbm5laMOlbGxldHMgc3RvcmxlayBlZnRlciBzaW5hIGJlaG92LlwiLFxyXG4gICAgICAgICAgXCJFcmJqdWQgdXBwbMOkc25pbmcgYXYgaW5uZWjDpWxsZXQuXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwic3Vuc2hpbmVcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiU29sc2tlblwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkxvcmVtIGlwc3VtXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJMb3JlbSBpcHN1bS5cIixcclxuICAgICAgICAgIFwiTG9yZW0gaXBzdW0uXCIsXHJcbiAgICAgICAgICBcIkxvcmVtIGlwc3VtXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiY29uY2VudHJhdGlvblwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJLb25jZW50cmF0aW9uXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiQWxsYSBrYW4gaGEgc3bDpXJ0IGF0dCBrb25jZW50cmVyYSBzaWcgbWVuIGbDtnIgdmlzc2Ega2FuIGRldCBibGkgZXR0IHN0b3J0IHByb2JsZW0gaSB2YXJkYWdzbGl2ZXQuIERlc3NhIGZ1bmt0aW9uc25lZHPDpHR0bmluZ2FyIGthbiBvcnNha2Egc3bDpXJpZ2hldGVyIG1lZCBhdHQgaGFudGVyYSBpbnRyeWNrLCBzb3J0ZXJhIGluZm9ybWF0aW9uIG9jaCBsanVka8OkbnNsaWdoZXQuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJHZSB3ZWJicGxhdHNlbiBlbiBlbmtlbCBvY2ggbHVmdGlnIGRlc2lnbi5cIixcclxuICAgICAgICAgIFwiVmFyIGbDtnJzaWt0aWcgbWVkIGFuaW1hdGlvbmVyIG9jaCBzdGFya2EgZsOkcmdlci5cIixcclxuICAgICAgICAgIFwiVW5kdmlrIGF0dCBoYSBmw7ZyIG15Y2tldCBpbm5laMOlbGwgcMOlIHNhbW1hIHNpZGEuXCIsXHJcbiAgICAgICAgICBcIkVyYmp1ZCBsanVkLSBvY2ggdmlkZW8tYWxlcm5hdGl2IHRpbGwgdGV4dGlubmVow6VsbC5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJzbWFsbFZvY2FidWxhcnlcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiTGl0ZXQgb3JkZsO2cnLDpWRcIixcclxuICAgICAgICBcImZhY3RcIjogXCJFbiBzdG9yIGRlbCBhdiBqb3JkZW5zIGJlZm9sa25pbmcga2FuIGludGUgbMOkc2EgYWxscyBvY2ggbcOlbmdhIHZ1eG5hIGzDpHNlciBpbnRlIHPDpSBicmEgc29tIGbDtnJ2w6RudGFzIGVmdGVyIGdydW5kc2tvbGV1dGJpbGRuaW5nZW4uXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJVbmR2aWsga3LDpW5nbGlnYSBvcmQgb2NoIGZhY2t0ZXJtZXIuXCIsICAgXHJcbiAgICAgICAgICBcIkVyYmp1ZCBsw6R0dGzDpHN0IHZlcnNpb24gYXYga3LDpW5nbGlnYSB0ZXh0ZXIuXCIsXHJcbiAgICAgICAgICBcIkVyYmp1ZCB0ZXh0ZXIgcMOlIG9saWthIHNwcsOlay5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiVUlcIjoge1xyXG4gICAgICBcInNlbGVjdFNpbXVsYXRpb25cIjogXCJWw6RsaiBzaW11bGVyaW5nOlwiLFxyXG4gICAgICBcInJlc2V0XCI6IFwiw4V0ZXJzdMOkbGxcIixcclxuICAgICAgXCJhZHZpY2VcIjogXCJUw6RuayBww6UgZGV0dGFcIixcclxuICAgICAgXCJtb3JlSW5mb1wiOiBcIk1lciBpbmZvcm1hdGlvblwiLFxyXG4gICAgICBcInNpZ2h0XCI6IFwiU3luXCIsXHJcbiAgICAgIFwidG90YWxDb2xvckJsaW5kbmVzc1wiOiBcIkhlbHQgZsOkcmdibGluZFwiLFxyXG4gICAgICBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIiwgICAgXHJcbiAgICAgIFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOiBcIlLDtmQtZ3LDtm4gZsOkcmdibGluZGhldFwiLFxyXG4gICAgICBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiTMOlbmdzeW50aGV0LCDDtnZlcnN5bnRoZXRcIixcclxuICAgICAgXCJ0dW5uZWxWaXNpb25cIjogXCJUdW5uZWxzZWVuZGVcIixcclxuICAgICAgXCJtb2JpbGl0eVwiOiBcIk1vdG9yaWtcIixcclxuICAgICAgXCJwYXJraW5zb25zXCI6IFwiUGFya2luc29uc1wiLFxyXG4gICAgICBcInJlYWRBbmRXcml0ZVwiOiBcIkzDpHNhIG9jaCBza3JpdmFcIixcclxuICAgICAgXCJkeXNsZXhpYVwiOiBcIkR5c2xleGlcIixcclxuICAgICAgXCJzbWFsbFZvY2FidWxhcnlcIjogXCJMaXRldCBvcmRmw7ZycsOlZFwiLFxyXG4gICAgICBcImNvbmNlbnRyYXRpb25cIjogXCJLb25jZW50cmF0aW9uXCIsXHJcbiAgICAgIFwiY2hhbmdlU2V0dGluZ3NcIjogXCJDaGFuZ2Ugc2V0dGluZ3NcIixcclxuICAgICAgXCJzZWxlY3RMYW5ndWFnZVwiOiBcIlNlbGVjdCBsYW5ndWFnZVwiLFxyXG4gICAgICBcInNhdmVTZXR0aW5nc1wiOiBcIlNhdmUgc2V0dGluZ3NcIixcclxuICAgICAgXCJjYW5jZWxcIjogXCJDYW5jZWxcIixcclxuICAgICAgXCJzaW11bGF0aW9uc1wiOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiU3luXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgICB7IFwidG90YWxDb2xvckJsaW5kbmVzc1wiOiBcIkhlbHQgZsOkcmdibGluZFwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjogXCJHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0XCIgfSxcclxuICAgICAgICAgICAgeyBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXRcIiB9LFxyXG4gICAgICAgICAgICB7IFwiZmFyc2lnaHRlZG5lc3NcIjogXCJMw6VuZ3N5bnRoZXQsIMO2dmVyc3ludGhldFwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJ0dW5uZWxWaXNpb25cIjogXCJUdW5uZWxzZWVuZGVcIiB9LFxyXG4gICAgICAgICAgICB7IFwic3Vuc2hpbmVcIjogXCJTb2xza2VuXCIgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiTW90b3Jpa1wiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFsgXHJcbiAgICAgICAgICAgIHsgXCJwYXJraW5zb25zXCI6IFwiUGFya2luc29uc1wiIH1cclxuICAgIFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJMw6RzYSBvY2ggc2tyaXZhXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgICB7IFwiZHlzbGV4aWFcIjogXCJEeXNsZXhpXCIgfSxcclxuICAgICAgICAgICAgeyBcInNtYWxsVm9jYWJ1bGFyeVwiOiBcIkxpdGV0IG9yZGbDtnJyw6VkXCIgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiS29uY2VudHJhdGlvblwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJNaW5uZVwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgXCJlblwiOlxyXG4gIHtcclxuICAgIFwiZmFjdHNcIjoge1xyXG4gICAgICBcImR5c2xleGlhXCI6IFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiRHlzbGV4aWFcIixcclxuICAgICAgICBcImZhY3RcIjogXCJEeXNsZXhpYSBpcyBhIGRpc2FiaWxpdHkgdGhhdCBtYWtlcyBpdCBkaWZmaWN1bHQgZm9yIHRoZSBicmFpbiB0byBhdXRvbWF0ZSB0aGUgaW50ZXJwcmV0YXRpb24gb2Ygd29yZHMuIFRoaXMgbWFrZXMgaXQgaGFyZCBmb3IgcGVvcGxlIHdpdGggdGhpcyBkaXNhYmlsaXR5IHRvIHJlYWQgYW5kIHdyaXRlLiBEeXNsZXhpYSBpcyBoYXMgbm8gY29ubmVjdGlvbiB3aXRoIHZpc2lvbiBvciBpbnRlbGxpZ2VuY2UuIFRoZSBjYXVzZXMgb2YgZHlzbGV4aWEgYXJlIHN0aWxsIHVuY2xlYXIuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJBdm9pZCB0ZXh0IGluIHNtYWxsIGZvbnQgc2l6ZXMgYW5kIGxvbmcgdGV4dHMuIFVzZSBwcm9wZXIgc3BhY2luZyBhbmQgbGluZSBoZWlnaHQuXCIsXHJcbiAgICAgICAgICBcIkF2b2lkIGRpZmZpY3VsdCB3b3JkcyBhbmQgdGVybXMuXCIsXHJcbiAgICAgICAgICBcIk9mZmVyIGVhc3kgdG8gcmVhZCB0ZXh0cywgaW1hZ2VzLCB2aWRlbyBvciBhdWRpbyBhbHRlcm5hdGl2ZXMuXCIsXHJcbiAgICAgICAgICBcIkF2b2lkIGZvbnRzIHdpdGggY29tcGxpY2F0ZWQgYW5kIGNvbXBsZXggY2hhcmFjdGVycy5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly9pbmNsdXNpdmVkZXNpZ25wcmluY2lwbGVzLm9yZy8jcHJpb3JpdGlzZS1jb250ZW50XCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJQcmlvcml0aXNlIGNvbnRlbnRcIiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhcmtpbnNvbnNcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlISBtb3ZlIHRoZSBtb3VzZSBwb2ludGVyIG9uIHRoZSB3ZWIgcGFnZSBhbmQgc2VlIHdoYXQncyBoYXBwZW5pbmcuXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiUGFya2luc29uc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBhcmtpbnNvbidzIGRpc2Vhc2UgZGVzdHJveXMgdGhlIGNlbGxzIGluIHRoZSBicmFpbiB0aGF0IHByb2R1Y2UgZG9wYW1pbmUsIHdoaWNoIGNhdXNlcyB0aGUgYnJhaW4gdG8gaGF2ZSBhIHJlZHVjZWQgYWJpbGl0eSB0byBzZW5kIHNpZ25hbHMuIFBlcnNvbnMgd2l0aCBQYXJraW5zb24ncyBtYXkgc3VmZmVyIGZyb20gc3ltcHRvbXMgc3VjaCBhcyBzaGFraW5nLCBzdGlmZiBtdXNjbGVzLCBhbmQgcmVkdWNlZCBtb2JpbGl0eS4gVGhlIGNhdXNlcyBvZiBQYXJraW5zb24ncyBkaXNlYXNlIGFyZSBzdGlsbCB1bmNsZWFyLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiTWFrZSBzdXJlIHRoZSB3ZWJzaXRlIGNhbiBiZSB1c2VkIHdpdGggb3RoZXIgdG9vbHMgb3RoZXIgdGhhbiBhIG1vdXNlLCBzdWNoIGFzIGtleWJvYXJkIG5hdmlnYXRpb24uXCIsXHJcbiAgICAgICAgICBcIkhhdmUgZW5vdWdoIHNwYWNlIGJldHdlZW4gY29tcG9uZW50cy5cIixcclxuICAgICAgICAgIFwiTWFrZSBzdXJlIGNsaWNrIGFyZWFzIGFyZSBiaWcgZW5vdWdoLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvXCI6IFxyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL2luY2x1c2l2ZWRlc2lnbnByaW5jaXBsZXMub3JnLyNvZmZlci1jaG9pY2VcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIk9mZmVyIGNob2ljZVwiIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJZZWxsb3ctYmx1ZSBjb2xvciBibGluZG5lc3NcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZW9wbGUgd2l0aCBsb3dlcmVkIGNvbG9yIHZpc2lvbiBoYXZlIGRpZmZpY3VsdHkgZGlzdGluZ3Vpc2hpbmcgc29tZSBvciBhbGwgY29sb3JzLiBZZWxsb3ctYmx1ZSBjb2xvciBibGluZG5lc3MgKFRyaXRhbm9waWEpIGlzIHJhcmUuIFRoZSBuYW1lIGNhbiBiZSBtaXNsZWFkaW5nLiBJdCdzIG5vdCB0aGUgY29sb3JzIHllbGxvdyBhbmQgYmx1ZSB0aGF0IGFyZSBjb25mdXNlZCBidXQgYmx1ZSB3aXRoIGdyZWVuIGFuZCB5ZWxsb3cgd2l0aCBwdXJwbGUuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJEbyBub3QgdXNlIGNvbG9yIGFzIHRoZSBvbmx5IHdheSB0byBjb252ZXkgaW5mb3JtYXRpb24sIGluZGljYXRlIGFuIGFjdGlvbiBvciBpZGVudGlmeSBhbiBlbGVtZW50LiBGb3IgZXhhbXBsZSwgZG8gbm90IG1hcmsgYW4gaW5jb3JyZWN0IGZvcm0gZmllbGQgd2l0aCBhIHJlZCBib3JkZXIgb25seSwgYWxzbyBzdXBwbGVtZW50IHdpdGggYSB0ZXh0IGFuZCBwcmVmZXJhYmx5IGFuIGljb24uXCIsXHJcbsKgwqDCoMKgwqDCoMKgwqDCoMKgXCJDb25zaWRlciBvZmZlcmluZyBhIGhpZ2ggY29udHJhc3QgbW9kZS5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vYWNjZXNzaWJpbGl0eS5ibG9nLmdvdi51ay8yMDE2LzA2LzE3L2NvbG91ci1jb250cmFzdC13aHktZG9lcy1pdC1tYXR0ZXIvXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJXaHkgY29sb3VyIGNvbnRyYXN0IG1hdHRlcnNcIiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlIVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlJlZC1ncmVlbiBjb2xvciBibGluZG5lc3NcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZW9wbGUgd2l0aCBsb3dlcmVkIGNvbG9yIHZpc2lvbiBoYXZlIGRpZmZpY3VsdHkgZGlzdGluZ3Vpc2hpbmcgc29tZSBvciBhbGwgY29sb3JzLiBSZWQtZ3JlZW4gY29sb3IgYmxpbmRuZXNzIChQcm90YW5vcGlhIGFuZCBEZXV0ZXJhbm9waWEpIGlzIHRoZSBtb3N0IGNvbW1vbiB0eXBlIG9mIGNvbG9yIGJsaW5kbmVzcy4gSXQgaXMgbW9yZSBjb21tb24gYW1vbmcgbWVuIHRoYW4gd29tZW4uIFBlb3BsZSB3aXRoIHJlZC1ncmVlbiBjb2xvciBibGluZG5lc3MgaGF2ZSBkaWZmaWN1bHR5IGRpc3Rpbmd1aXNoaW5nIHRoZSBjb2xvcnMgcmVkLCBncmVlbiwgYnJvd24gYW5kIG9yYW5nZS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkRvIG5vdCB1c2UgY29sb3IgYXMgdGhlIG9ubHkgd2F5IHRvIGNvbnZleSBpbmZvcm1hdGlvbiwgaW5kaWNhdGUgYW4gYWN0aW9uIG9yIGlkZW50aWZ5IGFuIGVsZW1lbnQuIEZvciBleGFtcGxlLCBkbyBub3QgbWFyayBhbiBpbmNvcnJlY3QgZm9ybSBmaWVsZCB3aXRoIGEgcmVkIGJvcmRlciBvbmx5LCBhbHNvIHN1cHBsZW1lbnQgd2l0aCBhIHRleHQgYW5kIHByZWZlcmFibHkgYW4gaWNvbi5cIixcclxuwqDCoMKgwqDCoMKgwqDCoMKgwqBcIkNvbnNpZGVyIG9mZmVyaW5nIGEgaGlnaCBjb250cmFzdCBtb2RlLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvXCI6IFxyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly9kZXZlbG9wZXIucGFjaWVsbG9ncm91cC5jb20vcmVzb3VyY2VzL2NvbnRyYXN0YW5hbHlzZXIvXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb2xvdXIgQ29udHJhc3QgQW5hbHlzZXJcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuaW5jbHVzaXZlZGVzaWdudG9vbGtpdC5jb20vVUN2aXNpb24vdmlzaW9uLmh0bWwjY29sb3VyXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJFbnN1cmUgc3VmZmljaWVudCBjb250cmFzdFwiIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmFyc2lnaHRlZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlIVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkZhci1zaWdodGVkbmVzc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkZhci1zaWdodGVkbmVzcyAoSHlwZXJvcGlhKSBpcyBvbmUgb2YgdGhlIG1vc3QgY29tbW9uIHZpc3VhbCBpbXBhaXJtZW50cy4gUGVvcGxlIHdpdGggSHlwZXJvcGlhIGhhdmUgZGlmZmljdWx0eSBmb2N1c2luZyBvbiBvYmplY3RzIGF0IGNsb3NlIHJhbmdlIHdoaWNoIG1ha2VzIHRoZW0gYXBwZWFyIGJsdXJyeS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkF2b2lkIHRleHQgaW4gc21hbGwgZm9udCBzaXplcyBhbmQgbG9uZyB0ZXh0cy4gVXNlIHByb3BlciBzcGFjaW5nIGFuZCBsaW5lIGhlaWdodC5cIiwgIFxyXG4gICAgICAgICAgXCJNYWtlIHN1cmUgdGhlIHdlYnNpdGUgY2FuIGJlIHpvb21lZCB0byBhdCBsZWFzdCAyMDAlLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciBhIHRleHQgdG8gc3BlZWNoIHJlYWRlci5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly9pbmNsdXNpdmVkZXNpZ25wcmluY2lwbGVzLm9yZy8jcHJvdmlkZS1jb21wYXJhYmxlLWV4cGVyaWVuY2VcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIlByb3ZpZGUgY29tcGFyYWJsZSBleHBlcmllbmNlXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmluY2x1c2l2ZWRlc2lnbnRvb2xraXQuY29tL1VDdmlzaW9uL3Zpc2lvbi5odG1sI3NoYXBlXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb25zaWRlciBzaXplXCIgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJUb3RhbCBjb2xvciBibGluZG5lc3NcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZW9wbGUgd2l0aCBsb3dlcmVkIGNvbG9yIHZpc2lvbiBoYXZlIGRpZmZpY3VsdHkgZGlzdGluZ3Vpc2hpbmcgc29tZSBvciBhbGwgY29sb3JzLiBUb3RhbCBjb2xvciBibGluZG5lc3MgKE1vbm9jaHJvbWF0aWMgLyBBY2hyb21hdG9wc3kpIGlzIHZlcnkgcmFyZS4gUGVvcGxlIHdpdGggdGhpcyB2aXN1YWwgaW1wYWlybWVudCBjYW4gbm90IHBlcmNpZXZlIGFueSBjb2xvcnMsIG9ubHkgZGlmZmVyZW50IHNoYWRlcyBvZiBncmF5LlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiRG8gbm90IHVzZSBjb2xvciBhcyB0aGUgb25seSB3YXkgdG8gY29udmV5IGluZm9ybWF0aW9uLCBpbmRpY2F0ZSBhbiBhY3Rpb24gb3IgaWRlbnRpZnkgYW4gZWxlbWVudC4gRm9yIGV4YW1wbGUsIGRvIG5vdCBtYXJrIGFuIGluY29ycmVjdCBmb3JtIGZpZWxkIHdpdGggYSByZWQgYm9yZGVyIG9ubHksIGFsc28gc3VwcGxlbWVudCB3aXRoIGEgdGV4dCBhbmQgcHJlZmVyYWJseSBhbiBpY29uLlwiLFxyXG7CoMKgwqDCoMKgwqDCoMKgwqDCoFwiQ29uc2lkZXIgb2ZmZXJpbmcgYSBoaWdoIGNvbnRyYXN0IG1vZGUuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9cIjogXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy53My5vcmcvV0FJL2dldHRpbmdzdGFydGVkL3RpcHMvZGVzaWduaW5nLmh0bWwjcHJvdmlkZS1zdWZmaWNpZW50LWNvbnRyYXN0LWJldHdlZW4tZm9yZWdyb3VuZC1hbmQtYmFja2dyb3VuZFwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiUHJvdmlkZSBzdWZmaWNpZW50IGNvbnRyYXN0IGJldHdlZW4gZm9yZWdyb3VuZCBhbmQgYmFja2dyb3VuZFwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly93d3cudzMub3JnL1dBSS9nZXR0aW5nc3RhcnRlZC90aXBzL2Rlc2lnbmluZy5odG1sI2RvbnQtdXNlLWNvbG9yLWFsb25lLXRvLWNvbnZleS1pbmZvcm1hdGlvblwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiRG9u4oCZdCB1c2UgY29sb3IgYWxvbmUgdG8gY29udmV5IGluZm9ybWF0aW9uXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy53My5vcmcvVFIvVU5ERVJTVEFORElORy1XQ0FHMjAvdmlzdWFsLWF1ZGlvLWNvbnRyYXN0LWNvbnRyYXN0Lmh0bWwjdmlzdWFsLWF1ZGlvLWNvbnRyYXN0LWNvbnRyYXN0LXJlc291cmNlcy1oZWFkXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJMaXN0IG9mIHRvb2xzIHRvIGhlbHAgZGV0ZXJtaW5lIGNvbnRyYXN0IHJhdGlvXCIgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuXHJcbiAgICAgIFwidHVubmVsVmlzaW9uXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSEgbW92ZSB0aGUgbW91c2UgcG9pbnRlciBvbiB0aGUgd2ViIHBhZ2UgYW5kIHNlZSB3aGF0J3MgaGFwcGVuaW5nLlwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlR1bm5lbCBWaXNpb25cIixcclxuICAgICAgICBcImZhY3RcIjogXCJXaGF0IGlzIGNvbW1vbmx5IGNhbGxlZCBUdW5uZWwgVmlzaW9uIGlzIGxvc3Mgb2YgcGVyaXBoZXJhbCB2aXNpb24uIFRoaXMgbWF5IGJlIGJlY2F1c2UgdGhlIHBlcnNvbiBzdWZmZXJzIGZyb20gYSBkaXNlYXNlIHRoYXQgYWZmZWN0cyB0aGUgY2VsbHMgaW4gdGhlIGV5ZSwgYnV0IG1heSBhbHNvIG9jY3VyIHRlbXBvcmFyaWx5IGR1ZSB0byBzdHJlc3Mgb3IgZGVwcmVzc2lvbi5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkF2b2lkIHRleHQgaW4gc21hbGwgZm9udCBzaXplcyBhbmQgbG9uZyB0ZXh0cy4gVXNlIHByb3BlciBzcGFjaW5nIGFuZCBsaW5lIGhlaWdodC5cIixcclxuICAgICAgICAgIFwiTWFrZSBzdXJlIHRoZSB3ZWJzaXRlIGNhbiBiZSB6b29tZWQgdG8gYXQgbGVhc3QgMjAwJS5cIixcclxuICAgICAgICAgIFwiT2ZmZXIgYSB0ZXh0IHRvIHNwZWVjaCByZWFkZXIuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9cIjogXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vaW5jbHVzaXZlZGVzaWducHJpbmNpcGxlcy5vcmcvI2dpdmUtY29udHJvbFwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQWxsb3cgem9vbVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL3d3dy5pbmNsdXNpdmVkZXNpZ250b29sa2l0LmNvbS9VQ3Zpc2lvbi92aXNpb24uaHRtbCNsYXlvdXRcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbnNpZGVyIHZpc3VhbCBmaWVsZCBsb3NzXCIgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJzdW5zaGluZVwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiU3Vuc2hpbmVcIixcclxuICAgICAgICBcImZhY3RcIjogXCJMb3JlbSBpcHN1bVwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiTG9yZW0gaXBzdW0uXCIsXHJcbiAgICAgICAgICBcIkxvcmVtIGlwc3VtLlwiLFxyXG4gICAgICAgICAgXCJMb3JlbSBpcHN1bVwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvXCI6IFxyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL2luY2x1c2l2ZWRlc2lnbnByaW5jaXBsZXMub3JnLyNjb25zaWRlci1zaXR1YXRpb25cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbnNpZGVyIHNpdHVhdGlvblwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL3d3dy5pbmNsdXNpdmVkZXNpZ250b29sa2l0LmNvbS9VQ3Zpc2lvbi92aXNpb24uaHRtbCNsaWdodGluZ1wiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29uc2lkZXIgbGlnaHRpbmcgY29uZGl0aW9uc1wiIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiY29uY2VudHJhdGlvblwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiQ29uY2VudHJhdGlvblwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkV2ZXJ5b25lIGNhbiBoYXZlIGEgaGFyZCB0aW1lIGNvbmNlbnRyYXRpbmcsIGJ1dCBmb3Igc29tZSBpdCBjYW4gYmUgYSBiaWcgcHJvYmxlbSBpbiBldmVyeWRheSBsaWZlLiBEaXNhYmlsaXRpZXMgbGlrZSBBREhEIGFuZCBBdXRpc20gY2FuIGNhdXNlIGRpZmZpY3VsdHkgaW4gaGFuZGxpbmcgaW1wcmVzc2lvbnMsIHNvcnRpbmcgaW5mb3JtYXRpb24gYW5kIHNlbnNpdGl2aXR5IHRvIHNvdW5kLlwiLCAgICAgICAgXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJHaXZlIHRoZSB3ZWJzaXRlIGEgc2ltcGxlIGFuZCBjbGVhbiBkZXNpZ24uXCIsXHJcbiAgICAgICAgICBcIkJlIGNhcmVmdWwgd2l0aCBhbmltYXRpb25zIGFuZCBzdHJvbmcgY29sb3JzLlwiLFxyXG4gICAgICAgICAgXCJBdm9pZCBoYXZpbmcgdG9vIG11Y2ggY29udGVudCBvbiB0aGUgc2FtZSBwYWdlLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciBpbWFnZSwgYXVkaW8gYW5kIHZpZGVvIGFsZXJuYXRpdmVzIHRvIHRleHQgY29udGVudC5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly9pbmNsdXNpdmVkZXNpZ25wcmluY2lwbGVzLm9yZy8jYmUtY29uc2lzdGVudFwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQmUgY29uc2lzdGVudFwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL3d3dy5pbmNsdXNpdmVkZXNpZ250b29sa2l0LmNvbS9VQ3RoaW5raW5nL3RoaW5raW5nLmh0bWwjaW50ZXJmYWNlX25hdmlnYXRpb25fYW5kX25lc3RlZF9tZW51c1wiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQXZvaWQgZGVlcCBoaWVyYXJjaGllc1wiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmluY2x1c2l2ZWRlc2lnbnRvb2xraXQuY29tL1VDdGhpbmtpbmcvdGhpbmtpbmcuaHRtbCNzdHJ1Y3R1cmluZ19pbmZvcm1hdGlvblwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiUmVkdWNlIG1lbW9yeSBsb2FkXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmluY2x1c2l2ZWRlc2lnbnRvb2xraXQuY29tL1VDdGhpbmtpbmcvdGhpbmtpbmcuaHRtbCNhdHRlbnRpb25cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkF2b2lkIG11bHRpcGxlIGZvY3VzZXMgb2YgYXR0ZW50aW9uXCIgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJzbWFsbFZvY2FidWxhcnlcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlIVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlNtYWxsIHZvY2FidWxhcnlcIixcclxuICAgICAgICBcImZhY3RcIjogXCJBIGxhcmdlIHBhcnQgb2YgdGhlIHdvcmxkJ3MgcG9wdWxhdGlvbiBjYW4ndCByZWFkIGF0IGFsbCBhbmQgbWFueSBhZHVsdHMgZG9uJ3QgcmVhZCBhcyB3ZWxsIGFzIGV4cGVjdGVkIGFmdGVyIGZpbmlzaGluZyBncmFkZSBzY2hvb2wuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJBdm9pZCBkaWZmaWN1bHQgd29yZHMgYW5kIHRlcm1zLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciBlYXN5IHRvIHJlYWQgdGV4dHMsIGltYWdlcywgdmlkZW8gb3IgYXVkaW8gYWx0ZXJuYXRpdmVzLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciB0ZXh0cyBpbiBkaWZmZXJlbnQgbGFuZ3VhZ2VzLlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJVSVwiOiB7XHJcbiAgICAgIFwic2VsZWN0U2ltdWxhdGlvblwiOiBcIlNlbGVjdCBzaW11bGF0aW9uOlwiLFxyXG4gICAgICBcInJlc2V0XCI6IFwiUmVzZXRcIixcclxuICAgICAgXCJhZHZpY2VcIjogXCJUaGluayBhYm91dCB0aGlzXCIsXHJcbiAgICAgIFwibW9yZUluZm9cIjogXCJNb3JlIGluZm9ybWF0aW9uXCIsXHJcbiAgICAgIFwic2lnaHRcIjogXCJTaWdodFwiLFxyXG4gICAgICBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJUb3RhbCBjb2xvciBibGluZG5lc3NcIixcclxuICAgICAgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjogXCJZZWxsb3ctQmx1ZSBjb2xvciBibGluZG5lc3NcIiwgICAgXHJcbiAgICAgIFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOiBcIlJlZC1HcmVlbiBjb2xvciBibGluZG5lc3NcIixcclxuICAgICAgXCJmYXJzaWdodGVkbmVzc1wiOiBcIkZhci1zaWdodGVkbmVzc1wiLFxyXG4gICAgICBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbCB2aXNpb25cIixcclxuICAgICAgXCJtb2JpbGl0eVwiOiBcIk1vYmlsaXR5XCIsXHJcbiAgICAgIFwicGFya2luc29uc1wiOiBcIlBhcmtpbnNvbnNcIixcclxuICAgICAgXCJyZWFkQW5kV3JpdGVcIjogXCJSZWFkIGFuZCB3cml0ZVwiLFxyXG4gICAgICBcImR5c2xleGlhXCI6IFwiRHlzbGV4aWFcIixcclxuICAgICAgXCJzbWFsbFZvY2FidWxhcnlcIjogXCJTbWFsbCB2b2NhYnVsYXJ5XCIsXHJcbiAgICAgIFwiY29uY2VudHJhdGlvblwiOiBcIkNvbmNlbnRyYXRpb25cIixcclxuICAgICAgXCJjaGFuZ2VTZXR0aW5nc1wiOiBcIkNoYW5nZSBzZXR0aW5nc1wiLFxyXG4gICAgICBcInNlbGVjdExhbmd1YWdlXCI6IFwiU2VsZWN0IGxhbmd1YWdlXCIsXHJcbiAgICAgIFwic2F2ZVNldHRpbmdzXCI6IFwiU2F2ZSBzZXR0aW5nc1wiLFxyXG4gICAgICBcImNhbmNlbFwiOiBcIkNhbmNlbFwiLFxyXG4gICAgICBcInNpbXVsYXRpb25zXCI6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJTaWdodFwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtcclxuICAgICAgICAgICAgeyBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJUb3RhbCBjb2xvciBibGluZG5lc3NcIiB9LFxyXG4gICAgICAgICAgICB7IFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6IFwiWWVsbG93LUJsdWUgY29sb3IgYmxpbmRuZXNzXCIgfSxcclxuICAgICAgICAgICAgeyBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSZWQtR3JlZW4gY29sb3IgYmxpbmRuZXNzXCIgfSxcclxuICAgICAgICAgICAgeyBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiRmFyLXNpZ2h0ZWRuZXNzXCIgfSxcclxuICAgICAgICAgICAgeyBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbCB2aXNpb25cIiB9LFxyXG4gICAgICAgICAgICB7IFwic3Vuc2hpbmVcIjogXCJTdW5zaGluZVwiIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIk1vYmlsaXR5XCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogWyBcclxuICAgICAgICAgICAgeyBcInBhcmtpbnNvbnNcIjogXCJQYXJraW5zb25zXCIgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIlJlYWQgYW5kIHdyaXRlXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgICB7IFwiZHlzbGV4aWFcIjogXCJEeXNsZXhpYVwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJzbWFsbFZvY2FidWxhcnlcIjogXCJTbWFsbCB2b2NhYnVsYXJ5XCIgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiQ29uY2VudHJhdGlvblwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJNZW1vcnlcIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9XHJcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgbG9hZGVkU2ltdWxhdGlvbnMgPSBbXTtcblxuZnVuY3Rpb24gbG9hZChuYW1lLCBzdWJOYW1lLCBjYWxsYmFjaykge1xuICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdLFxuICAgICAgICBzY3JpcHRGaWxlID0gc3ViTmFtZSA/ICdzaW11bGF0aW9ucy8nICsgbmFtZSArICcvJyArIHN1Yk5hbWUgKyAnL2NvbnRlbnQuanMnIDogJ3NpbXVsYXRpb25zLycgKyBuYW1lICsgJy9jb250ZW50LmpzJztcblxuICAgIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoYWN0aXZlVGFiLmlkLCB7IGZpbGU6IHNjcmlwdEZpbGUgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgbG9hZGVkU2ltdWxhdGlvbnMucHVzaChuYW1lKTtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhuYW1lLCBzdWJOYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KG5hbWUsIHN1Yk5hbWUpIHtcbiAgaWYgKGxvYWRlZFNpbXVsYXRpb25zLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RhcnRTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSwgc3ViU2ltdWxhdGlvbjogc3ViTmFtZSB9KTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBsb2FkKG5hbWUsIHN1Yk5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdGFydFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lLCBzdWJTaW11bGF0aW9uOiBzdWJOYW1lIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RvcChuYW1lLCBzdWJOYW1lKSB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RvcFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lLCBzdWJTaW11bGF0aW9uOiBzdWJOYW1lIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0cy5zdGFydCA9IHN0YXJ0O1xuZXhwb3J0cy5zdG9wID0gc3RvcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpbXVsYXRpb25Mb2FkZXIuanMubWFwXG4iXX0=
