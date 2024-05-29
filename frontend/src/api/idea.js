import axios from 'axios'
import { deployedAPI } from '../utils/form.constants'
import { ideaEndpoint, serverAIEndPoint, innovatorIdeasEndpoint } from '../utils/api.constants'
import { localStorageConstant } from '../utils/global.constants'

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
        return res.data.data
      })
      .catch((err) => {
        console.log(err)
        return []
      })
  }
  console.log('No access token found')
}

export const editIdea = async (ideaObj) => {
  const flattenIdeaObj = ideaObj
  console.log('ideaObj', ideaObj)

  const formData = new FormData()

  for (let key in flattenIdeaObj)
  {
    if (key === 'files') { continue }

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
    .patch(`${deployedAPI}/ideas/`, formData, {
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

export const getIdeaOfCurrentUser = async (userId) => {
  const accessToken = localStorage.getItem(localStorageConstant.ACCESS_TOKEN)
  return axios
    .get(`${innovatorIdeasEndpoint}${userId}/ideas/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    .then((res) => {
      return res.data.data
    })
    .catch((err) => {
      console.log(err)
      return []
    })
}

export const getIdeaById = async (ideaId) => {
  return await axios
    .get(`${ideaEndpoint}${ideaId}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(localStorageConstant.ACCESS_TOKEN)}`,
      }
    })
    .then((res) => {
      return res.data.data
    })
    .catch((err) => {
      console.log(err)
      return []
    })
}

export const sendIdeaToAIServer = async (ideaObj) => {
  ideaObj.outstand = [ideaObj.outstand]
  return await axios
    .post(`${serverAIEndPoint}`, JSON.stringify(ideaObj), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(localStorageConstant.ACCESS_TOKEN)}`,
        'Content-Type': 'application/json'
      },
    })
    .then((res) => {
      console.log('>> AI res:', res)
      return res.data.data.isValid
    })
    .catch((err) => {
      console.log(err)
      return err
    })
}

export const getTopKIdeas = async (requirement) => {
  return await axios
    .post(`${ideaEndpoint}ideas/topk/`, requirement ,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem(localStorageConstant.ACCESS_TOKEN)}`,
      }
    })
    .catch((err) => {
      console.log(err)
      return []
    })
}