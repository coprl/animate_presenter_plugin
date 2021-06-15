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
  'shakeX',
  'shakeY',
  'headShake',
  'swing',
  'tada',
  'wobble',
  'jello',
  'heartBeat',
  'backInDown',
  'backInLeft',
  'backInRight',
  'backInUp',
  'backOutDown',
  'backOutLeft',
  'backOutRight',
  'backOutUp',
  'bounceIn',
  'bounceInDown',
  'bounceInLeft',
  'bounceInRight',
  'bounceInUp',
  'Bouncing exits',
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
  'fadeInTopLeft',
  'fadeInTopRight',
  'fadeInBottomLeft',
  'fadeInBottomRight',
  'fadeOut',
  'fadeOutDown',
  'fadeOutDownBig',
  'fadeOutLeft',
  'fadeOutLeftBig',
  'fadeOutRight',
  'fadeOutRightBig',
  'fadeOutUp',
  'fadeOutUpBig',
  'fadeOutTopLeft',
  'fadeOutTopRight',
  'fadeOutBottomRight',
  'fadeOutBottomLeft',
  'flip',
  'flipInX',
  'flipInY',
  'flipOutX',
  'flipOutY',
  'lightSpeedInRight',
  'lightSpeedInLeft',
  'lightSpeedOutRight',
  'lightSpeedOutLeft',
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
  'delay-2s',
  'delay-3s',
  'delay-4s',
  'delay-5s',
  'slow',
  'slower',
  'fast',
  'faster'];


function animateCSS(node, animations, wait, resolve, results) {
  var fq_animiations = animations.map(animation => `animate__${animation}`)
  node.classList.add('animate__animated', ...fq_animiations);

  function handleAnimationEnd() {
    setTimeout(() => {
      node.classList.remove('animiate__animated', ...fq_animiations);
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
