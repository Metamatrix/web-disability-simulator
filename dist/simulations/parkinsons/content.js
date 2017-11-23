(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  var cursor = document.createElement('div');

  cursor.setAttribute('id', 'wds-parkinsonsCursor');

  document.body.appendChild(cursor);

  var appVersion = navigator.appVersion;
  var cursorImgUrl = "";

  if (appVersion.includes("Windows")) {
    cursorImgUrl = chrome.extension.getURL('/simulations/parkinsons/img/cursor_windows.svg');
  } else if (appVersion.includes("Mac")) {
    cursorImgUrl = chrome.extension.getURL('/simulations/parkinsons/img/cursor_mac.svg');
  }

  cursor.style.background = 'url(' + cursorImgUrl + ')';

  $(document).mousemove(function (e) {
    $("#wds-parkinsonsCursor").css({ left: e.pageX, top: e.pageY });
  });

  //Skakeffekt för muspekaren


  //Om användaren klickar på något på sidan så ska det kontrolleras om bilden är på elementet, inte muspekaren. Lite osäkert hur det ska lösas.
})();


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xccGFya2luc29uc1xcY29udGVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLENBQUMsWUFBWTtBQUNYLE1BQUksU0FBUyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjs7QUFFQSxTQUFPLFlBQVAsQ0FBb0IsSUFBcEIsRUFBMEIsc0JBQTFCOztBQUVBLFdBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsTUFBMUI7O0FBRUEsTUFBSSxhQUFhLFVBQVUsVUFBM0I7QUFDQSxNQUFJLGVBQWUsRUFBbkI7O0FBRUEsTUFBSSxXQUFXLFFBQVgsQ0FBb0IsU0FBcEIsQ0FBSixFQUFvQztBQUNsQyxtQkFBZSxPQUFPLFNBQVAsQ0FBaUIsTUFBakIsQ0FBd0IsZ0RBQXhCLENBQWY7QUFDRCxHQUZELE1BRU8sSUFBSSxXQUFXLFFBQVgsQ0FBb0IsS0FBcEIsQ0FBSixFQUFnQztBQUNyQyxtQkFBZSxPQUFPLFNBQVAsQ0FBaUIsTUFBakIsQ0FBd0IsNENBQXhCLENBQWY7QUFDRDs7QUFFRCxTQUFPLEtBQVAsQ0FBYSxVQUFiLEdBQTBCLFNBQVMsWUFBVCxHQUF3QixHQUFsRDs7QUFFQSxJQUFFLFFBQUYsRUFBWSxTQUFaLENBQXNCLFVBQVUsQ0FBVixFQUFhO0FBQ2pDLE1BQUUsdUJBQUYsRUFBMkIsR0FBM0IsQ0FBK0IsRUFBRSxNQUFNLEVBQUUsS0FBVixFQUFpQixLQUFLLEVBQUUsS0FBeEIsRUFBL0I7QUFDRCxHQUZEOztBQUlBOzs7QUFHQTtBQUNELENBMUJEO0FBMkJBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGN1cnNvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIGN1cnNvci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dkcy1wYXJraW5zb25zQ3Vyc29yJyk7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjdXJzb3IpO1xuXG4gIHZhciBhcHBWZXJzaW9uID0gbmF2aWdhdG9yLmFwcFZlcnNpb247XG4gIHZhciBjdXJzb3JJbWdVcmwgPSBcIlwiO1xuXG4gIGlmIChhcHBWZXJzaW9uLmluY2x1ZGVzKFwiV2luZG93c1wiKSkge1xuICAgIGN1cnNvckltZ1VybCA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvc2ltdWxhdGlvbnMvcGFya2luc29ucy9pbWcvY3Vyc29yX3dpbmRvd3Muc3ZnJyk7XG4gIH0gZWxzZSBpZiAoYXBwVmVyc2lvbi5pbmNsdWRlcyhcIk1hY1wiKSkge1xuICAgIGN1cnNvckltZ1VybCA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvc2ltdWxhdGlvbnMvcGFya2luc29ucy9pbWcvY3Vyc29yX21hYy5zdmcnKTtcbiAgfVxuXG4gIGN1cnNvci5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCgnICsgY3Vyc29ySW1nVXJsICsgJyknO1xuXG4gICQoZG9jdW1lbnQpLm1vdXNlbW92ZShmdW5jdGlvbiAoZSkge1xuICAgICQoXCIjd2RzLXBhcmtpbnNvbnNDdXJzb3JcIikuY3NzKHsgbGVmdDogZS5wYWdlWCwgdG9wOiBlLnBhZ2VZIH0pO1xuICB9KTtcblxuICAvL1NrYWtlZmZla3QgZsO2ciBtdXNwZWthcmVuXG5cblxuICAvL09tIGFudsOkbmRhcmVuIGtsaWNrYXIgcMOlIG7DpWdvdCBww6Ugc2lkYW4gc8OlIHNrYSBkZXQga29udHJvbGxlcmFzIG9tIGJpbGRlbiDDpHIgcMOlIGVsZW1lbnRldCwgaW50ZSBtdXNwZWthcmVuLiBMaXRlIG9zw6RrZXJ0IGh1ciBkZXQgc2thIGzDtnNhcy5cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb250ZW50LmpzLm1hcFxuIl19
