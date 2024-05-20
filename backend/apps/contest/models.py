from django.db import models
from common.fields.model_fields import DateRangeField


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

    round2Time = DateRangeField()
    round3Time = DateRangeField()
    location = models.TextField(default="")

    contestant = models.TextField(default="")
    teamFormat = models.TextField(default="")

    submission_list = models.JSONField(default=list)

    def __str__(self):
        return """Contest"""


class Submission(models.Model):
    idea_id = models.TextField()
    innovator_id = models.TextField()
    grade = models.IntegerField(default=0)
    comment = models.TextField(default="")
    is_marked = models.BooleanField(default=False)

    def __str__(self):
        return """Submission"""
