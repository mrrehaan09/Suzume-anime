import { useRef } from 'react';
import { Sparkles, Award, Globe, Clock, Clapperboard, Quote } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';
import { gsap } from '../lib/gsap';
import { MOVIE_DATA } from '../data/suzumeData';
import SectionHeader from '../components/common/SectionHeader';

export function IntroSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.intro-fade-in', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      opacity: 0,
      y: 28,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out',
    });
  }, [], containerRef);

  return (
    <section
      id="intro"
      ref={containerRef}
      className="relative z-0 w-full py-16 sm:py-20 lg:py-24 bg-[#080D1C]/40 backdrop-blur-sm border-t border-[#6555B8]/20 overflow-hidden"
    >
      {/* Atmospheric Background Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 right-1/4 w-[550px] h-[550px] bg-[#6555B8]/15 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] bg-[#30245B]/25 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#82D9F2_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02]" />
      </div>

      <div className="cinematic-container relative z-10">
        {/* Section Header */}
        <SectionHeader
          chapter="Prologue 01"
          japaneseTag="作品紹介"
          title="The Myth, The Journey, The Door"
          subtitle="A cinematic masterpiece blending folklore, breathtaking modern Japanese landscapes, and an emotional reckoning with collective memory."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center mt-8 sm:mt-10">
          {/* Left Column: Film Visual & Theatrical Poster Presentation */}
          <div className="intro-fade-in lg:col-span-5 flex flex-col items-center">
            <div className="group relative w-full max-w-sm sm:max-w-md rounded-2xl overflow-hidden glass-panel border border-[#6555B8]/40 shadow-2xl p-2.5 sm:p-3 bg-[#111B35]/90 transition-all duration-500 hover:border-[#F5A66D]/60 hover:shadow-[0_0_40px_rgba(245,166,109,0.25)]">
              {/* Poster Frame Container */}
              <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#111B35] via-[#30245B] to-[#080D1C] flex flex-col justify-between p-5 sm:p-6 text-center border border-white/10">
                {/* Background Artwork Image & Subtle Zoom */}
                <img
                  src={MOVIE_DATA.keyVisualPoster}
                  alt="Suzume Theatrical Key Visual"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/images/doors/mysterious_door.jpg';
                  }}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-1000 ease-out filter brightness-[0.88]"
                />

                {/* Cinematic Twilight Gradients Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080D1C] via-[#111B35]/50 to-[#080D1C]/40" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6555B8]/20 via-[#F5A66D]/20 to-[#82D9F2]/25 mix-blend-screen opacity-70" />

                {/* Top Poster Accents */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-cinematic uppercase tracking-[0.2em] text-[#F5A66D] drop-shadow">
                  <span>CoMix Wave Films</span>
                  <span>Makoto Shinkai</span>
                </div>

                {/* Poster Centerpiece Graphics: Keyhole & Japanese Calligraphy */}
                <div className="relative z-10 my-auto flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#6555B8] via-[#F5A66D] to-[#82D9F2] p-1 shadow-2xl animate-pulse">
                    <div className="w-full h-full rounded-full bg-[#080D1C] flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-[#F5A66D]" />
                    </div>
                  </div>

                  <h3 className="font-cinematic text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.2em] text-white drop-shadow-[0_4px_15px_rgba(8,13,28,0.9)]">
                    SUZUME
                  </h3>

                  <p className="font-japanese text-xl sm:text-2xl tracking-[0.35em] text-[#82D9F2] font-medium drop-shadow">
                    すずめの戸締まり
                  </p>

                  <p className="text-[11px] sm:text-xs text-[#F2F0F8] font-sans italic max-w-xs leading-relaxed drop-shadow bg-[#080D1C]/75 px-3 py-1.5 rounded-full border border-white/10">
                    “On the other side of the door, was time in its entirety.”
                  </p>
                </div>

                {/* Bottom Poster Footer */}
                <div className="relative z-10 pt-3 border-t border-white/20 flex items-center justify-between text-[10px] font-mono tracking-wider text-[#F2F0F8]/85 drop-shadow">
                  <span>MUSIC BY RADWIMPS</span>
                  <span>THEATRICAL RELEASE</span>
                </div>
              </div>

              {/* Poster Caption Card */}
              <div className="mt-2.5 px-3 py-1.5 flex items-center justify-between text-xs text-[#82D9F2]/80">
                <span className="font-cinematic">Key Theatrical Visual</span>
                <span className="font-mono text-[#F5A66D] font-medium">Worldwide Hit</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Synopsis & Production Highlights */}
          <div className="intro-fade-in lg:col-span-7 space-y-6 sm:space-y-7">
            <div className="space-y-3">
              <span className="eyebrow-tag text-[#F5A66D]">The Story Narrative</span>
              <h3 className="font-cinematic text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide">
                Closing the Doors of Calamity Across Japan
              </h3>
              <p className="text-sm sm:text-base text-[#F2F0F8]/90 font-sans leading-relaxed whitespace-pre-line">
                {MOVIE_DATA.synopsis}
              </p>
            </div>

            {/* Production Specifications Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10">
              <div className="p-3 rounded-xl bg-[#111B35]/80 border border-white/10 hover:border-[#82D9F2]/40 transition-colors">
                <Clapperboard className="w-4 h-4 text-[#82D9F2] mb-1" />
                <span className="text-[10px] font-mono uppercase text-[#82D9F2]/70 block">Director</span>
                <span className="font-cinematic text-xs font-semibold text-white">Makoto Shinkai</span>
              </div>

              <div className="p-3 rounded-xl bg-[#111B35]/80 border border-white/10 hover:border-[#F5A66D]/40 transition-colors">
                <Globe className="w-4 h-4 text-[#F5A66D] mb-1" />
                <span className="text-[10px] font-mono uppercase text-[#82D9F2]/70 block">Studio</span>
                <span className="font-cinematic text-xs font-semibold text-white">CoMix Wave Films</span>
              </div>

              <div className="p-3 rounded-xl bg-[#111B35]/80 border border-white/10 hover:border-[#82D9F2]/40 transition-colors">
                <Clock className="w-4 h-4 text-[#82D9F2] mb-1" />
                <span className="text-[10px] font-mono uppercase text-[#82D9F2]/70 block">Runtime</span>
                <span className="font-cinematic text-xs font-semibold text-white">121 Minutes</span>
              </div>

              <div className="p-3 rounded-xl bg-[#111B35]/80 border border-white/10 hover:border-[#E11D48]/40 transition-colors">
                <Award className="w-4 h-4 text-[#E11D48] mb-1" />
                <span className="text-[10px] font-mono uppercase text-[#82D9F2]/70 block">Box Office</span>
                <span className="font-cinematic text-xs font-semibold text-white">$320M+ Global</span>
              </div>
            </div>

            {/* Director Statement Quote */}
            <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#111B35] via-[#30245B]/60 to-[#111B35] border border-[#6555B8]/40 shadow-xl">
              <Quote className="absolute top-4 right-4 w-7 h-7 text-[#F5A66D]/20" />
              <p className="font-sans text-xs sm:text-sm md:text-base text-[#F2F0F8] italic leading-relaxed">
                {MOVIE_DATA.directorStatement}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F5A66D]" />
                <span className="font-cinematic text-xs tracking-widest uppercase text-[#F5A66D] font-semibold">
                  Makoto Shinkai • Director & Screenwriter
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntroSection;
