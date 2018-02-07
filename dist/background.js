(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

  // Reset the icon if the page reloads or on onavigation
  /*  chrome.browserAction.setIcon({
      path : "UI/img/icon.png"
    });
  */
  // Clear state on reload or navigation
  //chrome.storage.local.remove('activeSimulation');

  //skicka ett message härifrån till popupen om att köra startfunktionen? 
  //behöver köra startfunktionen här med rätt simulering. 

});


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxiYWNrZ3JvdW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsT0FBTyxJQUFQLENBQVksU0FBWixDQUFzQixXQUF0QixDQUFrQyxVQUFVLEtBQVYsRUFBaUIsVUFBakIsRUFBNkIsR0FBN0IsRUFBa0M7O0FBRWxFO0FBQ0E7Ozs7QUFJQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUQsQ0FiRDtBQWNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuXG5jaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHRhYklkLCBjaGFuZ2VJbmZvLCB0YWIpIHtcblxuICAvLyBSZXNldCB0aGUgaWNvbiBpZiB0aGUgcGFnZSByZWxvYWRzIG9yIG9uIG9uYXZpZ2F0aW9uXG4gIC8qICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRJY29uKHtcclxuICAgICAgcGF0aCA6IFwiVUkvaW1nL2ljb24ucG5nXCJcclxuICAgIH0pO1xyXG4gICovXG4gIC8vIENsZWFyIHN0YXRlIG9uIHJlbG9hZCBvciBuYXZpZ2F0aW9uXG4gIC8vY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKCdhY3RpdmVTaW11bGF0aW9uJyk7XG5cbiAgLy9za2lja2EgZXR0IG1lc3NhZ2UgaMOkcmlmcsOlbiB0aWxsIHBvcHVwZW4gb20gYXR0IGvDtnJhIHN0YXJ0ZnVua3Rpb25lbj8gXG4gIC8vYmVow7Z2ZXIga8O2cmEgc3RhcnRmdW5rdGlvbmVuIGjDpHIgbWVkIHLDpHR0IHNpbXVsZXJpbmcuIFxuXG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhY2tncm91bmQuanMubWFwXG4iXX0=
