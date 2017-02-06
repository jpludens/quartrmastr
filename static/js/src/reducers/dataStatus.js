import ACTION_TYPES from '../constants/actionTypes.js';
import DATA_STATUSES from '../constants/dataStatuses.js';

const initial = {
  status: DATA_STATUSES.NOT_LOADED,
  error: null,
};

export default function dataStatus(state = initial, action) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_DATA_BEGIN:
      return {
        status: DATA_STATUSES.LOADING,
        error: null,
      };
    case ACTION_TYPES.FETCH_DATA_FAILURE:
      return {
        status: DATA_STATUSES.FAILED,
        error: null,
      };
    case ACTION_TYPES.FETCH_DATA_SUCCESS:
      return {
        status: DATA_STATUSES.LOADED,
        error: null,
      };
    default:
      return state;
  }
}
