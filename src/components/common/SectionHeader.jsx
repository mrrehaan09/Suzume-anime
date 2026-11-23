/**
 * SectionHeader
 * Reusable cinematic section header featuring chapter index, Japanese kanji tag, and subtitle
 * Perfectly balanced spacing with no excessive dead zones
 */
export function SectionHeader({
  chapter = '',
  japaneseTag = '',
  title = '',
  subtitle = '',
  align = 'center', // 'center' | 'left'
  className = '',
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-8 sm:mb-10 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'text-left'} ${className}`}>
      {/* Chapter index & Japanese Kanji accent */}
      <div className={`flex items-center gap-2.5 mb-2.5 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        {chapter && (
          <span className="font-cinematic text-xs tracking-[0.3em] uppercase text-[#F5A66D] font-semibold">
            {chapter}
          </span>
        )}
        {chapter && japaneseTag && (
          <span className="w-1 h-1 rounded-full bg-[#6555B8]" />
        )}
        {japaneseTag && (
          <span className="font-japanese text-[11px] tracking-widest text-[#82D9F2] bg-[#30245B]/50 px-2.5 py-0.5 rounded-full border border-[#6555B8]/30">
            {japaneseTag}
          </span>
        )}
      </div>

      {/* Main Cinematic Title */}
      <h2 className="heading-section text-white font-bold tracking-wider drop-shadow-md">
        {title}
      </h2>

      {/* Narrative Subtitle */}
      {subtitle && (
        <p className="mt-2.5 text-sm sm:text-base text-[#F2F0F8]/80 font-sans leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
