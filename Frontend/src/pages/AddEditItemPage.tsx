import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Upload, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'react-toastify';

interface ItemFormData {
  name: string;
  description: string;
  quantity: string;
  unit: string;
  price: string;
  category: string;
  expiryDate: string;
  inventory: string;
  lowStockTrigger: string;
  image: File | null;
}

const AddEditItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState<ItemFormData>({
    name: '',
    description: '',
    quantity: '',
    unit: 'pieces',
    price: '',
    category: '',
    expiryDate: '',
    inventory: '',
    lowStockTrigger: '',
    image: null
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categories = ['Electronics', 'Clothing', 'Food & Beverage', 'Medical', 'Books & Stationery', 'Automotive'];
  const units = ['pieces', 'kg', 'grams', 'liters', 'ml', 'boxes', 'bottles', 'packets'];
  const inventories = ['Central Warehouse', 'North Storage Facility', 'South Distribution Center', 'East Campus Store'];

  useEffect(() => {
    if (isEdit && id) {
      // Mock data for editing
      setFormData({
        name: 'Wireless Headphones',
        description: 'Bluetooth 5.0 wireless headphones with noise cancellation',
        quantity: '45',
        unit: 'pieces',
        price: '129.99',
        category: 'Electronics',
        expiryDate: '',
        inventory: 'Central Warehouse',
        lowStockTrigger: '10',
        image: null
      });
      setImagePreview('/placeholder.svg');
    }
  }, [isEdit, id]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }
    
    if (!formData.quantity.trim()) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(Number(formData.quantity)) || Number(formData.quantity) < 0) {
      newErrors.quantity = 'Quantity must be a valid positive number';
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      newErrors.price = 'Price must be a valid positive number';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.inventory) {
      newErrors.inventory = 'Inventory is required';
    }
    
    if (!formData.lowStockTrigger.trim()) {
      newErrors.lowStockTrigger = 'Low stock trigger is required';
    } else if (isNaN(Number(formData.lowStockTrigger)) || Number(formData.lowStockTrigger) < 0) {
      newErrors.lowStockTrigger = 'Low stock trigger must be a valid positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ItemFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Mock API call with image upload simulation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(isEdit ? 'Item updated successfully!' : 'Item created successfully!');
      navigate('/items');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title={isEdit ? 'Edit Item' : 'Add New Item'}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/items')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {isEdit ? 'Edit Item' : 'Add New Item'}
            </h2>
            <p className="text-muted-foreground">
              {isEdit ? 'Update item information' : 'Create a new item in your inventory'}
            </p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>
              Enter the details for your inventory item
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter item name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter item description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange('category', value)}
                    >
                      <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-destructive">{errors.category}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inventory">Inventory *</Label>
                    <Select
                      value={formData.inventory}
                      onValueChange={(value) => handleInputChange('inventory', value)}
                    >
                      <SelectTrigger className={errors.inventory ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select inventory" />
                      </SelectTrigger>
                      <SelectContent>
                        {inventories.map(inventory => (
                          <SelectItem key={inventory} value={inventory}>{inventory}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.inventory && (
                      <p className="text-sm text-destructive">{errors.inventory}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity and Pricing */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="0"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange('quantity', e.target.value)}
                      className={errors.quantity ? 'border-destructive' : ''}
                      min="0"
                    />
                    {errors.quantity && (
                      <p className="text-sm text-destructive">{errors.quantity}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select
                      value={formData.unit}
                      onValueChange={(value) => handleInputChange('unit', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map(unit => (
                          <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className={errors.price ? 'border-destructive' : ''}
                      min="0"
                      step="0.01"
                    />
                    {errors.price && (
                      <p className="text-sm text-destructive">{errors.price}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lowStockTrigger">Low Stock Trigger *</Label>
                    <Input
                      id="lowStockTrigger"
                      type="number"
                      placeholder="10"
                      value={formData.lowStockTrigger}
                      onChange={(e) => handleInputChange('lowStockTrigger', e.target.value)}
                      className={errors.lowStockTrigger ? 'border-destructive' : ''}
                      min="0"
                    />
                    {errors.lowStockTrigger && (
                      <p className="text-sm text-destructive">{errors.lowStockTrigger}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Alert when quantity falls below this number
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty if item doesn't expire
                    </p>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <Label>Item Image</Label>
                <div className="flex items-center space-x-4">
                  {imagePreview && (
                    <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload an image for this item (optional)
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/items')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-primary hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {isLoading ? 'Saving...' : isEdit ? 'Update Item' : 'Create Item'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddEditItemPage;