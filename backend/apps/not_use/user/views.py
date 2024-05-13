from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from common.utils import parse_json, connect_db, validate_google_id_token
from bson.objectid import ObjectId
from django.conf import settings
from common.classes import CrudHelper
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from bson.objectid import ObjectId


class User:
    def __init__(self, id: str):
        self._id = ObjectId(id)

    pass


class UserApiView(APIView):
    db = connect_db()

    # class UserSerializer(serializers.Serializer):
    #     email = serializers.EmailField()
    #     name = serializers.CharField(required=True)
    #     role = serializers.CharField(required=True)
    #     id_token = serializers.CharField(required=True)

    def get(self, request):
        check, response = validate_google_id_token(request.data.get("id_token"))

        if not check:
            return Response({"message": response}, status=400)

        if request.data.get("role") == "innovator":
            collection = self.db.get_collection("innovator_profile")

            res = collection.find_one(
                {"name": response["name"], "email": response["email"]}
            )
            if res:
                token = RefreshToken.for_user(User(str(res["_id"])))
            else:
                result = collection.insert_one(
                    {"name": response["name"], "email": response["email"]}
                )
                token = RefreshToken.for_user(User(result.inserted_id))
            return Response(
                {
                    "refresh": str(token),
                    "access": str(token.access_token),
                },
                status=200,
            )
        # elif role is 'company':
        #     collection = self.db.get_collection("company_profile")
        #     collection.insert_one({
        #         "name": name,
        #         "email": email
        #     })
        #     pass
        else:
            return Response({"message": "Invalid role"}, status=400)

