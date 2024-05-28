import axios from "axios"
import { deployedAPI } from "../utils/form.constants"
import { ideaEndpoint, serverAIEndPoint, sponsorPackageEndpoint } from "../utils/api.constants"
import { localStorageConstant } from "../utils/global.constants"

export const getAllPackage = () => {
  const accessToken = localStorage.getItem(localStorageConstant.ACCESS_TOKEN)
  if (accessToken) {
    return axios
      .get(`${sponsorPackageEndpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.log(err)
      })
  }
  console.log("No access token found")
}

export const getPackageById = (packageId) => {
  const accessToken = localStorage.getItem(localStorageConstant.ACCESS_TOKEN)
  if (accessToken) {
    return axios
      .get(`${sponsorPackageEndpoint}${packageId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const createNewPackage = (packageObj) => {
  const accessToken = localStorage.getItem(localStorageConstant.ACCESS_TOKEN)
  if(accessToken) {
    return axios
      .post(`${sponsorPackageEndpoint}`, packageObj, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const editPackage = (packageObj) => {
  const accessToken = localStorage.getItem(localStorageConstant.ACCESS_TOKEN)
  if (accessToken) {
    return axios
      .patch(`${sponsorPackageEndpoint}${packageObj.id}/`, packageObj, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.log(err)
      })
  }
}