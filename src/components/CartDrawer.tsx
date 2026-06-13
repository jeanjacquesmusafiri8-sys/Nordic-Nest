import React from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, updateCartQuantity, removeFromCart, setActiveTab } = useApp();

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryThreshold = 500;
  const deliveryFee = totalAmount >= deliveryThreshold || totalAmount === 0 ? 0 : 35;
  const grandTotal = totalAmount + deliveryFee;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop screen filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
            id="cart-backdrop"
          />

          {/* Sliding wrapper panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-[#FDFCFB] shadow-2xl z-55 flex flex-col pointer-events-auto border-l border-[#EEEAE5]"
            id="cart-drawer-container"
          >
            {/* Header banner bar */}
            <div className="p-6 border-b border-[#EEEAE5] flex items-center justify-between bg-[#FAF9F6]">
              <div className="flex items-center space-x-2 text-[#2A2A2A]">
                <ShoppingBag className="w-4.5 h-4.5 text-[#A38E7E]" />
                <h2 className="font-sans font-bold text-xs uppercase tracking-widest">Mon Panier</h2>
                <span className="text-[10px] bg-[#2A2A2A] text-white font-mono px-2 py-0.5 rounded-none font-bold">
                  {cart.length}
                </span>
              </div>
              
              <button
                onClick={onClose}
                className="p-1.5 border border-[#EEEAE5] hover:bg-[#F5F3F0] text-[#888] hover:text-[#2A2A2A] transition-colors rounded-none"
                id="btn-close-cart"
                aria-label="Fermer le panier"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List entries scroll field */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-12 h-12 bg-white border border-[#EEEAE5] text-[#A38E7E] rounded-none flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-sans font-bold text-xs text-[#2A2A2A] uppercase tracking-widest">Votre panier est vide</h3>
                    <p className="text-xs text-[#666] max-w-[240px] mx-auto font-serif italic">
                      Explorez notre catalogue et ajoutez des meubles d'exception à votre collection.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('catalog');
                      onClose();
                    }}
                    className="px-5 py-3 bg-[#2A2A2A] text-white hover:bg-black text-[10px] uppercase font-bold tracking-widest rounded-none transition-colors"
                  >
                    Découvrir la collection
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => {
                    const rowPrice = item.product.price * item.quantity;
                    const stockMaxed = item.quantity >= item.product.stock;

                    return (
                      <div
                        key={item.product.id}
                        className="flex items-center space-x-4 p-3 border border-[#EEEAE5] rounded-none bg-white hover:border-[#2A2A2A] transition-all"
                      >
                        {/* Image square frame */}
                        <div className="w-16 h-16 rounded-none overflow-hidden bg-gray-100 shrink-0 border border-[#EEEAE5]">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Text and control row column */}
                        <div className="flex-grow space-y-1 text-left min-w-0">
                          <h4 className="font-sans font-bold text-xs text-[#2A2A2A] uppercase tracking-tight truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A38E7E] font-medium block">
                            {item.product.category}
                          </span>

                          <div className="flex items-center justify-between pt-1">
                            {/* Quantity buttons control */}
                            <div className="flex items-center border border-[#EEEAE5] rounded-none bg-[#F5F3F0]">
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 hover:bg-white text-[#2A2A2A] transition-colors rounded-none"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2.5 text-xs font-semibold font-mono text-[#2A2A2A]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                disabled={stockMaxed}
                                className={`p-1 hover:bg-white text-[#2A2A2A] transition-colors rounded-none ${
                                  stockMaxed ? 'cursor-not-allowed opacity-30' : ''
                                }`}
                                title={stockMaxed ? 'Stock maximum atteint' : ''}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Line sum price math */}
                            <div className="text-right">
                              <span className="text-xs font-bold font-sans text-[#2A2A2A]">
                                {rowPrice.toLocaleString('fr-FR')} €
                              </span>
                              <p className="text-[9px] text-[#888] font-medium font-mono">
                                ({item.product.price} € / u)
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Line removal trash button */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-[#888] hover:text-[#991B1B] rounded-none border border-transparent hover:border-[#EEEAE5] hover:bg-[#F5F3F0] transition-colors shrink-0"
                          title="Supprimer l'article"
                          id={`btn-cart-remove-${item.product.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Calculations and checkout confirmation bottom panel */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#EEEAE5] bg-[#FAF9F6] space-y-4">
                {/* Free shipment thermometer math */}
                <div className="bg-white border border-[#EEEAE5] rounded-none p-3 text-left">
                  {totalAmount >= deliveryThreshold ? (
                    <p className="text-xs text-[#065F46] font-bold flex items-center gap-1.5 uppercase tracking-wider">
                      🎉 LIVRAISON 100% OFFERTE
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      <p className="text-[11px] text-[#2A2A2A] font-semibold uppercase tracking-wider">
                        Plus que <span className="font-extrabold text-[#A38E7E]">{(deliveryThreshold - totalAmount)} €</span> pour la livraison offerte.
                      </p>
                      <div className="w-full bg-[#EEEAE5] h-1 rounded-none overflow-hidden">
                        <div 
                          className="bg-[#A38E7E] h-full rounded-none transition-all duration-500"
                          style={{ width: `${(totalAmount / deliveryThreshold) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Subtotals lines math display */}
                <div className="space-y-2 text-xs text-[#666] uppercase tracking-wider font-semibold">
                  <div className="flex items-center justify-between">
                    <span>Sous-total articles :</span>
                    <span className="font-bold text-[#2A2A2A]">{totalAmount.toLocaleString('fr-FR')} €</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Expédition estimée :</span>
                    {deliveryFee === 0 ? (
                      <span className="text-[#065F46] font-bold">Gratuit</span>
                    ) : (
                      <span className="font-bold text-[#2A2A2A]">{deliveryFee} €</span>
                    )}
                  </div>
                  
                  <div className="w-full h-px bg-[#EEEAE5] my-1" />
                  
                  <div className="flex items-center justify-between text-base text-[#2A2A2A] font-bold pt-1">
                    <span>Total final :</span>
                    <span className="text-lg font-sans text-[#2A2A2A]">{grandTotal.toLocaleString('fr-FR')} €</span>
                  </div>
                </div>

                {/* Action CTA triggers */}
                <button
                  onClick={() => {
                    setActiveTab('checkout');
                    onClose();
                  }}
                  className="w-full py-4 bg-[#2A2A2A] hover:bg-black text-white font-sans font-bold text-xs uppercase tracking-widest rounded-none shadow-sm transition-all duration-300 flex items-center justify-center space-x-2"
                  id="btn-cart-checkout"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Passer au Paiement</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[9px] text-center text-[#999] font-mono uppercase tracking-widest">
                  Simulation de commande sécurisée. Aucun débit réel.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
