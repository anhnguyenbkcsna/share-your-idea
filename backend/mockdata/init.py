from dotenv import load_dotenv
from pymongo import MongoClient, collection
from bson import json_util
from dotenv import load_dotenv, dotenv_values
import os
import json
from django.conf import settings
import data

load_dotenv()

CONNECTION_STRING = os.getenv("CONNECTION_STRING")
client = MongoClient(CONNECTION_STRING)
instance = client.get_database("share-your-idea")


# Contest
def gen_contest():
    for contest in data.contest_data:
        if (instance.get_collection("contest").find_one({"name": contest["name"]}) is not None):
            continue
        instance.get_collection("contest").insert_one(contest)
    print("Contest data inserted!!!")


try:
    gen_contest()
except Exception as e:
    print(f"Error: {e}")

client.close()
