import { RotateCcw, Clock, CheckCircle, AlertCircle, Package, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ReturnsPage() {
  const returnSteps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Contact us within 30 days of delivery to start your return',
      icon: RotateCcw
    },
    {
      step: 2,
      title: 'Get Return Label',
      description: 'We\'ll email you a prepaid return shipping label',
      icon: Package
    },
    {
      step: 3,
      title: 'Ship Item Back',
      description: 'Package the item securely and ship it back to us',
      icon: Clock
    },
    {
      step: 4,
      title: 'Receive Refund',
      description: 'Get your refund within 5-7 business days after we receive the item',
      icon: CreditCard
    }
  ];

  const returnConditions = [
    {
      icon: CheckCircle,
      title: 'Eligible Items',
      items: [
        'Items in original condition with tags attached',
        'Unused products in original packaging',
        'Items returned within 30 days of delivery',
        'Products with original receipt or order number'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Non-Returnable Items',
      items: [
        'Personalized or customized products',
        'Items damaged by normal wear and tear',
        'Products without original packaging',
        'Items returned after 30-day window'
      ]
    }
  ];

  const refundMethods = [
    {
      method: 'Original Payment Method',
      time: '5-7 business days',
      description: 'Refund to the original credit card or payment method used'
    },
    {
      method: 'Store Credit',
      time: 'Instant',
      description: 'Receive store credit that never expires for future purchases'
    },
    {
      method: 'Exchange',
      time: '3-5 business days',
      description: 'Exchange for a different size, color, or similar item'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              Returns & Refunds
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Easy Returns Policy
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Not completely satisfied? No problem! We offer a hassle-free 30-day return policy 
              to ensure you're happy with your purchase.
            </p>
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How Returns Work</h2>
            <p className="text-xl text-slate-600">
              Simple steps to return your items
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {returnSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-10 w-10 text-emerald-600" />
                  </div>
                  <div className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Return Conditions */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Return Conditions</h2>
            <p className="text-xl text-slate-600">
              Please review these conditions before initiating a return
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {returnConditions.map((condition, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-full ${
                    condition.icon === CheckCircle ? 'bg-emerald-100' : 'bg-red-100'
                  }`}>
                    <condition.icon className={`h-6 w-6 ${
                      condition.icon === CheckCircle ? 'text-emerald-600' : 'text-red-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{condition.title}</h3>
                </div>
                <ul className="space-y-3">
                  {condition.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        condition.icon === CheckCircle ? 'bg-emerald-500' : 'bg-red-500'
                      }`} />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refund Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Refund Options</h2>
            <p className="text-xl text-slate-600">
              Choose how you'd like to receive your refund
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {refundMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{method.method}</h3>
                <div className="text-2xl font-bold text-emerald-600 mb-3">{method.time}</div>
                <p className="text-slate-600 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-slate-600">
                Common questions about returns and refunds
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-3">How long do I have to return an item?</h3>
                <p className="text-slate-600">
                  You have 30 days from the delivery date to initiate a return. Items must be in original condition with tags attached.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-3">Do I have to pay for return shipping?</h3>
                <p className="text-slate-600">
                  No, we provide a prepaid return shipping label for all eligible returns. Simply print the label and attach it to your package.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-3">How long does it take to process a refund?</h3>
                <p className="text-slate-600">
                  Once we receive your returned item, we'll process your refund within 2-3 business days. It may take an additional 3-5 business days for the refund to appear in your account.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-3">Can I exchange an item instead of returning it?</h3>
                <p className="text-slate-600">
                  Yes! We offer exchanges for different sizes, colors, or similar items. Contact our customer service team to arrange an exchange.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-3">What if my item was damaged during shipping?</h3>
                <p className="text-slate-600">
                  If your item arrives damaged, please contact us immediately with photos of the damage. We'll arrange for a replacement or full refund at no cost to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Need Help with a Return?</h2>
            <p className="text-xl text-white/90 mb-8">
              Our customer service team is here to help you with any questions about returns or refunds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                Contact Support
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                Start Return
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}