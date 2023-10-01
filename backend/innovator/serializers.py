from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Innovator

class InnovatorSerializer(ModelSerializer):
    ideas = serializers.ListField(
        child=serializers.CharField(), required=False
    )
    
    class Meta:
        model = Innovator
        exclude = ['id', 'avatar']