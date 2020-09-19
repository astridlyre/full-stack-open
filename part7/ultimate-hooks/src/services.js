import axios from 'axios'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async baseUrl => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (baseUrl, newObj) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newObj, config)
  return res.data
}

const update = async (baseUrl, id, newObj) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObj)
  return res.data
}

export default { getAll, create, update, setToken }
