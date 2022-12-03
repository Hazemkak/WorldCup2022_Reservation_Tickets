from django.db import models
from apps.stadiums.models import Stadium
from apps.referees.models import Referee
from apps.teams.models import Team


class Match(models.Model):
    stadium = models.ForeignKey(Stadium, on_delete=models.CASCADE)
    startsAt = models.DateTimeField()

    class Meta:
        db_table = 'match'


class Match_Team(models.Model):
    matchId = models.ForeignKey(Match, on_delete=models.CASCADE)
    teamId = models.ForeignKey(Team, on_delete=models.CASCADE)

    class Meta:
        db_table = 'match_team'
        unique_together = ['matchId', 'teamId']


class Match_Referee(models.Model):
    matchId = models.ForeignKey(Match, on_delete=models.CASCADE)
    refereeId = models.ForeignKey(Referee, on_delete=models.CASCADE)

    class Meta:
        db_table = 'match_referee'
        unique_together = ['matchId', 'refereeId']
