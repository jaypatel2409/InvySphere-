import React, { useState } from 'react';
import { format } from 'date-fns';
import { Bell, AlertTriangle, CheckCircle, Info, X, Check, Trash2 } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'react-toastify';

interface Notification {
  id: string;
  type: 'low_stock' | 'expiry' | 'user_action' | 'system' | 'warning' | 'success';
  title: string;
  message: string;
  isRead: boolean;
  timestamp: string;
  data?: any;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'low_stock',
      title: 'Low Stock Alert',
      message: 'Smartphone Case quantity is below threshold (8 remaining)',
      isRead: false,
      timestamp: '2024-01-15T10:30:00Z',
      data: { itemId: '2', itemName: 'Smartphone Case', quantity: 8, threshold: 15 }
    },
    {
      id: '2',
      type: 'expiry',
      title: 'Item Expiring Soon',
      message: 'Organic Apple Juice will expire in 5 days',
      isRead: false,
      timestamp: '2024-01-15T09:15:00Z',
      data: { itemId: '3', itemName: 'Organic Apple Juice', expiryDate: '2024-12-15' }
    },
    {
      id: '3',
      type: 'user_action',
      title: 'New User Registration',
      message: 'New user Sarah Wilson has registered as Admin',
      isRead: true,
      timestamp: '2024-01-15T08:45:00Z',
      data: { userId: '4', userName: 'Sarah Wilson', role: 'admin' }
    },
    {
      id: '4',
      type: 'system',
      title: 'Inventory Updated',
      message: 'Central Warehouse inventory has been updated successfully',
      isRead: true,
      timestamp: '2024-01-14T16:20:00Z',
      data: { inventoryId: '1', inventoryName: 'Central Warehouse' }
    },
    {
      id: '5',
      type: 'warning',
      title: 'Maintenance Required',
      message: 'South Distribution Center requires maintenance attention',
      isRead: false,
      timestamp: '2024-01-14T14:30:00Z',
      data: { inventoryId: '3', inventoryName: 'South Distribution Center' }
    },
    {
      id: '6',
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily backup process completed successfully',
      isRead: true,
      timestamp: '2024-01-14T02:00:00Z'
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'low_stock':
      case 'warning':
        return AlertTriangle;
      case 'expiry':
        return Bell;
      case 'success':
        return CheckCircle;
      case 'user_action':
      case 'system':
      default:
        return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'low_stock':
        return 'text-warning bg-warning/10';
      case 'expiry':
        return 'text-orange-500 bg-orange-500/10';
      case 'warning':
        return 'text-destructive bg-destructive/10';
      case 'success':
        return 'text-success bg-success/10';
      case 'user_action':
        return 'text-primary bg-primary/10';
      case 'system':
      default:
        return 'text-muted-foreground bg-muted/50';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'low_stock': return 'Low Stock';
      case 'expiry': return 'Expiry Alert';
      case 'user_action': return 'User Action';
      case 'system': return 'System';
      case 'warning': return 'Warning';
      case 'success': return 'Success';
      default: return 'Info';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.isRead;
    if (activeTab === 'alerts') return ['low_stock', 'expiry', 'warning'].includes(notification.type);
    return notification.type === activeTab;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    toast.success('Notification deleted');
  };

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(notification => !notification.isRead));
    toast.success('All read notifications deleted');
  };

  return (
    <Layout title="Notifications">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Notifications
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Stay updated with system alerts and important notifications.
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            )}
            <Button variant="outline" onClick={deleteAllRead}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Read
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-xl font-bold">{notifications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Unread</p>
                  <p className="text-xl font-bold">{unreadCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="text-sm text-muted-foreground">Alerts</p>
                  <p className="text-xl font-bold">
                    {notifications.filter(n => ['low_stock', 'expiry', 'warning'].includes(n.type)).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">Read</p>
                  <p className="text-xl font-bold">
                    {notifications.filter(n => n.isRead).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
            <CardDescription>
              View and manage your notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="px-6 pt-6">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">
                    Unread {unreadCount > 0 && <Badge className="ml-1 h-5 w-5 p-0 text-xs">{unreadCount}</Badge>}
                  </TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value={activeTab} className="mt-0">
                <div className="divide-y">
                  {filteredNotifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No notifications</h3>
                      <p className="text-muted-foreground">
                        {activeTab === 'unread' 
                          ? 'All caught up! No unread notifications.' 
                          : 'No notifications found for this filter.'}
                      </p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => {
                      const Icon = getNotificationIcon(notification.type);
                      const colorClass = getNotificationColor(notification.type);
                      
                      return (
                        <div
                          key={notification.id}
                          className={`p-4 hover:bg-muted/50 transition-colors ${!notification.isRead ? 'bg-muted/30' : ''}`}
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`p-2 rounded-lg ${colorClass} flex-shrink-0`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className={`font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                      {notification.title}
                                    </h4>
                                    <Badge variant="outline" className="text-xs">
                                      {getTypeLabel(notification.type)}
                                    </Badge>
                                    {!notification.isRead && (
                                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {format(new Date(notification.timestamp), 'MMM dd, yyyy - h:mm a')}
                                  </p>
                                </div>
                                
                                <div className="flex items-center space-x-1 ml-4">
                                  {!notification.isRead && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => markAsRead(notification.id)}
                                      className="h-8 w-8"
                                    >
                                      <Check className="h-3 w-3" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteNotification(notification.id)}
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NotificationsPage;