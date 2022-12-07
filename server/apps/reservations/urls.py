from django.urls import path
from .views import MatchReservations, CreateReservation, DeleteReservation

urlpatterns = [
    path('reservations/<int:match_id>', MatchReservations.as_view()),
    path('reservations/<int:match_id>/create', CreateReservation.as_view()),
    path('reservations/<int:match_id>/cancel', DeleteReservation.as_view()),
]
