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

export const makeNotification = (text, look) => ({
  type: 'SET_NOTIFICATION',
  notification: {
    text,
    look,
  },
})

export const makeClear = () => ({
  type: 'CLEAR_NOTIFICATION',
})

export default notificationReducer
