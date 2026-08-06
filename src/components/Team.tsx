import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Cpu, ExternalLink, X, Globe, Award, ArrowLeft, Play, Film, Video, Box, Image, Layout, Volume2, VolumeX, Atom, Flame, Zap, Globe2 } from 'lucide-react';

import jadaHeadshot from '../assets/Jada_Brown-Headshot-Master.jpg';
import isaiahHeadshot from '../assets/Isaiah_Chandler-Headshot-Master.jpg';
import isaiahCutout from '../assets/Isaiah_Chandler-Cutout.png';
import joeHeadshot from '../assets/Joe_Irizarry-Headshot-Master.jpg';
import joePortfolioAvatar from '../assets/joe-portfolio-avatar.jpg';

import glassCamera from '../assets/glass-3d-camera.png';
import glassPlayer from '../assets/glass-3d-videoplayer.png';
import glassKeyboard from '../assets/glass-3d-keyboard.png';
import glassStars from '../assets/glass-3d-stars.png';
import glassStylus from '../assets/glass-3d-stylus.png';
import glassFilmstrip from '../assets/glass-3d-filmstrip.png';

import thumbValentino from '../assets/thumb-valentino.png';
import thumbErin from '../assets/thumb-erin-riley.png';
import thumbWedding from '../assets/thumb-wedding.png';

const JOE_FILMS = [
  {
    id: 'aGWfZi0ZzJM',
    title: 'Valentino Ristorante Italiano',
    category: 'Brand Film & Website Banner',
    description: 'A luxurious website video banner created for Valentino’s, blending high fashion with cinematic storytelling to elevate the brand’s digital presence.',
    thumbnail: thumbValentino,
  },
  {
    id: 'c4R-nmzX5e4',
    title: 'Erin & Riley Testimonial (Dragonfly)',
    category: 'Documentary Storytelling',
    description: 'An emotional testimonial video capturing Erin & Riley’s story through heartfelt narrative and cinematic visuals.',
    thumbnail: thumbErin,
  },
  {
    id: 'A1OlQdrAYIY',
    title: 'Cinematic Wedding Teaser',
    category: 'Cinematic Short Film',
    description: 'A cinematic wedding teaser that weaves together intimate moments and grand emotions in a visually striking short film.',
    thumbnail: thumbWedding,
  },
];

const ISAIAH_CDN = 'https://isaiah-chandler.netlify.app';

const ISAIAH_VIDEOS = [
  {
    id: 'volcanic-serpent',
    title: 'Volcanic Serpent Cinematic',
    campaign: 'Passions',
    description: 'Cinematic 3D animation loop of a horned serpent weaving through a volcanic magma chamber.',
    src: `${ISAIAH_CDN}/video/passions/volcanic_serpent_cinematic.mp4`,
    poster: `${ISAIAH_CDN}/video/posters/passions/volcanic_serpent_cinematic.jpg`,
  },
  {
    id: 'ocular-scan',
    title: 'Ocular System Scan',
    campaign: 'Biotech',
    description: 'Medical systems visualization loop detailing the volumetric ocular scan paths and retinal telemetry mappings.',
    src: `${ISAIAH_CDN}/video/biotech/ocularsystem_light.mp4`,
    poster: `${ISAIAH_CDN}/video/posters/biotech/ocularsystem_light.jpg`,
  },
  {
    id: 'neural-mri',
    title: 'Neural MRI Sequence',
    campaign: 'Biotech',
    description: 'Advanced brain scan animation simulating localized volumetric scanning slices and neuron pathways.',
    src: `${ISAIAH_CDN}/video/biotech/neuromri_16_9.mp4`,
    poster: `${ISAIAH_CDN}/video/posters/biotech/neuromri_16_9.jpg`,
  },
  {
    id: 'hydrogen-bubble',
    title: 'Hydrogen Bubble Simulation',
    campaign: 'Clean Energy',
    description: 'Clean energy simulation showing water molecule splitting and hydrogen gas bubbles rising inside water chambers.',
    src: `${ISAIAH_CDN}/video/hydrogen/hydrogen_in_bubble.mp4`,
    poster: `${ISAIAH_CDN}/video/posters/hydrogen/hydrogen_in_bubble.jpg`,
  },
  {
    id: 'data-node',
    title: 'Data Node Orchestration',
    campaign: 'SaaS',
    description: 'A fun and dynamic motion graphic post visualizing interconnected database nodes and fluid pipeline networks.',
    src: `${ISAIAH_CDN}/video/saas/orchestrate_chaos.mp4`,
    poster: `${ISAIAH_CDN}/video/posters/saas/orchestrate_chaos.jpg`,
  },
  {
    id: 'chromatic-wavefront',
    title: 'Volumetric Color Wavefront',
    campaign: 'Creative',
    description: 'Loopable motion graphic visual element displaying colorful wave formations in dark space.',
    src: `${ISAIAH_CDN}/video/creative/aurora_abyss/chromaticwavefront_auroraabyss_2160x2160_10s.mp4`,
    poster: `${ISAIAH_CDN}/video/posters/creative/aurora_abyss/chromaticwavefront_auroraabyss_2160x2160_10s.jpg`,
  },
];

