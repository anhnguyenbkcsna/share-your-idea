import axios from "axios"
import { contestEndpoint } from "../utils/api.constants"
import { localStorageConstant } from "../utils/global.constants"

export const getContestList = async () => {
  try {
    const res = await axios.get(`${contestEndpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    return res?.data?.data
  } catch (err) {
    console.log("Error", err)
    return null
  }
}

export const getContestById = async (id) => {
  // if (!id) {
  //   return null
  // }
  try {
    const res = await axios.get(`${contestEndpoint}${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    return res?.data?.data
  } catch (err) {
    console.log("Error", err)
    return null
  }
}

export const createContest = async (data) => {
  let formData = new FormData()
  for (let key in data) {
    if (typeof data[key] === "object") {
      formData.append(key, JSON.stringify(data[key]))
    } else formData.append(key, data[key])
    // {
    //   console.log('>> data[key]', data[key])
    //   formData.append(key, data[key], data[key].name)
    // }
    // else
    // {
    // }
  }
  // Log formdata
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1])
  }
  try {
    const res = await axios.post(`${contestEndpoint}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem(
          localStorageConstant.ACCESS_TOKEN
        )}`,
      },
    })
    console.log(res)
    return res
  } catch (err) {
    console.log("Error", err)
    return null
  }
}

export const contestSubmission = async (contestId) => {
  try {
    const res = await axios.get(`${contestEndpoint}${contestId}/submissions/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          localStorageConstant.ACCESS_TOKEN
        )}`,
      },
    })
    return res?.data?.data
  } catch (err) {
    console.log("Error", err)
    return null
  }
}

export const postContestSubmissionMark = async (data, contestId) => {
  try {
    console.log(
      `${contestEndpoint}${contestId}/submissions/${data.idea_id}/mark/`
    )
    const res = await axios.post(
      `${contestEndpoint}${contestId}/submissions/${data.idea_id}/mark/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            localStorageConstant.ACCESS_TOKEN
          )}`,
        },
      }
    )
    return res
  } catch (err) {
    console.log("Error", err)
    return null
  }
}

export const getContestSubmissionMark = async (contestId, ideaId) => {
  try {
    const res = await axios.get(
      `${contestEndpoint}${contestId}/submissions/${ideaId}/mark/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            localStorageConstant.ACCESS_TOKEN
          )}`,
        },
      }
    )
    return res
  } catch (err) {
    console.log("Error", err)
    return null
  }
}
