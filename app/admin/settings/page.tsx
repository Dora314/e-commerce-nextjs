'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Store, 
  Mail, 
  Bell, 
  Shield, 
  CreditCard, 
  Truck,
  Save,
  Upload,
  Globe,
  Phone,
  MapPin,
  Clock,
  Key,
  Smartphone
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'EliteStore',
    storeDescription: 'Premium quality products with exceptional service',
    storeEmail: 'contact@elitestore.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '123 Commerce Street, New York, NY 10001',
    currency: 'USD',
    timezone: 'America/New_York',
    language: 'en'
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'noreply@elitestore.com',
    smtpPassword: '',
    fromEmail: 'noreply@elitestore.com',
    fromName: 'EliteStore'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderNotifications: true,
    lowStockAlerts: true,
    customerSignups: true,
    paymentAlerts: true,
    systemUpdates: false,
    marketingEmails: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginAttempts: '5',
    ipWhitelist: '',
    sslEnabled: true
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    paypalEnabled: true,
    applePayEnabled: false,
    googlePayEnabled: false,
    bankTransferEnabled: true,
    codEnabled: false
  });

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: '100',
    standardShippingRate: '9.99',
    expressShippingRate: '19.99',
    internationalShipping: true,
    packagingFee: '2.99',
    handlingFee: '1.99'
  });

  const handleSaveSettings = (section: string) => {
    console.log(`Saving ${section} settings`);
    // In a real app, this would make an API call
    alert(`${section} settings saved successfully!`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your store configuration and preferences</p>
        </div>
      </div>

      {/* Store Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Store Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                value={storeSettings.storeName}
                onChange={(e) => setStoreSettings(prev => ({ ...prev, storeName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeEmail">Store Email</Label>
              <Input
                id="storeEmail"
                type="email"
                value={storeSettings.storeEmail}
                onChange={(e) => setStoreSettings(prev => ({ ...prev, storeEmail: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="storeDescription">Store Description</Label>
            <Textarea
              id="storeDescription"
              value={storeSettings.storeDescription}
              onChange={(e) => setStoreSettings(prev => ({ ...prev, storeDescription: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="storePhone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="storePhone"
                  value={storeSettings.storePhone}
                  onChange={(e) => setStoreSettings(prev => ({ ...prev, storePhone: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <select
                id="currency"
                value={storeSettings.currency}
                onChange={(e) => setStoreSettings(prev => ({ ...prev, currency: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="storeAddress">Store Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
              <Textarea
                id="storeAddress"
                value={storeSettings.storeAddress}
                onChange={(e) => setStoreSettings(prev => ({ ...prev, storeAddress: e.target.value }))}
                className="pl-10"
                rows={2}
              />
            </div>
          </div>

          <Button onClick={() => handleSaveSettings('Store')} className="gap-2">
            <Save className="h-4 w-4" />
            Save Store Settings
          </Button>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input
                id="smtpHost"
                value={emailSettings.smtpHost}
                onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input
                id="smtpPort"
                value={emailSettings.smtpPort}
                onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="smtpUsername">SMTP Username</Label>
              <Input
                id="smtpUsername"
                value={emailSettings.smtpUsername}
                onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUsername: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPassword">SMTP Password</Label>
              <Input
                id="smtpPassword"
                type="password"
                value={emailSettings.smtpPassword}
                onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fromEmail">From Email</Label>
              <Input
                id="fromEmail"
                type="email"
                value={emailSettings.fromEmail}
                onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fromName">From Name</Label>
              <Input
                id="fromName"
                value={emailSettings.fromName}
                onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
              />
            </div>
          </div>

          <Button onClick={() => handleSaveSettings('Email')} className="gap-2">
            <Save className="h-4 w-4" />
            Save Email Settings
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {Object.entries(notificationSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <Label htmlFor={key} className="text-sm font-medium">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Label>
                  <p className="text-xs text-gray-500">
                    {key === 'orderNotifications' && 'Get notified when new orders are placed'}
                    {key === 'lowStockAlerts' && 'Alert when products are running low on stock'}
                    {key === 'customerSignups' && 'Notification for new customer registrations'}
                    {key === 'paymentAlerts' && 'Alerts for payment confirmations and failures'}
                    {key === 'systemUpdates' && 'System maintenance and update notifications'}
                    {key === 'marketingEmails' && 'Marketing and promotional email updates'}
                  </p>
                </div>
                <Switch
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) => 
                    setNotificationSettings(prev => ({ ...prev, [key]: checked }))
                  }
                />
              </div>
            ))}
          </div>

          <Button onClick={() => handleSaveSettings('Notifications')} className="gap-2">
            <Save className="h-4 w-4" />
            Save Notification Settings
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Two-Factor Authentication</Label>
              <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={(checked) => 
                  setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))
                }
              />
              {securitySettings.twoFactorAuth && (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Enabled
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loginAttempts">Max Login Attempts</Label>
              <Input
                id="loginAttempts"
                type="number"
                value={securitySettings.loginAttempts}
                onChange={(e) => setSecuritySettings(prev => ({ ...prev, loginAttempts: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ipWhitelist">IP Whitelist (comma separated)</Label>
            <Input
              id="ipWhitelist"
              value={securitySettings.ipWhitelist}
              onChange={(e) => setSecuritySettings(prev => ({ ...prev, ipWhitelist: e.target.value }))}
              placeholder="192.168.1.1, 10.0.0.1"
            />
          </div>

          <Button onClick={() => handleSaveSettings('Security')} className="gap-2">
            <Save className="h-4 w-4" />
            Save Security Settings
          </Button>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(paymentSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label className="text-sm font-medium">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('Enabled', '')}
                  </Label>
                  <p className="text-xs text-gray-500">
                    {key.includes('stripe') && 'Accept credit cards via Stripe'}
                    {key.includes('paypal') && 'Accept PayPal payments'}
                    {key.includes('apple') && 'Accept Apple Pay payments'}
                    {key.includes('google') && 'Accept Google Pay payments'}
                    {key.includes('bank') && 'Accept bank transfers'}
                    {key.includes('cod') && 'Cash on delivery option'}
                  </p>
                </div>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) => 
                    setPaymentSettings(prev => ({ ...prev, [key]: checked }))
                  }
                />
              </div>
            ))}
          </div>

          <Button onClick={() => handleSaveSettings('Payment')} className="gap-2">
            <Save className="h-4 w-4" />
            Save Payment Settings
          </Button>
        </CardContent>
      </Card>

      {/* Shipping Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Shipping Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
              <Input
                id="freeShippingThreshold"
                type="number"
                value={shippingSettings.freeShippingThreshold}
                onChange={(e) => setShippingSettings(prev => ({ ...prev, freeShippingThreshold: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="standardShippingRate">Standard Shipping Rate ($)</Label>
              <Input
                id="standardShippingRate"
                type="number"
                step="0.01"
                value={shippingSettings.standardShippingRate}
                onChange={(e) => setShippingSettings(prev => ({ ...prev, standardShippingRate: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="expressShippingRate">Express Shipping Rate ($)</Label>
              <Input
                id="expressShippingRate"
                type="number"
                step="0.01"
                value={shippingSettings.expressShippingRate}
                onChange={(e) => setShippingSettings(prev => ({ ...prev, expressShippingRate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="packagingFee">Packaging Fee ($)</Label>
              <Input
                id="packagingFee"
                type="number"
                step="0.01"
                value={shippingSettings.packagingFee}
                onChange={(e) => setShippingSettings(prev => ({ ...prev, packagingFee: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">International Shipping</Label>
              <p className="text-xs text-gray-500">Enable shipping to international destinations</p>
            </div>
            <Switch
              checked={shippingSettings.internationalShipping}
              onCheckedChange={(checked) => 
                setShippingSettings(prev => ({ ...prev, internationalShipping: checked }))
              }
            />
          </div>

          <Button onClick={() => handleSaveSettings('Shipping')} className="gap-2">
            <Save className="h-4 w-4" />
            Save Shipping Settings
          </Button>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Version:</span>
                <Badge variant="outline">v2.1.0</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Updated:</span>
                <span className="text-sm">January 15, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Database:</span>
                <Badge variant="default" className="bg-green-100 text-green-800">Connected</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Storage Used:</span>
                <span className="text-sm">2.4 GB / 10 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Backup Status:</span>
                <Badge variant="default" className="bg-blue-100 text-blue-800">Up to date</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">SSL Certificate:</span>
                <Badge variant="default" className="bg-green-100 text-green-800">Valid</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}