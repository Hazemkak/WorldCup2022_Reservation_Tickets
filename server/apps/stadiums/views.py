from django.db.models.functions import Lower
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Stadium
from .serializers import StadiumSerializer
from apps.authentication.middlewares import ManagerGuard


class StadiumView(APIView):
    permission_classes = [ManagerGuard]

    def get(self, request):
        try:
            stadiums = Stadium.objects.order_by(Lower('name').asc()).all()
            serializedStadiums = StadiumSerializer(stadiums, many=True)
            return Response(data={'stadiums': serializedStadiums.data}, status=200)
        except:
            return Response(data={"detail": "Error while retrieving stadiums"}, status=500)

    def post(self, request):
        stadium = Stadium.objects.filter(name=request.data['name']).first()

        if stadium:
            return Response(data={'detail': 'Stadium already exists'}, status=400)

        serializer = StadiumSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data={'message': 'Stadium created successfully', 'stadium': serializer.data}, status=200)
