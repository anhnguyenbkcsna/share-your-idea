from django.db import models


class Contest(models.Model):
    name = models.TextField()
    deadline = models.DateTimeField()
    topic = models.TextField()
    status = models.BooleanField(default=True)
    description = models.TextField(default="")
    otherInfo = models.TextField(default="")
    
    prizeDescription = models.TextField(default="")
    firstPrize = models.TextField()
    secondPrize = models.TextField()
    thirdPrize = models.TextField()
    
    organizer = models.TextField()
    email = models.EmailField()
    
    round2Time = models.DateTimeField()
    round3Time = models.DateTimeField()
    location = models.TextField(default="")
    
    contestant = models.TextField(default="")
    teamFormat = models.TextField(default="")

    def __str__(self):
        return """Contest"""
