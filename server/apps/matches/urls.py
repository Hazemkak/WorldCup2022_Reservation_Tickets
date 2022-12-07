from django.urls import path

from .views import MatchList, MatchDetails, CreateMatch, EditMatch

urlpatterns = [
    path('matches', MatchList.as_view()),
    path('matches/<int:id>', MatchDetails.as_view()),
    path('matches/create', CreateMatch.as_view()),
    path('matches/<int:id>/edit', EditMatch.as_view()),
]
