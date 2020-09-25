import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import numbersReducer from '../reducers/numbers'
import userReducer from '../reducers/user'

const reducer = combineReducers({
  numbers: numbersReducer,
  currentUser: userReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
