import ACTION_TYPES from '../constants/actionTypes.js'

export default function fetchDataSuccess(category) {
  return {
    type: ACTION_TYPES.FETCH_DATA_SUCCESS,
    category: category,
  };
}
