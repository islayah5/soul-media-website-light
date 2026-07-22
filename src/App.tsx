import React from 'react';
import { LiquidPaintCanvas } from './components/LiquidPaintCanvas';
import { CustomCursor } from './components/CustomCursor';
import { SEOHead } from './components/SEOHead';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Packages } from './components/Packages';
import { QuoteBuilder } from './components/QuoteBuilder';
import { Team } from './components/Team';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#FFF5F8] text-[#1A1626] selection:bg-[#FFB6D9] selection:text-[#1A1626]">
      {/* Dynamic SEO & Schema.org Graph */}
      <SEOHead />

      {/* Background Liquid Paint Canvas */}
      <LiquidPaintCanvas />

      {/* Desktop Custom Follower Cursor */}
      <CustomCursor />

      {/* Sticky Header Nav */}
      <Navbar />

      {/* Page Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Packages />
        <QuoteBuilder />
        <Team />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
