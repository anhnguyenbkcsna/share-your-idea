from rest_framework.response import Response
from utils.utils import connect_db, validate_google_id_token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import Account
from utils.constants import Role
from rest_framework import viewsets
from bson.objectid import ObjectId
from rest_framework.decorators import action
from utils.crud import CrudHelper
from .serializers import InnovatorSerializer, CompanySerializer


class AccountViewSet(viewsets.ViewSet):
    db = connect_db()
    collection = db.get_collection("profile")
    permission_classes = (AllowAny,)
    queryset = Account.objects.all()
    ENT_TYPE = "account"

    @action(detail=False, methods=["GET"], permission_classes=[IsAdminUser])
    def users(self, request):
        return CrudHelper.get_all(self.collection, self.ENT_TYPE)

    @action(detail=False, methods=["GET", "PATCH"], url_path=r"user/(?P<id>[^/.]+)")
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

    @action(detail=False, methods=["POST"])
    def auth(self, request):
        check, response = validate_google_id_token(request.data.get("id_token"))
        role = response.get("role")

        # Validate google ID token
        if not check:
            return Response({"message": response}, status=400)

        # Validate role
        if role not in Role.values():
            return Response({"message": "Invalid role"}, status=400)

        # Find in database
        res = self.collection.find_one({"email": response["email"], "role": role})

        if res:
            _id = str(res["_id"])
        else:
            # Insert if not found
            result = self.collection.insert_one(
                {"name": response["name"], "email": response["email"], "role": role}
            )
            _id = result.inserted_id

        token = RefreshToken.for_user(Account(_id=_id))
        return Response(
            {
                "refresh": str(token),
                "access": str(token.access_token),
            },
            status=200,
        )
