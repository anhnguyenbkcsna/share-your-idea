from django.db import models

class Company(models.Model):
    name = models.TextField()
    logo_url = models.TextField()
    slogan = models.TextField()
    description = models.TextField()
    website = models.TextField()
    email = models.TextField()
    number = models.TextField()
    address = models.TextField()

    def __str__(self):
        return """Company: {self.name}"""
