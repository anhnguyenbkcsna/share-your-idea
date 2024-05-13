from bson.objectid import ObjectId
from rest_framework.response import Response
from ..utils import parse_json
from pymongo.collection import ReturnDocument
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from common.classes.response import CustomResponse
import copy


class CrudHelper:
    def mapIdField(idea):
        id = idea["_id"].get('$oid')
        idea.pop("_id")
        idea["id"] = id
        return idea
    
    @staticmethod
    def get_all(collection, ent_type=""):
        ideas = parse_json(collection.find({}))
        ideas = list(map(CrudHelper.mapIdField, ideas))
        return Response({"message": f"Get all {ent_type}s successfully", "data": ideas}, status=200)

    @staticmethod
    def get_by_id(id, collection, ent_type=""):
        idea = parse_json(collection.find_one({"_id": ObjectId(id)}))
        
        if idea:
            idea = CrudHelper.mapIdField(idea)
            return Response({"message": f"Get {ent_type} successfully", "data": idea}, status=200)
        else:
            return Response({"message": f"Can't find {ent_type}"}, status=400)


    @staticmethod
    def post(collection, serializer, ent_type="", message=None):
        if serializer.is_valid(raise_exception=True):
            inserted_document_id = collection.insert_one(
                serializer.validated_data
            ).inserted_id
            return CustomResponse(
                message=f"Created {ent_type} successfully",
                data=parse_json(inserted_document_id)
            )
        
        if message:
            return CustomResponse(message=message, status=400)
        return CustomResponse(message=f"Error when creating {ent_type}", status=400)

    @staticmethod
    def post_with_file(collection, serializer, file_list, ent_type=""):
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": f"Error when creating {ent_type}"}, status=400)

        new_idea_id = collection.insert_one(serializer.validated_data).inserted_id

        file_paths = []
        for request_file in file_list:
            path = default_storage.save(
                f"{new_idea_id}/{request_file.name}", ContentFile(request_file.read())
            )
            file_paths.append(path)
        print(file_paths)

        collection.find_one_and_update(
            {"_id": ObjectId(new_idea_id)},
            {"$set": {"files": file_paths}},
            return_document=ReturnDocument.AFTER,
        )

        return Response(
            {
                "message": f"Created {ent_type} successfully",
                "data": parse_json(new_idea_id),
            },
            status=200,
        )


    @staticmethod
    def patch(id, collection, serializer, ent_type=""):
        if serializer.is_valid(raise_exception=True):
            _id = ObjectId(id)
            document_after_updated = collection.find_one_and_update(
                {"_id": _id},
                {"$set": serializer.validated_data},
                return_document=ReturnDocument.AFTER,
            )
            
            if not document_after_updated:
                return Response({"message": f"Can't find {ent_type}"}, status=400)

            if document_after_updated:
                return Response(
                    {
                        "message": f"Updated {ent_type} successfully",
                        "data": parse_json(document_after_updated),
                    },
                    status=200,
                )

        return Response({"message": f"Can't update {ent_type}"}, status=400)
    
    @staticmethod
    def patch_with_file(id, collection, serializer, file_list, ent_type=""):
        if serializer.is_valid(raise_exception=True):
            _id = ObjectId(id)
            
            # update normal fields
            document_after_updated = collection.find_one_and_update(
                {"_id": _id},
                {"$set": serializer.validated_data},
                return_document=ReturnDocument.AFTER,
            )
            
            if not document_after_updated:
                return Response({"message": f"Can't find {ent_type}"}, status=400)
            
            file_paths = copy.copy(document_after_updated["files"])
            for request_file in file_list:
                path = default_storage.save(
					f"{id}/{request_file.name}", ContentFile(request_file.read())
				)
                file_paths.append(path)
            
            # update file field
            document_after_updated = collection.find_one_and_update(
                {"_id": _id},
                {"$set": {"files": file_paths}},
                return_document=ReturnDocument.AFTER,
            )

            if document_after_updated:
                return Response(
                    {
                        "message": f"Updated {ent_type} successfully",
                        "data": parse_json(document_after_updated),
                    },
                    status=200,
                )

        return Response({"message": f"Can't update {ent_type}"}, status=400)


    @staticmethod
    def delete(id, collection, ent_type=""):
        response = collection.find_one_and_delete({"_id": ObjectId(id)})
        
        if response:
            return Response(
                {
                    "message": f"""Delete {ent_type} successfully""",
                    "data": parse_json({"_id": ObjectId(id)}),
                },
                status=200,
            )
        else:
            return Response({"message": f"""Can't find {ent_type}"""}, status=400)
