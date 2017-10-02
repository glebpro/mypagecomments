import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import {Provider} from 'react-redux';
import {compose, createStore, applyMiddleware} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';

import allReducers from './reducers';
import App from './App';

// PROJECT ROOT FILE

// set up services for redux
const logger = createLogger();
const store = createStore(
    allReducers,
    compose(
      applyMiddleware(thunk, promise, logger),
      autoRehydrate()
    )
);

persistStore(store);

// root render, create App component
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
  ,document.getElementById('root')
);
