import fetch from 'isomorphic-fetch';
import fetchDataBegin from './fetchDataBegin';
import fetchDataError from './fetchDataError';
import fetchDataSuccess from './fetchDataSuccess';
import receiveData from './receiveData.js';

export default function fetchDataRequest(category, url) { 
  return dispatch => {
    dispatch(fetchDataBegin(category));
    return fetch(url).then(
      response => (response.json()
        .then(json => {
          dispatch(fetchDataSuccess(category));
          dispatch(receiveData(category, json));
        })
      ),
      error => (dispatch(fetchDataError(category, error)))
    );
  };
}
