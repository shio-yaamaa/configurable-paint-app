import React from 'react';
import './Toolbar.css';
import { Color } from '../types';
import { PenPreview } from './PenPreview';
import { ColorPicker } from './ColorPicker';
import { ColorPalette } from './ColorPalette';
import { SizePicker } from './SizePicker';
import { ToolbarButton } from './ToolbarButton';

interface Props {
  color: Color;
  paletteColors: Color[];

  penSize: number;
  minPenSize: number;
  maxPenSize: number;

  clearCanvas: () => void;
  fillCanvas: (color: Color) => void;
  handleColorChange: (color: Color) => void;
  handlePenSizeChange: (size: number) => void;
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
          <ToolbarButton label='Fill' handleClick={() => props.fillCanvas(props.color)} />
        </div>
      </div>
      <div className='Toolbar-bottom'>
        <ToolbarButton label='Undo' handleClick={() => {}} />
        <ToolbarButton label='Redo' handleClick={() => {}} />
        <ToolbarButton label='Clear' handleClick={props.clearCanvas} />
        <ToolbarButton label='Save' handleClick={() => {}} />
      </div>
    </aside>
  );
}
