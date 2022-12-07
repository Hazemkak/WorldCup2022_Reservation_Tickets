from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Stadium
from .serializers import StadiumSerializer
from apps.authentication.middlewares import ManagerGuard


class StadiumView(APIView):
    permission_classes = [ManagerGuard]

    def get(self, request):
        try:
            stadiums = Stadium.objects.all()
            serializedStadiums = StadiumSerializer(stadiums, many=True)
            return Response(data={'stadiums': serializedStadiums.data}, status=200)
        except:
            return Response(data={"error": "Error while retrieving stadiums"}, status=500)

    def post(self, request):
        serializer = StadiumSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data={'stadium': serializer.data}, status=200)
