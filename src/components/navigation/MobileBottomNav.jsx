import { useState, useEffect } from 'react';
import { Home, BookOpen, Users, Key, Image, Sparkles } from 'lucide-react';
import { useLenis } from '../../hooks/useLenis';

export function MobileBottomNav() {
  const [activeTab, setActiveTab] = useState('hero');
  const { scrollTo } = useLenis();

  const navTabs = [
    { id: 'hero', label: 'Home', href: '#hero', icon: Home },
    { id: 'story', label: 'Story', href: '#story', icon: BookOpen },
    { id: 'characters', label: 'Cast', href: '#characters', icon: Users },
    { id: 'doors', label: 'Doors', href: '#doors', icon: Key },
    { id: 'gallery', label: 'Gallery', href: '#gallery', icon: Image },
    { id: 'details', label: 'About', href: '#details', icon: Sparkles },
  ];

  useEffect(() => {
    const sectionMap = [
      { id: 'hero', target: 'hero' },
      { id: 'intro', target: 'hero' },
      { id: 'story', target: 'story' },
      { id: 'characters', target: 'characters' },
      { id: 'doors', target: 'doors' },
      { id: 'gallery', target: 'gallery' },
      { id: 'details', target: 'details' },
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = sectionMap.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionMap[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveTab(sectionMap[i].target);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (e, href, id) => {
    e.preventDefault();
    setActiveTab(id);
    if (scrollTo) {
      scrollTo(href, { duration: 1.2, offset: -20 });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#080D1C]/92 backdrop-blur-2xl border-t border-[#6555B8]/30 shadow-[0_-8px_30px_rgba(8,13,28,0.95)] px-1 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] animate-slide-up-nav"
    >
      <div className="flex items-center justify-around">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <a
              key={tab.id}
              href={tab.href}
              onClick={(e) => handleTabClick(e, tab.href, tab.id)}
              className="group flex flex-col items-center justify-center relative py-2 px-1.5 min-w-[3rem] rounded-xl transition-all duration-300 cursor-pointer select-none"
            >
              {/* Active Tab Glowing Indicator */}
              {isActive && (
                <>
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-gradient-to-r from-[#82D9F2] via-[#F5A66D] to-[#82D9F2] shadow-[0_0_8px_#F5A66D]" />
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-t from-[#6555B8]/20 via-[#F5A66D]/10 to-transparent pointer-events-none" />
                </>
              )}

              <Icon
                className={`w-5 h-5 transition-all duration-300 ${
                  isActive
                    ? 'text-[#F5A66D] drop-shadow-[0_0_8px_rgba(245,166,109,0.7)] scale-110'
                    : 'text-[#F2F0F8]/50 group-hover:text-white'
                }`}
              />

              <span
                className={`text-[10px] font-cinematic uppercase tracking-wider mt-1 truncate max-w-full transition-colors duration-300 ${
                  isActive
                    ? 'text-[#F5A66D] font-bold'
                    : 'text-[#F2F0F8]/50 group-hover:text-white font-medium'
                }`}
              >
                {tab.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileBottomNav;
