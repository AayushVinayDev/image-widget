import { fabric } from 'fabric';

export const DRAWING_CONFIG = {
  width: 600,
  height: 400,
  defaultToolSize: 20,
  drawColor: 'white',
  baseColor: 'black',
} as const;

export const setupDrawingCanvas = (
  canvasElement: HTMLCanvasElement,
  toolSize: number
): fabric.Canvas => {
  const drawingCanvas = new fabric.Canvas(canvasElement, {
    isDrawingMode: true,
    width: DRAWING_CONFIG.width,
    height: DRAWING_CONFIG.height,
  });

  drawingCanvas.freeDrawingBrush.color = DRAWING_CONFIG.drawColor;
  drawingCanvas.freeDrawingBrush.width = toolSize;
  drawingCanvas.backgroundColor = DRAWING_CONFIG.baseColor;

  return drawingCanvas;
};

export const adjustImageFit = (
  canvas: fabric.Canvas,
  img: fabric.Image
): void => {
  const scale = Math.min(
    canvas.width! / img.width!,
    canvas.height! / img.height!
  );
  
  img.scale(scale);
  img.set({
    left: (canvas.width! - img.width! * scale) / 2,
    top: (canvas.height! - img.height! * scale) / 2,
  });
};

export const setupHistoryManager = (canvas: fabric.Canvas) => {
  let isRestoring = false;
  const actionHistory: fabric.Object[] = [];

  canvas.on('object:added', () => {
    if (!isRestoring) {
      actionHistory.length = 0;
    }
    isRestoring = false;
  });

  return {
    undoAction: () => {
      if (canvas.getObjects().length > 0) {
        const removedObject = canvas.getObjects().pop();
        if (removedObject) {
          actionHistory.push(removedObject);
          canvas.remove(removedObject);
          canvas.renderAll();
        }
      }
    },
    redoAction: () => {
      if (actionHistory.length > 0) {
        isRestoring = true;
        const objectToRestore = actionHistory.pop();
        if (objectToRestore) {
          canvas.add(objectToRestore);
          canvas.renderAll();
        }
      }
    }
  };
};