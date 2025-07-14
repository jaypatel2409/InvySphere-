import { Inventory } from './inventory';

export interface Item {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  image?: string;
  inventory: Inventory | string;
  createdAt?: string;
  updatedAt?: string;
} 