const ISAIAH_MODELS = [
  {
    id: 'astrolabe',
    title: 'Verticals Astrolabe',
    description: 'Interactive 3D showcase visualizing industry verticals and integrated software systems across multiple business domains.',
    tech: 'Three.js r171 / GLSL Shaders / Blender / GLTF',
    url: `${ISAIAH_CDN}/3d_models/3d-verticals-showcase/index.html`,
    icon: Atom,
  },
  {
    id: 'thermal-facility',
    title: 'Thermal Facility',
    description: 'WebGL model representation of a geothermal loop power generation plant and structural facilities.',
    tech: 'Three.js / WebGL / Light-Dark Theme Switcher',
    url: `${ISAIAH_CDN}/3d_models/thermal_facility/20260717_Thermal_Facility_Interactive_Model_v01.html`,
    icon: Flame,
  },
  {
    id: 'smr-blueprint',
    title: 'SMR 3D Blueprint',
    description: 'Procedural wireframe blueprint mapping a Small Modular Reactor architecture and core reactor flows.',
    tech: 'Three.js / WebGL / HUD Overlay',
    url: `${ISAIAH_CDN}/3d_models/smr_blueprint/20260717_SMR_3D_Blueprint_Interactive_Model_v01.html`,
    icon: Zap,
  },
  {
    id: 'exchanger-core',
    title: 'Solid State Exchanger Core',
    description: 'Interactive heat exchanger flow simulation with chemical reaction telemetry details.',
    tech: 'Three.js / WebGL / Canvas HUD',
    url: `${ISAIAH_CDN}/3d_models/solid_state_exchanger_core/solid_state_exchanger_core.html`,
    icon: Globe2,
  },
];

