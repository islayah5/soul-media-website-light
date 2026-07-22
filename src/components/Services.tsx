import React from 'react';
import { motion } from 'framer-motion';
import { Video, Scissors, Box, Palette, Share2, Users, CheckCircle2 } from 'lucide-react';

export const Services: React.FC = () => {
  const serviceList = [
    {
      title: 'Cinematic On-Location Filming',
      category: 'Production',
      desc: 'High-production 4K video shoots, commercial directing, and studio photography capturing authentic brand authority.',
      icon: Video,
      color: 'from-[#FF94C7] to-[#FF69B4]',
      features: [
        '4K Cinema Camera Rigging',
        'Commercial Lighting & Audio',
        '3-Hour Tampa Bay Shoot Radius',
        'Lifestyle & Studio Photography',
      ],
    },
    {
      title: 'Post-Production & Visual Editing',
      category: 'Editing',
      desc: 'High-volume short-form reel cuts, sound design, color grading, and multi-platform aspect ratio rendering.',
      icon: Scissors,
      color: 'from-[#D4B8FF] to-[#9333EA]',
      features: [
        'Short-Form Vertical Reels',
        'Master Sound & Dialogue Editing',
        'Cinematic Color Grading',
        'Multi-Format Social Exports',
      ],
    },
    {
      title: '3D Modeling & Interactive Web',
      category: 'Tech Solutions',
      desc: 'Bespoke 3D product renders, WebGL canvas experiences, custom web builds, and smart lead automation engines.',
      icon: Box,
      color: 'from-[#99FFE0] to-[#059669]',
      features: [
        'Custom 3D Renders & Models',
        'WebGL Interactive Canvas',
        'High-Speed React Builds',
        'Automated Intake Engines',
      ],
    },
    {
      title: 'Graphic Design & Brand Assets',
      category: 'Design Suite',
      desc: 'Commercial graphic design, pitch decks, social media templates, merchandise graphics, and brand style kits.',
      icon: Palette,
      color: 'from-[#FFB399] to-[#EA580C]',
      features: [
        'Commercial Brand Assets',
        'Executive Pitch Decks',
        'Social Media Template Systems',
        'Merch & Collateral Design',
      ],
    },
    {
      title: 'Intentional Social Media Management',
      category: 'Growth Strategy',
      desc: 'Purposeful content calendar planning, audience connection, and dedicated engagement with your target market.',
      icon: Share2,
      color: 'from-[#FF94C7] to-[#D83685]',
      features: [
        'Purposeful Content Calendar',
        'Audience Voice & Community',
        'High-Converting Ad Strategy',
        'Analytics & Performance Insights',
      ],
    },
    {
      title: 'Talent Sourcing & Training Advisory',
      category: 'Advisory',
      desc: 'We recruit, vet, and train in-house or remote SMMs and editors directly for your team (no employer liability).',
      icon: Users,
      color: 'from-[#D4B8FF] to-[#7C3AED]',
      features: [
        'Talent Sourcing & Vetting',
        'SOP Best Practices Training',
        'Direct Client Hire (No Markup)',
        'Workflow Integration Support',
      ],
    },
  ];

  return (
    <section id="services" className="py-28 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-widest text-[#D83685] mb-3 block"
          >
            Core Capabilities
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-[#1A1626]"
          >
            Capabilities That Drive <br />
            <span className="gradient-text">Measurable Authority</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#4A4259] text-lg sm:text-xl font-medium leading-relaxed"
          >
            Every service is engineered to combine creative excellence with modern technology and operational efficiency.
          </motion.p>
        </div>

        {/* 6 Uniform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card glass-card-hover rounded-3xl p-8 border border-[#FFB6D9]/50 shadow-xl flex flex-col justify-between h-full"
            >
              <div>
                {/* Category Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${service.color} p-3.5 text-white shadow-md flex items-center justify-center`}>
                    <service.icon className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#FFB6D9]/25 text-[#D83685] border border-[#FFB6D9]/50 text-[10px] font-black uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>

                {/* Enforced Container Heights for Uniform Card Baselines */}
                <div className="min-h-[64px] flex items-center mb-3">
                  <h3 className="text-xl sm:text-2xl font-black text-[#1A1626] leading-tight">
                    {service.title}
                  </h3>
                </div>

                <div className="min-h-[72px] mb-6">
                  <p className="text-[#4A4259] text-xs sm:text-sm font-medium leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>

              {/* Checklist */}
              <div className="pt-4 border-t border-[#FFB6D9]/30 mt-auto">
                <ul className="space-y-2.5">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs font-bold text-[#1A1626]">
                      <CheckCircle2 className="w-4 h-4 text-[#D83685] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
