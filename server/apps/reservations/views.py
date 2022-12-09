from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView

from .models import Reservation
from .serializers import ReservationSerializer
from apps.authentication.middlewares import ManagerGuard, FanGuard, AuthorizationGuard
from apps.matches.models import Match
from apps.matches.serializers import MatchSerializer
from apps.authentication.helpers import getJwtUserId

import datetime


class MatchReservations(APIView):
    permission_classes = [FanGuard | ManagerGuard]

    def get(self, request, match_id):
        reservations = Reservation.objects.filter(match=match_id)
        serializer = ReservationSerializer(reservations, many=True)
        return JsonResponse({'reservations': serializer.data}, status=status.HTTP_200_OK)


class ReservationView(APIView):
    permission_classes = [FanGuard, AuthorizationGuard]

    def post(self, request):
        try:
            serializer = ReservationSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            matchId = request.data['match_id']
            seatId = request.data['seatId']
            matchData = Match.objects.filter(id=matchId).first()
            matchSerialized = MatchSerializer(matchData)

            stadiumSerialized = matchSerialized.data['stadium']

            if int(seatId) < 1 or int(seatId) > stadiumSerialized['rows']*stadiumSerialized['seatsPerRow']:
                return JsonResponse({'error': 'Invalid seatId'}, status=status.HTTP_400_BAD_REQUEST)

            today = datetime.date.today()
            now = datetime.datetime.now().time()
            match_date = datetime.datetime.strptime(
                matchSerialized.data['match_date'], '%Y-%m-%d').date()
            match_time = datetime.datetime.strptime(
                matchSerialized.data['match_time'], '%H:%M:%S').time()

            if match_date < today or (match_date == today and match_time < now):
                return JsonResponse({'error': 'Match reservations are no longer allowed'}, status=status.HTTP_400_BAD_REQUEST)

            reservation = Reservation.objects.create(
                user_id=request.data['user_id'], match_id=matchId, seatId=seatId, reservationDate=request.data['reservationDate'])

            return JsonResponse(data={"message": "Reservation created successfully", "reservation": ReservationSerializer(reservation).data}, status=status.HTTP_201_CREATED)

        except Exception:
            return JsonResponse({'error': 'Error while creating reservation'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request):
        try:
            if 'reservationId' not in request.data:
                return JsonResponse({'error': 'Invalid reservation Id'}, status=status.HTTP_400_BAD_REQUEST)

            reservationId = request.data['reservationId']
            reservation = Reservation.objects.filter(id=reservationId).first()

            if not reservation:
                return JsonResponse({'error': 'Reservation is not found'}, status=status.HTTP_400_BAD_REQUEST)

            reservationSerialized = ReservationSerializer(reservation)
            match_date = datetime.datetime.strptime(
                reservationSerialized.data['match']['match_date'], '%Y-%m-%d').date()

            if match_date < datetime.date.today() + datetime.timedelta(days=3):
                return JsonResponse({'error': 'Invalid cancellation before 3 days of match date'}, status=status.HTTP_400_BAD_REQUEST)

            Reservation.objects.filter(id=reservationId).delete()

            return JsonResponse({'message': 'Deleted successfully'},
                                status=status.HTTP_200_OK)

        except:
            return JsonResponse({'error': 'Error while deleting reservation'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ReservationList(APIView):
    permission_classes = [FanGuard]

    def get(self, request):
        try:
            userId = getJwtUserId(request)
            reservations = Reservation.objects.filter(user=userId)

            serializedReservations = ReservationSerializer(
                reservations, many=True)
            return JsonResponse({'reservations': serializedReservations.data}, status=200)
        except:
            return JsonResponse({'error': 'Error while getting user reservation'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
