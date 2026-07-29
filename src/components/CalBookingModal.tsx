import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Sparkles, ExternalLink } from 'lucide-react';
import { trackEvent } from '../utils/telemetry';

interface CalBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillName?: string;
  prefillEmail?: string;
  scopeSummary?: string;
}

export const CalBookingModal: React.FC<CalBookingModalProps> = ({
  isOpen,
  onClose,
  prefillName = '',
  prefillEmail = '',
  scopeSummary = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      trackEvent('cal_booking_modal_opened', { has_prefill_name: !!prefillName, has_prefill_email: !!prefillEmail });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, prefillName, prefillEmail]);

  if (!isOpen) return null;

  // Build pre-filled Cal.com booking URL
  const baseUrl = 'https://cal.com/soul-media/30min';
  const queryParams = new URLSearchParams();
  if (prefillName) queryParams.set('name', prefillName);
  if (prefillEmail) queryParams.set('email', prefillEmail);
  if (scopeSummary) queryParams.set('notes', scopeSummary);

  const bookingUrl = `${baseUrl}?${queryParams.toString()}`;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        key="cal-booking-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[999999] bg-[#0D0B14]/80 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden"
      >
        {/* Main Modal Card */}
        <div className="w-full max-w-4xl h-[90vh] glass-card rounded-3xl border border-[#2D124D]/20 shadow-2xl flex flex-col bg-white/95 relative overflow-hidden text-[#0D0B14]">
          {/* Background Ambient Glow Halos */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#FF94C7]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#D4B8FF]/20 blur-3xl pointer-events-none" />

          {/* Modal Header Bar */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between shrink-0 relative z-10 bg-white/90">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2D124D]/10 border border-[#2D124D]/20 flex items-center justify-center text-[#2D124D]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#2D124D] uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-[#FF94C7]" />
                  <span>Executive Calendar — Cal.com Sync</span>
                </div>
                <h3 className="text-lg font-black text-[#0D0B14]">Book Your 30-Min Strategy Call</h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full glass-card border border-gray-200 text-xs font-bold text-gray-700 hover:text-[#2D124D] hover:border-[#2D124D] transition-all cursor-pointer"
                title="Open in new browser tab"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#2D124D]" />
              </a>

              <button
                onClick={onClose}
                className="p-2 sm:px-4 sm:py-2 rounded-full bg-gray-100 hover:bg-red-500/10 border border-gray-200 text-gray-700 hover:text-red-500 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                aria-label="Close Calendar"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>
          </div>

          {/* Cal.com Embed Viewport */}
          <div className="flex-grow w-full relative bg-white">
            <iframe
              src={bookingUrl}
              title="Cal.com Executive Strategy Booking"
              className="w-full h-full border-0 block bg-white"
              loading="eager"
              allow="camera; microphone; autoplay; clipboard-write;"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};
