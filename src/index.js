import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';
import './index.css';
import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = configureStore(); // could pass initialState in here if you wanted to rehydrate the store

render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </ReduxProvider>,
  document.getElementById('app')
);
