import {resetCSS} from '../../src/simulations/general.js'
import {farsightedness} from '../../src/simulations/farsightedness/index.js'
import {tunnelVision} from '../../src/simulations/tunnelVision/index.js'
import {redGreenColorBlindness} from '../../src/simulations/redGreenColorBlindness/index.js'

$(document).ready(() => {

  const tooltip = $( ".tool-tip" );
  const infoHeading = $(".disability-info-heading"); 
  const infoParagraph = $( ".disability-info-paragraph" ); 
  const adviceList = $( ".advice-list" ); 
  const moreInfoParagraph = $( ".more-info-paragraph" ); 
  const moreInfoPanel = $( "#more-info-panel" ); 
  
  //menu button click
  
  $(".menu-btn").click(function(){

    const menuBtn = $(this); 
    const menuBtnId = menuBtn[0].id;

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

    const id = menuBtn.attr("id");

    infoParagraph.append(data[id]);
      
    $.each( data[`${id}-listItems`], (key, value) => {
      adviceList.append(`<li>${value}</li>`);
    });

    if(data[`${id}-moreInfo`]) {
      moreInfoPanel.show();
      moreInfoParagraph.append(data[`${id}-moreInfo`]);
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

  //reset-btn click

  $("#reset-btn").click(() => {
    tooltip.animate({
      left: parseInt(tooltip.css('marginLeft'),10) == 0 ?
        tooltip.outerWidth() :
        0
    }); 
    
    $("#Syn").text("Syn");
    $("#Motorik").text("Motorik"); 

    resetCSS();
    chrome.storage.sync.remove('activeSimulation');
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
      
      if (activeSimulation != null) {

        tooltip.css("left", "0");

        infoHeading.append( $(`#${activeSimulation}`).text() );

        $(`#${activeSimulation}`).closest(".dropdown").find(".selected").text($(`#${activeSimulation}`).text());

        const id = $(`#${activeSimulation}`).attr("id");

        infoParagraph.append(data[id]);
          
        $.each( data[`${id}-listItems`], (key, value) => {
          adviceList.append(`<li>${value}</li>`);
        });

        if(data[`${id}-moreInfo`]) {
          moreInfoPanel.show();
          moreInfoParagraph.append(data[`${id}-moreInfo`]);
        }

      }

    }); 
  
  };

});