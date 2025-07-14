import { User } from './user';

export interface Notification {
  id: string;
  user: User | string;
  message: string;
  read: boolean;
  createdAt?: string;
  updatedAt?: string;
} 