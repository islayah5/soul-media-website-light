import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, X } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const categories = ['All', 'Filming & Commercials', 'Short-Form Reels', '3D Web & Renders', 'Brand Strategy'];

  const caseStudies = [
    {
      title: 'Aura Lifestyle Commercial Shoot',
      category: 'Filming & Commercials',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1200',
      client: 'Aura Apparel',
      impact: '1.4M Organic Views',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    },
    {
      title: 'Velvet Horizon Rebrand & Motion',
      category: 'Brand Strategy',
      image: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&q=80&w=1200',
      client: 'Velvet Horizon',
      impact: '3.2x Engagement Surge',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    },
    {
      title: 'Solstice 3D Web Canvas Experience',
      category: '3D Web & Renders',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
      client: 'Solstice Tech',
      impact: '88% Increased Time-on-Site',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    },
    {
      title: 'High-Volume Executive Reel Series',
      category: 'Short-Form Reels',
      image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=1200',
      client: 'Apex Capital',
      impact: '420K Reach in 14 Days',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    },
  ];

  const filteredStudies =
    selectedCategory === 'All'
      ? caseStudies
      : caseStudies.filter((item) => item.category === selectedCategory);

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
            Selected Portfolio & Case Studies
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

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-8 p-2 rounded-full glass-card border border-[#FFB6D9]/50 shadow-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#FF94C7] via-[#D4B8FF] to-[#99FFE0] text-[#1A1626] shadow-md scale-105'
                    : 'text-[#4A4259] hover:text-[#1A1626]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {filteredStudies.map((study, idx) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-[#FFB6D9]/50 shadow-xl group cursor-pointer"
                onClick={() => setActiveVideoUrl(study.videoUrl)}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1626]/80 via-[#1A1626]/20 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#FFF5F8]/90 text-[#D83685] flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#FFF5F8]/90 border border-[#FFB6D9] text-xs font-black text-[#D83685]">
                      {study.category}
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full bg-[#059669] text-white text-xs font-black">
                      {study.impact}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <span className="text-xs font-extrabold text-[#D83685] uppercase tracking-wider block mb-1">
                    Client: {study.client}
                  </span>
                  <h3 className="text-2xl font-black text-[#1A1626]">
                    {study.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1A1626]/90 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setActiveVideoUrl(null)}
          >
            <div
              className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden glass-card border border-[#FFB6D9]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#FFF5F8] text-[#1A1626] flex items-center justify-center font-bold"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                src={activeVideoUrl}
                title="Project Video Reel"
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
