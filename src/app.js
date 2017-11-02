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


  //Append UI texts

  navbarHeader.text(navbarHeaderText); 
  resetBtn.text(resetBtnText); 
  infoDropdown.text(infoDropdownText);
  adviceDropdown.text(adviceDropdownText);

  $.each(data.UI[0].simulations, (i, value) => {

    $(`#${value.heading}`).text(value.heading); 
    
    $.each(value.choices, (i, value) => {
      for(var key in value) {
        $(`#${key}`).text(value[key]);
      }
    });

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

    chrome.storage.sync.set({'activeSimulation': menuBtnId});
    chrome.storage.sync.set({'linkUrl': moreInfoUrl});

    infoHeading.empty();
    infoParagraph.empty();
    adviceList.empty();
    moreInfoLink.empty(); 
    moreInfoPanel.hide();

    tooltip.animate({
      left: parseInt(tooltip.css('left'),10) == 0 ?
        -tooltip.outerWidth() :
        0
    });

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

  //reset extension
  
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

  //btn and links

  $("#reset-btn").click(() => {
    resetSimulation(); 
  });

  $(".github-link").click(() => {
    chrome.tabs.create({url: 'https://github.com/Metamatrix/Web-Disability-Simulator'}); 
  });
 
  $(".more-info-link").click(() => {
    chrome.storage.sync.get('linkUrl', obj => {
      chrome.tabs.create({url: `${obj.linkUrl}`}); 
    }); 
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
  
  };
  
});