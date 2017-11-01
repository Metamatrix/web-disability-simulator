import {resetCSS} from '../../src/simulations/general.js'
import {farsightedness} from '../../src/simulations/farsightedness/index.js'
import {tunnelVision} from '../../src/simulations/tunnelVision/index.js'
import {redGreenColorBlindness} from '../../src/simulations/redGreenColorBlindness/index.js'
import * as data from '../../src/UI/data/data.json';


$(document).ready(() => {

  const tooltip = $( ".tool-tip" );
  const infoHeading = $(".disability-info-heading"); 
  const infoParagraph = $( ".disability-info-paragraph" ); 
  const adviceList = $( ".advice-list" ); 
  const moreInfoParagraph = $( ".more-info-paragraph" ); 
  const moreInfoPanel = $( "#more-info-panel" ); 
  const dropdownListheading = data.UI[0].dropdownHeading; 

  $(".navbar-header").append(dropdownListheading); 

  //menu button click
  
  $(".menu-btn").click(function(){

    const menuBtn = $(this); 
    const menuBtnId = menuBtn[0].id;
    const id = menuBtn.attr("id");
    const fact = data.facts.find(findProperty).fact; 
    const listItems = data.facts.find(findProperty).listItems; 
    const moreInfo = data.facts.find(findProperty).moreInfo; 

    chrome.browserAction.setIcon({
      path : "img/icon_active.png"
    });

    chrome.storage.sync.set({'activeSimulation': menuBtnId});

    infoHeading.empty();
    infoParagraph.empty();
    adviceList.empty();
    moreInfoParagraph.empty(); 
    moreInfoPanel.hide();

    tooltip.animate({
      left: parseInt(tooltip.css('left'),10) == 0 ?
        -tooltip.outerWidth() :
        0
    });

    infoHeading.append(menuBtn.text());

    menuBtn.closest(".dropdown").find(".selected").text(menuBtn.text());

    function findProperty(simulations) { 
      return simulations.name === id;
    }

    infoParagraph.append(fact);
      
    $.each(listItems, (i, value) => {
      adviceList.append(`<li>${value}</li>`);
    });

    if(moreInfo) {
      moreInfoPanel.show();
      moreInfoParagraph.append(moreInfo);
    }

    if (menuBtn.hasClass("farsightedness")) {
      farsightedness();
    } 

    if (menuBtn.hasClass("tunnelVision")) {
      tunnelVision();
    } 

    if (menuBtn.hasClass("redGreenColorBlindness")) {
      redGreenColorBlindness();
    }
    
  });

  function resetSimulation(){
    chrome.browserAction.setIcon({
      path : "img/icon.png"
    });

    tooltip.animate({
      left: parseInt(tooltip.css('marginLeft'),10) == 0 ?
        tooltip.outerWidth() :
        0
    }); 
    
    $("#Syn").text("Syn");
    $("#Motorik").text("Motorik"); 

    resetCSS();
    chrome.storage.sync.remove('activeSimulation');
  }

  //reset-btn click

  $("#reset-btn").click(() => {
    resetSimulation(); 
  });

  //github link click 

  $(".github-link").click(() => {
    chrome.tabs.create({url: 'https://github.com/Metamatrix/Web-Disability-Simulator'}); 
  });

  //panel collapse, show arrows: 

  $('.collapse').on('shown.bs.collapse', function(){
      $(this).parent().find(".down-arrow, .up-arrow").toggle();
    }).on('hidden.bs.collapse', function(){
      $(this).parent().find(".down-arrow, .up-arrow").toggle();
  });

  //keep chosen simulation fact tooltip when extension is closed and opened again. 

  window.onload = () => {

      chrome.storage.sync.get('activeSimulation', obj => {
    
      const activeSimulation = obj.activeSimulation;
      
      function findProperty(simulations) { 
        return simulations.name === activeSimulation;
      }

      if (activeSimulation != null) {

        tooltip.css("left", "0");

        infoHeading.append( $(`#${activeSimulation}`).text() );

        $(`#${activeSimulation}`).closest(".dropdown").find(".selected").text($(`#${activeSimulation}`).text());

        const id = $(`#${activeSimulation}`).attr("id");

        const fact = data.facts.find(findProperty).fact; 
        const listItems = data.facts.find(findProperty).listItems; 
        const moreInfo = data.facts.find(findProperty).moreInfo;

        infoParagraph.append(fact);
              
        $.each(listItems, (i, value) => {
          adviceList.append(`<li>${value}</li>`);
        });

        if(moreInfo) {
          moreInfoPanel.show();
          moreInfoParagraph.append(moreInfo);
        }

     }

    }); 
  
  };

//function that runs when tab is reloaded
/*  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    resetSimulation();
  });*/
  
});