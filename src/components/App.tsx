import React from 'react';
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
    { canvas, color, penSize },
    {
        initCanvas, clearCanvas, fillCanvas,
        handleColorChange, handlePenSizeChange
    },
  ] = usePaintApp(props.config);

  return (
    <div className='App'>
      <Toolbar
        color={color}
        paletteColors={props.config.paletteColors}
        penSize={penSize}
        minPenSize={1}
        maxPenSize={100}
        clearCanvas={clearCanvas}
        fillCanvas={fillCanvas}
        handleColorChange={handleColorChange}
        handlePenSizeChange={handlePenSizeChange} />
      <Canvas
        width={props.config.width}
        height={props.config.height}
        canvasRef={canvas}
        initCanvas={initCanvas} />
    </div>
  );
}
