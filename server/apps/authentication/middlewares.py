from rest_framework import permissions
from rest_framework.exceptions import APIException
from .helpers import isValidToken


class ManagerGuard(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            jwt = request.headers['Authorization']
        except:
            raise APIException("token required", 401)
        payload = isValidToken(jwt)

        if payload == None:
            raise APIException("Expired token", 401)

        if int(payload['role']) != 1:
            raise APIException("You are not authorized", 403)

        return True


class JwtGuard(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            jwt = request.headers['Authorization']
        except:
            raise APIException("token required", 401)
        payload = isValidToken(jwt)

        if payload == None:
            raise APIException("Expired token", 401)

        return True


class AdminGuard(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            jwt = request.headers['Authorization']
        except:
            raise APIException("token required", 401)
        payload = isValidToken(jwt)

        if payload == None:
            raise APIException("Expired token", 401)

        if int(payload['role']) != 2:
            raise APIException("You are not authorized", 403)

        return True
