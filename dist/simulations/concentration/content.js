(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

(function () {
  var circleElement = document.createElement('div');

  circleElement.setAttribute('id', 'wds-concentrationCircle');

  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;
  var velocity = 15;

  document.body.appendChild(circleElement);

  //generate a random number
  function random(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }

  function randomVelocity() {
    return random(velocity - 2, velocity + 2);
  }

  function size() {
    var size = width * 0.1;
    return size;
  }

  var Circle = function () {
    function Circle(x, y, velX, velY, size) {
      _classCallCheck(this, Circle);

      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      this.size = size;

      circleElement.style.left = 0;
      circleElement.style.top = 0;

      circleElement.style.width = size + 'px';
      circleElement.style.height = size + 'px';
    }

    _createClass(Circle, [{
      key: 'move',
      value: function move() {
        circleElement.style.transform = 'translate3d(' + this.x + 'px, ' + this.y + 'px, 0)';
      }
    }, {
      key: 'update',
      value: function update() {
        if (this.x + this.size >= width - 2) {
          this.velX = -randomVelocity();
        }

        if (this.x <= 0) {
          this.velX = randomVelocity();
        }

        if (this.y + this.size >= height - 2) {
          this.velY = -randomVelocity();
        }

        if (this.y <= 0) {
          this.velY = randomVelocity();
        }

        this.x += this.velX;
        this.y += this.velY;
      }
    }]);

    return Circle;
  }();

  var circle = new Circle(random(0, width), random(0, height), velocity, velocity, size());

  //animation loop
  function loop() {

    circle.move();
    circle.update();

    requestAnimationFrame(loop);
  }
  loop();
})();


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZFxcanNcXGJhYmVsXFxzaW11bGF0aW9uc1xcY29uY2VudHJhdGlvblxcY29udGVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBLElBQUksZUFBZSxZQUFZO0FBQUUsV0FBUyxnQkFBVCxDQUEwQixNQUExQixFQUFrQyxLQUFsQyxFQUF5QztBQUFFLFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFNLE1BQTFCLEVBQWtDLEdBQWxDLEVBQXVDO0FBQUUsVUFBSSxhQUFhLE1BQU0sQ0FBTixDQUFqQixDQUEyQixXQUFXLFVBQVgsR0FBd0IsV0FBVyxVQUFYLElBQXlCLEtBQWpELENBQXdELFdBQVcsWUFBWCxHQUEwQixJQUExQixDQUFnQyxJQUFJLFdBQVcsVUFBZixFQUEyQixXQUFXLFFBQVgsR0FBc0IsSUFBdEIsQ0FBNEIsT0FBTyxjQUFQLENBQXNCLE1BQXRCLEVBQThCLFdBQVcsR0FBekMsRUFBOEMsVUFBOUM7QUFBNEQ7QUFBRSxHQUFDLE9BQU8sVUFBVSxXQUFWLEVBQXVCLFVBQXZCLEVBQW1DLFdBQW5DLEVBQWdEO0FBQUUsUUFBSSxVQUFKLEVBQWdCLGlCQUFpQixZQUFZLFNBQTdCLEVBQXdDLFVBQXhDLEVBQXFELElBQUksV0FBSixFQUFpQixpQkFBaUIsV0FBakIsRUFBOEIsV0FBOUIsRUFBNEMsT0FBTyxXQUFQO0FBQXFCLEdBQWhOO0FBQW1OLENBQTloQixFQUFuQjs7QUFFQSxTQUFTLGVBQVQsQ0FBeUIsUUFBekIsRUFBbUMsV0FBbkMsRUFBZ0Q7QUFBRSxNQUFJLEVBQUUsb0JBQW9CLFdBQXRCLENBQUosRUFBd0M7QUFBRSxVQUFNLElBQUksU0FBSixDQUFjLG1DQUFkLENBQU47QUFBMkQ7QUFBRTs7QUFFekosQ0FBQyxZQUFZO0FBQ1gsTUFBSSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXBCOztB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QUFDRCxDQXRGRDtBQXVGQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbihmdW5jdGlvbiAoKSB7XG4gIHZhciBjaXJjbGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgY2lyY2xlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3dkcy1jb25jZW50cmF0aW9uQ2lyY2xlJyk7XG5cbiAgdmFyIHdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICB2YXIgaGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgdmFyIHZlbG9jaXR5ID0gMTU7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjaXJjbGVFbGVtZW50KTtcblxuICAvL2dlbmVyYXRlIGEgcmFuZG9tIG51bWJlclxuICBmdW5jdGlvbiByYW5kb20obWluLCBtYXgpIHtcbiAgICB2YXIgbnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbiAgICByZXR1cm4gbnVtO1xuICB9XG5cbiAgZnVuY3Rpb24gcmFuZG9tVmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIHJhbmRvbSh2ZWxvY2l0eSAtIDIsIHZlbG9jaXR5ICsgMik7XG4gIH1cblxuICBmdW5jdGlvbiBzaXplKCkge1xuICAgIHZhciBzaXplID0gd2lkdGggKiAwLjE7XG4gICAgcmV0dXJuIHNpemU7XG4gIH1cblxuICB2YXIgQ2lyY2xlID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENpcmNsZSh4LCB5LCB2ZWxYLCB2ZWxZLCBzaXplKSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ2lyY2xlKTtcblxuICAgICAgdGhpcy54ID0geDtcbiAgICAgIHRoaXMueSA9IHk7XG4gICAgICB0aGlzLnZlbFggPSB2ZWxYO1xuICAgICAgdGhpcy52ZWxZID0gdmVsWTtcbiAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG5cbiAgICAgIGNpcmNsZUVsZW1lbnQuc3R5bGUubGVmdCA9IDA7XG4gICAgICBjaXJjbGVFbGVtZW50LnN0eWxlLnRvcCA9IDA7XG5cbiAgICAgIGNpcmNsZUVsZW1lbnQuc3R5bGUud2lkdGggPSBzaXplICsgJ3B4JztcbiAgICAgIGNpcmNsZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gc2l6ZSArICdweCc7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKENpcmNsZSwgW3tcbiAgICAgIGtleTogJ21vdmUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIG1vdmUoKSB7XG4gICAgICAgIGNpcmNsZUVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB0aGlzLnggKyAncHgsICcgKyB0aGlzLnkgKyAncHgsIDApJztcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBrZXk6ICd1cGRhdGUnLFxuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMueCArIHRoaXMuc2l6ZSA+PSB3aWR0aCAtIDIpIHtcbiAgICAgICAgICB0aGlzLnZlbFggPSAtcmFuZG9tVmVsb2NpdHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnggPD0gMCkge1xuICAgICAgICAgIHRoaXMudmVsWCA9IHJhbmRvbVZlbG9jaXR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ICsgdGhpcy5zaXplID49IGhlaWdodCAtIDIpIHtcbiAgICAgICAgICB0aGlzLnZlbFkgPSAtcmFuZG9tVmVsb2NpdHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnkgPD0gMCkge1xuICAgICAgICAgIHRoaXMudmVsWSA9IHJhbmRvbVZlbG9jaXR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxYO1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxZO1xuICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBDaXJjbGU7XG4gIH0oKTtcblxuICB2YXIgY2lyY2xlID0gbmV3IENpcmNsZShyYW5kb20oMCwgd2lkdGgpLCByYW5kb20oMCwgaGVpZ2h0KSwgdmVsb2NpdHksIHZlbG9jaXR5LCBzaXplKCkpO1xuXG4gIC8vYW5pbWF0aW9uIGxvb3BcbiAgZnVuY3Rpb24gbG9vcCgpIHtcblxuICAgIGNpcmNsZS5tb3ZlKCk7XG4gICAgY2lyY2xlLnVwZGF0ZSgpO1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICB9XG4gIGxvb3AoKTtcbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb250ZW50LmpzLm1hcFxuIl19
