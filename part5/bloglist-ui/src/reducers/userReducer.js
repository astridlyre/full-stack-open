import { getLogin, postNewUser } from '../services/services'
import { makeNotification, notification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const createNewUser = (username, password, name) => {
  return async dispatch => {
    const response = await postNewUser({
      username,
      password,
      name,
    })
    localStorage.setItem('user', JSON.stringify(response))
    dispatch({ type: 'LOGIN', data: response })
  }
}

export const createLogin = (username, password) => {
  return async dispatch => {
    const user = await getLogin(username, password)
    localStorage.setItem('user', JSON.stringify(user))
    dispatch({ type: 'LOGIN', data: user })
    dispatch(
      makeNotification(notification(`login successful - hi, ${user.name}!`), 3)
    )
  }
}

export const loginCurrentUser = () => {
  return async dispatch => {
    const user = localStorage.getItem('user')
    if (!user) return
    dispatch({ type: 'LOGIN', data: JSON.parse(user) })
  }
}

export const createLogout = () => {
  return async dispatch => {
    await localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT' })
    dispatch(makeNotification(notification('logged out'), 3))
  }
}

export default userReducer
