from rest_framework.serializers import ModelSerializer

from .models import Idea

class IdeaSerializer(ModelSerializer):
    class Meta:
        model = Idea
        exclude = ['id']
