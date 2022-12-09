from django.urls import path
from .views import MatchReservations, ReservationView, ReservationList

urlpatterns = [
    path('reservations/<int:match_id>', MatchReservations.as_view()),
    path('reservations', ReservationView.as_view()),
    path('reservations/list', ReservationList.as_view()),
]
