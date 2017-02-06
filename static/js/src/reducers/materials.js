import ACTION_TYPES from '../constants/actionTypes.js';
import DATA_CATEGORIES from '../constants/dataCategories.js';
import Material from '../classes/Material.js';
import getMapById from '../utils/getMapById.js';

export default function equips(state = new Map(), action) {
  if (action.type == ACTION_TYPES.RECEIVE_DATA &&
      action.category == DATA_CATEGORIES.MATERIALS) {
    return getMapById(action.data.map(rawData => new Material(
      rawData.id,
      rawData.name,
      rawData.gold)
    ));
  }
  return state;
}
