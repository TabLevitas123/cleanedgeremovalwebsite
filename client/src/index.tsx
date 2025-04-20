import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import { store } from './store';
import App from './App';
import './styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

// Get the root element
const rootElement = document.getElementById('root');

// Ensure the root element exists
if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a div with id "root" in your HTML.');
}

// Create a root
const root = createRoot(rootElement);

// Render the app
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);