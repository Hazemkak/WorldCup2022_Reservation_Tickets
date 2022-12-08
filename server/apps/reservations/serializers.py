from rest_framework import serializers
from .models import Reservation
from apps.users.serializers import UserSerializer
from apps.matches.serializers import MatchSerializer

class ReservationSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    match = serializers.SerializerMethodField()

    class Meta:
        model = Reservation
        fields = ['id', 'user', 'match', 'reservationDate', 'seatId']

    def get_user(self, obj):
        return UserSerializer(obj.user).data

    def get_match(self, obj):
        return MatchSerializer(obj.match).data
