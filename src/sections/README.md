# Suzume Cinematic Sections Blueprint

This directory is prepared for modular website sections. Each section will be plugged into `App.jsx` during subsequent feature development.

## Architecture Guidelines
- Each section should be a self-contained component in its own directory or file.
- Register section-specific GSAP ScrollTriggers using the `useGSAP` hook with `scopeRef` to ensure automatic lifecycle cleanup.
- Leverage Lenis smooth scrolling via `useLenis()` for chapter-to-chapter smooth navigation.
- Use the shared design system tokens from `@theme` and `variables.css`.

## Planned Sections Roadmap:

1. **`01-Hero`**:
   - Celestial starlight backdrop / Tokoyo atmosphere
   - Cinematic Freestanding Door Portal Artwork
   - Title display with Makoto Shinkai typography and Japanese kanji badge
   - Audio ambient toggle (RADWIMPS theme)

2. **`02-Journey`**:
   - Interactive map across Kyushu, Shikoku, Kobe, Tokyo, and Tohoku
   - The abandoned ruins (温泉街, 廃校, 遊園地)
   - Scroll-driven story timeline

3. **`03-Characters`**:
   - Suzume Iwato (岩戸 鈴芽)
   - Souta Munakata (宗像 草太) & Souta's Chair (3-legged canary chair)
   - Daijin (ダイジン - Right Keystone) & Sadaijin (サダイジン - Left Keystone)
   - Tamaki Iwato & Serizawa

4. **`04-InteractiveDoor`**:
   - Canvas/Three.js interactive experience where user turns the golden key to seal the portal
   - Mimizu Calamity crimson vortex vs. Tokoyo starry celestial realm

5. **`05-Soundscape`**:
   - RADWIMPS & Kazuma Jinnouchi musical score
   - "Suzume feat. Toaka" & "Kanata Haluka"
   - Waveform / vinyl visualizer

6. **`06-Footer`**:
   - Makoto Shinkai Filmography tribute (Your Name, Weathering With You, Suzume)
   - CoMix Wave Films credits & copyright
