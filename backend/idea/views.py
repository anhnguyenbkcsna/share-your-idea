from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .serializers import IdeaSerializer
from utils.utils import parse_json, connect_db
from bson.objectid import ObjectId
from django.conf import settings
from pymongo.collection import ReturnDocument
import datetime
import boto3


class IdeaApiView(APIView):
    db = connect_db()
    collection = db.get_collection("innovator_profile")
    serializer_class = IdeaSerializer

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
        innovator_id = request.query_params.get("innovator_id")
        idea_id = request.query_params.get("idea_id")
        
        # find idea by innovator_id
        if innovator_id:
            innovator_profile = self.collection.find_one({"_id":  ObjectId(innovator_id)})
            return Response({
                "message": "All ideas of user with ID " + innovator_id,
                "data": parse_json(innovator_profile.get("ideas") or [])
            })
        
        # find idea by idea_id
        elif idea_id:
            idea = next(x for x in self.collection.find_one(
                {"ideas._id": ObjectId(idea_id)}
            ).get("ideas"))
            return Response({"message": "Found an idea", "data": parse_json(idea)})

        return Response({"message": "Please attach innovator_id or idea_id", "data": None})

    def post(self, request):
        serializer = IdeaSerializer(data=request.data)
        innovator_id = request.query_params.get("innovator_id")
        
        try:
            if innovator_id and serializer.is_valid(raise_exception=True):
                innovator_document = self.collection.find_one({"_id": ObjectId(innovator_id)})
                idea_list = innovator_document["ideas"] if innovator_document.get("ideas") else []
                insert_obj = serializer.validated_data
                insert_obj["_id"] = ObjectId() # generate an id for new idea
                idea_list.append(insert_obj)
                
                document_after = self.collection.find_one_and_update(
                    {"_id": ObjectId(innovator_id)}, 
                    {"$set": {"ideas": idea_list}},
                    return_document = ReturnDocument.AFTER
                )
                
                return Response({
                        "message": "New idea was added",
                        "data": parse_json(document_after)
                    })
        except:
            return Response({"message": "Cannot add new idea"})
    
        # if serializer.is_valid(raise_exception=True):
        #     for request_file in request.FILES.getlist("files"):
        #         path = default_storage.save(
        #             request_file.name, ContentFile(request_file.read())
        #         )
        #         data = {
        #             "file": path,
        #             "created_at": datetime.datetime.utcnow(),
        #         }
        #         self.collection.insert_one(parse_json(data))

        #     if id:
        #         self.collection.find_one_and_update(
        #             {"_id": ObjectId(id)}, {"$set": parse_json(data)}
        #         )
        #         return Response({"message": "Idea updated", "data": parse_json(data)})

        #     return Response({"message": "New idea added"})

    def patch(self, request):
        # innovator_id = request.query_params.get("innovator_id")
        idea_id = request.query_params.get("idea_id")
        serializer = IdeaSerializer(data=request.data, partial=True)
        
        try:
            if serializer.is_valid(raise_exception=True):
                user_idea = next(x for x in self.collection.find_one(
                    {"ideas._id": ObjectId(idea_id)}
                ).get("ideas"))
                
                user_idea.update(serializer.validated_data)
                
                document_after_updated = self.collection.find_one_and_update(
                    {"ideas._id": ObjectId(idea_id)}, # get innovator_profile document with idea_id
                    {"$set": {"ideas.$[e1]": user_idea}}, # update idea
                    array_filters=[
                        {"e1._id": ObjectId(idea_id)}
                    ], # filter `idea` in `ideas` array of `innovator_profile document`
                    return_document=ReturnDocument.AFTER
                )
                
                if document_after_updated:
                    return Response({
                            "message": "Idea was updated",
                            "data": parse_json(document_after_updated),
                        })
        except:
            return Response({"message": "Cannot update idea"})
    
    def delete(self, request):
        idea_id = request.query_params.get("idea_id")
        
        try:
            self.collection.find_one_and_update(
                {"ideas._id": ObjectId(idea_id)},
                {"$pull": {'ideas': {"_id": ObjectId(idea_id)}}}
            )
            return Response({"message": "Deleted idea with ID " + idea_id})
        except:
            return Response({"message": "Cannot delete idea with ID " + idea_id})
