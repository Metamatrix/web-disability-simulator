dalto('red', 'Tritanopia'); 
dalto('blue', 'Tritanopia'); 
dalto('green', 'Tritanopia'); 
dalto('yellow', 'Tritanopia'); 

//Loopa igenom alla element på sidan och byt ut color, backgroundColor, borderColor, osv... nyansen X mot nyansen Y

var allElements = $( "*" );

allElements.each(function( index,value ) {
  var element = allElements[index].nodeName.toLowerCase();
  var selector= $(''+ element +'');
  console.log(selector); 

  $("button").click(function() {
    var backgroundColor = selector.css( "background-color" );
    var color = selector.css("color");
    var borderColor = selector.css( "border-color" );
    
    console.log(color);

    var resultBackgroundColor = dalto(backgroundColor, 'Tritanopia');
    var resultColor = dalto(color, 'Tritanopia');

    selector.css("background-color", resultBackgroundColor);
    selector.css("color", resultColor);

  }); 

});


