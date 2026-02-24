import { gsap } from 'gsap';

export const useGsapAnimations = () => {
  /**
   * Animate elements with stagger effect on Y axis
   * @param {string} selector - CSS selector for target elements
   * @param {number} yStart - Starting Y position
   * @param {number} yEnd - Ending Y position
   * @param {object} options - Animation options (duration, delay, stagger)
   */
  const animateStaggerY = (selector, yStart, yEnd, options = {}) => {
    const { duration = 0.5, delay = 0, stagger = 0.1 } = options;
    return gsap.from(selector, {
      y: yStart,
      stagger,
      duration,
      delay,
      ease: 'power2.out'
    });
  };

  /**
   * Animate from initial values to final values
   * @param {string} selector - CSS selector
   * @param {object} fromVars - Initial animation values
   * @param {object} toVars - Final animation values
   */
  const animateFromTo = (selector, fromVars, toVars) => {
    return gsap.fromTo(selector, fromVars, toVars);
  };

  /**
   * Animate continuous horizontal scroll (marquee effect)
   * @param {string} selector - CSS selector
   * @param {string} distance - Distance to move
   * @param {number} duration - Animation duration in seconds
   */
  const animateMarquee = (selector, distance = '+=1800', duration = 100) => {
    return gsap.to(selector, {
      x: distance,
      duration,
      ease: 'none',
      repeat: -1
    });
  };

  /**
   * Animate continuous rotation
   * @param {string} selector - CSS selector
   * @param {number} duration - Animation duration in seconds
   */
  const animateRotation = (selector, duration = 5) => {
    return gsap.to(selector, {
      rotation: 360,
      duration,
      ease: 'linear',
      repeat: -1
    });
  };

  /**
   * Animate yoyo effect (up and down)
   * @param {string} selector - CSS selector
   * @param {number} distance - Distance in pixels
   */
  const animateYoyo = (selector, distance = 10) => {
    return gsap.to(selector, {
      y: distance,
      duration: 0.8,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });
  };

  return {
    animateStaggerY,
    animateFromTo,
    animateMarquee,
    animateRotation,
    animateYoyo
  };
};
