from django.db import models
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers


class Company(models.Model):
    name = models.TextField()
    logo_url = models.TextField()
    slogan = models.TextField()
    description = models.TextField()
    website = models.TextField()
    email = models.TextField()
    number = models.TextField()
    address = models.TextField()

    def __str__(self):
        return """Company: {self.name}"""


class CompanySerializer(ModelSerializer):
    specialties = serializers.ListField(child=serializers.CharField(), required=False)
    idea_ids = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = Company
        fields = "__all__"
