import * as dyslexia from '../simulations/dyslexia/index.js'
// import {reset} from '../simulations/general/reset/index.js'
import * as farsightedness from '../simulations/farsightedness/index.js'
import * as tunnelVision from '../simulations/tunnelVision/index.js'
import * as redGreenColorBlindness from '../simulations/colorBlindness/redGreenColorBlindness/index.js'
import * as yellowBlueColorBlindness from '../simulations/colorBlindness/yellowBlueColorBlindness/index.js'
import * as totalColorBlindness from '../simulations/colorBlindness/totalColorBlindness/index.js'
import * as concentration from '../simulations/concentration/index.js'
import * as parkinsons from '../simulations/parkinsons/index.js'
import * as data from './data/data.json';

$(document).ready(() => {

  const tooltip = $( ".tool-tip" );
  const infoHeading = $(".disability-info-heading"); 
  const infoParagraph = $( ".disability-info-paragraph" ); 
  const adviceList = $( ".advice-list" ); 
  const moreInfoLink = $( ".more-info-link" ); 
  const moreInfoPanel = $( "#more-info-panel" ); 
  const resetBtn = $("#reset-btn"); 
  const navbarHeader = $(".navbar-header");
  const resetBtnText = data.UI[0].resetBtnText; 
  const navbarHeaderText = data.UI[0].navbarHeaderText; 
  const simulationHeadingText = data.UI[0].simulations[0].heading; 
  const adviceDropdown = $("#advice-dropdown");
  const adviceDropdownText = data.UI[0].adviceDropdownText; 
  const infoDropdown = $("#info-dropdown");
  const infoDropdownText = data.UI[0].infoDropdownText; 

  let activeSimulation;

  //Append UI texts

  navbarHeader.text(navbarHeaderText); 
  resetBtn.text(resetBtnText); 
  infoDropdown.text(infoDropdownText);
  adviceDropdown.text(adviceDropdownText);

  $.each(data.UI[0].simulations, (i, value) => {

    $(`#${value.heading}`).text(value.heading); 
    
    $.each(value.choices, (i, value) => {
      for(const key in value) {
        $(`#${key}`).text(value[key]);
      }
    });

  });

  // Set active state
  chrome.storage.local.get('activeSimulation', obj => {

    const activeSimulation = obj.activeSimulation;
    
    function findProperty(simulations) { 
      return simulations.name === activeSimulation;
    }

    console.log('activeSimulation', activeSimulation)

    if (activeSimulation != null) {

      tooltip.addClass("in");

      infoHeading.append( $(`#${activeSimulation}`).text() );

      $(`#${activeSimulation}`).closest(".dropdown").find(".selected").text($(`#${activeSimulation}`).text());

      const id = $(`#${activeSimulation}`).attr("id");

      const fact = data.facts.find(findProperty).fact; 
      const listItems = data.facts.find(findProperty).listItems; 
      const moreInfo = data.facts.find(findProperty).moreInfoLinkText;
      const moreInfoUrl = data.facts.find(findProperty).moreInfoUrl;

      infoParagraph.append(fact);
            
      $.each(listItems, (i, value) => {
        adviceList.append(`<li>${value}</li>`);
      });

      if(moreInfo) {
        moreInfoPanel.show();
        moreInfoLink.append(moreInfo);
      }

      moreInfoLink.attr("href",`${moreInfoUrl}`);

   }

  }); 

  //menu button click

  $(".menu-btn").click(function(){

    const menuBtn = $(this); 
    const menuBtnId = menuBtn[0].id;
    const id = menuBtn.attr("id");
    const fact = data.facts.find(findProperty).fact; 
    const listItems = data.facts.find(findProperty).listItems; 
    const moreInfo = data.facts.find(findProperty).moreInfoLinkText; 
    const moreInfoUrl = data.facts.find(findProperty).moreInfoUrl;

    function findProperty(simulations) { 
      return simulations.name === id;
    }

    chrome.browserAction.setIcon({
      path : "img/icon_active.png"
    });

    activeSimulation = menuBtnId;
    chrome.storage.local.set({'activeSimulation': menuBtnId});
    chrome.storage.local.set({'linkUrl': moreInfoUrl});

    infoHeading.empty();
    infoParagraph.empty();
    adviceList.empty();
    moreInfoLink.empty(); 
    moreInfoPanel.hide();

    infoHeading.append(menuBtn.text());

    menuBtn.closest(".dropdown").find(".selected").text(menuBtn.text());

    infoParagraph.append(fact);
      
    $.each(listItems, (i, value) => {
      adviceList.append(`<li>${value}</li>`);
    });

    if(moreInfo) {
      moreInfoPanel.show();
      moreInfoLink.append(moreInfo);
    }

    moreInfoLink.attr("href",`${moreInfoUrl}`);

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

  //when loading modal is closed, show chosen simulation

  function startSimulation() {

    // TODO: Clean up
    chrome.storage.local.get('activeSimulation', obj => {

      console.log('startSimulation', obj);

      if(obj.activeSimulation == "farsightedness") {
        farsightedness.start();
      }

      if (obj.activeSimulation == "tunnelVision") {
        tunnelVision.start();
      } 

      if (obj.activeSimulation == "redGreenColorBlindness") {
        redGreenColorBlindness.start();
      }

      if (obj.activeSimulation == "yellowBlueColorBlindness") {
        yellowBlueColorBlindness.start();
      }

      if (obj.activeSimulation == "totalColorBlindness") {
        totalColorBlindness.start();
      }

      if (obj.activeSimulation == "concentration") {
        concentration.start();
      }

      if (obj.activeSimulation == "parkinsons") {
        parkinsons.start();
      }

      if (obj.activeSimulation == "dyslexia") {
        dyslexia.start();
      }

    }); 

  }

  //reset extension
  
  function resetSimulation(){
    
    chrome.browserAction.setIcon({
      path : "img/icon.png"
    });

    tooltip.removeClass("in");
    $("#panel1").addClass("in");

    // TODO: Change this    
    $("#Syn").text("Syn");
    $("#Motorik").text("Motorik"); 
   
    // TODO: Clean up
    chrome.storage.local.get('activeSimulation', obj => {

      if(obj.activeSimulation == "farsightedness") {
        farsightedness.stop();
      }

      if (obj.activeSimulation == "tunnelVision") {
        tunnelVision.stop();
      } 

      if (obj.activeSimulation == "redGreenColorBlindness") {
        redGreenColorBlindness.stop();
      }

      if (obj.activeSimulation == "yellowBlueColorBlindness") {
        yellowBlueColorBlindness.stop();
      }

      if (obj.activeSimulation == "totalColorBlindness") {
        totalColorBlindness.stop();
      }

      if (obj.activeSimulation == "concentration") {
        concentration.stop();
      }

      if (obj.activeSimulation == "parkinsons") {
        parkinsons.stop();
      }

      if (obj.activeSimulation == "dyslexia") {
        dyslexia.stop();
      }

    }); 

  }

  //btn and links

  $("#reset-btn").click(() => {
    resetSimulation(); 
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
