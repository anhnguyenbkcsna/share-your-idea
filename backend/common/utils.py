from pymongo import MongoClient
from bson import json_util
from dotenv import load_dotenv
import os
import json
import requests
import datetime
from django.conf import settings
from .constants import (
    GOOGLE_AUTH_SCOPES,
    GOOGLE_AUTH_CREDENTIALS,
    GOOGLE_ID_TOKEN_INFO_URL,
)
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build


def parse_json(data):
    return json.loads(json_util.dumps(data))


def connect_db():
    load_dotenv()
    CONNECTION_STRING = os.getenv("CONNECTION_STRING")
    client = MongoClient(CONNECTION_STRING)
    return client.get_database("share-your-idea")


def validate_google_id_token(id_token):
    response = requests.get(GOOGLE_ID_TOKEN_INFO_URL, params={"id_token": id_token})

    if not response.ok:
        return False, response.json()

    audience = response.json()["aud"]

    if audience != settings.GOOGLE_OAUTH2_CLIENT_ID:
        return False, "Invalid audience"

    return True, response.json()


def get_id_from_request(request):
    try:
        return request._auth["user_id"]
    except:
        return None


def create_google_meet(
    meeting_title: str, meeting_datetime: datetime, meeting_duration: int = 60
):
    def authenticate():
        # creds = None
        # if os.path.exists("token.json"):
        #     creds = Credentials.from_authorized_user_file("token.json")
        # if not creds or not creds.valid:
        #     if creds and creds.expired and creds.refresh_token:
        #         creds.refresh(Request())
        #     else:
        #         flow = InstalledAppFlow.from_client_secrets_file(
        #             GOOGLE_AUTH_CREDENTIALS, GOOGLE_AUTH_SCOPES
        #         )
        #         creds = flow.run_local_server(port=0)
        #     with open("token.json", "w") as token:
        #         token.write(creds.to_json())
        # return creds
        flow = InstalledAppFlow.from_client_secrets_file(
            GOOGLE_AUTH_CREDENTIALS, GOOGLE_AUTH_SCOPES
        )
        return flow.run_local_server(port=0)

    credentials = authenticate()
    service = build("calendar", "v3", credentials=credentials)
    event = {
        "summary": meeting_title,
        "description": "This is a test meeting created with the Google Calendar API.",
        "start": {
            "dateTime": meeting_datetime.isoformat(),
            "timeZone": "Asia/Ho_Chi_Minh",
        },
        "end": {
            "dateTime": (
                meeting_datetime + datetime.timedelta(minutes=meeting_duration)
            ).isoformat(),
            "timeZone": "Asia/Ho_Chi_Minh",
        },
        "conferenceData": {
            "createRequest": {"requestId": "1234567890"},
        },
    }

    event = (
        service.events()
        .insert(calendarId="primary", body=event, conferenceDataVersion=1)
        .execute()
    )

    calendar_link = event.get("htmlLink", "")
    meet_link = event.get("hangoutLink", "")

    print(f"Google Calendar: {calendar_link}")
    print(f"Google Meet: {meet_link}")
    return calendar_link, meet_link
