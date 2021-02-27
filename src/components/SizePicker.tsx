import React from 'react';
import './SizePicker.css';

interface Props {
  size: number;
  min: number;
  max: number;
  handleSizeChange: (size: number) => void;
}

export const SizePicker: React.VFC<Props> = (props) => {
  return (
    <div className='SizePicker'>
      <input
        className='SizePicker-range-input'
        type='range'
        value={props.size}
        min={props.min}
        max={props.max}
        onChange={(e) => props.handleSizeChange(parseInt(e.currentTarget.value))}
      />
      <input
        className='SizePicker-number-input'
        type='number'
        value={props.size}
        min={props.min}
        max={props.max}
        onChange={(e) => props.handleSizeChange(parseInt(e.currentTarget.value))}
      />
    </div>
  );
}
