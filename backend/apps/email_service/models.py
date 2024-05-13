from typing import Any
from django.db import models

# Create your models here.
class Email(models.Model):
	subject = models.TextField()
	message = models.TextField()
	recipient_list = models.JSONField(default=list)
	date = models.DateTimeField(auto_now_add=True)
	is_sent = models.BooleanField(default=False)

	def __init__(self, *args: Any, **kwargs: Any) -> None:
		super().__init__(*args, **kwargs)

	def __str__(self):
		return "Email"