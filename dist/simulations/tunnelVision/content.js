(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _math = require('../../utils/math.js');

var _dom = require('../../utils/dom.js');

var name = 'tunnelVision';
var cssUrl = chrome.extension.getURL('/simulations/tunnelVision/css/main.css');

var canvas = null;
var context = null;
var mouseX = 0;
var mouseY = 0;
var size = 0;
var css = null;

function setSize(e) {
  canvas.setAttribute('width', document.documentElement.clientWidth);
  canvas.setAttribute('height', document.documentElement.clientHeight);
  size = Math.min(window.innerWidth * .3, 300);
  update();
}

function setMousePosition(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  update();
}

function update() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);

  context.fillStyle = 'black';
  context.rect(0, 0, window.innerWidth, window.innerHeight);
  context.fill();

  context.save();

  context.globalCompositeOperation = 'destination-out';

  var gradient = context.createRadialGradient(mouseX, mouseY, size / 2, mouseX, mouseY, 0);
  gradient.addColorStop(0, 'transparent');
  gradient.addColorStop(.25, 'white');
  gradient.addColorStop(1, 'white');
  context.fillStyle = gradient;
  context.fillRect(mouseX - size / 2, mouseY - size / 2, size, size);

  context.restore();
}

function start() {
  css = (0, _dom.addCss)(cssUrl);

  canvas = document.createElement('canvas');
  context = canvas.getContext('2d');

  canvas.setAttribute('id', 'wds-tunnelVisionCanvas');
  document.body.appendChild(canvas);

  window.addEventListener("resize", setSize, false);
  canvas.addEventListener("mousemove", setMousePosition, false);

  setSize();
  update();
}

