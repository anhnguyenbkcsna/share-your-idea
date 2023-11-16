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
    .post(`${deployedAPI}/company`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
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
