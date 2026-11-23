import { useState, useRef } from 'react';
import { Quote, Mic } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';
import { gsap } from '../lib/gsap';
import { CHARACTERS } from '../data/suzumeData';
import SectionHeader from '../components/common/SectionHeader';

export function CharactersSection() {
  const containerRef = useRef(null);
  const [selectedCharId, setSelectedCharId] = useState('suzume');

  const selectedChar = CHARACTERS.find((c) => c.id === selectedCharId) || CHARACTERS[0];

  useGSAP(() => {
    gsap.from('.character-pill', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      opacity: 0,
      y: 25,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, [], containerRef);

  return (
    <section
      id="characters"
      ref={containerRef}
      className="relative z-0 w-full py-14 sm:py-20 lg:py-24 bg-[#080D1C]/40 backdrop-blur-sm border-t border-[#6555B8]/20 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 -left-36 w-[550px] h-[550px] bg-[#30245B]/25 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 -right-36 w-[550px] h-[550px] bg-[#82D9F2]/10 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6555B8]/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#82D9F2_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.03]" />
      </div>

      <div className="cinematic-container relative z-10">
        {/* Section Header */}
        <SectionHeader
          chapter="Universe 03"
          japaneseTag="登場人物"
          title="Souls Bound by Fate"
          subtitle="Meet the brave closers, divine guardians, devoted family, and kind travelers whose lives intertwine across Suzume's pilgrimage."
          align="center"
        />

        {/* Character Selector Tabs - scrollable on mobile */}
        <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap items-center justify-start sm:justify-center gap-2 sm:gap-3 mb-6 sm:mb-10 -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-hide">
          {CHARACTERS.map((char) => {
            const isSelected = char.id === selectedCharId;
            return (
              <button
                key={char.id}
                type="button"
                onClick={() => setSelectedCharId(char.id)}
                className={`character-pill shrink-0 px-3 sm:px-5 py-2 sm:py-3 rounded-full text-[11px] sm:text-xs font-cinematic uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#30245B] via-[#6555B8] to-[#111B35] text-white border-2 shadow-lg shadow-[#6555B8]/30 scale-105'
                    : 'bg-[#111B35]/80 text-[#F2F0F8]/70 border border-[#6555B8]/25 hover:text-white hover:border-[#82D9F2]/50 hover:bg-[#30245B]/50'
                }`}
                style={{
                  borderColor: isSelected ? char.color : undefined,
                  boxShadow: isSelected ? `0 0 20px ${char.color}45` : undefined,
                }}
              >
                <span className="font-japanese text-[10px] sm:text-[11px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full bg-white/10 text-white">
                  {char.kanjiBadge}
                </span>
                <span>{char.name}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Character Spotlight Card */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden glass-panel border border-[#6555B8]/35 p-4 sm:p-10 lg:p-12 bg-[#111B35]/90 shadow-2xl">
          {/* Ambient Lighting Corner Aura */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[110px] opacity-25 pointer-events-none"
            style={{ backgroundColor: selectedChar.color }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left: Character Portrait Card with High-Res Artwork */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                className="group relative w-full max-w-[280px] sm:max-w-sm aspect-[4/5] rounded-2xl border shadow-2xl flex flex-col justify-between overflow-hidden p-4 sm:p-6 transition-all duration-500 hover:shadow-[0_0_35px_rgba(130,217,242,0.3)] hover:-translate-y-1"
                style={{
                  borderColor: `${selectedChar.color}60`,
                }}
              >
                {/* Background Character Photo */}
                <img
                  src={selectedChar.image}
                  alt={selectedChar.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/images/characters/suzume.jpg';
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108 filter brightness-[0.92]"
                />

                {/* Atmospheric Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080D1C] via-[#111B35]/40 to-[#080D1C]/30" />
                <div
                  className="absolute inset-0 opacity-30 mix-blend-overlay"
                  style={{
                    background: `linear-gradient(135deg, ${selectedChar.color} 0%, transparent 100%)`,
                  }}
                />

                {/* Top Kanji Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-[10px] sm:text-xs text-[#F2F0F8] tracking-wider uppercase bg-[#080D1C]/80 px-2 sm:px-2.5 py-1 rounded-md border border-[#6555B8]/30 backdrop-blur-sm">
                    Profile
                  </span>
                  <span
                    className="font-japanese text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-full font-semibold shadow backdrop-blur-md"
                    style={{
                      backgroundColor: `${selectedChar.color}40`,
                      color: '#FFFFFF',
                      border: `1px solid ${selectedChar.color}80`,
                    }}
                  >
                    {selectedChar.kanjiBadge}
                  </span>
                </div>

                {/* Character Name & Role Banner */}
                <div className="relative z-10 text-center my-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  <div
                    className="font-japanese text-4xl sm:text-5xl lg:text-6xl font-bold tracking-widest text-white/90 drop-shadow-xl"
                  >
                    {selectedChar.kanji.split(' ')[0]}
                  </div>
                  <h4 className="font-cinematic text-xl sm:text-2xl font-bold text-white tracking-widest mt-2">
                    {selectedChar.name}
                  </h4>
                  <p className="font-cinematic text-[10px] sm:text-xs tracking-[0.2em] text-[#F5A66D] uppercase mt-1 font-semibold">
                    {selectedChar.role}
                  </p>
                </div>

                {/* Bottom Personality Traits Tags */}
                <div className="relative z-10 pt-3 sm:pt-4 border-t border-white/20 flex flex-wrap gap-1 sm:gap-1.5 justify-center">
                  {selectedChar.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="text-[9px] sm:text-[10px] font-mono px-2 sm:px-2.5 py-0.5 rounded-md bg-[#080D1C]/80 text-[#F2F0F8] border border-[#6555B8]/30 backdrop-blur-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Detailed Biography, Voice Cast & Famous Quote */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div>
                <span
                  className="font-cinematic text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold block mb-1.5 sm:mb-2"
                  style={{ color: selectedChar.color }}
                >
                  {selectedChar.role}
                </span>
                <h3 className="heading-section text-white font-bold tracking-wide">
                  {selectedChar.name}
                </h3>
                <p className="font-japanese text-xl sm:text-2xl text-[#82D9F2] tracking-widest mt-1">
                  {selectedChar.kanji}
                </p>
              </div>

              {/* Bio Description */}
              <p className="text-xs sm:text-base text-[#F2F0F8]/90 font-sans leading-relaxed">
                {selectedChar.description}
              </p>

              {/* Character Quote Box */}
              <div
                className="relative p-4 sm:p-6 rounded-2xl border shadow-lg"
                style={{
                  backgroundColor: `${selectedChar.color}15`,
                  borderColor: `${selectedChar.color}45`,
                }}
              >
                <Quote
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-7 sm:h-7 opacity-30"
                  style={{ color: selectedChar.color }}
                />
                <p className="font-sans text-xs sm:text-base text-white italic leading-relaxed">
                  {selectedChar.quote}
                </p>
              </div>

              {/* Voice Actor Accents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 pt-3 sm:pt-4 border-t border-[#6555B8]/20">
                <div className="p-3 sm:p-3.5 rounded-xl bg-[#080D1C]/90 border border-[#6555B8]/25 flex items-start gap-3">
                  <Mic className="w-4 h-4 text-[#82D9F2] mt-1 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#82D9F2]/70 block">
                      Japanese Voice (Original)
                    </span>
                    <span className="font-cinematic text-xs font-semibold text-white">
                      {selectedChar.voiceActorJP}
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-[#080D1C]/90 border border-[#6555B8]/25 flex items-start gap-3">
                  <Mic className="w-4 h-4 text-[#F5A66D] mt-1 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#F5A66D]/70 block">
                      English Voice (Dub)
                    </span>
                    <span className="font-cinematic text-xs font-semibold text-white">
                      {selectedChar.voiceActorEN}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CharactersSection;
