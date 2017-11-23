(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redGreenColorBlindness = redGreenColorBlindness;
function redGreenColorBlindness() {

  chrome.tabs.executeScript({ file: 'simulations/colorBlindness/content.js' });

  chrome.tabs.insertCSS({ file: 'simulations/colorBlindness/redGreenColorBlindness/css/main.css' });
}


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcY29sb3JCbGluZG5lc3NcXHJlZEdyZWVuQ29sb3JCbGluZG5lc3NcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxRQUFRLHNCQUFSLEdBQWlDLHNCQUFqQztBQUNBLFNBQVMsc0JBQVQsR0FBa0M7O0FBRWhDLFNBQU8sSUFBUCxDQUFZLGFBQVosQ0FBMEIsRUFBRSxNQUFNLHVDQUFSLEVBQTFCOztBQUVBLFNBQU8sSUFBUCxDQUFZLFNBQVosQ0FBc0IsRUFBRSxNQUFNLGdFQUFSLEVBQXRCO0FBQ0Q7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJlZEdyZWVuQ29sb3JCbGluZG5lc3MgPSByZWRHcmVlbkNvbG9yQmxpbmRuZXNzO1xuZnVuY3Rpb24gcmVkR3JlZW5Db2xvckJsaW5kbmVzcygpIHtcblxuICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHsgZmlsZTogJ3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL2NvbnRlbnQuanMnIH0pO1xuXG4gIGNocm9tZS50YWJzLmluc2VydENTUyh7IGZpbGU6ICdzaW11bGF0aW9ucy9jb2xvckJsaW5kbmVzcy9yZWRHcmVlbkNvbG9yQmxpbmRuZXNzL2Nzcy9tYWluLmNzcycgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcbiJdfQ==
