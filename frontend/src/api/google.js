import axios from 'axios'
import { createFormData } from '../utils/utils'
import { gooleTokenInfo } from '../utils/form.constants'
import { validateGoogleResponse } from '../utils/validate'
import { signupEndpoint } from '../utils/api.constants'

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
  // let newFormData = new FormData()
  // for (let key in data) {
  //   newFormData.append(key, JSON.stringify(data[key]))
  // }
  let newFormData = createFormData(data)
  console.log(newFormData)
  axios
    .post(signupEndpoint, newFormData)
    .then((res) => {
      console.log('??? res', res)
      successCallback()
    })
    .catch((e) => {
      console.log('POST error', e)
      failCallback()
    })
}
