from django.db import models


class Team(models.Model):
    name = models.CharField(max_length=32)

    class Meta:
        db_table = 'team'
