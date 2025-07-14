import { User } from './user';

export interface Inventory {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  manager: User | string;
  createdAt?: string;
  updatedAt?: string;
} 