from django.urls import path

from . import views

urlpatterns = [
    path('users/', views.AdminUsersList.as_view()),
    path('users/<username>/', views.AdminUserDetail.as_view()),
    path('users/profile/<username>/', views.UserProfile.as_view()),
]
