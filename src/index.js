import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import  'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';

import {Provider} from 'react-redux';
import generateStore from './redux/Store';

const store = generateStore()

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
)