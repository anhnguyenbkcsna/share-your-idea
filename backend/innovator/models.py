from django.db import models


class Innovator(models.Model):
    # 2 nguoi giu 1 idea
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    full_name = models.CharField(max_length=255)
    age = models.IntegerField(default=None)
    email = models.EmailField(max_length=255, default=None)
    number = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    avatar = models.ImageField(default=None)
    ideas = models.JSONField(default=list)

    def __str__(self):
        return "Innovator Object"

