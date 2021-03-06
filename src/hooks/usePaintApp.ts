import { useCallback, useRef, useState } from 'react';
import { HistoryStack } from '../HistoryStack';
import { Color, Config } from '../types';

type PaintAppReturnType = [
  {
    canvas: React.MutableRefObject<HTMLCanvasElement | undefined>,
    color: Color,
    penSize: number,

    canUndo: boolean,
    canRedo: boolean,

    hasUnsavedChanges: React.MutableRefObject<boolean>,
  },
  {
    initCanvas: () => void,
    clearCanvas: () => void,
    fillCanvas: (color: Color) => void,
    handleColorChange: (color: Color) => void,
    handlePenSizeChange: (size: number) => void,

    undo: () => void,
    redo: () => void,

    notifySave: () => void,
  },
];

export const usePaintApp = (config: Config): PaintAppReturnType => {
  const canvas = useRef<HTMLCanvasElement>();
  const ctx = useRef(canvas?.current?.getContext('2d'));

  const [color, setColor] = useState(config.initialPenColor);
  const [penSize, setPenSize] = useState(config.initialPenSize);

  const hasCanvasInitialized = useRef(false);
  const hasUnsavedChanges = useRef(false);
  const isDrawing = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);

  const historyStack = useRef(new HistoryStack<ImageData>(30));

  const [canUndo, setCanUndo] = useState(historyStack.current.canUndo());
  const [canRedo, setCanRedo] = useState(historyStack.current.canRedo());

  const undo = useCallback(() => {
    if (!ctx.current) return;
    const imageData = historyStack.current.undo();
    if (imageData === null) return;
    ctx.current.putImageData(imageData, 0, 0);
    setCanUndo(historyStack.current.canUndo());
    setCanRedo(historyStack.current.canRedo());
    hasUnsavedChanges.current = true;
  }, []);

  const redo = useCallback(() => {
    if (!ctx.current) return;
    const imageData = historyStack.current.redo();
    if (imageData === null) return;
    ctx.current.putImageData(imageData, 0, 0);
    setCanUndo(historyStack.current.canUndo());
    setCanRedo(historyStack.current.canRedo());
    hasUnsavedChanges.current = true;
  }, []);

  const fillCanvas = useCallback((color: Color, initiatedByUser = true) => {
    if (!canvas || !canvas.current || !ctx || !ctx.current) return;
    ctx.current.fillStyle = color;
    ctx.current.fillRect(0, 0, canvas.current.width, canvas.current.height);

    historyStack.current.push(ctx.current.getImageData(0, 0, canvas.current.width, canvas.current.height));
    setCanUndo(historyStack.current.canUndo());
    setCanRedo(historyStack.current.canRedo());
    if (initiatedByUser) {
      hasUnsavedChanges.current = true;
    }
  }, []);

  const clearCanvas = useCallback((initiatedByUser = true) => {
    fillCanvas(config.backgroundColor, initiatedByUser);
  }, [config.backgroundColor, fillCanvas]);

  const startDrawing = useCallback((event: MouseEvent) => {
    if (!ctx || !ctx.current) return;
    isDrawing.current = true;

    ctx.current.beginPath();
    ctx.current.moveTo(event.offsetX, event.offsetY);
    ctx.current.lineTo(event.offsetX, event.offsetY);
    ctx.current.stroke();

    [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
  }, []);

  const draw = useCallback((event: MouseEvent) => {
    if (!ctx || !ctx.current || !isDrawing.current) return;

    ctx.current.beginPath();
    ctx.current.moveTo(lastX.current, lastY.current);
    ctx.current.lineTo(event.offsetX, event.offsetY);
    ctx.current.stroke();

    [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
  }, []);

  const stopDrawing = useCallback(() => {
    if (!isDrawing.current) return;
    isDrawing.current = false;

    if (!ctx.current || !canvas.current) return;
    historyStack.current.push(ctx.current.getImageData(0, 0, canvas.current.width, canvas.current.height));
    setCanUndo(historyStack.current.canUndo());
    setCanRedo(historyStack.current.canRedo());
    hasUnsavedChanges.current = true;
  }, []);

  // The change before and after resuming are both in the same history stack item.
  // Currently it cannot distinguish between these two scenarios:
  // - mouseout -> mouseover
  // - mouseout -> mouseup -> mousedown -> mouseover
  // Ideally, the latter case should count as two separate history stack items.
  // If I really want to implement that,
  // maybe I should consider moving mouse-related event listeners to the document or window.
  const resumeDrawing = useCallback((event: MouseEvent) => {
    const isMousePressed = (event.buttons & 1) === 1;
    if (isMousePressed) {
      isDrawing.current = true;
      [lastX.current, lastY.current] = [event.offsetX, event.offsetY];
    } else {
      // A history stack item is added when the mouse enters the canvas,
      // not when the mouse is released outside the canvas.
      // This is a bit confusing behavior if you carefully observe when the undo/redo buttons activate/deactivate.
      if (isDrawing.current) {
        stopDrawing();
      }
    }
  }, [stopDrawing]);

  const initCanvas = useCallback(() => {
    ctx.current = canvas?.current?.getContext('2d');
    if (!hasCanvasInitialized.current && canvas && canvas.current && ctx && ctx.current) {
      canvas.current.addEventListener('mousedown', startDrawing);
      canvas.current.addEventListener('mousemove', draw);
      canvas.current.addEventListener('mouseup', stopDrawing);
      canvas.current.addEventListener('mouseout', draw);
      canvas.current.addEventListener('mouseover', resumeDrawing);

      ctx.current.strokeStyle = color;
      ctx.current.lineJoin = 'round';
      ctx.current.lineCap = 'round';
      ctx.current.lineWidth = penSize;

      clearCanvas(false);

      hasCanvasInitialized.current = true;
    }
  }, [color, penSize, startDrawing, draw, stopDrawing, resumeDrawing, clearCanvas]);

  const handleColorChange = useCallback((color: Color) => {
    setColor(color);
    if (ctx.current) {
      ctx.current.strokeStyle = color;
    }
  }, []);

  const handlePenSizeChange = useCallback((size: number) => {
    if (size < 0) return;
    setPenSize(size);
    if (ctx.current) {
      ctx.current.lineWidth = size;
    }
  }, []);

  const notifySave = useCallback(() => {
    hasUnsavedChanges.current = false;
  }, []);

  return [
    {
      canvas,
      color,
      penSize,
      canUndo,
      canRedo,
      hasUnsavedChanges,
    },
    {
      initCanvas,
      clearCanvas,
      fillCanvas,
      handleColorChange,
      handlePenSizeChange,
      undo,
      redo,
      notifySave,
    }
  ];
};
