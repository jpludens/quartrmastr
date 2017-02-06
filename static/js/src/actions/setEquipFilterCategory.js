import ACTION_TYPES from '../constants/actionTypes.js'

export default function setEquipFilterCategory(category) {
  return {
    type: ACTION_TYPES.SET_EQUIP_FILTER_CATEGORY,
    equipFilterCategory: category
  };
}
