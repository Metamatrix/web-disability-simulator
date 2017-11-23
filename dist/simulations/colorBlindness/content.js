(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _dom = require('../../utils/dom.js');

var url = chrome.extension.getURL('/simulations/colorBlindness/img/filters.svg');

if (document.getElementById('wds-colorBlindnessFilter') == null) {

  fetch(url).then(function (response) {
    return response.text();
  }).then(function (text) {
    (0, _dom.appendHTML)(document.body, text);
  });
}


},{"../../utils/dom.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendHTML = appendHTML;
function appendHTML(el, html) {
  var tmpEl = document.createElement('div');
  tmpEl.innerHTML = html;

  while (tmpEl.firstChild) {
    el.appendChild(tmpEl.firstChild);
  }
}


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcY29sb3JCbGluZG5lc3NcXGNvbnRlbnQuanMiLCJidWlsZFxcanNcXGJhYmVsXFx1dGlsc1xcZG9tLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBWDs7QUFFQSxJQUFJLE1BQU0sT0FBTyxTQUFQLENBQWlCLE1BQWpCLENBQXdCLDZDQUF4QixDQUFWOztBQUVBLElBQUksU0FBUyxjQUFULENBQXdCLDBCQUF4QixLQUF1RCxJQUEzRCxFQUFpRTs7QUFFL0QsUUFBTSxHQUFOLEVBQVcsSUFBWCxDQUFnQixVQUFVLFFBQVYsRUFBb0I7QUFDbEMsV0FBTyxTQUFTLElBQVQsRUFBUDtBQUNELEdBRkQsRUFFRyxJQUZILENBRVEsVUFBVSxJQUFWLEVBQWdCO0FBQ3RCLEtBQUMsR0FBRyxLQUFLLFVBQVQsRUFBcUIsU0FBUyxJQUE5QixFQUFvQyxJQUFwQztBQUNELEdBSkQ7QUFLRDtBQUNEOzs7QUNkQTs7QUFFQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsU0FBTztBQURvQyxDQUE3QztBQUdBLFFBQVEsVUFBUixHQUFxQixVQUFyQjtBQUNBLFNBQVMsVUFBVCxDQUFvQixFQUFwQixFQUF3QixJQUF4QixFQUE4QjtBQUM1QixNQUFJLFFBQVEsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVo7QUFDQSxRQUFNLFNBQU4sR0FBa0IsSUFBbEI7O0FBRUEsU0FBTyxNQUFNLFVBQWIsRUFBeUI7QUFDdkIsT0FBRyxXQUFILENBQWUsTUFBTSxVQUFyQjtBQUNEO0FBQ0Y7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfZG9tID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvZG9tLmpzJyk7XG5cbnZhciB1cmwgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL2ltZy9maWx0ZXJzLnN2ZycpO1xuXG5pZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dkcy1jb2xvckJsaW5kbmVzc0ZpbHRlcicpID09IG51bGwpIHtcblxuICBmZXRjaCh1cmwpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbiAgfSkudGhlbihmdW5jdGlvbiAodGV4dCkge1xuICAgICgwLCBfZG9tLmFwcGVuZEhUTUwpKGRvY3VtZW50LmJvZHksIHRleHQpO1xuICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRlbnQuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmFwcGVuZEhUTUwgPSBhcHBlbmRIVE1MO1xuZnVuY3Rpb24gYXBwZW5kSFRNTChlbCwgaHRtbCkge1xuICB2YXIgdG1wRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdG1wRWwuaW5uZXJIVE1MID0gaHRtbDtcblxuICB3aGlsZSAodG1wRWwuZmlyc3RDaGlsZCkge1xuICAgIGVsLmFwcGVuZENoaWxkKHRtcEVsLmZpcnN0Q2hpbGQpO1xuICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kb20uanMubWFwXG4iXX0=
