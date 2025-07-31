'use client';

import { useRef } from 'react';

interface PrintPreviewProps {
  onClose: () => void;
  designData?: any;
}

export default function PrintPreview({ onClose, designData }: PrintPreviewProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    // PDF export functionality will be implemented here
    console.log('Exporting to PDF...');
  };

  const printFormats = [
    { id: 'a4', name: 'A4 (210 × 297 mm)', width: 210, height: 297 },
    { id: 'letter', name: 'Letter (8.5 × 11 in)', width: 216, height: 279 },
    { id: 'custom', name: 'Custom Size', width: 100, height: 150 },
    { id: 'label', name: 'Label Sheet', width: 105, height: 148 }
  ];

  const paperTypes = [
    { id: 'standard', name: 'Standard Paper', gsm: 80 },
    { id: 'cardstock', name: 'Card Stock', gsm: 200 },
    { id: 'photo', name: 'Photo Paper', gsm: 260 },
    { id: 'vinyl', name: 'Vinyl Sticker', gsm: 140 }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Print Preview & Settings</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl text-gray-600"></i>
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Settings Sidebar */}
          <div className="w-80 border-r bg-gray-50 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Print Format */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Print Format</h3>
                <div className="space-y-2">
                  {printFormats.map((format) => (
                    <label key={format.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-white cursor-pointer transition-colors">
                      <input type="radio" name="format" defaultChecked={format.id === 'label'} className="accent-indigo-600" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{format.name}</div>
                        <div className="text-xs text-gray-500">{format.width} × {format.height} mm</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Paper Type */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Paper Type</h3>
                <div className="space-y-2">
                  {paperTypes.map((paper) => (
                    <label key={paper.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-white cursor-pointer transition-colors">
                      <input type="radio" name="paper" defaultChecked={paper.id === 'cardstock'} className="accent-indigo-600" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{paper.name}</div>
                        <div className="text-xs text-gray-500">{paper.gsm} GSM</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Print Quality */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Print Quality</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-white cursor-pointer transition-colors">
                    <input type="radio" name="quality" className="accent-indigo-600" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">Draft (150 DPI)</div>
                      <div className="text-xs text-gray-500">Fast printing</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-white cursor-pointer transition-colors">
                    <input type="radio" name="quality" defaultChecked className="accent-indigo-600" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">Standard (300 DPI)</div>
                      <div className="text-xs text-gray-500">Good quality</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-white cursor-pointer transition-colors">
                    <input type="radio" name="quality" className="accent-indigo-600" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">High (600 DPI)</div>
                      <div className="text-xs text-gray-500">Professional quality</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Print Options */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Print Options</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-indigo-600" />
                    <span className="text-sm text-gray-700">Print crop marks</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" className="accent-indigo-600" />
                    <span className="text-sm text-gray-700">Print bleed area</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-indigo-600" />
                    <span className="text-sm text-gray-700">Center on page</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" className="accent-indigo-600" />
                    <span className="text-sm text-gray-700">Scale to fit</span>
                  </label>
                </div>
              </div>

              {/* Print Quantity */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button className="p-2 border rounded-lg hover:bg-white cursor-pointer">
                    <i className="ri-subtract-line"></i>
                  </button>
                  <input 
                    type="number" 
                    defaultValue={1} 
                    min="1" 
                    max="999"
                    className="flex-1 p-2 border rounded-lg text-center focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  <button className="p-2 border rounded-lg hover:bg-white cursor-pointer">
                    <i className="ri-add-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex-1 flex flex-col">
            {/* Preview Toolbar */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Zoom:</span>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-white rounded cursor-pointer">
                    <i className="ri-zoom-out-line"></i>
                  </button>
                  <span className="text-sm font-medium px-2">100%</span>
                  <button className="p-1 hover:bg-white rounded cursor-pointer">
                    <i className="ri-zoom-in-line"></i>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm border rounded hover:bg-white cursor-pointer whitespace-nowrap">
                  <i className="ri-printer-line mr-1"></i>
                  Test Print
                </button>
                <button 
                  onClick={handleExportPDF}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-file-pdf-line mr-1"></i>
                  Export PDF
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 p-8 bg-gray-100 overflow-auto">
              <div className="max-w-2xl mx-auto">
                {/* Paper Preview */}
                <div 
                  ref={printRef}
                  className="bg-white shadow-lg mx-auto"
                  style={{ 
                    width: '210mm',
                    height: '297mm',
                    transform: 'scale(0.6)',
                    transformOrigin: 'top center'
                  }}
                >
                  {/* Page Content */}
                  <div className="p-8 h-full flex items-center justify-center">
                    {/* Tag Preview Grid */}
                    <div className="grid grid-cols-2 gap-6">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <div key={item} className="relative">
                          {/* Crop Marks */}
                          <div className="absolute -inset-2">
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-400"></div>
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-400"></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-400"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-400"></div>
                          </div>
                          
                          {/* Tag Design */}
                          <div className="w-24 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded border shadow-sm flex items-center justify-center">
                            <div className="text-white text-xs font-semibold text-center">
                              <div>Sample Tag</div>
                              <div className="text-xs opacity-75">#{item}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Page Info */}
                  <div className="absolute bottom-2 left-2 text-xs text-gray-400">
                    Page 1 of 1 - Professional Tag Design
                  </div>
                </div>

                {/* Print Info */}
                <div className="mt-8 text-center text-sm text-gray-600">
                  <p>Print Preview - 8 tags per sheet</p>
                  <p>Estimated print time: 2 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            Ready to print 8 tags on 1 sheet
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={handlePrint}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-printer-line mr-2"></i>
              Print Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}