from rest_framework_simplejwt.tokens import RefreshToken
from jwt import encode, decode
from main.settings import JWT_SECRET, JWT_DURATION_MINUTES
import datetime
import time


def generateToken(payload):
    token = encode(
        payload, JWT_SECRET, algorithm='HS256')
    return token


def isValidToken(bearer_token):
    try:
        token = bearer_token.split(' ')[-1]
        payload = decode(token, JWT_SECRET, algorithms="HS256")
        created_at = payload['created_at']

        fmt = '%m/%d/%Y, %H:%M:%S'
        created_at = datetime.datetime.strptime(created_at, fmt)
        current_date = datetime.datetime.utcnow()

        created_at = time.mktime(created_at.timetuple())
        current_date = time.mktime(current_date.timetuple())

        minutes_diff = (current_date - created_at) / 60.0

        return None if minutes_diff > int(JWT_DURATION_MINUTES) else payload
    except:
        return None

