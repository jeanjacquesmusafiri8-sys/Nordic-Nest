import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { Star, Eye, ShoppingCart, Info } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onView }) => {
  const { addToCart } = useApp();

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="group bg-white border border-[#EEEAE5] hover:border-[#2A2A2A] rounded-none overflow-hidden transition-all duration-300 flex flex-col h-full relative p-2"
      id={`product-card-${product.id}`}
    >
      {/* Product Image and Portraited Shape Container */}
      <div 
        onClick={() => onView(product)}
        className="aspect-[4/5] bg-[#F5F3F0] relative overflow-hidden flex items-center justify-center cursor-pointer"
      >
        {/* Dynamic visual Badges overlay */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-widest border border-[#2A2A2A] z-10 shadow-sm">
            {product.badge}
          </div>
        )}

        {/* Product image */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />

        <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />

        {/* Hover Action quick-add button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!isOutOfStock) {
              addToCart(product, 1);
            }
          }}
          disabled={isOutOfStock}
          className="absolute bottom-0 left-0 right-0 py-3 bg-[#2A2A2A] text-white text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        >
          {isOutOfStock ? 'Sold Out' : 'Ajouter Direct +'}
        </button>
      </div>

      {/* Info details block */}
      <div className="pt-4 pb-2 px-1 flex-grow flex flex-col justify-between">
        <div className="space-y-1 text-left">
          <div className="flex justify-between items-start gap-2">
            <h3 
              onClick={() => onView(product)}
              className="font-sans font-bold text-[#2A2A2A] text-sm group-hover:text-[#A38E7E] transition-colors leading-tight uppercase tracking-tight cursor-pointer"
            >
              {product.name}
            </h3>
            <span className="font-sans font-bold text-sm text-[#2A2A2A] whitespace-nowrap shrink-0">
              {product.price.toLocaleString('fr-FR')} €
            </span>
          </div>
          
          <p className="text-[11px] text-[#888] uppercase tracking-wider font-semibold">
            {product.category}
          </p>
        </div>

        {/* Footer info showing stock levels and review average */}
        <div className="pt-2.5 mt-2.5 border-t border-[#EEEAE5] flex items-center justify-between text-[10px] uppercase tracking-wider font-bold text-[#888]">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-current text-[#A38E7E]" />
            <span className="text-[#2A2A2A]">{product.rating}</span>
            <span className="text-[9px] text-[#A19D9A]">({product.reviewsCount})</span>
          </span>

          {isOutOfStock ? (
            <span className="text-[#991B1B] font-extrabold text-[9px] bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-none">
              Épuisé
            </span>
          ) : isLowStock ? (
            <span className="text-[#D97706] font-extrabold text-[9px] bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-none animate-pulse">
              Derniers {product.stock}
            </span>
          ) : (
            <span className="text-[#065F46] font-semibold text-[9px] bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-none">
              In Stock
            </span>
          )}
        </div>
      </div>

      {/* Immediate buy buttons on mobile layout where hover is hard */}
      <div className="p-1 border-t border-[#F2EFEA] flex items-center justify-between space-x-2 md:hidden">
        <button
          onClick={() => onView(product)}
          className="flex-grow py-1.5 text-[10px] uppercase font-bold text-center border border-[#EEEAE5] hover:bg-black hover:text-white text-[#2A2A2A] rounded-none transition-colors"
        >
          Détails
        </button>
        <button
          onClick={() => {
            if (!isOutOfStock) addToCart(product, 1);
          }}
          disabled={isOutOfStock}
          className="px-3 py-1.5 text-[10px] uppercase font-bold rounded-none transition-colors flex items-center justify-center bg-[#2A2A2A] text-white"
        >
          + Panier
        </button>
      </div>
    </motion.div>
  );
};
