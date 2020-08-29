import axios from "axios";
const baseUrl = "http://localhost:3001/numbers";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createNumber = (payload) => {
  const request = axios.post(baseUrl, payload);
  return request.then((response) => response.data);
};

const updateNumber = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteNumber = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, createNumber, deleteNumber, updateNumber };
