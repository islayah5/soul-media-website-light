import React from 'react';
import { Logo } from './Logo';
import { ArrowUp, Instagram, Linkedin, Youtube, Film, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-[#FFB6D9]/40 bg-[#FFF5F8]/90 pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Logo width={160} height={55} />
            <p className="text-[#4A4259] text-sm max-w-md font-medium leading-relaxed">
              Soul Media is a premier video production, 3D web modeling, and visual brand agency headquartered in Tampa Bay, Florida.
            </p>
            <div className="flex items-center gap-3 text-xs font-black text-[#D83685]">
              <MapPin className="w-4 h-4 text-[#D83685]" />
              <span>Tampa Bay • Clearwater • St. Petersburg, FL HQ</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D83685] mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-[#1A1626]">
              <li><a href="#home" className="hover:text-[#D83685] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#D83685] transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-[#D83685] transition-colors">Capabilities</a></li>
              <li><a href="#packages" className="hover:text-[#D83685] transition-colors">Investment Packages</a></li>
              <li><a href="#portfolio" className="hover:text-[#D83685] transition-colors">Case Studies</a></li>
              <li><a href="#team" className="hover:text-[#D83685] transition-colors">Leadership Team</a></li>
            </ul>
          </div>

          {/* Col 3: Leadership Core */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D83685] mb-4">
              Executive Leadership
            </h4>
            <ul className="space-y-2 text-xs font-bold text-[#1A1626]">
              <li className="text-[#1A1626]"><strong>Jada Brown</strong> — Founder & Producer</li>
              <li className="text-[#1A1626]"><strong>Isaiah Chandler</strong> — Ops & Systems Lead</li>
              <li className="text-[#1A1626]"><strong>Joe Irizarry</strong> — Director of Photography</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#FFB6D9]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-[#4A4259]">
          <p>© {new Date().getFullYear()} Soul Media. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="px-4 py-2 rounded-full glass-card border border-[#FFB6D9] text-[#1A1626] hover:border-[#D83685] flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#D83685]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
