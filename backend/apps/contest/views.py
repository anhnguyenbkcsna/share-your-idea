from rest_framework.response import Response
from utils.utils import connect_db, validate_google_id_token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from utils.constants import Role
from rest_framework import viewsets
from bson.objectid import ObjectId
from rest_framework.decorators import action
from utils.crud import CrudHelper
from customs.db_connection import db_connection
from customs.authentication import CustomAuthentication
from customs.response import CustomResponse
from .serializers import ContestSerializer


class ContestViewSet(viewsets.ViewSet):
    collection = db_connection.get_collection("contest")
    # permission_classes = (IsAdminUser,)
    # authentication_classes = [CustomAuthentication]
    # queryset = Account.objects.all()
    serializer_class = ContestSerializer
    
    @action(detail=False, methods=["GET"], url_path=r"contests")
    def get_all_contests(self, request):
      return Response({"message": "Welcome to contest"})
    
    @action(detail=False, methods=["POST"], url_path=r"contests")
    def create_contest(self, request):
      serializer = ContestSerializer(data=request.data)
      if serializer.is_valid(raise_exception=True):
        serializer.save()
        return CustomResponse(data=serializer.data)
      return Response({"message": "Welcome to contest"})

    # @action(detail=False, methods=["GET"], url_path=r"accounts")
    # def users(self, request):
    #     return CrudHelper.get_all(self.collection, self.ENT_TYPE)

    # @action(detail=False, methods=["GET", "PATCH"], url_path=r"accounts/(?P<id>[^/.]+)")
    # def user(self, request, id=None):
    #     if not id:
    #         return Response({"message": f"Cannot find {self.ENT_TYPE}"}, status=400)
    #     if request.method == "GET":
    #         return CrudHelper.get_by_id(id, self.collection, self.ENT_TYPE)
    #     elif request.method == "PATCH":
    #         role = self.collection.find_one({"_id": ObjectId(id)})["role"]
    #         if role == Role.INNOVATOR:
    #             serializer = InnovatorSerializer(data=request.data, partial=True)
    #         if role == Role.COMPANY:
    #             serializer = CompanySerializer(data=request.data, partial=True)
    #         return CrudHelper.patch(id, self.collection, serializer, self.ENT_TYPE)
