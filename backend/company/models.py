from django.db import models
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers


class Requirement(models.Model):
    domains = models.JSONField(default=list)
    problem = models.TextField(default="")
    acceptance_criterias = models.TextField(default="")
    constraints = models.TextField(default="")

    def __str__(self):
        return """Requirement: {self.name}"""


class RequirementSerializer(ModelSerializer):
    # domains = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = Requirement
        fields = "__all__"
