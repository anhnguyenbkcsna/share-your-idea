from django.db import models

class File(models.Model):
    id = models.CharField(max_length=255, primary_key=True)

    def __str__(self):
        return self.id.__str__()