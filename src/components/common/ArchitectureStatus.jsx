import { useRef, useState } from 'react';
import { useLenis } from '../../hooks/useLenis';
import { useGSAP } from '../../hooks/useGSAP';
import { gsap } from '../../lib/gsap';
import { MOVIE_INFO, SUZUME_PALETTE, PLANNED_SECTIONS } from '../../lib/constants';
import CinematicButton from './CinematicButton';
import GlassCard from './GlassCard';
import SectionHeader from './SectionHeader';

export function ArchitectureStatus() {
  const containerRef = useRef(null);
  const cardListRef = useRef(null);
  const pulseKeyRef = useRef(null);
  const [pulseCount, setPulseCount] = useState(0);
  const { lenis, scrollTo } = useLenis();

  // Test GSAP and React 19 safe context lifecycle
  useGSAP((ctx) => {
    // Staggered entry animation on architecture items
    gsap.from('.arch-pill', {
      opacity: 0,
      y: 15,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
    });

    // Ambient floating key animation
    ctx.add('triggerKeyPulse', () => {
      gsap.fromTo(
        pulseKeyRef.current,
        { scale: 1, rotate: 0, filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.4))' },
        {
          scale: 1.15,
          rotate: 15,
          filter: 'drop-shadow(0 0 25px rgba(245, 158, 11, 0.9))',
          duration: 0.35,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
        }
      );
    });
  }, [], containerRef);

  const handlePulseAnimation = () => {
    setPulseCount((prev) => prev + 1);
    if (pulseKeyRef.current) {
      gsap.fromTo(
        pulseKeyRef.current,
        { scale: 1, filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.4))' },
        {
          scale: 1.25,
          filter: 'drop-shadow(0 0 30px rgba(245, 158, 11, 0.95))',
          duration: 0.25,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
        }
      );
    }
  };

  const handleScrollTest = () => {
    if (lenis) {
      scrollTo('#architecture-verification', { duration: 1.4 });
    }
  };

  const paletteSwatches = [
    { name: 'Door Vermilion', var: 'var(--suzume-door-vermilion)', hex: SUZUME_PALETTE.doorVermilion, note: 'Lacquer Portal' },
    { name: 'Souta Amber', var: 'var(--suzume-chair-amber)', hex: SUZUME_PALETTE.chairAmber, note: 'Canary Chair & Key' },
    { name: 'Tokoyo Starlight', var: 'var(--suzume-tokoyo-starlight)', hex: SUZUME_PALETTE.tokoyoStarlight, note: 'Ever-After Realm' },
    { name: 'Shinkai Azure', var: 'var(--suzume-sky-azure)', hex: SUZUME_PALETTE.skyAzure, note: 'Daylight Horizon' },
    { name: 'Calamity Crimson', var: 'var(--suzume-calamity-red)', hex: SUZUME_PALETTE.calamityRed, note: 'Mimizu Vortex' },
    { name: 'Daijin Pearl', var: 'var(--suzume-daijin-pearl)', hex: SUZUME_PALETTE.daijinPearl, note: 'Keystone Cat' },
  ];

  return (
    <div ref={containerRef} className="w-full space-y-16">
      {/* Cinematic Architecture Header */}
      <div className="relative text-center pt-12 pb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-cinematic text-xs tracking-[0.25em] text-amber-300 uppercase">
            Architecture Blueprint Ready
          </span>
        </div>

        <h1 className="heading-display text-white font-black tracking-wide drop-shadow-2xl">
          {MOVIE_INFO.title}
        </h1>

        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="font-japanese text-xl sm:text-2xl tracking-[0.3em] text-rose-400/90 font-medium">
            {MOVIE_INFO.originalTitle}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
          <span className="font-cinematic text-sm tracking-widest text-slate-400 uppercase">
            A Film by {MOVIE_INFO.director}
          </span>
        </div>

        <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-slate-300 font-sans italic">
          "{MOVIE_INFO.tagline}"
        </p>
      </div>

      {/* Verification Matrix Grid */}
      <div id="architecture-verification" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Module 1: Tailwind CSS v4 & Styling Engine */}
        <GlassCard variant="door" className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="eyebrow-tag text-rose-400">Styling Engine</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30">
                ACTIVE
              </span>
            </div>
            <h3 className="heading-subsection text-white mb-2">Tailwind CSS v4</h3>
            <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mb-4">
              Engineered with <code className="text-rose-300 bg-rose-950/40 px-1 py-0.5 rounded">@tailwindcss/vite</code>. Fully customized with Suzume theme tokens, CSS variables, and fluid typography.
            </p>
          </div>
          <div className="pt-4 border-t border-rose-500/10 flex flex-wrap gap-2">
            <span className="arch-pill text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-slate-200 border border-white/5">
              @theme Tokens
            </span>
            <span className="arch-pill text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-slate-200 border border-white/5">
              Fluid Clamps
            </span>
            <span className="arch-pill text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-slate-200 border border-white/5">
              Cinematic Aspect
            </span>
          </div>
        </GlassCard>

        {/* Module 2: GSAP & ScrollTrigger */}
        <GlassCard variant="gold" className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="eyebrow-tag text-amber-400">Motion Architecture</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                ACTIVE
              </span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="heading-subsection text-white">GSAP 3 + ScrollTrigger</h3>
              <div
                ref={pulseKeyRef}
                className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 text-xs shadow-lg"
                title="Keystone Key GSAP Target"
              >
                🗝️
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mb-4">
              Configured with React 19 lifecycle safety via <code className="text-amber-300 bg-amber-950/40 px-1 py-0.5 rounded">useGSAP</code> context reversion and memory leak prevention.
            </p>
          </div>
          <div className="pt-4 border-t border-amber-500/10 flex items-center justify-between">
            <CinematicButton
              variant="gold"
              size="sm"
              onClick={handlePulseAnimation}
              className="text-[11px]"
            >
              Test Tween ({pulseCount})
            </CinematicButton>
            <span className="text-[11px] font-mono text-amber-400/70">
              ctx.revert() ready
            </span>
          </div>
        </GlassCard>

        {/* Module 3: Lenis Smooth Scrolling */}
        <GlassCard variant="default" className="flex flex-col justify-between md:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="eyebrow-tag text-sky-400">Scroll Synchronizer</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/30">
                ACTIVE
              </span>
            </div>
            <h3 className="heading-subsection text-white mb-2">Lenis v1 Smooth Scroll</h3>
            <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed mb-4">
              Synchronized directly with the GSAP ticker loop and <code className="text-sky-300 bg-sky-950/40 px-1 py-0.5 rounded">ScrollTrigger.update()</code> for stutter-free cinematic scrolling.
            </p>
          </div>
          <div className="pt-4 border-t border-sky-500/10 flex items-center justify-between">
            <CinematicButton
              variant="sky"
              size="sm"
              onClick={handleScrollTest}
              className="text-[11px]"
            >
              Smooth Scroll Test
            </CinematicButton>
            <span className="text-[11px] font-mono text-sky-400/70">
              Ticker RAF Synced
            </span>
          </div>
        </GlassCard>
      </div>

      {/* Suzume Color Palette Showcase */}
      <GlassCard variant="subtle" className="p-8">
        <SectionHeader
          chapter="System 01"
          japaneseTag="色彩設計"
          title="Suzume Color Palette"
          subtitle="Color tokens grounded in the cinematic skies, vermilion doors, canary chair, and celestial Tokoyo realm of the film."
          align="left"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {paletteSwatches.map((swatch) => (
            <div
              key={swatch.name}
              className="group p-3 rounded-xl bg-slate-900/40 border border-white/5 hover:border-white/20 transition-all duration-300"
            >
              <div
                className="w-full h-14 rounded-lg mb-3 shadow-inner transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: swatch.hex }}
              />
              <div className="font-cinematic text-xs font-semibold text-white truncate">
                {swatch.name}
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                {swatch.hex}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 truncate">
                {swatch.note}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Modular Sections Blueprint */}
      <GlassCard variant="default" className="p-8">
        <SectionHeader
          chapter="System 02"
          japaneseTag="構成計画"
          title="Modular Section Architecture"
          subtitle="Architecture prepared for website sections. Structure and state hooks are established without prematurely generating the full website sections."
          align="left"
        />

        <div ref={cardListRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLANNED_SECTIONS.map((section, idx) => (
            <div
              key={section.id}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-400/30 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="font-cinematic text-xs text-amber-400/80 font-mono">
                  0{idx + 1}
                </span>
                <div>
                  <div className="font-cinematic text-sm font-medium text-white">
                    {section.name}
                  </div>
                  <div className="font-japanese text-xs text-slate-400 mt-0.5">
                    {section.japanese}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                SLOT READY
              </span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Directory Structure Verification */}
      <GlassCard variant="subtle" className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
          <div>
            <span className="eyebrow-tag text-emerald-400">Directory Organization</span>
            <h3 className="heading-subsection text-white mt-1">Verified Architectural Folders</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs text-emerald-300">Clean Architecture</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
          {[
            { folder: 'src/components', purpose: 'UI Primitives & Providers', status: 'Ready' },
            { folder: 'src/sections', purpose: 'Modular Section Slots', status: 'Ready' },
            { folder: 'src/assets', purpose: 'Images, Vectors & Media', status: 'Ready' },
            { folder: 'src/hooks', purpose: 'useGSAP, useLenis, media', status: 'Ready' },
            { folder: 'src/styles', purpose: 'Tailwind, Variables, Typography', status: 'Ready' },
          ].map((item) => (
            <div key={item.folder} className="p-3 rounded-lg bg-black/20 border border-white/5">
              <div className="font-mono text-xs text-amber-300 truncate font-semibold">
                {item.folder}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                {item.purpose}
              </div>
              <div className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span>✓</span> {item.status}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

export default ArchitectureStatus;
