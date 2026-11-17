import React from 'react';

/**
 * Ornate Mughal Arch & Decorative Motifs (Multi-foil Cusped Arch & Paisley Borders)
 */
export function MughalArchFrame({ children, className = '', borderColor = '#d4af37' }) {
  return (
    <div className={`relative p-6 md:p-10 border border-gold-500/40 rounded-2xl bg-emerald-950/70 backdrop-blur-md shadow-royal ${className}`}>
      {/* Top Mughal Cusped Arch Silhouette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <svg
          className="w-48 h-8 md:w-64 md:h-10 text-gold-500 fill-current opacity-80"
          viewBox="0 0 240 40"
          preserveAspectRatio="none"
        >
          <path d="M0,40 Q60,40 80,24 Q100,8 112,4 Q116,0 120,0 Q124,0 128,4 Q140,8 160,24 Q180,40 240,40 L240,40 L0,40 Z" />
        </svg>
        <div className="absolute top-0 w-3 h-3 rounded-full bg-gold-400 shadow-gold-glow -translate-y-1" />
      </div>

      {/* Ornate Corner Accents */}
      <CornerAccent position="top-left" color={borderColor} />
      <CornerAccent position="top-right" color={borderColor} />
      <CornerAccent position="bottom-left" color={borderColor} />
      <CornerAccent position="bottom-right" color={borderColor} />

      {/* Inner Decorative Hairline Border */}
      <div className="relative z-10 border border-gold-500/20 rounded-xl p-4 md:p-6">
        {children}
      </div>

      {/* Bottom Mughal Finial */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center justify-center">
        <svg
          className="w-32 h-6 text-gold-500 fill-current opacity-70 rotate-180"
          viewBox="0 0 240 40"
        >
          <path d="M0,40 Q60,40 80,24 Q100,8 112,4 Q116,0 120,0 Q124,0 128,4 Q140,8 160,24 Q180,40 240,40 L240,40 L0,40 Z" />
        </svg>
      </div>
    </div>
  );
}

export function CornerAccent({ position = 'top-left', color = '#d4af37' }) {
  const getStyles = () => {
    switch (position) {
      case 'top-left':
        return 'top-2 left-2';
      case 'top-right':
        return 'top-2 right-2 rotate-90';
      case 'bottom-right':
        return 'bottom-2 right-2 rotate-180';
      case 'bottom-left':
        return 'bottom-2 left-2 -rotate-90';
      default:
        return 'top-2 left-2';
    }
  };

  return (
    <div className={`absolute w-8 h-8 pointer-events-none ${getStyles()}`}>
      <svg viewBox="0 0 40 40" className="w-full h-full fill-none" stroke={color} strokeWidth="1.5">
        <path d="M2,38 L2,12 Q2,2 12,2 L38,2" />
        <path d="M8,30 L8,14 Q8,8 14,8 L30,8" strokeWidth="1" strokeOpacity="0.6" />
        <circle cx="6" cy="6" r="2" fill={color} />
        <path d="M14,14 Q20,8 26,14 Q14,20 14,14 Z" fill={color} fillOpacity="0.3" />
      </svg>
    </div>
  );
}

export function GoldDivider({ className = '', subtitle = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
      <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-r from-transparent via-gold-500/60 to-gold-400" />
      <div className="flex items-center gap-1.5 text-gold-400">
        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
        <svg className="w-5 h-5 fill-current opacity-90" viewBox="0 0 24 24">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
      </div>
      <div className="h-[1px] flex-1 max-w-[120px] bg-gradient-to-l from-transparent via-gold-500/60 to-gold-400" />
      {subtitle && <span className="sr-only">{subtitle}</span>}
    </div>
  );
}
