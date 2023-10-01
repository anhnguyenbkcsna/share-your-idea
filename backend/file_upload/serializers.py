from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import File

class FileSerializer(ModelSerializer):
    files = serializers.ListField(
        child=serializers.FileField(), required=False
    )
    
    class Meta:
        model = File
        exclude = ['id']