from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from common.constants import Role
from rest_framework import viewsets
from bson.objectid import ObjectId
from rest_framework.decorators import action
from common.classes.crud_helper import CrudHelper
from config.db_connection import db_connection
from .serializers import ContestSerializer


class ContestViewSet(viewsets.ViewSet):
    collection = db_connection.get_collection("contest")
    # permission_classes = (IsAdminUser,)
    # authentication_classes = [CustomAuthentication]
    # queryset = Account.objects.all()
    serializer_class = ContestSerializer
    ENT_TYPE = "contest"
    
    @action(detail=False, methods=["GET", "POST"], url_path=r"contests")
    def get_contests(self, request):
      if request.method == "POST":
        serializer = ContestSerializer(data=request.data)
        return CrudHelper.post(self.collection, serializer, self.ENT_TYPE)
      
      return CrudHelper.get_all(self.collection, self.ENT_TYPE)
    
    
    # (?P<id>[^/.]+)
    @action(detail=False, methods=["GET"], url_path=r"contests/(?P<id>[a-z0-9]{24})")
    def crud_contest(self, request, id=None):
      if request.method == "GET":
        return CrudHelper.get_by_id(id, self.collection, self.ENT_TYPE)
