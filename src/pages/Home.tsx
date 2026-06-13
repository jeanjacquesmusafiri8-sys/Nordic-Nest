import React from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';
import { MoveRight, Star, Award, ShieldAlert, BadgeCheck, Compass } from 'lucide-react';

interface HomeProps {
  onViewProduct: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ onViewProduct }) => {
  const { products, setActiveTab } = useApp();

  // Pick first 4 featured products for front showcase
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  const categories = [
    {
      name: 'Salon',
      desc: 'Canapés, tables basses & lumières épurées',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600',
      count: products.filter(p => p.category === 'Salon').length,
    },
    {
      name: 'Chambre',
      desc: 'Lits douillets & chevets suspendus',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=600',
      count: products.filter(p => p.category === 'Chambre').length,
    },
    {
      name: 'Bureau',
      desc: 'Secrétaires compacts & chaises de créateurs',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600',
      count: products.filter(p => p.category === 'Bureau').length,
    },
    {
      name: 'Cuisine',
      desc: 'Tables sculpturales & vaisselle d’artisan',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600',
      count: products.filter(p => p.category === 'Cuisine').length,
    },
  ];

  const testimonials = [
    {
      name: 'Arthur Monier',
      role: 'Architecte d’intérieur',
      rating: 5,
      comment: '« Nordic Nest est ma référence ultime pour mes clients. La pureté des lignes de l’enfilade Fjord et la finition du fauteuil Öland sont absolument irréprochables. »',
      avatar: 'AM',
    },
    {
      name: 'Hélène Girardon',
      role: 'Cliente Nest Club',
      rating: 5,
      comment: '« Ma table repas Ovalis est devenue la pièce maîtresse du salon. Chacun de mes invités me complimente sur le travail des lattes en bois de chêne massif ! »',
      avatar: 'HG',
    },
    {
      name: 'Gabriel Lindqvist',
      role: 'Ébéniste Conseil',
      rating: 5,
      comment: '« Quel plaisir de retrouver la vraie philosophie du bois nordique : simplicité, solidité et respect de la ressource. Un sans-faute de la conception à la réception. »',
      avatar: 'GL',
    },
  ];

  return (
    <div className="space-y-20 pb-20 bg-[#FDFCFB]" id="home-page">
      {/* 1. Jumbotron Hero section */}
      <Hero />

      {/* 2. Bento Grid of Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10" id="categories-section">
        <div className="text-left max-w-xl space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A38E7E] font-bold">Un univers d’élégance</span>
          <h2 className="text-3xl font-sans font-light text-[#2A2A2A] tracking-tight leading-none uppercase">
            Nos collections de meubles
          </h2>
          <div className="w-12 h-0.5 bg-[#2A2A2A] mt-2 mb-4" />
          <p className="text-xs text-[#666] leading-relaxed font-serif italic">
            Chaque meuble est pensé pour maximiser l’harmonie visuelle, la lumière et le stockage de votre foyer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              onClick={() => setActiveTab('catalog')}
              className="group cursor-pointer overflow-hidden border border-[#EEEAE5] rounded-none bg-white hover:border-[#2A2A2A] transition-all duration-300 relative aspect-[4/5] shadow-sm flex flex-col justify-end p-6"
            >
              {/* Back photo background absolute display */}
              <div className="absolute inset-0 z-0 select-none">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]"
                  referrerPolicy="no-referrer"
                />
                {/* dark glass overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-colors duration-300" />
              </div>

              {/* Text overlays */}
              <div className="relative z-10 text-left space-y-2 text-white">
                <span className="text-[9px] font-mono tracking-widest uppercase bg-white/20 border border-white/25 px-2 py-0.5 rounded-none font-bold inline-block">
                  {cat.count} collections
                </span>
                <h3 className="font-sans font-bold text-lg uppercase tracking-wider">{cat.name}</h3>
                <p className="text-[11px] text-[#CCC] line-clamp-2 leading-relaxed font-serif italic">{cat.desc}</p>
                <div className="pt-2 flex items-center space-x-1 text-xs text-[#A38E7E] group-hover:text-white transition-colors font-bold uppercase tracking-wider">
                  <span>DÉCOUVRIR →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Featured Masterpieces Products section */}
      <section className="bg-[#FAF9F6] py-16 border-y border-[#EEEAE5]" id="featured-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="text-left max-w-lg space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A38E7E] font-bold">Incontournables</span>
              <h2 className="text-3xl font-sans font-light text-[#2A2A2A] uppercase tracking-tight">Nos pièces emblématiques</h2>
              <p className="text-xs text-[#666] leading-relaxed font-serif italic">
                Découvrez les meubles les plus prisés par notre communauté d’architectes et d’amateurs de design géométrique.
              </p>
            </div>
            
            <button
              onClick={() => setActiveTab('catalog')}
              className="px-5 py-3 border border-[#2A2A2A] hover:bg-[#2A2A2A] hover:text-white text-[#2A2A2A] bg-white text-[10px] uppercase font-bold tracking-widest rounded-none transition-all flex items-center space-x-2 shrink-0 self-start sm:self-end"
            >
              <span>Accéder au catalogue ({products.length})</span>
              <MoveRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onView={onViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Atelier Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" id="atelier-section">
        {/* Left visually structured frame */}
        <div className="relative aspect-[4/3] rounded-none overflow-hidden border border-[#EEEAE5] p-3 bg-white shadow-sm order-last lg:order-first">
          <div className="w-full h-full overflow-hidden border border-[#EEEAE5] relative">
            <img
              src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1000"
              alt="Atelier d'ébénisterie Nordic Nest"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-[#A38E7E]/10 -z-10 rotate-6" />
        </div>

        <div className="text-left space-y-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A38E7E] font-bold">Savoir-Faire Holistique</span>
          <h2 className="text-3xl sm:text-4xl font-sans font-light text-[#2A2A2A] tracking-tight leading-tight uppercase">
            Matériaux honnêtes, <br />
            <span className="font-serif italic font-light text-[#A38E7E] lowercase">et</span> écologie active.
          </h2>
          <div className="w-12 h-0.5 bg-[#2A2A2A]" />
          <p className="text-xs leading-relaxed text-[#666] font-serif italic">
            Nous refusons le superflu. Chez Nordic Nest, le bois de chêne, de hêtre, de frêne et de noyer provient exclusivement de forêts certifiées durables gérées de façon responsable. Nos revêtements d'assises sont tissés à l'aide de coton biologique et de lin d'origine contrôlée, préservant la biodiversité et assurant une longévité inégalée à votre foyer.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#EEEAE5]">
            <div className="flex items-start space-x-3">
              <BadgeCheck className="w-5 h-5 text-[#A38E7E] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#2A2A2A]">Sourcing Certifié FSC</h4>
                <p className="text-[11px] text-[#666] mt-1 leading-relaxed">Garantie d'une exploitation sylvicole hautement éthique.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Compass className="w-5 h-5 text-[#A38E7E] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#2A2A2A]">Volume Intemporel</h4>
                <p className="text-[11px] text-[#666] mt-1 leading-relaxed">Penser des formes rationnelles pour transcender les modes éphémères.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <section className="bg-[#FAF9F6] py-16 border-t border-[#EEEAE5]" id="testimonials-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A38E7E] font-bold">Avis de passionnés</span>
            <h2 className="text-3xl font-sans font-light text-[#2A2A2A] uppercase tracking-tight">Ce qu'ils disent du Nest</h2>
            <div className="w-12 h-0.5 bg-[#2A2A2A] mx-auto" />
            <p className="text-xs text-[#666] font-serif italic">
              L'expérience de nos clients compte plus que tout. Découvrez leurs impressions de vie avec nos créations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <motion.div
                key={test.name}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="bg-white border border-[#EEEAE5] rounded-none p-8 text-left flex flex-col justify-between shadow-sm relative hover:border-[#2A2A2A] transition-all duration-300"
              >
                {/* Visual stars bar */}
                <div className="space-y-4">
                  <div className="flex text-[#A38E7E] gap-0.5">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-xs sm:text-sm font-serif italic text-[#444] leading-relaxed">
                    {test.comment}
                  </p>
                </div>

                {/* Sender Avatar */}
                <div className="flex items-center space-x-3 pt-6 mt-6 border-t border-[#EEEAE5]">
                  <div className="w-8 h-8 rounded-none bg-[#F5F3F0] border border-[#EEEAE5] text-[#2A2A2A] text-[10px] font-bold flex items-center justify-center uppercase">
                    {test.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#2A2A2A] uppercase tracking-wider">{test.name}</h4>
                    <p className="text-[10px] text-[#A38E7E] font-mono font-medium">{test.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
