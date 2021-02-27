import React, { useEffect } from 'react';
import './Canvas.css';

interface Props {
  width: number;
  height: number;
  canvasRef?: React.MutableRefObject<HTMLCanvasElement | undefined>;
  initCanvas: () => void;
}

export const Canvas: React.VFC<Props> = (props) => {
  useEffect(() => {
    props.initCanvas();
  })

  return (
    <div className='Canvas'>
      <canvas
        className='Canvas-canvas'
        width={props.width}
        height={props.height}
        ref={props.canvasRef as any}>
      </canvas>
    </div>
  );
}
