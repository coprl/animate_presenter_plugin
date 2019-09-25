"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// This file is built from the src directory
var AFTER_ANIMATION_TIMEOUT = 500; // ms

function isHidden(el) {
  return el.offsetParent === null;
}

var VALID_ANIMATION_CLASSES = ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'headShake', 'swing', 'tada', 'wobble', 'jello', 'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY', 'lightSpeedIn', 'lightSpeedOut', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight', 'hinge', 'jackInTheBox', 'rollIn', 'rollOut', 'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp', 'heartBeat', 'delay-2s', 'delay-3s', 'delay-4s', 'delay-5s', 'slow', 'slower', 'fast', 'faster'];

function animateCSS(node, animations, wait, resolve, results) {
  var _node$classList;

  (_node$classList = node.classList).add.apply(_node$classList, ['animated'].concat(_toConsumableArray(animations)));

  function handleAnimationEnd() {
    setTimeout(function () {
      var _node$classList2;

      (_node$classList2 = node.classList).remove.apply(_node$classList2, ['animated'].concat(_toConsumableArray(animations)));
    }, AFTER_ANIMATION_TIMEOUT);
    node.removeEventListener('animationend', handleAnimationEnd);

    if (wait) {
      results.push({
        action: 'animate',
        content: null,
        statusCode: 200
      });
      resolve(results);
    }
  }

  node.addEventListener('animationend', handleAnimationEnd);
} // This event callback pushes its results into the results array and returns a promise.


function animate(options, params, _event, results) {
  var node = document.getElementById(options.element_id);

  if (isHidden(node)) {
    return new Promise(function (resolve) {
      console.debug('animation skipped element is not visible');
      results.push({
        action: 'animate',
        statusCode: 404
      });
      resolve(results);
    });
  }

  if (options.animations.includes('stop')) {
    var _node$classList3;

    (_node$classList3 = node.classList).remove.apply(_node$classList3, ['animated'].concat(VALID_ANIMATION_CLASSES));

    return new Promise(function (resolve) {
      console.debug('animation stopped');
      results.push({
        action: 'animate',
        statusCode: 200
      });
      resolve(results);
    });
  }

  return new Promise(function (resolve) {
    console.debug('animate called');
    animateCSS(node, options.animations, options.wait, resolve, results);

    if (!options.wait) {
      results.push({
        action: 'animate',
        content: null,
        statusCode: 200
      });
      resolve(results);
    }
  });
}