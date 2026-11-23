import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

/**
 * Initializes Lenis smooth scrolling and synchronizes it with GSAP ScrollTrigger
 * @param {Object} customOptions - Optional overrides for Lenis
 * @returns {Object} { lenis, destroy }
 */
export function initSmoothScroll(customOptions = {}) {
  if (typeof window === 'undefined') {
    return { lenis: null, destroy: () => {} };
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lenis = new Lenis({
    duration: prefersReducedMotion ? 0 : 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: !prefersReducedMotion,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.5,
    autoRaf: false, // We sync with GSAP's ticker below
    ...customOptions,
  });

  // 1. Sync Lenis scroll position changes with GSAP ScrollTrigger
  const onScroll = () => {
    ScrollTrigger.update();
  };
  lenis.on('scroll', onScroll);

  // 2. Drive Lenis's RAF directly from GSAP's optimized ticker loop
  const onTicker = (time) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(onTicker);

  // 3. Prevent lag smoothing jumps during scroll events
  gsap.ticker.lagSmoothing(0);

  return {
    lenis,
    destroy: () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(onTicker);
      lenis.destroy();
    },
  };
}
