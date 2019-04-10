import fetch from 'cross-fetch'
import api from '../AppGlobals'


/*
 * action types
 */

export const FETCH_FORECAST_REQUEST = 'FETCH_FORECAST_REQUEST';
export const FETCH_FORECAST_FAILURE = 'FETCH_FORECAST_FAILURE';
export const FETCH_FORECAST_SUCCESS = 'FETCH_FORECAST_SUCCESS';

/*
 * action creators
 */

export function getRequestForecast(location) {
  return { type: FETCH_FORECAST_REQUEST, location }
}

export function getErrorForecast(error) {
    return { type: FETCH_FORECAST_FAILURE, error }
}

export function getResponseForecast(response) {
    return { type: FETCH_FORECAST_SUCCESS, response }
}

/**
 * Thunk action creator
 */

export default function fetchForecast(location={place: 'Earth', lat: 0, lng: 0}) {
    const lat = location.lat
    const lon = location.lng
    return function(dispatch) {
      dispatch(getRequestForecast(location));
      return fetch(`${api.url}lat=${lat}&lon=${lon}&appid=${api.key}`)
        .then(
          response => response.json(),
          error => dispatch(getErrorForecast(error))
        )
        .then(json => dispatch(getResponseForecast(json.list))
        )
    }
  }