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
    chrome.storage.local.remove('activeTab');
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
          chrome.tabs.create({ url: '' + obj.moreInfo[i].moreInfoUrl, active: false }, function (tab) {
            chrome.tabs.update(tab.id, { active: true });
          });
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

  //panel collapse

  $('#myCollapsible').on('shown.bs.collapse', function () {
    // do something…
  });

  //panel collapse, show arrows: 
  $('.collapse').on('shown.bs.collapse', function () {
    $(this).parent().find(".down-arrow").css('transform', 'rotate(-180deg)');
  }).on('hidden.bs.collapse', function () {
    $(this).parent().find(".down-arrow").css('transform', 'rotate(-360deg)');
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
              "moreInfoUrl":"https://www.w3.org/TR/WCAG20/#minimize-error",
              "moreInfoLinkText":"WCAG 3.3 Input Assistance: Help users avoid and correct mistakes. (W3C)" 
            },
            {
              "moreInfoUrl":"https://www.w3.org/WAI/WCAG20/quickref/#qr-navigation-mechanisms-refs",
              "moreInfoLinkText":"2.4.4 Link Purpose (In Context)" 
            },
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
              "moreInfoUrl":"https://www.w3.org/TR/UNDERSTANDING-WCAG20/keyboard-operation.html",
              "moreInfoLinkText":"WCAG 2.1 Keyboard Accessible: Make all functionality available from a keyboard. (W3C)" 
            },
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
              "moreInfoUrl":"https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-without-color",
              "moreInfoLinkText":"WCAG 1.4.1 Use of Color (W3C)" 
            },
            {
              "moreInfoUrl":"https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast",
              "moreInfoLinkText":"WCAG1.4.3 Contrast (Minimum) (W3C)" 
            },
            {
              "moreInfoUrl":"https://www.usability.gov/get-involved/blog/2010/02/color-blindness.html",
              "moreInfoLinkText":"Color Blindness & Web Design (Usability.gov)" 
            },
            {
              "moreInfoUrl":"https://accessibility.blog.gov.uk/2016/06/17/colour-contrast-why-does-it-matter/",
              "moreInfoLinkText":"Colour contrast - why does it matter? (gov.uk)" 
            },
            {
              "moreInfoUrl":"https://developer.paciellogroup.com/resources/contrastanalyser/",
              "moreInfoLinkText":"Colour Contrast Analyser" 
            },
            {
              "moreInfoUrl":"http://www.inclusivedesigntoolkit.com/UCvision/vision.html#colour",
              "moreInfoLinkText":"Ensure sufficient contrast" 
            },
           {
              "moreInfoUrl":"http://www.color-blindness.com/rgb-anomaloscope-color-blindness-test/",
              "moreInfoLinkText":"Color blindness test" 
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
              "moreInfoUrl":"https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-without-color",
              "moreInfoLinkText":"WCAG 1.4.1 Use of Color (W3C)" 
            },
            {
              "moreInfoUrl":"https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast",
              "moreInfoLinkText":"WCAG1.4.3 Contrast (Minimum) (W3C)" 
            },
            {
              "moreInfoUrl":"https://www.usability.gov/get-involved/blog/2010/02/color-blindness.html",
              "moreInfoLinkText":"Color Blindness & Web Design (Usability.gov)" 
            },
            {
              "moreInfoUrl":"https://accessibility.blog.gov.uk/2016/06/17/colour-contrast-why-does-it-matter/",
              "moreInfoLinkText":"Colour contrast - why does it matter? (gov.uk)" 
            },
            {
              "moreInfoUrl":"https://developer.paciellogroup.com/resources/contrastanalyser/",
              "moreInfoLinkText":"Colour Contrast Analyser" 
            },
            {
              "moreInfoUrl":"http://www.inclusivedesigntoolkit.com/UCvision/vision.html#colour",
              "moreInfoLinkText":"Ensure sufficient contrast" 
            },
            {
              "moreInfoUrl":"http://www.color-blindness.com/rgb-anomaloscope-color-blindness-test/",
              "moreInfoLinkText":"Color blindness test" 
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
              "moreInfoUrl":"https://www.w3.org/WAI/WCAG20/quickref/?showtechniques=144#qr-visual-audio-contrast-scale",
              "moreInfoLinkText":"WCAG 1.4.4 Resize text (W3C)" 
            },
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
              "moreInfoUrl":"https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-without-color",
              "moreInfoLinkText":"WCAG 1.4.1 Use of Color (W3C)" 
            },
            {
              "moreInfoUrl":"https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast",
              "moreInfoLinkText":"WCAG1.4.3 Contrast (Minimum) (W3C)" 
            },
            {
              "moreInfoUrl":"https://www.usability.gov/get-involved/blog/2010/02/color-blindness.html",
              "moreInfoLinkText":"Color Blindness & Web Design (Usability.gov)" 
            },
            {
              "moreInfoUrl":"https://accessibility.blog.gov.uk/2016/06/17/colour-contrast-why-does-it-matter/",
              "moreInfoLinkText":"Colour contrast - why does it matter? (gov.uk)" 
            },
            {
              "moreInfoUrl":"https://developer.paciellogroup.com/resources/contrastanalyser/",
              "moreInfoLinkText":"Colour Contrast Analyser" 
            },
            {
              "moreInfoUrl":"http://www.inclusivedesigntoolkit.com/UCvision/vision.html#colour",
              "moreInfoLinkText":"Ensure sufficient contrast" 
            },
           {
              "moreInfoUrl":"http://www.color-blindness.com/rgb-anomaloscope-color-blindness-test/",
              "moreInfoLinkText":"Color blindness test" 
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
        "fact": "A lot of people has to use their computers outside in bright sunshine. It can make it harder to see what’s on the screen.",
        "listItems": [
          "Provide enough contrast between text and its background. Use a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.",
          "Check the Contrast with <em>Colour Contrast Analyser</em> or <em>Contrast ratio</em> (see links below)."
        ],
        "moreInfo": 
          [
            {
              "moreInfoUrl":"https://developer.paciellogroup.com/resources/contrastanalyser/",
              "moreInfoLinkText":"Colour Contrast Analyser" 
            },
            {
              "moreInfoUrl":"http://leaverou.github.io/contrast-ratio/",
              "moreInfoLinkText":"Contrast ratio" 
            },
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
        ],
        "moreInfo": 
          [
            {
              "moreInfoUrl":"https://www.w3.org/TR/WCAG20/#minimize-error",
              "moreInfoLinkText":"WCAG 3.3 Input Assistance: Help users avoid and correct mistakes. (W3C)" 
            },
            {
              "moreInfoUrl":"https://www.w3.org/WAI/WCAG20/quickref/#qr-navigation-mechanisms-refs",
              "moreInfoLinkText":"2.4.4 Link Purpose (In Context)" 
            }
          ]
      }
    },
    "UI": {
      "selectSimulation": "Select simulation:",
      "reset": "Reset",
      "advice": "Think about this",
      "moreInfo": "Links for better understanding",
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

      chrome.storage.local.set({ 'activeTab': activeTab.id });
    });
  } else {
    load(name, subName, function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];

        chrome.tabs.sendMessage(activeTab.id, { action: 'startSimulation', simulation: name, subSimulation: subName });

        chrome.storage.local.set({ 'activeTab': activeTab.id });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC9VSS9hcHAuanMiLCJidWlsZC9qcy9iYWJlbC9VSS9kYXRhL2RhdGEuanNvbiIsImJ1aWxkL2pzL2JhYmVsL3V0aWxzL3NpbXVsYXRpb25Mb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxJQUFJLFFBQVEsUUFBUSxrQkFBUixDQUFaOztBQUVBLElBQUksZUFBZSx3QkFBd0IsS0FBeEIsQ0FBbkI7O0FBRUEsSUFBSSxvQkFBb0IsUUFBUSw4QkFBUixDQUF4Qjs7QUFFQSxJQUFJLG1CQUFtQix3QkFBd0IsaUJBQXhCLENBQXZCOztBQUVBLFNBQVMsdUJBQVQsQ0FBaUMsR0FBakMsRUFBc0M7QUFBRSxNQUFJLE9BQU8sSUFBSSxVQUFmLEVBQTJCO0FBQUUsV0FBTyxHQUFQO0FBQWEsR0FBMUMsTUFBZ0Q7QUFBRSxRQUFJLFNBQVMsRUFBYixDQUFpQixJQUFJLE9BQU8sSUFBWCxFQUFpQjtBQUFFLFdBQUssSUFBSSxHQUFULElBQWdCLEdBQWhCLEVBQXFCO0FBQUUsWUFBSSxPQUFPLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBcUMsR0FBckMsRUFBMEMsR0FBMUMsQ0FBSixFQUFvRCxPQUFPLEdBQVAsSUFBYyxJQUFJLEdBQUosQ0FBZDtBQUF5QjtBQUFFLEtBQUMsT0FBTyxPQUFQLEdBQWlCLEdBQWpCLENBQXNCLE9BQU8sTUFBUDtBQUFnQjtBQUFFOztBQUU3USxJQUFJLE9BQU8sSUFBWDs7QUFFQSxTQUFTLGVBQVQsR0FBMkI7O0FBRXpCLFNBQU8sT0FBUCxDQUFlLEtBQWYsQ0FBcUIsR0FBckIsQ0FBeUIsa0JBQXpCLEVBQTZDLFVBQVUsR0FBVixFQUFlO0FBQzFELHFCQUFpQixLQUFqQixDQUF1QixJQUFJLGdCQUEzQjtBQUNELEdBRkQ7QUFHRDs7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsaUJBOztBQUVBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQyxTQUFPO0FBRG9DLENBQTdDO0FBR0EsSUFBSSxvQkFBb0IsRUFBeEI7O0FBRUEsU0FBUyxJQUFULENBQWMsSUFBZCxFQUFvQixPQUFwQixFQUE2QixRQUE3QixFQUF1QztBQUNyQyxTQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEVBQUUsUUFBUSxJQUFWLEVBQWdCLGVBQWUsSUFBL0IsRUFBbEIsRUFBeUQsVUFBVSxJQUFWLEVBQWdCO0FBQ3ZFLFFBQUksWUFBWSxLQUFLLENBQUwsQ0FBaEI7QUFBQSxRQUNJLGFBQWEsVUFBVSxpQkFBaUIsSUFBakIsR0FBd0IsR0FBeEIsR0FBOEIsT0FBOUIsR0FBd0MsYUFBbEQsR0FBa0UsaUJBQWlCLElBQWpCLEdBQXdCLGFBRDNHOztBQUdBLFdBQU8sSUFBUCxDQUFZLGFBQVosQ0FBMEIsVUFBVSxFQUFwQyxFQUF3QyxFQUFFLE1BQU0sVUFBUixFQUF4QyxFQUE4RCxZQUFZO0FBQ3hFLHdCQUFrQixJQUFsQixDQUF1QixJQUF2QjtBQUNBLFVBQUksUUFBSixFQUFjO0FBQ1osaUJBQVMsSUFBVCxFQUFlLE9BQWY7QUFDRDtBQUNGLEtBTEQ7QUFNRCxHQVZEO0FBV0Q7O0FBRUQsU0FBUyxLQUFULENBQWUsSUFBZixFQUFxQixPQUFyQixFQUE4QjtBQUM1QixNQUFJLGtCQUFrQixRQUFsQixDQUEyQixJQUEzQixDQUFKLEVBQXNDO0FBQ3BDLFdBQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsRUFBRSxRQUFRLElBQVYsRUFBZ0IsZUFBZSxJQUEvQixFQUFsQixFQUF5RCxVQUFVLElBQVYsRUFBZ0I7QUFDdkUsVUFBSSxZQUFZLEtBQUssQ0FBTCxDQUFoQjs7QUFFQSxhQUFPLElBQVAsQ0FBWSxXQUFaLENBQXdCLFVBQVUsRUFBbEMsRUFBc0MsRUFBRSxRQUFRLGlCQUFWLEVBQTZCLFlBQVksSUFBekMsRUFBK0MsZUFBZSxPQUE5RCxFQUF0Qzs7QUFFQSxhQUFPLE9BQVAsQ0FBZSxLQUFmLENBQXFCLEdBQXJCLENBQXlCLEVBQUUsYUFBYSxVQUFVLEVBQXpCLEVBQXpCO0FBQ0QsS0FORDtBQU9ELEdBUkQsTUFRTztBQUNMLFNBQUssSUFBTCxFQUFXLE9BQVgsRUFBb0IsWUFBWTtBQUM5QixhQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEVBQUUsUUFBUSxJQUFWLEVBQWdCLGVBQWUsSUFBL0IsRUFBbEIsRUFBeUQsVUFBVSxJQUFWLEVBQWdCO0FBQ3ZFLFlBQUksWUFBWSxLQUFLLENBQUwsQ0FBaEI7O0FBRUEsZUFBTyxJQUFQLENBQVksV0FBWixDQUF3QixVQUFVLEVBQWxDLEVBQXNDLEVBQUUsUUFBUSxpQkFBVixFQUE2QixZQUFZLElBQXpDLEVBQStDLGVBQWUsT0FBOUQsRUFBdEM7O0FBRUEsZUFBTyxPQUFQLENBQWUsS0FBZixDQUFxQixHQUFyQixDQUF5QixFQUFFLGFBQWEsVUFBVSxFQUF6QixFQUF6QjtBQUNELE9BTkQ7QUFPRCxLQVJEO0FBU0Q7QUFDRjs7QUFFRCxTQUFTLElBQVQsQ0FBYyxJQUFkLEVBQW9CLE9BQXBCLEVBQTZCO0FBQzNCLFNBQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsRUFBRSxRQUFRLElBQVYsRUFBZ0IsZUFBZSxJQUEvQixFQUFsQixFQUF5RCxVQUFVLElBQVYsRUFBZ0I7QUFDdkUsUUFBSSxZQUFZLEtBQUssQ0FBTCxDQUFoQjs7QUFFQSxXQUFPLElBQVAsQ0FBWSxXQUFaLENBQXdCLFVBQVUsRUFBbEMsRUFBc0MsRUFBRSxRQUFRLGdCQUFWLEVBQTRCLFlBQVksSUFBeEMsRUFBOEMsZUFBZSxPQUE3RCxFQUF0QztBQUNELEdBSkQ7QUFLRDs7QUFFRCxRQUFRLEtBQVIsR0FBZ0IsS0FBaEI7QUFDQSxRQUFRLElBQVIsR0FBZSxJQUFmO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9kYXRhID0gcmVxdWlyZSgnLi9kYXRhL2RhdGEuanNvbicpO1xuXG52YXIgbGFuZ3VhZ2VEYXRhID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2RhdGEpO1xuXG52YXIgX3NpbXVsYXRpb25Mb2FkZXIgPSByZXF1aXJlKCcuLi91dGlscy9zaW11bGF0aW9uTG9hZGVyLmpzJyk7XG5cbnZhciBzaW11bGF0aW9uTG9hZGVyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3NpbXVsYXRpb25Mb2FkZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG52YXIgbGFuZyA9IFwiZW5cIjtcblxuZnVuY3Rpb24gc3RhcnRTaW11bGF0aW9uKCkge1xuXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlU2ltdWxhdGlvbicsIGZ1bmN0aW9uIChvYmopIHtcbiAgICBzaW11bGF0aW9uTG9hZGVyLnN0YXJ0KG9iai5hY3RpdmVTaW11bGF0aW9uKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0U2ltdWxhdGlvbih0b29sdGlwKSB7XG5cbiAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7XG4gICAgcGF0aDogXCJpbWcvaWNvbi5wbmdcIlxuICB9KTtcblxuICB0b29sdGlwLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICQoXCIjcGFuZWwxXCIpLmFkZENsYXNzKFwiaW5cIik7XG4gICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgdG9vbHRpcC5hZGRDbGFzcyhcImhpZGVcIik7XG4gIH0sIDI1MCk7XG5cbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuICAgIHNpbXVsYXRpb25Mb2FkZXIuc3RvcChvYmouYWN0aXZlU2ltdWxhdGlvbik7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKCdhY3RpdmVTaW11bGF0aW9uJyk7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKCdhY3RpdmVUYWInKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldFRleHRzKCkge1xuXG4gIHZhciBkYXRhID0gbGFuZ3VhZ2VEYXRhW2xhbmddO1xuXG4gICQoXCIubW9yZS1pbmZvLWxpbmtcIikudGV4dChkYXRhLlVJLm1vcmVJbmZvKTtcbiAgJChcIiNyZXNldC1idG5cIikudGV4dChkYXRhLlVJLnJlc2V0KTtcbiAgJChcIi5uYXZiYXItaGVhZGVyXCIpLnRleHQoZGF0YS5VSS5zZWxlY3RTaW11bGF0aW9uKTtcbiAgJChcIiNhZHZpY2UtZHJvcGRvd25cIikudGV4dChkYXRhLlVJLmFkdmljZSk7XG4gICQoXCIjaW5mby1kcm9wZG93blwiKS50ZXh0KGRhdGEuVUkubW9yZUluZm8pO1xuICAkKFwiI3NpZ2h0XCIpLnRleHQoZGF0YS5VSS5zaWdodCk7XG4gICQoXCIjbW9iaWxpdHlcIikudGV4dChkYXRhLlVJLm1vYmlsaXR5KTtcbiAgJChcIiNyZWFkV3JpdGVcIikudGV4dChkYXRhLlVJLnJlYWRBbmRXcml0ZSk7XG4gICQoXCIjY29uY2VudHJhdGlvblwiKS50ZXh0KGRhdGEuVUkuY29uY2VudHJhdGlvbik7XG5cbiAgJC5lYWNoKGRhdGEuVUkuc2ltdWxhdGlvbnMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuXG4gICAgJCgnIycgKyB2YWx1ZS5oZWFkaW5nKS50ZXh0KHZhbHVlLmhlYWRpbmcpO1xuXG4gICAgJC5lYWNoKHZhbHVlLmNob2ljZXMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuICAgICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgICAgICQoJyMnICsga2V5KS50ZXh0KHZhbHVlW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICAkKCcjc2V0dGluZ3MtaGVhZGluZycpLnRleHQoZGF0YS5VSS5jaGFuZ2VTZXR0aW5ncyk7XG4gICQoJyNsYW5ndWFnZS1sYWJlbCcpLnRleHQoZGF0YS5VSS5zZWxlY3RMYW5ndWFnZSk7XG4gICQoJyNidG4tc2F2ZS1zZXR0aW5ncycpLnRleHQoZGF0YS5VSS5zYXZlU2V0dGluZ3MpO1xuICAkKCcjYnRuLWNhbmNlbC1zZXR0aW5ncycpLnRleHQoZGF0YS5VSS5jYW5jZWwpO1xufVxuXG5mdW5jdGlvbiByZWFkTW9yZUxpbmtzKCkge1xuXG4gIHZhciByZWFkTW9yZUxpbmsgPSAkKCcubW9yZS1pbmZvLWxpbmtzJykuZmluZCgnbGknKTtcblxuICByZWFkTW9yZUxpbmsuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICB2YXIgY3VycmVudExpbmsgPSBldmVudC50YXJnZXQuaW5uZXJUZXh0O1xuXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdtb3JlSW5mbycsIGZ1bmN0aW9uIChvYmopIHtcblxuICAgICAgJC5lYWNoKG9iai5tb3JlSW5mbywgZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRMaW5rID09IG9iai5tb3JlSW5mb1tpXS5tb3JlSW5mb0xpbmtUZXh0KSB7XG4gICAgICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiAnJyArIG9iai5tb3JlSW5mb1tpXS5tb3JlSW5mb1VybCwgYWN0aXZlOiBmYWxzZSB9LCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgICAgICBjaHJvbWUudGFicy51cGRhdGUodGFiLmlkLCB7IGFjdGl2ZTogdHJ1ZSB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRUb29sdGlwVGV4dHMoYWN0aXZlU2ltdWxhdGlvbikge1xuXG4gIHZhciBkYXRhID0gbGFuZ3VhZ2VEYXRhW2xhbmddO1xuXG4gIHZhciBzaW11bGF0aW9uU3RhdHVzID0gJChcIi5zaW11bGF0aW9uLXN0YXJ0ZWQtcGFyYWdyYXBoXCIpO1xuICB2YXIgc2ltdWxhdGlvblN0YXR1c0FsZXJ0ID0gJChcIi5zaW11bGF0aW9uLXN0YXJ0ZWQtYWxlcnRcIik7XG4gIHZhciBpbmZvSGVhZGluZyA9ICQoXCIuZGlzYWJpbGl0eS1pbmZvLWhlYWRpbmdcIik7XG4gIHZhciBpbmZvUGFyYWdyYXBoID0gJChcIi5kaXNhYmlsaXR5LWluZm8tcGFyYWdyYXBoXCIpO1xuICB2YXIgYWR2aWNlTGlzdCA9ICQoXCIuYWR2aWNlLWxpc3RcIik7XG4gIHZhciBtb3JlSW5mb0xpbmtzID0gJChcIi5tb3JlLWluZm8tbGlua3NcIik7XG4gIHZhciBtb3JlSW5mb1BhbmVsID0gJCgnI21vcmUtaW5mby1wYW5lbCcpO1xuICB2YXIgdGV4dHMgPSBkYXRhLmZhY3RzW2FjdGl2ZVNpbXVsYXRpb25dO1xuXG4gIHNpbXVsYXRpb25TdGF0dXMuZW1wdHkoKTtcbiAgaW5mb0hlYWRpbmcuZW1wdHkoKTtcbiAgaW5mb1BhcmFncmFwaC5lbXB0eSgpO1xuICBhZHZpY2VMaXN0LmVtcHR5KCk7XG4gIG1vcmVJbmZvTGlua3MuZW1wdHkoKTtcblxuICBzaW11bGF0aW9uU3RhdHVzLnRleHQodGV4dHMuc2ltdWxhdGlvblN0YXR1cyk7XG4gIHNpbXVsYXRpb25TdGF0dXNBbGVydC5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG5cbiAgaW5mb0hlYWRpbmcudGV4dCh0ZXh0cy5oZWFkaW5nKTtcbiAgaW5mb1BhcmFncmFwaC50ZXh0KHRleHRzLmZhY3QpO1xuXG4gICQuZWFjaCh0ZXh0cy5saXN0SXRlbXMsIGZ1bmN0aW9uIChpLCB2YWx1ZSkge1xuICAgIGFkdmljZUxpc3QuYXBwZW5kKCc8bGk+JyArIHZhbHVlICsgJzwvbGk+Jyk7XG4gIH0pO1xuXG4gIGlmICh0ZXh0cy5tb3JlSW5mbyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbW9yZUluZm9QYW5lbC5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcblxuICAgICQuZWFjaCh0ZXh0cy5tb3JlSW5mbywgZnVuY3Rpb24gKGkpIHtcbiAgICAgIG1vcmVJbmZvTGlua3MuYXBwZW5kKCc8bGk+PGE+JyArIHRleHRzLm1vcmVJbmZvW2ldLm1vcmVJbmZvTGlua1RleHQgKyAnPC9hPjwvbGk+Jyk7XG4gICAgfSk7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgJ21vcmVJbmZvJzogdGV4dHMubW9yZUluZm8gfSk7XG4gIH0gZWxzZSB7XG4gICAgbW9yZUluZm9QYW5lbC5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgfVxufVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIHRvb2x0aXAgPSAkKFwiLnRvb2wtdGlwXCIpO1xuXG4gIHZhciBhY3RpdmVTaW11bGF0aW9uID0gdm9pZCAwO1xuXG4gIGxhbmcgPSAnZW4nO1xuXG4gIHNldFRleHRzKCk7XG5cbiAgLy8gU2V0IGFjdGl2ZSBzdGF0ZVxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2FjdGl2ZVNpbXVsYXRpb24nLCBmdW5jdGlvbiAob2JqKSB7XG5cbiAgICBhY3RpdmVTaW11bGF0aW9uID0gb2JqLmFjdGl2ZVNpbXVsYXRpb247XG5cbiAgICBpZiAoYWN0aXZlU2ltdWxhdGlvbikge1xuICAgICAgdG9vbHRpcC5hZGRDbGFzcyhcImluXCIpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcbiAgICAgICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImluXCIpO1xuICAgICAgc2V0VG9vbHRpcFRleHRzKGFjdGl2ZVNpbXVsYXRpb24pO1xuICAgICAgcmVhZE1vcmVMaW5rcygpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gTWFpbiB2aWV3XG4gICQoXCIubWVudS1idG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIG1lbnVCdG4gPSAkKHRoaXMpO1xuICAgIHZhciBtZW51QnRuSWQgPSBtZW51QnRuWzBdLmlkO1xuXG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7XG4gICAgICBwYXRoOiBcImltZy9pY29uX2FjdGl2ZS5wbmdcIlxuICAgIH0pO1xuXG4gICAgYWN0aXZlU2ltdWxhdGlvbiA9IG1lbnVCdG5JZDtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyAnYWN0aXZlU2ltdWxhdGlvbic6IG1lbnVCdG5JZCB9KTtcblxuICAgIHNldFRvb2x0aXBUZXh0cyhhY3RpdmVTaW11bGF0aW9uKTtcblxuICAgICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImluXCIpO1xuICAgICQoJyNwYW5lbDEnKS5hZGRDbGFzcyhcImhpZGVcIik7XG4gICAgJCgnI3BhbmVsMicpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcbiAgICB0b29sdGlwLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMicpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgfSwgMTAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgc3RhcnRTaW11bGF0aW9uKCk7XG4gICAgfSwgNTAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMicpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgICB0b29sdGlwLmFkZENsYXNzKFwiaW5cIik7XG4gICAgfSwgMTAwMCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNwYW5lbDInKS5hZGRDbGFzcyhcImhpZGVcIik7XG4gICAgfSwgMTUwMCk7XG5cbiAgICByZWFkTW9yZUxpbmtzKCk7XG4gIH0pO1xuXG4gICQoXCIuZ2l0aHViLWxpbmtcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9NZXRhbWF0cml4L1dlYi1EaXNhYmlsaXR5LVNpbXVsYXRvcicgfSk7XG4gIH0pO1xuXG4gICQoJy5zZXR0aW5ncy1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2xhbmcnLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAkKCcjbGFuZ3VhZ2UnKS52YWwob2JqLmxhbmcpO1xuICAgIH0pO1xuXG4gICAgJCgnI3BhbmVsMScpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgJCgnI3NldHRpbmdzJykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjc2V0dGluZ3MnKS5hZGRDbGFzcyhcImluXCIpO1xuICAgIH0sIDI1MCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNwYW5lbDEnKS5hZGRDbGFzcyhcImhpZGVcIik7XG4gICAgfSwgNTAwKTtcbiAgfSk7XG5cbiAgLy8gU2V0dGluZ3Mgdmlld1xuXG4gIC8qICQoJyNidG4tc2F2ZS1zZXR0aW5ncycpLm9uKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIFxuICAgICB2YXIgc2VsZWN0ZWRMYW5nID0gJCgnI2xhbmd1YWdlJykudmFsKCk7XHJcbiAgXG4gICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7J2xhbmcnOiBzZWxlY3RlZExhbmd9KTtcclxuICBcbiAgICAgbGFuZyA9IHNlbGVjdGVkTGFuZztcclxuICBcbiAgICAgc2V0VGV4dHMoKTtcclxuICBcbiAgICAgJCgnI3NldHRpbmdzJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcclxuICAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xyXG4gIFxuICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICQoJyNwYW5lbDEnKS5hZGRDbGFzcyhcImluXCIpO1xyXG4gICAgIH0sIDUwMCk7XHJcbiAgXG4gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgJCgnI3NldHRpbmdzJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgIH0sIDc1MCk7XHJcbiAgXG4gICB9KTtcclxuICBcbiAgICQoJyNidG4tY2FuY2VsLXNldHRpbmdzJykub24oJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgXG4gICAgICQoJyNzZXR0aW5ncycpLnJlbW92ZUNsYXNzKFwiaW5cIik7XHJcbiAgICAgJCgnI3BhbmVsMScpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcclxuICBcbiAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAkKCcjcGFuZWwxJykuYWRkQ2xhc3MoXCJpblwiKTtcclxuICAgICB9LCAyNTApO1xyXG4gIFxuICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICQoJyNzZXR0aW5ncycpLmFkZENsYXNzKFwiaGlkZVwiKTtcclxuICAgICB9LCA1MDApO1xyXG4gIFxuICAgfSk7Ki9cblxuICAvLyBUb29sdGlwIHZpZXdcblxuICAkKFwiLnNpbXVsYXRpb24tc3RhcnRlZC1hbGVydCAuY2xvc2VcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICQoXCIuc2ltdWxhdGlvbi1zdGFydGVkLWFsZXJ0XCIpLmFkZENsYXNzKFwiaGlkZVwiKTtcbiAgfSk7XG5cbiAgJChcIiNyZXNldC1idG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgIHJlc2V0U2ltdWxhdGlvbih0b29sdGlwKTtcbiAgfSk7XG5cbiAgLy9wYW5lbCBjb2xsYXBzZVxuXG4gICQoJyNteUNvbGxhcHNpYmxlJykub24oJ3Nob3duLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xuICAgIC8vIGRvIHNvbWV0aGluZ+KAplxuICB9KTtcblxuICAvL3BhbmVsIGNvbGxhcHNlLCBzaG93IGFycm93czogXG4gICQoJy5jb2xsYXBzZScpLm9uKCdzaG93bi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCIuZG93bi1hcnJvd1wiKS5jc3MoJ3RyYW5zZm9ybScsICdyb3RhdGUoLTE4MGRlZyknKTtcbiAgfSkub24oJ2hpZGRlbi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCIuZG93bi1hcnJvd1wiKS5jc3MoJ3RyYW5zZm9ybScsICdyb3RhdGUoLTM2MGRlZyknKTtcbiAgfSk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC5qcy5tYXBcbiIsIm1vZHVsZS5leHBvcnRzPXtcclxuICBcInN2XCI6XHJcbiAge1xyXG4gICAgXCJmYWN0c1wiOiB7XHJcbiAgICAgIFwiZHlzbGV4aWFcIjogXHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkR5c2xleGlcIixcclxuICAgICAgICBcImZhY3RcIjogXCJEeXNsZXhpIMOkciBlbiBuZWRzw6R0dG5pbmcgc29tIGfDtnIgYXR0IGhqw6RybmFuIGhhciBzdsOlcnQgYXR0IGF1dG9tYXRpc2VyYSB0b2xrbmluZ2VuIGF2IG9yZC4gRGV0dGEgZ8O2ciBhdHQgcGVyc29uZXIgbWVkIGRlbm5hIG5lZHPDpHR0bmluZyBrYW4gaGEgc3bDpXJ0IGF0dCBsw6RzYSBvY2ggc2tyaXZhLiBEeXNsZXhpIMOkciBpbnRlIGtvcHBsYXQgdGlsbCBzeW4gZWxsZXIgaW50ZWxsaWdlbnMuIE9yc2FrZXJuYSB0aWxsIGR5c2xleGkgw6RyIGZvcnRmYXJhbmRlIG9rbGFydC5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIlVuZHZpayB0ZXh0IGkgbGl0ZW4gc3RvcmxlayBvY2ggbMOlbmdhIHRleHRlci4gU2UgdGlsbCBhdHQgaGEgb3JkZW50bGlndCBtZWQgcmFkYXZzdMOlbmQuXCIsIFx0XHJcbiAgICAgICAgICBcIlVuZHZpayBzdsOlcmEgb3JkIG9jaCBmYWNrdGVybWVyLlwiLFxyXG4gICAgICAgICAgXCJFcmJqdWQgbMOkdHRsw6RzdGEgdmVyc2lvbmVyIGF2IGZhY2t0ZXh0ZXIuXCIsXHJcbiAgICAgICAgICBcIlVuZHZpayB0eXBzbml0dCBtZWQga3LDpW5nbGlnYSBvY2gga29tcGxleGEgZmlndXJlci5cIlxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInBhcmtpbnNvbnNcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhIHLDtnIgbXVzcGVrYXJlbiBww6Ugd2ViYnBsYXRzZW4gb2NoIHNlIHZhZCBzb20gaMOkbmRlci5cIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJQYXJraW5zb25zXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiVmlkIFBhcmtpbnNvbnMgc2p1a2RvbSBmw7Zyc3TDtnJzIGNlbGxlcm5hIGkgaGrDpHJuYW4gc29tIHRpbGx2ZXJrYXIgZG9wYW1pbiB2aWxrZXQgZ8O2ciBhdHQgaGrDpHJuYW4gZsOlciBlbiBuZWRzYXR0IGbDtnJtw6VnYSBhdHQgc2tpY2thIHNpZ25hbGVyLiBQZXJzb25lciBtZWQgUGFya2luc29ucyBrYW4gZHJhYmJhcyBhdiBzeW1wdG9tIHNvbSBza2FrbmluZ2FyLCBzdGVsYSBtdXNrbGVyIG9jaCBzw6RtcmUgcsO2cmVsc2Vmw7ZybcOlZ2EuIE9yc2FrZXJuYSB0aWxsIFBhcmtpbnNvbnMgc2p1a2RvbSDDpHIgZm9ydGZhcmFuZGUgb2tsYXJ0LlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiU2UgdGlsbCBhdHQgd2ViYnBsYXRzZW4ga2FuIGFudsOkbmRhcyBtZWQgYW5kcmEgaGrDpGxwbWVkZWwgw6RuIG11cywgdGlsbCBleGVtcGVsIHRhbmdlbnRib3Jkc25hdmlnZXJpbmcuXCIsIFx0XHJcbiAgICAgICAgICBcIkhhIHRpbGxyw6Rja2xpZ3QgbWVkIGx1ZnQgbWVsbGFuIGtvbXBvbmVudGVyXCIsXHJcbiAgICAgICAgICBcIkhhIHRpbGxyw6Rja2xpZ3Qgc3RvcmEga2xpY2t5dG9yLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvVXJsc1wiOiBcImh0dHA6Ly93d3cucGFya2luc29uZm9yYnVuZGV0LnNlXCIsXHJcbiAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIlBhcmtpbnNvbnNmw7ZyYnVuZGV0XCJcclxuICAgICAgfSxcclxuICAgICAgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiR3VsLWJsw6UgZsOkcmdibGluZGhldFwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBkZWZla3QgZsOkcmdzZWVuZGUgaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0YXBwYXIgc29tIHRhciB1cHAgZsOkcmdlcm5hIHZpb2xldHQsIGdyw7ZuIG9jaCByw7ZkLiBOw6RyIGVuIGVsbGVyIGZsZXJhIGF2IHRhcHBhcm5hIHNha25hcyBlbGxlciDDpHIgZGVmZWt0YSBsZWRlciBkZXQgdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUuIEd1bC1ibMOlIGbDpHJnYmxpbmRoZXQgKFRyaXRhbm9waSkgw6RyIHPDpGxsc3ludC4gTmFtbmV0IMOkciBtaXNzbGVkYW5kZSBkw6UgZGV0IGludGUgw6RyIGbDpHJnZXJuYSBndWwgb2NoIGJsw6Ugc29tIGbDtnJ2w6R4bGFzLCB1dGFuIGJsw6UgbWVkIGdyw7ZuIG9jaCBndWwgbWVkIGxpbGEuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJBbnbDpG5kIGludGUgZsOkcmcgc29tIGRldCBlbmRhIHPDpHR0ZXQgYXR0IGbDtnJtZWRsYSBpbmZvcm1hdGlvbiwgaW5kaWtlcmEgZW4gaGFuZGxpbmcgZWxsZXIgaWRlbnRpZmllcmEgZXR0IGVsZW1lbnQuIE1hcmtlcmEgdGlsbCBleGVtcGVsIGludGUgZXR0IGZlbGFrdGlndCBmb3JtdWzDpHJmw6RsdCBlbmRhc3QgbWVkIGVuIHLDtmQgcmFtIHV0YW4ga29tcGxldHRlcmEgw6R2ZW4gbWVkIHRleHQgb2NoIGfDpHJuYSBlbiBpa29uLlwiLCBcdFxyXG4gICAgICAgICAgXCJFcmJqdWQgZ8Okcm5hIGV0dCBow7Zna29udHJhc3QtbMOkZ2UuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9VcmxzXCI6IFwiaHR0cHM6Ly9zdi53aWtpcGVkaWEub3JnL3dpa2kvRGVmZWt0X2YlQzMlQTRyZ3NlZW5kZVwiLFxyXG4gICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJXaWtpcGVkaWEgb20gZGVmZWt0IGbDpHJnc2VlbmRlXCJcclxuICAgICAgfSxcclxuICAgICAgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlLDtmQtZ3LDtm4gZsOkcmdibGluZGhldFwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBkZWZla3QgZsOkcmdzZWVuZGUgaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0YXBwYXIgc29tIHRhciB1cHAgZsOkcmdlcm5hIHZpb2xldHQsIGdyw7ZuIG9jaCByw7ZkLiBOw6RyIGVuIGVsbGVyIGZsZXJhIGF2IHRhcHBhcm5hIHNha25hcyBlbGxlciDDpHIgZGVmZWt0YSBsZWRlciBkZXQgdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUuIFLDtmQtZ3LDtm4gZsOkcmdibGluZGhldCAoUHJvdGFub3BpIG9jaCBEZXV0ZXJhbm9waSkgw6RyIGRlbiB2YW5saWdhc3RlIHR5cGVuIGF2IGbDpHJnYmxpbmRoZXQuIERlbiDDpHIgdmFubGlnYXJlIGhvcyBtw6RuIMOkbiBrdmlubm9yLiBQZXJzb25lciByw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXQgaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSBmw6RyZ2VybmEgcsO2ZCwgZ3LDtm4sIGJydW4gb2NoIG9yYW5nZS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBcclxuICAgICAgICBbXCJBbnbDpG5kIGludGUgZsOkcmcgc29tIGVuZGEgc8OkdHRldCBhdHQgZsO2cm1lZGxhIGluZm9ybWF0aW9uLCBpbmRpa2VyYSBlbiBoYW5kbGluZyBlbGxlciBpZGVudGlmaWVyYSBldHQgZWxlbWVudC4gTWFya2VyYSB0aWxsIGV4ZW1wZWwgaW50ZSBldHQgZmVsYWt0aWd0IGZvcm11bMOkcmbDpGx0IGVuZGFzdCBtZWQgcsO2ZCByYW0sIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IG9jaCBnw6RybmEgZW4gIGlrb24uXCIsIFwiRXJianVkIGfDpHJuYSBldHQgaMO2Z2tvbnRyYXN0LWzDpGdlLlwiXSxcclxuICAgICAgICBcIm1vcmVJbmZvVXJsc1wiOiBcImh0dHBzOi8vc3Yud2lraXBlZGlhLm9yZy93aWtpL0RlZmVrdF9mJUMzJUE0cmdzZWVuZGVcIixcclxuICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2lraXBlZGlhIG9tIGRlZmVrdCBmw6RyZ3NlZW5kZVwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmFyc2lnaHRlZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiTMOlbmdzeW50aGV0XCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVyc29uZXIgbWVkIEh5cGVyb3BpIHNlciBzdWRkaWd0IHDDpSBuw6RyYSBow6VsbCwgbWVuIGJyYSBww6UgbMOlbmd0IGjDpWxsLiBOZWRzw6R0dG5pbmdlbiB1cHBzdMOlciBww6UgZ3J1bmQgYXYgYXR0IGxqdXNldCBpbnRlIGJyeXRzIHLDpHR0IGkgw7ZnYXQuIERldCDDpHIgZW4gYXYgZGUgdmFubGlnYXN0ZSBzeW5uZWRzw6R0dG5pbmdhcm5hLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrLlwiLCBcdFxyXG4gICAgICAgICAgXCJXZWJic2lkYW4gc2thIGfDpSBhdHQgZsO2cnN0b3JhICh6b29tYXMpIHRpbGwgbWluc3QgMjAwICUgc8OlIGF0dCBiZXPDtmthcmVuIGthbiBhbnBhc3NhIGlubmVow6VsbGV0cyBzdG9ybGVrIGVmdGVyIHNpbmEgYmVob3YuXCIsXHJcbiAgICAgICAgICBcIkVyYmp1ZCB1cHBsw6RzbmluZyBhdiBpbm5laMOlbGxldC5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1VybHNcIjogXCJodHRwczovL3dlYmJyaWt0bGluamVyLnNlL3IvMzktZ2Utd2ViYnBsYXRzZW4tZW4tZ29kLWxhc2JhcmhldC9cIixcclxuICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2ViYnJpa3RsaW5qZSBHZSB3ZWJicGxhdHNlbiBnb2QgbMOkc2JhcmhldFwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwidG90YWxDb2xvckJsaW5kbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJIZWx0IGbDpHJnYmxpbmRcIixcclxuICAgICAgICBcImZhY3RcIjogXCJEZWZla3QgZsOkcmdzZWVuZGUgaW5uZWLDpHIgYXR0IGVuIHBlcnNvbiBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHR5cGVyIGF2IHRhcHBhciBzb20gdGFyIHVwcCBvbGlrYSBmw6RyZ2VyOiB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gT3JzYWtlbiB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZSDDpHIgYXR0IGVuIGVsbGVyIGZsZXJhIGF2IGRlc3NhIHR5cGVyIGF2IHRhcHBhciBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEuIEhlbHQgZsOkcmdibGluZCAoTW9ub2tyb21hc2kvYWtyb21hdG9wc2kpIMOkciBteWNrZXQgc8OkbGxzeW50LiBQZXJzb25lciBtZWQgZGVubmEgc3lubmVkc8OkdHRuaW5nIHNlciBpbmdhIGbDpHJnZXIgdXRhbiBzZXIgZW5kYXN0IGkgZ3LDpXNrYWxhLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBkZXQgZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGVsZW1lbnQuIE1hcmtlcmEgdC5leC4gaW50ZSBldHQgZmVsYWt0aWd0IGZvcm11bMOkcmbDpGx0IGVuZGFzdCBtZWQgcsO2ZCByYW0sIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IGVsbGVyIGlrb24uXCIsIFx0XHJcbiAgICAgICAgICBcIkRldCBrYW4gdmFyYSBlbiBicmEgaWTDqSBhdHQgZXJianVkYSBldHQgaMO2Z2tvbnRyYXN0LWzDpGdlLlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInR1bm5lbFZpc2lvblwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiEgcsO2ciBtdXNwZWthcmVuIHDDpSB3ZWJicGxhdHNlbiBvY2ggc2UgdmFkIHNvbSBow6RuZGVyLlwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlR1bm5lbHNlZW5kZVwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkRldCBzb20gaSBkYWdsaWd0IHRhbCBicnVrYXIga2FsbGFzIHR1bm5lbHNlZW5kZSDDpHIgZW4gc3lubmVkc8OkdHRuaW5nIHNvbSBnw7ZyIGF0dCBlbmRhc3QgZW4gZGVsIGF2IHN5bmbDpGx0ZXQga2FuIHNlcy4gRGV0dGEga2FuIGJlcm8gcMOlIGF0dCBwZXJzb25lbiBsaWRlciBhdiBlbiBzanVrZG9tIHNvbSBnw7ZyIGF0dCBjZWxsZXJuYSBpIMO2Z2F0IGbDtnJzdMO2cnMgbWVuIGRlbm5hIHR5cCBhdiBzeW5uZWRzw6R0dG5pbmcga2FuIG9ja3PDpSB0aWxsZsOkbGxpZ3QgdXBwc3TDpSBww6UgZ3J1bmQgYXYgc3RyZXNzIGVsbGVyIGRlcHJlc3Npb24uXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJVbmR2aWsgdGV4dCBpIGxpdGVuIHN0b3JsZWsuXCIsXHJcbiAgICAgICAgICBcIldlYmJzaWRhbiBza2EgZ8OlIGF0dCBmw7Zyc3RvcmEgKHpvb21hcykgdGlsbCBtaW5zdCAyMDAgJSBzw6UgYXR0IGJlc8O2a2FyZW4ga2FuIGFucGFzc2EgaW5uZWjDpWxsZXRzIHN0b3JsZWsgZWZ0ZXIgc2luYSBiZWhvdi5cIixcclxuICAgICAgICAgIFwiRXJianVkIHVwcGzDpHNuaW5nIGF2IGlubmVow6VsbGV0LlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInN1bnNoaW5lXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlNvbHNrZW5cIixcclxuICAgICAgICBcImZhY3RcIjogXCJMb3JlbSBpcHN1bVwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiTG9yZW0gaXBzdW0uXCIsXHJcbiAgICAgICAgICBcIkxvcmVtIGlwc3VtLlwiLFxyXG4gICAgICAgICAgXCJMb3JlbSBpcHN1bVwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImNvbmNlbnRyYXRpb25cIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiS29uY2VudHJhdGlvblwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkFsbGEga2FuIGhhIHN2w6VydCBhdHQga29uY2VudHJlcmEgc2lnIG1lbiBmw7ZyIHZpc3NhIGthbiBkZXQgYmxpIGV0dCBzdG9ydCBwcm9ibGVtIGkgdmFyZGFnc2xpdmV0LiBEZXNzYSBmdW5rdGlvbnNuZWRzw6R0dG5pbmdhciBrYW4gb3JzYWthIHN2w6VyaWdoZXRlciBtZWQgYXR0IGhhbnRlcmEgaW50cnljaywgc29ydGVyYSBpbmZvcm1hdGlvbiBvY2ggbGp1ZGvDpG5zbGlnaGV0LlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiR2Ugd2ViYnBsYXRzZW4gZW4gZW5rZWwgb2NoIGx1ZnRpZyBkZXNpZ24uXCIsXHJcbiAgICAgICAgICBcIlZhciBmw7Zyc2lrdGlnIG1lZCBhbmltYXRpb25lciBvY2ggc3RhcmthIGbDpHJnZXIuXCIsXHJcbiAgICAgICAgICBcIlVuZHZpayBhdHQgaGEgZsO2ciBteWNrZXQgaW5uZWjDpWxsIHDDpSBzYW1tYSBzaWRhLlwiLFxyXG4gICAgICAgICAgXCJFcmJqdWQgbGp1ZC0gb2NoIHZpZGVvLWFsZXJuYXRpdiB0aWxsIHRleHRpbm5laMOlbGwuXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwic21hbGxWb2NhYnVsYXJ5XCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkxpdGV0IG9yZGbDtnJyw6VkXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiRW4gc3RvciBkZWwgYXYgam9yZGVucyBiZWZvbGtuaW5nIGthbiBpbnRlIGzDpHNhIGFsbHMgb2NoIG3DpW5nYSB2dXhuYSBsw6RzZXIgaW50ZSBzw6UgYnJhIHNvbSBmw7ZydsOkbnRhcyBlZnRlciBncnVuZHNrb2xldXRiaWxkbmluZ2VuLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiVW5kdmlrIGtyw6VuZ2xpZ2Egb3JkIG9jaCBmYWNrdGVybWVyLlwiLCAgIFxyXG4gICAgICAgICAgXCJFcmJqdWQgbMOkdHRsw6RzdCB2ZXJzaW9uIGF2IGtyw6VuZ2xpZ2EgdGV4dGVyLlwiLFxyXG4gICAgICAgICAgXCJFcmJqdWQgdGV4dGVyIHDDpSBvbGlrYSBzcHLDpWsuXCJcclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlVJXCI6IHtcclxuICAgICAgXCJzZWxlY3RTaW11bGF0aW9uXCI6IFwiVsOkbGogc2ltdWxlcmluZzpcIixcclxuICAgICAgXCJyZXNldFwiOiBcIsOFdGVyc3TDpGxsXCIsXHJcbiAgICAgIFwiYWR2aWNlXCI6IFwiVMOkbmsgcMOlIGRldHRhXCIsXHJcbiAgICAgIFwibW9yZUluZm9cIjogXCJNZXIgaW5mb3JtYXRpb25cIixcclxuICAgICAgXCJzaWdodFwiOiBcIlN5blwiLFxyXG4gICAgICBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJIZWx0IGbDpHJnYmxpbmRcIixcclxuICAgICAgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjogXCJHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0XCIsICAgIFxyXG4gICAgICBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXRcIixcclxuICAgICAgXCJmYXJzaWdodGVkbmVzc1wiOiBcIkzDpW5nc3ludGhldCwgw7Z2ZXJzeW50aGV0XCIsXHJcbiAgICAgIFwidHVubmVsVmlzaW9uXCI6IFwiVHVubmVsc2VlbmRlXCIsXHJcbiAgICAgIFwibW9iaWxpdHlcIjogXCJNb3RvcmlrXCIsXHJcbiAgICAgIFwicGFya2luc29uc1wiOiBcIlBhcmtpbnNvbnNcIixcclxuICAgICAgXCJyZWFkQW5kV3JpdGVcIjogXCJMw6RzYSBvY2ggc2tyaXZhXCIsXHJcbiAgICAgIFwiZHlzbGV4aWFcIjogXCJEeXNsZXhpXCIsXHJcbiAgICAgIFwic21hbGxWb2NhYnVsYXJ5XCI6IFwiTGl0ZXQgb3JkZsO2cnLDpWRcIixcclxuICAgICAgXCJjb25jZW50cmF0aW9uXCI6IFwiS29uY2VudHJhdGlvblwiLFxyXG4gICAgICBcImNoYW5nZVNldHRpbmdzXCI6IFwiQ2hhbmdlIHNldHRpbmdzXCIsXHJcbiAgICAgIFwic2VsZWN0TGFuZ3VhZ2VcIjogXCJTZWxlY3QgbGFuZ3VhZ2VcIixcclxuICAgICAgXCJzYXZlU2V0dGluZ3NcIjogXCJTYXZlIHNldHRpbmdzXCIsXHJcbiAgICAgIFwiY2FuY2VsXCI6IFwiQ2FuY2VsXCIsXHJcbiAgICAgIFwic2ltdWxhdGlvbnNcIjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIlN5blwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtcclxuICAgICAgICAgICAgeyBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJIZWx0IGbDpHJnYmxpbmRcIiB9LFxyXG4gICAgICAgICAgICB7IFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6IFwiR3VsLWJsw6UgZsOkcmdibGluZGhldFwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6IFwiUsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0XCIgfSxcclxuICAgICAgICAgICAgeyBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiTMOlbmdzeW50aGV0LCDDtnZlcnN5bnRoZXRcIiB9LFxyXG4gICAgICAgICAgICB7IFwidHVubmVsVmlzaW9uXCI6IFwiVHVubmVsc2VlbmRlXCIgfSxcclxuICAgICAgICAgICAgeyBcInN1bnNoaW5lXCI6IFwiU29sc2tlblwiIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIk1vdG9yaWtcIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbIFxyXG4gICAgICAgICAgICB7IFwicGFya2luc29uc1wiOiBcIlBhcmtpbnNvbnNcIiB9XHJcbiAgICBcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiTMOkc2Egb2NoIHNrcml2YVwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtcclxuICAgICAgICAgICAgeyBcImR5c2xleGlhXCI6IFwiRHlzbGV4aVwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJzbWFsbFZvY2FidWxhcnlcIjogXCJMaXRldCBvcmRmw7ZycsOlZFwiIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIktvbmNlbnRyYXRpb25cIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiTWlubmVcIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9LFxyXG4gIFwiZW5cIjpcclxuICB7XHJcbiAgICBcImZhY3RzXCI6IHtcclxuICAgICAgXCJkeXNsZXhpYVwiOiBcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlIVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkR5c2xleGlhXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiRHlzbGV4aWEgaXMgYSBkaXNhYmlsaXR5IHRoYXQgbWFrZXMgaXQgZGlmZmljdWx0IGZvciB0aGUgYnJhaW4gdG8gYXV0b21hdGUgdGhlIGludGVycHJldGF0aW9uIG9mIHdvcmRzLiBUaGlzIG1ha2VzIGl0IGhhcmQgZm9yIHBlb3BsZSB3aXRoIHRoaXMgZGlzYWJpbGl0eSB0byByZWFkIGFuZCB3cml0ZS4gRHlzbGV4aWEgaXMgaGFzIG5vIGNvbm5lY3Rpb24gd2l0aCB2aXNpb24gb3IgaW50ZWxsaWdlbmNlLiBUaGUgY2F1c2VzIG9mIGR5c2xleGlhIGFyZSBzdGlsbCB1bmNsZWFyLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiQXZvaWQgdGV4dCBpbiBzbWFsbCBmb250IHNpemVzIGFuZCBsb25nIHRleHRzLiBVc2UgcHJvcGVyIHNwYWNpbmcgYW5kIGxpbmUgaGVpZ2h0LlwiLFxyXG4gICAgICAgICAgXCJBdm9pZCBkaWZmaWN1bHQgd29yZHMgYW5kIHRlcm1zLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciBlYXN5IHRvIHJlYWQgdGV4dHMsIGltYWdlcywgdmlkZW8gb3IgYXVkaW8gYWx0ZXJuYXRpdmVzLlwiLFxyXG4gICAgICAgICAgXCJBdm9pZCBmb250cyB3aXRoIGNvbXBsaWNhdGVkIGFuZCBjb21wbGV4IGNoYXJhY3RlcnMuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9cIjogXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy53My5vcmcvVFIvV0NBRzIwLyNtaW5pbWl6ZS1lcnJvclwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiV0NBRyAzLjMgSW5wdXQgQXNzaXN0YW5jZTogSGVscCB1c2VycyBhdm9pZCBhbmQgY29ycmVjdCBtaXN0YWtlcy4gKFczQylcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnczLm9yZy9XQUkvV0NBRzIwL3F1aWNrcmVmLyNxci1uYXZpZ2F0aW9uLW1lY2hhbmlzbXMtcmVmc1wiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiMi40LjQgTGluayBQdXJwb3NlIChJbiBDb250ZXh0KVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL2luY2x1c2l2ZWRlc2lnbnByaW5jaXBsZXMub3JnLyNwcmlvcml0aXNlLWNvbnRlbnRcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIlByaW9yaXRpc2UgY29udGVudFwiIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgICBcclxuICAgICAgfSxcclxuICAgICAgXCJwYXJraW5zb25zXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSEgbW92ZSB0aGUgbW91c2UgcG9pbnRlciBvbiB0aGUgd2ViIHBhZ2UgYW5kIHNlZSB3aGF0J3MgaGFwcGVuaW5nLlwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlBhcmtpbnNvbnNcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQYXJraW5zb24ncyBkaXNlYXNlIGRlc3Ryb3lzIHRoZSBjZWxscyBpbiB0aGUgYnJhaW4gdGhhdCBwcm9kdWNlIGRvcGFtaW5lLCB3aGljaCBjYXVzZXMgdGhlIGJyYWluIHRvIGhhdmUgYSByZWR1Y2VkIGFiaWxpdHkgdG8gc2VuZCBzaWduYWxzLiBQZXJzb25zIHdpdGggUGFya2luc29uJ3MgbWF5IHN1ZmZlciBmcm9tIHN5bXB0b21zIHN1Y2ggYXMgc2hha2luZywgc3RpZmYgbXVzY2xlcywgYW5kIHJlZHVjZWQgbW9iaWxpdHkuIFRoZSBjYXVzZXMgb2YgUGFya2luc29uJ3MgZGlzZWFzZSBhcmUgc3RpbGwgdW5jbGVhci5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIk1ha2Ugc3VyZSB0aGUgd2Vic2l0ZSBjYW4gYmUgdXNlZCB3aXRoIG90aGVyIHRvb2xzIG90aGVyIHRoYW4gYSBtb3VzZSwgc3VjaCBhcyBrZXlib2FyZCBuYXZpZ2F0aW9uLlwiLFxyXG4gICAgICAgICAgXCJIYXZlIGVub3VnaCBzcGFjZSBiZXR3ZWVuIGNvbXBvbmVudHMuXCIsXHJcbiAgICAgICAgICBcIk1ha2Ugc3VyZSBjbGljayBhcmVhcyBhcmUgYmlnIGVub3VnaC5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnczLm9yZy9UUi9VTkRFUlNUQU5ESU5HLVdDQUcyMC9rZXlib2FyZC1vcGVyYXRpb24uaHRtbFwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiV0NBRyAyLjEgS2V5Ym9hcmQgQWNjZXNzaWJsZTogTWFrZSBhbGwgZnVuY3Rpb25hbGl0eSBhdmFpbGFibGUgZnJvbSBhIGtleWJvYXJkLiAoVzNDKVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL2luY2x1c2l2ZWRlc2lnbnByaW5jaXBsZXMub3JnLyNvZmZlci1jaG9pY2VcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIk9mZmVyIGNob2ljZVwiIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJZZWxsb3ctYmx1ZSBjb2xvciBibGluZG5lc3NcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZW9wbGUgd2l0aCBsb3dlcmVkIGNvbG9yIHZpc2lvbiBoYXZlIGRpZmZpY3VsdHkgZGlzdGluZ3Vpc2hpbmcgc29tZSBvciBhbGwgY29sb3JzLiBZZWxsb3ctYmx1ZSBjb2xvciBibGluZG5lc3MgKFRyaXRhbm9waWEpIGlzIHJhcmUuIFRoZSBuYW1lIGNhbiBiZSBtaXNsZWFkaW5nLiBJdCdzIG5vdCB0aGUgY29sb3JzIHllbGxvdyBhbmQgYmx1ZSB0aGF0IGFyZSBjb25mdXNlZCBidXQgYmx1ZSB3aXRoIGdyZWVuIGFuZCB5ZWxsb3cgd2l0aCBwdXJwbGUuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJEbyBub3QgdXNlIGNvbG9yIGFzIHRoZSBvbmx5IHdheSB0byBjb252ZXkgaW5mb3JtYXRpb24sIGluZGljYXRlIGFuIGFjdGlvbiBvciBpZGVudGlmeSBhbiBlbGVtZW50LiBGb3IgZXhhbXBsZSwgZG8gbm90IG1hcmsgYW4gaW5jb3JyZWN0IGZvcm0gZmllbGQgd2l0aCBhIHJlZCBib3JkZXIgb25seSwgYWxzbyBzdXBwbGVtZW50IHdpdGggYSB0ZXh0IGFuZCBwcmVmZXJhYmx5IGFuIGljb24uXCIsXHJcbsKgwqDCoMKgwqDCoMKgwqDCoMKgXCJDb25zaWRlciBvZmZlcmluZyBhIGhpZ2ggY29udHJhc3QgbW9kZS5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnczLm9yZy9XQUkvV0NBRzIwL3F1aWNrcmVmLyNxci12aXN1YWwtYXVkaW8tY29udHJhc3Qtd2l0aG91dC1jb2xvclwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiV0NBRyAxLjQuMSBVc2Ugb2YgQ29sb3IgKFczQylcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnczLm9yZy9XQUkvV0NBRzIwL3F1aWNrcmVmLyNxci12aXN1YWwtYXVkaW8tY29udHJhc3QtY29udHJhc3RcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIldDQUcxLjQuMyBDb250cmFzdCAoTWluaW11bSkgKFczQylcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnVzYWJpbGl0eS5nb3YvZ2V0LWludm9sdmVkL2Jsb2cvMjAxMC8wMi9jb2xvci1ibGluZG5lc3MuaHRtbFwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29sb3IgQmxpbmRuZXNzICYgV2ViIERlc2lnbiAoVXNhYmlsaXR5LmdvdilcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vYWNjZXNzaWJpbGl0eS5ibG9nLmdvdi51ay8yMDE2LzA2LzE3L2NvbG91ci1jb250cmFzdC13aHktZG9lcy1pdC1tYXR0ZXIvXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb2xvdXIgY29udHJhc3QgLSB3aHkgZG9lcyBpdCBtYXR0ZXI/IChnb3YudWspXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL2RldmVsb3Blci5wYWNpZWxsb2dyb3VwLmNvbS9yZXNvdXJjZXMvY29udHJhc3RhbmFseXNlci9cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbG91ciBDb250cmFzdCBBbmFseXNlclwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL3d3dy5pbmNsdXNpdmVkZXNpZ250b29sa2l0LmNvbS9VQ3Zpc2lvbi92aXNpb24uaHRtbCNjb2xvdXJcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkVuc3VyZSBzdWZmaWNpZW50IGNvbnRyYXN0XCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuY29sb3ItYmxpbmRuZXNzLmNvbS9yZ2ItYW5vbWFsb3Njb3BlLWNvbG9yLWJsaW5kbmVzcy10ZXN0L1wiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29sb3IgYmxpbmRuZXNzIHRlc3RcIiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlIVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlJlZC1ncmVlbiBjb2xvciBibGluZG5lc3NcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZW9wbGUgd2l0aCBsb3dlcmVkIGNvbG9yIHZpc2lvbiBoYXZlIGRpZmZpY3VsdHkgZGlzdGluZ3Vpc2hpbmcgc29tZSBvciBhbGwgY29sb3JzLiBSZWQtZ3JlZW4gY29sb3IgYmxpbmRuZXNzIChQcm90YW5vcGlhIGFuZCBEZXV0ZXJhbm9waWEpIGlzIHRoZSBtb3N0IGNvbW1vbiB0eXBlIG9mIGNvbG9yIGJsaW5kbmVzcy4gSXQgaXMgbW9yZSBjb21tb24gYW1vbmcgbWVuIHRoYW4gd29tZW4uIFBlb3BsZSB3aXRoIHJlZC1ncmVlbiBjb2xvciBibGluZG5lc3MgaGF2ZSBkaWZmaWN1bHR5IGRpc3Rpbmd1aXNoaW5nIHRoZSBjb2xvcnMgcmVkLCBncmVlbiwgYnJvd24gYW5kIG9yYW5nZS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkRvIG5vdCB1c2UgY29sb3IgYXMgdGhlIG9ubHkgd2F5IHRvIGNvbnZleSBpbmZvcm1hdGlvbiwgaW5kaWNhdGUgYW4gYWN0aW9uIG9yIGlkZW50aWZ5IGFuIGVsZW1lbnQuIEZvciBleGFtcGxlLCBkbyBub3QgbWFyayBhbiBpbmNvcnJlY3QgZm9ybSBmaWVsZCB3aXRoIGEgcmVkIGJvcmRlciBvbmx5LCBhbHNvIHN1cHBsZW1lbnQgd2l0aCBhIHRleHQgYW5kIHByZWZlcmFibHkgYW4gaWNvbi5cIixcclxuwqDCoMKgwqDCoMKgwqDCoMKgwqBcIkNvbnNpZGVyIG9mZmVyaW5nIGEgaGlnaCBjb250cmFzdCBtb2RlLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvXCI6IFxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy53My5vcmcvV0FJL1dDQUcyMC9xdWlja3JlZi8jcXItdmlzdWFsLWF1ZGlvLWNvbnRyYXN0LXdpdGhvdXQtY29sb3JcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIldDQUcgMS40LjEgVXNlIG9mIENvbG9yIChXM0MpXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy53My5vcmcvV0FJL1dDQUcyMC9xdWlja3JlZi8jcXItdmlzdWFsLWF1ZGlvLWNvbnRyYXN0LWNvbnRyYXN0XCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJXQ0FHMS40LjMgQ29udHJhc3QgKE1pbmltdW0pIChXM0MpXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy51c2FiaWxpdHkuZ292L2dldC1pbnZvbHZlZC9ibG9nLzIwMTAvMDIvY29sb3ItYmxpbmRuZXNzLmh0bWxcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbG9yIEJsaW5kbmVzcyAmIFdlYiBEZXNpZ24gKFVzYWJpbGl0eS5nb3YpXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL2FjY2Vzc2liaWxpdHkuYmxvZy5nb3YudWsvMjAxNi8wNi8xNy9jb2xvdXItY29udHJhc3Qtd2h5LWRvZXMtaXQtbWF0dGVyL1wiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29sb3VyIGNvbnRyYXN0IC0gd2h5IGRvZXMgaXQgbWF0dGVyPyAoZ292LnVrKVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly9kZXZlbG9wZXIucGFjaWVsbG9ncm91cC5jb20vcmVzb3VyY2VzL2NvbnRyYXN0YW5hbHlzZXIvXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb2xvdXIgQ29udHJhc3QgQW5hbHlzZXJcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuaW5jbHVzaXZlZGVzaWdudG9vbGtpdC5jb20vVUN2aXNpb24vdmlzaW9uLmh0bWwjY29sb3VyXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJFbnN1cmUgc3VmZmljaWVudCBjb250cmFzdFwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL3d3dy5jb2xvci1ibGluZG5lc3MuY29tL3JnYi1hbm9tYWxvc2NvcGUtY29sb3ItYmxpbmRuZXNzLXRlc3QvXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb2xvciBibGluZG5lc3MgdGVzdFwiIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiZmFyc2lnaHRlZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlIVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkZhci1zaWdodGVkbmVzc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkZhci1zaWdodGVkbmVzcyAoSHlwZXJvcGlhKSBpcyBvbmUgb2YgdGhlIG1vc3QgY29tbW9uIHZpc3VhbCBpbXBhaXJtZW50cy4gUGVvcGxlIHdpdGggSHlwZXJvcGlhIGhhdmUgZGlmZmljdWx0eSBmb2N1c2luZyBvbiBvYmplY3RzIGF0IGNsb3NlIHJhbmdlIHdoaWNoIG1ha2VzIHRoZW0gYXBwZWFyIGJsdXJyeS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkF2b2lkIHRleHQgaW4gc21hbGwgZm9udCBzaXplcyBhbmQgbG9uZyB0ZXh0cy4gVXNlIHByb3BlciBzcGFjaW5nIGFuZCBsaW5lIGhlaWdodC5cIiwgIFxyXG4gICAgICAgICAgXCJNYWtlIHN1cmUgdGhlIHdlYnNpdGUgY2FuIGJlIHpvb21lZCB0byBhdCBsZWFzdCAyMDAlLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciBhIHRleHQgdG8gc3BlZWNoIHJlYWRlci5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnczLm9yZy9XQUkvV0NBRzIwL3F1aWNrcmVmLz9zaG93dGVjaG5pcXVlcz0xNDQjcXItdmlzdWFsLWF1ZGlvLWNvbnRyYXN0LXNjYWxlXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJXQ0FHIDEuNC40IFJlc2l6ZSB0ZXh0IChXM0MpXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vaW5jbHVzaXZlZGVzaWducHJpbmNpcGxlcy5vcmcvI3Byb3ZpZGUtY29tcGFyYWJsZS1leHBlcmllbmNlXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJQcm92aWRlIGNvbXBhcmFibGUgZXhwZXJpZW5jZVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL3d3dy5pbmNsdXNpdmVkZXNpZ250b29sa2l0LmNvbS9VQ3Zpc2lvbi92aXNpb24uaHRtbCNzaGFwZVwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29uc2lkZXIgc2l6ZVwiIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwidG90YWxDb2xvckJsaW5kbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiVG90YWwgY29sb3IgYmxpbmRuZXNzXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVvcGxlIHdpdGggbG93ZXJlZCBjb2xvciB2aXNpb24gaGF2ZSBkaWZmaWN1bHR5IGRpc3Rpbmd1aXNoaW5nIHNvbWUgb3IgYWxsIGNvbG9ycy4gVG90YWwgY29sb3IgYmxpbmRuZXNzIChNb25vY2hyb21hdGljIC8gQWNocm9tYXRvcHN5KSBpcyB2ZXJ5IHJhcmUuIFBlb3BsZSB3aXRoIHRoaXMgdmlzdWFsIGltcGFpcm1lbnQgY2FuIG5vdCBwZXJjaWV2ZSBhbnkgY29sb3JzLCBvbmx5IGRpZmZlcmVudCBzaGFkZXMgb2YgZ3JheS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkRvIG5vdCB1c2UgY29sb3IgYXMgdGhlIG9ubHkgd2F5IHRvIGNvbnZleSBpbmZvcm1hdGlvbiwgaW5kaWNhdGUgYW4gYWN0aW9uIG9yIGlkZW50aWZ5IGFuIGVsZW1lbnQuIEZvciBleGFtcGxlLCBkbyBub3QgbWFyayBhbiBpbmNvcnJlY3QgZm9ybSBmaWVsZCB3aXRoIGEgcmVkIGJvcmRlciBvbmx5LCBhbHNvIHN1cHBsZW1lbnQgd2l0aCBhIHRleHQgYW5kIHByZWZlcmFibHkgYW4gaWNvbi5cIixcclxuwqDCoMKgwqDCoMKgwqDCoMKgwqBcIkNvbnNpZGVyIG9mZmVyaW5nIGEgaGlnaCBjb250cmFzdCBtb2RlLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvXCI6IFxyXG4gICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnczLm9yZy9XQUkvV0NBRzIwL3F1aWNrcmVmLyNxci12aXN1YWwtYXVkaW8tY29udHJhc3Qtd2l0aG91dC1jb2xvclwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiV0NBRyAxLjQuMSBVc2Ugb2YgQ29sb3IgKFczQylcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnczLm9yZy9XQUkvV0NBRzIwL3F1aWNrcmVmLyNxci12aXN1YWwtYXVkaW8tY29udHJhc3QtY29udHJhc3RcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIldDQUcxLjQuMyBDb250cmFzdCAoTWluaW11bSkgKFczQylcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnVzYWJpbGl0eS5nb3YvZ2V0LWludm9sdmVkL2Jsb2cvMjAxMC8wMi9jb2xvci1ibGluZG5lc3MuaHRtbFwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29sb3IgQmxpbmRuZXNzICYgV2ViIERlc2lnbiAoVXNhYmlsaXR5LmdvdilcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vYWNjZXNzaWJpbGl0eS5ibG9nLmdvdi51ay8yMDE2LzA2LzE3L2NvbG91ci1jb250cmFzdC13aHktZG9lcy1pdC1tYXR0ZXIvXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb2xvdXIgY29udHJhc3QgLSB3aHkgZG9lcyBpdCBtYXR0ZXI/IChnb3YudWspXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL2RldmVsb3Blci5wYWNpZWxsb2dyb3VwLmNvbS9yZXNvdXJjZXMvY29udHJhc3RhbmFseXNlci9cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbG91ciBDb250cmFzdCBBbmFseXNlclwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL3d3dy5pbmNsdXNpdmVkZXNpZ250b29sa2l0LmNvbS9VQ3Zpc2lvbi92aXNpb24uaHRtbCNjb2xvdXJcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkVuc3VyZSBzdWZmaWNpZW50IGNvbnRyYXN0XCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuY29sb3ItYmxpbmRuZXNzLmNvbS9yZ2ItYW5vbWFsb3Njb3BlLWNvbG9yLWJsaW5kbmVzcy10ZXN0L1wiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29sb3IgYmxpbmRuZXNzIHRlc3RcIiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgXCJ0dW5uZWxWaXNpb25cIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlISBtb3ZlIHRoZSBtb3VzZSBwb2ludGVyIG9uIHRoZSB3ZWIgcGFnZSBhbmQgc2VlIHdoYXQncyBoYXBwZW5pbmcuXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiVHVubmVsIFZpc2lvblwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIldoYXQgaXMgY29tbW9ubHkgY2FsbGVkIFR1bm5lbCBWaXNpb24gaXMgbG9zcyBvZiBwZXJpcGhlcmFsIHZpc2lvbi4gVGhpcyBtYXkgYmUgYmVjYXVzZSB0aGUgcGVyc29uIHN1ZmZlcnMgZnJvbSBhIGRpc2Vhc2UgdGhhdCBhZmZlY3RzIHRoZSBjZWxscyBpbiB0aGUgZXllLCBidXQgbWF5IGFsc28gb2NjdXIgdGVtcG9yYXJpbHkgZHVlIHRvIHN0cmVzcyBvciBkZXByZXNzaW9uLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiQXZvaWQgdGV4dCBpbiBzbWFsbCBmb250IHNpemVzIGFuZCBsb25nIHRleHRzLiBVc2UgcHJvcGVyIHNwYWNpbmcgYW5kIGxpbmUgaGVpZ2h0LlwiLFxyXG4gICAgICAgICAgXCJNYWtlIHN1cmUgdGhlIHdlYnNpdGUgY2FuIGJlIHpvb21lZCB0byBhdCBsZWFzdCAyMDAlLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciBhIHRleHQgdG8gc3BlZWNoIHJlYWRlci5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly9pbmNsdXNpdmVkZXNpZ25wcmluY2lwbGVzLm9yZy8jZ2l2ZS1jb250cm9sXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJBbGxvdyB6b29tXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmluY2x1c2l2ZWRlc2lnbnRvb2xraXQuY29tL1VDdmlzaW9uL3Zpc2lvbi5odG1sI2xheW91dFwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29uc2lkZXIgdmlzdWFsIGZpZWxkIGxvc3NcIiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInN1bnNoaW5lXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJTdW5zaGluZVwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkEgbG90IG9mIHBlb3BsZSBoYXMgdG8gdXNlIHRoZWlyIGNvbXB1dGVycyBvdXRzaWRlIGluIGJyaWdodCBzdW5zaGluZS4gSXQgY2FuIG1ha2UgaXQgaGFyZGVyIHRvIHNlZSB3aGF04oCZcyBvbiB0aGUgc2NyZWVuLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiUHJvdmlkZSBlbm91Z2ggY29udHJhc3QgYmV0d2VlbiB0ZXh0IGFuZCBpdHMgYmFja2dyb3VuZC4gVXNlIGEgY29udHJhc3QgcmF0aW8gb2YgYXQgbGVhc3QgNC41OjEgZm9yIG5vcm1hbCB0ZXh0IGFuZCAzOjEgZm9yIGxhcmdlIHRleHQuXCIsXHJcbiAgICAgICAgICBcIkNoZWNrIHRoZSBDb250cmFzdCB3aXRoIDxlbT5Db2xvdXIgQ29udHJhc3QgQW5hbHlzZXI8L2VtPiBvciA8ZW0+Q29udHJhc3QgcmF0aW88L2VtPiAoc2VlIGxpbmtzIGJlbG93KS5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vZGV2ZWxvcGVyLnBhY2llbGxvZ3JvdXAuY29tL3Jlc291cmNlcy9jb250cmFzdGFuYWx5c2VyL1wiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29sb3VyIENvbnRyYXN0IEFuYWx5c2VyXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vbGVhdmVyb3UuZ2l0aHViLmlvL2NvbnRyYXN0LXJhdGlvL1wiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29udHJhc3QgcmF0aW9cIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly9pbmNsdXNpdmVkZXNpZ25wcmluY2lwbGVzLm9yZy8jY29uc2lkZXItc2l0dWF0aW9uXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb25zaWRlciBzaXR1YXRpb25cIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuaW5jbHVzaXZlZGVzaWdudG9vbGtpdC5jb20vVUN2aXNpb24vdmlzaW9uLmh0bWwjbGlnaHRpbmdcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbnNpZGVyIGxpZ2h0aW5nIGNvbmRpdGlvbnNcIiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImNvbmNlbnRyYXRpb25cIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlIVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkNvbmNlbnRyYXRpb25cIixcclxuICAgICAgICBcImZhY3RcIjogXCJFdmVyeW9uZSBjYW4gaGF2ZSBhIGhhcmQgdGltZSBjb25jZW50cmF0aW5nLCBidXQgZm9yIHNvbWUgaXQgY2FuIGJlIGEgYmlnIHByb2JsZW0gaW4gZXZlcnlkYXkgbGlmZS4gRGlzYWJpbGl0aWVzIGxpa2UgQURIRCBhbmQgQXV0aXNtIGNhbiBjYXVzZSBkaWZmaWN1bHR5IGluIGhhbmRsaW5nIGltcHJlc3Npb25zLCBzb3J0aW5nIGluZm9ybWF0aW9uIGFuZCBzZW5zaXRpdml0eSB0byBzb3VuZC5cIiwgICAgICAgIFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiR2l2ZSB0aGUgd2Vic2l0ZSBhIHNpbXBsZSBhbmQgY2xlYW4gZGVzaWduLlwiLFxyXG4gICAgICAgICAgXCJCZSBjYXJlZnVsIHdpdGggYW5pbWF0aW9ucyBhbmQgc3Ryb25nIGNvbG9ycy5cIixcclxuICAgICAgICAgIFwiQXZvaWQgaGF2aW5nIHRvbyBtdWNoIGNvbnRlbnQgb24gdGhlIHNhbWUgcGFnZS5cIixcclxuICAgICAgICAgIFwiT2ZmZXIgaW1hZ2UsIGF1ZGlvIGFuZCB2aWRlbyBhbGVybmF0aXZlcyB0byB0ZXh0IGNvbnRlbnQuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9cIjogXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vaW5jbHVzaXZlZGVzaWducHJpbmNpcGxlcy5vcmcvI2JlLWNvbnNpc3RlbnRcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkJlIGNvbnNpc3RlbnRcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuaW5jbHVzaXZlZGVzaWdudG9vbGtpdC5jb20vVUN0aGlua2luZy90aGlua2luZy5odG1sI2ludGVyZmFjZV9uYXZpZ2F0aW9uX2FuZF9uZXN0ZWRfbWVudXNcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkF2b2lkIGRlZXAgaGllcmFyY2hpZXNcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL3d3dy5pbmNsdXNpdmVkZXNpZ250b29sa2l0LmNvbS9VQ3RoaW5raW5nL3RoaW5raW5nLmh0bWwjc3RydWN0dXJpbmdfaW5mb3JtYXRpb25cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIlJlZHVjZSBtZW1vcnkgbG9hZFwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL3d3dy5pbmNsdXNpdmVkZXNpZ250b29sa2l0LmNvbS9VQ3RoaW5raW5nL3RoaW5raW5nLmh0bWwjYXR0ZW50aW9uXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJBdm9pZCBtdWx0aXBsZSBmb2N1c2VzIG9mIGF0dGVudGlvblwiIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwic21hbGxWb2NhYnVsYXJ5XCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJTbWFsbCB2b2NhYnVsYXJ5XCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiQSBsYXJnZSBwYXJ0IG9mIHRoZSB3b3JsZCdzIHBvcHVsYXRpb24gY2FuJ3QgcmVhZCBhdCBhbGwgYW5kIG1hbnkgYWR1bHRzIGRvbid0IHJlYWQgYXMgd2VsbCBhcyBleHBlY3RlZCBhZnRlciBmaW5pc2hpbmcgZ3JhZGUgc2Nob29sLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiQXZvaWQgZGlmZmljdWx0IHdvcmRzIGFuZCB0ZXJtcy5cIixcclxuICAgICAgICAgIFwiT2ZmZXIgZWFzeSB0byByZWFkIHRleHRzLCBpbWFnZXMsIHZpZGVvIG9yIGF1ZGlvIGFsdGVybmF0aXZlcy5cIixcclxuICAgICAgICAgIFwiT2ZmZXIgdGV4dHMgaW4gZGlmZmVyZW50IGxhbmd1YWdlcy5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnczLm9yZy9UUi9XQ0FHMjAvI21pbmltaXplLWVycm9yXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJXQ0FHIDMuMyBJbnB1dCBBc3Npc3RhbmNlOiBIZWxwIHVzZXJzIGF2b2lkIGFuZCBjb3JyZWN0IG1pc3Rha2VzLiAoVzNDKVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly93d3cudzMub3JnL1dBSS9XQ0FHMjAvcXVpY2tyZWYvI3FyLW5hdmlnYXRpb24tbWVjaGFuaXNtcy1yZWZzXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCIyLjQuNCBMaW5rIFB1cnBvc2UgKEluIENvbnRleHQpXCIgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiVUlcIjoge1xyXG4gICAgICBcInNlbGVjdFNpbXVsYXRpb25cIjogXCJTZWxlY3Qgc2ltdWxhdGlvbjpcIixcclxuICAgICAgXCJyZXNldFwiOiBcIlJlc2V0XCIsXHJcbiAgICAgIFwiYWR2aWNlXCI6IFwiVGhpbmsgYWJvdXQgdGhpc1wiLFxyXG4gICAgICBcIm1vcmVJbmZvXCI6IFwiTGlua3MgZm9yIGJldHRlciB1bmRlcnN0YW5kaW5nXCIsXHJcbiAgICAgIFwic2lnaHRcIjogXCJTaWdodFwiLFxyXG4gICAgICBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJUb3RhbCBjb2xvciBibGluZG5lc3NcIixcclxuICAgICAgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjogXCJZZWxsb3ctQmx1ZSBjb2xvciBibGluZG5lc3NcIiwgICAgXHJcbiAgICAgIFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOiBcIlJlZC1HcmVlbiBjb2xvciBibGluZG5lc3NcIixcclxuICAgICAgXCJmYXJzaWdodGVkbmVzc1wiOiBcIkZhci1zaWdodGVkbmVzc1wiLFxyXG4gICAgICBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbCB2aXNpb25cIixcclxuICAgICAgXCJtb2JpbGl0eVwiOiBcIk1vYmlsaXR5XCIsXHJcbiAgICAgIFwicGFya2luc29uc1wiOiBcIlBhcmtpbnNvbnNcIixcclxuICAgICAgXCJyZWFkQW5kV3JpdGVcIjogXCJSZWFkIGFuZCB3cml0ZVwiLFxyXG4gICAgICBcImR5c2xleGlhXCI6IFwiRHlzbGV4aWFcIixcclxuICAgICAgXCJzbWFsbFZvY2FidWxhcnlcIjogXCJTbWFsbCB2b2NhYnVsYXJ5XCIsXHJcbiAgICAgIFwiY29uY2VudHJhdGlvblwiOiBcIkNvbmNlbnRyYXRpb25cIixcclxuICAgICAgXCJjaGFuZ2VTZXR0aW5nc1wiOiBcIkNoYW5nZSBzZXR0aW5nc1wiLFxyXG4gICAgICBcInNlbGVjdExhbmd1YWdlXCI6IFwiU2VsZWN0IGxhbmd1YWdlXCIsXHJcbiAgICAgIFwic2F2ZVNldHRpbmdzXCI6IFwiU2F2ZSBzZXR0aW5nc1wiLFxyXG4gICAgICBcImNhbmNlbFwiOiBcIkNhbmNlbFwiLFxyXG4gICAgICBcInNpbXVsYXRpb25zXCI6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJTaWdodFwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtcclxuICAgICAgICAgICAgeyBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjogXCJUb3RhbCBjb2xvciBibGluZG5lc3NcIiB9LFxyXG4gICAgICAgICAgICB7IFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6IFwiWWVsbG93LUJsdWUgY29sb3IgYmxpbmRuZXNzXCIgfSxcclxuICAgICAgICAgICAgeyBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSZWQtR3JlZW4gY29sb3IgYmxpbmRuZXNzXCIgfSxcclxuICAgICAgICAgICAgeyBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiRmFyLXNpZ2h0ZWRuZXNzXCIgfSxcclxuICAgICAgICAgICAgeyBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbCB2aXNpb25cIiB9LFxyXG4gICAgICAgICAgICB7IFwic3Vuc2hpbmVcIjogXCJTdW5zaGluZVwiIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIk1vYmlsaXR5XCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogWyBcclxuICAgICAgICAgICAgeyBcInBhcmtpbnNvbnNcIjogXCJQYXJraW5zb25zXCIgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIlJlYWQgYW5kIHdyaXRlXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgICB7IFwiZHlzbGV4aWFcIjogXCJEeXNsZXhpYVwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJzbWFsbFZvY2FidWxhcnlcIjogXCJTbWFsbCB2b2NhYnVsYXJ5XCIgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiQ29uY2VudHJhdGlvblwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJNZW1vcnlcIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9XHJcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgbG9hZGVkU2ltdWxhdGlvbnMgPSBbXTtcblxuZnVuY3Rpb24gbG9hZChuYW1lLCBzdWJOYW1lLCBjYWxsYmFjaykge1xuICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdLFxuICAgICAgICBzY3JpcHRGaWxlID0gc3ViTmFtZSA/ICdzaW11bGF0aW9ucy8nICsgbmFtZSArICcvJyArIHN1Yk5hbWUgKyAnL2NvbnRlbnQuanMnIDogJ3NpbXVsYXRpb25zLycgKyBuYW1lICsgJy9jb250ZW50LmpzJztcblxuICAgIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoYWN0aXZlVGFiLmlkLCB7IGZpbGU6IHNjcmlwdEZpbGUgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgbG9hZGVkU2ltdWxhdGlvbnMucHVzaChuYW1lKTtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhuYW1lLCBzdWJOYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KG5hbWUsIHN1Yk5hbWUpIHtcbiAgaWYgKGxvYWRlZFNpbXVsYXRpb25zLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RhcnRTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSwgc3ViU2ltdWxhdGlvbjogc3ViTmFtZSB9KTtcblxuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgJ2FjdGl2ZVRhYic6IGFjdGl2ZVRhYi5pZCB9KTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBsb2FkKG5hbWUsIHN1Yk5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdGFydFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lLCBzdWJTaW11bGF0aW9uOiBzdWJOYW1lIH0pO1xuXG4gICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7ICdhY3RpdmVUYWInOiBhY3RpdmVUYWIuaWQgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzdG9wKG5hbWUsIHN1Yk5hbWUpIHtcbiAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdG9wU2ltdWxhdGlvbicsIHNpbXVsYXRpb246IG5hbWUsIHN1YlNpbXVsYXRpb246IHN1Yk5hbWUgfSk7XG4gIH0pO1xufVxuXG5leHBvcnRzLnN0YXJ0ID0gc3RhcnQ7XG5leHBvcnRzLnN0b3AgPSBzdG9wO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2ltdWxhdGlvbkxvYWRlci5qcy5tYXBcbiJdfQ==
