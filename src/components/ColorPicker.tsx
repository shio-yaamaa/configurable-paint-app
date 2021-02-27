import React from 'react';
import './ColorPicker.css';
import { Color } from '../types';

interface Props {
  color: Color;
  handleColorChange: (color: Color) => void;
}

export const ColorPicker: React.VFC<Props> = (props) => {
  return (
    <div className='ColorPicker'>
      <input
        className='ColorPicker-input'
        type='color'
        value={props.color}
        onChange={(e) => props.handleColorChange(e.currentTarget.value)}
      />
    </div>
  );
}
