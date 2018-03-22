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

  var backgroundImg = "wds-background-img",
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

  setTimeout(function () {
    addClass(imgEl, mealImg);
    addClass(p, paragraphEl);
    addClass(h1, heading1El);
    addClass(h2, heading2El);
    addClass(h2, heading3El);
    addClass(div, divEl);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC9zaW11bGF0aW9ucy9jb25jZW50cmF0aW9uL2NvbnRlbnQuanMiLCJidWlsZC9qcy9iYWJlbC91dGlscy9kb20uanMiLCJidWlsZC9qcy9iYWJlbC91dGlscy9tYXRoLmpzIiwiYnVpbGQvanMvYmFiZWwvdXRpbHMvc3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsSUFBSSxRQUFRLFFBQVEscUJBQVIsQ0FBWjs7QUFFQSxJQUFJLE9BQU8sd0JBQXdCLEtBQXhCLENBQVg7O0FBRUEsSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBWDs7QUFFQSxJQUFJLFVBQVUsUUFBUSx1QkFBUixDQUFkOztBQUVBLFNBQVMsdUJBQVQsQ0FBaUMsR0FBakMsRUFBc0M7QUFBRSxNQUFJLE9BQU8sSUFBSSxVQUFmLEVBQTJCO0FBQUUsV0FBTyxHQUFQO0FBQWEsR0FBMUMsTUFBZ0Q7QUFBRSxRQUFJLFNBQVMsRUFBYixDQUFpQixJQUFJLE9BQU8sSUFBWCxFQUFpQjtBQUFFLFdBQUssSUFBSSxHQUFULElBQWdCLEdBQWhCLEVBQXFCO0FBQUUsWUFBSSxPQUFPLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBcUMsR0FBckMsRUFBMEMsR0FBMUMsQ0FBSixFQUFvRCxPQUFPLEdBQVAsSUFBYyxJQUFJLEdBQUosQ0FBZDtBQUF5QjtBQUFFLEtBQUMsT0FBTyxPQUFQLEdBQWlCLEdBQWpCLENBQXNCLE9BQU8sTUFBUDtBQUFnQjtBQUFFOztBQUU3USxJQUFJLE9BQU8sZUFBWDtBQUNBLElBQUksTUFBTSxJQUFWOztBQUVBLFNBQVMsS0FBVCxHQUFpQjs7QUFFZixNQUFJLFNBQVMsT0FBTyxTQUFQLENBQWlCLE1BQWpCLENBQXdCLGtCQUFrQixJQUFsQixHQUF5QixlQUFqRCxDQUFiOztBQUVBLFFBQU0sQ0FBQyxHQUFHLEtBQUssTUFBVCxFQUFpQixNQUFqQixDQUFOOztBQUVBLFdBQVMsYUFBVCxDQUF1QixPQUF2QixFQUFnQyxTQUFoQyxFQUEyQyxRQUEzQyxFQUFxRDtBQUNuRCxRQUFJLEtBQUssU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQVQ7QUFDQSxPQUFHLFlBQUgsQ0FBZ0IsT0FBaEIsRUFBeUIsU0FBekI7QUFDQSxhQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLEVBQTFCO0FBQ0EsUUFBSSxRQUFKLEVBQWM7QUFDWixTQUFHLFdBQUgsQ0FBZSxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZjtBQUNEO0FBQ0Y7O0FBRUQsZ0JBQWMsS0FBZCxFQUFxQixpQkFBckI7QUFDQSxnQkFBYyxJQUFkLEVBQW9CLHVCQUFwQixFQUE2QyxrQkFBN0M7QUFDQSxnQkFBYyxJQUFkLEVBQW9CLHVCQUFwQixFQUE2QyxvQ0FBN0M7O0FBRUEsV0FBUyxRQUFULENBQWtCLE9BQWxCLEVBQTJCLFNBQTNCLEVBQXNDO0FBQ3BDLFFBQUksS0FBSyxTQUFTLGdCQUFULENBQTBCLE9BQTFCLENBQVQ7O0FBRUEsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEdBQUcsTUFBdkIsRUFBK0IsR0FBL0IsRUFBb0M7QUFDbEMsU0FBRyxDQUFILEVBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixTQUF2QjtBQUNEO0FBQ0Y7O0FBRUQsV0FBUyxXQUFULENBQXFCLE9BQXJCLEVBQThCLFNBQTlCLEVBQXlDO0FBQ3ZDLFFBQUksS0FBSyxTQUFTLGdCQUFULENBQTBCLE9BQTFCLENBQVQ7O0FBRUEsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEdBQUcsTUFBdkIsRUFBK0IsR0FBL0IsRUFBb0M7QUFDbEMsU0FBRyxDQUFILEVBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixTQUF2QjtBQUNEO0FBQ0Y7O0FBRUQsTUFBSSxnQkFBZ0Isb0JBQXBCO0FBQUEsTUFDSSxPQUFPLE1BRFg7QUFBQSxNQUVJLEtBQUssSUFGVDtBQUFBLE1BR0ksS0FBSyxJQUhUO0FBQUEsTUFJSSxLQUFLLElBSlQ7QUFBQSxNQUtJLElBQUksR0FMUjtBQUFBLE1BTUksSUFBSSxHQU5SO0FBQUEsTUFPSSxNQUFNLEtBUFY7QUFBQSxNQVFJLE1BQU0sS0FSVjtBQUFBLE1BU0ksUUFBUSxpQkFUWjtBQUFBLE1BVUksU0FBUyxrQkFWYjtBQUFBLE1BV0ksY0FBYyx1QkFYbEI7QUFBQSxNQVlJLGFBQWEsc0JBWmpCO0FBQUEsTUFhSSxhQUFhLHNCQWJqQjtBQUFBLE1BY0ksYUFBYSxzQkFkakI7QUFBQSxNQWVJLFFBQVEsa0JBZlo7QUFBQSxNQWdCSSxVQUFVLFVBaEJkO0FBQUEsTUFpQkksYUFBYSx3QkFqQmpCO0FBQUEsTUFrQkksYUFBYSx3QkFsQmpCO0FBQUEsTUFtQkksV0FBVyxXQW5CZjtBQUFBLE1Bb0JJLFdBQVcsV0FwQmY7O0FBc0JBLGFBQVcsWUFBWTtBQUNyQixhQUFTLEtBQVQsRUFBZ0IsT0FBaEI7QUFDQSxhQUFTLENBQVQsRUFBWSxXQUFaO0FBQ0EsYUFBUyxFQUFULEVBQWEsVUFBYjtBQUNBLGFBQVMsRUFBVCxFQUFhLFVBQWI7QUFDQSxhQUFTLEVBQVQsRUFBYSxVQUFiO0FBQ0EsYUFBUyxHQUFULEVBQWMsS0FBZDtBQUNELEdBUEQsRUFPRyxHQVBIOztBQVNBLGFBQVcsWUFBWTtBQUNyQixnQkFBWSxLQUFaLEVBQW1CLE9BQW5CO0FBQ0EsYUFBUyxVQUFULEVBQXFCLFFBQXJCO0FBQ0QsR0FIRCxFQUdHLElBSEg7O0FBS0EsYUFBVyxZQUFZO0FBQ3JCLGdCQUFZLEtBQVosRUFBbUIsT0FBbkI7QUFDQSxnQkFBWSxVQUFaLEVBQXdCLFFBQXhCO0FBQ0EsYUFBUyxVQUFULEVBQXFCLFFBQXJCO0FBQ0QsR0FKRCxFQUlHLEtBSkg7O0FBTUEsYUFBVyxZQUFZO0FBQ3JCLGdCQUFZLFVBQVosRUFBd0IsUUFBeEI7QUFDRCxHQUZELEVBRUcsS0FGSDs7QUFJQSxhQUFXLFlBQVk7QUFDckIsYUFBUyxJQUFULEVBQWUsYUFBZjtBQUNELEdBRkQsRUFFRyxLQUZIOztBQUlBLFdBQVMsZUFBVCxHQUEyQjtBQUN6QixRQUFJLE1BQU0sQ0FBVjtBQUFBLFFBQ0ksTUFBTSxFQURWO0FBRUEsUUFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxNQUFpQixNQUFNLEdBQU4sR0FBWSxDQUE3QixJQUFrQyxHQUE3QyxDQUFYO0FBQ0EsYUFBUyxJQUFULEVBQWUsTUFBZjtBQUNBLGVBQVcsZUFBWCxFQUE0QixPQUFPLElBQW5DO0FBQ0Q7O0FBRUQ7QUFDRDs7QUFFRCxTQUFTLElBQVQsR0FBZ0I7O0FBRWQ7O0FBRUE7O0FBRUEsR0FBQyxHQUFHLEtBQUssYUFBVCxFQUF3QixHQUF4Qjs7QUFFQSxHQUFDLEdBQUcsS0FBSyxhQUFUO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNHQSxPQUFPLE9BQVAsQ0FBZSxTQUFmLENBQXlCLFdBQXpCLENBQXFDLFVBQVUsT0FBVixFQUFtQjtBQUN0RCxNQUFJLFFBQVEsTUFBUixLQUFtQixpQkFBbkIsSUFBd0MsUUFBUSxVQUFSLEtBQXVCLElBQW5FLEVBQXlFO0FBQ3ZFO0FBQ0QsR0FGRCxNQUVPLElBQUksUUFBUSxNQUFSLEtBQW1CLGdCQUFuQixJQUF1QyxRQUFRLFVBQVIsS0FBdUIsSUFBbEUsRUFBd0U7QUFDN0U7QUFDRDtBQUNGLENBTkQ7QUFPQTs7O0FDdk9BOztBQUVBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQyxTQUFPO0FBRG9DLENBQTdDO0FBR0EsUUFBUSxNQUFSLEdBQWlCLE1BQWpCO0FBQ0EsUUFBUSxTQUFSLEdBQW9CLFNBQXBCO0FBQ0EsUUFBUSxRQUFSLEdBQW1CLFFBQW5CO0FBQ0EsUUFBUSxVQUFSLEdBQXFCLFVBQXJCO0FBQ0EsUUFBUSxZQUFSLEdBQXVCLFlBQXZCO0FBQ0EsUUFBUSxhQUFSLEdBQXdCLGFBQXhCO0FBQ0EsUUFBUSxRQUFSLEdBQW1CLFFBQW5CO0FBQ0EsU0FBUyxNQUFULENBQWdCLElBQWhCLEVBQXNCLFFBQXRCLEVBQWdDO0FBQzlCLE1BQUksSUFBSSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBUjtBQUNBLElBQUUsWUFBRixDQUFlLE1BQWYsRUFBdUIsSUFBdkI7QUFDQSxJQUFFLFlBQUYsQ0FBZSxLQUFmLEVBQXNCLFlBQXRCO0FBQ0EsSUFBRSxNQUFGLEdBQVcsUUFBWDtBQUNBLFdBQVMsb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0MsQ0FBdEMsRUFBeUMsV0FBekMsQ0FBcUQsQ0FBckQ7QUFDQSxTQUFPLENBQVA7QUFDRDs7QUFFRCxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0IsUUFBeEIsRUFBa0M7QUFDaEMsTUFBSSxJQUFJLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFSO0FBQ0EsSUFBRSxZQUFGLENBQWUsS0FBZixFQUFzQixHQUF0QjtBQUNBLElBQUUsTUFBRixHQUFXLFFBQVg7QUFDQSxXQUFTLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLEVBQXlDLFdBQXpDLENBQXFELENBQXJEO0FBQ0EsU0FBTyxDQUFQO0FBQ0Q7O0FBRUQsU0FBUyxRQUFULENBQWtCLEdBQWxCLEVBQXVCO0FBQ3JCLE1BQUksSUFBSSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUjtBQUNBLElBQUUsU0FBRixHQUFjLEdBQWQ7QUFDQSxXQUFTLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLEVBQXlDLFdBQXpDLENBQXFELENBQXJEO0FBQ0EsU0FBTyxDQUFQO0FBQ0Q7O0FBRUQsU0FBUyxVQUFULENBQW9CLEVBQXBCLEVBQXdCLElBQXhCLEVBQThCO0FBQzVCLE1BQUksUUFBUSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBLFFBQU0sU0FBTixHQUFrQixJQUFsQjs7QUFFQSxTQUFPLE1BQU0sVUFBYixFQUF5QjtBQUN2QixPQUFHLFdBQUgsQ0FBZSxNQUFNLFVBQXJCO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTLFlBQVQsQ0FBc0IsSUFBdEIsRUFBNEI7QUFDMUIsTUFBSSxNQUFNLEVBQVY7QUFDQSxPQUFLLE9BQU8sS0FBSyxVQUFqQixFQUE2QixJQUE3QixFQUFtQyxPQUFPLEtBQUssV0FBL0MsRUFBNEQ7QUFDMUQsUUFBSSxLQUFLLFFBQUwsSUFBaUIsQ0FBckIsRUFBd0IsSUFBSSxJQUFKLENBQVMsSUFBVCxFQUF4QixLQUE0QyxNQUFNLElBQUksTUFBSixDQUFXLGFBQWEsSUFBYixDQUFYLENBQU47QUFDN0M7QUFDRCxTQUFPLEdBQVA7QUFDRDs7QUFFRCxTQUFTLGFBQVQsQ0FBdUIsRUFBdkIsRUFBMkI7QUFDekIsS0FBRyxVQUFILENBQWMsV0FBZCxDQUEwQixFQUExQjtBQUNEOztBQUVELFNBQVMsUUFBVCxDQUFrQixPQUFsQixFQUEyQixLQUEzQixFQUFrQztBQUNoQyxPQUFLLElBQUksQ0FBVCxJQUFjLEtBQWQsRUFBcUI7QUFDbkIsWUFBUSxLQUFSLENBQWMsQ0FBZCxJQUFtQixNQUFNLENBQU4sQ0FBbkI7QUFDRDtBQUNGO0FBQ0Q7OztBQzlEQTs7QUFFQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsU0FBTztBQURvQyxDQUE3QztBQUdBLFFBQVEsTUFBUixHQUFpQixNQUFqQjtBQUNBLFFBQVEsV0FBUixHQUFzQixXQUF0QjtBQUNBLFFBQVEsT0FBUixHQUFrQixPQUFsQjtBQUNBLFNBQVMsTUFBVCxDQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQjtBQUN4QixTQUFPLEtBQUssS0FBTCxDQUFXLE1BQU0sS0FBSyxNQUFMLE1BQWlCLE1BQU0sR0FBTixHQUFZLENBQTdCLENBQWpCLENBQVA7QUFDRDs7QUFFRCxTQUFTLFdBQVQsQ0FBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkIsSUFBM0IsRUFBaUM7QUFDL0IsU0FBTyxRQUFRLENBQVIsRUFBVyxLQUFLLENBQWhCLEVBQW1CLEtBQUssQ0FBTCxHQUFTLEtBQUssS0FBakMsS0FBMkMsUUFBUSxDQUFSLEVBQVcsS0FBSyxDQUFoQixFQUFtQixLQUFLLENBQUwsR0FBUyxLQUFLLE1BQWpDLENBQWxEO0FBQ0Q7O0FBRUQsU0FBUyxPQUFULENBQWlCLEtBQWpCLEVBQXdCLEdBQXhCLEVBQTZCLEdBQTdCLEVBQWtDO0FBQ2hDLFNBQU8sU0FBUyxLQUFLLEdBQUwsQ0FBUyxHQUFULEVBQWMsR0FBZCxDQUFULElBQStCLFNBQVMsS0FBSyxHQUFMLENBQVMsR0FBVCxFQUFjLEdBQWQsQ0FBL0M7QUFDRDtBQUNEOzs7QUNuQkE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxRQUFRLFFBQVIsR0FBbUIsUUFBbkI7QUFDQSxRQUFRLFdBQVIsR0FBc0IsV0FBdEI7QUFDQSxTQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBcUI7QUFDbkIsU0FBTyxFQUFFLFdBQUYsT0FBb0IsRUFBRSxXQUFGLEVBQTNCO0FBQ0Q7O0FBRUQsU0FBUyxXQUFULENBQXFCLENBQXJCLEVBQXdCO0FBQ3RCLFNBQU8sTUFBTSxFQUFFLFdBQUYsRUFBYjtBQUNEO0FBQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9tYXRoID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvbWF0aC5qcycpO1xuXG52YXIgbWF0aCA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9tYXRoKTtcblxudmFyIF9kb20gPSByZXF1aXJlKCcuLi8uLi91dGlscy9kb20uanMnKTtcblxudmFyIF9zdHJpbmcgPSByZXF1aXJlKCcuLi8uLi91dGlscy9zdHJpbmcuanMnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQob2JqKSB7IGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHsgcmV0dXJuIG9iajsgfSBlbHNlIHsgdmFyIG5ld09iaiA9IHt9OyBpZiAob2JqICE9IG51bGwpIHsgZm9yICh2YXIga2V5IGluIG9iaikgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IG5ld09iai5kZWZhdWx0ID0gb2JqOyByZXR1cm4gbmV3T2JqOyB9IH1cblxudmFyIG5hbWUgPSAnY29uY2VudHJhdGlvbic7XG52YXIgY3NzID0gbnVsbDtcblxuZnVuY3Rpb24gc3RhcnQoKSB7XG5cbiAgdmFyIGNzc1VybCA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvc2ltdWxhdGlvbnMvJyArIG5hbWUgKyAnL2Nzcy9tYWluLmNzcycpO1xuXG4gIGNzcyA9ICgwLCBfZG9tLmFkZENzcykoY3NzVXJsKTtcblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGVsZW1lbnQsIGNsYXNzbmFtZSwgdGV4dE5vZGUpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbGFzc25hbWUpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIGlmICh0ZXh0Tm9kZSkge1xuICAgICAgZWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dE5vZGUpKTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVFbGVtZW50KCdkaXYnLCAnd2RzLWltZy1lbGVtZW50Jyk7XG4gIGNyZWF0ZUVsZW1lbnQoJ2gyJywgJ3dkcy10ZXh0LWVsZW1lbnQtbWVhbCcsICdEaWQgSSBlYXQgbHVuY2g/Jyk7XG4gIGNyZWF0ZUVsZW1lbnQoJ2gyJywgJ3dkcy10ZXh0LWVsZW1lbnQtd29yaycsICdJIGhhdmUgdG8gZ2V0IGJhY2sgdG8gd29yayBzb29uLi4uJyk7XG5cbiAgZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NuYW1lKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50KTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWwubGVuZ3RoOyBpKyspIHtcbiAgICAgIGVsW2ldLmNsYXNzTGlzdC50b2dnbGUoY2xhc3NuYW1lKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc25hbWUpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnQpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKykge1xuICAgICAgZWxbaV0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc25hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBiYWNrZ3JvdW5kSW1nID0gXCJ3ZHMtYmFja2dyb3VuZC1pbWdcIixcbiAgICAgIGJvZHkgPSBcImJvZHlcIixcbiAgICAgIGgxID0gXCJoMVwiLFxuICAgICAgaDIgPSBcImgyXCIsXG4gICAgICBoMyA9IFwiaDNcIixcbiAgICAgIHAgPSBcInBcIixcbiAgICAgIGEgPSBcImFcIixcbiAgICAgIGltZyA9IFwiaW1nXCIsXG4gICAgICBkaXYgPSBcImRpdlwiLFxuICAgICAgZGl2RWwgPSBcIndkcy1kaXYtZWxlbWVudFwiLFxuICAgICAgYm9keUVMID0gXCJ3ZHMtYm9keS1lbGVtZW50XCIsXG4gICAgICBwYXJhZ3JhcGhFbCA9IFwid2RzLXBhcmFncmFwaC1lbGVtZW50XCIsXG4gICAgICBoZWFkaW5nMUVsID0gXCJ3ZHMtaGVhZGluZzEtZWxlbWVudFwiLFxuICAgICAgaGVhZGluZzJFbCA9IFwid2RzLWhlYWRpbmcyLWVsZW1lbnRcIixcbiAgICAgIGhlYWRpbmczRWwgPSBcIndkcy1oZWFkaW5nMy1lbGVtZW50XCIsXG4gICAgICBpbWdFbCA9IFwiLndkcy1pbWctZWxlbWVudFwiLFxuICAgICAgbWVhbEltZyA9IFwibWVhbC1pbWdcIixcbiAgICAgIHRleHRFbE1lYWwgPSBcIi53ZHMtdGV4dC1lbGVtZW50LW1lYWxcIixcbiAgICAgIHRleHRFbFdvcmsgPSBcIi53ZHMtdGV4dC1lbGVtZW50LXdvcmtcIixcbiAgICAgIG1lYWxUZXh0ID0gXCJtZWFsLXRleHRcIixcbiAgICAgIHdvcmtUZXh0ID0gXCJ3b3JrLXRleHRcIjtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBhZGRDbGFzcyhpbWdFbCwgbWVhbEltZyk7XG4gICAgYWRkQ2xhc3MocCwgcGFyYWdyYXBoRWwpO1xuICAgIGFkZENsYXNzKGgxLCBoZWFkaW5nMUVsKTtcbiAgICBhZGRDbGFzcyhoMiwgaGVhZGluZzJFbCk7XG4gICAgYWRkQ2xhc3MoaDIsIGhlYWRpbmczRWwpO1xuICAgIGFkZENsYXNzKGRpdiwgZGl2RWwpO1xuICB9LCA1MDApO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHJlbW92ZUNsYXNzKGltZ0VsLCBtZWFsSW1nKTtcbiAgICBhZGRDbGFzcyh0ZXh0RWxNZWFsLCBtZWFsVGV4dCk7XG4gIH0sIDYwMDApO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHJlbW92ZUNsYXNzKGltZ0VsLCBtZWFsSW1nKTtcbiAgICByZW1vdmVDbGFzcyh0ZXh0RWxNZWFsLCBtZWFsVGV4dCk7XG4gICAgYWRkQ2xhc3ModGV4dEVsV29yaywgd29ya1RleHQpO1xuICB9LCAxNDAwMCk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgcmVtb3ZlQ2xhc3ModGV4dEVsV29yaywgd29ya1RleHQpO1xuICB9LCAyMjAwMCk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgYWRkQ2xhc3MoYm9keSwgYmFja2dyb3VuZEltZyk7XG4gIH0sIDI1MDAwKTtcblxuICBmdW5jdGlvbiBsb29wSW5JbnRlcnZhbHMoKSB7XG4gICAgdmFyIG1pbiA9IDIsXG4gICAgICAgIG1heCA9IDEwO1xuICAgIHZhciByYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbiAgICBhZGRDbGFzcyhib2R5LCBib2R5RUwpO1xuICAgIHNldFRpbWVvdXQobG9vcEluSW50ZXJ2YWxzLCByYW5kICogMTAwMCk7XG4gIH1cblxuICBsb29wSW5JbnRlcnZhbHMoKTtcbn1cblxuZnVuY3Rpb24gc3RvcCgpIHtcblxuICAvL1RPRE86IHJlbW92ZSBkb20gZWxlbWVudHMuIFxuXG4gIGNsZWFySW50ZXJ2YWwoKTtcblxuICAoMCwgX2RvbS5yZW1vdmVFbGVtZW50KShjc3MpO1xuXG4gICgwLCBfZG9tLnJlbW92ZUVsZW1lbnQpKCk7XG59XG5cbi8qY29uc3Qgd2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbmNvbnN0IGhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbmNvbnN0IHZlbG9jaXR5ID0gMTU7XHJcbmNvbnN0IHNpemUgPSB3aWR0aCAqIC4yMjU7XHJcblxyXG5sZXQgY2lyY2xlRWxlbWVudCA9IG51bGw7XHJcbmxldCBjaXJjbGUgPSBudWxsO1xyXG5sZXQgcmFmID0gbnVsbDtcclxuXHJcbmZ1bmN0aW9uIHJhbmRvbVZlbG9jaXR5KCkge1xyXG4gIHJldHVybiByYW5kb20odmVsb2NpdHkgLSAyLCB2ZWxvY2l0eSArIDIpO1xyXG59XHJcblxyXG5jbGFzcyBDaXJjbGUge1xyXG4gIGNvbnN0cnVjdG9yKHgsIHksIHZlbFgsIHZlbFksIHNpemUpIHtcclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5OyBcclxuICAgIHRoaXMudmVsWCA9IHZlbFg7XHJcbiAgICB0aGlzLnZlbFkgPSB2ZWxZOyBcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7IFxyXG5cclxuICAgIGNpcmNsZUVsZW1lbnQuc3R5bGUubGVmdCA9IDA7XHJcbiAgICBjaXJjbGVFbGVtZW50LnN0eWxlLnRvcCA9IDA7XHJcblxyXG4gICAgY2lyY2xlRWxlbWVudC5zdHlsZS53aWR0aCA9IGAke3NpemV9cHhgO1xyXG4gICAgY2lyY2xlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtzaXplfXB4YDtcclxuXHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gICAgY2lyY2xlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHt0aGlzLnh9cHgsICR7dGhpcy55fXB4LCAwKWA7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICBpZiAoKHRoaXMueCArIHRoaXMuc2l6ZSkgPj0gd2lkdGggLSAyKSB7XHJcbiAgICAgIHRoaXMudmVsWCA9IC1yYW5kb21WZWxvY2l0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgodGhpcy54KSA8PSAwKSB7XHJcbiAgICAgIHRoaXMudmVsWCA9IHJhbmRvbVZlbG9jaXR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCh0aGlzLnkgKyB0aGlzLnNpemUpID49IGhlaWdodCAtIDIpIHtcclxuICAgICAgdGhpcy52ZWxZID0gLXJhbmRvbVZlbG9jaXR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCh0aGlzLnkpIDw9IDApIHtcclxuICAgICAgdGhpcy52ZWxZID0gcmFuZG9tVmVsb2NpdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnggKz0gdGhpcy52ZWxYO1xyXG4gICAgdGhpcy55ICs9IHRoaXMudmVsWTtcclxuICB9XHJcbn1cclxuXHJcbi8vYW5pbWF0aW9uIGxvb3BcclxuZnVuY3Rpb24gbG9vcCgpIHtcclxuICBjaXJjbGUubW92ZSgpO1xyXG4gIGNpcmNsZS51cGRhdGUoKTtcclxuXHJcbiAgcmFmID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydCgpIHtcclxuXHJcbiAgY2lyY2xlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGNpcmNsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICd3ZHMtY29uY2VudHJhdGlvbkNpcmNsZScpO1xyXG5cclxuICBzZXRTdHlsZShjaXJjbGVFbGVtZW50LCB7XHJcbiAgICBwb3NpdGlvbjogJ2ZpeGVkJywgXHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZWQnLFxyXG4gICAgekluZGV4OiAnOTk5OTk5OScsXHJcbiAgICBib3JkZXJSYWRpdXM6ICc1MCUnXHJcbiAgfSk7XHJcblxyXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2lyY2xlRWxlbWVudCk7XHJcblxyXG4gIGNpcmNsZSA9IG5ldyBDaXJjbGUoXHJcbiAgICByYW5kb20oMCwgd2lkdGgpLFxyXG4gICAgcmFuZG9tKDAsIGhlaWdodCksXHJcbiAgICB2ZWxvY2l0eSxcclxuICAgIHZlbG9jaXR5LFxyXG4gICAgc2l6ZVxyXG4gICk7XHJcblxyXG4gIGxvb3AoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RvcCgpIHtcclxuXHJcbiAgaWYoY2lyY2xlRWxlbWVudCkge1xyXG4gICAgcmVtb3ZlRWxlbWVudChjaXJjbGVFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGlmKHJhZikge1xyXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmKTtcclxuICB9XHJcblxyXG4gIGNpcmNsZSA9IG51bGw7XHJcblxyXG59Ki9cblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gJ3N0YXJ0U2ltdWxhdGlvbicgJiYgcmVxdWVzdC5zaW11bGF0aW9uID09PSBuYW1lKSB7XG4gICAgc3RhcnQoKTtcbiAgfSBlbHNlIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gJ3N0b3BTaW11bGF0aW9uJyAmJiByZXF1ZXN0LnNpbXVsYXRpb24gPT09IG5hbWUpIHtcbiAgICBzdG9wKCk7XG4gIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29udGVudC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuYWRkQ3NzID0gYWRkQ3NzO1xuZXhwb3J0cy5hZGRTY3JpcHQgPSBhZGRTY3JpcHQ7XG5leHBvcnRzLmFkZFN0eWxlID0gYWRkU3R5bGU7XG5leHBvcnRzLmFwcGVuZEhUTUwgPSBhcHBlbmRIVE1MO1xuZXhwb3J0cy5nZXRUZXh0Tm9kZXMgPSBnZXRUZXh0Tm9kZXM7XG5leHBvcnRzLnJlbW92ZUVsZW1lbnQgPSByZW1vdmVFbGVtZW50O1xuZXhwb3J0cy5zZXRTdHlsZSA9IHNldFN0eWxlO1xuZnVuY3Rpb24gYWRkQ3NzKGhyZWYsIGNhbGxiYWNrKSB7XG4gIHZhciBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICBsLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICBsLnNldEF0dHJpYnV0ZSgncmVsJywgJ3N0eWxlc2hlZXQnKTtcbiAgbC5vbmxvYWQgPSBjYWxsYmFjaztcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChsKTtcbiAgcmV0dXJuIGw7XG59XG5cbmZ1bmN0aW9uIGFkZFNjcmlwdChzcmMsIGNhbGxiYWNrKSB7XG4gIHZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gIHMuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMpO1xuICBzLm9ubG9hZCA9IGNhbGxiYWNrO1xuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHMpO1xuICByZXR1cm4gcztcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUoc3RyKSB7XG4gIHZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgcy5pbm5lclRleHQgPSBzdHI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQocyk7XG4gIHJldHVybiBzO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRIVE1MKGVsLCBodG1sKSB7XG4gIHZhciB0bXBFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0bXBFbC5pbm5lckhUTUwgPSBodG1sO1xuXG4gIHdoaWxlICh0bXBFbC5maXJzdENoaWxkKSB7XG4gICAgZWwuYXBwZW5kQ2hpbGQodG1wRWwuZmlyc3RDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VGV4dE5vZGVzKG5vZGUpIHtcbiAgdmFyIGFsbCA9IFtdO1xuICBmb3IgKG5vZGUgPSBub2RlLmZpcnN0Q2hpbGQ7IG5vZGU7IG5vZGUgPSBub2RlLm5leHRTaWJsaW5nKSB7XG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT0gMykgYWxsLnB1c2gobm9kZSk7ZWxzZSBhbGwgPSBhbGwuY29uY2F0KGdldFRleHROb2Rlcyhub2RlKSk7XG4gIH1cbiAgcmV0dXJuIGFsbDtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRWxlbWVudChlbCkge1xuICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbn1cblxuZnVuY3Rpb24gc2V0U3R5bGUoZWxlbWVudCwgc3R5bGUpIHtcbiAgZm9yICh2YXIgcyBpbiBzdHlsZSkge1xuICAgIGVsZW1lbnQuc3R5bGVbc10gPSBzdHlsZVtzXTtcbiAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG9tLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJhbmRvbSA9IHJhbmRvbTtcbmV4cG9ydHMucG9pbnRJblJlY3QgPSBwb2ludEluUmVjdDtcbmV4cG9ydHMuaW5SYW5nZSA9IGluUmFuZ2U7XG5mdW5jdGlvbiByYW5kb20obWluLCBtYXgpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IobWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XG59XG5cbmZ1bmN0aW9uIHBvaW50SW5SZWN0KHgsIHksIHJlY3QpIHtcbiAgcmV0dXJuIGluUmFuZ2UoeCwgcmVjdC54LCByZWN0LnggKyByZWN0LndpZHRoKSAmJiBpblJhbmdlKHksIHJlY3QueSwgcmVjdC55ICsgcmVjdC5oZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBpblJhbmdlKHZhbHVlLCBtaW4sIG1heCkge1xuICByZXR1cm4gdmFsdWUgPj0gTWF0aC5taW4obWluLCBtYXgpICYmIHZhbHVlIDw9IE1hdGgubWF4KG1pbiwgbWF4KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hdGguanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuaXNMZXR0ZXIgPSBpc0xldHRlcjtcbmV4cG9ydHMuaXNVcHBlckNhc2UgPSBpc1VwcGVyQ2FzZTtcbmZ1bmN0aW9uIGlzTGV0dGVyKGMpIHtcbiAgcmV0dXJuIGMudG9Mb3dlckNhc2UoKSAhPT0gYy50b1VwcGVyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBpc1VwcGVyQ2FzZShjKSB7XG4gIHJldHVybiBjID09PSBjLnRvVXBwZXJDYXNlKCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdHJpbmcuanMubWFwXG4iXX0=
