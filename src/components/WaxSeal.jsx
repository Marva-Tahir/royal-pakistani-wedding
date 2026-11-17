import React from 'react';
import { motion } from 'framer-motion';

/**
 * Royal 3D Wax Seal with Monogram & Ribbon
 */
export default function WaxSeal({
  initials = 'A & Z',
  isBreaking = false,
  isBroken = false,
  onClick,
}) {
  return (
    <div className="relative flex flex-col items-center justify-center select-none cursor-pointer group">
      {/* Royal Burgundy & Gold Satin Ribbons behind the seal */}
      <div className="absolute -bottom-8 flex gap-2 pointer-events-none z-0">
        <motion.div
          animate={isBreaking ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-4 h-12 bg-gradient-to-b from-burgundy-900 to-burgundy-800 shadow-md border-r border-gold-500/30 -rotate-12 origin-top"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
          }}
        />
        <motion.div
          animate={isBreaking ? { opacity: 0, y: 15 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="w-4 h-14 bg-gradient-to-b from-burgundy-950 via-burgundy-900 to-burgundy-800 shadow-md border-l border-gold-500/30 rotate-12 origin-top"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
          }}
        />
      </div>

      {/* Main Wax Seal Disc */}
      <motion.button
        type="button"
        onClick={onClick}
        disabled={isBreaking || isBroken}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        animate={
          isBreaking
            ? {
                scale: [1, 1.25, 0.7],
                opacity: [1, 1, 0],
                rotate: [0, -5, 15],
                filter: ['brightness(1)', 'brightness(1.8)', 'brightness(2)'],
              }
            : { scale: 1 }
        }
        transition={{ duration: 0.65, ease: 'easeInOut' }}
        className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-gold-400/50"
        aria-label="Open wedding invitation"
      >
        {/* Glowing Aura Ring */}
        <div className="absolute inset-0 rounded-full bg-gold-500/30 blur-md group-hover:bg-gold-500/50 transition-all duration-500 animate-pulse-subtle" />

        {/* Outer Wax Organic Rim with Bevel and Deep Shadows */}
        <div
          className="relative w-full h-full rounded-full p-1.5 flex items-center justify-center wax-seal-drop-shadow"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, #e5c158 0%, #b89228 35%, #755819 75%, #4a3809 100%)',
          }}
        >
          {/* Inner Wax Cavity */}
          <div
            className="w-full h-full rounded-full flex flex-col items-center justify-center p-2 wax-seal-inner-bevel border border-gold-300/40"
            style={{
              background:
                'radial-gradient(circle at 40% 35%, #faecc2 0%, #d4af37 40%, #94721d 85%, #59420b 100%)',
            }}
          >
            {/* Beaded Circular Border */}
            <div className="w-full h-full rounded-full border border-dashed border-gold-900/60 flex flex-col items-center justify-center relative">
              {/* Royal Crown / Fleur-de-lis motif at top */}
              <svg
                className="w-4 h-3 sm:w-5 sm:h-4 text-gold-950/80 fill-current mb-0.5"
                viewBox="0 0 24 16"
              >
                <path d="M2,14 L22,14 L19,5 L14,9 L12,2 L10,9 L5,5 Z" />
              </svg>

              {/* Monogram Initials */}
              <span className="font-serif font-bold text-base sm:text-lg tracking-wider text-gold-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                {initials}
              </span>

              {/* Lower Engraved Banner */}
              <span className="text-[8px] sm:text-[9px] uppercase tracking-widest font-semibold text-gold-950/80 -mt-0.5">
                Nuptials
              </span>
            </div>
          </div>

          {/* Crack lines overlay when breaking */}
          {isBreaking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 pointer-events-none"
            >
              <svg className="w-full h-full stroke-gold-100" strokeWidth="2" fill="none">
                <path d="M48,10 L52,40 L35,60 L50,88" />
                <path d="M52,40 L75,48 L90,30" />
                <path d="M35,60 L15,70" />
              </svg>
            </motion.div>
          )}
        </div>
      </motion.button>
    </div>
  );
}
