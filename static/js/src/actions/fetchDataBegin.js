import ACTION_TYPES from '../constants/actionTypes.js'

export default function fetchDataBegin(category) {
  return {
    type: ACTION_TYPES.FETCH_DATA_BEGIN,
    category: category,
  };
}
