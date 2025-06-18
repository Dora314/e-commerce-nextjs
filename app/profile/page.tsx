'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, Calendar, ShoppingBag, Heart, Settings, LogOut, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

export default function ProfilePage() {
  const { state: authState, logout, updateProfile } = useAuth();
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (!authState.isAuthenticated) {
      router.push('/login');
      return;
    }

    if (authState.user) {
      setFormData({
        name: authState.user.name,
        email: authState.user.email,
        phone: '+1 (555) 123-4567', // Mock data
        address: '123 Main St, New York, NY 10001' // Mock data
      });
    }
  }, [authState, router]);

  const handleSave = () => {
    if (authState.user) {
      updateProfile({
        name: formData.name,
        email: formData.email
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (authState.user) {
      setFormData({
        name: authState.user.name,
        email: authState.user.email,
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY 10001'
      });
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (authState.isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authState.user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center gap-6">
            <img
              src={authState.user.avatar || 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100'}
              alt={authState.user.name}
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{authState.user.name}</h1>
              <p className="text-white/90 mb-4">{authState.user.email}</p>
              <div className="flex items-center gap-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  {authState.user.role === 'admin' ? 'Administrator' : 'Customer'}
                </Badge>
                <span className="text-white/80 text-sm">Member since January 2024</span>
              </div>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="border-white/30 text-whit hover:bg-white hover:text-slate-900"
                >
                  <Edit className="h-4 we-4 mr-2 " />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white hover:text-slate-900"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white hover:text-slate-900"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Personal Information</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span>{formData.name}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>{formData.email}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{formData.phone}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      className="mt-1"
                      rows={3}
                    />
                  ) : (
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                        <span>{formData.address}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Recent Orders</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Order #ORD-001</p>
                    <p className="text-sm text-gray-600">January 20, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$299.99</p>
                    <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Order #ORD-002</p>
                    <p className="text-sm text-gray-600">January 15, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$149.99</p>
                    <Badge className="bg-blue-100 text-blue-800">Shipped</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Account Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Cart Items</span>
                  </div>
                  <span className="font-medium">{cartState.itemCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Wishlist</span>
                  </div>
                  <span className="font-medium">{wishlistState.itemCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Total Orders</span>
                  </div>
                  <span className="font-medium">12</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Settings className="h-4 w-4" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Order History
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Heart className="h-4 w-4" />
                  Wishlist
                </Button>
                <Separator />
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Admin Access */}
            {authState.user.role === 'admin' && (
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-2">Administrator Access</h3>
                <p className="text-white/90 text-sm mb-4">
                  You have admin privileges to manage the store.
                </p>
                <Button
                  onClick={() => router.push('/admin')}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white hover:text-purple-600"
                >
                  Go to Admin Panel
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}