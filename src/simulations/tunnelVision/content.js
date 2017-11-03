//create canvas element

if (document.body.contains(document.querySelector('#wds-tunnelVisionCanvas'))) {
  document.querySelector('canvas').remove();
}

const canvas = document.createElement('canvas'); 
canvas.setAttribute('width', document.documentElement.clientWidth);
canvas.setAttribute('height', document.documentElement.clientHeight);
canvas.setAttribute('id', 'wds-tunnelVisionCanvas');
document.body.appendChild(canvas); 

const context = canvas.getContext('2d');

let mouseX = 1000;
let mouseY = 500;
let size = Math.min(window.innerWidth*0.3, 300);

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
}

function update() {
  context.clearRect(0,0,window.innerWidth,window.innerHeight);
  
  context.fillStyle = 'black';
  context.rect(0,0,window.innerWidth,window.innerHeight);
  context.fill();

  context.save();
  
  context.globalCompositeOperation='destination-out';
  
  const gradient = context.createRadialGradient(mouseX, mouseY, size / 2, mouseX, mouseY, 0);
  gradient.addColorStop(0, 'transparent');
  gradient.addColorStop(.25, 'white');
  gradient.addColorStop(1, 'white');
  context.fillStyle = gradient;
  context.fillRect(mouseX - size / 2, mouseY - size / 2, size, size);
  
  context.restore();
}
update(); 