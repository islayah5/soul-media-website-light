import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2, Calendar } from 'lucide-react';
import { sendLeadPayloadBackground } from '../utils/emailService';
import { trackEvent } from '../utils/telemetry';
import { CalBookingModal } from './CalBookingModal';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Cinematic On-Location Filming',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isCalModalOpen, setIsCalModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Telemetry Event
    trackEvent('contact_form_submitted', {
      service_interest: formData.service,
    });

    // Silent background lead capture & email dispatch
    sendLeadPayloadBackground('ContactForm', {
      name: formData.name,
      email: formData.email,
      serviceInterest: formData.service,
      message: formData.message,
    });

    setSubmitted(true);
    setIsCalModalOpen(true);
  };

  return (
    <section id="contact" className="py-28 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Info Column */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-black uppercase tracking-widest text-[#D83685] mb-3 block"
            >
              Direct Executive Intake
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black mb-6 text-[#1A1626]"
            >
              Let's Build Something <br />
              <span className="gradient-text">Extraordinary Together</span>
            </motion.h2>

            <p className="text-[#4A4259] text-base sm:text-lg font-medium leading-relaxed mb-10">
              Ready to elevate your media presence? Connect directly with Jada, Isaiah, and Joe to schedule an executive strategy session.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-[#FFB6D9]/50 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#FFB6D9]/30 text-[#D83685] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase text-[#D83685] block">Regional HQ</span>
                  <span className="text-base font-black text-[#1A1626]">Tampa Bay / Clearwater / St. Petersburg, FL</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-[#FFB6D9]/50 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#D4B8FF]/30 text-[#7C3AED] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase text-[#D83685] block">Direct Executive Email</span>
                  <a href="mailto:soulmediagroup.info@gmail.com" className="text-base font-black text-[#1A1626] hover:text-[#7C3AED] transition-colors">
                    soulmediagroup.info@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-[#FFB6D9]/50 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#C2FFE5]/50 text-[#059669] flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase text-[#D83685] block">Response SLA</span>
                  <span className="text-base font-black text-[#1A1626]">Guaranteed 24-Hour Executive Turnaround</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 sm:p-12 rounded-3xl border border-[#FFB6D9] shadow-2xl"
          >
            <h3 className="text-2xl font-black text-[#1A1626] mb-6">
              Schedule Your Strategy Call
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-xs font-black text-[#D83685] uppercase tracking-wider block mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Isaiah Chandler"
                  className="w-full px-4 py-3 rounded-2xl glass-card border border-[#FFB6D9] text-[#1A1626] font-bold text-sm focus:outline-none focus:border-[#D83685]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-black text-[#D83685] uppercase tracking-wider block mb-2">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="isaiah@brand.com"
                    className="w-full px-4 py-3 rounded-2xl glass-card border border-[#FFB6D9] text-[#1A1626] font-bold text-sm focus:outline-none focus:border-[#D83685]"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-[#D83685] uppercase tracking-wider block mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(813) 555-0199"
                    className="w-full px-4 py-3 rounded-2xl glass-card border border-[#FFB6D9] text-[#1A1626] font-bold text-sm focus:outline-none focus:border-[#D83685]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-[#D83685] uppercase tracking-wider block mb-2">Primary Interest</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl glass-card border border-[#FFB6D9] text-[#1A1626] font-bold text-sm focus:outline-none focus:border-[#D83685]"
                >
                  <option value="Cinematic On-Location Filming">Cinematic On-Location Filming</option>
                  <option value="Full Retainer & Social Management">Full Retainer & Social Management</option>
                  <option value="3D Modeling & Interactive Web">3D Modeling & Interactive Web</option>
                  <option value="Talent Sourcing & Training Advisory">Talent Sourcing & Training Advisory</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black text-[#D83685] uppercase tracking-wider block mb-2">Message or Goal</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Briefly describe your goals, budget, or timeline..."
                  className="w-full p-4 rounded-2xl glass-card border border-[#FFB6D9] text-[#1A1626] font-bold text-sm focus:outline-none focus:border-[#D83685]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF94C7] via-[#D4B8FF] to-[#99FFE0] text-[#1A1626] font-black text-sm flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Direct Intake Request</span>
              </button>

              {submitted && (
                <div className="p-4 rounded-2xl bg-[#99FFE0]/30 border border-[#059669] text-[#059669] text-xs font-bold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Inquiry compiled! Strategy booking calendar is active.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCalModalOpen(true)}
                    className="px-4 py-1.5 rounded-full bg-[#059669] text-white font-black text-[11px] hover:scale-105 transition-transform cursor-pointer shrink-0"
                  >
                    Re-Open Calendar
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Cal.com Strategy Booking Modal */}
      <CalBookingModal
        isOpen={isCalModalOpen}
        onClose={() => setIsCalModalOpen(false)}
        prefillName={formData.name}
        prefillEmail={formData.email}
        scopeSummary={`Interest: ${formData.service} | Message: ${formData.message}`}
      />
    </section>
  );
};
