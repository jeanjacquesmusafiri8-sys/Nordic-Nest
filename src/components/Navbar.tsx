import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, User as UserIcon, LogOut, ShieldAlert, Library } from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const { activeTab, setActiveTab, currentUser, logout, cart } = useApp();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="w-full sticky top-0 z-40 flex flex-col">
      {/* Top Banner */}
      <div className="h-8 bg-[#2A2A2A] text-white flex items-center justify-center text-[10px] sm:text-[11px] uppercase tracking-widest font-medium px-4 text-center">
        LIVRAISON INTERNATIONALE OFFERTE DÈS 1 200 € d'ACHATS — COLLECTION ÉTÉ EN LIGNE
      </div>

      <header className="w-full bg-white border-b border-[#EEEAE5] px-4 sm:px-8 py-0 h-16 flex items-center shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          {/* Brand Logo with display serif/sans spacing */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-2 text-left group focus:outline-none"
            id="nav-logo"
          >
            <div className="w-8 h-8 bg-[#2A2A2A] flex items-center justify-center mr-1.5 shrink-0 transition-transform duration-500 group-hover:rotate-180">
              <div className="w-4 h-4 border-2 border-white rotate-45"></div>
            </div>
            <div>
              <h1 className="font-sans font-bold text-sm sm:text-lg tracking-tighter text-[#2A2A2A] leading-none uppercase">
                NORDIC NEST
              </h1>
              <span className="text-[8px] text-[#A38E7E] font-mono tracking-widest uppercase block mt-0.5">
                GEOMETRIC BALANCE
              </span>
            </div>
          </button>

          {/* Desktop Web Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('home')}
              className={`transition-colors duration-200 relative py-1 focus:outline-none ${
                activeTab === 'home' ? 'text-[#2A2A2A]' : 'text-[#888] hover:text-[#2A2A2A]'
              }`}
              id="nav-home-btn"
            >
              Accueil
              {activeTab === 'home' && (
                <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#2A2A2A]" />
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('catalog')}
              className={`transition-colors duration-200 relative py-1 focus:outline-none ${
                activeTab === 'catalog' ? 'text-[#2A2A2A]' : 'text-[#888] hover:text-[#2A2A2A]'
              }`}
              id="nav-catalog-btn"
            >
              Boutique
              {activeTab === 'catalog' && (
                <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#2A2A2A]" />
              )}
            </button>

            {currentUser?.role === 'admin' ? (
              <button
                onClick={() => setActiveTab('admin-dashboard')}
                className={`flex items-center space-x-1.5 transition-colors duration-200 relative py-1 focus:outline-none ${
                  activeTab === 'admin-dashboard' ? 'text-[#A38E7E]' : 'text-[#888] hover:text-[#A38E7E]'
                }`}
                id="nav-admin-dashboard-btn"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Dashboard</span>
                {activeTab === 'admin-dashboard' && (
                  <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#A38E7E]" />
                )}
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('admin-login')}
                className={`transition-colors duration-200 relative py-1 focus:outline-none ${
                  activeTab === 'admin-login' ? 'text-[#2A2A2A]' : 'text-[#888] hover:text-[#2A2A2A]'
                }`}
                id="nav-admin-login-btn"
              >
                Admin
                {activeTab === 'admin-login' && (
                  <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-[#2A2A2A]" />
                )}
              </button>
            )}
          </nav>

          {/* Actions panel */}
          <div className="flex items-center space-x-4">
            {/* User badge */}
            {currentUser ? (
              <div className="flex items-center space-x-2 border border-[#EEEAE5] bg-[#F5F3F0] rounded-none pl-2 pr-3 py-1 text-xs text-[#2A2A2A]">
                <div className="w-5 h-5 rounded-none bg-[#2A2A2A] text-white font-semibold flex items-center justify-center uppercase text-[10px]">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="max-w-[80px] truncate hidden sm:inline font-medium uppercase font-sans tracking-wide text-[10px]">
                  {currentUser.name}
                </span>
                <button
                  onClick={logout}
                  title="Déconnexion"
                  className="hover:text-red-600 transition-colors p-0.5"
                  id="btn-logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('admin-login')}
                className="p-1.5 border border-[#EEEAE5] hover:bg-[#F5F3F0] transition-colors rounded-none text-[#888] hover:text-[#2A2A2A]"
                title="Connexion"
                id="nav-login-icon"
              >
                <UserIcon className="w-4 h-4" />
              </button>
            )}

            {/* Cart Bag trigger button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 border border-[#EEEAE5] bg-[#F5F3F0] hover:bg-white transition-colors rounded-none text-[#2A2A2A] group focus:outline-none flex items-center justify-center"
              id="nav-cart-trigger"
              aria-label="Panier d'achats"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartItemsCount > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 bg-[#A38E7E] text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              ) : (
                <span className="absolute -top-1.5 -right-1.5 bg-[#2A2A2A] text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-normal">
                  0
                </span>
              )}
            </button>

            {/* Quick Admin shortcut trigger buttons for theme fidelity */}
            {currentUser?.role !== 'admin' && (
              <button
                onClick={() => setActiveTab('admin-login')}
                className="hidden md:inline-block px-4 py-1.5 border border-[#2A2A2A] text-[10px] uppercase font-bold hover:bg-[#2A2A2A] hover:text-white transition-all rounded-none"
              >
                Admin Access
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Nav helper shortcut underneath header bar on small viewports */}
      <div className="flex md:hidden items-center justify-center space-x-6 py-2 border-b border-[#EEEAE5] bg-[#FDFCFB] text-[10px] uppercase tracking-wider font-bold text-[#888]">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-2 py-1 ${activeTab === 'home' ? 'text-[#2A2A2A] border-b-2 border-[#2A2A2A]' : ''}`}
        >
          Accueil
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-2 py-1 ${activeTab === 'catalog' ? 'text-[#2A2A2A] border-b-2 border-[#2A2A2A]' : ''}`}
        >
          Boutique
        </button>
        {currentUser?.role === 'admin' ? (
          <button
            onClick={() => setActiveTab('admin-dashboard')}
            className={`px-2 py-1 text-[#A38E7E] flex items-center gap-1 ${
              activeTab === 'admin-dashboard' ? 'border-b-2 border-[#A38E7E]' : ''
            }`}
          >
            Dashboard
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('admin-login')}
            className={`px-2 py-1 ${activeTab === 'admin-login' ? 'text-[#2E2E2E] border-b-2 border-[#2E2E2E]' : ''}`}
          >
            Admin
          </button>
        )}
      </div>
    </div>
  );
};
