import { useState, useRef } from 'react';
import { Key, Lock, Unlock, MapPin, AlertTriangle, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';
import { gsap } from '../lib/gsap';
import { MYSTERIOUS_DOORS, getAssetUrl } from '../data/suzumeData';
import SectionHeader from '../components/common/SectionHeader';

export function DoorsSection() {
  const containerRef = useRef(null);
  const heroImageRef = useRef(null);
  const [doorStates, setDoorStates] = useState(
    MYSTERIOUS_DOORS.reduce((acc, door) => {
      acc[door.id] = true; // default all sealed
      return acc;
    }, {})
  );

  const [activeDoorId, setActiveDoorId] = useState('kyushu-onsen');

  const toggleDoorSeal = (doorId) => {
    setDoorStates((prev) => ({
      ...prev,
      [doorId]: !prev[doorId],
    }));
  };

  const activeDoor = MYSTERIOUS_DOORS.find((d) => d.id === activeDoorId) || MYSTERIOUS_DOORS[0];
  const isCurrentlySealed = doorStates[activeDoor.id] ?? true;

  useGSAP(() => {
    // Parallax effect on large door image
    if (heroImageRef.current) {
      gsap.to(heroImageRef.current, {
        scrollTrigger: {
          trigger: heroImageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
        y: -40,
        ease: 'none',
      });
    }

    gsap.from('.door-item-card', {
      scrollTrigger: {
        trigger: '.doors-grid-container',
        start: 'top 80%',
      },
      opacity: 0,
      y: 35,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, [], containerRef);

  return (
    <section
      id="doors"
      ref={containerRef}
      className="relative z-0 w-full py-14 sm:py-20 lg:py-24 bg-[#080D1C]/40 backdrop-blur-sm border-t border-[#6555B8]/20 overflow-hidden"
    >
      {/* Background Ambient Glows & Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-[650px] h-[650px] bg-[#30245B]/25 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-40 w-[650px] h-[650px] bg-[#82D9F2]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#6555B8]/10 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#82D9F2_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.02]" />
      </div>

      <div className="cinematic-container relative z-10 space-y-8 sm:space-y-12">
        {/* Section Header */}
        <SectionHeader
          chapter="Sanctuary 04"
          japaneseTag="扉の伝説"
          title="The Mystery of the Abandoned Doors"
          subtitle="Where human memories and laughter fade, the boundary between worlds weakens. Discover the sacred lore of the doors and the ancient Closers."
          align="center"
        />

        {/* 1. Large Cinematic Feature Presentation: The Freestanding Door */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#6555B8]/35 bg-[#111B35]/90 shadow-2xl">
          <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden">
            <img
              ref={heroImageRef}
              src={getAssetUrl('/images/doors/mysterious_door.jpg')}
              alt="The Mysterious Freestanding Ruin Door"
              loading="lazy"
              className="w-full h-[120%] -mt-[10%] object-cover filter brightness-[0.88] contrast-[1.05]"
            />
            {/* Cinematic Gradient Scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080D1C] via-[#080D1C]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080D1C]/80 via-transparent to-[#080D1C]/80" />

            {/* In-Image Typography Overlay */}
            <div className="absolute bottom-4 sm:bottom-10 left-4 sm:left-10 max-w-2xl space-y-2">
              <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#30245B]/70 border border-[#6555B8]/50 text-[10px] sm:text-xs font-mono text-[#82D9F2] backdrop-blur-md">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F5A66D]" />
                <span>The Gateway to the Ever-After</span>
              </span>
              <h3 className="heading-section text-white font-bold tracking-wide drop-shadow-xl">
                The Freestanding Portal of Calamity
              </h3>
              <p className="text-[10px] sm:text-sm text-[#F2F0F8]/90 font-sans leading-relaxed drop-shadow max-w-xl hidden sm:block">
                Weathered by decades of rain, standing alone in forgotten flooded onsen ruins. Behind this single cedar door lies time in its entirety—where past, present, and future converge beneath eternal stars.
              </p>
            </div>
          </div>

          {/* Three Pillars of Door Lore */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#6555B8]/20 p-4 sm:p-7 bg-[#080D1C]/90 backdrop-blur-md border-t border-[#6555B8]/20 text-xs sm:text-sm text-[#F2F0F8]/90 font-sans">
            <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 text-[#F5A66D] font-cinematic font-bold tracking-wider uppercase text-[10px] sm:text-xs">
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Why The Doors Open</span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#F2F0F8]/75 leading-relaxed">
                Doors do not manifest in bustling cities; they open in places where human voices have disappeared—abandoned mines, floodways, rusted theme parks, and depopulated schools.
              </p>
            </div>

            <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 text-[#E11D48] font-cinematic font-bold tracking-wider uppercase text-[10px] sm:text-xs">
                <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>The Calamity Worm (Mimizu)</span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#F2F0F8]/75 leading-relaxed">
                An immense subterranean leviathan of seismic energy surges into the sky when a door remains unsealed. If its weight crashes down, it triggers catastrophic earthquakes.
              </p>
            </div>

            <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 text-[#82D9F2] font-cinematic font-bold tracking-wider uppercase text-[10px] sm:text-xs">
                <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>The Closer's Sacred Prayer</span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#F2F0F8]/75 leading-relaxed">
                To close a portal, the Closer must visualize the laughter and lives of the people who once inhabited the land, reciting the sacred rite and turning the golden key.
              </p>
            </div>
          </div>
        </div>

        {/* Sacred Prayer Chant Callout */}
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#111B35] via-[#30245B] to-[#111B35] border border-[#F5A66D]/35 text-center max-w-3xl mx-auto shadow-xl">
          <p className="font-japanese text-xs sm:text-base text-[#F5A66D] tracking-[0.15em] sm:tracking-[0.2em] leading-relaxed">
            「かけまくも畏き日不見の神よ。遠つ御祖の産土よ。久しく拝領つかまつりしこの山河、畏み畏み、謹んでお返し申す！」
          </p>
          <p className="font-sans text-[10px] sm:text-xs text-[#82D9F2]/80 mt-2 italic">
            "O Gods of the unseen realm... Mountains and rivers long entrusted to us, with humble reverence, we return them to your grace!"
          </p>
        </div>

        {/* 2. Interactive Door Portal Simulator */}
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden glass-panel border border-[#6555B8]/35 p-4 sm:p-10 bg-[#111B35]/90 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left: Interactive Door Mechanism */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                onClick={() => toggleDoorSeal(activeDoor.id)}
                className="group relative cursor-pointer transform transition-all duration-500 hover:scale-105"
                title="Click keyhole to turn the key and seal/unseal portal"
              >
                {/* Radial Glow corresponding to status */}
                <div
                  className={`absolute inset-0 -m-6 sm:-m-8 rounded-full blur-2xl transition-all duration-700 ${
                    isCurrentlySealed
                      ? 'bg-gradient-to-tr from-[#30245B]/60 via-[#6555B8]/40 to-[#82D9F2]/40 opacity-75'
                      : 'bg-gradient-to-tr from-[#E11D48]/70 to-[#F5A66D]/70 opacity-100 animate-pulse'
                  }`}
                />

                {/* Door Frame Container */}
                <div
                  className={`relative w-48 sm:w-64 aspect-[1/1.75] rounded-t-2xl rounded-b-sm border-4 shadow-2xl p-2 sm:p-2.5 flex flex-col justify-between transition-colors duration-500 overflow-hidden ${
                    isCurrentlySealed
                      ? 'bg-gradient-to-b from-[#1E1B38] to-[#0D1022] border-[#6555B8]'
                      : 'bg-gradient-to-b from-[#3B0724] to-[#1F0A14] border-[#E11D48]'
                  }`}
                >
                  {/* Door Header */}
                  <div
                    className={`relative z-10 w-full py-0.5 sm:py-1 rounded-t-sm text-center border-b text-[9px] sm:text-[10px] font-mono tracking-widest ${
                      isCurrentlySealed
                        ? 'bg-[#30245B] border-[#6555B8] text-[#82D9F2]'
                        : 'bg-[#500720] border-[#E11D48] text-rose-300'
                    }`}
                  >
                    {isCurrentlySealed ? 'PORTAL SEALED' : 'CALAMITY BREACH'}
                  </div>

                  {/* Inner Door Leaf & Keyhole Mechanism with Ruin Background */}
                  <div className="relative flex-1 my-1 sm:my-1.5 rounded-sm bg-black/60 flex flex-col items-center justify-center overflow-hidden border border-white/10">
                    {/* Ruin Scenery Image */}
                    <img
                      src={activeDoor.image}
                      alt={activeDoor.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = getAssetUrl('/images/doors/mysterious_door.jpg');
                      }}
                      className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Interior Glow Overlay */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        isCurrentlySealed
                          ? 'bg-gradient-to-b from-[#30245B]/50 via-[#6555B8]/30 to-[#82D9F2]/30 opacity-75'
                          : 'bg-gradient-to-b from-[#E11D48]/80 via-[#EF4444]/60 to-[#BE185D]/70 opacity-95 animate-pulse'
                      }`}
                    />

                    {/* Interactive Golden Key Toggle Button */}
                    <div className="relative z-10 flex flex-col items-center gap-1.5 sm:gap-2">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full p-2 sm:p-2.5 shadow-2xl transition-all duration-500 group-hover:rotate-45 ${
                          isCurrentlySealed
                            ? 'bg-gradient-to-tr from-[#30245B] via-[#6555B8] to-[#82D9F2] text-white shadow-[#6555B8]/50'
                            : 'bg-gradient-to-tr from-[#BE123C] to-[#E11D48] text-white animate-bounce'
                        }`}
                      >
                        {isCurrentlySealed ? (
                          <Lock className="w-full h-full" />
                        ) : (
                          <Unlock className="w-full h-full" />
                        )}
                      </div>

                      <span className="font-cinematic text-[10px] sm:text-[11px] tracking-widest uppercase font-semibold text-white drop-shadow">
                        {isCurrentlySealed ? 'Locked with Key' : 'Portal Breached!'}
                      </span>
                      <span className="font-mono text-[8px] sm:text-[9px] text-[#F2F0F8] drop-shadow bg-black/60 px-2 sm:px-2.5 py-0.5 rounded border border-white/10">
                        Click to {isCurrentlySealed ? 'Unseal' : 'Lock'}
                      </span>
                    </div>
                  </div>

                  {/* Door Status Footnote */}
                  <div className="relative z-10 w-full py-0.5 sm:py-1 bg-black/80 text-center rounded-b-sm">
                    <span
                      className={`text-[8px] sm:text-[9px] font-mono font-bold tracking-wider ${
                        isCurrentlySealed ? 'text-emerald-400' : 'text-rose-400 animate-pulse'
                      }`}
                    >
                      {isCurrentlySealed ? '● KANAME-ISHI SET' : '▲ MIMIZU ESCAPING ▲'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Door Lore & Environmental Profile */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    isCurrentlySealed
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                  }`}
                >
                  {isCurrentlySealed ? <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                  <span>{isCurrentlySealed ? 'SEALED' : 'ALERT: SEISMIC'}</span>
                </span>

                <div className="flex items-center gap-1 text-[10px] sm:text-xs text-[#82D9F2] font-mono">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F5A66D]" />
                  <span>{activeDoor.coordinates}</span>
                </div>
              </div>

              <div>
                <h3 className="heading-section text-white font-bold tracking-wide">
                  {activeDoor.name}
                </h3>
                <p className="font-japanese text-lg sm:text-xl text-[#F5A66D] tracking-widest mt-1">
                  {activeDoor.japaneseName}
                </p>
                <p className="text-[10px] sm:text-xs font-sans text-[#82D9F2] mt-1">
                  Location: {activeDoor.location}
                </p>
              </div>

              {/* Environmental Setting */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#080D1C]/90 border border-[#6555B8]/25 space-y-1">
                <span className="font-cinematic text-[10px] sm:text-[11px] uppercase tracking-widest text-[#F5A66D] font-semibold block">
                  Forgotten Environment
                </span>
                <p className="text-[10px] sm:text-sm text-[#F2F0F8]/90 font-sans leading-relaxed">
                  {activeDoor.environment}
                </p>
              </div>

              {/* Memory Lore */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#080D1C]/90 border border-[#6555B8]/25 space-y-1">
                <span className="font-cinematic text-[10px] sm:text-[11px] uppercase tracking-widest text-[#82D9F2] font-semibold block">
                  Echoes of the Past
                </span>
                <p className="text-[10px] sm:text-sm text-[#F2F0F8]/90 font-sans leading-relaxed">
                  {activeDoor.lore}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-1 sm:pt-2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => toggleDoorSeal(activeDoor.id)}
                  className={`px-5 sm:px-6 py-2.5 rounded-full font-cinematic text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shadow-lg cursor-pointer ${
                    isCurrentlySealed
                      ? 'bg-[#30245B] hover:bg-[#6555B8] text-[#F2F0F8] border border-[#6555B8]/50 shadow-[#6555B8]/20'
                      : 'bg-gradient-to-r from-[#D97706] to-[#F5A66D] text-[#080D1C] font-bold shadow-[#F5A66D]/30'
                  }`}
                >
                  <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{isCurrentlySealed ? 'Unseal Portal' : 'Lock Door'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Five Doors Grid Navigation with Authentic Thumbnails */}
        <div className="doors-grid-container grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {MYSTERIOUS_DOORS.map((door, idx) => {
            const isSelected = door.id === activeDoorId;
            const isSealed = doorStates[door.id] ?? true;
            return (
              <div
                key={door.id}
                onClick={() => setActiveDoorId(door.id)}
                className={`door-item-card group relative p-3 sm:p-4 rounded-xl sm:rounded-2xl glass-panel border cursor-pointer transition-all duration-300 hover:-translate-y-1.5 overflow-hidden ${
                  isSelected
                    ? 'border-[#F5A66D] shadow-[0_0_25px_rgba(245,166,109,0.3)] bg-[#111B35]'
                    : 'border-[#6555B8]/25 hover:border-[#82D9F2]/50 bg-[#080D1C]/80'
                }`}
              >
                {/* Thumbnail Background Image */}
                <div className="relative aspect-[16/10] w-full rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-3 border border-white/10">
                  <img
                    src={door.image}
                    alt={door.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = getAssetUrl('/images/doors/mysterious_door.jpg');
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-[0.82]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080D1C] via-transparent to-transparent" />
                  <span
                    className={`absolute top-1.5 right-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                      isSealed ? 'bg-emerald-400' : 'bg-rose-500 animate-ping'
                    }`}
                  />
                  <span className="absolute bottom-1 left-1.5 font-mono text-[9px] sm:text-[10px] text-[#82D9F2] drop-shadow">
                    DOOR 0{idx + 1}
                  </span>
                </div>

                <h4 className="font-cinematic text-[10px] sm:text-xs font-bold text-white line-clamp-1 group-hover:text-[#F5A66D] transition-colors">
                  {door.name.replace(' Door', '')}
                </h4>
                <p className="font-japanese text-[9px] sm:text-[10px] text-[#82D9F2]/80 mt-0.5 line-clamp-1">
                  {door.japaneseName}
                </p>
                <div className="mt-1 text-[9px] sm:text-[10px] font-mono text-[#F5A66D] truncate">
                  {door.location}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default DoorsSection;
