from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import json
import boto3


class FileService(object):
    EXPIRATION = 3600

    @staticmethod
    def get(file_paths):
        if file_paths is None or len(file_paths) == 0:
            return []

        s3_client = boto3.client("s3")

        url_list = []
        for path in file_paths:
            try:
                url = s3_client.generate_presigned_url(
                    "get_object",
                    Params={"Bucket": settings.AWS_STORAGE_BUCKET_NAME, "Key": path},
                    ExpiresIn=FileService.EXPIRATION,
                )
                url_list.append(url)
            except Exception as e:
                print(e)

        s3_client.close()
        return url_list