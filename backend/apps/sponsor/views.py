from rest_framework.views import APIView
from common.utils import parse_json, connect_db, get_id_from_request
from common.classes.crud_helper import CrudHelper
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import viewsets
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.decorators import action
from rest_framework.response import Response
from config.db_connection import db_connection
from config.authentication import CustomAuthentication
from .models import SponsorPackage
from django.db.models.query import QuerySet
import requests
import json
from bson.objectid import ObjectId
from .serializers import SponsorPackageSerializer, SponsorEventSerializer


class SponsorPackageViewSet(viewsets.ViewSet):
    collection = db_connection.get_collection("sponsor-package")
    ENT_TYPE = "sponsor package"
    permission_classes = [AllowAny]
    authentication_classes = [CustomAuthentication]
    serializer_class = SponsorPackageSerializer

    @action(
        detail=False,
        methods=["GET", "PATCH", "POST", "DELETE"],
        url_path=r"sponsors/packages",
    )
    def manage_packages(self, request):
        if request.method == "GET":
            return CrudHelper.get_all(self.collection, self.ENT_TYPE)
        elif request.method == "POST":
            return CrudHelper.post(
                self.collection, self.serializer_class(data=request.data), self.ENT_TYPE
            )
        elif request.method == "PATCH":
            return CrudHelper.patch(
                get_id_from_request(request),
                self.collection,
                self.serializer_class(data=request.data, partial=True),
                self.ENT_TYPE,
            )
        else:
            return CrudHelper.delete(
                get_id_from_request(request), self.collection, self.ENT_TYPE
            )

    @action(
        detail=False,
        methods=["GET"],
        url_path=r"sponsors/packages/(?P<id>[^/.]+)",
    )
    def get_package_by_id(self, request):
        return CrudHelper.get_by_id(
            get_id_from_request(request), self.collection, self.ENT_TYPE
        )


class SponsorEventViewSet(viewsets.ViewSet):
    collection = db_connection.get_collection("sponsor-event")
    ENT_TYPE = "sponsor event"
    permission_classes = [AllowAny]
    authentication_classes = [CustomAuthentication]
    serializer_class = SponsorEventSerializer
    
    @action(
        detail=False,
        methods=["GET", "PATCH", "POST", "DELETE"],
        url_path=r"sponsors/events",
    )
    def manage_packages(self, request):
        if request.method == "GET":
            return CrudHelper.get_all(self.collection, self.ENT_TYPE)
        elif request.method == "POST":
            return CrudHelper.post(
                self.collection, self.serializer_class(data=request.data), self.ENT_TYPE
            )
        elif request.method == "PATCH":
            return CrudHelper.patch(
                get_id_from_request(request),
                self.collection,
                self.serializer_class(data=request.data, partial=True),
                self.ENT_TYPE,
            )
        else:
            return CrudHelper.delete(
                get_id_from_request(request), self.collection, self.ENT_TYPE
            )

    @action(
        detail=False,
        methods=["GET"],
        url_path=r"sponsors/events/(?P<id>[^/.]+)",
    )
    def get_event_by_id(self, request):
        return CrudHelper.get_by_id(
            get_id_from_request(request), self.collection, self.ENT_TYPE
        )