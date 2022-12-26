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

# Used to check if userId & jwt userId is similar or not


class AuthorizationGuard(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            jwt = request.headers['Authorization']
        except:
            raise APIException("token required", 401)

        try:
            userId = request.data['user_id']
        except:
            raise APIException("user id is required", 400)

        payload = isValidToken(jwt)

        if payload == None:
            raise APIException("Expired token", 401)

        if payload['id'] != userId:
            raise APIException("You are not authorized", 403)

        return True

class ManagerOrFanGuard(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            jwt = request.headers['Authorization']
        except:
            raise APIException("token required", 401)

        payload = isValidToken(jwt)

        if payload == None:
            raise APIException("Expired token", 401)

        if int(payload['role']) != 1 and int(payload['role']) != 0:
            raise APIException("You are not authorized", 403)

        return True