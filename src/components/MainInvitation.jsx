import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MailOpen, PhoneCall } from 'lucide-react';
import EventCard from './EventCard';
import BlessingsSection from './BlessingsSection';
import { GoldDivider } from './MughalArch';

export default function MainInvitation({
  config,
  onSelectEvent,
  onReopenEnvelope,
}) {
  const scrollToPrayers = () => {
    const el = document.getElementById('prayers-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-emerald-950 via-[#032219] to-[#01120c] text-ivory-100 overflow-x-hidden">
      {/* Re-Open Envelope Floating Button */}
      <div className="fixed top-4 left-4 z-40">
        <button
          type="button"
          onClick={onReopenEnvelope}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-gold-500/30 bg-emerald-950/80 hover:bg-gold-500/20 hover:border-gold-400 text-gold-300 text-xs font-serif tracking-wider backdrop-blur-md shadow-lg transition-all"
        >
          <MailOpen className="w-3.5 h-3.5 text-gold-400" />
          <span className="hidden sm:inline">View Envelope</span>
        </button>
      </div>

      {/* HERO SECTION: ROYAL COUPLE ANNOUNCEMENT */}
      <section className="relative pt-20 sm:pt-28 pb-12 sm:pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        {/* Sacred Bismillah Calligraphy */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-block p-4 sm:p-5 rounded-3xl border border-gold-500/30 bg-emerald-900/30 backdrop-blur-sm shadow-royal">
            <p className="font-arabic text-2xl sm:text-3xl md:text-4xl text-gold-300 font-normal leading-relaxed drop-shadow-md">
              {config.couple.bismillah}
            </p>
            <p className="text-[11px] sm:text-xs text-gold-200/70 uppercase tracking-widest mt-1">
              {config.couple.bismillahTranslation}
            </p>
          </div>
        </motion.div>

        {/* Traditional Invitation Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="space-y-2 mb-4"
        >
          <p className="font-serif italic text-base sm:text-lg md:text-xl text-gold-300 tracking-wide">
            {config.couple.invitationGreeting}
          </p>
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-ivory-200/80 font-medium">
            {config.couple.invitationSubheading}
          </p>
        </motion.div>

        {/* BRIDE & GROOM ROYAL NAMES */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="my-6 sm:my-8"
        >
          {/* Couple Monogram Emblem */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full border border-gold-400/50 bg-gradient-to-b from-gold-500/20 to-transparent flex items-center justify-center mb-4 shadow-gold-glow">
            <span className="font-serif text-xl sm:text-2xl font-bold text-gold-300 tracking-widest">
              {config.couple.monogram}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide text-gold-200 text-gold-foil">
            {config.couple.bride}
          </h1>

          <div className="flex items-center justify-center gap-3 my-2 sm:my-3">
            <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-gold-400/80" />
            <span className="font-script text-3xl sm:text-4xl md:text-5xl text-gold-400 px-2">
              &
            </span>
            <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-gold-400/80" />
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide text-gold-200 text-gold-foil">
            {config.couple.groom}
          </h1>
        </motion.div>

        {/* PARENTS INFORMATION */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="max-w-xl mx-auto rounded-2xl border border-gold-500/20 bg-emerald-900/20 backdrop-blur-sm p-4 sm:p-5 mb-8 text-xs sm:text-sm text-ivory-200 space-y-2"
        >
          <div>
            <span className="text-gold-400/80 text-[11px] uppercase tracking-wider block">
              Daughter of
            </span>
            <p className="font-serif font-semibold text-ivory-100 text-sm sm:text-base">
              {config.couple.brideParents}
            </p>
          </div>
          <div className="h-[1px] w-24 mx-auto bg-gold-500/20" />
          <div>
            <span className="text-gold-400/80 text-[11px] uppercase tracking-wider block">
              Son of
            </span>
            <p className="font-serif font-semibold text-ivory-100 text-sm sm:text-base">
              {config.couple.groomParents}
            </p>
          </div>
        </motion.div>

        {/* QURANIC VERSE ON TRANQUILITY & LOVE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto rounded-2xl border border-gold-500/30 bg-emerald-950/70 p-5 sm:p-6 shadow-md mb-10"
        >
          <p className="font-arabic text-lg sm:text-xl text-gold-300 leading-loose mb-3">
            {config.couple.quranicVerse.arabic}
          </p>
          <p className="font-serif italic text-xs sm:text-sm text-ivory-200/90 leading-relaxed mb-2">
            "{config.couple.quranicVerse.translation}"
          </p>
          <span className="text-[10px] uppercase tracking-widest text-gold-400/80 font-medium">
            — {config.couple.quranicVerse.surah}
          </span>
        </motion.div>

        {/* QUICK JUMP BAR */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={scrollToPrayers}
            className="px-5 py-2.5 rounded-full border border-gold-400/50 bg-gold-500/10 hover:bg-gold-500/20 text-gold-200 text-xs sm:text-sm font-serif tracking-wider uppercase flex items-center gap-2 transition-all shadow-sm"
          >
            <Heart className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
            <span>Leave Your Prayers & Duas</span>
          </button>
        </div>
      </section>

      {/* THREE WEDDING CELEBRATIONS SECTION */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <span className="font-script text-2xl sm:text-3xl text-gold-300 block mb-1">
            Celebrations & Festivities
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ivory-50 tracking-wide">
            The Wedding Functions
          </h2>
          <p className="text-xs sm:text-sm text-gold-300/80 uppercase tracking-widest mt-2">
            Click on any event below to view venue, timings & location
          </p>
          <GoldDivider className="max-w-xs mx-auto my-4" />
        </div>

        {/* Responsive Grid: 1 col on mobile, 3 cols on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {config.events.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
              onSelect={onSelectEvent}
            />
          ))}
        </div>
      </section>

      {/* PRAYERS & BLESSINGS INTERACTIVE SECTION */}
      <BlessingsSection config={config} />

      {/* FOOTER & FAMILY THANKS */}
      <footer className="relative border-t border-gold-500/20 py-12 px-4 text-center bg-emerald-950/80">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="w-10 h-10 mx-auto rounded-full border border-gold-400/40 flex items-center justify-center text-gold-300 font-serif font-bold text-sm">
            {config.couple.monogram}
          </div>

          <h4 className="font-display text-xl text-gold-200 tracking-wider">
            {config.couple.brideFirstName} & {config.couple.groomFirstName}
          </h4>

          <p className="font-serif italic text-xs sm:text-sm text-ivory-200/80">
            {config.couple.invitationClosing}
          </p>

          <p className="text-xs text-gold-400/80 font-medium tracking-wide">
            {config.rsvp.note}
          </p>

          {/* RSVP Contacts */}
          <div className="pt-4 border-t border-gold-500/15 flex flex-wrap items-center justify-center gap-4 text-xs text-ivory-300/70">
            {config.rsvp.contacts.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <PhoneCall className="w-3 h-3 text-gold-400" />
                <span>{c.name}:</span>
                <span className="text-gold-300">{c.phone}</span>
              </span>
            ))}
          </div>

          <p className="text-[10px] text-ivory-400/40 tracking-widest uppercase pt-4">
            Royal Pakistani Digital Wedding Stationery • Built with Love & Elegance
          </p>
        </div>
      </footer>
    </div>
  );
}
