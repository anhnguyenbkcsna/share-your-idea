from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import Idea


class IdeaSerializer(ModelSerializer):
    files = serializers.ListField(child=serializers.FileField(), required=False)

    class Meta:
        model = Idea
        exclude = ["upvote", "downvote"]
