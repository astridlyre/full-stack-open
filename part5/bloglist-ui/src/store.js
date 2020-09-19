import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import filterReducer from './reducers/filterReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
  entries: blogReducer,
  showLiked: filterReducer,
  currentUser: userReducer,
  notification: notificationReducer,
  users: usersReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
