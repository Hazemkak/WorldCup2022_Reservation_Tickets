from rest_framework import serializers
from .models import Match, Match_Team, Match_Referee
from apps.teams.serializers import TeamSerializer
from apps.referees.serializers import RefereeSerializer
from apps.stadiums.serializers import StadiumSerializer

class MatchSerializer(serializers.ModelSerializer):
    stadium = serializers.SerializerMethodField()
    teams = serializers.SerializerMethodField()
    referees = serializers.SerializerMethodField()

    class Meta:
        model = Match
        fields = ['id', 'stadium', 'match_date', 'match_time', 'teams', 'referees']

    def get_stadium(self, obj):
        return StadiumSerializer(obj.stadium).data

    def get_teams(self, obj):
        teams = Match_Team.objects.filter(matchId=obj.id)
        return TeamSerializer([team.teamId for team in teams], many=True).data

    def get_referees(self, obj):
        referees = Match_Referee.objects.filter(matchId=obj.id)
        return RefereeSerializer([referee.refereeId for referee in referees], many=True).data