from rest_framework.views import APIView
from rest_framework.response import Response
from utils.utils import connect_db
from .models import RequirementSerializer
from utils.crud import CrudHelper
from bson.objectid import ObjectId
from customs.authentication import CustomAuthentication
from customs.db_connection import db_connection
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from utils.utils import get_id_from_request
from utils.constants import Role


class CompanyApiView(APIView):
    collection = db_connection.get_collection("profile")
    serializer_class = RequirementSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = [CustomAuthentication]
    ENT_TYPE = "requirement"

    def check_permissions(self, request):
        id = get_id_from_request(request)
        if not id:
            super().permission_denied(request, message="You don't have permission to access this site", code=403)
        
        user = self.collection.find_one({"_id": ObjectId(id), "role": Role.COMPANY})
        if not user:
            super().permission_denied(request, message="You don't have permission to access this site", code=403)

    def get(self, request):
        id = get_id_from_request(request)
        
        company_doc = self.collection.find_one({"_id": ObjectId(id)})
        company_requirements = company_doc["requirement"] if hasattr(company_doc, "requirement") else []
        return Response(
            {
                "message": f"Get requirements successfully!",
                "data": company_requirements,
            },
            status=200,
        )

    def post(self, request):
        company_id = get_id_from_request(request)
        serializer = RequirementSerializer(data=request.data)
        
        if company_id and serializer.is_valid(raise_exception=True):
            self.collection.update_one(
                {"_id": ObjectId(company_id)},
                {"$set": {"requirement": serializer.validated_data}},
            )
            return Response(
                {
                    "message": f"Created new {self.ENT_TYPE}",
                    "data": serializer.validated_data,
                },
                status=200,
            )
        return Response({"message": f"Cannot find {self.ENT_TYPE}"}, status=400)

    def patch(self, request):
        company_id = request.data.get("id")
        serializer = RequirementSerializer(data=request.data)
        
        if company_id and serializer.is_valid(raise_exception=True, partial=True):
            old_requirement = self.collection.find_one({"_id": ObjectId(company_id)})["requirement"]
            old_requirement.update(serializer.validated_data)
            
            self.collection.update_one(
                {"_id": ObjectId(company_id)},
                {"$set": {"requirement": old_requirement}},
            )
            return Response(
                {
                    "message": f"Created new {self.ENT_TYPE}",
                    "data": old_requirement,
                },
                status=200,
            )
        return Response({"message": f"Cannot find {self.ENT_TYPE}"}, status=400)

    # def delete(self, request):
    #     id = request.query_params.get("id")
    #     return CrudHelper.delete(id, self.collection, self.ENT_TYPE)
