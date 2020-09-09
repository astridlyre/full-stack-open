/* eslint-disable indent */
// state reducer
const reducer = (
  state = { currentUser: null, entries: [], showLiked: false },
  action
) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.data }
    case 'LOGOUT':
      return { ...state, currentUser: null }
    case 'NEW_ENTRY':
      return { ...state, entries: state.entries.concat(action.data) }
    case 'DEL_ENTRY':
      return {
        ...state,
        entries: state.entries.filter(entry => entry.id !== action.data),
      }
    case 'NEW_LIKE':
      return {
        ...state,
        entries: state.entries.map(entry =>
          entry.id === action.data.id ? action.data : entry
        ),
      }
    case 'POPULATE_ENTRIES':
      return { ...state, entries: action.data }
    case 'FILTER_LIKES':
      return { ...state, showLiked: true }
    case 'FILTER_RECENT':
      return { ...state, showLiked: false }
    default:
      return state
  }
}

// helper functions
export const createEntry = (data, userData) => ({
  type: 'NEW_ENTRY',
  data: {
    ...data,
    user: {
      name: userData.name,
      id: userData.id,
      username: userData.username,
    },
  },
})

export const createBlogObj = (title, author, url) => ({
  title,
  author,
  url,
})

export const createLogin = userData => ({ type: 'LOGIN', data: userData })

export const createLogout = () => ({ type: 'LOGOUT' })

export const deleteHelper = id => ({ type: 'DEL_ENTRY', data: id })

export const createNewLike = (data, userData) => ({
  type: 'NEW_LIKE',
  data: { ...data, user: userData },
})

export const populateEntries = data => ({
  type: 'POPULATE_ENTRIES',
  data: data,
})

export const userInfoExtractor = entry => ({
  username: entry.user.username,
  id: entry.user.id,
  name: entry.user.name,
})

export const createNewUser = (username, password, name) => ({
  username,
  password,
  name,
})

export const filterHelper = value => ({
  type: value ? 'FILTER_LIKES' : 'FILTER_RECENT',
})

export default reducer
