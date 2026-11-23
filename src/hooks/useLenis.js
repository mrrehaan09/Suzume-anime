import { createContext, useContext } from 'react';

export const LenisContext = createContext({
  lenis: null,
  scrollTo: () => {},
});

/**
 * Hook to access the Lenis smooth scroll instance
 * @returns {{ lenis: Object|null, scrollTo: Function }}
 */
export function useLenis() {
  const context = useContext(LenisContext);
  return context;
}

export default useLenis;
