(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendHTML = appendHTML;
exports.setStyle = setStyle;
function appendHTML(el, html) {
  var tmpEl = document.createElement('div');
  tmpEl.innerHTML = html;

  while (tmpEl.firstChild) {
    el.appendChild(tmpEl.firstChild);
  }
}

function setStyle(element, style) {
  for (var s in style) {
    element.style[s] = style[s];
  }
}


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFx1dGlsc1xcZG9tLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxRQUFRLFVBQVIsR0FBcUIsVUFBckI7QUFDQSxRQUFRLFFBQVIsR0FBbUIsUUFBbkI7QUFDQSxTQUFTLFVBQVQsQ0FBb0IsRUFBcEIsRUFBd0IsSUFBeEIsRUFBOEI7QUFDNUIsTUFBSSxRQUFRLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0EsUUFBTSxTQUFOLEdBQWtCLElBQWxCOztBQUVBLFNBQU8sTUFBTSxVQUFiLEVBQXlCO0FBQ3ZCLE9BQUcsV0FBSCxDQUFlLE1BQU0sVUFBckI7QUFDRDtBQUNGOztBQUVELFNBQVMsUUFBVCxDQUFrQixPQUFsQixFQUEyQixLQUEzQixFQUFrQztBQUNoQyxPQUFLLElBQUksQ0FBVCxJQUFjLEtBQWQsRUFBcUI7QUFDbkIsWUFBUSxLQUFSLENBQWMsQ0FBZCxJQUFtQixNQUFNLENBQU4sQ0FBbkI7QUFDRDtBQUNGO0FBQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5hcHBlbmRIVE1MID0gYXBwZW5kSFRNTDtcbmV4cG9ydHMuc2V0U3R5bGUgPSBzZXRTdHlsZTtcbmZ1bmN0aW9uIGFwcGVuZEhUTUwoZWwsIGh0bWwpIHtcbiAgdmFyIHRtcEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRtcEVsLmlubmVySFRNTCA9IGh0bWw7XG5cbiAgd2hpbGUgKHRtcEVsLmZpcnN0Q2hpbGQpIHtcbiAgICBlbC5hcHBlbmRDaGlsZCh0bXBFbC5maXJzdENoaWxkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRTdHlsZShlbGVtZW50LCBzdHlsZSkge1xuICBmb3IgKHZhciBzIGluIHN0eWxlKSB7XG4gICAgZWxlbWVudC5zdHlsZVtzXSA9IHN0eWxlW3NdO1xuICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kb20uanMubWFwXG4iXX0=
