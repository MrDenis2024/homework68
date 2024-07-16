import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import {store} from './app/store';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer position="bottom-right" />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
