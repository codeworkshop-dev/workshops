import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './theme.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Provider from './Provider';
import reducer, { APP_SESSION_KEY } from './reducer';

let initialState;
try {
  initialState = JSON.parse(sessionStorage.getItem(APP_SESSION_KEY));
} catch (ex) {}

ReactDOM.render(
  <Provider reducer={reducer} initialState={initialState || {}}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
