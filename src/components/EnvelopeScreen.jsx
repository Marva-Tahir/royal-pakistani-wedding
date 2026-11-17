import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import WaxSeal from './WaxSeal';
import BackgroundParticles from './BackgroundParticles';
import { soundFX } from '../utils/soundEffects';

export default function EnvelopeScreen({ config, onOpenComplete }) {
  const [stage, setStage] = useState('idle'); // 'idle' | 'breaking' | 'opening' | 'card-sliding' | 'expanding' | 'done'

  const handleSealClick = () => {
    if (stage !== 'idle') return;

    // 1. Play seal break sound
    soundFX.playSealBreak();

    // 2. Trigger golden spark burst
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.52 },
        colors: ['#d4af37', '#faecc2', '#f5dc99', '#ecc869', '#ffffff'],
        disableForReducedMotion: true,
      });
    } catch {
      // Ignore if canvas-confetti has restrictions
    }

    setStage('breaking');

    // 3. Flap opens
    setTimeout(() => {
      setStage('opening');
    }, 600);

    // 4. Card slides out
    setTimeout(() => {
      setStage('card-sliding');
    }, 1300);

    // 5. Card unfolds / expands
    setTimeout(() => {
      setStage('expanding');
    }, 2200);

    // 6. Complete transition to main screen
    setTimeout(() => {
      setStage('done');
      onOpenComplete();
    }, 3100);
  };

  const isFlapOpen = stage === 'opening' || stage === 'card-sliding' || stage === 'expanding' || stage === 'done';
  const isCardSliding = stage === 'card-sliding' || stage === 'expanding' || stage === 'done';
  const isExpanding = stage === 'expanding' || stage === 'done';

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden bg-gradient-to-b from-emerald-950 via-[#032219] to-[#01140e]">
      {/* Ambient Golden Particles */}
      <BackgroundParticles />

      {/* Subtle Mughal Palace Arches Silhouette in Background */}
      <div className="absolute inset-0 pointer-events-none opacity-15 flex items-center justify-center bg-mughal-pattern" />

      {/* Top Header Crest */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 text-center mb-6 sm:mb-8"
      >
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1 rounded-full border border-gold-500/30 bg-emerald-900/40 backdrop-blur-sm mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold-300 font-medium">
            {config.envelope.welcomeTag}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
        </div>
        <p className="font-arabic text-gold-300/90 text-lg sm:text-xl drop-shadow-sm">
          {config.couple.bismillah}
        </p>
      </motion.div>

      {/* Centered Wedding Envelope Container */}
      <div className="relative z-20 perspective-1000 w-full max-w-[340px] sm:max-w-[480px] md:max-w-[560px]">
        <motion.div
          animate={
            isExpanding
              ? { scale: 1.15, opacity: 0, y: -40 }
              : { scale: 1, opacity: 1, y: 0 }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-[1.48/1] rounded-2xl shadow-royal"
        >
          {/* ENVELOPE BASE / BACK */}
          <div className="absolute inset-0 rounded-2xl bg-emerald-900 border-2 border-gold-500/50 overflow-hidden shadow-2xl">
            {/* Inner Lining with Gold Damask Motif */}
            <div
              className="absolute inset-0 opacity-40 bg-repeat"
              style={{
                backgroundImage: `radial-gradient(circle at center, rgba(212, 175, 55, 0.2) 2px, transparent 2px)`,
                backgroundSize: '18px 18px',
              }}
            />
            {/* Top inner shadow for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30 pointer-events-none" />
          </div>

          {/* INVITATION CARD (Sits inside the pocket, then slides upwards) */}
          <motion.div
            initial={{ y: '0%', scale: 0.95 }}
            animate={
              isCardSliding
                ? { y: '-65%', scale: 1 }
                : { y: '0%', scale: 0.95 }
            }
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-x-4 top-3 bottom-3 z-10 rounded-xl bg-ivory-50 text-emerald-950 p-4 sm:p-6 shadow-2xl border-2 border-gold-400 flex flex-col items-center justify-center text-center select-none"
            style={{
              backgroundImage: 'radial-gradient(ellipse at center, #faf6ee 0%, #f4ece0 100%)',
            }}
          >
            {/* Card Corner Ornaments */}
            <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-gold-500 rounded-tl-sm pointer-events-none" />
            <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-gold-500 rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-gold-500 rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-gold-500 rounded-br-sm pointer-events-none" />

            {/* Inner Gold Foil Hairline */}
            <div className="w-full h-full border border-gold-400/50 rounded-lg p-3 sm:p-4 flex flex-col items-center justify-between">
              <div>
                <p className="font-arabic text-gold-700 text-sm sm:text-base">
                  {config.couple.bismillah}
                </p>
                <p className="font-serif italic text-gold-800 text-xs sm:text-sm mt-0.5 tracking-wide">
                  {config.couple.invitationGreeting}
                </p>
              </div>

              <div className="my-1">
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-gold-900 tracking-wider">
                  {config.couple.brideFirstName}
                  <span className="text-gold-600 font-script text-2xl sm:text-3xl px-2">&</span>
                  {config.couple.groomFirstName}
                </h2>
                <div className="h-[1px] w-28 mx-auto my-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-emerald-900/80 font-medium">
                  Cordially Request Your Presence
                </p>
              </div>

              <div className="flex items-center gap-2 text-gold-800 text-[10px] sm:text-xs font-semibold tracking-wider">
                <span>MEHNDI</span>
                <span>•</span>
                <span>BARAT</span>
                <span>•</span>
                <span>WALIMA</span>
              </div>
            </div>
          </motion.div>

          {/* ENVELOPE FRONT POCKET (Triangular/Trapezoid folds with Gold Accents) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Left and Right side folds */}
            <div
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-emerald-950 to-emerald-900 border-r border-gold-500/30"
              style={{
                clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-emerald-950 to-emerald-900 border-l border-gold-500/30"
              style={{
                clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
              }}
            />

            {/* Bottom Pocket Flap */}
            <div
              className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-emerald-950 via-emerald-900 to-emerald-850 shadow-lg border-t border-gold-400/40"
              style={{
                clipPath: 'polygon(0 100%, 50% 15%, 100% 100%)',
              }}
            >
              {/* Gold Filigree Line along the bottom pocket fold */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                <svg className="w-24 h-12 text-gold-400 fill-current" viewBox="0 0 100 40">
                  <path d="M50 0 L60 20 L40 20 Z" />
                </svg>
              </div>
            </div>
          </div>

          {/* TOP FLAP (Folds downward in closed state; flips upward on open) */}
          <motion.div
            style={{
              transformOrigin: 'top center',
            }}
            animate={
              isFlapOpen
                ? {
                    rotateX: 180,
                    zIndex: 5, // drops behind once open
                  }
                : {
                    rotateX: 0,
                    zIndex: 30, // on top of card while closed
                  }
            }
            transition={{
              duration: 0.9,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="absolute inset-x-0 top-0 h-[62%] preserve-3d"
          >
            {/* Front of Flap (pointing down with golden border) */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-emerald-900 via-emerald-850 to-emerald-950 border-b-2 border-gold-400/70 shadow-2xl backface-hidden flex items-end justify-center pb-2"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            >
              {/* Ornate Gold Trim on Flap Tip */}
              <div className="w-16 h-8 flex items-center justify-center opacity-60 mb-2">
                <svg className="w-10 h-6 text-gold-300 fill-current" viewBox="0 0 100 60">
                  <path d="M50 60 L10 10 Q50 25 90 10 Z" />
                </svg>
              </div>
            </div>

            {/* Back of Flap (Revealed when open, showing inner gold damask pattern) */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-emerald-900 to-emerald-950 border-b border-gold-400/50 backface-hidden"
              style={{
                transform: 'rotateX(180deg)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            >
              <div
                className="w-full h-full opacity-40"
                style={{
                  backgroundImage: `radial-gradient(circle at center, rgba(212, 175, 55, 0.25) 2px, transparent 2px)`,
                  backgroundSize: '16px 16px',
                }}
              />
            </div>
          </motion.div>

          {/* WAX SEAL (Centered at the apex of the envelope flap) */}
          <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
            <WaxSeal
              initials={config.envelope.sealInitials}
              isBreaking={stage === 'breaking'}
              isBroken={isFlapOpen}
              onClick={handleSealClick}
            />
          </div>
        </motion.div>
      </div>

      {/* Instruction Call To Action Below Envelope */}
      <AnimatePresence>
        {!isFlapOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative z-20 text-center mt-10 sm:mt-12 flex flex-col items-center cursor-pointer"
            onClick={handleSealClick}
          >
            <p className="font-script text-2xl sm:text-3xl text-gold-300 drop-shadow">
              {config.envelope.instructionText}
            </p>

            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="flex items-center gap-2 mt-2 px-4 py-1.5 rounded-full border border-gold-400/30 bg-emerald-900/40 text-gold-200 text-xs sm:text-sm font-medium shadow-md backdrop-blur-sm hover:bg-gold-500/10 hover:border-gold-400/60 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
              <span>{config.envelope.tapActionText}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
