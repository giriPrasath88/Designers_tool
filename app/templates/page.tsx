'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Templates', count: 48 },
    { id: 'business', name: 'Business', count: 12 },
    { id: 'retail', name: 'Retail', count: 15 },
    { id: 'events', name: 'Events', count: 8 },
    { id: 'shipping', name: 'Shipping', count: 7 },
    { id: 'inventory', name: 'Inventory', count: 6 }
  ];

  const templates = [
    {
      id: 1,
      name: 'Professional Business Card',
      category: 'business',
      price: 'Free',
      premium: false,
      downloads: 2847,
      rating: 4.9,
      preview: 'https://readdy.ai/api/search-image?query=Professional%20business%20card%20template%20with%20clean%20corporate%20design%2C%20logo%20space%2C%20contact%20information%20layout%2C%20modern%20minimalist%20style%2C%20blue%20and%20white%20color%20scheme&width=300&height=200&seq=template_bus1&orientation=landscape',
      description: 'Clean and professional business card template perfect for corporate use'
    },
    {
      id: 2,
      name: 'Retail Price Tag Collection',
      category: 'retail',
      price: '$4.99',
      premium: true,
      downloads: 1923,
      rating: 4.8,
      preview: 'https://readdy.ai/api/search-image?query=Colorful%20retail%20price%20tag%20templates%20set%2C%20sale%20tags%20with%20bold%20pricing%2C%20discount%20badges%2C%20shopping%20labels%2C%20red%20and%20yellow%20colors&width=300&height=200&seq=template_ret1&orientation=landscape',
      description: 'Complete collection of eye-catching retail price tags and sale labels'
    },
    {
      id: 3,
      name: 'Conference Badge Template',
      category: 'events',
      price: 'Free',
      premium: false,
      downloads: 1564,
      rating: 4.7,
      preview: 'https://readdy.ai/api/search-image?query=Professional%20conference%20name%20badge%20template%20with%20photo%20area%2C%20company%20logo%20space%2C%20modern%20event%20design%2C%20gradient%20colors%2C%20networking%20badge&width=300&height=200&seq=template_evt1&orientation=landscape',
      description: 'Perfect for conferences, seminars and networking events'
    },
    {
      id: 4,
      name: 'Shipping Label Pro',
      category: 'shipping',
      price: '$2.99',
      premium: true,
      downloads: 3421,
      rating: 4.9,
      preview: 'https://readdy.ai/api/search-image?query=Professional%20shipping%20label%20template%20with%20address%20fields%2C%20barcode%20area%2C%20tracking%20information%2C%20postal%20service%20compatible%20design%2C%20clean%20logistics%20layout&width=300&height=200&seq=template_ship1&orientation=landscape',
      description: 'Complete shipping solution with barcode and tracking support'
    },
    {
      id: 5,
      name: 'Product Label Starter',
      category: 'retail',
      price: 'Free',
      premium: false,
      downloads: 2156,
      rating: 4.6,
      preview: 'https://readdy.ai/api/search-image?query=Simple%20product%20label%20template%20with%20barcode%20space%2C%20product%20information%20fields%2C%20clean%20retail%20design%2C%20white%20background%20with%20colorful%20accents&width=300&height=200&seq=template_prod1&orientation=landscape',
      description: 'Basic product labeling template for small businesses'
    },
    {
      id: 6,
      name: 'Wedding Name Tags',
      category: 'events',
      price: '$3.99',
      premium: true,
      downloads: 876,
      rating: 4.8,
      preview: 'https://readdy.ai/api/search-image?query=Elegant%20wedding%20name%20tag%20templates%20with%20floral%20decorations%2C%20romantic%20design%2C%20soft%20pastel%20colors%2C%20bride%20and%20groom%20labels%2C%20celebration%20tags&width=300&height=200&seq=template_wed1&orientation=landscape',
      description: 'Beautiful wedding and celebration name tag collection'
    },
    {
      id: 7,
      name: 'Inventory Asset Tags',
      category: 'inventory',
      price: 'Free',
      premium: false,
      downloads: 1342,
      rating: 4.5,
      preview: 'https://readdy.ai/api/search-image?query=Industrial%20asset%20inventory%20tag%20template%20with%20QR%20code%2C%20equipment%20tracking%20design%2C%20durable%20layout%2C%20grey%20and%20yellow%20colors%2C%20warehouse%20management&width=300&height=200&seq=template_inv1&orientation=landscape',
      description: 'Track your assets and inventory with professional tags'
    },
    {
      id: 8,
      name: 'Premium Badge Collection',
      category: 'business',
      price: '$7.99',
      premium: true,
      downloads: 967,
      rating: 5.0,
      preview: 'https://readdy.ai/api/search-image?query=Premium%20corporate%20badge%20collection%20with%20multiple%20designs%2C%20executive%20badges%2C%20VIP%20passes%2C%20security%20tags%2C%20luxury%20business%20identifiers&width=300&height=200&seq=template_prem1&orientation=landscape',
      description: 'Luxury badge collection for executive and VIP use'
    },
    {
      id: 9,
      name: 'Food Label Templates',
      category: 'retail',
      price: '$5.99',
      premium: true,
      downloads: 2234,
      rating: 4.7,
      preview: 'https://readdy.ai/api/search-image?query=Food%20product%20label%20templates%20with%20nutrition%20facts%20space%2C%20ingredient%20lists%2C%20expiry%20date%20fields%2C%20FDA%20compliant%20design%2C%20food%20safety%20labels&width=300&height=200&seq=template_food1&orientation=landscape',
      description: 'FDA-compliant food labeling templates with nutrition facts'
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              <Link href="/templates" className="text-emerald-600 font-medium">
                Templates
              </Link>
              <Link href="/showcase" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                Showcase
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
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
      <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Professional Templates
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Browse our extensive collection of professionally designed tag templates. 
              From business cards to shipping labels, find the perfect design for every need.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-2xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Template Browser */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80 space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer ${
                        selectedCategory === category.id
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm opacity-75">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Options */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Filter</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Price</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="accent-emerald-600" />
                        <span className="text-sm text-gray-600">Free Templates</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="accent-emerald-600" />
                        <span className="text-sm text-gray-600">Premium Templates</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Rating</h4>
                    <div className="space-y-2">
                      {[5, 4, 3].map((rating) => (
                        <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                          <input type="checkbox" className="accent-emerald-600" />
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <i 
                                key={i}
                                className={`ri-star-${i < rating ? 'fill' : 'line'} text-yellow-400`}
                              ></i>
                            ))}
                            <span className="text-sm text-gray-600 ml-1">& up</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['business', 'modern', 'minimal', 'colorful', 'professional', 'creative', 'corporate', 'elegant'].map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-gray-100 hover:bg-emerald-100 hover:text-emerald-700 rounded-full text-sm text-gray-600 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Template Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="text-gray-600">
                  Showing {filteredTemplates.length} templates
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm pr-8 cursor-pointer focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                    <option>Most Popular</option>
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredTemplates.map((template) => (
                  <div key={template.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative">
                      <img 
                        src={template.preview} 
                        alt={template.name}
                        className="w-full h-48 object-cover object-top"
                      />
                      {template.premium && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full">
                          PREMIUM
                        </div>
                      )}
                      <div className="absolute top-3 right-3 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <i className="ri-star-fill text-yellow-400 text-sm"></i>
                        <span className="text-sm font-medium text-gray-700">{template.rating}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{template.name}</h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          template.premium 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {template.price}
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{template.description}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <i className="ri-download-line"></i>
                          <span>{template.downloads.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <i 
                                key={i}
                                className={`ri-star-${i < Math.floor(template.rating) ? 'fill' : 'line'} text-yellow-400 text-xs`}
                              ></i>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <button className="flex-1 px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-medium whitespace-nowrap cursor-pointer">
                          Preview
                        </button>
                        <Link 
                          href="/designer"
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg hover:from-emerald-700 hover:to-cyan-700 transition-all font-medium text-center whitespace-nowrap cursor-pointer"
                        >
                          Use Template
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-12">
                <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap cursor-pointer">
                  Load More Templates
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Create your own professional templates from scratch using our powerful design tools.
          </p>
          <Link 
            href="/designer" 
            className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-emerald-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-2xl whitespace-nowrap cursor-pointer"
          >
            <i className="ri-magic-line mr-2"></i>
            Start Designing
          </Link>
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
    </div>
  );
}