const ISAIAH_GRAPHICS = [
  {
    id: 'biotech-platform',
    title: 'Biotech Platform',
    campaign: 'Biotech',
    description: 'High-concept molecular vector infographics detailing lipid shell structures and cellular encapsulation platforms.',
    src: `${ISAIAH_CDN}/images/graphics/biotech/-_clean_biotech_graphics_the_universal_nanoparticle_platform_1.png`,
  },
  {
    id: 'space-economy',
    title: 'Lunar Space Tech',
    campaign: 'Hydrogen',
    description: 'Clean energy graphic campaign exploring the future of lunar power generation and deep space trajectories.',
    src: `${ISAIAH_CDN}/images/graphics/hydrogen/set_17_the_new_space_economy_new_space_economy_slide1.png`,
  },
  {
    id: 'nuclear-moon',
    title: 'Clean Hydrogen Energy',
    campaign: 'Hydrogen',
    description: 'Thought-leadership campaign on nuclear power applications for lunar base sustainability.',
    src: `${ISAIAH_CDN}/images/graphics/hydrogen/set_12_nuclear_power_on_the_moon_nuclear_power_on_the_moon_slide1.png`,
  },
  {
    id: 'saas-core',
    title: 'Enterprise SaaS Core',
    campaign: 'SaaS',
    description: 'B2B marketing campaign graphic for the AetherOps SaaS platform — data gravity and architecture visualization.',
    src: `${ISAIAH_CDN}/images/graphics/saas/ceo_brand_-_finished_graphics_aether_space_02_02_the_data_gravity_problem.png`,
  },
  {
    id: 'community-mural',
    title: 'Community Impact Mural',
    campaign: 'Standalone',
    description: 'Community event branding featuring a group portrait painted by a local artist, used for local news and outreach.',
    src: `${ISAIAH_CDN}/images/graphics/standalone/hero_-_yes-group-volunteer_work_-_ceo_for_my_use.jpg`,
  },
  {
    id: 'personal-brand',
    title: 'Personal Brand',
    campaign: 'Standalone',
    description: 'Custom graphic design layout exploring structural composition and visual branding elements.',
    src: `${ISAIAH_CDN}/images/graphics/standalone/ic_-_complete_loud_pack_handout_copy.jpg`,
  },
];

const ISAIAH_WEBAPPS = [
  { id: 'dev-profile', title: 'Developer Profile', description: 'WebGL backgrounds + drag-and-drop session builder.', route: '/home' },
  { id: 'link-gateway', title: 'Link Gateway', description: 'Enterprise Link Tree with glassmorphic modals.', route: '/links' },
  { id: 'orchestration', title: 'Orchestration Lander', description: 'SaaS marketing with testimonials & stat counters.', route: '/product' },
  { id: 'referral', title: 'Partner Referral Program', description: 'Multi-path funnel with canvas particles.', route: '/referral' },
  { id: 'quiz', title: 'AI Diagnostic Quiz', description: '12-question assessment with risk scoring.', route: '/quiz' },
  { id: 'crm-slides', title: 'Unified CRM Slides', description: 'Interactive slide deck with WebGL particles.', route: '/presentation' },
];

