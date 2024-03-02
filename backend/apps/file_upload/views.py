from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from utils.utils import parse_json, connect_db
from bson.objectid import ObjectId
from django.conf import settings
import json
import boto3
from rest_framework.permissions import IsAuthenticated, AllowAny
from auth.authentication import CustomAuthentication


class FileUploadApiView(APIView):
    EXPIRATION = 3600
    permission_classes = (AllowAny,)
    authentication_classes = [CustomAuthentication]

    def get(self, request):
        s3_client = boto3.client("s3")

        file_paths = []
        try:
            file_paths_query = request.data.get("file_paths")
            file_paths = json.loads(file_paths_query)
        except:
            s3_client.close()
            return Response({"message": "Invalid request"}, status=400)

        url_list = []
        for path in file_paths:
            url = s3_client.generate_presigned_url(
                "get_object",
                Params={"Bucket": settings.AWS_STORAGE_BUCKET_NAME, "Key": path},
                ExpiresIn=self.EXPIRATION,
            )
            url_list.append(url)

        s3_client.close()
        return Response({"message": "Got files", "data": {"url": url_list}}, status=200)

    def delete(self, request):
        s3_client = boto3.client("s3")

        file_paths = []
        try:
            file_paths_query = request.data.get("file_paths")
            file_paths = json.loads(file_paths_query)
        except:
            s3_client.close()
            return Response({"message": "Invalid request"}, status=400)

        try:
            updateResult = self.collection.update_many(
                {"files": {"$in": file_paths}},
                {"$pull": {"files": {"$in": file_paths}}},
            )
        except:
            s3_client.close()
            return Response(
                {"message": "Cannot delete files"},
                status=400,
            )

        s3_client.close()
        return Response(
            {
                "message": "Files not found" 
                    if updateResult.modified_count == 0 
                    else "Deleted files",
                "data": file_paths,
            },
            status= 400 if updateResult.modified_count == 0 else 200,
        )
        # try:
        #     file_paths = [{"Key": path} for path in file_paths]
        #     response = s3_client.delete_objects(
        #         Bucket=settings.AWS_STORAGE_BUCKET_NAME,
        #         Delete={"Objects": file_paths},
        #     )
        # except Exception as e:
        #     s3_client.close()
        #     return Response(
        #         {"message": "Cannot delete files"},
        #         status=400,
        #     )

        # s3_client.close()
        # return Response(response, status=200)
        # return Response(
        #     {"message": "Deleted files", "data": file_paths_query},
        #     status=200,
        # )