function stop() {
  if (css) {
    (0, _dom.removeElement)(css);
  }

  if (canvas) {
    (0, _dom.removeElement)(canvas);
  }

  // TODO: remove listeners
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'startSimulation' && request.simulation === name) {
    start();
  } else if (request.action === 'stopSimulation' && request.simulation === name) {
    stop();
  }
});


},{"../../utils/dom.js":2,"../../utils/math.js":3}],2:[function(require,module,exports){
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


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC9zaW11bGF0aW9ucy90dW5uZWxWaXNpb24vY29udGVudC5qcyIsImJ1aWxkL2pzL2JhYmVsL3V0aWxzL2RvbS5qcyIsImJ1aWxkL2pzL2JhYmVsL3V0aWxzL21hdGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxJQUFJLFFBQVEsUUFBUSxxQkFBUixDQUFaOztBQUVBLElBQUksT0FBTyxRQUFRLG9CQUFSLENBQVg7O0FBRUEsSUFBSSxPQUFPLGNBQVg7QUFDQSxJQUFJLFNBQVMsT0FBTyxTQUFQLENBQWlCLE1BQWpCLENBQXdCLHdDQUF4QixDQUFiOztBQUVBLElBQUksU0FBUyxJQUFiO0FBQ0EsSUFBSSxVQUFVLElBQWQ7QUFDQSxJQUFJLFNBQVMsQ0FBYjtBQUNBLElBQUksU0FBUyxDQUFiO0FBQ0EsSUFBSSxPQUFPLENBQVg7QUFDQSxJQUFJLE1BQU0sSUFBVjs7QUFFQSxTQUFTLE9BQVQsQ0FBaUIsQ0FBakIsRUFBb0I7QUFDbEIsU0FBTyxZQUFQLENBQW9CLE9BQXBCLEVBQTZCLFNBQVMsZUFBVCxDQUF5QixXQUF0RDtBQUNBLFNBQU8sWUFBUCxDQUFvQixRQUFwQixFQUE4QixTQUFTLGVBQVQsQ0FBeUIsWUFBdkQ7QUFDQSxTQUFPLEtBQUssR0FBTCxDQUFTLE9BQU8sVUFBUCxHQUFvQixFQUE3QixFQUFpQyxHQUFqQyxDQUFQO0FBQ0E7QUFDRDs7QUFFRCxTQUFTLGdCQUFULENBQTBCLENBQTFCLEVBQTZCO0FBQzNCLFdBQVMsRUFBRSxPQUFYO0FBQ0EsV0FBUyxFQUFFLE9BQVg7QUFDQTtBQUNEOztBQUVELFNBQVMsTUFBVCxHQUFrQjtBQUNoQixVQUFRLFNBQVIsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsT0FBTyxVQUEvQixFQUEyQyxPQUFPLFdB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Iiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX21hdGggPSByZXF1aXJlKCcuLi8uLi91dGlscy9tYXRoLmpzJyk7XG5cbnZhciBfZG9tID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvZG9tLmpzJyk7XG5cbnZhciBuYW1lID0gJ3R1bm5lbFZpc2lvbic7XG52YXIgY3NzVXJsID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9zaW11bGF0aW9ucy90dW5uZWxWaXNpb24vY3NzL21haW4uY3NzJyk7XG5cbnZhciBjYW52YXMgPSBudWxsO1xudmFyIGNvbnRleHQgPSBudWxsO1xudmFyIG1vdXNlWCA9IDA7XG52YXIgbW91c2VZID0gMDtcbnZhciBzaXplID0gMDtcbnZhciBjc3MgPSBudWxsO1xuXG5mdW5jdGlvbiBzZXRTaXplKGUpIHtcbiAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpO1xuICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbiAgc2l6ZSA9IE1hdGgubWluKHdpbmRvdy5pbm5lcldpZHRoICogLjMsIDMwMCk7XG4gIHVwZGF0ZSgpO1xufVxuXG5mdW5jdGlvbiBzZXRNb3VzZVBvc2l0aW9uKGUpIHtcbiAgbW91c2VYID0gZS5jbGllbnRYO1xuICBtb3VzZVkgPSBlLmNsaWVudFk7XG4gIHVwZGF0ZSgpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUoKSB7XG4gIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gIGNvbnRleHQuZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgY29udGV4dC5yZWN0KDAsIDAsIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICBjb250ZXh0LmZpbGwoKTtcblxuICBjb250ZXh0LnNhdmUoKTtcblxuICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1vdXQnO1xuXG4gIHZhciBncmFkaWVudCA9IGNvbnRleHQuY3JlYXRlUmFkaWFsR3JhZGllbnQobW91c2VYLCBtb3VzZVksIHNpemUgLyAyLCBtb3VzZVgsIG1vdXNlWSwgMCk7XG4gIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCAndHJhbnNwYXJlbnQnKTtcbiAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKC4yNSwgJ3doaXRlJyk7XG4gIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCAnd2hpdGUnKTtcbiAgY29udGV4dC5maWxsU3R5bGUgPSBncmFkaWVudDtcbiAgY29udGV4dC5maWxsUmVjdChtb3VzZVggLSBzaXplIC8gMiwgbW91c2VZIC0gc2l6ZSAvIDIsIHNpemUsIHNpemUpO1xuXG4gIGNvbnRleHQucmVzdG9yZSgpO1xufVxuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgY3NzID0gKDAsIF9kb20uYWRkQ3NzKShjc3NVcmwpO1xuXG4gIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaWQnLCAnd2RzLXR1bm5lbFZpc2lvbkNhbnZhcycpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgc2V0U2l6ZSwgZmFsc2UpO1xuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBzZXRNb3VzZVBvc2l0aW9uLCBmYWxzZSk7XG5cbiAgc2V0U2l6ZSgpO1xuICB1cGRhdGUoKTtcbn1cblxuZnVuY3Rpb24gc3RvcCgpIHtcbiAgaWYgKGNzcykge1xuICAgICgwLCBfZG9tLnJlbW92ZUVsZW1lbnQpKGNzcyk7XG4gIH1cblxuICBpZiAoY2FudmFzKSB7XG4gICAgKDAsIF9kb20ucmVtb3ZlRWxlbWVudCkoY2FudmFzKTtcbiAgfVxuXG4gIC8vIFRPRE86IHJlbW92ZSBsaXN0ZW5lcnNcbn1cblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICBpZiAocmVxdWVzdC5hY3Rpb24gPT09ICdzdGFydFNpbXVsYXRpb24nICYmIHJlcXVlc3Quc2ltdWxhdGlvbiA9PT0gbmFtZSkge1xuICAgIHN0YXJ0KCk7XG4gIH0gZWxzZSBpZiAocmVxdWVzdC5hY3Rpb24gPT09ICdzdG9wU2ltdWxhdGlvbicgJiYgcmVxdWVzdC5zaW11bGF0aW9uID09PSBuYW1lKSB7XG4gICAgc3RvcCgpO1xuICB9XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRlbnQuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmFkZENzcyA9IGFkZENzcztcbmV4cG9ydHMuYWRkU2NyaXB0ID0gYWRkU2NyaXB0O1xuZXhwb3J0cy5hZGRTdHlsZSA9IGFkZFN0eWxlO1xuZXhwb3J0cy5hcHBlbmRIVE1MID0gYXBwZW5kSFRNTDtcbmV4cG9ydHMuZ2V0VGV4dE5vZGVzID0gZ2V0VGV4dE5vZGVzO1xuZXhwb3J0cy5yZW1vdmVFbGVtZW50ID0gcmVtb3ZlRWxlbWVudDtcbmV4cG9ydHMuc2V0U3R5bGUgPSBzZXRTdHlsZTtcbmZ1bmN0aW9uIGFkZENzcyhocmVmLCBjYWxsYmFjaykge1xuICB2YXIgbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgbC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgbC5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdzdHlsZXNoZWV0Jyk7XG4gIGwub25sb2FkID0gY2FsbGJhY2s7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobCk7XG4gIHJldHVybiBsO1xufVxuXG5mdW5jdGlvbiBhZGRTY3JpcHQoc3JjLCBjYWxsYmFjaykge1xuICB2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICBzLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcbiAgcy5vbmxvYWQgPSBjYWxsYmFjaztcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzKTtcbiAgcmV0dXJuIHM7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKHN0cikge1xuICB2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHMuaW5uZXJUZXh0ID0gc3RyO1xuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHMpO1xuICByZXR1cm4gcztcbn1cblxuZnVuY3Rpb24gYXBwZW5kSFRNTChlbCwgaHRtbCkge1xuICB2YXIgdG1wRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdG1wRWwuaW5uZXJIVE1MID0gaHRtbDtcblxuICB3aGlsZSAodG1wRWwuZmlyc3RDaGlsZCkge1xuICAgIGVsLmFwcGVuZENoaWxkKHRtcEVsLmZpcnN0Q2hpbGQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRleHROb2Rlcyhub2RlKSB7XG4gIHZhciBhbGwgPSBbXTtcbiAgZm9yIChub2RlID0gbm9kZS5maXJzdENoaWxkOyBub2RlOyBub2RlID0gbm9kZS5uZXh0U2libGluZykge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09IDMpIGFsbC5wdXNoKG5vZGUpO2Vsc2UgYWxsID0gYWxsLmNvbmNhdChnZXRUZXh0Tm9kZXMobm9kZSkpO1xuICB9XG4gIHJldHVybiBhbGw7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUVsZW1lbnQoZWwpIHtcbiAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG59XG5cbmZ1bmN0aW9uIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlKSB7XG4gIGZvciAodmFyIHMgaW4gc3R5bGUpIHtcbiAgICBlbGVtZW50LnN0eWxlW3NdID0gc3R5bGVbc107XG4gIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbS5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yYW5kb20gPSByYW5kb207XG5leHBvcnRzLnBvaW50SW5SZWN0ID0gcG9pbnRJblJlY3Q7XG5leHBvcnRzLmluUmFuZ2UgPSBpblJhbmdlO1xuZnVuY3Rpb24gcmFuZG9tKG1pbiwgbWF4KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKG1pbiArIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xufVxuXG5mdW5jdGlvbiBwb2ludEluUmVjdCh4LCB5LCByZWN0KSB7XG4gIHJldHVybiBpblJhbmdlKHgsIHJlY3QueCwgcmVjdC54ICsgcmVjdC53aWR0aCkgJiYgaW5SYW5nZSh5LCByZWN0LnksIHJlY3QueSArIHJlY3QuaGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gaW5SYW5nZSh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgcmV0dXJuIHZhbHVlID49IE1hdGgubWluKG1pbiwgbWF4KSAmJiB2YWx1ZSA8PSBNYXRoLm1heChtaW4sIG1heCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXRoLmpzLm1hcFxuIl19
