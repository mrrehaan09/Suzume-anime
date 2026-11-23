import { useState, useRef } from 'react';
import { MapPin, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';
import { gsap } from '../lib/gsap';
import { STORY_CHAPTERS } from '../data/suzumeData';
import SectionHeader from '../components/common/SectionHeader';

export function StorySection() {
  const containerRef = useRef(null);
  const [activeChapterId, setActiveChapterId] = useState(1);
  const [spoilersUnlocked, setSpoilersUnlocked] = useState(false);

  const activeChapter = STORY_CHAPTERS.find((c) => c.id === activeChapterId) || STORY_CHAPTERS[0];

  useGSAP(() => {
    gsap.from('.story-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      opacity: 0,
      y: 28,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }, [], containerRef);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative z-0 w-full py-16 sm:py-20 lg:py-24 bg-[#080D1C]/40 backdrop-blur-sm border-t border-[#6555B8]/20 overflow-hidden"
    >
      {/* Background Ambient Glows & Texture */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-[#6555B8]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] bg-[#30245B]/25 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#82D9F2_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.02]" />
      </div>

      <div className="cinematic-container relative z-10">
        {/* Section Header */}
        <SectionHeader
          chapter="Journey 02"
          japaneseTag="物語の旅"
          title="The Six Sacred Chapters"
          subtitle="Follow Suzume’s pilgrimage across the Japanese archipelago from the tranquil shores of Kyushu to the earthquake ruins of Tohoku."
          align="center"
        />

        {/* Global Spoiler Warning Toggle */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <button
            type="button"
            onClick={() => setSpoilersUnlocked(!spoilersUnlocked)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-cinematic text-xs tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer ${
              spoilersUnlocked
                ? 'bg-rose-950/60 text-rose-300 border border-rose-500/40 hover:bg-rose-900/60'
                : 'bg-[#111B35] text-[#82D9F2]/80 border border-[#6555B8]/30 hover:text-white hover:border-[#F5A66D]/60'
            }`}
          >
            {spoilersUnlocked ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-rose-400" />
                <span>Spoilers Visible • Click to Hide</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-[#F5A66D]" />
                <span>Spoiler Protection Active • Click to Reveal Plot</span>
              </>
            )}
          </button>
        </div>

        {/* Chapter Selection Nav Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
          {STORY_CHAPTERS.map((chapter) => {
            const isSelected = chapter.id === activeChapterId;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => setActiveChapterId(chapter.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#111B35] border-[#F5A66D] shadow-[0_0_20px_rgba(245,166,109,0.25)] scale-[1.02]'
                    : 'bg-[#080D1C]/80 border-white/5 hover:border-[#6555B8]/40 hover:bg-[#111B35]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[11px] font-semibold text-[#F5A66D]">
                    CH {chapter.chapterNumber}
                  </span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#F5A66D] shadow-[0_0_8px_#F5A66D]" />}
                </div>
                <div className="font-cinematic text-xs font-semibold text-white truncate">
                  {chapter.title}
                </div>
                <div className="font-japanese text-[10px] text-[#82D9F2]/70 truncate mt-0.5">
                  {chapter.japaneseTitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Spotlight Card */}
        <div className="story-card relative rounded-3xl overflow-hidden glass-panel border border-[#6555B8]/35 p-6 sm:p-8 lg:p-10 bg-[#111B35]/85 shadow-2xl">
          {/* Ambient Corner Flare */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: activeChapter.color }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left: Chapter Overview & Teaser */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#30245B]/60 text-[#82D9F2] border border-[#6555B8]/40">
                  Chapter {activeChapter.chapterNumber} • {activeChapter.theme}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-[#82D9F2]/80 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-[#F5A66D]" />
                  <span>{activeChapter.location}</span>
                </div>
              </div>

              <div>
                <h3 className="heading-section text-white font-bold tracking-wide">
                  {activeChapter.title}
                </h3>
                <p className="font-japanese text-lg sm:text-xl text-[#F5A66D] tracking-widest mt-1">
                  {activeChapter.japaneseTitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#F2F0F8]/90 font-sans leading-relaxed">
                {activeChapter.teaser}
              </p>

              {/* Spoiler-Protected Narrative Accordion */}
              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-cinematic text-xs uppercase tracking-widest text-[#F5A66D] font-semibold">
                    Detailed Plot Synopsis
                  </span>
                  {!spoilersUnlocked && (
                    <span className="text-[11px] font-mono text-[#82D9F2]/70">
                      (Click below or toggle above to unblur)
                    </span>
                  )}
                </div>

                <div
                  onClick={() => !spoilersUnlocked && setSpoilersUnlocked(true)}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-500 cursor-pointer ${
                    spoilersUnlocked
                      ? 'bg-[#080D1C]/80 border-white/10'
                      : 'bg-[#080D1C] border-dashed border-[#F5A66D]/40 hover:border-[#F5A66D]/70'
                  }`}
                >
                  {spoilersUnlocked ? (
                    <p className="text-xs sm:text-sm text-[#F2F0F8]/90 font-sans leading-relaxed">
                      {activeChapter.spoilerText}
                    </p>
                  ) : (
                    <div className="flex items-center justify-between py-0.5">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#F5A66D]">
                        <Eye className="w-4 h-4" />
                        <span>Major Plot Point Hidden. Click to Reveal.</span>
                      </div>
                      <span className="text-[11px] font-cinematic uppercase tracking-widest text-[#82D9F2]">
                        Show Details
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Chapter Artwork Presentation (Cinematic Image Frame) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="group relative w-full aspect-[4/3] rounded-2xl border border-[#6555B8]/40 shadow-2xl overflow-hidden flex flex-col justify-between p-5 transition-all duration-500 hover:shadow-[0_0_35px_rgba(245,166,109,0.25)] hover:border-[#F5A66D]/50">
                {/* Background Chapter Image with Zoom */}
                <img
                  src={activeChapter.image}
                  alt={activeChapter.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/images/doors/mysterious_door.jpg';
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108 filter brightness-[0.88]"
                />

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080D1C] via-[#111B35]/40 to-[#080D1C]/30" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#30245B]/25 via-transparent to-[#F5A66D]/20 mix-blend-overlay" />

                {/* Top Badge Info */}
                <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#F2F0F8] drop-shadow">
                  <span className="bg-[#080D1C]/80 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-sm">
                    STAGE {activeChapter.chapterNumber}
                  </span>
                  <span className="font-cinematic text-xs tracking-wider uppercase font-semibold text-[#F5A66D] drop-shadow">
                    PILGRIMAGE
                  </span>
                </div>

                {/* Center Title Kanji */}
                <div className="relative z-10 text-center my-auto drop-shadow-[0_4px_12px_rgba(8,13,28,0.9)]">
                  <div className="font-japanese text-4xl sm:text-5xl text-white/40 font-bold select-none">
                    {activeChapter.japaneseTitle.slice(0, 2)}
                  </div>
                  <div className="font-cinematic text-lg sm:text-xl font-bold text-white tracking-widest mt-1">
                    {activeChapter.title}
                  </div>
                  <div className="text-xs text-[#F5A66D] mt-0.5 font-sans">
                    {activeChapter.location}
                  </div>
                </div>

                {/* Bottom Theme Bar */}
                <div className="relative z-10 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] text-[#F2F0F8] drop-shadow">
                  <span className="font-sans font-medium">Theme: {activeChapter.theme}</span>
                  <Sparkles className="w-4 h-4 text-[#F5A66D]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StorySection;
