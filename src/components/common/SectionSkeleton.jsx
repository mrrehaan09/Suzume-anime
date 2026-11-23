/**
 * SectionSkeleton
 * Lightweight, zero-CLS cinematic loading placeholder for lazy-loaded sections.
 * Maintains section height and renders an ambient glowing pulse.
 */
export function SectionSkeleton({ minHeight = 'min-h-[600px]' }) {
  return (
    <div
      className={`w-full ${minHeight} flex flex-col items-center justify-center py-24 bg-[#101D36]/40 border-t border-[#A7B7C9]/10 relative overflow-hidden`}
      aria-busy="true"
      aria-label="Loading section content..."
    >
      {/* Ambient Shimmer Pulse */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-pulse pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
        <div className="w-10 h-10 rounded-full border-2 border-[#83C9E8]/20 border-t-[#F5B77D] animate-spin" />
        <div className="space-y-1.5">
          <div className="w-40 h-3 rounded-full bg-white/10 mx-auto" />
          <div className="w-64 h-2 rounded-full bg-white/5 mx-auto" />
        </div>
      </div>
    </div>
  );
}

export default SectionSkeleton;
