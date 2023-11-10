import axios from 'axios'
import { deployedAPI } from '../utils/form.constants'

export const createNewIdea = async (ideaObj) => {
  return await axios
    .post(`${deployedAPI}/idea`, JSON.stringify(ideaObj))
    .then((res) => {
      console.log('res', res)
      return res
    })
    .catch((err) => {
      console.log('err', err)
      return err
    })
}
