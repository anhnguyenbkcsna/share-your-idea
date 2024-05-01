from common.utils import get_id_from_request
from common.crud_helper import CrudHelper
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import viewsets
from rest_framework.decorators import action
from config.db_connection import db_connection
from config.authentication import CustomAuthentication
from .models import SponsorEvent
from django.db.models.query import QuerySet
from common.utils import create_google_meet
from .serializers import SponsorEventSerializer
from rest_framework.response import Response
import datetime


class SponsorEventViewSet(viewsets.ViewSet):
    collection = db_connection.get_collection("sponsor_event")
    serializer_class = SponsorEventSerializer
    ENT_TYPE = "sponsor_event"
    permission_classes = [AllowAny]
    queryset = QuerySet(model=SponsorEvent, query=[])
    authentication_classes = [CustomAuthentication]

    @action(
        detail=False,
        methods=["GET", "PATCH", "POST", "DELETE"],
        url_path=r"sponsors/meets",
    )
    def crud_events(self, request):
        if request.method == "GET":
            return CrudHelper.get_all(self.collection, self.ENT_TYPE)
        elif request.method == "POST":
            calendar_link, meet_link = create_google_meet(
                "Meet abc", datetime.datetime(2024, 5, 5, 18, 0), 60
            )

            return Response({"calendar_link": calendar_link, "meet_link": meet_link})
            # return CrudHelper.post(
            #     self.collection, self.serializer_class(data=request.data), self.ENT_TYPE
            # )
        elif request.method == "PATCH":
            return CrudHelper.patch(
                get_id_from_request(request),
                self.collection,
                self.serializer_class(data=request.data, partial=True),
                self.ENT_TYPE,
            )
        else:
            return CrudHelper.delete(
                get_id_from_request(request), self.collection, self.ENT_TYPE
            )

    @action(
        detail=False,
        methods=["GET"],
        url_path=r"sponsors/meets/(?P<id>[^/.]+)",
    )
    def get_event_by_id(self, request):
        return CrudHelper.get_by_id(
            get_id_from_request(request), self.collection, self.ENT_TYPE
        )
