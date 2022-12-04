from rest_framework import serializers
from .models import Referee


class RefereeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Referee
        fields = '__all__'
