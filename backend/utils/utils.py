from pymongo import MongoClient
from bson import json_util
from dotenv import load_dotenv
import os
import json
import requests
from django.conf import settings
import jwt


def parse_json(data):
    return json.loads(json_util.dumps(data))


def connect_db():
    load_dotenv()
    CONNECTION_STRING = os.getenv("CONNECTION_STRING")
    client = MongoClient(CONNECTION_STRING)
    return client.get_database("share-your-idea")


def validate_google_id_token(id_token):
    GOOGLE_ID_TOKEN_INFO_URL = "https://www.googleapis.com/oauth2/v3/tokeninfo"
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
