import ACTION_TYPES from '../constants/actionTypes.js'

export default function fetchEquipsError(error) {
  return {
    type: ACTION_TYPES.FETCH_EQUIPS_FAILURE,
    error: error
  };
}
