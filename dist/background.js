(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

  chrome.storage.local.get('activeTab', function (obj) {

    if (obj.activeTab === tabId) {

      // Reset the icon if the page reloads
      chrome.browserAction.setIcon({
        path: "UI/img/icon.png"
      });

      // Clear state on reload
      chrome.storage.local.remove('activeSimulation');
    }
  });
});


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC9iYWNrZ3JvdW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsT0FBTyxJQUFQLENBQVksU0FBWixDQUFzQixXQUF0QixDQUFrQyxVQUFVLEtBQVYsRUFBaUIsVUFBakIsRUFBNkIsR0FBN0IsRUFBa0M7O0FBRWxFLFNBQU8sT0FBUCxDQUFlLEtBQWYsQ0FBcUIsR0FBckIsQ0FBeUIsV0FBekIsRUFBc0MsVUFBVSxHQUFWLEVBQWU7O0FBRW5ELFFBQUksSUFBSSxTQUFKLEtBQWtCLEtBQXRCLEVBQTZCOztBQUUzQjtBQUNBLGFBQU8sYUFBUCxDQUFxQixPQUFyQixDQUE2QjtBQUMzQixjQUFNO0FBRHFCLE9BQTdCOztBQUlBO0FBQ0EsYUFBTyxPQUFQLENBQWUsS0FBZixDQUFxQixNQUFyQixDQUE0QixrQkFBNUI7QUFDRDtBQUNGLEdBWkQ7QUFhRCxDQWZEO0FBZ0JBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCIndXNlIHN0cmljdCc7XG5cbmNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcihmdW5jdGlvbiAodGFiSWQsIGNoYW5nZUluZm8sIHRhYikge1xuXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgnYWN0aXZlVGFiJywgZnVuY3Rpb24gKG9iaikge1xuXG4gICAgaWYgKG9iai5hY3RpdmVUYWIgPT09IHRhYklkKSB7XG5cbiAgICAgIC8vIFJlc2V0IHRoZSBpY29uIGlmIHRoZSBwYWdlIHJlbG9hZHNcbiAgICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEljb24oe1xuICAgICAgICBwYXRoOiBcIlVJL2ltZy9pY29uLnBuZ1wiXG4gICAgICB9KTtcblxuICAgICAgLy8gQ2xlYXIgc3RhdGUgb24gcmVsb2FkXG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5yZW1vdmUoJ2FjdGl2ZVNpbXVsYXRpb24nKTtcbiAgICB9XG4gIH0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1iYWNrZ3JvdW5kLmpzLm1hcFxuIl19
