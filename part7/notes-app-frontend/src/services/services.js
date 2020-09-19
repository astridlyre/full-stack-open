import axios from 'axios'

const baseUrl = 'http://localhost:3001/api'

const getNotes = async () => {
  const response = await axios.get(`${baseUrl}/notes`)
  return response.data
}

const getUsers = async () => {
  const response = await axios.get(`${baseUrl}/users`)
  return response.data
}

const postNote = async (payload, token) => {
  const response = await axios.post(`${baseUrl}/notes`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const putLike = async (payload, token) => {
  const response = await axios.put(`${baseUrl}/notes/${payload.id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const deleteNote = async (id, token) => {
  const response = await axios.delete(`${baseUrl}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const postLogin = async (username, password) => {
  const response = await axios.post(`${baseUrl}/login`, {
    username,
    password,
  })
  return response.data
}

const postUser = async newUser => {
  const response = await axios.post(`${baseUrl}/users`, newUser)
  return response.data
}

export {
  getNotes,
  getUsers,
  postNote,
  putLike,
  deleteNote,
  postLogin,
  postUser,
}
