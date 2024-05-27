import { gapi } from "gapi-script"

export const initGoogleClient = () => {
  gapi.load("client:auth2", () => {
    gapi.client
      .init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/calendar.events",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
      })
      .then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
      })
      .catch((error) => {
        console.error("Error initializing Google client:", error)
      })
  })
}

const updateSigninStatus = (isSignedIn) => {
  // if (isSignedIn) {
  //     console.log("User signed in")
  // } else {
  //     console.log("User signed out")
  // }
}

export const createGoogleMeetEvent = (event) => {
  return gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: {
      summary: event.summary,
      description: event.description,
      start: {
        dateTime: event.start,
        timeZone: "Asia/Ho_Chi_Minh",
      },
      end: {
        dateTime: event.end,
        timeZone: "Asia/Ho_Chi_Minh",
      },
      conferenceData: {
        createRequest: {
          requestId: "sample123",
          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    },
    conferenceDataVersion: 1,
  })
}

export const signIn = () => {
  return gapi.auth2.getAuthInstance().signIn()
}

export const signOut = () => {
  return gapi.auth2.getAuthInstance().signOut()
}

export const isSignedIn = () => {
  try {
    return gapi.auth2.getAuthInstance().isSignedIn.get()
  } catch (error) {
    return false
  }
}
