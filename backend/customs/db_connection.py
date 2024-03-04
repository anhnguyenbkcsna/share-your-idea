from pymongo import MongoClient, collection
from bson import json_util
from dotenv import load_dotenv, dotenv_values
import os
import json
from django.conf import settings


class DBConnection(object):
    def __new__(self):
        if not hasattr(self, 'instance'):
            self.instance = super(DBConnection, self).__new__(self)
        return self.instance
    
    def connect_db(self) -> MongoClient:
        load_dotenv()
        CONNECTION_STRING = os.getenv("CONNECTION_STRING")
        client = MongoClient(CONNECTION_STRING)
        return client.get_database("share-your-idea")
    
    def get_collection(self, collection_name) -> collection.Collection:
        return self.instance.get_collection(collection_name)

db_connection = DBConnection()
db_connection.instance = db_connection.connect_db()