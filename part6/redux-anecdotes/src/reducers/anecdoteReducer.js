import { getAll, putVote, deleteOne, createNew } from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(anec =>
        anec.id !== action.data.id ? anec : action.data
      )
    case 'NEW_ANEC':
      return [action.data].concat(state)
    case 'POPULATE':
      return action.data
    case 'DEL':
      return state.filter(anec => anec.id !== action.data.id)
    default:
      return state
  }
}

export const populateState = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch({
      type: 'POPULATE',
      data: anecdotes,
    })
  }
}

export const makeVote = anec => {
  return async dispatch => {
    const updatedNote = await putVote({ ...anec, votes: anec.votes + 1 })
    dispatch({
      type: 'VOTE',
      data: updatedNote,
    })
  }
}

export const makeDelete = anec => {
  return async dispatch => {
    await deleteOne(anec)
    dispatch({
      type: 'DEL',
      data: anec,
    })
  }
}

export const makeAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await createNew(asObject(content))
    dispatch({
      type: 'NEW_ANEC',
      data: newAnecdote,
    })
  }
}

export default anecdoteReducer
