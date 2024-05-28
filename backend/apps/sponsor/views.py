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
from common.classes.response import CustomResponse


class SponsorPackageViewSet(viewsets.ViewSet):
    collection = db_connection.get_collection("sponsor")
    ENT_TYPE = "sponsor package"
    permission_classes = [AllowAny]
    authentication_classes = [CustomAuthentication]
    serializer_class = SponsorPackageSerializer

    @action(
        detail=False,
        methods=["GET", "PATCH", "POST", "DELETE"],
        url_path=r"sponsors/events/(?P<id>[^/.]+)/packages",
    )
    def manage_packages(self, request, id):
        if request.method == "POST":
            serializer = self.serializer_class(data=request.data)
            if not serializer.is_valid(raise_exception=True):
                return Response(serializer.errors, status=400)
            
            res = self.collection.update_one({
                "_id": ObjectId(id)
            }, {
                "$push": {
                    "packages": serializer.validated_data
                }
            })
            return CustomResponse("Package added successfully", {"modified_count": res.modified_count }, status=201)
        # Handle GET 
        if request.GET.get("idea_id"):
            return CrudHelper.get_by_query(
                {"idea_id": request.GET.get("idea_id")},
                self.collection,
                self.ENT_TYPE,
            )
        if request.GET.get("innovator_id"):
            return CrudHelper.get_by_query(
                {"innovator_id": request.GET.get("innovator_id")},
                self.collection,
                self.ENT_TYPE,
            )
        event = self.collection.find_one({"_id": ObjectId(id)})
        if not event:
            return CustomResponse("Event not found", status=400)
        return CustomResponse("Packages retrieved successfully", event.get("packages"))

    @action(
        detail=False,
        methods=["GET"],
        url_path=r"sponsors/events/(?P<id>[^/.]+)/packages/(?P<package_id>[^/.]+)",
    )
    def get_package_by_id(self, request, id, package_id):
        event = self.collection.find_one({"_id": ObjectId(id)})
        if not event:
            return CustomResponse("Event not found", status=400)
        
        packages = event.get("packages", [])
        try:
            package = packages[int(package_id)]
            return CustomResponse("Package retrieved successfully", package)
        except IndexError:
            return CustomResponse("Package not found", status=400)


class SponsorEventViewSet(viewsets.ViewSet):
    collection = db_connection.get_collection("sponsor")
    ENT_TYPE = "sponsor event"
    permission_classes = [IsAuthenticated]
    authentication_classes = [CustomAuthentication]
    serializer_class = SponsorEventSerializer

    @action(
        detail=False,
        methods=["GET", "PATCH", "POST", "DELETE"],
        url_path=r"sponsors/events",
    )
    def manage_events(self, request):
        if request.method == "POST":
            idea_id = request.data.get("idea_id")
            innovator_id = None
            if idea_id:
                idea = db_connection.get_collection("idea").find_one(
                    {"_id": ObjectId(idea_id)}
                )
                if not idea:
                    return Response({"error": "Idea not found"}, status=400)
                innovator_id = idea.get("innovator_id")
            else:
                return Response({"error": "Idea ID is required"}, status=400)

            return CrudHelper.post(
                self.collection,
                self.serializer_class(data=request.data),
                self.ENT_TYPE,
                innovator_id=innovator_id,
            )
            # elif request.method == "PATCH":
            #     return CrudHelper.patch(
            #         get_id_from_request(request),
            #         self.collection,
            #         self.serializer_class(data=request.data, partial=True),
            #         self.ENT_TYPE,
            #     )
            # else:
            #     return CrudHelper.delete(
            #         get_id_from_request(request), self.collection, self.ENT_TYPE
            #     )
        return CrudHelper.get_all(self.collection, self.ENT_TYPE)

    @action(
        detail=False,
        methods=["GET"],
        url_path=r"sponsors/events/(?P<id>[^/.]+)",
    )
    def get_event_by_id(self, request, id):
        return CrudHelper.get_by_id(id, self.collection, self.ENT_TYPE)
