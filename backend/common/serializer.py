from rest_framework.fields import empty
from rest_framework.serializers import ModelSerializer

class CustomModelSerializer(ModelSerializer):
		def __init__(self, instance=None, data=..., **kwargs):
			super().__init__(instance, data, **kwargs)