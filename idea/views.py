from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .serializers import IdeaSerializer
from utils.utils import parse_json, connect_db
from bson.objectid import ObjectId
from django.conf import settings
from datetime import datetime


class IdeaApiView(APIView):
    db = connect_db()
    collection = db.get_collection("idea_idea")
    serializer_class = IdeaSerializer
    
    def get(self, request, id=None):
        if id:
            idea = parse_json(self.collection.find_one({"_id": ObjectId(id)}))
            return Response({"message": "Idea", "data": idea})

        allIdeas = parse_json(self.collection.find({}))
        return Response({"message": "All ideas", "data": allIdeas})

    def post(self, request, id=None):
        # Another approach: Looping over UploadedFile.chunks() instead of using read() ensures that large files don't overwhelm your system's memory
        serializer = IdeaSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            request_file = request.FILES["image"]
            path = default_storage.save(request_file.name, ContentFile(request_file.read()))
            data =  request.data
            data['image'] = path
            parse_data = parse_json(data)
            
            if id:
                self.collection.find_one_and_update(
					{"_id": ObjectId(id)}, {"$set": parse_data}
				)
                return Response({"message": "Idea updated", "data": parse_data})
            
            
            self.collection.insert_one(parse_data)
            
            return Response(
                {"message": "New idea added", "data": parse_data}
            )

    def delete(self, request, id=None):
        try:
            if id:
                self.collection.find_one_and_delete({"_id": ObjectId(id)})
            else:
                self.collection.delete_many({})
            return Response({"message": "Idea deleted"})
        except:
            return Response({"message": "Idea not found"})
