from django.urls import path
from .views import RefereeView

urlpatterns = [
    path('referees', RefereeView.as_view())
]
