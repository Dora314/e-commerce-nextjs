import { Shield, Eye, Lock, Users, FileText, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function PrivacyPage() {
  const sections = [
    {
      icon: FileText,
      title: 'Information We Collect',
      content: [
        'Personal information you provide (name, email, address, phone number)',
        'Payment information (processed securely through encrypted payment processors)',
        'Account information (username, password, preferences)',
        'Order history and purchase information',
        'Website usage data (pages visited, time spent, clicks)',
        'Device information (browser type, operating system, IP address)'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'Process and fulfill your orders',
        'Communicate with you about your orders and account',
        'Provide customer support and respond to inquiries',
        'Send marketing communications (with your consent)',
        'Improve our website and services',
        'Prevent fraud and ensure security',
        'Comply with legal obligations'
      ]
    },
    {
      icon: Users,
      title: 'Information Sharing',
      content: [
        'We do not sell, trade, or rent your personal information to third parties',
        'We may share information with trusted service providers who help us operate our business',
        'Payment processors for secure transaction processing',
        'Shipping companies for order fulfillment',
        'Marketing platforms for email communications (with your consent)',
        'Legal authorities when required by law or to protect our rights'
      ]
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'We use industry-standard encryption to protect your data',
        'Secure Socket Layer (SSL) technology for all transactions',
        'Regular security audits and updates',
        'Limited access to personal information on a need-to-know basis',
        'Secure data storage with reputable cloud providers',
        'Regular backups and disaster recovery procedures'
      ]
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              Privacy Policy
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Your Privacy Matters
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              We are committed to protecting your privacy and ensuring the security of your personal information. 
              This policy explains how we collect, use, and safeguard your data.
            </p>
            <div className="mt-8 text-sm text-slate-400">
              Last updated: January 15, 2024
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Privacy Principles</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              These core principles guide how we handle your personal information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Transparency</h3>
              <p className="text-slate-600">
                We clearly explain what information we collect and how we use it
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Security</h3>
              <p className="text-slate-600">
                Your data is protected with industry-leading security measures
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Control</h3>
              <p className="text-slate-600">
                You have control over your personal information and privacy settings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
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

      {/* Your Rights */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Rights</h2>
              <p className="text-xl text-slate-600">
                You have the following rights regarding your personal information
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-slate-900 mb-3">Access & Portability</h3>
                <p className="text-slate-600 text-sm">
                  You can request a copy of all personal information we have about you in a portable format.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-slate-900 mb-3">Correction</h3>
                <p className="text-slate-600 text-sm">
                  You can request that we correct any inaccurate or incomplete personal information.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-slate-900 mb-3">Deletion</h3>
                <p className="text-slate-600 text-sm">
                  You can request that we delete your personal information, subject to certain legal requirements.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-slate-900 mb-3">Opt-out</h3>
                <p className="text-slate-600 text-sm">
                  You can opt out of marketing communications at any time by clicking unsubscribe or contacting us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cookies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-amber-100 p-3 rounded-full">
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Cookies & Tracking</h2>
              </div>
              
              <div className="space-y-4 text-slate-600">
                <p>
                  We use cookies and similar tracking technologies to enhance your browsing experience, 
                  analyze website traffic, and personalize content. Cookies are small text files stored 
                  on your device that help us remember your preferences and improve our services.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Essential Cookies</h3>
                    <p className="text-sm">Required for the website to function properly, including shopping cart and checkout processes.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Analytics Cookies</h3>
                    <p className="text-sm">Help us understand how visitors interact with our website to improve user experience.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Marketing Cookies</h3>
                    <p className="text-sm">Used to deliver personalized advertisements and track the effectiveness of our marketing campaigns.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Preference Cookies</h3>
                    <p className="text-sm">Remember your settings and preferences to provide a more personalized experience.</p>
                  </div>
                </div>
                
                <p className="mt-4">
                  You can control cookie settings through your browser preferences. However, disabling certain 
                  cookies may affect the functionality of our website.
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
            <h2 className="text-3xl font-bold mb-6">Questions About Privacy?</h2>
            <p className="text-xl text-white/90 mb-8">
              If you have any questions about this privacy policy or how we handle your personal information, 
              please don't hesitate to contact us.
            </p>
            <div className="space-y-4">
              <div>
                <strong>Email:</strong> privacy@elitestore.com
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