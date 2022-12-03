from .helpers import isValidToken
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework import exceptions


class ManagerGuard(permissions.BasePermission):
    def has_permission(self, request, view):
        jwt = request.headers['Authorization']
        payload = isValidToken(jwt)

        if payload == None:
            raise exceptions.APIException("Expired token", 401)

        if int(payload['role']) != 1:
            raise exceptions.APIException("You are not authorized", 403)

        return True


class JwtGuard(permissions.BasePermission):
    def has_permission(self, request, view):
        jwt = request.headers['Authorization']
        payload = isValidToken(jwt)

        if payload == None:
            raise exceptions.APIException("Expired token", 401)

        return True


class AdminGuard(permissions.BasePermission):
    def has_permission(self, request, view):
        jwt = request.headers['Authorization']
        payload = isValidToken(jwt)

        if payload == None:
            raise exceptions.APIException("Expired token", 401)

        if int(payload['role']) != 2:
            raise exceptions.APIException("You are not authorized", 403)

        return True
