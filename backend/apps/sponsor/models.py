from django.db import models


class SponsorEvent(models.Model):
    name = models.TextField()
    description = models.TextField()
    link_meet = models.CharField(max_length=100)
    company_id = models.TextField(default=None)
    idea_id = models.TextField(default=None)

    def __str__(self):
        return """Sponsor Event"""


class SponsorPackage(models.Model):
    name = models.TextField()
    description = models.TextField()
    amount = models.CharField(max_length=100)
    benefits = models.JSONField(default=list)
    company_id = models.TextField(default=None)
    idea_id = models.TextField(default=None)

    def __str__(self):
        return """Sponsor Package"""
