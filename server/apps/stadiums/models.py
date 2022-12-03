from django.db import models
from django.core.validators import MinValueValidator


class Stadium(models.Model):
    name = models.CharField(max_length=32)
    city = models.CharField(max_length=32)
    country = models.CharField(max_length=32)
    rows = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    seatsPerRow = models.PositiveIntegerField(
        validators=[MinValueValidator(1)])
