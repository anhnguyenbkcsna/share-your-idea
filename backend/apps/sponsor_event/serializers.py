from rest_framework.serializers import ModelSerializer
from .models import SponsorEvent


class SponsorEventSerializer(ModelSerializer):
    
    class Meta:
        model = SponsorEvent
        fields = '__all__'