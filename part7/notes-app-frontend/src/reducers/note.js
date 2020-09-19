import { postNote, putLike, getNotes, deleteNote } from '../services/services'
import { notify, nobj } from './notification'

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return state.concat(action.data)
    case 'DEL_NOTE':
      return state.filter(note => note.id !== action.data)
    case 'NEW_LIKE':
      return state.map(note =>
        note.id === action.data.id ? action.data : note
      )
    case 'POPULATE':
      return action.data
    default:
      return state
  }
}

export const createNote = (title, content, currentUser) => {
  return async dispatch => {
    const newNote = await postNote({ title, content }, currentUser.token)
    dispatch({
      type: 'NEW_NOTE',
      data: {
        ...newNote,
        user: {
          name: currentUser.name,
          id: currentUser.id,
          username: currentUser.username,
        },
      },
    })
    dispatch(notify(nobj(`Created new note: "${title}"!`), 3))
  }
}

export const userInfoExtractor = note => ({
  username: note.user.username,
  id: note.user.id,
  name: note.user.name,
})

export const createLike = (data, token) => {
  return async dispatch => {
    const response = await putLike(data, token)
    dispatch({
      type: 'NEW_LIKE',
      data: {
        ...response,
        user: userInfoExtractor(data),
      },
    })
  }
}

export const delNote = (id, token) => {
  return async dispatch => {
    await deleteNote(id, token)
    dispatch({ type: 'DEL_NOTE', data: id })
    dispatch(notify(nobj('Deleted note', 'red'), 3))
  }
}

export const populate = () => {
  return async dispatch => {
    const notes = await getNotes()
    dispatch({
      type: 'POPULATE',
      data: notes,
    })
  }
}

export default noteReducer
