/* eslint-disable indent */
// state reducer
import { getData } from '../services/services'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_USERS':
      return action.data
    default:
      return state
  }
}

export const populateUsers = () => {
  return async dispatch => {
    const users = await getData('users')
    dispatch({
      type: 'POPULATE_USERS',
      data: users,
    })
  }
}

export default usersReducer
