import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      quote: "Soul Media transformed our brand presence completely. The cinematic quality of their video shoots combined with their 3D web work gave us an unmatched competitive edge.",
      author: 'Marcus Vance',
      role: 'CEO, Vance Tech Ventures',
      rating: 5,
    },
    {
      quote: "Working with Jada, Isaiah, and Joe is an absolute dream. Their operational efficiency and content pipelines allow us to post consistently without stress.",
      author: 'Elena Rostova',
      role: 'Founder, Solstice Activewear',
      rating: 5,
    },
    {
      quote: "The 3D web modeling and custom scope intake calculator increased our qualified leads immediately. Truly best-in-class technical and creative partners.",
      author: 'David Sterling',
      role: 'Managing Director, Sterling Group',
      rating: 5,
    },
  ];

  return (
    <section className="py-28 px-6 relative z-10 bg-[#FFF5F8]/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-widest text-[#D83685] mb-3 block"
          >
            Client Endorsements
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-6 text-[#1A1626]"
          >
            Trusted by Visionary <br />
            <span className="gradient-text">Founders & Brands</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div
              key={rev.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card glass-card-hover rounded-3xl p-8 border border-[#FFB6D9]/50 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6 text-[#D83685]">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-[#4A4259] text-sm font-medium leading-relaxed mb-6 italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#FFB6D9]/30">
                <h4 className="text-base font-black text-[#1A1626]">{rev.author}</h4>
                <span className="text-xs font-bold text-[#D83685]">{rev.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
