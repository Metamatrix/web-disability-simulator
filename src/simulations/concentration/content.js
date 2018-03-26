import * as math from '../../utils/math.js';
import {getTextNodes, addCss, removeElement, appendHTML} from '../../utils/dom.js';
import {isLetter} from '../../utils/string.js';

const name = 'concentration';
let css = null;

function start() {

  const cssUrl = chrome.extension.getURL(`/simulations/${name}/css/main.css`);

  css = addCss(cssUrl);

  function createElement(element, classname, textNode) {
    const el = document.createElement(element); 
    el.setAttribute('class', classname);
    document.body.appendChild(el);
    if(textNode){
      el.appendChild(document.createTextNode(textNode));
    }
  }

  createElement('div', 'wds-img-element'); 

  function createTextNodes(text, index, array) {
    createElement('span', `wds-text-element-${index}`, text);
  }

  ['Did I eat lunch?', 
  'I have to get back to work soon...',
  'The ventilation sounds a lot today. bzzzzzz', 
  'Should I answer that text message?', 
  'Must concentrate, must concentrate, must concentrate'].forEach(createTextNodes);

  
  function addClass(element, classname) {
    var el = document.querySelectorAll(element);

    for (var i = 0; i < el.length; i++) {
        el[i].classList.toggle(classname);
    }
    
  }

  function removeClass(element, classname) {
       var el = document.querySelectorAll(element);

    for (var i = 0; i < el.length; i++) {
        el[i].classList.remove(classname);
    }
    
  }

  function loopInIntervals(min, max, domEl, classname) {
    var rand = Math.floor(Math.random() * (max - min + 1) + min);
    addClass(domEl, classname);
    setTimeout(loopInIntervals, rand * 1000);
  }


  const body = "body",
  h2 = "h2",
  p = "p",
  img = "img",
  imgEl_0 = ".wds-img-element",
  paragraphAnimation = "wds-paragraph-animation",
  headingAnimation = "wds-heading-animation",
  imgAnimation_0 = "wds-img-animation-0",
  imgAnimation_1 = "wds-img-animation-1",

  textEl_0 = ".wds-text-element-0",
  textEl_1 = ".wds-text-element-1", 
  textEl_2 = ".wds-text-element-2", 
  textEl_3 = ".wds-text-element-3", 
  textEl_4 = ".wds-text-element-4",

  textAnimation_0 = "wds-text-animation-0",
  textAnimation_1 = "wds-text-animation-1", 
  textAnimation_2 = "wds-text-animation-2", 
  textAnimation_3 = "wds-text-animation-3", 
  textAnimation_4 = "wds-text-animation-4"

  setTimeout(function(){ 
      loopInIntervals(2, 8, p, paragraphAnimation); 
      addClass(imgEl_0, imgAnimation_0); 
      addClass(img, imgAnimation_1); 
      addClass(h2, headingAnimation); 
  }, 500);

  setTimeout(function(){ 
      removeClass(imgEl_0, imgAnimation_0); 
      addClass(textEl_0 , textAnimation_0);  
  }, 5000);

  setTimeout(function(){ 
      removeClass(textEl_0, textAnimation_0); 
      addClass(textEl_1, textAnimation_1);  
  }, 12000);

  setTimeout(function(){ 
      removeClass(textEl_1, textAnimation_1);  
      addClass(textEl_2, textAnimation_2);
  }, 20000);

  setTimeout(function(){ 
      removeClass(textEl_2, textAnimation_2); 
      addClass(textEl_3, textAnimation_3);
  }, 26000);

  setTimeout(function(){ 
      removeClass(textEl_3, textAnimation_3); 
      addClass(textEl_4, textAnimation_4);
  }, 32000);


}


function stop() {

 //TODO: remove dom elements. 

  removeElement(css);

  removeElement(textElWork);
  removeElement(textElMeal);  

}


/*const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;
const velocity = 15;
const size = width * .225;

let circleElement = null;
let circle = null;
let raf = null;

function randomVelocity() {
  return random(velocity - 2, velocity + 2);
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

//animation loop
function loop() {
  circle.move();
  circle.update();

  raf = requestAnimationFrame(loop);
}

function start() {

  circleElement = document.createElement('div');
  circleElement.setAttribute('id', 'wds-concentrationCircle');

  setStyle(circleElement, {
    position: 'fixed', 
    backgroundColor: 'red',
    zIndex: '9999999',
    borderRadius: '50%'
  });

  document.body.appendChild(circleElement);

  circle = new Circle(
    random(0, width),
    random(0, height),
    velocity,
    velocity,
    size
  );

  loop();
}

function stop() {

  if(circleElement) {
    removeElement(circleElement);
  }

  if(raf) {
    cancelAnimationFrame(raf);
  }

  circle = null;

}*/

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'startSimulation' && request.simulation === name) {
    start();
  }
  else if (request.action === 'stopSimulation' && request.simulation === name) {
    stop();
  }
});