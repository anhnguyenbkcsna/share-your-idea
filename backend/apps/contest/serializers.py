from rest_framework.serializers import ModelSerializer
from .models import Contest
from utils.validate_fields import validate_date_range


class ContestSerializer(ModelSerializer):
    class Meta:
        model = Contest
        fields = "__all__"
    
    def validate_status(self, value):
        if value is None:
            return True
        return value
    
    def validate_round2Time(self, value):
        return validate_date_range(value)

    def validate_round3Time(self, value):
        return validate_date_range(value)