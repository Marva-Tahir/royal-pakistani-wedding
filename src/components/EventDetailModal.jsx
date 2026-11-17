import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  CalendarPlus,
  Copy,
  Check,
  Shirt,
} from 'lucide-react';
import { GoldDivider } from './MughalArch';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

export default function EventDetailModal({ event, couple, onClose }) {
  const [copied, setCopied] = useState(false);
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);

  if (!event) return null;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${event.venue}, ${event.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const googleCalUrl = getGoogleCalendarUrl(event, couple);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.92, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.94, y: 20, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl my-auto rounded-3xl overflow-hidden border border-gold-400/50 bg-gradient-to-b from-[#073225] via-[#042017] to-[#01140e] text-ivory-100 shadow-royal"
        >
          {/* Top Banner Accent */}
          <div className={`h-2.5 w-full bg-gradient-to-r ${event.theme.accent}`} />

          {/* Modal Header & Back Button */}
          <div className="p-4 sm:p-6 flex items-center justify-between border-b border-gold-500/20">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-400/40 bg-emerald-950/60 hover:bg-gold-500/20 hover:border-gold-300 text-gold-300 text-xs sm:text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Celebrations</span>
            </button>

            <span className="font-arabic text-xl sm:text-2xl text-gold-300">
              {event.urduTitle}
            </span>
          </div>

          {/* Main Content Area */}
          <div className="p-5 sm:p-8 space-y-6">
            {/* Top Invocation & Couple Crest */}
            <div className="text-center">
              <span className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-gold-300/80 mb-1">
                {event.badge}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gold-200 tracking-wide">
                {event.title} Celebration
              </h2>
              <p className="font-script text-2xl sm:text-3xl text-gold-300 mt-1">
                {couple.bride} & {couple.groom}
              </p>

              <GoldDivider className="max-w-md mx-auto my-3" />

              {/* Personalized Invitation Message */}
              <p className="font-serif italic text-sm sm:text-base text-ivory-200/90 leading-relaxed max-w-lg mx-auto">
                "{event.invitationMessage}"
              </p>
            </div>

            {/* Date, Time & Venue Card */}
            <div className="rounded-2xl border border-gold-500/30 bg-emerald-950/70 p-5 sm:p-6 space-y-4 shadow-lg backdrop-blur-sm">
              {/* Date & Time Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-gold-500/20 pb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-400/40 flex items-center justify-center text-gold-300 shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-gold-300/80 font-medium">
                      Date & Day
                    </span>
                    <p className="font-serif font-bold text-base sm:text-lg text-ivory-50">
                      {event.date}
                    </p>
                    <p className="text-xs text-gold-300/80">{event.dayOfWeek}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-400/40 flex items-center justify-center text-gold-300 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-gold-300/80 font-medium">
                      Starting Time
                    </span>
                    <p className="font-serif font-bold text-base sm:text-lg text-ivory-50">
                      {event.time}
                    </p>
                    <p className="text-xs text-ivory-300/80">{event.timeNote}</p>
                  </div>
                </div>
              </div>

              {/* Venue Row */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-400/40 flex items-center justify-center text-gold-300 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] uppercase tracking-wider text-gold-300/80 font-medium">
                    Venue & Location
                  </span>
                  <p className="font-serif font-bold text-base sm:text-lg text-ivory-50">
                    {event.venue}
                  </p>
                  <p className="text-xs sm:text-sm text-ivory-300/80 leading-relaxed mt-0.5">
                    {event.address}
                  </p>

                  <div className="mt-2.5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="inline-flex items-center gap-1.5 text-xs text-gold-300/90 hover:text-gold-200 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-green-400 font-medium">Address Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Dress Code Row */}
              {event.dressCode && (
                <div className="border-t border-gold-500/20 pt-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-gold-300 shrink-0">
                    <Shirt className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gold-300/80 font-semibold">
                      Suggested Dress Code
                    </span>
                    <p className="text-xs sm:text-sm text-ivory-200 mt-0.5">
                      {event.dressCode}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons: View Location & Add to Calendar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl border border-gold-400/60 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-emerald-950 font-serif font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-gold-glow flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>View on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
                  className="w-full py-3 px-4 rounded-xl border border-gold-400/40 bg-emerald-900/60 hover:bg-gold-500/20 text-gold-200 font-serif font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <CalendarPlus className="w-4 h-4 text-gold-400" />
                  <span>Save to Calendar</span>
                </button>

                {/* Calendar Options Dropdown */}
                {calendarMenuOpen && (
                  <div className="absolute bottom-full mb-2 left-0 right-0 rounded-xl border border-gold-400/40 bg-emerald-950 shadow-2xl p-2 z-20 space-y-1">
                    <a
                      href={googleCalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block px-3 py-2 rounded-lg text-xs sm:text-sm text-gold-200 hover:bg-gold-500/20 transition-colors text-left"
                    >
                      📅 Google Calendar
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        downloadIcsFile(event, couple);
                        setCalendarMenuOpen(false);
                      }}
                      className="w-full block px-3 py-2 rounded-lg text-xs sm:text-sm text-gold-200 hover:bg-gold-500/20 transition-colors text-left"
                    >
                      🍏 Apple Calendar / Outlook (.ics)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
