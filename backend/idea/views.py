from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .serializers import IdeaSerializer
from utils.utils import parse_json, connect_db
from utils.crud import CrudHelper
from bson.objectid import ObjectId
from django.conf import settings
from pymongo.collection import ReturnDocument
import datetime
import boto3
from rest_framework.permissions import IsAuthenticated, AllowAny
from auth.authentication import CustomAuthentication


class IdeaApiView(APIView):
    db = connect_db()
    collection = db.get_collection("idea_detail")
    serializer_class = IdeaSerializer
    ENT_TYPE = "idea"
    permission_classes = (AllowAny,)
    authentication_classes = [CustomAuthentication]

    def get(self, request):
        id = request.query_params.get("id")
        if not id:
            return CrudHelper.get_all(self.collection, self.ENT_TYPE)

        return CrudHelper.get_by_id(id, self.collection, self.ENT_TYPE)

    def post(self, request):
        serializer = IdeaSerializer(data=request.data)
        file_list = request.FILES.getlist("files")
        return CrudHelper.post_with_file(
            self.collection, serializer, file_list, self.ENT_TYPE
        )

    def patch(self, request):
        serializer = IdeaSerializer(data=request.data, partial=True)
        id = request.query_params.get("id")
        file_list = request.FILES.getlist("files")

        return CrudHelper.patch_with_file(
            id, self.collection, serializer, file_list, self.ENT_TYPE
        )

    def delete(self, request):
        id = request.query_params.get("id")
        return CrudHelper.delete(id, self.collection, self.ENT_TYPE)
