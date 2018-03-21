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

  function updateTransition() {
    var el = document.querySelector("body");

    if (el) {
      el.classList.toggle("wds-concentration-body");
    }

    return el;
  }

  var animationInterval = window.setInterval(updateTransition, math.random(750, 7000));

  function updateParagraph() {
    var paragraphEl = document.querySelector('p');

    if (paragraphEl) {

      paragraphEl.classList.toggle("wds-concentration-paragraph");
    }

    return paragraphEl;
  }

  var paragraphInterval = window.setInterval(updateParagraph, math.random(750, 7000));
}

function stop() {

  clearInterval(animationInterval);

  (0, _dom.removeElement)(css);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC9zaW11bGF0aW9ucy9jb25jZW50cmF0aW9uL2NvbnRlbnQuanMiLCJidWlsZC9qcy9iYWJlbC91dGlscy9kb20uanMiLCJidWlsZC9qcy9iYWJlbC91dGlscy9tYXRoLmpzIiwiYnVpbGQvanMvYmFiZWwvdXRpbHMvc3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsSUFBSSxRQUFRLFFBQVEscUJBQVIsQ0FBWjs7QUFFQSxJQUFJLE9BQU8sd0JBQXdCLEtBQXhCLENBQVg7O0FBRUEsSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBWDs7QUFFQSxJQUFJLFVBQVUsUUFBUSx1QkFBUixDQUFkOztBQUVBLFNBQVMsdUJBQVQsQ0FBaUMsR0FBakMsRUFBc0M7QUFBRSxNQUFJLE9BQU8sSUFBSSxVQUFmLEVBQTJCO0FBQUUsV0FBTyxHQUFQO0FBQWEsR0FBMUMsTUFBZ0Q7QUFBRSxRQUFJLFNBQVMsRUFBYixDQUFpQixJQUFJLE9BQU8sSUFBWCxFQUFpQjtBQUFFLFdBQUssSUFBSSxHQUFULElBQWdCLEdBQWhCLEVBQXFCO0FBQUUsWUFBSSxPQUFPLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBcUMsR0FBckMsRUFBMEMsR0FBMUMsQ0FBSixFQUFvRCxPQUFPLEdBQVAsSUFBYyxJQUFJLEdBQUosQ0FBZDtBQUF5QjtBQUFFLEtBQUMsT0FBTyxPQUFQLEdBQWlCLEdBQWpCLENBQXNCLE9BQU8sTUFBUDtBQUFnQjtBQUFFOztBQUU3USxJQUFJLE9BQU8sZUFBWDtBQUNBLElBQUksTUFBTSxJQUFWOztBQUVBLFNBQVMsS0FBVCxHQUFpQjs7QUFFZixNQUFJLFNBQVMsT0FBTyxTQUFQLENBQWlCLE1BQWpCLENBQXdCLGtCQUFrQixJQUFsQixHQUF5QixlQUFqRCxDQUFi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b24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfbWF0aCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL21hdGguanMnKTtcblxudmFyIG1hdGggPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfbWF0aCk7XG5cbnZhciBfZG9tID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvZG9tLmpzJyk7XG5cbnZhciBfc3RyaW5nID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvc3RyaW5nLmpzJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbnZhciBuYW1lID0gJ2NvbmNlbnRyYXRpb24nO1xudmFyIGNzcyA9IG51bGw7XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuXG4gIHZhciBjc3NVcmwgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL3NpbXVsYXRpb25zLycgKyBuYW1lICsgJy9jc3MvbWFpbi5jc3MnKTtcblxuICBjc3MgPSAoMCwgX2RvbS5hZGRDc3MpKGNzc1VybCk7XG5cbiAgZnVuY3Rpb24gdXBkYXRlVHJhbnNpdGlvbigpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcblxuICAgIGlmIChlbCkge1xuICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShcIndkcy1jb25jZW50cmF0aW9uLWJvZHlcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgdmFyIGFuaW1hdGlvbkludGVydmFsID0gd2luZG93LnNldEludGVydmFsKHVwZGF0ZVRyYW5zaXRpb24sIG1hdGgucmFuZG9tKDc1MCwgNzAwMCkpO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZVBhcmFncmFwaCgpIHtcbiAgICB2YXIgcGFyYWdyYXBoRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwJyk7XG5cbiAgICBpZiAocGFyYWdyYXBoRWwpIHtcblxuICAgICAgcGFyYWdyYXBoRWwuY2xhc3NMaXN0LnRvZ2dsZShcIndkcy1jb25jZW50cmF0aW9uLXBhcmFncmFwaFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYWdyYXBoRWw7XG4gIH1cblxuICB2YXIgcGFyYWdyYXBoSW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwodXBkYXRlUGFyYWdyYXBoLCBtYXRoLnJhbmRvbSg3NTAsIDcwMDApKTtcbn1cblxuZnVuY3Rpb24gc3RvcCgpIHtcblxuICBjbGVhckludGVydmFsKGFuaW1hdGlvbkludGVydmFsKTtcblxuICAoMCwgX2RvbS5yZW1vdmVFbGVtZW50KShjc3MpO1xufVxuXG4vKmNvbnN0IHdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG5jb25zdCBoZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG5jb25zdCB2ZWxvY2l0eSA9IDE1O1xyXG5jb25zdCBzaXplID0gd2lkdGggKiAuMjI1O1xyXG5cclxubGV0IGNpcmNsZUVsZW1lbnQgPSBudWxsO1xyXG5sZXQgY2lyY2xlID0gbnVsbDtcclxubGV0IHJhZiA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiByYW5kb21WZWxvY2l0eSgpIHtcclxuICByZXR1cm4gcmFuZG9tKHZlbG9jaXR5IC0gMiwgdmVsb2NpdHkgKyAyKTtcclxufVxyXG5cclxuY2xhc3MgQ2lyY2xlIHtcclxuICBjb25zdHJ1Y3Rvcih4LCB5LCB2ZWxYLCB2ZWxZLCBzaXplKSB7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTsgXHJcbiAgICB0aGlzLnZlbFggPSB2ZWxYO1xyXG4gICAgdGhpcy52ZWxZID0gdmVsWTsgXHJcbiAgICB0aGlzLnNpemUgPSBzaXplOyBcclxuXHJcbiAgICBjaXJjbGVFbGVtZW50LnN0eWxlLmxlZnQgPSAwO1xyXG4gICAgY2lyY2xlRWxlbWVudC5zdHlsZS50b3AgPSAwO1xyXG5cclxuICAgIGNpcmNsZUVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHtzaXplfXB4YDtcclxuICAgIGNpcmNsZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZX1weGA7XHJcblxyXG4gIH1cclxuXHJcbiAgbW92ZSgpIHtcclxuICAgIGNpcmNsZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7dGhpcy54fXB4LCAke3RoaXMueX1weCwgMClgO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgaWYgKCh0aGlzLnggKyB0aGlzLnNpemUpID49IHdpZHRoIC0gMikge1xyXG4gICAgICB0aGlzLnZlbFggPSAtcmFuZG9tVmVsb2NpdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoKHRoaXMueCkgPD0gMCkge1xyXG4gICAgICB0aGlzLnZlbFggPSByYW5kb21WZWxvY2l0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgodGhpcy55ICsgdGhpcy5zaXplKSA+PSBoZWlnaHQgLSAyKSB7XHJcbiAgICAgIHRoaXMudmVsWSA9IC1yYW5kb21WZWxvY2l0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgodGhpcy55KSA8PSAwKSB7XHJcbiAgICAgIHRoaXMudmVsWSA9IHJhbmRvbVZlbG9jaXR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy54ICs9IHRoaXMudmVsWDtcclxuICAgIHRoaXMueSArPSB0aGlzLnZlbFk7XHJcbiAgfVxyXG59XHJcblxyXG4vL2FuaW1hdGlvbiBsb29wXHJcbmZ1bmN0aW9uIGxvb3AoKSB7XHJcbiAgY2lyY2xlLm1vdmUoKTtcclxuICBjaXJjbGUudXBkYXRlKCk7XHJcblxyXG4gIHJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnQoKSB7XHJcblxyXG4gIGNpcmNsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBjaXJjbGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCAnd2RzLWNvbmNlbnRyYXRpb25DaXJjbGUnKTtcclxuXHJcbiAgc2V0U3R5bGUoY2lyY2xlRWxlbWVudCwge1xyXG4gICAgcG9zaXRpb246ICdmaXhlZCcsIFxyXG4gICAgYmFja2dyb3VuZENvbG9yOiAncmVkJyxcclxuICAgIHpJbmRleDogJzk5OTk5OTknLFxyXG4gICAgYm9yZGVyUmFkaXVzOiAnNTAlJ1xyXG4gIH0pO1xyXG5cclxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNpcmNsZUVsZW1lbnQpO1xyXG5cclxuICBjaXJjbGUgPSBuZXcgQ2lyY2xlKFxyXG4gICAgcmFuZG9tKDAsIHdpZHRoKSxcclxuICAgIHJhbmRvbSgwLCBoZWlnaHQpLFxyXG4gICAgdmVsb2NpdHksXHJcbiAgICB2ZWxvY2l0eSxcclxuICAgIHNpemVcclxuICApO1xyXG5cclxuICBsb29wKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3AoKSB7XHJcblxyXG4gIGlmKGNpcmNsZUVsZW1lbnQpIHtcclxuICAgIHJlbW92ZUVsZW1lbnQoY2lyY2xlRWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBpZihyYWYpIHtcclxuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZik7XHJcbiAgfVxyXG5cclxuICBjaXJjbGUgPSBudWxsO1xyXG5cclxufSovXG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdCkge1xuICBpZiAocmVxdWVzdC5hY3Rpb24gPT09ICdzdGFydFNpbXVsYXRpb24nICYmIHJlcXVlc3Quc2ltdWxhdGlvbiA9PT0gbmFtZSkge1xuICAgIHN0YXJ0KCk7XG4gIH0gZWxzZSBpZiAocmVxdWVzdC5hY3Rpb24gPT09ICdzdG9wU2ltdWxhdGlvbicgJiYgcmVxdWVzdC5zaW11bGF0aW9uID09PSBuYW1lKSB7XG4gICAgc3RvcCgpO1xuICB9XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRlbnQuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmFkZENzcyA9IGFkZENzcztcbmV4cG9ydHMuYWRkU2NyaXB0ID0gYWRkU2NyaXB0O1xuZXhwb3J0cy5hZGRTdHlsZSA9IGFkZFN0eWxlO1xuZXhwb3J0cy5hcHBlbmRIVE1MID0gYXBwZW5kSFRNTDtcbmV4cG9ydHMuZ2V0VGV4dE5vZGVzID0gZ2V0VGV4dE5vZGVzO1xuZXhwb3J0cy5yZW1vdmVFbGVtZW50ID0gcmVtb3ZlRWxlbWVudDtcbmV4cG9ydHMuc2V0U3R5bGUgPSBzZXRTdHlsZTtcbmZ1bmN0aW9uIGFkZENzcyhocmVmLCBjYWxsYmFjaykge1xuICB2YXIgbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgbC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgbC5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdzdHlsZXNoZWV0Jyk7XG4gIGwub25sb2FkID0gY2FsbGJhY2s7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobCk7XG4gIHJldHVybiBsO1xufVxuXG5mdW5jdGlvbiBhZGRTY3JpcHQoc3JjLCBjYWxsYmFjaykge1xuICB2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICBzLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcbiAgcy5vbmxvYWQgPSBjYWxsYmFjaztcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzKTtcbiAgcmV0dXJuIHM7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKHN0cikge1xuICB2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHMuaW5uZXJUZXh0ID0gc3RyO1xuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHMpO1xuICByZXR1cm4gcztcbn1cblxuZnVuY3Rpb24gYXBwZW5kSFRNTChlbCwgaHRtbCkge1xuICB2YXIgdG1wRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdG1wRWwuaW5uZXJIVE1MID0gaHRtbDtcblxuICB3aGlsZSAodG1wRWwuZmlyc3RDaGlsZCkge1xuICAgIGVsLmFwcGVuZENoaWxkKHRtcEVsLmZpcnN0Q2hpbGQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRleHROb2Rlcyhub2RlKSB7XG4gIHZhciBhbGwgPSBbXTtcbiAgZm9yIChub2RlID0gbm9kZS5maXJzdENoaWxkOyBub2RlOyBub2RlID0gbm9kZS5uZXh0U2libGluZykge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09IDMpIGFsbC5wdXNoKG5vZGUpO2Vsc2UgYWxsID0gYWxsLmNvbmNhdChnZXRUZXh0Tm9kZXMobm9kZSkpO1xuICB9XG4gIHJldHVybiBhbGw7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUVsZW1lbnQoZWwpIHtcbiAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG59XG5cbmZ1bmN0aW9uIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlKSB7XG4gIGZvciAodmFyIHMgaW4gc3R5bGUpIHtcbiAgICBlbGVtZW50LnN0eWxlW3NdID0gc3R5bGVbc107XG4gIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yYW5kb20gPSByYW5kb207XG5leHBvcnRzLnBvaW50SW5SZWN0ID0gcG9pbnRJblJlY3Q7XG5leHBvcnRzLmluUmFuZ2UgPSBpblJhbmdlO1xuZnVuY3Rpb24gcmFuZG9tKG1pbiwgbWF4KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKG1pbiArIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xufVxuXG5mdW5jdGlvbiBwb2ludEluUmVjdCh4LCB5LCByZWN0KSB7XG4gIHJldHVybiBpblJhbmdlKHgsIHJlY3QueCwgcmVjdC54ICsgcmVjdC53aWR0aCkgJiYgaW5SYW5nZSh5LCByZWN0LnksIHJlY3QueSArIHJlY3QuaGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gaW5SYW5nZSh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgcmV0dXJuIHZhbHVlID49IE1hdGgubWluKG1pbiwgbWF4KSAmJiB2YWx1ZSA8PSBNYXRoLm1heChtaW4sIG1heCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXRoLmpzLm1hcFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmlzTGV0dGVyID0gaXNMZXR0ZXI7XG5leHBvcnRzLmlzVXBwZXJDYXNlID0gaXNVcHBlckNhc2U7XG5mdW5jdGlvbiBpc0xldHRlcihjKSB7XG4gIHJldHVybiBjLnRvTG93ZXJDYXNlKCkgIT09IGMudG9VcHBlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gaXNVcHBlckNhc2UoYykge1xuICByZXR1cm4gYyA9PT0gYy50b1VwcGVyQ2FzZSgpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RyaW5nLmpzLm1hcFxuIl19
