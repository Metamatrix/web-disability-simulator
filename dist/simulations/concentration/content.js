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

  function createTextNodes(text, index, array) {
    createElement('span', 'wds-text-element-' + index, text);
  }

  ['Did I eat lunch?', 'I have to get back to work soon...', 'The ventilation sounds a lot today. bzzzzzz', 'Should I answer that text message?', 'Must concentrate, must concentrate, must concentrate'].forEach(createTextNodes);

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

  var body = "body",
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
      textAnimation_4 = "wds-text-animation-4";

  setTimeout(function () {
    loopInIntervals(2, 8, p, paragraphAnimation);
    addClass(imgEl_0, imgAnimation_0);
    addClass(img, imgAnimation_1);
    addClass(h2, headingAnimation);
  }, 500);

  setTimeout(function () {
    removeClass(imgEl_0, imgAnimation_0);
    addClass(textEl_0, textAnimation_0);
  }, 5000);

  setTimeout(function () {
    removeClass(textEl_0, textAnimation_0);
    addClass(textEl_1, textAnimation_1);
  }, 12000);

  setTimeout(function () {
    removeClass(textEl_1, textAnimation_1);
    addClass(textEl_2, textAnimation_2);
  }, 20000);

  setTimeout(function () {
    removeClass(textEl_2, textAnimation_2);
    addClass(textEl_3, textAnimation_3);
  }, 26000);

  setTimeout(function () {
    removeClass(textEl_3, textAnimation_3);
    addClass(textEl_4, textAnimation_4);
  }, 32000);
}

