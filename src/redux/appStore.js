import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import fetchForecast  from './appActions'
import AppReducer from './appReducers'


const AppStore = createStore(
  AppReducer,
  applyMiddleware(
    thunkMiddleware,
  )
)
AppStore.dispatch(fetchForecast()).then(() => console.log(AppStore.getState()))
export default AppStore;