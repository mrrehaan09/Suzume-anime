import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once in safe browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Set default GSAP configuration for smooth cinematic animations
  gsap.defaults({
    ease: 'power3.out',
    duration: 1.0,
  });

  // Configure ScrollTrigger global settings
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
    limitCallbacks: true,
  });
}

export { gsap, ScrollTrigger };
export default gsap;
