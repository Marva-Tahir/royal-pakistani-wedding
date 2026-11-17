import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { weddingData } from './config/weddingData';
import EnvelopeScreen from './components/EnvelopeScreen';
import MainInvitation from './components/MainInvitation';
import EventDetailModal from './components/EventDetailModal';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="relative min-h-screen bg-emerald-950 font-sans text-ivory-100 overflow-x-hidden selection:bg-gold-500 selection:text-emerald-950">
      {/* Royal Ambient Sitar / Music Synthesizer */}
      <AudioPlayer />

      <AnimatePresence mode="wait">
        {!isEnvelopeOpen ? (
          <motion.div
            key="envelope-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full min-h-screen"
          >
            <EnvelopeScreen
              config={weddingData}
              onOpenComplete={() => setIsEnvelopeOpen(true)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="main-invitation-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-screen"
          >
            <MainInvitation
              config={weddingData}
              onSelectEvent={(event) => setSelectedEvent(event)}
              onReopenEnvelope={() => setIsEnvelopeOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Individual Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDetailModal
            event={selectedEvent}
            couple={weddingData.couple}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
