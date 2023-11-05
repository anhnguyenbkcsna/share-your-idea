from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import Company

class CompanySerializer(ModelSerializer):
    specialties = serializers.ListField(
        child=serializers.CharField(), required=False
    )
    idea_ids = serializers.ListField(
        child=serializers.CharField(), required=False
    )
    
    class Meta:
        model = Company
        fields = "__all__"
