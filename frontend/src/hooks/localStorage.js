import { isUserAuthorized } from '../api/google'
import { localStorageConstant, userRoles } from '../utils/global.constants'

export const localStorageGetUser = () => {
  const apiToken = localStorage.getItem(localStorageConstant.API_TOKEN)
  return isUserAuthorized(apiToken).then((authorized) => {
    if (authorized === true) {
      return {
        name: localStorage.getItem(localStorageConstant.NAME),
        email: localStorage.getItem(localStorageConstant.EMAIL),
        role: userRoles.INNOVATOR,
      }
    } else {
      localStorage.clear()
      return null
    }
  })
}
