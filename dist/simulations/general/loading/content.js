(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9iYWJlbC9zaW11bGF0aW9ucy9nZW5lcmFsL2xvYWRpbmcvY29udGVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLEVBQUUsR0FBRixDQUFNLE9BQU8sU0FBUCxDQUFpQixNQUFqQixDQUF3QixnREFBeEIsQ0FBTixFQUFpRixVQUFVLElBQVYsRUFBZ0I7O0FBRTdGLE1BQUUsSUFBRixFQUFRLFFBQVIsQ0FBaUIsTUFBakI7O0FBRUEsTUFBRSxtQkFBRixFQUF1QixLQUF2QixDQUE2QixNQUE3Qjs7QUFFQSxlQUFXLFlBQVk7QUFDbkIsVUFBRSxtQkFBRixFQUF1QixLQUF2QixDQUE2QixNQUE3QjtBQUNBLGVBQU8sT0FBUCxDQUFlLFdBQWYsQ0FBMkIsRUFBRSxNQUFNLGFBQVIsRUFBM0I7QUFDSCxLQUhELEVBR0csSUFISDtBQUlILENBVkQ7QUFXQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiJ3VzZSBzdHJpY3QnO1xuXG4kLmdldChjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL3NpbXVsYXRpb25zL2dlbmVyYWwvbG9hZGluZy9sb2FkaW5nTW9kYWwuaHRtbCcpLCBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgJChkYXRhKS5hcHBlbmRUbygnYm9keScpO1xuXG4gICAgJCgnI3dkcy1sb2FkaW5nTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJyN3ZHMtbG9hZGluZ01vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyB0eXBlOiBcIm1vZGFsQ2xvc2VkXCIgfSk7XG4gICAgfSwgMTUwMCk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRlbnQuanMubWFwXG4iXX0=
