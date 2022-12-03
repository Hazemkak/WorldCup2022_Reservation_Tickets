from django.db import models


class User(models.Model):
    class Gender(models.TextChoices):
        FEMALE = 0
        MALE = 1

    class Role(models.TextChoices):
        ADMIN = 2
        MANAGER = 1
        FAN = 0

    username = models.CharField(max_length=128)
    password = models.CharField(max_length=128)
    firstName = models.CharField(max_length=64)
    lastName = models.CharField(max_length=64)
    email = models.CharField(max_length=128)
    birthDate = models.DateField()
    gender = models.CharField(choices=Gender.choices, max_length=8)
    role = models.CharField(choices=Role.choices,
                            default=Role.FAN, max_length=8)
    nationality = models.CharField(null=True, max_length=32)
    isVerified = models.BooleanField(default=False)

    class Meta:
        db_table = 'user'