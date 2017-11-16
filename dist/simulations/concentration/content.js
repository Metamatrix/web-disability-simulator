((() => {
  const circleElement = document.createElement('div');

  circleElement.setAttribute('id', 'wds-concentrationCircle');

  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;

  document.body.appendChild(circleElement);

  //generate a random number
  function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num; 
  }

  class Circle {
    constructor(x, y, velX, velY, size) {
      this.x = x;
      this.y = y; 
      this.velX = velX;
      this.velY = velY; 
      this.size = size; 
    }

    move() {
      circleElement.style.left= `${this.x}px`
      circleElement.style.top= `${this.y}px`
    }

    update() {
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
  }

  const circle = new Circle(
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
}))()


