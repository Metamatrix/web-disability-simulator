(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _math = require('../../utils/math.js');

var math = _interopRequireWildcard(_math);

var _dom = require('../../utils/dom.js');

var _string = require('../../utils/string.js');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

var name = 'concentration';
var css = null;

function start() {

  var cssUrl = chrome.extension.getURL('/simulations/' + name + '/css/main.css');

  css = (0, _dom.addCss)(cssUrl);

  function createElement(element, classname, textNode) {
    var el = document.createElement(element);
    el.setAttribute('class', classname);
    document.body.appendChild(el);
    if (textNode) {
      el.appendChild(document.createTextNode(textNode));
    }
  }

  createElement('div', 'wds-img-element');
  createElement('h2', 'wds-text-element-meal', 'Did I eat lunch?');
  createElement('h2', 'wds-text-element-work', 'I have to get back to work soon...');

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

  var backgroundImg = "wds-concentration-background-img",
      body = "body",
      imgEl = ".wds-img-element",
      mealImg = "meal-img",
      textElMeal = ".wds-text-element-meal",
      textElWork = ".wds-text-element-work",
      mealText = "meal-text",
      workText = "work-text";

  setTimeout(function () {
    removeClass(body, backgroundImg);
    addClass(imgEl, mealImg);
  }, 500);

  setTimeout(function () {
    removeClass(imgEl, mealImg);
    addClass(textElMeal, mealText);
  }, 6000);

  setTimeout(function () {
    removeClass(imgEl, mealImg);
    removeClass(textElMeal, mealText);
    addClass(textElWork, workText);
  }, 14000);

  setTimeout(function () {
    removeClass(textElWork, workText);
  }, 22000);

  setTimeout(function () {
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

  (0, _dom.removeElement)(css);

  (0, _dom.removeElement)();
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

chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === 'startSimulation' && request.simulation === name) {
    start();
  } else if (request.action === 'stopSimulation' && request.simulation === name) {
    stop();
  }
});


},{"../../utils/dom.js":2,"../../utils/math.js":3,"../../utils/string.js":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCss = addCss;
exports.addScript = addScript;
exports.addStyle = addStyle;
exports.appendHTML = appendHTML;
exports.getTextNodes = getTextNodes;
exports.removeElement = removeElement;
exports.setStyle = setStyle;
function addCss(href, callback) {
  var l = document.createElement('link');
  l.setAttribute('href', href);
  l.setAttribute('rel', 'stylesheet');
  l.onload = callback;
  document.getElementsByTagName('head')[0].appendChild(l);
  return l;
}

function addScript(src, callback) {
  var s = document.createElement('script');
  s.setAttribute('src', src);
  s.onload = callback;
  document.getElementsByTagName('head')[0].appendChild(s);
  return s;
}

function addStyle(str) {
  var s = document.createElement('style');
  s.innerText = str;
  document.getElementsByTagName('head')[0].appendChild(s);
  return s;
}

function appendHTML(el, html) {
  var tmpEl = document.createElement('div');
  tmpEl.innerHTML = html;

  while (tmpEl.firstChild) {
    el.appendChild(tmpEl.firstChild);
  }
}

function getTextNodes(node) {
  var all = [];
  for (node = node.firstChild; node; node = node.nextSibling) {
    if (node.nodeType == 3) all.push(node);else all = all.concat(getTextNodes(node));
  }
  return all;
}

function removeElement(el) {
  el.parentNode.removeChild(el);
}

function setStyle(element, style) {
  for (var s in style) {
    element.style[s] = style[s];
  }
}


},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.random = random;
exports.pointInRect = pointInRect;
exports.inRange = inRange;
function random(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

function pointInRect(x, y, rect) {
  return inRange(x, rect.x, rect.x + rect.width) && inRange(y, rect.y, rect.y + rect.height);
}

function inRange(value, min, max) {
  return value >= Math.min(min, max) && value <= Math.max(min, max);
}


},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLetter = isLetter;
exports.isUpperCase = isUpperCase;
function isLetter(c) {
  return c.toLowerCase() !== c.toUpperCase();
}

