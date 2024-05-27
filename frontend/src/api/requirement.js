import axios from 'axios'
import { deployedAPI } from '../utils/form.constants'

export const createRequirement = async (obj) => {
  const formData = new FormData()

  for (let key in obj) {
    if (key === 'files') {
      continue
    }
    formData.append(key, JSON.stringify(obj[key]))
  }

  return await axios
    .post(`${deployedAPI}/requirements/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    .then((res) => {
      console.log('res', res)
      return res
    })
    .catch((err) => {
      console.log('err', err)
      return err
    })
}
