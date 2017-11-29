import * as data from './data/data.json';
import * as simulationLoader from '../utils/simulationLoader.js';

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

  // TODO: Change this    
  // $("#Syn").text("Syn");
  // $("#Motorik").text("Motorik"); 
 
  chrome.storage.local.get('activeSimulation', obj => {
    simulationLoader.stop(obj.activeSimulation);
  }); 

}

function setTexts() { 
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
}

function setTooltipTexts(activeSimulation) {
  const infoHeading = $(".disability-info-heading");
  const infoParagraph = $(".disability-info-paragraph"); 
  const adviceList = $(".advice-list");
  const moreInfoList = $(".more-info-list");
  const moreInfoPanel = $(".more-info-panel");
  const texts = data.facts[activeSimulation];

  infoHeading.empty();
  infoParagraph.empty();
  adviceList.empty();

  infoHeading.text(texts.heading);
  infoParagraph.text(texts.fact);

  $.each(texts.listItems, (i, value) => {
    adviceList.append(`<li>${value}</li>`);
  });

  // TODO: More info links
}

$(document).ready(() => {

  const tooltip = $(".tool-tip");

  let activeSimulation;

  setTexts();

  // Set active state
  chrome.storage.local.get('activeSimulation', obj => {

    activeSimulation = obj.activeSimulation;

    if (activeSimulation != null) {
      tooltip.addClass("in");
      setTooltipTexts(activeSimulation);
    }

  }); 

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
    $('#panel2').removeClass("hide");

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
    
  });

  //btn and links
  $("#reset-btn").click(() => {
    resetSimulation(tooltip); 
  });

  $(".github-link").click(() => {
    chrome.tabs.create({url: 'https://github.com/Metamatrix/Web-Disability-Simulator'}); 
  });
 
  $(".more-info-link").click(() => {
    chrome.storage.local.get('linkUrl', obj => {
      chrome.tabs.create({url: `${obj.linkUrl}`}); 
    }); 
  }); 

  //panel collapse, show arrows: 
  $('.collapse').on('shown.bs.collapse', function(){
      $(this).parent().find(".down-arrow, .up-arrow").toggle();
    }).on('hidden.bs.collapse', function(){
      $(this).parent().find(".down-arrow, .up-arrow").toggle();
  });
  
});
