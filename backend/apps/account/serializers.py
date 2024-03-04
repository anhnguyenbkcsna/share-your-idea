from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Account, Company, Innovator


class CompanySerializer(ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"

class InnovatorSerializer(ModelSerializer):
    class Meta:
        model = Innovator
        fields = "__all__"
