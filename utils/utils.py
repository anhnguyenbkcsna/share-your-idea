from pymongo import MongoClient
from bson import json_util
import json

def parse_json(data):
    return json.loads(json_util.dumps(data))

def connect_db():
    CONNECTION_STRING = "mongodb+srv://manhnguyenkimewaza:manh4949@cluster0.iwnzpbk.mongodb.net/?retryWrites=true&w=majority"
    client = MongoClient(CONNECTION_STRING)
    return client.get_database("share-your-idea")