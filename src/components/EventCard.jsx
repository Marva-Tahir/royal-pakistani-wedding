import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

export default function EventCard({ event, onSelect, index }) {
  // Event-specific decorative motifs
  const renderEventMotif = () => {
    switch (event.id) {
      case 'mehndi':
        return (
          <div className="flex items-center gap-1.5 text-amber-400/90 mb-2">
            <span className="text-lg">🪔</span>
            <span className="text-xs uppercase tracking-widest font-semibold text-amber-300">
              Rasm-e-Hina & Dholak
            </span>
          </div>
        );
      case 'barat':
        return (
          <div className="flex items-center gap-1.5 text-rose-300/90 mb-2">
            <span className="text-lg">👑</span>
            <span className="text-xs uppercase tracking-widest font-semibold text-rose-200">
              The Royal Nikah & Barat
            </span>
          </div>
        );
      case 'walima':
        return (
          <div className="flex items-center gap-1.5 text-emerald-300/90 mb-2">
            <span className="text-lg">🕊️</span>
            <span className="text-xs uppercase tracking-widest font-semibold text-emerald-200">
              The Grand Reception
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      onClick={() => onSelect(event)}
      className="group relative cursor-pointer rounded-2xl overflow-hidden p-6 sm:p-7 border border-gold-500/30 bg-gradient-to-b from-emerald-900/60 via-emerald-950/80 to-[#021912] backdrop-blur-md shadow-royal transition-all duration-500 hover:border-gold-400 hover:shadow-gold-glow flex flex-col justify-between"
    >
      {/* Dynamic Background Glow Layer according to event theme */}
      <div
        className={`absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-500 bg-gradient-to-br ${event.theme.bgGradient}`}
      />

      {/* Mughal Jali & Geometric Pattern Overlay */}
      <div className="absolute inset-0 bg-jali-pattern opacity-10 pointer-events-none" />

      {/* Gold Foil Top Border Accent */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

      {/* Card Header */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-2 mb-3">
          {renderEventMotif()}
          <span className="font-arabic text-xl sm:text-2xl text-gold-300/90 drop-shadow">
            {event.urduTitle}
          </span>
        </div>

        {/* Event Main Title */}
        <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-wide text-ivory-50 group-hover:text-gold-200 transition-colors">
          {event.title}
        </h3>
        <p className="text-xs sm:text-sm text-gold-300/80 italic font-serif mt-1">
          {event.badge}
        </p>

        {/* Divider */}
        <div className="h-[1px] w-full my-4 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

        {/* Event Details Grid */}
        <div className="space-y-2.5 text-xs sm:text-sm text-ivory-200/90">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-gold-400 shrink-0">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-semibold text-ivory-100">{event.date}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-gold-400 shrink-0">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <span>{event.time}</span>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-gold-400 shrink-0 mt-0.5">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="line-clamp-2">
              <span className="font-medium text-gold-200">{event.venue}</span>
              <p className="text-xs text-ivory-300/70">{event.address}</p>
            </div>
          </div>
        </div>

        {/* Event Highlights Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {event.highlights.slice(0, 2).map((item, idx) => (
            <span
              key={idx}
              className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full border border-gold-500/20 bg-emerald-950/60 text-gold-300/80 font-medium"
            >
              • {item}
            </span>
          ))}
        </div>
      </div>

      {/* Explore Button CTA */}
      <div className="relative z-10 mt-6 pt-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(event);
          }}
          className="w-full py-2.5 sm:py-3 px-4 rounded-xl border border-gold-400/50 bg-gradient-to-r from-gold-500/20 via-gold-500/30 to-gold-500/20 hover:from-gold-500 hover:to-gold-600 text-gold-200 hover:text-emerald-950 font-serif font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-md group-hover:shadow-gold-glow flex items-center justify-center gap-2"
        >
          <span>{event.buttonText}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}
