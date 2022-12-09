from rest_framework.views import APIView
from .models import Referee
from rest_framework.response import Response
from .serializers import RefereeSerializer
from apps.authentication.middlewares import ManagerGuard


class RefereeView(APIView):
    permission_classes = [ManagerGuard]

    def get(self, request):
        try:
            role = request.GET.get('role')
            referees = Referee.objects.filter(
                role=role) if role else Referee.objects.all()
            serializedReferees = RefereeSerializer(referees, many=True)
            return Response(data={'referees': serializedReferees.data}, status=200)
        except:
            return Response(data={"detail": "Error while retrieving referees"}, status=500)
