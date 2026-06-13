import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { ShoppingBag, CreditCard, User, Truck, Phone, MapPin, CheckCircle2, ShoppingCart, HelpCircle, AlertTriangle } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, placeOrder, setActiveTab } = useApp();

  // Shipping form fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [zip, setZip] = useState<string>('');

  // Payment mock option state
  const [cardHolder, setCardHolder] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');

  // Execution states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [assignedOrder, setAssignedOrder] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = cartTotal >= 500 || cartTotal === 0 ? 0 : 35;
  const aggregateTotal = cartTotal + deliveryFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (cart.length === 0) {
      setErrorMsg('Erreur : Votre panier est vide.');
      return;
    }

    if (!name || !email || !phone || !address || !city || !zip) {
      setErrorMsg('Veuillez remplir tous les champs de livraison obligatoires.');
      return;
    }

    setIsSubmitting(true);

    // Simulate database write delay for natural realism
    setTimeout(() => {
      try {
        const order = placeOrder({
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          shippingAddress: address,
          city,
          zipCode: zip,
        });

        setAssignedOrder(order);
      } catch (err: any) {
        setErrorMsg(`Erreur lors de la prise de commande: ${err.message}`);
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  // If success order created
  if (assignedOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-8" id="checkout-success-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-[#EEEAE5] rounded-none p-8 shadow-md space-y-6 text-left"
        >
          <div className="w-12 h-12 bg-[#FAF9F6] border border-[#A38E7E] text-[#A38E7E] rounded-none flex items-center justify-center mb-2 animate-pulse">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div className="space-y-2 border-b border-[#EEEAE5] pb-4">
            <h2 className="text-2xl font-sans font-light text-[#2A2A2A] uppercase tracking-tight">Commande confirmée !</h2>
            <p className="text-[10px] font-mono text-[#A38E7E] uppercase tracking-widest font-bold">
              Référence : {assignedOrder.id}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#555] font-serif leading-relaxed italic">
            Merci <span className="font-bold font-sans text-xs text-[#2A2A2A] not-italic">{assignedOrder.customerName}</span> ! Votre simulation de commande pour un montant total de {' '}
            <span className="font-bold text-[#A38E7E] font-sans">{assignedOrder.totalAmount.toLocaleString('fr-FR')} €</span> a été enregistrée avec succès.
          </p>

          <div className="bg-[#FAF9F6] border border-[#EEEAE5] rounded-none p-5 space-y-2.5 text-xs text-[#555]">
            <p className="font-bold border-b border-[#EEEAE5] pb-2 text-[10px] uppercase tracking-widest text-[#2A2A2A]">Récapitulatif de Livraison :</p>
            <p><span className="font-bold text-[#2A2A2A]">Adresse :</span> {assignedOrder.shippingAddress}, {assignedOrder.zipCode} {assignedOrder.city}</p>
            <p><span className="font-bold text-[#2A2A2A]">Contact :</span> {assignedOrder.customerPhone} / {assignedOrder.customerEmail}</p>
            <p className="pt-2 text-[9px] text-amber-800 font-mono uppercase tracking-wider font-semibold">
              ⚡ Suivez et traitez cette commande via le panneau d’administration.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setActiveTab('catalog')}
              className="flex-grow py-3.5 bg-[#2A2A2A] hover:bg-black text-white font-sans font-bold text-[10px] uppercase tracking-widest rounded-none transition-all duration-200"
              id="back-boutique-btn"
            >
              Retourner à la boutique
            </button>
            <button
              onClick={() => {
                setActiveTab('admin-dashboard');
              }}
              className="px-4 py-3.5 border border-[#2A2A2A] hover:bg-[#F5F3F0] text-[#2A2A2A] font-bold text-[10px] uppercase tracking-widest rounded-none transition-all flex items-center justify-center gap-1.5"
            >
              Panneau Admin (oderick)
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8 text-left bg-[#FDFCFB]" id="checkout-view-page">
      {/* Head banner */}
      <div className="border-b border-[#EEEAE5] pb-8 space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#A38E7E] font-bold">Panier d’achat</span>
        <h1 className="text-3xl font-sans font-light text-[#2A2A2A] uppercase tracking-tight">Processus de Commande</h1>
        <p className="text-xs sm:text-sm text-[#666] font-serif italic max-w-2xl">
          Saisissez vos informations de livraison et simulez l'enregistrement d'une carte bancaire. Aucun débit financier réel ne sera opéré.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-900 text-xs font-semibold rounded-none flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-red-700 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[#EEEAE5] rounded-none space-y-4">
          <div className="w-12 h-12 bg-white border border-[#EEEAE5] rounded-none flex items-center justify-center mx-auto text-[#A38E7E]">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-sans font-bold text-xs text-[#2A2A2A] uppercase tracking-widest">Votre panier est vide</h3>
            <p className="text-xs text-[#666] max-w-xs mx-auto font-serif italic">
              Vous devez ajouter au moins un meuble à votre panier pour initier le processus de commande.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('catalog')}
            className="px-5 py-3 bg-[#2A2A2A] text-white hover:bg-black rounded-none text-[10px] uppercase font-bold tracking-widest"
          >
            Accéder au Catalogue
          </button>
        </div>
      ) : (
        <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column forms fields */}
          <div className="lg:col-span-8 space-y-6">
            {/* Part 1: Contact & Delivery Address */}
            <div className="bg-[#FAF9F6] border border-[#EEEAE5] rounded-none p-6 space-y-4">
              <h2 className="font-sans font-bold text-xs uppercase tracking-widest text-[#2A2A2A] flex items-center gap-2 border-b border-[#EEEAE5] pb-3 mb-2">
                <Truck className="w-4 h-4 text-[#A38E7E]" />
                <span>1. Informations de Livraison</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest block">Nom complet *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jean Dupont"
                      className="w-full text-xs pl-8 pr-3 py-2.5 bg-white border border-[#2A2A2A] rounded-none focus:outline-none text-[#2A2A2A]"
                    />
                    <User className="w-3.5 h-3.5 text-[#888] absolute left-2.5 top-3.5" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest block">Adresse Email *</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jean.dupont@exemple.com"
                      className="w-full text-xs pl-8 pr-3 py-2.5 bg-white border border-[#2A2A2A] rounded-none focus:outline-none text-[#2A2A2A]"
                    />
                    <span className="absolute left-2.5 top-3 text-xs text-[#888] font-mono">@</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest block">Numéro de téléphone *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                    className="w-full text-xs pl-8 pr-3 py-2.5 bg-white border border-[#2A2A2A] rounded-none focus:outline-none text-[#2A2A2A]"
                  />
                  <Phone className="w-3.5 h-3.5 text-[#888] absolute left-2.5 top-3.5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest block">Adresse postale exacte *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="24 Place Bellecour"
                    className="w-full text-xs pl-8 pr-3 py-2.5 bg-white border border-[#2A2A2A] rounded-none focus:outline-none text-[#2A2A2A]"
                  />
                  <MapPin className="w-3.5 h-3.5 text-[#888] absolute left-2.5 top-3.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest block">Ville *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Lyon"
                    className="w-full text-xs p-2.5 bg-white border border-[#2A2A2A] rounded-none focus:outline-none text-[#2A2A2A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest block">Code Postal *</label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="69002"
                    className="w-full text-xs p-2.5 bg-white border border-[#2A2A2A] rounded-none focus:outline-none text-[#2A2A2A]"
                  />
                </div>
              </div>
            </div>

            {/* Part 2: Card Payment simulation details */}
            <div className="bg-[#FAF9F6] border border-[#EEEAE5] rounded-none p-6 space-y-4">
              <h2 className="font-sans font-bold text-xs uppercase tracking-widest text-[#2A2A2A] flex items-center gap-2 border-b border-[#EEEAE5] pb-3 mb-2">
                <CreditCard className="w-4 h-4 text-[#A38E7E]" />
                <span>2. Simulation de Paiement (Sécurisé Stripe-like)</span>
              </h2>

              <div className="p-3 bg-white border border-[#EEEAE5] rounded-none text-xs text-[#555] flex items-start space-x-2 font-serif italic">
                <HelpCircle className="w-4 h-4 text-[#A38E7E] shrink-0 mt-0.5" />
                <p>
                  Saisissez des codes quelconques pour valider le formulaire. Aucune authentification Stripe réelle n'est requise.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest block">Nom sur la carte *</label>
                  <input
                    type="text"
                    required
                    placeholder="M. Jean Dupont"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-[#2A2A2A] rounded-none focus:outline-none text-[#2A2A2A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest block">Numéro de carte bancaire *</label>
                  <input
                    type="text"
                    required
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-[#2A2A2A] rounded-none focus:outline-none text-[#2A2A2A] font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest block">Date d'expiration *</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/AA"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-[#2A2A2A] rounded-none focus:outline-none text-[#2A2A2A] font-mono"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#2A2A2A] uppercase tracking-widest block">CVV / Code secret *</label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-[#2A2A2A] rounded-none focus:outline-none text-[#2A2A2A] font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column invoice summary details */}
          <div className="lg:col-span-4 bg-[#FAF9F6] border border-[#EEEAE5] rounded-none p-6 space-y-6">
            <h2 className="font-sans font-bold text-xs uppercase tracking-widest text-[#2A2A2A] flex items-center gap-2 border-b border-[#EEEAE5] pb-3">
              <ShoppingBag className="w-4 h-4 text-[#A38E7E]" />
              <span>Votre Panier</span>
            </h2>

            {/* List mini row cards of active cart products */}
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between items-start text-xs text-left">
                  <div className="min-w-0 pr-3">
                    <p className="font-bold text-[#2A2A2A] truncate uppercase tracking-tight">{item.product.name}</p>
                    <p className="text-[#888] font-mono text-[10px]">Qté: {item.quantity} x {item.product.price} €</p>
                  </div>
                  <span className="font-bold text-[#2A2A2A] shrink-0 font-mono">
                    {(item.product.price * item.quantity).toLocaleString('fr-FR')} €
                  </span>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-[#EEEAE5]" />

            {/* Subtotal maths summary */}
            <div className="space-y-2 text-xs text-[#666] uppercase tracking-wider font-semibold">
              <div className="flex justify-between">
                <span>Total articles :</span>
                <span className="font-bold text-[#2A2A2A]">{cartTotal.toLocaleString('fr-FR')} €</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison :</span>
                {deliveryFee === 0 ? (
                  <span className="text-[#065F46] font-bold">Gratuit (Offerte)</span>
                ) : (
                  <span className="font-bold text-[#2A2A2A]">{deliveryFee} €</span>
                )}
              </div>
              
              <div className="w-full h-px bg-[#EEEAE5] my-1" />

              <div className="flex justify-between text-sm font-bold text-[#2A2A2A] pt-1 uppercase tracking-widest">
                <span>Total Final :</span>
                <span className="text-base font-mono font-bold text-[#A38E7E]">{aggregateTotal.toLocaleString('fr-FR')} €</span>
              </div>
            </div>

            {/* Checkout buttons triggers submissions */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-none text-xs uppercase font-sans font-bold tracking-widest text-white transition-all flex items-center justify-center space-x-2 ${
                isSubmitting
                  ? 'bg-amber-700 cursor-wait'
                  : 'bg-[#2A2A2A] hover:bg-black cursor-pointer'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Validation en cours...' : 'Confirmer l’Achat Simulé'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className="w-full py-2.5 border border-[#EEEAE5] bg-white hover:bg-[#F5F3F0] text-xs font-bold uppercase tracking-widest text-[#2A2A2A] rounded-none transition-colors text-center block"
            >
              Retourner aux achats
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
