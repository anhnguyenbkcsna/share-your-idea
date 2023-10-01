from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from utils.utils import parse_json, connect_db
from bson.objectid import ObjectId
from .serializers import InnovatorSerializer
from django.conf import settings
from django.http import HttpResponseRedirect, HttpResponse
from pymongo.collection import ReturnDocument
import datetime
import boto3


# Create your views here.
# Tutorial: https://www.youtube.com/watch?v=igXhsIgAU2g&t=479s


class InnovatorApiView(APIView):
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    db = connect_db()
    collection = db.get_collection("innovator_profile")
    serializer_class = InnovatorSerializer

    # id: String type
    # _id: ObjectId type
    
    def get(self, request):
        # get innovator by id
        id = request.query_params.get("id")
        if id:
            innovator = parse_json(
                self.collection.find_one({"_id": ObjectId(id)})
            )
            return Response({"message": "Found an innovator", "data": innovator})

        # get all innovators
        allInnovators = parse_json(self.collection.find({}))
        return Response({"message": "All innovators", "data": allInnovators})

    def post(self, request):
        # insert innovator idea
        # return id of inserted document
        serializer = InnovatorSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            inserted_document_id = self.collection.insert_one(serializer.validated_data).inserted_id
            return Response(
                {
                    "message": "New innovator was added",
                    "data": parse_json(inserted_document_id),
                }
            )

        return Response({"message": "Cannot add new innovator"})

    def patch(self, request):
        # update innovator info except `ideas`
        serializer = InnovatorSerializer(data=request.data, partial=True)
        
        if serializer.is_valid(raise_exception=True):
            _id = ObjectId(request.query_params.get("id"))
            document_after_updated = self.collection.find_one_and_update(
                {"_id": _id}, {"$set": serializer.validated_data}, return_document=ReturnDocument.AFTER
            )
            
            if document_after_updated:
                return Response({
                        "message": "Innovator profile was updated",
                        "data": parse_json(document_after_updated),
                    })

        return Response({"message": "Cannot update innovator profile"})

    def delete(self, request):
        # delete by id or delete all
        id = request.query_params.get("id")
        try:
            self.collection.find_one_and_delete({"_id": ObjectId(id)})
            return Response(
                {
                    "message": "User deleted",
                    "data": parse_json({"_id": ObjectId(id)}),
                }
            )
        except:
            return Response({"message": "User not found"})
