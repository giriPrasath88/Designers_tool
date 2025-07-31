
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  teamSize: string;
  industry: string;
  message: string;
  useCase: string;
  timeline: string;
}

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactFormData, setContactFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    teamSize: '',
    industry: '',
    message: '',
    useCase: '',
    timeline: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Here you would normally send data to your backend
      console.log('Contact form submitted:', contactFormData);

      setSubmitStatus('success');

      // Reset form after successful submission
      setTimeout(() => {
        setContactFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          teamSize: '',
          industry: '',
          message: '',
          useCase: '',
          timeline: ''
        });
        setSubmitStatus('idle');
        setShowContactModal(false);
      }, 3000);

    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setContactFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      popular: false,
      description: 'Perfect for getting started with basic tag design',
      features: [
        'Up to 5 designs per month',
        'Basic templates library',
        'Standard export formats (PNG, JPG)',
        'Email support',
        'TagCraft watermark',
        '300 DPI resolution',
        'Basic shapes and text tools',
        'Community forum access'
      ],
      limitations: [
        'Limited template access',
        'Watermarked exports',
        'Basic support only'
      ],
      cta: 'Get Started Free',
      color: 'gray'
    },
    {
      id: 'pro',
      name: 'Professional',
      price: { monthly: 19, yearly: 190 },
      popular: true,
      description: 'Ideal for professionals and small businesses',
      features: [
        'Unlimited designs',
        'Access to all templates',
        'Premium export formats (PNG, JPG, SVG, PDF)',
        'Priority email support',
        'No watermarks',
        'Up to 600 DPI resolution',
        'Advanced design tools',
        'Custom fonts upload',
        'Batch export functionality',
        'Cloud storage (10GB)',
        'Advanced barcode/QR generation',
        'Print optimization tools'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      color: 'indigo'
    },
    {
      id: 'business',
      name: 'Business',
      price: { monthly: 49, yearly: 490 },
      popular: false,
      description: 'For teams and growing businesses with advanced needs',
      features: [
        'Everything in Professional',
        'Team collaboration tools',
        'Brand kit management',
        'Custom template creation',
        'API access',
        'Up to 1200 DPI resolution',
        'Advanced analytics',
        'Custom branding removal',
        'Priority phone support',
        'Cloud storage (100GB)',
        'White-label solutions',
        'Custom integrations',
        'Advanced security features',
        'Team member management (up to 10 users)'
      ],
      limitations: [],
      cta: 'Start Business Trial',
      color: 'purple'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: { monthly: 'Custom', yearly: 'Custom' },
      popular: false,
      description: 'Custom solutions for large organizations',
      features: [
        'Everything in Business',
        'Unlimited team members',
        'Custom development',
        'Dedicated account manager',
        'On-premise deployment options',
        'Custom SLA agreements',
        'Advanced security & compliance',
        'Custom training & onboarding',
        'Unlimited cloud storage',
        'Custom API endpoints',
        '24/7 phone support',
        'Custom integrations',
        'Advanced reporting & analytics',
        'Multi-brand management'
      ],
      limitations: [],
      cta: 'Contact Sales',
      color: 'emerald'
    }
  ];

  const addOns = [
    {
      name: 'Extra Storage',
      description: 'Additional cloud storage space',
      price: { monthly: 5, yearly: 50 },
      unit: '100GB'
    },
    {
      name: 'Premium Support',
      description: '24/7 phone and chat support',
      price: { monthly: 15, yearly: 150 },
      unit: 'per account'
    },
    {
      name: 'Custom Integrations',
      description: 'Connect with your existing tools',
      price: { monthly: 25, yearly: 250 },
      unit: 'per integration'
    },
    {
      name: 'Advanced Analytics',
      description: 'Detailed usage and performance metrics',
      price: { monthly: 10, yearly: 100 },
      unit: 'per account'
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and you\'ll be charged or credited on a prorated basis.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact our support team for a full refund.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise customers.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required to start your trial.'
    },
    {
      question: 'How does team collaboration work?',
      answer: 'Business and Enterprise plans include team features like shared workspaces, design libraries, commenting, and permission management.'
    },
    {
      question: 'Can I use my designs commercially?',
      answer: 'Yes, all plans include commercial usage rights. You own the designs you create and can use them for any commercial purpose.'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      gray: 'border-gray-200 bg-gray-50',
      indigo: 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200',
      purple: 'border-purple-200 bg-purple-50',
      emerald: 'border-emerald-200 bg-emerald-50'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const getButtonClasses = (color: string) => {
    const colors = {
      gray: 'bg-gray-600 hover:bg-gray-700',
      indigo: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700',
      purple: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
      emerald: 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <i className="ri-price-tag-3-fill text-white text-lg"></i>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                TagCraft Studio
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/designer" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                Design Tool
              </Link>
              <Link href="/templates" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                Templates
              </Link>
              <Link href="/showcase" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                Showcase
              </Link>
              <Link href="/pricing" className="text-emerald-600 font-medium">
                Pricing
              </Link>
              <Link
                href="/designer"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-2 rounded-full font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
              >
                Start Creating
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Choose the perfect plan for your needs. Start free and upgrade as you grow.
            All plans include our core design tools and templates.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-white p-1 rounded-full shadow-lg border border-gray-200">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                  billingPeriod === 'monthly'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                  billingPeriod === 'yearly'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-2xl ${getColorClasses(
                  plan.color
                )} ${plan.popular ? 'transform scale-105 shadow-xl' : 'hover:scale-105'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    {typeof plan.price[billingPeriod] === 'number' ? (
                      <>
                        <span className="text-4xl font-bold text-gray-900">
                          ${plan.price[billingPeriod]}
                        </span>
                        <span className="text-gray-600">
                          /{billingPeriod === 'monthly' ? 'month' : 'year'}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900">
                        {plan.price[billingPeriod]}
                      </span>
                    )}
                  </div>
                  {billingPeriod === 'yearly' && typeof plan.price.yearly === 'number' && plan.price.yearly > 0 && (
                    <div className="text-sm text-green-600 font-medium">
                      Save ${Number(plan.price.monthly) * 12 - Number(plan.price.yearly)}/year
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <i className="ri-check-line text-green-500 text-lg mt-0.5 flex-shrink-0"></i>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer ${getButtonClasses(
                    plan.color
                  )}`}
                  onClick={() => {
                    if (plan.cta === 'Contact Sales') {
                      setShowContactModal(true);
                    } else {
                      setSelectedPlan(plan.id);
                    }
                  }}
                >
                  {plan.cta}
                </button>

                {plan.id === 'free' && (
                  <div className="mt-4 text-center">
                    <Link href="/designer" className="text-sm text-gray-600 hover:text-gray-800 underline">
                      Start designing now
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Enhance Your Plan</h2>
            <p className="text-xl text-gray-600">Optional add-ons to supercharge your design workflow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{addon.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{addon.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ${addon.price[billingPeriod]}
                    </span>
                    <div className="text-xs text-gray-500">
                      /{billingPeriod === 'monthly' ? 'month' : 'year'}
                    </div>
                    <div className="text-xs text-gray-400">{addon.unit}</div>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm font-medium whitespace-nowrap cursor-pointer">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Compare Plans</h2>
            <p className="text-xl text-gray-600">See all features side by side</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-gray-800">Features</th>
                  <th className="px-6 py-4 text-center font-bold text-gray-800">Free</th>
                  <th className="px-6 py-4 text-center font-bold text-gray-800">Professional</th>
                  <th className="px-6 py-4 text-center font-bold text-gray-800">Business</th>
                  <th className="px-6 py-4 text-center font-bold text-gray-800">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { feature: 'Designs per month', values: ['5', 'Unlimited', 'Unlimited', 'Unlimited'] },
                  { feature: 'Templates access', values: ['Basic', 'All', 'All + Custom', 'All + Custom'] },
                  { feature: 'Export formats', values: ['PNG, JPG', 'PNG, JPG, SVG, PDF', 'All formats', 'All formats'] },
                  { feature: 'Resolution', values: ['300 DPI', '600 DPI', '1200 DPI', 'Unlimited'] },
                  { feature: 'Cloud storage', values: ['1GB', '10GB', '100GB', 'Unlimited'] },
                  { feature: 'Team members', values: ['1', '1', '10', 'Unlimited'] },
                  { feature: 'API access', values: ['❌', '❌', '✅', '✅'] },
                  { feature: 'White-label', values: ['❌', '❌', '✅', '✅'] },
                  { feature: 'Priority support', values: ['❌', '✅', '✅', '✅'] },
                  { feature: 'Phone support', values: ['❌', '❌', '✅', '✅'] }
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">{row.feature}</td>
                    {row.values.map((value, valueIndex) => (
                      <td key={valueIndex} className="px-6 py-4 text-center text-gray-600">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to common questions about our pricing</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Creating Amazing Tags?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of designers and businesses who trust TagCraft Studio.
            Start your free trial today - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/designer"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-emerald-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-2xl whitespace-nowrap cursor-pointer"
            >
              <i className="ri-rocket-line mr-2"></i>
              Start Free Trial
            </Link>
            <button
              onClick={() => setShowContactModal(true)}
              className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-phone-line mr-2"></i>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
                  <i className="ri-price-tag-3-fill text-white text-sm"></i>
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  TagCraft Studio
                </div>
              </div>
              <p className="text-gray-400">
                Professional tag design made simple and powerful.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <div>Design Tool</div>
                <div>Templates</div>
                <div>Printing</div>
                <div>API Access</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-gray-400">
                <div>Documentation</div>
                <div>Tutorials</div>
                <div>Support</div>
                <div>Community</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <div>About Us</div>
                <div>Careers</div>
                <div>Contact</div>
                <div>Privacy</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TagCraft Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Sales Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <i className="ri-customer-service-2-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Contact Our Sales Team</h2>
                    <p className="text-gray-600">Let's discuss your enterprise needs and create a custom solution</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowContactModal(false)}
                  disabled={submitStatus === 'submitting'}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl text-gray-600"></i>
                </button>
              </div>

              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-check-line text-3xl text-green-600"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Your enterprise inquiry has been submitted successfully. Our sales team will contact you within 24 hours to discuss your requirements.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
                    <div className="flex items-start text-xs text-gray-600">
                      <i className="ri-time-line mr-2"></i>
                      <span className="font-medium">What happens next?</span>
                    </div>
                    <ul className="text-sm text-blue-700 space-y-1 text-left">
                      <li>• A dedicated sales specialist will review your needs</li>
                      <li>• We'll prepare a customized proposal</li>
                      <li>• Schedule a demo tailored to your use case</li>
                      <li>• Discuss pricing and implementation timeline</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <form id="enterprise-contact-form" onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={contactFormData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={contactFormData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors"
                          placeholder="your.email@company.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          name="company"
                          required
                          value={contactFormData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors"
                          placeholder="Your company name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={contactFormData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Team Size *
                        </label>
                        <select
                          name="teamSize"
                          required
                          value={contactFormData.teamSize}
                          onChange={(e) => handleInputChange('teamSize', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors pr-8 cursor-pointer"
                        >
                          <option value="">Select team size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-1000">201-1000 employees</option>
                          <option value="1000+">1000+ employees</option>
                        </select>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Industry *
                        </label>
                        <select
                          name="industry"
                          required
                          value={contactFormData.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors pr-8 cursor-pointer"
                        >
                          <option value="">Select your industry</option>
                          <option value="retail">Retail & E-commerce</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="logistics">Logistics & Shipping</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="education">Education</option>
                          <option value="technology">Technology</option>
                          <option value="finance">Finance</option>
                          <option value="hospitality">Hospitality</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Primary Use Case *
                        </label>
                        <select
                          name="useCase"
                          required
                          value={contactFormData.useCase}
                          onChange={(e) => handleInputChange('useCase', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors pr-8 cursor-pointer"
                        >
                          <option value="">What will you use TagCraft for?</option>
                          <option value="product-labeling">Product Labeling</option>
                          <option value="asset-tracking">Asset Tracking</option>
                          <option value="inventory-management">Inventory Management</option>
                          <option value="shipping-logistics">Shipping & Logistics</option>
                          <option value="retail-pricing">Retail Pricing Tags</option>
                          <option value="event-badges">Event Badges</option>
                          <option value="custom-solution">Custom Solution</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Implementation Timeline *
                        </label>
                        <select
                          name="timeline"
                          required
                          value={contactFormData.timeline}
                          onChange={(e) => handleInputChange('timeline', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors pr-8 cursor-pointer"
                        >
                          <option value="">When do you need this?</option>
                          <option value="asap">ASAP (Within 30 days)</option>
                          <option value="quarter">This Quarter (1-3 months)</option>
                          <option value="6months">Within 6 months</option>
                          <option value="year">Within a year</option>
                          <option value="exploring">Just exploring options</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Additional Requirements
                        </label>
                        <textarea
                          name="message"
                          value={contactFormData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          rows={4}
                          maxLength={500}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors resize-none"
                          placeholder="Tell us about your specific needs, integration requirements, or any questions you have..."
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {contactFormData.message.length}/500 characters
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features Section */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl border border-blue-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <i className="ri-star-line text-emerald-600 mr-2"></i>
                      What&apos;s Included in Enterprise
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-700">
                          <i className="ri-check-line text-green-500 mr-2"></i>
                          Unlimited designs & team members
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <i className="ri-check-line text-green-500 mr-2"></i>
                          Custom API endpoints & integrations
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <i className="ri-check-line text-green-500 mr-2"></i>
                          On-premise deployment options
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <i className="ri-check-line text-green-500 mr-2"></i>
                          Advanced security & compliance
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-700">
                          <i className="ri-check-line text-green-500 mr-2"></i>
                          Dedicated account manager
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <i className="ri-check-line text-green-500 mr-2"></i>
                          Custom training & onboarding
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <i className="ri-check-line text-green-500 mr-2"></i>
                          24/7 priority support
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <i className="ri-check-line text-green-500 mr-2"></i>
                          Custom SLA agreements
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowContactModal(false)}
                      disabled={submitStatus === 'submitting'}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitStatus === 'submitting'}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg hover:from-emerald-700 hover:to-cyan-700 transition-all whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center"
                    >
                      {submitStatus === 'submitting' ? (
                        <>
                          <i className="ri-loader-line animate-spin mr-2"></i>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <i className="ri-send-plane-line mr-2"></i>
                          Send Enterprise Inquiry
                        </>
                      )}
                    </button>
                  </div>

                  {/* Privacy Notice */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start text-xs text-gray-600">
                      <i className="ri-shield-check-line text-green-500 mr-2 mt-0.5"></i>
                      <div>
                        <strong>Privacy Protected:</strong> Your information is secure and will only be used to contact you about TagCraft Studio enterprise solutions. We never share your data with third parties and you can unsubscribe at any time.
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
