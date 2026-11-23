import { useEffect, useRef } from 'react';

/**
 * SkyCanvas — Midnight Cosmic & Falling Stars
 * - Continuous animated shower of falling glowing stars drifting from top to bottom
 * - Realistic speeds, varying sizes, multi-hued Suzume color palette
 * - Trailing stardust streaks making downward motion clearly visible
 * - Occasional dramatic shooting stars (meteors) streaking diagonally across the screen
 * - Gentle twinkling and shimmering pulsation
 * - Continuous regeneration when leaving viewport
 * - Lightweight 60fps canvas with delta-time animation
 * - Pointer-events: none (zero interaction blocking)
 * - Accessibility: respects prefers-reduced-motion
 */
export function SkyCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check accessibility prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;

    // Suzume Palette: Pure Starlight White, Sky Cyan, Sunset Orange, Radiant Amber
    const STAR_COLORS = [
      { r: 255, g: 255, b: 255, name: 'white' },
      { r: 130, g: 217, b: 242, name: 'cyan' },
      { r: 245, g: 166, b: 109, name: 'sunset' },
      { r: 254, g: 240, b: 138, name: 'gold' },
      { r: 196, g: 181, b: 253, name: 'tokoyo' },
    ];

    // ==========================================
    // 1. FALLING STARS POOL
    // ==========================================
    // Sufficient density to be clearly seen across mobile and desktop
    const FALLING_COUNT = isMobile ? 55 : 95;
    const fallingStars = [];

    for (let i = 0; i < FALLING_COUNT; i++) {
      const colorObj = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      // Randomize initial spread across the entire screen
      fallingStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // Variety of sizes: mostly 1.0 - 2.2px, occasional 2.6 - 3.4px
        radius: Math.random() < 0.2 ? Math.random() * 1.0 + 2.4 : Math.random() * 1.2 + 0.9,
        color: colorObj,
        baseAlpha: Math.random() * 0.4 + 0.55, // 0.55 - 0.95 (bright and visible!)
        // Downward velocity: 1.2 to 2.8 px/frame (clearly visible motion!)
        speedY: Math.random() * 1.6 + 1.2,
        speedX: (Math.random() - 0.5) * 0.35,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.04 + 0.02,
        trailLength: Math.random() * 8 + 4, // subtle trailing tail for falling motion feel
      });
    }

    // ==========================================
    // 2. AMBIENT TWINKLING BACKGROUND STARS
    // ==========================================
    const TWINKLE_COUNT = isMobile ? 30 : 60;
    const twinkleStars = [];
    for (let i = 0; i < TWINKLE_COUNT; i++) {
      const colorObj = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      twinkleStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.6,
        color: colorObj,
        baseAlpha: Math.random() * 0.4 + 0.35,
        twinkleOffset: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.03 + 0.015,
      });
    }

    // ==========================================
    // 3. SHOOTING STARS (METEORS) POOL
    // ==========================================
    const shootingStars = [];
    let nextShootingStarTime = performance.now() + 1500; // First shooting star appears quickly (1.5s)

    const spawnShootingStar = () => {
      // Diagonal trajectory: 35° to 50° downward
      const angle = (Math.PI / 180) * (Math.random() * 15 + 35);
      const speed = Math.random() * 6 + (isMobile ? 12 : 16);
      const length = Math.random() * 80 + (isMobile ? 80 : 130);

      // Spawn in top-right or top-center region
      const startX = Math.random() * (width * 0.75) + width * 0.25;
      const startY = Math.random() * (height * 0.3);

      const colorObj = Math.random() > 0.45 ? STAR_COLORS[1] : STAR_COLORS[2]; // Cyan or Sunset Gold

      shootingStars.push({
        x: startX,
        y: startY,
        dx: -Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length,
        size: Math.random() * 1.5 + 1.4,
        life: 0,
        maxLife: Math.floor(Math.random() * 20 + 40), // ~40-60 frames
        color: colorObj,
      });
    };

    // If reduced motion is preferred, render single static celestial snapshot
    if (prefersReducedMotion) {
      for (const s of [...fallingStars, ...twinkleStars]) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${s.baseAlpha})`;
        ctx.fill();
      }
      return;
    }

    // Window Resizing
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Page Visibility API Pause
    let isVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let time = 0;
    let lastTime = performance.now();

    const render = (now) => {
      if (!isVisible) return;

      const delta = Math.min(now - lastTime, 40);
      lastTime = now;
      time += delta * 0.001;

      ctx.clearRect(0, 0, width, height);

      // ----------------------------------------------------
      // 1. Draw Ambient Twinkling Stars
      // ----------------------------------------------------
      for (let i = 0; i < twinkleStars.length; i++) {
        const s = twinkleStars[i];
        const alphaMod = Math.sin(time * 3 + s.twinkleOffset) * 0.25;
        const alpha = Math.max(0.15, Math.min(0.95, s.baseAlpha + alphaMod));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${alpha})`;
        ctx.fill();
      }

      // ----------------------------------------------------
      // 2. Update & Draw Gently Falling Glowing Stars
      // ----------------------------------------------------
      for (let i = 0; i < fallingStars.length; i++) {
        const p = fallingStars[i];

        // Downward fall + gentle horizontal drift/sway
        p.y += p.speedY * (delta / 16);
        p.x += (p.speedX + Math.sin(time * 2 + p.swayOffset) * 0.25) * (delta / 16);

        // Continuous Regeneration: Wrap around edges
        if (p.y > height + 20) {
          p.y = -15;
          p.x = Math.random() * width;
          p.speedY = Math.random() * 1.6 + 1.2;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Twinkling brightness pulsation
        const alphaMod = Math.sin(time * 3.5 + p.twinkleOffset) * 0.22;
        const alpha = Math.max(0.3, Math.min(1.0, p.baseAlpha + alphaMod));

        // Draw soft vertical trail streak (makes falling motion distinct & aesthetic)
        const trailY = p.y - p.trailLength * (p.speedY / 2);
        const trailGrad = ctx.createLinearGradient(p.x, trailY, p.x, p.y);
        trailGrad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
        trailGrad.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.75})`);

        ctx.beginPath();
        ctx.moveTo(p.x, trailY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = Math.max(1, p.radius * 0.85);
        ctx.stroke();

        // Draw glowing star head
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;

        // Glow halo for medium/larger stars
        if (p.radius > 1.8) {
          ctx.shadowBlur = p.radius * 4;
          ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.8)`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ----------------------------------------------------
      // 3. Spawn & Draw Shooting Stars (Meteors)
      // ----------------------------------------------------
      if (now > nextShootingStarTime) {
        if (shootingStars.length < 2) {
          spawnShootingStar();
        }
        // Random intervals between 3.0s and 6.0s
        nextShootingStarTime = now + Math.random() * 3000 + 3000;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const m = shootingStars[i];
        m.life += 1;

        const progress = m.life / m.maxLife;
        let alpha = 1.0;
        if (progress < 0.15) {
          alpha = progress / 0.15;
        } else if (progress > 0.6) {
          alpha = (1.0 - progress) / 0.4;
        }

        // Tail vector calculation
        const hyp = Math.hypot(m.dx, m.dy);
        const tailX = m.x - (m.dx / hyp) * m.length;
        const tailY = m.y - (m.dy / hyp) * m.length;

        // Draw luminous meteor trail
        const gradient = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        gradient.addColorStop(0, `rgba(${m.color.r}, ${m.color.g}, ${m.color.b}, 0)`);
        gradient.addColorStop(0.65, `rgba(${m.color.r}, ${m.color.g}, ${m.color.b}, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.95})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = m.size;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Meteor glowing head dot
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${m.color.r}, ${m.color.g}, ${m.color.b}, 0.9)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Position advance
        m.x += m.dx * (delta / 16);
        m.y += m.dy * (delta / 16);

        // Remove expired shooting stars
        if (m.life >= m.maxLife || m.x < -150 || m.y > height + 150) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[5] w-full h-full opacity-100"
      aria-hidden="true"
    />
  );
}

export default SkyCanvas;
