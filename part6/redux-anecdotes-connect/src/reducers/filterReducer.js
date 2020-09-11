const filterReducer = (state = { type: 'all', text: '' }, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, type: action.filter.type }
    case 'SET_FILTER_TEXT':
      return { ...state, text: action.filter.text }
    default:
      return state
  }
}

export const makeFilter = filter => ({
  type: 'SET_FILTER',
  filter: { type: filter },
})

export const makeFilterText = text => ({
  type: 'SET_FILTER_TEXT',
  filter: { text },
})

export default filterReducer
