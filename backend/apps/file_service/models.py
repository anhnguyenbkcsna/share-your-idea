from django.db import models

class File(models.Model):
    def __str__(self):
        return "File"