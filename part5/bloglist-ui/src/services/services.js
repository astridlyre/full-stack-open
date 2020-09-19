import axios from 'axios'

const baseUrl = 'http://localhost:3001/api'

const getData = async (type = 'blogs') => {
  const response = await axios.get(`${baseUrl}/${type}`)
  return response.data
}

const postNewBlog = async (payload, token) => {
  const response = await axios.post(`${baseUrl}/blogs`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const putBlog = async (payload, token) => {
  const response = await axios.put(`${baseUrl}/blogs/${payload.id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const getLogin = async (username, password) => {
  const response = await axios.post(`${baseUrl}/login`, {
    username,
    password,
  })
  return response.data
}

const postNewUser = async newUser => {
  const response = await axios.post(`${baseUrl}/users`, newUser)
  return response.data
}

const deleteBlogEntry = async (blogId, token) => {
  const response = await axios.delete(`${baseUrl}/blogs/${blogId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export { getData, getLogin, postNewBlog, deleteBlogEntry, postNewUser, putBlog }
