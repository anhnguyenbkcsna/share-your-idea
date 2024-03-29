import axios from 'axios'
import { contestEndpoint } from '../utils/api.constants'

export const getContestList = () => {
  return axios
    .get(`${contestEndpoint}`)
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
    .get(`${contestEndpoint}${id}/`)
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
    .post(`${contestEndpoint}`, data)
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((err) => {
      console.log('Error', err)
      return null
    })
}


