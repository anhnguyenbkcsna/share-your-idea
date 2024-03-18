import axios from 'axios'
import { deployedAPI } from '../utils/form.constants'
import { ideaEndpoint } from '../utils/api.constants'
import { localStorageConstant } from '../utils/global.constants'

const backend = 'http://127.0.0.1:8000'

export const createNewIdea = async (ideaObj) => {
  const flattenIdeaObj = ideaObj
  console.log('ideaObj', ideaObj)

  const formData = new FormData()

  for (let key in flattenIdeaObj)
  {
    if (key === 'files') { continue }

    formData.append(key, JSON.stringify(flattenIdeaObj[key]))
    // if (typeof flattenIdeaObj[key] === 'object')
    // {
    //   formData.append(key, JSON.stringify(flattenIdeaObj[key]))
    // }
    // else
    // {
    //   formData.append(key, flattenIdeaObj[key])
    // }
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
        Authorization: `Bearer ${localStorage.getItem(localStorageConstant.ACCESS_TOKEN)}`,
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


export const getAllIdeas = () => {
  const accessToken = localStorage.getItem(localStorageConstant.ACCESS_TOKEN)
  if (accessToken)
  {
    return axios
      .get(`${ideaEndpoint}`, {
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



export const getIdeaOfCurrentUser = () => {
  const accessToken = localStorage.getItem(localStorageConstant.ACCESS_TOKEN)
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
        return res.data
      })
      .catch((err) => {
        console.log(err)
        return []
      })
  }
  console.log('No access token found')
}
