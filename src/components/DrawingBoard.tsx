import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Download, Upload, Trash2, Undo2, Redo2 } from 'lucide-react';
import { PaintTools } from './PaintTools.tsx';
import { DrawingCanvasConfig } from '../types/canvas.ts';
import { 
  setupDrawingCanvas, 
  adjustImageFit, 
  DRAWING_CONFIG, 
  setupHistoryManager 
} from '../utils/drawingUtils.ts';

export const DrawingBoard: React.FC<DrawingCanvasConfig> = ({ onSelectionComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawingCanvas, setDrawingCanvas] = useState<fabric.Canvas | null>(null);
  const [toolSize, setToolSize] = useState(DRAWING_CONFIG.defaultToolSize);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [historyManager, setHistoryManager] = useState<{ undoAction: () => void; redoAction: () => void } | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = setupDrawingCanvas(canvasRef.current, toolSize);
      setDrawingCanvas(fabricCanvas);
      
      // Initialize undo/redo functionality
      const historyHandler = setupHistoryManager(fabricCanvas);
      setHistoryManager(historyHandler);

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (drawingCanvas) {
      drawingCanvas.freeDrawingBrush.width = toolSize;
    }
  }, [toolSize, drawingCanvas]);

  // Add keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey) {
          e.preventDefault();
          historyManager?.undoAction();
        } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
          e.preventDefault();
          historyManager?.redoAction();
        }
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [historyManager]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && drawingCanvas) {
      const reader = new FileReader();
      reader.onload = (e) => {
        fabric.Image.fromURL(e.target?.result as string, (img) => {
          drawingCanvas.clear();
          drawingCanvas.backgroundColor = DRAWING_CONFIG.baseColor;
          
          adjustImageFit(drawingCanvas, img);
          
          drawingCanvas.add(img);
          drawingCanvas.renderAll();
          
          onSelectionComplete(e.target?.result as string, drawingCanvas.toDataURL());
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearCanvas = () => {
    if (drawingCanvas) {
      const objects = drawingCanvas.getObjects();
      const paths = objects.filter(obj => obj instanceof fabric.Path);
      paths.forEach(path => drawingCanvas.remove(path));
      drawingCanvas.renderAll();
    }
  };

  const exportMask = () => {
    if (drawingCanvas) {
      const maskImage = drawingCanvas.toDataURL();
      const originalImage = drawingCanvas.getObjects('image')[0]?.toDataURL();
      if (originalImage) {
        onSelectionComplete(originalImage, maskImage);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={() => historyManager?.undoAction()}
          className="flex items-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          <Undo2 className="w-4 h-4 mr-2" />
          Undo
        </button>
        <button
          onClick={() => historyManager?.redoAction()}
          className="flex items-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          <Redo2 className="w-4 h-4 mr-2" />
          Redo
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        
        <PaintTools 
          toolSize={toolSize}
          onToolSizeUpdate={setToolSize}
        />

        <button
          onClick={clearCanvas}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear
        </button>

        <button
          onClick={exportMask}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Mask
        </button>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};