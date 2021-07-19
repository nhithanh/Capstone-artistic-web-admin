import React from 'react';
import ReactDOM from 'react-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './index.css';
import App from './routers';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store'
import { Provider } from 'react-redux'
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
