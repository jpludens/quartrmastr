import ACTION_TYPES from '../constants/actionTypes.js'

export default function fetchDataError(category, error) {
  return {
    type: ACTION_TYPES.FETCH_DATA_ERROR,
    category: category,
    error: error,
  };
}
