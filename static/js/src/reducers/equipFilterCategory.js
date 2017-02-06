import EQUIP_FILTER_CATEGORIES from '../constants/equipFilterCategories.js';
import ACTION_TYPES from '../constants/actionTypes.js';

export default function equipFilterCategory(state = EQUIP_FILTER_CATEGORIES.ALL_EQUIPS, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_EQUIP_FILTER_CATEGORY:
      return action.equipFilterCategory;
    default:
      return state;
  }
}
