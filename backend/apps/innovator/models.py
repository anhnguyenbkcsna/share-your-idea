from typing import Any
from django.db import models
from rest_framework import serializers


class Innovator(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    number = models.CharField(max_length=255, default=None)
    address = models.CharField(max_length=255, default=None)
    avatar_url = models.TextField(default=None)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return """Innovator: {self.username}"""


class InnovatorSerializer(serializers.ModelSerializer):
    idea_ids = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = Innovator
        exclude = ["avatar_url"]
