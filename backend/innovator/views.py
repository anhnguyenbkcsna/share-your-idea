from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from utils.utils import parse_json, connect_db
from bson.objectid import ObjectId
from .serializers import InnovatorSerializer
from utils.crud import CrudHelper
from django.conf import settings
from django.http import HttpResponseRedirect, HttpResponse
from pymongo.collection import ReturnDocument
import datetime
import boto3

# Create your views here.
# Tutorial: https://www.youtube.com/watch?v=igXhsIgAU2g&t=479s

class InnovatorApiView(APIView):
    db = connect_db()
    collection = db.get_collection("innovator_profile")
    serializer_class = InnovatorSerializer
    ENT_TYPE = "innovator profile"

    def get(self, request):
        id = request.query_params.get("id")
        if not id:
            return CrudHelper.get_all(self.collection, self.ENT_TYPE)
        
        return CrudHelper.get_by_id(id, self.collection, self.ENT_TYPE)

    def post(self, request):
        serializer = InnovatorSerializer(data=request.data)
        return CrudHelper.post(self.collection, serializer)


    def patch(self, request):
        serializer = InnovatorSerializer(data=request.data, partial=True)
        id = request.query_params.get("id")
        
        return CrudHelper.patch(id, self.collection, serializer, self.ENT_TYPE)

    def delete(self, request):
        id = request.query_params.get("id")
        return CrudHelper.delete(id, self.collection, self.ENT_TYPE)
