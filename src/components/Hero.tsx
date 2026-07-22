import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, ArrowDown, Film, MapPin, Box } from 'lucide-react';

export const Hero: React.FC = () => {
  const highlights = [
    { label: 'Cinematic Production', value: '4K On-Location & Studio', icon: Film },
    { label: 'Regional & Remote', value: 'Tampa Bay HQ + Nationwide', icon: MapPin },
    { label: 'Modern Tech Engine', value: '3D Renders & Smart Pipelines', icon: Box },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-[#FFB6D9] mb-8 shadow-lg shadow-[#FFB6D9]/20"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#D83685] animate-pulse" />
          <span className="text-xs md:text-sm font-extrabold tracking-wider uppercase text-[#1A1626]">
            Light Edition • Next-Gen Media Production & Strategy
          </span>
          <Sparkles className="w-4 h-4 text-[#D83685]" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] mb-8 text-[#1A1626]"
        >
          High-Impact Creatives <br />
          <span className="gradient-text">That Scale Your Brand</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-[#4A4259] max-w-3xl mx-auto font-medium leading-relaxed mb-12"
        >
          We combine cinematic storytelling, 3D web modeling, and automated media pipelines to amplify your brand presence.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
        >
          <a
            href="#quote-builder"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-[#FF94C7] via-[#D4B8FF] to-[#99FFE0] text-[#1A1626] font-black text-lg hover:shadow-[0_0_30px_rgba(255,148,199,0.5)] transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-xl"
          >
            Build Custom Scope
          </a>

          <a
            href="#portfolio"
            className="w-full sm:w-auto px-9 py-4 rounded-full glass-card border border-[#FFB6D9] text-[#1A1626] font-bold text-lg flex items-center justify-center gap-3 hover:bg-white/90 transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-md"
          >
            <div className="w-8 h-8 rounded-full bg-[#FFB6D9]/30 flex items-center justify-center text-[#D83685]">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <span>Explore Our Work</span>
          </a>
        </motion.div>

        {/* Authentic Pillars Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {highlights.map((item, i) => (
            <div
              key={i}
              className="glass-card glass-card-hover p-6 rounded-3xl border border-[#FFB6D9]/40 flex flex-col items-center justify-center text-center shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-[#FFB6D9]/25 border border-[#FFB6D9]/50 flex items-center justify-center mb-3 text-[#D83685]">
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-extrabold text-[#D83685] uppercase tracking-wider mb-1">
                {item.label}
              </span>
              <span className="text-base sm:text-lg font-black text-[#1A1626]">
                {item.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#D83685] animate-bounce">
        <a href="#about" aria-label="Scroll to About">
          <ArrowDown className="w-6 h-6 text-[#D83685]" />
        </a>
      </div>
    </section>
  );
};
