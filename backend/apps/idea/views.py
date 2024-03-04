from rest_framework.views import APIView
from .serializers import IdeaSerializer
from utils.utils import parse_json, connect_db
from utils.crud import CrudHelper
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import viewsets
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.decorators import action
from rest_framework.response import Response
from customs.db_connection import db_connection
from customs.authentication import CustomAuthentication
from .models import Idea
from django.db.models.query import QuerySet
import requests
import json


class IdeaViewSet(viewsets.ViewSet):
    collection = db_connection.get_collection("idea")
    serializer_class = IdeaSerializer
    ENT_TYPE = "idea"
    permission_classes = (AllowAny,)
    queryset = QuerySet(model=Idea, query=[])
    authentication_classes = [CustomAuthentication]

    @action(detail=False, methods=["GET"], url_path=r"ideas")
    def get_ideas(self, request):
        return CrudHelper.get_all(self.collection, self.ENT_TYPE)

    @action(detail=False, methods=["GET"], url_path=r"ideas/innovator/(?P<id>[^/.]+)")
    def get_idea_by_innovator_id(self, request, id=None):
        if not id:
            return Response({"message": f"Cannot find {self.ENT_TYPE}"}, status=400)
        
        idea = parse_json(self.collection.find({"innovator_id": id}))
        return Response({"message": f"Got all ideas of innovator", "data": idea}, status=200)

    @action(detail=False, methods=["GET"], url_path=r"ideas/(?P<id>[^/.]+)")
    def get_idea_by_idea_id(self, request, id=None):
        if not id:
            return Response({"message": f"Cannot find {self.ENT_TYPE}"}, status=400)
        if request.method == "GET":
            return CrudHelper.get_by_id(id, self.collection, self.ENT_TYPE)

    @action(detail=False, methods=["PATCH"], url_path=r"ideas/(?P<id>[^/.]+)")
    def patch(self, request, id=None):
        serializer = IdeaSerializer(data=request.data, partial=True)
        file_list = request.FILES.getlist("files")

        return CrudHelper.patch_with_file(
            id, self.collection, serializer, file_list, self.ENT_TYPE
        )

    @action(detail=False, methods=["POST"], url_path=r"ideas")
    def post(self, request):
        serializer = IdeaSerializer(data=request.data)
        file_list = request.FILES.getlist("files")
        print('Nums of Files is uploading: ', len(file_list))
        
        return CrudHelper.post_with_file(
            self.collection, serializer, file_list, self.ENT_TYPE
        )


    # def delete(self, request):
    #     id = request.query_params.get("id")
    #     return CrudHelper.delete(id, self.collection, self.ENT_TYPE)
