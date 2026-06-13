import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, User, Order } from '../types';
import {
  Plus, Edit, Trash2, Users, ShoppingBag, DollarSign, Package,
  SlidersHorizontal, CheckCircle2, AlertCircle, RefreshCw, Eye, X, Shield, Lock, Unlock, Search
} from 'lucide-react';
import { motion } from 'motion/react';

export const AdminDashboard: React.FC = () => {
  const {
    products, addProduct, updateProduct, deleteProduct,
    orders, updateOrderStatus,
    users, updateUserStatus, updateUserRole,
    statistics, currentUser
  } = useApp();

  // Selected administrative sub-tab
  const [panelTab, setPanelTab] = useState<'stats' | 'products' | 'orders' | 'users'>('stats');

  // Search filtering in tables
  const [productSearch, setProductSearch] = useState<string>('');
  const [userSearch, setUserSearch] = useState<string>('');

  // CREATE / EDIT product modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // State-driven notification feedback toast
  const [notification, setNotification] = useState<string | null>(null);
  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Form states
  const [formName, setFormName] = useState<string>('');
  const [formPrice, setFormPrice] = useState<number>(100);
  const [formCategory, setFormCategory] = useState<string>('Salon');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formDimensions, setFormDimensions] = useState<string>('L 60 x H 70 x P 60 cm');
  const [formMaterials, setFormMaterials] = useState<string>('');
  const [formStock, setFormStock] = useState<number>(10);
  const [formImageUrl, setFormImageUrl] = useState<string>('');
  const [formBadge, setFormBadge] = useState<string>('');
  const [formFeatured, setFormFeatured] = useState<boolean>(false);

  // Action: Open modal to ADD product
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormName('');
    setFormPrice(150);
    setFormCategory('Salon');
    setFormDescription('Un meuble d\'exception conçu au sein de nos ateliers partenaires.');
    setFormDimensions('L 80 x H 75 x P 80 cm');
    setFormMaterials('Structure bois massif, finitions huilées.');
    setFormStock(10);
    setFormImageUrl('https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800');
    setFormBadge('Nouveau');
    setFormFeatured(false);
    setIsProductModalOpen(true);
  };

  // Action: Open modal to EDIT product
  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormPrice(product.price);
    setFormCategory(product.category);
    setFormDescription(product.description);
    setFormDimensions(product.dimensions);
    setFormMaterials(product.materials);
    setFormStock(product.stock);
    setFormImageUrl(product.imageUrl);
    setFormBadge(product.badge || '');
    setFormFeatured(product.featured || false);
    setIsProductModalOpen(true);
  };

  // Action: Save product form (ADD or EDIT)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName || !formImageUrl) {
      triggerNotification("Veuillez remplir au moins le nom du meuble et l'adresse URL de l'image.");
      return;
    }

    const payload = {
      name: formName,
      price: Number(formPrice),
      category: formCategory,
      description: formDescription,
      dimensions: formDimensions,
      materials: formMaterials,
      stock: Number(formStock),
      imageUrl: formImageUrl,
      badge: formBadge || undefined,
      featured: formFeatured,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      triggerNotification('Le meuble a été mis à jour avec succès.');
    } else {
      addProduct(payload);
      triggerNotification('Le meuble a été ajouté au catalogue.');
    }

    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Êtes-vous certain de vouloir retirer définitivement "${name}" du catalogue ?`)) {
      deleteProduct(id);
    }
  };

  // Filter lists inside tables
  const filteredProductsTable = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredUsersTable = users.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  // Pure CSS visual charts dataset: category volume
  const categoryChartData = [
    { name: 'Salon', count: products.filter(p => p.category === 'Salon').length, color: 'bg-[#8A7968]' },
    { name: 'Chambre', count: products.filter(p => p.category === 'Chambre').length, color: 'bg-[#5C5C5A]' },
    { name: 'Bureau', count: products.filter(p => p.category === 'Bureau').length, color: 'bg-[#9A7D42]' },
    { name: 'Cuisine', count: products.filter(p => p.category === 'Cuisine').length, color: 'bg-[#1E3A8A]' },
  ];

  const totalProductSumCount = products.length || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8 text-left bg-[#FDFCFB]" id="admin-dashboard-page">
      {/* 1. Header with greeting and stats brief */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EEEAE5] pb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A38E7E] font-bold">
            Console de Gestion
          </span>
          <h1 className="text-3xl font-sans font-light text-[#2A2A2A] uppercase tracking-tight mt-1">
            Tableau de Bord Administrateur
          </h1>
          <p className="text-xs sm:text-sm text-[#666] mt-1 font-serif italic">
            Bienvenue dans l'atelier, <span className="font-bold text-[#2A2A2A] font-sans not-italic">{currentUser?.name || 'Administrateur'}</span>. Synchronisation locale active.
          </p>
        </div>

        {/* Quick action trigger shortcut */}
        <button
          onClick={handleOpenAdd}
          className="px-5 py-3.5 bg-[#2A2A2A] text-white hover:bg-black font-bold text-[10px] uppercase tracking-widest rounded-none flex items-center gap-1.5 shrink-0 transition-all"
          id="admin-quick-add-btn"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Meuble</span>
        </button>
      </div>

      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-white border border-[#A38E7E] text-[#2A2A2A] text-xs font-mono uppercase tracking-wider flex items-center space-x-2"
        >
          <CheckCircle2 className="w-4 h-4 text-[#A38E7E]" />
          <span>{notification}</span>
        </motion.div>
      )}

      {/* 2. TAB MENU CONTROLS - Horizontal Pills bar */}
      <div className="flex flex-wrap border-b border-[#EEEAE5] text-[10px] font-bold uppercase tracking-widest text-[#666] gap-2">
        <button
          onClick={() => setPanelTab('stats')}
          className={`px-5 py-3 relative -bottom-px flex items-center gap-1.5 transition-all rounded-none ${
            panelTab === 'stats'
              ? 'text-[#2A2A2A] border-b-2 border-[#2A2A2A]'
              : 'hover:text-[#2A2A2A]'
          }`}
          id="btn-tab-stats"
        >
          <Package className="w-4 h-4 text-[#A38E7E]" />
          <span>Vue Globale</span>
        </button>
        
        <button
          onClick={() => setPanelTab('products')}
          className={`px-5 py-3 relative -bottom-px flex items-center gap-1.5 transition-all rounded-none ${
            panelTab === 'products'
              ? 'text-[#2A2A2A] border-b-2 border-[#2A2A2A]'
              : 'hover:text-[#2A2A2A]'
          }`}
          id="btn-tab-products"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#A38E7E]" />
          <span>Produits ({products.length})</span>
        </button>
        
        <button
          onClick={() => setPanelTab('orders')}
          className={`px-5 py-3 relative -bottom-px flex items-center gap-1.5 transition-all rounded-none ${
            panelTab === 'orders'
              ? 'text-[#2A2A2A] border-b-2 border-[#2A2A2A]'
              : 'hover:text-[#2A2A2A]'
          }`}
          id="btn-tab-orders"
        >
          <ShoppingBag className="w-4 h-4 text-[#A38E7E]" />
          <span>Commandes ({orders.length})</span>
        </button>
        
        <button
          onClick={() => setPanelTab('users')}
          className={`px-5 py-3 relative -bottom-px flex items-center gap-1.5 transition-all rounded-none ${
            panelTab === 'users'
              ? 'text-[#2A2A2A] border-b-2 border-[#2A2A2A]'
              : 'hover:text-[#2A2A2A]'
          }`}
          id="btn-tab-users"
        >
          <Users className="w-4 h-4 text-[#A38E7E]" />
          <span>Utilisateurs ({users.length})</span>
        </button>
      </div>

      {/* 3. CONDITIONAL TAB CONTENTS RENDER */}
      <div className="space-y-8">
        
        {/* TAB 1: OVERVIEW STATISTICS CARD TILES */}
        {panelTab === 'stats' && (
          <div className="space-y-8" id="tab-content-stats">
            {/* Tile grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#FAF9F6] border border-[#EEEAE5] rounded-none p-6 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-none bg-white border border-[#EEEAE5] text-[#2A2A2A] flex items-center justify-center shrink-0">
                  <DollarSign className="w-5 h-5 text-[#A38E7E]" />
                </div>
                <div>
                  <p className="text-[9px] text-[#A38E7E] font-mono uppercase tracking-widest font-bold">Chiffre d’affaires</p>
                  <p className="text-xl font-bold text-[#2A2A2A] font-mono tracking-tight mt-0.5">
                    {statistics.totalSales.toLocaleString('fr-FR')} €
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF9F6] border border-[#EEEAE5] rounded-none p-6 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-none bg-white border border-[#EEEAE5] text-[#2A2A2A] flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-[#A38E7E]" />
                </div>
                <div>
                  <p className="text-[9px] text-[#A38E7E] font-mono uppercase tracking-widest font-bold">Catalogue Actif</p>
                  <p className="text-xl font-bold text-[#202020] font-mono tracking-tight mt-0.5">
                    {statistics.productsCount} modèles
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF9F6] border border-[#EEEAE5] rounded-none p-6 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-none bg-white border border-[#EEEAE5] text-[#212121] flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-5 h-5 text-[#A38E7E]" />
                </div>
                <div>
                  <p className="text-[9px] text-[#A38E7E] font-mono uppercase tracking-widest font-bold">Ventes Totales</p>
                  <p className="text-xl font-bold text-[#2A2A2A] font-mono tracking-tight mt-0.5">
                    {statistics.ordersCount} commandes
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF9F6] border border-[#EEEAE5] rounded-none p-6 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-none bg-white border border-[#EEEAE5] text-[#2A2A2A] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#A38E7E]" />
                </div>
                <div>
                  <p className="text-[9px] text-[#A38E7E] font-mono uppercase tracking-widest font-bold">Membres Nest Club</p>
                  <p className="text-xl font-bold text-[#2A2A2A] font-mono tracking-tight mt-0.5">
                    {statistics.usersCount} inscrits
                  </p>
                </div>
              </div>
            </div>

            {/* Visual graph layout & orders summary grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Category Inventory Chart volume pure CSS bar graphs */}
              <div className="lg:col-span-4 bg-[#FAF9F6] border border-[#EEEAE5] rounded-none p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-sans font-bold text-[10px] uppercase tracking-widest text-[#2A2A2A] border-b border-[#EEEAE5] pb-3 mb-4">
                    Répartition par catégorie
                  </h3>
                  <div className="space-y-4">
                    {categoryChartData.map((cat) => {
                      const percentage = Math.round((cat.count / totalProductSumCount) * 100);
                      return (
                        <div key={cat.name} className="space-y-1.5 text-xs text-left">
                          <div className="flex items-center justify-between text-[#555]">
                            <span className="font-semibold text-[#2A2A2A]">{cat.name}</span>
                            <span className="font-mono text-[10px]">{cat.count} article{cat.count > 1 ? 's' : ''} ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-[#EEEAE5] h-2 rounded-none overflow-hidden">
                            <div
                              className={`${cat.color} h-full rounded-none transition-all duration-700`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#EEEAE5] mt-6 text-xs text-[#888]">
                  <p className="font-serif italic text-[11px]">
                    💡 Protocole : Complétez le mobilier Salon ou Bureau à l'aide de l'onglet Produits pour rééquilibrer le catalogue de l'atelier automatiquement.
                  </p>
                </div>
              </div>

              {/* Tabular list of recent orders overview */}
              <div className="lg:col-span-8 bg-white border border-[#EEEAE5] rounded-none p-6">
                <h3 className="font-sans font-bold text-[10px] uppercase tracking-widest text-[#2A2A2A] border-b border-[#EEEAE5] pb-3 mb-4">
                  Dernières Activités & Commandes clients
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-[#EEEAE5] text-[#A38E7E] uppercase font-mono tracking-widest text-[9px]">
                        <th className="pb-3 text-left">ID COMPTABLE</th>
                        <th className="pb-3">Client</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Total</th>
                        <th className="pb-3 text-right">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EEEAE5]">
                      {orders.slice(0, 5).map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#FAF9F6]">
                          <td className="py-3 font-mono font-bold text-[#2A2A2A]">{ord.id}</td>
                          <td className="py-3 font-serif">
                            <p className="font-sans font-bold text-xs text-[#2A2A2A]">{ord.customerName}</p>
                            <span className="text-[9px] text-[#A38E7E] uppercase font-mono tracking-wider font-semibold">{ord.city}</span>
                          </td>
                          <td className="py-3 text-[#555] font-mono text-[11px]">{ord.createdAt}</td>
                          <td className="py-3 font-sans font-bold text-[#2A2A2A]">{ord.totalAmount.toLocaleString('fr-FR')} €</td>
                          <td className="py-3 text-right">
                            <span
                              className={`px-2.5 py-1 rounded-none text-[9px] uppercase tracking-widest font-bold border ${
                                ord.status === 'Livré'
                                  ? 'bg-emerald-50 border-[#A7F3D0] text-[#065F46]'
                                  : ord.status === 'Expédié'
                                  ? 'bg-blue-50 border-blue-200 text-blue-800'
                                  : 'bg-amber-50 border-[#FCD34D] text-amber-800'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {orders.length === 0 && (
                  <p className="text-center py-10 text-xs text-[#888] font-serif italic">Aucune commande n'a été enregistrée pour l'instant.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ACTIVE PRODUCTS CATALOG CRUD TABLE */}
        {panelTab === 'products' && (
          <div className="space-y-6" id="tab-content-products">
            {/* Search filtering stats */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  placeholder="Filtrer par nom ou catégorie..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-3 bg-white border border-[#EEEAE5] focus:border-[#2A2A2A] rounded-none focus:outline-none"
                  id="admin-product-search"
                />
                <Search className="w-3.5 h-3.5 text-[#8C8885] absolute left-3 top-3.5" />
              </div>

              <button
                onClick={handleOpenAdd}
                className="px-5 py-3 bg-[#2A2A2A] hover:bg-black text-white font-bold text-[10px] uppercase tracking-widest rounded-none transition-all flex items-center justify-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau Produit</span>
              </button>
            </div>

            {/* Tabular displays */}
            <div className="bg-white border border-[#EEEAE5] rounded-none overflow-x-auto p-2">
              <table className="w-full text-xs text-left" id="admin-products-table">
                <thead>
                  <tr className="border-b border-[#EEEAE5] text-[#A38E7E] uppercase font-mono tracking-widest text-[9px]">
                    <th className="p-3">Meuble</th>
                    <th className="p-3">Catégorie</th>
                    <th className="p-3">Prix</th>
                    <th className="p-3">Stock Restant</th>
                    <th className="p-3">Badge</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEAE5]">
                  {filteredProductsTable.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#FAF9F6]">
                      <td className="p-3 flex items-center space-x-3 text-left">
                        <div className="w-10 h-10 rounded-none overflow-hidden select-none shrink-0 border border-[#EEEAE5]">
                          <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-[#2A2A2A] truncate max-w-[180px] sm:max-w-xs">{prod.name}</p>
                          <span className="text-[9px] font-mono text-[#A38E7E]">ID: {prod.id}</span>
                        </div>
                      </td>
                      <td className="p-3 text-[10px] uppercase font-mono tracking-wider font-semibold text-[#8A7968]">{prod.category}</td>
                      <td className="p-3 font-mono font-bold text-[#2A2A2A]">{prod.price.toLocaleString('fr-FR')} €</td>
                      <td className="p-3">
                        {prod.stock <= 0 ? (
                          <span className="px-2 py-0.5 rounded-none text-[9px] uppercase tracking-wider font-bold text-red-800 bg-red-50 border border-red-200">Épuisé</span>
                        ) : prod.stock <= 5 ? (
                          <span className="px-2 py-0.5 rounded-none text-[9px] uppercase tracking-wider font-bold text-amber-800 bg-amber-50 border border-amber-300">Critique ({prod.stock})</span>
                        ) : (
                          <span className="font-mono text-[#065F46] font-semibold">{prod.stock} unités</span>
                        )}
                      </td>
                      <td className="p-3">
                        {prod.badge ? (
                          <span className="bg-[#FAF9F6] border border-[#EEEAE5] px-2 py-0.5 rounded-none text-[9px] font-mono font-semibold uppercase">{prod.badge}</span>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                      <td className="p-3 text-center gap-1.5 flex items-center justify-center">
                        <button
                          onClick={() => handleOpenEdit(prod)}
                          className="px-2.5 py-1.5 text-[10px] uppercase tracking-wider font-bold border border-[#EEEAE5] hover:border-[#2A2A2A] hover:bg-[#FAF9F6] rounded-none text-[#2A2A2A] transition-all"
                          title="Modifier"
                          id={`admin-btn-edit-${prod.id}`}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id, prod.name)}
                          className="px-2.5 py-1.5 text-[10px] uppercase tracking-wider font-bold border border-red-200 text-red-700 hover:bg-red-50 hover:border-red-500 rounded-none transition-all"
                          title="Supprimer"
                          id={`admin-btn-delete-${prod.id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProductsTable.length === 0 && (
                <div className="text-center py-12 text-[#8C8885] space-y-2">
                  <AlertCircle className="w-8 h-8 mx-auto text-[#AAA]" />
                  <p>Aucun meuble ne correspond à votre recherche.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: ADMIN ORDERS MANAGEMENT STATUS ADJUSTMENT */}
        {panelTab === 'orders' && (
          <div className="space-y-6" id="tab-content-orders">
            <div className="p-4 bg-[#FAF9F6] border border-[#EEEAE5] rounded-none text-xs font-mono text-gray-600">
              <p>🔄 Modifiez dynamiquement l'état d'expédition à l'aide des boutons ci-dessous. Les changements seront répercutés à travers l'application.</p>
            </div>

            <div className="bg-white border border-[#EEEAE5] rounded-none overflow-x-auto p-2">
              <table className="w-full text-xs text-left" id="admin-orders-table">
                <thead>
                  <tr className="border-b border-[#EEEAE5] text-[#A38E7E] uppercase font-mono tracking-widest text-[9px]">
                    <th className="p-3">Commande</th>
                    <th className="p-3">Client & Livraison</th>
                    <th className="p-3">Meubles Commandés</th>
                    <th className="p-3">Date d'Enregistrement</th>
                    <th className="p-3">Total Facturé</th>
                    <th className="p-3 text-right">Modifier le Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEAE5]">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FAF9F6]">
                      <td className="p-3 font-mono font-bold text-[#2A2A2A]">{ord.id}</td>
                      <td className="p-3 text-left space-y-1">
                        <p className="font-sans font-bold text-xs text-[#2A2A2A]">{ord.customerName}</p>
                        <p className="text-[#888] font-mono text-[11px]">{ord.customerPhone} | {ord.customerEmail}</p>
                        <p className="text-[10px] text-gray-500 font-mono italic">{ord.shippingAddress}, {ord.zipCode} {ord.city}</p>
                      </td>
                      <td className="p-3">
                        <div className="space-y-1 text-left text-[11px] text-gray-700">
                          {ord.items.map((it, i) => (
                            <p key={i}>
                              <span className="font-semibold text-gray-900">{it.quantity}x</span> {it.productName}
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-[#555] font-mono text-[11px]">{ord.createdAt}</td>
                      <td className="p-3 font-bold text-gray-950 font-sans">{ord.totalAmount.toLocaleString('fr-FR')} €</td>
                      <td className="p-3 text-right">
                        <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2">
                          {/* Colored state pill */}
                          <span
                            className={`px-2.5 py-0.5 rounded-none text-[9px] uppercase tracking-widest font-bold border self-start sm:self-center ${
                              ord.status === 'Livré'
                                ? 'bg-emerald-50 border-[#A7F3D0] text-[#065F46]'
                                : ord.status === 'Expédié'
                                ? 'bg-blue-50 border-blue-200 text-blue-800'
                                : 'bg-amber-50 border-[#FCD34D] text-amber-800'
                            }`}
                          >
                            {ord.status}
                          </span>

                          {/* Quick selectors Dropdown */}
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                            className="text-[10px] p-1 border border-[#EEEAE5] bg-white rounded-none text-[#2A2A2A] focus:outline-none"
                            id={`status-select-${ord.id}`}
                          >
                            <option value="En attente">En attente</option>
                            <option value="Expédié">Expédié</option>
                            <option value="Livré">Livré</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {orders.length === 0 && (
                <p className="text-center py-10 text-xs text-[#888] font-serif italic">Aucune commande facturée actuellement.</p>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: USERS MANAGEMENT SUSPENSIONS AND ROLES */}
        {panelTab === 'users' && (
          <div className="space-y-6" id="tab-content-users">
            {/* Search filter in users */}
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Filtrer les membres par nom ou email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-3 bg-white border border-[#EEEAE5] focus:border-[#2A2A2A] rounded-none focus:outline-none"
                id="admin-user-search"
              />
              <Search className="w-3.5 h-3.5 text-[#888] absolute left-3 top-3.5" />
            </div>

            <div className="bg-white border border-[#EEEAE5] rounded-none overflow-x-auto p-2">
              <table className="w-full text-xs text-left" id="admin-users-table">
                <thead>
                  <tr className="border-b border-[#EEEAE5] text-[#A38E7E] uppercase font-mono tracking-widest text-[9px]">
                    <th className="p-3">Utilisateur</th>
                    <th className="p-3">E-mail</th>
                    <th className="p-3">Rôle</th>
                    <th className="p-3">Date d'Inscription</th>
                    <th className="p-3">État du compte</th>
                    <th className="p-3 text-right">Changer l'État</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEAE5]">
                  {filteredUsersTable.map((u) => {
                    const isAdmin = u.role === 'admin';
                    const isBlocked = u.status === 'blocked';

                    return (
                       <tr key={u.id} className="hover:bg-[#FAF9F6]">
                        <td className="p-3 flex items-center space-x-2 text-left">
                          <div className="w-8 h-8 rounded-none bg-[#FAF9F6] border border-[#EEEAE5] text-[#2A2A2A] text-[10px] font-bold flex items-center justify-center uppercase">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-sans font-bold text-xs text-[#2A2A2A]">{u.name}</p>
                            <span className="text-[9px] font-mono text-[#A38E7E]">ID: {u.id}</span>
                          </div>
                        </td>
                        <td className="p-3 text-[#555] font-mono select-all text-[11px]">{u.email}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-none border ${
                            isAdmin ? 'bg-red-50 border-red-200 text-red-700' : 'bg-[#FAF9F6] border-[#EEEAE5] text-gray-700'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3 text-[#777] font-mono text-[11px]">{u.createdAt}</td>
                        <td className="p-3">
                          {isBlocked ? (
                            <span className="px-2 py-0.5 rounded-none text-[9px] font-bold text-red-800 bg-red-50 border border-red-200 uppercase tracking-widest font-mono">Bloqué</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-none text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 uppercase tracking-widest font-mono">Actif</span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            {/* Role toggles */}
                            <button
                              onClick={() => updateUserRole(u.id, isAdmin ? 'customer' : 'admin')}
                              className="text-[9px] uppercase tracking-wider font-bold border border-[#EEEAE5] hover:border-[#2A2A2A] hover:bg-[#FAF9F6] text-[#2A2A2A] px-2.5 py-1.5 rounded-none transition-all"
                              title="Permuter rôle administrateur-client"
                            >
                              Changer Rôle
                            </button>

                            {/* Status block toggle */}
                            <button
                              onClick={() => updateUserStatus(u.id, isBlocked ? 'active' : 'blocked')}
                              className={`p-1.5 rounded-none border ${
                                isBlocked
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                                  : 'bg-red-50 text-red-800 border-red-200 hover:bg-red-100'
                              }`}
                              title={isBlocked ? 'Débloquer et réactiver' : 'Bloquer le compte'}
                            >
                              {isBlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ============== CRUD DETAILED DIALOG MODAL: ADD / EDIT PRODUCT ============== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-[#2A2A2A] rounded-none shadow-2xl overflow-hidden w-full max-w-2xl max-h-[90vh] flex flex-col text-left"
            id="admin-crud-modal"
          >
            {/* Modal Head info */}
            <div className="p-5 border-b border-[#EEEAE5] flex items-center justify-between bg-[#FAF9F6]">
              <h2 className="font-sans font-bold text-[10px] uppercase tracking-widest text-[#2A2A2A]">
                {editingProduct ? `Modifier "${editingProduct.name}"` : 'Créer un nouveau mobilier d’atelier'}
              </h2>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 rounded-none hover:bg-[#EEEAE5]"
              >
                <X className="w-5 h-5 text-[#888] hover:text-[#2A2A2A]" />
              </button>
            </div>

            {/* Modal Fields scrollable forms */}
            <form onSubmit={handleSaveProduct} className="flex-grow overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#666]">Nom du meuble *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ex: Fauteuil Bergen"
                    className="w-full text-xs p-2.5 bg-white border border-[#EEEAE5] focus:border-[#2A2A2A] rounded-none focus:outline-none"
                    id="crud-input-name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#666]">Prix (€) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full text-xs p-2.5 bg-white border border-[#EEEAE5] focus:border-[#2A2A2A] rounded-none focus:outline-none"
                    id="crud-input-price"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#666]">Catégorie mobilier *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-[#EEEAE5] rounded-none focus:outline-none text-[#2A2A2A]"
                    id="crud-select-category"
                  >
                    <option value="Salon">Salon</option>
                    <option value="Chambre">Chambre</option>
                    <option value="Bureau">Bureau</option>
                    <option value="Cuisine">Cuisine</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#666]">Stock initial disponible *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full text-xs p-2.5 bg-white border border-[#EEEAE5] focus:border-[#2A2A2A] rounded-none focus:outline-none"
                    id="crud-input-stock"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#666]">Url de l'image (Haute Définition Unsplash suggérée) *</label>
                <input
                  type="url"
                  required
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-xs p-2.5 bg-white border border-[#EEEAE5] focus:border-[#2A2A2A] rounded-none focus:outline-none"
                  id="crud-input-image"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#666]">Badge (Optionnel)</label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="Ex: -20% , Vedette"
                    className="w-full text-xs p-2.5 bg-white border border-[#EEEAE5] focus:border-[#2A2A2A] rounded-none focus:outline-none"
                    id="crud-input-badge"
                  />
                </div>

                <div className="pt-6 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="accent-[#2A2A2A] w-4 h-4 rounded-none"
                    id="crud-checkbox-featured"
                  />
                  <label htmlFor="crud-checkbox-featured" className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#666] cursor-pointer">Placer en tête d'affiche</label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#666]">Description esthétique *</label>
                <textarea
                  required
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-[#EEEAE5] focus:border-[#2A2A2A] rounded-none focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#666]">Dimensions (L x H x P)</label>
                  <input
                    type="text"
                    value={formDimensions}
                    onChange={(e) => setFormDimensions(e.target.value)}
                    placeholder="Ex: 80cm x 75cm x 85cm"
                    className="w-full text-xs p-2.5 bg-white border border-[#EEEAE5] focus:border-[#2A2A2A] rounded-none focus:outline-none"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#666]">Matériaux et origine du bois</label>
                  <input
                    type="text"
                    value={formMaterials}
                    onChange={(e) => setFormMaterials(e.target.value)}
                    placeholder="Chêne massif FSC"
                    className="w-full text-xs p-2.5 bg-white border border-[#EEEAE5] focus:border-[#2A2A2A] rounded-none focus:outline-none"
                  />
                </div>
              </div>

              {/* Action operations footer bottom */}
              <div className="pt-6 border-t border-[#EEEAE5] flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-3 border border-[#EEEAE5] bg-[#FAF9F6] hover:bg-[#EEEAE5] text-[#2A2A2A] text-[10px] uppercase tracking-widest font-bold rounded-none transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2A2A2A] hover:bg-black text-[10px] uppercase tracking-widest font-bold text-white rounded-none cursor-pointer transition-all"
                >
                  {editingProduct ? 'Enregistrer les modifications' : 'Créer le meuble'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
