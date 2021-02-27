import React from 'react';
import './PenPreview.css';
import { Color } from '../types';

interface Props {
  color: Color;
  penSize: number;
}

export const PenPreview: React.VFC<Props> = (props) => {
  return (
    <div className='PenPreview'>
      <div
        className='PenPreview-content'
        style={{
          width: props.penSize,
          height: props.penSize,
          backgroundColor: props.color,
        }}>
      </div>
    </div>
  );
}
