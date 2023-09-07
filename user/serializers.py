from rest_framework.serializers import ModelSerializer

from ..core.models import User

# chua co gi dac biet lam
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "password",
            "full_name",
            "age",
            "email",
            "number",
            "address",
            "created_at"
        )
