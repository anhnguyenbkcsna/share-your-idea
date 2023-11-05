from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Innovator

class InnovatorSerializer(ModelSerializer):
    idea_ids = serializers.ListField(
        child=serializers.CharField(), required=False
    )
    
    class Meta:
        model = Innovator
        exclude = ['avatar_url']