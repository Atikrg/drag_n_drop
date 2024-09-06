import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { ToastContainer, toast } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
      <ToastContainer />
  </React.StrictMode>
);


reportWebVitals();
