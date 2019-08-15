import axios from 'axios';

const pineapple = 'http://localhost:3000'

const api = axios.create({
  baseURL: pineapple
})

export const joinGroups = async (userId, groupId) => {
  const resp = await api.put(`users/${userId}/groups/${groupId}`)
  return resp.data
}

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', loginData)
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/users/', { user: registerData });
  debugger;
  return resp.data
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  console.log(token)
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/users/verify');
    return resp.data
  }
  return false;
}

export const readAllGroups = async () => {
  const resp = await api.get('/groups');
  return resp.data
}

export const removeGroupFromUser = async (userId, id) => {
  const resp = await api.delete(`/users/${userId}/groups/${id}`);
  return resp.data
}

export const createGroup = async (data) => {
  const resp = await api.post('/groups', { group: data })
  return resp.data
}

export const readAllPosts = async () => {
  const resp = await api.get('/posts');
  return resp.data
}