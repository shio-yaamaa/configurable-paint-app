import React from 'react';
import './ColorPalette.css';
import { Color } from '../types';

interface Props {
  colors: Color[];
  handleColorChange: (color: Color) => void;
}

export const ColorPalette: React.VFC<Props> = (props) => {
  return (
    <div className='ColorPalette'>
      {
        props.colors.map((color, i) => (
          <div
            className='ColorPalette-option'
            key={i}
            style={{ backgroundColor: color }}
            onClick={() => props.handleColorChange(color)}>
          </div>
        ))
      }
    </div>
  );
}
