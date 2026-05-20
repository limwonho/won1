export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  unit: string;
  location: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  productId: string;
  productName: string;
  type: 'in' | 'out';
  quantity: number;
  note: string;
  createdBy: string;
  createdAt: string;
}

export type Category = string;
