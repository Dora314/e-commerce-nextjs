'use client';

import { useState } from 'react';
import { Customer } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Upload } from 'lucide-react';

interface CustomerFormProps {
  customer?: Customer;
  onClose: () => void;
}

export default function CustomerForm({ customer, onClose }: CustomerFormProps) {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    address: customer?.address || '',
    status: customer?.status || 'new',
    avatar: customer?.avatar || 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const customerData = {
      ...formData,
      id: customer?.id || `CUST-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      joinDate: customer?.joinDate || new Date().toISOString().split('T')[0],
      totalOrders: customer?.totalOrders || 0,
      totalSpent: customer?.totalSpent || 0,
      lastOrder: customer?.lastOrder || new Date().toISOString().split('T')[0]
    };

    // In a real app, this would make an API call
    console.log('Saving customer:', customerData);
    alert(customer ? 'Customer updated successfully!' : 'Customer created successfully!');
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      vip: 'bg-purple-100 text-purple-800',
      new: 'bg-blue-100 text-blue-800'
    };

    return (
      <Badge className={statusConfig[status as keyof typeof statusConfig]}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Basic Information</h3>
          
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <Label htmlFor="status">Customer Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New Customer</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="vip">VIP Customer</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-2">
              {getStatusBadge(formData.status)}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Contact Information</h3>
          
          <div>
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              rows={3}
              placeholder="Street address, city, state, zip code"
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div>
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input
              id="avatar"
              value={formData.avatar}
              onChange={(e) => handleInputChange('avatar', e.target.value)}
              placeholder="https://example.com/avatar.jpg"
            />
            <div className="mt-2 flex items-center gap-3">
              <img
                src={formData.avatar}
                alt="Avatar preview"
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100';
                }}
              />
              <Button type="button" variant="outline" size="sm" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Image
              </Button>
            </div>
          </div>

          {customer && (
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-2">Customer Statistics</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Orders:</span>
                  <span className="font-medium">{customer.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Spent:</span>
                  <span className="font-medium">${customer.totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Join Date:</span>
                  <span className="font-medium">{new Date(customer.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Last Order:</span>
                  <span className="font-medium">{new Date(customer.lastOrder).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white">
          {customer ? 'Update Customer' : 'Create Customer'}
        </Button>
      </div>
    </form>
  );
}