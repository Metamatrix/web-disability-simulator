(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$.get(chrome.extension.getURL('/simulations/general/loading/loadingModal.html'), function (data) {

    $(data).appendTo('body');

    $('#wds-loadingModal').modal('show');

    setTimeout(function () {
        $('#wds-loadingModal').modal('hide');
        chrome.runtime.sendMessage({ type: "modalClosed" });
    }, 1500);
});


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcZ2VuZXJhbFxcbG9hZGluZ1xcY29udGVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLEVBQUUsR0FBRixDQUFNLE9BQU8sU0FBUCxDQUFpQixNQUFqQixDQUF3QixnREFBeEIsQ0FBTixFQUFpRixVQUFVLElBQVYsRUFBZ0I7O0FBRTdGLE1BQUUsSUFBRixFQUFRLFFBQVIsQ0FBaUIsTUFBakI7O0FBRUEsTUFBRSxtQkFBRixFQUF1QixLQUF2QixDQUE2QixNQUE3Qjs7QUFFQSxlQUFXLFlBQVk7QUFDbkIsVUFBRSxtQkFBRixFQUF1QixLQUF2QixDQUE2QixNQUE3QjtBQUNBLGVBQU8sT0FBUCxDQUFlLFdBQWYsQ0FBMkIsRUFBRSxNQUFNLGFBQVIsRUFBM0I7QUFDSCxLQUhELEVBR0csSUFISDtBQUlILENBVkQ7QUFXQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbiQuZ2V0KGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvc2ltdWxhdGlvbnMvZ2VuZXJhbC9sb2FkaW5nL2xvYWRpbmdNb2RhbC5odG1sJyksIGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAkKGRhdGEpLmFwcGVuZFRvKCdib2R5Jyk7XG5cbiAgICAkKCcjd2RzLWxvYWRpbmdNb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnI3dkcy1sb2FkaW5nTW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IHR5cGU6IFwibW9kYWxDbG9zZWRcIiB9KTtcbiAgICB9LCAxNTAwKTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29udGVudC5qcy5tYXBcbiJdfQ==
