from rest_framework.serializers import ModelSerializer
from .models import Contest


class ContestSerializer(ModelSerializer):
    class Meta:
        model = Contest
        fields = "__all__"
