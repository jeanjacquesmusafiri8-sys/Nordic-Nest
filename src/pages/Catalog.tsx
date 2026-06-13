import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, RotateCcw, SortAsc, SortDesc, ArrowUpDown } from 'lucide-react';
import { motion } from 'motion/react';

interface CatalogProps {
  onViewProduct: (product: Product) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onViewProduct }) => {
  const { products } = useApp();

  // Filter and Search states
  const [search, setSearch] = useState<string>('');
  const [selectedCat, setSelectedCat] = useState<string>('Tous');
  const [maxPrice, setMaxPrice] = useState<number>(1200);
  const [sortBy, setSortBy] = useState<string>('featured'); // featured, price-asc, price-desc, rating

  // List categories dynamically and include 'Tous'
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['Tous', ...Array.from(cats)];
  }, [products]);

  // Determine maximum product cost for dynamic price filter limit
  const absoluteMaxPrice = useMemo(() => {
    if (products.length === 0) return 1000;
    return Math.max(...products.map(p => p.price));
  }, [products]);

  // Initialize maximum slider value dynamically once
  React.useEffect(() => {
    setMaxPrice(absoluteMaxPrice);
  }, [absoluteMaxPrice]);

  // Combined product filter logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                              p.description.toLowerCase().includes(search.toLowerCase());
        const matchesCat = selectedCat === 'Tous' || p.category === selectedCat;
        const matchesPrice = p.price <= maxPrice;
        return matchesSearch && matchesCat && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // fallback: featured / category
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, search, selectedCat, maxPrice, sortBy]);

  // Reset helper
  const handleResetFilters = () => {
    setSearch('');
    setSelectedCat('Tous');
    setMaxPrice(absoluteMaxPrice);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8 text-left bg-[#FDFCFB]" id="catalog-page">
      {/* Page Title & Intro */}
      <div className="space-y-3 border-b border-[#EEEAE5] pb-8">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#A38E7E] font-bold">
          Nordic Nest Collection
        </span>
        <h1 className="text-3xl sm:text-4xl font-sans font-light text-[#2A2A2A] uppercase tracking-tight">
          Le Catalogue Mobilier
        </h1>
        <div className="w-16 h-0.5 bg-[#2A2A2A]" />
        <p className="text-xs text-[#666] max-w-2xl font-serif italic">
          Parcourez notre collection complète de canapés, lits, bureaux et tables design d'intérieur scandinave. Utilisez les filtres pour affiner votre quête de l'épure parfaite.
        </p>
      </div>

      {/* Main Grid: Filters Sidebar + Catalog Products Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column sidebar filter controls (Collapsible on mobile) */}
        <aside className="lg:col-span-3 bg-[#FAF9F6] border border-[#EEEAE5] rounded-none p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#EEEAE5]">
            <h2 className="font-sans font-bold text-xs uppercase tracking-widest text-[#2A2A2A] flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-[#A38E7E]" />
              <span>Filtres</span>
            </h2>
            <button
              onClick={handleResetFilters}
              className="text-[10px] font-bold text-[#888] uppercase tracking-wider hover:text-[#2A2A2A] flex items-center gap-1 transition-colors"
              title="Réinitialiser"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          {/* 1. Live Text Search Bar input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest block">Recherche</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ex: Fauteuil, chêne, lit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-9 pr-4 py-2.5 bg-white border border-[#2A2A2A] rounded-none focus:outline-none placeholder-[#888] text-[#2A2A2A]"
                id="search-input"
              />
              <Search className="w-3.5 h-3.5 text-[#888] absolute left-3 top-3.5" />
            </div>
          </div>

          {/* 2. Category selection list (Radio style list) */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest block">Catégorie</span>
            <div className="flex flex-wrap lg:flex-col gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3 py-2 text-xs text-left rounded-none transition-all duration-200 border uppercase tracking-wider font-semibold ${
                    selectedCat === cat
                      ? 'bg-[#2A2A2A] border-[#2A2A2A] text-white'
                      : 'bg-white border-[#EEEAE5] text-[#666] hover:bg-[#F5F3F0] hover:text-[#2A2A2A]'
                  }`}
                  id={`filter-cat-${cat}`}
                >
                  {cat === 'Tous' ? 'Toutes les catégories' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Slider price limit control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest">Prix Maximum</span>
              <span className="text-xs font-bold font-mono text-[#A38E7E]">{maxPrice} €</span>
            </div>
            <input
              type="range"
              min="0"
              max={absoluteMaxPrice}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#2A2A2A] bg-[#EEEAE5] h-1 rounded-none cursor-pointer"
              id="price-range-slider"
            />
            <div className="flex items-center justify-between text-[9px] font-mono text-[#888]">
              <span>0 €</span>
              <span>{Math.round(absoluteMaxPrice)} €</span>
            </div>
          </div>

          {/* 4. Sorting options pills */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest block">Triage</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-[#2A2A2A] rounded-none text-[#2A2A2A] focus:outline-none uppercase tracking-wider font-semibold"
              id="sort-select-catalog"
            >
              <option value="featured">Pièces Vedettes & Populaire</option>
              <option value="price-asc">Prix croissant € → $$$</option>
              <option value="price-desc">Prix décroissant $$$ → €</option>
              <option value="rating">Mieux notés d'abord</option>
            </select>
          </div>
        </aside>

        {/* Right column catalog list grid showing the filtered items */}
        <div className="lg:col-span-9 space-y-6">
          {/* Active summary head bar */}
          <div className="bg-white border border-[#EEEAE5] rounded-none p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-semibold text-[#666]">
            <div>
              Nous avons trouvé <span className="font-bold text-[#2A2A2A]">{filteredProducts.length}</span> produit{filteredProducts.length > 1 ? 's' : ''} correspondant{filteredProducts.length > 1 ? 's' : ''}.
            </div>
            
            {/* Display shortcut descriptors tags */}
            <div className="flex flex-wrap gap-2 items-center">
              {search && (
                <span className="bg-[#FAF9F6] border border-[#EEEAE5] text-[#2A2A2A] px-2.5 py-1 rounded-none inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider font-bold">
                  Cherche: "{search}"
                </span>
              )}
              {selectedCat !== 'Tous' && (
                <span className="bg-[#FAF9F6] border border-[#EEEAE5] text-[#2A2A2A] px-2.5 py-1 rounded-none inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider font-bold">
                  Catégorie: {selectedCat}
                </span>
              )}
              {maxPrice < absoluteMaxPrice && (
                <span className="bg-[#FAF9F6] border border-[#EEEAE5] text-[#2A2A2A] px-2.5 py-1 rounded-none inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider font-bold">
                  Max: {maxPrice} €
                </span>
              )}
            </div>
          </div>

          {/* Grid display */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 border border-dashed border-[#2A2A2A]/45 rounded-none text-center space-y-4 bg-[#FAF9F6]">
              <div className="w-12 h-12 bg-white border border-[#EEEAE5] rounded-none flex items-center justify-center mx-auto text-[#A38E7E]">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-sans font-bold text-xs text-[#2A2A2A] uppercase tracking-widest">Aucun produit ne correspond</h3>
                <p className="text-xs text-[#666] max-w-sm mx-auto leading-relaxed font-serif italic">
                  Essayez d'élargir la fourchette de prix, de modifier vos mots-clés ou de choisir une autre catégorie.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-5 py-3 bg-[#2A2A2A] text-white hover:bg-black rounded-none text-[10px] uppercase tracking-widest font-bold transition-all duration-200"
              >
                Réinitialiser les critères
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={onViewProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
