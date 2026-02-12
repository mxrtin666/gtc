import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* basename="/gtc" => app is reachable under /gtc */}
    <BrowserRouter basename="/gtc">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();