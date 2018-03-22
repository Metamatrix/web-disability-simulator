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
  createElement('h2', 'wds-text-element-meal','Did I eat lunch?');
  createElement('h2', 'wds-text-element-work','I have to get back to work soon...');  


 

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

  const backgroundImg = "wds-background-img",
  body = "body",
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  p = "p",
  a = "a",
  img = "img",
  div = "div",
  divEl = "wds-div-element",
  bodyEL = "wds-body-element",
  paragraphEl = "wds-paragraph-element",
  heading1El = "wds-heading1-element",
  heading2El = "wds-heading2-element",
  heading3El = "wds-heading3-element",
  imgEl = ".wds-img-element",
  mealImg = "meal-img",
  textElMeal = ".wds-text-element-meal",
  textElWork = ".wds-text-element-work",
  mealText = "meal-text",
  workText = "work-text"; 
 

  setTimeout(function(){ 
      addClass(imgEl, mealImg); 
      addClass(p, paragraphEl); 
      addClass(h1, heading1El); 
      addClass(h2, heading2El); 
      addClass(h2, heading3El); 
      addClass(div, divEl); 
  }, 500);

  setTimeout(function(){ 
      removeClass(imgEl, mealImg); 
      addClass(textElMeal, mealText);  
  }, 6000);

  setTimeout(function(){ 
      removeClass(imgEl, mealImg); 
      removeClass(textElMeal, mealText); 
      addClass(textElWork, workText);  
  }, 14000);

  setTimeout(function(){ 
      removeClass(textElWork, workText);  
  }, 22000);

  setTimeout(function(){  
      addClass(body, backgroundImg);
  }, 25000);


function loopInIntervals() {
  var min = 2,
      max = 10;
  var rand = Math.floor(Math.random() * (max - min + 1) + min);
  addClass(body, bodyEL);
  setTimeout(loopInIntervals, rand * 1000);
}

loopInIntervals();
}


function stop() {

 //TODO: remove dom elements. 

  clearInterval();

  removeElement(css);

  removeElement()

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