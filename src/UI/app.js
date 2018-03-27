import * as languageData from './data/data.json';
import * as simulationLoader from '../utils/simulationLoader.js';

let lang = "en"; 

function startSimulation() {

  chrome.storage.local.get('activeSimulation', obj => {
    simulationLoader.start(obj.activeSimulation);
  }); 

}

function resetSimulation(tooltip){
  
  chrome.browserAction.setIcon({
    path : "img/icon.png"
  });

  tooltip.removeClass("in");
  $("#panel1").addClass("in"); 
  $('#panel1').removeClass("hide");
 
  setTimeout(() => {
    tooltip.addClass("hide");
  }, 250);

  chrome.storage.local.get('activeSimulation', obj => {
    simulationLoader.stop(obj.activeSimulation);
    chrome.storage.local.remove('activeSimulation');
    chrome.storage.local.remove('activeTab');
  }); 

}

function setTexts() { 

  const data = languageData[lang];

  $(".more-info-link").text(data.UI.moreInfo);
  $("#reset-btn").text(data.UI.reset);
  $(".navbar-header").text(data.UI.selectSimulation);
  $("#advice-dropdown").text(data.UI.advice);
  $("#info-dropdown").text(data.UI.moreInfo);
  $("#sight").text(data.UI.sight);
  $("#mobility").text(data.UI.mobility);
  $("#readWrite").text(data.UI.readAndWrite);
  $("#concentration").text(data.UI.concentration);

  $.each(data.UI.simulations, (i, value) => {

    $(`#${value.heading}`).text(value.heading); 
    
    $.each(value.choices, (i, value) => {
      for(const key in value) {
        $(`#${key}`).text(value[key]);
      }
    });

  });

  $('#settings-heading').text(data.UI.changeSettings);
  $('#language-label').text(data.UI.selectLanguage);
  $('#btn-save-settings').text(data.UI.saveSettings);
  $('#btn-cancel-settings').text(data.UI.cancel);

}

function readMoreLinks(){

  const readMoreLink = $('.more-info-links').find('li'); 
  
  readMoreLink.click((event) => {

    const currentLink = event.target.innerText; 

    chrome.storage.local.get('moreInfo', obj => {

      $.each(obj.moreInfo, (i) => {
          if(currentLink == obj.moreInfo[i].moreInfoLinkText) {
            chrome.tabs.create({url: `${obj.moreInfo[i].moreInfoUrl}`, active: false}, function(tab){
              chrome.tabs.update(tab.id, {active:true}); 
            }); 
          }
      });

    });

  }); 

}

function setTooltipTexts(activeSimulation) {

  const data = languageData[lang];

  const simulationStatus = $(".simulation-started-paragraph");
  const simulationStatusAlert = $(".simulation-started-alert" )
  const infoHeading = $(".disability-info-heading");
  const infoParagraph = $(".disability-info-paragraph"); 
  const adviceList = $(".advice-list");
  const moreInfoLinks = $(".more-info-links");
  const moreInfoPanel =  $('#more-info-panel'); 
  const texts = data.facts[activeSimulation];

  simulationStatus.empty(); 
  infoHeading.empty();
  infoParagraph.empty();
  adviceList.empty();
  moreInfoLinks.empty(); 

  simulationStatus.text(texts.simulationStatus);
  simulationStatusAlert.removeClass("hide");

  infoHeading.text(texts.heading);
  infoParagraph.text(texts.fact);

  $.each(texts.listItems, (i, value) => {
    adviceList.append(`<li>${value}</li>`);
  });

  if(texts.moreInfo !== undefined) { 
    moreInfoPanel.removeClass("hidden");

    $.each(texts.moreInfo, (i) => {
      moreInfoLinks.append(`<li><a>${texts.moreInfo[i].moreInfoLinkText}</a></li>`);
    });
    chrome.storage.local.set({'moreInfo': texts.moreInfo});

  } else {
    moreInfoPanel.addClass("hidden");
  }

}

$(document).ready(() => {

  const tooltip = $(".tool-tip");

  let activeSimulation;

  lang = 'en';

  setTexts();


  // Set active state
  chrome.storage.local.get('activeSimulation', obj => {

    activeSimulation = obj.activeSimulation;

    if(activeSimulation) {
      tooltip.addClass("in").removeClass("hide");
      $('#panel1').removeClass("in");
      setTooltipTexts(activeSimulation);
      readMoreLinks(); 
    }

  }); 

  // Main view
  $(".menu-btn").click(function(){

    const menuBtn = $(this); 
    const menuBtnId = menuBtn[0].id;

    chrome.browserAction.setIcon({
      path : "img/icon_active.png"
    });

    activeSimulation = menuBtnId;
    chrome.storage.local.set({'activeSimulation': menuBtnId});

    setTooltipTexts(activeSimulation);

    $('#panel1').removeClass("in");
    $('#panel1').addClass("hide");
    $('#panel2').removeClass("hide");
    tooltip.removeClass("hide");

    setTimeout(() => {
      $('#panel2').addClass("in");
    }, 100);

    setTimeout(() => {
      startSimulation();
    }, 500);

    setTimeout(() => {
      $('#panel2').removeClass("in");
      tooltip.addClass("in");
    }, 1000);

    setTimeout(() => {
      $('#panel2').addClass("hide");
    }, 1500);

    readMoreLinks(); 

  });

  $(".github-link").click(() => {
    chrome.tabs.create({url: 'https://github.com/Metamatrix/Web-Disability-Simulator'}); 
  });

  $('.settings-link').on('click', (e) => {
    e.preventDefault();

    chrome.storage.local.get('lang', obj => {
      $('#language').val(obj.lang);
    });

    $('#panel1').removeClass("in");
    $('#settings').removeClass("hide");

    setTimeout(() => {
      $('#settings').addClass("in");
    }, 250);

    setTimeout(() => {
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

  $(".simulation-started-alert .close").click(() => {
    $( ".simulation-started-alert" ).addClass("hide");
  });

  $("#reset-btn").click(() => {
    resetSimulation(tooltip); 
  });


//panel collapse

$('#myCollapsible').on('shown.bs.collapse', function () {
  // do something…
})

 //panel collapse, show arrows: 
  $('.collapse').on('shown.bs.collapse', function () {
    $(this).parent().find(".down-arrow").css('transform', 'rotate(-180deg)' );
  }).on('hidden.bs.collapse', function () {
    $(this).parent().find(".down-arrow").css('transform', 'rotate(-360deg)' );
  });
  
});
