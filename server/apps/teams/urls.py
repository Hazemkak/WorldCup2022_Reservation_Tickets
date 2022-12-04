from django.urls import path, include
from .views import TeamView

urlpatterns = [
    path('teams', TeamView.as_view())
]
