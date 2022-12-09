from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import APIException

from .models import User
from .serializers import UserSerializer
from apps.authentication.helpers import isValidToken
from apps.authentication.middlewares import AdminGuard, FanGuard


class AdminUsersList(APIView):
    permission_classes = [AdminGuard]

    def get(self, request):
        try:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return JsonResponse({ "data": serializer.data }, status=status.HTTP_200_OK)
        except APIException as e:
            return JsonResponse({ "detail": e.detail }, status=e.status_code)


class AdminUserDetail(APIView):
    permission_classes = [AdminGuard]
    
    def put(self, request, username):
        try:
            user = User.objects.get(username=username)

            if user is None:
                return JsonResponse({ "detail": "User not found" }, status=status.HTTP_404_NOT_FOUND)

            user.isVerified = True
            user.save()

            return JsonResponse({ "message": f"Manager request for {user.username} has been approved" }, status=status.HTTP_200_OK)
        except APIException as e:
            return JsonResponse({ "detail": e.detail }, status=e.status_code)


    def delete(self, request, username):
        try:
            user = User.objects.get(username=username)

            if user is None:
                return JsonResponse({ "detail": "User not found" }, status=status.HTTP_404_NOT_FOUND)

            user.delete()

            return JsonResponse({ "message": "User deleted successfully" }, status=status.HTTP_200_OK)
        except APIException as e:
            return JsonResponse({ "detail": e.detail }, status=e.status_code)


class UserProfile(APIView):
    permission_classes = [FanGuard]

    def get(self, request, username):
        try:
            user = User.objects.filter(username=username, role='0').first()

            if user is None:
                return JsonResponse({ "detail": "User not found" }, status=status.HTTP_404_NOT_FOUND)

            serializer = UserSerializer(user)
            return JsonResponse({"user": serializer.data}, status=status.HTTP_200_OK)
        except APIException as e:
            return JsonResponse({ "detail": e.detail }, status=e.status_code)


    def put(self, request, username):
        try:
            user = User.objects.get(username=username)

            if user is None:
                return JsonResponse({ "detail": "User not found" }, status=status.HTTP_404_NOT_FOUND)

            payload = isValidToken(request.headers['Authorization'])

            if payload['username'] != username:
                return JsonResponse({ "detail": "You are not authorized to view this profile" }, status=status.HTTP_403_FORBIDDEN)
            
            forbiddenFields = ['username', 'password', 'role', 'isVerified']

            for field in forbiddenFields:
                if field in request.data:
                    return JsonResponse({ "detail": f"{field} cannot be modified" }, status=status.HTTP_400_BAD_REQUEST)

            serializer = UserSerializer(user, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse({"user": serializer.data}, status=status.HTTP_200_OK)

            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except APIException as e:
            return JsonResponse({ "detail": e.detail }, status=e.status_code)
