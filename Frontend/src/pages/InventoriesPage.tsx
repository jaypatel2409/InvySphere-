import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, MapPin, Edit, Trash2, MoreHorizontal, Package } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface Inventory {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  status: 'active' | 'inactive' | 'maintenance';
  manager: string;
  itemCount: number;
  totalValue: number;
  lastUpdated: string;
}

const InventoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data
  const inventories: Inventory[] = [
    {
      id: '1',
      name: 'Central Warehouse',
      address: '123 Main St, City Center',
      latitude: 22.3039,
      longitude: 70.8022,
      category: 'Electronics',
      status: 'active',
      manager: 'John Doe',
      itemCount: 1245,
      totalValue: 89750,
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      name: 'North Storage Facility',
      address: '456 North Ave, Industrial Zone',
      latitude: 23.0225,
      longitude: 72.5714,
      category: 'Clothing',
      status: 'active',
      manager: 'Jane Smith',
      itemCount: 892,
      totalValue: 45320,
      lastUpdated: '5 hours ago'
    },
    {
      id: '3',
      name: 'South Distribution Center',
      address: '789 South Road, Port Area',
      latitude: 21.1702,
      longitude: 72.8311,
      category: 'Food & Beverage',
      status: 'maintenance',
      manager: 'Mike Johnson',
      itemCount: 654,
      totalValue: 32100,
      lastUpdated: '1 day ago'
    },
    {
      id: '4',
      name: 'East Campus Store',
      address: '321 East Street, Campus Area',
      latitude: 22.2587,
      longitude: 71.8235,
      category: 'Books & Stationery',
      status: 'inactive',
      manager: 'Sarah Wilson',
      itemCount: 423,
      totalValue: 18950,
      lastUpdated: '3 days ago'
    }
  ];

  const categories = ['Electronics', 'Clothing', 'Food & Beverage', 'Books & Stationery', 'Medical', 'Automotive'];

  const filteredInventories = inventories.filter(inventory => {
    const matchesSearch = inventory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inventory.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inventory.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || inventory.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || inventory.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'inactive': return 'bg-muted text-muted-foreground';
      case 'maintenance': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout title="Inventory Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Manage Your Inventories
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              View and manage all your warehouse locations and storage facilities.
            </p>
          </div>
          <Link to="/inventories/new">
            <Button className="bg-gradient-primary hover:opacity-90 mt-4 sm:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Add New Inventory
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search inventories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Inventories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInventories.map((inventory) => (
            <Card key={inventory.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{inventory.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {inventory.address}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/inventories/${inventory.id}/edit`} className="flex items-center">
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
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <Badge variant="outline">{inventory.category}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge className={getStatusColor(inventory.status)}>
                      {inventory.status.charAt(0).toUpperCase() + inventory.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Manager</span>
                    <span className="text-sm font-medium">{inventory.manager}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{inventory.itemCount}</p>
                      <p className="text-xs text-muted-foreground">Items</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">
                        ${inventory.totalValue.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Total Value</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                    Last updated: {inventory.lastUpdated}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInventories.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No inventories found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
                  ? 'Try adjusting your search criteria.'
                  : 'Get started by creating your first inventory.'}
              </p>
              <Link to="/inventories/new">
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Inventory
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default InventoriesPage;