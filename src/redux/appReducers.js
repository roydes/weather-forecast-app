import { 
    FETCH_FORECAST_REQUEST, 
    FETCH_FORECAST_FAILURE, 
    FETCH_FORECAST_SUCCESS
} from './appActions'

const defaultState = {
    pendingCompletation: false, 
    forecast: [], 
    error: null,
    location: null
}

export default function AppReducer(state = defaultState, action) {
    switch (action.type) {
        case FETCH_FORECAST_REQUEST:
        return {...state, pendingCompletation: true, location: action.location};

        case FETCH_FORECAST_SUCCESS:
        return {...state, pendingCompletation: false, forecast: action.response};

        case FETCH_FORECAST_FAILURE:
        return {...state, pendingCompletation: false, error: action.error};

        default:
        return state
  }
}