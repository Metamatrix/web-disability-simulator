$(document).ready(function(){
    
  var tooltip = $( ".tool-tip" );
  
  
  //menu button click
  
  $(".menu-btn").click(function(){

    var $this = $(this); 
    var infoHeading = $(".disability-info-heading"); 
    var infoParagraph = $( ".disability-info-paragraph" ); 
    var adviceList = $( ".advice-list" ); 
    var moreInfoParagraph = $( ".more-info-paragraph" ); 
    var moreInfoHeading = $( ".more-info-heading" ); 
   
    infoHeading.empty();
    infoParagraph.empty();
    adviceList.empty();
    moreInfoParagraph.empty(); 
    moreInfoHeading.hide();

    tooltip.animate({
      left: parseInt(tooltip.css('left'),10) == 0 ?
        -tooltip.outerWidth() :
        0
    });

    infoHeading.append($(this).text());

    //dyslexia

    if ($(this).hasClass( "dyslexia" )) {
      infoParagraph.append(dyslexia.paragraph);
      
      $.each( dyslexia.listitems, function( key, value ) {
        adviceList.append('<li>' + value + '</li>');
      });
    }

    //parkinsons

    if ($(this).hasClass( "parkinsons" )) {
      infoParagraph.append(parkinsons.paragraph);
      
      $.each( parkinsons.listitems, function( key, value ) {
        adviceList.append('<li>' + value + '</li>');
      });
      moreInfoHeading.show();
      moreInfoParagraph.append(parkinsons.moreInfo);
    } 

    //color blindness

    if ($(this).hasClass( "colorBlindness" )) {
      infoParagraph.append(colorBlindness.paragraph);
      
      $.each( colorBlindness.listitems, function( key, value ) {
        adviceList.append('<li>' + value + '</li>');
      });
    } 

    //yellow blue color blindness

    if ($(this).hasClass( "yellowBlueColorBlindness" )) {
      infoParagraph.append(yellowBlueColorBlindness.paragraph);
      
      $.each(yellowBlueColorBlindness.listitems, function( key, value ) {
        adviceList.append('<li>' + value + '</li>');
      });
      moreInfoHeading.show();
      moreInfoParagraph.append(yellowBlueColorBlindness.moreInfo);
    } 

    //farsightedness

    if ($(this).hasClass( "farsightedness" )) {
      infoParagraph.append(farsightedness.paragraph);
      
      $.each(farsightedness.listitems, function( key, value ) {
        adviceList.append('<li>' + value + '</li>');
      });
      moreInfoHeading.show();
      moreInfoParagraph.append(farsightedness.moreInfo);
    } 

    //blurry vision

    if ($(this).hasClass( "blurryVision") || $(this).hasClass( "memory") || $(this).hasClass( "concentration") || $(this).hasClass( "hearing") ) {
      infoParagraph.append(LoremIpsum.paragraph);
      
      $.each( LoremIpsum.listitems, function( key, value ) {
        adviceList.append('<li>' + value + '</li>');
      });
    } 

    if ($(this).hasClass( "blurryVision" )) {
      showBlurr();
    } 
    
  });

  //reset-btn click

  $("#reset-btn").click(function(){
    tooltip.animate({
      left: parseInt(tooltip.css('marginLeft'),10) == 0 ?
        tooltip.outerWidth() :
        0
    }); 

    if ($(".dropdown-menu").hasClass("dropdown-menu-sight")){
      $("#selected").text("Syn");
    }
    
    resetCSS(); 
  });

});

//content scripts

function showBlurr(e) {
  chrome.tabs.insertCSS({
    file : "css/blurry-vision.css"
  });
}

function resetCSS(e) {
  chrome.tabs.insertCSS({
    file : "css/reset.css"
  });
}