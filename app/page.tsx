
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <i className="ri-price-tag-3-fill text-white text-lg"></i>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                TagCraft Studio
              </div>
            </div>
            
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
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-emerald-200 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-700 text-sm font-medium">Revolutionary Tag Design Platform</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Design Tags
              </span>
              <br />
              <span className="text-gray-800">Like a Pro</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Create stunning, professional tags and labels with our advanced web-based designer. 
              Featuring AI-powered templates, 3D effects, and one-click printing solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                href="/designer" 
                className="group bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-emerald-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl whitespace-nowrap cursor-pointer"
              >
                <i className="ri-magic-line mr-2 group-hover:animate-spin"></i>
                Start Designing Free
              </Link>
              <Link 
                href="#demo" 
                className="group flex items-center space-x-3 text-gray-700 hover:text-emerald-600 font-semibold text-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <i className="ri-play-fill text-emerald-600"></i>
                </div>
                <span>Watch Demo</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-2xl">
              <img 
                src="https://readdy.ai/api/search-image?query=Modern%20tag%20design%20software%20interface%20with%20multiple%20colorful%20tags%2C%20professional%20design%20tools%2C%20clean%20UI%20with%20drag%20and%20drop%20elements%2C%20bright%20workspace%20with%20templates%20and%20color%20palettes%2C%20high-tech%20design%20environment&width=1200&height=600&seq=preview&orientation=landscape"
                alt="TagCraft Studio Interface"
                className="w-full rounded-2xl shadow-lg object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Everything You Need to Create
              <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent"> Amazing Tags</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional-grade tools and features designed for creators, businesses, and printing professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="ri-drag-drop-line text-2xl text-emerald-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Drag & Drop Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Intuitive interface with real-time editing. Simply drag elements, adjust properties, and see changes instantly.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="ri-robot-line text-2xl text-cyan-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">AI-Powered Templates</h3>
              <p className="text-gray-600 leading-relaxed">
                Smart templates that adapt to your content. Our AI suggests optimal layouts and color schemes.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="ri-3d-view-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">3D Effects & Animation</h3>
              <p className="text-gray-600 leading-relaxed">
                Add depth and movement to your designs with advanced 3D effects and smooth animations.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="ri-qr-code-line text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Smart Barcodes & QR</h3>
              <p className="text-gray-600 leading-relaxed">
                Generate professional barcodes and QR codes with customizable styling and data validation.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="ri-printer-cloud-line text-2xl text-pink-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Cloud Printing</h3>
              <p className="text-gray-600 leading-relaxed">
                Send designs directly to your printer with optimized settings for professional results.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="ri-team-line text-2xl text-orange-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Team Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">
                Share designs, collaborate in real-time, and manage team templates with advanced permissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-500 to-cyan-500">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-emerald-100">Designs Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-emerald-100">Premium Templates</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-emerald-100">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-emerald-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Loved by Professionals</h2>
            <p className="text-xl text-gray-600">See what our users are saying about TagCraft Studio</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20businesswoman%20headshot%2C%20confident%20smile%2C%20corporate%20environment%2C%20modern%20office%20background%2C%20professional%20portrait%20photography&width=80&height=80&seq=user1&orientation=squarish"
                  alt="Sarah Johnson"
                  className="w-12 h-12 rounded-full mr-4 object-top"
                />
                <div>
                  <div className="font-semibold text-gray-800">Sarah Johnson</div>
                  <div className="text-gray-600 text-sm">Marketing Director</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "TagCraft Studio revolutionized our label design process. What used to take hours now takes minutes!"
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20businessman%20headshot%2C%20friendly%20expression%2C%20business%20suit%2C%20office%20environment%2C%20executive%20portrait%20photography&width=80&height=80&seq=user2&orientation=squarish"
                  alt="Mike Chen"
                  className="w-12 h-12 rounded-full mr-4 object-top"
                />
                <div>
                  <div className="font-semibold text-gray-800">Mike Chen</div>
                  <div className="text-gray-600 text-sm">Print Shop Owner</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The print quality optimization features have helped us deliver perfect results every time."
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <img 
                  src="https://readdy.ai/api/search-image?query=Creative%20professional%20woman%2C%20artistic%20background%2C%20design%20studio%20environment%2C%20modern%20workspace%2C%20creative%20industry%20professional%20portrait&width=80&height=80&seq=user3&orientation=squarish"
                  alt="Emma Rodriguez"
                  className="w-12 h-12 rounded-full mr-4 object-top"
                />
                <div>
                  <div className="font-semibold text-gray-800">Emma Rodriguez</div>
                  <div className="text-gray-600 text-sm">Freelance Designer</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The 3D effects and templates are incredible. My clients are always impressed with the results."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Create Something
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> Amazing?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who trust TagCraft Studio for their design needs. 
            Start creating beautiful tags today - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/designer" 
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-emerald-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-2xl whitespace-nowrap cursor-pointer"
            >
              <i className="ri-rocket-line mr-2"></i>
              Launch Designer
            </Link>
            <Link 
              href="/templates" 
              className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-gallery-line mr-2"></i>
              Browse Templates
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
