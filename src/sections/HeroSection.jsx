import { useRef } from 'react';
import { ChevronDown, Sparkles, Compass, Key } from 'lucide-react';
import { useLenis } from '../hooks/useLenis';
import { useGSAP } from '../hooks/useGSAP';
import { gsap } from '../lib/gsap';
import { MOVIE_DATA } from '../data/suzumeData';

export function HeroSection() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const { scrollTo } = useLenis();

  // Cinematic GSAP entrance animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-badge', {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.2,
    })
      .from('.hero-title-char', {
        opacity: 0,
        y: 45,
        stagger: 0.05,
        duration: 0.9,
      }, '-=0.4')
      .from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.8,
      }, '-=0.6')
      .from('.hero-action-btn', {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.7,
      }, '-=0.5')
      .from('.hero-scroll-indicator', {
        opacity: 0,
        duration: 0.6,
      }, '-=0.3');
  }, [], containerRef);

  const handleExplore = () => {
    if (scrollTo) {
      scrollTo('#intro', { duration: 1.3, offset: -20 });
    }
  };

  const handleScrollToDoors = () => {
    if (scrollTo) {
      scrollTo('#doors', { duration: 1.5, offset: -20 });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between items-center pt-24 sm:pt-28 pb-8 sm:pb-12 overflow-hidden"
    >
      {/* Background Breathtaking Cinematic Landscape & Atmospheric Layers */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Full-bleed Cinematic Makoto Shinkai Sky Photo with Smooth Overlay */}
        <img
          src={MOVIE_DATA.heroLandscape}
          alt="Suzume Cinematic Sky"
          loading="eager"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105 transform transition-transform duration-[12000ms] ease-out will-change-transform"
        />

        {/* Ambient Cosmic Theme Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080D1C]/80 via-[#111B35]/60 to-[#080D1C]" />

        {/* Glowing Sun Rays & Cosmic Horizons */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[850px] h-[300px] sm:h-[500px] bg-gradient-to-b from-[#F5A66D]/25 via-[#6555B8]/20 to-transparent rounded-full blur-[100px] sm:blur-[130px]" />
        <div className="absolute top-1/3 -left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#30245B]/30 rounded-full blur-[100px] sm:blur-[130px]" />
        <div className="absolute top-1/2 -right-32 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#82D9F2]/20 rounded-full blur-[100px] sm:blur-[130px]" />

        {/* Layered Floating Cloud Bands */}
        <div className="absolute top-16 left-0 right-0 h-40 bg-gradient-to-b from-white/[0.04] to-transparent blur-3xl transform -skew-y-2 pointer-events-none" />
        <div className="absolute top-1/2 left-0 right-0 h-56 bg-gradient-to-r from-transparent via-[#F5A66D]/[0.08] to-transparent blur-3xl pointer-events-none" />

        {/* Water Surface Horizon & Subtle Shimmer at Base */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#080D1C] via-[#080D1C]/90 to-transparent" />
        <div className="absolute bottom-12 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#82D9F2]/30 to-transparent blur-[1px]" />
      </div>

      {/* Centerpiece Content: Moved lower down, beautifully vertically centered and balanced */}
      <div className="cinematic-container relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4 sm:px-6 my-auto pt-4 sm:pt-8 pb-4">
        {/* Japanese Tagline Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111B35]/85 border border-[#F5A66D]/40 shadow-lg backdrop-blur-md mb-5 sm:mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#F5A66D] animate-pulse" />
          <span className="font-japanese text-xs sm:text-sm tracking-[0.22em] text-[#F2F0F8] font-medium">
            {MOVIE_DATA.japaneseTagline}
          </span>
        </div>

        {/* Main Display Title */}
        <div ref={titleRef} className="relative mb-3 sm:mb-4">
          <h1 className="heading-display font-black tracking-[0.14em] text-white flex justify-center drop-shadow-[0_10px_35px_rgba(8,13,28,0.9)] select-none">
            {'SUZUME'.split('').map((char, index) => (
              <span key={index} className="hero-title-char inline-block">
                {char}
              </span>
            ))}
          </h1>

          {/* Ethereal Kanji Shadow Watermark */}
          <div className="absolute -top-5 sm:-top-8 left-1/2 -translate-x-1/2 font-japanese text-5xl sm:text-7xl md:text-8xl text-white/[0.04] pointer-events-none select-none tracking-[0.3em] whitespace-nowrap">
            すずめの戸締まり
          </div>
        </div>

        {/* Subtitle */}
        <div className="hero-subtitle space-y-2 mb-8 sm:mb-10 max-w-2xl mx-auto">
          <p className="font-cinematic text-sm sm:text-base md:text-lg tracking-[0.35em] uppercase text-[#F5A66D] font-semibold drop-shadow">
            — {MOVIE_DATA.subtitle} —
          </p>
          <p className="font-sans text-xs sm:text-sm md:text-base tracking-wider text-[#82D9F2]/90 leading-relaxed max-w-lg mx-auto">
            An Immersive Cinematic Web Journey Inspired by the Masterpiece by Makoto Shinkai
          </p>
        </div>

        {/* Action Buttons in a natural position directly below the text */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none sm:w-auto">
          <button
            type="button"
            onClick={handleExplore}
            className="hero-action-btn group w-full sm:w-auto px-7 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#6555B8] via-[#F5A66D] to-[#E11D48] text-white font-cinematic text-xs sm:text-sm font-bold tracking-[0.2em] uppercase shadow-xl hover:shadow-[0_0_30px_rgba(245,166,109,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Explore Journey</span>
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </button>

          <button
            type="button"
            onClick={handleScrollToDoors}
            className="hero-action-btn group w-full sm:w-auto px-6 sm:px-7 py-3 rounded-full bg-[#111B35]/85 hover:bg-[#30245B]/80 border border-[#6555B8]/40 hover:border-[#F5A66D]/70 text-[#F2F0F8] font-cinematic text-xs sm:text-sm tracking-[0.2em] uppercase shadow-lg hover:shadow-purple-900/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Key className="w-4 h-4 text-[#F5A66D] group-hover:rotate-12 transition-transform" />
            <span>The Sacred Doors</span>
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator with Clean Breathing Room */}
      <div
        onClick={handleExplore}
        className="hero-scroll-indicator relative z-10 flex flex-col items-center gap-1.5 cursor-pointer group mt-2"
      >
        <span className="font-cinematic text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#82D9F2]/70 group-hover:text-[#F5A66D] transition-colors">
          Scroll to Begin Journey
        </span>
        <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#F5A66D]/50 transition-colors">
          <ChevronDown className="w-3.5 h-3.5 text-[#F5A66D] animate-bounce" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
