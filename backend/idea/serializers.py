from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import Idea

class IdeaSerializer(ModelSerializer):    
    class Meta:
        model = Idea
        exclude = ["like", "dislike"]
