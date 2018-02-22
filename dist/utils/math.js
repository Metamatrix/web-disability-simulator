(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC91dGlscy9tYXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxRQUFRLE1BQVIsR0FBaUIsTUFBakI7QUFDQSxRQUFRLFdBQVIsR0FBc0IsV0FBdEI7QUFDQSxRQUFRLE9BQVIsR0FBa0IsT0FBbEI7QUFDQSxTQUFTLE1BQVQsQ0FBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEI7QUFDeEIsU0FBTyxLQUFLLEtBQUwsQ0FBVyxNQUFNLEtBQUssTUFBTCxNQUFpQixNQUFNLEdBQU4sR0FBWSxDQUE3QixDQUFqQixDQUFQO0FBQ0Q7O0FBRUQsU0FBUyxXQUFULENBQXFCLENBQXJCLEVBQXdCLENBQXhCLEVBQTJCLElBQTNCLEVBQWlDO0FBQy9CLFNBQU8sUUFBUSxDQUFSLEVBQVcsS0FBSyxDQUFoQixFQUFtQixLQUFLLENBQUwsR0FBUyxLQUFLLEtBQWpDLEtBQTJDLFFBQVEsQ0FBUixFQUFXLEtBQUssQ0FBaEIsRUFBbUIsS0FBSyxDQUFMLEdBQVMsS0FBSyxNQUFqQyxDQUFsRDtBQUNEOztBQUVELFNBQVMsT0FBVCxDQUFpQixLQUFqQixFQUF3QixHQUF4QixFQUE2QixHQUE3QixFQUFrQztBQUNoQyxTQUFPLFNBQVMsS0FBSyxHQUFMLENBQVMsR0FBVCxFQUFjLEdBQWQsQ0FBVCxJQUErQixTQUFTLEtBQUssR0FBTCxDQUFTLEdBQVQsRUFBYyxHQUFkLENBQS9DO0FBQ0Q7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJhbmRvbSA9IHJhbmRvbTtcbmV4cG9ydHMucG9pbnRJblJlY3QgPSBwb2ludEluUmVjdDtcbmV4cG9ydHMuaW5SYW5nZSA9IGluUmFuZ2U7XG5mdW5jdGlvbiByYW5kb20obWluLCBtYXgpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IobWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XG59XG5cbmZ1bmN0aW9uIHBvaW50SW5SZWN0KHgsIHksIHJlY3QpIHtcbiAgcmV0dXJuIGluUmFuZ2UoeCwgcmVjdC54LCByZWN0LnggKyByZWN0LndpZHRoKSAmJiBpblJhbmdlKHksIHJlY3QueSwgcmVjdC55ICsgcmVjdC5oZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBpblJhbmdlKHZhbHVlLCBtaW4sIG1heCkge1xuICByZXR1cm4gdmFsdWUgPj0gTWF0aC5taW4obWluLCBtYXgpICYmIHZhbHVlIDw9IE1hdGgubWF4KG1pbiwgbWF4KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hdGguanMubWFwXG4iXX0=
