from django.apps import AppConfig
from config.db_connection import db_connection
from common.mockdata import comments
from common.utils import random_int


class IdeaConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.idea"

    def ready(self):
        # self.run_ready()
        # ideas = db_connection.get_collection("idea")
        # for idea in ideas.find():
        #     if (idea.get("comments")):
        #         # delete all comments
        #         ideas.update_one({
        #             "_id": idea["_id"]
        #         }, {
        #             "$set": {
        #                 "comments": []
        #             }
        #         })
        return
    
    def run_ready(self):
        idea_coll = db_connection.get_collection("idea")
        innovator_coll = db_connection.get_collection("profile")

        idea_list = list(idea_coll.find())
        innovator_list = list(innovator_coll.find())

        idea_list_len = len(idea_list)
        innovator_list_len = len(innovator_list)
        comments_len = len(comments)

        for i in range(60):
            idea = idea_list[random_int(0, idea_list_len - 1)]
            innovator = innovator_list[random_int(0, innovator_list_len - 1)]
            comment = {
                "innovator_id": str(innovator["_id"]),
                "content": comments[random_int(0, comments_len - 1)],
            }
            idea_coll.update_one(
                {"_id": idea["_id"]},
                {"$push": {"comments": comment}},
            )
        print("Comments are added to ideas")
