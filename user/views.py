from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from user.models import User
from user.utils import parse_json, connect_db
from bson.objectid import ObjectId

# Create your views here.
# Tutorial: https://www.youtube.com/watch?v=igXhsIgAU2g&t=479s


class UserApiView(APIView):
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    db = connect_db()
    collection = db.get_collection("user_user")
    serializer_class = UserSerializer

    def get(self, request, id=None):
        if id:
            user = parse_json(self.collection.find_one({"_id": ObjectId(id)}))
            return Response({"message": "User", "data": user})

        allUsers = parse_json(self.collection.find({}))
        return Response({"message": "All users", "data": allUsers})

    def post(self, request, id=None):
        if id:
            self.collection.find_one_and_update(
                {"_id": ObjectId(id)}, {"$set": request.data}
            )
            return Response({"message": "User updated"})

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            self.collection.insert_one(serializer.data)
            return Response({"message": "New user added", "data": parse_json(serializer.data)})
    
    def delete(self, request, id):
        try:
            self.collection.find_one_and_delete({"_id": ObjectId(id)})
            return Response({"message": "User deleted"})
        except:
            return Response({"message": "User not found"})