function isUpperCase(c) {
  return c === c.toUpperCase();
}


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC9zaW11bGF0aW9ucy9jb25jZW50cmF0aW9uL2NvbnRlbnQuanMiLCJidWlsZC9qcy9iYWJlbC91dGlscy9kb20uanMiLCJidWlsZC9qcy9iYWJlbC91dGlscy9tYXRoLmpzIiwiYnVpbGQvanMvYmFiZWwvdXRpbHMvc3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsSUFBSSxRQUFRLFFBQVEscUJBQVIsQ0FBWjs7QUFFQSxJQUFJLE9BQU8sd0JBQXdCLEtBQXhCLENBQVg7O0FBRUEsSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBWDs7QUFFQSxJQUFJLFVBQVUsUUFBUSx1QkFBUixDQUFkOztBQUVBLFNBQVMsdUJBQVQsQ0FBaUMsR0FBakMsRUFBc0M7QUFBRSxNQUFJLE9BQU8sSUFBSSxVQUFmLEVBQTJCO0FBQUUsV0FBTyxHQUFQO0FBQWEsR0FBMUMsTUFBZ0Q7QUFBRSxRQUFJLFNBQVMsRUFBYixDQUFpQixJQUFJLE9BQU8sSUFBWCxFQUFpQjtBQUFFLFdBQUssSUFBSSxHQUFULElBQWdCLEdBQWhCLEVBQXFCO0FBQUUsWUFBSSxPQUFPLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBcUMsR0FBckMsRUFBMEMsR0FBMUMsQ0FBSixFQUFvRCxPQUFPLEdBQVAsSUFBYyxJQUFJLEdBQUosQ0FBZDtBQUF5QjtBQUFFLEtBQUMsT0FBTyxPQUFQLEdBQWlCLEdBQWpCLENBQXNCLE9BQU8sTUFBUDtBQUFnQjtBQUFFOztBQUU3USxJQUFJLE9BQU8sZUFBWDtBQUNBLElBQUksTUFBTSxJQUFWOztBQUVBLFNBQVMsS0FBVCxHQUFpQjs7QUFFZixNQUFJLFNBQVMsT0FBTyxTQUFQLENBQWlCLE1BQWpCLENBQXdCLGtCQUFrQixJQUFsQixHQUF5QixlQUFqRCxDQUFiOztBQUVBLFFBQU0sQ0FBQyxHQUFHLEtBQUssTUFBVCxFQUFpQixNQUFqQixDQUFOOztBQUVBLFdBQVMsYUFBVCxDQUF1QixPQUF2QixFQUFnQyxTQUFoQyxFQUEyQyxRQUEzQyxFQUFxRDtBQUNuRCxRQUFJLEtBQUssU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQVQ7QUFDQSxPQUFHLFlBQUgsQ0FBZ0IsT0FBaEIsRUFBeUIsU0FBekI7QUFDQSxhQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLEVBQTFCO0FBQ0EsUUFBSSxRQUFKLEVBQWM7QUFDWixTQUFHLFdBQUgsQ0FBZSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZjtBQUNEO0FBQ0Y7O0FBRUQsZ0JBQWMsS0FBZCxFQUFxQixpQkFBckI7QUFDQSxnQkFBYyxJQUFkLEVBQW9CLHVCQUFwQixFQUE2QyxrQkFBN0M7QUFDQSxnQkFBYyxJQUFkLEVBQW9CLHVCQUFwQixFQUE2QyxvQ0FBN0M7O0FBRUE7QUFDQTs7QUFFQSxXQUFTLFFBQVQsQ0FBa0IsT0FBbEIsRUFBMkIsU0FBM0IsRUFBc0M7QUFDcEMsUUFBSSxLQUFLLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFUOztBQUVBLFFBQUksRUFBSixFQUFRO0FBQ04sU0FBRyxTQUFILENBQWEsTUFBYixDQUFvQixTQUFwQjtBQUNEOztBQUVELFdBQU8sRUFBUDtBQUNEOztBQUVELFdBQVMsV0FBVCxDQUFxQixPQUFyQixFQUE4QixTQUE5QixFQUF5QztBQUN2QyxRQUFJLEtBQUssU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQVQ7O0FBRUEsUUFBSSxFQUFKLEVBQVE7QUFDTixTQUFHLFNBQUgsQ0FBYSxNQUFiLENBQW9CLFNBQXBCO0FBQ0Q7O0FBRUQsV0FBTyxFQUFQO0FBQ0Q7O0FBRUQsTUFBSSxnQkFBZ0Isa0NBQXBCO0FBQUEsTUFDSSxPQUFPLE1BRFg7QUFBQSxNQUVJLFFBQVEsa0JBRlo7QUFBQSxNQUdJLFVBQVUsVUFIZDtBQUFBLE1BSUksYUFBYSx3QkFKakI7QUFBQSxNQUtJLGFBQWEsd0JBTGpCO0FBQUEsTUFNSSxXQUFXLFdBTmY7QUFBQSxNQU9JLFdBQVcsV0FQZjs7QUFTQSxhQUFXLFlBQVk7QUFDckIsZ0JBQVksSUFBWixFQUFrQixhQUFsQjtBQUNBLGFBQVMsS0FBVCxFQUFnQixPQUFoQjtBQUNELEdBSEQsRUFHRyxHQUhIOztBQUtBLGFBQVcsWUFBWTtBQUNyQixnQkFBWSxLQUFaLEVBQW1CLE9BQW5CO0FBQ0EsYUFBUyxVQUFULEVBQXFCLFFBQXJCO0FBQ0QsR0FIRCxFQUdHLElBSEg7O0FBS0EsYUFBVyxZQUFZO0FBQ3JCLGdCQUFZLEtBQVosRUFBbUIsT0FBbkI7QUFDQSxnQkFBWSxVQUFaLEVBQXdCLFFBQXhCO0FBQ0EsYUFBUyxVQUFULEVBQXFCLFFBQXJCO0FBQ0QsR0FKRCxFQUlHLEtBSkg7O0FBTUEsYUFBVyxZQUFZO0FBQ3JCLGdCQUFZLFVBQVosRUFBd0IsUUFBeEI7QUFDRCxHQUZELEVBRUcsS0FGSDs7QUFJQSxhQUFXLFlBQVk7QUFDckIsYUFBUyxJQUFULEVBQWUsYUFBZjtBQUNELEdBRkQsRUFFRyxLQUZIOztBQUlBOztBQUVBOzs7Ozs7Ozs7O0FBVUQ7O0FBRUQsU0FBUyxJQUFULEdBQWdCOztBQUVkO0FBQ0E7O0FBRUE7O0FBRUEsR0FBQyxHQUFHLEtBQUssYUFBVCxFQUF3QixHQUF4Qjs7QUFFQSxHQUFDLEdBQUcsS0FBSyxhQUFUO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNHQSxPQUFPLE9BQVAsQ0FBZSxTQUFmLENBQXlCLFdBQXpCLENBQXFDLFVBQVUsT0FBVixFQUFtQjtBQUN0RCxNQUFJLFFBQVEsTUFBUixLQUFtQixpQkFBbkIsSUFBd0MsUUFBUSxVQUFSLEtBQXVCLElBQW5FLEVBQXlFO0FBQ3ZFO0FBQ0QsR0FGRCxNQUVPLElBQUksUUFBUSxNQUFSLEtBQW1CLGdCQUFuQixJQUF1QyxRQUFRLFVBQVIsS0FBdUIsSUFBbEUsRUFBd0U7QUFDN0U7QUFDRDtBQUNGLENBTkQ7QUFPQTs7O0FDak9BOztBQUVBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQyxTQUFPO0FBRG9DLENBQTdDO0FBR0EsUUFBUSxNQUFSLEdBQWlCLE1BQWpCO0FBQ0EsUUFBUSxTQUFSLEdBQW9CLFNBQXBCO0FBQ0EsUUFBUSxRQUFSLEdBQW1CLFFBQW5CO0FBQ0EsUUFBUSxVQUFSLEdBQXFCLFVBQXJCO0FBQ0EsUUFBUSxZQUFSLEdBQXVCLFlBQXZCO0FBQ0EsUUFBUSxhQUFSLEdBQXdCLGFBQXhCO0FBQ0EsUUFBUSxRQUFSLEdBQW1CLFFBQW5CO0FBQ0EsU0FBUyxNQUFULENBQWdCLElBQWhCLEVBQXNCLFFBQXRCLEVBQWdDO0FBQzlCLE1BQUksSUFBSSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBUjtBQUNBLElBQUUsWUFBRixDQUFlLE1BQWYsRUFBdUIsSUFBdkI7QUFDQSxJQUFFLFlBQUYsQ0FBZSxLQUFmLEVBQXNCLFlBQXRCO0FBQ0EsSUFBRSxNQUFGLEdBQVcsUUFBWDtBQUNBLFdBQVMsb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0MsQ0FBdEMsRUFBeUMsV0FBekMsQ0FBcUQsQ0FBckQ7QUFDQSxTQUFPLENBQVA7QUFDRDs7QUFFRCxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0IsUUFBeEIsRUFBa0M7QUFDaEMsTUFBSSxJQUFJLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFSO0FBQ0EsSUFBRSxZQUFGLENBQWUsS0FBZixFQUFzQixHQUF0QjtBQUNBLElBQUUsTUFBRixHQUFXLFFBQVg7QUFDQSxXQUFTLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLEVBQXlDLFdBQXpDLENBQXFELENBQXJEO0FBQ0EsU0FBTyxDQUFQO0FBQ0Q7O0FBRUQsU0FBUyxRQUFULENBQWtCLEdBQWxCLEVBQXVCO0FBQ3JCLE1BQUksSUFBSSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUjtBQUNBLElBQUUsU0FBRixHQUFjLEdBQWQ7QUFDQSxXQUFTLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLEVBQXlDLFdBQXpDLENBQXFELENBQXJEO0FBQ0EsU0FBTyxDQUFQO0FBQ0Q7O0FBRUQsU0FBUyxVQUFULENBQW9CLEVBQXBCLEVBQXdCLElBQXhCLEVBQThCO0FBQzVCLE1BQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBLFFBQU0sU0FBTixHQUFrQixJQUFsQjs7QUFFQSxTQUFPLE1BQU0sVUFBYixFQUF5QjtBQUN2QixPQUFHLFdBQUgsQ0FBZSxNQUFNLFVBQXJCO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTLFlBQVQsQ0FBc0IsSUFBdEIsRUFBNEI7QUFDMUIsTUFBSSxNQUFNLEVBQVY7QUFDQSxPQUFLLE9BQU8sS0FBSyxVQUFqQixFQUE2QixJQUE3QixFQUFtQyxPQUFPLEtBQUssV0FBL0MsRUFBNEQ7QUFDMUQsUUFBSSxLQUFLLFFBQUwsSUFBaUIsQ0FBckIsRUFBd0IsSUFBSSxJQUFKLENBQVMsSUFBVCxFQUF4QixLQUE0QyxNQUFNLElBQUksTUFBSixDQUFXLGFBQWEsSUFBYixDQUFYLENBQU47QUFDN0M7QUFDRCxTQUFPLEdBQVA7QUFDRDs7QUFFRCxTQUFTLGFBQVQsQ0FBdUIsRUFBdkIsRUFBMkI7QUFDekIsS0FBRyxVQUFILENBQWMsV0FBZCxDQUEwQixFQUExQjtBQUNEOztBQUVELFNBQVMsUUFBVCxDQUFrQixPQUFsQixFQUEyQixLQUEzQixFQUFrQztBQUNoQyxPQUFLLElBQUksQ0FBVCxJQUFjLEtBQWQsRUFBcUI7QUFDbkIsWUFBUSxLQUFSLENBQWMsQ0FBZCxJQUFtQixNQUFNLENBQU4sQ0FBbkI7QUFDRDtBQUNGO0FBQ0Q7OztBQzlEQTs7QUFFQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsU0FBTztBQURvQyxDQUE3QztBQUdBLFFBQVEsTUFBUixHQUFpQixNQUFqQjtBQUNBLFFBQVEsV0FBUixHQUFzQixXQUF0QjtBQUNBLFFBQVEsT0FBUixHQUFrQixPQUFsQjtBQUNBLFNBQVMsTUFBVCxDQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQjtBQUN4QixTQUFPLEtBQUssS0FBTCxDQUFXLE1BQU0sS0FBSyxNQUFMLE1BQWlCLE1BQU0sR0FBTixHQUFZLENBQTdCLENBQWpCLENBQVA7QUFDRDs7QUFFRCxTQUFTLFdBQVQsQ0FBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkIsSUFBM0IsRUFBaUM7QUFDL0IsU0FBTyxRQUFRLENBQVIsRUFBVyxLQUFLLENBQWhCLEVBQW1CLEtBQUssQ0FBTCxHQUFTLEtBQUssS0FBakMsS0FBMkMsUUFBUSxDQUFSLEVBQVcsS0FBSyxDQUFoQixFQUFtQixLQUFLLENBQUwsR0FBUyxLQUFLLE1BQWpDLENBQWxEO0FBQ0Q7O0FBRUQsU0FBUyxPQUFULENBQWlCLEtBQWpCLEVBQXdCLEdBQXhCLEVBQTZCLEdBQTdCLEVBQWtDO0FBQ2hDLFNBQU8sU0FBUyxLQUFLLEdBQUwsQ0FBUyxHQUFULEVBQWMsR0FBZCxDQUFULElBQStCLFNBQVMsS0FBSyxHQUFMLENBQVMsR0FBVCxFQUFjLEdBQWQsQ0FBL0M7QUFDRDtBQUNEOzs7QUNuQkE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxRQUFRLFFBQVIsR0FBbUIsUUFBbkI7QUFDQSxRQUFRLFdBQVIsR0FBc0IsV0FBdEI7QUFDQSxTQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBcUI7QUFDbkIsU0FBTyxFQUFFLFdBQUYsT0FBb0IsRUFBRSxXQUFGLEVBQTNCO0FBQ0Q7O0FBRUQsU0FBUyxXQUFULENBQXFCLENBQXJCLEVBQXdCO0FBQ3RCLFNBQU8sTUFBTSxFQUFFLFdBQUYsRUFBYjtBQUNEO0FBQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9tYXRoID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvbWF0aC5qcycpO1xuXG52YXIgbWF0aCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9tYXRoKTtcblxudmFyIF9kb20gPSByZXF1aXJlKCcuLi8uLi91dGlscy9kb20uanMnKTtcblxudmFyIF9zdHJpbmcgPSByZXF1aXJlKCcuLi8uLi91dGlscy9zdHJpbmcuanMnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxudmFyIG5hbWUgPSAnY29uY2VudHJhdGlvbic7XG52YXIgY3NzID0gbnVsbDtcblxuZnVuY3Rpb24gc3RhcnQoKSB7XG5cbiAgdmFyIGNzc1VybCA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvc2ltdWxhdGlvbnMvJyArIG5hbWUgKyAnL2Nzcy9tYWluLmNzcycpO1xuXG4gIGNzcyA9ICgwLCBfZG9tLmFkZENzcykoY3NzVXJsKTtcblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGVsZW1lbnQsIGNsYXNzbmFtZSwgdGV4dE5vZGUpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbGFzc25hbWUpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIGlmICh0ZXh0Tm9kZSkge1xuICAgICAgZWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dE5vZGUpKTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVFbGVtZW50KCdkaXYnLCAnd2RzLWltZy1lbGVtZW50Jyk7XG4gIGNyZWF0ZUVsZW1lbnQoJ2gyJywgJ3dkcy10ZXh0LWVsZW1lbnQtbWVhbCcsICdEaWQgSSBlYXQgbHVuY2g/Jyk7XG4gIGNyZWF0ZUVsZW1lbnQoJ2gyJywgJ3dkcy10ZXh0LWVsZW1lbnQtd29yaycsICdJIGhhdmUgdG8gZ2V0IGJhY2sgdG8gd29yayBzb29uLi4uJyk7XG5cbiAgLy9za3JpdiBvbSBkZXR0YSBzw6UgYXR0IGFsbHQgZXhla3ZlcmFzIGkgb3JkbmluZywgbsOlZ290IGVmdGVyIDMgc2VrdW5kZXIsIG7DpWdvdCBlZnRlciA1IHNlaywgbsOlZ290IGVmdGVyIDEwIGV0Yy5cbiAgLy9Hw7ZyIHNlZGFuIHPDpSBhdHQgZGV0IGxvb3BhcyBvY2ggYsO2cmphciBvbSBpZ2VuIGVmdGVyIGFsbGEgc2VrdmVuc2VyLiAgXG5cbiAgZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NuYW1lKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTtcblxuICAgIGlmIChlbCkge1xuICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc25hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzbmFtZSkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7XG5cbiAgICBpZiAoZWwpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NuYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICB2YXIgYmFja2dyb3VuZEltZyA9IFwid2RzLWNvbmNlbnRyYXRpb24tYmFja2dyb3VuZC1pbWdcIixcbiAgICAgIGJvZHkgPSBcImJvZHlcIixcbiAgICAgIGltZ0VsID0gXCIud2RzLWltZy1lbGVtZW50XCIsXG4gICAgICBtZWFsSW1nID0gXCJtZWFsLWltZ1wiLFxuICAgICAgdGV4dEVsTWVhbCA9IFwiLndkcy10ZXh0LWVsZW1lbnQtbWVhbFwiLFxuICAgICAgdGV4dEVsV29yayA9IFwiLndkcy10ZXh0LWVsZW1lbnQtd29ya1wiLFxuICAgICAgbWVhbFRleHQgPSBcIm1lYWwtdGV4dFwiLFxuICAgICAgd29ya1RleHQgPSBcIndvcmstdGV4dFwiO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHJlbW92ZUNsYXNzKGJvZHksIGJhY2tncm91bmRJbWcpO1xuICAgIGFkZENsYXNzKGltZ0VsLCBtZWFsSW1nKTtcbiAgfSwgNTAwKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICByZW1vdmVDbGFzcyhpbWdFbCwgbWVhbEltZyk7XG4gICAgYWRkQ2xhc3ModGV4dEVsTWVhbCwgbWVhbFRleHQpO1xuICB9LCA2MDAwKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICByZW1vdmVDbGFzcyhpbWdFbCwgbWVhbEltZyk7XG4gICAgcmVtb3ZlQ2xhc3ModGV4dEVsTWVhbCwgbWVhbFRleHQpO1xuICAgIGFkZENsYXNzKHRleHRFbFdvcmssIHdvcmtUZXh0KTtcbiAgfSwgMTQwMDApO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHJlbW92ZUNsYXNzKHRleHRFbFdvcmssIHdvcmtUZXh0KTtcbiAgfSwgMjIwMDApO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIGFkZENsYXNzKGJvZHksIGJhY2tncm91bmRJbWcpO1xuICB9LCAyNTAwMCk7XG5cbiAgLy92YXIgYW5pbWF0aW9uSW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwodXBkYXRlVHJhbnNpdGlvbiwgbWF0aC5yYW5kb20oNzUwLCA3MDAwKSk7XG5cbiAgLypcclxuICBmdW5jdGlvbiBsb29wSW5JbnRlcnZhbHMoKSB7XHJcbiAgICB2YXIgbWluID0gMixcclxuICAgICAgICBtYXggPSAxMDtcclxuICAgIHZhciByYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcclxuICBcclxuICAgIHNldFRpbWVvdXQobG9vcEluSW50ZXJ2YWxzLCByYW5kICogMTAwMCk7XHJcbiAgfVxyXG4gIFxyXG4gIGxvb3BJbkludGVydmFscygpOyAqL1xufVxuXG5mdW5jdGlvbiBzdG9wKCkge1xuXG4gIC8vVE9ETzogcmVtb3ZlIGRvbSBlbGVtZW50cy4gXG4gIC8vY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZHMtY29sb3JCbGluZG5lc3NGaWx0ZXInKTtcblxuICBjbGVhckludGVydmFsKCk7XG5cbiAgKDAsIF9kb20ucmVtb3ZlRWxlbWVudCkoY3NzKTtcblxuICAoMCwgX2RvbS5yZW1vdmVFbGVtZW50KSgpO1xufVxuXG4vKmNvbnN0IHdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG5jb25zdCBoZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG5jb25zdCB2ZWxvY2l0eSA9IDE1O1xyXG5jb25zdCBzaXplID0gd2lkdGggKiAuMjI1O1xyXG5cclxubGV0IGNpcmNsZUVsZW1lbnQgPSBudWxsO1xyXG5sZXQgY2lyY2xlID0gbnVsbDtcclxubGV0IHJhZiA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiByYW5kb21WZWxvY2l0eSgpIHtcclxuICByZXR1cm4gcmFuZG9tKHZlbG9jaXR5IC0gMiwgdmVsb2NpdHkgKyAyKTtcclxufVxyXG5cclxuY2xhc3MgQ2lyY2xlIHtcclxuICBjb25zdHJ1Y3Rvcih4LCB5LCB2ZWxYLCB2ZWxZLCBzaXplKSB7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTsgXHJcbiAgICB0aGlzLnZlbFggPSB2ZWxYO1xyXG4gICAgdGhpcy52ZWxZID0gdmVsWTsgXHJcbiAgICB0aGlzLnNpemUgPSBzaXplOyBcclxuXHJcbiAgICBjaXJjbGVFbGVtZW50LnN0eWxlLmxlZnQgPSAwO1xyXG4gICAgY2lyY2xlRWxlbWVudC5zdHlsZS50b3AgPSAwO1xyXG5cclxuICAgIGNpcmNsZUVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHtzaXplfXB4YDtcclxuICAgIGNpcmNsZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZX1weGA7XHJcblxyXG4gIH1cclxuXHJcbiAgbW92ZSgpIHtcclxuICAgIGNpcmNsZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7dGhpcy54fXB4LCAke3RoaXMueX1weCwgMClgO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgaWYgKCh0aGlzLnggKyB0aGlzLnNpemUpID49IHdpZHRoIC0gMikge1xyXG4gICAgICB0aGlzLnZlbFggPSAtcmFuZG9tVmVsb2NpdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoKHRoaXMueCkgPD0gMCkge1xyXG4gICAgICB0aGlzLnZlbFggPSByYW5kb21WZWxvY2l0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgodGhpcy55ICsgdGhpcy5zaXplKSA+PSBoZWlnaHQgLSAyKSB7XHJcbiAgICAgIHRoaXMudmVsWSA9IC1yYW5kb21WZWxvY2l0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgodGhpcy55KSA8PSAwKSB7XHJcbiAgICAgIHRoaXMudmVsWSA9IHJhbmRvbVZlbG9jaXR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy54ICs9IHRoaXMudmVsWDtcclxuICAgIHRoaXMueSArPSB0aGlzLnZlbFk7XHJcbiAgfVxyXG59XHJcblxyXG4vL2FuaW1hdGlvbiBsb29wXHJcbmZ1bmN0aW9uIGxvb3AoKSB7XHJcbiAgY2lyY2xlLm1vdmUoKTtcclxuICBjaXJjbGUudXBkYXRlKCk7XHJcblxyXG4gIHJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnQoKSB7XHJcblxyXG4gIGNpcmNsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBjaXJjbGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2RzLWNvbmNlbnRyYXRpb25DaXJjbGUnKTtcclxuXHJcbiAgc2V0U3R5bGUoY2lyY2xlRWxlbWVudCwge1xyXG4gICAgcG9zaXRpb246ICdmaXhlZCcsIFxyXG4gICAgYmFja2dyb3VuZENvbG9yOiAncmVkJyxcclxuICAgIHpJbmRleDogJzk5OTk5OTknLFxyXG4gICAgYm9yZGVyUmFkaXVzOiAnNTAlJ1xyXG4gIH0pO1xyXG5cclxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNpcmNsZUVsZW1lbnQpO1xyXG5cclxuICBjaXJjbGUgPSBuZXcgQ2lyY2xlKFxyXG4gICAgcmFuZG9tKDAsIHdpZHRoKSxcclxuICAgIHJhbmRvbSgwLCBoZWlnaHQpLFxyXG4gICAgdmVsb2NpdHksXHJcbiAgICB2ZWxvY2l0eSxcclxuICAgIHNpemVcclxuICApO1xyXG5cclxuICBsb29wKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3AoKSB7XHJcblxyXG4gIGlmKGNpcmNsZUVsZW1lbnQpIHtcclxuICAgIHJlbW92ZUVsZW1lbnQoY2lyY2xlRWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBpZihyYWYpIHtcclxuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZik7XHJcbiAgfVxyXG5cclxuICBjaXJjbGUgPSBudWxsO1xyXG5cclxufSovXG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdCkge1xuICBpZiAocmVxdWVzdC5hY3Rpb24gPT09ICdzdGFydFNpbXVsYXRpb24nICYmIHJlcXVlc3Quc2ltdWxhdGlvbiA9PT0gbmFtZSkge1xuICAgIHN0YXJ0KCk7XG4gIH0gZWxzZSBpZiAocmVxdWVzdC5hY3Rpb24gPT09ICdzdG9wU2ltdWxhdGlvbicgJiYgcmVxdWVzdC5zaW11bGF0aW9uID09PSBuYW1lKSB7XG4gICAgc3RvcCgpO1xuICB9XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRlbnQuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmFkZENzcyA9IGFkZENzcztcbmV4cG9ydHMuYWRkU2NyaXB0ID0gYWRkU2NyaXB0O1xuZXhwb3J0cy5hZGRTdHlsZSA9IGFkZFN0eWxlO1xuZXhwb3J0cy5hcHBlbmRIVE1MID0gYXBwZW5kSFRNTDtcbmV4cG9ydHMuZ2V0VGV4dE5vZGVzID0gZ2V0VGV4dE5vZGVzO1xuZXhwb3J0cy5yZW1vdmVFbGVtZW50ID0gcmVtb3ZlRWxlbWVudDtcbmV4cG9ydHMuc2V0U3R5bGUgPSBzZXRTdHlsZTtcbmZ1bmN0aW9uIGFkZENzcyhocmVmLCBjYWxsYmFjaykge1xuICB2YXIgbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgbC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgbC5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdzdHlsZXNoZWV0Jyk7XG4gIGwub25sb2FkID0gY2FsbGJhY2s7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobCk7XG4gIHJldHVybiBsO1xufVxuXG5mdW5jdGlvbiBhZGRTY3JpcHQoc3JjLCBjYWxsYmFjaykge1xuICB2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICBzLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcbiAgcy5vbmxvYWQgPSBjYWxsYmFjaztcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzKTtcbiAgcmV0dXJuIHM7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKHN0cikge1xuICB2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHMuaW5uZXJUZXh0ID0gc3RyO1xuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHMpO1xuICByZXR1cm4gcztcbn1cblxuZnVuY3Rpb24gYXBwZW5kSFRNTChlbCwgaHRtbCkge1xuICB2YXIgdG1wRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdG1wRWwuaW5uZXJIVE1MID0gaHRtbDtcblxuICB3aGlsZSAodG1wRWwuZmlyc3RDaGlsZCkge1xuICAgIGVsLmFwcGVuZENoaWxkKHRtcEVsLmZpcnN0Q2hpbGQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRleHROb2Rlcyhub2RlKSB7XG4gIHZhciBhbGwgPSBbXTtcbiAgZm9yIChub2RlID0gbm9kZS5maXJzdENoaWxkOyBub2RlOyBub2RlID0gbm9kZS5uZXh0U2libGluZykge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09IDMpIGFsbC5wdXNoKG5vZGUpO2Vsc2UgYWxsID0gYWxsLmNvbmNhdChnZXRUZXh0Tm9kZXMobm9kZSkpO1xuICB9XG4gIHJldHVybiBhbGw7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUVsZW1lbnQoZWwpIHtcbiAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG59XG5cbmZ1bmN0aW9uIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlKSB7XG4gIGZvciAodmFyIHMgaW4gc3R5bGUpIHtcbiAgICBlbGVtZW50LnN0eWxlW3NdID0gc3R5bGVbc107XG4gIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yYW5kb20gPSByYW5kb207XG5leHBvcnRzLnBvaW50SW5SZWN0ID0gcG9pbnRJblJlY3Q7XG5leHBvcnRzLmluUmFuZ2UgPSBpblJhbmdlO1xuZnVuY3Rpb24gcmFuZG9tKG1pbiwgbWF4KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKG1pbiArIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xufVxuXG5mdW5jdGlvbiBwb2ludEluUmVjdCh4LCB5LCByZWN0KSB7XG4gIHJldHVybiBpblJhbmdlKHgsIHJlY3QueCwgcmVjdC54ICsgcmVjdC53aWR0aCkgJiYgaW5SYW5nZSh5LCByZWN0LnksIHJlY3QueSArIHJlY3QuaGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gaW5SYW5nZSh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgcmV0dXJuIHZhbHVlID49IE1hdGgubWluKG1pbiwgbWF4KSAmJiB2YWx1ZSA8PSBNYXRoLm1heChtaW4sIG1heCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXRoLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmlzTGV0dGVyID0gaXNMZXR0ZXI7XG5leHBvcnRzLmlzVXBwZXJDYXNlID0gaXNVcHBlckNhc2U7XG5mdW5jdGlvbiBpc0xldHRlcihjKSB7XG4gIHJldHVybiBjLnRvTG93ZXJDYXNlKCkgIT09IGMudG9VcHBlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gaXNVcHBlckNhc2UoYykge1xuICByZXR1cm4gYyA9PT0gYy50b1VwcGVyQ2FzZSgpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RyaW5nLmpzLm1hcFxuIl19
