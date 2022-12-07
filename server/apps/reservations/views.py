from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView

from .models import Reservation
from .serializers import ReservationSerializer
from apps.authentication.middlewares import ManagerGuard, FanGuard


class MatchReservations(APIView):
    permission_classes = [FanGuard|ManagerGuard]

    def get(self, request, match_id):
        reservations = Reservation.objects.filter(matchId=match_id)
        serializer = ReservationSerializer(reservations, many=True)
        return JsonResponse({'reservations': serializer.data}, status=status.HTTP_200_OK)


class CreateReservation(APIView):
    permission_classes = [FanGuard]

    def post(self, request):
        pass

class DeleteReservation(APIView):
    permission_classes = [FanGuard]

    def delete(self, request, reservation_id):
        pass