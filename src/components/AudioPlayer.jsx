import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Ambient Royal Sitar / Shehnai Soundscape Synthesizer
 * Uses Web Audio API to play a soothing, royal Indian/Pakistani Raag Yaman/Bhairavi ambient drone
 */
export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);

  const stopMusic = () => {
    nodesRef.current.forEach((n) => {
      try {
        if (n.stop) n.stop();
        if (n.disconnect) n.disconnect();
      } catch {}
    });
    nodesRef.current = [];
    setIsPlaying(false);
  };

  const startMusic = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      stopMusic(); // clear any existing

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      nodesRef.current.push(masterGain);

      // Tanpura / Sitar fundamental Drone Frequencies (D, A, D')
      const freqs = [146.83, 220.0, 293.66, 440.0, 587.33];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle organic vibrato (LFO)
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
        lfoGain.gain.setValueAtTime(2.5, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();
        nodesRef.current.push(lfo, lfoGain);

        gain.gain.setValueAtTime(0.04 / (idx + 1), ctx.currentTime);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        nodesRef.current.push(osc, gain);
      });

      // Harp / Bells arpeggio timer
      const pentatonic = [293.66, 329.63, 369.99, 440.0, 554.37, 587.33, 659.25, 739.99];
      const intervalId = setInterval(() => {
        if (!isPlaying && ctx.state !== 'running') return;
        try {
          const noteFreq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          const now = ctx.currentTime;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(noteFreq, now);

          noteGain.gain.setValueAtTime(0, now);
          noteGain.gain.linearRampToValueAtTime(0.04, now + 0.05);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

          osc.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start(now);
          osc.stop(now + 2.3);
        } catch {}
      }, 1600);

      nodesRef.current.push({
        disconnect: () => clearInterval(intervalId),
      });

      setIsPlaying(true);
    } catch (e) {
      console.warn('Unable to initialize royal audio:', e);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    return () => stopMusic();
  }, []);

  return (
    <div className="fixed top-4 right-4 z-40">
      <button
        type="button"
        onClick={toggleMusic}
        className={`flex items-center gap-2 px-3 py-2 rounded-full border backdrop-blur-md shadow-lg transition-all duration-300 text-xs font-serif tracking-wider ${
          isPlaying
            ? 'border-gold-400 bg-emerald-900/80 text-gold-200 shadow-gold-glow'
            : 'border-gold-500/30 bg-emerald-950/70 text-gold-300/80 hover:border-gold-400/60'
        }`}
        aria-label={isPlaying ? 'Pause wedding music' : 'Play ambient wedding sitar'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-gold-400 animate-pulse" />
            <span className="hidden sm:inline">Royal Sitar Playing</span>
            <span className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 bg-gold-400 h-2 animate-bounce" />
              <span className="w-0.5 bg-gold-400 h-3 animate-bounce delay-100" />
              <span className="w-0.5 bg-gold-400 h-1.5 animate-bounce delay-200" />
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4" />
            <span className="hidden sm:inline">Play Ambient Sitar</span>
          </>
        )}
      </button>
    </div>
  );
}
