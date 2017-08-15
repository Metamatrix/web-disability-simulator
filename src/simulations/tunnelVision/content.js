//create canvas element

var canvas = document.createElement('canvas'); 
canvas.setAttribute('width', document.documentElement.clientWidth);
canvas.setAttribute('height', document.documentElement.clientHeight);
canvas.setAttribute('id', 'tunnelVisionCanvas');
document.body.appendChild(canvas); 

var context = canvas.getContext('2d');

var canvasPos = getPosition(canvas);
var mouseX = 1000;
var mouseY = 500;
var size = Math.min(window.innerWidth*0.3, 300);

window.addEventListener("resize", setSize, false);

function setSize(e) {
  canvas.setAttribute('width', document.documentElement.clientWidth);
  canvas.setAttribute('height', document.documentElement.clientHeight);
  size = Math.min(window.innerWidth*0.3, 300);
  update(); 
}

canvas.addEventListener("mousemove", setMousePosition, false);
 
function setMousePosition(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  update();
  console.log('funktion körs', mouseX, mouseY); 
}

function update() {
 context.clearRect(0,0,window.innerWidth,window.innerHeight);
 
 context.fillStyle = 'black';
 context.rect(0,0,window.innerWidth,window.innerHeight);
 context.fill();

 context.save();
 
 context.globalCompositeOperation='destination-out';
 
 var gradient = context.createRadialGradient(mouseX, mouseY, size / 2, mouseX, mouseY, 0);
 gradient.addColorStop(0, 'transparent');
 gradient.addColorStop(.25, 'white');
 gradient.addColorStop(1, 'white');
 context.fillStyle = gradient;
 context.fillRect(mouseX - size / 2, mouseY - size / 2, size, size);
 
 context.restore();
 
} 

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