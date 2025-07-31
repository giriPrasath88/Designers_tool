
'use client';

import { useState } from 'react';

interface OpenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDesign: (design: any) => void;
}

function OpenDialog({ isOpen, onClose, onOpenDesign }: OpenDialogProps) {
  const [savedDesigns, setSavedDesigns] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('tagDesigns') || '[]');
    }
    return [];
  });

  const [selectedDesign, setSelectedDesign] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date'>('date');

  const filteredDesigns = savedDesigns
    .filter((design: any) => 
      design.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (design.description && design.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a: any, b: any) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const handleDelete = (designId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedDesigns = savedDesigns.filter((d: any) => d.id !== designId);
    setSavedDesigns(updatedDesigns);
    localStorage.setItem('tagDesigns', JSON.stringify(updatedDesigns));
    if (selectedDesign?.id === designId) {
      setSelectedDesign(null);
    }
  };

  const handleDuplicate = (design: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const duplicatedDesign = {
      ...design,
      id: Date.now(),
      name: `${design.name} (Copy)`,
      createdAt: new Date().toISOString()
    };
    const updatedDesigns = [...savedDesigns, duplicatedDesign];
    setSavedDesigns(updatedDesigns);
    localStorage.setItem('tagDesigns', JSON.stringify(updatedDesigns));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
              <i className="ri-folder-open-line text-white text-xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Open Design</h3>
              <p className="text-sm text-gray-600">Choose from your saved designs</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl text-gray-600"></i>
          </button>
        </div>

        {/* Controls */}
        <div className="p-6 border-b bg-gray-50">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1 relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search designs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'date')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm pr-8 cursor-pointer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="date">Date Created</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Design List */}
          <div className="w-1/2 border-r overflow-y-auto">
            {filteredDesigns.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                {searchTerm ? (
                  <>
                    <i className="ri-search-line text-4xl mb-4"></i>
                    <div className="text-lg font-medium mb-2">No designs found</div>
                    <div className="text-sm">Try adjusting your search terms</div>
                  </>
                ) : (
                  <>
                    <i className="ri-folder-open-line text-4xl mb-4"></i>
                    <div className="text-lg font-medium mb-2">No saved designs</div>
                    <div className="text-sm">Start creating and save your first design</div>
                  </>
                )}
              </div>
            ) : (
              <div className="p-4 space-y-2">
                {filteredDesigns.map((design: any) => (
                  <div
                    key={design.id}
                    onClick={() => setSelectedDesign(design)}
                    className={`p-4 border rounded-lg hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer transition-all ${
                      selectedDesign?.id === design.id 
                        ? 'bg-indigo-50 border-indigo-300 shadow-md' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-800 truncate">{design.name}</h4>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <i className="ri-time-line"></i>
                            <span>{new Date(design.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        {design.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">{design.description}</p>
                        )}
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>{design.data?.elements?.length || 0} elements</span>
                          <span>{new Date(design.createdAt).toLocaleTimeString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-3">
                        <button
                          onClick={(e) => handleDuplicate(design, e)}
                          className="p-1 hover:bg-gray-200 rounded cursor-pointer"
                          title="Duplicate"
                        >
                          <i className="ri-file-copy-line text-gray-600"></i>
                        </button>
                        <button
                          onClick={(e) => handleDelete(design.id, e)}
                          className="p-1 hover:bg-red-100 rounded cursor-pointer"
                          title="Delete"
                        >
                          <i className="ri-delete-bin-line text-red-600"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="flex-1 flex flex-col">
            {selectedDesign ? (
              <div className="flex-1 flex flex-col">
                <div className="p-6 border-b">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{selectedDesign.name}</h4>
                  {selectedDesign.description && (
                    <p className="text-sm text-gray-600 mb-4">{selectedDesign.description}</p>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <i className="ri-calendar-line"></i>
                      <span>Created: {new Date(selectedDesign.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <i className="ri-stack-line"></i>
                      <span>{selectedDesign.data?.elements?.length || 0} elements</span>
                    </div>
                  </div>
                </div>

                {/* Preview Area */}
                <div className="flex-1 p-6 bg-gray-50">
                  <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg h-full flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <i className="ri-image-line text-4xl mb-2"></i>
                      <div className="text-lg font-medium mb-1">Design Preview</div>
                      <div className="text-sm">Preview will show design thumbnail</div>
                    </div>
                  </div>
                </div>

                {/* Design Info */}
                <div className="p-6 border-t bg-gray-50">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">File Size:</span>
                      <span className="ml-2 text-gray-600">
                        {(JSON.stringify(selectedDesign.data).length / 1024).toFixed(1)} KB
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Format:</span>
                      <span className="ml-2 text-gray-600">Tag Design</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Last Modified:</span>
                      <span className="ml-2 text-gray-600">
                        {new Date(selectedDesign.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Canvas Size:</span>
                      <span className="ml-2 text-gray-600">800 × 600 px</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <i className="ri-eye-line text-4xl mb-4"></i>
                  <div className="text-lg font-medium mb-2">Select a design to preview</div>
                  <div className="text-sm">Choose from the list to see design details</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            {filteredDesigns.length} design{filteredDesigns.length !== 1 ? 's' : ''} available
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedDesign) {
                  onOpenDesign(selectedDesign);
                  onClose();
                }
              }}
              disabled={!selectedDesign}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              <i className="ri-folder-open-line mr-2"></i>
              Open Design
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NewDesignDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateNew: (template: any) => void;
}

function NewDesignDialog({ isOpen, onClose, onCreateNew }: NewDesignDialogProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [canvasSize, setCanvasSize] = useState('standard');
  const [orientation, setOrientation] = useState('landscape');

  const templateOptions = [
    {
      id: 'blank',
      name: 'Blank Canvas',
      description: 'Start with a clean canvas',
      category: 'Basic',
      preview: 'https://readdy.ai/api/search-image?query=Clean%20white%20canvas%20template%20for%20design%20work%2C%20minimalist%20empty%20workspace%20with%20subtle%20grid%20lines%2C%20professional%20design%20interface%20background&width=120&height=80&seq=blank1&orientation=landscape',
      elements: []
    },
    {
      id: 'business-card',
      name: 'Business Card',
      description: 'Standard business card layout',
      category: 'Professional',
      preview: 'https://readdy.ai/api/search-image?query=Professional%20business%20card%20template%20with%20logo%20space%2C%20contact%20information%20layout%2C%20clean%20corporate%20design%2C%20blue%20and%20white%20color%20scheme&width=120&height=80&seq=business1&orientation=landscape',
      elements: [
        { type: 'text', text: 'Your Name', x: 50, y: 30, fontSize: 18, fontFamily: 'Arial', color: '#2563eb' },
        { type: 'text', text: 'Job Title', x: 50, y: 55, fontSize: 14, fontFamily: 'Arial', color: '#6b7280' },
        { type: 'text', text: 'company@email.com', x: 50, y: 85, fontSize: 12, fontFamily: 'Arial', color: '#6b7280' }
      ]
    },
    {
      id: 'product-tag',
      name: 'Product Tag',
      description: 'Retail product labeling',
      category: 'Retail',
      preview: 'https://readdy.ai/api/search-image?query=Professional%20retail%20product%20tag%20template%20with%20price%20area%2C%20barcode%20space%2C%20product%20information%20fields%2C%20clean%20commercial%20design%20layout&width=120&height=80&seq=product1&orientation=landscape',
      elements: [
        { type: 'rectangle', x: 20, y: 20, width: 160, height: 100, strokeColor: '#e5e7eb', fillColor: '#f9fafb' },
        { type: 'text', text: 'Product Name', x: 30, y: 35, fontSize: 16, fontFamily: 'Arial', color: '#1f2937' },
        { type: 'text', text: '$00.00', x: 30, y: 65, fontSize: 20, fontFamily: 'Arial', color: '#dc2626' },
        { type: 'barcode', x: 120, y: 80, width: 60, height: 25, text: '123456789' }
      ]
    },
    {
      id: 'name-badge',
      name: 'Name Badge',
      description: 'Conference or event badges',
      category: 'Events',
      preview: 'https://readdy.ai/api/search-image?query=Professional%20conference%20name%20badge%20template%20with%20photo%20area%2C%20name%20field%2C%20company%20information%2C%20modern%20event%20design%20with%20blue%20gradient&width=120&height=80&seq=badge1&orientation=landscape',
      elements: [
        { type: 'rectangle', x: 10, y: 10, width: 180, height: 120, strokeColor: '#3b82f6', fillColor: '#dbeafe' },
        { type: 'text', text: 'HELLO', x: 20, y: 25, fontSize: 12, fontFamily: 'Arial', color: '#1e40af' },
        { type: 'text', text: 'my name is', x: 20, y: 40, fontSize: 10, fontFamily: 'Arial', color: '#6b7280' },
        { type: 'text', text: 'Your Name', x: 20, y: 65, fontSize: 18, fontFamily: 'Arial', color: '#1f2937' }
      ]
    },
    {
      id: 'shipping-label',
      name: 'Shipping Label',
      description: 'Address and tracking labels',
      category: 'Logistics',
      preview: 'https://readdy.ai/api/search-image?query=Professional%20shipping%20label%20template%20with%20address%20fields%2C%20barcode%20area%2C%20postal%20service%20compatible%20design%2C%20clean%20logistics%20layout&width=120&height=80&seq=shipping1&orientation=landscape',
      elements: [
        { type: 'rectangle', x: 15, y: 15, width: 170, height: 110, strokeColor: '#374151', fillColor: '#ffffff' },
        { type: 'text', text: 'TO:', x: 25, y: 30, fontSize: 12, fontFamily: 'Arial', color: '#374151' },
        { type: 'text', text: 'Address Line 1', x: 25, y: 50, fontSize: 10, fontFamily: 'Arial', color: '#6b7280' },
        { type: 'text', text: 'City, State ZIP', x: 25, y: 65, fontSize: 10, fontFamily: 'Arial', color: '#6b7280' },
        { type: 'barcode', x: 120, y: 90, width: 60, height: 20, text: 'TRACK001' }
      ]
    },
    {
      id: 'price-tag',
      name: 'Price Tag',
      description: 'Sale and pricing tags',
      category: 'Sales',
      preview: 'https://readdy.ai/api/search-image?query=Eye-catching%20retail%20price%20tag%20template%20with%20bold%20pricing%20display%2C%20sale%20banner%20area%2C%20attention-grabbing%20red%20and%20white%20design&width=120&height=80&seq=price1&orientation=landscape',
      elements: [
        { type: 'circle', x: 100, y: 75, radius: 45, strokeColor: '#dc2626', fillColor: '#fef2f2' },
        { type: 'text', text: '$', x: 75, y: 65, fontSize: 16, fontFamily: 'Arial', color: '#dc2626' },
        { type: 'text', text: '99.99', x: 85, y: 65, fontSize: 20, fontFamily: 'Arial', color: '#dc2626' },
        { type: 'text', text: 'SALE', x: 80, y: 95, fontSize: 12, fontFamily: 'Arial', color: '#dc2626' }
      ]
    }
  ];

  const canvasSizes = [
    { id: 'standard', name: 'Standard (800×600)', width: 800, height: 600 },
    { id: 'business-card', name: 'Business Card (350×200)', width: 350, height: 200 },
    { id: 'label', name: 'Label (400×300)', width: 400, height: 300 },
    { id: 'badge', name: 'Badge (300×400)', width: 300, height: 400 },
    { id: 'large', name: 'Large (1200×800)', width: 1200, height: 800 }
  ];

  const handleCreateDesign = () => {
    const template = selectedTemplate || templateOptions[0];
    const size = canvasSizes.find(s => s.id === canvasSize) || canvasSizes[0];
    
    const newDesign = {
      template: template.id,
      name: `New ${template.name}`,
      elements: template.elements,
      canvasSize: {
        width: orientation === 'portrait' ? size.height : size.width,
        height: orientation === 'portrait' ? size.width : size.height
      },
      createdAt: new Date().toISOString()
    };

    onCreateNew(newDesign);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl h-full max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
              <i className="ri-file-add-line text-white text-xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Create New Design</h3>
              <p className="text-sm text-gray-600">Choose a template to get started</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl text-gray-600"></i>
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Template Gallery */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Choose a Template</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templateOptions.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`border-2 rounded-lg p-4 hover:border-indigo-300 cursor-pointer transition-all ${
                      selectedTemplate?.id === template.id 
                        ? 'border-indigo-500 bg-indigo-50 shadow-md' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <img 
                        src={template.preview} 
                        alt={template.name}
                        className="w-20 h-16 object-cover rounded border border-gray-200 object-top flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-800 truncate">{template.name}</h5>
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full flex-shrink-0">
                            {template.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{template.description}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <i className="ri-stack-line mr-1"></i>
                          <span>{template.elements.length} elements</span>
                        </div>
                      </div>
                    </div>
                    
                    {selectedTemplate?.id === template.id && (
                      <div className="mt-3 pt-3 border-t border-indigo-200">
                        <div className="flex items-center text-sm text-indigo-600">
                          <i className="ri-check-line mr-2"></i>
                          Selected Template
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="w-80 border-l bg-gray-50 p-6 overflow-y-auto">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Design Settings</h4>
            
            {/* Canvas Size */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-700 mb-3">Canvas Size</h5>
              <div className="space-y-2">
                {canvasSizes.map((size) => (
                  <label 
                    key={size.id}
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-white cursor-pointer transition-colors"
                  >
                    <input 
                      type="radio" 
                      name="canvasSize" 
                      value={size.id}
                      checked={canvasSize === size.id}
                      onChange={(e) => setCanvasSize(e.target.value)}
                      className="accent-indigo-600 mr-3" 
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{size.name}</div>
                      <div className="text-xs text-gray-500">{size.width} × {size.height} px</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Orientation */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-700 mb-3">Orientation</h5>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-white cursor-pointer transition-colors">
                  <input 
                    type="radio" 
                    name="orientation" 
                    value="landscape"
                    checked={orientation === 'landscape'}
                    onChange={(e) => setOrientation(e.target.value)}
                    className="sr-only" 
                  />
                  <div className={`text-center ${orientation === 'landscape' ? 'text-indigo-600' : 'text-gray-600'}`}>
                    <i className="ri-landscape-line text-2xl mb-2 block"></i>
                    <div className="text-sm font-medium">Landscape</div>
                  </div>
                </label>
                
                <label className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-white cursor-pointer transition-colors">
                  <input 
                    type="radio" 
                    name="orientation" 
                    value="portrait"
                    checked={orientation === 'portrait'}
                    onChange={(e) => setOrientation(e.target.value)}
                    className="sr-only" 
                  />
                  <div className={`text-center ${orientation === 'portrait' ? 'text-indigo-600' : 'text-gray-600'}`}>
                    <i className="ri-smartphone-line text-2xl mb-2 block"></i>
                    <div className="text-sm font-medium">Portrait</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Design Options */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-700 mb-3">Design Options</h5>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-indigo-600" />
                  <span className="text-sm text-gray-700">Show grid guidelines</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="accent-indigo-600" />
                  <span className="text-sm text-gray-700">Snap to grid</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-indigo-600" />
                  <span className="text-sm text-gray-700">Show rulers</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="accent-indigo-600" />
                  <span className="text-sm text-gray-700">High DPI mode</span>
                </label>
              </div>
            </div>

            {/* Template Preview */}
            {selectedTemplate && (
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-700 mb-3">Selected Template</h5>
                <div className="p-4 border border-gray-200 rounded-lg bg-white">
                  <img 
                    src={selectedTemplate.preview} 
                    alt={selectedTemplate.name}
                    className="w-full h-24 object-cover rounded mb-3 object-top"
                  />
                  <div className="text-sm font-medium text-gray-800 mb-1">{selectedTemplate.name}</div>
                  <div className="text-xs text-gray-600 mb-2">{selectedTemplate.description}</div>
                  <div className="text-xs text-gray-500">
                    {selectedTemplate.elements.length} pre-built elements
                  </div>
                </div>
              </div>
            )}

            {/* Quick Tips */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <div className="flex items-start space-x-2">
                <i className="ri-lightbulb-line text-blue-600 text-lg mt-0.5"></i>
                <div className="text-sm text-blue-800">
                  <div className="font-medium mb-2">Pro Tips:</div>
                  <ul className="space-y-1 text-xs">
                    <li>• Choose templates that match your use case</li>
                    <li>• Standard size works for most designs</li>
                    <li>• You can always resize later</li>
                    <li>• Templates are fully customizable</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            {selectedTemplate ? (
              <>Selected: {selectedTemplate.name} ({selectedTemplate.category})</>
            ) : (
              <>Choose a template to get started</>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateDesign}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl"
            >
              <i className="ri-file-add-line mr-2"></i>
              Create Design
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DesignToolbar() {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(16);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [gridVisible, setGridVisible] = useState(true);
  const [showOpenDialog, setShowOpenDialog] = useState(false);
  const [showNewDialog, setShowNewDialog] = useState(false);

  const colors = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080',
    '#ffc0cb', '#a52a2a', '#808080', '#008000', '#000080'
  ];

  const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64];

  const zoomLevels = [25, 50, 75, 100, 125, 150, 200, 300, 400];

  const handleOpenDesign = (design: any) => {
    console.log('Opening design:', design);
  };

  const handleCreateNew = (template: any) => {
    console.log('Creating new design with template:', template);
  };

  return (
    <>
      <div className="bg-white border-b shadow-sm">
        {/* Main Toolbar */}
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* File Operations */}
            <div className="flex items-center space-x-1 pr-4 border-r border-gray-200">
              <button 
                onClick={() => setShowNewDialog(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer group" 
                title="New Design"
              >
                <i className="ri-file-add-line text-lg text-gray-600 group-hover:text-indigo-600"></i>
              </button>
              <button 
                onClick={() => setShowOpenDialog(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer group" 
                title="Open"
              >
                <i className="ri-folder-open-line text-lg text-gray-600 group-hover:text-indigo-600"></i>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer group" title="Save">
                <i className="ri-save-line text-lg text-gray-600 group-hover:text-indigo-600"></i>
              </button>
            </div>

            {/* Edit Operations */}
            <div className="flex items-center space-x-1 pr-4 border-r border-gray-200">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer group" title="Undo">
                <i className="ri-arrow-go-back-line text-lg text-gray-600 group-hover:text-indigo-600"></i>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer group" title="Redo">
                <i className="ri-arrow-go-forward-line text-lg text-gray-600 group-hover:text-indigo-600"></i>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer group" title="Copy">
                <i className="ri-file-copy-line text-lg text-gray-600 group-hover:text-indigo-600"></i>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer group" title="Paste">
                <i className="ri-clipboard-line text-lg text-gray-600 group-hover:text-indigo-600"></i>
              </button>
            </div>

            {/* Color Palette */}
            <div className="flex items-center space-x-3 pr-4 border-r border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Color:</span>
                <div className="relative">
                  <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="w-8 h-8 rounded border-2 border-gray-300 cursor-pointer hover:border-indigo-400 transition-colors"
                    style={{ backgroundColor: selectedColor }}
                  />
                  {showColorPicker && (
                    <div className="absolute top-10 left-0 bg-white p-3 rounded-lg shadow-lg border z-10">
                      <div className="grid grid-cols-5 gap-1 mb-2">
                        {colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => {
                              setSelectedColor(color);
                              setShowColorPicker(false);
                            }}
                            className={`w-6 h-6 rounded cursor-pointer border hover:scale-110 transition-transform ${
                              selectedColor === color ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Font Controls */}
            <div className="flex items-center space-x-3 pr-4 border-r border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Font:</span>
                <select 
                  value={fontSize} 
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 rounded text-sm pr-7 cursor-pointer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  {fontSizes.map(size => (
                    <option key={size} value={size}>{size}px</option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-1">
                <button className="p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer" title="Bold">
                  <i className="ri-bold text-gray-600 hover:text-indigo-600"></i>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer" title="Italic">
                  <i className="ri-italic text-gray-600 hover:text-indigo-600"></i>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer" title="Underline">
                  <i className="ri-underline text-gray-600 hover:text-indigo-600"></i>
                </button>
              </div>
            </div>

            {/* Stroke Width */}
            <div className="flex items-center space-x-2 pr-4 border-r border-gray-200">
              <span className="text-sm font-medium text-gray-700">Stroke:</span>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                className="w-16 cursor-pointer accent-indigo-600"
              />
              <span className="text-sm text-gray-600 w-6 text-center">{strokeWidth}</span>
            </div>

            {/* Alignment Tools */}
            <div className="flex items-center space-x-1 pr-4 border-r border-gray-200">
              <button className="p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer group" title="Align Left">
                <i className="ri-align-left text-gray-600 group-hover:text-indigo-600"></i>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer group" title="Align Center">
                <i className="ri-align-center text-gray-600 group-hover:text-indigo-600"></i>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer group" title="Align Right">
                <i className="ri-align-right text-gray-600 group-hover:text-indigo-600"></i>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer group" title="Justify">
                <i className="ri-align-justify text-gray-600 group-hover:text-indigo-600"></i>
              </button>
            </div>

            {/* Layer Controls */}
            <div className="flex items-center space-x-1">
              <button className="p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer group" title="Bring to Front">
                <i className="ri-bring-to-front text-gray-600 group-hover:text-indigo-600"></i>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded transition-colors cursor-pointer group" title="Send to Back">
                <i className="ri-send-to-back text-gray-600 group-hover:text-indigo-600"></i>
              </button>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* View Controls */}
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Zoom:</span>
                <select 
                  value={zoom} 
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 rounded text-sm pr-7 cursor-pointer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  {zoomLevels.map(level => (
                    <option key={level} value={level}>{level}%</option>
                  ))}
                </select>
              </div>
              <button 
                onClick={() => setGridVisible(!gridVisible)}
                className={`p-2 rounded transition-colors cursor-pointer ${
                  gridVisible 
                    ? 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-indigo-600'
                }`}
                title="Toggle Grid"
              >
                <i className="ri-grid-line"></i>
              </button>
            </div>

            {/* Advanced Tools */}
            <div className="flex items-center space-x-2 pl-4 border-l border-gray-200">
              <button className="px-3 py-2 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow hover:shadow-md whitespace-nowrap cursor-pointer">
                <i className="ri-3d-view-line mr-1"></i>
                3D View
              </button>
              <button className="px-3 py-2 text-sm bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow hover:shadow-md whitespace-nowrap cursor-pointer">
                <i className="ri-eye-line mr-1"></i>
                Preview
              </button>
              <button className="px-3 py-2 text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow hover:shadow-md whitespace-nowrap cursor-pointer">
                <i className="ri-magic-line mr-1"></i>
                Effects
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Toolbar */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>Canvas: 800 × 600 px</span>
              <span>DPI: 300</span>
              <span>Print Size: 2.67" × 2"</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <i className="ri-ruler-line"></i>
                <span>Rulers</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <i className="ri-focus-line"></i>
                <span>Snap to Grid</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <i className="ri-guide-line"></i>
                <span>Guidelines</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="px-4 py-2 bg-white border-t border-gray-100">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
              <i className="ri-keyboard-line"></i>
              <span>Ctrl+Z: Undo</span>
            </div>
            <div className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
              <i className="ri-keyboard-line"></i>
              <span>Ctrl+D: Duplicate</span>
            </div>
            <div className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
              <i className="ri-keyboard-line"></i>
              <span>Del: Delete</span>
            </div>
            <div className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
              <i className="ri-keyboard-line"></i>
              <span>Ctrl+S: Save</span>
            </div>
          </div>
        </div>
      </div>

      {/* New Design Dialog */}
      <NewDesignDialog
        isOpen={showNewDialog}
        onClose={() => setShowNewDialog(false)}
        onCreateNew={handleCreateNew}
      />

      {/* Open Dialog */}
      <OpenDialog
        isOpen={showOpenDialog}
        onClose={() => setShowOpenDialog(false)}
        onOpenDesign={handleOpenDesign}
      />
    </>
  );
}
