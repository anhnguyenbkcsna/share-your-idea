from django.db import models


class SponsorEvent(models.Model):
    name = models.TextField()
    description = models.TextField()
    link_meet = models.CharField(max_length=100, default="") 
    innovator_id = models.TextField(default=None)
    idea_id = models.TextField(default=None)
    packages = models.JSONField(default=list)

    def __str__(self):
        return """Sponsor Event"""


class SponsorPackage(models.Model):
    name = models.TextField()
    description = models.TextField()
    value = models.TextField()
    benefits = models.JSONField(default=list)
    company_id = models.TextField(default=None) # sponsor company id

    def __str__(self):
        return """Sponsor Package"""
