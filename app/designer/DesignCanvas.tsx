
'use client';

import { useRef, useEffect, useState } from 'react';

interface DesignElement {
  id: number;
  type: 'text' | 'rectangle' | 'circle' | 'image' | 'barcode' | 'qrcode';
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  rotation?: number;
  opacity?: number;
  selected?: boolean;
  zIndex?: number;
}

export default function DesignCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState('select');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<DesignElement | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [canvasHistory, setCanvasHistory] = useState<DesignElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Save to history
  const saveToHistory = (newElements: DesignElement[]) => {
    const newHistory = canvasHistory.slice(0, historyIndex + 1);
    newHistory.push([...newElements]);
    setCanvasHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo function
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(canvasHistory[historyIndex - 1]);
      setSelectedElement(null);
    }
  };

  // Redo function
  const redo = () => {
    if (historyIndex < canvasHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(canvasHistory[historyIndex + 1]);
      setSelectedElement(null);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with high DPI support
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    // Draw background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw grid
    drawGrid(ctx, rect.width, rect.height);

    // Sort elements by zIndex and draw
    const sortedElements = [...elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
    sortedElements.forEach(element => {
      drawElement(ctx, element);
    });

    // Draw selection handles
    if (selectedElement) {
      drawSelectionHandles(ctx, selectedElement);
    }

  }, [elements, selectedElement]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 0.5;

    // Draw vertical lines
    for (let x = 0; x <= width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawElement = (ctx: CanvasRenderingContext2D, element: DesignElement) => {
    ctx.save();
    
    // Apply transformations
    ctx.globalAlpha = element.opacity || 1;
    
    if (element.rotation) {
      const centerX = element.x + (element.width || 0) / 2;
      const centerY = element.y + (element.height || 0) / 2;
      ctx.translate(centerX, centerY);
      ctx.rotate((element.rotation * Math.PI) / 180);
      ctx.translate(-centerX, -centerY);
    }

    switch (element.type) {
      case 'text':
        ctx.fillStyle = element.color || '#000000';
        ctx.font = `${element.fontSize || 16}px ${element.fontFamily || 'Arial'}`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(element.text || 'Text', element.x, element.y);
        break;

      case 'rectangle':
        ctx.strokeStyle = element.strokeColor || '#000000';
        ctx.fillStyle = element.fillColor || 'transparent';
        ctx.lineWidth = element.strokeWidth || 1;
        
        if (element.fillColor && element.fillColor !== 'transparent') {
          ctx.fillRect(element.x, element.y, element.width || 100, element.height || 60);
        }
        ctx.strokeRect(element.x, element.y, element.width || 100, element.height || 60);
        break;

      case 'circle':
        ctx.strokeStyle = element.strokeColor || '#000000';
        ctx.fillStyle = element.fillColor || 'transparent';
        ctx.lineWidth = element.strokeWidth || 1;
        ctx.beginPath();
        ctx.arc(element.x, element.y, element.radius || 40, 0, 2 * Math.PI);
        
        if (element.fillColor && element.fillColor !== 'transparent') {
          ctx.fill();
        }
        ctx.stroke();
        break;

      case 'barcode':
        drawBarcode(ctx, element);
        break;

      case 'qrcode':
        drawQRCode(ctx, element);
        break;
    }

    ctx.restore();
  };

  const drawBarcode = (ctx: CanvasRenderingContext2D, element: DesignElement) => {
    const width = element.width || 120;
    const height = element.height || 40;
    const barWidth = 2;
    
    ctx.fillStyle = '#000000';
    
    // Draw barcode pattern
    for (let i = 0; i < width; i += barWidth * 2) {
      ctx.fillRect(element.x + i, element.y, barWidth, height);
    }
    
    // Draw text below
    ctx.fillStyle = '#000000';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(element.text || '123456789', element.x + width / 2, element.y + height + 15);
  };

  const drawQRCode = (ctx: CanvasRenderingContext2D, element: DesignElement) => {
    const size = element.width || 80;
    const blockSize = size / 25;
    
    ctx.fillStyle = '#000000';
    
    // Draw QR code pattern (simplified)
    for (let row = 0; row < 25; row++) {
      for (let col = 0; col < 25; col++) {
        if ((row + col) % 3 === 0 || (row % 5 === 0 && col % 5 === 0)) {
          ctx.fillRect(element.x + col * blockSize, element.y + row * blockSize, blockSize, blockSize);
        }
      }
    }
  };

  const drawSelectionHandles = (ctx: CanvasRenderingContext2D, element: DesignElement) => {
    const bounds = getElementBounds(element);
    if (!bounds) return;

    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(bounds.x - 5, bounds.y - 5, bounds.width + 10, bounds.height + 10);
    ctx.setLineDash([]);

    // Draw corner handles
    const handleSize = 8;
    ctx.fillStyle = '#2563eb';
    
    const handles = [
      { x: bounds.x - handleSize/2, y: bounds.y - handleSize/2 }, // Top-left
      { x: bounds.x + bounds.width - handleSize/2, y: bounds.y - handleSize/2 }, // Top-right
      { x: bounds.x - handleSize/2, y: bounds.y + bounds.height - handleSize/2 }, // Bottom-left
      { x: bounds.x + bounds.width - handleSize/2, y: bounds.y + bounds.height - handleSize/2 } // Bottom-right
    ];

    handles.forEach(handle => {
      ctx.fillRect(handle.x, handle.y, handleSize, handleSize);
    });
  };

  const getElementBounds = (element: DesignElement) => {
    switch (element.type) {
      case 'text':
        return { x: element.x, y: element.y, width: 100, height: element.fontSize || 16 };
      case 'rectangle':
      case 'barcode':
      case 'qrcode':
        return { x: element.x, y: element.y, width: element.width || 100, height: element.height || 60 };
      case 'circle':
        const radius = element.radius || 40;
        return { x: element.x - radius, y: element.y - radius, width: radius * 2, height: radius * 2 };
      default:
        return null;
    }
  };

  const getElementAt = (x: number, y: number): DesignElement | null => {
    // Check from top to bottom (reverse z-index order)
    const sortedElements = [...elements].sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0));
    
    for (const element of sortedElements) {
      const bounds = getElementBounds(element);
      if (bounds && x >= bounds.x && x <= bounds.x + bounds.width && 
          y >= bounds.y && y <= bounds.y + bounds.height) {
        return element;
      }
    }
    return null;
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool === 'select') {
      const elementAtPoint = getElementAt(x, y);
      
      if (elementAtPoint) {
        setSelectedElement(elementAtPoint);
        setIsDragging(true);
        setDragOffset({ x: x - elementAtPoint.x, y: y - elementAtPoint.y });
      } else {
        setSelectedElement(null);
      }
    } else {
      // Add new element
      addNewElement(x, y);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDragging || !selectedElement) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElements = elements.map(el => 
      el.id === selectedElement.id 
        ? { ...el, x: x - dragOffset.x, y: y - dragOffset.y }
        : el
    );

    setElements(newElements);
    setSelectedElement({ ...selectedElement, x: x - dragOffset.x, y: y - dragOffset.y });
  };

  const handleCanvasMouseUp = () => {
    if (isDragging) {
      saveToHistory(elements);
    }
    setIsDragging(false);
  };

  const addNewElement = (x: number, y: number) => {
    let newElement: DesignElement;

    switch (selectedTool) {
      case 'text':
        newElement = {
          id: Date.now(),
          type: 'text',
          x,
          y,
          text: 'Your Text Here',
          fontSize: 16,
          fontFamily: 'Arial',
          color: '#000000',
          zIndex: elements.length
        };
        break;

      case 'rectangle':
        newElement = {
          id: Date.now(),
          type: 'rectangle',
          x,
          y,
          width: 100,
          height: 60,
          strokeColor: '#000000',
          fillColor: 'transparent',
          strokeWidth: 2,
          zIndex: elements.length
        };
        break;

      case 'circle':
        newElement = {
          id: Date.now(),
          type: 'circle',
          x,
          y,
          radius: 40,
          strokeColor: '#000000',
          fillColor: 'transparent',
          strokeWidth: 2,
          zIndex: elements.length
        };
        break;

      case 'barcode':
        newElement = {
          id: Date.now(),
          type: 'barcode',
          x,
          y,
          width: 120,
          height: 40,
          text: '123456789',
          zIndex: elements.length
        };
        break;

      case 'qrcode':
        newElement = {
          id: Date.now(),
          type: 'qrcode',
          x,
          y,
          width: 80,
          height: 80,
          text: 'QR Content',
          zIndex: elements.length
        };
        break;

      default:
        return;
    }

    const newElements = [...elements, newElement];
    setElements(newElements);
    saveToHistory(newElements);
    setSelectedElement(newElement);
  };

  const deleteSelectedElement = () => {
    if (!selectedElement) return;
    
    const newElements = elements.filter(el => el.id !== selectedElement.id);
    setElements(newElements);
    saveToHistory(newElements);
    setSelectedElement(null);
  };

  const duplicateSelectedElement = () => {
    if (!selectedElement) return;
    
    const duplicate = {
      ...selectedElement,
      id: Date.now(),
      x: selectedElement.x + 20,
      y: selectedElement.y + 20,
      zIndex: elements.length
    };
    
    const newElements = [...elements, duplicate];
    setElements(newElements);
    saveToHistory(newElements);
    setSelectedElement(duplicate);
  };

  const clearCanvas = () => {
    setElements([]);
    setSelectedElement(null);
    saveToHistory([]);
  };

  // Export canvas as image
  const exportCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'tag-design.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case 'd':
            e.preventDefault();
            duplicateSelectedElement();
            break;
        }
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteSelectedElement();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement, historyIndex, canvasHistory]);

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Interactive Design Canvas</h3>
          <div className="flex space-x-2">
            <button 
              onClick={undo}
              disabled={historyIndex <= 0}
              className={`px-3 py-1 text-sm rounded transition-colors whitespace-nowrap cursor-pointer ${
                historyIndex <= 0 
                  ? 'bg-gray-100 text-gray-400' 
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              <i className="ri-arrow-go-back-line mr-1"></i>
              Undo
            </button>
            <button 
              onClick={redo}
              disabled={historyIndex >= canvasHistory.length - 1}
              className={`px-3 py-1 text-sm rounded transition-colors whitespace-nowrap cursor-pointer ${
                historyIndex >= canvasHistory.length - 1
                  ? 'bg-gray-100 text-gray-400' 
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              <i className="ri-arrow-go-forward-line mr-1"></i>
              Redo
            </button>
            <button 
              onClick={exportCanvas}
              className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-download-line mr-1"></i>
              Export
            </button>
            <button 
              onClick={clearCanvas}
              className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-delete-bin-line mr-1"></i>
              Clear All
            </button>
          </div>
        </div>

        <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
          <canvas
            ref={canvasRef}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
            className="block cursor-crosshair"
            style={{ width: '800px', height: '600px' }}
          />
        </div>

        <div className="mt-4 flex items-center justify-center space-x-2 flex-wrap">
          {[
            { tool: 'select', icon: 'ri-cursor-line', label: 'Select' },
            { tool: 'text', icon: 'ri-text', label: 'Text' },
            { tool: 'rectangle', icon: 'ri-rectangle-line', label: 'Rectangle' },
            { tool: 'circle', icon: 'ri-circle-line', label: 'Circle' },
            { tool: 'barcode', icon: 'ri-barcode-line', label: 'Barcode' },
            { tool: 'qrcode', icon: 'ri-qr-code-line', label: 'QR Code' }
          ].map(({ tool, icon, label }) => (
            <button 
              key={tool}
              onClick={() => setSelectedTool(tool)}
              className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedTool === tool 
                  ? 'bg-indigo-600 text-white shadow-lg transform scale-105' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow'
              }`}
            >
              <i className={`${icon} mr-2`}></i>
              {label}
            </button>
          ))}
        </div>

        {selectedElement && (
          <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-indigo-800">
                Selected: {selectedElement.type} (ID: {selectedElement.id})
              </span>
              <div className="flex space-x-2">
                <button 
                  onClick={duplicateSelectedElement}
                  className="px-3 py-1 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Duplicate
                </button>
                <button 
                  onClick={deleteSelectedElement}
                  className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500 text-center">
          Shortcuts: Ctrl+Z (Undo), Ctrl+Shift+Z (Redo), Ctrl+D (Duplicate), Delete (Remove)
        </div>
      </div>
    </div>
  );
}
