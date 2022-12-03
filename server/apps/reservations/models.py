from django.db import models
from apps.matches.models import Match
from apps.users.models import User
from datetime import datetime


class Reservation(models.Model):
    matchId = models.ForeignKey(Match, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    reservationDate = models.DateTimeField(default=datetime.now, blank=True)
    seatId = models.IntegerField()

    class Meta:
        db_table = 'reservation'
        unique_together = ['matchId', 'seatId']
