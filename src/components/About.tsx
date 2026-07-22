import React from 'react';
import { motion } from 'framer-motion';
import { Film, Eye, Sparkles, MapPin, Target, Zap } from 'lucide-react';

export const About: React.FC = () => {
  const pillars = [
    {
      title: 'Cinematic Storytelling',
      desc: 'High-concept video production and visual direction that crafts an unforgettable brand identity.',
      icon: Film,
      color: 'from-[#FF94C7] to-[#FF69B4]',
    },
    {
      title: 'Intentional Growth',
      desc: 'Purposeful content systems focused on true audience connection rather than posting just to post.',
      icon: Eye,
      color: 'from-[#D4B8FF] to-[#9333EA]',
    },
    {
      title: 'Operational Excellence',
      desc: 'Automated post-production media pipelines, 3D web modeling, and remote talent sourcing.',
      icon: Zap,
      color: 'from-[#99FFE0] to-[#059669]',
    },
  ];

  return (
    <section id="about" className="py-28 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Top Regional Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 glass-card p-6 sm:p-8 rounded-3xl border border-[#FFB6D9] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FFB6D9]/30 border border-[#FFB6D9] flex items-center justify-center text-[#D83685] shrink-0">
              <MapPin className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#D83685] block mb-1">
                Regional Coverage Radius
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1A1626]">
                Tampa Bay • Clearwater • St. Petersburg, FL
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#FFF5F8] border border-[#FFB6D9] text-xs font-extrabold text-[#1A1626] shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-pulse" />
            <span>3-Hour Drive Radius On-Location + Nationwide Remote</span>
          </div>
        </motion.div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-widest text-[#D83685] mb-3 block"
          >
            Our Philosophy
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-[#1A1626]"
          >
            We Don't Just Post. <br />
            <span className="gradient-text">We Build Media Empires.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#4A4259] text-lg sm:text-xl font-medium leading-relaxed"
          >
            Traditional agencies waste budget on generic high-volume posting. We focus on high-impact hero content, 3D web experiences, and scalable talent infrastructure.
          </motion.p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card glass-card-hover p-8 rounded-3xl border border-[#FFB6D9]/50 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${pillar.color} p-3.5 mb-6 text-white shadow-md flex items-center justify-center`}>
                  <pillar.icon className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-black text-[#1A1626] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-[#4A4259] text-sm leading-relaxed font-medium">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
