from django.db import models

class Idea(models.Model):
    title = models.TextField()
    description = models.TextField(default="")
    
    area = models.TextField()
    target = models.TextField()
    painpoint = models.TextField()
    
    headcount = models.TextField()
    cost_and_profit = models.TextField()
    
    demographics = models.TextField()
    behavior = models.TextField()
    
    unique_point = models.TextField()
    benefit = models.TextField()
    
    innovator_id = models.CharField(max_length=255, default="")
    like = models.IntegerField(default=0)
    dislike = models.IntegerField(default=0)
    
    publish = models.BooleanField(default=False)
    # files -- list of files 

    def __str__(self):
        return """Idea: {self.title}"""
