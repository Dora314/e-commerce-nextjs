'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, Calendar, ShoppingBag, Heart, Settings, LogOut, Edit, Save, X, PackageCheck, Clock, RefreshCw, Truck, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Skeleton } from '@/components/ui/skeleton';

// Define Order type based on Prisma schema
interface Order {
  id: string;
  createdAt: string;
  status: string;
  total: number;
  items: {
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      image: string;
    };
  }[];
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'PENDING':
      return { icon: <Clock className="h-4 w-4" />, color: 'bg-yellow-100 text-yellow-800' };
    case 'PROCESSING':
      return { icon: <RefreshCw className="h-4 w-4" />, color: 'bg-blue-100 text-blue-800' };
    case 'SHIPPED':
      return { icon: <Truck className="h-4 w-4" />, color: 'bg-indigo-100 text-indigo-800' };
    case 'DELIVERED':
      return { icon: <PackageCheck className="h-4 w-4" />, color: 'bg-green-100 text-green-800' };
    case 'CANCELLED':
      return { icon: <XCircle className="h-4 w-4" />, color: 'bg-red-100 text-red-800' };
    default:
      return { icon: <Clock className="h-4 w-4" />, color: 'bg-gray-100 text-gray-800' };
  }
};

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout, updateProfile, token } = useAuth();
  const { itemCount: cartItemCount } = useCart();
  const { itemCount: wishlistItemCount } = useWishlist();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: '', // Initialize as empty
        address: '' // Initialize as empty
      });

      const fetchOrders = async () => {
        setIsLoadingOrders(true);
        try {
          const res = await fetch('/api/orders', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            setOrders(data);
          } else {
            console.error("Failed to fetch orders");
            setOrders([]);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
          setOrders([]);
        } finally {
          setIsLoadingOrders(false);
        }
      };

      fetchOrders();
    }
  }, [user, isAuthenticated, isLoading, router, token]);

  const handleSave = () => {
    if (user) {
      updateProfile({
        name: formData.name,
        email: formData.email
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: '', // Initialize as empty
        address: '' // Initialize as empty
      });
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center gap-6">
            <img
              src={user.avatar || 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100'}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-white/90 mb-4">{user.email}</p>
              <div className="flex items-center gap-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  {user.role === 'ADMIN' ? 'Administrator' : 'Customer'}
                </Badge>
                <span className="text-white/80 text-sm">Member since January 2024</span>
              </div>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white hover:text-slate-900"
                >
                  <Edit className="h-4 w-4 mr-2 " />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg mb-4">Account Overview</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-emerald-500" />
                <span>{cartItemCount} items in cart</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span>{wishlistItemCount} items in wishlist</span>
              </div>
              <div className="flex items-center gap-2">
                <PackageCheck className="h-5 w-5 text-blue-500" />
                <span>{orders.length} completed orders</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
            {/* Profile Information */}
            <div className="space-y-6">
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
                          <span>{formData.phone || 'Not provided'}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    {isEditing ? (
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="mt-1"
                        placeholder="e.g. 123 Main St, New York, NY 10001"
                      />
                    ) : (
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                         <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{formData.address || 'Not provided'}</span>
                          </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-6">Order History</h2>
                {isLoadingOrders ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <Skeleton className="h-12 w-12 rounded-md" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                        <Skeleton className="h-8 w-24 rounded-md" />
                      </div>
                    ))}
                  </div>
                ) : orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const statusStyle = getStatusStyles(order.status);
                      return (
                        <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-slate-800">Order #{order.id.substring(0, 8)}</p>
                              <p className="text-sm text-slate-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <Badge className={`${statusStyle.color} gap-1.5`}>
                              {statusStyle.icon}
                              {order.status}
                            </Badge>
                          </div>
                          <Separator className="my-3" />
                          <div className="flex justify-between items-center">
                             <div className="flex -space-x-4">
                                {order.items.slice(0, 3).map(item => (
                                  <img 
                                    key={item.id}
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                                    title={item.product.name}
                                  />
                                ))}
                                {order.items.length > 3 && (
                                  <div className="h-10 w-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600">
                                    +{order.items.length - 3}
                                  </div>
                                )}
                            </div>
                          <p className="font-bold text-lg text-slate-900">{`$${order.total.toFixed(2)}`}</p>
                        </div>
                      </div>
                    );
                  })}
                  </div>
                ) : (
                  <div className="text-center py-10 border-2 border-dashed rounded-lg">
                    <ShoppingBag className="mx-auto h-12 w-12 text-slate-400" />
                    <h3 className="mt-2 text-lg font-medium text-slate-900">No orders yet</h3>
                    <p className="mt-1 text-sm text-slate-500">You haven't placed any orders yet. Start shopping!</p>
                    <Button onClick={() => router.push('/products')} className="mt-4 bg-emerald-600 hover:bg-emerald-700">Shop Now</Button>
                  </div>
                )}
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
                <span className="font-medium">{cartItemCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Wishlist</span>
                </div>
                <span className="font-medium">{wishlistItemCount}</span>
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
          {user.role === 'ADMIN' && (
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
  );
}