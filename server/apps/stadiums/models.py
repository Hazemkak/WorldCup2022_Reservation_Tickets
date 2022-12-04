from django.db import models
from django.core.validators import MinValueValidator


class Stadium(models.Model):
    name = models.CharField(max_length=32)
    city = models.CharField(max_length=32, default='')
    country = models.CharField(max_length=32, default='')
    rows = models.PositiveIntegerField(validators=[MinValueValidator(1)], default=1)
    seatsPerRow = models.PositiveIntegerField(
        validators=[MinValueValidator(1)], default=1)

    class Meta:
        db_table = 'stadium'
