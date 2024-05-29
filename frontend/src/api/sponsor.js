import axios from "axios"
import { deployedAPI } from "../utils/form.constants"
import { sponsorEventEndpoint } from "../utils/api.constants"
import { localStorageConstant } from "../utils/global.constants"

export const getAllPackage = () => {
  const accessToken = localStorage.getItem(localStorageConstant.ACCESS_TOKEN)
  if (accessToken) {
    return axios
      .get(`${sponsorEventEndpoint}`, {
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

export const getSponsorEventById = (packageId) => {
  const accessToken = localStorage.getItem(localStorageConstant.ACCESS_TOKEN)
  if (accessToken) {
    return axios
      .get(`${sponsorEventEndpoint}${packageId}/`, {
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

export const createNewSponsorEvent = (project) => {
  const accessToken = localStorage.getItem(localStorageConstant.ACCESS_TOKEN)
  if(accessToken) {
    return axios
      .post(`${sponsorEventEndpoint}`, project, {
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

export const createSponsorPackage = (eventId, packageObj) => {
  const accessToken = localStorage.getItem(localStorageConstant.ACCESS_TOKEN)
  if (accessToken) {
    return axios
      .post(`${sponsorEventEndpoint}${eventId}/packages/`, packageObj, {
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

export const getSponsorPackageBySponsorId = (sponsorId) => {
  const accessToken = localStorage.getItem(localStorageConstant.ACCESS_TOKEN)
  if (accessToken) {
    return axios
      .get(`${sponsorEventEndpoint}${sponsorId}/packages/`, {
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
      .patch(`${sponsorEventEndpoint}${packageObj.id}/`, packageObj, {
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