import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Observe if portfolio modal overlay is active
  useEffect(() => {
    const checkModalState = () => {
      setPortfolioModalOpen(document.body.hasAttribute('data-portfolio-modal-open'));
    };

    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-portfolio-modal-open'] });

    return () => observer.disconnect();
  }, []);

  // Lock background scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Packages', href: '#packages' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  // Completely hide main navbar if full-screen portfolio showcase is active
  if (portfolioModalOpen) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 glass-nav shadow-lg'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <Logo width={160} height={55} />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 glass-card px-8 py-3 rounded-full border border-[#FFB6D9]/50 shadow-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-[#1A1626] hover:text-[#D83685] transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D83685] to-[#7C3AED] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#quote-builder"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold rounded-full group bg-gradient-to-br from-[#FF94C7] via-[#D4B8FF] to-[#99FFE0] text-[#1A1626] shadow-xl shadow-[#FFB6D9]/30 transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative px-6 py-2.5 transition-all ease-in duration-75 bg-[#FFF5F8] rounded-full group-hover:bg-opacity-0 text-[#1A1626] group-hover:text-[#1A1626] flex items-center gap-2 font-extrabold">
                <Sparkles className="w-4 h-4 text-[#D83685]" />
                <span>Build Custom Scope</span>
                <ArrowUpRight className="w-4 h-4 text-[#D83685] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl glass-card text-[#1A1626] hover:text-[#D83685] transition-colors border border-[#FFB6D9]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#FFF5F8]/95 backdrop-blur-2xl lg:hidden pt-28 px-6 pb-12 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-black text-[#1A1626] hover:text-[#D83685] transition-colors border-b border-[#FFB6D9]/30 pb-3 flex justify-between items-center"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#D83685]" />
                </motion.a>
              ))}
            </div>

            <div className="pt-6">
              <a
                href="#quote-builder"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF94C7] via-[#D4B8FF] to-[#99FFE0] text-[#1A1626] font-black text-center block shadow-xl shadow-[#FFB6D9]/30"
              >
                Build Custom Scope
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
