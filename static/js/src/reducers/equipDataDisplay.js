import ACTION_TYPES from '../constants/actionTypes.js';

const initial = {
  equipId: null,
  lowerLevel: null,
  higherLevel: null,
};

export default function equipDataDisplay(state = initial, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_EQUIP_DATA_DISPLAY_EQUIP_ID:
      return {
        equipId: action.equipId,
        lowerLevel: 1,
        higherLevel: 2,
      };
    case ACTION_TYPES.SET_EQUIP_DATA_DISPLAY_LOWER_LEVEL:
      return Object.assign({}, state, {
        lowerLevel: action.level,
      });
    case ACTION_TYPES.SET_EQUIP_DATA_DISPLAY_HIGHER_LEVEL:
      return Object.assign({}, state, {
        higherLevel: action.level,
      });
    default:
      return state;
  }
}
