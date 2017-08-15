//create canvas element

var canvas = document.createElement('canvas'); 
canvas.setAttribute('width', document.documentElement.clientWidth);
canvas.setAttribute('height', document.documentElement.clientHeight);
canvas.setAttribute('id', 'tunnelVisionCanvas');
document.body.appendChild(canvas); 

var context = canvas.getContext('2d');

var canvasPos = getPosition(canvas);
var mouseX = 0;
var mouseY = 0;
 
canvas.addEventListener("mousemove", setMousePosition, false);
 
function setMousePosition(e) {
  mouseX = e.clientX - canvasPos.x;
  mouseY = e.clientY - canvasPos.y;
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = 'black';
  context.rect(0,0,document.documentElement.clientWidth, document.documentElement.clientHeight);
  context.fill();

  //context.globalCompositeOperation='destination-out';
  context.beginPath();
  context.arc(mouseX, mouseY, 100, 0, 2 * Math.PI, false);
  context.fillStyle = "white";
  context.fill();

  requestAnimationFrame(update);
}
update();

function getPosition(el) {
  var xPosition = 0;
  var yPosition = 0;
 
  while (el) {
    xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
    yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
} 

















//context.clearRect(0,0,document.documentElement.clientWidth, document.documentElement.clientHeight);

//context.fillStyle = 'black';
//context.rect(0,0,document.documentElement.clientWidth, document.documentElement.clientHeight);
//context.fill();

//create transparent circle

/*context.globalCompositeOperation='destination-out';
context.beginPath();
context.arc(200, 200, 100, 0, 2 * Math.PI, false);
context.fill();*/

/*
document.onmousemove = moveCircle; 


$(window).on('mousemove', function(e) {
  console.log(e.clientX, e.pageX)
});

*/


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