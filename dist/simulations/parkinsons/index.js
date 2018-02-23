(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = 'parkinsons';

function load(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.executeScript(activeTab.id, { file: 'simulations/parkinsons/content.js' }, function () {
      if (callback) {
        callback(name);
      }
    });
  });
}

function start() {
  load(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id, { action: 'startSimulation', simulation: name });
    });
  });
}

function stop() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { action: 'stopSimulation', simulation: name });
  });
}

exports.start = start;
exports.stop = stop;


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC9zaW11bGF0aW9ucy9wYXJraW5zb25zL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxJQUFJLE9BQU8sWUFBWDs7QUFFQSxTQUFTLElBQVQsQ0FBYyxRQUFkLEVBQXdCO0FBQ3RCLFNBQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsRUFBRSxRQUFRLElBQVYsRUFBZ0IsZUFBZSxJQUEvQixFQUFsQixFQUF5RCxVQUFVLElBQVYsRUFBZ0I7QUFDdkUsUUFBSSxZQUFZLEtBQUssQ0FBTCxDQUFoQjs7QUFFQSxXQUFPLElBQVAsQ0FBWSxhQUFaLENBQTBCLFVBQVUsRUFBcEMsRUFBd0MsRUFBRSxNQUFNLG1DQUFSLEVBQXhDLEVBQXVGLFlBQVk7QUFDakcsVUFBSSxRQUFKLEVBQWM7QUFDWixpQkFBUyxJQUFUO0FBQ0Q7QUFDRixLQUpEO0FBS0QsR0FSRDtBQVNEOztBQUVELFNBQVMsS0FBVCxHQUFpQjtBQUNmLE9BQUssWUFBWTtBQUNmLFdBQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsRUFBRSxRQUFRLElBQVYsRUFBZ0IsZUFBZSxJQUEvQixFQUFsQixFQUF5RCxVQUFVLElBQVYsRUFBZ0I7QUFDdkUsVUFBSSxZQUFZLEtBQUssQ0FBTCxDQUFoQjs7QUFFQSxhQUFPLElBQVAsQ0FBWSxXQUFaLENBQXdCLFVBQVUsRUFBbEMsRUFBc0MsRUFBRSxRQUFRLGlCQUFWLEVBQTZCLFlBQVksSUFBekMsRUFBdEM7QUFDRCxLQUpEO0FBS0QsR0FORDtBQU9EOztBQUVELFNBQVMsSUFBVCxHQUFnQjtBQUNkLFNBQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsRUFBRSxRQUFRLElBQVYsRUFBZ0IsZUFBZSxJQUEvQixFQUFsQixFQUF5RCxVQUFVLElBQVYsRUFBZ0I7QUFDdkUsUUFBSSxZQUFZLEtBQUssQ0FBTCxDQUFoQjs7QUFFQSxXQUFPLElBQVAsQ0FBWSxXQUFaLENBQXdCLFVBQVUsRUFBbEMsRUFBc0MsRUFBRSxRQUFRLGdCQUFWLEVBQTRCLFlBQVksSUFBeEMsRUFBdEM7QUFDRCxHQUpEO0FBS0Q7O0FBRUQsUUFBUSxLQUFSLEdBQWdCLEtBQWhCO0FBQ0EsUUFBUSxJQUFSLEdBQWUsSUFBZjtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgbmFtZSA9ICdwYXJraW5zb25zJztcblxuZnVuY3Rpb24gbG9hZChjYWxsYmFjaykge1xuICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdChhY3RpdmVUYWIuaWQsIHsgZmlsZTogJ3NpbXVsYXRpb25zL3BhcmtpbnNvbnMvY29udGVudC5qcycgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKG5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gIGxvYWQoZnVuY3Rpb24gKCkge1xuICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICB2YXIgYWN0aXZlVGFiID0gdGFic1swXTtcblxuICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0YXJ0U2ltdWxhdGlvbicsIHNpbXVsYXRpb246IG5hbWUgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdG9wKCkge1xuICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7IGFjdGlvbjogJ3N0b3BTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydHMuc3RhcnQgPSBzdGFydDtcbmV4cG9ydHMuc3RvcCA9IHN0b3A7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiJdfQ==
