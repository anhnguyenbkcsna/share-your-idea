from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.query import QuerySet

class AccountManager(models.Manager):
    def get_queryset(self):
        # def getModelObject(account):
        #     if account.get("role") == None or account["role"] == "innovator":
        #         return Innovator(account)
        #     elif account["role"] == "company":
        #         return Company(account)
        #     else:
        #         return Account(account)
        
        # db = connect_db()
        # collection = db.get_collection("profile")
        # all_accounts = parse_json(collection.find({}))
        # all_accounts = list(map(getModelObject, all_accounts))
        return QuerySet(model=Account, query=[])

class Account(AbstractUser):
    _id = models.CharField(max_length=255, primary_key=True)
    name = models.TextField()
    email = models.TextField()
    role = models.TextField()
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
    requirement = models.JSONField(default=dict)
    specialties = models.JSONField(default=list)
    idea_ids = models.JSONField(default=list)

    def __str__(self):
        return """Company: {self.username}"""