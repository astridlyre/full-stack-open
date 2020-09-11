const notificationReducer = (state = { text: '', look: '' }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { text: action.notification.text, look: action.notification.look }
    case 'CLEAR_NOTIFICATION':
      return { text: '', look: '' }
    default:
      return state
  }
}

export const notification = (text, look) => ({ text, look })

export const makeNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, time * 1000)
  }
}

export default notificationReducer
