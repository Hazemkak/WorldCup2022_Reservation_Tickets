from django.db.models import Q
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
import datetime

from .helpers import generateToken
from apps.users.models import User
from apps.users.serializers import UserSerializer


class Register(APIView):
    def post(self, request):
        # check if the user is already registered
        if User.objects.filter(Q(username=request.data['username']) | Q(email=request.data['email'])).exists():
            return Response({"error": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # check if passwords match
        if request.data['password'] != request.data['confirmPassword']:
            return Response({"error": "Passwords don't match"}, status=status.HTTP_400_BAD_REQUEST)

        # check if the role is fan
        if int(request.data['role']) == 0:
            request.data['isVerified'] = True

        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class Login(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']

        user = User.objects.filter(username=username).first()

        if user:
            if not user.check_password(password):
                raise AuthenticationFailed("Incorrect password", status.HTTP_401_UNAUTHORIZED)

            payload = {
                'id': user.id,
                'username': user.username,
                'role': user.role,
                'isVerified': user.isVerified,
                'created_at': datetime.datetime.utcnow().strftime("%m/%d/%Y, %H:%M:%S")
            }

            serializerUser = UserSerializer(user)

            token = generateToken(payload)

            return Response({"token": token, "user": serializerUser.data}, status=status.HTTP_200_OK)
        else:
            raise AuthenticationFailed("User not found", status.HTTP_404_NOT_FOUND)
