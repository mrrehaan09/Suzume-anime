import { useState, useEffect } from 'react';

/**
 * Hook to inspect responsive media queries and user preferences
 */
export function useMediaQuery() {
  const [deviceState, setDeviceState] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mobileQuery = window.matchMedia('(max-width: 639px)');
    const tabletQuery = window.matchMedia('(min-width: 640px) and (max-width: 1023px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateState = () => {
      setDeviceState({
        isMobile: mobileQuery.matches,
        isTablet: tabletQuery.matches,
        isDesktop: !mobileQuery.matches && !tabletQuery.matches,
        prefersReducedMotion: motionQuery.matches,
      });
    };

    updateState();

    mobileQuery.addEventListener('change', updateState);
    tabletQuery.addEventListener('change', updateState);
    motionQuery.addEventListener('change', updateState);

    return () => {
      mobileQuery.removeEventListener('change', updateState);
      tabletQuery.removeEventListener('change', updateState);
      motionQuery.removeEventListener('change', updateState);
    };
  }, []);

  return deviceState;
}

export default useMediaQuery;
