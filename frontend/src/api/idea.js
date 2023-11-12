import axios from 'axios'
import { deployedAPI } from '../utils/form.constants'

const backend = 'http://127.0.0.1:8000'

export const createNewIdea = async (ideaObj) => {
  const flattenIdeaObj = {}
  Object.assign(flattenIdeaObj, ...Object.values(ideaObj))

  const formData = new FormData()

  // stringify all fields except files
  for (let key in flattenIdeaObj)
  {
    if (key === 'files') continue
    formData.append(key, JSON.stringify(flattenIdeaObj[key]))
  }

  // append files
  for (let file of flattenIdeaObj.files)
  {
    formData.append('files', file.originFileObj, file.name)
  }

  return await axios
    .post(`${backend}/idea`, formData, {
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
