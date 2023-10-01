from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .serializers import FileSerializer
from utils.utils import parse_json, connect_db
from bson.objectid import ObjectId
from django.conf import settings
import datetime
import boto3


class FileUploadApiView(APIView):
    db = connect_db()
    collection = db.get_collection("idea_file")
    serializer_class = FileSerializer

    def get(self, request, id=None):
        if id:
            obj = self.collection.find_one({"_id": ObjectId(id)})
            return Response({"message": "Got a file", "data": parse_json(obj)})
        allFiles = parse_json(self.collection.find({}))
        return Response({"message": "All files", "data": allFiles})

    def post(self, request):
        # Another approach: Looping over UploadedFile.chunks() instead of using read() ensures that large files don't overwhelm your system's memory
        serializer = FileSerializer(data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            for request_file in request.FILES.getlist("files"):
                path = default_storage.save(
                    request_file.name, ContentFile(request_file.read())
                )
                data = {
                    "files": path,
                    "created_at": datetime.datetime.utcnow(),
                }
                self.collection.insert_one(parse_json(data))
            return Response({"message": "New file is added"})

    def delete(self, request, id=None):
        try:
            if id:
                self.collection.find_one_and_delete({"_id": ObjectId(id)})
                return Response({"message": "File is deleted"})
            else:
                self.collection.delete_many({})
                return Response({"message": "All files are deleted"})
        except:
            return Response({"message": "File is not found"})