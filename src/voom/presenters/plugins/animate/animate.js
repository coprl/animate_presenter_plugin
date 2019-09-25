// This file is built from the src directory
const AFTER_ANIMATION_TIMEOUT = 500; // ms

function isHidden(el) {
  return (el.offsetParent === null);
}

const VALID_ANIMATION_CLASSES = [
  'bounce',
  'flash',
  'pulse',
  'rubberBand',
  'shake',
  'headShake',
  'swing',
  'tada',
  'wobble',
  'jello',
  'bounceIn',
  'bounceInDown',
  'bounceInLeft',
  'bounceInRight',
  'bounceInUp',
  'bounceOut',
  'bounceOutDown',
  'bounceOutLeft',
  'bounceOutRight',
  'bounceOutUp',
  'fadeIn',
  'fadeInDown',
  'fadeInDownBig',
  'fadeInLeft',
  'fadeInLeftBig',
  'fadeInRight',
  'fadeInRightBig',
  'fadeInUp',
  'fadeInUpBig',
  'fadeOut',
  'fadeOutDown',
  'fadeOutDownBig',
  'fadeOutLeft',
  'fadeOutLeftBig',
  'fadeOutRight',
  'fadeOutRightBig',
  'fadeOutUp',
  'fadeOutUpBig',
  'flipInX',
  'flipInY',
  'flipOutX',
  'flipOutY',
  'lightSpeedIn',
  'lightSpeedOut',
  'rotateIn',
  'rotateInDownLeft',
  'rotateInDownRight',
  'rotateInUpLeft',
  'rotateInUpRight',
  'rotateOut',
  'rotateOutDownLeft',
  'rotateOutDownRight',
  'rotateOutUpLeft',
  'rotateOutUpRight',
  'hinge',
  'jackInTheBox',
  'rollIn',
  'rollOut',
  'zoomIn',
  'zoomInDown',
  'zoomInLeft',
  'zoomInRight',
  'zoomInUp',
  'zoomOut',
  'zoomOutDown',
  'zoomOutLeft',
  'zoomOutRight',
  'zoomOutUp',
  'slideInDown',
  'slideInLeft',
  'slideInRight',
  'slideInUp',
  'slideOutDown',
  'slideOutLeft',
  'slideOutRight',
  'slideOutUp',
  'heartBeat',
  'delay-2s',
  'delay-3s',
  'delay-4s',
  'delay-5s',
  'slow',
  'slower',
  'fast',
  'faster'];

function animateCSS(node, animations, wait, resolve, results) {

  node.classList.add('animated', ...animations);

  function handleAnimationEnd() {
    setTimeout(() => {
      node.classList.remove('animated', ...animations);
    }, AFTER_ANIMATION_TIMEOUT);
    node.removeEventListener('animationend', handleAnimationEnd);

    if (wait) {
      results.push({
        action: 'animate',
        content: null,
        statusCode: 200,
      });
      resolve(results);
    }
  }

  node.addEventListener('animationend', handleAnimationEnd);
}

function animate(options, params, _event, results) {

  const node = document.getElementById(options.element_id);
  if (isHidden(node)) {
    return new Promise(function(resolve) {
      console.debug('animation skipped element is not visible');
      results.push({
        action: 'animate',
        statusCode: 404,
      });
      resolve(results);
    });
  }
  if (options.animations.includes('stop')) {
    node.classList.remove('animated', ...VALID_ANIMATION_CLASSES);
    return new Promise(function(resolve) {
          console.debug('animation stopped');
          results.push({
            action: 'animate',
            statusCode: 200,
          });
          resolve(results);
        });
  }
  return new Promise(function(resolve) {
    console.debug('animate called');
    animateCSS(node, options.animations, options.wait, resolve,
        results);

    if (!options.wait) {
      results.push({
        action: 'animate',
        content: null,
        statusCode: 200,
      });
      resolve(results);
    }
  });
}
