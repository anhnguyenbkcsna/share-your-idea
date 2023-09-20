from pymongo import MongoClient
from bson import json_util
from dotenv import load_dotenv
import os
import json


def parse_json(data):
    return json.loads(json_util.dumps(data))

def connect_db():
    load_dotenv()
    CONNECTION_STRING = os.getenv("CONNECTION_STRING")
    client = MongoClient(CONNECTION_STRING)
    return client.get_database("share-your-idea")