from django.db import models

class Idea(models.Model):
    title = models.TextField()
    description = models.TextField()

    def __str__(self):
        return "Idea Object"
