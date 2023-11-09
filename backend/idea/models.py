from django.db import models

class Idea(models.Model):
    # Idea Overview
    name = models.TextField()
    domain = models.JSONField()
    slogan = models.TextField(default="")
    problem = models.TextField(default="")
    solution = models.TextField(default="")
    teamDescription = models.TextField(default="")
    teamExperience = models.TextField(default="")
    
    # Customer segments
    gender = models.TextField()
    ageRange = models.TextField()
    professional = models.JSONField()
    geographical = models.JSONField()
    behavior = models.TextField()
    
    # Value propositions
    apps = models.TextField()
    outstand = models.TextField()
    currentDev = models.TextField()
    
    # Done
    # upload
    support = models.TextField()
    
    innovator_id = models.CharField(max_length=255, default="")
    upvote = models.IntegerField(default=0)
    downvote = models.IntegerField(default=0)
    
    # publish = models.BooleanField(default=False)

    def __str__(self):
        return """Idea: {self.title}"""
