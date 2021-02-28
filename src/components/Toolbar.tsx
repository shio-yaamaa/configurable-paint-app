import React from 'react';
import './Toolbar.css';
import { Color } from '../types';
import { PenPreview } from './PenPreview';
import { ColorPicker } from './ColorPicker';
import { ColorPalette } from './ColorPalette';
import { SizePicker } from './SizePicker';

interface Props {
  color: Color;
  paletteColors: Color[];

  penSize: number;
  minPenSize: number;
  maxPenSize: number;

  canUndo: boolean;
  canRedo: boolean;

  dataUrl: string;

  clearCanvas: () => void;
  fillCanvas: (color: Color) => void;

  handleColorChange: (color: Color) => void;
  handlePenSizeChange: (size: number) => void;

  undo: () => void;
  redo: () => void;

  handleDownload: () => void;
}

export const Toolbar: React.VFC<Props> = (props) => {
  return (
    <aside className='Toolbar'>
      <div className='Toolbar-top'>
        <div className='Toolbar-section'>
          <h1 className='Toolbar-title'>Pen Preview</h1>
          <PenPreview
            color={props.color}
            penSize={props.penSize} />
        </div>
        <div className='Toolbar-section'>
          <h1 className='Toolbar-title'>Color</h1>
          <ColorPicker
            color={props.color}
            handleColorChange={props.handleColorChange} />
          {
            props.paletteColors.length > 0 && (
              <ColorPalette
                colors={props.paletteColors}
                handleColorChange={props.handleColorChange} />
            )
          }
        </div>
        <div className='Toolbar-section'>
          <h1 className='Toolbar-title'>Pen Size</h1>
          <SizePicker
            min={props.minPenSize}
            max={props.maxPenSize}
            size={props.penSize}
            handleSizeChange={props.handlePenSizeChange} />
        </div>
        <div className='Toolbar-section'>
          <button className='Toolbar-button' onClick={() => props.fillCanvas(props.color)}>Fill</button>
        </div>
      </div>
      <div className='Toolbar-bottom'>
        <button
          className={`Toolbar-button ${props.canUndo ? '' : 'disabled'}`}
          onClick={props.undo}>
          Undo
        </button>
        <button
          className={`Toolbar-button ${props.canRedo ? '' : 'disabled'}`}
          onClick={props.redo}>
          Redo
        </button>
        <button className='Toolbar-button' onClick={props.clearCanvas}>Clear</button>
        <a
          className='Toolbar-button'
          download='image.png'
          onClick={props.handleDownload}
          href={props.dataUrl}
        >
          Save
        </a>
      </div>
    </aside>
  );
}
