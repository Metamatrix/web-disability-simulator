(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _dom = require('../../utils/dom.js');

var name = 'tunnelVision';
var cssUrl = chrome.runtime.getURL('/simulations/tunnelVision/css/main.css');

var canvas = null;
var context = null;
var mouseX = 0;
var mouseY = 0;
var size = 0;
var css = null;

function setSize() {
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

  context.beginPath();
  context.arc(mouseX, mouseY, size / 2, 0, 2 * Math.PI);

  context.fill();

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

  window.removeEventListener("resize", setSize, false);
  canvas.removeEventListener("mousemove", setMousePosition, false);
}

chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === 'startSimulation' && request.simulation === name) {
    start();
  } else if (request.action === 'stopSimulation' && request.simulation === name) {
    stop();
  }
});


},{"../../utils/dom.js":2}],2:[function(require,module,exports){
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


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcdHVubmVsVmlzaW9uXFxjb250ZW50LmpzIiwiYnVpbGRcXGpzXFxiYWJlbFxcdXRpbHNcXGRvbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLElBQUksT0FBTyxRQUFRLG9CQUFSLENBQVg7O0FBRUEsSUFBSSxPQUFPLGNBQVg7QUFDQSxJQUFJLFNBQVMsT0FBTyxTQUFQLENBQWlCLE1BQWpCLENBQXdCLHdDQUF4QixDQUFiOztBQUVBLElBQUksU0FBUyxJQUFiO0FBQ0EsSUFBSSxVQUFVLElBQWQ7QUFDQSxJQUFJLFNBQVMsQ0FBYjtBQUNBLElBQUksU0FBUyxDQUFiO0FBQ0EsSUFBSSxPQUFPLENBQVg7QUFDQSxJQUFJLE1BQU0sSUFBVjs7QUFFQSxTQUFTLE9BQVQsR0FBbUI7QUFDakIsU0FBTyxZQUFQLENBQW9CLE9BQXBCLEVBQTZCLFNBQVMsZUFBVCxDQUF5QixXQUF0RDtBQUNBLFNBQU8sWUFBUCxDQUFvQixRQUFwQixFQUE4QixTQUFTLGVBQVQsQ0FBeUIsWUFBdkQ7QUFDQSxTQUFPLEtBQUssR0FBTCxDQUFTLE9BQU8sVUFBUCxHQUFvQixFQUE3QixFQUFpQyxHQUFqQyxDQUFQO0FBQ0E7QUFDRDs7QUFFRCxTQUFTLGdCQUFULENBQTBCLENBQTFCLEVBQTZCO0FBQzNCLFdBQVMsRUFBRSxPQUFYO0FBQ0EsV0FBUyxFQUFFLE9BQVg7QUFDQTtBQUNEOztBQUVELFNBQVMsTUFBVCxHQUFrQjs7QUFFaEIsVUFBUSxTQUFSLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCLE9BQU8sVUFBL0IsRUFBMkMsT0FBTyxXQUFsRDs7QUFFQSxVQUFRLFNBQVIsR0FBb0IsT0FBcEI7QUFDQSxVQUFRLElBQVIsQ0FBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLE9BQU8sVUFBMUIsRUFBc0MsT0FB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cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2RvbSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2RvbS5qcycpO1xuXG52YXIgbmFtZSA9ICd0dW5uZWxWaXNpb24nO1xudmFyIGNzc1VybCA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvc2ltdWxhdGlvbnMvdHVubmVsVmlzaW9uL2Nzcy9tYWluLmNzcycpO1xuXG52YXIgY2FudmFzID0gbnVsbDtcbnZhciBjb250ZXh0ID0gbnVsbDtcbnZhciBtb3VzZVggPSAwO1xudmFyIG1vdXNlWSA9IDA7XG52YXIgc2l6ZSA9IDA7XG52YXIgY3NzID0gbnVsbDtcblxuZnVuY3Rpb24gc2V0U2l6ZSgpIHtcbiAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpO1xuICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcbiAgc2l6ZSA9IE1hdGgubWluKHdpbmRvdy5pbm5lcldpZHRoICogLjMsIDMwMCk7XG4gIHVwZGF0ZSgpO1xufVxuXG5mdW5jdGlvbiBzZXRNb3VzZVBvc2l0aW9uKGUpIHtcbiAgbW91c2VYID0gZS5jbGllbnRYO1xuICBtb3VzZVkgPSBlLmNsaWVudFk7XG4gIHVwZGF0ZSgpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUoKSB7XG5cbiAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgY29udGV4dC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICBjb250ZXh0LnJlY3QoMCwgMCwgd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gIGNvbnRleHQuZmlsbCgpO1xuXG4gIGNvbnRleHQuc2F2ZSgpO1xuXG4gIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLW91dCc7XG5cbiAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgY29udGV4dC5hcmMobW91c2VYLCBtb3VzZVksIHNpemUgLyAyLCAwLCAyICogTWF0aC5QSSk7XG5cbiAgY29udGV4dC5maWxsKCk7XG5cbiAgY29udGV4dC5yZXN0b3JlKCk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICBjc3MgPSAoMCwgX2RvbS5hZGRDc3MpKGNzc1VybCk7XG5cbiAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICBjYW52YXMuc2V0QXR0cmlidXRlKCdpZCcsICd3ZHMtdHVubmVsVmlzaW9uQ2FudmFzJyk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBzZXRTaXplLCBmYWxzZSk7XG4gIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHNldE1vdXNlUG9zaXRpb24sIGZhbHNlKTtcblxuICBzZXRTaXplKCk7XG4gIHVwZGF0ZSgpO1xufVxuXG5mdW5jdGlvbiBzdG9wKCkge1xuICBpZiAoY3NzKSB7XG4gICAgKDAsIF9kb20ucmVtb3ZlRWxlbWVudCkoY3NzKTtcbiAgfVxuXG4gIGlmIChjYW52YXMpIHtcbiAgICAoMCwgX2RvbS5yZW1vdmVFbGVtZW50KShjYW52YXMpO1xuICB9XG5cbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgc2V0U2l6ZSwgZmFsc2UpO1xuICBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBzZXRNb3VzZVBvc2l0aW9uLCBmYWxzZSk7XG59XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdCkge1xuICBpZiAocmVxdWVzdC5hY3Rpb24gPT09ICdzdGFydFNpbXVsYXRpb24nICYmIHJlcXVlc3Quc2ltdWxhdGlvbiA9PT0gbmFtZSkge1xuICAgIHN0YXJ0KCk7XG4gIH0gZWxzZSBpZiAocmVxdWVzdC5hY3Rpb24gPT09ICdzdG9wU2ltdWxhdGlvbicgJiYgcmVxdWVzdC5zaW11bGF0aW9uID09PSBuYW1lKSB7XG4gICAgc3RvcCgpO1xuICB9XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRlbnQuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmFkZENzcyA9IGFkZENzcztcbmV4cG9ydHMuYWRkU2NyaXB0ID0gYWRkU2NyaXB0O1xuZXhwb3J0cy5hZGRTdHlsZSA9IGFkZFN0eWxlO1xuZXhwb3J0cy5hcHBlbmRIVE1MID0gYXBwZW5kSFRNTDtcbmV4cG9ydHMuZ2V0VGV4dE5vZGVzID0gZ2V0VGV4dE5vZGVzO1xuZXhwb3J0cy5yZW1vdmVFbGVtZW50ID0gcmVtb3ZlRWxlbWVudDtcbmV4cG9ydHMuc2V0U3R5bGUgPSBzZXRTdHlsZTtcbmZ1bmN0aW9uIGFkZENzcyhocmVmLCBjYWxsYmFjaykge1xuICB2YXIgbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgbC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgbC5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdzdHlsZXNoZWV0Jyk7XG4gIGwub25sb2FkID0gY2FsbGJhY2s7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobCk7XG4gIHJldHVybiBsO1xufVxuXG5mdW5jdGlvbiBhZGRTY3JpcHQoc3JjLCBjYWxsYmFjaykge1xuICB2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICBzLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcbiAgcy5vbmxvYWQgPSBjYWxsYmFjaztcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzKTtcbiAgcmV0dXJuIHM7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKHN0cikge1xuICB2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHMuaW5uZXJUZXh0ID0gc3RyO1xuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHMpO1xuICByZXR1cm4gcztcbn1cblxuZnVuY3Rpb24gYXBwZW5kSFRNTChlbCwgaHRtbCkge1xuICB2YXIgdG1wRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdG1wRWwuaW5uZXJIVE1MID0gaHRtbDtcblxuICB3aGlsZSAodG1wRWwuZmlyc3RDaGlsZCkge1xuICAgIGVsLmFwcGVuZENoaWxkKHRtcEVsLmZpcnN0Q2hpbGQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFRleHROb2Rlcyhub2RlKSB7XG4gIHZhciBhbGwgPSBbXTtcbiAgZm9yIChub2RlID0gbm9kZS5maXJzdENoaWxkOyBub2RlOyBub2RlID0gbm9kZS5uZXh0U2libGluZykge1xuICAgIGlmIChub2RlLm5vZGVUeXBlID09IDMpIGFsbC5wdXNoKG5vZGUpO2Vsc2UgYWxsID0gYWxsLmNvbmNhdChnZXRUZXh0Tm9kZXMobm9kZSkpO1xuICB9XG4gIHJldHVybiBhbGw7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUVsZW1lbnQoZWwpIHtcbiAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG59XG5cbmZ1bmN0aW9uIHNldFN0eWxlKGVsZW1lbnQsIHN0eWxlKSB7XG4gIGZvciAodmFyIHMgaW4gc3R5bGUpIHtcbiAgICBlbGVtZW50LnN0eWxlW3NdID0gc3R5bGVbc107XG4gIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbS5qcy5tYXBcbiJdfQ==
