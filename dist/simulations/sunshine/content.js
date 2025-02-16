(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _dom = require('../../utils/dom.js');

var name = 'sunshine';

var css = null;

function start() {

  var cssUrl = chrome.runtime.getURL('/simulations/' + name + '/css/main.css');

  css = (0, _dom.addCss)(cssUrl);
}

function stop() {
  if (css) {
    (0, _dom.removeElement)(css);
  }
}

chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === 'startSimulation' && request.simulation === name) {
    start(request.simulation);
  } else if (request.action === 'stopSimulation' && request.simulation === name) {
    stop();
  }
});


},{"../../utils/dom.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCss = addCss;
exports.addScript = addScript;
exports.addStyle = addStyle;
exports.appendHTML = appendHTML;
exports.getTextNodes = getTextNodes;
exports.removeElement = removeElement;
exports.setStyle = setStyle;
function addCss(href, callback) {
  var l = document.createElement('link');
  l.setAttribute('href', href);
  l.setAttribute('rel', 'stylesheet');
  l.onload = callback;
  document.getElementsByTagName('head')[0].appendChild(l);
  return l;
}

function addScript(src, callback) {
  var s = document.createElement('script');
  s.setAttribute('src', src);
  s.onload = callback;
  document.getElementsByTagName('head')[0].appendChild(s);
  return s;
}

function addStyle(str) {
  var s = document.createElement('style');
  s.innerText = str;
  document.getElementsByTagName('head')[0].appendChild(s);
  return s;
}

function appendHTML(el, html) {
  var tmpEl = document.createElement('div');
  tmpEl.innerHTML = html;

  while (tmpEl.firstChild) {
    el.appendChild(tmpEl.firstChild);
  }
}

function getTextNodes(node) {
  var all = [];
  for (node = node.firstChild; node; node = node.nextSibling) {
    if (node.nodeType == 3) all.push(node);else all = all.concat(getTextNodes(node));
  }
  return all;
}

function removeElement(el) {
  el.parentNode.removeChild(el);
}

function setStyle(element, style) {
  for (var s in style) {
    element.style[s] = style[s];
  }
}


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcc3Vuc2hpbmVcXGNvbnRlbnQuanMiLCJidWlsZFxcanNcXGJhYmVsXFx1dGlsc1xcZG9tLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsSUFBSSxPQUFPLFFBQVEsb0JBQVIsQ0FBWDs7QUFFQSxJQUFJLE9BQU8sVUFBWDs7QUFFQSxJQUFJLE1BQU0sSUFBVjs7QUFFQSxTQUFTLEtBQVQsR0FBaUI7O0FBRWYsTUFBSSxTQUFTLE9BQU8sU0FBUCxDQUFpQixNQUFqQixDQUF3QixrQkFBa0IsSUFBbEIsR0FBeUIsZUFBakQsQ0FBYjs7QUFFQSxRQUFNLENBQUMsR0FBRyxLQUFLLE1BQVQsRUFBaUIsTUFBakIsQ0FBTjtBQUNEOztBQUVELFNBQVMsSUFBVCxHQUFnQjtBQUNkLE1BQUksR0FBSixFQUFTO0FBQ1AsS0FBQyxHQUFHLEtBQUssYUFBVCxFQUF3QixHQUF4QjtBQUNEO0FBQ0Y7O0FBRUQsT0FBTyxPQUFQLENBQWUsU0FBZixDQUF5QixXQUF6QixDQUFxQyxVQUFVLE9BQVYsRUFBbUI7QUFDdEQsTUFBSSxRQUFRLE1BQVIsS0FBbUIsaUJBQW5CLElBQXdDLFFBQVEsVUFBUixLQUF1QixJQUFuRSxFQUF5RTtBQUN2RSxVQUFNLFFBQVEsVUFBZDtBQUNELEdBRkQsTUFFTyxJQUFJLFFBQVEsTUFBUixLQUFtQixnQkFBbkIsSUFBdUMsUUFBUSxVQUFSLEtBQXVCLElBQWxFLEVBQXdFO0FBQzdFO0FBQ0Q7QUFDRixDQU5EO0FBT0E7OztBQzVCQTs7QUFFQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsU0FBTztBQURvQyxDQUE3QztBQUdBLFFBQVEsTUFBUixHQUFpQixNQUFqQjtBQUNBLFFBQVEsU0FBUixHQUFvQixTQUFwQjtBQUNBLFFBQVEsUUFBUixHQUFtQixRQUFuQjtBQUNBLFFBQVEsVUFBUixHQUFxQixVQUFyQjtBQUNBLFFBQVEsWUFBUixHQUF1QixZQUF2QjtBQUNBLFFBQVEsYUFBUixHQUF3QixhQUF4QjtBQUNBLFFBQVEsUUFBUixHQUFtQixRQUFuQjtBQUNBLFNBQVMsTUFBVCxDQUFnQixJQUFoQixFQUFzQixRQUF0QixFQUFnQztBQUM5QixNQUFJLElBQUksU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVI7QUFDQSxJQUFFLFlBQUYsQ0FBZSxNQUFmLEVBQXVCLElBQXZCO0FBQ0EsSUFBRSxZQUFGLENBQWUsS0FBZixFQUFzQixZQUF0QjtBQUNBLElBQUUsTUFBRixHQUFXLFFBQVg7QUFDQSxXQUFTLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLEVBQXlDLFdBQXpDLENBQXFELENBQXJEO0FBQ0EsU0FBTyxDQUFQO0FBQ0Q7O0FBRUQsU0FBUyxTQUFULENBQW1CLEdBQW5CLEVBQXdCLFFBQXhCLEVBQWtDO0FBQ2hDLE1BQUksSUFBSSxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBUjtBQUNBLElBQUUsWUFBRixDQUFlLEtBQWYsRUFBc0IsR0FBdEI7QUFDQSxJQUFFLE1BQUYsR0FBVyxRQUFYO0FBQ0EsV0FBUyxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxFQUF5QyxXQUF6QyxDQUFxRCxDQUFyRDtBQUNBLFNBQU8sQ0FBUDtBQUNEOztBQUVELFNBQVMsUUFBVCxDQUFrQixHQUFsQixFQUF1QjtBQUNyQixNQUFJLElBQUksU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQVI7QUFDQSxJQUFFLFNBQUYsR0FBYyxHQUFkO0FBQ0EsV0FBUyxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxFQUF5QyxXQUF6QyxDQUFxRCxDQUFyRDtBQUNBLFNBQU8sQ0FBUDtBQUNEOztBQUVELFNBQVMsVUFBVCxDQUFvQixFQUFwQixFQUF3QixJQUF4QixFQUE4QjtBQUM1QixNQUFJLFFBQVEsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVo7QUFDQSxRQUFNLFNBQU4sR0FBa0IsSUFBbEI7O0FBRUEsU0FBTyxNQUFNLFVBQWIsRUFBeUI7QUFDdkIsT0FBRyxXQUFILENBQWUsTUFBTSxVQUFyQjtBQUNEO0FBQ0Y7O0FBRUQsU0FBUyxZQUFULENBQXNCLElBQXRCLEVBQTRCO0FBQzFCLE1BQUksTUFBTSxFQUFWO0FBQ0EsT0FBSyxPQUFPLEtBQUssVUFBakIsRUFBNkIsSUFBN0IsRUFBbUMsT0FBTyxLQUFLLFdBQS9DLEVBQTREO0FBQzFELFFBQUksS0FBSyxRQUFMLElBQWlCLENBQXJCLEVBQXdCLElBQUksSUFBSixDQUFTLElBQVQsRUFBeEIsS0FBNEMsTUFBTSxJQUFJLE1BQUosQ0FBVyxhQUFhLElBQWIsQ0FBWCxDQUFOO0FBQzdDO0FBQ0QsU0FBTyxHQUFQO0FBQ0Q7O0FBRUQsU0FBUyxhQUFULENBQXVCLEVBQXZCLEVBQTJCO0FBQ3pCLEtBQUcsVUFBSCxDQUFjLFdBQWQsQ0FBMEIsRUFBMUI7QUFDRDs7QUFFRCxTQUFTLFFBQVQsQ0FBa0IsT0FBbEIsRUFBMkIsS0FBM0IsRUFBa0M7QUFDaEMsT0FBSyxJQUFJLENBQVQsSUFBYyxLQUFkLEVBQXFCO0FBQ25CLFlBQVEsS0FBUixDQUFjLENBQWQsSUFBbUIsTUFBTSxDQUFOLENBQW5CO0FBQ0Q7QUFDRjtBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9kb20gPSByZXF1aXJlKCcuLi8uLi91dGlscy9kb20uanMnKTtcblxudmFyIG5hbWUgPSAnc3Vuc2hpbmUnO1xuXG52YXIgY3NzID0gbnVsbDtcblxuZnVuY3Rpb24gc3RhcnQoKSB7XG5cbiAgdmFyIGNzc1VybCA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvc2ltdWxhdGlvbnMvJyArIG5hbWUgKyAnL2Nzcy9tYWluLmNzcycpO1xuXG4gIGNzcyA9ICgwLCBfZG9tLmFkZENzcykoY3NzVXJsKTtcbn1cblxuZnVuY3Rpb24gc3RvcCgpIHtcbiAgaWYgKGNzcykge1xuICAgICgwLCBfZG9tLnJlbW92ZUVsZW1lbnQpKGNzcyk7XG4gIH1cbn1cblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gJ3N0YXJ0U2ltdWxhdGlvbicgJiYgcmVxdWVzdC5zaW11bGF0aW9uID09PSBuYW1lKSB7XG4gICAgc3RhcnQocmVxdWVzdC5zaW11bGF0aW9uKTtcbiAgfSBlbHNlIGlmIChyZXF1ZXN0LmFjdGlvbiA9PT0gJ3N0b3BTaW11bGF0aW9uJyAmJiByZXF1ZXN0LnNpbXVsYXRpb24gPT09IG5hbWUpIHtcbiAgICBzdG9wKCk7XG4gIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29udGVudC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuYWRkQ3NzID0gYWRkQ3NzO1xuZXhwb3J0cy5hZGRTY3JpcHQgPSBhZGRTY3JpcHQ7XG5leHBvcnRzLmFkZFN0eWxlID0gYWRkU3R5bGU7XG5leHBvcnRzLmFwcGVuZEhUTUwgPSBhcHBlbmRIVE1MO1xuZXhwb3J0cy5nZXRUZXh0Tm9kZXMgPSBnZXRUZXh0Tm9kZXM7XG5leHBvcnRzLnJlbW92ZUVsZW1lbnQgPSByZW1vdmVFbGVtZW50O1xuZXhwb3J0cy5zZXRTdHlsZSA9IHNldFN0eWxlO1xuZnVuY3Rpb24gYWRkQ3NzKGhyZWYsIGNhbGxiYWNrKSB7XG4gIHZhciBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICBsLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICBsLnNldEF0dHJpYnV0ZSgncmVsJywgJ3N0eWxlc2hlZXQnKTtcbiAgbC5vbmxvYWQgPSBjYWxsYmFjaztcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChsKTtcbiAgcmV0dXJuIGw7XG59XG5cbmZ1bmN0aW9uIGFkZFNjcmlwdChzcmMsIGNhbGxiYWNrKSB7XG4gIHZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gIHMuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMpO1xuICBzLm9ubG9hZCA9IGNhbGxiYWNrO1xuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHMpO1xuICByZXR1cm4gcztcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUoc3RyKSB7XG4gIHZhciBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgcy5pbm5lclRleHQgPSBzdHI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQocyk7XG4gIHJldHVybiBzO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRIVE1MKGVsLCBodG1sKSB7XG4gIHZhciB0bXBFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0bXBFbC5pbm5lckhUTUwgPSBodG1sO1xuXG4gIHdoaWxlICh0bXBFbC5maXJzdENoaWxkKSB7XG4gICAgZWwuYXBwZW5kQ2hpbGQodG1wRWwuZmlyc3RDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VGV4dE5vZGVzKG5vZGUpIHtcbiAgdmFyIGFsbCA9IFtdO1xuICBmb3IgKG5vZGUgPSBub2RlLmZpcnN0Q2hpbGQ7IG5vZGU7IG5vZGUgPSBub2RlLm5leHRTaWJsaW5nKSB7XG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT0gMykgYWxsLnB1c2gobm9kZSk7ZWxzZSBhbGwgPSBhbGwuY29uY2F0KGdldFRleHROb2Rlcyhub2RlKSk7XG4gIH1cbiAgcmV0dXJuIGFsbDtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRWxlbWVudChlbCkge1xuICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbn1cblxuZnVuY3Rpb24gc2V0U3R5bGUoZWxlbWVudCwgc3R5bGUpIHtcbiAgZm9yICh2YXIgcyBpbiBzdHlsZSkge1xuICAgIGVsZW1lbnQuc3R5bGVbc10gPSBzdHlsZVtzXTtcbiAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG9tLmpzLm1hcFxuIl19
