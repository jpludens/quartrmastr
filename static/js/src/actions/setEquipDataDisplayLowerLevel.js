import ACTION_TYPES from '../constants/actionTypes.js'

export default function setEquipDataDisplayLowerLevel(level) {
  return {
    type: ACTION_TYPES.SET_EQUIP_DATA_DISPLAY_LOWER_LEVEL,
    level: level
  };
}
