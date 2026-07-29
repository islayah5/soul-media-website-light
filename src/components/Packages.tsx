import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Film, Share2, Box, ArrowRight } from 'lucide-react';

export const Packages: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'filming' | 'social' | 'web'>('filming');

  const categories = [
    { id: 'filming', name: 'Filming & Post-Production Only', icon: Film },
    { id: 'social', name: 'Full Retainer & Social Management', icon: Share2 },
    { id: 'web', name: 'Web, 3D & Tech Automations', icon: Box },
  ];

  const packageData = {
    filming: [
      {
        name: 'Starter Filming Retainer',
        price: '$2,200',
        period: '/month',
        tag: 'On-Location Shooting',
        desc: 'Dedicated monthly 4K filming day with cinematic visual editing and master sound design.',
        features: [
          '1 Full Day On-Location Shoot (Tampa Bay)',
          '8 High-Impact Edited Video Reels',
          'Professional Audio & Lighting Setup',
          'Basic Color Grading & Motion Titles',
          'Full Raw Footage Drive Access',
        ],
        highlight: false,
      },
      {
        name: 'Growth Media Retainer',
        price: '$4,500',
        period: '/month',
        tag: 'Most Popular Choice',
        desc: 'Bi-weekly filming sessions with high-volume short-form editing and studio photography.',
        features: [
          '2 Full Days On-Location Shoot / Month',
          '18 High-Impact Edited Video Reels',
          'Studio Product Photography Session',
          'Cinematic Color Grading & Sound Master',
          'Dedicated Content Calendar Planning',
          'Priority Turnaround & Revision Support',
        ],
        highlight: true,
      },
      {
        name: 'Enterprise Cinema Suite',
        price: '$8,500',
        period: '/month',
        tag: 'Full Creative Unit',
        desc: 'Weekly filming sessions, high-volume multi-platform cuts, and lead editor assignment.',
        features: [
          '4 Days On-Location Shoot / Month',
          '36 High-Impact Video Assets / Reels',
          'Full Commercial Photography Suite',
          'Dedicated Lead Editor & Director',
          'Custom 3D Product Motion Assets',
          'Unlimited Revisions & Expedited Output',
        ],
        highlight: false,
      },
    ],
    social: [
      {
        name: 'Core Retainer & Community',
        price: '$3,200',
        period: '/month',
        tag: 'Intentional Engagement',
        desc: 'Filming, editing, and intentional social media management focused on genuine community building.',
        features: [
          '1 Filming Session + 10 Edited Reels',
          'Intentional Content Planning & Posting',
          'Audience Comment & DM Engagement',
          'Graphic Design & Story Templates',
          'Monthly Performance Analytics',
        ],
        highlight: false,
      },
      {
        name: 'Full Growth Retainer',
        price: '$6,800',
        period: '/month',
        tag: 'Complete Agency Solution',
        desc: 'Bi-weekly filming, full social media management, graphic design, and talent sourcing consultation.',
        features: [
          '2 Filming Sessions + 20 Edited Reels',
          'Full Multi-Platform Social Management',
          'High-Converting Graphic Design Suite',
          'Ad Creative Strategy & Testing',
          'In-House SMM Recruiting & Training',
          'Dedicated Brand Director Oversight',
        ],
        highlight: true,
      },
      {
        name: 'Executive Scale Retainer',
        price: '$11,500',
        period: '/month',
        tag: 'Dominance Package',
        desc: 'Weekly filming, high-volume content engine, dedicated social management, and talent advisory.',
        features: [
          '4 Filming Sessions + 40 Edited Reels',
          'Complete Omnichannel Social Dominance',
          'Custom 3D Renders & Graphic Design',
          'Ad Campaign Management & Creative',
          'Dedicated In-House SMM Recruitment',
          'Executive Strategy Sessions & Reporting',
        ],
        highlight: false,
      },
    ],
    web: [
      {
        name: 'High-Speed Web Experience',
        price: '$3,500',
        period: ' one-time',
        tag: 'Custom Web Build',
        desc: 'Bespoke React 18 + Vite landing page with glassmorphism design, fast speeds, and contact wizard.',
        features: [
          'Custom React + Tailwind Web App',
          '99/100 Core Web Vitals Performance',
          'Custom Scope & Quote Calculator',
          'Full Mobile Responsiveness',
          'SEO & Schema.org Graph Integration',
        ],
        highlight: false,
      },
      {
        name: '3D Web & Automation Engine',
        price: '$6,500',
        period: ' one-time',
        tag: '3D Renders & Tech',
        desc: 'Interactive 3D web modeling, custom WebGL canvas, lead intake calculator, and workflow automations.',
        features: [
          'Interactive 3D Model Integrations',
          'WebGL Liquid / Particle Canvas',
          'Interactive Scope & Estimate Wizard',
          'Automated Lead Intake & Email Pipeline',
          'Dedicated Technical SEO & GEO Setup',
          '1-Year Hosting & Maintenance Included',
        ],
        highlight: true,
      },
      {
        name: 'Enterprise Web & Media Suite',
        price: '$12,000+',
        period: ' custom',
        tag: 'Full Platform & Media',
        desc: 'Complete digital transformation pairing custom 3D web platform with video production suite.',
        features: [
          'Bespoke Enterprise Web Platform Build',
          'Custom 3D Product Motion Renders',
          'Commercial Video Shoot & Web Reels',
          'Automated CRM & Intake Integrations',
          'Dedicated Technical Support & SLA',
          'Full Source Code & Repository Handover',
        ],
        highlight: false,
      },
    ],
  };

  return (
    <section id="packages" className="py-28 px-6 relative z-10 bg-[#FFF5F8]/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-widest text-[#D83685] mb-3 block"
          >
            Transparent Investment Tiers
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-[#1A1626]"
          >
            Tailored Retainers & <br />
            <span className="gradient-text">Production Packages</span>
          </motion.h2>

          {/* Category Tabs Switcher */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 p-2 rounded-full glass-card border border-[#FFB6D9]/50 shadow-md">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-6 py-3 rounded-full text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#FF94C7] via-[#D4B8FF] to-[#99FFE0] text-[#1A1626] shadow-lg scale-105'
                    : 'text-[#4A4259] hover:text-[#1A1626]'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {packageData[activeCategory].map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`glass-card glass-card-hover rounded-3xl p-8 border flex flex-col justify-between relative overflow-hidden ${
                  pkg.highlight
                    ? 'border-[#D83685] shadow-2xl scale-105 bg-white/95'
                    : 'border-[#FFB6D9]/50 shadow-xl'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-gradient-to-r from-[#D83685] to-[#7C3AED] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                    Recommended
                  </div>
                )}

                <div>
                  <span className="text-xs font-extrabold text-[#D83685] uppercase tracking-wider block mb-2">
                    {pkg.tag}
                  </span>

                  <h3 className="text-2xl font-black text-[#1A1626] mb-3">
                    {pkg.name}
                  </h3>

                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl sm:text-5xl font-black text-[#1A1626]">
                      {pkg.price}
                    </span>
                    <span className="text-xs font-bold text-[#4A4259]">
                      {pkg.period}
                    </span>
                  </div>

                  <p className="text-[#4A4259] text-xs sm:text-sm font-medium leading-relaxed mb-6">
                    {pkg.desc}
                  </p>

                  <div className="pt-6 border-t border-[#FFB6D9]/30">
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2.5 text-xs font-bold text-[#1A1626]">
                          <Check className="w-4 h-4 text-[#D83685] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <a
                    href="#quote-builder"
                    className={`w-full py-4 rounded-full font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
                      pkg.highlight
                        ? 'bg-gradient-to-r from-[#FF94C7] via-[#D4B8FF] to-[#99FFE0] text-[#1A1626] hover:scale-105'
                        : 'glass-card border border-[#FFB6D9] text-[#1A1626] hover:bg-[#FFB6D9]/20'
                    }`}
                  >
                    <span>Build Custom Scope</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
