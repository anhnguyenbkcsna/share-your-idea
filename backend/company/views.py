from rest_framework.views import APIView
from rest_framework.response import Response
from utils.utils import connect_db
from .models import RequirementSerializer
from utils.crud import CrudHelper
from bson.objectid import ObjectId


class CompanyApiView(APIView):
    db = connect_db()
    collection = db.get_collection("profile")
    serializer_class = RequirementSerializer
    ENT_TYPE = "requirement"

    def get(self, request, id=None):
        if not id:
            return Response({"message": f"Cannot find {self.ent_type}"}, status=400)
        
        companyDoc = self.collection.find_one({"_id": ObjectId(id)})
        return companyDoc["requirement"]

    def post(self, request):
        company_id = request.data.get("id")
        serializer = RequirementSerializer(data=request.data)
        
        if company_id and serializer.is_valid(raise_exception=True):
            self.collection.update_one(
                {"_id": ObjectId(company_id)},
                {"$set": {"requirement": serializer.validated_data}},
            )
            return Response(
                {
                    "message": f"Created new {self.ent_type}",
                    "data": serializer.validated_data,
                },
                status=200,
            )
        return Response({"message": f"Cannot find {self.ent_type}"}, status=400)

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
                    "message": f"Created new {self.ent_type}",
                    "data": old_requirement,
                },
                status=200,
            )
        return Response({"message": f"Cannot find {self.ent_type}"}, status=400)

    # def delete(self, request):
    #     id = request.query_params.get("id")
    #     return CrudHelper.delete(id, self.collection, self.ENT_TYPE)
