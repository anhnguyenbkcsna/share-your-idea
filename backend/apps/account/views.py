from rest_framework.response import Response
from common.utils import validate_google_id_token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from .models import Account
from common.constants import Role
from rest_framework import viewsets
from bson.objectid import ObjectId
from rest_framework.decorators import action
from common.classes.crud_helper import CrudHelper
from config.authentication import CustomAuthentication
from config.db_connection import db_connection
from .serializers import InnovatorSerializer, CompanySerializer


class AccountViewSet(viewsets.ViewSet):
    collection = db_connection.get_collection("profile")
    permission_classes = (IsAdminUser,)
    authentication_classes = [CustomAuthentication]
    queryset = Account.objects.all()
    ENT_TYPE = "account"

    @action(
        detail=False,
        methods=["GET"],
        permission_classes=[IsAuthenticated],
        url_path=r"accounts",
    )
    def users(self, request):
        return CrudHelper.get_all(self.collection, self.ENT_TYPE)

    @action(
        detail=False,
        methods=["GET", "PATCH"],
        permission_classes=[IsAuthenticated],
        url_path=r"accounts/(?P<id>[^/.]+)",
    )
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

    @action(
        detail=False,
        methods=["GET"],
        permission_classes=[IsAuthenticated],
        url_path=r"accounts/profile",
    )
    def profile(self, request):
        id = request._auth["user_id"]
        return CrudHelper.get_by_id(id, self.collection, self.ENT_TYPE)

    @action(
        detail=False,
        methods=["POST"],
        permission_classes=[AllowAny],
        url_path=r"accounts/login",
    )
    def login(self, request):
        name = None
        email = None
        if request.data.get("email") and request.data.get("password"):
            email = request.data.get("email")
            password = request.data.get("password")
            res = self.collection.find_one({"email": email, "password": password})
            name = res["name"]
            if not res:
                return Response({"message": "Invalid email or password"}, status=400)
        else:
            check, gg_response = validate_google_id_token(request.data.get("id_token"))
            if not check:
                return Response({"message": gg_response}, status=400)
            else:
                name = gg_response["name"]
                email = gg_response["email"]

        res = self.collection.find_one({"email": email})
        if res:
            _id = str(res["_id"])
        else:
            # Insert if not found
            result = self.collection.insert_one(
                {
                    "name": name,
                    "email": email,
                    "role": res["role"] if res else Role.INNOVATOR,
                }
            )
            _id = result.inserted_id

        token = RefreshToken.for_user(Account(_id=_id))
        return Response(
            {
                "name": name,
                "email": email,
                "role": res["role"] if res else Role.INNOVATOR,
                "refresh": str(token),
                "access": str(token.access_token),
            },
            status=200,
        )

    @action(
        detail=False,
        methods=["GET"],
        permission_classes=[IsAuthenticated],
        url_path=r"accounts/auth",
    )
    def authenticate(self, request):
        return Response(
            {
                "message": "Authenticated",
                "data": {
                    "name": request.user.name,
                    "email": request.user.email,
                    "role": request.user.role,
                },
            },
            status=200,
        )
