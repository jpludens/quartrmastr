import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import DATA_CATEGORIES from './constants/dataCategories.js'
import equipsPage from './reducers/roots/equipsPage.js';
import fetchDataRequest from './actions/fetchDataRequest.js';
import EquipCategoryDropdown from './components/containers/equipCategoryDropdown.jsx';
import EquipSelectorList from './components/containers/equipSelectorList.jsx';
import EquipLevelComparisonViewer from './components/containers/equipLevelComparisonViewer.jsx';


// Could generalize with categiroy => initial
// This could be factored out
const initialDataStore = new Map();
initialDataStore.set(DATA_CATEGORIES.EQUIPS, new Map());
initialDataStore.set(DATA_CATEGORIES.MATERIALS, new Map());

// Create the store
const store = createStore(
  equipsPage,
  applyMiddleware(
    createLogger(),
    thunkMiddleware,
  ),
);

// Populate data
// This should not be factored out,  
// different pages might need different urls or versions
store.dispatch(fetchDataRequest(
  DATA_CATEGORIES.EQUIPS, "/api/v1/equips/"));
store.dispatch(fetchDataRequest(
  DATA_CATEGORIES.MATERIALS, "/api/v1/materials/"));

const App = () => (
  <div className="flexrow">
    <div className="flexcolumn">
      <EquipCategoryDropdown />
      <EquipSelectorList />
    </div>
    <div className="flexcolumn">
      <EquipLevelComparisonViewer />
    </div>
  </div>
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
);
