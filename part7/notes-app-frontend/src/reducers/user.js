import { postLogin, postUser } from '../services/services'
import { notify, nobj } from './notification'

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

export const newUser = (username, password, name) => {
  return async dispatch => {
    const response = await postUser({
      username,
      password,
      name,
    })
    localStorage.setItem('user', JSON.stringify(response))
    dispatch({ type: 'LOGIN', data: response })
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const user = await postLogin(username, password)
    localStorage.setItem('user', JSON.stringify(user))
    dispatch({ type: 'LOGIN', data: user })
    dispatch(notify(nobj(`Login successful - Hi, ${user.name}!`), 3))
  }
}

export const loginCurrentUser = () => {
  return async dispatch => {
    const user = localStorage.getItem('user')
    if (!user) return
    dispatch({ type: 'LOGIN', data: JSON.parse(user) })
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT' })
    dispatch(notify(nobj(`Logged out`), 3))
  }
}

export default userReducer
