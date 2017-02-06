import ACTION_TYPES from '../constants/actionTypes.js'

export default function setEquipDataDisplayHigherLevel(level) {
  return {
    type: ACTION_TYPES.SET_EQUIP_DATA_DISPLAY_HIGHER_LEVEL,
    level: level
  };
}
