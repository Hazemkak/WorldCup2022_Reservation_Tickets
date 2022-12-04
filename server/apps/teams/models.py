from django.db import models


class Team(models.Model):
    name = models.CharField(max_length=32)
    img_url = models.CharField(max_length=256)

    class Meta:
        db_table = 'team'
