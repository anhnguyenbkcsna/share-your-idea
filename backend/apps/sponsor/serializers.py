from rest_framework.serializers import ModelSerializer
from .models import SponsorPackage, SponsorEvent


class SponsorPackageSerializer(ModelSerializer):
    
    class Meta:
        model = SponsorPackage
        fields = '__all__'


class SponsorEventSerializer(ModelSerializer):
    
    class Meta:
        model = SponsorEvent
        fields = '__all__'