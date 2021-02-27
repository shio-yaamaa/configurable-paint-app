import React from 'react';
import './ToolbarButton.css';

interface Props {
  label: string;
  handleClick: () => void;
}

export const ToolbarButton: React.VFC<Props> = (props) => {
  return (
    <button
      className='ToolbarButton'
      onClick={props.handleClick}>
      {props.label}
    </button>
  );
}
