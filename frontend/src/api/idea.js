import axios from 'axios'
import { deployedAPI } from '../utils/form.constants'
import { ideaEndpoint } from '../utils/api.constants'

const backend = 'http://127.0.0.1:8000'

export const createNewIdea = async (ideaObj) => {
  const flattenIdeaObj = ideaObj
  console.log('ideaObj', ideaObj)

  const formData = new FormData()

  for (let key in flattenIdeaObj)
  {
    if (key === 'files') {continue}
    formData.append(key, JSON.stringify(flattenIdeaObj[key]))
  }

  if (flattenIdeaObj.files)
  {
    // append files
    for (let file of flattenIdeaObj.files)
    {
      formData.append('files', file.originFileObj, file.name)
    }
  }

  return await axios
    .post(`${deployedAPI}/ideas/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
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


export const getIdeaOfCurrentUser = () => {
  const accessToken = localStorage.getItem('access_token')
  if (accessToken)
  {
    return axios
      .get(`${ideaEndpoint}current/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((res) => {
        console.log(res)
        return res
      })
      .catch((err) => {
        console.log(err)
        return err
      })
  }
  console.log('No access token found')
}
