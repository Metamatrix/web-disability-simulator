(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxiYWNrZ3JvdW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsT0FBTyxJQUFQLENBQVksU0FBWixDQUFzQixXQUF0QixDQUFrQyxVQUFVLEtBQVYsRUFBaUIsVUFBakIsRUFBNkIsR0FBN0IsRUFBa0M7O0FBRWxFLFNBQU8sT0FBUCxDQUFlLEtBQWYsQ0FBcUIsR0FBckIsQ0FBeUIsV0FBekIsRUFBc0MsVUFBVSxHQUFWLEVBQWU7O0FBRW5ELFFBQUksSUFBSSxTQUFKLEtBQWtCLEtBQXRCLEVBQTZCOztBQUUzQjtBQUNBLGFBQU8sYUFBUCxDQUFxQixPQUFyQixDQUE2QjtBQUMzQixjQUFNO0FBRHFCLE9BQTdCOztBQUlBO0FBQ0EsYUFBTyxPQUFQLENBQWUsS0FBZixDQUFxQixNQUFyQixDQUE0QixrQkFBNUI7QUFDRDtBQUNGLEdBWkQ7QUFhRCxDQWZEO0FBZ0JBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKGZ1bmN0aW9uICh0YWJJZCwgY2hhbmdlSW5mbywgdGFiKSB7XG5cbiAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KCdhY3RpdmVUYWInLCBmdW5jdGlvbiAob2JqKSB7XG5cbiAgICBpZiAob2JqLmFjdGl2ZVRhYiA9PT0gdGFiSWQpIHtcblxuICAgICAgLy8gUmVzZXQgdGhlIGljb24gaWYgdGhlIHBhZ2UgcmVsb2Fkc1xuICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7XG4gICAgICAgIHBhdGg6IFwiVUkvaW1nL2ljb24ucG5nXCJcbiAgICAgIH0pO1xuXG4gICAgICAvLyBDbGVhciBzdGF0ZSBvbiByZWxvYWRcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnJlbW92ZSgnYWN0aXZlU2ltdWxhdGlvbicpO1xuICAgIH1cbiAgfSk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhY2tncm91bmQuanMubWFwXG4iXX0=
