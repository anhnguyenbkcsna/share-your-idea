from django.db import models


class Contest(models.Model):
    name = models.TextField()
    topic = models.TextField()
    status = models.BooleanField(default=True)
    
    prizeDescription = models.TextField()
    firstPrize = models.TextField()
    secondPrize = models.TextField()
    thirdPrize = models.TextField()
    
    deadline = models.DateTimeField()
    round2Time = models.DateTimeField()
    round3Time = models.DateTimeField()
    location = models.TextField()
    
    contestant = models.TextField()
    teamFormat = models.TextField()
    note = models.TextField()

    def __str__(self):
        return """Contest"""