export const Team: React.FC = () => {
  const [activePortfolio, setActivePortfolio] = useState<{
    name: string;
    role: string;
    subRole?: string;
    url: string;
    image?: string;
  } | null>(null);

  const [activeJoeFilm, setActiveJoeFilm] = useState(JOE_FILMS[0]);
  const [activeIsaiahVideo, setActiveIsaiahVideo] = useState(ISAIAH_VIDEOS[0]);
  const [activeIsaiahGraphic, setActiveIsaiahGraphic] = useState(ISAIAH_GRAPHICS[0]);
  const [isaiahVideoMuted, setIsaiahVideoMuted] = useState(true);

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
      portfolioUrl: 'https://framesbyirizarry.com/',
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

          {/* Viewport Container: Member-Specific Native Showcases */}
          <div className="flex-grow w-full h-[calc(100vh-64px)] relative bg-[#FFF5F8] overflow-y-auto">
            {activePortfolio.name.includes('Isaiah') ? (
              /* ═══════════════════════════════════════════════════════════════
                 ISAIAH CHANDLER — Full Portfolio Showcase v3
                 4-section scrollable layout mirroring the live portfolio hub.
                 All media served from isaiah-chandler.netlify.app CDN.
                 ═══════════════════════════════════════════════════════════════ */
              <div className="w-full min-h-full flex flex-col items-center justify-start p-4 sm:p-8 text-center overflow-y-auto" id="isaiah-showcase-scroll" style={{ background: 'linear-gradient(135deg, #0B0415 0%, #120822 40%, #0D0619 100%)' }}>
                <div
                  className="max-w-5xl w-full mx-auto rounded-3xl p-6 sm:p-10 border border-[#7C3AED]/30 relative overflow-hidden text-white"
                  style={{
                    background: 'linear-gradient(165deg, rgba(26,10,47,0.97) 0%, rgba(11,4,21,0.98) 50%, rgba(18,8,34,0.97) 100%)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    boxShadow: '0 24px 80px -12px rgba(124,58,237,0.25), 0 8px 32px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,184,255,0.08)',
                  }}
                >
                  {/* Background ambient glow halos — purple theme (matches Joe's green halos) */}
                  <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#7C3AED]/25 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-[#D4B8FF]/18 blur-3xl pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] rounded-full bg-[#7C3AED]/8 blur-3xl pointer-events-none" />

                  {/* ── Hero Header Bar (matches Joe's structure exactly) ── */}
                  <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-[#7C3AED]/20 text-left">
                    <div className="flex items-center gap-4">
                      {activePortfolio.image && (
                        <div
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#D4B8FF] flex-shrink-0"
                          style={{
                            background: 'radial-gradient(circle at 50% 40%, #381A5E 0%, #1A0A2F 70%, #0B0415 100%)',
                            boxShadow: '0 0 20px rgba(124,58,237,0.4), 0 0 60px rgba(212,184,255,0.15)',
                          }}
                        >
                          <img
                            src={isaiahCutout}
                            alt={activePortfolio.name}
                            className="w-full h-full object-cover scale-[1.15]"
                            style={{ objectPosition: 'center 15%' }}
                          />
                        </div>
                      )}
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/30 border border-[#7C3AED]/50 text-[10px] sm:text-xs font-black text-[#E8D5FF] mb-1">
                          <Cpu className="w-3 h-3 text-[#D4B8FF]" />
                          <span>Creative Pipeline Architect</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          {activePortfolio.name}
                        </h3>
                        <p className="text-xs font-bold text-[#D4B8FF] uppercase tracking-widest">
                          {activePortfolio.role}
                          {activePortfolio.subRole && <span className="text-white/60"> · {activePortfolio.subRole}</span>}
                        </p>
                      </div>
                    </div>

                    {/* External Site Button (matches Joe's) */}
                    {activePortfolio.url && (
                      <a
                        href={activePortfolio.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-xs flex items-center gap-2 transition-all shadow-lg hover:scale-105 cursor-pointer"
                      >
                        <span>Launch Full Portfolio</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* ── Section Tab Bar (inside card, below hero) ── */}
                  <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8 pb-5 border-b border-[#7C3AED]/15">
                    {[
                      { label: '🎬 Motion Art', anchor: 'isaiah-motion' },
                      { label: '🧊 3D Models', anchor: 'isaiah-3d' },
                      { label: '🎨 Graphics', anchor: 'isaiah-graphics' },
                      { label: '💻 Web Apps', anchor: 'isaiah-webapps' },
                    ].map((tab) => (
                      <button
                        key={tab.anchor}
                        onClick={() => document.getElementById(tab.anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                        className="px-4 py-2 rounded-full bg-[#7C3AED]/25 border border-[#7C3AED]/40 text-[10px] sm:text-xs font-black text-[#E8D5FF] hover:bg-[#7C3AED]/40 hover:border-[#D4B8FF] hover:text-white transition-all cursor-pointer shadow-sm"
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* ── Content Sections ── */}
                  <div className="relative z-10 space-y-14 text-left">

                    {/* ══════════ SECTION 1: MOTION ART ══════════ */}
                    <section id="isaiah-motion" style={{ scrollMarginTop: '80px' }}>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center">
                          <Video className="w-5 h-5 text-[#D4B8FF]" />
                        </div>
                        <div>
                          <h4 className="text-lg sm:text-xl font-black text-white tracking-tight">Motion Graphics & Video</h4>
                          <p className="text-[10px] font-black text-[#D4B8FF] uppercase tracking-widest">Custom procedural animations across industries</p>
                        </div>
                      </div>

                      {/* Featured Video Player */}
                      <div className="mb-5 rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl relative">
                        <div className="aspect-video w-full relative">
                          <video
                            key={activeIsaiahVideo.id}
                            src={activeIsaiahVideo.src}
                            poster={activeIsaiahVideo.poster}
                            autoPlay
                            muted={isaiahVideoMuted}
                            loop
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const vid = e.currentTarget;
                              vid.style.display = 'none';
                              const fallback = vid.parentElement?.querySelector('.video-fallback') as HTMLElement | null;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                          {/* Fallback if video fails to load */}
                          <div className="video-fallback absolute inset-0 bg-gradient-to-br from-[#1A0A2F] to-[#0B0415] items-center justify-center text-white/50 text-sm font-medium" style={{ display: 'none' }}>
                            <div className="text-center">
                              <Video className="w-8 h-8 mx-auto mb-2 opacity-40" />
                              <p>Video unavailable</p>
                            </div>
                          </div>
                          {/* Mute toggle */}
                          <button
                            onClick={() => setIsaiahVideoMuted(!isaiahVideoMuted)}
                            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer z-10"
                            aria-label={isaiahVideoMuted ? 'Unmute' : 'Mute'}
                          >
                            {isaiahVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </button>
                        </div>
                        <div className="p-4 sm:p-5 bg-[#0B0415]/80">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-1 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/30 text-[9px] font-black text-[#D4B8FF] uppercase tracking-wider">{activeIsaiahVideo.campaign}</span>
                          </div>
                          <h4 className="text-lg font-black text-white tracking-tight">{activeIsaiahVideo.title}</h4>
                          <p className="text-xs text-white/70 font-medium mt-1">{activeIsaiahVideo.description}</p>
                        </div>
                      </div>

                      {/* Video Selection Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {ISAIAH_VIDEOS.map((vid) => {
                          const isSelected = activeIsaiahVideo.id === vid.id;
                          return (
                            <button
                              key={vid.id}
                              onClick={() => { setIsaiahVideoMuted(true); setActiveIsaiahVideo(vid); }}
                              className={`group relative rounded-xl overflow-hidden border transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#D4B8FF] ring-2 ring-[#D4B8FF]/50 scale-[1.02]'
                                  : 'border-white/10 hover:border-white/30 opacity-80 hover:opacity-100'
                              }`}
                            >
                              <div className="aspect-video w-full relative overflow-hidden bg-black">
                                <img
                                  src={vid.poster}
                                  alt={vid.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  loading="lazy"
                                  onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                                    isSelected ? 'bg-[#D4B8FF] text-[#1A0A2F] shadow-lg scale-110' : 'bg-black/60 text-white group-hover:bg-[#D4B8FF] group-hover:text-[#1A0A2F]'
                                  }`}>
                                    <Play className="w-4 h-4 fill-current ml-0.5" />
                                  </div>
                                </div>
                                <div className="absolute bottom-1.5 left-2 right-2">
                                  <span className="text-[8px] font-black text-[#D4B8FF] uppercase tracking-wider block">{vid.campaign}</span>
                                  <p className="text-[10px] font-bold text-white line-clamp-1">{vid.title}</p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    {/* ══════════ SECTION 2: 3D MODELS ══════════ */}
                    <section id="isaiah-3d" style={{ scrollMarginTop: '80px' }}>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center">
                          <Box className="w-5 h-5 text-[#D4B8FF]" />
                        </div>
                        <div>
                          <h4 className="text-lg sm:text-xl font-black text-white tracking-tight">3D Models & Simulations</h4>
                          <p className="text-[10px] font-black text-[#D4B8FF] uppercase tracking-widest">Interactive WebGL digital twins</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {ISAIAH_MODELS.map((model) => (
                          <div
                            key={model.id}
                            className="group rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4B8FF]/50 bg-[#0B0415]/60 transition-all p-5 sm:p-6"
                          >
                            <div className="flex items-start gap-4 mb-3">
                              <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4B8FF]/20 transition-colors">
                                <model.icon className="w-5 h-5 text-[#D4B8FF]" />
                              </div>
                              <div>
                                <h5 className="text-base font-black text-white tracking-tight">{model.title}</h5>
                                <p className="text-xs text-white/60 font-medium mt-1 leading-relaxed">{model.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <span className="px-2.5 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[9px] font-black text-[#D4B8FF]/70 uppercase tracking-wider">{model.tech}</span>
                              <a
                                href={model.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-[10px] flex items-center gap-1.5 transition-all shadow-lg hover:scale-105 cursor-pointer"
                              >
                                <span>Launch 3D Experience</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* ══════════ SECTION 3: GRAPHIC DESIGN ══════════ */}
                    <section id="isaiah-graphics" style={{ scrollMarginTop: '80px' }}>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center">
                          <Image className="w-5 h-5 text-[#D4B8FF]" />
                        </div>
                        <div>
                          <h4 className="text-lg sm:text-xl font-black text-white tracking-tight">Graphic Design & Campaigns</h4>
                          <p className="text-[10px] font-black text-[#D4B8FF] uppercase tracking-widest">Biotech · Clean Energy · Enterprise SaaS</p>
                        </div>
                      </div>

                      {/* Featured Graphic */}
                      <div className="mb-5 rounded-2xl overflow-hidden border border-white/15 bg-black/50 shadow-2xl">
                        <div className="w-full relative bg-black flex items-center justify-center" style={{ minHeight: '240px', maxHeight: '420px' }}>
                          <img
                            key={activeIsaiahGraphic.id}
                            src={activeIsaiahGraphic.src}
                            alt={activeIsaiahGraphic.title}
                            className="w-full h-auto max-h-[420px] object-contain"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.innerHTML = '<div class="flex items-center justify-center h-60 text-white/30 text-sm font-medium">Image unavailable</div>';
                              }
                            }}
                          />
                        </div>
                        <div className="p-4 sm:p-5 bg-[#0B0415]/80">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-1 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/30 text-[9px] font-black text-[#D4B8FF] uppercase tracking-wider">{activeIsaiahGraphic.campaign}</span>
                          </div>
                          <h4 className="text-lg font-black text-white tracking-tight">{activeIsaiahGraphic.title}</h4>
                          <p className="text-xs text-white/70 font-medium mt-1">{activeIsaiahGraphic.description}</p>
                        </div>
                      </div>

                      {/* Graphics Selection Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {ISAIAH_GRAPHICS.map((graphic) => {
                          const isSelected = activeIsaiahGraphic.id === graphic.id;
                          return (
                            <button
                              key={graphic.id}
                              onClick={() => setActiveIsaiahGraphic(graphic)}
                              className={`group relative rounded-xl overflow-hidden border transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#D4B8FF] ring-2 ring-[#D4B8FF]/50 scale-[1.02]'
                                  : 'border-white/10 hover:border-white/30 opacity-80 hover:opacity-100'
                              }`}
                            >
                              <div className="aspect-[4/3] w-full relative overflow-hidden bg-black">
                                <img
                                  src={graphic.src}
                                  alt={graphic.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  loading="lazy"
                                  onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-1.5 left-2 right-2">
                                  <span className="text-[8px] font-black text-[#D4B8FF] uppercase tracking-wider block">{graphic.campaign}</span>
                                  <p className="text-[10px] font-bold text-white line-clamp-1">{graphic.title}</p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    {/* ══════════ SECTION 4: WEB APPLICATIONS ══════════ */}
                    <section id="isaiah-webapps" style={{ scrollMarginTop: '80px' }}>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center">
                          <Layout className="w-5 h-5 text-[#D4B8FF]" />
                        </div>
                        <div>
                          <h4 className="text-lg sm:text-xl font-black text-white tracking-tight">Interactive Web Applications</h4>
                          <p className="text-[10px] font-black text-[#D4B8FF] uppercase tracking-widest">React · Three.js · WebGL</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {ISAIAH_WEBAPPS.map((app) => (
                          <a
                            key={app.id}
                            href={`${ISAIAH_CDN}${app.route}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group rounded-xl border border-white/10 hover:border-[#D4B8FF]/50 bg-[#0B0415]/40 hover:bg-[#0B0415]/70 p-4 transition-all cursor-pointer"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-sm font-black text-white tracking-tight group-hover:text-[#D4B8FF] transition-colors">{app.title}</h5>
                              <ExternalLink className="w-3.5 h-3.5 text-white/30 group-hover:text-[#D4B8FF] transition-colors" />
                            </div>
                            <p className="text-[10px] text-white/50 font-medium leading-relaxed">{app.description}</p>
                          </a>
                        ))}
                      </div>
                    </section>

                  </div>

                  {/* ── Footer Actions (matches Joe's) ── */}
                  <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-10 border-t border-white/10">
                    <p className="text-xs font-medium text-white/40 italic">
                      "Architecture is the art of how to waste space." — Creative Pipeline Architect
                    </p>
                    <button
                      onClick={() => setActivePortfolio(null)}
                      className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 text-[#D4B8FF]" />
                      <span>Return to Soul Media</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : activePortfolio.name.includes('Joe') ? (
              /* ═══════════════════════════════════════════════════════════════
                 JOE IRIZARRY — Executive Director Cinema Theatre Showcase
                 YouTube-powered film player with custom high-res thumbnails.
                 ═══════════════════════════════════════════════════════════════ */
              <div className="w-full min-h-full flex flex-col items-center justify-center p-4 sm:p-8 text-center bg-[#10080F] overflow-y-auto">
                <div
                  className="max-w-5xl mx-auto rounded-3xl p-6 sm:p-10 border border-[#059669]/30 relative overflow-hidden my-auto text-white"
                  style={{
                    background: 'linear-gradient(165deg, rgba(10,34,40,0.97) 0%, rgba(4,14,17,0.98) 50%, rgba(16,8,15,0.97) 100%)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    boxShadow: '0 24px 80px -12px rgba(5,150,105,0.25), 0 8px 32px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(153,255,224,0.08)',
                  }}
                >
                  {/* Background ambient glow halos */}
                  <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#059669]/20 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#99FFE0]/15 blur-3xl pointer-events-none" />

                  {/* Header Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10 text-left">
                    <div className="flex items-center gap-4">
                      {activePortfolio.image && (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#99FFE0] shadow-xl flex-shrink-0 bg-black">
                          <img
                            src={joePortfolioAvatar}
                            alt={activePortfolio.name}
                            className="w-full h-full object-cover object-center scale-100"
                          />
                        </div>
                      )}
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#059669]/20 border border-[#059669]/40 text-[10px] sm:text-xs font-black text-[#99FFE0] mb-1">
                          <Film className="w-3 h-3 text-[#99FFE0]" />
                          <span>Executive Director Showcase</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          {activePortfolio.name}
                        </h3>
                        <p className="text-xs font-bold text-[#99FFE0]/90 uppercase tracking-widest">
                          {activePortfolio.role}
                        </p>
                      </div>
                    </div>

                    {/* External Site Button */}
                    {activePortfolio.url && (
                      <a
                        href={activePortfolio.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-black text-xs flex items-center gap-2 transition-all shadow-lg hover:scale-105 cursor-pointer"
                      >
                        <span>Launch framesbyirizarry.com</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Featured Cinema Player Viewport */}
                  <div className="mb-8">
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black relative">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${activeJoeFilm.id}?autoplay=1&rel=0`}
                        title={activeJoeFilm.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-left">
                      <div>
                        <span className="text-[10px] font-black text-[#99FFE0] uppercase tracking-widest">{activeJoeFilm.category}</span>
                        <h4 className="text-lg font-black text-white">{activeJoeFilm.title}</h4>
                      </div>
                      <p className="text-xs text-white/70 font-medium max-w-md">{activeJoeFilm.description}</p>
                    </div>
                  </div>

                  {/* Film Selection Gallery (Interactive High-Res Thumbnails) */}
                  <div className="text-left mb-8">
                    <h5 className="text-xs font-black uppercase tracking-widest text-white/60 mb-3 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#99FFE0]" />
                      <span>Select Featured Film to Play</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {JOE_FILMS.map((film) => {
                        const isSelected = activeJoeFilm.id === film.id;
                        return (
                          <button
                            key={film.id}
                            onClick={() => setActiveJoeFilm(film)}
                            className={`group relative rounded-2xl overflow-hidden border transition-all text-left cursor-pointer ${
                              isSelected
                                ? 'border-[#99FFE0] ring-2 ring-[#99FFE0]/50 scale-[1.02]'
                                : 'border-white/10 hover:border-white/30 opacity-80 hover:opacity-100'
                            }`}
                          >
                            <div className="aspect-video w-full relative overflow-hidden bg-black">
                              <img
                                src={film.thumbnail}
                                alt={film.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                              
                              {/* Play Badge */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                  isSelected ? 'bg-[#99FFE0] text-black shadow-lg scale-110' : 'bg-black/60 text-white group-hover:bg-[#99FFE0] group-hover:text-black'
                                }`}>
                                  <Play className="w-4 h-4 fill-current ml-0.5" />
                                </div>
                              </div>

                              <div className="absolute bottom-2 left-2 right-2">
                                <span className="text-[9px] font-black text-[#99FFE0] uppercase tracking-wider block mb-0.5">{film.category}</span>
                                <p className="text-xs font-bold text-white line-clamp-1">{film.title}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <p className="text-xs font-medium text-white/60 italic">
                      "Stories that move people. Films that move brands." — Joe Irizarry
                    </p>
                    <button
                      onClick={() => setActivePortfolio(null)}
                      className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 text-[#99FFE0]" />
                      <span>Return to Soul Media</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* ═══════════════════════════════════════════════════════════════
                 JADA BROWN — Executive Showcase (Coming Soon)
                 Fallback showcase for members without a custom panel.
                 ═══════════════════════════════════════════════════════════════ */
              <div className="w-full min-h-full flex flex-col items-center justify-center p-4 sm:p-8 text-center bg-[#10080F] overflow-y-auto">
                <div className="max-w-3xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-[#D83685]/40 shadow-2xl relative overflow-hidden my-auto bg-[#1A0C18]/90 text-white">
                  <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#D83685]/20 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#FFB6D9]/15 blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center gap-6">
                    {activePortfolio.image && (
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#FFB6D9] shadow-xl bg-black">
                        <img
                          src={activePortfolio.image}
                          alt={activePortfolio.name}
                          className="w-full h-full object-cover scale-[1.57] origin-[center_41%]"
                        />
                      </div>
                    )}
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D83685]/20 border border-[#D83685]/40 text-[10px] sm:text-xs font-black text-[#FFB6D9] mb-2">
                        <Award className="w-3 h-3 text-[#FFB6D9]" />
                        <span>Executive Showcase</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {activePortfolio.name}
                      </h3>
                      <p className="text-xs font-bold text-[#FFB6D9]/90 uppercase tracking-widest">
                        {activePortfolio.role}
                      </p>
                    </div>
                    <p className="text-sm text-white/70 font-medium leading-relaxed max-w-md">
                      {activePortfolio.name.split(' ')[0]}'s executive portfolio showcase is coming soon. Stay tuned for an immersive look at the vision behind Soul Media.
                    </p>
                    <button
                      onClick={() => setActivePortfolio(null)}
                      className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4 text-[#FFB6D9]" />
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
