from django.db import models

class Poe(models.Model):
    id = models.CharField(max_length=255, primary_key=True)

    def __str__(self):
        return "abc"
