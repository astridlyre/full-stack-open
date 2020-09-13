const filterReducer = (state = false, action) => {
  switch (action.type) {
    case 'FILTER_LIKES':
      return true
    case 'FILTER_RECENT':
      return false
    default:
      return state
  }
}

export const filterHelper = value => ({
  type: value ? 'FILTER_LIKES' : 'FILTER_RECENT',
})

export default filterReducer
