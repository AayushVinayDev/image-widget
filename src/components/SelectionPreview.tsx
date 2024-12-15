import React from 'react';
import { ImageSelection } from '../types/canvas';

interface PreviewProps {
  selection: ImageSelection;
}

export const SelectionPreview: React.FC<PreviewProps> = ({ selection }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Generated Images</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Source Image</h3>
          <img
            src={selection.sourceImage}
            alt="Source"
            className="w-full rounded border border-gray-200"
          />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Selection Layer</h3>
          <img
            src={selection.selectionLayer}
            alt="Selection"
            className="w-full rounded border border-gray-200"
          />
        </div>
      </div>
    </div>
  );
};