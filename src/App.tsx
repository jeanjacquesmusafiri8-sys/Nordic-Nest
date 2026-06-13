/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { Product } from './types';

function MainLayout() {
  const { activeTab } = useApp();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const displayProductDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFBFA] text-[#2C2A29] selection:bg-[#C29B7F]/30 overflow-x-hidden font-sans antialiased">
      {/* Dynamic Global Header Navbar */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Coordinate Content Viewport */}
      <main className="flex-grow transition-all duration-300">
        {activeTab === 'home' && <Home onViewProduct={displayProductDetails} />}
        {activeTab === 'catalog' && <Catalog onViewProduct={displayProductDetails} />}
        {activeTab === 'admin-login' && <Login />}
        {activeTab === 'admin-dashboard' && <AdminDashboard />}
        {activeTab === 'checkout' && <Checkout />}
      </main>

      {/* Dynamic Global Footer */}
      <Footer />

      {/* Absolute Slide-Over Basket drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Absolute Backdrop specifications details modal viewer */}
      <ProductDetailModal product={selectedProduct} onClose={closeProductDetails} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
