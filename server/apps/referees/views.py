from django.db.models.functions import Lower, Concat
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Referee
from .serializers import RefereeSerializer
from apps.authentication.middlewares import ManagerGuard


class RefereeView(APIView):
    permission_classes = [ManagerGuard]

    def get(self, request):
        try:
            role = request.GET.get('role')
            referees = Referee.objects.order_by(Concat(Lower('firstName'), Lower('lastName')).asc())
            referees = referees.filter(
                role=role) if role else referees.all()
            serializedReferees = RefereeSerializer(referees, many=True)
            return Response(data={'referees': serializedReferees.data}, status=200)
        except:
            return Response(data={"detail": "Error while retrieving referees"}, status=500)
