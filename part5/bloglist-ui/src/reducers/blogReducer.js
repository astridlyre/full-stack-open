/* eslint-disable indent */
// state reducer
import {
  deleteBlogEntry,
  getBlogs,
  postNewBlog,
  putNewLike,
} from '../services/services'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ENTRY':
      return state.concat(action.data)
    case 'DEL_ENTRY':
      return state.filter(entry => entry.id !== action.data)
    case 'NEW_LIKE':
      return state.map(entry =>
        entry.id === action.data.id ? action.data : entry
      )
    case 'POPULATE_ENTRIES':
      return action.data
    default:
      return state
  }
}

// helper functions
export const createEntry = (title, author, url, currentUser) => {
  return async dispatch => {
    const newEntry = await postNewBlog(
      createBlogObj(title, author, url),
      currentUser.token
    )
    dispatch({
      type: 'NEW_ENTRY',
      data: {
        ...newEntry,
        user: {
          name: currentUser.name,
          id: currentUser.id,
          username: currentUser.username,
        },
      },
    })
  }
}

export const createBlogObj = (title, author, url) => ({
  title,
  author,
  url,
})

export const deleteEntry = (id, token) => {
  return async dispatch => {
    await deleteBlogEntry(id, token)
    dispatch({ type: 'DEL_ENTRY', data: id })
  }
}

export const createNewLike = (data, token) => {
  return async dispatch => {
    const response = await putNewLike(data, token)
    dispatch({
      type: 'NEW_LIKE',
      data: { ...response, user: userInfoExtractor(data) },
    })
  }
}

export const populateEntries = () => {
  return async dispatch => {
    const entries = await getBlogs()
    dispatch({
      type: 'POPULATE_ENTRIES',
      data: entries,
    })
  }
}

export const userInfoExtractor = entry => ({
  username: entry.user.username,
  id: entry.user.id,
  name: entry.user.name,
})

export default blogReducer
