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


class IdeaApiView(APIView):
    db = connect_db()
    collection = db.get_collection("idea_detail")
    serializer_class = IdeaSerializer
    ENT_TYPE = "idea"

    # def download_file(self, file_name):
    #     s3 = boto3.client(
    #         "s3",
    #         aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    #         aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    #     )

    #     with open(file_name, 'wb') as f:
    #         s3.download_fileobj(settings.AWS_STORAGE_BUCKET_NAME, file_name, f)
    #         f.close()

    #     s3.close()

    def get(self, request):
        id = request.query_params.get("id")
        if not id:
            return CrudHelper.get_all(self.collection, self.ENT_TYPE)
        
        return CrudHelper.get_by_id(id, self.collection, self.ENT_TYPE)


    def post(self, request):
        serializer = IdeaSerializer(data=request.data)
        file_list = request.FILES.getlist("files")
        return CrudHelper.post_with_file(self.collection, serializer, file_list, self.ENT_TYPE)


    def patch(self, request):
        serializer = IdeaSerializer(data=request.data, partial=True)
        id = request.query_params.get("id")
        file_list = request.FILES.getlist("files")
        
        return CrudHelper.patch(id, self.collection, serializer, file_list, self.ENT_TYPE)

    def delete(self, request):
        id = request.query_params.get("id")
        return CrudHelper.delete(id, self.collection, self.ENT_TYPE)
