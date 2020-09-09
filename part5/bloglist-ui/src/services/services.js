import axios from 'axios'

const baseUrl = '/api'

const getBlogs = async () => {
  const response = await axios.get(`${baseUrl}/blogs`)
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

const putNewLike = async (payload, token) => {
  const response = await axios.put(`${baseUrl}/blogs/${payload.id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

const getLogin = async (username, password) => {
  const response = await axios.post(`${baseUrl}/login`, {
    username: username,
    password: password,
  })
  return response.data
}

const postNewUser = async newUser => {
  const response = await axios.post(`${baseUrl}/users`, newUser)
  return response.data
}

const deleteBlogEntry = async (blogId, userId, token) => {
  const response = await axios.delete(`${baseUrl}/blogs/${blogId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export {
  getBlogs,
  getLogin,
  postNewBlog,
  deleteBlogEntry,
  postNewUser,
  putNewLike,
}
