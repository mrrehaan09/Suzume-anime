import { lazy, Suspense } from 'react';
import SmoothScrollProvider from './components/providers/SmoothScrollProvider';
import SkyCanvas from './components/canvas/SkyCanvas';
import Navbar from './components/navigation/Navbar';
import MobileBottomNav from './components/navigation/MobileBottomNav';
import Footer from './components/navigation/Footer';
import HeroSection from './sections/HeroSection';
import IntroSection from './sections/IntroSection';
import SectionSkeleton from './components/common/SectionSkeleton';

// Code-split below-the-fold sections with React.lazy
const StorySection = lazy(() => import('./sections/StorySection'));
const CharactersSection = lazy(() => import('./sections/CharactersSection'));
const DoorsSection = lazy(() => import('./sections/DoorsSection'));
const GallerySection = lazy(() => import('./sections/GallerySection'));
const DetailsSection = lazy(() => import('./sections/DetailsSection'));

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#080D1C] text-[#F2F0F8] overflow-x-hidden selection:bg-[#6555B8]/40 selection:text-white pb-16 md:pb-0">
        {/* Falling Stars, Shooting Stars & Cosmic Ambient Canvas */}
        <SkyCanvas />

        {/* Cinematic Vignette Framing Overlay */}
        <div className="vignette-overlay" />

        {/* Global Navigation Bar (Desktop top nav, Mobile branding header) */}
        <Navbar />

        {/* Fixed Mobile Bottom Navigation Bar (< md) */}
        <MobileBottomNav />

        {/* Main Content Sections Flow with Balanced Spacing */}
        <main className="relative z-0 flex flex-col w-full">
          {/* Critical Above-the-fold Sections */}
          <HeroSection />
          <IntroSection />

          {/* Below-the-fold Sections */}
          <Suspense fallback={<SectionSkeleton minHeight="min-h-[480px]" />}>
            <StorySection />
          </Suspense>

          <Suspense fallback={<SectionSkeleton minHeight="min-h-[480px]" />}>
            <CharactersSection />
          </Suspense>

          <Suspense fallback={<SectionSkeleton minHeight="min-h-[480px]" />}>
            <DoorsSection />
          </Suspense>

          <Suspense fallback={<SectionSkeleton minHeight="min-h-[480px]" />}>
            <GallerySection />
          </Suspense>

          <Suspense fallback={<SectionSkeleton minHeight="min-h-[480px]" />}>
            <DetailsSection />
          </Suspense>
        </main>

        {/* Cinematic Footer */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
