import React from 'react';
import { useApp } from '../context/AppContext';
import { Mail, ArrowRight, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-[#FAF9F6] text-[#2A2A2A] border-t border-[#EEEAE5] font-sans">
      {/* Brand value propositions bar with icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 md:py-12 border-b border-[#EEEAE5] grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex items-start space-x-3">
          <Truck className="w-5 h-5 text-[#A38E7E] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#2A2A2A]">Livraison Sécurisée</h4>
            <p className="text-[11px] text-[#666] mt-1 leading-relaxed">Offerte dès 1 200 € d'achats directement à votre domicile.</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <RefreshCw className="w-5 h-5 text-[#A38E7E] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#2A2A2A]">Retours sous 30 jours</h4>
            <p className="text-[11px] text-[#666] mt-1 leading-relaxed">Échange ou remboursement simplifié si l'article ne vous convient pas.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-[#A38E7E] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#2A2A2A]">Paiement 3D Secure</h4>
            <p className="text-[11px] text-[#666] mt-1 leading-relaxed">Transactions cryptées par virement bancaire ou carte bancaire.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Award className="w-5 h-5 text-[#A38E7E] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#2A2A2A]">Garantie Bois Éco</h4>
            <p className="text-[11px] text-[#666] mt-1 leading-relaxed">Origine certifiée FSC pour un mobilier responsable d'exception.</p>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-[#EEEAE5]">
        {/* Brand identity block */}
        <div className="space-y-4">
          <div className="text-lg font-bold tracking-tighter flex items-center text-[#2A2A2A]">
            <div className="w-6 h-6 bg-[#2A2A2A] flex items-center justify-center mr-2 shrink-0">
              <div className="w-3 h-3 border border-white rotate-45"></div>
            </div>
            NORDIC NEST
          </div>
          <p className="text-xs leading-relaxed text-[#666] font-serif italic">
            Depuis 2018, nous concevons un mobilier minimaliste et durable en harmonie avec la nature. Des lignes douces et rationnelles, des matières brutes et un savoir-faire d'excellence.
          </p>
          <div className="pt-2">
            <span className="text-[10px] bg-[#EEEAE5] px-2 py-1 uppercase tracking-widest font-bold text-[#2A2A2A]">Stockholm • Copenhague</span>
          </div>
        </div>

        {/* Quick links block */}
        <div>
          <h4 className="font-bold text-xs text-[#2A2A2A] tracking-widest uppercase mb-6">Navigation</h4>
          <ul className="space-y-3 text-xs">
            <li>
              <button onClick={() => setActiveTab('home')} className="text-[#666] hover:text-[#2A2A2A] transition-colors font-medium">
                Accueil du site
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('catalog')} className="text-[#666] hover:text-[#2A2A2A] transition-colors font-medium">
                Meubles & Collection
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('admin-login')} className="text-[#666] hover:text-[#2A2A2A] transition-colors font-medium">
                Espace Administration
              </button>
            </li>
          </ul>
        </div>

        {/* Categories shortcut */}
        <div>
          <h4 className="font-bold text-xs text-[#2A2A2A] tracking-widest uppercase mb-6">Catégories</h4>
          <ul className="space-y-3 text-xs">
            <li>
              <button onClick={() => setActiveTab('catalog')} className="text-[#666] hover:text-[#2A2A2A] transition-colors font-medium">
                Salon & Living Room
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('catalog')} className="text-[#666] hover:text-[#2A2A2A] transition-colors font-medium">
                Chambre & Bedroom
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('catalog')} className="text-[#666] hover:text-[#2A2A2A] transition-colors font-medium">
                Cuisine & Dining Room
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('catalog')} className="text-[#666] hover:text-[#2A2A2A] transition-colors font-medium">
                Bureau & Workspace
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter subscribe */}
        <div>
          <h4 className="font-bold text-xs text-[#2A2A2A] tracking-widest uppercase mb-6">Rejoindre le Club</h4>
          <p className="text-xs text-[#666] mb-4 leading-relaxed">
            Inscrivez-vous pour bénéficier de 15% de réduction et de nos carnets de tendances géométriques.
          </p>
          <form 
            onSubmit={(e) => { e.preventDefault(); alert('Merci pour votre inscription ! Bénéficiez prochainement de vos 15% de réduction.'); }}
            className="flex items-center border border-[#2A2A2A] p-2 bg-white"
          >
            <input 
              type="email" 
              placeholder="Votre email..." 
              required
              className="bg-transparent text-xs w-full focus:outline-none placeholder-[#888] text-[#2A2A2A] mr-2"
            />
            <button type="submit" className="text-[#2A2A2A] hover:text-[#A38E7E] transition-colors" aria-label="S'abonner">
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Under footer bottom credit line */}
      <div className="bg-white text-[#888] py-8 text-[10px] uppercase tracking-widest px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span>&copy; {new Date().getFullYear()} NORDIC NEST DESIGN</span>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-[#2A2A2A] transition-colors">POLITIQUE DE CONFIDENTIALITÉ</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-[#2A2A2A] transition-colors">CGV & CONDITIONS</a>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="flex items-center text-[#2A2A2A] font-semibold">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              SYSTEM STATUS: ONLINE
            </span>
            <div className="flex space-x-1">
              <div className="w-6 h-4 bg-[#F5F3F0] border border-[#EEEAE5]" title="Visa"></div>
              <div className="w-6 h-4 bg-[#F5F3F0] border border-[#EEEAE5]" title="MasterCard"></div>
              <div className="w-6 h-4 bg-[#F5F3F0] border border-[#EEEAE5]" title="Amex"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
