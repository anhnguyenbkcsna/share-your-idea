from rest_framework.views import APIView
from common.utils import get_id_from_request, parse_json
from common.crud_helper import CrudHelper
from common.response import CustomResponse
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from config.db_connection import db_connection
from config.authentication import CustomAuthentication
from django.db.models.query import QuerySet
from django.conf import settings
from bson.objectid import ObjectId
from django.core.mail import send_mail
from .models import Email
from .serializers import EmailSerializer
from django.forms.models import model_to_dict


class EmailServiceViewSet(viewsets.ViewSet):
    collection = db_connection.get_collection("email")
    ENT_TYPE = "email"
    permission_classes = (IsAuthenticated,)
    queryset = QuerySet(model=Email, query=[])
    authentication_classes = [CustomAuthentication]
    serializer_class = EmailSerializer

    @action(
        detail=False,
        methods=["GET", "POST", "DELETE"],
        url_path=r"emails",
    )
    def manage_emails(self, request):
        if request.method == "GET":
            pass
            # return CrudHelper.get_all(self.collection, self.ENT_TYPE)
        elif request.method == "POST":
            serializer = self.serializer_class(data=request.data)
            if not serializer.is_valid(raise_exception=True):
                return CustomResponse(message="Error when creating email", status=400)

            subject = serializer.validated_data.get("subject")
            message = serializer.validated_data.get("message")
            recipient_list = serializer.validated_data.get("recipient_list")
            from_email = settings.EMAIL_HOST_USER

            try:
                res = send_mail(subject, message, from_email, recipient_list)
            except Exception as e:
                return CustomResponse(message=str(e), status=400)

            email = {
                "subject": subject,
                "message": message,
                "recipient_list": recipient_list,
                "is_sent": res == 1,
            }
            if res == 1:
                self.collection.insert_one(email)
                return CustomResponse(message="Email sent successfully", data=email, status=200)
            else:
                self.collection.insert_one(email)
                return CustomResponse(message="Error when sending email", status=400)
        else:
            pass
