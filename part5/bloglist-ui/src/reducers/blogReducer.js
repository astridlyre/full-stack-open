/* eslint-disable indent */
// state reducer
import {
  deleteBlogEntry,
  getData,
  postNewBlog,
  putBlog,
} from '../services/services'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ENTRY':
      return state.concat(action.data)
    case 'DEL_ENTRY':
      return state.filter(entry => entry.id !== action.data)
    case 'UPDATE_ENTRY':
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
export const createEntry = (title, author, url, blurb, currentUser) => {
  return async dispatch => {
    const newEntry = await postNewBlog(
      createBlogObj(title, author, url, blurb),
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

export const createBlogObj = (title, author, url, blurb) => ({
  title,
  author,
  url,
  blurb,
})

export const deleteEntry = (id, token) => {
  return async dispatch => {
    await deleteBlogEntry(id, token)
    dispatch({ type: 'DEL_ENTRY', data: id })
  }
}

export const createNewLike = (data, currentUser) => {
  return async dispatch => {
    const updatedBlog = data.likes.includes(currentUser.id)
      ? {
          ...data,
          likes: [...data.likes].filter(like => like !== currentUser.id),
        }
      : { ...data, likes: [...data.likes].concat(currentUser.id) }

    const response = await putBlog(updatedBlog, currentUser.token)
    dispatch({
      type: 'UPDATE_ENTRY',
      data: { ...response, user: userInfoExtractor(data) },
    })
  }
}

export const createNewComment = (data, comment, token) => {
  return async dispatch => {
    const updatedBlog = { ...data, comments: data.comments.concat(comment) }
    const response = await putBlog(updatedBlog, token)
    dispatch({
      type: 'UPDATE_ENTRY',
      data: { ...response, user: userInfoExtractor(data) },
    })
  }
}

export const populateEntries = () => {
  return async dispatch => {
    const entries = await getData()
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
