import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async payload => {
  const response = await axios.post(baseUrl, payload)
  return response.data
}

const putVote = async payload => {
  const response = await axios.put(`${baseUrl}/${payload.id}`, payload)
  return response.data
}

const deleteOne = async payload => {
  const response = await axios.delete(`${baseUrl}/${payload.id}`)
  return response.data
}

export { getAll, createNew, putVote, deleteOne }
