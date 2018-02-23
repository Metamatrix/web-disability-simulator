(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var loadedSimulations = [];

function load(name, subName, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0],
        scriptFile = subName ? 'simulations/' + name + '/' + subName + '/content.js' : 'simulations/' + name + '/content.js';

    chrome.tabs.executeScript(activeTab.id, { file: scriptFile }, function () {
      loadedSimulations.push(name);
      if (callback) {
        callback(name, subName);
      }
    });
  });
}

function start(name, subName) {
  if (loadedSimulations.includes(name)) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];

      chrome.tabs.sendMessage(activeTab.id, { action: 'startSimulation', simulation: name, subSimulation: subName });
    });
  } else {
    load(name, subName, function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];

        chrome.tabs.sendMessage(activeTab.id, { action: 'startSimulation', simulation: name, subSimulation: subName });
      });
    });
  }
}

function stop(name, subName) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];

    chrome.tabs.sendMessage(activeTab.id, { action: 'stopSimulation', simulation: name, subSimulation: subName });
  });
}

exports.start = start;
exports.stop = stop;


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC91dGlscy9zaW11bGF0aW9uTG9hZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQSxJQUFJLG9CQUFvQixFQUF4Qjs7QUFFQSxTQUFTLElBQVQsQ0FBYyxJQUFkLEVBQW9CLE9BQXBCLEVBQTZCLFFBQTdCLEVBQXVDO0FBQ3JDLFNBQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsRUFBRSxRQUFRLElBQVYsRUFBZ0IsZUFBZSxJQUEvQixFQUFsQixFQUF5RCxVQUFVLElBQVYsRUFBZ0I7QUFDdkUsUUFBSSxZQUFZLEtBQUssQ0FBTCxDQUFoQjtBQUFBLFFBQ0ksYUFBYSxVQUFVLGlCQUFpQixJQUFqQixHQUF3QixHQUF4QixHQUE4QixPQUE5QixHQUF3QyxhQUFsRCxHQUFrRSxpQkFBaUIsSUFBakIsR0FBd0IsYUFEM0c7O0FBR0EsV0FBTyxJQUFQLENBQVksYUFBWixDQUEwQixVQUFVLEVBQXBDLEVBQXdDLEVBQUUsTUFBTSxVQUFSLEVBQXhDLEVBQThELFlBQVk7QUFDeEUsd0JBQWtCLElBQWxCLENBQXVCLElBQXZCO0FBQ0EsVUFBSSxRQUFKLEVBQWM7QUFDWixpQkFBUyxJQUFULEVBQWUsT0FBZjtBQUNEO0FBQ0YsS0FMRDtBQU1ELEdBVkQ7QUFXRDs7QUFFRCxTQUFTLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLE9BQXJCLEVBQThCO0FBQzVCLE1BQUksa0JBQWtCLFFBQWxCLENBQTJCLElBQTNCLENBQUosRUFBc0M7QUFDcEMsV0FBTyxJQUFQLENBQVksS0FBWixDQUFrQixFQUFFLFFBQVEsSUFBVixFQUFnQixlQUFlLElBQS9CLEVBQWxCLEVBQXlELFVBQVUsSUFBVixFQUFnQjtBQUN2RSxVQUFJLFlBQVksS0FBSyxDQUFMLENBQWhCOztBQUVBLGFBQU8sSUFBUCxDQUFZLFdBQVosQ0FBd0IsVUFBVSxFQUFsQyxFQUFzQyxFQUFFLFFBQVEsaUJBQVYsRUFBNkIsWUFBWSxJQUF6QyxFQUErQyxlQUFlLE9BQTlELEVBQXRDO0FBQ0QsS0FKRDtBQUtELEdBTkQsTUFNTztBQUNMLFNBQUssSUFBTCxFQUFXLE9BQVgsRUFBb0IsWUFBWTtBQUM5QixhQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEVBQUUsUUFBUSxJQUFWLEVBQWdCLGVBQWUsSUFBL0IsRUFBbEIsRUFBeUQsVUFBVSxJQUFWLEVBQWdCO0FBQ3ZFLFlBQUksWUFBWSxLQUFLLENBQUwsQ0FBaEI7O0FBRUEsZUFBTyxJQUFQLENBQVksV0FBWixDQUF3QixVQUFVLEVBQWxDLEVBQXNDLEVBQUUsUUFBUSxpQkFBVixFQUE2QixZQUFZLElBQXpDLEVBQStDLGVBQWUsT0FBOUQsRUFBdEM7QUFDRCxPQUpEO0FBS0QsS0FORDtBQU9EO0FBQ0Y7O0FBRUQsU0FBUyxJQUFULENBQWMsSUFBZCxFQUFvQixPQUFwQixFQUE2QjtBQUMzQixTQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEVBQUUsUUFBUSxJQUFWLEVBQWdCLGVBQWUsSUFBL0IsRUFBbEIsRUFBeUQsVUFBVSxJQUFWLEVBQWdCO0FBQ3ZFLFFBQUksWUFBWSxLQUFLLENBQUwsQ0FBaEI7O0FBRUEsV0FBTyxJQUFQLENBQVksV0FBWixDQUF3QixVQUFVLEVBQWxDLEVBQXNDLEVBQUUsUUFBUSxnQkFBVixFQUE0QixZQUFZLElBQXhDLEVBQThDLGVBQWUsT0FBN0QsRUFBdEM7QUFDRCxHQUpEO0FBS0Q7O0FBRUQsUUFBUSxLQUFSLEdBQWdCLEtBQWhCO0FBQ0EsUUFBUSxJQUFSLEdBQWUsSUFBZjtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgbG9hZGVkU2ltdWxhdGlvbnMgPSBbXTtcblxuZnVuY3Rpb24gbG9hZChuYW1lLCBzdWJOYW1lLCBjYWxsYmFjaykge1xuICBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9LCBmdW5jdGlvbiAodGFicykge1xuICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdLFxuICAgICAgICBzY3JpcHRGaWxlID0gc3ViTmFtZSA/ICdzaW11bGF0aW9ucy8nICsgbmFtZSArICcvJyArIHN1Yk5hbWUgKyAnL2NvbnRlbnQuanMnIDogJ3NpbXVsYXRpb25zLycgKyBuYW1lICsgJy9jb250ZW50LmpzJztcblxuICAgIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQoYWN0aXZlVGFiLmlkLCB7IGZpbGU6IHNjcmlwdEZpbGUgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgbG9hZGVkU2ltdWxhdGlvbnMucHVzaChuYW1lKTtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhuYW1lLCBzdWJOYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KG5hbWUsIHN1Yk5hbWUpIHtcbiAgaWYgKGxvYWRlZFNpbXVsYXRpb25zLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RhcnRTaW11bGF0aW9uJywgc2ltdWxhdGlvbjogbmFtZSwgc3ViU2ltdWxhdGlvbjogc3ViTmFtZSB9KTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBsb2FkKG5hbWUsIHN1Yk5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgICAgIHZhciBhY3RpdmVUYWIgPSB0YWJzWzBdO1xuXG4gICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGFjdGl2ZVRhYi5pZCwgeyBhY3Rpb246ICdzdGFydFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lLCBzdWJTaW11bGF0aW9uOiBzdWJOYW1lIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RvcChuYW1lLCBzdWJOYW1lKSB7XG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sIGZ1bmN0aW9uICh0YWJzKSB7XG4gICAgdmFyIGFjdGl2ZVRhYiA9IHRhYnNbMF07XG5cbiAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHsgYWN0aW9uOiAnc3RvcFNpbXVsYXRpb24nLCBzaW11bGF0aW9uOiBuYW1lLCBzdWJTaW11bGF0aW9uOiBzdWJOYW1lIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0cy5zdGFydCA9IHN0YXJ0O1xuZXhwb3J0cy5zdG9wID0gc3RvcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpbXVsYXRpb25Mb2FkZXIuanMubWFwXG4iXX0=
