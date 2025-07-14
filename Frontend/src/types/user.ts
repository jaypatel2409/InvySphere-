export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
} 