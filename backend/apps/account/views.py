from rest_framework.response import Response
from utils.utils import connect_db, validate_google_id_token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from .models import Account
from utils.constants import Role
from rest_framework import viewsets
from bson.objectid import ObjectId
from rest_framework.decorators import action
from utils.crud import CrudHelper
from customs.authentication import CustomAuthentication
from customs.db_connection import db_connection
from .serializers import InnovatorSerializer, CompanySerializer


class AccountViewSet(viewsets.ViewSet):
    collection = db_connection.get_collection("profile")
    permission_classes = (IsAdminUser,)
    authentication_classes = [CustomAuthentication]
    queryset = Account.objects.all()
    ENT_TYPE = "account"

    @action(detail=False, methods=["GET"], url_path=r"accounts")
    def users(self, request):
        return CrudHelper.get_all(self.collection, self.ENT_TYPE)

    @action(detail=False, methods=["GET", "PATCH"], url_path=r"accounts/(?P<id>[^/.]+)")
    def user(self, request, id=None):
        if not id:
            return Response({"message": f"Cannot find {self.ENT_TYPE}"}, status=400)
        if request.method == "GET":
            return CrudHelper.get_by_id(id, self.collection, self.ENT_TYPE)
        elif request.method == "PATCH":
            role = self.collection.find_one({"_id": ObjectId(id)})["role"]
            if role == Role.INNOVATOR:
                serializer = InnovatorSerializer(data=request.data, partial=True)
            if role == Role.COMPANY:
                serializer = CompanySerializer(data=request.data, partial=True)
            return CrudHelper.patch(id, self.collection, serializer, self.ENT_TYPE)
    
    @action(detail=False, methods=["GET"], permission_classes=[IsAuthenticated], url_path=r"accounts/profile")
    def profile(self, request):
        id = request._auth["user_id"]
        return CrudHelper.get_by_id(id, self.collection, self.ENT_TYPE)

    @action(detail=False, methods=["POST"], permission_classes=[AllowAny], url_path=r"accounts/auth")
    def auth(self, request):
        check, gg_response = validate_google_id_token(request.data.get("id_token"))
        # role = request.data.get("role")

        # Validate google ID token
        if not check:
            return Response({"message": gg_response}, status=400)

        # Validate role
        # if not (role in Role.values()):
        #     return Response({"message": "Invalid role"}, status=400)

        # Find in database
        res = self.collection.find_one({"email": gg_response["email"]})

        if res:
            _id = str(res["_id"])
        else:
            # Insert if not found
            result = self.collection.insert_one(
                {"name": gg_response["name"], "email": gg_response["email"], "role": res["role"]}
            )
            _id = result.inserted_id

        token = RefreshToken.for_user(Account(_id=_id))
        # query_res = self.collection.find_one({"_id": ObjectId(_id)})
        return Response(
            {
                # "id": _id,
                "name": gg_response["name"],
                "email": gg_response["email"],
                "role": res["role"],
                "refresh": str(token),
                "access": str(token.access_token),
            },
            status=200,
        )
