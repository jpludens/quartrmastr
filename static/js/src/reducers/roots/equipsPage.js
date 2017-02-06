import { combineReducers } from 'redux';
import dataStatus from '../dataStatus.js';
import equips from '../equips.js';
import materials from '../materials.js';
import equipDataDisplay from '../equipDataDisplay.js';
import equipFilterCategory from '../equipFilterCategory.js';

const equipsPage = combineReducers({
  dataStatus,
  equips,
  materials,
  equipDataDisplay,
  equipFilterCategory,
});

export default equipsPage;
