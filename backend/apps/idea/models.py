from django.db import models

class Idea(models.Model):
    class IsSpamEnum(models.TextChoices):
        IS_VALID = 'isValid'
        IS_SPAM = 'isSpam'
        WARNING = 'warning'
        
    # Idea Overview
    name = models.TextField()
    domain = models.JSONField(default=list)
    slogan = models.TextField(default="")
    problem = models.TextField(default="")
    solution = models.TextField(default="")
    teamDescription = models.TextField(default="")
    teamExperience = models.TextField(default="")
    
    # Customer segments
    gender = models.TextField(default="")
    ageRange = models.JSONField(default=list)
    professional = models.JSONField(default=list)
    geographical = models.JSONField(default=list)
    behavior = models.TextField(default="")
    
    # Value propositions
    apps = models.TextField(default="")
    outstand = models.JSONField(default=list)
    currentDev = models.TextField(default="")
    
    # Done
    # upload
    support = models.TextField(default="")
    
    # Other
    summary = models.TextField(default="")
    isSpam = models.CharField(
        max_length=10,
        choices=IsSpamEnum.choices,
        default=IsSpamEnum.IS_VALID,
    )
    voting = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    
    # Other
    innovator_ids = models.JSONField(default=list)
    upvote = models.IntegerField(default=0)
    downvote = models.IntegerField(default=0)
    
    # publish = models.BooleanField(default=False)

    def __str__(self):
        return """Idea: {self.title}"""
