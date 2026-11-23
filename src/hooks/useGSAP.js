import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

/**
 * React 19 safe GSAP hook with automatic gsap.context() lifecycle management.
 * Guarantees proper cleanup in StrictMode and prevents memory leaks or phantom ScrollTriggers.
 *
 * @param {Function} callback - Function receiving (ctx, scope) to build animations
 * @param {Array} dependencies - React dependency array (re-runs context when changed)
 * @param {React.RefObject} [customScope] - Optional existing scope ref; otherwise a new scopeRef is returned
 * @returns {React.RefObject} scopeRef to attach to the root animated DOM container
 */
export function useGSAP(callback, dependencies = [], customScope = null) {
  const internalScopeRef = useRef(null);
  const activeScopeRef = customScope || internalScopeRef;

  useEffect(() => {
    if (typeof callback !== 'function') return;

    let ctx;
    try {
      // GSAP's context constructor invokes the callback synchronously, passing `self` (the context instance).
      // We pass `self` instead of referencing `ctx` directly to avoid Temporal Dead Zone ReferenceError.
      ctx = gsap.context((self) => {
        try {
          callback(self, activeScopeRef.current);
        } catch (animErr) {
          console.warn('[useGSAP] Animation execution warning:', animErr);
        }
      }, activeScopeRef.current || undefined);
    } catch (err) {
      console.warn('[useGSAP] Failed to initialize GSAP context:', err);
    }

    return () => {
      if (ctx && typeof ctx.revert === 'function') {
        ctx.revert();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return activeScopeRef;
}

export default useGSAP;
