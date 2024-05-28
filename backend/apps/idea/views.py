from .serializers import IdeaSerializer, CommentSerializer
from common.utils import parse_json, get_id_from_request
from common.classes.crud_helper import CrudHelper
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from config.db_connection import db_connection
from config.authentication import CustomAuthentication
from .models import Idea
from django.db.models.query import QuerySet
from bson.objectid import ObjectId
from common.classes.response import CustomResponse
import requests
from common.constants import AI_SERVER_URL
import json
import uuid
from django.core.cache import cache
from services.file_service import FileService


class IdeaViewSet(viewsets.ViewSet):
    collection = db_connection.get_collection("idea")
    serializer_class = IdeaSerializer
    ENT_TYPE = "idea"
    permission_classes = [IsAuthenticated]
    queryset = QuerySet(model=Idea, query=[])
    authentication_classes = [CustomAuthentication]

    @action(
        detail=False, methods=["GET"], permission_classes=[AllowAny], url_path=r"ideas"
    )
    def get_ideas(self, request):
        return CrudHelper.get_all(self.collection, self.ENT_TYPE)

    @action(detail=False, methods=["POST"], url_path=r"ideas/filter")
    def filter_idea(self, request):
        url = AI_SERVER_URL + "/spam_filtering"
        idea = request.data
        idea["_id"] = uuid.uuid4().hex
        idea["files"] = []

        try:
            response = requests.get(
                url, data=json.dumps(idea), headers={"Content-Type": "application/json"}
            )

            if response.status_code == 200:
                posts = response.json()
                retrnDat = {
                    "isValid": posts["label"],
                }
                return CustomResponse(
                    message="Get filtering result", data=retrnDat, status=200
                )
            else:
                return CustomResponse(
                    message=response.json(),
                    status=response.status_code,
                )
        except requests.exceptions.RequestException as e:
            return CustomResponse(
                message="Error when filtering idea", status=400, error=str(e)
            )

    @action(detail=False, methods=["POST"], url_path=r"ideas/topk")
    def match_idea(self, request):
        url = AI_SERVER_URL + "/topk"
        requirement = request.data

        if requirement.get("_id") is None:
            requirement["_id"] = uuid.uuid4().hex

        try:
            cache_key = "idea_matching_" + requirement["_id"]
            if cache.has_key(cache_key):
                return CustomResponse(
                    message="Get topk results", data=cache.get(cache_key), status=200
                )

            # If not found in cache
            response = requests.get(
                url,
                data=json.dumps(requirement),
                headers={"Content-Type": "application/json"},
            )

            if response.status_code == 200:
                posts = response.json()
                print("Idea Ranking: ", posts["rank"])

                results = self.collection.find(
                    {"_id": {"$in": [ObjectId(idea_id) for idea_id in posts["rank"]]}}
                )

                result_map = {
                    str(result["_id"]): {**result, "_id": str(result["_id"])}
                    for result in results
                }

                ordered_results = [result_map.get(id) for id in posts["rank"]]

                cache.set(cache_key, ordered_results, timeout=60 * 5)

                def map_result(result):
                    result["files"] = FileService.get(result["files"])
                    return result

                ordered_results = list(map(map_result, ordered_results))

                return CustomResponse(
                    message="Get topk results", data=ordered_results, status=200
                )
            else:
                return CustomResponse(
                    message=response.json(),
                    status=response.status_code,
                )
        except requests.exceptions.RequestException as e:
            return CustomResponse(
                message="Error when getting appropriate ideas", status=400, error=str(e)
            )

    @action(
        detail=False,
        methods=["GET"],
        permission_classes=[AllowAny],
        url_path=r"ideas/(?P<id>[^/.]{24})",
    )
    def get_idea_by_idea_id(self, request, id=None):
        return CrudHelper.get_by_id(id, self.collection, self.ENT_TYPE)

    @action(
        detail=False, methods=["GET"], url_path=r"innovators/(?P<id>[^/.]{24})/ideas"
    )
    def get_ideas_by_innovator_id(self, request, id=None):
        inno_id = id
        if not inno_id:
            return Response({"message": f"Cannot find {self.ENT_TYPE}"}, status=400)
        idea = parse_json(self.collection.find({"innovator_id": inno_id}))
        return Response(
            {"message": f"Got all ideas of innovator", "data": idea}, status=200
        )

    @action(detail=False, methods=["PATCH"], url_path=r"ideas/(?P<id>[^/.]{24})")
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
        print("Nums of Files is uploading: ", len(file_list))
        innovator_id = get_id_from_request(request)

        return CrudHelper.post_with_file(
            self.collection,
            serializer,
            file_list,
            self.ENT_TYPE,
            innovator_id=innovator_id,
        )

    # def delete(self, request):
    #     id = request.query_params.get("id")
    #     return CrudHelper.delete(id, self.collection, self.ENT_TYPE)


class CommentViewSet(viewsets.ViewSet):
    collection = db_connection.get_collection("idea")
    serializer_class = CommentSerializer
    ENT_TYPE = "comment"
    permission_classes = [IsAuthenticated]
    queryset = QuerySet(model=Idea, query=[])
    authentication_classes = [CustomAuthentication]

    @action(
        detail=False,
        methods=["GET", "POST"],
        url_path=r"ideas/(?P<id>[^/.]+)/comments",
    )
    def get_comments_by_idea_id(self, request, id=None):
        idea = self.collection.find_one({"_id": ObjectId(id)})
        if not idea:
            return Response({"message": f"Cannot find {self.ENT_TYPE}"}, status=400)

        if request.method == "POST":
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid(raise_exception=True):
                comment = serializer.data

                if not db_connection.get_collection("profile").find_one(
                    {"_id": ObjectId(comment["innovator_id"])}
                ):
                    return Response({"message": f"Cannot find innovator"}, status=400)

                self.collection.update_one(
                    {"_id": ObjectId(id)},
                    {"$push": {"comments": comment}},
                )
                return Response(
                    {"message": f"Added comment to idea", "data": comment}, status=200
                )
            else:
                return Response({"message": f"Cannot add comment to idea"}, status=400)
        else:
            comments = parse_json(idea["comments"]) if idea.get("comments") else []
            innovator_ids = [comment["innovator_id"] for comment in comments]

            innovator_docs = list(
                db_connection.get_collection("profile").find(
                    {
                        "_id": {
                            "$in": [
                                ObjectId(innovator_id) for innovator_id in innovator_ids
                            ]
                        }
                    }
                )
            )

            def map_comm(comment):
                innovator = next(
                    filter(
                        lambda x: str(x["_id"]) == comment["innovator_id"],
                        innovator_docs,
                    )
                )
                return {
                    "content": comment["content"],
                    "innovator_id": comment["innovator_id"],
                    "innovator": {
                        "name": innovator.get("name"),
                        "email": innovator.get("email"),
                        "role": innovator.get("role"),
                        "avt_url": innovator.get("avt_url") or "",
                    },
                }

            comments = list(map(map_comm, comments))

            return Response(
                {"message": f"Got all comments of idea", "data": comments}, status=200
            )
