from django.urls import path
from .views import StadiumView

urlpatterns = [
    path('stadiums', StadiumView.as_view())
]
