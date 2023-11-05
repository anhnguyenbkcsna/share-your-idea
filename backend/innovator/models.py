from django.db import models


class Innovator(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    age = models.IntegerField(default=None)
    email = models.EmailField(max_length=255, default=None)
    number = models.CharField(max_length=255, default=None)
    address = models.CharField(max_length=255, default=None)
    avatar_url = models.TextField(default=None)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return """Innovator: {self.username}"""
