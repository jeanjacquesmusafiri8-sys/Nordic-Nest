import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, ShieldCheck, HelpCircle, Package, Layers, Check } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useApp();
  const [qty, setQty] = useState<number>(1);
  const [activeSegment, setActiveSegment] = useState<'desc' | 'specs'>('desc');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  // Reset local quantity count on selected product change
  useEffect(() => {
    setQty(1);
    setActiveSegment('desc');
    setShowFeedback(false);
  }, [product]);

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleIncrement = () => {
    if (qty < product.stock) {
      setQty(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQty(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, qty);
    
    // Smooth state-based elegant toast substitution
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      onClose();
    }, 2200);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    return (
      <div className="flex items-center space-x-0.5 text-[#A38E7E]">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${i < fullStars ? 'fill-current' : 'text-gray-200'}`}
          />
        ))}
        <span className="text-[10px] font-mono text-[#666] ml-2">
          {rating.toFixed(1)} / 5 ({product.reviewsCount} avis)
        </span>
      </div>
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black pointer-events-auto"
          id="detail-backdrop"
        />

        {/* Modal viewport container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          className="bg-white border border-[#EEEAE5] rounded-none shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col pointer-events-auto relative z-10"
          id="detail-modal-container"
        >
          {/* Top header button absolute overlay */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-black border border-[#EEEAE5] text-[#2A2A2A] hover:text-white rounded-none transition-all duration-200 z-20 focus:outline-none"
            aria-label="Fermer le dialogue d'article"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Scrolling viewer content */}
          <div className="flex-grow overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:divide-x md:divide-[#EEEAE5]">
              {/* Left Column product photography */}
              <div className="md:col-span-6 bg-[#FAF9F6] p-6 flex flex-col justify-center relative">
                {product.badge && (
                  <span className="absolute top-6 left-6 z-10 bg-[#2A2A2A] text-white px-3 py-1 rounded-none text-[9px] font-bold uppercase tracking-widest">
                    {product.badge}
                  </span>
                )}
                
                <div className="aspect-[4/3] sm:aspect-square w-full rounded-none overflow-hidden border border-[#EEEAE5] bg-white">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="mt-4 p-3 bg-white border border-[#EEEAE5] rounded-none text-left flex items-start space-x-3 text-xs text-[#666]">
                  <HelpCircle className="w-4 h-4 text-[#A38E7E] shrink-0 mt-0.5" />
                  <p className="font-serif italic text-[11px]">
                    Besoin d'un échantillon gratuit de tissu ou d'un conseil ? Contactez notre atelier d'ébénisterie au <span className="font-bold text-[#2A2A2A] font-sans text-xs">01 89 24 33 00</span>.
                  </p>
                </div>
              </div>

              {/* Right Column details text info */}
              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between text-left h-full">
                <div className="space-y-4">
                  {/* Category */}
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#A38E7E] font-bold block">
                    Meuble — {product.category}
                  </span>

                  {/* Title & Price */}
                  <div className="space-y-1">
                    <h2 className="text-2xl sm:text-3xl font-sans font-light text-[#2A2A2A] uppercase tracking-tight">
                      {product.name}
                    </h2>
                    <p className="text-xl font-mono font-bold text-[#A38E7E]">
                      {product.price.toLocaleString('fr-FR')} €
                    </p>
                  </div>

                  {/* Star Ratings */}
                  {renderStars(product.rating)}

                  <div className="w-full h-px bg-[#EEEAE5]" />

                  {/* Segmented Tabbing Menu */}
                  <div className="flex border-b border-[#EEEAE5] text-[10px] font-bold uppercase tracking-widest text-[#888]">
                    <button
                      onClick={() => setActiveSegment('desc')}
                      className={`pb-2 pr-4 relative -bottom-px font-semibold ${
                        activeSegment === 'desc' ? 'text-[#2A2A2A] border-b border-[#2A2A2A]' : 'hover:text-[#2A2A2A]'
                      }`}
                    >
                      Description
                    </button>
                    <button
                      onClick={() => setActiveSegment('specs')}
                      className={`pb-2 px-4 relative -bottom-px font-semibold ${
                        activeSegment === 'specs' ? 'text-[#2A2A2A] border-b border-[#2A2A2A]' : 'hover:text-[#2A2A2A]'
                      }`}
                    >
                      Spécifications
                    </button>
                  </div>

                  {/* Segment Details Content panels */}
                  <div className="text-xs sm:text-sm text-[#555] min-h-[100px] leading-relaxed py-2">
                    {activeSegment === 'desc' && (
                      <p className="font-serif italic leading-relaxed text-[#666]">
                        {product.description}
                      </p>
                    )}

                    {activeSegment === 'specs' && (
                      <div className="space-y-2.5 text-xs text-[#555]">
                        <div className="flex items-center space-x-2">
                          <Package className="w-3.5 h-3.5 text-[#A38E7E]" />
                          <span className="font-bold text-[#2A2A2A] uppercase tracking-wider text-[10px]">Dimensions :</span>
                          <span className="font-mono">{product.dimensions}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Layers className="w-3.5 h-3.5 text-[#A38E7E]" />
                          <span className="font-bold text-[#2A2A2A] uppercase tracking-wider text-[10px]">Matériaux :</span>
                          <span>{product.materials}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-emerald-800">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span className="font-bold uppercase tracking-wider text-[10px]">Garantie :</span>
                          <span>5 ans de sérénité</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Stock Level status warning */}
                  <div className="pt-2">
                    {isOutOfStock ? (
                      <div className="p-3 bg-red-50 text-red-800 text-xs font-semibold rounded-none border border-red-100">
                        ⚠️ Rupture de stock temporaire. Contactez-nous à l'atelier.
                      </div>
                    ) : isLowStock ? (
                      <div className="p-3 bg-[#FCF6ED] text-amber-800 text-xs font-semibold rounded-none border border-[#EEEAE5] uppercase tracking-wide">
                        🔥 Stock limité ! Plus que {product.stock} exemplaires restants.
                      </div>
                    ) : (
                      <div className="p-2 border border-[#EEEAE5] text-[#065F46] text-xs font-semibold rounded-none inline-block uppercase tracking-wider font-mono bg-white">
                        ✓ Disponible (Expédition sous 48h) • {product.stock} restants
                      </div>
                    )}
                  </div>
                </div>

                {/* Sub Add-to-cart controls footer wrapper */}
                {!isOutOfStock && (
                  <div className="pt-6 sm:pt-8 mt-6 border-t border-[#EEEAE5] flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 relative">
                    {/* Inline toast popup system substitute for alert() */}
                    <AnimatePresence>
                      {showFeedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-white z-30 flex items-center justify-center border border-[#A38E7E] p-3 text-center"
                        >
                          <div className="flex items-center space-x-2 text-emerald-850 font-bold text-xs uppercase tracking-widest">
                            <Check className="w-4.5 h-4.5 text-emerald-600" />
                            <span>{qty}x {product.name} ajouté(s) au panier !</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Qty selectors */}
                    <div className="flex items-center justify-between border border-[#2A2A2A] rounded-none bg-[#F5F3F0] p-1 shrink-0">
                      <button
                        onClick={handleDecrement}
                        disabled={qty <= 1}
                        className={`p-1.5 px-3.5 rounded-none text-xs font-bold text-[#2A2A2A] hover:bg-white transition-colors ${
                          qty <= 1 ? 'opacity-30 cursor-not-allowed' : ''
                        }`}
                      >
                        -
                      </button>
                      
                      <span className="px-5 font-bold font-mono text-sm text-[#2A2A2A] select-none">
                        {qty}
                      </span>
                      
                      <button
                        onClick={handleIncrement}
                        disabled={qty >= product.stock}
                        className={`p-1.5 px-3.5 rounded-none text-xs font-bold text-[#2A2A2A] hover:bg-white transition-colors ${
                          qty >= product.stock ? 'opacity-30 cursor-not-allowed' : ''
                        }`}
                      >
                        +
                      </button>
                    </div>

                    {/* Add button triggers */}
                    <button
                      onClick={handleAddToCart}
                      className="flex-grow py-3 px-6 bg-[#2A2A2A] hover:bg-black text-white font-sans font-bold text-xs uppercase tracking-widest rounded-none shadow-sm transition-all duration-300 flex items-center justify-center space-x-2"
                      id="detail-add-cart-btn"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Ajouter au panier • {(product.price * qty).toLocaleString('fr-FR')} €</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
