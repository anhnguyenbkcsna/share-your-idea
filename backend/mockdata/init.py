from dotenv import load_dotenv
from pymongo import MongoClient, collection
from bson import json_util
from dotenv import load_dotenv, dotenv_values
import os
import json
from django.conf import settings
from . import data
from colorama import Fore, Back, Style

load_dotenv()

CONNECTION_STRING = os.getenv("CONNECTION_STRING")
client = MongoClient(CONNECTION_STRING)
instance = client.get_database("share-your-idea")

def print_success(message):
    print(Fore.GREEN + f'Success: {message}')

def print_error(message):
    print(Fore.RED + f'Error: {message}')

def print_warning(message):
    print(Fore.YELLOW + f'Warning: {message}')


# Idea
def gen_idea():
    count = 0
    for idea in data.idea_data:
        if (instance.get_collection("idea").find_one({"name": idea["name"]}) is not None):
            continue
        instance.get_collection("idea").insert_one(idea)
        count += 1
    if count == 0:
        print_warning("idea data already exists!!!")
    else:
        print_success(f"{count} idea data inserted!!!")

# Contest
def gen_contest():
    count = 0
    for contest in data.contest_data:
        if (instance.get_collection("contest").find_one({"name": contest["name"]}) is not None):
            continue
        instance.get_collection("contest").insert_one(contest)
        count += 1
    if count == 0:
        print_warning("contest data already exists!!!")
    else:
        print_success(f"{count} contest data inserted!!!")

def execute():
    try:
        gen_contest()
    except Exception as e:
        print_error(f"{e}")
    client.close()
