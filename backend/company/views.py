from rest_framework.views import APIView
from rest_framework.response import Response
from utils.utils import parse_json, connect_db
from bson.objectid import ObjectId
from .serializers import CompanySerializer
from pymongo.collection import ReturnDocument
from utils.crud import CrudHelper


class CompanyApiView(APIView):
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    db = connect_db()
    collection = db.get_collection("company_profile")
    serializer_class = CompanySerializer
    ENT_TYPE = "company profile"

    def get(self, request):
        id = request.query_params.get("id")
        if not id:
            return CrudHelper.get_all(self.collection, self.ENT_TYPE)
        
        return CrudHelper.get_by_id(id, self.collection, self.ENT_TYPE)

    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        return CrudHelper.post(self.collection, serializer)


    def patch(self, request):
        serializer = CompanySerializer(data=request.data, partial=True)
        id = request.query_params.get("id")
        
        return CrudHelper.patch(id, self.collection, serializer, self.ENT_TYPE)

    def delete(self, request):
        id = request.query_params.get("id")
        return CrudHelper.delete(id, self.collection, self.ENT_TYPE)

