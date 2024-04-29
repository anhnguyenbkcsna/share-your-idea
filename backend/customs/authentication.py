from utils.utils import connect_db
from bson.objectid import ObjectId
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import authentication
from apps.account.models import Account
from .db_connection import db_connection


class CustomAuthentication(authentication.BaseAuthentication):
    collection = db_connection.get_collection("profile")

    def authenticate(self, request, username=None, password=None):
        jwt_authenticator = JWTAuthentication()

        header = jwt_authenticator.get_header(request)
        if header is None:
            return None

        raw_token = jwt_authenticator.get_raw_token(header)
        if raw_token is None:
            return None
        validated_token = jwt_authenticator.get_validated_token(raw_token)

        # print(validated_token.__dict__)
        return self.get_user(validated_token), validated_token

    def get_user(self, validated_token):
        user_id = validated_token["user_id"]
        res = self.collection.find_one({"_id": ObjectId(user_id)})
        user = Account(
            _id=user_id, name=res["name"], email=res["email"], role=res["role"]
        )
        return user
