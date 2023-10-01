from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import Idea

class IdeaSerializer(ModelSerializer):
    innovator_list = serializers.ListField(
        child=serializers.JSONField(), required=False
    ) # list of innovators' ObjectId
    public = serializers.BooleanField(default=True)
    files = serializers.ListField(
        child=serializers.FileField(), required=False
    )
    
    class Meta:
        model = Idea
        fields = "__all__"
