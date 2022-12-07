from rest_framework import permissions
from rest_framework.exceptions import APIException
from .helpers import isValidToken


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


class ManagerGuard(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            jwt = request.headers['Authorization']
        except:
            raise APIException("Token required", 401)
        
        payload = isValidToken(jwt)

        if payload == None:
            raise APIException("Expired token", 401)

        if int(payload['role']) != 1 or bool(payload['isVerified']) == False:
            raise APIException("You are not authorized", 403)

        return True


class FanGuard(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            jwt = request.headers['Authorization']
        except:
            raise APIException("token required", 401)
        
        payload = isValidToken(jwt)

        if payload == None:
            raise APIException("Expired token", 401)

        if int(payload['role']) != 0:
            raise APIException("You are not authorized", 403)

        return True
