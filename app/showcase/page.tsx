'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ShowcasePage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'business', name: 'Business' },
    { id: 'retail', name: 'Retail' },
    { id: 'events', name: 'Events' },
    { id: 'creative', name: 'Creative' }
  ];

  const showcaseProjects = [
    {
      id: 1,
      title: 'Eco-Friendly Product Labels',
      category: 'retail',
      designer: 'GreenTech Solutions',
      description: 'Sustainable product labeling system for organic food company',
      image: 'https://readdy.ai/api/search-image?query=Eco-friendly%20organic%20product%20labels%20with%20green%20natural%20design%2C%20sustainable%20packaging%2C%20earth%20tone%20colors%2C%20clean%20organic%20branding%2C%20environmental%20consciousness&width=400&height=300&seq=showcase1&orientation=landscape',
      tags: ['Organic', 'Sustainable', 'Food'],
      likes: 342,
      views: 2847
    },
    {
      id: 2,
      title: 'Tech Conference Badge System',
      category: 'events',
      designer: 'EventPro Design',
      description: 'Complete badge and identification system for major tech conference',
      image: 'https://readdy.ai/api/search-image?query=Modern%20tech%20conference%20badges%20with%20futuristic%20design%2C%20QR%20codes%2C%20holographic%20elements%2C%20blue%20and%20purple%20gradient%2C%20digital%20technology%20theme&width=400&height=300&seq=showcase2&orientation=landscape',
      tags: ['Technology', 'Conference', 'Modern'],
      likes: 567,
      views: 4123
    },
    {
      id: 3,
      title: 'Luxury Brand Asset Tags',
      category: 'business',
      designer: 'Premium Assets Co.',
      description: 'High-end asset tracking for luxury retail chain',
      image: 'https://readdy.ai/api/search-image?query=Luxury%20asset%20tags%20with%20elegant%20gold%20and%20black%20design%2C%20premium%20branding%2C%20sophisticated%20typography%2C%20high-end%20retail%20inventory%20management&width=400&height=300&seq=showcase3&orientation=landscape',
      tags: ['Luxury', 'Assets', 'Premium'],
      likes: 234,
      views: 1876
    },
    {
      id: 4,
      title: 'Wedding Celebration Tags',
      category: 'events',
      designer: 'Romantic Designs',
      description: 'Beautiful wedding favor tags and place cards collection',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20wedding%20favor%20tags%20with%20floral%20decorations%2C%20romantic%20pastel%20colors%2C%20calligraphy%20fonts%2C%20bride%20and%20groom%20names%2C%20celebration%20design&width=400&height=300&seq=showcase4&orientation=landscape',
      tags: ['Wedding', 'Romantic', 'Elegant'],
      likes: 789,
      views: 5432
    },
    {
      id: 5,
      title: 'Industrial Equipment Labels',
      category: 'business',
      designer: 'Heavy Industries Ltd.',
      description: 'Durable labeling system for heavy machinery and equipment',
      image: 'https://readdy.ai/api/search-image?query=Industrial%20equipment%20labels%20with%20warning%20symbols%2C%20safety%20information%2C%20durable%20design%2C%20yellow%20and%20black%20colors%2C%20machinery%20identification&width=400&height=300&seq=showcase5&orientation=landscape',
      tags: ['Industrial', 'Safety', 'Equipment'],
      likes: 156,
      views: 987
    },
    {
      id: 6,
      title: 'Artisan Market Price Tags',
      category: 'retail',
      designer: 'Local Markets Collective',
      description: 'Handcrafted aesthetic for farmers market and artisan goods',
      image: 'https://readdy.ai/api/search-image?query=Handcrafted%20artisan%20market%20price%20tags%20with%20rustic%20design%2C%20kraft%20paper%20texture%2C%20hand-drawn%20elements%2C%20farmers%20market%20aesthetic%2C%20natural%20colors&width=400&height=300&seq=showcase6&orientation=landscape',
      tags: ['Handmade', 'Market', 'Rustic'],
      likes: 445,
      views: 2987
    },
    {
      id: 7,
      title: 'Digital Art Exhibition Tags',
      category: 'creative',
      designer: 'Modern Gallery',
      description: 'Contemporary art exhibition labeling with QR integration',
      image: 'https://readdy.ai/api/search-image?query=Modern%20art%20gallery%20exhibition%20labels%20with%20minimalist%20design%2C%20QR%20codes%2C%20contemporary%20typography%2C%20museum-quality%20presentation%2C%20black%20and%20white&width=400&height=300&seq=showcase7&orientation=landscape',
      tags: ['Art', 'Gallery', 'Contemporary'],
      likes: 298,
      views: 1654
    },
    {
      id: 8,
      title: 'Pharmaceutical Compliance Labels',
      category: 'business',
      designer: 'MedTech Solutions',
      description: 'FDA compliant labeling system for pharmaceutical products',
      image: 'https://readdy.ai/api/search-image?query=Professional%20pharmaceutical%20labels%20with%20medical%20symbols%2C%20FDA%20compliance%20design%2C%20clean%20clinical%20layout%2C%20prescription%20bottle%20labels%2C%20healthcare%20branding&width=400&height=300&seq=showcase8&orientation=landscape',
      tags: ['Medical', 'Compliance', 'Healthcare'],
      likes: 123,
      views: 876
    },
    {
      id: 9,
      title: 'Festival Merchandise Tags',
      category: 'creative',
      designer: 'Music Festival Corp',
      description: 'Vibrant merchandise labeling for summer music festival',
      image: 'https://readdy.ai/api/search-image?query=Colorful%20music%20festival%20merchandise%20tags%20with%20vibrant%20rainbow%20colors%2C%20concert%20branding%2C%20youth%20culture%20design%2C%20party%20atmosphere%2C%20neon%20colors&width=400&height=300&seq=showcase9&orientation=landscape',
      tags: ['Music', 'Festival', 'Colorful'],
      likes: 678,
      views: 3421
    }
  ];

  const filteredProjects = selectedFilter === 'all' 
    ? showcaseProjects 
    : showcaseProjects.filter(project => project.category === selectedFilter);

  const stats = [
    { label: 'Projects Showcased', value: '500+' },
    { label: 'Professional Designers', value: '150+' },
    { label: 'Industries Served', value: '25+' },
    { label: 'Countries Reached', value: '40+' }
  ];

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
              <Link href="/showcase" className="text-emerald-600 font-medium">
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
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Design Showcase
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover incredible tag designs created by our community of professional designers. 
              Get inspired by real-world projects and innovative solutions.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <i className="ri-heart-line"></i>
                            <span className="text-sm">{project.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <i className="ri-eye-line"></i>
                            <span className="text-sm">{project.views}</span>
                          </div>
                        </div>
                        <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors cursor-pointer">
                          <i className="ri-external-link-line text-white"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-700 rounded-full">
                    {project.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{project.title}</h3>
                  <div className="text-sm text-purple-600 font-medium mb-3">{project.designer}</div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <i className="ri-heart-fill text-red-400"></i>
                        <span>{project.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="ri-eye-line"></i>
                        <span>{project.views}</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all whitespace-nowrap cursor-pointer">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Designer Section */}
      <section className="py-20 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Designer</h2>
            <p className="text-xl text-gray-600">Meet this month's spotlight designer</p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20creative%20designer%20workspace%20with%20tag%20designs%2C%20modern%20office%20setup%2C%20design%20tools%2C%20computer%20screen%20showing%20tag%20templates%2C%20creative%20professional%20environment&width=500&height=400&seq=designer1&orientation=landscape"
                  alt="Featured Designer"
                  className="w-full h-64 md:h-full object-cover object-top"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="mb-4">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Professional%20female%20designer%20headshot%2C%20creative%20professional%20portrait%2C%20modern%20office%20background%2C%20confident%20smile%2C%20design%20industry%20professional&width=80&height=80&seq=designerface1&orientation=squarish"
                    alt="Sarah Chen"
                    className="w-16 h-16 rounded-full object-top"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Sarah Chen</h3>
                <p className="text-purple-600 font-medium mb-4">Senior Brand Designer</p>
                <p className="text-gray-600 mb-6">
                  "TagCraft Studio has revolutionized how I approach label design. The intuitive tools 
                  and extensive template library allow me to create professional designs in minutes, 
                  not hours. It's become an essential part of my design workflow."
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">47</div>
                    <div className="text-sm text-gray-600">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">12.5K</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">4.9</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
                
                <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium whitespace-nowrap cursor-pointer">
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submit Your Work Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Share Your Amazing Designs</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Created something incredible with TagCraft Studio? Submit your work to be featured 
            in our showcase and inspire other designers around the world.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer">
              <i className="ri-upload-line mr-2"></i>
              Submit Your Work
            </button>
            <Link 
              href="/designer" 
              className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-purple-50 transition-all whitespace-nowrap cursor-pointer"
            >
              <i className="ri-palette-line mr-2"></i>
              Start Creating
            </Link>
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
    </div>
  );
}