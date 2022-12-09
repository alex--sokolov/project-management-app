import './assets/styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import '@/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

if (!root) {
  throw Error('React root element is not defined.');
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
