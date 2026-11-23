import { useEffect } from 'react';
import { ScrollTrigger } from '../lib/gsap';

/**
 * Creates a safe ScrollTrigger configuration with automatic lifecycle cleanup on unmount.
 *
 * @param {Object} triggerOptions - ScrollTrigger options (trigger, start, end, scrub, pin, etc.)
 * @param {Array} dependencies - Effect dependency array
 */
export function useScrollTrigger(triggerOptions, dependencies = []) {
  useEffect(() => {
    if (typeof window === 'undefined' || !triggerOptions?.trigger) return;

    const st = ScrollTrigger.create(triggerOptions);

    return () => {
      st.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

export default useScrollTrigger;
