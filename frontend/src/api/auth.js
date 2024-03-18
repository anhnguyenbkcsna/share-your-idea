import axios from 'axios'
import { authEndpoint } from '../utils/api.constants'
import { localStorageConstant } from '../utils/global.constants'

export const isAuthenticated = async () => {
  return await axios
    .get(`${authEndpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(localStorageConstant.ACCESS_TOKEN),
      },
    })
    .then((res) => {
      return {
        authenticated: true,
        data: res.data.data
      }
    })
    .catch((err) => {
      console.log('err', err)
      return {
        authenticated: false
      }
    })
}

