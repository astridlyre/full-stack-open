const filterReducer = (state = false, action) => {
  switch (action.type) {
    case 'FILTER_LIKES':
      return true
    case 'FILTER_NONE':
      return false
    default:
      return state
  }
}

export const filterLikes = bool => ({
  type: bool ? 'FILTER_LIKES' : 'FILTER_NONE',
})

export default filterReducer
