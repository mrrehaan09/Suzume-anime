/**
 * GlassCard
 * Frosted translucent card container tuned to the Suzume aesthetic
 */
export function GlassCard({
  children,
  variant = 'default', // 'default' | 'door' | 'gold' | 'subtle'
  className = '',
  hoverEffect = true,
  ...props
}) {
  const variantStyles = {
    default: 'glass-panel',
    door: 'glass-panel-door',
    gold: 'glass-panel-gold',
    subtle: 'glass-panel-subtle',
  };

  const hoverStyle = hoverEffect
    ? 'transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl'
    : '';

  return (
    <div
      className={`
        p-6 sm:p-8 rounded-2xl
        ${variantStyles[variant] || variantStyles.default}
        ${hoverStyle}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export default GlassCard;
