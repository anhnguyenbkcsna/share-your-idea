from django.db import models
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers


class Requirement(models.Model):
    domain = models.JSONField()
    problem = models.TextField()
    acceptance_criteria = models.TextField()
    constraints = models.TextField()

    def __str__(self):
        return """Requirement: {self.name}"""


class RequirementSerializer(ModelSerializer):
    # domains = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = Requirement
        fields = "__all__"
