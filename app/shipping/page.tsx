import { Truck, Clock, Shield, Globe, Package, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ShippingPage() {
  const shippingOptions = [
    {
      name: 'Standard Shipping',
      price: 'FREE on orders $100+',
      time: '3-5 business days',
      description: 'Our most popular shipping option with reliable delivery',
      icon: Truck
    },
    {
      name: 'Express Shipping',
      price: '$9.99',
      time: '1-2 business days',
      description: 'Fast delivery for when you need it quickly',
      icon: Clock
    },
    {
      name: 'Overnight Shipping',
      price: '$19.99',
      time: 'Next business day',
      description: 'Get your order the very next business day',
      icon: Package
    },
    {
      name: 'International Shipping',
      price: 'Varies by location',
      time: '7-14 business days',
      description: 'We ship to over 25 countries worldwide',
      icon: Globe
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure Packaging',
      description: 'All items are carefully packaged to ensure safe delivery'
    },
    {
      icon: CheckCircle,
      title: 'Order Tracking',
      description: 'Track your package every step of the way with real-time updates'
    },
    {
      icon: Truck,
      title: 'Reliable Carriers',
      description: 'We partner with trusted shipping companies for dependable service'
    }
  ];

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Italy',
    'Spain', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden',
    'Norway', 'Denmark', 'Finland', 'Australia', 'New Zealand', 'Japan',
    'South Korea', 'Singapore', 'Hong Kong', 'Taiwan', 'Brazil', 'Mexico',
    'Argentina'
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              Shipping Information
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Fast & Reliable Shipping
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              We offer multiple shipping options to get your order to you quickly and safely. 
              Free shipping on orders over $100!
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Shipping Options</h2>
            <p className="text-xl text-slate-600">
              Choose the delivery speed that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shippingOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <option.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 text-center">{option.name}</h3>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">{option.price}</div>
                  <div className="text-slate-600">{option.time}</div>
                </div>
                <p className="text-slate-600 text-sm text-center">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Our Shipping?</h2>
            <p className="text-xl text-slate-600">
              We go the extra mile to ensure your order arrives safely and on time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600">
              From order to delivery in simple steps
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Place Order</h3>
                <p className="text-slate-600 text-sm">Complete your purchase and choose shipping method</p>
              </div>
              <div className="text-center">
                <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Processing</h3>
                <p className="text-slate-600 text-sm">We carefully package your items within 24 hours</p>
              </div>
              <div className="text-center">
                <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Shipped</h3>
                <p className="text-slate-600 text-sm">Your order is shipped with tracking information</p>
              </div>
              <div className="text-center">
                <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Delivered</h3>
                <p className="text-slate-600 text-sm">Receive your order at your doorstep</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Shipping */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">International Shipping</h2>
              <p className="text-xl text-slate-600">
                We ship to over 25 countries worldwide
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {countries.map((country, index) => (
                  <div key={index} className="text-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-700">{country}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <p className="text-slate-600 mb-4">
                  Don't see your country? Contact us to check if we can ship to your location.
                </p>
                <Button variant="outline">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Policy */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Shipping Policy</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Processing Time</h3>
                  <p className="text-slate-600">
                    Orders are typically processed within 1-2 business days. During peak seasons, 
                    processing may take up to 3 business days.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Shipping Costs</h3>
                  <p className="text-slate-600">
                    Shipping costs are calculated based on the weight and destination of your order. 
                    Free standard shipping is available on orders over $100.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Order Tracking</h3>
                  <p className="text-slate-600">
                    Once your order ships, you'll receive a tracking number via email. 
                    You can track your package on our website or the carrier's website.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Delivery Issues</h3>
                  <p className="text-slate-600">
                    If your package is lost or damaged during shipping, please contact us immediately. 
                    We'll work with the carrier to resolve the issue.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Address Changes</h3>
                  <p className="text-slate-600">
                    Address changes can only be made before your order ships. 
                    Contact us as soon as possible if you need to update your shipping address.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Customs & Duties</h3>
                  <p className="text-slate-600">
                    International customers are responsible for any customs duties or taxes 
                    imposed by their country. These fees are not included in our shipping costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}