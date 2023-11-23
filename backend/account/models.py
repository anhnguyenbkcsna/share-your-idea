from django.db import models
from utils.utils import connect_db, parse_json
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
    name = models.TextField(default=None)
    email = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    avatar_url = models.TextField(default=None)
    
    is_authenticated = models.BooleanField(default=True)
    objects = AccountManager()

    def __str__(self):
        return """Account: {self.email}"""
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)


class Innovator(Account):
    fields = models.JSONField(default=list)
    number = models.CharField(max_length=255, default=None)
    description = models.TextField(default=None)
    address = models.TextField(default=None)

    def __str__(self):
        return """Innovator: {self.username}"""


class Company(Account):
    website = models.TextField(default=None)
    address = models.TextField(default=None)
    description = models.TextField(default=None)
    
    
    requirement = models.JSONField(default=dict)
    idea_ids = models.JSONField(default=list)

    def __str__(self):
        return """Company: {self.username}"""