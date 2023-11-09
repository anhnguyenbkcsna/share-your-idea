import axios from 'axios'

const backend = '172.16.16.57:8000'

export const createNewIdea = async (ideaObj) => {
  return await axios
    .post(`${backend}/idea`, ideaObj)
    .then((res) => {
      console.log('res', res)
      return res
    })
    .catch((err) => {
      console.log('err', err)
      return err
    })
}
