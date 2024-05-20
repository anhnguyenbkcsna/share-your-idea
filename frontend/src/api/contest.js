import axios from 'axios'
import { contestEndpoint } from '../utils/api.constants'

export const getContestList = () => {
  return axios
    .get(`${contestEndpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then((res) => {
      return res?.data?.data
    })
    .catch((err) => {
      console.log('Error', err)
      return null
    })
}

export const getContestById = (id) => {
  // if (!id) {
  //   return null
  // }
  return axios
    .get(`${contestEndpoint}${id}/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then((res) => {
      return res?.data?.data
    })
    .catch((err) => {
      console.log('Error', err)
      return null
    })
}

export const createContest = (data) => {
  return axios
    .post(`${contestEndpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    }, data)
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((err) => {
      console.log('Error', err)
      return null
    })
}


