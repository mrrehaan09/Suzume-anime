import { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';
import { useLenis } from '../../hooks/useLenis';
import AudioPlayer from '../common/AudioPlayer';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Prologue', href: '#intro', japanese: '序幕' },
    { name: 'Story', href: '#story', japanese: '物語' },
    { name: 'Characters', href: '#characters', japanese: '人物' },
    { name: 'Doors', href: '#doors', japanese: '扉' },
    { name: 'Gallery', href: '#gallery', japanese: '画集' },
    { name: 'Details', href: '#details', japanese: '詳細' },
  ];

  const handleNavClick = (href) => {
    if (scrollTo) {
      scrollTo(href, { duration: 1.2, offset: -30 });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#080D1C]/90 backdrop-blur-2xl border-b border-[#6555B8]/20 shadow-[0_10px_30px_rgba(8,13,28,0.8)] py-2.5 sm:py-3'
          : 'bg-gradient-to-b from-[#080D1C]/95 via-[#080D1C]/60 to-transparent py-3 sm:py-4 md:py-5'
      }`}
    >
      <div className="cinematic-container flex items-center justify-between">
        {/* Logo Brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="group flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none"
        >
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#6555B8] via-[#F5A66D] to-[#82D9F2] p-0.5 shadow-[0_0_18px_rgba(101,85,184,0.6)] group-hover:shadow-[0_0_24px_rgba(245,166,109,0.8)] transition-all duration-300">
            <div className="w-full h-full rounded-full bg-[#080D1C] flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5A66D] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_#F5A66D]" />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-cinematic text-lg sm:text-xl font-bold tracking-[0.2em] text-[#F2F0F8] group-hover:text-[#F5A66D] transition-colors">
              SUZUME
            </span>
            <span className="font-japanese text-[10px] tracking-widest text-[#82D9F2]/80 group-hover:text-[#82D9F2] transition-colors -mt-1">
              すずめの戸締まり
            </span>
          </div>
        </a>

        {/* Desktop Nav Items (visible on md screens and above, hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="group relative py-1 font-cinematic text-xs tracking-[0.2em] uppercase text-[#F2F0F8]/80 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>{link.name}</span>
              <span className="font-japanese text-[10px] text-[#82D9F2]/60 group-hover:text-[#F5A66D] transition-colors">
                {link.japanese}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#82D9F2] via-[#6555B8] to-[#F5A66D] group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          ))}
        </nav>

        {/* Controls: Audio Player & Quick Explore Journey CTA */}
        <div className="flex items-center gap-3">
          <AudioPlayer />

          <button
            type="button"
            onClick={() => handleNavClick('#story')}
            aria-label="Explore Story"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#30245B] to-[#111B35] hover:from-[#6555B8]/40 hover:to-[#F5A66D]/30 border border-[#6555B8]/40 hover:border-[#82D9F2]/60 text-xs font-cinematic text-[#F2F0F8] hover:text-white transition-all shadow-md group cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#F5A66D] group-hover:rotate-45 transition-transform" />
            <span className="tracking-wider">Journey</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
