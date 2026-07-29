import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Cpu, ExternalLink, X, Globe, Award, ArrowLeft } from 'lucide-react';

import jadaHeadshot from '../assets/Jada_Brown-Headshot-Master.jpg';
import isaiahHeadshot from '../assets/Isaiah_Chandler-Headshot-Master.jpg';
import joeHeadshot from '../assets/Joe_Irizarry-Headshot-Master.jpg';

import glassCamera from '../assets/glass-3d-camera.png';
import glassPlayer from '../assets/glass-3d-videoplayer.png';
import glassKeyboard from '../assets/glass-3d-keyboard.png';
import glassStars from '../assets/glass-3d-stars.png';
import glassStylus from '../assets/glass-3d-stylus.png';
import glassFilmstrip from '../assets/glass-3d-filmstrip.png';

export const Team: React.FC = () => {
  const [activePortfolio, setActivePortfolio] = useState<{
    name: string;
    role: string;
    subRole?: string;
    url: string;
    image?: string;
  } | null>(null);

  // Lock background page scroll and set modal open attribute on body
  useEffect(() => {
    if (activePortfolio) {
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-portfolio-modal-open', 'true');
    } else {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-portfolio-modal-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-portfolio-modal-open');
    };
  }, [activePortfolio]);

  const teamMembers = [
    {
      name: 'Jada Brown',
      role: 'Founder & Executive Producer',
      subRole: 'Brand & Client Experience Director',
      bio: 'Visionary brand architect leading creative direction, brand core definition, and client partnership. Jada works directly with clients to translate their identity into high-converting visual media.',
      image: jadaHeadshot,
      glassElement: glassPlayer,
      secondaryGlassElement: glassStars,
      glassPosition: 'top-[-18px] right-[-18px] w-36 h-36 sm:w-40 sm:h-40',
      secondaryGlassPosition: 'left-[-8px] bottom-[12px] w-32 h-32',
      bgGradient: 'radial-gradient(ellipse at 50% 30%, #4D183B 0%, #240C1B 55%, #12050E 100%)',
      icon: Sparkles,
      color: 'from-[#FF94C7] to-[#D83685]',
      glowColor: 'rgba(255, 148, 199, 0.45)',
      badge: 'Agency Founder',
      portfolioUrl: '', // Jada's portfolio in development
    },
    {
      name: 'Isaiah Chandler',
      role: 'Systems & Operations Director',
      subRole: 'Growth & Automation Strategist',
      bio: 'Operations mastermind architecting scalable post-production workflows, 3D web modeling, automated editing pipelines, and cost-effective remote talent integration for seamless client growth.',
      image: isaiahHeadshot,
      glassElement: glassKeyboard,
      secondaryGlassElement: glassStylus,
      glassPosition: 'top-[-22px] right-[-22px] w-32 h-32 sm:w-36 sm:h-36',
      secondaryGlassPosition: 'left-[-18px] bottom-[26px] w-36 h-36',
      bgGradient: 'radial-gradient(ellipse at 50% 30%, #381A5E 0%, #1A0A2F 55%, #0B0415 100%)',
      icon: Cpu,
      color: 'from-[#D4B8FF] to-[#7C3AED]',
      glowColor: 'rgba(212, 184, 255, 0.45)',
      badge: 'Ops & Tech Lead',
      portfolioUrl: 'https://isaiah-chandler.netlify.app/',
    },
    {
      name: 'Joe Irizarry',
      role: 'Director of Photography & Videography',
      subRole: 'Lead Visual Editor',
      bio: 'Master lensman and editor orchestrating high-impact commercial video shoots, studio photography, cinematic cuts, and the signature visual styling that sets Soul Media apart.',
      image: joeHeadshot,
      glassElement: glassCamera,
      secondaryGlassElement: glassFilmstrip,
      glassPosition: 'top-[-26px] right-[-26px] w-36 h-36 sm:w-40 sm:h-40',
      secondaryGlassPosition: 'left-[-18px] bottom-[26px] w-36 h-36',
      bgGradient: 'radial-gradient(ellipse at 50% 30%, #164652 0%, #0A2228 55%, #040E11 100%)',
      icon: Camera,
      color: 'from-[#99FFE0] to-[#059669]',
      glowColor: 'rgba(153, 255, 224, 0.45)',
      badge: 'Production Engine',
      portfolioUrl: '', // Joe's portfolio in development
    },
  ];

  // Modal Portal Element rendered at top-level document.body
  const renderModalPortal = () => {
    if (!activePortfolio) return null;

    return ReactDOM.createPortal(
      <AnimatePresence>
        <motion.div
          key="portfolio-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[99999] bg-[#FFF5F8] w-screen h-screen flex flex-col overflow-hidden"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Top Control Header Bar */}
          <div className="h-16 px-4 sm:px-8 bg-[#FFF5F8] border-b border-[#FFB6D9] flex items-center justify-between shrink-0 relative z-[100000] shadow-md">
            {/* Left Action: Return to Soul Media */}
            <button
              onClick={() => setActivePortfolio(null)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF94C7] via-[#D4B8FF] to-[#99FFE0] text-[#1A1626] font-black text-xs sm:text-sm flex items-center gap-2 hover:shadow-[0_0_25px_rgba(255,148,199,0.8)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[3]" />
              <span>Return to Soul Media</span>
            </button>

            {/* Center Title Indicator */}
            <div className="hidden md:flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#059669] animate-pulse" />
              <h4 className="text-sm font-black text-[#1A1626] tracking-wide">
                {activePortfolio.name} <span className="text-[#D83685]">— {activePortfolio.role}</span>
              </h4>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {activePortfolio.url && (
                <a
                  href={activePortfolio.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-card border border-[#FFB6D9] text-xs font-black text-[#1A1626] hover:border-[#D83685] transition-all cursor-pointer"
                  title={`Open ${activePortfolio.name.split(' ')[0]}'s site in a new tab`}
                >
                  <span className="hidden sm:inline">Open {activePortfolio.name.split(' ')[0]}'s Portfolio in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D83685]" />
                </a>
              )}
              <button
                onClick={() => setActivePortfolio(null)}
                className="p-2 sm:px-4 sm:py-2 rounded-full bg-white hover:bg-red-500/10 border border-[#FFB6D9] text-[#1A1626] hover:text-red-600 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                aria-label="Close Showcase"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>
          </div>

          {/* iFrame Viewport Container */}
          <div className="flex-grow w-full h-[calc(100vh-64px)] relative bg-[#FFF5F8]">
            {activePortfolio.url ? (
              <iframe
                src={activePortfolio.url}
                title={`${activePortfolio.name} Portfolio`}
                className="w-full h-full border-0 block bg-[#FFF5F8]"
                loading="eager"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-12 text-center bg-[#FFF5F8] overflow-y-auto">
                <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8 sm:p-12 border border-[#FFB6D9] shadow-2xl relative overflow-hidden">
                  {/* Background ambient glow halo */}
                  <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#FF94C7]/20 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#D4B8FF]/20 blur-3xl pointer-events-none" />

                  {/* Leader Avatar Profile Frame */}
                  {activePortfolio.image && (
                    <div className="w-36 h-36 sm:w-40 sm:h-40 mx-auto mb-6 rounded-full overflow-hidden border-2 border-[#FFB6D9] shadow-2xl relative z-10 bg-[#10080F]">
                      <img
                        src={activePortfolio.image}
                        alt={activePortfolio.name}
                        className="w-full h-full object-cover scale-[1.57] origin-[center_41%]"
                      />
                    </div>
                  )}

                  {/* Live Status Pill */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D83685]/10 border border-[#D83685]/30 text-xs font-black text-[#D83685] mb-6 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D83685] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D83685]"></span>
                    </span>
                    <span>Executive Showcase — In Production</span>
                  </div>

                  {/* Title & Role */}
                  <h3 className="text-3xl sm:text-4xl font-black text-[#1A1626] mb-2 tracking-tight">
                    {activePortfolio.name}
                  </h3>
                  <p className="text-xs font-black text-[#D83685] uppercase tracking-widest mb-1">
                    {activePortfolio.role}
                  </p>
                  {activePortfolio.subRole && (
                    <p className="text-xs font-bold text-[#4A4259] italic mb-6">
                      {activePortfolio.subRole}
                    </p>
                  )}

                  {/* Body Copy */}
                  <p className="text-[#4A4259] text-sm sm:text-base font-medium leading-relaxed max-w-lg mx-auto mb-8">
                    {activePortfolio.name.split(' ')[0]}'s interactive case studies, creative direction portfolio, and executive presentation decks are currently being curated for the 2026 client showcase.
                    <br /><br />
                    To request custom media samples or an executive pitch deck directly, connect with our leadership team.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                    <a
                      href="#contact"
                      onClick={() => setActivePortfolio(null)}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF94C7] via-[#D4B8FF] to-[#99FFE0] text-[#1A1626] font-black text-xs sm:text-sm flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-lg cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#D83685]" />
                      <span>Connect with Executive Team</span>
                    </a>

                    <button
                      onClick={() => setActivePortfolio(null)}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full glass-card border border-[#FFB6D9] text-[#1A1626] hover:border-[#D83685] font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                    >
                      <ArrowLeft className="w-4 h-4 text-[#D83685]" />
                      <span>Return to Soul Media</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>,
      document.body
    );
  };

  return (
    <section id="team" className="py-28 px-6 relative z-10 bg-[#FFF5F8]/60">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-widest text-[#D83685] mb-3 block"
          >
            Leadership Spotlight
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-[#1A1626]"
          >
            The Minds Behind <br />
            <span className="gradient-text">Soul Media</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#4A4259] text-lg sm:text-xl font-medium leading-relaxed"
          >
            A high-velocity 3-person executive core pairing cinematic artistry, operational technology, and personable brand direction.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-[#FFB6D9]/50 shadow-xl flex flex-col justify-between group hover:border-[#D83685]/60 hover:shadow-[0_20px_50px_rgba(216,54,133,0.18)] transition-all duration-500"
            >
              <div>
                {/* Image Container — Precision-Framed with Ambient Lighting */}
                <div
                  className="relative aspect-[4/5] overflow-hidden"
                  style={{ background: member.bgGradient }}
                >
                  {/* Rich ambient brand glow on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`}
                    style={{ filter: 'blur(30px)', transform: 'scale(1.1)' }}
                  />

                  {/* Master Pre-Framed Headshot Asset */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover relative z-10 transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Top-Right Primary 3D Glass Branded Object (Pushed to Extreme Corner — Zero Face Overlap) */}
                  {member.glassElement && (
                    <motion.div
                      className={`absolute ${member.glassPosition || 'top-[-20px] right-[-20px] w-36 h-36'} opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none z-20 mix-blend-screen`}
                      animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
                      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <img
                        src={member.glassElement}
                        alt="Primary 3D Glass Element"
                        className="w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(255,255,255,0.6)]"
                      />
                    </motion.div>
                  )}

                  {/* Bottom-Left Secondary 3D Glass Branded Object (Pushed to Extreme Corner — Zero Face Overlap) */}
                  {member.secondaryGlassElement && (
                    <motion.div
                      className={`absolute ${member.secondaryGlassPosition || 'left-[-8px] bottom-[10px] w-32 h-32'} opacity-75 group-hover:opacity-100 group-hover:scale-115 transition-all duration-700 pointer-events-none z-20 mix-blend-screen`}
                      animate={{ y: [0, 8, 0], rotate: [0, -4, 4, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    >
                      <img
                        src={member.secondaryGlassElement}
                        alt="Secondary 3D Glass Element"
                        className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(255,255,255,0.5)]"
                      />
                    </motion.div>
                  )}

                  {/* Bottom-only gradient fade */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-[25%] pointer-events-none transition-opacity duration-500 z-20"
                    style={{
                      background: 'linear-gradient(to top, #FFF5F8 0%, rgba(255,245,248,0.4) 50%, transparent 100%)',
                    }}
                  />

                  {/* Ambient edge glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30"
                    style={{
                      boxShadow: `inset 0 0 60px 10px ${member.glowColor}`,
                    }}
                  />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-black text-white flex items-center gap-1.5 shadow-lg z-30"
                    style={{ backgroundColor: 'rgba(26, 22, 38, 0.55)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
                  >
                    <member.icon className="w-3.5 h-3.5" />
                    <span>{member.badge}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1A1626] mb-1">
                    {member.name}
                  </h3>
                  <span className="text-xs font-black text-[#D83685] uppercase tracking-wider block mb-1">
                    {member.role}
                  </span>
                  <span className="text-xs font-bold text-[#4A4259] block mb-4 italic">
                    {member.subRole}
                  </span>
                  <p className="text-[#4A4259] text-sm font-medium leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Individual Portfolio Buttons */}
              <div className="px-8 pb-8 space-y-3">
                {member.portfolioUrl ? (
                  <>
                    <button
                      onClick={() =>
                        setActivePortfolio({
                          name: member.name,
                          role: member.role,
                          subRole: member.subRole,
                          url: member.portfolioUrl,
                          image: member.image,
                        })
                      }
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF94C7] via-[#D4B8FF] to-[#99FFE0] text-[#1A1626] font-black text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-lg cursor-pointer"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Preview Interactive Portfolio</span>
                    </button>

                    <a
                      href={member.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl glass-card border border-[#FFB6D9] text-[#1A1626] hover:border-[#D83685] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Open {member.name.split(' ')[0]}'s Portfolio in New Tab</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#D83685]" />
                    </a>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      setActivePortfolio({
                        name: member.name,
                        role: member.role,
                        subRole: member.subRole,
                        url: '',
                        image: member.image,
                      })
                    }
                    className="w-full py-3.5 rounded-2xl glass-card border border-[#FFB6D9] text-xs font-black text-[#4A4259] flex items-center justify-center gap-2 hover:text-[#1A1626] hover:border-[#D83685] transition-all cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-[#D83685]" />
                    <span>Executive Showcase</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Render Modal via React Portal directly onto document.body */}
      {renderModalPortal()}
    </section>
  );
};
