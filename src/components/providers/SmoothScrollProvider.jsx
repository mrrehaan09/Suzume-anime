import { useEffect, useRef, useCallback, useMemo } from 'react';
import { LenisContext } from '../../hooks/useLenis';
import { ScrollTrigger } from '../../lib/gsap';
import { initSmoothScroll } from '../../lib/lenis';

/**
 * SmoothScrollProvider integrates Lenis with GSAP ScrollTrigger and provides
 * smooth scroll context to the entire Suzume movie web application.
 */
export function SmoothScrollProvider({ children, options = {} }) {
  const lenisRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    const { lenis, destroy } = initSmoothScroll(options);
    lenisRef.current = lenis;
    cleanupRef.current = destroy;

    // Refresh ScrollTrigger after initial mount and layout calculations
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = useCallback((target, scrollOptions = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: 1.2,
        offset: 0,
        ...scrollOptions,
      });
    }
  }, []);

  const contextValue = useMemo(() => ({
    get lenis() {
      return lenisRef.current;
    },
    scrollTo,
  }), [scrollTo]);

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  );
}

export default SmoothScrollProvider;
