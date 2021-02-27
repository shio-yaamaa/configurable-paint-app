import React from 'react';
import ReactDOM from 'react-dom';
import './variables.css';
import './index.css';
import { App } from './components/App';
import { getConfigFromQueryParams } from './config';

const config = getConfigFromQueryParams(new URLSearchParams(window.location.search));

ReactDOM.render(
  <React.StrictMode>
    <App config={config} />
  </React.StrictMode>,
  document.getElementById('root')
);
