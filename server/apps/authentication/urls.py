from django.urls import path, include
from .views import Register, Login

urlpatterns = [
    path('auth/register/', Register.as_view()),
    path('auth/login/', Login.as_view())
]
