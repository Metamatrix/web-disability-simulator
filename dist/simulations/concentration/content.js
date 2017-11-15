(function(){

  const circleElement = document.createElement('div'); 

  circleElement.setAttribute('id', 'wds-concentrationCircle');

  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight; 

  document.body.appendChild(circleElement); 

  //generate a random number
  function random(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num; 
  }

  function Circle(x, y, velX, velY, size) {
    this.x = x;
    this.y = y; 
    this.velX = velX;
    this.velY = velY; 
    this.size = size; 
  }

  Circle.prototype.move = function() {
    circleElement.style.left= this.x + 'px'
    circleElement.style.top= this.y + 'px'
  }

  Circle.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  var circle = new Circle(
      random(0,width),
      random(0,height),
      15,
      15,
      100
    );

//animation loop
function loop() {

  circle.move();
  circle.update();

  requestAnimationFrame(loop);
}
loop(); 


})()


