import axios from 'axios'
import { deployedAPI } from '../utils/form.constants'
import { userEndPoint } from '../utils/api.constants'
import { localStorageConstant } from '../utils/global.constants'

export const getAllUsers = () => {
  const accessToken = localStorage.getItem(localStorageConstant.ACCESS_TOKEN)
  if (accessToken)
  {
    return axios
      .get(`${userEndPoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((res) => {
        console.log(res)
        return res.data.data
      })
      .catch((err) => {
        console.log(err)
        return []
      })
  }
  console.log('No access token found')
}