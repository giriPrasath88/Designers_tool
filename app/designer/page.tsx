
'use client';

import { useState } from 'react';
import DesignCanvas from './DesignCanvas';
import DesignToolbar from './DesignToolbar';
import DesignSidebar from './DesignSidebar';
import PrintPreview from './PrintPreview';

export default function DesignerPage() {
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [designData, setDesignData] = useState(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'success' | 'error'>('idle');

  const handleExport = () => {
    setShowExportDialog(true);
  };

  const handleExportFile = async (format: string, quality: string) => {
    setExportStatus('exporting');
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create download link based on format
      const canvas = document.querySelector('canvas');
      if (canvas) {
        let dataUrl: string;
        let filename: string;
        
        switch (format) {
          case 'png':
            dataUrl = canvas.toDataURL('image/png');
            filename = `tag-design-${Date.now()}.png`;
            break;
          case 'jpg':
            dataUrl = canvas.toDataURL('image/jpeg', quality === 'high' ? 0.95 : quality === 'medium' ? 0.8 : 0.6);
            filename = `tag-design-${Date.now()}.jpg`;
            break;
          case 'svg':
            // For SVG, we'll create a simple SVG representation
            const svgContent = `
              <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
                <rect width="800" height="600" fill="white"/>
                <text x="400" y="300" text-anchor="middle" font-family="Arial" font-size="24" fill="black">
                  Exported Tag Design
                </text>
              </svg>
            `;
            dataUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;
            filename = `tag-design-${Date.now()}.svg`;
            break;
          default:
            dataUrl = canvas.toDataURL('image/png');
            filename = `tag-design-${Date.now()}.png`;
        }
        
        // Create and trigger download
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      setExportStatus('success');
      setTimeout(() => {
        setExportStatus('idle');
        setShowExportDialog(false);
      }, 2000);
      
    } catch (error) {
      setExportStatus('error');
      setTimeout(() => setExportStatus('idle'), 3000);
    }
  };

  const handleSave = () => {
    setShowSaveDialog(true);
  };

  const handleSaveDesign = async (designName: string, designData: any) => {
    setSaveStatus('saving');
    
    try {
      // Simulate saving to local storage or API
      const savedDesigns = JSON.parse(localStorage.getItem('tagDesigns') || '[]');
      const newDesign = {
        id: Date.now(),
        name: designName,
        data: designData,
        createdAt: new Date().toISOString(),
        thumbnail: null // Could generate canvas thumbnail here
      };
      
      savedDesigns.push(newDesign);
      localStorage.setItem('tagDesigns', JSON.stringify(savedDesigns));
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveStatus('saved');
      setTimeout(() => {
        setSaveStatus('idle');
        setShowSaveDialog(false);
      }, 2000);
      
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handlePrint = () => {
    setShowPrintPreview(true);
  };

  return (
    <>
      <div className="h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center px-6">
          <div className="flex items-center space-x-4">
            <div className="text-xl font-bold text-indigo-600" style={{ fontFamily: "var(--font-pacifico)" }}>
              TagDesigner Pro
            </div>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 text-sm">Professional Tag Designer</span>
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <i className="ri-time-line"></i>
              <span suppressHydrationWarning={true}>
                {new Date().toLocaleTimeString()}
              </span>
            </div>
            
            <div className="h-6 w-px bg-gray-300"></div>
            
            <button 
              onClick={handleSave}
              className={`px-4 py-2 transition-colors whitespace-nowrap cursor-pointer group relative ${
                saveStatus === 'saving' 
                  ? 'text-blue-600' 
                  : saveStatus === 'saved' 
                    ? 'text-green-600' 
                    : saveStatus === 'error' 
                      ? 'text-red-600' 
                      : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className={`mr-2 ${
                saveStatus === 'saving' 
                  ? 'ri-loader-line animate-spin' 
                  : saveStatus === 'saved' 
                    ? 'ri-check-line' 
                    : saveStatus === 'error' 
                      ? 'ri-error-warning-line' 
                      : 'ri-save-line group-hover:animate-pulse'
              }`}></i>
              {saveStatus === 'saving' 
                ? 'Saving...' 
                : saveStatus === 'saved' 
                  ? 'Saved!' 
                  : saveStatus === 'error' 
                    ? 'Error' 
                    : 'Save'}
            </button>
            
            <button 
              onClick={handleExport}
              className={`px-4 py-2 transition-colors whitespace-nowrap cursor-pointer group ${
                exportStatus === 'exporting' 
                  ? 'text-blue-600' 
                  : exportStatus === 'success' 
                    ? 'text-green-600' 
                    : exportStatus === 'error' 
                      ? 'text-red-600' 
                      : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <i className={`mr-2 ${
                exportStatus === 'exporting' 
                  ? 'ri-loader-line animate-spin' 
                  : exportStatus === 'success' 
                    ? 'ri-check-line' 
                    : exportStatus === 'error' 
                      ? 'ri-error-warning-line' 
                      : 'ri-download-line group-hover:animate-bounce'
              }`}></i>
              {exportStatus === 'exporting' 
                ? 'Exporting...' 
                : exportStatus === 'success' 
                  ? 'Exported!' 
                  : exportStatus === 'error' 
                    ? 'Error' 
                    : 'Export'}
            </button>
            
            <button 
              onClick={handlePrint}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-printer-line mr-2"></i>
              Print
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar */}
          <DesignSidebar />
          
          {/* Main Design Area */}
          <div className="flex-1 flex flex-col">
            <DesignToolbar />
            <DesignCanvas />
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-white border-t px-6 py-2 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Ready</span>
            </div>
            <div>Elements: 0</div>
            <div>Canvas: 800 × 600px</div>
            <div>DPI: 300</div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div>Memory: 12.5 MB</div>
            <div>Version: 2.1.0</div>
          </div>
        </div>
      </div>

      {/* Export Dialog */}
      {showExportDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                    <i className="ri-download-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Export Design</h3>
                    <p className="text-sm text-gray-600">Choose your preferred export format and settings</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowExportDialog(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  disabled={exportStatus === 'exporting'}
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const format = formData.get('format') as string;
                const quality = formData.get('quality') as string;
                handleExportFile(format, quality);
              }}>
                {/* Export Format */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Export Format</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 cursor-pointer transition-all group">
                      <input type="radio" name="format" value="png" defaultChecked className="sr-only" />
                      <div className="flex-1 text-center">
                        <i className="ri-image-line text-2xl text-indigo-600 mb-2 block group-hover:scale-110 transition-transform"></i>
                        <div className="font-medium text-gray-800">PNG</div>
                        <div className="text-xs text-gray-500">High quality, transparent background</div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 cursor-pointer transition-all group">
                      <input type="radio" name="format" value="jpg" className="sr-only" />
                      <div className="flex-1 text-center">
                        <i className="ri-image-2-line text-2xl text-orange-600 mb-2 block group-hover:scale-110 transition-transform"></i>
                        <div className="font-medium text-gray-800">JPG</div>
                        <div className="text-xs text-gray-500">Smaller file size, solid background</div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 cursor-pointer transition-all group">
                      <input type="radio" name="format" value="svg" className="sr-only" />
                      <div className="flex-1 text-center">
                        <i className="ri-code-line text-2xl text-green-600 mb-2 block group-hover:scale-110 transition-transform"></i>
                        <div className="font-medium text-gray-800">SVG</div>
                        <div className="text-xs text-gray-500">Vector format, scalable</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Quality Settings */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Quality & Size</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-indigo-300 cursor-pointer transition-all">
                      <input type="radio" name="quality" value="low" className="sr-only" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">Standard</div>
                        <div className="text-xs text-gray-500">Smaller file size</div>
                        <div className="text-xs text-blue-600 font-medium">~200KB</div>
                      </div>
                    </label>

                    <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-indigo-300 cursor-pointer transition-all">
                      <input type="radio" name="quality" value="medium" defaultChecked className="sr-only" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">High</div>
                        <div className="text-xs text-gray-500">Balanced quality</div>
                        <div className="text-xs text-blue-600 font-medium">~500KB</div>
                      </div>
                    </label>

                    <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-indigo-300 cursor-pointer transition-all">
                      <input type="radio" name="quality" value="high" className="sr-only" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">Maximum</div>
                        <div className="text-xs text-gray-500">Best quality</div>
                        <div className="text-xs text-blue-600 font-medium">~1.2MB</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Export Options */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Export Options</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-indigo-600" />
                      <span className="text-sm text-gray-700">Include design metadata</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" className="accent-indigo-600" />
                      <span className="text-sm text-gray-700">Export with bleed area (3mm)</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" className="accent-indigo-600" />
                      <span className="text-sm text-gray-700">Add crop marks for printing</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-indigo-600" />
                      <span className="text-sm text-gray-700">Optimize for web display</span>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowExportDialog(false)}
                    disabled={exportStatus === 'exporting'}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={exportStatus === 'exporting'}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {exportStatus === 'exporting' ? (
                      <>
                        <i className="ri-loader-line animate-spin mr-2"></i>
                        Exporting...
                      </>
                    ) : exportStatus === 'success' ? (
                      <>
                        <i className="ri-check-line mr-2"></i>
                        Exported!
                      </>
                    ) : (
                      <>
                        <i className="ri-download-line mr-2"></i>
                        Export Design
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Export Tips */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <div className="flex items-start space-x-3">
                  <i className="ri-lightbulb-line text-blue-600 text-lg mt-0.5"></i>
                  <div className="text-sm text-blue-800">
                    <div className="font-medium mb-2">Export Tips:</div>
                    <ul className="space-y-1 text-xs">
                      <li>• PNG format is best for designs with transparency</li>
                      <li>• JPG format creates smaller files for complex designs</li>
                      <li>• SVG format is perfect for logos and scalable graphics</li>
                      <li>• Higher quality settings improve print results</li>
                      <li>• Include bleed area for professional printing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Save Design</h3>
                <button 
                  onClick={() => setShowSaveDialog(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const designName = formData.get('designName') as string;
                if (designName.trim()) {
                  handleSaveDesign(designName, designData);
                }
              }}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Design Name
                  </label>
                  <input
                    type="text"
                    name="designName"
                    placeholder="Enter design name..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    defaultValue={`Tag Design ${new Date().toLocaleDateString()}`}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    placeholder="Add a description for your design..."
                    rows={3}
                    maxLength={500}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                  />
                  <div className="text-xs text-gray-500 mt-1">Maximum 500 characters</div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowSaveDialog(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveStatus === 'saving'}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saveStatus === 'saving' ? (
                      <>
                        <i className="ri-loader-line animate-spin mr-2"></i>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="ri-save-line mr-2"></i>
                        Save Design
                      </>
                    )}
                  </button>
                </div>
              </form>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <i className="ri-information-line text-blue-600 mt-0.5"></i>
                  <div className="text-sm text-blue-800">
                    <div className="font-medium mb-1">Save Options:</div>
                    <ul className="text-xs space-y-1">
                      <li>• Designs are saved to your browser's local storage</li>
                      <li>• You can access saved designs from the Templates tab</li>
                      <li>• Export to PNG or PDF for permanent backup</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print Preview Modal */}
      {showPrintPreview && (
        <PrintPreview 
          onClose={() => setShowPrintPreview(false)}
          designData={designData}
        />
      )}
    </>
  );
}
