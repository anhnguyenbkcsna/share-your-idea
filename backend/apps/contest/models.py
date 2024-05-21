from django.db import models
from common.fields.model_fields import DateRangeField


class Contest(models.Model):
    class RoundType(models.TextChoices):
        UPLOAD = "upload"
        ONLINE = "online"
        OFFLINE = "offline"
    class ScoringType(models.TextChoices):
        VOTE = "vote"
        MARK = "mark"
    
    name = models.TextField()
    topic = models.TextField()
    location = models.TextField(default="")
    otherInfo = models.TextField(default="")
    # banner
    # == PRIZES ==
    prize1 = models.TextField()
    prize1Value = models.TextField()
    prize1Quantity = models.TextField()
    prize2 = models.TextField(default="")
    prize2Value = models.TextField(default="")
    prize2Quantity = models.TextField(default="")
    prize3 = models.TextField(default="")
    prize3Value = models.TextField(default="")
    prize3Quantity = models.TextField(default="")
    prize4 = models.TextField(default="")
    prize4Value = models.TextField(default="")
    prize4Quantity = models.TextField(default="")
    prize5 = models.TextField(default="")
    prize5Value = models.TextField(default="")
    prize5Quantity = models.TextField(default="")

    # == ROUNDS ==
    round1 = models.TextField()
    roundType1 = models.CharField(max_length=15, choices=RoundType.choices) # upload, online, offline
    scoringType1 = models.CharField(max_length=10, choices=ScoringType.choices) # vote, mark
    time1 = DateRangeField()

    round2 = models.TextField(default="")
    roundType2 = models.CharField(max_length=15, choices=RoundType.choices)
    scoringType2 = models.CharField(max_length=10, choices=ScoringType.choices)
    time2 = DateRangeField(default=None)

    round3 = models.TextField(default="")
    roundType3 = models.CharField(max_length=15, choices=RoundType.choices)
    scoringType3 = models.CharField(max_length=10, choices=ScoringType.choices)
    time3 = DateRangeField(default=None)

    round4 = models.TextField(default="")
    roundType4 = models.CharField(max_length=15, choices=RoundType.choices)
    scoringType4 = models.CharField(max_length=10, choices=ScoringType.choices)
    time4 = DateRangeField(default=None)

    round5 = models.TextField(default="")
    roundType5 = models.CharField(max_length=15, choices=RoundType.choices)
    scoringType5 = models.CharField(max_length=10, choices=ScoringType.choices)
    time5 = DateRangeField(default=None)

    description = models.TextField(default="")

    # == SUPPORT QUERIES ==
    submission_list = models.JSONField(default=list)

    def __str__(self):
        return """Contest"""


class Submission(models.Model):
    idea_id = models.TextField()
    grades = models.IntegerField(default=list)
    comment = models.TextField(default="")
    is_marked = models.BooleanField(default=False)

    def __str__(self):
        return """Submission"""
