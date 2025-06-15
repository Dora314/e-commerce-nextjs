'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      category: 'Orders & Payment',
      questions: [
        {
          question: 'How do I place an order?',
          answer: 'Simply browse our products, add items to your cart, and proceed to checkout. You\'ll need to provide shipping information and payment details to complete your order.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay for secure and convenient checkout.'
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'You can modify or cancel your order within 2 hours of placing it. After that, your order enters our fulfillment process and cannot be changed. Contact us immediately if you need to make changes.'
        },
        {
          question: 'Do you offer payment plans?',
          answer: 'Yes, we partner with Klarna and Afterpay to offer flexible payment options. You can split your purchase into 4 interest-free payments at checkout.'
        }
      ]
    },
    {
      category: 'Shipping & Delivery',
      questions: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 3-5 business days, express shipping takes 1-2 business days, and overnight shipping delivers the next business day. International shipping takes 7-14 business days.'
        },
        {
          question: 'Do you offer free shipping?',
          answer: 'Yes! We offer free standard shipping on all orders over $100. Orders under $100 have a flat shipping rate of $9.99.'
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order ships, you\'ll receive a tracking number via email. You can track your package on our website or directly on the carrier\'s website.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to over 25 countries worldwide. International shipping costs vary by destination and are calculated at checkout.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for all items in original condition with tags attached. Items must be returned within 30 days of delivery for a full refund.'
        },
        {
          question: 'How do I return an item?',
          answer: 'Contact our customer service team to initiate a return. We\'ll provide you with a prepaid return shipping label and instructions on how to package your item.'
        },
        {
          question: 'How long does it take to process a refund?',
          answer: 'Once we receive your returned item, we\'ll process your refund within 2-3 business days. It may take an additional 3-5 business days for the refund to appear in your account.'
        },
        {
          question: 'Can I exchange an item?',
          answer: 'Yes, we offer exchanges for different sizes, colors, or similar items. Contact our customer service team to arrange an exchange instead of a return.'
        }
      ]
    },
    {
      category: 'Products & Quality',
      questions: [
        {
          question: 'Are your products authentic?',
          answer: 'Absolutely! We only sell authentic products from authorized dealers and manufacturers. All items come with manufacturer warranties where applicable.'
        },
        {
          question: 'How do you ensure product quality?',
          answer: 'We have a rigorous quality control process. Every product is inspected before shipping, and we work only with trusted suppliers and manufacturers.'
        },
        {
          question: 'Do products come with warranties?',
          answer: 'Many of our products come with manufacturer warranties. Warranty information is listed on each product page. We also offer our own satisfaction guarantee.'
        },
        {
          question: 'Can I see more product photos?',
          answer: 'Each product page includes multiple high-resolution photos. If you need additional images or have specific questions about a product, contact our customer service team.'
        }
      ]
    },
    {
      category: 'Account & Support',
      questions: [
        {
          question: 'Do I need an account to place an order?',
          answer: 'No, you can checkout as a guest. However, creating an account allows you to track orders, save favorites, and enjoy faster checkout for future purchases.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'Click "Forgot Password" on the login page and enter your email address. We\'ll send you a link to reset your password securely.'
        },
        {
          question: 'How can I contact customer service?',
          answer: 'You can reach us via live chat, email at support@elitestore.com, or phone at +1 (555) 123-4567. Our support team is available Monday-Friday 9AM-6PM EST.'
        },
        {
          question: 'Do you have a mobile app?',
          answer: 'Currently, we don\'t have a mobile app, but our website is fully optimized for mobile devices. You can shop seamlessly on any device through your mobile browser.'
        }
      ]
    }
  ];

  // Filter FAQs based on search term
  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              Help Center
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              Find quick answers to common questions about shopping, shipping, returns, and more.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-100">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Live Chat</h3>
              <p className="text-slate-600 text-sm mb-4">Get instant help from our support team</p>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                Start Chat
              </Button>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-100">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Call Us</h3>
              <p className="text-slate-600 text-sm mb-4">Speak with our support team</p>
              <Button size="sm" variant="outline" className="border-blue-300 text-blue-700">
                +1 (555) 123-4567
              </Button>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-100">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Email Us</h3>
              <p className="text-slate-600 text-sm mb-4">Send us a detailed message</p>
              <Button size="sm" variant="outline" className="border-purple-300 text-purple-700">
                Send Email
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length > 0 ? (
              <div className="space-y-8">
                {filteredFAQs.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <HelpCircle className="h-6 w-6 text-emerald-600" />
                      {category.category}
                    </h2>
                    
                    <div className="space-y-4">
                      {category.questions.map((faq, faqIndex) => {
                        const globalIndex = categoryIndex * 100 + faqIndex;
                        const isOpen = openItems.includes(globalIndex);
                        
                        return (
                          <div key={faqIndex} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                            <button
                              onClick={() => toggleItem(globalIndex)}
                              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                              <h3 className="font-semibold text-slate-900 pr-4">{faq.question}</h3>
                              {isOpen ? (
                                <ChevronUp className="h-5 w-5 text-slate-500 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-slate-500 flex-shrink-0" />
                              )}
                            </button>
                            
                            {isOpen && (
                              <div className="px-6 pb-4">
                                <div className="border-t border-gray-100 pt-4">
                                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-slate-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">No results found</h3>
                <p className="text-slate-600 mb-6">
                  We couldn't find any FAQs matching your search. Try different keywords or browse all categories.
                </p>
                <Button onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
            <p className="text-xl text-white/90 mb-8">
              Can't find the answer you're looking for? Our customer support team is here to help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                Contact Support
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                Submit a Ticket
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}