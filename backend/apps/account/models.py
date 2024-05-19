from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.query import QuerySet

class AccountManager(models.Manager):
    def get_queryset(self):
        return QuerySet(model=Account, query=[])

class Account(AbstractUser):
    _id = models.CharField(max_length=255, primary_key=True)
    name = models.TextField()
    email = models.TextField()
    role = models.TextField()
    password = models.TextField(default=None)
    avt_url = models.TextField(default=None)
    is_authenticated = models.BooleanField(default=True)
    objects = AccountManager()

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


class Company(Account):
    logo_url = models.TextField(default=None)
    slogan = models.TextField(default=None)
    description = models.TextField(default=None)
    website = models.TextField(default=None)
    number = models.TextField(default=None)
    address = models.TextField(default=None)
    requirement = models.JSONField(default=list)
    specialties = models.JSONField(default=list)
    idea_ids = models.JSONField(default=list)

    def __str__(self):
        return """Company: {self.username}"""