import { ArrowUp, Sparkles } from 'lucide-react';
import { useLenis } from '../../hooks/useLenis';
import { MOVIE_DATA } from '../../data/suzumeData';

export function Footer() {
  const { scrollTo } = useLenis();

  const handleBackToTop = () => {
    if (scrollTo) {
      scrollTo('#hero', { duration: 1.6 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-0 w-full bg-[#080D1C]/60 backdrop-blur-sm border-t border-[#6555B8]/20 pt-16 sm:pt-20 pb-24 md:pb-12 overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-[#82D9F2]/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#30245B]/25 blur-3xl" />
      </div>

      <div className="cinematic-container relative z-10">
        {/* Top Tribute Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-12 sm:pb-16 border-b border-[#6555B8]/15">
          {/* Brand & Japanese Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#F5A66D] shadow-[0_0_12px_rgba(245,166,109,0.9)]" />
              <span className="font-cinematic text-2xl font-bold tracking-[0.2em] text-[#F2F0F8]">
                SUZUME
              </span>
              <span className="font-japanese text-sm text-[#82D9F2] border-l border-[#6555B8]/30 pl-3">
                すずめの戸締まり
              </span>
            </div>

            <p className="font-japanese text-base text-[#F5A66D] tracking-widest leading-relaxed">
              {MOVIE_DATA.japaneseTagline}
            </p>

            <p className="text-xs text-[#F2F0F8]/75 max-w-sm leading-relaxed font-sans">
              An interactive cinematic tribute to Makoto Shinkai’s monumental film exploring memory, resilience, the scars of disaster, and the warmth of human connection.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-cinematic text-xs tracking-[0.25em] text-[#F2F0F8] uppercase font-semibold">
              Chapters & Index
            </h5>
            <ul className="space-y-2 text-xs font-cinematic tracking-wider text-[#82D9F2]/80">
              <li>
                <a href="#intro" className="hover:text-[#F5A66D] transition-colors">
                  01. Synopsis & Prologue
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#F5A66D] transition-colors">
                  02. Six Story Chapters
                </a>
              </li>
              <li>
                <a href="#characters" className="hover:text-[#F5A66D] transition-colors">
                  03. Character Universe
                </a>
              </li>
              <li>
                <a href="#doors" className="hover:text-[#F5A66D] transition-colors">
                  04. The Five Portals
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#F5A66D] transition-colors">
                  05. Cinematic Gallery
                </a>
              </li>
              <li>
                <a href="#details" className="hover:text-[#F5A66D] transition-colors">
                  06. Production & Soundtrack
                </a>
              </li>
            </ul>
          </div>

          {/* Film Partners & Back to Top */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h5 className="font-cinematic text-xs tracking-[0.25em] text-[#F2F0F8] uppercase font-semibold mb-3">
                Production Partners
              </h5>
              <p className="text-xs text-[#F2F0F8]/70 font-sans leading-relaxed">
                CoMix Wave Films • STORY inc. • TOHO Co., Ltd. • Voque Ting • RADWIMPS • Sony Pictures / Crunchyroll
              </p>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={handleBackToTop}
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#111B35] hover:bg-[#30245B] border border-[#6555B8]/40 hover:border-[#F5A66D]/60 text-xs font-cinematic text-[#F2F0F8] transition-all cursor-pointer shadow-lg hover:shadow-[#F5A66D]/20"
              >
                <span>Return to the Clouds</span>
                <ArrowUp className="w-3.5 h-3.5 text-[#F5A66D] group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#F2F0F8]/60 font-mono">
          <div className="text-center sm:text-left">
            <p>
              © 2022 “Suzume” Film Partners. All visual imagery & trademarks belong to their respective copyright holders.
            </p>
            <p className="text-[10px] text-[#F2F0F8]/45 mt-0.5">
              Non-commercial fan-created interactive web celebration. Built with React 19, Vite 8, Tailwind CSS & GSAP.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[#F5A66D]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-cinematic text-[10px] tracking-wider uppercase">
              Beyond the Door
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
