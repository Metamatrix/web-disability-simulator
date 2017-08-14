
//create canvas element

var canvas = document.createElement('canvas'); 
canvas.setAttribute('width', document.documentElement.clientWidth);
canvas.setAttribute('height', document.documentElement.clientHeight);
document.body.appendChild(canvas); 

var mouseX = 200;
var mouseY = 200;
var size = 100;

var context = canvas.getContext('2d');

context.clearRect(0,0,document.documentElement.clientWidth, document.documentElement.clientHeight);

context.fillStyle = 'black';
context.rect(0,0,document.documentElement.clientWidth, document.documentElement.clientHeight);
context.fill();

//create transparent circle

context.globalCompositeOperation='destination-out';
context.beginPath();
context.arc(mouseX, mouseY, size, 0, 2 * Math.PI, false);
context.fill();


document.onmousemove = moveCircle; 


$(window).on('mousemove', function(e) {
  console.log(e.clientX, e.pageX)
});




/*    var span = document.createElement('span');
    span.setAttribute('id', 'circle'); 
    document.body.appendChild(span); 

      document.onmousemove = moveCircle; 
      function moveCircle(e) {
        var circle = document.getElementById('circle'); 
        console.log(circle); 
        circle.style.left = e.pageX;
        circle.style.top = e.pageY;
      }

//circle.style.top = '100px' funkar. Hur göra med e.pageX? 

//jquery: 
/*    $(this).mousemove(function(e){
      console.log('fredag'); 
      $(".circle").css({left:e.pageX, top:e.pageY});
    });*/