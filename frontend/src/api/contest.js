import axios from 'axios'
import { contestEndpoint } from '../utils/api.constants'

export const getContestById = async (id) => {
  if (!id) {
    return null
  }
  return await axios
    .get(`${contestEndpoint}${id}/`)
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log('Error', err)
      return null
    })
}
