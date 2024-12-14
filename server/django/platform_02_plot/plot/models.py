from django.db import models

class Plot(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField("date created")

    def __str__(self):
        return self.title

class Comment(models.Model):
    plot = models.ForeignKey(Plot, on_delete=models.CASCADE)
    text = models.CharField(max_length=200)
    grade = models.IntegerField(default=0)

    def __str__(self):
        return self.plot.title + " / " + self.text
