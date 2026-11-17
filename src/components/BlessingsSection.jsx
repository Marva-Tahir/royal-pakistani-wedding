import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, Sparkles, MessageSquareHeart, CheckCircle2, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { fetchBlessings, submitBlessing, isSupabaseConfigured } from '../services/supabase';
import { soundFX } from '../utils/soundEffects';
import { GoldDivider, CornerAccent } from './MughalArch';

export default function BlessingsSection({ config }) {
  const [blessings, setBlessings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isLocalMode, setIsLocalMode] = useState(!isSupabaseConfigured);

  // Form State
  const [guestName, setGuestName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', text: '' }

  // Fetch initial blessings
  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetchBlessings();
      setBlessings(res.data);
      setIsLocalMode(res.isLocalMode);
      setLoading(false);
    }
    load();
  }, []);

  const handleQuickDuaClick = (duaText) => {
    setMessage((prev) => (prev ? `${prev}\n${duaText}` : duaText));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    if (!message.trim() || message.trim().length < 3) {
      setFeedback({
        type: 'error',
        text: 'Please write a heartfelt prayer or dua (at least 3 characters).',
      });
      return;
    }

    try {
      setSubmitting(true);
      const res = await submitBlessing({
        guest_name: guestName,
        relation,
        message,
      });

      // Sound & Golden Confetti Sparkle
      soundFX.playBlessingChime();
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#d4af37', '#faecc2', '#f5dc99', '#f2bcc0', '#ffffff'],
          disableForReducedMotion: true,
        });
      } catch {}

      // Update state
      setBlessings((prev) => [res.blessing, ...prev]);
      setIsLocalMode(res.isLocalMode);

      setFeedback({
        type: 'success',
        text: 'جزاك الله خيراً — Thank you for your heartfelt prayers! Your dua has been lovingly added to our wedding book.',
      });

      // Reset form
      setGuestName('');
      setRelation('');
      setMessage('');
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err.message || 'Unable to submit blessing. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="prayers-section" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Ornate Frame Wrapper */}
      <div className="relative rounded-3xl border border-gold-500/40 bg-gradient-to-b from-[#083527]/90 via-[#042017]/90 to-[#02130e]/95 backdrop-blur-md p-6 sm:p-10 md:p-12 shadow-royal">
        <CornerAccent position="top-left" color="#d4af37" />
        <CornerAccent position="top-right" color="#d4af37" />
        <CornerAccent position="bottom-left" color="#d4af37" />
        <CornerAccent position="bottom-right" color="#d4af37" />

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-arabic text-2xl sm:text-3xl text-gold-300 block mb-2">
            {config.prayersSection.urduTitle}
          </span>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gold-200 tracking-wide">
            {config.prayersSection.title}
          </h2>

          <GoldDivider className="max-w-xs mx-auto my-3" />

          <p className="font-serif italic text-sm sm:text-base text-ivory-200/90 leading-relaxed">
            "{config.prayersSection.quote}"
          </p>

          {/* Cloud vs Local Status Indicator */}
          <div className="mt-4 flex items-center justify-center">
            {isSupabaseConfigured && !isLocalMode ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-[11px] text-emerald-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Cloud Guestbook Active (Supabase)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-950/60 border border-gold-500/30 text-[11px] text-gold-300/80 font-medium">
                <Sparkles className="w-3 h-3 text-gold-400" />
                Guestbook Ready (Saved Locally)
              </span>
            )}
          </div>
        </div>

        {/* Quick Dua Suggestions */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-gold-400/80 font-semibold mb-2.5 text-center">
            Tap a quick prayer to add:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {config.prayersSection.quickDuas.map((dua, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickDuaClick(dua.arabic)}
                className="px-3.5 py-1.5 rounded-xl border border-gold-400/30 bg-emerald-950/60 hover:bg-gold-500/20 hover:border-gold-300 text-xs text-gold-200 transition-all duration-200 shadow-sm flex items-center gap-2 font-arabic"
              >
                <span>{dua.arabic}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="guest_name" className="block text-xs font-medium uppercase tracking-wider text-gold-300/90 mb-1.5">
                Your Name <span className="text-ivory-400 text-[10px] lowercase">(optional)</span>
              </label>
              <input
                id="guest_name"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Uncle Tariq & Family"
                maxLength={80}
                className="w-full px-4 py-2.5 rounded-xl border border-gold-500/30 bg-emerald-950/80 text-ivory-50 placeholder:text-ivory-400/40 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-sm transition-colors"
              />
            </div>

            <div>
              <label htmlFor="relation" className="block text-xs font-medium uppercase tracking-wider text-gold-300/90 mb-1.5">
                Relation / City <span className="text-ivory-400 text-[10px] lowercase">(optional)</span>
              </label>
              <input
                id="relation"
                type="text"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                placeholder="e.g. Bride's Cousin, Lahore"
                maxLength={80}
                className="w-full px-4 py-2.5 rounded-xl border border-gold-500/30 bg-emerald-950/80 text-ivory-50 placeholder:text-ivory-400/40 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-sm transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider text-gold-300/90">
                Your Dua or Heartfelt Message *
              </label>
              <span className="text-[11px] text-ivory-300/60">{message.length}/1000</span>
            </div>
            <textarea
              id="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your prayers, blessings, or sweet memories for Areeba & Zohair..."
              maxLength={1000}
              className="w-full px-4 py-3 rounded-xl border border-gold-500/30 bg-emerald-950/80 text-ivory-50 placeholder:text-ivory-400/40 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 text-sm transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Feedback Message Banner */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${
                  feedback.type === 'success'
                    ? 'border-emerald-500/60 bg-emerald-950/90 text-emerald-200'
                    : 'border-rose-500/60 bg-rose-950/90 text-rose-200'
                }`}
              >
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <span>{feedback.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 sm:py-3.5 px-6 rounded-xl border border-gold-400/70 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-emerald-950 font-serif font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-gold-glow flex items-center justify-center gap-2.5 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                <span>Sending Your Blessings...</span>
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 fill-emerald-950" />
                <span>Send Your Blessings</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* WALL OF PRAYERS & BLESSINGS */}
        <div className="mt-14 pt-10 border-t border-gold-500/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MessageSquareHeart className="w-5 h-5 text-gold-400" />
              <h3 className="font-display text-xl sm:text-2xl font-bold text-gold-200">
                Wall of Blessings
              </h3>
            </div>
            <span className="text-xs text-gold-300/70 font-medium">
              {blessings.length} {blessings.length === 1 ? 'Prayer' : 'Prayers'} Received
            </span>
          </div>

          {loading ? (
            <div className="py-8 text-center text-gold-400/70 text-sm">
              Loading heartfelt blessings...
            </div>
          ) : blessings.length === 0 ? (
            <div className="py-8 text-center text-ivory-300/60 text-sm italic">
              Be the first to leave a prayer for the lovely couple!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blessings.map((b, idx) => (
                <motion.div
                  key={b.id || idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-2xl border border-gold-500/25 bg-emerald-950/60 p-4 sm:p-5 shadow-sm hover:border-gold-400/50 transition-colors flex flex-col justify-between"
                >
                  <p className="font-serif italic text-xs sm:text-sm text-ivory-100/90 leading-relaxed whitespace-pre-line mb-3">
                    "{b.message}"
                  </p>
                  <div className="flex items-center justify-between text-[11px] sm:text-xs pt-2 border-t border-gold-500/15">
                    <span className="font-semibold text-gold-300">
                      {b.guest_name || 'Well Wisher'}
                    </span>
                    {b.relation && (
                      <span className="text-ivory-300/70 italic">{b.relation}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
