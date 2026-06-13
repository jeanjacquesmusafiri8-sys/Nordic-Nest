import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { ArrowUpRight, Sofa, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="relative overflow-hidden bg-[#FDFCFB] py-16 sm:py-24 border-b border-[#EEEAE5]" id="hero-section">
      {/* Background architectural geometric block accent */}
      <div className="absolute right-0 top-0 w-5/12 h-full bg-[#F5F3F0] -z-0 hidden md:block border-l border-[#EEEAE5]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column text display */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center space-x-2 border border-[#2A2A2A] bg-white text-[10px] uppercase tracking-widest font-bold text-[#2A2A2A] px-3.5 py-1.5 rounded-none">
              <span>Collection d'exception 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-light text-[#2A2A2A] leading-tight tracking-tight">
              L'art de l'épure <br />
              <span className="font-serif italic font-light text-[#A38E7E]">scandinave</span> chez vous
            </h1>
            
            <p className="text-[#666] text-sm sm:text-base leading-relaxed max-w-lg font-serif italic">
              Découvrez notre sélection exclusive de mobilier aux lignes pures, matériaux authentiques et finitions d'artisanat d'exception. Pensé pour durer, conçu pour votre bien-être.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              onClick={() => setActiveTab('catalog')}
              className="px-8 py-4 bg-[#2A2A2A] text-white font-sans font-bold text-xs uppercase tracking-widest hover:bg-[#1C1A19] rounded-none transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm"
              id="hero-cta-catalog"
            >
              <span>Découvrir la Boutique</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => {
                const el = document.getElementById('featured-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-4 border border-[#2A2A2A] text-[#2A2A2A] bg-white font-sans font-bold text-xs uppercase tracking-widest hover:bg-[#F5F3F0] rounded-none transition-all duration-300 flex items-center justify-center space-x-2"
              id="hero-cta-secondary"
            >
              <Sofa className="w-4 h-4 text-[#A38E7E]" />
              <span>Voir les Favoris</span>
            </button>
          </motion.div>

          {/* Mini social proof widgets */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="pt-6 border-t border-[#EEEAE5] flex items-center space-x-8 text-xs font-semibold text-[#888] uppercase tracking-wider"
          >
            <div>
              <p className="font-serif text-2xl font-light italic text-[#2A2A2A] tracking-tight">9.8 / 10</p>
              <p className="mt-1 font-mono text-[9px] tracking-widest">Note TrustPilot</p>
            </div>
            
            <div className="w-px h-8 bg-[#EEEAE5]" />
            
            <div>
              <p className="font-serif text-2xl font-light italic text-[#2A2A2A] tracking-tight">FSC %</p>
              <p className="mt-1 font-mono text-[9px] tracking-widest">Origine Certifiée</p>
            </div>

            <div className="w-px h-8 bg-[#EEEAE5]" />

            <div>
              <p className="font-serif text-2xl font-light italic text-[#2A2A2A] tracking-tight">100%</p>
              <p className="mt-1 font-mono text-[9px] tracking-widest">Éco & Responsable</p>
            </div>
          </motion.div>
        </div>

        {/* Right column premium visual grid */}
        <div className="lg:col-span-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Primary featured image with premium frame */}
            <div className="aspect-[4/3] rounded-none overflow-hidden border border-[#EEEAE5] bg-[#F5F3F0] p-3 shadow-sm relative group">
              <div className="w-full h-full overflow-hidden border border-[#EEEAE5] relative">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200"
                  alt="Intérieur Nordique Minimaliste"
                  className="w-full h-full object-cover transition-transform duration-[1.5s]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>
            </div>

            {/* Overlapping small showcase badge card */}
            <div className="absolute -bottom-6 -left-6 bg-white border border-[#2A2A2A] rounded-none p-4 shadow-md flex items-center space-x-4 max-w-[260px]">
              <div className="w-12 h-12 bg-[#F5F3F0] rounded-none flex items-center justify-center text-[#A38E7E]">
                <Sofa className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase font-mono tracking-widest text-[#A38E7E] font-bold">Tendance Intérieure</p>
                <p className="text-xs font-bold text-[#2A2A2A] leading-tight uppercase font-sans tracking-tight mt-0.5">Matières Bouclées</p>
                <button 
                  onClick={() => setActiveTab('catalog')} 
                  className="text-[10px] font-bold text-[#2A2A2A] hover:text-[#A38E7E] uppercase tracking-widest underline transition-colors block mt-1"
                >
                  Découvrir →
                </button>
              </div>
            </div>

            {/* Accent backdrop shadow box */}
            <div className="absolute -top-3 -right-3 w-20 h-20 bg-[#A38E7E]/10 -z-10 rotate-12" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
