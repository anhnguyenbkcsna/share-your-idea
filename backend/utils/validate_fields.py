from rest_framework.serializers import ValidationError

def validate_date_range(value: dict):
	if (not 'start' in value) or (not 'end' in value):
		raise ValidationError("Date range must have both start date and end date!")

	if (value.get('start') is None) or (value.get('end') is None):
		raise ValidationError("Invalid start date and end date!")
	return value