$(document).ready(function(){
    
  var tooltip = $( ".tool-tip" );
  var infoHeading = $(".disability-info-heading"); 
  var infoParagraph = $( ".disability-info-paragraph" ); 
  var adviceList = $( ".advice-list" ); 
  var moreInfoParagraph = $( ".more-info-paragraph" ); 
  var moreInfoHeading = $( ".more-info-heading" ); 
  var mainHeading = $( ".main-heading" );
  var logo = $(".logo"); 
  
  //menu button click
  
  $(".menu-btn").click(function(){

    var $this = $(this); 
   
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
    logo.hide();
    mainHeading.show();  
    mainHeading.append($(this).text());

    $(this).closest(".dropdown").find(".selected").text($(this).text());

    var  id = $(this).attr( "id" );

    infoParagraph.append(data[id]);
      
    $.each( data[id + "-listItems"], function( key, value ) {
      adviceList.append('<li>' + value + '</li>');
    });

    if(data[id + "-moreInfo"]) {
      moreInfoHeading.show();
      moreInfoParagraph.append(data[id + "-moreInfo"]);
    }
    
  });

  //reset-btn click

  $("#reset-btn").click(function(){
    tooltip.animate({
      left: parseInt(tooltip.css('marginLeft'),10) == 0 ?
        tooltip.outerWidth() :
        0
    }); 
    mainHeading.hide(); 
    mainHeading.empty(); 
    logo.show();
    
    $(".dropdown").find("#Syn").text("Syn");
    $(".dropdown").find("#Motorik").text("Motorik"); 

  });

});