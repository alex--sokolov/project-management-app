import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

if (!root) {
  throw Error('React root element is not defined.');
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
