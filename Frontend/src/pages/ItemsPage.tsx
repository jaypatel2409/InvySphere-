import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Package, Edit, Trash2, MoreHorizontal, AlertTriangle, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

interface Item {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  price: number;
  category: string;
  expiryDate: string | null;
  inventory: string;
  lowStockTrigger: number;
  image: string | null;
  lastUpdated: string;
}

const ItemsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedInventory, setSelectedInventory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  const items: Item[] = [
    {
      id: '1',
      name: 'Wireless Headphones',
      description: 'Bluetooth 5.0 wireless headphones with noise cancellation',
      quantity: 45,
      unit: 'pieces',
      price: 129.99,
      category: 'Electronics',
      expiryDate: null,
      inventory: 'Central Warehouse',
      lowStockTrigger: 10,
      image: '/placeholder.svg',
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      name: 'Smartphone Case',
      description: 'Protective case for latest smartphone models',
      quantity: 8,
      unit: 'pieces',
      price: 24.99,
      category: 'Electronics',
      expiryDate: null,
      inventory: 'Central Warehouse',
      lowStockTrigger: 15,
      image: '/placeholder.svg',
      lastUpdated: '4 hours ago'
    },
    {
      id: '3',
      name: 'Organic Apple Juice',
      description: '100% organic apple juice, 1L bottles',
      quantity: 0,
      unit: 'bottles',
      price: 4.99,
      category: 'Food & Beverage',
      expiryDate: '2024-12-15',
      inventory: 'North Storage Facility',
      lowStockTrigger: 20,
      image: '/placeholder.svg',
      lastUpdated: '1 day ago'
    },
    {
      id: '4',
      name: 'Cotton T-Shirt',
      description: '100% cotton basic t-shirt, various sizes',
      quantity: 156,
      unit: 'pieces',
      price: 19.99,
      category: 'Clothing',
      expiryDate: null,
      inventory: 'South Distribution Center',
      lowStockTrigger: 25,
      image: '/placeholder.svg',
      lastUpdated: '1 day ago'
    },
    {
      id: '5',
      name: 'Vitamin C Tablets',
      description: 'Vitamin C supplement, 60 tablets per bottle',
      quantity: 42,
      unit: 'bottles',
      price: 12.99,
      category: 'Medical',
      expiryDate: '2025-03-20',
      inventory: 'East Campus Store',
      lowStockTrigger: 30,
      image: '/placeholder.svg',
      lastUpdated: '2 days ago'
    }
  ];

  const categories = ['Electronics', 'Clothing', 'Food & Beverage', 'Medical', 'Books & Stationery', 'Automotive'];
  const inventories = ['Central Warehouse', 'North Storage Facility', 'South Distribution Center', 'East Campus Store'];

  const getItemStatus = (item: Item) => {
    if (item.quantity === 0) return 'out-of-stock';
    if (item.quantity <= item.lowStockTrigger) return 'low-stock';
    
    if (item.expiryDate) {
      const expiryDate = new Date(item.expiryDate);
      const now = new Date();
      const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry <= 7) return 'expiring-soon';
    }
    
    return 'in-stock';
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesInventory = selectedInventory === 'all' || item.inventory === selectedInventory;
    
    let matchesStatus = true;
    if (selectedStatus !== 'all') {
      const status = getItemStatus(item);
      matchesStatus = status === selectedStatus;
    }
    
    return matchesSearch && matchesCategory && matchesInventory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-success text-success-foreground';
      case 'low-stock': return 'bg-warning text-warning-foreground';
      case 'out-of-stock': return 'bg-destructive text-destructive-foreground';
      case 'expiring-soon': return 'bg-orange-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in-stock': return 'In Stock';
      case 'low-stock': return 'Low Stock';
      case 'out-of-stock': return 'Out of Stock';
      case 'expiring-soon': return 'Expiring Soon';
      default: return 'Unknown';
    }
  };

  return (
    <Layout title="Item Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Manage Your Items
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Track and manage all items across your inventories.
            </p>
          </div>
          <Link to="/items/new">
            <Button className="bg-gradient-primary hover:opacity-90 mt-4 sm:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Add New Item
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedInventory} onValueChange={setSelectedInventory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Inventory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Inventories</SelectItem>
                  {inventories.map(inventory => (
                    <SelectItem key={inventory} value={inventory}>{inventory}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Items Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Inventory</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => {
                  const status = getItemStatus(item);
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <Package className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {item.inventory}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{item.quantity}</span>
                          <span className="text-sm text-muted-foreground">{item.unit}</span>
                          {item.quantity <= item.lowStockTrigger && (
                            <AlertTriangle className="h-4 w-4 text-warning" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${item.price.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(status)}>
                          {getStatusLabel(status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.expiryDate ? (
                          <div className="flex items-center space-x-1 text-sm">
                            <Calendar className="h-3 w-3" />
                            <span>{format(new Date(item.expiryDate), 'MMM dd, yyyy')}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/items/${item.id}/edit`} className="flex items-center">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No items found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedCategory !== 'all' || selectedInventory !== 'all' || selectedStatus !== 'all'
                  ? 'Try adjusting your search criteria.'
                  : 'Get started by adding your first item.'}
              </p>
              <Link to="/items/new">
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default ItemsPage;