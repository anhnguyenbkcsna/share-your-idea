from django.db import models

# Create your models here.

# Ref: https://www.caktusgroup.com/blog/2019/02/01/creating-api-endpoint-django-rest-framework/
class User(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    full_name = models.CharField(max_length=255)
    age = models.IntegerField(default=None)
    email = models.EmailField(max_length=255, default=None)
    number = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name
