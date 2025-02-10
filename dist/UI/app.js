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

  chrome.action.setIcon({
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

    chrome.action.setIcon({
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

    chrome.scripting.executeScript({
      target: {tabId: activeTab.id},
      files: [scriptFile]
    }).then(() => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxVSVxcYXBwLmpzIiwiYnVpbGQvanMvYmFiZWwvVUkvZGF0YS9kYXRhLmpzb24iLCJidWlsZFxcanNcXGJhYmVsXFx1dGlsc1xcc2ltdWxhdGlvbkxvYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLElBQUksUUFBUSxRQUFRLGtCQUFSLENBQVo7O0FBRUEsSUFBSSxlQUFlLHdCQUF3QixLQUF4QixDQUFuQjs7QUFFQSxJQUFJLG9CQUFvQixRQUFRLDhCQUFSLENBQXhCOztBQUVBLElBQUksbUJBQW1CLHdCQUF3QixpQkFBeEIsQ0FBdkI7O0FBRUEsU0FBUyx1QkFBVCxDQUFpQyxHQUFqQyxFQUFzQztBQUFFLE1BQUksT0FBTyxJQUFJLFVBQWYsRUFBMkI7QUFBRSxXQUFPLEdBQVA7QUFBYSxHQUExQyxNQUFnRDtBQUFFLFFBQUksU0FBUyxFQUFiLENBQWlCLElBQUksT0FBTyxJQUFYLEVBQWlCO0FBQUUsV0FBSyxJQUFJLEdBQVQsSUFBZ0IsR0FBaEIsRUFBcUI7QUFBRSxZQUFJLE9BQU8sU0FBUCxDQUFpQixjQUFqQixDQUFnQyxJQUFoQyxDQUFxQyxHQUFyQyxFQUEwQyxHQUExQyxDQUFKLEVBQW9ELE9BQU8sR0FBUCxJQUFjLElBQUksR0FBSixDQUFkO0FBQXlCO0FBQUUsS0FBQyxPQUFPLE9BQVAsR0FBaUIsR0FBakIsQ0FBc0IsT0FBTyxNQUFQO0FBQWdCO0FBQUU7O0FBRTdRLElBQUksT0FBTyxJQUFYOztBQUVBLFNBQVMsZUFBVCxHQUEyQjs7QUFFekIsU0FBTyxPQUFQLENBQWUsS0FBZixDQUFxQixHQUFyQixDQUF5QixrQkFBekIsRUFBNkMsVUFBVSxHQUFWLEVBQWU7QUFDMUQscUJBQWlCLEtBQWpCLENBQXVCLElBQUksZ0JBQTNCO0FBQ0QsR0FGRDtBQUdEOztBQUVELFNBQVMsZUFBVCxDQUF5QixP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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFaLENBQWtCLEVBQUUsUUFBUSxJQUFWLEVBQWdCLGVBQWUsSUFBL0IsRUFBbEIsRUFBeUQsVUFBVSxJQUFWLEVBQWdCO0FBQ3ZFLFlBQUksWUFBWSxLQUFLLENBQUwsQ0FBaEI7O0FBRUEsZUFBTyxJQUFQLENBQVksV0FBWixDQUF3QixVQUFVLEVBQWxDLEVBQXNDLEVBQUUsUUFBUSxpQkFBVixFQUE2QixZQUFZLElBQXpDLEVBQStDLGVBQWUsT0FBOUQsRUFBdEM7O0FBRUEsZUFBTyxPQUFQLENBQWUsS0FBZixDQUFxQixHQUFyQixDQUF5QixFQUFFLGFBQWEsVUFBVSxFQUF6QixFQUF6QjtBQUNELE9BTkQ7QUFPRCxLQVJEO0FBU0Q7QUFDRjs7QUFFRCxTQUFTLElBQVQsQ0FBYyxJQUFkLEVBQW9CLE9BQXBCLEVBQTZCO0FBQzNCLFNBQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsRUFBRSxRQUFRLElBQVYsRUFBZ0IsZUFBZSxJQUEvQixFQUFsQixFQUF5RCxVQUFVLElBQVYsRUFBZ0I7QUFDdkUsUUFBSSxZQUFZLEtBQUssQ0FBTCxDQUFoQjs7QUFFQSxXQUFPLElBQVAsQ0FBWSxXQUFaLENBQXdCLFVBQVUsRUFBbEMsRUFBc0MsRUFBRSxRQUFRLGdCQUFWLEVBQTRCLFlBQVksSUFBeEMsRUFBOEMsZUFBZSxPQUE3RCxFQUF0QztBQUNELEdBSkQ7QUFLRDs7QUFFRCxRQUFRLEtBQVIsR0FBZ0IsS0FBaEI7QUFDQSxRQUFRLElBQVIsR0FBZSxJQUFmO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2RhdGEgPSByZXF1aXJlKCcuL2RhdGEvZGF0YS5qc29uJyk7XG5cbnZhciBsYW5ndWFnZURhdGEgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZGF0YSk7XG5cbnZhciBfc2ltdWxhdGlvbkxvYWRlciA9IHJlcXVpcmUoJy4uL3V0aWxzL3NpbXVsYXRpb25Mb2FkZXIuanMnKTtcblxudmFyIHNpbXVsYXRpb25Mb2FkZXIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfc2ltdWxhdGlvbkxvYWRlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbnZhciBsYW5nID0gXCJlblwiO1xuXG5mdW5jdGlvbiBzdGFydFNpbXVsYXRpb24oKSB7XG5cbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVTaW11bGF0aW9uJywgZnVuY3Rpb24gKG9iaikge1xuICAgIHNpbXVsYXRpb25Mb2FkZXIuc3RhcnQob2JqLmFjdGl2ZVNpbXVsYXRpb24pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVzZXRTaW11bGF0aW9uKHRvb2x0aXApIHtcblxuICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtcbiAgICBwYXRoOiBcImltZy9pY29uLnBuZ1wiXG4gIH0pO1xuXG4gIHRvb2x0aXAucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgJChcIiNwYW5lbDFcIikuYWRkQ2xhc3MoXCJpblwiKTtcbiAgJCgnI3BhbmVsMScpLnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICB0b29sdGlwLmFkZENsYXNzKFwiaGlkZVwiKTtcbiAgfSwgMjUwKTtcblxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2FjdGl2ZVNpbXVsYXRpb24nLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgc2ltdWxhdGlvbkxvYWRlci5zdG9wKG9iai5hY3RpdmVTaW11bGF0aW9uKTtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5yZW1vdmUoJ2FjdGl2ZVNpbXVsYXRpb24nKTtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5yZW1vdmUoJ2FjdGl2ZVRhYicpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0VGV4dHMoKSB7XG5cbiAgdmFyIGRhdGEgPSBsYW5ndWFnZURhdGFbbGFuZ107XG5cbiAgJChcIi5tb3JlLWluZm8tbGlua1wiKS50ZXh0KGRhdGEuVUkubW9yZUluZm8pO1xuICAkKFwiI3Jlc2V0LWJ0blwiKS50ZXh0KGRhdGEuVUkucmVzZXQpO1xuICAkKFwiLm5hdmJhci1oZWFkZXJcIikudGV4dChkYXRhLlVJLnNlbGVjdFNpbXVsYXRpb24pO1xuICAkKFwiI2FkdmljZS1kcm9wZG93blwiKS50ZXh0KGRhdGEuVUkuYWR2aWNlKTtcbiAgJChcIiNpbmZvLWRyb3Bkb3duXCIpLnRleHQoZGF0YS5VSS5tb3JlSW5mbyk7XG4gICQoXCIjc2lnaHRcIikudGV4dChkYXRhLlVJLnNpZ2h0KTtcbiAgJChcIiNtb2JpbGl0eVwiKS50ZXh0KGRhdGEuVUkubW9iaWxpdHkpO1xuICAkKFwiI3JlYWRXcml0ZVwiKS50ZXh0KGRhdGEuVUkucmVhZEFuZFdyaXRlKTtcbiAgJChcIiNjb25jZW50cmF0aW9uXCIpLnRleHQoZGF0YS5VSS5jb25jZW50cmF0aW9uKTtcblxuICAkLmVhY2goZGF0YS5VSS5zaW11bGF0aW9ucywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG5cbiAgICAkKCcjJyArIHZhbHVlLmhlYWRpbmcpLnRleHQodmFsdWUuaGVhZGluZyk7XG5cbiAgICAkLmVhY2godmFsdWUuY2hvaWNlcywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICAgICAgJCgnIycgKyBrZXkpLnRleHQodmFsdWVba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gICQoJyNzZXR0aW5ncy1oZWFkaW5nJykudGV4dChkYXRhLlVJLmNoYW5nZVNldHRpbmdzKTtcbiAgJCgnI2xhbmd1YWdlLWxhYmVsJykudGV4dChkYXRhLlVJLnNlbGVjdExhbmd1YWdlKTtcbiAgJCgnI2J0bi1zYXZlLXNldHRpbmdzJykudGV4dChkYXRhLlVJLnNhdmVTZXR0aW5ncyk7XG4gICQoJyNidG4tY2FuY2VsLXNldHRpbmdzJykudGV4dChkYXRhLlVJLmNhbmNlbCk7XG59XG5cbmZ1bmN0aW9uIHJlYWRNb3JlTGlua3MoKSB7XG5cbiAgdmFyIHJlYWRNb3JlTGluayA9ICQoJy5tb3JlLWluZm8tbGlua3MnKS5maW5kKCdsaScpO1xuXG4gIHJlYWRNb3JlTGluay5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcblxuICAgIHZhciBjdXJyZW50TGluayA9IGV2ZW50LnRhcmdldC5pbm5lclRleHQ7XG5cbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ21vcmVJbmZvJywgZnVuY3Rpb24gKG9iaikge1xuXG4gICAgICAkLmVhY2gob2JqLm1vcmVJbmZvLCBmdW5jdGlvbiAoaSkge1xuICAgICAgICBpZiAoY3VycmVudExpbmsgPT0gb2JqLm1vcmVJbmZvW2ldLm1vcmVJbmZvTGlua1RleHQpIHtcbiAgICAgICAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6ICcnICsgb2JqLm1vcmVJbmZvW2ldLm1vcmVJbmZvVXJsIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldFRvb2x0aXBUZXh0cyhhY3RpdmVTaW11bGF0aW9uKSB7XG5cbiAgdmFyIGRhdGEgPSBsYW5ndWFnZURhdGFbbGFuZ107XG5cbiAgdmFyIHNpbXVsYXRpb25TdGF0dXMgPSAkKFwiLnNpbXVsYXRpb24tc3RhcnRlZC1wYXJhZ3JhcGhcIik7XG4gIHZhciBzaW11bGF0aW9uU3RhdHVzQWxlcnQgPSAkKFwiLnNpbXVsYXRpb24tc3RhcnRlZC1hbGVydFwiKTtcbiAgdmFyIGluZm9IZWFkaW5nID0gJChcIi5kaXNhYmlsaXR5LWluZm8taGVhZGluZ1wiKTtcbiAgdmFyIGluZm9QYXJhZ3JhcGggPSAkKFwiLmRpc2FiaWxpdHktaW5mby1wYXJhZ3JhcGhcIik7XG4gIHZhciBhZHZpY2VMaXN0ID0gJChcIi5hZHZpY2UtbGlzdFwiKTtcbiAgdmFyIG1vcmVJbmZvTGlua3MgPSAkKFwiLm1vcmUtaW5mby1saW5rc1wiKTtcbiAgdmFyIG1vcmVJbmZvUGFuZWwgPSAkKCcjbW9yZS1pbmZvLXBhbmVsJyk7XG4gIHZhciB0ZXh0cyA9IGRhdGEuZmFjdHNbYWN0aXZlU2ltdWxhdGlvbl07XG5cbiAgc2ltdWxhdGlvblN0YXR1cy5lbXB0eSgpO1xuICBpbmZvSGVhZGluZy5lbXB0eSgpO1xuICBpbmZvUGFyYWdyYXBoLmVtcHR5KCk7XG4gIGFkdmljZUxpc3QuZW1wdHkoKTtcbiAgbW9yZUluZm9MaW5rcy5lbXB0eSgpO1xuXG4gIHNpbXVsYXRpb25TdGF0dXMudGV4dCh0ZXh0cy5zaW11bGF0aW9uU3RhdHVzKTtcbiAgc2ltdWxhdGlvblN0YXR1c0FsZXJ0LnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcblxuICBpbmZvSGVhZGluZy50ZXh0KHRleHRzLmhlYWRpbmcpO1xuICBpbmZvUGFyYWdyYXBoLnRleHQodGV4dHMuZmFjdCk7XG5cbiAgJC5lYWNoKHRleHRzLmxpc3RJdGVtcywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG4gICAgYWR2aWNlTGlzdC5hcHBlbmQoJzxsaT4nICsgdmFsdWUgKyAnPC9saT4nKTtcbiAgfSk7XG5cbiAgaWYgKHRleHRzLm1vcmVJbmZvICE9PSB1bmRlZmluZWQpIHtcbiAgICBtb3JlSW5mb1BhbmVsLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuXG4gICAgJC5lYWNoKHRleHRzLm1vcmVJbmZvLCBmdW5jdGlvbiAoaSkge1xuICAgICAgbW9yZUluZm9MaW5rcy5hcHBlbmQoJzxsaT48YT4nICsgdGV4dHMubW9yZUluZm9baV0ubW9yZUluZm9MaW5rVGV4dCArICc8L2E+PC9saT4nKTtcbiAgICB9KTtcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyAnbW9yZUluZm8nOiB0ZXh0cy5tb3JlSW5mbyB9KTtcbiAgfSBlbHNlIHtcbiAgICBtb3JlSW5mb1BhbmVsLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICB9XG59XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblxuICB2YXIgdG9vbHRpcCA9ICQoXCIudG9vbC10aXBcIik7XG5cbiAgdmFyIGFjdGl2ZVNpbXVsYXRpb24gPSB2b2lkIDA7XG5cbiAgbGFuZyA9ICdlbic7XG5cbiAgc2V0VGV4dHMoKTtcblxuICAvLyBTZXQgYWN0aXZlIHN0YXRlXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlU2ltdWxhdGlvbicsIGZ1bmN0aW9uIChvYmopIHtcblxuICAgIGFjdGl2ZVNpbXVsYXRpb24gPSBvYmouYWN0aXZlU2ltdWxhdGlvbjtcblxuICAgIGlmIChhY3RpdmVTaW11bGF0aW9uKSB7XG4gICAgICB0b29sdGlwLmFkZENsYXNzKFwiaW5cIikucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuICAgICAgJCgnI3BhbmVsMScpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgICBzZXRUb29sdGlwVGV4dHMoYWN0aXZlU2ltdWxhdGlvbik7XG4gICAgICByZWFkTW9yZUxpbmtzKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBNYWluIHZpZXdcbiAgJChcIi5tZW51LWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgbWVudUJ0biA9ICQodGhpcyk7XG4gICAgdmFyIG1lbnVCdG5JZCA9IG1lbnVCdG5bMF0uaWQ7XG5cbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtcbiAgICAgIHBhdGg6IFwiaW1nL2ljb25fYWN0aXZlLnBuZ1wiXG4gICAgfSk7XG5cbiAgICBhY3RpdmVTaW11bGF0aW9uID0gbWVudUJ0bklkO1xuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7ICdhY3RpdmVTaW11bGF0aW9uJzogbWVudUJ0bklkIH0pO1xuXG4gICAgc2V0VG9vbHRpcFRleHRzKGFjdGl2ZVNpbXVsYXRpb24pO1xuXG4gICAgJCgnI3BhbmVsMScpLnJlbW92ZUNsYXNzKFwiaW5cIik7XG4gICAgJCgnI3BhbmVsMScpLmFkZENsYXNzKFwiaGlkZVwiKTtcbiAgICAkKCcjcGFuZWwyJykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuICAgIHRvb2x0aXAucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwyJykuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICB9LCAxMDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzdGFydFNpbXVsYXRpb24oKTtcbiAgICB9LCA1MDApO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcjcGFuZWwyJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAgIHRvb2x0aXAuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICB9LCAxMDAwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMicpLmFkZENsYXNzKFwiaGlkZVwiKTtcbiAgICB9LCAxNTAwKTtcblxuICAgIHJlYWRNb3JlTGlua3MoKTtcbiAgfSk7XG5cbiAgJChcIi5naXRodWItbGlua1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiAnaHR0cHM6Ly9naXRodWIuY29tL01ldGFtYXRyaXgvV2ViLURpc2FiaWxpdHktU2ltdWxhdG9yJyB9KTtcbiAgfSk7XG5cbiAgJCgnLnNldHRpbmdzLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnbGFuZycsIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICQoJyNsYW5ndWFnZScpLnZhbChvYmoubGFuZyk7XG4gICAgfSk7XG5cbiAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcbiAgICAkKCcjc2V0dGluZ3MnKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJyNzZXR0aW5ncycpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgfSwgMjUwKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgJCgnI3BhbmVsMScpLmFkZENsYXNzKFwiaGlkZVwiKTtcbiAgICB9LCA1MDApO1xuICB9KTtcblxuICAvLyBTZXR0aW5ncyB2aWV3XG5cbiAgLyogJCgnI2J0bi1zYXZlLXNldHRpbmdzJykub24oJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgXG4gICAgIHZhciBzZWxlY3RlZExhbmcgPSAkKCcjbGFuZ3VhZ2UnKS52YWwoKTtcclxuICBcbiAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsnbGFuZyc6IHNlbGVjdGVkTGFuZ30pO1xyXG4gIFxuICAgICBsYW5nID0gc2VsZWN0ZWRMYW5nO1xyXG4gIFxuICAgICBzZXRUZXh0cygpO1xyXG4gIFxuICAgICAkKCcjc2V0dGluZ3MnKS5yZW1vdmVDbGFzcyhcImluXCIpO1xyXG4gICAgICQoJyNwYW5lbDEnKS5yZW1vdmVDbGFzcyhcImhpZGVcIik7XHJcbiAgXG4gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgJCgnI3BhbmVsMScpLmFkZENsYXNzKFwiaW5cIik7XHJcbiAgICAgfSwgNTAwKTtcclxuICBcbiAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAkKCcjc2V0dGluZ3MnKS5hZGRDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgfSwgNzUwKTtcclxuICBcbiAgIH0pO1xyXG4gIFxuICAgJCgnI2J0bi1jYW5jZWwtc2V0dGluZ3MnKS5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICBcbiAgICAgJCgnI3NldHRpbmdzJykucmVtb3ZlQ2xhc3MoXCJpblwiKTtcclxuICAgICAkKCcjcGFuZWwxJykucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xyXG4gIFxuICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICQoJyNwYW5lbDEnKS5hZGRDbGFzcyhcImluXCIpO1xyXG4gICAgIH0sIDI1MCk7XHJcbiAgXG4gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgJCgnI3NldHRpbmdzJykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgIH0sIDUwMCk7XHJcbiAgXG4gICB9KTsqL1xuXG4gIC8vIFRvb2x0aXAgdmlld1xuXG4gICQoXCIuc2ltdWxhdGlvbi1zdGFydGVkLWFsZXJ0IC5jbG9zZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJChcIi5zaW11bGF0aW9uLXN0YXJ0ZWQtYWxlcnRcIikuYWRkQ2xhc3MoXCJoaWRlXCIpO1xuICB9KTtcblxuICAkKFwiI3Jlc2V0LWJ0blwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgcmVzZXRTaW11bGF0aW9uKHRvb2x0aXApO1xuICB9KTtcblxuICAvL3BhbmVsIGNvbGxhcHNlXG5cbiAgJCgnI215Q29sbGFwc2libGUnKS5vbignc2hvd24uYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gZG8gc29tZXRoaW5n4oCmXG4gIH0pO1xuXG4gIC8vcGFuZWwgY29sbGFwc2UsIHNob3cgYXJyb3dzOiBcbiAgJCgnLmNvbGxhcHNlJykub24oJ3Nob3duLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucGFyZW50KCkuZmluZChcIi5kb3duLWFycm93XCIpLmNzcygndHJhbnNmb3JtJywgJ3JvdGF0ZSgtMTgwZGVnKScpO1xuICB9KS5vbignaGlkZGVuLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucGFyZW50KCkuZmluZChcIi5kb3duLWFycm93XCIpLmNzcygndHJhbnNmb3JtJywgJ3JvdGF0ZSgtMzYwZGVnKScpO1xuICB9KTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHM9e1xyXG4gIFwic3ZcIjpcclxuICB7XHJcbiAgICBcImZhY3RzXCI6IHtcclxuICAgICAgXCJkeXNsZXhpYVwiOiBcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiRHlzbGV4aVwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkR5c2xleGkgw6RyIGVuIG5lZHPDpHR0bmluZyBzb20gZ8O2ciBhdHQgaGrDpHJuYW4gaGFyIHN2w6VydCBhdHQgYXV0b21hdGlzZXJhIHRvbGtuaW5nZW4gYXYgb3JkLiBEZXR0YSBnw7ZyIGF0dCBwZXJzb25lciBtZWQgZGVubmEgbmVkc8OkdHRuaW5nIGthbiBoYSBzdsOlcnQgYXR0IGzDpHNhIG9jaCBza3JpdmEuIER5c2xleGkgw6RyIGludGUga29wcGxhdCB0aWxsIHN5biBlbGxlciBpbnRlbGxpZ2Vucy4gT3JzYWtlcm5hIHRpbGwgZHlzbGV4aSDDpHIgZm9ydGZhcmFuZGUgb2tsYXJ0LlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiVW5kdmlrIHRleHQgaSBsaXRlbiBzdG9ybGVrIG9jaCBsw6VuZ2EgdGV4dGVyLiBTZSB0aWxsIGF0dCBoYSBvcmRlbnRsaWd0IG1lZCByYWRhdnN0w6VuZC5cIiwgXHRcclxuICAgICAgICAgIFwiVW5kdmlrIHN2w6VyYSBvcmQgb2NoIGZhY2t0ZXJtZXIuXCIsXHJcbiAgICAgICAgICBcIkVyYmp1ZCBsw6R0dGzDpHN0YSB2ZXJzaW9uZXIgYXYgZmFja3RleHRlci5cIixcclxuICAgICAgICAgIFwiVW5kdmlrIHR5cHNuaXR0IG1lZCBrcsOlbmdsaWdhIG9jaCBrb21wbGV4YSBmaWd1cmVyLlwiXHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGFya2luc29uc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiEgcsO2ciBtdXNwZWthcmVuIHDDpSB3ZWJicGxhdHNlbiBvY2ggc2UgdmFkIHNvbSBow6RuZGVyLlwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlBhcmtpbnNvbnNcIixcclxuICAgICAgICBcImZhY3RcIjogXCJWaWQgUGFya2luc29ucyBzanVrZG9tIGbDtnJzdMO2cnMgY2VsbGVybmEgaSBoasOkcm5hbiBzb20gdGlsbHZlcmthciBkb3BhbWluIHZpbGtldCBnw7ZyIGF0dCBoasOkcm5hbiBmw6VyIGVuIG5lZHNhdHQgZsO2cm3DpWdhIGF0dCBza2lja2Egc2lnbmFsZXIuIFBlcnNvbmVyIG1lZCBQYXJraW5zb25zIGthbiBkcmFiYmFzIGF2IHN5bXB0b20gc29tIHNrYWtuaW5nYXIsIHN0ZWxhIG11c2tsZXIgb2NoIHPDpG1yZSByw7ZyZWxzZWbDtnJtw6VnYS4gT3JzYWtlcm5hIHRpbGwgUGFya2luc29ucyBzanVrZG9tIMOkciBmb3J0ZmFyYW5kZSBva2xhcnQuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJTZSB0aWxsIGF0dCB3ZWJicGxhdHNlbiBrYW4gYW52w6RuZGFzIG1lZCBhbmRyYSBoasOkbHBtZWRlbCDDpG4gbXVzLCB0aWxsIGV4ZW1wZWwgdGFuZ2VudGJvcmRzbmF2aWdlcmluZy5cIiwgXHRcclxuICAgICAgICAgIFwiSGEgdGlsbHLDpGNrbGlndCBtZWQgbHVmdCBtZWxsYW4ga29tcG9uZW50ZXJcIixcclxuICAgICAgICAgIFwiSGEgdGlsbHLDpGNrbGlndCBzdG9yYSBrbGlja3l0b3IuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9VcmxzXCI6IFwiaHR0cDovL3d3dy5wYXJraW5zb25mb3JidW5kZXQuc2VcIixcclxuICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIiA6IFwiUGFya2luc29uc2bDtnJidW5kZXRcIlxyXG4gICAgICB9LFxyXG4gICAgICBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0XCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVyc29uZXIgbWVkIGRlZmVrdCBmw6RyZ3NlZW5kZSBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHRhcHBhciBzb20gdGFyIHVwcCBmw6RyZ2VybmEgdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE7DpHIgZW4gZWxsZXIgZmxlcmEgYXYgdGFwcGFybmEgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhIGxlZGVyIGRldCB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZS4gR3VsLWJsw6UgZsOkcmdibGluZGhldCAoVHJpdGFub3BpKSDDpHIgc8OkbGxzeW50LiBOYW1uZXQgw6RyIG1pc3NsZWRhbmRlIGTDpSBkZXQgaW50ZSDDpHIgZsOkcmdlcm5hIGd1bCBvY2ggYmzDpSBzb20gZsO2cnbDpHhsYXMsIHV0YW4gYmzDpSBtZWQgZ3LDtm4gb2NoIGd1bCBtZWQgbGlsYS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZGV0IGVuZGEgc8OkdHRldCBhdHQgZsO2cm1lZGxhIGluZm9ybWF0aW9uLCBpbmRpa2VyYSBlbiBoYW5kbGluZyBlbGxlciBpZGVudGlmaWVyYSBldHQgZWxlbWVudC4gTWFya2VyYSB0aWxsIGV4ZW1wZWwgaW50ZSBldHQgZmVsYWt0aWd0IGZvcm11bMOkcmbDpGx0IGVuZGFzdCBtZWQgZW4gcsO2ZCByYW0gdXRhbiBrb21wbGV0dGVyYSDDpHZlbiBtZWQgdGV4dCBvY2ggZ8Okcm5hIGVuIGlrb24uXCIsIFx0XHJcbiAgICAgICAgICBcIkVyYmp1ZCBnw6RybmEgZXR0IGjDtmdrb250cmFzdC1sw6RnZS5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1VybHNcIjogXCJodHRwczovL3N2Lndpa2lwZWRpYS5vcmcvd2lraS9EZWZla3RfZiVDMyVBNHJnc2VlbmRlXCIsXHJcbiAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCIgOiBcIldpa2lwZWRpYSBvbSBkZWZla3QgZsOkcmdzZWVuZGVcIlxyXG4gICAgICB9LFxyXG4gICAgICBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiUsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0XCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiUGVyc29uZXIgbWVkIGRlZmVrdCBmw6RyZ3NlZW5kZSBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIHZpc3NhIGVsbGVyIGFsbGEgZsOkcmdlci4gRXR0IGZ1bGx0IGZ1bmdlcmFuZGUgw7ZnYSBoYXIgdHJlIG9saWthIHRhcHBhciBzb20gdGFyIHVwcCBmw6RyZ2VybmEgdmlvbGV0dCwgZ3LDtm4gb2NoIHLDtmQuIE7DpHIgZW4gZWxsZXIgZmxlcmEgYXYgdGFwcGFybmEgc2FrbmFzIGVsbGVyIMOkciBkZWZla3RhIGxlZGVyIGRldCB0aWxsIGRlZmVrdCBmw6RyZ3NlZW5kZS4gUsO2ZC1ncsO2biBmw6RyZ2JsaW5kaGV0IChQcm90YW5vcGkgb2NoIERldXRlcmFub3BpKSDDpHIgZGVuIHZhbmxpZ2FzdGUgdHlwZW4gYXYgZsOkcmdibGluZGhldC4gRGVuIMOkciB2YW5saWdhcmUgaG9zIG3DpG4gw6RuIGt2aW5ub3IuIFBlcnNvbmVyIHLDtmQtZ3LDtm4gZsOkcmdibGluZGhldCBoYXIgc3bDpXJ0IGF0dCBza2lsamEgcMOlIGbDpHJnZXJuYSByw7ZkLCBncsO2biwgYnJ1biBvY2ggb3JhbmdlLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFxyXG4gICAgICAgIFtcIkFudsOkbmQgaW50ZSBmw6RyZyBzb20gZW5kYSBzw6R0dGV0IGF0dCBmw7ZybWVkbGEgaW5mb3JtYXRpb24sIGluZGlrZXJhIGVuIGhhbmRsaW5nIGVsbGVyIGlkZW50aWZpZXJhIGV0dCBlbGVtZW50LiBNYXJrZXJhIHRpbGwgZXhlbXBlbCBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCByw7ZkIHJhbSwga29tcGxldHRlcmEgw6R2ZW4gbWVkIHRleHQgb2NoIGfDpHJuYSBlbiAgaWtvbi5cIiwgXCJFcmJqdWQgZ8Okcm5hIGV0dCBow7Zna29udHJhc3QtbMOkZ2UuXCJdLFxyXG4gICAgICAgIFwibW9yZUluZm9VcmxzXCI6IFwiaHR0cHM6Ly9zdi53aWtpcGVkaWEub3JnL3dpa2kvRGVmZWt0X2YlQzMlQTRyZ3NlZW5kZVwiLFxyXG4gICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJXaWtpcGVkaWEgb20gZGVmZWt0IGbDpHJnc2VlbmRlXCJcclxuICAgICAgfSxcclxuICAgICAgXCJmYXJzaWdodGVkbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJMw6VuZ3N5bnRoZXRcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZXJzb25lciBtZWQgSHlwZXJvcGkgc2VyIHN1ZGRpZ3QgcMOlIG7DpHJhIGjDpWxsLCBtZW4gYnJhIHDDpSBsw6VuZ3QgaMOlbGwuIE5lZHPDpHR0bmluZ2VuIHVwcHN0w6VyIHDDpSBncnVuZCBhdiBhdHQgbGp1c2V0IGludGUgYnJ5dHMgcsOkdHQgaSDDtmdhdC4gRGV0IMOkciBlbiBhdiBkZSB2YW5saWdhc3RlIHN5bm5lZHPDpHR0bmluZ2FybmEuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJVbmR2aWsgdGV4dCBpIGxpdGVuIHN0b3JsZWsuXCIsIFx0XHJcbiAgICAgICAgICBcIldlYmJzaWRhbiBza2EgZ8OlIGF0dCBmw7Zyc3RvcmEgKHpvb21hcykgdGlsbCBtaW5zdCAyMDAgJSBzw6UgYXR0IGJlc8O2a2FyZW4ga2FuIGFucGFzc2EgaW5uZWjDpWxsZXRzIHN0b3JsZWsgZWZ0ZXIgc2luYSBiZWhvdi5cIixcclxuICAgICAgICAgIFwiRXJianVkIHVwcGzDpHNuaW5nIGF2IGlubmVow6VsbGV0LlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvVXJsc1wiOiBcImh0dHBzOi8vd2ViYnJpa3RsaW5qZXIuc2Uvci8zOS1nZS13ZWJicGxhdHNlbi1lbi1nb2QtbGFzYmFyaGV0L1wiLFxyXG4gICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiIDogXCJXZWJicmlrdGxpbmplIEdlIHdlYmJwbGF0c2VuIGdvZCBsw6RzYmFyaGV0XCJcclxuICAgICAgfSxcclxuICAgICAgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2IVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIkhlbHQgZsOkcmdibGluZFwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkRlZmVrdCBmw6RyZ3NlZW5kZSBpbm5lYsOkciBhdHQgZW4gcGVyc29uIGhhciBzdsOlcnQgYXR0IHNraWxqYSBww6Ugdmlzc2EgZWxsZXIgYWxsYSBmw6RyZ2VyLiBFdHQgZnVsbHQgZnVuZ2VyYW5kZSDDtmdhIGhhciB0cmUgb2xpa2EgdHlwZXIgYXYgdGFwcGFyIHNvbSB0YXIgdXBwIG9saWthIGbDpHJnZXI6IHZpb2xldHQsIGdyw7ZuIG9jaCByw7ZkLiBPcnNha2VuIHRpbGwgZGVmZWt0IGbDpHJnc2VlbmRlIMOkciBhdHQgZW4gZWxsZXIgZmxlcmEgYXYgZGVzc2EgdHlwZXIgYXYgdGFwcGFyIHNha25hcyBlbGxlciDDpHIgZGVmZWt0YS4gSGVsdCBmw6RyZ2JsaW5kIChNb25va3JvbWFzaS9ha3JvbWF0b3BzaSkgw6RyIG15Y2tldCBzw6RsbHN5bnQuIFBlcnNvbmVyIG1lZCBkZW5uYSBzeW5uZWRzw6R0dG5pbmcgc2VyIGluZ2EgZsOkcmdlciB1dGFuIHNlciBlbmRhc3QgaSBncsOlc2thbGEuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJBbnbDpG5kIGludGUgZsOkcmcgc29tIGRldCBlbmRhIHPDpHR0ZXQgYXR0IGbDtnJtZWRsYSBpbmZvcm1hdGlvbiwgaW5kaWtlcmEgZW4gaGFuZGxpbmcgZWxsZXIgaWRlbnRpZmllcmEgZWxlbWVudC4gTWFya2VyYSB0LmV4LiBpbnRlIGV0dCBmZWxha3RpZ3QgZm9ybXVsw6RyZsOkbHQgZW5kYXN0IG1lZCByw7ZkIHJhbSwga29tcGxldHRlcmEgw6R2ZW4gbWVkIHRleHQgZWxsZXIgaWtvbi5cIiwgXHRcclxuICAgICAgICAgIFwiRGV0IGthbiB2YXJhIGVuIGJyYSBpZMOpIGF0dCBlcmJqdWRhIGV0dCBow7Zna29udHJhc3QtbMOkZ2UuXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwidHVubmVsVmlzaW9uXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGVyaW5nIGFrdGl2ISByw7ZyIG11c3Bla2FyZW4gcMOlIHdlYmJwbGF0c2VuIG9jaCBzZSB2YWQgc29tIGjDpG5kZXIuXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiVHVubmVsc2VlbmRlXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiRGV0IHNvbSBpIGRhZ2xpZ3QgdGFsIGJydWthciBrYWxsYXMgdHVubmVsc2VlbmRlIMOkciBlbiBzeW5uZWRzw6R0dG5pbmcgc29tIGfDtnIgYXR0IGVuZGFzdCBlbiBkZWwgYXYgc3luZsOkbHRldCBrYW4gc2VzLiBEZXR0YSBrYW4gYmVybyBww6UgYXR0IHBlcnNvbmVuIGxpZGVyIGF2IGVuIHNqdWtkb20gc29tIGfDtnIgYXR0IGNlbGxlcm5hIGkgw7ZnYXQgZsO2cnN0w7ZycyBtZW4gZGVubmEgdHlwIGF2IHN5bm5lZHPDpHR0bmluZyBrYW4gb2Nrc8OlIHRpbGxmw6RsbGlndCB1cHBzdMOlIHDDpSBncnVuZCBhdiBzdHJlc3MgZWxsZXIgZGVwcmVzc2lvbi5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIlVuZHZpayB0ZXh0IGkgbGl0ZW4gc3Rvcmxlay5cIixcclxuICAgICAgICAgIFwiV2ViYnNpZGFuIHNrYSBnw6UgYXR0IGbDtnJzdG9yYSAoem9vbWFzKSB0aWxsIG1pbnN0IDIwMCAlIHPDpSBhdHQgYmVzw7ZrYXJlbiBrYW4gYW5wYXNzYSBpbm5laMOlbGxldHMgc3RvcmxlayBlZnRlciBzaW5hIGJlaG92LlwiLFxyXG4gICAgICAgICAgXCJFcmJqdWQgdXBwbMOkc25pbmcgYXYgaW5uZWjDpWxsZXQuXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwic3Vuc2hpbmVcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiU29sc2tlblwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkxvcmVtIGlwc3VtXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJMb3JlbSBpcHN1bS5cIixcclxuICAgICAgICAgIFwiTG9yZW0gaXBzdW0uXCIsXHJcbiAgICAgICAgICBcIkxvcmVtIGlwc3VtXCJcclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiY29uY2VudHJhdGlvblwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxlcmluZyBha3RpdiFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJLb25jZW50cmF0aW9uXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiQWxsYSBrYW4gaGEgc3bDpXJ0IGF0dCBrb25jZW50cmVyYSBzaWcgbWVuIGbDtnIgdmlzc2Ega2FuIGRldCBibGkgZXR0IHN0b3J0IHByb2JsZW0gaSB2YXJkYWdzbGl2ZXQuIERlc3NhIGZ1bmt0aW9uc25lZHPDpHR0bmluZ2FyIGthbiBvcnNha2Egc3bDpXJpZ2hldGVyIG1lZCBhdHQgaGFudGVyYSBpbnRyeWNrLCBzb3J0ZXJhIGluZm9ybWF0aW9uIG9jaCBsanVka8OkbnNsaWdoZXQuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJHZSB3ZWJicGxhdHNlbiBlbiBlbmtlbCBvY2ggbHVmdGlnIGRlc2lnbi5cIixcclxuICAgICAgICAgIFwiVmFyIGbDtnJzaWt0aWcgbWVkIGFuaW1hdGlvbmVyIG9jaCBzdGFya2EgZsOkcmdlci5cIixcclxuICAgICAgICAgIFwiVW5kdmlrIGF0dCBoYSBmw7ZyIG15Y2tldCBpbm5laMOlbGwgcMOlIHNhbW1hIHNpZGEuXCIsXHJcbiAgICAgICAgICBcIkVyYmp1ZCBsanVkLSBvY2ggdmlkZW8tYWxlcm5hdGl2IHRpbGwgdGV4dGlubmVow6VsbC5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJzbWFsbFZvY2FidWxhcnlcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsZXJpbmcgYWt0aXYhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiTGl0ZXQgb3JkZsO2cnLDpWRcIixcclxuICAgICAgICBcImZhY3RcIjogXCJFbiBzdG9yIGRlbCBhdiBqb3JkZW5zIGJlZm9sa25pbmcga2FuIGludGUgbMOkc2EgYWxscyBvY2ggbcOlbmdhIHZ1eG5hIGzDpHNlciBpbnRlIHPDpSBicmEgc29tIGbDtnJ2w6RudGFzIGVmdGVyIGdydW5kc2tvbGV1dGJpbGRuaW5nZW4uXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJVbmR2aWsga3LDpW5nbGlnYSBvcmQgb2NoIGZhY2t0ZXJtZXIuXCIsICAgXHJcbiAgICAgICAgICBcIkVyYmp1ZCBsw6R0dGzDpHN0IHZlcnNpb24gYXYga3LDpW5nbGlnYSB0ZXh0ZXIuXCIsXHJcbiAgICAgICAgICBcIkVyYmp1ZCB0ZXh0ZXIgcMOlIG9saWthIHNwcsOlay5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFwiVUlcIjoge1xyXG4gICAgICBcInNlbGVjdFNpbXVsYXRpb25cIjogXCJWw6RsaiBzaW11bGVyaW5nOlwiLFxyXG4gICAgICBcInJlc2V0XCI6IFwiw4V0ZXJzdMOkbGxcIixcclxuICAgICAgXCJhZHZpY2VcIjogXCJUw6RuayBww6UgZGV0dGFcIixcclxuICAgICAgXCJtb3JlSW5mb1wiOiBcIk1lciBpbmZvcm1hdGlvblwiLFxyXG4gICAgICBcInNpZ2h0XCI6IFwiU3luXCIsXHJcbiAgICAgIFwidG90YWxDb2xvckJsaW5kbmVzc1wiOiBcIkhlbHQgZsOkcmdibGluZFwiLFxyXG4gICAgICBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIkd1bC1ibMOlIGbDpHJnYmxpbmRoZXRcIiwgICAgXHJcbiAgICAgIFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOiBcIlLDtmQtZ3LDtm4gZsOkcmdibGluZGhldFwiLFxyXG4gICAgICBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiTMOlbmdzeW50aGV0LCDDtnZlcnN5bnRoZXRcIixcclxuICAgICAgXCJ0dW5uZWxWaXNpb25cIjogXCJUdW5uZWxzZWVuZGVcIixcclxuICAgICAgXCJtb2JpbGl0eVwiOiBcIk1vdG9yaWtcIixcclxuICAgICAgXCJwYXJraW5zb25zXCI6IFwiUGFya2luc29uc1wiLFxyXG4gICAgICBcInJlYWRBbmRXcml0ZVwiOiBcIkzDpHNhIG9jaCBza3JpdmFcIixcclxuICAgICAgXCJkeXNsZXhpYVwiOiBcIkR5c2xleGlcIixcclxuICAgICAgXCJzbWFsbFZvY2FidWxhcnlcIjogXCJMaXRldCBvcmRmw7ZycsOlZFwiLFxyXG4gICAgICBcImNvbmNlbnRyYXRpb25cIjogXCJLb25jZW50cmF0aW9uXCIsXHJcbiAgICAgIFwiY2hhbmdlU2V0dGluZ3NcIjogXCJDaGFuZ2Ugc2V0dGluZ3NcIixcclxuICAgICAgXCJzZWxlY3RMYW5ndWFnZVwiOiBcIlNlbGVjdCBsYW5ndWFnZVwiLFxyXG4gICAgICBcInNhdmVTZXR0aW5nc1wiOiBcIlNhdmUgc2V0dGluZ3NcIixcclxuICAgICAgXCJjYW5jZWxcIjogXCJDYW5jZWxcIixcclxuICAgICAgXCJzaW11bGF0aW9uc1wiOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiU3luXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgICB7IFwidG90YWxDb2xvckJsaW5kbmVzc1wiOiBcIkhlbHQgZsOkcmdibGluZFwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjogXCJHdWwtYmzDpSBmw6RyZ2JsaW5kaGV0XCIgfSxcclxuICAgICAgICAgICAgeyBcInJlZEdyZWVuQ29sb3JCbGluZG5lc3NcIjogXCJSw7ZkLWdyw7ZuIGbDpHJnYmxpbmRoZXRcIiB9LFxyXG4gICAgICAgICAgICB7IFwiZmFyc2lnaHRlZG5lc3NcIjogXCJMw6VuZ3N5bnRoZXQsIMO2dmVyc3ludGhldFwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJ0dW5uZWxWaXNpb25cIjogXCJUdW5uZWxzZWVuZGVcIiB9LFxyXG4gICAgICAgICAgICB7IFwic3Vuc2hpbmVcIjogXCJTb2xza2VuXCIgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiTW90b3Jpa1wiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFsgXHJcbiAgICAgICAgICAgIHsgXCJwYXJraW5zb25zXCI6IFwiUGFya2luc29uc1wiIH1cclxuICAgIFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJMw6RzYSBvY2ggc2tyaXZhXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgICB7IFwiZHlzbGV4aWFcIjogXCJEeXNsZXhpXCIgfSxcclxuICAgICAgICAgICAgeyBcInNtYWxsVm9jYWJ1bGFyeVwiOiBcIkxpdGV0IG9yZGbDtnJyw6VkXCIgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiS29uY2VudHJhdGlvblwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJNaW5uZVwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgXCJlblwiOlxyXG4gIHtcclxuICAgIFwiZmFjdHNcIjoge1xyXG4gICAgICBcImR5c2xleGlhXCI6IFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiRHlzbGV4aWFcIixcclxuICAgICAgICBcImZhY3RcIjogXCJEeXNsZXhpYSBpcyBhIGRpc2FiaWxpdHkgdGhhdCBtYWtlcyBpdCBkaWZmaWN1bHQgZm9yIHRoZSBicmFpbiB0byBhdXRvbWF0ZSB0aGUgaW50ZXJwcmV0YXRpb24gb2Ygd29yZHMuIFRoaXMgbWFrZXMgaXQgaGFyZCBmb3IgcGVvcGxlIHdpdGggdGhpcyBkaXNhYmlsaXR5IHRvIHJlYWQgYW5kIHdyaXRlLiBEeXNsZXhpYSBpcyBoYXMgbm8gY29ubmVjdGlvbiB3aXRoIHZpc2lvbiBvciBpbnRlbGxpZ2VuY2UuIFRoZSBjYXVzZXMgb2YgZHlzbGV4aWEgYXJlIHN0aWxsIHVuY2xlYXIuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJBdm9pZCB0ZXh0IGluIHNtYWxsIGZvbnQgc2l6ZXMgYW5kIGxvbmcgdGV4dHMuIFVzZSBwcm9wZXIgc3BhY2luZyBhbmQgbGluZSBoZWlnaHQuXCIsXHJcbiAgICAgICAgICBcIkF2b2lkIGRpZmZpY3VsdCB3b3JkcyBhbmQgdGVybXMuXCIsXHJcbiAgICAgICAgICBcIk9mZmVyIGVhc3kgdG8gcmVhZCB0ZXh0cywgaW1hZ2VzLCB2aWRlbyBvciBhdWRpbyBhbHRlcm5hdGl2ZXMuXCIsXHJcbiAgICAgICAgICBcIkF2b2lkIGZvbnRzIHdpdGggY29tcGxpY2F0ZWQgYW5kIGNvbXBsZXggY2hhcmFjdGVycy5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnczLm9yZy9UUi9XQ0FHMjAvI21pbmltaXplLWVycm9yXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJXQ0FHIDMuMyBJbnB1dCBBc3Npc3RhbmNlOiBIZWxwIHVzZXJzIGF2b2lkIGFuZCBjb3JyZWN0IG1pc3Rha2VzLiAoVzNDKVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly93d3cudzMub3JnL1dBSS9XQ0FHMjAvcXVpY2tyZWYvI3FyLW5hdmlnYXRpb24tbWVjaGFuaXNtcy1yZWZzXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCIyLjQuNCBMaW5rIFB1cnBvc2UgKEluIENvbnRleHQpXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vaW5jbHVzaXZlZGVzaWducHJpbmNpcGxlcy5vcmcvI3ByaW9yaXRpc2UtY29udGVudFwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiUHJpb3JpdGlzZSBjb250ZW50XCIgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICAgIFxyXG4gICAgICB9LFxyXG4gICAgICBcInBhcmtpbnNvbnNcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlISBtb3ZlIHRoZSBtb3VzZSBwb2ludGVyIG9uIHRoZSB3ZWIgcGFnZSBhbmQgc2VlIHdoYXQncyBoYXBwZW5pbmcuXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiUGFya2luc29uc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBhcmtpbnNvbidzIGRpc2Vhc2UgZGVzdHJveXMgdGhlIGNlbGxzIGluIHRoZSBicmFpbiB0aGF0IHByb2R1Y2UgZG9wYW1pbmUsIHdoaWNoIGNhdXNlcyB0aGUgYnJhaW4gdG8gaGF2ZSBhIHJlZHVjZWQgYWJpbGl0eSB0byBzZW5kIHNpZ25hbHMuIFBlcnNvbnMgd2l0aCBQYXJraW5zb24ncyBtYXkgc3VmZmVyIGZyb20gc3ltcHRvbXMgc3VjaCBhcyBzaGFraW5nLCBzdGlmZiBtdXNjbGVzLCBhbmQgcmVkdWNlZCBtb2JpbGl0eS4gVGhlIGNhdXNlcyBvZiBQYXJraW5zb24ncyBkaXNlYXNlIGFyZSBzdGlsbCB1bmNsZWFyLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiTWFrZSBzdXJlIHRoZSB3ZWJzaXRlIGNhbiBiZSB1c2VkIHdpdGggb3RoZXIgdG9vbHMgb3RoZXIgdGhhbiBhIG1vdXNlLCBzdWNoIGFzIGtleWJvYXJkIG5hdmlnYXRpb24uXCIsXHJcbiAgICAgICAgICBcIkhhdmUgZW5vdWdoIHNwYWNlIGJldHdlZW4gY29tcG9uZW50cy5cIixcclxuICAgICAgICAgIFwiTWFrZSBzdXJlIGNsaWNrIGFyZWFzIGFyZSBiaWcgZW5vdWdoLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvXCI6IFxyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly93d3cudzMub3JnL1RSL1VOREVSU1RBTkRJTkctV0NBRzIwL2tleWJvYXJkLW9wZXJhdGlvbi5odG1sXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJXQ0FHIDIuMSBLZXlib2FyZCBBY2Nlc3NpYmxlOiBNYWtlIGFsbCBmdW5jdGlvbmFsaXR5IGF2YWlsYWJsZSBmcm9tIGEga2V5Ym9hcmQuIChXM0MpXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vaW5jbHVzaXZlZGVzaWducHJpbmNpcGxlcy5vcmcvI29mZmVyLWNob2ljZVwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiT2ZmZXIgY2hvaWNlXCIgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlIVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlllbGxvdy1ibHVlIGNvbG9yIGJsaW5kbmVzc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBlb3BsZSB3aXRoIGxvd2VyZWQgY29sb3IgdmlzaW9uIGhhdmUgZGlmZmljdWx0eSBkaXN0aW5ndWlzaGluZyBzb21lIG9yIGFsbCBjb2xvcnMuIFllbGxvdy1ibHVlIGNvbG9yIGJsaW5kbmVzcyAoVHJpdGFub3BpYSkgaXMgcmFyZS4gVGhlIG5hbWUgY2FuIGJlIG1pc2xlYWRpbmcuIEl0J3Mgbm90IHRoZSBjb2xvcnMgeWVsbG93IGFuZCBibHVlIHRoYXQgYXJlIGNvbmZ1c2VkIGJ1dCBibHVlIHdpdGggZ3JlZW4gYW5kIHllbGxvdyB3aXRoIHB1cnBsZS5cIixcclxuICAgICAgICBcImxpc3RJdGVtc1wiOiBbXHJcbiAgICAgICAgICBcIkRvIG5vdCB1c2UgY29sb3IgYXMgdGhlIG9ubHkgd2F5IHRvIGNvbnZleSBpbmZvcm1hdGlvbiwgaW5kaWNhdGUgYW4gYWN0aW9uIG9yIGlkZW50aWZ5IGFuIGVsZW1lbnQuIEZvciBleGFtcGxlLCBkbyBub3QgbWFyayBhbiBpbmNvcnJlY3QgZm9ybSBmaWVsZCB3aXRoIGEgcmVkIGJvcmRlciBvbmx5LCBhbHNvIHN1cHBsZW1lbnQgd2l0aCBhIHRleHQgYW5kIHByZWZlcmFibHkgYW4gaWNvbi5cIixcclxuwqDCoMKgwqDCoMKgwqDCoMKgwqBcIkNvbnNpZGVyIG9mZmVyaW5nIGEgaGlnaCBjb250cmFzdCBtb2RlLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvXCI6IFxyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly93d3cudzMub3JnL1dBSS9XQ0FHMjAvcXVpY2tyZWYvI3FyLXZpc3VhbC1hdWRpby1jb250cmFzdC13aXRob3V0LWNvbG9yXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJXQ0FHIDEuNC4xIFVzZSBvZiBDb2xvciAoVzNDKVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly93d3cudzMub3JnL1dBSS9XQ0FHMjAvcXVpY2tyZWYvI3FyLXZpc3VhbC1hdWRpby1jb250cmFzdC1jb250cmFzdFwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiV0NBRzEuNC4zIENvbnRyYXN0IChNaW5pbXVtKSAoVzNDKVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly93d3cudXNhYmlsaXR5Lmdvdi9nZXQtaW52b2x2ZWQvYmxvZy8yMDEwLzAyL2NvbG9yLWJsaW5kbmVzcy5odG1sXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb2xvciBCbGluZG5lc3MgJiBXZWIgRGVzaWduIChVc2FiaWxpdHkuZ292KVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly9hY2Nlc3NpYmlsaXR5LmJsb2cuZ292LnVrLzIwMTYvMDYvMTcvY29sb3VyLWNvbnRyYXN0LXdoeS1kb2VzLWl0LW1hdHRlci9cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbG91ciBjb250cmFzdCAtIHdoeSBkb2VzIGl0IG1hdHRlcj8gKGdvdi51aylcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vZGV2ZWxvcGVyLnBhY2llbGxvZ3JvdXAuY29tL3Jlc291cmNlcy9jb250cmFzdGFuYWx5c2VyL1wiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29sb3VyIENvbnRyYXN0IEFuYWx5c2VyXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmluY2x1c2l2ZWRlc2lnbnRvb2xraXQuY29tL1VDdmlzaW9uL3Zpc2lvbi5odG1sI2NvbG91clwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiRW5zdXJlIHN1ZmZpY2llbnQgY29udHJhc3RcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL3d3dy5jb2xvci1ibGluZG5lc3MuY29tL3JnYi1hbm9tYWxvc2NvcGUtY29sb3ItYmxpbmRuZXNzLXRlc3QvXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb2xvciBibGluZG5lc3MgdGVzdFwiIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiUmVkLWdyZWVuIGNvbG9yIGJsaW5kbmVzc1wiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIlBlb3BsZSB3aXRoIGxvd2VyZWQgY29sb3IgdmlzaW9uIGhhdmUgZGlmZmljdWx0eSBkaXN0aW5ndWlzaGluZyBzb21lIG9yIGFsbCBjb2xvcnMuIFJlZC1ncmVlbiBjb2xvciBibGluZG5lc3MgKFByb3Rhbm9waWEgYW5kIERldXRlcmFub3BpYSkgaXMgdGhlIG1vc3QgY29tbW9uIHR5cGUgb2YgY29sb3IgYmxpbmRuZXNzLiBJdCBpcyBtb3JlIGNvbW1vbiBhbW9uZyBtZW4gdGhhbiB3b21lbi4gUGVvcGxlIHdpdGggcmVkLWdyZWVuIGNvbG9yIGJsaW5kbmVzcyBoYXZlIGRpZmZpY3VsdHkgZGlzdGluZ3Vpc2hpbmcgdGhlIGNvbG9ycyByZWQsIGdyZWVuLCBicm93biBhbmQgb3JhbmdlLlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiRG8gbm90IHVzZSBjb2xvciBhcyB0aGUgb25seSB3YXkgdG8gY29udmV5IGluZm9ybWF0aW9uLCBpbmRpY2F0ZSBhbiBhY3Rpb24gb3IgaWRlbnRpZnkgYW4gZWxlbWVudC4gRm9yIGV4YW1wbGUsIGRvIG5vdCBtYXJrIGFuIGluY29ycmVjdCBmb3JtIGZpZWxkIHdpdGggYSByZWQgYm9yZGVyIG9ubHksIGFsc28gc3VwcGxlbWVudCB3aXRoIGEgdGV4dCBhbmQgcHJlZmVyYWJseSBhbiBpY29uLlwiLFxyXG7CoMKgwqDCoMKgwqDCoMKgwqDCoFwiQ29uc2lkZXIgb2ZmZXJpbmcgYSBoaWdoIGNvbnRyYXN0IG1vZGUuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9cIjogXHJcbiAgICAgICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnczLm9yZy9XQUkvV0NBRzIwL3F1aWNrcmVmLyNxci12aXN1YWwtYXVkaW8tY29udHJhc3Qtd2l0aG91dC1jb2xvclwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiV0NBRyAxLjQuMSBVc2Ugb2YgQ29sb3IgKFczQylcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnczLm9yZy9XQUkvV0NBRzIwL3F1aWNrcmVmLyNxci12aXN1YWwtYXVkaW8tY29udHJhc3QtY29udHJhc3RcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIldDQUcxLjQuMyBDb250cmFzdCAoTWluaW11bSkgKFczQylcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vd3d3LnVzYWJpbGl0eS5nb3YvZ2V0LWludm9sdmVkL2Jsb2cvMjAxMC8wMi9jb2xvci1ibGluZG5lc3MuaHRtbFwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29sb3IgQmxpbmRuZXNzICYgV2ViIERlc2lnbiAoVXNhYmlsaXR5LmdvdilcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vYWNjZXNzaWJpbGl0eS5ibG9nLmdvdi51ay8yMDE2LzA2LzE3L2NvbG91ci1jb250cmFzdC13aHktZG9lcy1pdC1tYXR0ZXIvXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb2xvdXIgY29udHJhc3QgLSB3aHkgZG9lcyBpdCBtYXR0ZXI/IChnb3YudWspXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL2RldmVsb3Blci5wYWNpZWxsb2dyb3VwLmNvbS9yZXNvdXJjZXMvY29udHJhc3RhbmFseXNlci9cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbG91ciBDb250cmFzdCBBbmFseXNlclwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL3d3dy5pbmNsdXNpdmVkZXNpZ250b29sa2l0LmNvbS9VQ3Zpc2lvbi92aXNpb24uaHRtbCNjb2xvdXJcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkVuc3VyZSBzdWZmaWNpZW50IGNvbnRyYXN0XCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmNvbG9yLWJsaW5kbmVzcy5jb20vcmdiLWFub21hbG9zY29wZS1jb2xvci1ibGluZG5lc3MtdGVzdC9cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbG9yIGJsaW5kbmVzcyB0ZXN0XCIgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJmYXJzaWdodGVkbmVzc1wiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiRmFyLXNpZ2h0ZWRuZXNzXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiRmFyLXNpZ2h0ZWRuZXNzIChIeXBlcm9waWEpIGlzIG9uZSBvZiB0aGUgbW9zdCBjb21tb24gdmlzdWFsIGltcGFpcm1lbnRzLiBQZW9wbGUgd2l0aCBIeXBlcm9waWEgaGF2ZSBkaWZmaWN1bHR5IGZvY3VzaW5nIG9uIG9iamVjdHMgYXQgY2xvc2UgcmFuZ2Ugd2hpY2ggbWFrZXMgdGhlbSBhcHBlYXIgYmx1cnJ5LlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiQXZvaWQgdGV4dCBpbiBzbWFsbCBmb250IHNpemVzIGFuZCBsb25nIHRleHRzLiBVc2UgcHJvcGVyIHNwYWNpbmcgYW5kIGxpbmUgaGVpZ2h0LlwiLCAgXHJcbiAgICAgICAgICBcIk1ha2Ugc3VyZSB0aGUgd2Vic2l0ZSBjYW4gYmUgem9vbWVkIHRvIGF0IGxlYXN0IDIwMCUuXCIsXHJcbiAgICAgICAgICBcIk9mZmVyIGEgdGV4dCB0byBzcGVlY2ggcmVhZGVyLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvXCI6IFxyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly93d3cudzMub3JnL1dBSS9XQ0FHMjAvcXVpY2tyZWYvP3Nob3d0ZWNobmlxdWVzPTE0NCNxci12aXN1YWwtYXVkaW8tY29udHJhc3Qtc2NhbGVcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIldDQUcgMS40LjQgUmVzaXplIHRleHQgKFczQylcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly9pbmNsdXNpdmVkZXNpZ25wcmluY2lwbGVzLm9yZy8jcHJvdmlkZS1jb21wYXJhYmxlLWV4cGVyaWVuY2VcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIlByb3ZpZGUgY29tcGFyYWJsZSBleHBlcmllbmNlXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmluY2x1c2l2ZWRlc2lnbnRvb2xraXQuY29tL1VDdmlzaW9uL3Zpc2lvbi5odG1sI3NoYXBlXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb25zaWRlciBzaXplXCIgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJ0b3RhbENvbG9yQmxpbmRuZXNzXCI6XHJcbiAgICAgIHtcclxuICAgICAgICBcInNpbXVsYXRpb25TdGF0dXNcIjogXCJTaW11bGF0aW9uIGFjdGl2ZSFcIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJUb3RhbCBjb2xvciBibGluZG5lc3NcIixcclxuICAgICAgICBcImZhY3RcIjogXCJQZW9wbGUgd2l0aCBsb3dlcmVkIGNvbG9yIHZpc2lvbiBoYXZlIGRpZmZpY3VsdHkgZGlzdGluZ3Vpc2hpbmcgc29tZSBvciBhbGwgY29sb3JzLiBUb3RhbCBjb2xvciBibGluZG5lc3MgKE1vbm9jaHJvbWF0aWMgLyBBY2hyb21hdG9wc3kpIGlzIHZlcnkgcmFyZS4gUGVvcGxlIHdpdGggdGhpcyB2aXN1YWwgaW1wYWlybWVudCBjYW4gbm90IHBlcmNpZXZlIGFueSBjb2xvcnMsIG9ubHkgZGlmZmVyZW50IHNoYWRlcyBvZiBncmF5LlwiLFxyXG4gICAgICAgIFwibGlzdEl0ZW1zXCI6IFtcclxuICAgICAgICAgIFwiRG8gbm90IHVzZSBjb2xvciBhcyB0aGUgb25seSB3YXkgdG8gY29udmV5IGluZm9ybWF0aW9uLCBpbmRpY2F0ZSBhbiBhY3Rpb24gb3IgaWRlbnRpZnkgYW4gZWxlbWVudC4gRm9yIGV4YW1wbGUsIGRvIG5vdCBtYXJrIGFuIGluY29ycmVjdCBmb3JtIGZpZWxkIHdpdGggYSByZWQgYm9yZGVyIG9ubHksIGFsc28gc3VwcGxlbWVudCB3aXRoIGEgdGV4dCBhbmQgcHJlZmVyYWJseSBhbiBpY29uLlwiLFxyXG7CoMKgwqDCoMKgwqDCoMKgwqDCoFwiQ29uc2lkZXIgb2ZmZXJpbmcgYSBoaWdoIGNvbnRyYXN0IG1vZGUuXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwibW9yZUluZm9cIjogXHJcbiAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly93d3cudzMub3JnL1dBSS9XQ0FHMjAvcXVpY2tyZWYvI3FyLXZpc3VhbC1hdWRpby1jb250cmFzdC13aXRob3V0LWNvbG9yXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJXQ0FHIDEuNC4xIFVzZSBvZiBDb2xvciAoVzNDKVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly93d3cudzMub3JnL1dBSS9XQ0FHMjAvcXVpY2tyZWYvI3FyLXZpc3VhbC1hdWRpby1jb250cmFzdC1jb250cmFzdFwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiV0NBRzEuNC4zIENvbnRyYXN0IChNaW5pbXVtKSAoVzNDKVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly93d3cudXNhYmlsaXR5Lmdvdi9nZXQtaW52b2x2ZWQvYmxvZy8yMDEwLzAyL2NvbG9yLWJsaW5kbmVzcy5odG1sXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb2xvciBCbGluZG5lc3MgJiBXZWIgRGVzaWduIChVc2FiaWxpdHkuZ292KVwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly9hY2Nlc3NpYmlsaXR5LmJsb2cuZ292LnVrLzIwMTYvMDYvMTcvY29sb3VyLWNvbnRyYXN0LXdoeS1kb2VzLWl0LW1hdHRlci9cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbG91ciBjb250cmFzdCAtIHdoeSBkb2VzIGl0IG1hdHRlcj8gKGdvdi51aylcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHBzOi8vZGV2ZWxvcGVyLnBhY2llbGxvZ3JvdXAuY29tL3Jlc291cmNlcy9jb250cmFzdGFuYWx5c2VyL1wiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29sb3VyIENvbnRyYXN0IEFuYWx5c2VyXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmluY2x1c2l2ZWRlc2lnbnRvb2xraXQuY29tL1VDdmlzaW9uL3Zpc2lvbi5odG1sI2NvbG91clwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiRW5zdXJlIHN1ZmZpY2llbnQgY29udHJhc3RcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL3d3dy5jb2xvci1ibGluZG5lc3MuY29tL3JnYi1hbm9tYWxvc2NvcGUtY29sb3ItYmxpbmRuZXNzLXRlc3QvXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb2xvciBibGluZG5lc3MgdGVzdFwiIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBcInR1bm5lbFZpc2lvblwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhIG1vdmUgdGhlIG1vdXNlIHBvaW50ZXIgb24gdGhlIHdlYiBwYWdlIGFuZCBzZWUgd2hhdCdzIGhhcHBlbmluZy5cIixcclxuICAgICAgICBcImhlYWRpbmdcIjogXCJUdW5uZWwgVmlzaW9uXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiV2hhdCBpcyBjb21tb25seSBjYWxsZWQgVHVubmVsIFZpc2lvbiBpcyBsb3NzIG9mIHBlcmlwaGVyYWwgdmlzaW9uLiBUaGlzIG1heSBiZSBiZWNhdXNlIHRoZSBwZXJzb24gc3VmZmVycyBmcm9tIGEgZGlzZWFzZSB0aGF0IGFmZmVjdHMgdGhlIGNlbGxzIGluIHRoZSBleWUsIGJ1dCBtYXkgYWxzbyBvY2N1ciB0ZW1wb3JhcmlseSBkdWUgdG8gc3RyZXNzIG9yIGRlcHJlc3Npb24uXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJBdm9pZCB0ZXh0IGluIHNtYWxsIGZvbnQgc2l6ZXMgYW5kIGxvbmcgdGV4dHMuIFVzZSBwcm9wZXIgc3BhY2luZyBhbmQgbGluZSBoZWlnaHQuXCIsXHJcbiAgICAgICAgICBcIk1ha2Ugc3VyZSB0aGUgd2Vic2l0ZSBjYW4gYmUgem9vbWVkIHRvIGF0IGxlYXN0IDIwMCUuXCIsXHJcbiAgICAgICAgICBcIk9mZmVyIGEgdGV4dCB0byBzcGVlY2ggcmVhZGVyLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvXCI6IFxyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL2luY2x1c2l2ZWRlc2lnbnByaW5jaXBsZXMub3JnLyNnaXZlLWNvbnRyb2xcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkFsbG93IHpvb21cIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly93d3cuaW5jbHVzaXZlZGVzaWdudG9vbGtpdC5jb20vVUN2aXNpb24vdmlzaW9uLmh0bWwjbGF5b3V0XCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb25zaWRlciB2aXN1YWwgZmllbGQgbG9zc1wiIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwic3Vuc2hpbmVcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlIVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlN1bnNoaW5lXCIsXHJcbiAgICAgICAgXCJmYWN0XCI6IFwiQSBsb3Qgb2YgcGVvcGxlIGhhcyB0byB1c2UgdGhlaXIgY29tcHV0ZXJzIG91dHNpZGUgaW4gYnJpZ2h0IHN1bnNoaW5lLiBJdCBjYW4gbWFrZSBpdCBoYXJkZXIgdG8gc2VlIHdoYXTigJlzIG9uIHRoZSBzY3JlZW4uXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJQcm92aWRlIGVub3VnaCBjb250cmFzdCBiZXR3ZWVuIHRleHQgYW5kIGl0cyBiYWNrZ3JvdW5kLiBVc2UgYSBjb250cmFzdCByYXRpbyBvZiBhdCBsZWFzdCA0LjU6MSBmb3Igbm9ybWFsIHRleHQgYW5kIDM6MSBmb3IgbGFyZ2UgdGV4dC5cIixcclxuICAgICAgICAgIFwiQ2hlY2sgdGhlIENvbnRyYXN0IHdpdGggPGVtPkNvbG91ciBDb250cmFzdCBBbmFseXNlcjwvZW0+IG9yIDxlbT5Db250cmFzdCByYXRpbzwvZW0+IChzZWUgbGlua3MgYmVsb3cpLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvXCI6IFxyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly9kZXZlbG9wZXIucGFjaWVsbG9ncm91cC5jb20vcmVzb3VyY2VzL2NvbnRyYXN0YW5hbHlzZXIvXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb2xvdXIgQ29udHJhc3QgQW5hbHlzZXJcIiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly9sZWF2ZXJvdS5naXRodWIuaW8vY29udHJhc3QtcmF0aW8vXCIsXHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb0xpbmtUZXh0XCI6XCJDb250cmFzdCByYXRpb1wiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL2luY2x1c2l2ZWRlc2lnbnByaW5jaXBsZXMub3JnLyNjb25zaWRlci1zaXR1YXRpb25cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkNvbnNpZGVyIHNpdHVhdGlvblwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL3d3dy5pbmNsdXNpdmVkZXNpZ250b29sa2l0LmNvbS9VQ3Zpc2lvbi92aXNpb24uaHRtbCNsaWdodGluZ1wiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQ29uc2lkZXIgbGlnaHRpbmcgY29uZGl0aW9uc1wiIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiY29uY2VudHJhdGlvblwiOlxyXG4gICAgICB7XHJcbiAgICAgICAgXCJzaW11bGF0aW9uU3RhdHVzXCI6IFwiU2ltdWxhdGlvbiBhY3RpdmUhXCIsXHJcbiAgICAgICAgXCJoZWFkaW5nXCI6IFwiQ29uY2VudHJhdGlvblwiLFxyXG4gICAgICAgIFwiZmFjdFwiOiBcIkV2ZXJ5b25lIGNhbiBoYXZlIGEgaGFyZCB0aW1lIGNvbmNlbnRyYXRpbmcsIGJ1dCBmb3Igc29tZSBpdCBjYW4gYmUgYSBiaWcgcHJvYmxlbSBpbiBldmVyeWRheSBsaWZlLiBEaXNhYmlsaXRpZXMgbGlrZSBBREhEIGFuZCBBdXRpc20gY2FuIGNhdXNlIGRpZmZpY3VsdHkgaW4gaGFuZGxpbmcgaW1wcmVzc2lvbnMsIHNvcnRpbmcgaW5mb3JtYXRpb24gYW5kIHNlbnNpdGl2aXR5IHRvIHNvdW5kLlwiLCAgICAgICAgXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJHaXZlIHRoZSB3ZWJzaXRlIGEgc2ltcGxlIGFuZCBjbGVhbiBkZXNpZ24uXCIsXHJcbiAgICAgICAgICBcIkJlIGNhcmVmdWwgd2l0aCBhbmltYXRpb25zIGFuZCBzdHJvbmcgY29sb3JzLlwiLFxyXG4gICAgICAgICAgXCJBdm9pZCBoYXZpbmcgdG9vIG11Y2ggY29udGVudCBvbiB0aGUgc2FtZSBwYWdlLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciBpbWFnZSwgYXVkaW8gYW5kIHZpZGVvIGFsZXJuYXRpdmVzIHRvIHRleHQgY29udGVudC5cIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJtb3JlSW5mb1wiOiBcclxuICAgICAgICAgIFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9VcmxcIjpcImh0dHA6Ly9pbmNsdXNpdmVkZXNpZ25wcmluY2lwbGVzLm9yZy8jYmUtY29uc2lzdGVudFwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQmUgY29uc2lzdGVudFwiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cDovL3d3dy5pbmNsdXNpdmVkZXNpZ250b29sa2l0LmNvbS9VQ3RoaW5raW5nL3RoaW5raW5nLmh0bWwjaW50ZXJmYWNlX25hdmlnYXRpb25fYW5kX25lc3RlZF9tZW51c1wiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiQXZvaWQgZGVlcCBoaWVyYXJjaGllc1wiIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmluY2x1c2l2ZWRlc2lnbnRvb2xraXQuY29tL1VDdGhpbmtpbmcvdGhpbmtpbmcuaHRtbCNzdHJ1Y3R1cmluZ19pbmZvcm1hdGlvblwiLFxyXG4gICAgICAgICAgICAgIFwibW9yZUluZm9MaW5rVGV4dFwiOlwiUmVkdWNlIG1lbW9yeSBsb2FkXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwOi8vd3d3LmluY2x1c2l2ZWRlc2lnbnRvb2xraXQuY29tL1VDdGhpbmtpbmcvdGhpbmtpbmcuaHRtbCNhdHRlbnRpb25cIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIkF2b2lkIG11bHRpcGxlIGZvY3VzZXMgb2YgYXR0ZW50aW9uXCIgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgXCJzbWFsbFZvY2FidWxhcnlcIjpcclxuICAgICAge1xyXG4gICAgICAgIFwic2ltdWxhdGlvblN0YXR1c1wiOiBcIlNpbXVsYXRpb24gYWN0aXZlIVwiLFxyXG4gICAgICAgIFwiaGVhZGluZ1wiOiBcIlNtYWxsIHZvY2FidWxhcnlcIixcclxuICAgICAgICBcImZhY3RcIjogXCJBIGxhcmdlIHBhcnQgb2YgdGhlIHdvcmxkJ3MgcG9wdWxhdGlvbiBjYW4ndCByZWFkIGF0IGFsbCBhbmQgbWFueSBhZHVsdHMgZG9uJ3QgcmVhZCBhcyB3ZWxsIGFzIGV4cGVjdGVkIGFmdGVyIGZpbmlzaGluZyBncmFkZSBzY2hvb2wuXCIsXHJcbiAgICAgICAgXCJsaXN0SXRlbXNcIjogW1xyXG4gICAgICAgICAgXCJBdm9pZCBkaWZmaWN1bHQgd29yZHMgYW5kIHRlcm1zLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciBlYXN5IHRvIHJlYWQgdGV4dHMsIGltYWdlcywgdmlkZW8gb3IgYXVkaW8gYWx0ZXJuYXRpdmVzLlwiLFxyXG4gICAgICAgICAgXCJPZmZlciB0ZXh0cyBpbiBkaWZmZXJlbnQgbGFuZ3VhZ2VzLlwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIm1vcmVJbmZvXCI6IFxyXG4gICAgICAgICAgW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgXCJtb3JlSW5mb1VybFwiOlwiaHR0cHM6Ly93d3cudzMub3JnL1RSL1dDQUcyMC8jbWluaW1pemUtZXJyb3JcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIldDQUcgMy4zIElucHV0IEFzc2lzdGFuY2U6IEhlbHAgdXNlcnMgYXZvaWQgYW5kIGNvcnJlY3QgbWlzdGFrZXMuIChXM0MpXCIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvVXJsXCI6XCJodHRwczovL3d3dy53My5vcmcvV0FJL1dDQUcyMC9xdWlja3JlZi8jcXItbmF2aWdhdGlvbi1tZWNoYW5pc21zLXJlZnNcIixcclxuICAgICAgICAgICAgICBcIm1vcmVJbmZvTGlua1RleHRcIjpcIjIuNC40IExpbmsgUHVycG9zZSAoSW4gQ29udGV4dClcIiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgXCJVSVwiOiB7XHJcbiAgICAgIFwic2VsZWN0U2ltdWxhdGlvblwiOiBcIlNlbGVjdCBzaW11bGF0aW9uOlwiLFxyXG4gICAgICBcInJlc2V0XCI6IFwiUmVzZXRcIixcclxuICAgICAgXCJhZHZpY2VcIjogXCJUaGluayBhYm91dCB0aGlzXCIsXHJcbiAgICAgIFwibW9yZUluZm9cIjogXCJMaW5rcyBmb3IgYmV0dGVyIHVuZGVyc3RhbmRpbmdcIixcclxuICAgICAgXCJzaWdodFwiOiBcIlNpZ2h0XCIsXHJcbiAgICAgIFwidG90YWxDb2xvckJsaW5kbmVzc1wiOiBcIlRvdGFsIGNvbG9yIGJsaW5kbmVzc1wiLFxyXG4gICAgICBcInllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1wiOiBcIlllbGxvdy1CbHVlIGNvbG9yIGJsaW5kbmVzc1wiLCAgICBcclxuICAgICAgXCJyZWRHcmVlbkNvbG9yQmxpbmRuZXNzXCI6IFwiUmVkLUdyZWVuIGNvbG9yIGJsaW5kbmVzc1wiLFxyXG4gICAgICBcImZhcnNpZ2h0ZWRuZXNzXCI6IFwiRmFyLXNpZ2h0ZWRuZXNzXCIsXHJcbiAgICAgIFwidHVubmVsVmlzaW9uXCI6IFwiVHVubmVsIHZpc2lvblwiLFxyXG4gICAgICBcIm1vYmlsaXR5XCI6IFwiTW9iaWxpdHlcIixcclxuICAgICAgXCJwYXJraW5zb25zXCI6IFwiUGFya2luc29uc1wiLFxyXG4gICAgICBcInJlYWRBbmRXcml0ZVwiOiBcIlJlYWQgYW5kIHdyaXRlXCIsXHJcbiAgICAgIFwiZHlzbGV4aWFcIjogXCJEeXNsZXhpYVwiLFxyXG4gICAgICBcInNtYWxsVm9jYWJ1bGFyeVwiOiBcIlNtYWxsIHZvY2FidWxhcnlcIixcclxuICAgICAgXCJjb25jZW50cmF0aW9uXCI6IFwiQ29uY2VudHJhdGlvblwiLFxyXG4gICAgICBcImNoYW5nZVNldHRpbmdzXCI6IFwiQ2hhbmdlIHNldHRpbmdzXCIsXHJcbiAgICAgIFwic2VsZWN0TGFuZ3VhZ2VcIjogXCJTZWxlY3QgbGFuZ3VhZ2VcIixcclxuICAgICAgXCJzYXZlU2V0dGluZ3NcIjogXCJTYXZlIHNldHRpbmdzXCIsXHJcbiAgICAgIFwiY2FuY2VsXCI6IFwiQ2FuY2VsXCIsXHJcbiAgICAgIFwic2ltdWxhdGlvbnNcIjogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIlNpZ2h0XCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW1xyXG4gICAgICAgICAgICB7IFwidG90YWxDb2xvckJsaW5kbmVzc1wiOiBcIlRvdGFsIGNvbG9yIGJsaW5kbmVzc1wiIH0sXHJcbiAgICAgICAgICAgIHsgXCJ5ZWxsb3dCbHVlQ29sb3JCbGluZG5lc3NcIjogXCJZZWxsb3ctQmx1ZSBjb2xvciBibGluZG5lc3NcIiB9LFxyXG4gICAgICAgICAgICB7IFwicmVkR3JlZW5Db2xvckJsaW5kbmVzc1wiOiBcIlJlZC1HcmVlbiBjb2xvciBibGluZG5lc3NcIiB9LFxyXG4gICAgICAgICAgICB7IFwiZmFyc2lnaHRlZG5lc3NcIjogXCJGYXItc2lnaHRlZG5lc3NcIiB9LFxyXG4gICAgICAgICAgICB7IFwidHVubmVsVmlzaW9uXCI6IFwiVHVubmVsIHZpc2lvblwiIH0sXHJcbiAgICAgICAgICAgIHsgXCJzdW5zaGluZVwiOiBcIlN1bnNoaW5lXCIgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiTW9iaWxpdHlcIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbIFxyXG4gICAgICAgICAgICB7IFwicGFya2luc29uc1wiOiBcIlBhcmtpbnNvbnNcIiB9XHJcbiAgICBcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJoZWFkaW5nXCI6IFwiUmVhZCBhbmQgd3JpdGVcIixcclxuICAgICAgICAgIFwiY2hvaWNlc1wiOiBbXHJcbiAgICAgICAgICAgIHsgXCJkeXNsZXhpYVwiOiBcIkR5c2xleGlhXCIgfSxcclxuICAgICAgICAgICAgeyBcInNtYWxsVm9jYWJ1bGFyeVwiOiBcIlNtYWxsIHZvY2FidWxhcnlcIiB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcImhlYWRpbmdcIjogXCJDb25jZW50cmF0aW9uXCIsXHJcbiAgICAgICAgICBcImNob2ljZXNcIjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwiaGVhZGluZ1wiOiBcIk1lbW9yeVwiLFxyXG4gICAgICAgICAgXCJjaG9pY2VzXCI6IFtdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH1cclxufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBsb2FkZWRTaW11bGF0aW9ucyA9IFtdO1xuXG5mdW5jdGlvbiBsb2FkKG5hbWUsIHN1Yk5hbWUsIGNhbGxiYWNrKSB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF0sXG4gICAgICAgIHNjcmlwdEZpbGUgPSBzdWJOYW1lID8gJ3NpbXVsYXRpb25zLycgKyBuYW1lICsgJy8nICsgc3ViTmFtZSArICcvY29udGVudC5qcycgOiAnc2ltdWxhdGlvbnMvJyArIG5hbWUgKyAnL2NvbnRlbnQuanMnO1xuXG4gICAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdChhY3RpdmVUYWIuaWQsIHsgZmlsZTogc2NyaXB0RmlsZSB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICBsb2FkZWRTaW11bGF0aW9ucy5wdXNoKG5hbWUpO1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKG5hbWUsIHN1Yk5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RhcnQobmFtZSwgc3ViTmFtZSkge1xuICBpZiAobG9hZGVkU2ltdWxhdGlvbnMuaW5jbHVkZXMobmFtZSkpIHtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdGFydFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lLCBzdWJTaW11bGF0aW9uOiBzdWJOYW1lIH0pO1xuXG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyAnYWN0aXZlVGFiJzogYWN0aXZlVGFiLmlkIH0pO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGxvYWQobmFtZSwgc3ViTmFtZSwgZnVuY3Rpb24gKCkge1xuICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0YXJ0U2ltdWxhdGlvbicsIHNpbXVsYXRpb246IG5hbWUsIHN1YlNpbXVsYXRpb246IHN1Yk5hbWUgfSk7XG5cbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgJ2FjdGl2ZVRhYic6IGFjdGl2ZVRhYi5pZCB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0b3AobmFtZSwgc3ViTmFtZSkge1xuICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0b3BTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSwgc3ViU2ltdWxhdGlvbjogc3ViTmFtZSB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydHMuc3RhcnQgPSBzdGFydDtcbmV4cG9ydHMuc3RvcCA9IHN0b3A7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaW11bGF0aW9uTG9hZGVyLmpzLm1hcFxuIl19
