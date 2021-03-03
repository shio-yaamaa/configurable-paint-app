import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import { Config } from '../types';
import { Canvas } from './Canvas';
import { Toolbar } from './Toolbar';
import { usePaintApp } from '../hooks/usePaintApp'

interface Props {
  config: Config;
}

export const App: React.VFC<Props> = (props) => {
  const [
    {
      canvas, color, penSize,
      canUndo, canRedo,
    },
    {
      initCanvas, clearCanvas, fillCanvas,
      handleColorChange, handlePenSizeChange,
      undo, redo,
      checkUnsavedChanges, notifySave,
    },
  ] = usePaintApp(props.config);

  const [dataUrl, setDataUrl] = useState('#');
  const handleDownload = useCallback(() => {
    if (!canvas || !canvas.current) return;
    setDataUrl(canvas.current.toDataURL('image/png'));
    notifySave();
  }, [canvas, notifySave]);

  useEffect(() => {
    window.addEventListener('beforeunload', (event) => {
      const hasUnsavedChanges = checkUnsavedChanges();
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = '';
        return 'Close without saving?';
      } else {
        delete event['returnValue'];
      }
    });
  }, []);

  return (
    <div className='App'>
      <Toolbar
        color={color}
        paletteColors={props.config.paletteColors}
        penSize={penSize}
        minPenSize={1}
        maxPenSize={100}
        canUndo={canUndo}
        canRedo={canRedo}
        dataUrl={dataUrl}
        clearCanvas={clearCanvas}
        fillCanvas={fillCanvas}
        handleColorChange={handleColorChange}
        handlePenSizeChange={handlePenSizeChange}
        undo={undo}
        redo={redo}
        handleDownload={handleDownload} />
      <Canvas
        width={props.config.width}
        height={props.config.height}
        canvasRef={canvas}
        initCanvas={initCanvas} />
    </div>
  );
}
