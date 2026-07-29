import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sliders,
  CheckCircle2,
  Send,
  Sparkles,
  Calculator,
  Film,
  Scissors,
  Box,
  Palette,
  Share2,
  Users,
  Building2,
  Mail,
  User,
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Calendar,
} from 'lucide-react';
import { sendLeadPayloadBackground } from '../utils/emailService';
import { trackEvent } from '../utils/telemetry';
import { CalBookingModal } from './CalBookingModal';

export const QuoteBuilder: React.FC = () => {
  const [step, setStep] = useState(1);
  const [volume, setVolume] = useState(12); // Assets per month
  const [isRetainer, setIsRetainer] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [isCalModalOpen, setIsCalModalOpen] = useState(false);

  // Service Selections
  const [services, setServices] = useState<string[]>([
    'Cinematic On-Location Filming',
    'Post-Production & Visual Editing',
  ]);

  // Client Details
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: '',
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const availableServices = [
    { name: 'Cinematic On-Location Filming', icon: Film, base: 1200 },
    { name: 'Post-Production & Visual Editing', icon: Scissors, base: 900 },
    { name: '3D Modeling & Interactive Web', icon: Box, base: 1500 },
    { name: 'Graphic Design & Brand Assets', icon: Palette, base: 600 },
    { name: 'Intentional Social Media Management', icon: Share2, base: 1000 },
    { name: 'Talent Sourcing & Training Advisory', icon: Users, base: 800 },
  ];

  const toggleService = (name: string) => {
    if (services.includes(name)) {
      setServices(services.filter((s) => s !== name));
    } else {
      setServices([...services, name]);
    }
  };

  // Calculate Scope Estimate Range
  const calculateEstimate = () => {
    let base = services.reduce((acc, curr) => {
      const found = availableServices.find((s) => s.name === curr);
      return acc + (found ? found.base : 500);
    }, 1000);

    const volumeMultiplier = 1 + (volume - 4) * 0.05;
    const totalBase = base * volumeMultiplier;

    const min = Math.round(totalBase * 0.85);
    const max = Math.round(totalBase * 1.25);

    return { min: min.toLocaleString(), max: max.toLocaleString() };
  };

  const handleNext = () => {
    if (step === 3) {
      // Trigger Confetti Celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFB6D9', '#E5D4FF', '#FFD4C2', '#C2FFE5'],
      });
    }
    trackEvent('scope_builder_step_viewed', { step_number: step + 1, volume, is_retainer: isRetainer });
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const estimate = calculateEstimate();

    // Telemetry Event
    trackEvent('scope_builder_submitted', {
      deliverable_volume: volume,
      management_level: isRetainer ? 'Monthly Retainer' : 'One-Time Project',
      services_selected: services.join(', '),
      estimated_min: parseInt(estimate.min.replace(/,/g, '')),
      estimated_max: parseInt(estimate.max.replace(/,/g, '')),
    });

    // Silent background lead capture & email dispatch
    sendLeadPayloadBackground('ScopeBuilder', {
      name: formData.name,
      email: formData.email,
      businessName: formData.company,
      deliverableVolume: volume,
      managementLevel: isRetainer ? 'Monthly Retainer' : 'One-Time Project',
      servicesSelected: services,
      notes: formData.notes,
      estimatedMin: parseInt(estimate.min.replace(/,/g, '')),
      estimatedMax: parseInt(estimate.max.replace(/,/g, '')),
    });

    setSubmitted(true);
    setIsCalModalOpen(true);
  };

  const estimate = calculateEstimate();

  return (
    <section id="quote-builder" className="py-28 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-widest text-[#D83685] mb-3 block"
          >
            Interactive Scope Engine
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-6 text-[#1A1626]"
          >
            Configure Your Custom <br />
            <span className="gradient-text">Retainer & Scope Estimate</span>
          </motion.h2>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-4 max-w-xs mx-auto mt-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  step >= i
                    ? 'w-12 bg-gradient-to-r from-[#FF94C7] to-[#7C3AED]'
                    : 'w-4 bg-[#FFB6D9]/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Wizard Container */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-[#FFB6D9] shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {/* STEP 1: Volume & Retainer Type */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-black text-[#1A1626] mb-2">
                    Step 1: Deliverable Volume & Model
                  </h3>
                  <p className="text-[#4A4259] text-sm font-medium">
                    Adjust the monthly asset volume slider to set your required content output.
                  </p>
                </div>

                {/* Retainer Toggle */}
                <div className="flex items-center justify-center gap-4 p-2 rounded-full glass-card border border-[#FFB6D9]/50 max-w-sm mx-auto">
                  <button
                    type="button"
                    onClick={() => setIsRetainer(true)}
                    className={`flex-1 py-2.5 rounded-full text-xs font-black transition-all ${
                      isRetainer
                        ? 'bg-gradient-to-r from-[#FF94C7] to-[#D4B8FF] text-[#1A1626] shadow-md'
                        : 'text-[#4A4259]'
                    }`}
                  >
                    Monthly Retainer
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsRetainer(false)}
                    className={`flex-1 py-2.5 rounded-full text-xs font-black transition-all ${
                      !isRetainer
                        ? 'bg-gradient-to-r from-[#FF94C7] to-[#D4B8FF] text-[#1A1626] shadow-md'
                        : 'text-[#4A4259]'
                    }`}
                  >
                    One-Time Project
                  </button>
                </div>

                {/* Slider */}
                <div className="p-8 rounded-2xl glass-card border border-[#FFB6D9]/40 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-[#D83685] uppercase tracking-wider">
                      Target Monthly Asset Output
                    </span>
                    <span className="text-3xl font-black text-[#1A1626]">
                      {volume} <span className="text-xs font-bold text-[#4A4259]">Assets/mo</span>
                    </span>
                  </div>

                  <input
                    type="range"
                    min="4"
                    max="60"
                    step="2"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="w-full h-3 bg-[#FFB6D9]/40 rounded-lg appearance-none cursor-pointer accent-[#D83685]"
                  />

                  <div className="flex justify-between text-[11px] font-bold text-[#4A4259]">
                    <span>4 Assets (Baseline)</span>
                    <span>24 Assets (Standard)</span>
                    <span>60+ Assets (Full Scale)</span>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF94C7] via-[#D4B8FF] to-[#99FFE0] text-[#1A1626] font-black text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-lg cursor-pointer"
                  >
                    <span>Next: Select Services</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Service Checklist */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-black text-[#1A1626] mb-2">
                    Step 2: Core Capability Matrix
                  </h3>
                  <p className="text-[#4A4259] text-sm font-medium">
                    Select all capabilities you need included in your custom retainer.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {availableServices.map((service) => {
                    const isSelected = services.includes(service.name);
                    return (
                      <button
                        key={service.name}
                        type="button"
                        onClick={() => toggleService(service.name)}
                        className={`p-5 rounded-2xl border text-left flex items-start gap-4 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#FFB6D9]/30 to-[#E5D4FF]/30 border-[#D83685] shadow-md scale-[1.02]'
                            : 'glass-card border-[#FFB6D9]/40 hover:border-[#D83685]'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#D83685] text-white' : 'bg-[#FFB6D9]/20 text-[#D83685]'
                          }`}
                        >
                          <service.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-[#1A1626] mb-1">
                            {service.name}
                          </h4>
                          <span className="text-[11px] font-bold text-[#D83685]">
                            {isSelected ? 'Selected' : '+ Add to Scope'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-3 rounded-full glass-card border border-[#FFB6D9] text-[#1A1626] font-bold text-xs flex items-center gap-2 hover:bg-[#FFB6D9]/20 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={services.length === 0}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF94C7] via-[#D4B8FF] to-[#99FFE0] text-[#1A1626] font-black text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    <span>Next: Business Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Business & Contact Info */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-black text-[#1A1626] mb-2">
                    Step 3: Executive Profile
                  </h3>
                  <p className="text-[#4A4259] text-sm font-medium">
                    Enter your contact channels so we can deliver your custom presentation deck.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-black text-[#D83685] uppercase tracking-wider block mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-4 top-3.5 text-[#D83685]" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Isaiah Chandler"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl glass-card border border-[#FFB6D9] text-[#1A1626] font-bold text-sm focus:outline-none focus:border-[#D83685]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#D83685] uppercase tracking-wider block mb-2">
                      Company / Brand Name *
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 absolute left-4 top-3.5 text-[#D83685]" />
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Soul Media Partner"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl glass-card border border-[#FFB6D9] text-[#1A1626] font-bold text-sm focus:outline-none focus:border-[#D83685]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#D83685] uppercase tracking-wider block mb-2">
                      Work Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-4 top-3.5 text-[#D83685]" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="isaiah@brand.com"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl glass-card border border-[#FFB6D9] text-[#1A1626] font-bold text-sm focus:outline-none focus:border-[#D83685]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-[#D83685] uppercase tracking-wider block mb-2">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-4 top-3.5 text-[#D83685]" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(813) 555-0199"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl glass-card border border-[#FFB6D9] text-[#1A1626] font-bold text-sm focus:outline-none focus:border-[#D83685]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-[#D83685] uppercase tracking-wider block mb-2">
                    Additional Project Notes or Goals
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us about your upcoming campaign or filming goals..."
                    className="w-full p-4 rounded-2xl glass-card border border-[#FFB6D9] text-[#1A1626] font-bold text-sm focus:outline-none focus:border-[#D83685]"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-3 rounded-full glass-card border border-[#FFB6D9] text-[#1A1626] font-bold text-xs flex items-center gap-2 hover:bg-[#FFB6D9]/20 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formData.name || !formData.email}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF94C7] via-[#D4B8FF] to-[#99FFE0] text-[#1A1626] font-black text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    <span>Calculate Final Estimate</span>
                    <Calculator className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Estimate & Submission */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF94C7] to-[#99FFE0] flex items-center justify-center mx-auto text-[#1A1626] shadow-xl animate-bounce">
                  <Sparkles className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#D83685] mb-2 block">
                    Custom Scope Calculated
                  </span>
                  <h3 className="text-3xl font-black text-[#1A1626]">
                    Estimated Retainer Investment Range
                  </h3>
                </div>

                <div className="p-8 rounded-3xl bg-gradient-to-r from-[#FFB6D9]/30 via-[#E5D4FF]/30 to-[#C2FFE5]/30 border border-[#D83685] shadow-xl max-w-lg mx-auto">
                  <span className="text-4xl sm:text-6xl font-black text-[#1A1626] block mb-2">
                    ${estimate.min} - ${estimate.max}
                  </span>
                  <span className="text-xs font-extrabold text-[#D83685] uppercase tracking-wider">
                    {isRetainer ? 'Estimated Monthly Retainer' : 'Estimated One-Time Project Investment'}
                  </span>
                </div>

                <div className="p-6 rounded-2xl glass-card border border-[#FFB6D9]/40 text-left max-w-xl mx-auto space-y-3">
                  <h4 className="text-xs font-black text-[#D83685] uppercase tracking-wider">
                    Scope Summary:
                  </h4>
                  <p className="text-xs font-bold text-[#1A1626]">
                    • <strong>Volume</strong>: {volume} Assets/month ({isRetainer ? 'Retainer' : 'One-Time'})
                  </p>
                  <p className="text-xs font-bold text-[#1A1626]">
                    • <strong>Services</strong>: {services.join(', ')}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="pt-4 space-y-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#FF94C7] via-[#D4B8FF] to-[#99FFE0] text-[#1A1626] font-black text-sm flex items-center justify-center gap-3 mx-auto hover:scale-105 transition-all shadow-xl cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Transmit Scope & Schedule Strategy Call</span>
                  </button>

                  {submitted && (
                    <div className="p-5 rounded-2xl bg-[#99FFE0]/30 border border-[#059669] text-[#059669] text-center space-y-3">
                      <p className="text-sm font-bold">
                        ✨ Proposal Transmitted Successfully! Strategy booking calendar is active.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsCalModalOpen(true)}
                        className="px-6 py-2.5 rounded-full bg-[#059669] text-white font-black text-xs inline-flex items-center gap-2 hover:scale-105 transition-transform shadow-lg cursor-pointer"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Re-Open Booking Calendar (cal.com/soul-media/30min)</span>
                      </button>
                    </div>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Cal.com Pre-Filled Strategy Booking Modal */}
      <CalBookingModal
        isOpen={isCalModalOpen}
        onClose={() => setIsCalModalOpen(false)}
        prefillName={formData.name}
        prefillEmail={formData.email}
        scopeSummary={`Monthly Target: ${volume} deliverables/mo | Est: $${estimate.min}-$${estimate.max}`}
      />
    </section>
  );
};
