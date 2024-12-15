import React, { useState } from 'react';
import { DrawingBoard } from './components/DrawingBoard';
import { SelectionPreview } from './components/SelectionPreview';
import { Images } from 'lucide-react';
import { ImageSelection } from './types/canvas';

function App() {
  const [selection, setSelection] = useState<ImageSelection | null>(null);

  const handleSelectionComplete = (sourceImage: string, selectionLayer: string) => {
    setSelection({ sourceImage, selectionLayer });
  };

  return (
    <div className="min-h-screen bg-surface-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <Images className="w-6 h-6 mr-2 text-brand-500" />
            <h1 className="text-2xl font-bold text-surface-900">Image Retouching tool</h1>
          </div>
          
          <DrawingBoard onSelectionComplete={handleSelectionComplete} />
        </div>

        {selection && <SelectionPreview selection={selection} />}
      </div>
    </div>
  );
}

export default App;