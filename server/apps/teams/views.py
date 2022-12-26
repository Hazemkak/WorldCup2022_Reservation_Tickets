from django.db.models.functions import Lower
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Team
from .serializers import TeamSerializer
from apps.authentication.middlewares import ManagerGuard


class TeamView(APIView):
    permission_classes = [ManagerGuard]

    def get(self, request):
        try:
            teams = Team.objects.order_by(Lower('name').asc()).all()
            serializedTeams = TeamSerializer(teams, many=True)
            return Response(data={'teams': serializedTeams.data}, status=200)
        except:
            return Response(data={"detail":"Error while retrieving teams"},status=500)
