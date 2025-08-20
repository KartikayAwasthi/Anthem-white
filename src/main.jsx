import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import ClickSpark from '../Reactbits/ClickSpark';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Provides context for useLocation() */}
      <App />
      <ClickSpark/>
    </BrowserRouter>
  </React.StrictMode>
);
