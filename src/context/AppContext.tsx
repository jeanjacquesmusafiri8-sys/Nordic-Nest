import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, Stats } from '../types';
import { INITIAL_PRODUCTS, INITIAL_USERS, INITIAL_ORDERS } from '../data/mockData';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  users: User[];
  currentUser: User | null;
  statistics: Stats;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Product handlers
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Cart handlers
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Order handlers
  placeOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    city: string;
    zipCode: string;
  }) => Order;
  updateOrderStatus: (id: string, status: 'En attente' | 'Expédié' | 'Livré') => void;
  
  // User handlers
  updateUserStatus: (id: string, status: 'active' | 'blocked') => void;
  updateUserRole: (id: string, role: 'admin' | 'customer') => void;
  registerUser: (name: string, email: string) => User;
  
  // Auth handlers
  login: (email: string, password?: string) => { success: boolean; message: string };
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation trigger across SPA
  const [activeTab, setActiveTab] = useState<string>('home'); // home, catalog, admin-login, admin-dashboard, checkout

  // State initialization
  const [products, setProducts] = useState<Product[]>(() => {
    const local = localStorage.getItem('nn_products');
    return local ? JSON.parse(local) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const local = localStorage.getItem('nn_cart');
    return local ? JSON.parse(local) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const local = localStorage.getItem('nn_orders');
    return local ? JSON.parse(local) : INITIAL_ORDERS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const local = localStorage.getItem('nn_users');
    return local ? JSON.parse(local) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const local = localStorage.getItem('nn_current_user');
    return local ? JSON.parse(local) : null;
  });

  // Persist variations in state
  useEffect(() => {
    localStorage.setItem('nn_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nn_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nn_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nn_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('nn_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('nn_current_user');
    }
  }, [currentUser]);

  // Handle active admin tab routing safeguard
  useEffect(() => {
    if (activeTab === 'admin-dashboard' && (!currentUser || currentUser.role !== 'admin')) {
      setActiveTab('admin-login');
    }
  }, [activeTab, currentUser]);

  // Calculate high-level Statistics
  const [statistics, setStatistics] = useState<Stats>({
    totalSales: 0,
    productsCount: 0,
    usersCount: 0,
    ordersCount: 0,
  });

  useEffect(() => {
    const totalSales = orders
      .filter(o => o.status === 'Livré' || o.status === 'Expédié')
      .reduce((sum, o) => sum + o.totalAmount, 0);
    setStatistics({
      totalSales,
      productsCount: products.length,
      usersCount: users.length,
      ordersCount: orders.length,
    });
  }, [products, users, orders]);

  // Product actions
  const addProduct = (newProd: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => {
    const product: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
      rating: 4.5,
      reviewsCount: 1,
    };
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p)));
    // Also sync in-cart details if needed
    setCart(prev =>
      prev.map(item =>
        item.product.id === id
          ? { ...item, product: { ...item.product, ...updatedFields } }
          : item
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  // Cart actions
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Order actions
  const placeOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    city: string;
    zipCode: string;
  }) => {
    const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const orderItems = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const newOrder: Order = {
      id: `CMD-${Math.floor(1000 + Math.random() * 9000)}`,
      ...orderData,
      items: orderItems,
      totalAmount,
      status: 'En attente',
      createdAt: new Date().toISOString().split('T')[0],
    };

    // Update stocks
    setProducts(prev =>
      prev.map(p => {
        const orderedItem = orderItems.find(item => item.productId === p.id);
        if (orderedItem) {
          return { ...p, stock: Math.max(0, p.stock - orderedItem.quantity) };
        }
        return p;
      })
    );

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: 'En attente' | 'Expédié' | 'Livré') => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status } : o)));
  };

  // User actions
  const updateUserStatus = (id: string, status: 'active' | 'blocked') => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, status } : u)));
    // If blocked current user, log them out
    if (status === 'blocked' && currentUser && currentUser.id === id) {
      setCurrentUser(null);
      setActiveTab('home');
    }
  };

  const updateUserRole = (id: string, role: 'admin' | 'customer') => {
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, role } : u)));
    if (currentUser && currentUser.id === id) {
      setCurrentUser(prev => prev ? { ...prev, role } : null);
    }
  };

  const registerUser = (name: string, email: string) => {
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) return existing;

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'customer',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  // Auth logins
  const login = (email: string, password?: string) => {
    const sanitizedEmail = email.trim();
    
    // STRICT RULE AUTH FOR ADMIN: coderick or oderick / 123456
    if (sanitizedEmail === 'oderick' && password === '123456') {
      const adminUser: User = {
        id: 'user-1',
        name: 'Oderick',
        email: 'oderick',
        role: 'admin',
        status: 'active',
        createdAt: '2026-01-10',
      };
      
      // Upsert admin into simulated user table if missing
      setUsers(prev => {
        if (!prev.find(u => u.email === 'oderick')) {
          return [adminUser, ...prev];
        }
        return prev;
      });

      setCurrentUser(adminUser);
      setActiveTab('admin-dashboard');
      return { success: true, message: 'Bienvenue, Administrateur.' };
    }

    // Customer flow for standard email address or named login
    const foundUser = users.find(u => u.email.toLowerCase() === sanitizedEmail.toLowerCase());
    if (foundUser) {
      if (foundUser.status === 'blocked') {
        return { success: false, message: 'Votre compte a été suspendu par un administrateur.' };
      }
      
      // If user logs in with email but password was given (e.g. they wanted a secure simulation)
      setCurrentUser(foundUser);
      setActiveTab('home');
      return { success: true, message: `Re-bonjour, ${foundUser.name} !` };
    }

    // If customer doesn't exist, we can register them as a customer on-the-fly to simulate perfect onboarding
    if (sanitizedEmail.includes('@') || sanitizedEmail.length >= 3) {
      const name = sanitizedEmail.split('@')[0];
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      const newUser = registerUser(capitalizedName, sanitizedEmail);
      setCurrentUser(newUser);
      setActiveTab('home');
      return { success: true, message: `Bienvenue chez Nordic Nest, ${capitalizedName} ! Votre espace client a été créé.` };
    }

    return { 
      success: false, 
      message: 'Email ou code de passe incorrect pour le panneau Admin. Essayez "oderick" et "123456".' 
    };
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveTab('home');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        orders,
        users,
        currentUser,
        statistics,
        activeTab,
        setActiveTab,
        
        addProduct,
        updateProduct,
        deleteProduct,
        
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        
        placeOrder,
        updateOrderStatus,
        
        updateUserStatus,
        updateUserRole,
        registerUser,
        
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp doit être utilisé à l\'intérieur d\'un AppProvider');
  }
  return context;
};
