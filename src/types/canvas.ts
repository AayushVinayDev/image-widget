export interface DrawingCanvasConfig {
  onSelectionComplete: (sourceImage: string, selectionLayer: string) => void;
}

export interface ImageSelection {
  sourceImage: string;
  selectionLayer: string;
}

export interface PaintToolSettings {
  toolSize: number;
  onToolSizeUpdate: (diameter: number) => void;
}