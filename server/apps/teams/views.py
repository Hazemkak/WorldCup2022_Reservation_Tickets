from rest_framework.views import APIView
from .models import Team
from rest_framework.response import Response
from .serializers import TeamSerializer
from apps.authentication.middlewares import ManagerGuard


class TeamView(APIView):
    permission_classes = [ManagerGuard]

    def get(self, request):
        try:
            teams = Team.objects.all()
            serializedTeams = TeamSerializer(teams, many=True)
            return Response(data={'teams': serializedTeams.data}, status=200)
        except:
            return Response(data={"error":"Error while retrieving countries"},status=500)
