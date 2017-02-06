import fetch from 'isomorphic-fetch';
import fetchEquipsBegin from './fetchEquipsBegin';
import fetchEquipsError from './fetchEquipsError';
import fetchEquipsSuccess from './fetchEquipsSuccess';
import receiveEquips from './receiveEquips';

export default function fetchEquipsRequest() { 
  return dispatch => {
    dispatch(fetchEquipsBegin());
    return fetch('/api/v1/equips/')
      .then(
        response => (response.json()),
        error => (dispatch(fetchEquipsError(error))))
      .then(json => {
        dispatch(fetchEquipsSuccess());
        dispatch(receiveEquips(json));
      });
  };
}