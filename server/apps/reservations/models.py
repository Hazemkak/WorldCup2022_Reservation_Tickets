from django.db import models
from apps.matches.models import Match
from apps.users.models import User
from datetime import datetime


class Reservation(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reservationDate = models.DateTimeField(default=datetime.now, blank=True)
    seatId = models.IntegerField()

    class Meta:
        db_table = 'reservation'
        unique_together = ['match', 'seatId']
