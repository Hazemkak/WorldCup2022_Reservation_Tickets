from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView

from .models import Match, Match_Team, Match_Referee, Stadium, Team, Referee
from .serializers import MatchSerializer
from apps.authentication.middlewares import ManagerGuard


class MatchList(APIView):

    def get(self, request):
        try:
            matches = Match.objects.all()
            serializer = MatchSerializer(matches, many=True)
            return JsonResponse(data={'matches': serializer.data}, status=status.HTTP_200_OK)
        except:
            return JsonResponse(data={"error": "Error while retrieving matches"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MatchDetails(APIView):

    def get(self, request, id):
        try:
            match = Match.objects.filter(id=id).first()

            if match is None:
                return JsonResponse(data={"error": "Match not found"}, status=status.HTTP_404_NOT_FOUND)

            serializer = MatchSerializer(match)
            
            return JsonResponse(data={'match': serializer.data}, status=status.HTTP_200_OK)
        except:
            return JsonResponse(data={"error": "Error while retrieving match"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateMatch(APIView):
    permission_classes = [ManagerGuard]

    def post(self, request):
        data = request.data
        
        stadium = Stadium.objects.filter(id=data['stadiumId']).first()

        if stadium is None:
            return JsonResponse(data={"error": "Stadium not found"}, status=status.HTTP_404_NOT_FOUND)

        team1 = Team.objects.filter(id=data['team1Id']).first()

        if team1 is None:
            return JsonResponse(data={"error": "Team 1 not found"}, status=status.HTTP_404_NOT_FOUND)

        team2 = Team.objects.filter(id=data['team2Id']).first()

        if team2 is None:
            return JsonResponse(data={"error": "Team 2 not found"}, status=status.HTTP_404_NOT_FOUND)

        if team1 == team2:
            return JsonResponse(data={"error": "Teams must be different"}, status=status.HTTP_400_BAD_REQUEST)

        mainReferee = Referee.objects.filter(id=data['mainRefereeId'], role="1").first()

        if mainReferee is None:
            return JsonResponse(data={"error": "Main referee not found"}, status=status.HTTP_404_NOT_FOUND)
        
        lineReferee1 = Referee.objects.filter(id=data['lineReferee1Id'], role="0").first()

        if lineReferee1 is None:
            return JsonResponse(data={"error": "Line referee 1 not found"}, status=status.HTTP_404_NOT_FOUND)
        
        lineReferee2 = Referee.objects.filter(id=data['lineReferee2Id'], role="0").first()

        if lineReferee2 is None:
            return JsonResponse(data={"error": "Line referee 2 not found"}, status=status.HTTP_404_NOT_FOUND)

        if mainReferee == lineReferee1 or mainReferee == lineReferee2 or lineReferee1 == lineReferee2:
            return JsonResponse(data={"error": "Referees must be different"}, status=status.HTTP_400_BAD_REQUEST)

        same_day_matches = Match.objects.filter(match_date=data['matchDate'])
        same_day_matches = MatchSerializer(same_day_matches, many=True).data

        for match in same_day_matches:
            if match['stadium']['id'] == data['stadiumId']:
                return JsonResponse(data={"error": "Stadium is already booked for this date"}, status=status.HTTP_400_BAD_REQUEST)

            match_teams_ids = [team['id'] for team in match['teams']]
            
            if len(set(match_teams_ids).intersection([team1.id, team2.id])) > 0:
                return JsonResponse(data={"error": "Teams must not play on the same day"}, status=status.HTTP_400_BAD_REQUEST)

            match_referees_ids = [referee['id'] for referee in match['referees']]

            if len(set(match_referees_ids).intersection([mainReferee.id, lineReferee1.id, lineReferee2.id])) > 0:
                return JsonResponse(data={"error": "Referees must not referee on the same day"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            match = Match.objects.create(stadium=stadium, match_date=data['matchDate'], match_time=data['matchTime'])

            Match_Team.objects.create(matchId=match, teamId=team1)
            Match_Team.objects.create(matchId=match, teamId=team2)

            Match_Referee.objects.create(matchId=match, refereeId=mainReferee)
            Match_Referee.objects.create(matchId=match, refereeId=lineReferee1)
            Match_Referee.objects.create(matchId=match, refereeId=lineReferee2)

            return JsonResponse(data={"message": "Match created successfully", "match": MatchSerializer(match).data}, status=status.HTTP_201_CREATED)
        except:
            return JsonResponse(data={"error": "Error while creating match"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EditMatch(APIView):
    permission_classes = [ManagerGuard]

    def put(self, request, id):
        data = request.data

        match = Match.objects.filter(id=id).first()

        if match is None:
            return JsonResponse(data={"error": "Match not found"}, status=status.HTTP_404_NOT_FOUND)

        stadium = Stadium.objects.filter(id=data['stadiumId']).first()

        if stadium is None:
            return JsonResponse(data={"error": "Stadium not found"}, status=status.HTTP_404_NOT_FOUND)

        team1 = Team.objects.filter(id=data['team1Id']).first()

        if team1 is None:
            return JsonResponse(data={"error": "Team 1 not found"}, status=status.HTTP_404_NOT_FOUND)

        team2 = Team.objects.filter(id=data['team2Id']).first()

        if team2 is None:
            return JsonResponse(data={"error": "Team 2 not found"}, status=status.HTTP_404_NOT_FOUND)

        if team1 == team2:
            return JsonResponse(data={"error": "Teams must be different"}, status=status.HTTP_400_BAD_REQUEST)

        mainReferee = Referee.objects.filter(id=data['mainRefereeId'], role="1").first()

        if mainReferee is None:
            return JsonResponse(data={"error": "Main referee not found"}, status=status.HTTP_404_NOT_FOUND)

        lineReferee1 = Referee.objects.filter(id=data['lineReferee1Id'], role="0").first()

        if lineReferee1 is None:
            return JsonResponse(data={"error": "Line referee 1 not found"}, status=status.HTTP_404_NOT_FOUND)

        lineReferee2 = Referee.objects.filter(id=data['lineReferee2Id'], role="0").first()

        if lineReferee2 is None:
            return JsonResponse(data={"error": "Line referee 2 not found"}, status=status.HTTP_404_NOT_FOUND)

        if mainReferee == lineReferee1 or mainReferee == lineReferee2 or lineReferee1 == lineReferee2:
            return JsonResponse(data={"error": "Referees must be different"}, status=status.HTTP_400_BAD_REQUEST)

        same_day_matches = Match.objects.filter(match_date=data['matchDate']).exclude(id=id)
        same_day_matches = MatchSerializer(same_day_matches, many=True).data

        for match in same_day_matches:
            if match['stadium']['id'] == data['stadiumId']:
                return JsonResponse(data={"error": "Stadium is already booked for this date"}, status=status.HTTP_400_BAD_REQUEST)

            match_teams_ids = [team['id'] for team in match['teams']]

            if len(set(match_teams_ids).intersection([team1.id, team2.id])) > 0:
                return JsonResponse(data={"error": "Teams must not play on the same day"}, status=status.HTTP_400_BAD_REQUEST)

            match_referees_ids = [referee['id'] for referee in match['referees']]

            if len(set(match_referees_ids).intersection([mainReferee.id, lineReferee1.id, lineReferee2.id])) > 0:
                return JsonResponse(data={"error": "Referees must not referee on the same day"}, status=status.HTTP_400_BAD_REQUEST)

        # try:
        match = Match.objects.get(id=id)
        match.stadium = stadium
        match.match_date = data['matchDate']
        match.match_time = data['matchTime']
        match.save()

        Match_Team.objects.filter(matchId=match).delete()
        Match_Team.objects.create(matchId=match, teamId=team1)
        Match_Team.objects.create(matchId=match, teamId=team2)

        Match_Referee.objects.filter(matchId=match).delete()
        Match_Referee.objects.create(matchId=match, refereeId=mainReferee)
        Match_Referee.objects.create(matchId=match, refereeId=lineReferee1)
        Match_Referee.objects.create(matchId=match, refereeId=lineReferee2)

        return JsonResponse(data={"message": "Match updated successfully", "match": MatchSerializer(match).data}, status=status.HTTP_200_OK)
        # except:
        #     return JsonResponse(data={"error": "Error while updating match"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)