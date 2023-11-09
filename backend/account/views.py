from rest_framework.views import APIView
from rest_framework.response import Response
from utils.utils import connect_db, validate_google_id_token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from .models import Account


class AccountApiView(APIView):
    db = connect_db()
    permission_classes = (AllowAny,)
    ROLES = {"INNOVATOR": "innovator", "COMPANY": "company"}

    def post(self, request):
        check, response = validate_google_id_token(request.data.get("id_token"))
        if not check:
            return Response({"message": response}, status=400)

        if request.data.get("role") == self.ROLES.get("INNOVATOR"):
            collection = self.db.get_collection("innovator_profile")
            res = collection.find_one(
                {"name": response["name"], "email": response["email"]}
            )

            if res:
                _id = str(res["_id"])
            else:
                result = collection.insert_one(
                    {"name": response["name"], "email": response["email"]}
                )
                _id = result.inserted_id

            token = RefreshToken.for_user(
                Account(_id=_id, role=self.ROLES.get("INNOVATOR"))
            )
            return Response(
                {
                    "refresh": str(token),
                    "access": str(token.access_token),
                },
                status=200,
            )
        # elif role is 'company':
        #     collection = self.db.get_collection("company_profile")
        #     collection.insert_one({
        #         "name": name,
        #         "email": email
        #     })
        #     pass
        else:
            return Response({"message": "Invalid role"}, status=400)
