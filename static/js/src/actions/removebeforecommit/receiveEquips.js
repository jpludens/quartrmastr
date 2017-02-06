import ACTION_TYPES from '../constants/actionTypes.js'

export default function receiveEquips(equips) {
  return {
    type: ACTION_TYPES.RECEIVE_EQUIPS,
    equips: equips
  };
}
