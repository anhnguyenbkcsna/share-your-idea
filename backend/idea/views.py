from rest_framework.views import APIView
from .serializers import IdeaSerializer
from utils.utils import parse_json, connect_db
from utils.crud import CrudHelper
from rest_framework.permissions import IsAuthenticated, AllowAny
from auth.authentication import CustomAuthentication
from django.core.files.uploadedfile import InMemoryUploadedFile
import requests
import json


class IdeaApiView(APIView):
    db = connect_db()
    collection = db.get_collection("idea")
    serializer_class = IdeaSerializer
    ENT_TYPE = "idea"
    permission_classes = (AllowAny,)
    authentication_classes = [CustomAuthentication]

    def get(self, request):
        # payload = {
        #     'domain': json.dumps(['test']), 
        #     'professional': 'test'
        # }
        # requests.post('http://localhost:8080', data=payload)
        
        id = request.query_params.get("id")
        if not id:
            return CrudHelper.get_all(self.collection, self.ENT_TYPE)

        return CrudHelper.get_by_id(id, self.collection, self.ENT_TYPE)

    def post(self, request):
        serializer = IdeaSerializer(data=request.data)
        file_list = request.FILES.getlist("files")
        print('Nums of Files is uploading: ', len(file_list))
        
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
