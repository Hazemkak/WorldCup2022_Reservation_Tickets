from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class Gender(models.TextChoices):
        FEMALE = 0
        MALE = 1

    class Role(models.TextChoices):
        ADMIN = 2
        MANAGER = 1
        FAN = 0

    username = models.CharField(max_length=128, unique=True)
    password = models.CharField(max_length=128)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    is_staff = None
    is_active = None
    is_superuser = None
    email = models.CharField(max_length=128, unique=True)
    birthDate = models.DateField()
    gender = models.CharField(choices=Gender.choices, max_length=8)
    role = models.CharField(choices=Role.choices,
                            default=Role.FAN, max_length=8)
    nationality = models.CharField(null=True, max_length=32, blank=True)
    isVerified = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'user'
