
'use client';

import { useState } from 'react';

export default function DesignSidebar() {
  const [activeTab, setActiveTab] = useState('elements');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const predefinedShapes = [
    { id: 1, name: 'Rectangle', icon: 'ri-rectangle-line', tool: 'rectangle' },
    { id: 2, name: 'Circle', icon: 'ri-circle-line', tool: 'circle' },
    { id: 3, name: 'Triangle', icon: 'ri-triangle-line', tool: 'triangle' },
    { id: 4, name: 'Star', icon: 'ri-star-line', tool: 'star' },
    { id: 5, name: 'Heart', icon: 'ri-heart-line', tool: 'heart' },
    { id: 6, name: 'Arrow', icon: 'ri-arrow-right-line', tool: 'arrow' }
  ];

  const templateTags = [
    { 
      id: 1, 
      name: 'Product Label', 
      category: 'Retail',
      preview: 'https://readdy.ai/api/search-image?query=Professional%20product%20label%20template%20with%20barcode%20area%2C%20clean%20minimalist%20design%2C%20white%20background%20with%20blue%20accents%2C%20perfect%20for%20retail%20products&width=120&height=80&seq=template1&orientation=landscape',
      description: 'Perfect for retail products'
    },
    { 
      id: 2, 
      name: 'Name Tag', 
      category: 'Corporate',
      preview: 'https://readdy.ai/api/search-image?query=Corporate%20name%20tag%20template%20with%20company%20logo%20space%2C%20professional%20business%20design%2C%20blue%20and%20white%20color%20scheme%2C%20clean%20typography&width=120&height=80&seq=template2&orientation=landscape',
      description: 'Professional name tags'
    },
    { 
      id: 3, 
      name: 'Price Tag', 
      category: 'Sales',
      preview: 'https://readdy.ai/api/search-image?query=Retail%20price%20tag%20template%20with%20dollar%20symbol%2C%20bold%20red%20typography%2C%20sale%20pricing%20design%2C%20attention-grabbing%20layout&width=120&height=80&seq=template3&orientation=landscape',
      description: 'Eye-catching price displays'
    },
    { 
      id: 4, 
      name: 'Shipping Label', 
      category: 'Logistics',
      preview: 'https://readdy.ai/api/search-image?query=Professional%20shipping%20label%20template%20with%20address%20fields%2C%20tracking%20barcode%20area%2C%20clean%20logistics%20design%2C%20black%20and%20white%20layout&width=120&height=80&seq=template4&orientation=landscape',
      description: 'Complete shipping solution'
    },
    { 
      id: 5, 
      name: 'Event Badge', 
      category: 'Events',
      preview: 'https://readdy.ai/api/search-image?query=Event%20conference%20badge%20template%20with%20photo%20area%2C%20colorful%20gradient%20design%2C%20modern%20event%20styling%2C%20professional%20networking%20layout&width=120&height=80&seq=template5&orientation=landscape',
      description: 'Conference and events'
    },
    { 
      id: 6, 
      name: 'Asset Tag', 
      category: 'Inventory',
      preview: 'https://readdy.ai/api/search-image?query=Asset%20inventory%20tag%20template%20with%20QR%20code%2C%20durable%20industrial%20design%2C%20grey%20and%20yellow%20colors%2C%20equipment%20tracking%20layout&width=120&height=80&seq=template6&orientation=landscape',
      description: 'Asset tracking and inventory'
    }
  ];

  const fontFamilies = [
    { name: 'Arial', category: 'Sans-serif' },
    { name: 'Helvetica', category: 'Sans-serif' },
    { name: 'Times New Roman', category: 'Serif' },
    { name: 'Georgia', category: 'Serif' },
    { name: 'Verdana', category: 'Sans-serif' },
    { name: 'Calibri', category: 'Sans-serif' },
    { name: 'Impact', category: 'Display' },
    { name: 'Comic Sans MS', category: 'Casual' },
    { name: 'Courier New', category: 'Monospace' },
    { name: 'Trebuchet MS', category: 'Sans-serif' }
  ];

  const colorPalettes = [
    { name: 'Professional', colors: ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'] },
    { name: 'Vibrant', colors: ['#dc2626', '#ea580c', '#d97706', '#65a30d', '#16a34a'] },
    { name: 'Elegant', colors: ['#374151', '#6b7280', '#9ca3af', '#d1d5db', '#f3f4f6'] },
    { name: 'Nature', colors: ['#166534', '#15803d', '#16a34a', '#22c55e', '#4ade80'] }
  ];

  const textEffects = [
    { name: 'Normal', value: 'normal' },
    { name: 'Bold', value: 'bold' },
    { name: 'Shadow', value: 'shadow' },
    { name: 'Outline', value: 'outline' },
    { name: '3D Effect', value: '3d' },
    { name: 'Gradient', value: 'gradient' }
  ];

  return (
    <div className="w-80 bg-white border-r flex flex-col shadow-lg">
      {/* Tab Navigation */}
      <div className="flex border-b bg-gray-50">
        {[
          { tab: 'elements', icon: 'ri-shape-line', label: 'Elements' },
          { tab: 'templates', icon: 'ri-file-copy-line', label: 'Templates' },
          { tab: 'properties', icon: 'ri-settings-line', label: 'Properties' }
        ].map(({ tab, icon, label }) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab 
                ? 'bg-white text-indigo-600 border-b-2 border-indigo-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <i className={`${icon} mr-2`}></i>
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'elements' && (
          <div className="p-4 space-y-6">
            {/* Basic Shapes */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <i className="ri-shape-line mr-2 text-indigo-600"></i>
                Basic Shapes
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {predefinedShapes.map((shape) => (
                  <button
                    key={shape.id}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all cursor-pointer group"
                  >
                    <i className={`${shape.icon} text-xl text-gray-600 group-hover:text-indigo-600 mb-2 block`}></i>
                    <span className="text-xs text-gray-600 group-hover:text-indigo-600 font-medium">{shape.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Elements */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <i className="ri-code-line mr-2 text-indigo-600"></i>
                Advanced Elements
              </h3>
              <div className="space-y-2">
                <button className="w-full p-3 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all text-left cursor-pointer group">
                  <div className="flex items-center">
                    <i className="ri-text mr-3 text-lg text-indigo-600"></i>
                    <div>
                      <div className="font-medium text-gray-800 group-hover:text-indigo-800">Rich Text</div>
                      <div className="text-xs text-gray-500">Formatted text with styling</div>
                    </div>
                  </div>
                </button>
                
                <button className="w-full p-3 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all text-left cursor-pointer group">
                  <div className="flex items-center">
                    <i className="ri-qr-code-line mr-3 text-lg text-indigo-600"></i>
                    <div>
                      <div className="font-medium text-gray-800 group-hover:text-indigo-800">QR Code</div>
                      <div className="text-xs text-gray-500">Generate QR codes</div>
                    </div>
                  </div>
                </button>
                
                <button className="w-full p-3 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all text-left cursor-pointer group">
                  <div className="flex items-center">
                    <i className="ri-barcode-line mr-3 text-lg text-indigo-600"></i>
                    <div>
                      <div className="font-medium text-gray-800 group-hover:text-indigo-800">Barcode</div>
                      <div className="text-xs text-gray-500">Various barcode formats</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Image Tools */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <i className="ri-image-line mr-2 text-indigo-600"></i>
                Images & Media
              </h3>
              <div className="space-y-2">
                <button className="w-full p-3 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all text-left cursor-pointer group">
                  <div className="flex items-center">
                    <i className="ri-upload-line mr-3 text-lg text-indigo-600"></i>
                    <div>
                      <div className="font-medium text-gray-800 group-hover:text-indigo-800">Upload Image</div>
                      <div className="text-xs text-gray-500">JPG, PNG, SVG supported</div>
                    </div>
                  </div>
                </button>
                
                <button className="w-full p-3 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-all text-left cursor-pointer group">
                  <div className="flex items-center">
                    <i className="ri-gallery-line mr-3 text-lg text-indigo-600"></i>
                    <div>
                      <div className="font-medium text-gray-800 group-hover:text-indigo-800">Stock Images</div>
                      <div className="text-xs text-gray-500">Professional image library</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Color Palettes */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <i className="ri-palette-line mr-2 text-indigo-600"></i>
                Color Palettes
              </h3>
              <div className="space-y-3">
                {colorPalettes.map((palette) => (
                  <div key={palette.name} className="p-2 border rounded-lg">
                    <div className="text-xs font-medium text-gray-700 mb-2">{palette.name}</div>
                    <div className="flex space-x-1">
                      {palette.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded cursor-pointer border border-gray-200 hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center">
                <i className="ri-file-copy-line mr-2 text-indigo-600"></i>
                Professional Templates
              </h3>
              <button className="text-xs text-indigo-600 hover:text-indigo-800 cursor-pointer">
                View All
              </button>
            </div>
            
            <div className="grid gap-3">
              {templateTags.map((template) => (
                <div 
                  key={template.id} 
                  className={`border rounded-lg p-3 hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer transition-all ${
                    selectedTemplate === template.id ? 'bg-indigo-50 border-indigo-300' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-start space-x-3">
                    <img 
                      src={template.preview} 
                      alt={template.name}
                      className="w-16 h-12 object-cover rounded border border-gray-200 object-top flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-gray-800 truncate">{template.name}</h4>
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {template.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{template.description}</p>
                      <div className="flex space-x-1">
                        <button className="text-xs px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors whitespace-nowrap cursor-pointer">
                          Use Template
                        </button>
                        <button className="text-xs px-2 py-1 border border-gray-300 text-gray-600 rounded hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t">
              <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all cursor-pointer group">
                <i className="ri-add-line text-2xl text-gray-400 group-hover:text-indigo-600 mb-2 block"></i>
                <span className="text-sm text-gray-600 group-hover:text-indigo-600 font-medium">Create Custom Template</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="p-4 space-y-6">
            {/* Text Properties */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <i className="ri-text mr-2 text-indigo-600"></i>
                Text Properties
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Font Family</label>
                  <select 
                    value={selectedFont} 
                    onChange={(e) => setSelectedFont(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm pr-8 cursor-pointer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    {fontFamilies.map((font) => (
                      <option key={font.name} value={font.name}>
                        {font.name} ({font.category})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">Font Size</label>
                    <input 
                      type="number" 
                      defaultValue={16} 
                      min="8"
                      max="72"
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">Line Height</label>
                    <input 
                      type="number" 
                      defaultValue={1.2} 
                      min="0.8"
                      max="3"
                      step="0.1"
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Text Effects</label>
                  <div className="grid grid-cols-3 gap-1">
                    <button className="py-2 px-3 border border-gray-300 rounded text-sm hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer transition-all">
                      <i className="ri-bold"></i>
                    </button>
                    <button className="py-2 px-3 border border-gray-300 rounded text-sm hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer transition-all">
                      <i className="ri-italic"></i>
                    </button>
                    <button className="py-2 px-3 border border-gray-300 rounded text-sm hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer transition-all">
                      <i className="ri-underline"></i>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Text Alignment</label>
                  <div className="flex space-x-1">
                    {[
                      { icon: 'ri-align-left', value: 'left' },
                      { icon: 'ri-align-center', value: 'center' },
                      { icon: 'ri-align-right', value: 'right' },
                      { icon: 'ri-align-justify', value: 'justify' }
                    ].map(({ icon, value }) => (
                      <button 
                        key={value}
                        className="flex-1 py-2 px-3 border border-gray-300 rounded text-sm hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer transition-all"
                      >
                        <i className={icon}></i>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Position & Transform */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <i className="ri-drag-move-line mr-2 text-indigo-600"></i>
                Position & Size
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'X', defaultValue: 0 },
                  { label: 'Y', defaultValue: 0 },
                  { label: 'Width', defaultValue: 100 },
                  { label: 'Height', defaultValue: 100 }
                ].map(({ label, defaultValue }) => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                    <input 
                      type="number" 
                      defaultValue={defaultValue} 
                      className="w-full p-2 border border-gray-300 rounded text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Effects */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <i className="ri-magic-line mr-2 text-indigo-600"></i>
                Advanced Effects
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Opacity</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    defaultValue={100}
                    className="w-full cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Rotation</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="360" 
                    defaultValue={0}
                    className="w-full cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0°</span>
                    <span>360°</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2 px-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded text-sm hover:from-indigo-700 hover:to-purple-700 transition-all whitespace-nowrap cursor-pointer">
                    <i className="ri-3d-view-line mr-1"></i>
                    3D Effect
                  </button>
                  <button className="py-2 px-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded text-sm hover:from-pink-600 hover:to-rose-600 transition-all whitespace-nowrap cursor-pointer">
                    <i className="ri-blur-line mr-1"></i>
                    Shadow
                  </button>
                </div>
              </div>
            </div>

            {/* Layer Management */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <i className="ri-stack-line mr-2 text-indigo-600"></i>
                Layer Management
              </h3>
              <div className="flex space-x-2">
                <button className="flex-1 py-2 px-3 border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer transition-all">
                  <i className="ri-bring-forward mr-1"></i>
                  Front
                </button>
                <button className="flex-1 py-2 px-3 border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer transition-all">
                  <i className="ri-send-backward mr-1"></i>
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
