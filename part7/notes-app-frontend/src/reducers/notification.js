const notificationReducer = (
  state = { text: '', look: '', currentTimeout: null },
  action
) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.currentTimeout) clearTimeout(state.currentTimeout)
      return {
        text: action.notification.text,
        look: action.notification.look,
        currentTimeout: action.notification.currentTimeout,
      }
    case 'CLEAR_NOTIFICATION':
      return { text: '', look: '', currentTimeout: null }
    default:
      return state
  }
}

export const nobj = (text, look = 'green') => ({ text, look })

export const notify = ({ text, look }, time) => {
  return async dispatch => {
    const currentTimeout = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, time * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: { text, look },
      currentTimeout,
    })
  }
}

export default notificationReducer
