import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import commentReducer from '../reducers/comment'
import noteReducer from '../reducers/note'
import userReducer from '../reducers/user'
import notificationReducer from '../reducers/notification'
import filterReducer from '../reducers/filter'
import usersReducer from '../reducers/users'

const reducer = combineReducers({
  notes: noteReducer,
  currentUser: userReducer,
  comments: commentReducer,
  notification: notificationReducer,
  filterLikes: filterReducer,
  users: usersReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
