import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { PaintToolSettings } from '../types/canvas';

export const PaintTools: React.FC<PaintToolSettings> = ({
  toolSize,
  onToolSizeUpdate,
}) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded">
      <button
        onClick={() => onToolSizeUpdate(Math.max(1, toolSize - 5))}
        className="p-1 hover:bg-gray-200 rounded"
        aria-label="Decrease tool size"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-8 text-center">{toolSize}</span>
      <button
        onClick={() => onToolSizeUpdate(Math.min(50, toolSize + 5))}
        className="p-1 hover:bg-gray-200 rounded"
        aria-label="Increase tool size"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};