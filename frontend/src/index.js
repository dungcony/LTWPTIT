import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/views/App';
import reportWebVitals from '../src/reportWebVitals';

// 👇 Import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
