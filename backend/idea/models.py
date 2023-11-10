from django.db import models

class Idea(models.Model):
    # Idea Overview
    name = models.TextField()
    # domain = models.JSONField(default=None)
    slogan = models.TextField(default="")
    problem = models.TextField(default="")
    solution = models.TextField(default="")
    teamDescription = models.TextField(default="")
    teamExperience = models.TextField(default="")
    
    # Customer segments
    gender = models.TextField(default="")
    # ageRange = models.JSONField(default=None)
    # professional = models.JSONField(default=None)
    # geographical = models.JSONField(default=None)
    behavior = models.TextField(default="")
    
    # Value propositions
    apps = models.TextField(default="")
    # outstand = models.JSONField(default=None)
    currentDev = models.TextField(default="")
    
    # Done
    # upload
    support = models.TextField(default="")
    
    innovator_id = models.CharField(max_length=255, default=None)
    upvote = models.IntegerField(default=0)
    downvote = models.IntegerField(default=0)
    
    # publish = models.BooleanField(default=False)

    def __str__(self):
        return """Idea: {self.title}"""
