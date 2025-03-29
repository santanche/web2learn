from django.db import models

class Person(models.Model):
    email_id = models.CharField(max_length=320)
    name = models.CharField(max_length=100)
    birthday = models.DateTimeField()

    def __str__(self):
        return self.email_id