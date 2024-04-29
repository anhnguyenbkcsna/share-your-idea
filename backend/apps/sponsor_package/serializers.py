from rest_framework.serializers import ModelSerializer
from .models import SponsorPackage


class SponsorPackageSerializer(ModelSerializer):
    
    class Meta:
        model = SponsorPackage
        include = "__all__"