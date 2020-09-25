import { client, POPULATE_NUMS, CREATE_PERSON, DEL_PERSON } from '../services'

const numbersReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NUM':
      return state.concat(action.data)
    case 'DEL_NUM':
      return state.filter(n => n.id !== action.data.id)
    case 'UPDATE_NUM':
      return state.map(n => (n.id === action.data.id ? action.data : n))
    case 'POPULATE_NUMS':
      return action.data
    default:
      return state
  }
}

export const newNum = num => {
  return async dispatch => {
    const res = await client.mutate({
      mutation: CREATE_PERSON,
      variables: num,
    })
    dispatch({
      type: 'NEW_NUM',
      data: res.data.addPerson,
    })
  }
}

export const delNum = id => {
  return async dispatch => {
    const res = await client.mutate({
      mutation: DEL_PERSON,
      variables: { id },
    })
    dispatch({
      type: 'DEL_NUM',
      data: res.data.delPerson,
    })
  }
}

export const updateNum = num => {
  return async dispatch => {
    const updatedNum = await num
    dispatch({
      type: 'UPDATE_NUM',
      data: updatedNum,
    })
  }
}

export const populateNums = () => {
  return async dispatch => {
    const res = await client.query({ query: POPULATE_NUMS })
    dispatch({
      type: 'POPULATE_NUMS',
      data: res.data.allPersons,
    })
  }
}

export default numbersReducer
