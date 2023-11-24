import axios from 'axios'
import { deployedAPI } from '../utils/form.constants'

const backend = 'http://127.0.0.1:8000'

export const createNewIdea = async (ideaObj) => {
  const flattenIdeaObj = ideaObj
  console.log('ideaObj', ideaObj)

  const formData = new FormData()

  for (let key in flattenIdeaObj)
  {
    if (key === 'files') continue
    formData.append(key, JSON.stringify(flattenIdeaObj[key]))
  }

  if (flattenIdeaObj.files) {
    // append files
    for (let file of flattenIdeaObj.files)
    {
      formData.append('files', file.originFileObj, file.name)
    }
  }

  return await axios
    .post(`${deployedAPI}/ideas`, formData, {
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
