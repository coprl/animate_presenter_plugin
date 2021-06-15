"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// This file is built from the src directory
var AFTER_ANIMATION_TIMEOUT = 500; // ms

function isHidden(el) {
  return el.offsetParent === null;
}

var VALID_ANIMATION_CLASSES = ['bounce', 'flash', 'pulse', 'rubberBand', 'shakeX', 'shakeY', 'headShake', 'swing', 'tada', 'wobble', 'jello', 'heartBeat', 'backInDown', 'backInLeft', 'backInRight', 'backInUp', 'backOutDown', 'backOutLeft', 'backOutRight', 'backOutUp', 'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'Bouncing exits', 'bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeInTopLeft', 'fadeInTopRight', 'fadeInBottomLeft', 'fadeInBottomRight', 'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'fadeOutTopLeft', 'fadeOutTopRight', 'fadeOutBottomRight', 'fadeOutBottomLeft', 'flip', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY', 'lightSpeedInRight', 'lightSpeedInLeft', 'lightSpeedOutRight', 'lightSpeedOutLeft', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight', 'hinge', 'jackInTheBox', 'rollIn', 'rollOut', 'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp', 'delay-2s', 'delay-3s', 'delay-4s', 'delay-5s', 'slow', 'slower', 'fast', 'faster'];

function animateCSS(node, animations, wait, resolve, results) {
  var _node$classList;

  var fq_animiations = animations.map(function (animation) {
    return "animate__".concat(animation);
  });

  (_node$classList = node.classList).add.apply(_node$classList, ['animate__animated'].concat(_toConsumableArray(fq_animiations)));

  function handleAnimationEnd() {
    setTimeout(function () {
      var _node$classList2;

      (_node$classList2 = node.classList).remove.apply(_node$classList2, ['animiate__animated'].concat(_toConsumableArray(fq_animiations)));
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
}

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