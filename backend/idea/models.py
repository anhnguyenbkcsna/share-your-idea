from django.db import models

class Idea(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    # image = models.FileField(null=False)

    def __str__(self):
        return "Idea files"
