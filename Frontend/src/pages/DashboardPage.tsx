import React from 'react';
import { Package, AlertTriangle, TrendingUp, Users, MapPin, Calendar, DollarSign, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Items',
      value: '2,847',
      change: '+12%',
      icon: Package,
      color: 'text-inventory-blue'
    },
    {
      title: 'Low Stock Alerts',
      value: '23',
      change: '-8%',
      icon: AlertTriangle,
      color: 'text-warning'
    },
    {
      title: 'Total Value',
      value: '$147,892',
      change: '+15%',
      icon: DollarSign,
      color: 'text-success'
    },
    {
      title: 'Active Warehouses',
      value: '12',
      change: '+2',
      icon: MapPin,
      color: 'text-inventory-purple'
    }
  ];

  const recentItems = [
    { id: 1, name: 'Wireless Headphones', quantity: 45, status: 'In Stock', lastUpdated: '2 hours ago' },
    { id: 2, name: 'Smartphone Case', quantity: 8, status: 'Low Stock', lastUpdated: '4 hours ago' },
    { id: 3, name: 'USB Cable', quantity: 0, status: 'Out of Stock', lastUpdated: '1 day ago' },
    { id: 4, name: 'Bluetooth Speaker', quantity: 23, status: 'In Stock', lastUpdated: '1 day ago' },
    { id: 5, name: 'Power Bank', quantity: 156, status: 'In Stock', lastUpdated: '2 days ago' }
  ];

  const expiringItems = [
    { name: 'Battery Pack AA', expiryDate: '2024-12-15', daysLeft: 5 },
    { name: 'LED Light Bulbs', expiryDate: '2024-12-20', daysLeft: 10 },
    { name: 'Cleaning Solution', expiryDate: '2024-12-25', daysLeft: 15 },
    { name: 'First Aid Kit', expiryDate: '2025-01-01', daysLeft: 22 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-success text-success-foreground';
      case 'Low Stock': return 'bg-warning text-warning-foreground';
      case 'Out of Stock': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your inventory today.
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <span className={stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}>
                          {stat.change}
                        </span> from last month
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Items */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Items</CardTitle>
              <CardDescription>
                Latest updates to your inventory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </span>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.lastUpdated}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expiring Items */}
          <Card>
            <CardHeader>
              <CardTitle>Expiring Soon</CardTitle>
              <CardDescription>
                Items that will expire in the next 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expiringItems.map((item, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-foreground">{item.name}</p>
                      <Badge variant={item.daysLeft <= 7 ? 'destructive' : item.daysLeft <= 14 ? 'secondary' : 'outline'}>
                        {item.daysLeft} days
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Expires: {item.expiryDate}</span>
                    </div>
                    <div className="mt-2">
                      <Progress 
                        value={Math.max(0, 100 - (item.daysLeft / 30 * 100))} 
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        {(user?.role === 'admin' || user?.role === 'super_admin') && (
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center hover:bg-muted cursor-pointer transition-colors">
                  <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Add Item</p>
                </div>
                <div className="p-4 border rounded-lg text-center hover:bg-muted cursor-pointer transition-colors">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">New Warehouse</p>
                </div>
                <div className="p-4 border rounded-lg text-center hover:bg-muted cursor-pointer transition-colors">
                  <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Manage Users</p>
                </div>
                <div className="p-4 border rounded-lg text-center hover:bg-muted cursor-pointer transition-colors">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">View Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;