function stop() {

  //TODO: remove dom elements. 

  (0, _dom.removeElement)(css);

  (0, _dom.removeElement)(textElWork);
  (0, _dom.removeElement)(textElMeal);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC9zaW11bGF0aW9ucy9jb25jZW50cmF0aW9uL2NvbnRlbnQuanMiLCJidWlsZC9qcy9iYWJlbC91dGlscy9kb20uanMiLCJidWlsZC9qcy9iYWJlbC91dGlscy9tYXRoLmpzIiwiYnVpbGQvanMvYmFiZWwvdXRpbHMvc3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsSUFBSSxRQUFRLFFBQVEscUJBQVIsQ0FBWjs7QUFFQSxJQUFJLE9BQU8sd0JBQXdCLEtBQXhCLENBQVg7O0FBRUEsSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBWDs7QUFFQSxJQUFJLFVBQVUsUUFBUSx1QkFBUixDQUFkOztBQUVBLFNBQVMsdUJBQVQsQ0FBaUMsR0FBakMsRUFBc0M7QUFBRSxNQUFJLE9BQU8sSUFBSSxVQUFmLEVBQTJCO0FBQUUsV0FBTyxHQUFQO0FBQWEsR0FBMUMsTUFBZ0Q7QUFBRSxRQUFJLFNBQVMsRUFBYixDQUFpQixJQUFJLE9BQU8sSUFBWCxFQUFpQjtBQUFFLFdBQUssSUFBSSxHQUFULElBQWdCLEdBQWhCLEVBQXFCO0FBQUUsWUFBSSxPQUFPLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBcUMsR0FBckMsRUFBMEMsR0FBMUMsQ0FBSixFQUFvRCxPQUFPLEdBQVAsSUFBYyxJQUFJLEdBQUosQ0FBZDtBQUF5QjtBQUFFLEtBQUMsT0FBTyxPQUFQLEdBQWlCLEdBQWpCLENBQXNCLE9BQU8sTUFBUDtBQUFnQjtBQUFFOztBQUU3USxJQUFJLE9BQU8sZUFBWDtBQUNBLElBQUksTUFBTSxJQUFWOztBQUVBLFNBQVMsS0FBVCxHQUFpQjs7QUFFZixNQUFJLFNBQVMsT0FBTyxTQUFQLENBQWlCLE1BQWpCLENBQXdCLGtCQUFrQixJQUFsQixHQUF5QixlQUFqRCxDQUFi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Q0EsUUFBUSxPQUFSLEdBQWtCLE9BQWxCO0FBQ0EsU0FBUyxNQUFULENBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCO0FBQ3hCLFNBQU8sS0FBSyxLQUFMLENBQVcsTUFBTSxLQUFLLE1BQUwsTUFBaUIsTUFBTSxHQUFOLEdBQVksQ0FBN0IsQ0FBakIsQ0FBUDtBQUNEOztBQUVELFNBQVMsV0FBVCxDQUFxQixDQUFyQixFQUF3QixDQUF4QixFQUEyQixJQUEzQixFQUFpQztBQUMvQixTQUFPLFFBQVEsQ0FBUixFQUFXLEtBQUssQ0FBaEIsRUFBbUIsS0FBSyxDQUFMLEdBQVMsS0FBSyxLQUFqQyxLQUEyQyxRQUFRLENBQVIsRUFBVyxLQUFLLENBQWhCLEVBQW1CLEtBQUssQ0FBTCxHQUFTLEtBQUssTUFBakMsQ0FBbEQ7QUFDRDs7QUFFRCxTQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBd0IsR0FBeEIsRUFBNkIsR0FBN0IsRUFBa0M7QUFDaEMsU0FBTyxTQUFTLEtBQUssR0FBTCxDQUFTLEdBQVQsRUFBYyxHQUFkLENBQVQsSUFBK0IsU0FBUyxLQUFLLEdBQUwsQ0FBUyxHQUFULEVBQWMsR0FBZCxDQUEvQztBQUNEO0FBQ0Q7OztBQ25CQTs7QUFFQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsU0FBTztBQURvQyxDQUE3QztBQUdBLFFBQVEsUUFBUixHQUFtQixRQUFuQjtBQUNBLFFBQVEsV0FBUixHQUFzQixXQUF0QjtBQUNBLFNBQVMsUUFBVCxDQUFrQixDQUFsQixFQUFxQjtBQUNuQixTQUFPLEVBQUUsV0FBRixPQUFvQixFQUFFLFdBQUYsRUFBM0I7QUFDRDs7QUFFRCxTQUFTLFdBQVQsQ0FBcUIsQ0FBckIsRUFBd0I7QUFDdEIsU0FBTyxNQUFNLEVBQUUsV0FBRixFQUFiO0FBQ0Q7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX21hdGggPSByZXF1aXJlKCcuLi8uLi91dGlscy9tYXRoLmpzJyk7XG5cbnZhciBtYXRoID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX21hdGgpO1xuXG52YXIgX2RvbSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2RvbS5qcycpO1xuXG52YXIgX3N0cmluZyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3N0cmluZy5qcycpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG52YXIgbmFtZSA9ICdjb25jZW50cmF0aW9uJztcbnZhciBjc3MgPSBudWxsO1xuXG5mdW5jdGlvbiBzdGFydCgpIHtcblxuICB2YXIgY3NzVXJsID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9zaW11bGF0aW9ucy8nICsgbmFtZSArICcvY3NzL21haW4uY3NzJyk7XG5cbiAgY3NzID0gKDAsIF9kb20uYWRkQ3NzKShjc3NVcmwpO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZWxlbWVudCwgY2xhc3NuYW1lLCB0ZXh0Tm9kZSkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzbmFtZSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XG4gICAgaWYgKHRleHROb2RlKSB7XG4gICAgICBlbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0Tm9kZSkpO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUVsZW1lbnQoJ2RpdicsICd3ZHMtaW1nLWVsZW1lbnQnKTtcblxuICBmdW5jdGlvbiBjcmVhdGVUZXh0Tm9kZXModGV4dCwgaW5kZXgsIGFycmF5KSB7XG4gICAgY3JlYXRlRWxlbWVudCgnc3BhbicsICd3ZHMtdGV4dC1lbGVtZW50LScgKyBpbmRleCwgdGV4dCk7XG4gIH1cblxuICBbJ0RpZCBJIGVhdCBsdW5jaD8nLCAnSSBoYXZlIHRvIGdldCBiYWNrIHRvIHdvcmsgc29vbi4uLicsICdUaGUgdmVudGlsYXRpb24gc291bmRzIGEgbG90IHRvZGF5LiBienp6enp6JywgJ1Nob3VsZCBJIGFuc3dlciB0aGF0IHRleHQgbWVzc2FnZT8nLCAnTXVzdCBjb25jZW50cmF0ZSwgbXVzdCBjb25jZW50cmF0ZSwgbXVzdCBjb25jZW50cmF0ZSddLmZvckVhY2goY3JlYXRlVGV4dE5vZGVzKTtcblxuICBmdW5jdGlvbiBhZGRDbGFzcyhlbGVtZW50LCBjbGFzc25hbWUpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW1lbnQpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKykge1xuICAgICAgZWxbaV0uY2xhc3NMaXN0LnRvZ2dsZShjbGFzc25hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzbmFtZSkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICBlbFtpXS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzbmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbG9vcEluSW50ZXJ2YWxzKG1pbiwgbWF4LCBkb21FbCwgY2xhc3NuYW1lKSB7XG4gICAgdmFyIHJhbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xuICAgIGFkZENsYXNzKGRvbUVsLCBjbGFzc25hbWUpO1xuICAgIHNldFRpbWVvdXQobG9vcEluSW50ZXJ2YWxzLCByYW5kICogMTAwMCk7XG4gIH1cblxuICB2YXIgYm9keSA9IFwiYm9keVwiLFxuICAgICAgaDIgPSBcImgyXCIsXG4gICAgICBwID0gXCJwXCIsXG4gICAgICBpbWcgPSBcImltZ1wiLFxuICAgICAgaW1nRWxfMCA9IFwiLndkcy1pbWctZWxlbWVudFwiLFxuICAgICAgcGFyYWdyYXBoQW5pbWF0aW9uID0gXCJ3ZHMtcGFyYWdyYXBoLWFuaW1hdGlvblwiLFxuICAgICAgaGVhZGluZ0FuaW1hdGlvbiA9IFwid2RzLWhlYWRpbmctYW5pbWF0aW9uXCIsXG4gICAgICBpbWdBbmltYXRpb25fMCA9IFwid2RzLWltZy1hbmltYXRpb24tMFwiLFxuICAgICAgaW1nQW5pbWF0aW9uXzEgPSBcIndkcy1pbWctYW5pbWF0aW9uLTFcIixcbiAgICAgIHRleHRFbF8wID0gXCIud2RzLXRleHQtZWxlbWVudC0wXCIsXG4gICAgICB0ZXh0RWxfMSA9IFwiLndkcy10ZXh0LWVsZW1lbnQtMVwiLFxuICAgICAgdGV4dEVsXzIgPSBcIi53ZHMtdGV4dC1lbGVtZW50LTJcIixcbiAgICAgIHRleHRFbF8zID0gXCIud2RzLXRleHQtZWxlbWVudC0zXCIsXG4gICAgICB0ZXh0RWxfNCA9IFwiLndkcy10ZXh0LWVsZW1lbnQtNFwiLFxuICAgICAgdGV4dEFuaW1hdGlvbl8wID0gXCJ3ZHMtdGV4dC1hbmltYXRpb24tMFwiLFxuICAgICAgdGV4dEFuaW1hdGlvbl8xID0gXCJ3ZHMtdGV4dC1hbmltYXRpb24tMVwiLFxuICAgICAgdGV4dEFuaW1hdGlvbl8yID0gXCJ3ZHMtdGV4dC1hbmltYXRpb24tMlwiLFxuICAgICAgdGV4dEFuaW1hdGlvbl8zID0gXCJ3ZHMtdGV4dC1hbmltYXRpb24tM1wiLFxuICAgICAgdGV4dEFuaW1hdGlvbl80ID0gXCJ3ZHMtdGV4dC1hbmltYXRpb24tNFwiO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIGxvb3BJbkludGVydmFscygyLCA4LCBwLCBwYXJhZ3JhcGhBbmltYXRpb24pO1xuICAgIGFkZENsYXNzKGltZ0VsXzAsIGltZ0FuaW1hdGlvbl8wKTtcbiAgICBhZGRDbGFzcyhpbWcsIGltZ0FuaW1hdGlvbl8xKTtcbiAgICBhZGRDbGFzcyhoMiwgaGVhZGluZ0FuaW1hdGlvbik7XG4gIH0sIDUwMCk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgcmVtb3ZlQ2xhc3MoaW1nRWxfMCwgaW1nQW5pbWF0aW9uXzApO1xuICAgIGFkZENsYXNzKHRleHRFbF8wLCB0ZXh0QW5pbWF0aW9uXzApO1xuICB9LCA1MDAwKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICByZW1vdmVDbGFzcyh0ZXh0RWxfMCwgdGV4dEFuaW1hdGlvbl8wKTtcbiAgICBhZGRDbGFzcyh0ZXh0RWxfMSwgdGV4dEFuaW1hdGlvbl8xKTtcbiAgfSwgMTIwMDApO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHJlbW92ZUNsYXNzKHRleHRFbF8xLCB0ZXh0QW5pbWF0aW9uXzEpO1xuICAgIGFkZENsYXNzKHRleHRFbF8yLCB0ZXh0QW5pbWF0aW9uXzIpO1xuICB9LCAyMDAwMCk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgcmVtb3ZlQ2xhc3ModGV4dEVsXzIsIHRleHRBbmltYXRpb25fMik7XG4gICAgYWRkQ2xhc3ModGV4dEVsXzMsIHRleHRBbmltYXRpb25fMyk7XG4gIH0sIDI2MDAwKTtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICByZW1vdmVDbGFzcyh0ZXh0RWxfMywgdGV4dEFuaW1hdGlvbl8zKTtcbiAgICBhZGRDbGFzcyh0ZXh0RWxfNCwgdGV4dEFuaW1hdGlvbl80KTtcbiAgfSwgMzIwMDApO1xufVxuXG5mdW5jdGlvbiBzdG9wKCkge1xuXG4gIC8vVE9ETzogcmVtb3ZlIGRvbSBlbGVtZW50cy4gXG5cbiAgKDAsIF9kb20ucmVtb3ZlRWxlbWVudCkoY3NzKTtcblxuICAoMCwgX2RvbS5yZW1vdmVFbGVtZW50KSh0ZXh0RWxXb3JrKTtcbiAgKDAsIF9kb20ucmVtb3ZlRWxlbWVudCkodGV4dEVsTWVhbCk7XG59XG5cbi8qY29uc3Qgd2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbmNvbnN0IGhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbmNvbnN0IHZlbG9jaXR5ID0gMTU7XHJcbmNvbnN0IHNpemUgPSB3aWR0aCAqIC4yMjU7XHJcblxyXG5sZXQgY2lyY2xlRWxlbWVudCA9IG51bGw7XHJcbmxldCBjaXJjbGUgPSBudWxsO1xyXG5sZXQgcmFmID0gbnVsbDtcclxuXHJcbmZ1bmN0aW9uIHJhbmRvbVZlbG9jaXR5KCkge1xyXG4gIHJldHVybiByYW5kb20odmVsb2NpdHkgLSAyLCB2ZWxvY2l0eSArIDIpO1xyXG59XHJcblxyXG5jbGFzcyBDaXJjbGUge1xyXG4gIGNvbnN0cnVjdG9yKHgsIHksIHZlbFgsIHZlbFksIHNpemUpIHtcclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5OyBcclxuICAgIHRoaXMudmVsWCA9IHZlbFg7XHJcbiAgICB0aGlzLnZlbFkgPSB2ZWxZOyBcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7IFxyXG5cclxuICAgIGNpcmNsZUVsZW1lbnQuc3R5bGUubGVmdCA9IDA7XHJcbiAgICBjaXJjbGVFbGVtZW50LnN0eWxlLnRvcCA9IDA7XHJcblxyXG4gICAgY2lyY2xlRWxlbWVudC5zdHlsZS53aWR0aCA9IGAke3NpemV9cHhgO1xyXG4gICAgY2lyY2xlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtzaXplfXB4YDtcclxuXHJcbiAgfVxyXG5cclxuICBtb3ZlKCkge1xyXG4gICAgY2lyY2xlRWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHt0aGlzLnh9cHgsICR7dGhpcy55fXB4LCAwKWA7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICBpZiAoKHRoaXMueCArIHRoaXMuc2l6ZSkgPj0gd2lkdGggLSAyKSB7XHJcbiAgICAgIHRoaXMudmVsWCA9IC1yYW5kb21WZWxvY2l0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgodGhpcy54KSA8PSAwKSB7XHJcbiAgICAgIHRoaXMudmVsWCA9IHJhbmRvbVZlbG9jaXR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCh0aGlzLnkgKyB0aGlzLnNpemUpID49IGhlaWdodCAtIDIpIHtcclxuICAgICAgdGhpcy52ZWxZID0gLXJhbmRvbVZlbG9jaXR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCh0aGlzLnkpIDw9IDApIHtcclxuICAgICAgdGhpcy52ZWxZID0gcmFuZG9tVmVsb2NpdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnggKz0gdGhpcy52ZWxYO1xyXG4gICAgdGhpcy55ICs9IHRoaXMudmVsWTtcclxuICB9XHJcbn1cclxuXHJcbi8vYW5pbWF0aW9uIGxvb3BcclxuZnVuY3Rpb24gbG9vcCgpIHtcclxuICBjaXJjbGUubW92ZSgpO1xyXG4gIGNpcmNsZS51cGRhdGUoKTtcclxuXHJcbiAgcmFmID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydCgpIHtcclxuXHJcbiAgY2lyY2xlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIGNpcmNsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICd3ZHMtY29uY2VudHJhdGlvbkNpcmNsZScpO1xyXG5cclxuICBzZXRTdHlsZShjaXJjbGVFbGVtZW50LCB7XHJcbiAgICBwb3NpdGlvbjogJ2ZpeGVkJywgXHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZWQnLFxyXG4gICAgekluZGV4OiAnOTk5OTk5OScsXHJcbiAgICBib3JkZXJSYWRpdXM6ICc1MCUnXHJcbiAgfSk7XHJcblxyXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2lyY2xlRWxlbWVudCk7XHJcblxyXG4gIGNpcmNsZSA9IG5ldyBDaXJjbGUoXHJcbiAgICByYW5kb20oMCwgd2lkdGgpLFxyXG4gICAgcmFuZG9tKDAsIGhlaWdodCksXHJcbiAgICB2ZWxvY2l0eSxcclxuICAgIHZlbG9jaXR5LFxyXG4gICAgc2l6ZVxyXG4gICk7XHJcblxyXG4gIGxvb3AoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RvcCgpIHtcclxuXHJcbiAgaWYoY2lyY2xlRWxlbWVudCkge1xyXG4gICAgcmVtb3ZlRWxlbWVudChjaXJjbGVFbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGlmKHJhZikge1xyXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmKTtcclxuICB9XHJcblxyXG4gIGNpcmNsZSA9IG51bGw7XHJcblxyXG59Ki9cblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gJ3N0YXJ0U2ltdWxhdGlvbicgJiYgcmVxdWVzdC5zaW11bGF0aW9uID09PSBuYW1lKSB7XG4gICAgc3RhcnQoKTtcbiAgfSBlbHNlIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gJ3N0b3BTaW11bGF0aW9uJyAmJiByZXF1ZXN0LnNpbXVsYXRpb24gPT09IG5hbWUpIHtcbiAgICBzdG9wKCk7XG4gIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29udGVudC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuYWRkQ3NzID0gYWRkQ3NzO1xuZXhwb3J0cy5hZGRTY3JpcHQgPSBhZGRTY3JpcHQ7XG5leHBvcnRzLmFkZFN0eWxlID0gYWRkU3R5bGU7XG5leHBvcnRzLmFwcGVuZEhUTUwgPSBhcHBlbmRIVE1MO1xuZXhwb3J0cy5nZXRUZXh0Tm9kZXMgPSBnZXRUZXh0Tm9kZXM7XG5leHBvcnRzLnJlbW92ZUVsZW1lbnQgPSByZW1vdmVFbGVtZW50O1xuZXhwb3J0cy5zZXRTdHlsZSA9IHNldFN0eWxlO1xuZnVuY3Rpb24gYWRkQ3NzKGhyZWYsIGNhbGxiYWNrKSB7XG4gIHZhciBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICBsLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICBsLnNldEF0dHJpYnV0ZSgncmVsJywgJ3N0eWxlc2hlZXQnKTtcbiAgbC5vbmxvYWQgPSBjYWxsYmFjaztcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChsKTtcbiAgcmV0dXJuIGw7XG59XG5cbmZ1bmN0aW9uIGFkZFNjcmlwdChzcmMsIGNhbGxiYWNrKSB7XG4gIHZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gIHMuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMpO1xuICBzLm9ubG9hZCA9IGNhbGxiYWNrO1xuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHMpO1xuICByZXR1cm4gcztcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUoc3RyKSB7XG4gIHZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgcy5pbm5lclRleHQgPSBzdHI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQocyk7XG4gIHJldHVybiBzO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRIVE1MKGVsLCBodG1sKSB7XG4gIHZhciB0bXBFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0bXBFbC5pbm5lckhUTUwgPSBodG1sO1xuXG4gIHdoaWxlICh0bXBFbC5maXJzdENoaWxkKSB7XG4gICAgZWwuYXBwZW5kQ2hpbGQodG1wRWwuZmlyc3RDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VGV4dE5vZGVzKG5vZGUpIHtcbiAgdmFyIGFsbCA9IFtdO1xuICBmb3IgKG5vZGUgPSBub2RlLmZpcnN0Q2hpbGQ7IG5vZGU7IG5vZGUgPSBub2RlLm5leHRTaWJsaW5nKSB7XG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT0gMykgYWxsLnB1c2gobm9kZSk7ZWxzZSBhbGwgPSBhbGwuY29uY2F0KGdldFRleHROb2Rlcyhub2RlKSk7XG4gIH1cbiAgcmV0dXJuIGFsbDtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRWxlbWVudChlbCkge1xuICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbn1cblxuZnVuY3Rpb24gc2V0U3R5bGUoZWxlbWVudCwgc3R5bGUpIHtcbiAgZm9yICh2YXIgcyBpbiBzdHlsZSkge1xuICAgIGVsZW1lbnQuc3R5bGVbc10gPSBzdHlsZVtzXTtcbiAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG9tLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJhbmRvbSA9IHJhbmRvbTtcbmV4cG9ydHMucG9pbnRJblJlY3QgPSBwb2ludEluUmVjdDtcbmV4cG9ydHMuaW5SYW5nZSA9IGluUmFuZ2U7XG5mdW5jdGlvbiByYW5kb20obWluLCBtYXgpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IobWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XG59XG5cbmZ1bmN0aW9uIHBvaW50SW5SZWN0KHgsIHksIHJlY3QpIHtcbiAgcmV0dXJuIGluUmFuZ2UoeCwgcmVjdC54LCByZWN0LnggKyByZWN0LndpZHRoKSAmJiBpblJhbmdlKHksIHJlY3QueSwgcmVjdC55ICsgcmVjdC5oZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBpblJhbmdlKHZhbHVlLCBtaW4sIG1heCkge1xuICByZXR1cm4gdmFsdWUgPj0gTWF0aC5taW4obWluLCBtYXgpICYmIHZhbHVlIDw9IE1hdGgubWF4KG1pbiwgbWF4KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hdGguanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuaXNMZXR0ZXIgPSBpc0xldHRlcjtcbmV4cG9ydHMuaXNVcHBlckNhc2UgPSBpc1VwcGVyQ2FzZTtcbmZ1bmN0aW9uIGlzTGV0dGVyKGMpIHtcbiAgcmV0dXJuIGMudG9Mb3dlckNhc2UoKSAhPT0gYy50b1VwcGVyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBpc1VwcGVyQ2FzZShjKSB7XG4gIHJldHVybiBjID09PSBjLnRvVXBwZXJDYXNlKCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdHJpbmcuanMubWFwXG4iXX0=
