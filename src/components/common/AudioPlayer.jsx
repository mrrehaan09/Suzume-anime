import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * AudioPlayer
 * A self-contained, browser-native Web Audio API synthesizer that plays
 * a dreamy Suzume pentatonic bell motif (B-D-E-F#-A) without requiring external audio files.
 */
export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const timerRef = useRef(null);

  // Suzume motif pentatonic scale frequencies (Hz)
  const NOTES = useRef([
    493.88, // B4
    587.33, // D5
    659.25, // E5
    739.99, // F#5
    880.00, // A5
    987.77, // B5
  ]);

  const playChime = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Pick a harmonic note from the motif
      const notesList = NOTES.current;
      const freq = notesList[Math.floor(Math.random() * notesList.length)];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Ethereal bell envelope: fast attack, slow resonant decay
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 2.8);
    } catch {
      // Graceful fallback if Web Audio is restricted
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      playChime();
      timerRef.current = setInterval(() => {
        playChime();
      }, 3400);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playChime]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={togglePlay}
      aria-label={isPlaying ? 'Mute ambient soundtrack' : 'Play ambient soundtrack'}
      className="group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#101D36]/80 hover:bg-[#1E3357] border border-[#83C9E8]/20 hover:border-[#F5B77D]/50 transition-all duration-300 text-xs font-cinematic cursor-pointer"
      title="RADWIMPS Inspired Ambient Chime (Web Audio)"
    >
      {isPlaying ? (
        <Volume2 className="w-3.5 h-3.5 text-[#F5B77D] animate-pulse" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 text-[#A7B7C9]" />
      )}

      {/* Mini Equalizer Bar Animation */}
      <div className="flex items-center gap-0.5 h-3">
        <span
          className={`w-0.5 bg-[#83C9E8] rounded-full transition-all duration-300 ${
            isPlaying ? 'h-3 animate-bounce' : 'h-1'
          }`}
        />
        <span
          className={`w-0.5 bg-[#F5B77D] rounded-full transition-all duration-300 ${
            isPlaying ? 'h-2 animate-pulse' : 'h-1'
          }`}
        />
        <span
          className={`w-0.5 bg-[#F5F0E8] rounded-full transition-all duration-300 ${
            isPlaying ? 'h-3.5 animate-bounce' : 'h-1'
          }`}
        />
      </div>

      <span className="hidden sm:inline text-[11px] tracking-wider text-[#F5F0E8] group-hover:text-[#F5B77D]">
        {isPlaying ? 'Sound On' : 'Ambient OST'}
      </span>
    </button>
  );
}

export default AudioPlayer;
