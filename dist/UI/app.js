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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC9VSS9hcHAuanMiLCJidWlsZC9qcy9iYWJlbC9VSS9kYXRhL2RhdGEuanNvbiIsImJ1aWxkL2pzL2JhYmVsL3V0aWxzL3NpbXVsYXRpb25Mb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxJQUFJLFFBQVEsUUFBUSxrQkFBUixDQUFaOztBQUVBLElBQUksZUFBZSx3QkFBd0IsS0FBeEIsQ0FBbkI7O0FBRUEsSUFBSSxvQkFBb0IsUUFBUSw4QkFBUixDQUF4Qjs7QUFFQSxJQUFJLG1CQUFtQix3QkFBd0IsaUJBQXhCLENBQXZCOztBQUVBLFNBQVMsdUJBQVQsQ0FBaUMsR0FBakMsRUFBc0M7QUFBRSxNQUFJLE9BQU8sSUFBSSxVQUFmLEVBQTJCO0FBQUUsV0FBTyxHQUFQO0FBQWEsR0FBMUMsTUFBZ0Q7QUFBRSxRQUFJLFNBQVMsRUFBYixDQUFpQixJQUFJLE9BQU8sSUFBWCxFQUFpQjtBQUFFLFdBQUssSUFBSSxHQUFULElBQWdCLEdBQWhCLEVBQXFCO0FBQUUsWUFBSSxPQUFPLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBcUMsR0FBckMsRUFBMEMsR0FBMUMsQ0FBSixFQUFvRCxPQUFPLEdBQVAsSUFBYyxJQUFJLEdBQUosQ0FBZDtBQUF5QjtBQUFFLEtBQUMsT0FBTyxPQUFQLEdBQWlCLEdBQWpCLENBQXNCLE9BQU8sTUFBUDtBQUFnQjtBQUFFOztBQUU3USxJQUFJLE9BQU8sSUFBWDs7QUFFQSxTQUFTLGVBQVQsR0FBMkI7O0FBRXpCLFNBQU8sT0FBUCxDQUFlLEtBQWYsQ0FBcUIsR0FBckIsQ0FBeUIsa0JBQXpCLEVBQTZDLFVBQVUsR0FBVixFQUFlO0FBQzFELHFCQUFpQixLQUFqQixDQUF1QixJQUFJLGdCQUEzQjtBQUNELEdBRkQ7QUFHRDs7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDOUIsYUFBTyxJQUFQLENBQVksS0FBWixDQUFrQixFQUFFLFFBQVEsSUFBVixFQUFnQixlQUFlLElBQS9CLEVBQWxCLEVBQXlELFVBQVUsSUFBVixFQUFnQjtBQUN2RSxZQUFJLFlBQVksS0FBSyxDQUFMLENBQWhCOztBQUVBLGVBQU8sSUFBUCxDQUFZLFdBQVosQ0FBd0IsVUFBVSxFQUFsQyxFQUFzQyxFQUFFLFFBQVEsaUJBQVYsRUFBNkIsWUFBWSxJQUF6QyxFQUErQyxlQUFlLE9BQTlELEVBQXRDOztBQUVBLGVBQU8sT0FBUCxDQUFlLEtBQWYsQ0FBcUIsR0FBckIsQ0FBeUIsRUFBRSxhQUFhLFVBQVUsRUFBekIsRUFBekI7QUFDRCxPQU5EO0FBT0QsS0FSRDtBQVNEO0FBQ0Y7O0FBRUQsU0FBUyxJQUFULENBQWMsSUFBZCxFQUFvQixPQUFwQixFQUE2QjtBQUMzQixTQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEVBQUUsUUFBUSxJQUFWLEVBQWdCLGVBQWUsSUFBL0IsRUFBbEIsRUFBeUQsVUFBVSxJQUFWLEVBQWdCO0FBQ3ZFLFFBQUksWUFBWSxLQUFLLENBQUwsQ0FBaEI7O0FBRUEsV0FBTyxJQUFQLENBQVksV0FBWixDQUF3QixVQUFVLEVBQWxDLEVBQXNDLEVBQUUsUUFBUSxnQkFBVixFQUE0QixZQUFZLElBQXhDLEVBQThDLGVBQWUsT0FBN0QsRUFBdEM7QUFDRCxHQUpEO0FBS0Q7O0FBRUQsUUFBUSxLQUFSLEdBQWdCLEtBQWhCO0FBQ0EsUUFBUSxJQUFSLEdBQWUsSUFBZjtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfZGF0YSA9IHJlcXVpcmUoJy4vZGF0YS9kYXRhLmpzb24nKTtcblxudmFyIGxhbmd1YWdlRGF0YSA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9kYXRhKTtcblxudmFyIF9zaW11bGF0aW9uTG9hZGVyID0gcmVxdWlyZSgnLi4vdXRpbHMvc2ltdWxhdGlvbkxvYWRlci5qcycpO1xuXG52YXIgc2ltdWxhdGlvbkxvYWRlciA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9zaW11bGF0aW9uTG9hZGVyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxudmFyIGxhbmcgPSBcImVuXCI7XG5cbmZ1bmN0aW9uIHN0YXJ0U2ltdWxhdGlvbigpIHtcblxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2FjdGl2ZVNpbXVsYXRpb24nLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgc2ltdWxhdGlvbkxvYWRlci5zdGFydChvYmouYWN0aXZlU2ltdWxhdGlvbik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXNldFNpbXVsYXRpb24odG9vbHRpcCkge1xuXG4gIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEljb24oe1xuICAgIHBhdGg6IFwiaW1nL2ljb24ucG5nXCJcbiAgfSk7XG5cbiAgdG9vbHRpcC5yZW1vdmVDbGFzcyhcImluXCIpO1xuICAkKFwiI3BhbmVsMVwiKS5hZGRDbGFzcyhcImluXCIpO1xuICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHRvb2x0aXAuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICB9LCAyNTApO1xuXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlU2ltdWxhdGlvbicsIGZ1bmN0aW9uIChvYmopIHtcbiAgICBzaW11bGF0aW9uTG9hZGVyLnN0b3Aob2JqLmFjdGl2ZVNpbXVsYXRpb24pO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnJlbW92ZSgnYWN0aXZlU2ltdWxhdGlvbicpO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnJlbW92ZSgnYWN0aXZlVGFiJyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRUZXh0cygpIHtcblxuICB2YXIgZGF0YSA9IGxhbmd1YWdlRGF0YVtsYW5nXTtcblxuICAkKFwiLm1vcmUtaW5mby1saW5rXCIpLnRleHQoZGF0YS5VSS5tb3JlSW5mbyk7XG4gICQoXCIjcmVzZXQtYnRuXCIpLnRleHQoZGF0YS5VSS5yZXNldCk7XG4gICQoXCIubmF2YmFyLWhlYWRlclwiKS50ZXh0KGRhdGEuVUkuc2VsZWN0U2ltdWxhdGlvbik7XG4gICQoXCIjYWR2aWNlLWRyb3Bkb3duXCIpLnRleHQoZGF0YS5VSS5hZHZpY2UpO1xuICAkKFwiI2luZm8tZHJvcGRvd25cIikudGV4dChkYXRhLlVJLm1vcmVJbmZvKTtcbiAgJChcIiNzaWdodFwiKS50ZXh0KGRhdGEuVUkuc2lnaHQpO1xuICAkKFwiI21vYmlsaXR5XCIpLnRleHQoZGF0YS5VSS5tb2JpbGl0eSk7XG4gICQoXCIjcmVhZFdyaXRlXCIpLnRleHQoZGF0YS5VSS5yZWFkQW5kV3JpdGUpO1xuICAkKFwiI2NvbmNlbnRyYXRpb25cIikudGV4dChkYXRhLlVJLmNvbmNlbnRyYXRpb24pO1xuXG4gICQuZWFjaChkYXRhLlVJLnNpbXVsYXRpb25zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcblxuICAgICQoJyMnICsgdmFsdWUuaGVhZGluZykudGV4dCh2YWx1ZS5oZWFkaW5nKTtcblxuICAgICQuZWFjaCh2YWx1ZS5jaG9pY2VzLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgICAgICAkKCcjJyArIGtleSkudGV4dCh2YWx1ZVtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgJCgnI3NldHRpbmdzLWhlYWRpbmcnKS50ZXh0KGRhdGEuVUkuY2hhbmdlU2V0dGluZ3MpO1xuICAkKCcjbGFuZ3VhZ2UtbGFiZWwnKS50ZXh0KGRhdGEuVUkuc2VsZWN0TGFuZ3VhZ2UpO1xuICAkKCcjYnRuLXNhdmUtc2V0dGluZ3MnKS50ZXh0KGRhdGEuVUkuc2F2ZVNldHRpbmdzKTtcbiAgJCgnI2J0bi1jYW5jZWwtc2V0dGluZ3MnKS50ZXh0KGRhdGEuVUkuY2FuY2VsKTtcbn1cblxuZnVuY3Rpb24gcmVhZE1vcmVMaW5rcygpIHtcblxuICB2YXIgcmVhZE1vcmVMaW5rID0gJCgnLm1vcmUtaW5mby1saW5rcycpLmZpbmQoJ2xpJyk7XG5cbiAgcmVhZE1vcmVMaW5rLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgdmFyIGN1cnJlbnRMaW5rID0gZXZlbnQudGFyZ2V0LmlubmVyVGV4dDtcblxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnbW9yZUluZm8nLCBmdW5jdGlvbiAob2JqKSB7XG5cbiAgICAgICQuZWFjaChvYmoubW9yZUluZm8sIGZ1bmN0aW9uIChpKSB7XG4gICAgICAgIGlmIChjdXJyZW50TGluayA9PSBvYmoubW9yZUluZm9baV0ubW9yZUluZm9MaW5rVGV4dCkge1xuICAgICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogJycgKyBvYmoubW9yZUluZm9baV0ubW9yZUluZm9VcmwgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0VG9vbHRpcFRleHRzKGFjdGl2ZVNpbXVsYXRpb24pIHtcblxuICB2YXIgZGF0YSA9IGxhbmd1YWdlRGF0YVtsYW5nXTtcblxuICB2YXIgc2ltdWxhdGlvblN0YXR1cyA9ICQoXCIuc2ltdWxhdGlvbi1zdGFydGVkLXBhcmFncmFwaFwiKTtcbiAgdmFyIHNpbXVsYXRpb25TdGF0dXNBbGVydCA9ICQoXCIuc2ltdWxhdGlvbi1zdGFydGVkLWFsZXJ0XCIpO1xuICB2YXIgaW5mb0hlYWRpbmcgPSAkKFwiLmRpc2FiaWxpdHktaW5mby1oZWFkaW5nXCIpO1xuICB2YXIgaW5mb1BhcmFncmFwaCA9ICQoXCIuZGlzYWJpbGl0eS1pbmZvLXBhcmFncmFwaFwiKTtcbiAgdmFyIGFkdmljZUxpc3QgPSAkKFwiLmFkdmljZS1saXN0XCIpO1xuICB2YXIgbW9yZUluZm9MaW5rcyA9ICQoXCIubW9yZS1pbmZvLWxpbmtzXCIpO1xuICB2YXIgbW9yZUluZm9QYW5lbCA9ICQoJyNtb3JlLWluZm8tcGFuZWwnKTtcbiAgdmFyIHRleHRzID0gZGF0YS5mYWN0c1thY3RpdmVTaW11bGF0aW9uXTtcblxuICBzaW11bGF0aW9uU3RhdHVzLmVtcHR5KCk7XG4gIGluZm9IZWFkaW5nLmVtcHR5KCk7XG4gIGluZm9QYXJhZ3JhcGguZW1wdHkoKTtcbiAgYWR2aWNlTGlzdC5lbXB0eSgpO1xuICBtb3JlSW5mb0xpbmtzLmVtcHR5KCk7XG5cbiAgc2ltdWxhdGlvblN0YXR1cy50ZXh0KHRleHRzLnNpbXVsYXRpb25TdGF0dXMpO1xuICBzaW11bGF0aW9uU3RhdHVzQWxlcnQucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuXG4gIGluZm9IZWFkaW5nLnRleHQodGV4dHMuaGVhZGluZyk7XG4gIGluZm9QYXJhZ3JhcGgudGV4dCh0ZXh0cy5mYWN0KTtcblxuICAkLmVhY2godGV4dHMubGlzdEl0ZW1zLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICBhZHZpY2VMaXN0LmFwcGVuZCgnPGxpPicgKyB2YWx1ZSArICc8L2xpPicpO1xuICB9KTtcblxuICBpZiAodGV4dHMubW9yZUluZm8gIT09IHVuZGVmaW5lZCkge1xuICAgIG1vcmVJbmZvUGFuZWwucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG5cbiAgICAkLmVhY2godGV4dHMubW9yZUluZm8sIGZ1bmN0aW9uIChpKSB7XG4gICAgICBtb3JlSW5mb0xpbmtzLmFwcGVuZCgnPGxpPjxhPicgKyB0ZXh0cy5tb3JlSW5mb1tpXS5tb3JlSW5mb0xpbmtUZXh0ICsgJzwvYT48L2xpPicpO1xuICAgIH0pO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7ICdtb3JlSW5mbyc6IHRleHRzLm1vcmVJbmZvIH0pO1xuICB9IGVsc2Uge1xuICAgIG1vcmVJbmZvUGFuZWwuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gIH1cbn1cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gIHZhciB0b29sdGlwID0gJChcIi50b29sLXRpcFwiKTtcblxuICB2YXIgYWN0aXZlU2ltdWxhdGlvbiA9IHZvaWQgMDtcblxuICBsYW5nID0gJ2VuJztcblxuICBzZXRUZXh0cygpO1xuXG4gIC8vIFNldCBhY3RpdmUgc3RhdGVcbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuXG4gICAgYWN0aXZlU2ltdWxhdGlvbiA9IG9iai5hY3RpdmVTaW11bGF0aW9uO1xuXG4gICAgaWYgKGFjdGl2ZVNpbXVsYXRpb24pIHtcbiAgICAgIHRvb2x0aXAuYWRkQ2xhc3MoXCJpblwiKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG4gICAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAgIHNldFRvb2x0aXBUZXh0cyhhY3RpdmVTaW11bGF0aW9uKTtcbiAgICAgIHJlYWRNb3JlTGlua3MoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIE1haW4gdmlld1xuICAkKFwiLm1lbnUtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBtZW51QnRuID0gJCh0aGlzKTtcbiAgICB2YXIgbWVudUJ0bklkID0gbWVudUJ0blswXS5pZDtcblxuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEljb24oe1xuICAgICAgcGF0aDogXCJpbWcvaWNvbl9hY3RpdmUucG5nXCJcbiAgICB9KTtcblxuICAgIGFjdGl2ZVNpbXVsYXRpb24gPSBtZW51QnRuSWQ7XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgJ2FjdGl2ZVNpbXVsYXRpb24nOiBtZW51QnRuSWQgfSk7XG5cbiAgICBzZXRUb29sdGlwVGV4dHMoYWN0aXZlU2ltdWxhdGlvbik7XG5cbiAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAkKCcjcGFuZWwxJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgICQoJyNwYW5lbDInKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG4gICAgdG9vbHRpcC5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNwYW5lbDInKS5hZGRDbGFzcyhcImluXCIpO1xuICAgIH0sIDEwMCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0YXJ0U2ltdWxhdGlvbigpO1xuICAgIH0sIDUwMCk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNwYW5lbDInKS5yZW1vdmVDbGFzcyhcImluXCIpO1xuICAgICAgdG9vbHRpcC5hZGRDbGFzcyhcImluXCIpO1xuICAgIH0sIDEwMDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwyJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgIH0sIDE1MDApO1xuXG4gICAgcmVhZE1vcmVMaW5rcygpO1xuICB9KTtcblxuICAkKFwiLmdpdGh1Yi1saW5rXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6ICdodHRwczovL2dpdGh1Yi5jb20vTWV0YW1hdHJpeC9XZWItRGlzYWJpbGl0eS1TaW11bGF0b3InIH0pO1xuICB9KTtcblxuICAkKCcuc2V0dGluZ3MtbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdsYW5nJywgZnVuY3Rpb24gKG9iaikge1xuICAgICAgJCgnI2xhbmd1YWdlJykudmFsKG9iai5sYW5nKTtcbiAgICB9KTtcblxuICAgICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImluXCIpO1xuICAgICQoJyNzZXR0aW5ncycpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3NldHRpbmdzJykuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICB9LCAyNTApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwxJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICAgIH0sIDUwMCk7XG4gIH0pO1xuXG4gIC8vIFNldHRpbmdzIHZpZXdcblxuICAvKiAkKCcjYnRuLXNhdmUtc2V0dGluZ3MnKS5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICBcbiAgICAgdmFyIHNlbGVjdGVkTGFuZyA9ICQoJyNsYW5ndWFnZScpLnZhbCgpO1xyXG4gIFxuICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeydsYW5nJzogc2VsZWN0ZWRMYW5nfSk7XHJcbiAgXG4gICAgIGxhbmcgPSBzZWxlY3RlZExhbmc7XHJcbiAgXG4gICAgIHNldFRleHRzKCk7XHJcbiAgXG4gICAgICQoJyNzZXR0aW5ncycpLnJlbW92ZUNsYXNzKFwiaW5cIik7XHJcbiAgICAgJCgnI3BhbmVsMScpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcclxuICBcbiAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAkKCcjcGFuZWwxJykuYWRkQ2xhc3MoXCJpblwiKTtcclxuICAgICB9LCA1MDApO1xyXG4gIFxuICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICQoJyNzZXR0aW5ncycpLmFkZENsYXNzKFwiaGlkZVwiKTtcclxuICAgICB9LCA3NTApO1xyXG4gIFxuICAgfSk7XHJcbiAgXG4gICAkKCcjYnRuLWNhbmNlbC1zZXR0aW5ncycpLm9uKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIFxuICAgICAkKCcjc2V0dGluZ3MnKS5yZW1vdmVDbGFzcyhcImluXCIpO1xyXG4gICAgICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XHJcbiAgXG4gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgJCgnI3BhbmVsMScpLmFkZENsYXNzKFwiaW5cIik7XHJcbiAgICAgfSwgMjUwKTtcclxuICBcbiAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAkKCcjc2V0dGluZ3MnKS5hZGRDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgfSwgNTAwKTtcclxuICBcbiAgIH0pOyovXG5cbiAgLy8gVG9vbHRpcCB2aWV3XG5cbiAgJChcIi5zaW11bGF0aW9uLXN0YXJ0ZWQtYWxlcnQgLmNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkKFwiLnNpbXVsYXRpb24tc3RhcnRlZC1hbGVydFwiKS5hZGRDbGFzcyhcImhpZGVcIik7XG4gIH0pO1xuXG4gICQoXCIjcmVzZXQtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICByZXNldFNpbXVsYXRpb24odG9vbHRpcCk7XG4gIH0pO1xuXG4gIC8vcGFuZWwgY29sbGFwc2VcblxuICAkKCcjbXlDb2xsYXBzaWJsZScpLm9uKCdzaG93bi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBkbyBzb21ldGhpbmfigKZcbiAgfSk7XG5cbiAgLy9wYW5lbCBjb2xsYXBzZSwgc2hvdyBhcnJvd3M6IFxuICAkKCcuY29sbGFwc2UnKS5vbignc2hvd24uYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLmRvd24tYXJyb3dcIikuY3NzKCd0cmFuc2Zvcm0nLCAncm90YXRlKC0xODBkZWcpJyk7XG4gIH0pLm9uKCdoaWRkZW4uYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLmRvd24tYXJyb3dcIikuY3NzKCd0cmFuc2Zvcm0nLCAncm90YXRlKC0zNjBkZWcpJyk7XG4gIH0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAuanMubWFwXG4iLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgXCJzdlwiOlxyXG4gIHtcclxuICAgIFwiZmFjdHNcIjoge1xyXG4gICAgICBcImR5c2xleGlhXCI6IFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJEeXNsZXhpXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiRHlzbGV4aSDDpHIgZW4gbmVkc8OkdHRuaW5nIHNvbSBnw7ZyIGF0dCBoasOkcm5hbiBoYXIgc3bDpXJ0IGF0dCBhdXRvbWF0aXNlcmEgdG9sa25pbmdlbiBhdiBvcmQuIERldHRhIGfDtnIgYXR0IHBlcnNvbmVyIG1lZCBkZW5uYSBuZWRzw6R0dG5pbmcga2FuIGhhIHN2w6VydCBhdHQgbMOkc2Egb2NoIHNrcml2YS4gRHlzbGV4aSDDpHIgaW50ZSBrb3BwbGF0IHRpbGwgc3luIGVsbGVyIGludGVsbGlnZW5zLiBPcnNha2VybmEgdGlsbCBkeXNsZXhpIMOkciBmb3J0ZmFyYW5kZSBva2xhcnQuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJVbmR2aWsgdGV4dCBpIGxpdGVuIHN0b3JsZWsgb2NoIGzDpW5nYSB0ZXh0ZXIuIFNlIHRpbGwgYXR0IGhhIG9yZGVudGxpZ3QgbWVkIHJhZGF2c3TDpW5kLlwiLCBcdFxyXG4gICAgICAgICAgXCJVbmR2aWsgc3bDpXJhIG9yZCBvY2ggZmFja3Rlcm1lci5cIixcclxuICAgICAgICAgIFwiRXJianVkIGzDpHR0bMOkc3RhIHZlcnNpb25lciBhdiBmYWNrdGV4dGVyLlwiLFxyXG4gICAgICAgICAgXCJVbmR2aWsgdHlwc25pdHQgbWVkIGtyw6VuZ2xpZ2Egb2NoIGtvbXBsZXhhIGZpZ3VyZXIuXCJcclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJwYXJraW5zb25zXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2ISByw7ZyIG11c3Bla2FyZW4gcMOlIHdlYmJwbGF0c2VuIG9jaCBzZSB2YWQgc29tIGjDpG5kZXIuXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiUGFya2luc29uc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlZpZCBQYXJraW5zb25zIHNqdWtkb20gZsO2cnN0w7ZycyBjZWxsZXJuYSBpIGhqw6RybmFuIHNvbSB0aWxsdmVya2FyIGRvcGFtaW4gdmlsa2V0IGfDtnIgYXR0IGhqw6RybmFuIGbDpXIgZW4gbmVkc2F0dCBmw7ZybcOlZ2EgYXR0IHNraWNrYSBzaWduYWxlci4gUGVyc29uZXIgbWVkIFBhcmtpbnNvbnMga2FuIGRyYWJiYXMgYXYgc3ltcHRvbSBzb20gc2tha25pbmdhciwgc3RlbGEgbXVza2xlciBvY2ggc8OkbXJlIHLDtnJlbHNlZsO2cm3DpWdhLiBPcnNha2VybmEgdGlsbCBQYXJraW5zb25zIHNqdWtkb20gw6RyIGZvcnRmYXJhbmRlIG9rbGFydC5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIlNlIHRpbGwgYXR0IHdlYmJwbGF0c2VuIGthbiBhbnbDpG5kYXMgbWVkIGFuZHJhIGhqw6RscG1lZGVsIMOkbiBtdXMsIHRpbGwgZXhlbXBlbCB0YW5nZW50Ym9yZHNuYXZpZ2VyaW5nLlwiLCBcdFxyXG4gICAgICAgICAgXCJIYSB0aWxscsOkY2tsaWd0IG1lZCBsdWZ0IG1lbGxhbiBrb21wb25lbnRlclwiLFxyXG4gICAgICAgICAgXCJIYSB0aWxscsOkY2tsaWd0IHN0b3JhIGtsaWNreXRvci5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1VybHNcIjogXCJodHRwOi8vd3d3LnBhcmtpbnNvbmZvcmJ1bmRldC5zZVwiLFxyXG4gICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJQYXJraW5zb25zZsO2cmJ1bmRldFwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgZGVmZWt0IGbDpHJnc2VlbmRlIGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6Ugdmlzc2EgZWxsZXIgYWxsYSBmw6RyZ2VyLiBFdHQgZnVsbHQgZnVuZ2VyYW5kZSDDtmdhIGhhciB0cmUgb2xpa2EgdGFwcGFyIHNvbSB0YXIgdXBwIGbDpHJnZXJuYSB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gTsOkciBlbiBlbGxlciBmbGVyYSBhdiB0YXBwYXJuYSBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEgbGVkZXIgZGV0IHRpbGwgZGVmZWt0IGbDpHJnc2VlbmRlLiBHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0IChUcml0YW5vcGkpIMOkciBzw6RsbHN5bnQuIE5hbW5ldCDDpHIgbWlzc2xlZGFuZGUgZMOlIGRldCBpbnRlIMOkciBmw6RyZ2VybmEgZ3VsIG9jaCBibMOlIHNvbSBmw7ZydsOkeGxhcywgdXRhbiBibMOlIG1lZCBncsO2biBvY2ggZ3VsIG1lZCBsaWxhLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBkZXQgZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCBlbiByw7ZkIHJhbSB1dGFuIGtvbXBsZXR0ZXJhIMOkdmVuIG1lZCB0ZXh0IG9jaCBnw6RybmEgZW4gaWtvbi5cIiwgXHRcclxuICAgICAgICAgIFwiRXJianVkIGfDpHJuYSBldHQgaMO2Z2tvbnRyYXN0LWzDpGdlLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvVXJsc1wiOiBcImh0dHBzOi8vc3Yud2lraXBlZGlhLm9yZy93aWtpL0RlZmVrdF9mJUMzJUE0cmdzZWVuZGVcIixcclxuICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiV2lraXBlZGlhIG9tIGRlZmVrdCBmw6RyZ3NlZW5kZVwiXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXRcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgZGVmZWt0IGbDpHJnc2VlbmRlIGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6Ugdmlzc2EgZWxsZXIgYWxsYSBmw6RyZ2VyLiBFdHQgZnVsbHQgZnVuZ2VyYW5kZSDDtmdhIGhhciB0cmUgb2xpa2EgdGFwcGFyIHNvbSB0YXIgdXBwIGbDpHJnZXJuYSB2aW9sZXR0LCBncsO2biBvY2ggcsO2ZC4gTsOkciBlbiBlbGxlciBmbGVyYSBhdiB0YXBwYXJuYSBzYWtuYXMgZWxsZXIgw6RyIGRlZmVrdGEgbGVkZXIgZGV0IHRpbGwgZGVmZWt0IGbDpHJnc2VlbmRlLiBSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXQgKFByb3Rhbm9waSBvY2ggRGV1dGVyYW5vcGkpIMOkciBkZW4gdmFubGlnYXN0ZSB0eXBlbiBhdiBmw6RyZ2JsaW5kaGV0LiBEZW4gw6RyIHZhbmxpZ2FyZSBob3MgbcOkbiDDpG4ga3Zpbm5vci4gUGVyc29uZXIgcsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0IGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6UgZsOkcmdlcm5hIHLDtmQsIGdyw7ZuLCBicnVuIG9jaCBvcmFuZ2UuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogXHJcbiAgICAgICAgW1wiQW52w6RuZCBpbnRlIGbDpHJnIHNvbSBlbmRhIHPDpHR0ZXQgYXR0IGbDtnJtZWRsYSBpbmZvcm1hdGlvbiwgaW5kaWtlcmEgZW4gaGFuZGxpbmcgZWxsZXIgaWRlbnRpZmllcmEgZXR0IGVsZW1lbnQuIE1hcmtlcmEgdGlsbCBleGVtcGVsIGludGUgZXR0IGZlbGFrdGlndCBmb3JtdWzDpHJmw6RsdCBlbmRhc3QgbWVkIHLDtmQgcmFtLCBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBvY2ggZ8Okcm5hIGVuICBpa29uLlwiLCBcIkVyYmp1ZCBnw6RybmEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIl0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1VybHNcIjogXCJodHRwczovL3N2Lndpa2lwZWRpYS5vcmcvd2lraS9EZWZla3RfZiVDMyVBNHJnc2VlbmRlXCIsXHJcbiAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldpa2lwZWRpYSBvbSBkZWZla3QgZsOkcmdzZWVuZGVcIlxyXG4gICAgICB9LFxyXG4gICAgICBcImZhcnNpZ2h0ZWRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkzDpW5nc3ludGhldFwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBlcnNvbmVyIG1lZCBIeXBlcm9waSBzZXIgc3VkZGlndCBww6UgbsOkcmEgaMOlbGwsIG1lbiBicmEgcMOlIGzDpW5ndCBow6VsbC4gTmVkc8OkdHRuaW5nZW4gdXBwc3TDpXIgcMOlIGdydW5kIGF2IGF0dCBsanVzZXQgaW50ZSBicnl0cyByw6R0dCBpIMO2Z2F0LiBEZXQgw6RyIGVuIGF2IGRlIHZhbmxpZ2FzdGUgc3lubmVkc8OkdHRuaW5nYXJuYS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIlVuZHZpayB0ZXh0IGkgbGl0ZW4gc3Rvcmxlay5cIiwgXHRcclxuICAgICAgICAgIFwiV2ViYnNpZGFuIHNrYSBnw6UgYXR0IGbDtnJzdG9yYSAoem9vbWFzKSB0aWxsIG1pbnN0IDIwMCAlIHPDpSBhdHQgYmVzw7ZrYXJlbiBrYW4gYW5wYXNzYSBpbm5laMOlbGxldHMgc3RvcmxlayBlZnRlciBzaW5hIGJlaG92LlwiLFxyXG4gICAgICAgICAgXCJFcmJqdWQgdXBwbMOkc25pbmcgYXYgaW5uZWjDpWxsZXQuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9VcmxzXCI6IFwiaHR0cHM6Ly93ZWJicmlrdGxpbmplci5zZS9yLzM5LWdlLXdlYmJwbGF0c2VuLWVuLWdvZC1sYXNiYXJoZXQvXCIsXHJcbiAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldlYmJyaWt0bGluamUgR2Ugd2ViYnBsYXRzZW4gZ29kIGzDpHNiYXJoZXRcIlxyXG4gICAgICB9LFxyXG4gICAgICBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiSGVsdCBmw6RyZ2JsaW5kXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiRGVmZWt0IGbDpHJnc2VlbmRlIGlubmViw6RyIGF0dCBlbiBwZXJzb24gaGFyIHN2w6VydCBhdHQgc2tpbGphIHDDpSB2aXNzYSBlbGxlciBhbGxhIGbDpHJnZXIuIEV0dCBmdWxsdCBmdW5nZXJhbmRlIMO2Z2EgaGFyIHRyZSBvbGlrYSB0eXBlciBhdiB0YXBwYXIgc29tIHRhciB1cHAgb2xpa2EgZsOkcmdlcjogdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE9yc2FrZW4gdGlsbCBkZWZla3QgZsOkcmdzZWVuZGUgw6RyIGF0dCBlbiBlbGxlciBmbGVyYSBhdiBkZXNzYSB0eXBlciBhdiB0YXBwYXIgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhLiBIZWx0IGbDpHJnYmxpbmQgKE1vbm9rcm9tYXNpL2Frcm9tYXRvcHNpKSDDpHIgbXlja2V0IHPDpGxsc3ludC4gUGVyc29uZXIgbWVkIGRlbm5hIHN5bm5lZHPDpHR0bmluZyBzZXIgaW5nYSBmw6RyZ2VyIHV0YW4gc2VyIGVuZGFzdCBpIGdyw6Vza2FsYS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZGV0IGVuZGEgc8OkdHRldCBhdHQgZsO2cm1lZGxhIGluZm9ybWF0aW9uLCBpbmRpa2VyYSBlbiBoYW5kbGluZyBlbGxlciBpZGVudGlmaWVyYSBlbGVtZW50LiBNYXJrZXJhIHQuZXguIGludGUgZXR0IGZlbGFrdGlndCBmb3JtdWzDpHJmw6RsdCBlbmRhc3QgbWVkIHLDtmQgcmFtLCBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBlbGxlciBpa29uLlwiLCBcdFxyXG4gICAgICAgICAgXCJEZXQga2FuIHZhcmEgZW4gYnJhIGlkw6kgYXR0IGVyYmp1ZGEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJ0dW5uZWxWaXNpb25cIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhIHLDtnIgbXVzcGVrYXJlbiBww6Ugd2ViYnBsYXRzZW4gb2NoIHNlIHZhZCBzb20gaMOkbmRlci5cIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJUdW5uZWxzZWVuZGVcIixcclxuICAgICAgICBcImZhY3RcIjogXCJEZXQgc29tIGkgZGFnbGlndCB0YWwgYnJ1a2FyIGthbGxhcyB0dW5uZWxzZWVuZGUgw6RyIGVuIHN5bm5lZHPDpHR0bmluZyBzb20gZ8O2ciBhdHQgZW5kYXN0IGVuIGRlbCBhdiBzeW5mw6RsdGV0IGthbiBzZXMuIERldHRhIGthbiBiZXJvIHDDpSBhdHQgcGVyc29uZW4gbGlkZXIgYXYgZW4gc2p1a2RvbSBzb20gZ8O2ciBhdHQgY2VsbGVybmEgaSDDtmdhdCBmw7Zyc3TDtnJzIG1lbiBkZW5uYSB0eXAgYXYgc3lubmVkc8OkdHRuaW5nIGthbiBvY2tzw6UgdGlsbGbDpGxsaWd0IHVwcHN0w6UgcMOlIGdydW5kIGF2IHN0cmVzcyBlbGxlciBkZXByZXNzaW9uLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrLlwiLFxyXG4gICAgICAgICAgXCJXZWJic2lkYW4gc2thIGfDpSBhdHQgZsO2cnN0b3JhICh6b29tYXMpIHRpbGwgbWluc3QgMjAwICUgc8OlIGF0dCBiZXPDtmthcmVuIGthbiBhbnBhc3NhIGlubmVow6VsbGV0cyBzdG9ybGVrIGVmdGVyIHNpbmEgYmVob3YuXCIsXHJcbiAgICAgICAgICBcIkVyYmp1ZCB1cHBsw6RzbmluZyBhdiBpbm5laMOlbGxldC5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJzdW5zaGluZVwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJTb2xza2VuXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiTG9yZW0gaXBzdW1cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkxvcmVtIGlwc3VtLlwiLFxyXG4gICAgICAgICAgXCJMb3JlbSBpcHN1bS5cIixcclxuICAgICAgICAgIFwiTG9yZW0gaXBzdW1cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJjb25jZW50cmF0aW9uXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIktvbmNlbnRyYXRpb25cIixcclxuICAgICAgICBcImZhY3RcIjogXCJBbGxhIGthbiBoYSBzdsOlcnQgYXR0IGtvbmNlbnRyZXJhIHNpZyBtZW4gZsO2ciB2aXNzYSBrYW4gZGV0IGJsaSBldHQgc3RvcnQgcHJvYmxlbSBpIHZhcmRhZ3NsaXZldC4gRGVzc2EgZnVua3Rpb25zbmVkc8OkdHRuaW5nYXIga2FuIG9yc2FrYSBzdsOlcmlnaGV0ZXIgbWVkIGF0dCBoYW50ZXJhIGludHJ5Y2ssIHNvcnRlcmEgaW5mb3JtYXRpb24gb2NoIGxqdWRrw6Ruc2xpZ2hldC5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkdlIHdlYmJwbGF0c2VuIGVuIGVua2VsIG9jaCBsdWZ0aWcgZGVzaWduLlwiLFxyXG4gICAgICAgICAgXCJWYXIgZsO2cnNpa3RpZyBtZWQgYW5pbWF0aW9uZXIgb2NoIHN0YXJrYSBmw6RyZ2VyLlwiLFxyXG4gICAgICAgICAgXCJVbmR2aWsgYXR0IGhhIGbDtnIgbXlja2V0IGlubmVow6VsbCBww6Ugc2FtbWEgc2lkYS5cIixcclxuICAgICAgICAgIFwiRXJianVkIGxqdWQtIG9jaCB2aWRlby1hbGVybmF0aXYgdGlsbCB0ZXh0aW5uZWjDpWxsLlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJMaXRldCBvcmRmw7ZycsOlZFwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkVuIHN0b3IgZGVsIGF2IGpvcmRlbnMgYmVmb2xrbmluZyBrYW4gaW50ZSBsw6RzYSBhbGxzIG9jaCBtw6VuZ2EgdnV4bmEgbMOkc2VyIGludGUgc8OlIGJyYSBzb20gZsO2cnbDpG50YXMgZWZ0ZXIgZ3J1bmRza29sZXV0YmlsZG5pbmdlbi5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIlVuZHZpayBrcsOlbmdsaWdhIG9yZCBvY2ggZmFja3Rlcm1lci5cIiwgICBcclxuICAgICAgICAgIFwiRXJianVkIGzDpHR0bMOkc3QgdmVyc2lvbiBhdiBrcsOlbmdsaWdhIHRleHRlci5cIixcclxuICAgICAgICAgIFwiRXJianVkIHRleHRlciBww6Ugb2xpa2Egc3Byw6VrLlwiXHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJVSVwiOiB7XHJcbiAgICAgIFwic2VsZWN0U2ltdWxhdGlvblwiOiBcIlbDpGxqIHNpbXVsZXJpbmc6XCIsXHJcbiAgICAgIFwicmVzZXRcIjogXCLDhXRlcnN0w6RsbFwiLFxyXG4gICAgICBcImFkdmljZVwiOiBcIlTDpG5rIHDDpSBkZXR0YVwiLFxyXG4gICAgICBcIm1vcmVJbmZvXCI6IFwiTWVyIGluZm9ybWF0aW9uXCIsXHJcbiAgICAgIFwic2lnaHRcIjogXCJTeW5cIixcclxuICAgICAgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6IFwiSGVsdCBmw6RyZ2JsaW5kXCIsXHJcbiAgICAgIFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6IFwiR3VsLWJsw6UgZsOkcmdibGluZGhldFwiLCAgICBcclxuICAgICAgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6IFwiUsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0XCIsXHJcbiAgICAgIFwiZmFyc2lnaHRlZG5lc3NcIjogXCJMw6VuZ3N5bnRoZXQsIMO2dmVyc3ludGhldFwiLFxyXG4gICAgICBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbHNlZW5kZVwiLFxyXG4gICAgICBcIm1vYmlsaXR5XCI6IFwiTW90b3Jpa1wiLFxyXG4gICAgICBcInBhcmtpbnNvbnNcIjogXCJQYXJraW5zb25zXCIsXHJcbiAgICAgIFwicmVhZEFuZFdyaXRlXCI6IFwiTMOkc2Egb2NoIHNrcml2YVwiLFxyXG4gICAgICBcImR5c2xleGlhXCI6IFwiRHlzbGV4aVwiLFxyXG4gICAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOiBcIkxpdGV0IG9yZGbDtnJyw6VkXCIsXHJcbiAgICAgIFwiY29uY2VudHJhdGlvblwiOiBcIktvbmNlbnRyYXRpb25cIixcclxuICAgICAgXCJjaGFuZ2VTZXR0aW5nc1wiOiBcIkNoYW5nZSBzZXR0aW5nc1wiLFxyXG4gICAgICBcInNlbGVjdExhbmd1YWdlXCI6IFwiU2VsZWN0IGxhbmd1YWdlXCIsXHJcbiAgICAgIFwic2F2ZVNldHRpbmdzXCI6IFwiU2F2ZSBzZXR0aW5nc1wiLFxyXG4gICAgICBcImNhbmNlbFwiOiBcIkNhbmNlbFwiLFxyXG4gICAgICBcInNpbXVsYXRpb25zXCI6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJTeW5cIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXHJcbiAgICAgICAgICAgIHsgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6IFwiSGVsdCBmw6RyZ2JsaW5kXCIgfSxcclxuICAgICAgICAgICAgeyBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIiB9LFxyXG4gICAgICAgICAgICB7IFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOiBcIlLDtmQtZ3LDtm4gZsOkcmdibGluZGhldFwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJmYXJzaWdodGVkbmVzc1wiOiBcIkzDpW5nc3ludGhldCwgw7Z2ZXJzeW50aGV0XCIgfSxcclxuICAgICAgICAgICAgeyBcInR1bm5lbFZpc2lvblwiOiBcIlR1bm5lbHNlZW5kZVwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJzdW5zaGluZVwiOiBcIlNvbHNrZW5cIiB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJNb3RvcmlrXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogWyBcclxuICAgICAgICAgICAgeyBcInBhcmtpbnNvbnNcIjogXCJQYXJraW5zb25zXCIgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIkzDpHNhIG9jaCBza3JpdmFcIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXHJcbiAgICAgICAgICAgIHsgXCJkeXNsZXhpYVwiOiBcIkR5c2xleGlcIiB9LFxyXG4gICAgICAgICAgICB7IFwic21hbGxWb2NhYnVsYXJ5XCI6IFwiTGl0ZXQgb3JkZsO2cnLDpWRcIiB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJLb25jZW50cmF0aW9uXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIk1pbm5lXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW11cclxuICAgICAgICB9XHJcblxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfSxcclxuICBcImVuXCI6XHJcbiAge1xyXG4gICAgXCJmYWN0c1wiOiB7XHJcbiAgICAgIFwiZHlzbGV4aWFcIjogXHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJEeXNsZXhpYVwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkR5c2xleGlhIGlzIGEgZGlzYWJpbGl0eSB0aGF0IG1ha2VzIGl0IGRpZmZpY3VsdCBmb3IgdGhlIGJyYWluIHRvIGF1dG9tYXRlIHRoZSBpbnRlcnByZXRhdGlvbiBvZiB3b3Jkcy4gVGhpcyBtYWtlcyBpdCBoYXJkIGZvciBwZW9wbGUgd2l0aCB0aGlzIGRpc2FiaWxpdHkgdG8gcmVhZCBhbmQgd3JpdGUuIER5c2xleGlhIGlzIGhhcyBubyBjb25uZWN0aW9uIHdpdGggdmlzaW9uIG9yIGludGVsbGlnZW5jZS4gVGhlIGNhdXNlcyBvZiBkeXNsZXhpYSBhcmUgc3RpbGwgdW5jbGVhci5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkF2b2lkIHRleHQgaW4gc21hbGwgZm9udCBzaXplcyBhbmQgbG9uZyB0ZXh0cy4gVXNlIHByb3BlciBzcGFjaW5nIGFuZCBsaW5lIGhlaWdodC5cIixcclxuICAgICAgICAgIFwiQXZvaWQgZGlmZmljdWx0IHdvcmRzIGFuZCB0ZXJtcy5cIixcclxuICAgICAgICAgIFwiT2ZmZXIgZWFzeSB0byByZWFkIHRleHRzLCBpbWFnZXMsIHZpZGVvIG9yIGF1ZGlvIGFsdGVybmF0aXZlcy5cIixcclxuICAgICAgICAgIFwiQXZvaWQgZm9udHMgd2l0aCBjb21wbGljYXRlZCBhbmQgY29tcGxleCBjaGFyYWN0ZXJzLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvXCI6IFxyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly93d3cudzMub3JnL1RSL1dDQUcyMC8jbWluaW1pemUtZXJyb3JcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIldDQUcgMy4zIElucHV0IEFzc2lzdGFuY2U6IEhlbHAgdXNlcnMgYXZvaWQgYW5kIGNvcnJlY3QgbWlzdGFrZXMuIChXM0MpXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy53My5vcmcvV0FJL1dDQUcyMC9xdWlja3JlZi8jcXItbmF2aWdhdGlvbi1tZWNoYW5pc21zLXJlZnNcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIjIuNC40IExpbmsgUHVycG9zZSAoSW4gQ29udGV4dClcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly9pbmNsdXNpdmVkZXNpZ25wcmluY2lwbGVzLm9yZy8jcHJpb3JpdGlzZS1jb250ZW50XCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJQcmlvcml0aXNlIGNvbnRlbnRcIiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgICAgXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGFya2luc29uc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhIG1vdmUgdGhlIG1vdXNlIHBvaW50ZXIgb24gdGhlIHdlYiBwYWdlIGFuZCBzZWUgd2hhdCdzIGhhcHBlbmluZy5cIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJQYXJraW5zb25zXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGFya2luc29uJ3MgZGlzZWFzZSBkZXN0cm95cyB0aGUgY2VsbHMgaW4gdGhlIGJyYWluIHRoYXQgcHJvZHVjZSBkb3BhbWluZSwgd2hpY2ggY2F1c2VzIHRoZSBicmFpbiB0byBoYXZlIGEgcmVkdWNlZCBhYmlsaXR5IHRvIHNlbmQgc2lnbmFscy4gUGVyc29ucyB3aXRoIFBhcmtpbnNvbidzIG1heSBzdWZmZXIgZnJvbSBzeW1wdG9tcyBzdWNoIGFzIHNoYWtpbmcsIHN0aWZmIG11c2NsZXMsIGFuZCByZWR1Y2VkIG1vYmlsaXR5LiBUaGUgY2F1c2VzIG9mIFBhcmtpbnNvbidzIGRpc2Vhc2UgYXJlIHN0aWxsIHVuY2xlYXIuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJNYWtlIHN1cmUgdGhlIHdlYnNpdGUgY2FuIGJlIHVzZWQgd2l0aCBvdGhlciB0b29scyBvdGhlciB0aGFuIGEgbW91c2UsIHN1Y2ggYXMga2V5Ym9hcmQgbmF2aWdhdGlvbi5cIixcclxuICAgICAgICAgIFwiSGF2ZSBlbm91Z2ggc3BhY2UgYmV0d2VlbiBjb21wb25lbnRzLlwiLFxyXG4gICAgICAgICAgXCJNYWtlIHN1cmUgY2xpY2sgYXJlYXMgYXJlIGJpZyBlbm91Z2guXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9cIjogXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy53My5vcmcvVFIvVU5ERVJTVEFORElORy1XQ0FHMjAva2V5Ym9hcmQtb3BlcmF0aW9uLmh0bWxcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIldDQUcgMi4xIEtleWJvYXJkIEFjY2Vzc2libGU6IE1ha2UgYWxsIGZ1bmN0aW9uYWxpdHkgYXZhaWxhYmxlIGZyb20gYSBrZXlib2FyZC4gKFczQylcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly9pbmNsdXNpdmVkZXNpZ25wcmluY2lwbGVzLm9yZy8jb2ZmZXItY2hvaWNlXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJPZmZlciBjaG9pY2VcIiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiWWVsbG93LWJsdWUgY29sb3IgYmxpbmRuZXNzXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVvcGxlIHdpdGggbG93ZXJlZCBjb2xvciB2aXNpb24gaGF2ZSBkaWZmaWN1bHR5IGRpc3Rpbmd1aXNoaW5nIHNvbWUgb3IgYWxsIGNvbG9ycy4gWWVsbG93LWJsdWUgY29sb3IgYmxpbmRuZXNzIChUcml0YW5vcGlhKSBpcyByYXJlLiBUaGUgbmFtZSBjYW4gYmUgbWlzbGVhZGluZy4gSXQncyBub3QgdGhlIGNvbG9ycyB5ZWxsb3cgYW5kIGJsdWUgdGhhdCBhcmUgY29uZnVzZWQgYnV0IGJsdWUgd2l0aCBncmVlbiBhbmQgeWVsbG93IHdpdGggcHVycGxlLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiRG8gbm90IHVzZSBjb2xvciBhcyB0aGUgb25seSB3YXkgdG8gY29udmV5IGluZm9ybWF0aW9uLCBpbmRpY2F0ZSBhbiBhY3Rpb24gb3IgaWRlbnRpZnkgYW4gZWxlbWVudC4gRm9yIGV4YW1wbGUsIGRvIG5vdCBtYXJrIGFuIGluY29ycmVjdCBmb3JtIGZpZWxkIHdpdGggYSByZWQgYm9yZGVyIG9ubHksIGFsc28gc3VwcGxlbWVudCB3aXRoIGEgdGV4dCBhbmQgcHJlZmVyYWJseSBhbiBpY29uLlwiLFxyXG7CoMKgwqDCoMKgwqDCoMKgwqDCoFwiQ29uc2lkZXIgb2ZmZXJpbmcgYSBoaWdoIGNvbnRyYXN0IG1vZGUuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9cIjogXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy53My5vcmcvV0FJL1dDQUcyMC9xdWlja3JlZi8jcXItdmlzdWFsLWF1ZGlvLWNvbnRyYXN0LXdpdGhvdXQtY29sb3JcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIldDQUcgMS40LjEgVXNlIG9mIENvbG9yIChXM0MpXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy53My5vcmcvV0FJL1dDQUcyMC9xdWlja3JlZi8jcXItdmlzdWFsLWF1ZGlvLWNvbnRyYXN0LWNvbnRyYXN0XCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJXQ0FHMS40LjMgQ29udHJhc3QgKE1pbmltdW0pIChXM0MpXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy51c2FiaWxpdHkuZ292L2dldC1pbnZvbHZlZC9ibG9nLzIwMTAvMDIvY29sb3ItYmxpbmRuZXNzLmh0bWxcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbG9yIEJsaW5kbmVzcyAmIFdlYiBEZXNpZ24gKFVzYWJpbGl0eS5nb3YpXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL2FjY2Vzc2liaWxpdHkuYmxvZy5nb3YudWsvMjAxNi8wNi8xNy9jb2xvdXItY29udHJhc3Qtd2h5LWRvZXMtaXQtbWF0dGVyL1wiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29sb3VyIGNvbnRyYXN0IC0gd2h5IGRvZXMgaXQgbWF0dGVyPyAoZ292LnVrKVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly9kZXZlbG9wZXIucGFjaWVsbG9ncm91cC5jb20vcmVzb3VyY2VzL2NvbnRyYXN0YW5hbHlzZXIvXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb2xvdXIgQ29udHJhc3QgQW5hbHlzZXJcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuaW5jbHVzaXZlZGVzaWdudG9vbGtpdC5jb20vVUN2aXNpb24vdmlzaW9uLmh0bWwjY29sb3VyXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJFbnN1cmUgc3VmZmljaWVudCBjb250cmFzdFwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmNvbG9yLWJsaW5kbmVzcy5jb20vcmdiLWFub21hbG9zY29wZS1jb2xvci1ibGluZG5lc3MtdGVzdC9cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbG9yIGJsaW5kbmVzcyB0ZXN0XCIgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJSZWQtZ3JlZW4gY29sb3IgYmxpbmRuZXNzXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVvcGxlIHdpdGggbG93ZXJlZCBjb2xvciB2aXNpb24gaGF2ZSBkaWZmaWN1bHR5IGRpc3Rpbmd1aXNoaW5nIHNvbWUgb3IgYWxsIGNvbG9ycy4gUmVkLWdyZWVuIGNvbG9yIGJsaW5kbmVzcyAoUHJvdGFub3BpYSBhbmQgRGV1dGVyYW5vcGlhKSBpcyB0aGUgbW9zdCBjb21tb24gdHlwZSBvZiBjb2xvciBibGluZG5lc3MuIEl0IGlzIG1vcmUgY29tbW9uIGFtb25nIG1lbiB0aGFuIHdvbWVuLiBQZW9wbGUgd2l0aCByZWQtZ3JlZW4gY29sb3IgYmxpbmRuZXNzIGhhdmUgZGlmZmljdWx0eSBkaXN0aW5ndWlzaGluZyB0aGUgY29sb3JzIHJlZCwgZ3JlZW4sIGJyb3duIGFuZCBvcmFuZ2UuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJEbyBub3QgdXNlIGNvbG9yIGFzIHRoZSBvbmx5IHdheSB0byBjb252ZXkgaW5mb3JtYXRpb24sIGluZGljYXRlIGFuIGFjdGlvbiBvciBpZGVudGlmeSBhbiBlbGVtZW50LiBGb3IgZXhhbXBsZSwgZG8gbm90IG1hcmsgYW4gaW5jb3JyZWN0IGZvcm0gZmllbGQgd2l0aCBhIHJlZCBib3JkZXIgb25seSwgYWxzbyBzdXBwbGVtZW50IHdpdGggYSB0ZXh0IGFuZCBwcmVmZXJhYmx5IGFuIGljb24uXCIsXHJcbsKgwqDCoMKgwqDCoMKgwqDCoMKgXCJDb25zaWRlciBvZmZlcmluZyBhIGhpZ2ggY29udHJhc3QgbW9kZS5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcclxuICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly93d3cudzMub3JnL1dBSS9XQ0FHMjAvcXVpY2tyZWYvI3FyLXZpc3VhbC1hdWRpby1jb250cmFzdC13aXRob3V0LWNvbG9yXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJXQ0FHIDEuNC4xIFVzZSBvZiBDb2xvciAoVzNDKVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly93d3cudzMub3JnL1dBSS9XQ0FHMjAvcXVpY2tyZWYvI3FyLXZpc3VhbC1hdWRpby1jb250cmFzdC1jb250cmFzdFwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiV0NBRzEuNC4zIENvbnRyYXN0IChNaW5pbXVtKSAoVzNDKVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly93d3cudXNhYmlsaXR5Lmdvdi9nZXQtaW52b2x2ZWQvYmxvZy8yMDEwLzAyL2NvbG9yLWJsaW5kbmVzcy5odG1sXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb2xvciBCbGluZG5lc3MgJiBXZWIgRGVzaWduIChVc2FiaWxpdHkuZ292KVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly9hY2Nlc3NpYmlsaXR5LmJsb2cuZ292LnVrLzIwMTYvMDYvMTcvY29sb3VyLWNvbnRyYXN0LXdoeS1kb2VzLWl0LW1hdHRlci9cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbG91ciBjb250cmFzdCAtIHdoeSBkb2VzIGl0IG1hdHRlcj8gKGdvdi51aylcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vZGV2ZWxvcGVyLnBhY2llbGxvZ3JvdXAuY29tL3Jlc291cmNlcy9jb250cmFzdGFuYWx5c2VyL1wiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29sb3VyIENvbnRyYXN0IEFuYWx5c2VyXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmluY2x1c2l2ZWRlc2lnbnRvb2xraXQuY29tL1VDdmlzaW9uL3Zpc2lvbi5odG1sI2NvbG91clwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiRW5zdXJlIHN1ZmZpY2llbnQgY29udHJhc3RcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuY29sb3ItYmxpbmRuZXNzLmNvbS9yZ2ItYW5vbWFsb3Njb3BlLWNvbG9yLWJsaW5kbmVzcy10ZXN0L1wiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29sb3IgYmxpbmRuZXNzIHRlc3RcIiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcImZhcnNpZ2h0ZWRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJGYXItc2lnaHRlZG5lc3NcIixcclxuICAgICAgICBcImZhY3RcIjogXCJGYXItc2lnaHRlZG5lc3MgKEh5cGVyb3BpYSkgaXMgb25lIG9mIHRoZSBtb3N0IGNvbW1vbiB2aXN1YWwgaW1wYWlybWVudHMuIFBlb3BsZSB3aXRoIEh5cGVyb3BpYSBoYXZlIGRpZmZpY3VsdHkgZm9jdXNpbmcgb24gb2JqZWN0cyBhdCBjbG9zZSByYW5nZSB3aGljaCBtYWtlcyB0aGVtIGFwcGVhciBibHVycnkuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJBdm9pZCB0ZXh0IGluIHNtYWxsIGZvbnQgc2l6ZXMgYW5kIGxvbmcgdGV4dHMuIFVzZSBwcm9wZXIgc3BhY2luZyBhbmQgbGluZSBoZWlnaHQuXCIsICBcclxuICAgICAgICAgIFwiTWFrZSBzdXJlIHRoZSB3ZWJzaXRlIGNhbiBiZSB6b29tZWQgdG8gYXQgbGVhc3QgMjAwJS5cIixcclxuICAgICAgICAgIFwiT2ZmZXIgYSB0ZXh0IHRvIHNwZWVjaCByZWFkZXIuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9cIjogXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy53My5vcmcvV0FJL1dDQUcyMC9xdWlja3JlZi8/c2hvd3RlY2huaXF1ZXM9MTQ0I3FyLXZpc3VhbC1hdWRpby1jb250cmFzdC1zY2FsZVwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiV0NBRyAxLjQuNCBSZXNpemUgdGV4dCAoVzNDKVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL2luY2x1c2l2ZWRlc2lnbnByaW5jaXBsZXMub3JnLyNwcm92aWRlLWNvbXBhcmFibGUtZXhwZXJpZW5jZVwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiUHJvdmlkZSBjb21wYXJhYmxlIGV4cGVyaWVuY2VcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuaW5jbHVzaXZlZGVzaWdudG9vbGtpdC5jb20vVUN2aXNpb24vdmlzaW9uLmh0bWwjc2hhcGVcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbnNpZGVyIHNpemVcIiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInRvdGFsQ29sb3JCbGluZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlIVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlRvdGFsIGNvbG9yIGJsaW5kbmVzc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBlb3BsZSB3aXRoIGxvd2VyZWQgY29sb3IgdmlzaW9uIGhhdmUgZGlmZmljdWx0eSBkaXN0aW5ndWlzaGluZyBzb21lIG9yIGFsbCBjb2xvcnMuIFRvdGFsIGNvbG9yIGJsaW5kbmVzcyAoTW9ub2Nocm9tYXRpYyAvIEFjaHJvbWF0b3BzeSkgaXMgdmVyeSByYXJlLiBQZW9wbGUgd2l0aCB0aGlzIHZpc3VhbCBpbXBhaXJtZW50IGNhbiBub3QgcGVyY2lldmUgYW55IGNvbG9ycywgb25seSBkaWZmZXJlbnQgc2hhZGVzIG9mIGdyYXkuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJEbyBub3QgdXNlIGNvbG9yIGFzIHRoZSBvbmx5IHdheSB0byBjb252ZXkgaW5mb3JtYXRpb24sIGluZGljYXRlIGFuIGFjdGlvbiBvciBpZGVudGlmeSBhbiBlbGVtZW50LiBGb3IgZXhhbXBsZSwgZG8gbm90IG1hcmsgYW4gaW5jb3JyZWN0IGZvcm0gZmllbGQgd2l0aCBhIHJlZCBib3JkZXIgb25seSwgYWxzbyBzdXBwbGVtZW50IHdpdGggYSB0ZXh0IGFuZCBwcmVmZXJhYmx5IGFuIGljb24uXCIsXHJcbsKgwqDCoMKgwqDCoMKgwqDCoMKgXCJDb25zaWRlciBvZmZlcmluZyBhIGhpZ2ggY29udHJhc3QgbW9kZS5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcclxuICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy53My5vcmcvV0FJL1dDQUcyMC9xdWlja3JlZi8jcXItdmlzdWFsLWF1ZGlvLWNvbnRyYXN0LXdpdGhvdXQtY29sb3JcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIldDQUcgMS40LjEgVXNlIG9mIENvbG9yIChXM0MpXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy53My5vcmcvV0FJL1dDQUcyMC9xdWlja3JlZi8jcXItdmlzdWFsLWF1ZGlvLWNvbnRyYXN0LWNvbnRyYXN0XCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJXQ0FHMS40LjMgQ29udHJhc3QgKE1pbmltdW0pIChXM0MpXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy51c2FiaWxpdHkuZ292L2dldC1pbnZvbHZlZC9ibG9nLzIwMTAvMDIvY29sb3ItYmxpbmRuZXNzLmh0bWxcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbG9yIEJsaW5kbmVzcyAmIFdlYiBEZXNpZ24gKFVzYWJpbGl0eS5nb3YpXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL2FjY2Vzc2liaWxpdHkuYmxvZy5nb3YudWsvMjAxNi8wNi8xNy9jb2xvdXItY29udHJhc3Qtd2h5LWRvZXMtaXQtbWF0dGVyL1wiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29sb3VyIGNvbnRyYXN0IC0gd2h5IGRvZXMgaXQgbWF0dGVyPyAoZ292LnVrKVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly9kZXZlbG9wZXIucGFjaWVsbG9ncm91cC5jb20vcmVzb3VyY2VzL2NvbnRyYXN0YW5hbHlzZXIvXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb2xvdXIgQ29udHJhc3QgQW5hbHlzZXJcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuaW5jbHVzaXZlZGVzaWdudG9vbGtpdC5jb20vVUN2aXNpb24vdmlzaW9uLmh0bWwjY29sb3VyXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJFbnN1cmUgc3VmZmljaWVudCBjb250cmFzdFwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmNvbG9yLWJsaW5kbmVzcy5jb20vcmdiLWFub21hbG9zY29wZS1jb2xvci1ibGluZG5lc3MtdGVzdC9cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbG9yIGJsaW5kbmVzcyB0ZXN0XCIgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuXHJcbiAgICAgIFwidHVubmVsVmlzaW9uXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSEgbW92ZSB0aGUgbW91c2UgcG9pbnRlciBvbiB0aGUgd2ViIHBhZ2UgYW5kIHNlZSB3aGF0J3MgaGFwcGVuaW5nLlwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlR1bm5lbCBWaXNpb25cIixcclxuICAgICAgICBcImZhY3RcIjogXCJXaGF0IGlzIGNvbW1vbmx5IGNhbGxlZCBUdW5uZWwgVmlzaW9uIGlzIGxvc3Mgb2YgcGVyaXBoZXJhbCB2aXNpb24uIFRoaXMgbWF5IGJlIGJlY2F1c2UgdGhlIHBlcnNvbiBzdWZmZXJzIGZyb20gYSBkaXNlYXNlIHRoYXQgYWZmZWN0cyB0aGUgY2VsbHMgaW4gdGhlIGV5ZSwgYnV0IG1heSBhbHNvIG9jY3VyIHRlbXBvcmFyaWx5IGR1ZSB0byBzdHJlc3Mgb3IgZGVwcmVzc2lvbi5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkF2b2lkIHRleHQgaW4gc21hbGwgZm9udCBzaXplcyBhbmQgbG9uZyB0ZXh0cy4gVXNlIHByb3BlciBzcGFjaW5nIGFuZCBsaW5lIGhlaWdodC5cIixcclxuICAgICAgICAgIFwiTWFrZSBzdXJlIHRoZSB3ZWJzaXRlIGNhbiBiZSB6b29tZWQgdG8gYXQgbGVhc3QgMjAwJS5cIixcclxuICAgICAgICAgIFwiT2ZmZXIgYSB0ZXh0IHRvIHNwZWVjaCByZWFkZXIuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9cIjogXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vaW5jbHVzaXZlZGVzaWducHJpbmNpcGxlcy5vcmcvI2dpdmUtY29udHJvbFwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQWxsb3cgem9vbVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL3d3dy5pbmNsdXNpdmVkZXNpZ250b29sa2l0LmNvbS9VQ3Zpc2lvbi92aXNpb24uaHRtbCNsYXlvdXRcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbnNpZGVyIHZpc3VhbCBmaWVsZCBsb3NzXCIgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJzdW5zaGluZVwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiU3Vuc2hpbmVcIixcclxuICAgICAgICBcImZhY3RcIjogXCJBIGxvdCBvZiBwZW9wbGUgaGFzIHRvIHVzZSB0aGVpciBjb21wdXRlcnMgb3V0c2lkZSBpbiBicmlnaHQgc3Vuc2hpbmUuIEl0IGNhbiBtYWtlIGl0IGhhcmRlciB0byBzZWUgd2hhdOKAmXMgb24gdGhlIHNjcmVlbi5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIlByb3ZpZGUgZW5vdWdoIGNvbnRyYXN0IGJldHdlZW4gdGV4dCBhbmQgaXRzIGJhY2tncm91bmQuIFVzZSBhIGNvbnRyYXN0IHJhdGlvIG9mIGF0IGxlYXN0IDQuNToxIGZvciBub3JtYWwgdGV4dCBhbmQgMzoxIGZvciBsYXJnZSB0ZXh0LlwiLFxyXG4gICAgICAgICAgXCJDaGVjayB0aGUgQ29udHJhc3Qgd2l0aCA8ZW0+Q29sb3VyIENvbnRyYXN0IEFuYWx5c2VyPC9lbT4gb3IgPGVtPkNvbnRyYXN0IHJhdGlvPC9lbT4gKHNlZSBsaW5rcyBiZWxvdykuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9cIjogXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL2RldmVsb3Blci5wYWNpZWxsb2dyb3VwLmNvbS9yZXNvdXJjZXMvY29udHJhc3RhbmFseXNlci9cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbG91ciBDb250cmFzdCBBbmFseXNlclwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL2xlYXZlcm91LmdpdGh1Yi5pby9jb250cmFzdC1yYXRpby9cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbnRyYXN0IHJhdGlvXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vaW5jbHVzaXZlZGVzaWducHJpbmNpcGxlcy5vcmcvI2NvbnNpZGVyLXNpdHVhdGlvblwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29uc2lkZXIgc2l0dWF0aW9uXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmluY2x1c2l2ZWRlc2lnbnRvb2xraXQuY29tL1VDdmlzaW9uL3Zpc2lvbi5odG1sI2xpZ2h0aW5nXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb25zaWRlciBsaWdodGluZyBjb25kaXRpb25zXCIgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJjb25jZW50cmF0aW9uXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJDb25jZW50cmF0aW9uXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiRXZlcnlvbmUgY2FuIGhhdmUgYSBoYXJkIHRpbWUgY29uY2VudHJhdGluZywgYnV0IGZvciBzb21lIGl0IGNhbiBiZSBhIGJpZyBwcm9ibGVtIGluIGV2ZXJ5ZGF5IGxpZmUuIERpc2FiaWxpdGllcyBsaWtlIEFESEQgYW5kIEF1dGlzbSBjYW4gY2F1c2UgZGlmZmljdWx0eSBpbiBoYW5kbGluZyBpbXByZXNzaW9ucywgc29ydGluZyBpbmZvcm1hdGlvbiBhbmQgc2Vuc2l0aXZpdHkgdG8gc291bmQuXCIsICAgICAgICBcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkdpdmUgdGhlIHdlYnNpdGUgYSBzaW1wbGUgYW5kIGNsZWFuIGRlc2lnbi5cIixcclxuICAgICAgICAgIFwiQmUgY2FyZWZ1bCB3aXRoIGFuaW1hdGlvbnMgYW5kIHN0cm9uZyBjb2xvcnMuXCIsXHJcbiAgICAgICAgICBcIkF2b2lkIGhhdmluZyB0b28gbXVjaCBjb250ZW50IG9uIHRoZSBzYW1lIHBhZ2UuXCIsXHJcbiAgICAgICAgICBcIk9mZmVyIGltYWdlLCBhdWRpbyBhbmQgdmlkZW8gYWxlcm5hdGl2ZXMgdG8gdGV4dCBjb250ZW50LlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvXCI6IFxyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL2luY2x1c2l2ZWRlc2lnbnByaW5jaXBsZXMub3JnLyNiZS1jb25zaXN0ZW50XCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJCZSBjb25zaXN0ZW50XCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmluY2x1c2l2ZWRlc2lnbnRvb2xraXQuY29tL1VDdGhpbmtpbmcvdGhpbmtpbmcuaHRtbCNpbnRlcmZhY2VfbmF2aWdhdGlvbl9hbmRfbmVzdGVkX21lbnVzXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJBdm9pZCBkZWVwIGhpZXJhcmNoaWVzXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuaW5jbHVzaXZlZGVzaWdudG9vbGtpdC5jb20vVUN0aGlua2luZy90aGlua2luZy5odG1sI3N0cnVjdHVyaW5nX2luZm9ybWF0aW9uXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJSZWR1Y2UgbWVtb3J5IGxvYWRcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuaW5jbHVzaXZlZGVzaWdudG9vbGtpdC5jb20vVUN0aGlua2luZy90aGlua2luZy5odG1sI2F0dGVudGlvblwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQXZvaWQgbXVsdGlwbGUgZm9jdXNlcyBvZiBhdHRlbnRpb25cIiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiU21hbGwgdm9jYWJ1bGFyeVwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkEgbGFyZ2UgcGFydCBvZiB0aGUgd29ybGQncyBwb3B1bGF0aW9uIGNhbid0IHJlYWQgYXQgYWxsIGFuZCBtYW55IGFkdWx0cyBkb24ndCByZWFkIGFzIHdlbGwgYXMgZXhwZWN0ZWQgYWZ0ZXIgZmluaXNoaW5nIGdyYWRlIHNjaG9vbC5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkF2b2lkIGRpZmZpY3VsdCB3b3JkcyBhbmQgdGVybXMuXCIsXHJcbiAgICAgICAgICBcIk9mZmVyIGVhc3kgdG8gcmVhZCB0ZXh0cywgaW1hZ2VzLCB2aWRlbyBvciBhdWRpbyBhbHRlcm5hdGl2ZXMuXCIsXHJcbiAgICAgICAgICBcIk9mZmVyIHRleHRzIGluIGRpZmZlcmVudCBsYW5ndWFnZXMuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9cIjogXHJcbiAgICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy53My5vcmcvVFIvV0NBRzIwLyNtaW5pbWl6ZS1lcnJvclwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiV0NBRyAzLjMgSW5wdXQgQXNzaXN0YW5jZTogSGVscCB1c2VycyBhdm9pZCBhbmQgY29ycmVjdCBtaXN0YWtlcy4gKFczQylcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnczLm9yZy9XQUkvV0NBRzIwL3F1aWNrcmVmLyNxci1uYXZpZ2F0aW9uLW1lY2hhbmlzbXMtcmVmc1wiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiMi40LjQgTGluayBQdXJwb3NlIChJbiBDb250ZXh0KVwiIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBcIlVJXCI6IHtcclxuICAgICAgXCJzZWxlY3RTaW11bGF0aW9uXCI6IFwiU2VsZWN0IHNpbXVsYXRpb246XCIsXHJcbiAgICAgIFwicmVzZXRcIjogXCJSZXNldFwiLFxyXG4gICAgICBcImFkdmljZVwiOiBcIlRoaW5rIGFib3V0IHRoaXNcIixcclxuICAgICAgXCJtb3JlSW5mb1wiOiBcIkxpbmtzIGZvciBiZXR0ZXIgdW5kZXJzdGFuZGluZ1wiLFxyXG4gICAgICBcInNpZ2h0XCI6IFwiU2lnaHRcIixcclxuICAgICAgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6IFwiVG90YWwgY29sb3IgYmxpbmRuZXNzXCIsXHJcbiAgICAgIFwieWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzXCI6IFwiWWVsbG93LUJsdWUgY29sb3IgYmxpbmRuZXNzXCIsICAgIFxyXG4gICAgICBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSZWQtR3JlZW4gY29sb3IgYmxpbmRuZXNzXCIsXHJcbiAgICAgIFwiZmFyc2lnaHRlZG5lc3NcIjogXCJGYXItc2lnaHRlZG5lc3NcIixcclxuICAgICAgXCJ0dW5uZWxWaXNpb25cIjogXCJUdW5uZWwgdmlzaW9uXCIsXHJcbiAgICAgIFwibW9iaWxpdHlcIjogXCJNb2JpbGl0eVwiLFxyXG4gICAgICBcInBhcmtpbnNvbnNcIjogXCJQYXJraW5zb25zXCIsXHJcbiAgICAgIFwicmVhZEFuZFdyaXRlXCI6IFwiUmVhZCBhbmQgd3JpdGVcIixcclxuICAgICAgXCJkeXNsZXhpYVwiOiBcIkR5c2xleGlhXCIsXHJcbiAgICAgIFwic21hbGxWb2NhYnVsYXJ5XCI6IFwiU21hbGwgdm9jYWJ1bGFyeVwiLFxyXG4gICAgICBcImNvbmNlbnRyYXRpb25cIjogXCJDb25jZW50cmF0aW9uXCIsXHJcbiAgICAgIFwiY2hhbmdlU2V0dGluZ3NcIjogXCJDaGFuZ2Ugc2V0dGluZ3NcIixcclxuICAgICAgXCJzZWxlY3RMYW5ndWFnZVwiOiBcIlNlbGVjdCBsYW5ndWFnZVwiLFxyXG4gICAgICBcInNhdmVTZXR0aW5nc1wiOiBcIlNhdmUgc2V0dGluZ3NcIixcclxuICAgICAgXCJjYW5jZWxcIjogXCJDYW5jZWxcIixcclxuICAgICAgXCJzaW11bGF0aW9uc1wiOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiU2lnaHRcIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXHJcbiAgICAgICAgICAgIHsgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6IFwiVG90YWwgY29sb3IgYmxpbmRuZXNzXCIgfSxcclxuICAgICAgICAgICAgeyBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIlllbGxvdy1CbHVlIGNvbG9yIGJsaW5kbmVzc1wiIH0sXHJcbiAgICAgICAgICAgIHsgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6IFwiUmVkLUdyZWVuIGNvbG9yIGJsaW5kbmVzc1wiIH0sXHJcbiAgICAgICAgICAgIHsgXCJmYXJzaWdodGVkbmVzc1wiOiBcIkZhci1zaWdodGVkbmVzc1wiIH0sXHJcbiAgICAgICAgICAgIHsgXCJ0dW5uZWxWaXNpb25cIjogXCJUdW5uZWwgdmlzaW9uXCIgfSxcclxuICAgICAgICAgICAgeyBcInN1bnNoaW5lXCI6IFwiU3Vuc2hpbmVcIiB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJNb2JpbGl0eVwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFsgXHJcbiAgICAgICAgICAgIHsgXCJwYXJraW5zb25zXCI6IFwiUGFya2luc29uc1wiIH1cclxuICAgIFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJSZWFkIGFuZCB3cml0ZVwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtcclxuICAgICAgICAgICAgeyBcImR5c2xleGlhXCI6IFwiRHlzbGV4aWFcIiB9LFxyXG4gICAgICAgICAgICB7IFwic21hbGxWb2NhYnVsYXJ5XCI6IFwiU21hbGwgdm9jYWJ1bGFyeVwiIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIkNvbmNlbnRyYXRpb25cIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiTWVtb3J5XCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW11cclxuICAgICAgICB9XHJcblxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIGxvYWRlZFNpbXVsYXRpb25zID0gW107XG5cbmZ1bmN0aW9uIGxvYWQobmFtZSwgc3ViTmFtZSwgY2FsbGJhY2spIHtcbiAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXSxcbiAgICAgICAgc2NyaXB0RmlsZSA9IHN1Yk5hbWUgPyAnc2ltdWxhdGlvbnMvJyArIG5hbWUgKyAnLycgKyBzdWJOYW1lICsgJy9jb250ZW50LmpzJyA6ICdzaW11bGF0aW9ucy8nICsgbmFtZSArICcvY29udGVudC5qcyc7XG5cbiAgICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KGFjdGl2ZVRhYi5pZCwgeyBmaWxlOiBzY3JpcHRGaWxlIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxvYWRlZFNpbXVsYXRpb25zLnB1c2gobmFtZSk7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sobmFtZSwgc3ViTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdGFydChuYW1lLCBzdWJOYW1lKSB7XG4gIGlmIChsb2FkZWRTaW11bGF0aW9ucy5pbmNsdWRlcyhuYW1lKSkge1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0YXJ0U2ltdWxhdGlvbicsIHNpbXVsYXRpb246IG5hbWUsIHN1YlNpbXVsYXRpb246IHN1Yk5hbWUgfSk7XG5cbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7ICdhY3RpdmVUYWInOiBhY3RpdmVUYWIuaWQgfSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgbG9hZChuYW1lLCBzdWJOYW1lLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RhcnRTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSwgc3ViU2ltdWxhdGlvbjogc3ViTmFtZSB9KTtcblxuICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyAnYWN0aXZlVGFiJzogYWN0aXZlVGFiLmlkIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RvcChuYW1lLCBzdWJOYW1lKSB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RvcFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lLCBzdWJTaW11bGF0aW9uOiBzdWJOYW1lIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0cy5zdGFydCA9IHN0YXJ0O1xuZXhwb3J0cy5zdG9wID0gc3RvcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpbXVsYXRpb25Mb2FkZXIuanMubWFwXG4iXX0=
