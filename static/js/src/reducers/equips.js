import ACTION_TYPES from '../constants/actionTypes.js';
import DATA_CATEGORIES from '../constants/dataCategories.js';
import { equipFromObj } from '../classes/Equip.js';
import getMapById from '../utils/getMapById.js';

export default function equips(state = new Map(), action) {
  if (action.type == ACTION_TYPES.RECEIVE_DATA &&
      action.category == DATA_CATEGORIES.EQUIPS) {
    return getMapById(action.data.map(rawData => equipFromObj(rawData)));
  }
  return state;
}
