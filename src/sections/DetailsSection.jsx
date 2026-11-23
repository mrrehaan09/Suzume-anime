import { useState, useRef } from 'react';
import { Play, Music, Award, ExternalLink, Disc } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';
import { gsap } from '../lib/gsap';
import { VOICE_CAST, SOUNDTRACK_TRACKS, MOVIE_DATA, getAssetUrl } from '../data/suzumeData';
import SectionHeader from '../components/common/SectionHeader';

export function DetailsSection() {
  const containerRef = useRef(null);
  const [trailerPlaying, setTrailerPlaying] = useState(false);

  // Official theatrical trailer ID
  const trailerYoutubeId = '1K_b7Y3f8dE';
  const trailerEmbedUrl = `https://www.youtube.com/embed/${trailerYoutubeId}?autoplay=1&rel=0`;

  useGSAP(() => {
    gsap.from('.details-block', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      opacity: 0,
      y: 30,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, [], containerRef);

  return (
    <section
      id="details"
      ref={containerRef}
      className="relative z-0 w-full py-14 sm:py-20 lg:py-24 bg-[#080D1C]/40 backdrop-blur-sm border-t border-[#6555B8]/20 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -right-36 w-[600px] h-[600px] bg-[#30245B]/25 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 -left-36 w-[600px] h-[600px] bg-[#82D9F2]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#6555B8]/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#82D9F2_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.02]" />
      </div>

      <div className="cinematic-container relative z-10 space-y-8 sm:space-y-14">
        {/* Section Header */}
        <SectionHeader
          chapter="Archive 06"
          japaneseTag="制作記録"
          title="Production, Music & Cast"
          subtitle="A comprehensive exploration of the artistry, symphonic score, stellar voice performances, and critical acclaim behind Suzume."
          align="center"
        />

        {/* 1. Official Theatrical Trailer Feature */}
        <div className="details-block rounded-2xl sm:rounded-3xl overflow-hidden glass-panel border border-[#6555B8]/35 shadow-2xl p-4 sm:p-8 lg:p-10 bg-[#111B35]/90">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <span className="eyebrow-tag text-[#F5A66D]">Official Media</span>
              <h3 className="heading-subsection text-white mt-1">
                Theatrical Trailer Premiere
              </h3>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${trailerYoutubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#6555B8]/30 text-[10px] sm:text-xs font-cinematic text-[#82D9F2] transition-colors self-start"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </a>
          </div>

          {/* Video Player Box */}
          <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black/80 border border-white/10 shadow-2xl">
            {trailerPlaying ? (
              <iframe
                src={trailerEmbedUrl}
                title="Suzume — Official Theatrical Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div
                onClick={() => setTrailerPlaying(true)}
                className="group relative w-full h-full flex flex-col items-center justify-center p-6 sm:p-8 text-center cursor-pointer overflow-hidden"
              >
                {/* Background Image Preview */}
                <img
                  src={MOVIE_DATA.heroLandscape}
                  alt="Suzume Theatrical Trailer"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = getAssetUrl('/images/doors/mysterious_door.jpg');
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-108 filter brightness-[0.72]"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080D1C] via-[#111B35]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#30245B]/40 via-[#F5A66D]/20 to-[#82D9F2]/30 mix-blend-screen opacity-70" />

                {/* Big Play Button */}
                <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#30245B] via-[#6555B8] to-[#F5A66D] p-1 shadow-[0_0_40px_rgba(245,166,109,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(245,166,109,0.8)] transition-all duration-300">
                  <div className="w-full h-full rounded-full bg-[#080D1C] flex items-center justify-center pl-1">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-[#F5A66D] fill-[#F5A66D]" />
                  </div>
                </div>

                <div className="relative z-10 mt-4 sm:mt-6 space-y-1">
                  <h4 className="font-cinematic text-sm sm:text-xl font-bold text-white tracking-widest uppercase drop-shadow">
                    Play Trailer
                  </h4>
                  <p className="font-japanese text-[10px] sm:text-xs text-[#82D9F2] drop-shadow">
                    東宝映画『すずめの戸締まり』本予告映像
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. Soundtrack & Symphonic Score Showcase */}
        <div className="details-block grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="eyebrow-tag text-[#82D9F2]">Symphonic Alchemy</span>
            <h3 className="heading-subsection text-white">
              RADWIMPS × Kazuma Jinnouchi
            </h3>
            <p className="text-xs sm:text-sm text-[#F2F0F8]/90 font-sans leading-relaxed">
              Marking their third monumental collaboration following <em>Your Name</em> and <em>Weathering With You</em>, Makoto Shinkai united legendary rock band RADWIMPS with Hollywood-trained composer Kazuma Jinnouchi to produce a hybrid orchestral soundscape featuring traditional gagaku winds, choir chants, and haunting whistling vocals by Toaka (十明).
            </p>

            <div className="p-3 sm:p-4 rounded-xl bg-[#080D1C]/90 border border-[#6555B8]/25 space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#F5A66D]">
                <Disc className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Original Soundtrack Accolades</span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#F2F0F8]/75 leading-relaxed">
                Winner of the <strong>46th Japan Academy Film Prize</strong> for Outstanding Achievement in Music (2023).
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xl sm:rounded-2xl glass-panel border border-[#6555B8]/30 p-4 sm:p-6 bg-[#111B35]/90">
              <h4 className="font-cinematic text-[10px] sm:text-xs uppercase tracking-widest text-[#F5A66D] font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Featured OST Tracks</span>
              </h4>

              <div className="space-y-2 sm:space-y-3">
                {SOUNDTRACK_TRACKS.map((track) => (
                  <div
                    key={track.number}
                    className="p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl bg-[#080D1C]/80 border border-[#6555B8]/20 hover:border-[#82D9F2]/40 transition-colors flex items-center justify-between gap-3 sm:gap-4"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <span className="font-mono text-[10px] sm:text-xs font-bold text-[#F5A66D] shrink-0">
                        {track.number}
                      </span>
                      <div className="min-w-0">
                        <div className="font-cinematic text-xs sm:text-sm font-semibold text-white truncate">
                          {track.title}
                        </div>
                        <div className="text-[9px] sm:text-[11px] text-[#F2F0F8]/70 truncate">
                          {track.artist} • <span className="italic text-[#82D9F2]">{track.highlight}</span>
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] sm:text-xs text-[#82D9F2]/70 shrink-0">
                      {track.length}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Full Voice Cast Table (Japanese & English Dub) */}
        <div className="details-block space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
            <div>
              <span className="eyebrow-tag text-[#F5A66D]">The Ensemble</span>
              <h3 className="heading-subsection text-white mt-1">
                Original & International Voice Cast
              </h3>
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-[#82D9F2]/80">
              Verified Cast Records
            </span>
          </div>

          <div className="rounded-xl sm:rounded-2xl overflow-hidden glass-panel border border-[#6555B8]/30 bg-[#111B35]/90">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px] sm:text-sm">
                <thead className="bg-[#080D1C] border-b border-[#6555B8]/20 text-[#82D9F2] font-cinematic uppercase tracking-wider text-[9px] sm:text-[11px]">
                  <tr>
                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-6">Character</th>
                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-6">Japanese Cast</th>
                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-6">English Dub</th>
                    <th className="py-2.5 sm:py-3.5 px-3 sm:px-6 hidden md:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#6555B8]/15 font-sans">
                  {VOICE_CAST.map((cast, index) => (
                    <tr
                      key={index}
                      className="hover:bg-white/[0.03] transition-colors text-slate-200"
                    >
                      <td className="py-2.5 sm:py-3.5 px-3 sm:px-6 font-cinematic font-bold text-[#F5A66D] whitespace-nowrap">
                        {cast.role}
                      </td>
                      <td className="py-2.5 sm:py-3.5 px-3 sm:px-6 font-medium text-white whitespace-nowrap">
                        {cast.actorJP}
                      </td>
                      <td className="py-2.5 sm:py-3.5 px-3 sm:px-6 text-[#82D9F2] whitespace-nowrap">
                        {cast.actorEN}
                      </td>
                      <td className="py-2.5 sm:py-3.5 px-3 sm:px-6 text-[10px] sm:text-xs text-[#F2F0F8]/70 hidden md:table-cell font-sans">
                        {cast.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 4. Awards & Critical Accolades Row */}
        <div className="details-block grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-2 sm:pt-4">
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl glass-panel border border-[#F5A66D]/40 bg-[#111B35]/90 space-y-2">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#F5A66D]" />
            <h5 className="font-cinematic text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              Berlin Int. Film Festival
            </h5>
            <p className="text-[10px] sm:text-xs text-[#F2F0F8]/80 font-sans leading-relaxed">
              Nominated for the prestigious <strong>Golden Bear</strong> (73rd Berlinale, 2023)—the first Japanese anime film in Competition in over two decades.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl glass-panel border border-[#82D9F2]/40 bg-[#111B35]/90 space-y-2">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#82D9F2]" />
            <h5 className="font-cinematic text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              Japan Academy Film Prize
            </h5>
            <p className="text-[10px] sm:text-xs text-[#F2F0F8]/80 font-sans leading-relaxed">
              Awarded <strong>Outstanding Achievement in Music</strong> to RADWIMPS and Kazuma Jinnouchi, plus nominated for Animation of the Year.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl glass-panel border border-[#6555B8]/40 bg-[#111B35]/90 space-y-2">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#6555B8]" />
            <h5 className="font-cinematic text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
              Annie Awards & Global Box Office
            </h5>
            <p className="text-[10px] sm:text-xs text-[#F2F0F8]/80 font-sans leading-relaxed">
              7 Annie Award Nominations; grossed over <strong>$320 Million</strong> worldwide, becoming one of the top 4 highest-earning anime films.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailsSection;
