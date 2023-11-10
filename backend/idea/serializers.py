from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Idea


class IdeaSerializer(ModelSerializer):
    domain = serializers.JSONField()
    professional = serializers.JSONField(required=False)
    geographical = serializers.JSONField(required=False)
    ageRange = serializers.JSONField(required=False)
    outstand = serializers.JSONField(required=False)
    files = serializers.ListField(child=serializers.FileField(), required=False)
    
    class Meta:
        model = Idea
        exclude = ["upvote", "downvote"]

class StringListField(serializers.ListField):
    child = serializers.CharField()
    required = False