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
from utils.crud import CrudHelper


class ContestViewSet(viewsets.ViewSet):
    collection = db_connection.get_collection("contest")
    # permission_classes = (IsAdminUser,)
    # authentication_classes = [CustomAuthentication]
    # queryset = Account.objects.all()
    serializer_class = ContestSerializer
    ENT_TYPE = "contest"
    
    @action(detail=False, methods=["GET"], url_path=r"list")
    def get_contests(self):
      return CrudHelper.get_all(self.collection, self.ENT_TYPE)
    
    @action(detail=False, methods=["GET", "POST"], url_path=r"(?P<id>[^/.]+)")
    def crud_contest(self, request, id):
      if request.method == "GET":
        return CrudHelper.get_by_id(id, self.collection, self.ENT_TYPE)
      elif request.method == "POST":
        serializer = ContestSerializer(data=request.data)
        return CrudHelper.post(self.collection, serializer, self.ENT_TYPE)
      return Exception("Method not allowed")
