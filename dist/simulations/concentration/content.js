((() => {
  const circleElement = document.createElement('div');

  circleElement.setAttribute('id', 'wds-concentrationCircle');

  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  const velocity = 15;

  document.body.appendChild(circleElement);

  //generate a random number
  function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num; 
  }

  function randomVelocity() {
    return random(velocity - 2, velocity + 2);
  }

  function size() {
    const size = (width * 0.1); 
    return size; 
  }


  class Circle {
    constructor(x, y, velX, velY, size) {
      this.x = x;
      this.y = y; 
      this.velX = velX;
      this.velY = velY; 
      this.size = size; 

      circleElement.style.left = 0;
      circleElement.style.top = 0;

      circleElement.style.width = `${size}px`;
      circleElement.style.height = `${size}px`;

    }

    move() {
      circleElement.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
    }

    update() {
      if ((this.x + this.size) >= width - 2) {
        this.velX = -randomVelocity();
      }

      if ((this.x) <= 0) {
        this.velX = randomVelocity();
      }

      if ((this.y + this.size) >= height - 2) {
        this.velY = -randomVelocity();
      }

      if ((this.y) <= 0) {
        this.velY = randomVelocity();
      }

      this.x += this.velX;
      this.y += this.velY;
    }
  }

  const circle = new Circle(
      random(0,width),
      random(0,height),
      velocity,
      velocity,
      size()
    );

  //animation loop
  function loop() {

    circle.move();
    circle.update();

    requestAnimationFrame(loop);
  }
  loop();
}))()