import {resetCSS} from '../../src/simulations/general.js'
import {farsightedness} from '../../src/simulations/farsightedness/index.js'
import {tunnelVision} from '../../src/simulations/tunnelVision/index.js'
import {redGreenColorBlindness} from '../../src/simulations/redGreenColorBlindness/index.js'

$(document).ready(function(){
    
  var tooltip = $( ".tool-tip" );
  var infoHeading = $(".disability-info-heading"); 
  var infoParagraph = $( ".disability-info-paragraph" ); 
  var adviceList = $( ".advice-list" ); 
  var moreInfoParagraph = $( ".more-info-paragraph" ); 
  var moreInfoPanel = $( "#more-info-panel" ); 
  
  //menu button click
  
  $(".menu-btn").click(function(){

    var $this = $(this); 
   
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

    infoHeading.append($(this).text());

    $(this).closest(".dropdown").find(".selected").text($(this).text());

    var  id = $(this).attr( "id" );

    infoParagraph.append(data[id]);
      
    $.each( data[id + "-listItems"], function( key, value ) {
      adviceList.append('<li>' + value + '</li>');
    });

    if(data[id + "-moreInfo"]) {
      moreInfoPanel.show();
      moreInfoParagraph.append(data[id + "-moreInfo"]);
    }

    if ($(this).hasClass( "farsightedness" )) {
      farsightedness();
    } 

    if ($(this).hasClass( "tunnelVision" )) {
      tunnelVision();
    } 

    if ($(this).hasClass( "redGreenColorBlindness" )) {
      redGreenColorBlindness();
    } 
    
  });

  //reset-btn click

  $("#reset-btn").click(function(){
    tooltip.animate({
      left: parseInt(tooltip.css('marginLeft'),10) == 0 ?
        tooltip.outerWidth() :
        0
    }); 
    
    $(".dropdown").find("#Syn").text("Syn");
    $(".dropdown").find("#Motorik").text("Motorik"); 

    resetCSS();
  });

  //panel collapse, show arrows: 

  $('.collapse').on('shown.bs.collapse', function(){
      $(this).parent().find(".down-arrow").toggle();
      $(this).parent().find(".up-arrow").toggle(); 
    }).on('hidden.bs.collapse', function(){
      $(this).parent().find(".up-arrow").toggle();
      $(this).parent().find(".down-arrow").toggle();
  });

});