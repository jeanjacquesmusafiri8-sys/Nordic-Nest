/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  dimensions: string;
  materials: string;
  stock: number;
  imageUrl: string;
  badge?: string; // e.g., "Nouveau", "-20%", "Vedette"
  featured?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  status: 'active' | 'blocked';
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  zipCode: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: 'En attente' | 'Expédié' | 'Livré';
  createdAt: string;
}

export interface Stats {
  totalSales: number;
  productsCount: number;
  usersCount: number;
  ordersCount: number;
}
