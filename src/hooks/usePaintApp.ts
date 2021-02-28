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
  },
  {
    initCanvas: () => void,
    clearCanvas: () => void,
    fillCanvas: (color: Color) => void,
    handleColorChange: (color: Color) => void,
    handlePenSizeChange: (size: number) => void,

    undo: () => void,
    redo: () => void,
  },
];

export const usePaintApp = (config: Config): PaintAppReturnType => {
  const canvas = useRef<HTMLCanvasElement>();
  const ctx = useRef(canvas?.current?.getContext('2d'));

  const [color, setColor] = useState(config.initialPenColor);
  const [penSize, setPenSize] = useState(config.initialPenSize);

  const hasCanvasInitialized = useRef(false);
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
  }, []);

const redo = useCallback(() => {
    if (!ctx.current) return;
    const imageData = historyStack.current.redo();
    if (imageData === null) return;
    ctx.current.putImageData(imageData, 0, 0);
    setCanUndo(historyStack.current.canUndo());
    setCanRedo(historyStack.current.canRedo());
  }, []);

  const fillCanvas = useCallback((color: Color) => {
    if (!canvas || !canvas.current || !ctx || !ctx.current) return;
    ctx.current.fillStyle = color;
    ctx.current.fillRect(0, 0, canvas.current.width, canvas.current.height);

    historyStack.current.push(ctx.current.getImageData(0, 0, canvas.current.width, canvas.current.height));
    setCanUndo(historyStack.current.canUndo());
    setCanRedo(historyStack.current.canRedo());
  }, []);

  const clearCanvas = useCallback(() => {
    fillCanvas(config.backgroundColor);
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

    if (ctx.current && canvas.current) {
      historyStack.current.push(ctx.current.getImageData(0, 0, canvas.current.width, canvas.current.height));
      setCanUndo(historyStack.current.canUndo());
      setCanRedo(historyStack.current.canRedo());
    }
  }, []);

  const initCanvas = useCallback(() => {
    ctx.current = canvas?.current?.getContext('2d');
    if (!hasCanvasInitialized.current && canvas && canvas.current && ctx && ctx.current) {
      canvas.current.addEventListener('mousedown', startDrawing);
      canvas.current.addEventListener('mousemove', draw);
      canvas.current.addEventListener('mouseup', stopDrawing);
      canvas.current.addEventListener('mouseout', stopDrawing);

      ctx.current.strokeStyle = color;
      ctx.current.lineJoin = 'round';
      ctx.current.lineCap = 'round';
      ctx.current.lineWidth = penSize;

      clearCanvas();

      hasCanvasInitialized.current = true;
    }
  }, [color, penSize, startDrawing, draw, stopDrawing, clearCanvas]);

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

  return [
    {
      canvas,
      color,
      penSize,
      canUndo,
      canRedo,
    },
    {
      initCanvas,
      clearCanvas,
      fillCanvas,
      handleColorChange,
      handlePenSizeChange,
      undo,
      redo,
    }
  ];
};
