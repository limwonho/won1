import { create } from 'zustand';
import type { Product, Transaction } from '../types';
import { mockProducts, mockTransactions } from '../data/mockData';

interface InventoryStore {
  products: Product[];
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id' | 'createdAt'>) => void;
  addProduct: (product: Omit<Product, 'id' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
}

export const useInventoryStore = create<InventoryStore>((set) => ({
  products: mockProducts,
  transactions: mockTransactions,

  addTransaction: (tx) =>
    set((state) => {
      const newTx: Transaction = {
        ...tx,
        id: `t${Date.now()}`,
        createdAt: new Date().toLocaleString('ko-KR', { hour12: false }).slice(0, 16),
      };
      const updatedProducts = state.products.map((p) => {
        if (p.id !== tx.productId) return p;
        const delta = tx.type === 'in' ? tx.quantity : -tx.quantity;
        return {
          ...p,
          currentStock: Math.max(0, p.currentStock + delta),
          updatedAt: new Date().toISOString().slice(0, 10),
        };
      });
      return {
        transactions: [newTx, ...state.transactions],
        products: updatedProducts,
      };
    }),

  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        {
          ...product,
          id: `p${Date.now()}`,
          updatedAt: new Date().toISOString().slice(0, 10),
        },
      ],
    })),

  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString().slice(0, 10) } : p
      ),
    })),
}));
