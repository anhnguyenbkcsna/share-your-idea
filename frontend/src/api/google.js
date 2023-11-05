import axios from 'axios'
import { gooleTokenInfo } from '../utils/form.constants'
import { validateGoogleResponse } from '../utils/validate'

export const isUserAuthorized = async (token) => {
  if (!token) {
    return false
  }
  return await axios
    .get(`${gooleTokenInfo}${token}`)
    .then((res) => {
      const validate = validateGoogleResponse(res, token)
      console.log('Google OAuth', validate)
      return validate
    })
    .catch((err) => {
      console.log('Google Error', err)
      return false
    })
}

export const createProfileApi = (body, successCallback, failCallback) => {
  const { data, files } = body
  axios
    .post('/user', {
      data,
      files,
    })
    .then((res) => {
      console.log('??? res', res)
      successCallback()
    })
    .catch((e) => {
      console.log('POST error', e)
      failCallback()
    })
}
