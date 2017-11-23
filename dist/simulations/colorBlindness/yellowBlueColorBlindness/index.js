(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yellowBlueColorBlindness = yellowBlueColorBlindness;
function yellowBlueColorBlindness() {

  chrome.tabs.executeScript({ file: 'simulations/colorBlindness/content.js' });

  chrome.tabs.insertCSS({ file: 'simulations/colorBlindness/yellowBlueColorBlindness/css/main.css' });
}


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcY29sb3JCbGluZG5lc3NcXHllbGxvd0JsdWVDb2xvckJsaW5kbmVzc1xcaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsU0FBTztBQURvQyxDQUE3QztBQUdBLFFBQVEsd0JBQVIsR0FBbUMsd0JBQW5DO0FBQ0EsU0FBUyx3QkFBVCxHQUFvQzs7QUFFbEMsU0FBTyxJQUFQLENBQVksYUFBWixDQUEwQixFQUFFLE1BQU0sdUNBQVIsRUFBMUI7O0FBRUEsU0FBTyxJQUFQLENBQVksU0FBWixDQUFzQixFQUFFLE1BQU0sa0VBQVIsRUFBdEI7QUFDRDtBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMueWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzID0geWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzO1xuZnVuY3Rpb24geWVsbG93Qmx1ZUNvbG9yQmxpbmRuZXNzKCkge1xuXG4gIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoeyBmaWxlOiAnc2ltdWxhdGlvbnMvY29sb3JCbGluZG5lc3MvY29udGVudC5qcycgfSk7XG5cbiAgY2hyb21lLnRhYnMuaW5zZXJ0Q1NTKHsgZmlsZTogJ3NpbXVsYXRpb25zL2NvbG9yQmxpbmRuZXNzL3llbGxvd0JsdWVDb2xvckJsaW5kbmVzcy9jc3MvbWFpbi5jc3MnIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iXX0=
