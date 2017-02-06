import ACTION_TYPES from '../constants/actionTypes.js'

export default function receiveData(category, data) {
  return {
    type: ACTION_TYPES.RECEIVE_DATA,
    category: category,
    data: data,
  };
}
