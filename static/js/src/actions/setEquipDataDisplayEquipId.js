import ACTION_TYPES from '../constants/actionTypes.js'

export default function setEquipDataDisplayEquipId(equipId) {
  return {
    type: ACTION_TYPES.SET_EQUIP_DATA_DISPLAY_EQUIP_ID,
    equipId: equipId
  };
}
