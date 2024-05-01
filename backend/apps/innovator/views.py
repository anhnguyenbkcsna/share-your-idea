from rest_framework.views import APIView
from common.utils import connect_db
from common.crud_helper import CrudHelper
from rest_framework.response import Response
from .models import InnovatorSerializer


class InnovatorApiView(APIView):
    db = connect_db()
    collection = db.get_collection("innovator_profile")
    serializer_class = InnovatorSerializer
    ENT_TYPE = "innovator profile"

    # def post(self, request):
    #     serializer = InnovatorSerializer(data=request.data)
    #     return CrudHelper.post(self.collection, serializer)

    def get(self, request):
        id = request.query_params.get("id")
        if not id:
            return Response({"message": f"Cannot find {self.ent_type}"}, status=400)
        return CrudHelper.get_by_id(id, self.collection, self.ENT_TYPE)

    def patch(self, request):
        serializer = InnovatorSerializer(data=request.data, partial=True)
        id = request.query_params.get("id")
        return CrudHelper.patch(id, self.collection, serializer, self.ENT_TYPE)

    def delete(self, request):
        id = request.query_params.get("id")
        return CrudHelper.delete(id, self.collection, self.ENT_TYPE)
