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


  //skriv om detta så att allt exekveras i ordning, något efter 3 sekunder, något efter 5 sek, något efter 10 etc.
  //Gör sedan så att det loopas och börjar om igen efter alla sekvenser.  

  function addClass(element, classname) {
    var el = document.querySelector(element);
    
    if (el) {
      el.classList.toggle(classname);
    } 
    
    return el;
  }

  function removeClass(element, classname) {
    var el = document.querySelector(element);
    
    if (el) {
      el.classList.remove(classname);
    } 
    
    return el;
  }

  const backgroundImg = "wds-concentration-background-img",
  body = "body",
  imgEl = ".wds-img-element",
  mealImg = "meal-img",
  textElMeal = ".wds-text-element-meal",
  textElWork = ".wds-text-element-work",
  mealText = "meal-text",
  workText = "work-text"; 
 

  setTimeout(function(){ 
      removeClass(body, backgroundImg);
      addClass(imgEl, mealImg); 
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

  

  //var animationInterval = window.setInterval(updateTransition, math.random(750, 7000));

/*
function loopInIntervals() {
  var min = 2,
      max = 10;
  var rand = Math.floor(Math.random() * (max - min + 1) + min);

  setTimeout(loopInIntervals, rand * 1000);
}

loopInIntervals(); */

}



function stop() {

 //TODO: remove dom elements. 
 //const element = document.getElementById('wds-colorBlindnessFilter');

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