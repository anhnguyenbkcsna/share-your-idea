from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from common.constants import Role
from rest_framework import viewsets
from bson.objectid import ObjectId
from rest_framework.decorators import action
from common.classes.crud_helper import CrudHelper
from config.db_connection import db_connection
from .serializers import ContestSerializer, SubmissionSerializer
from common.classes.response import CustomResponse
from config.authentication import CustomAuthentication
from common.utils import parse_json


class ContestViewSet(viewsets.ViewSet):
    collection = db_connection.get_collection("contest")
    permission_classes = (IsAuthenticated,)
    authentication_classes = [CustomAuthentication]
    serializer_class = ContestSerializer
    ENT_TYPE = "contest"

    @action(
        detail=False,
        methods=["GET", "POST"],
        permission_classes=[AllowAny],
        url_path=r"contests",
    )
    def get_and_post_contests(self, request):
        if request.method == "POST":
            serializer = ContestSerializer(data=request.data)
            if not serializer.is_valid(raise_exception=True):
                return CustomResponse(
                    message="Error when creating contest",
                    status=400,
                    error=serializer.error_messages,
                )
            file_list = request.FILES.getlist("banner")
            print(file_list)
            return CrudHelper.post_with_file(
                self.collection, serializer, file_list, self.ENT_TYPE
            )
        return CrudHelper.get_all(self.collection, self.ENT_TYPE)

    # (?P<id>[^/.]+)
    @action(detail=False, methods=["GET"], url_path=r"contests/(?P<id>[a-z0-9]{24})")
    def manage_contest(self, request, id=None):
        if request.method == "GET":
            return CrudHelper.get_by_id(id, self.collection, self.ENT_TYPE)


class SubmissionViewSet(viewsets.ViewSet):
    collection = db_connection.get_collection("contest")
    permission_classes = (IsAuthenticated,)
    authentication_classes = [CustomAuthentication]
    serializer_class = SubmissionSerializer
    ENT_TYPE = "submission"

    @action(
        detail=False,
        methods=["GET", "POST"],
        url_path=r"contests/(?P<id>[^/.]{24})/submissions",
    )
    def get_and_post_submissions(self, request, id):
        if request.method == "POST":
            serializer = self.serializer_class(data=request.data)
            if not serializer.is_valid(raise_exception=True):
                return CustomResponse(
                    message="Error when creating submission",
                    status=400,
                    error=serializer.error_messages,
                )

            self.collection.update_one(
                {"_id": ObjectId(id)}, {"$push": {"submission_list": serializer.data}}
            )
            return CustomResponse(
                message="Submission created successfully",
                status=201,
                data=serializer.data,
            )

        else:
            contest = self.collection.find_one({"_id": ObjectId(id)})
            if contest is None:
                return CustomResponse(
                    message="Contest not found",
                    status=404,
                )
            submission_list = contest.get("submission_list", [])

            def map_submission(submission):
                idea = db_connection.get_collection("idea").find_one(
                    {"_id": ObjectId(submission["idea_id"])}
                )
                submission.update({"idea": idea})
                return submission

            fin_submissions = list(map(map_submission, submission_list))

            return CustomResponse(
                message="All submissions", data=fin_submissions, status=200
            )

    @action(
        detail=False,
        methods=["GET", "POST"],
        url_path=r"contests/(?P<id>[^/.]{24})/submissions/(?P<sub_id>[^/.]{24})/mark",
    )
    def mark_submissions(self, request, id, sub_id):
        if request.method == "POST":
            grade = request.data.get("grades")
            if grade is None:
                return CustomResponse(
                    message="Grades is required",
                    status=400,
                )
            comment = request.data.get("comment")
            if comment is None:
                return CustomResponse(
                    message="Comment is required",
                    status=400,
                )

            print(id, sub_id)
            result = self.collection.update_one(
                {"_id": ObjectId(id), "submission_list.idea_id": sub_id},
                {
                    "$set": {
                        "submission_list.$.is_marked": True,
                        "submission_list.$.grades": grade,
                        "submission_list.$.comment": comment,
                    }
                },
            )

            return CustomResponse(
                message="Submission marked successfully",
                data={"modified_count": result.modified_count},
                status=200,
            )

        else:
            submission = self.collection.find_one(
                {"_id": ObjectId(id), "submission_list.idea_id": sub_id}
            )
            submission = submission.get("submission_list")
            submission = next(
				filter(lambda x: x.get("idea_id") == sub_id, submission), None
			)
            return CustomResponse(
                message="Get a submission", data=submission, status=200
            )
