import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, MapPin } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';
import { gsap } from '../lib/gsap';
import { GALLERY_ITEMS, getAssetUrl } from '../data/suzumeData';
import SectionHeader from '../components/common/SectionHeader';

export function GallerySection() {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = [
    { id: 'all', label: 'All Frames', japanese: 'すべて' },
    { id: 'skies', label: 'Skies & Clouds', japanese: '青空と雲' },
    { id: 'doors', label: 'Doors & Ruins', japanese: '扉と廃墟' },
    { id: 'journey', label: 'Journeys', japanese: '旅と風景' },
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  useGSAP(() => {
    gsap.from('.gallery-grid-item', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      opacity: 0,
      scale: 0.95,
      y: 20,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, [activeCategory], containerRef);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative z-0 w-full py-14 sm:py-20 lg:py-24 bg-[#080D1C]/40 backdrop-blur-sm border-t border-[#6555B8]/20 overflow-hidden"
    >
      {/* Background Ambient Overlays */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 -left-40 w-[600px] h-[600px] bg-[#30245B]/20 rounded-full blur-[140px]" />
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-[#82D9F2]/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#82D9F2_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.02]" />
      </div>

      <div className="cinematic-container relative z-10">
        {/* Section Header */}
        <SectionHeader
          chapter="Visions 05"
          japaneseTag="美術画集"
          title="The Makoto Shinkai Canvas"
          subtitle="Explore the luminescent skies, overgrown ruins, and emotional intimacy rendered by the master artists of CoMix Wave Films."
          align="center"
        />

        {/* Category Filters - scrollable on mobile */}
        <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap items-center justify-start sm:justify-center gap-2 sm:gap-3 mb-6 sm:mb-10 -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-hide">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-cinematic uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#F5A66D] via-[#6555B8] to-[#82D9F2] text-white font-bold shadow-lg shadow-[#6555B8]/30 scale-105'
                    : 'bg-[#111B35]/80 text-[#F2F0F8]/70 border border-[#6555B8]/25 hover:text-white hover:border-[#82D9F2]/50 hover:bg-[#30245B]/50'
                }`}
              >
                <span>{cat.label}</span>
                <span className="font-japanese text-[10px] sm:text-[11px] opacity-75 hidden sm:inline">
                  {cat.japanese}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid - 2 columns on mobile, 2 on sm, 4 on lg */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="gallery-grid-item group relative rounded-xl sm:rounded-2xl overflow-hidden glass-panel border border-[#6555B8]/30 bg-[#111B35]/80 shadow-xl cursor-pointer transition-all duration-500 hover:border-[#F5A66D]/70 hover:shadow-[0_0_35px_rgba(245,166,109,0.3)] hover:-translate-y-1.5"
            >
              {/* Image Frame Container */}
              <div
                className={`w-full ${item.aspect} relative overflow-hidden flex flex-col justify-between p-3 sm:p-5`}
              >
                {/* High-Resolution Artwork Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = getAssetUrl('/images/doors/mysterious_door.jpg');
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 filter brightness-[0.88]"
                />

                {/* Cinematic Twilight Gradients Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080D1C] via-transparent to-[#080D1C]/40" />

                {/* Top Location Pill */}
                <div className="relative z-10 flex items-center justify-between text-[9px] sm:text-xs text-[#F2F0F8] font-mono">
                  <span className="hidden sm:flex items-center gap-1.5 bg-[#080D1C]/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-sm border border-[#6555B8]/30 drop-shadow">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#F5A66D]" />
                    <span>{item.location}</span>
                  </span>
                  <span className="bg-[#080D1C]/80 p-1 sm:p-1.5 rounded-full text-white/90 group-hover:text-[#F5A66D] group-hover:scale-110 transition-all border border-[#6555B8]/30 drop-shadow ml-auto">
                    <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </span>
                </div>

                {/* Center Japanese Calligraphy Silhouette */}
                <div className="relative z-10 text-center my-auto opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none hidden sm:block">
                  <span className="font-japanese text-4xl sm:text-6xl text-white font-bold select-none drop-shadow-xl">
                    {item.japanese.slice(0, 3)}
                  </span>
                </div>

                {/* Bottom Frame Details */}
                <div className="relative z-10 pt-2 sm:pt-4 bg-gradient-to-t from-[#080D1C] via-[#080D1C]/80 to-transparent -mx-3 sm:-mx-5 -mb-3 sm:-mb-5 p-3 sm:p-5">
                  <h4 className="font-cinematic text-[10px] sm:text-sm font-bold text-white tracking-wide group-hover:text-[#F5A66D] transition-colors drop-shadow line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="font-japanese text-[9px] sm:text-[11px] text-[#82D9F2] mt-0.5 drop-shadow line-clamp-1">
                    {item.japanese}
                  </p>
                  <p className="text-[9px] sm:text-[11px] text-[#F2F0F8]/75 mt-0.5 sm:mt-1 font-sans line-clamp-1 sm:line-clamp-2 hidden sm:block">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-8 bg-black/95 backdrop-blur-2xl animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Prevent outer click closing when clicking inside */}
          <div
            className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl overflow-hidden glass-panel border border-[#6555B8]/40 shadow-2xl bg-[#080D1C] flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-[#111B35] border-b border-[#6555B8]/20">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] sm:text-xs text-[#F5A66D]">
                  FRAME {lightboxIndex + 1} OF {filteredItems.length}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600 hidden sm:block" />
                <span className="font-cinematic text-[10px] sm:text-xs text-[#82D9F2] uppercase hidden sm:block">
                  {activeItem.category}
                </span>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
                  }
                  className="p-1.5 rounded-lg text-[#F2F0F8]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Previous image (Left Arrow)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((prev) => (prev + 1) % filteredItems.length)
                  }
                  className="p-1.5 rounded-lg text-[#F2F0F8]/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Next image (Right Arrow)"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="p-1.5 rounded-lg text-[#F2F0F8]/70 hover:text-rose-400 hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close (Escape)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox High-Res Image Display */}
            <div className="relative w-full max-h-[55vh] sm:max-h-[65vh] overflow-hidden flex items-center justify-center bg-black">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                onError={(e) => {
                  e.currentTarget.src = getAssetUrl('/images/doors/mysterious_door.jpg');
                }}
                className="w-full h-full max-h-[55vh] sm:max-h-[65vh] object-contain"
              />
            </div>

            {/* Lightbox Footer Info */}
            <div className="p-4 sm:p-6 bg-[#111B35] border-t border-[#6555B8]/20 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-cinematic text-sm sm:text-lg font-bold text-white tracking-wide truncate">
                    {activeItem.title}
                  </h3>
                  <p className="font-japanese text-[10px] sm:text-xs text-[#F5A66D]">
                    {activeItem.japanese}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#82D9F2] font-mono bg-[#080D1C] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#6555B8]/30 shrink-0">
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F5A66D]" />
                  <span className="hidden sm:inline">{activeItem.location}</span>
                  <span className="sm:hidden">{activeItem.location.split(',')[0]}</span>
                </div>
              </div>
              <p className="text-[10px] sm:text-sm text-[#F2F0F8]/90 font-sans leading-relaxed line-clamp-2 sm:line-clamp-none">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GallerySection;
