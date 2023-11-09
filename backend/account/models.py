from django.db import models
from django.contrib.auth.models import AbstractUser


class Account(AbstractUser):
    _id = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255, default=None)
    email = models.CharField(max_length=255, default=None)
    role = models.CharField(max_length=255)
    is_authenticated = models.BooleanField(default=True)

    def __str__(self):
        return """Account: {self.email}"""

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)

class Innovator(Account):
    number = models.CharField(max_length=255, default=None)
    address = models.CharField(max_length=255, default=None)
    avatar_url = models.TextField(default=None)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return """Innovator: {self.username}"""