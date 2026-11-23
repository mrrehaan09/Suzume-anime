/**
 * CinematicButton
 * Movie-styled interactive action button with hover glow and ambient reflections
 */
export function CinematicButton({
  children,
  variant = 'door', // 'door' | 'gold' | 'sky' | 'tokoyo' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon = null,
  className = '',
  onClick,
  ...props
}) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs tracking-wider',
    md: 'px-6 py-2.5 text-sm tracking-widest',
    lg: 'px-8 py-3.5 text-base tracking-widest',
  };

  const variantClasses = {
    door: 'bg-gradient-to-r from-[#be123c] to-[#e11d48] text-white shadow-lg shadow-rose-950/40 hover:shadow-rose-600/30 hover:scale-[1.02] border border-rose-400/30',
    gold: 'bg-gradient-to-r from-[#d97706] to-[#f59e0b] text-[#05070f] font-semibold shadow-lg shadow-amber-950/40 hover:shadow-amber-500/30 hover:scale-[1.02] border border-amber-300/40',
    sky: 'bg-gradient-to-r from-[#0369a1] to-[#0ea5e9] text-white shadow-lg shadow-sky-950/40 hover:shadow-sky-500/30 hover:scale-[1.02] border border-sky-300/30',
    tokoyo: 'bg-gradient-to-r from-[#312e81] to-[#6366f1] text-white shadow-lg shadow-indigo-950/40 hover:shadow-indigo-500/30 hover:scale-[1.02] border border-indigo-300/30',
    outline: 'bg-transparent text-slate-200 border border-white/20 hover:border-amber-400/60 hover:text-amber-300 hover:bg-white/5',
    ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-white/5',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative inline-flex items-center justify-center gap-2.5 rounded-full font-cinematic uppercase
        transition-all duration-300 ease-out cursor-pointer select-none active:scale-95
        ${sizeClasses[size] || sizeClasses.md}
        ${variantClasses[variant] || variantClasses.door}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

export default CinematicButton;
