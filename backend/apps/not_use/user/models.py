from django.db import models

class User(models.Model):
    def __str__(self):
        return 'User: '
