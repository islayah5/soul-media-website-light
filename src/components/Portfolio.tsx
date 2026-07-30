import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCw, Calendar, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '../utils/telemetry';
import { CalBookingModal } from './CalBookingModal';

import velvetHorizonImg from '../assets/velvet_horizon_brand.jpg';
import apexCapitalImg from '../assets/apex_capital_reel.jpg';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  image: string;
  client: string;
  badge: string;
  status: string;
  deliverables: string;
  techStack: string;
  summary: string;
}

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [selectedProjectForBooking, setSelectedProjectForBooking] = useState<CaseStudy | null>(null);
  const [isCalModalOpen, setIsCalModalOpen] = useState(false);

  const categories = ['All', 'Filming & Commercials', 'Short-Form Reels', '3D Web & Renders', 'Brand Strategy'];

  const caseStudies: CaseStudy[] = [
    {
      id: 'aura-lifestyle',
      title: 'Aura Commercial Campaign',
      category: 'Filming & Commercials',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1200',
      client: 'Aura Apparel',
      badge: '4K Cinema Master',
      status: 'Active Production Spec',
      deliverables: '4K Commercial Master, 12 Social Cutdowns, Motion Color',
      techStack: 'Red V-Raptor 8K • Anamorphic Lenses • DaVinci Color',
      summary: 'High-energy lifestyle fashion commercial shot on location. Engineered for high-conversion social ad campaigns.',
    },
    {
      id: 'velvet-horizon',
      title: 'Velvet Horizon Identity',
      category: 'Brand Strategy',
      image: velvetHorizonImg,
      client: 'Velvet Horizon',
      badge: 'Brand Motion Spec',
      status: 'Executive Identity Showcase',
      deliverables: '3D Motion Identity, Brand Strategy System, Digital Assets',
      techStack: 'Cinema 4D • Octane Render • After Effects',
      summary: 'Complete brand identity refresh and motion graphics package elevating market positioning across digital channels.',
    },
    {
      id: 'solstice-web3d',
      title: 'Solstice 3D Canvas',
      category: '3D Web & Renders',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
      client: 'Solstice Tech',
      badge: 'WebGL 3D Engine',
      status: 'Interactive Web Experience',
      deliverables: 'WebGL 3D Product Configurator, Custom Shader Effects',
      techStack: 'Three.js • React Three Fiber • Vite • GLSL',
      summary: 'Immersive browser-based 3D web experience allowing prospects to interactively explore hardware products in real-time.',
    },
    {
      id: 'apex-capital',
      title: 'Executive Leadership Reels',
      category: 'Short-Form Reels',
      image: apexCapitalImg,
      client: 'Apex Capital',
      badge: 'Retainer Reel Series',
      status: 'Executive Content Engine',
      deliverables: '16 Vertical Reels / Mo, Sound Design, Subtitle Motion',
      techStack: 'Sony FX6 • Wireless Mic Array • Premiere Pro',
      summary: 'Monthly retainer production delivering high-impact executive leadership reels optimized for TikTok, Reels, & Shorts.',
    },
  ];

  const filteredStudies =
    selectedCategory === 'All'
      ? caseStudies
      : caseStudies.filter((item) => item.category === selectedCategory);

  const toggleFlip = (id: string, title: string, client: string) => {
    setFlippedCards((prev) => {
      const nextState = !prev[id];
      if (nextState) {
        trackEvent('portfolio_card_flipped', { project_title: title, client_name: client });
      }
      return { ...prev, [id]: nextState };
    });
  };

  const handleBookCall = (study: CaseStudy) => {
    trackEvent('portfolio_strategy_call_requested', { project_title: study.title, client_name: study.client });
    setSelectedProjectForBooking(study);
    setIsCalModalOpen(true);
  };

  return (
    <section id="portfolio" className="py-28 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-widest text-[#D83685] mb-3 block"
          >
            Selected Portfolio & Production Insights
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-[#1A1626]"
          >
            Recent Works & <br />
            <span className="gradient-text">Visual Directing</span>
          </motion.h2>

          <p className="text-[#4A4259] text-lg font-medium">
            Explore recent commercial productions, motion design, and brand campaigns. Click any card to flip and inspect production details.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-[#1A1626] text-white shadow-lg scale-105'
                  : 'glass-card border border-[#FFB6D9] text-[#1A1626] hover:border-[#D83685]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 3D Flip Card Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study, idx) => {
              const isFlipped = !!flippedCards[study.id];

              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="perspective-1000 h-[460px] w-full"
                >
                  <div
                    className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* FRONT OF CARD */}
                    <div
                      className="absolute inset-0 backface-hidden glass-card rounded-3xl overflow-hidden border border-[#FFB6D9]/50 shadow-xl group cursor-pointer flex flex-col justify-between"
                      onClick={() => toggleFlip(study.id, study.title, study.client)}
                    >
                      <div className="relative h-[280px] overflow-hidden">
                        <img
                          src={study.image}
                          alt={study.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1626]/80 via-[#1A1626]/20 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                          <span className="px-3.5 py-1.5 rounded-full bg-[#FFF5F8]/90 border border-[#FFB6D9] text-xs font-black text-[#D83685]">
                            {study.category}
                          </span>
                          <span className="px-3.5 py-1.5 rounded-full bg-[#1A1626] text-white border border-[#FFB6D9]/40 text-xs font-black">
                            {study.badge}
                          </span>
                        </div>

                        {/* Click to Flip Badge Overlay */}
                        <div className="absolute bottom-4 right-4 z-10">
                          <div className="px-4 py-2 rounded-full bg-[#1A1626]/85 backdrop-blur-md border border-white/30 text-white text-xs font-bold flex items-center gap-2 group-hover:scale-105 transition-transform shadow-lg">
                            <RotateCw className="w-3.5 h-3.5 text-[#FF94C7] animate-spin-slow" />
                            <span>Click to Inspect Specs</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 flex-grow flex flex-col justify-between bg-white/95">
                        <div>
                          <span className="text-xs font-extrabold text-[#D83685] uppercase tracking-wider block mb-1">
                            Client: {study.client}
                          </span>
                          <h3 className="text-2xl font-black text-[#1A1626]">
                            {study.title}
                          </h3>
                        </div>

                        <div className="pt-3 flex items-center justify-between border-t border-gray-100">
                          <span className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-[#D83685]" />
                            <span>{study.status}</span>
                          </span>
                          <span className="text-xs font-black text-[#D83685] flex items-center gap-1">
                            <span>Inspect Specs</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* BACK OF CARD (FLIPPED 3D STATE) — HIGH CONTRAST DARK EXECUTIVE GLASS THEME */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-7 border-2 border-[#FFB6D9]/60 shadow-2xl bg-[#1A1626] text-white flex flex-col justify-between overflow-hidden">
                      {/* Ambient Decorative Light Orbs */}
                      <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#D83685]/30 blur-2xl pointer-events-none" />
                      <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-[#7C3AED]/25 blur-2xl pointer-events-none" />

                      <div className="relative z-10 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D83685]/30 border border-[#FFB6D9]/50 text-xs font-black text-[#FFB6D9] uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5 text-[#FFB6D9]" />
                            <span>{study.status}</span>
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFlip(study.id, study.title, study.client);
                            }}
                            className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-xs font-black text-white flex items-center gap-1.5 transition-all cursor-pointer border border-white/20"
                          >
                            <RotateCw className="w-3.5 h-3.5 text-[#FFB6D9]" />
                            <span>Flip Front</span>
                          </button>
                        </div>

                        <div>
                          <span className="text-xs font-extrabold text-[#FFB6D9] uppercase tracking-widest block mb-1">
                            Client: {study.client}
                          </span>
                          <h3 className="text-2xl font-black text-white tracking-tight">{study.title}</h3>
                        </div>

                        <p className="text-sm font-medium text-gray-200 leading-relaxed">
                          {study.summary}
                        </p>

                        <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-2 text-xs">
                          <div className="flex items-start gap-2.5 text-white font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                            <span><strong className="text-[#FFB6D9]">Deliverables:</strong> {study.deliverables}</span>
                          </div>
                          <div className="flex items-start gap-2.5 text-white font-medium">
                            <CheckCircle2 className="w-4 h-4 text-[#FFB6D9] shrink-0 mt-0.5" />
                            <span><strong className="text-[#FFB6D9]">Tech & Directing:</strong> {study.techStack}</span>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <span className="text-xs font-black text-[#34D399] bg-[#34D399]/15 px-3 py-1 rounded-full border border-[#34D399]/30">
                          {study.badge}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookCall(study);
                          }}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D83685] via-[#E5D4FF] to-[#C2FFE5] text-[#1A1626] font-black text-xs inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-xl cursor-pointer"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Schedule Strategy Call</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Strategy Booking Modal */}
      <CalBookingModal
        isOpen={isCalModalOpen}
        onClose={() => setIsCalModalOpen(false)}
        prefillName=""
        prefillEmail=""
        scopeSummary={selectedProjectForBooking ? `Inquiry regarding case study: ${selectedProjectForBooking.title} (${selectedProjectForBooking.client})` : ''}
      />
    </section>
  );
};
