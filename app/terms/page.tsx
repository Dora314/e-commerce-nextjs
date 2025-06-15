import { FileText, Scale, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function TermsPage() {
  const sections = [
    {
      icon: FileText,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using EliteStore, you accept and agree to be bound by these Terms of Service',
        'If you do not agree to these terms, you may not use our website or services',
        'We reserve the right to modify these terms at any time with notice',
        'Continued use of our services after changes constitutes acceptance of new terms'
      ]
    },
    {
      icon: Shield,
      title: 'User Accounts',
      content: [
        'You are responsible for maintaining the confidentiality of your account credentials',
        'You must provide accurate and complete information when creating an account',
        'You are responsible for all activities that occur under your account',
        'You must notify us immediately of any unauthorized use of your account',
        'We reserve the right to suspend or terminate accounts that violate these terms'
      ]
    },
    {
      icon: Scale,
      title: 'Orders and Payments',
      content: [
        'All orders are subject to acceptance and availability',
        'Prices are subject to change without notice until order confirmation',
        'Payment must be received before order processing and shipment',
        'We reserve the right to refuse or cancel any order at our discretion',
        'You agree to pay all charges incurred by your account including taxes and shipping'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Product Information',
      content: [
        'We strive to provide accurate product descriptions and images',
        'Colors and appearance may vary due to monitor settings and photography',
        'Product availability is subject to change without notice',
        'We reserve the right to correct any errors in product information or pricing',
        'All products are subject to manufacturer warranties where applicable'
      ]
    }
  ];

  const prohibitedUses = [
    'Violating any applicable laws or regulations',
    'Transmitting harmful, threatening, or offensive content',
    'Attempting to gain unauthorized access to our systems',
    'Using our services for fraudulent or illegal activities',
    'Interfering with the proper functioning of our website',
    'Collecting user information without consent',
    'Impersonating another person or entity',
    'Distributing spam or unsolicited communications'
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              Terms of Service
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Terms & Conditions
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Please read these terms carefully before using our website and services. 
              These terms govern your use of EliteStore and constitute a legal agreement between you and us.
            </p>
            <div className="mt-8 text-sm text-slate-400">
              Last updated: January 15, 2024
            </div>
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Key Points</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Here are the most important aspects of our terms of service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Fair Use</h3>
              <p className="text-slate-600">
                Use our services responsibly and in accordance with applicable laws
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Account Security</h3>
              <p className="text-slate-600">
                Keep your account credentials secure and report any unauthorized access
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Legal Compliance</h3>
              <p className="text-slate-600">
                All transactions and activities must comply with applicable laws
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <section.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                </div>
                
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prohibited Uses */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-red-100 p-3 rounded-full">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Prohibited Uses</h2>
              </div>
              
              <p className="text-slate-600 mb-6">
                You may not use our website or services for any of the following purposes:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prohibitedUses.map((use, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">{use}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intellectual Property */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Shield className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Intellectual Property</h2>
              </div>
              
              <div className="space-y-4 text-slate-600">
                <p>
                  All content on this website, including but not limited to text, graphics, logos, images, 
                  and software, is the property of EliteStore or its content suppliers and is protected by 
                  international copyright laws.
                </p>
                
                <p>
                  You may not reproduce, distribute, modify, or create derivative works of any content 
                  without our express written permission. The EliteStore name and logo are trademarks 
                  of EliteStore and may not be used without permission.
                </p>
                
                <p>
                  Product images and descriptions are provided by manufacturers and suppliers and may be 
                  subject to their own intellectual property rights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limitation of Liability */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-amber-100 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Limitation of Liability</h2>
              </div>
              
              <div className="space-y-4 text-slate-600">
                <p>
                  EliteStore shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages, including but not limited to loss of profits, data, or use, 
                  incurred by you or any third party.
                </p>
                
                <p>
                  Our total liability for any claim arising out of or relating to these terms or our 
                  services shall not exceed the amount paid by you for the specific product or service 
                  that gave rise to the claim.
                </p>
                
                <p>
                  We make no warranties or representations about the accuracy or completeness of the 
                  content on this website and assume no liability for any errors or omissions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governing Law */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Scale className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Governing Law & Disputes</h2>
              </div>
              
              <div className="space-y-4 text-slate-600">
                <p>
                  These terms shall be governed by and construed in accordance with the laws of the 
                  State of New York, without regard to its conflict of law provisions.
                </p>
                
                <p>
                  Any disputes arising out of or relating to these terms or our services shall be 
                  resolved through binding arbitration in accordance with the rules of the American 
                  Arbitration Association.
                </p>
                
                <p>
                  You agree to waive any right to a jury trial and to participate in class action 
                  lawsuits or class-wide arbitration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Questions About These Terms?</h2>
            <p className="text-xl text-white/90 mb-8">
              If you have any questions about these terms of service, please contact us. 
              We're here to help clarify any concerns you may have.
            </p>
            <div className="space-y-4">
              <div>
                <strong>Email:</strong> legal@elitestore.com
              </div>
              <div>
                <strong>Phone:</strong> +1 (555) 123-4567
              </div>
              <div>
                <strong>Address:</strong> 123 Commerce Street, New York, NY 10001
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}