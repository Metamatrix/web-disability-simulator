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

  function loopInIntervals(min, max, domEl, classname) {
    var rand = Math.floor(Math.random() * (max - min + 1) + min);
    addClass(domEl, classname);
    setTimeout(loopInIntervals, rand * 1000);
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
    loopInIntervals(2, 10, body, bodyEl);
    addClass(imgEl, mealImg);
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

  function blinkInIntervals() {
    var min = 2,
        max = 10;
    var rand = Math.floor(Math.random() * (max - min + 1) + min);
    addClass(p, paragraphEl);
    setTimeout(blinkInIntervals, rand * 1000);
  }

  blinkInIntervals();

  function addPatternInIntervals() {
    var min = 2,
        max = 10;
    var rand = Math.floor(Math.random() * (max - min + 1) + min);
    addClass(body, backgroundImg);
    setTimeout(addPatternInIntervals, rand * 1000);
  }

  addPatternInIntervals();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC9zaW11bGF0aW9ucy9jb25jZW50cmF0aW9uL2NvbnRlbnQuanMiLCJidWlsZC9qcy9iYWJlbC91dGlscy9kb20uanMiLCJidWlsZC9qcy9iYWJlbC91dGlscy9tYXRoLmpzIiwiYnVpbGQvanMvYmFiZWwvdXRpbHMvc3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsSUFBSSxRQUFRLFFBQVEscUJBQVIsQ0FBWjs7QUFFQSxJQUFJLE9BQU8sd0JBQXdCLEtBQXhCLENBQVg7O0FBRUEsSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBWDs7QUFFQSxJQUFJLFVBQVUsUUFBUSx1QkFBUixDQUFkOztBQUVBLFNBQVMsdUJBQVQsQ0FBaUMsR0FBakMsRUFBc0M7QUFBRSxNQUFJLE9BQU8sSUFBSSxVQUFmLEVBQTJCO0FBQUUsV0FBTyxHQUFQO0FBQWEsR0FBMUMsTUFBZ0Q7QUFBRSxRQUFJLFNBQVMsRUFBYixDQUFpQixJQUFJLE9BQU8sSUFBWCxFQUFpQjtBQUFFLFdBQUssSUFBSSxHQUFULElBQWdCLEdBQWhCLEVBQXFCO0FBQUUsWUFBSSxPQUFPLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBcUMsR0FBckMsRUFBMEMsR0FBMUMsQ0FBSixFQUFvRCxPQUFPLEdBQVAsSUFBYyxJQUFJLEdBQUosQ0FBZDtBQUF5QjtBQUFFLEtBQUMsT0FBTyxPQUFQLEdBQWlCLEdBQWpCLENBQXNCLE9BQU8sTUFBUDtBQUFnQjtBQUFFOztBQUU3USxJQUFJLE9BQU8sZUFBWDtBQUNBLElBQUksTUFBTSxJQUFWOztBQUVBLFNBQVMsS0FBVCxHQUFpQjs7QUFFZixNQUFJLFNBQVMsT0FBTyxTQUFQLENBQWlCLE1BQWpCLENBQXdCLGtCQUFrQixJQUFsQixHQUF5QixlQUFqRCxDQUFi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RSxXQUFGLE9BQW9CLEVBQUUsV0FBRixFQUEzQjtBQUNEOztBQUVELFNBQVMsV0FBVCxDQUFxQixDQUFyQixFQUF3QjtBQUN0QixTQUFPLE1BQU0sRUFBRSxXQUFGLEVBQWI7QUFDRDtBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfbWF0aCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL21hdGguanMnKTtcblxudmFyIG1hdGggPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfbWF0aCk7XG5cbnZhciBfZG9tID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvZG9tLmpzJyk7XG5cbnZhciBfc3RyaW5nID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvc3RyaW5nLmpzJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbnZhciBuYW1lID0gJ2NvbmNlbnRyYXRpb24nO1xudmFyIGNzcyA9IG51bGw7XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuXG4gIHZhciBjc3NVcmwgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL3NpbXVsYXRpb25zLycgKyBuYW1lICsgJy9jc3MvbWFpbi5jc3MnKTtcblxuICBjc3MgPSAoMCwgX2RvbS5hZGRDc3MpKGNzc1VybCk7XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChlbGVtZW50LCBjbGFzc25hbWUsIHRleHROb2RlKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY2xhc3NuYW1lKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKTtcbiAgICBpZiAodGV4dE5vZGUpIHtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHROb2RlKSk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlRWxlbWVudCgnZGl2JywgJ3dkcy1pbWctZWxlbWVudCcpO1xuICBjcmVhdGVFbGVtZW50KCdoMicsICd3ZHMtdGV4dC1lbGVtZW50LW1lYWwnLCAnRGlkIEkgZWF0IGx1bmNoPycpO1xuICBjcmVhdGVFbGVtZW50KCdoMicsICd3ZHMtdGV4dC1lbGVtZW50LXdvcmsnLCAnSSBoYXZlIHRvIGdldCBiYWNrIHRvIHdvcmsgc29vbi4uLicpO1xuXG4gIGZ1bmN0aW9uIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzbmFtZSkge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICBlbFtpXS5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzbmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NuYW1lKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtZW50KTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWwubGVuZ3RoOyBpKyspIHtcbiAgICAgIGVsW2ldLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NuYW1lKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsb29wSW5JbnRlcnZhbHMobWluLCBtYXgsIGRvbUVsLCBjbGFzc25hbWUpIHtcbiAgICB2YXIgcmFuZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG4gICAgYWRkQ2xhc3MoZG9tRWwsIGNsYXNzbmFtZSk7XG4gICAgc2V0VGltZW91dChsb29wSW5JbnRlcnZhbHMsIHJhbmQgKiAxMDAwKTtcbiAgfVxuXG4gIHZhciBiYWNrZ3JvdW5kSW1nID0gXCJ3ZHMtYmFja2dyb3VuZC1pbWdcIixcbiAgICAgIGJvZHkgPSBcImJvZHlcIixcbiAgICAgIGgxID0gXCJoMVwiLFxuICAgICAgaDIgPSBcImgyXCIsXG4gICAgICBoMyA9IFwiaDNcIixcbiAgICAgIHAgPSBcInBcIixcbiAgICAgIGEgPSBcImFcIixcbiAgICAgIGltZyA9IFwiaW1nXCIsXG4gICAgICBkaXYgPSBcImRpdlwiLFxuICAgICAgZGl2RWwgPSBcIndkcy1kaXYtZWxlbWVudFwiLFxuICAgICAgYm9keUVMID0gXCJ3ZHMtYm9keS1lbGVtZW50XCIsXG4gICAgICBwYXJhZ3JhcGhFbCA9IFwid2RzLXBhcmFncmFwaC1lbGVtZW50XCIsXG4gICAgICBoZWFkaW5nMUVsID0gXCJ3ZHMtaGVhZGluZzEtZWxlbWVudFwiLFxuICAgICAgaGVhZGluZzJFbCA9IFwid2RzLWhlYWRpbmcyLWVsZW1lbnRcIixcbiAgICAgIGhlYWRpbmczRWwgPSBcIndkcy1oZWFkaW5nMy1lbGVtZW50XCIsXG4gICAgICBpbWdFbCA9IFwiLndkcy1pbWctZWxlbWVudFwiLFxuICAgICAgbWVhbEltZyA9IFwibWVhbC1pbWdcIixcbiAgICAgIHRleHRFbE1lYWwgPSBcIi53ZHMtdGV4dC1lbGVtZW50LW1lYWxcIixcbiAgICAgIHRleHRFbFdvcmsgPSBcIi53ZHMtdGV4dC1lbGVtZW50LXdvcmtcIixcbiAgICAgIG1lYWxUZXh0ID0gXCJtZWFsLXRleHRcIixcbiAgICAgIHdvcmtUZXh0ID0gXCJ3b3JrLXRleHRcIjtcblxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBsb29wSW5JbnRlcnZhbHMoMiwgMTAsIGJvZHksIGJvZHlFbCk7XG4gICAgYWRkQ2xhc3MoaW1nRWwsIG1lYWxJbWcpO1xuICAgIGFkZENsYXNzKGgxLCBoZWFkaW5nMUVsKTtcbiAgICBhZGRDbGFzcyhoMiwgaGVhZGluZzJFbCk7XG4gICAgYWRkQ2xhc3MoaDIsIGhlYWRpbmczRWwpO1xuICAgIGFkZENsYXNzKGRpdiwgZGl2RWwpO1xuICB9LCA1MDApO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHJlbW92ZUNsYXNzKGltZ0VsLCBtZWFsSW1nKTtcbiAgICBhZGRDbGFzcyh0ZXh0RWxNZWFsLCBtZWFsVGV4dCk7XG4gIH0sIDYwMDApO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHJlbW92ZUNsYXNzKGltZ0VsLCBtZWFsSW1nKTtcbiAgICByZW1vdmVDbGFzcyh0ZXh0RWxNZWFsLCBtZWFsVGV4dCk7XG4gICAgYWRkQ2xhc3ModGV4dEVsV29yaywgd29ya1RleHQpO1xuICB9LCAxNDAwMCk7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgcmVtb3ZlQ2xhc3ModGV4dEVsV29yaywgd29ya1RleHQpO1xuICB9LCAyMjAwMCk7XG5cbiAgZnVuY3Rpb24gYmxpbmtJbkludGVydmFscygpIHtcbiAgICB2YXIgbWluID0gMixcbiAgICAgICAgbWF4ID0gMTA7XG4gICAgdmFyIHJhbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xuICAgIGFkZENsYXNzKHAsIHBhcmFncmFwaEVsKTtcbiAgICBzZXRUaW1lb3V0KGJsaW5rSW5JbnRlcnZhbHMsIHJhbmQgKiAxMDAwKTtcbiAgfVxuXG4gIGJsaW5rSW5JbnRlcnZhbHMoKTtcblxuICBmdW5jdGlvbiBhZGRQYXR0ZXJuSW5JbnRlcnZhbHMoKSB7XG4gICAgdmFyIG1pbiA9IDIsXG4gICAgICAgIG1heCA9IDEwO1xuICAgIHZhciByYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcbiAgICBhZGRDbGFzcyhib2R5LCBiYWNrZ3JvdW5kSW1nKTtcbiAgICBzZXRUaW1lb3V0KGFkZFBhdHRlcm5JbkludGVydmFscywgcmFuZCAqIDEwMDApO1xuICB9XG5cbiAgYWRkUGF0dGVybkluSW50ZXJ2YWxzKCk7XG59XG5cbmZ1bmN0aW9uIHN0b3AoKSB7XG5cbiAgLy9UT0RPOiByZW1vdmUgZG9tIGVsZW1lbnRzLiBcblxuICAoMCwgX2RvbS5yZW1vdmVFbGVtZW50KShjc3MpO1xuXG4gICgwLCBfZG9tLnJlbW92ZUVsZW1lbnQpKHRleHRFbFdvcmspO1xuICAoMCwgX2RvbS5yZW1vdmVFbGVtZW50KSh0ZXh0RWxNZWFsKTtcbn1cblxuLypjb25zdCB3aWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcclxuY29uc3QgaGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcclxuY29uc3QgdmVsb2NpdHkgPSAxNTtcclxuY29uc3Qgc2l6ZSA9IHdpZHRoICogLjIyNTtcclxuXHJcbmxldCBjaXJjbGVFbGVtZW50ID0gbnVsbDtcclxubGV0IGNpcmNsZSA9IG51bGw7XHJcbmxldCByYWYgPSBudWxsO1xyXG5cclxuZnVuY3Rpb24gcmFuZG9tVmVsb2NpdHkoKSB7XHJcbiAgcmV0dXJuIHJhbmRvbSh2ZWxvY2l0eSAtIDIsIHZlbG9jaXR5ICsgMik7XHJcbn1cclxuXHJcbmNsYXNzIENpcmNsZSB7XHJcbiAgY29uc3RydWN0b3IoeCwgeSwgdmVsWCwgdmVsWSwgc2l6ZSkge1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7IFxyXG4gICAgdGhpcy52ZWxYID0gdmVsWDtcclxuICAgIHRoaXMudmVsWSA9IHZlbFk7IFxyXG4gICAgdGhpcy5zaXplID0gc2l6ZTsgXHJcblxyXG4gICAgY2lyY2xlRWxlbWVudC5zdHlsZS5sZWZ0ID0gMDtcclxuICAgIGNpcmNsZUVsZW1lbnQuc3R5bGUudG9wID0gMDtcclxuXHJcbiAgICBjaXJjbGVFbGVtZW50LnN0eWxlLndpZHRoID0gYCR7c2l6ZX1weGA7XHJcbiAgICBjaXJjbGVFbGVtZW50LnN0eWxlLmhlaWdodCA9IGAke3NpemV9cHhgO1xyXG5cclxuICB9XHJcblxyXG4gIG1vdmUoKSB7XHJcbiAgICBjaXJjbGVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3RoaXMueH1weCwgJHt0aGlzLnl9cHgsIDApYDtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIGlmICgodGhpcy54ICsgdGhpcy5zaXplKSA+PSB3aWR0aCAtIDIpIHtcclxuICAgICAgdGhpcy52ZWxYID0gLXJhbmRvbVZlbG9jaXR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCh0aGlzLngpIDw9IDApIHtcclxuICAgICAgdGhpcy52ZWxYID0gcmFuZG9tVmVsb2NpdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoKHRoaXMueSArIHRoaXMuc2l6ZSkgPj0gaGVpZ2h0IC0gMikge1xyXG4gICAgICB0aGlzLnZlbFkgPSAtcmFuZG9tVmVsb2NpdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoKHRoaXMueSkgPD0gMCkge1xyXG4gICAgICB0aGlzLnZlbFkgPSByYW5kb21WZWxvY2l0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMueCArPSB0aGlzLnZlbFg7XHJcbiAgICB0aGlzLnkgKz0gdGhpcy52ZWxZO1xyXG4gIH1cclxufVxyXG5cclxuLy9hbmltYXRpb24gbG9vcFxyXG5mdW5jdGlvbiBsb29wKCkge1xyXG4gIGNpcmNsZS5tb3ZlKCk7XHJcbiAgY2lyY2xlLnVwZGF0ZSgpO1xyXG5cclxuICByYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0KCkge1xyXG5cclxuICBjaXJjbGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgY2lyY2xlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dkcy1jb25jZW50cmF0aW9uQ2lyY2xlJyk7XHJcblxyXG4gIHNldFN0eWxlKGNpcmNsZUVsZW1lbnQsIHtcclxuICAgIHBvc2l0aW9uOiAnZml4ZWQnLCBcclxuICAgIGJhY2tncm91bmRDb2xvcjogJ3JlZCcsXHJcbiAgICB6SW5kZXg6ICc5OTk5OTk5JyxcclxuICAgIGJvcmRlclJhZGl1czogJzUwJSdcclxuICB9KTtcclxuXHJcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjaXJjbGVFbGVtZW50KTtcclxuXHJcbiAgY2lyY2xlID0gbmV3IENpcmNsZShcclxuICAgIHJhbmRvbSgwLCB3aWR0aCksXHJcbiAgICByYW5kb20oMCwgaGVpZ2h0KSxcclxuICAgIHZlbG9jaXR5LFxyXG4gICAgdmVsb2NpdHksXHJcbiAgICBzaXplXHJcbiAgKTtcclxuXHJcbiAgbG9vcCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wKCkge1xyXG5cclxuICBpZihjaXJjbGVFbGVtZW50KSB7XHJcbiAgICByZW1vdmVFbGVtZW50KGNpcmNsZUVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgaWYocmFmKSB7XHJcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyYWYpO1xyXG4gIH1cclxuXHJcbiAgY2lyY2xlID0gbnVsbDtcclxuXHJcbn0qL1xuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgaWYgKHJlcXVlc3QuYWN0aW9uID09PSAnc3RhcnRTaW11bGF0aW9uJyAmJiByZXF1ZXN0LnNpbXVsYXRpb24gPT09IG5hbWUpIHtcbiAgICBzdGFydCgpO1xuICB9IGVsc2UgaWYgKHJlcXVlc3QuYWN0aW9uID09PSAnc3RvcFNpbXVsYXRpb24nICYmIHJlcXVlc3Quc2ltdWxhdGlvbiA9PT0gbmFtZSkge1xuICAgIHN0b3AoKTtcbiAgfVxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb250ZW50LmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5hZGRDc3MgPSBhZGRDc3M7XG5leHBvcnRzLmFkZFNjcmlwdCA9IGFkZFNjcmlwdDtcbmV4cG9ydHMuYWRkU3R5bGUgPSBhZGRTdHlsZTtcbmV4cG9ydHMuYXBwZW5kSFRNTCA9IGFwcGVuZEhUTUw7XG5leHBvcnRzLmdldFRleHROb2RlcyA9IGdldFRleHROb2RlcztcbmV4cG9ydHMucmVtb3ZlRWxlbWVudCA9IHJlbW92ZUVsZW1lbnQ7XG5leHBvcnRzLnNldFN0eWxlID0gc2V0U3R5bGU7XG5mdW5jdGlvbiBhZGRDc3MoaHJlZiwgY2FsbGJhY2spIHtcbiAgdmFyIGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gIGwuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gIGwuc2V0QXR0cmlidXRlKCdyZWwnLCAnc3R5bGVzaGVldCcpO1xuICBsLm9ubG9hZCA9IGNhbGxiYWNrO1xuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGwpO1xuICByZXR1cm4gbDtcbn1cblxuZnVuY3Rpb24gYWRkU2NyaXB0KHNyYywgY2FsbGJhY2spIHtcbiAgdmFyIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgcy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYyk7XG4gIHMub25sb2FkID0gY2FsbGJhY2s7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQocyk7XG4gIHJldHVybiBzO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZShzdHIpIHtcbiAgdmFyIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBzLmlubmVyVGV4dCA9IHN0cjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzKTtcbiAgcmV0dXJuIHM7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEhUTUwoZWwsIGh0bWwpIHtcbiAgdmFyIHRtcEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRtcEVsLmlubmVySFRNTCA9IGh0bWw7XG5cbiAgd2hpbGUgKHRtcEVsLmZpcnN0Q2hpbGQpIHtcbiAgICBlbC5hcHBlbmRDaGlsZCh0bXBFbC5maXJzdENoaWxkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRUZXh0Tm9kZXMobm9kZSkge1xuICB2YXIgYWxsID0gW107XG4gIGZvciAobm9kZSA9IG5vZGUuZmlyc3RDaGlsZDsgbm9kZTsgbm9kZSA9IG5vZGUubmV4dFNpYmxpbmcpIHtcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PSAzKSBhbGwucHVzaChub2RlKTtlbHNlIGFsbCA9IGFsbC5jb25jYXQoZ2V0VGV4dE5vZGVzKG5vZGUpKTtcbiAgfVxuICByZXR1cm4gYWxsO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFbGVtZW50KGVsKSB7XG4gIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xufVxuXG5mdW5jdGlvbiBzZXRTdHlsZShlbGVtZW50LCBzdHlsZSkge1xuICBmb3IgKHZhciBzIGluIHN0eWxlKSB7XG4gICAgZWxlbWVudC5zdHlsZVtzXSA9IHN0eWxlW3NdO1xuICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kb20uanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucmFuZG9tID0gcmFuZG9tO1xuZXhwb3J0cy5wb2ludEluUmVjdCA9IHBvaW50SW5SZWN0O1xuZXhwb3J0cy5pblJhbmdlID0gaW5SYW5nZTtcbmZ1bmN0aW9uIHJhbmRvbShtaW4sIG1heCkge1xuICByZXR1cm4gTWF0aC5mbG9vcihtaW4gKyBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKTtcbn1cblxuZnVuY3Rpb24gcG9pbnRJblJlY3QoeCwgeSwgcmVjdCkge1xuICByZXR1cm4gaW5SYW5nZSh4LCByZWN0LngsIHJlY3QueCArIHJlY3Qud2lkdGgpICYmIGluUmFuZ2UoeSwgcmVjdC55LCByZWN0LnkgKyByZWN0LmhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIGluUmFuZ2UodmFsdWUsIG1pbiwgbWF4KSB7XG4gIHJldHVybiB2YWx1ZSA+PSBNYXRoLm1pbihtaW4sIG1heCkgJiYgdmFsdWUgPD0gTWF0aC5tYXgobWluLCBtYXgpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWF0aC5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5pc0xldHRlciA9IGlzTGV0dGVyO1xuZXhwb3J0cy5pc1VwcGVyQ2FzZSA9IGlzVXBwZXJDYXNlO1xuZnVuY3Rpb24gaXNMZXR0ZXIoYykge1xuICByZXR1cm4gYy50b0xvd2VyQ2FzZSgpICE9PSBjLnRvVXBwZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIGlzVXBwZXJDYXNlKGMpIHtcbiAgcmV0dXJuIGMgPT09IGMudG9VcHBlckNhc2UoKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0cmluZy5qcy5tYXBcbiJdfQ==
