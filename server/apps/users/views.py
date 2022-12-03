from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User
from main.settings import JWT_DURATION_MINUTES, JWT_SECRET
import datetime
import jwt
import json


class Register(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class Login(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']

        user = User.objects.filter(username=username).first()

        if user:
            if not user.check_password(password):
                raise AuthenticationFailed("Incorrect password")

            payload = {
                'id': user.id,
                'username': user.username,
                'role': user.role,
                'created_at': datetime.datetime.utcnow().strftime("%m/%d/%Y, %H:%M:%S")
            }

            serializerUser = UserSerializer(user)

            token = jwt.encode(
                payload, JWT_SECRET, algorithm='HS256')

            return Response({"token": token, "user": serializerUser.data})
        else:
            raise AuthenticationFailed("User not found")
