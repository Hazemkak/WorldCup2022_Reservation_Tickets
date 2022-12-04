from django.db import models


class Referee(models.Model):
    class Role(models.TextChoices):
        MAIN_REF = 1
        LINE_REF = 0
    firstName = models.CharField(max_length=64)
    lastName = models.CharField(max_length=64)
    role = models.CharField(max_length=64, choices=Role.choices)

    class Meta:
        db_table = 'referee'
